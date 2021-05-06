import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import mitt from 'mitt'

import 'element-plus/lib/theme-chalk/index.css'
import '@/assets/style/common.scss'

const app = createApp(App)

app.config.globalProperties.wang = mitt()

const needUse = [
    store,
    router,
    ElementPlus
]
needUse.forEach(item => {
    app.use(item)
})
app.mount('#app')