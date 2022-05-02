import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import './assets/iconfont.css'
import './assets/normalize.css'
import './assets/common.scss'
import { getTmMethods } from './util'

import router from './route'
import App from './App.vue'

const app = createApp(App)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
getTmMethods()

window.addEventListener('scroll', ev => {
  console.log(ev)
})
