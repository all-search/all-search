import { createApp } from 'vue'
import index from './index'
import {
  checkBody,
  createAsRoot,
  getAsRoot,
  passTmMethods
} from '../util/index'
import { protectStyle } from '../util/initStyle.js'
import '../assets/iconfont'
import { siteInfo } from '../config/loadList.js'

const site = siteInfo()

const app = createApp(index)

function init () {
  const el = getAsRoot()
  if (!el) {
    const el = createAsRoot()
    const mountEL = document.body.parentElement.insertBefore(el, document.body)
    app.mount(mountEL)
    passTmMethods()
  }
  console.log(`all-search running 全搜运行中(${process.env.NODE_ENV})`)
}

if (!site.disabled) {
  protectStyle()
  checkBody().then(() => {
    init()
  }).catch(err => {
    console.error(err)
  })
}
