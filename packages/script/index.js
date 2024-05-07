import { createApp } from 'vue'
import index from '@/contentScripts/index'
import {
  createAsRoot,
  getAsRoot
} from '@/util/index.js'

import {
  initTmMethods
} from '@/util/storage'

initTmMethods()
const el = getAsRoot()
if (!el) {
  const app = createApp(index)
  const el = createAsRoot()
  const mountEL = document.documentElement.insertBefore(el, document.body)
  app.mount(mountEL)
}
