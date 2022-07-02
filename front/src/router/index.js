import { createRouter, createWebHashHistory } from 'vue-router';

//路由配置
const router = createRouter({
  history: createWebHashHistory(),//选择hash路由
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/home',
      component: () => import('../views/HomePage.vue')
    },
    {
      path: '/login',
      component: () => import('../views/HomePage.vue')
    },
    {
      path: '/register',
      component: () => import('../views/HomePage.vue')
    },
  ]
})

export default router
