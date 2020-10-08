import Vue from 'vue'
import index from './index.vue'
import { ACAddStyle, addStyleResource, checkBody, domObserve, getAsEl, getSession, RAFInterval } from '../util'
import { targetSite } from '../config/loadList'
import pkg from '../../package.json'

const version = pkg.version.replace(/\./g, '')

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

console.log('all-search-run')

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

checkBody().then(() => {
  RAFInterval(() => {
    const currentSite = targetSite()
    if (!currentSite.disabled) {
      initStyle()
      const asEl = document.getElementById('all-search')
      if (!asEl) {
        const el = getAsEl()
        const mountEL = document.body.parentElement.insertBefore(el, document.body)
        app.$mount(mountEL)
      }
    }
  }, 800, true)
}).catch(err => {
  console.error(err)
})

export default app
