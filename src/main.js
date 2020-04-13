import Vue from 'vue'
import App from './App.vue'
import { addStyle, addStyleResource, checkBody } from './util'
import target from './config/loadList'

Vue.config.productionTip = false

const currentSite = target
const isDev = process.env.NODE_ENV !== 'production'

addStyleResource('asStyle')

if (target || isDev) {
  const el = document.createElement('div')
  el.id = 'all-search'

  const app = new Vue({
    data () {
      return {
        currentSite
      }
    },
    render: h => h(App)
  })

  checkBody().then(() => {
    const mountEL = document.body.parentElement.insertBefore(el, document.body)
    // document.body.insertBefore(el, document.body.childNodes[0])
    app.$mount(mountEL)
    if (target && target.style) {
      addStyle(target.style)
    }
  })
}
