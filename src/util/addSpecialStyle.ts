import { checkBody, getAsRoot } from './index'

function delAsDataSet (item: any) {
  if (item && item.dataset) {
    delete item.dataset.asMarginTop
    delete item.dataset.asTransform
    delete item.dataset.asBorderTop
  }
}

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

function getFixedNodeList (list: (Element | null)[], deep = false): HTMLElement[] {
  const weakSet = new WeakSet()
  const newList: HTMLElement[] = []
  
  const nodes = list
    .filter((item): item is Element => !!item)
    .map(item => {
      delAsDataSet(item)
      if (deep) {
        Array.from(item.querySelectorAll('*'))
          .map(child => {
            delAsDataSet(child)
            return getRealFixedNode(child)
          })
          .filter((child): child is HTMLElement => !!child)
          .forEach(child => {
            if (!weakSet.has(child)) {
              newList.push(child)
              weakSet.add(child)
            }
          })
      }
      return getRealFixedNode(item)
    })
    .filter((item): item is HTMLElement => !!item)

  nodes.forEach(item => {
    if (!weakSet.has(item)) {
      newList.push(item)
      weakSet.add(item)
    }
  })
  
  return newList
}

function fixedDomPosition () {
  checkBody().then(() => {
    if (!document.body) return
    const nodes = Array.from(document.body.querySelectorAll('*'))
      .filter(item => item.tagName !== 'STYLE')
    getFixedNodeList(nodes).forEach(item => {
      changeStyle(item)
    })
  })
}

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

    const filterNodes = mutationsList
      .filter(mutation => {
        const target = mutation.target as HTMLElement
        if (['BODY', 'STYLE'].includes(target.tagName) || root.contains(target)) {
          return false
        } else if (mutation.type === 'attributes') {
          return ['style', 'class', 'id'].includes(mutation.attributeName || '')
        } else if (mutation.type === 'childList') {
          return mutation.addedNodes.length > 0
        }
        return false
      })
      .map(mutation => mutation.target as Element)

    getFixedNodeList(filterNodes, true).forEach(item => {
      changeStyle(item)
    })
  }

  const observer = new MutationObserver(callback)
  observer.observe(targetNode, config)
}

/**
 * 初始化特殊样式适配（处理 fixed 遮挡等问题）
 */
export function initSpecialStyle (): void {
  fixedDomPosition()
  mutationObserver()
}
