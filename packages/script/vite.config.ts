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
          const inject = () => {
            const hostId = 'all-search';
            const styleId = 'as-style-common';
            const host = document.getElementById(hostId);
            const shadowRoot = host?.shadowRoot;

            // 寻找注入容器：优先寻找内部的 head，然后是 shadowRoot，最后是文档 head
            const container: any = shadowRoot?.querySelector('head') || shadowRoot || document.head || document.documentElement;

            let style = container?.querySelector('#' + styleId);

            if (!style) {
              style = document.createElement('style');
              style.id = styleId;
              container?.append(style);
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
