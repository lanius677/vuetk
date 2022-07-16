
import { createRouter, createWebHistory, createWebHashHistory, createMemoryHistory, RouteRecordRaw } from 'vue-router'

//路由配置

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/home',
    name: 'Home',
    meta: {
      isAuth: true
    },
    component: () => import('../views/HomePage.vue')
  },
  {
    path: '/login',
    name: "Login",
    component: () => import('../views/LoginPage.vue')
  },
  {
    path: '/register',
    component: () => import('../views/RegisterPage.vue')
  },
]


const router = createRouter({
  history: createWebHistory(),
  routes
})


//.....
//路由拦截
router.beforeEach((to, from, next) => {
  if (to.meta.isAuth) {
    if (localStorage.getItem("token")) {
      next();
    } else {
      ElMessage.error("请先登录");
    }
  } else {
    next();
  }
});

export default router