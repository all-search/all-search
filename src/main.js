import Vue from 'vue'
import App from './App.vue'
import { addStyle, checkBody, getCurrentSite } from './util'
import isWhiteList from './config/whiteList'
import target from './config/loadList'

Vue.config.productionTip = false

const currentSite = getCurrentSite()

if (target.enabled || isWhiteList()) {
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
    if (target.style) {
      addStyle(target.style)
    }
  })
}
