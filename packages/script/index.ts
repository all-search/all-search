import index from '@src/index.vue'
import { initTmMethods } from '@src/util/storage'
import globalCss from '@src/assets/global.scss?inline'
import '@src/assets/internal.scss'
import { addStyle } from '@src/util/dom'
import { setupApp } from '@src/util/mount'

async function init (): Promise<void> {
  initTmMethods()
  
  // 1. 注入全局宿主样式
  addStyle(globalCss)

  // 2. 使用工厂函数初始化应用
  await setupApp({
    rootComponent: index,
    hostId: 'all-search',
    hostTag: 'all-search-ui'
  })
}

init()
