import App from '@src/index.vue'
import { createApp, App as VueApp } from 'vue'
// @ts-ignore
import { defineContentScript, createShadowRootUi } from '#imports'
import { getStorage } from '@src/util/storage'
// @ts-ignore
import type { ContentScriptContext } from 'wxt/client'
import css from '@src/assets/host.scss?inline'
import { addStyle } from '@src/util/dom'

export default defineContentScript({
  matches: ['<all_urls>'],
  cssInjectionMode: "ui",

  async main (ctx: ContentScriptContext) {
    // 注入基础样式到 head，用于支撑宿主元素和 body 的布局同步
    addStyle(css)

    const mode = await getStorage<string>('mode') || 'top'

    const ui = await createShadowRootUi(ctx, {
      name: 'all-search-ui',
      position: 'inline',
      anchor: 'html',
      css,
      append: (anchor: HTMLElement, container: HTMLElement) => {
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
