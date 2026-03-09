import App from '@src/index.vue'
import { createApp, App as VueApp } from 'vue'
// @ts-ignore
import { defineContentScript, createShadowRootUi } from '#imports'
import { getMountMode } from '@src/util/mount'
import { LayoutService } from '@src/util/layoutService'
// @ts-ignore
import type { ContentScriptContext } from 'wxt/client'
import globalCss from '@src/assets/global.scss?inline'
import internalCss from '@src/assets/internal.scss?inline'
import { addStyle } from '@src/util/dom'

export default defineContentScript({
  matches: ['<all_urls>'],
  cssInjectionMode: "ui",

  async main (ctx: ContentScriptContext) {
    // 注入基础样式到 head，用于支撑宿主元素和 body 的布局同步
    addStyle(globalCss)

    const mode = await getMountMode()

    let activeApp: VueApp<Element> | null = null

    const ui = await createShadowRootUi(ctx, {
      name: 'all-search-ui',
      position: 'inline',
      anchor: 'html',
      css: internalCss,
      append: (anchor: HTMLElement, container: HTMLElement) => {
        // 使用统一的挂载逻辑
        LayoutService.refresh(mode, container)
      },
      onMount: (container: HTMLElement) => {
        if (activeApp) {
          activeApp.unmount()
          container.innerHTML = ''
        }

        const app = createApp(App)
        app.mount(container)
        activeApp = app
        return app
      },
      onRemove: (app: VueApp | undefined) => {
        app?.unmount()
        if (activeApp === app) {
          activeApp = null
        }
      }
    })

    ui.mount()

    ctx.addEventListener(window, 'wxt:locationchange', () => {
      ui.mount()
    })
  }
})
