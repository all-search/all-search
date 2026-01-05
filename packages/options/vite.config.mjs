import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig(({ mode }) => {
  return {
    resolve: {
      alias: {
        '$': 'vite-plugin-monkey/dist/client',
        '@src': path.resolve(__dirname, '../../src')
      },
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
    },
    plugins: [
      vue()
    ],
    build: {
      target: 'es2015',
      emptyOutDir: mode === 'production',
      minify: mode === 'production'
    }
  }
})
