import { getAsRoot, getAsShadowRoot } from './index'

const INLINE_UNSET_SENTINEL = '__AS_INLINE_UNSET__'

/**
 * Dataset 标记名称。
 * 注意：`dataset.asAdjusted` 生成的属性是 `data-as-adjusted`（camelCase 会转 kebab-case），
 * 查询时必须用 ADJUSTED_SELECTOR，不能用 `[data-asAdjusted]`（匹配不到任何元素）。
 */
const DATASET_MARKER = 'asAdjusted'
const ADJUSTED_SELECTOR = '[data-as-adjusted]'

/**
 * 已调整元素的原始值
 */
interface AdjustedElement {
  originalTop: string
  originalInlineTop: string
  originalPriority: string
}

/** 存储已调整元素的原始值（WeakMap 随元素回收） */
const adjustedElements = new WeakMap<HTMLElement, AdjustedElement>()

/* ------------------------------------------------------------------ *
 * 采样配置
 *
 * 不再遍历整篇文档：只在菜单条覆盖的区域里取网格点，
 * 用 elementsFromPoint 找出「压在这条区域上」的元素。
 * ------------------------------------------------------------------ */

/** 横向采样点数量（均匀分布在菜单条宽度上） */
const SAMPLE_X_COUNT = 15
/** 纵向采样位置（占条高度的比例，取 1/4、1/2、3/4 三行） */
const SAMPLE_Y_RATIOS = [0.25, 0.5, 0.75]
/** 每个采样点最多取几个候选元素（按绘制顺序从前往后） */
const SAMPLE_STACK_LIMIT = 4
/**
 * 每个候选元素向上追溯几层祖先。
 * 命中点经常落在固定头的子元素上（输入框、按钮、图标），真正需要避让的是
 * 它们的 fixed/sticky 祖先：只取栈顶几个元素会漏掉外层容器。
 */
const SAMPLE_ANCESTOR_DEPTH = 8
/** 单轮采样的候选元素上限，防止极端页面失控 */
const SAMPLE_CANDIDATE_LIMIT = 200
/** 两次采样的最小间隔（ms），滚动时用于节流 */
const SAMPLE_MIN_INTERVAL = 120
/**
 * 稳定后补采样的延迟（ms）。
 * 不少站点滚动后才用过渡动画把头部吸附到顶部（例如 Google 的搜索头），
 * 立即采样会赶上动画中间态而漏判，因此每轮采样后再补一次。
 */
const SAMPLE_SETTLE_DELAY = 320

let currentTopOffset = 0
let isRestoring = false

/**
 * 根据宿主高度获取需要让固定元素避让的像素值
 */
function computeTopOffset(): number {
  const host = getAsRoot()
  if (!host) {
    return 0
  }
  const classList = host.classList
  if (!classList.contains('as-host-top') || !classList.contains('as-host-show') || classList.contains('as-host-hide')) {
    return 0
  }
  // 真正的条是影子根里的 .as-container（position: fixed）。宿主元素本身可能没有高度：
  // WXT 0.21 起会在影子根里注入 `:host{all:initial !important}` 的重置，宿主高度会塌成 0。
  const container = getAsShadowRoot()?.querySelector('.as-container') as HTMLElement | null
  const rect = (container || host).getBoundingClientRect()
  return Number((rect.height || 0).toFixed(2))
}

function refreshTopOffset(): number {
  currentTopOffset = computeTopOffset()
  return currentTopOffset
}

/**
 * 将元素的 top 恢复成我们记录的原始值
 */
function restoreOriginalTop(item: HTMLElement): void {
  if (!item.dataset[DATASET_MARKER]) return

  const data = adjustedElements.get(item)
  if (!data) {
    // 异常情况：有标记但没有数据，清理标记
    delete item.dataset[DATASET_MARKER]
    return
  }

  if (data.originalInlineTop === INLINE_UNSET_SENTINEL) {
    item.style.removeProperty('top')
  } else {
    item.style.setProperty('top', data.originalInlineTop, data.originalPriority)
  }

  delete item.dataset[DATASET_MARKER]
  adjustedElements.delete(item)
}

