import { createApp } from 'vue'
import index from '@all-search/core/contentScripts/index'
import {
  createAsRoot,
  getAsRoot
} from '@all-search/core/util'

const el = getAsRoot()
if (!el) {
  const app = createApp(index)
  const el = createAsRoot()
  const mountEL = document.documentElement.insertBefore(el, document.body)
  app.mount(mountEL)
}
