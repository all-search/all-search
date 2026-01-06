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
        cssSideEffects: (e) => {
          const styleId = 'as-style-common';
          const styleNode = document.getElementById(styleId);
          if (styleNode) {
            styleNode.textContent = e;
          } else {
            const o = document.createElement('style');
            o.id = styleId;
            o.classList.add('as-style');
            o.setAttribute('data-as-protected', 'true');
            o.textContent = e;
            (document.head || document.documentElement).append(o);
          }
        }
      }
    })
  ]
})