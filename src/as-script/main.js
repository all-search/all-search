import { createApp } from 'vue'
import index from './index.vue'
import {
  checkBody,
  createAsRoot,
  getAsRoot,
  passTmMethods
} from '../util'
import { siteInfo } from '../config/loadList.js'

let currentSite = siteInfo()

const app = createApp(index)

console.log(`all-search running 全搜运行中(${process.env.NODE_ENV})`)

function init () {
  currentSite = siteInfo()
  const el = getAsRoot()
  if (el) {
    el.style.display = currentSite.invisible ? 'none' : 'unset'
  } else {
    const el = createAsRoot()
    const mountEL = document.body.parentElement.insertBefore(el, document.body)
    app.mount(mountEL)
    passTmMethods()
  }
}

checkBody().then(() => {
  init()
}).catch(err => {
  console.error(err)
})
