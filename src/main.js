import Vue from 'vue'
import App from './App.vue'
import { addStyle, addStyleResource, checkBody } from './util'
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
  const app = new Vue({
    data () {
      return {
        currentSite
      }
    },
    render: h => h(App)
  })
  // 添加样式
  addStyleResource('asStyle')
  checkBody().then(() => {
    const mountEL = document.body.parentElement.insertBefore(el, document.body)
    // document.body.insertBefore(el, document.body.childNodes[0])
    app.$mount(mountEL)
    if (target && target.style) {
      addStyle(target.style)
    }
  })
}
