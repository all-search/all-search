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
      component: () => import('../views/config'),
      children: [
        {
          path: 'sites',
          name: 'sites',
          component: () => import('../views/sites'),
          meta: {
            nameZh: '网址配置'
          }
        },
        {
          path: 'edit',
          name: 'edit',
          component: () => import('../views/edit'),
          meta: {
            nameZh: '网址配置'
          }
        },
        {
          path: 'toolbar',
          name: 'toolbar',
          component: () => import('../views/toolbar'),
          meta: {
            nameZh: '工具栏配置'
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
