import Vue from 'vue'
import Router from 'vue-router'
// import Home from '../pages/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: "Home" */ '../pages/Index.vue')
    }
  ]
})
