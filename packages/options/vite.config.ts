import path from 'path'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'
import sharedConfig from '../../vite.config.shared'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig(({ mode }) => {
  return {
    ...sharedConfig,
    // GitHub Pages 部署在 /all-search/ 子路径下，资源和路由都依赖这个 base。
    // 插件设置页是独立入口（packages/plugin/entries/options），不受这里影响。
    base: '/all-search/',
    resolve: {
      ...sharedConfig.resolve,
      alias: {
        ...(sharedConfig.resolve as any)?.alias,
        // src/util/storage/tm.ts 会在模块顶层 import 油猴客户端，而
        // `__MONKEY_WINDOW_KEY__` 只有 vite-plugin-monkey 构建时才定义。
        // 配置站不需要 GM API，这里换成「调用即抛错」的占位实现，
        // 否则页面会在启动阶段直接抛 ReferenceError 白屏。
        'vite-plugin-monkey/dist/client': path.resolve(__dirname, '../../src/util/mock-gm.ts')
      }
    },
    build: {
      ...sharedConfig.build,
      emptyOutDir: mode === 'production',
      minify: mode === 'production'
    }
  }
})
