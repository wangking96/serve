import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'reset-css'
import 'element-ui/lib/theme-chalk/index.css';

import {
  Tabs,
  TabPane,
  Steps,
  Step,
  Button,
  Row
} from 'element-ui'
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Steps)
Vue.use(Step)
Vue.use(Button)
Vue.use(Row)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
