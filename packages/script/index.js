import { createApp } from 'vue'
import index from '../../src/index.vue'
import {
  createAsRoot,
  getAsRoot
} from '../../src/util'

import {
  initTmMethods
} from '../../src/util/storage'

initTmMethods()
const el = getAsRoot()
if (!el) {
  const app = createApp(index)
  const el = createAsRoot()
  const mountEL = document.documentElement.insertBefore(el, document.body)
  app.mount(mountEL)
}
