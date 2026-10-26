// @ts-ignore
import { defineBackground, browser } from '#imports'

/**
 * 后台脚本：
 * - 响应内容脚本的“打开设置页”请求（内容脚本不能直接跳 chrome-extension://）
 * - 响应“一次打开多个标签页”请求（内容脚本里的 window.open 会被弹窗拦截器限制）
 */
export default defineBackground(() => {
  browser.runtime.onMessage.addListener((message: any) => {
    if (!message) return

    if (message.type === 'all-search:open-options') {
      const route = typeof message.route === 'string' ? message.route : '/config/sites'
      browser.tabs.create({ url: browser.runtime.getURL(`options.html#${route}`) })
      return
    }

    if (message.type === 'all-search:open-tabs' && Array.isArray(message.urls)) {
      const urls = message.urls.filter((url: unknown) => typeof url === 'string' && url) as string[]
      // 串行 await 并返回 Promise：MV3 的服务 worker 在监听器返回后可能被回收，
      // 一股脑发起 N 个 create 会丢掉没来得及完成的那些。
      return urls
        .reduce(
          (prev, url) => prev.then(() => browser.tabs.create({ url, active: false }).catch(() => {})),
          Promise.resolve()
        )
        .then(() => ({ ok: true, count: urls.length }))
    }
  })
})
