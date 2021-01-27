import axios from 'axios'
import { Toast } from 'vant'
import store from '../store'
import router from '../router'

export const clearRequest = {
    source: {
        token: null,
        cancel: null
    }
}

const CancelToken = axios.CancelToken

// 需要跳转到登录页的code
const invalidCodes = [1001]

const request = axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? '/api' : '/',
    // withCredentials: true,
    timeout: 15000
})

request.interceptors.request.use(config => {
    config.cancelToken = clearRequest.source.token // 这句很重要

    const token = store.state.user.userInfo.token
    if (token) config.headers['Authorization'] = token

    return config
}, err => {
    console.log(err)
    Promise.reject(err)
})

request.interceptors.response.use(res => {
    if (res.data.code === 200) return res
    if (!res.data.code) {
        Toast.fail('Error')
        return Promise.reject('Error')
    }

    if (invalidCodes.includes(res.data.code)) {
        store.state.user.userInfo.token && Toast.fail('账号已在其他浏览/设备登陆')
        store.commit('DEL_USERINFO')
        if (router.name != 'home') {
            router.push({name: 'home'})
        }
        return Promise.reject(res)
    }
    
    Toast.fail(res.data.message || res.data.result)
    return Promise.reject(res)
}, err => {
    console.log(err.response)
    if (err.response.status === 404) {
        Toast.fail('404:' + err.response.statusText)
        return Promise.reject(err)
    }
    if (err.response.status === 500) {
        Toast.fail('Error of server')
        return Promise.reject(err)
    }
    Toast.fail(err.message)
    return Promise.reject(err)
})

export default request
