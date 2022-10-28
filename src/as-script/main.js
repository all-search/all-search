import { createApp } from 'vue'
import index from './index'
import {
  createAsRoot,
  getAsRoot,
  passTmMethods
} from '../util/index'
import { protectStyle } from '../util/initStyle.js'
import iconfont from '../assets/iconfont'
import { siteInfo } from '../config/loadList.js'

const site = siteInfo()

if (!site.disabled) {
  iconfont()
  passTmMethods()
  protectStyle()
  const el = getAsRoot()
  if (!el) {
    const app = createApp(index)
    const el = createAsRoot()
    const mountEL = document.documentElement.insertBefore(el, document.body)
    app.mount(mountEL)
  }
  console.log(`all-search running 全搜运行中(${process.env.NODE_ENV})`)
}
