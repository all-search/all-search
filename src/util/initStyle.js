import { unref } from 'vue'
import {
  addStyleContent,
  addStyleResource,
  removeNode,
  version
} from './index'
import {
  withHookBefore
} from './hook'

export const initBodyClass = (mode, currentSite) => {
  const body = document.body
  body.classList.remove('body-vertical', 'body-horizontal')
  if (!currentSite.invisible) {
    if (mode) {
      const newValue = `body-${mode}`
      body.classList.add(newValue)
    }
  }
}

export const addCustomStyle = (mode, currentSite) => {
  removeNode('.as-custom-style')
  if (currentSite.invisible) {
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
      return !(e.classList.contains('as-icon') || e.classList.contains('as-style'))
    }
    return true
  })
  Node.prototype.__as_hooks__ = true
}

export const initStyle = function () {
  addStyleResource('as-icon', `https://cdn.jsdelivr.net/npm/all-search@${version}/src/assets/iconfont.css`)
}

export const addStyleForCurrentSite = function (mode, site) {
  const modeVal = unref(mode)
  addCustomStyle(modeVal, site)
  initBodyClass(modeVal, site)
}
