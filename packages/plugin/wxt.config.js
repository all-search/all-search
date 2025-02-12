import { defineConfig } from 'wxt'
import pkg from '../../package.json'
// See https://wxt.dev/api/config.html
export default defineConfig({
  manifest: {
    name: 'All-Search',
    version: pkg.version,
    description: pkg.description,
    author: pkg.author,
    permissions: ['storage']
  },
  modules: ['@wxt-dev/module-vue'],
  runner: {
    startUrls: ['https://www.baidu.com']
  },
  entrypointsDir: "entries",
  zip: {
    artifactTemplate: `${pkg.name}-${pkg.version}-{{browser}}.zip`
  },
  vite() {
    return {
      resolve: {
        extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
      }
    }
  }
})
