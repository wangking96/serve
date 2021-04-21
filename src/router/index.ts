import {
    createRouter,
    createWebHistory,
    Router,
    RouteRecordRaw,
} from "vue-router";

const routes: Array<RouteRecordRaw> = [
    { path: "/", redirect: "/Basketball" },
    {
        path: "/Basketball",
        name: "Basketball",
        meta: {
        title: "篮球",
            keepAlive: true,
        },
        component: () => import("../pages/Basketball"),
    },
    {
        path: "/BasketballDetail",
        name: "BasketballDetail",
        meta: {
            title: "篮球详情",
            // keepAlive: true,
        },
        component: () => import("../pages/Basketball/Detail"),
    },
    {
        path: "/Football",
        name: "Football",
        meta: {
            title: "足球",
            keepAlive: true,
        },
        component: () => import("../pages/Football"),
    },
    {
        path: "/FootballDetail",
        name: "FootballDetail",
        meta: {
            title: "足球详情",
            // keepAlive: true,
        },
        component: () => import("../pages/Football/Details"),
    },
];

const router: Router = createRouter({
  history: createWebHistory(),
  routes,
});

router.afterEach((to,from,next) => {
    window.scrollTo(0,0);
});

export default router;
