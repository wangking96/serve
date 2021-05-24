import axios from 'axios';
import { Toast } from 'vant';
import store from '../store/index';
import { matchUrl, defaultUrl } from '../config/index';
// let message = null;
// export const getApp=(app)=>{
//     message = app.config.globalProperties.$message;
// }
const service = axios.create({
    baseURL: '',
    timeout: 10000
})

let httpCode = {
    400: "请求参数错误",
    401: "权限不足, 请重新登录",
    403: "服务器拒绝本次访问",
    404: "请求资源未找到",
    500: "内部服务器错误",
    501: "服务器不支持该请求中使用的方法",
    502: "网关错误",
    504: "网关超时",
} 

service.interceptors.request.use((config) => {
    config.baseURL = config.type === 'default' ? defaultUrl : matchUrl;
    let token = localStorage.getItem('token') || '';
    if (token) config.headers.token = token;
    // config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    return config;
})
service.interceptors.response.use(res => {
    const data = res.data.data || '';
    // if(res.data.ret !== 200) {
    //     store.commit('SET_USERINFO');
    //     store.commit('SET_LIVEINFO');
    //     store.commit('SET_LOGININFO');
    // }
    if(data.code === 700) {
        Toast({
            message: data.msg,
            // onClose: () => {
            //     store.commit('SET_USERINFO');
            //     store.commit('SET_LIVEINFO');
            //     store.commit('SET_LOGININFO');
            // }
        });
    }
    return data;
})

export default service