import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'jsdom',
    globals: true,
    alias: {
      '@src': path.resolve(__dirname, './src'),
      'vite-plugin-monkey/dist/client': path.resolve(__dirname, './packages/plugin/mock-gm.ts'),
    },
  },
})
