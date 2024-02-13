import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import crx from 'vite-plugin-crx-mv3'
import externalGlobals from 'rollup-plugin-external-globals'
import monkey from 'vite-plugin-monkey'
import scriptConfig from './packages/core/src/config/script-config'
import { crx } from '@crxjs/vite-plugin'
import manifest from './manifest.json'

export default defineConfig(({ mode }) => {
  if (mode === 'plugin') {
    return {
      resolve: {
        alias: {
          '$': 'vite-plugin-monkey/dist/client'
        },
        extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
      },
      plugins: [
        vue(),
        crx({
          manifest
        })
      ],
      build: {
        target: 'es2015',
        emptyOutDir: mode === 'production',
        minify: mode === 'production'
      }
    }
  } else if (mode === 'script') {
    return {
      outputDir: 'dist/',
      resolve: {
        extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
      },
      plugins: [
        vue(),
        monkey({
          entry: 'src/content-scripts/main.js',
          userscript: scriptConfig,
          build: {
            fileName: 'index.user.js',
            externalGlobals: {
              vue: ['Vue', () => `https://registry.npmmirror.com/vue/3.4.15/files/dist/vue.global.prod.js`],
              '@popperjs/core': ['Popper', () => `https://registry.npmmirror.com/@popperjs/core/2.11.8/files/dist/umd/popper-lite.min.js`]
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
    }
  } else if (mode === 'site') {
    return {
      base: '/all-search',
      outputDir: 'dist/',
      resolve: {
        alias: {
          '$': 'vite-plugin-monkey/dist/client'
        },
        extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
      },
      plugins: [
        vue()
      ],
      build: {
        rollupOptions: {
          plugins: [
            externalGlobals({
              vue: 'Vue',
              jsoneditor: 'JSONEditor',
              'element-plus': 'ElementPlus',
              '@element-plus/icons-vue': 'ElementPlusIconsVue'
            })
          ]
        }
      }
    }
  }
})
