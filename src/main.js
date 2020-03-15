import Vue from 'vue'
import App from './App.vue'
import { checkBody, getCurrentSite } from './util'

Vue.config.productionTip = false

const currentSite = getCurrentSite()

if (currentSite) {
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
    document.body.insertBefore(el, document.body.childNodes[0])
    app.$mount('#all-search')
  })
}
