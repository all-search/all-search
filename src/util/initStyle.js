import { unref } from 'vue'
import {
  checkBody
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
  checkBody().then(() => {
    initBodyClass(modeVal, site, remove)
  })
}
