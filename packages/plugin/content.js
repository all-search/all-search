import { createApp } from 'vue'
import { defineContentScript } from 'wxt'
import index from '../../src/contentScripts'
import {
  createAsRoot,
  getAsRoot
} from 'src/util'

export default defineContentScript({
  matches: ['*//*.google.com/*'],
  main () {
    const el = getAsRoot()
    if (!el) {
      const app = createApp(index)
      const el = createAsRoot()
      const mountEL = document.documentElement.insertBefore(el, document.body)
      app.mount(mountEL)
    }
  }
})

