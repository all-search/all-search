import { createApp } from 'vue'
import 'element-plus/theme-chalk/dark/css-vars.css'
// Element Plus 组件由 unplugin-vue-components 按需引入（见 vite.config.shared.ts），
// 只有 ElMessage / ElMessageBox 是 JS 调用，样式要手动带上
import 'element-plus/es/components/message/style/css'
import 'element-plus/es/components/message-box/style/css'
import '@src/assets/normalize.css'
import '@src/assets/common.scss'
import router from './route'
import App from './App.vue'

/**
 * 配置页的统一启动逻辑，在线站点（main.ts）和插件设置页
 * （packages/plugin/entries/options/main.js）共用，避免两份入口各配一套。
 *
 * 不再 `app.use(ElementPlus)`：组件和图标按需引入，
 * 整套注册会把 80 多个组件和 293 个图标全打进包里。
 */
export function mountOptionsApp (selector = '#app') {
  const app = createApp(App)
  app.use(router)
  app.mount(selector)
  return app
}
