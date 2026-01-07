import { defineConfig } from 'vite'
import monkey from 'vite-plugin-monkey'
import mkcert from 'vite-plugin-mkcert'
import scriptConfig from './src/script-config'
import sharedConfig from '../../vite.config.shared'

export default defineConfig({
  ...sharedConfig,
  // @ts-ignore
  outputDir: 'dist/',
  server: {
    host: 'localhost',
    https: true,
    headers: {
      'Access-Control-Allow-Private-Network': 'true'
    }
  },
  plugins: [
    ...(sharedConfig.plugins || []),
    mkcert({
      source: 'coding'
    }),
    monkey({
      entry: 'index.ts',
      userscript: scriptConfig,
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

            // 优先注入影子，如果没有影子则注入 head
            const container = host?.shadowRoot || document.head || document.documentElement;
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
