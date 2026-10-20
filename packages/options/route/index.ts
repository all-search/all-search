import { createRouter, createWebHistory, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { isPlugin } from '@src/env'

const routes: RouteRecordRaw[] = [
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
      },
      {
        path: 'edit',
        name: 'edit',
        component: () => import('../views/edit.vue'),
        meta: {
          nameZh: '网址配置'
        }
      },
      {
        path: 'toolbar',
        name: 'toolbar',
        component: () => import('../views/toolbar.vue'),
        meta: {
          nameZh: '工具栏配置'
        }
      },
      {
        path: 'interaction',
        name: 'interaction',
        component: () => import('../views/interaction.vue'),
        meta: {
          nameZh: '交互'
        }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

// 扩展的 options 页运行在 chrome-extension:// 下，history 模式的路径刷新会 404，
// 因此插件内改用 hash 路由；独立部署的配置页继续用带 base 的 history 路由。
export default createRouter({
  history: isPlugin ? createWebHashHistory() : createWebHistory('/all-search/'),
  routes
})
