import Vue from 'vue'
import App from './App.vue'
import { addStyle, checkBody, domObserve, getSession, addStyleResource } from './util'
import target from './config/loadList'

Vue.config.productionTip = false

const currentSite = target
const isDev = process.env.NODE_ENV !== 'production'

if (target || isDev) {
  let el = null
  const asEl = document.getElementById('all-search')
  if (asEl) {
    el = asEl
  } else {
    el = document.createElement('div')
    el.id = 'all-search'
  }
  el.style.display = 'none'
  const app = new Vue({
    data () {
      return {
        currentSite
      }
    },
    render: h => h(App)
  })
  // 添加样式
  addStyleResource('iconFont', 'https://cdn.jsdelivr.net/gh/endday/all-search/src/assets/iconfont.css')
  const mode = getSession('mode') || 'horizontal'
  domObserve()
  checkBody().then(() => {
    const mountEL = document.body.parentElement.insertBefore(el, document.body)
    // document.body.insertBefore(el, document.body.childNodes[0])
    app.$mount(mountEL)
    if (target && target.style) {
      if (target.style[1] && mode === 'horizontal') {
        addStyle(target.style[1])
      }
      if (target.style[2] && mode === 'vertical') {
        addStyle(target.style[2])
      }
    }
  }).catch(err => {
    console.error(err)
  })
}
