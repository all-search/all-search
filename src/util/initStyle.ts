import {
  getAsRoot,
  removeNode,
  addStyleContent
} from './index'
import {
  withHookBefore
} from './hook'
import { Site } from '../types/site'

/**
 * 添加自定义样式
 */
export const addCustomStyle = (mode: string, currentSite: Site, remove?: boolean): void => {
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

/**
 * 保护样式不被页面脚本移除
 */
export const protectStyle = function (): void {
  interface HookedNode extends Node {
    __as_hooks__?: boolean;
  }
  const nodeProto = Node.prototype as HookedNode
  if (nodeProto.__as_hooks__) {
    return
  }
  const originalRemoveChild = nodeProto.removeChild
  nodeProto.removeChild = withHookBefore(originalRemoveChild, (e: Node) => {
    if (e && (e as HTMLElement).tagName === 'STYLE') {
      const el = e as HTMLElement
      return !(
        el.classList.contains('as-icon') ||
        el.classList.contains('as-style') ||
        el.classList.contains('elPopover') ||
        el.classList.contains('elScrollbar')
      )
    }
    return true
  }) as any
  nodeProto.__as_hooks__ = true
}

/**
 * 切换 Body 样式
 */
export const changeBodyStyle = function (mode: string, direction: string, remove: boolean = true): void {
  const el = getAsRoot()
  if (!el) return
  el.classList.remove('body-top', 'body-bottom', 'body-left', 'body-right')
  el.classList.remove('body-vertical', 'body-horizontal')
  if (!remove) {
    el.classList.add(`body-${mode}`, `body-${direction}`)
  }
}
