// @ts-ignore
import { defineBackground, browser } from '#imports'

/**
 * 后台脚本：目前只负责响应内容脚本的“打开设置页”请求。
 * 内容脚本无法直接跳转 chrome-extension://（会被浏览器拦截），
 * 因此统一由后台通过 tabs.create 打开。
 */
export default defineBackground(() => {
  browser.runtime.onMessage.addListener((message: any) => {
    if (message && message.type === 'all-search:open-options') {
      const route = typeof message.route === 'string' ? message.route : '/config/sites'
      browser.tabs.create({ url: browser.runtime.getURL(`options.html#${route}`) })
    }
  })
})
