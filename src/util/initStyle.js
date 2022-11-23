import { unref } from 'vue'
import {
  getAsRoot
} from './index'
import {
  withHookBefore
} from './hook'

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

export const changeBodyStyle = function (modeRef, remove = true) {
  const mode = unref(modeRef)
  const el = getAsRoot()
  el.classList.remove('body-vertical', 'body-horizontal')
  if (!remove) {
    el.classList.add(`body-${mode}`)
  }
}
