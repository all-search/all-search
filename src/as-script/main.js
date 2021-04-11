import { createApp } from 'vue'
import index from './index.vue'
import {
  ACAddStyle,
  addStyleResource,
  checkBody,
  createAsRoot,
  getAsRoot,
  getSession,
  passTmMethods,
  version
} from '../util/index.js'
import { withHookAfter, withHookBefore } from '../util/hook'
import { siteInfo } from '../config/loadList.js'

let currentSite = siteInfo()

const isDev = process.env.NODE_ENV === 'development'
const isPro = process.env.NODE_ENV === 'production'

const app = createApp(index)

console.log(`all-search running 全搜运行中(${process.env.NODE_ENV})`)

// 添加样式
const initStyle = function () {
  addStyleResource('as-icon', `https://cdn.jsdelivr.net/npm/all-search/src/assets/iconfont.css`)
  if (isPro) {
    addStyleResource('as-style', `https://cdn.jsdelivr.net/npm/all-search@${version}/build/as-style.css`)
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
  currentSite = siteInfo()
  if (!currentSite) {
    return
  }
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

history.pushState = withHookAfter(history.pushState, init)
history.replaceState = withHookAfter(history.replaceState, init)
Node.prototype.removeChild = withHookBefore(Node.prototype.removeChild, (e) => {
  if (e && e.tagName === 'STYLE') {
    return !(e.classList.contains('as-icon') || e.classList.contains('as-style'))
  }
  return true
})

checkBody().then(() => {
  init()
}).catch(err => {
  console.error(err)
})