/** 还原所有被我们调整过的元素 */
function restoreAllAdjustedNodes(): void {
  if (isRestoring) return
  if (!document.body) return

  isRestoring = true
  try {
    document.querySelectorAll(ADJUSTED_SELECTOR).forEach(el => {
      if (el instanceof HTMLElement) {
        restoreOriginalTop(el)
      }
    })
  } finally {
    isRestoring = false
  }
}

/**
 * 几何过滤：排除「看起来也压在条上、但其实不是头部」的元素
 *
 * 与构建期扫描器（scripts/scan-special-style.mjs）保持同一套判据，
 * 否则同一个站点在两条路径下会得到不同结果。
 */
function isAvoidableGeometry(el: HTMLElement, position: string): boolean {
  const rect = el.getBoundingClientRect()
  if (rect.width <= 0 || rect.height <= 0) return false

  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight

  // 覆盖整屏的固定层是遮罩/弹窗（如百度的安全验证框），推它会挪走整块弹窗
  if (position === 'fixed' && rect.width >= viewportWidth * 0.9 && rect.height >= viewportHeight * 0.9) {
    return false
  }
  // 整高的窄面板是侧边抽屉（如 DuckDuckGo 的滑出菜单）
  if (position === 'fixed' && rect.width < viewportWidth * 0.5 && rect.height > viewportHeight * 0.6) {
    return false
  }
  // 完全在视口外的元素不用管
  if (rect.right <= 1 || rect.left >= viewportWidth - 1) return false

  return true
}

/**
 * 判断元素是否需要避让
 *
 * - fixed：只要 top 是具体数值就避让
 * - sticky：只有 top 为 0 的才避让，否则说明它本来就停在别的偏移上，不该动
 */
function isAdjustableElement(el: HTMLElement, root: Element): boolean {
  if (el.style.display === 'none') return false
  if (root.contains(el)) return false

  const inlinePosition = el.style.position
  const inlineTop = el.style.top
  const useInline = (inlinePosition === 'fixed' || inlinePosition === 'sticky') &&
    !!inlineTop && inlineTop !== 'auto'

  const computed = useInline ? null : window.getComputedStyle(el)
  const position = useInline ? inlinePosition : computed!.position
  if (position !== 'fixed' && position !== 'sticky') return false

  const top = useInline ? inlineTop : computed!.top
  if (!top || top === 'auto') return false
  if (!isAvoidableGeometry(el, position)) return false

  return isOffsetAllowed(position, top)
}

function isOffsetAllowed(position: string, top: string): boolean {
  if (position === 'fixed') return true
  // sticky：仅处理钉在视口顶部的元素
  return parseFloat(top) === 0
}

/**
 * 调整单个元素的位置（幂等：多次调用产生相同结果）
 */
function updateNodeOffset(item: HTMLElement): void {
  if (!item) return

  if (currentTopOffset <= 0) {
    restoreOriginalTop(item)
    return
  }

  // 已调整：直接使用保存的原始值重新计算（不累加）
  if (item.dataset[DATASET_MARKER]) {
    const data = adjustedElements.get(item)
    if (data) {
      const numericTop = parseFloat(data.originalTop)
      if (!Number.isNaN(numericTop)) {
        item.style.setProperty('top', `${numericTop + currentTopOffset}px`, 'important')
      }
    }
    return
  }

  // 首次调整：捕获原始值
  const style = window.getComputedStyle(item)
  if (style.position !== 'fixed' && style.position !== 'sticky') {
    return
  }
  const topValue = style.top
  if (topValue === 'auto') {
    return
  }
  if (!isOffsetAllowed(style.position, topValue)) {
    return
  }

  const numericTop = parseFloat(topValue)
  if (Number.isNaN(numericTop)) {
    return
  }

  adjustedElements.set(item, {
    originalTop: topValue,
    originalInlineTop: item.style.getPropertyValue('top') || INLINE_UNSET_SENTINEL,
    originalPriority: item.style.getPropertyPriority('top') || ''
  })

  item.style.setProperty('top', `${numericTop + currentTopOffset}px`, 'important')
  item.dataset[DATASET_MARKER] = '1'
}

