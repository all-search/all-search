import { createRouter, createWebHistory } from 'vue-router'

export default createRouter({
  history: createWebHistory('/all-search/'),
  routes: [
    {
      path: '/',
      name: 'setting',
      component: () => import('../views/setting.vue'),
      meta: {
        nameZh: '基础配置'
      }
    },
    {
      path: '/sites',
      name: 'index',
      component: () => import('../views/sites.vue'),
      meta: {
        nameZh: '网址配置'
      }
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ]
})
