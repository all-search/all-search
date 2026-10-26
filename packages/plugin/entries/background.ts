// @ts-ignore
import { defineBackground, browser } from '#imports'

/**
 * 后台脚本：
 * - 响应内容脚本的“打开设置页”请求（内容脚本不能直接跳 chrome-extension://）
 * - 响应“打开一个 / 多个标签页”请求（内容脚本里的 window.open 会被弹窗拦截器限制，
 *   在无头或被拦截的环境里还会停在 about:blank）
 *
 * 消息用 `sendResponse` + `return true` 回复，不用「返回 Promise」：
 * Chrome 只有 148+ 才认监听器返回的 Promise，更早的版本会按「没有响应」关掉端口，
 * 发送端的 sendMessage 直接 reject（控制台一条 unhandled rejection）。
 */

/** 串行打开：MV3 的 worker 在监听器返回后可能被回收，一股脑发起 N 个 create 会丢掉后面的 */
async function openTabs (urls: string[], active: boolean): Promise<void> {
  for (const url of urls) {
    await browser.tabs.create({ url, active }).catch(() => {})
  }
}

export default defineBackground(() => {
  browser.runtime.onMessage.addListener((message: any, _sender: any, sendResponse: (res?: any) => void) => {
    if (!message) return

    if (message.type === 'all-search:open-options') {
      const route = typeof message.route === 'string' ? message.route : '/config/sites'
      browser.tabs.create({ url: browser.runtime.getURL(`options.html#${route}`) }).catch(() => {})
      // 回一句，否则发送端的 sendMessage 会因为「端口没响应」而 reject
      sendResponse({ ok: true })
      return
    }

    if (message.type === 'all-search:open-tabs' && Array.isArray(message.urls)) {
      const urls = message.urls.filter((url: unknown) => typeof url === 'string' && url) as string[]
      // 单个链接默认切过去（和 window.open 的观感一致），批量打开则留在后台
      const active = message.active !== false
      openTabs(urls, active).then(() => sendResponse({ ok: true, count: urls.length }))
      // 告诉 Chrome「我会异步回复」，端口保持打开
      return true
    }
  })
})
