import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import(/* webpackChunkName: "about" */ '../views/Home/index.vue'),
        meta: {
            keepAlive: true
        }      
    },
    {
        path: '/details',
        name: 'Details',
        component: () => import('../views/Details/index.vue')
    },
    {
        path: '/person',
        name: 'Person',
        component: () => import('../views/Person/index.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

const whiteList = ['/details', '/person']

router.beforeEach((to, from, next) => {
    if(whiteList.includes(to.path) && !store.getters.token) {
        Vue.prototype.$showDialog(true)
        if(from.name === 'Home')  return 
        else next('/')
    }
    if(to.name === 'Details' || to.name === 'Person')  scrollTo(0, 0)
    next()
})

export default router
