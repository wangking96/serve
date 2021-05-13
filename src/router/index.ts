/*
 * @version:  ;
 * @description:  ;
 * @autor: Full
 * @date: Do not edit
 */
import {
  createRouter,
  createWebHistory,
  Router,
  RouteRecordRaw,
} from "vue-router";

const routes: Array<RouteRecordRaw> = [
  { path: "/Live", redirect: "/" },
  {
    path: "/",
    name: "Live",
    meta: {
      title: "直播",
      keepAlive: true,
    },
    component: () => import("../pages/Live/Live.vue"),
  },
  {
    path: "/OpenBoxs",
    name: "OpenBoxs",
    meta: {
      title: "开箱",
      keepAlive: true,
    },
    component: () => import("../pages/OpenBoxs/OpenBoxs.vue"),
  },
];

const router: Router = createRouter({
  history: createWebHistory("/"),
  routes,
});

router.afterEach((to, from, next) => {
  window.scrollTo(0, 0);
});

export default router;
