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

export const initStyle = function () {

}

export const addStyleForCurrentSite = function (mode, site, remove = false) {
  const modeVal = unref(mode)
  // addCustomStyle(modeVal, site, remove)
  addSpecialStyle()
  initBodyClass(modeVal, site, remove)
}

function modifyPosition (item) {
  const style = window.getComputedStyle(item)
  const display = style.getPropertyValue('display')
  if (display === 'none') {
    return
  }
  const position = style.getPropertyValue('position')
  if (position === 'fixed') {
    changeTop(item)
  } else if (position === 'absolute') {
    let parent = item.offsetParent
    let target = item
    while (parent && parent.tagName !== 'BODY') {
      target = parent
      const offsetParent = parent.offsetParent
      if (offsetParent && offsetParent.tagName !== 'BODY') {
        parent = offsetParent
      } else {
        parent = null
      }
    }
    changeTop(target)
  }
}

function getTop (el) {
  const style = window.getComputedStyle(el)
  return style.getPropertyValue('top') || '0px'
}

function changeTop (item) {
  const top = getTop(item)
  if (top.includes('px')) {
    const num = parseInt(top.replace('px', '')) || 0
    item.style.top = `${num + 30}px`
  }
}

const fixedNodeMap = new WeakMap()

let isSelfChange = false

function addSpecialStyle () {
  console.log('addSpecialStyle')
  document.body.querySelectorAll('*').forEach(item => {
    modifyPosition(item)
  })
  // 选择需要观察变动的节点
  const targetNode = document.body
  // 观察器的配置（需要观察什么变动）
  const config = {
    attributes: true,
    childList: true,
    subtree: true,
    attributeOldValue: true,
    attributeFilter: ['style', 'class']
  }
  // 当观察到变动时执行的回调函数
  const callback = function (mutationsList) {
    if (isSelfChange) {
      isSelfChange = false
    } else {
      isSelfChange = true
      setTimeout(()=> {
        for (let mutation of mutationsList) {
          if (mutation.type === 'attributes') {
            const item = mutation.target
            if (!['BODY', 'STYLE'].includes(item.tagName)) {
              modifyPosition(item)
            }
          }
        }
      })
    }
    console.log(isSelfChange)
  }
  // 创建一个观察器实例并传入回调函数
  const observer = new MutationObserver(callback)
  // 以上述配置开始观察目标节点
  observer.observe(targetNode, config)
  // 之后，可停止观察
  //   observer.disconnect();
}
