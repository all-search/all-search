import { unref } from 'vue'
import {
  addStyleContent,
  removeNode
} from './index'
import {
  withHookBefore
} from './hook'

export const initBodyClass = (mode, currentSite, remove = false) => {
  const body = document.body
  body.classList.remove('body-vertical', 'body-horizontal')
  if (!remove && !currentSite.invisible && mode) {
    body.classList.add(`body-${mode}`)
  }
}

export const addCustomStyle = (mode, currentSite, remove) => {
  removeNode('.as-custom-style')
  if (currentSite.invisible || remove) {
    return
  }
  if (currentSite.style) {
    let styleContent = ''
    if (currentSite.style[1] && mode === 'horizontal') {
      styleContent = currentSite.style[1]
    } else if (currentSite.style[2] && mode === 'vertical') {
      styleContent = currentSite.style[2]
    }
    if (styleContent) {
      addStyleContent(styleContent, 'as-custom-style')
    }
  }
}

export const protectStyle = function () {
  if (Node.prototype.__as_hooks__) {
    return
  }
  Node.prototype.removeChild = withHookBefore(Node.prototype.removeChild, (e) => {
    if (e && e.tagName === 'STYLE') {
      return !(
        e.classList.contains('as-icon') ||
        e.classList.contains('as-style') ||
        e.classList.contains('elPopover') ||
        e.classList.contains('elScrollbar')
      )
    }
    return true
  })
  Node.prototype.__as_hooks__ = true
}

export const addStyleForCurrentSite = function (mode, site, remove = false) {
  const modeVal = unref(mode)
  // addCustomStyle(modeVal, site, remove)
  initBodyClass(modeVal, site, remove)
  setTimeout(() => {
    addSpecialStyle()
  })
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
  const transitionDuration = style.transitionDuration
  let top = style.top
  if (top.includes('px')) {
    top = parseInt(top.replace('px', ''))
  }
  const top2 = styleMap ? styleMap.get('top').value : null
  /*  if (item.dataset.hasSet) {
      return
    }*/
  if (top !== top2) {
    return
  }
  if (transitionDuration !== '0s') {
    item.addEventListener('transitionend', setTop)
  } else {
    setTop()
  }

  function setTop () {
    const style = window.getComputedStyle(item)
    const marginTop = style.marginTop
    if (item.dataset.asMarginTop || item.dataset.asTransform) {
      return
    }
    if (marginTop === '0px') {
      item.dataset.asMarginTop = '30px'
    } else {
      item.dataset.asTransform = '30px'
    }
  }

  /*if (item.dataset.hasSet) {
    item.dataset.hasSet = Number(item.dataset.hasSet) + 1
  } else {
    item.dataset.hasSet = 1
  }*/
}

let isSelfChange = false

function getFixedNodeList (list) {
  const weakSet = new WeakSet()
  const newList = []
  const nodes = list
    .filter(item => item)
    .map(item => getRealFixedNode(item))
    .filter(item => item)
  nodes.forEach(item => {
    if (!weakSet.has(item)) {
      newList.push(item)
      weakSet.add(item)
    }
  })
  return newList
}

function addSpecialStyle () {
  console.log('addSpecialStyle')
  const nodes = Array.from(document.body.querySelectorAll('*'))
    .filter(item => item.tagName !== 'STYLE')
  getFixedNodeList(nodes).forEach(item => {
    changeStyle(item)
  })
  mutationObserver()
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
          {
            return mutation.type === 'attributes'
              && ['style', 'class'].includes(mutation.attributeName)
              && !['BODY', 'STYLE'].includes(mutation.target.tagName)
          }
        )
        .map(mutation => getRealFixedNode(mutation.target))
      getFixedNodeList(filterNodes).forEach(item => {
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
