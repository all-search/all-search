import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import monkey from 'vite-plugin-monkey'
import scriptConfig from './src/script-config'

export default defineConfig({
  outputDir: 'dist/',
  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
  },
  plugins: [
    vue(),
    monkey({
      entry: 'index.js',
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
