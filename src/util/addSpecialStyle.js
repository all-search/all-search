function delAsDataSet (item) {
  if (item.dataset) {
    delete item.dataset.asMarginTop
    delete item.dataset.asTransform
    delete item.dataset.asBorderTop
  }
}

function getParent (el) {
  let current = el
  while (current.offsetParent) {
    if (current.offsetParent.tagName === 'BODY') {
      return current
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
  const style = window.getComputedStyle(item)
  const position = style.getPropertyValue('position')
  const display = style.getPropertyValue('display')
  if (display === 'none') {
    return null
  } else if (position === 'fixed') {
    return item
  } else if (position === 'absolute') {
    return getParent(item)
  } else {
    return null
  }
}

function changeStyle (item) {
  const style = window.getComputedStyle(item)
  const styleMap = item.computedStyleMap()
  const top = styleMap ? styleMap.get('top').value : null
  if (top === 'auto') {
    return
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
  if (marginTop === '0px') {
    item.dataset.asMarginTop = '1'
  } else if (transform === 'none') {
    item.dataset.asTransform = '1'
  } else {
    item.dataset.asBorderTop = '1'
  }
  item.dataset.asHasSet = (parseInt(item.dataset.asHasSet) || 0) + 1
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
        const nodes = Array.from(item.querySelectorAll('*'))
        nodes
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
  const targetNode = document
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
      const filterNodes = mutationsList
        .filter(mutation =>
          (mutation.type === 'attributes' && ['style', 'class', 'id'].includes(mutation.attributeName))
          || (mutation.type === 'childList' && mutation.addedNodes.length)
          && !['BODY', 'STYLE'].includes(mutation.target.tagName)
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
