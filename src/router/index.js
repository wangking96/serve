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
        path: '/matchLiveRoom',
        name: 'matchLiveRoom',
        component: () => import('../views/match/MatchLiveRoom.vue')
    },{
        path: '/login',
        name: 'login',
        component: () => import('../views/mine/UserLogin.vue')
    },{
        path: '/register',
        name: 'register',
        component: () => import('../views/mine/UserRegister.vue')
    },{
        path: '/find',
        name: 'find',
        component: () => import('../views/mine/UserFindPassword.vue')
    },{
        path: '/subscribe',
        name: 'subscribe',
        component: () => import('../views/mine/Subscribe.vue')
    },{
        path: '/changePasswprd',
        name: 'changePasswprd',
        component: () => import('../views/mine/ChangePasswprd.vue')
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