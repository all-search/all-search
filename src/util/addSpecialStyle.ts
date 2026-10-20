import { checkBody, getAsRoot, debounce } from './index'

const INLINE_UNSET_SENTINEL = '__AS_INLINE_UNSET__'

/**
 * Dataset 标记名称。
 * 注意：`dataset.asAdjusted` 生成的属性是 `data-as-adjusted`（camelCase 会转 kebab-case），
 * 查询时必须用 ADJUSTED_SELECTOR，不能用 `[data-asAdjusted]`（匹配不到任何元素）。
 */
const DATASET_MARKER = 'asAdjusted'
const ADJUSTED_SELECTOR = '[data-as-adjusted]'

/**
 * 已调整元素的数据结构
 */
interface AdjustedElement {
  originalTop: string
  originalInlineTop: string
  originalPriority: string
}

/**
 * 存储已调整元素的原始值（使用 WeakMap 自动垃圾回收）
 */
const adjustedElements = new WeakMap<HTMLElement, AdjustedElement>()

/**
 * 将元素的 top 恢复成我们记录的原始值
 * 使用 dataset 标记判断是否已调整
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

/**
 * 全量恢复被我们标记为调整过的 fixed 节点
 * 使用 dataset 选择器遍历
 */
function restoreAllAdjustedNodes(): void {
  // 防止死循环：如果正在恢复，直接返回
  if (isRestoring) return
  if (!document.body) return

  isRestoring = true

  try {
    // 使用 dataset 选择器查找所有已调整的元素（属性名是 kebab-case）
    const elements = document.querySelectorAll(ADJUSTED_SELECTOR)
    elements.forEach(el => {
      if (el instanceof HTMLElement) {
        restoreOriginalTop(el)
      }
    })
  } finally {
    // 确保标志位被清除，即使发生异常
    isRestoring = false
  }
}

/**
 * 判断元素是否是需要避让的「吸顶」元素
 *
 * - fixed：只要 top 是具体数值就避让（原有逻辑）
 * - sticky：只有 top 为 0 的才避让，否则说明它本来就停在别的偏移上，不该动
 *   （谷歌搜索结果页的顶栏就是 sticky + top:0，见 issue #83）
 */
function isAdjustableElement(el: HTMLElement, root: Element): boolean {
  // 不处理隐藏元素和我们自己的元素
  if (el.style.display === 'none') return false
  if (root.contains(el)) return false

  const inlinePosition = el.style.position
  const inlineTop = el.style.top
  if (
    (inlinePosition === 'fixed' || inlinePosition === 'sticky') &&
    inlineTop && inlineTop !== 'auto'
  ) {
    return isOffsetAllowed(inlinePosition, inlineTop)
  }

  const computed = window.getComputedStyle(el)
  const position = computed.position
  if (position !== 'fixed' && position !== 'sticky') return false

  const top = computed.top
  if (!top || top === 'auto') return false
  return isOffsetAllowed(position, top)
}

function isOffsetAllowed(position: string, top: string): boolean {
  if (position === 'fixed') return true
  // sticky：仅处理钉在视口顶部的元素
  return parseFloat(top) === 0
}

function isElement(obj: any): obj is Element {
  return obj
    && obj instanceof Element
    && obj.nodeType === 1
    && obj.tagName !== undefined
}

let currentTopOffset = 0

// 防止死循环的标志位（类似 Vue 2 的 isRendering）
let isRestoring = false
let isUpdating = false

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
  const rect = host.getBoundingClientRect()
  return Number((rect.height || 0).toFixed(2))
}

function refreshTopOffset(): number {
  currentTopOffset = computeTopOffset()
  return currentTopOffset
}

/**
 * 调整单个 fixed 元素的位置（幂等：多次调用产生相同结果）
 * 使用 dataset 标记防止重复调整和累加
 */
function updateNodeOffset(item: HTMLElement): void {
  if (!item || !isElement(item)) {
    return
  }
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

  // 首次调整：捕获原始值 → 应用偏移 → 添加标记
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

  // 保存原始状态
  adjustedElements.set(item, {
    originalTop: topValue,
    originalInlineTop: item.style.getPropertyValue('top') || INLINE_UNSET_SENTINEL,
    originalPriority: item.style.getPropertyPriority('top') || ''
  })

  // 应用偏移
  item.style.setProperty('top', `${numericTop + currentTopOffset}px`, 'important')

  // 添加标记
  item.dataset[DATASET_MARKER] = '1'
}

function getFixedNodeList(list: (Node | Element | null)[]): HTMLElement[] {
  const weakSet = new WeakSet()
  const newList: HTMLElement[] = []
  const root = getAsRoot()
  if (!root) return newList

  list.forEach(node => {
    if (!isElement(node)) return

    const item = node as HTMLElement
    if (isAdjustableElement(item, root) && !weakSet.has(item)) {
      newList.push(item)
      weakSet.add(item)
    }
  })

  return newList
}

const FULL_SCAN_BATCH_SIZE = 400
let cancelFullScan = false
let fullScanHandle: number | null = null

const scheduleFullScanTask = (task: () => void): number => {
  const idleCb = (window as any).requestIdleCallback
  if (typeof idleCb === 'function') {
    return idleCb(() => task())
  }
  return window.setTimeout(task, 16)
}

const clearFullScanTask = (): void => {
  if (fullScanHandle !== null) {
    const cancelIdle = (window as any).cancelIdleCallback
    if (typeof cancelIdle === 'function') {
      cancelIdle(fullScanHandle)
    } else {
      clearTimeout(fullScanHandle)
    }
    fullScanHandle = null
  }
}

