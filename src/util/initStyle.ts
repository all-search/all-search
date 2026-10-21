import {
  getAsRoot,
  removeNode,
  addStyleContent
} from './dom'
import { Site } from '../types/site'

/**
 * 添加站点自定义样式
 *
 * 两类来源：
 * 1. `loadList` 里手写的 `style`，约定 1=横向、2=纵向；
 * 2. `pnpm style:scan` 扫描生成的 `generatedStyle`，按顶部布局实测，只在顶部注入。
 */
export const addCustomStyle = (mode: string, currentSite: Site, remove?: boolean): void => {
  removeNode('.as-custom-style')
  if (currentSite.invisible || remove) {
    return
  }

  const isHorizontal = mode === 'top' || mode === 'bottom'
  const parts: string[] = []

  const custom = isHorizontal ? currentSite.style?.[1] : currentSite.style?.[2]
  if (custom) {
    parts.push(custom)
  }
  if (mode === 'top' && currentSite.generatedStyle) {
    parts.push(currentSite.generatedStyle)
  }

  if (parts.length) {
    // 必须注入宿主页面的 head：影子根里的样式只作用于影子树，
    // 管不到站点自己的 fixed 头部（历史上的手写样式也是栽在这里）
    addStyleContent(parts.join('\n'), 'as-custom-style', 'head')
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
