import Vue from 'vue'
import App from './App.vue'
import router from './route'
import vuetify from './plugins/vuetify'
import './assets/iconfont.css'

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  components: { App },
  vuetify,
  router,
  template: '<App/>'
})
