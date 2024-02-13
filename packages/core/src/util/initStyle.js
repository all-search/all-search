import {
  getAsRoot,
  removeNode,
  addStyleContent
} from './index'
import {
  withHookBefore
} from './hook'

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

export const changeBodyStyle = function (mode, remove = true) {
  const el = getAsRoot()
  el.classList.remove('body-vertical', 'body-horizontal')
  if (!remove) {
    el.classList.add(`body-${mode}`)
  }
}