/* ------------------------------------------------------------------ *
 * 命中测试采样
 * ------------------------------------------------------------------ */

/**
 * 在菜单条覆盖的区域内取网格点，收集「视觉上压在条上」的候选元素。
 * 每个点只取栈顶的前几个元素：更靠后的元素本来就被前面的挡住了。
 */
function collectCandidates(root: HTMLElement, rect: DOMRect): HTMLElement[] {
  const seen = new Set<HTMLElement>()
  const result: HTMLElement[] = []

  for (const yRatio of SAMPLE_Y_RATIOS) {
    const y = Math.round(rect.top + rect.height * yRatio)
    for (let i = 0; i < SAMPLE_X_COUNT; i++) {
      const x = Math.round(rect.left + rect.width * ((i + 0.5) / SAMPLE_X_COUNT))
      const stack = document.elementsFromPoint(x, y)
      let taken = 0
      for (const el of stack) {
        if (!(el instanceof HTMLElement)) continue
        if (el === root || root.contains(el)) continue
        if (el === document.body || el === document.documentElement) continue
        if (seen.has(el)) continue

        // 沿祖先链补一层：命中点落在固定头的子元素上时，靠这一层才能找到真正的 fixed/sticky 容器。
        // 一旦遇到 fixed/sticky 祖先就停下——再往外通常是页面级容器，不该被推动。
        let node: HTMLElement | null = el
        for (let depth = 0; node && depth < SAMPLE_ANCESTOR_DEPTH; depth += 1) {
          if (node === document.body || node === document.documentElement) break
          if (node === root || root.contains(node)) break
          if (!seen.has(node)) {
            seen.add(node)
            result.push(node)
            if (result.length >= SAMPLE_CANDIDATE_LIMIT) return result
          }
          const position = window.getComputedStyle(node).position
          if (position === 'fixed' || position === 'sticky') break
          node = node.parentElement
        }

        taken += 1
        if (taken >= SAMPLE_STACK_LIMIT) break
      }
    }
  }

  return result
}

/**
 * 取菜单条在视口里的实际位置。
 * 宿主元素本身在文档流里，页面滚动后会被滚出视口；真正 fixed 的是影子根里的 .as-container。
 */
function getBarRect(root: HTMLElement): DOMRect {
  const container = getAsShadowRoot()?.querySelector('.as-container') as HTMLElement | null
  return (container || root).getBoundingClientRect()
}

/** 采样一轮：找出压在条上的元素并调整 */
function sampleBarArea(): void {
  const root = getAsRoot()
  if (!root) return

  if (refreshTopOffset() <= 0) {
    restoreAllAdjustedNodes()
    return
  }

  const rect = getBarRect(root)
  if (rect.height <= 0) return

  collectCandidates(root, rect).forEach(el => {
    if (!el.dataset[DATASET_MARKER] && !isAdjustableElement(el, root)) return
    updateNodeOffset(el)
  })
}

let sampleTimer: number | null = null
let settleTimer: number | null = null
let lastSampleAt = 0

/** 节流调度一轮采样（滚动 / resize / DOM 变化都走这里） */
function scheduleSample(): void {
  if (sampleTimer !== null) return
  const delay = Math.max(0, SAMPLE_MIN_INTERVAL - (performance.now() - lastSampleAt))
  sampleTimer = window.setTimeout(() => {
    sampleTimer = null
    lastSampleAt = performance.now()
    sampleBarArea()
    // 补一轮稳定后的采样：吸附动画结束、布局定型之后再判断一次
    if (settleTimer === null) {
      settleTimer = window.setTimeout(() => {
        settleTimer = null
        sampleBarArea()
      }, SAMPLE_SETTLE_DELAY)
    }
  }, delay)
}

