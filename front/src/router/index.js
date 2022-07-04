import { createRouter, createWebHashHistory } from "vue-router";

//路由配置
const router = createRouter({
  history: createWebHashHistory(), //选择hash路由
  routes: [
    {
      path: "/",
      redirect: "/login",
    },
    {
      path: "/home",
      component: () => import("../views/HomePage.vue"),
      meta: {
        isAuth: true,
      },
    },
    {
      path: "/login",
      component: () => import("../views/LoginPage.vue"),
    },
    {
      path: "/register",
      component: () => import("../views/RegisterPage.vue"),
    },
  ],
});

//路由拦截
router.beforeEach((to, from, next) => {
  if (to.meta.isAuth) {
    if (localStorage.getItem("token")) {
      next();
    } else {
      ElMessage.error("请先成功");
    }
  } else {
    next();
  }
});
export default router;