function startFullScan(root: HTMLElement): void {
  // 防止死循环：如果正在更新，直接返回
  if (isUpdating) return

  cancelFullScan = true
  clearFullScanTask()
  cancelFullScan = false

  if (refreshTopOffset() <= 0) {
    restoreAllAdjustedNodes()
    return
  }

  isUpdating = true

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT)
  let current = walker.currentNode as Element | null

  const processBatch = () => {
    if (cancelFullScan) {
      isUpdating = false
      return
    }
    const batch: Element[] = []
    let count = 0
    while (current && count < FULL_SCAN_BATCH_SIZE) {
      batch.push(current)
      current = walker.nextNode() as Element | null
      count++
    }
    if (batch.length) {
      getFixedNodeList(batch).forEach(item => {
        updateNodeOffset(item)
      })
    }

    if (current && !cancelFullScan) {
      fullScanHandle = scheduleFullScanTask(processBatch)
    } else {
      fullScanHandle = null
      isUpdating = false
    }
  }

  processBatch()
}

/**
 * 防抖执行全量位置修正
 */
const debouncedFixedDomPosition = debounce(() => {
  checkBody().then(() => {
    if (!document.body) return
    refreshTopOffset()
    if (currentTopOffset <= 0) {
      restoreAllAdjustedNodes()
      return
    }
    startFullScan(document.body)
  })
}, 300)

let observer: MutationObserver | null = null
let hostClassObserver: MutationObserver | null = null
let hostResizeObserver: ResizeObserver | null = null

/**
 * 监听宿主 class/尺寸变化，随时刷新 offset
 */
function observeHostLayoutChange(): void {
  const host = getAsRoot()
  if (!host) {
    return
  }

  if (hostClassObserver) {
    hostClassObserver.disconnect()
    hostClassObserver = null
  }
  hostClassObserver = new MutationObserver(() => {
    refreshTopOffset()
    if (currentTopOffset <= 0) {
      restoreAllAdjustedNodes()
    } else {
      debouncedFixedDomPosition()
    }
  })
  hostClassObserver.observe(host, { attributes: true, attributeFilter: ['class'] })

  if (hostResizeObserver) {
    hostResizeObserver.disconnect()
    hostResizeObserver = null
  }
  if (typeof ResizeObserver !== 'undefined') {
    hostResizeObserver = new ResizeObserver(() => {
      refreshTopOffset()
      if (currentTopOffset <= 0) {
        restoreAllAdjustedNodes()
      } else {
        debouncedFixedDomPosition()
      }
    })
    hostResizeObserver.observe(host)
  }
}

/** 单次 mutation 内联扫描的元素上限，超出则退回防抖全量扫描 */
const ADDED_NODE_SCAN_LIMIT = 200

/**
 * 扫描新增节点的整棵子树（fixed 元素通常被包在容器里）。
 * 返回 false 表示超出预算，调用方应改为全量扫描。
 */
function scanAddedElement(rootEl: Element): boolean {
  const batch: Element[] = [rootEl]
  const walker = document.createTreeWalker(rootEl, NodeFilter.SHOW_ELEMENT)
  let node = walker.nextNode()
  while (node) {
    if (batch.length >= ADDED_NODE_SCAN_LIMIT) {
      return false
    }
    batch.push(node as Element)
    node = walker.nextNode()
  }
  getFixedNodeList(batch).forEach(item => updateNodeOffset(item))
  return true
}

function mutationObserver() {
  const targetNode = document.body
  const config = {
    childList: true,
    subtree: true
    // 不监听 attributes，减少 90% 的无效触发
  }

  const callback: MutationCallback = function (mutationsList) {
    const root = getAsRoot()
    if (!root) return

    // offset 由宿主观察器维护，这里不再每次 mutation 都读一次布局
    if (currentTopOffset <= 0) {
      restoreAllAdjustedNodes()
      return
    }

    const changedNodes: Node[] = []
    let needsFullScan = false

    for (const mutation of mutationsList) {
      if (mutation.addedNodes.length > 50) {
        // 如果一次性添加了大量节点（如首屏加载），执行全量扫描（防抖）
        needsFullScan = true
        break
      }
      mutation.addedNodes.forEach(node => changedNodes.push(node))
    }

    if (needsFullScan) {
      debouncedFixedDomPosition()
      return
    }
    if (!changedNodes.length) return

    // 新增节点可能是容器（fixed 元素在更深的层级），需要扫子树
    let overflow = false
    for (const node of changedNodes) {
      if (!isElement(node)) continue
      if (!scanAddedElement(node as Element)) {
        overflow = true
        break
      }
    }
    if (overflow) {
      debouncedFixedDomPosition()
    }
  }

  observer = new MutationObserver(callback)
  observer.observe(targetNode, config)
}

/**
 * 初始化特殊样式适配（处理 fixed 遮挡等问题）
 */
export function initSpecialStyle(): void {
  // 幂等：SPA 重新挂载或 HMR 可能重复初始化，先回收上一轮
  disconnectSpecialStyle()
  debouncedFixedDomPosition()
  mutationObserver()
  observeHostLayoutChange()
}

/**
 * 停止监听（用于性能回收）
 */
export function disconnectSpecialStyle(): void {
  cancelFullScan = true
  clearFullScanTask()
  restoreAllAdjustedNodes()

  // 重置标志位，确保下次调用时状态正确
  isRestoring = false
  isUpdating = false

  if (observer) {
    observer.disconnect()
    observer = null
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
