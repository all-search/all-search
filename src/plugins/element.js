import Vue from 'vue'
import {
  Dialog,
  Drawer,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Input,
  Notification,
  Radio,
  RadioGroup,
  TabPane,
  Tabs
} from 'element-ui'

Vue.use(Input)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Drawer)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Dialog)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)

Vue.prototype.$notify = Notification
