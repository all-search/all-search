import Vue from 'vue'
import { Input, Notification, TabPane, Tabs } from 'element-ui'

Vue.use(Input)
Vue.use(Tabs)
Vue.use(TabPane)

Vue.prototype.$notify = Notification
