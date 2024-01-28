import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import './assets/normalize.css'
import './assets/common.scss'
import { getTmMethods } from './util/storage'
import router from './route'
import App from './App'

const app = createApp(App)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
getTmMethods()
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
