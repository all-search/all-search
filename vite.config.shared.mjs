import path from 'path'
import { fileURLToPath } from 'url'
import vue from '@vitejs/plugin-vue'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/**
 * 共享的 Vite 基础配置
 */
export const sharedConfig = {
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
  build: {
    target: 'es2015'
  }
}

export default sharedConfig
