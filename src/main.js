import Vue from 'vue'
import App from './App.vue'
import router from './route'
import './util/sw-register'
import './plugins/element.js'
import './plugins/axios.js'
import './assets/reset.css'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
