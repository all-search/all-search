import { siteInfo } from '../config/loadList'
import { addStyleContent, addStyleResource, getSession, removeNode, version } from './index'
import { withHookAfter, withHookBefore } from './hook'

// const isPro = process.env.NODE_ENV === 'production'

let currentSite = siteInfo()

const session = getSession('mode')

const getMode = val => {
  if (val !== 'vertical' && val !== 'horizontal') {
    return 'horizontal'
  }
  return val
}

const mode = getMode(session)

export const initBodyClass = (value = mode) => {
  currentSite = siteInfo()
  const body = document.body
  body.classList.remove('body-vertical', 'body-horizontal')
  if (value) {
    const newValue = `body-${value}`
    body.classList.add(newValue)
  }
}

export const addCustomStyle = (value = mode) => {
  currentSite = siteInfo()
  removeNode('.as-custom-style')
  if (currentSite.style) {
    let styleContent = ''
    if (currentSite.style[1] && value === 'horizontal') {
      styleContent = currentSite.style[1]
    } else if (currentSite.style[2] && value === 'vertical') {
      styleContent = currentSite.style[2]
    }
    if (styleContent) {
      addStyleContent(styleContent, 'as-custom-style')
    }
  }
}

export const toggleCustomStyle = (open = true) => {
  if (open) {
    addCustomStyle()
  } else {
    removeNode('.as-custom-style')
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
  addStyleResource('as-icon', `https://cdn.jsdelivr.net/npm/all-search@${version}/src/assets/iconfont.css`)
  routerChange(() => {
    currentSite = siteInfo()
    addCustomStyle()
    initBodyClass()
  })
}
