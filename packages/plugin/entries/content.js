import App from '../../../src/index.vue'
import { createApp } from 'vue'
import { defineContentScript } from 'wxt/sandbox'
import { createIntegratedUi } from 'wxt/client'

export default defineContentScript({
  matches: ['<all_urls>'],
  // cssInjectionMode: 'ui',

  async main (ctx) {
    let anchor = document.getElementById('all-search')
    if (!anchor) {
      anchor = document.createElement('div')
      anchor.id = 'all-search'
      document.documentElement.insertBefore(anchor, document.body)
    }
    const ui = createIntegratedUi(ctx, {
      position: 'inline',
      anchor: anchor,
      onMount: (container) => {
        // Create the app and mount it to the UI container
        const app = createApp(App)
        app.mount(container)
        return app
      },
      onRemove: (app) => {
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
