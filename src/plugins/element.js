import Vue from 'vue'
import { Aside, Container, Footer, Header, Input, Main, Notification } from 'element-ui'

Vue.use(Input)
Vue.use(Container)
Vue.use(Main)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Footer)

Vue.prototype.$notify = Notification
