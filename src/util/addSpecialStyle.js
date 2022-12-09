import { getAsRoot } from './index'

function delAsDataSet (item) {
  if (item.dataset) {
    delete item.dataset.asMarginTop
    delete item.dataset.asTransform
    delete item.dataset.asBorderTop
  }
}

function getParent (el) {
  let current = el
  let go = true
  while (go && current.offsetParent) {
    if (current.offsetParent.tagName === 'BODY') {
      go = false
    } else {
      current = current.offsetParent
    }
  }
  const style = window.getComputedStyle(current)
  if (style.position !== 'fixed') {
    delAsDataSet(current)
    return null
  }
  return current
}

function getRealFixedNode (item) {
  if (!item || !isElement(item)) {
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

function isElement (obj) {
  return obj
    && obj instanceof Element
    && obj.nodeType === 1
    && obj.tagName !== undefined
}

function changeStyle (item) {
  if (!item || !isElement(item)) {
    return
  }
  const style = window.getComputedStyle(item)
  const styleMap = item.computedStyleMap && item.computedStyleMap()
  const top = styleMap ? styleMap.get('top').value : null
  if (top === 'auto') {
    return
  } else if (style.top === '0px') {
    item.style.top = '0px'
  }
  if (
    item.dataset.asMarginTop ||
    item.dataset.asTransform ||
    item.dataset.asBorderTop
  ) {
    return
  }
  const marginTop = style.marginTop
  const transform = style.transform
  const transition = style.transition
  if (marginTop === '0px' && !transition.includes('margin')) {
    item.dataset.asHasSet = 'asMarginTop'
    item.dataset.asMarginTop = '1'
  } else if (transform === 'none') {
    item.dataset.asHasSet = 'asTransform'
    item.dataset.asTransform = '1'
  } else {
    item.dataset.asHasSet = 'asBorderTop'
    item.dataset.asBorderTop = '1'
  }
}

let isSelfChange = false

function getFixedNodeList (list, deep = false) {
  const weakSet = new WeakSet()
  const newList = []
  const nodes = list
    .filter(item => item)
    .map(item => {
      delAsDataSet(item)
      if (deep) {
        Array.from(item.querySelectorAll('*'))
          .map(item => {
            delAsDataSet(item)
            return getRealFixedNode(item)
          })
          .filter(item => item)
          .forEach(item => {
            if (!weakSet.has(item)) {
              newList.push(item)
              weakSet.add(item)
            }
          })
      }
      return getRealFixedNode(item)
    })
    .filter(item => item)
  nodes.forEach(item => {
    if (!weakSet.has(item)) {
      newList.push(item)
      weakSet.add(item)
    }
  })
  return newList
}

function fixedDomPosition () {
  const nodes = Array.from(document.body.querySelectorAll('*'))
    .filter(item => item.tagName !== 'STYLE')
  getFixedNodeList(nodes).forEach(item => {
    changeStyle(item)
  })
}

function mutationObserver () {
  // 选择需要观察变动的节点
  const targetNode = document.body
  // 观察器的配置（需要观察什么变动）
  const config = {
    attributes: true,
    childList: true,
    subtree: true,
    attributeFilter: ['style', 'class']
  }
  // 当观察到变动时执行的回调函数
  const callback = function (mutationsList) {
    if (isSelfChange) {
      isSelfChange = false
    } else {
      isSelfChange = true
      const root = getAsRoot()
      const filterNodes = mutationsList
        .filter(mutation =>
          (mutation.type === 'attributes' && ['style', 'class', 'id'].includes(mutation.attributeName))
          || (mutation.type === 'childList' && mutation.addedNodes.length)
          && !['BODY', 'STYLE'].includes(mutation.target.tagName)
          && !root.contains(mutation.target)
        )
        .map(mutation => mutation.target)
      getFixedNodeList(filterNodes, true).forEach(item => {
        changeStyle(item)
      })
    }
  }
  // 创建一个观察器实例并传入回调函数
  const observer = new MutationObserver(callback)
  // 以上述配置开始观察目标节点
  observer.observe(targetNode, config)
  // 之后，可停止观察
  //   observer.disconnect();
}

export function initSpecialStyle () {
  fixedDomPosition()
  mutationObserver()
}