/** 重新应用当前偏移到所有已调整元素（不做采样） */
function reapplyAdjustedNodes(): void {
  document.querySelectorAll(ADJUSTED_SELECTOR).forEach(el => {
    if (el instanceof HTMLElement) {
      updateNodeOffset(el)
    }
  })
}

/* ------------------------------------------------------------------ *
 * 监听
 * ------------------------------------------------------------------ */

let hostClassObserver: MutationObserver | null = null
let hostResizeObserver: ResizeObserver | null = null
let domObserver: MutationObserver | null = null

function handleHostChange(): void {
  if (refreshTopOffset() <= 0) {
    restoreAllAdjustedNodes()
    return
  }
  // 偏移量变了：先就地更新已知元素，再补一轮采样找新出现的
  reapplyAdjustedNodes()
  scheduleSample()
}

/**
 * 监听宿主 class / 尺寸变化，随时刷新偏移量
 */
function observeHostLayoutChange(): void {
  const host = getAsRoot()
  if (!host) return

  if (hostClassObserver) {
    hostClassObserver.disconnect()
    hostClassObserver = null
  }
  hostClassObserver = new MutationObserver(handleHostChange)
  hostClassObserver.observe(host, { attributes: true, attributeFilter: ['class'] })

  if (hostResizeObserver) {
    hostResizeObserver.disconnect()
    hostResizeObserver = null
  }
  if (typeof ResizeObserver !== 'undefined') {
    hostResizeObserver = new ResizeObserver(handleHostChange)
    hostResizeObserver.observe(host)
  }
}

/**
 * 监听 DOM 结构变化：只重新采样，不再遍历新增子树
 */
function observeDomChange(): void {
  if (!document.body) return

  if (domObserver) {
    domObserver.disconnect()
    domObserver = null
  }
  domObserver = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      if (mutation.addedNodes.length > 0) {
        scheduleSample()
        return
      }
    }
  })
  domObserver.observe(document.body, { childList: true, subtree: true })
}

const viewportHandler = (): void => {
  scheduleSample()
}

/**
 * 滚动 / 窗口尺寸变化时重新采样（sticky 元素滚动后才会压到条上）
 */
function observeViewportChange(): void {
  window.addEventListener('scroll', viewportHandler, { passive: true, capture: true })
  window.addEventListener('resize', viewportHandler, { passive: true })
}

function removeViewportListener(): void {
  window.removeEventListener('scroll', viewportHandler, { capture: true })
  window.removeEventListener('resize', viewportHandler)
}

/**
 * 初始化特殊样式适配（处理 fixed / sticky 元素被菜单条遮挡的问题）
 */
export function initSpecialStyle(): void {
  // 幂等：SPA 重新挂载或 HMR 可能重复初始化，先回收上一轮
  disconnectSpecialStyle()
  scheduleSample()
  observeHostLayoutChange()
  observeDomChange()
  observeViewportChange()
}

/**
 * 停止监听（用于性能回收）
 */
export function disconnectSpecialStyle(): void {
  if (sampleTimer !== null) {
    clearTimeout(sampleTimer)
    sampleTimer = null
  }
  if (settleTimer !== null) {
    clearTimeout(settleTimer)
    settleTimer = null
  }
  lastSampleAt = 0

  removeViewportListener()
  restoreAllAdjustedNodes()

  if (domObserver) {
    domObserver.disconnect()
    domObserver = null
  }
  if (hostClassObserver) {
    hostClassObserver.disconnect()
    hostClassObserver = null
  }
  if (hostResizeObserver) {
    hostResizeObserver.disconnect()
    hostResizeObserver = null
  }
}
