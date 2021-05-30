import { siteInfo } from '../config/loadList'
import { addStyleContent, addStyleResource, getSession, removeNode, version } from './index'
import { withHookBefore, withHookAfter } from './hook'

const isPro = process.env.NODE_ENV === 'production'

let currentSite = siteInfo()

const session = getSession('mode')

const getMode = val => {
  if (val !== 'vertical' && val !== 'horizontal') {
    return 'horizontal'
  }
  return val
}

const mode = getMode(session)

const map = new Map([
  ['body-horizontal', 'body-vertical'],
  ['body-vertical', 'body-horizontal']
])

export const initBodyClass = (value = mode) => {
  const currentSite = siteInfo()
  const body = document.body
  if (currentSite.invisible || currentSite.disabled) {
    body.classList.remove('body-vertical', 'body-horizontal')
  } else if (value) {
    const newValue = `body-${value}`
    const oldValue = map.get(newValue)
    body.classList.toggle(oldValue, false)
    body.classList.toggle(newValue, true)
  }
}

export const addCustomStyle = (value = mode) => {
  const currentSite = siteInfo()
  if (currentSite.invisible || currentSite.disabled) {
    removeNode('.as-custom-style')
  } else if (currentSite.style) {
    let styleContent = ''
    if (currentSite.style[1] && value === 'horizontal') {
      styleContent = currentSite.style[1]
    } else if (currentSite.style[2] && value === 'vertical') {
      styleContent = currentSite.style[2]
    }
    if (styleContent) {
      addStyleContent(styleContent, 'as-custom-style', undefined, true)
    }
  }
}

const addAsStyle = function () {
  if (isPro) {
    currentSite = siteInfo()
    if (currentSite.invisible || currentSite.disabled) {
      removeNode('.as-style')
    } else {
      addStyleResource('as-style', `https://cdn.jsdelivr.net/npm/all-search@${version}/build/as-style.css`)
    }
  }
}

const protectStyle = function () {
  Node.prototype.removeChild = withHookBefore(Node.prototype.removeChild, (e) => {
    if (e && e.tagName === 'STYLE') {
      return !(e.classList.contains('as-icon') || e.classList.contains('as-style'))
    }
    return true
  })
}



const routerChange = cb => {
  history.pushState = withHookAfter(history.pushState, cb)
  history.replaceState = withHookAfter(history.replaceState, cb)
// youtube 无法触发history事件，特殊逻辑
  window.addEventListener('yt-navigate-finish', cb)
}

export const initStyle = function () {
  protectStyle()
  addCustomStyle()
  initBodyClass()
  addStyleResource('as-icon', `https://cdn.jsdelivr.net/npm/all-search/src/assets/iconfont.css`)
  addAsStyle()
  routerChange(() => {
    currentSite = siteInfo()
    addCustomStyle()
    initBodyClass()
    addAsStyle()
  })
}
