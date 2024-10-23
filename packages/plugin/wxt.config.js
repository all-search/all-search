import { defineConfig } from 'wxt'

// See https://wxt.dev/api/config.html
export default defineConfig({
  manifest: {
    permissions: ['storage'],
  },
  modules: ['@wxt-dev/module-vue'],
  runner: {
    startUrls: ['https://www.baidu.com']
  },
  entrypointsDir: "entries",
  vite() {
    return {
      resolve: {
        extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
      }
    }
  }
})
