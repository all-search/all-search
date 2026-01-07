import { defineConfig } from 'wxt'
import pkg from '../../package.json'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

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
  webExt: {
    startUrls: ['https://www.baidu.com']
  },
  entrypointsDir: "entries",
  zip: {
    artifactTemplate: `${pkg.name}-${pkg.version}-{{browser}}.zip`
  },
  vite() {
    return {
      resolve: {
        alias: {
          '@src': path.resolve(__dirname, '../../src'),
          'vite-plugin-monkey/dist/client': path.resolve(__dirname, './mock-gm.ts')
        },
        extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
      }
    }
  }
})
