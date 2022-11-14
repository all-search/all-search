import { withHookAfter } from './hook'

export const routerChange = cb => {
  history.pushState = withHookAfter(history.pushState, cb)
  history.replaceState = withHookAfter(history.replaceState, cb)
// youtube 无法触发history事件，特殊逻辑
  window.addEventListener('yt-navigate-finish', cb)
  window.addEventListener('hashchange',cb)
  console.log('routerChange')
}
