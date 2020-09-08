import Vue from 'vue'
import App from './App.vue'
import { ACAddStyle, addListenerOnInput, addStyleResource, checkBody, domObserve, getSession } from './util'
import { targetSite } from './config/loadList'
import pkg from '../package.json'

const version = pkg.version.replace(/\./g, '')

Vue.config.productionTip = false

const currentSite = targetSite()

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
addStyleResource('as-style', `https://raw.githubusercontent.com/endday/all-search/master/build/as-style.css?v=${version}`)

const mode = getSession('mode') || 'horizontal'

domObserve()

addListenerOnInput(() => {
  console.log('input')
})

checkBody().then(() => {
  const mountEL = document.body.parentElement.insertBefore(el, document.body)
  app.$mount(mountEL)
  if (currentSite && currentSite.style) {
    if (currentSite.style[1] && mode === 'horizontal') {
      ACAddStyle(currentSite.style[1], 'as-horizontal')
    }
    if (currentSite.style[2] && mode === 'vertical') {
      ACAddStyle(currentSite.style[2], 'as-vertical')
    }
  }
}).catch(err => {
  console.error(err)
})
