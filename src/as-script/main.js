import { createApp } from 'vue'
import index from './index.vue'
import {
  ACAddStyle,
  addStyleResource,
  checkBody,
  getAsEl,
  getSession,
  passTmMethods,
  RAFInterval,
  version
} from '../util/index.js'
import { siteInfo } from '../config/loadList.js'

const currentSite = siteInfo()

const isDev = process.env.NODE_ENV === 'development'

const app = createApp(index)

console.log(`all-search running 全搜运行中(${process.env.NODE_ENV})`)

// 添加样式
const initStyle = function () {
  addStyleResource('iconFont', 'https://cdn.jsdelivr.net/npm/all-search/src/assets/iconfont.css')
  if (isDev) {
    addStyleResource('as-style', `https://cdn.jsdelivr.net/npm/all-search/build/as-style.css?v=${version}`)
  }
}

const mode = getSession('mode') || 'horizontal'

if (currentSite && currentSite.style) {
  if (currentSite.style[1] && mode === 'horizontal') {
    ACAddStyle(currentSite.style[1], 'as-special')
  }
  if (currentSite.style[2] && mode === 'vertical') {
    ACAddStyle(currentSite.style[2], 'as-special')
  }
}

function init () {
  if (isDev) {
    initStyle()
  } else {
    if (currentSite.disabled) {
      return
    }
    if (!currentSite.invisible) {
      initStyle()
    }
  }
  const asEl = document.getElementById('all-search')
  if (!asEl) {
    const el = getAsEl()
    const mountEL = document.body.parentElement.insertBefore(el, document.body)
    app.mount(mountEL)
    passTmMethods()
  }
}

checkBody().then(() => {
  // 百度比较特殊，搜索没有发生页面请求，所以需要轮询
  if (window.location.hostname === 'www.baidu.com') {
    RAFInterval(() => init(), 800, true)
  } else {
    init()
  }
}).catch(err => {
  console.error(err)
})
