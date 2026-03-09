import { defineConfig } from 'vite'
import sharedConfig from '../../vite.config.shared.ts'

export default defineConfig(({ mode }) => {
  return {
    ...sharedConfig,
    build: {
      ...sharedConfig.build,
      emptyOutDir: mode === 'production',
      minify: mode === 'production'
    }
  }
})
