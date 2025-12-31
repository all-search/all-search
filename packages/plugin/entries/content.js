import App from '../../../src/index.vue'
import { createApp } from 'vue'
import { defineContentScript, createIntegratedUi } from '#imports'
import { getStorage } from '../../../src/util/storage'

export default defineContentScript({
  matches: ['<all_urls>'],
  // cssInjectionMode: 'ui',

  async main (ctx) {
    // 读取用户配置的布局模式
    const mode = await getStorage('mode') || 'top'

    let anchor = document.getElementById('all-search')
    if (!anchor) {
      anchor = document.createElement('div')
      anchor.id = 'all-search'

      // 根据布局模式决定插入位置
      if (mode === 'bottom') {
        // bottom 模式：插入到 body 之后，解决 z-index 问题
        document.documentElement.appendChild(anchor)
      } else {
        // 其他模式：插入到 body 之前（默认行为）
        document.documentElement.insertBefore(anchor, document.body)
      }
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
