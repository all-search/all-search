import { withHookAfter } from './hook'

/**
 * 监听路由变化
 * @param cb 回调函数
 */
export const routerChange = (cb: () => void): void => {
  history.pushState = withHookAfter(history.pushState.bind(history), cb)
  history.replaceState = withHookAfter(history.replaceState.bind(history), cb)
  
  window.addEventListener('popstate', cb)
  // youtube 无法触发 history 事件，特殊逻辑
  window.addEventListener('yt-navigate-finish', cb)
  window.addEventListener('hashchange', cb)
}
