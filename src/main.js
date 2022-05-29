import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/iconfont.css'
import './assets/normalize.css'
import './assets/common.scss'
import { getTmMethods } from './util'

import router from './route'
import App from './App'

const app = createApp(App)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
getTmMethods()

