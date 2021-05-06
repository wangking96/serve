import { createRouter, createWebHistory } from 'vue-router'

const routes = [{
        path: '/',
        name: 'Layout',
        component: () => import('@/views/Layout.vue'),
        children: [{
            path: '/home',
            name: 'Home',
            component: () => import('@/views/home/index.vue')
        },{
            path: '/guide',
            name: 'Guide',
            component: () => import('@/views/guide/index.vue')
        },{
            path: '/dashboard',
            name: 'Dashboard',
            component: () => import('@/views/dashboard/index.vue')
        },{
            path: '/person',
            name: 'Person',
            component: () => import('@/views/person/index.vue')
        },{
            path: '/chart',
            name: 'Chart',
            component: () => import('@/views/charts/index.vue')
        }]
    },{
        path: '/about',
        name: 'About',
        component: () => import( /* webpackChunkName: "about" */ '../views/home/About.vue')
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router