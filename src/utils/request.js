import vue from 'vue'
import router from '@/router'
import axios from 'axios'
import store from '../store'

const serve = axios.create({
    // baseURL: process.env.NODE_ENV === 'development' ? '' : 'http://red.shortbak.com',
    timeout: 15000
})
let url = ''
serve.interceptors.request.use( config => {
    url = config.url
    let token = store.getters.token
    if(token) config.headers['token'] = token
    config.headers['device-type'] = 'web'
    return config
},
error => {
    Promise.reject(error)
})

serve.interceptors.response.use( res => {
    if(res.data.code === 10001) {
        store.commit('set_token', '')
        store.commit('set_user_info', {})
        router.push('/')
    }
    if(res.data.code != 1 && !(url.includes('/login') || url.includes('/register'))) {
        vue.prototype.$message.error(res.data.msg)
        Promise.reject(res)
    }
    return res
},
error => {
    vue.prototype.$message.error('系统故障，数据异常！')
    return Promise.reject(error)
})

export default serve