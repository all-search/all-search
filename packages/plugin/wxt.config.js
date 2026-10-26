import { defineConfig } from 'wxt'
import pkg from '../../package.json'
import path from 'path'
import { fileURLToPath } from 'url'
import { elementPlusComponents } from '../../vite.config.shared'

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
  entrypointsDir: 'entries',
  zip: {
    // 两套模板都要显式写：WXT 0.21 的默认 sourcesTemplate 用 {{name}}/{{packageVersion}}，
    // 而 packages/plugin/package.json 没有 version 字段，产物会叫 all-searchplugin-undefined-sources.zip
    artifactTemplate: `${pkg.name}-${pkg.version}-{{browser}}.zip`,
    sourcesTemplate: `${pkg.name}-${pkg.version}-{{browser}}-sources.zip`
  },
  vite() {
    return {
      plugins: [
        // 设置页复用 packages/options，Element Plus 同样走按需引入
        elementPlusComponents()
      ],
      resolve: {
        alias: {
          '@src': path.resolve(__dirname, '../../src'),
          'vite-plugin-monkey/dist/client': path.resolve(__dirname, '../../src/util/mock-gm.ts')
        },
        extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
      }
    }
  }
})
