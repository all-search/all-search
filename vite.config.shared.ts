import path from 'path'
import { fileURLToPath } from 'url'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import type { UserConfig } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/**
 * Element Plus 按需引入：模板里的 `el-*` 和图标由这个插件自动 import，
 * 样式跟着组件走。不这么做的话 `app.use(ElementPlus)` 会把整套组件库
 * （含 293 个图标）打进包，实际只用到 14 个组件。
 */
export const elementPlusComponents = () => Components({
  dts: false,
  resolvers: [ElementPlusResolver({ importStyle: 'css' })]
})

/**
 * 共享的 Vite 基础配置
 */
export const sharedConfig: UserConfig = {
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, 'src')
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
  },
  plugins: [
    vue(),
    elementPlusComponents()
  ],
  server: {
    host: 'localhost',
    headers: {
      'Access-Control-Allow-Private-Network': 'true'
    }
  },
  build: {
    target: 'es2015',
    rollupOptions: {
      output: {
        manualChunks(id) {
          // CJS 互操作 helper 是 Rollup 的虚拟模块（不在 node_modules 里），
          // 它同时被 jsoneditor 和 dayjs 用到。不单独切出来的话，它会被分进
          // jsoneditor 那个 chunk，entry 为了拿它把整个 1MB 编辑器一起预加载了。
          if (id.includes('commonjsHelpers')) {
            return 'cjs-helpers';
          }
          if (id.includes('node_modules')) {
            if (id.includes('element-plus')) {
              return 'element-plus';
            }
            if (id.includes('jsoneditor')) {
              return 'jsoneditor';
            }
            return 'vendor';
          }
        }
      }
    }
  }
}

export default sharedConfig
