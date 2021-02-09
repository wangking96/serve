import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'lib-flexible/flexible.js'
import 'reset-css'
import 'element-ui/lib/theme-chalk/index.css';
import './utils/uiComponents'

import { isMobile } from './utils/tools'

isMobile ? require('./assets/style/mIndex.scss') : require('./assets/style/pc.scss')

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
