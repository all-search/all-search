import { createApp } from 'vue'
import index from '@src/index.vue'
import { initAppAnchor } from '@src/util'
import { initTmMethods } from '@src/util/storage'

async function init (): Promise<void> {
  initTmMethods()
  const anchor = await initAppAnchor()
  
  // 检查是否已经挂载过（防止某些情况下重复执行）
  if (!(anchor as any).__vue_app__) {
    const app = createApp(index)
    app.mount(anchor)
  }
}

init()
