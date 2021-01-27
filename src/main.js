import Vue from 'vue'
import FastClick from 'fastclick'
import Vant from 'vant'
import 'vant/lib/index.css'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import i18n from './i18n'

import 'reset-css'
import '@/assets/style/index.scss'

// icon
import '@/assets/icons'

Vue.config.productionTip = false

FastClick.attach(document.body)

Vue.use(Vant)

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
