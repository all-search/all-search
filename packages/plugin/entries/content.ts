import App from '@src/index.vue'
import { createApp, App as VueApp } from 'vue'
// @ts-ignore
import { defineContentScript, createIntegratedUi } from '#imports'
import { initAppAnchor } from '@src/util'
// @ts-ignore
import type { ContentScriptContext } from 'wxt/client'

export default defineContentScript({
  matches: ['<all_urls>'],

  async main (ctx: ContentScriptContext) {
    // 获取或创建挂载点
    const anchor = await initAppAnchor()

    const ui = createIntegratedUi(ctx, {
      position: 'inline',
      anchor: anchor,
      onMount: (container: HTMLElement) => {
        // Create the app and mount it to the UI container
        const app = createApp(App)
        app.mount(container)
        return app
      },
      onRemove: (app: VueApp | undefined) => {
        // Unmount the app when the UI is removed
        app?.unmount()
      }
    })

    // Call mount to add the UI to the DOM
    ui.mount()

    // Re-mount when page changes
    ctx.addEventListener(window, 'wxt:locationchange', () => {
      ui.mount()
    })
  }
})
