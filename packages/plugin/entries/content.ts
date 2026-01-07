import App from '@src/index.vue'
import { createApp, App as VueApp } from 'vue'
// @ts-ignore
import { defineContentScript, createShadowRootUi } from '#imports'
import { getStorage } from '@src/util/storage'
// @ts-ignore
import type { ContentScriptContext } from 'wxt/client'

export default defineContentScript({
  matches: ['<all_urls>'],

  async main (ctx: ContentScriptContext) {
    const mode = await getStorage<string>('mode') || 'top'

    const ui = await createShadowRootUi(ctx, {
      name: 'all-search-ui',
      position: 'inline',
      anchor: 'html',
      append: (anchor, container) => {
        if (mode === 'bottom') {
          anchor.appendChild(container)
        } else {
          // 确保插入到 body 之前，避免被 body 内部样式影响
          const body = document.body || document.documentElement
          body.parentElement?.insertBefore(container, body)
        }
      },
      onMount: (container: HTMLElement) => {
        const app = createApp(App)
        app.mount(container)
        return app
      },
      onRemove: (app: VueApp | undefined) => {
        app?.unmount()
      }
    })

    ui.mount()

    ctx.addEventListener(window, 'wxt:locationchange', () => {
      ui.mount()
    })
  }
})
