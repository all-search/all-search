import { defineConfig } from 'vite'
import monkey from 'vite-plugin-monkey'
import scriptConfig from './src/script-config'
import sharedConfig from '../../vite.config.shared'

export default defineConfig({
  ...sharedConfig,
  // @ts-ignore
  outputDir: 'dist/',
  plugins: [
    ...(sharedConfig.plugins || []),
    monkey({
      entry: 'index.ts',
      userscript: scriptConfig as any,
      build: {
        fileName: 'index.user.js',
        externalGlobals: {
          vue: ['Vue', () => `https://registry.npmmirror.com/vue/3.4.15/files/dist/vue.global.prod.js`]
        },
        cssSideEffects: (css) => {
          // 一次构建里可能产生多个 CSS chunk（组件样式 + internal.scss），
          // 若共用固定 id，后一个会覆盖前一个（曾导致组件样式全部丢失）。
          // 这里用内容哈希生成独立 id，每个 chunk 一个 style 节点。
          let hash = 5381;
          for (let i = 0; i < css.length; i++) {
            hash = ((hash << 5) + hash) ^ css.charCodeAt(i);
          }
          const styleId = 'as-style-' + (hash >>> 0).toString(36);

          const inject = () => {
            const host = document.getElementById('all-search');
            const shadowRoot = host && host.shadowRoot;
            // 宿主 / 影子根尚未创建时先不注入，等 as-inject-style 事件
            // （避免把 UI 样式泄漏到宿主页面的 head 里）
            const container: any = shadowRoot && (shadowRoot.querySelector('head') || shadowRoot);
            if (!container) {
              return;
            }

            let style = container.querySelector('#' + styleId);
            if (!style) {
              style = document.createElement('style');
              style.id = styleId;
              container.append(style);
            }
            style.textContent = css;
          };

          // 1. 正常的页面加载监听
          if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', inject);
          } else {
            inject();
          }

          // 2. 监听自定义事件：当业务逻辑创建好 Shadow DOM 后通知我
          window.addEventListener('as-inject-style', inject);
        }
      }
    })
  ]
})
