import Vue from 'vue'
import Router from 'vue-router'
// import Home from '../pages/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: 'all-search',
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: "Home" */ '../pages/Index.vue')
    }
  ]
})
