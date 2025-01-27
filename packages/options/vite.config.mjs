import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ mode }) => {
  return {
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
      target: 'es2015',
      emptyOutDir: mode === 'production',
      minify: mode === 'production'
    }
  }
})
