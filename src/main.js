import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css';
import VueLazyload from 'vue-lazyload'
import 'reset-css'
import './assets/css/index.scss'

import './utils/useComponent'
import dialog from './components/dialog'

Vue.use(dialog)

Vue.use(VueLazyload, {  
    // preLoad: 1.3,   //预加载的宽高比
    error: '/images/error.png',//图片加载失败时使用的图片源
    // loading: 'dist/loading.gif',//图片加载的路径
    attempt: 1//尝试加载次数
})

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
