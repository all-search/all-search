import { checkBody, getAsRoot, debounce } from './index'

function delAsDataSet (item: any) {
  if (item && item.dataset) {
    delete item.dataset.asMarginTop
    delete item.dataset.asTransform
    delete item.dataset.asBorderTop
  }
}

/**
 * 获取真正的 fixed 祖先节点
 */
function getParent (el: HTMLElement): HTMLElement | null {
  let current: HTMLElement | null = el
  let go = true
  while (go && current && (current as any).offsetParent) {
    if ((current as any).offsetParent.tagName === 'BODY') {
      go = false
    } else {
      current = (current as any).offsetParent
    }
  }
  if (!current) return null
  const style = window.getComputedStyle(current)
  if (style.position !== 'fixed') {
    return null
  }
  return current
}

function getRealFixedNode (item: Element): HTMLElement | null {
  if (!item || !(item instanceof HTMLElement)) {
    return null
  }
  const style = window.getComputedStyle(item)
  if (style.display === 'none') {
    return null
  } else if (style.position === 'fixed') {
    return item
  } else if (style.position === 'absolute') {
    return getParent(item)
  } else {
    return null
  }
}

function isElement (obj: any): obj is Element {
  return obj
    && obj instanceof Element
    && obj.nodeType === 1
    && obj.tagName !== undefined
}

function changeStyle (item: HTMLElement): void {
  if (!item || !isElement(item)) {
    return
  }
  const style = window.getComputedStyle(item)
  const el = item as any
  const styleMap = el.computedStyleMap && el.computedStyleMap()
  const top = styleMap ? styleMap.get('top')?.value : null
  
  if (top === 'auto') {
    return
  } else if (style.top === '0px') {
    item.style.top = '0px'
  }

  const ds = item.dataset as any
  if (
    ds.asMarginTop ||
    ds.asTransform ||
    ds.asBorderTop
  ) {
    return
  }
  
  const marginTop = style.marginTop
  const transform = style.transform
  const transition = style.transition
  
  if (marginTop === '0px' && !transition.includes('margin')) {
    ds.asHasSet = 'asMarginTop'
    ds.asMarginTop = '1'
  } else if (transform === 'none') {
    ds.asHasSet = 'asTransform'
    ds.asTransform = '1'
  } else {
    ds.asHasSet = 'asBorderTop'
    ds.asBorderTop = '1'
  }
}

function getFixedNodeList (list: (Node | Element | null)[]): HTMLElement[] {
  const weakSet = new WeakSet()
  const newList: HTMLElement[] = []
  
  list.forEach(node => {
    if (!isElement(node)) return
    
    const item = node as Element
    delAsDataSet(item)
    
    const fixedNode = getRealFixedNode(item)
    if (fixedNode && !weakSet.has(fixedNode)) {
      newList.push(fixedNode)
      weakSet.add(fixedNode)
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

function startFullScan (root: HTMLElement): void {
  cancelFullScan = true
  clearFullScanTask()
  cancelFullScan = false

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT)
  let current = walker.currentNode as Element | null

  const processBatch = () => {
    if (cancelFullScan) {
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
        changeStyle(item)
      })
    }

    if (current && !cancelFullScan) {
      fullScanHandle = scheduleFullScanTask(processBatch)
    } else {
      fullScanHandle = null
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
    startFullScan(document.body)
  })
}, 300)

let observer: MutationObserver | null = null

function mutationObserver () {
  const targetNode = document.body
  const config = {
    attributes: true,
    childList: true,
    subtree: true,
    attributeFilter: ['style', 'class']
  }

  const callback: MutationCallback = function (mutationsList) {
    const root = getAsRoot()
    if (!root) return

    // 收集变动的节点
    const changedNodes: Node[] = []
    let needsFullScan = false

    for (const mutation of mutationsList) {
      const target = mutation.target as HTMLElement
      // 忽略我们自己的组件
      if (['BODY', 'STYLE', 'SCRIPT'].includes(target.tagName) || root.contains(target)) {
        continue
      }

      if (mutation.type === 'childList') {
        if (mutation.addedNodes.length > 50) {
          // 如果一次性添加了大量节点（如首屏加载），执行全量扫描（防抖）
          needsFullScan = true
          break
        }
        mutation.addedNodes.forEach(node => changedNodes.push(node))
      } else if (mutation.type === 'attributes') {
        changedNodes.push(mutation.target)
      }
    }

    if (needsFullScan) {
      debouncedFixedDomPosition()
    } else if (changedNodes.length > 0) {
      getFixedNodeList(changedNodes).forEach(item => {
        changeStyle(item)
      })
    }
  }

  observer = new MutationObserver(callback)
  observer.observe(targetNode, config)
}

/**
 * 初始化特殊样式适配（处理 fixed 遮挡等问题）
 */
export function initSpecialStyle (): void {
  debouncedFixedDomPosition()
  mutationObserver()
}

/**
 * 停止监听（用于性能回收）
 */
export function disconnectSpecialStyle (): void {
  cancelFullScan = true
  clearFullScanTask()
  if (observer) {
    observer.disconnect()
    observer = null
  }
}
