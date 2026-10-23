import path from 'path'
import { fileURLToPath } from 'url'
import vue from '@vitejs/plugin-vue'
import type { UserConfig } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/**
 * 共享的 Vite 基础配置
 */
export const sharedConfig: UserConfig = {
  resolve: {
    alias: {
      '$': 'vite-plugin-monkey/dist/client',
      '@src': path.resolve(__dirname, 'src')
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
  },
  plugins: [
    vue()
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
