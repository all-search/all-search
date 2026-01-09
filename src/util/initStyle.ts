import {
  getAsRoot,
  removeNode,
  addStyleContent
} from './dom'
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
 * 同步宿主页面布局
 * 通过给 Shadow DOM 宿主元素添加类名，配合 global.scss 里的兄弟选择器推开 body
 */
export const syncHostLayout = function (mode: string, direction: string, isVisible: boolean): void {
  const el = getAsRoot()
  if (!el || !el.classList) return

  // 1. 同步显示/隐藏状态类
  el.classList.toggle('as-host-show', isVisible)
  el.classList.toggle('as-host-hide', !isVisible)

  // 2. 清理和同步位置类
  const positionClasses = ['as-host-top', 'as-host-bottom', 'as-host-left', 'as-host-right']
  el.classList.remove(...positionClasses)
  el.classList.add(`as-host-${mode}`)

  // 3. 同步方向类
  el.classList.remove('as-host-horizontal', 'as-host-vertical')
  el.classList.add(`as-host-${direction}`)
}
