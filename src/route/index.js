import { createRouter, createWebHistory } from 'vue-router'

export default createRouter({
  history: createWebHistory('/all-search/'),
  routes: [
    /*    {
          path: '/',
          name: 'index',
          component: () => import('../views/index.vue'),
          meta: {
            nameZh: '全搜'
          }
        },*/
    {
      path: '/',
      redirect: '/config/sites'
    },
    {
      path: '/config/',
      component: () => import('../views/config.vue'),
      children: [
        {
          path: 'sites',
          name: 'sites',
          component: () => import('../views/sites.vue'),
          meta: {
            nameZh: '网址配置'
          }
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ]
})
