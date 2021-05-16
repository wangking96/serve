import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('../views/home/index.vue')
    },{
        path: '/match',
        name: 'match',
        component: () => import('../views/match/index.vue')
    },{
        path: '/mine',
        name: 'mine',
        component: () => import('../views/mine/index.vue')
    },{
        path: '/liveRoom',
        name: 'liveRoom',
        component: () => import('../views/liveRoom/index.vue')
    },{
        path: '/login',
        name: 'login',
        component: () => import('../components/Login.vue')
    }
];

const router = createRouter({
    routes,
    history: createWebHistory()
});

// router.afterEach((to,from,next) => {
//     window.scrollTo(0,0);
// });

export default router;