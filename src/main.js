import Vue from 'vue'
import App from './App.vue'
import { checkBody, getCurrentSite, addStyle } from './util'
import isWhiteList from './config/whiteList'

Vue.config.productionTip = false

const currentSite = getCurrentSite()

if (currentSite || isWhiteList()) {
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
    if (
      currentSite &&
      currentSite.styleString
    ) {
      addStyle(currentSite.styleString)
    }
  })
}
