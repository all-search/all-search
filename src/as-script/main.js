import Vue from 'vue'
import index from './index.vue'
import {
  version,
  ACAddStyle,
  addStyleResource,
  checkBody,
  domObserve,
  getAsEl,
  getSession,
  passTmMethods,
  RAFInterval
} from '../util'
import { targetSite } from '../config/loadList'

Vue.config.productionTip = false

const currentSite = targetSite()

const app = new Vue({
  data () {
    return {
      currentSite
    }
  },
  render: h => h(index)
})

console.log('all-search running 全搜运行中')

// 添加样式
const initStyle = function () {
  addStyleResource('iconFont', 'https://cdn.jsdelivr.net/npm/all-search/src/assets/iconfont.css')
  addStyleResource('as-style', `https://cdn.jsdelivr.net/npm/all-search/build/as-style.css?v=${version}`)
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

domObserve()

/*
function initSaveBtn () {
  const list = [
    /^https?:\/\/endday\.github\.io/,
    /^https?:\/\/endday\.gitee\.io/,
    /^http:\/\/localhost:8080\/all-search\//
  ]
  const isLoaded = list.some(item => item.test(location.href))
  if (isLoaded) {
    RAFInterval(() => {
      const btn = document.getElementById('save-btn')
      if (btn) {
        btn.style.display = 'unset'
        const fn = btn.onclick
        btn.onclick = () => {
          if (fn) {
            fn()
          }
          const sites = window.localStorage.getItem('__allSearch__sites')
          setSession('sites', sites)
          setSession('sites-version', version)
        }
        return true
      }
    }, 800)
  }
}
*/

function init () {
  const currentSite = targetSite()
  if (!currentSite.disabled) {
    if (!currentSite.invisible) {
      initStyle()
    }
    const asEl = document.getElementById('all-search')
    if (!asEl) {
      const el = getAsEl()
      const mountEL = document.body.parentElement.insertBefore(el, document.body)
      app.$mount(mountEL)
      // initSaveBtn()
      passTmMethods()
    }
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

export default app
