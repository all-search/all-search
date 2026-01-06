import { defineConfig } from 'vite'
import monkey from 'vite-plugin-monkey'
import mkcert from 'vite-plugin-mkcert'
import scriptConfig from './src/script-config'
import sharedConfig from '../../vite.config.shared.mjs'

export default defineConfig({
  ...sharedConfig,
  outputDir: 'dist/',
  server: {
    host: 'localhost',
    https: true,
    headers: {
      'Access-Control-Allow-Private-Network': 'true'
    }
  },
  plugins: [
    ...sharedConfig.plugins,
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
        cssSideEffects: () => {
          return (e) => {
            if (typeof window.GM_addStyle == 'function') {
              window.GM_addStyle(e)
              return
            }
            const styleNode = document.querySelector('#as-style-common')
            if (styleNode) {
              styleNode.styleSheet.cssText += e
            } else {
              const o = document.createElement('style')
              o.classList.add('as-style')
              o.id = 'as-style-common'
              o.textContent = e
              document.head.append(o)
            }
          }
        }
      }
    })
  ]
})
