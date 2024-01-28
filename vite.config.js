import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import crx from 'vite-plugin-crx-mv3'
import externalGlobals from 'rollup-plugin-external-globals'
import monkey from 'vite-plugin-monkey'
import scriptConfig from './src/config/script-config'

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
          manifest: './src/manifest.json'
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
              vue: ['Vue', () => `https://unpkg.zhimg.com/vue@3.4.13/dist/vue.global.prod.js`],
              '@popperjs/core': ['Popper', () => `https://www.unpkg.com/@popperjs/core@2.11.8/dist/umd/popper-lite.min.js`],
            },
          },
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
