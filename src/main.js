import Vue from 'vue'
import App from './App.vue'
import './assets/normalize.css'
import vuetify from './plugins/vuetify'

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  components: { App },
  vuetify,
  template: '<App/>'
})
