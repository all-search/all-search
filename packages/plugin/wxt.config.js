import { defineConfig } from 'wxt'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  // My WXT config
  srcDir: './',
  entrypointsDir: 'entries',
  imports: {
    addons: {
      vueTemplate: true
    }
  },
  vite: () => ({
    plugins: [vue()]
  })
})
