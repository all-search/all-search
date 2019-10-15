import Vue from 'vue'
import { Dialog, Drawer, Input, Notification, Radio, RadioGroup, TabPane, Tabs } from 'element-ui'

Vue.use(Input)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Drawer)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Dialog)

Vue.prototype.$notify = Notification
