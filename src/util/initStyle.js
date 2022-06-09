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
  if (remove) {
    return
  }
  if (!currentSite.invisible && mode) {
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
  addCustomStyle(modeVal, site, remove)
  initBodyClass(modeVal, site, remove)
}
