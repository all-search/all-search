import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import '../../../../src/assets/normalize.css'
import '../../../../src/assets/common.scss'
import router from '../../../options/route'
import App from '../../../options/App.vue'

const app = createApp(App)
app.use(router)
app.use(ElementPlus)
app.mount('#app')

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
