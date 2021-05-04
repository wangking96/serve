import axios, { AxiosRequestConfig } from 'axios';

const service = axios.create({
    baseURL: '',
    timeout: 10000
})

service.interceptors.request.use((config:AxiosRequestConfig) => {
    let token = localStorage.getItem('token') || ''
    if(token) config.headers.token = token
    return config;
})

service.interceptors.response.use(res => {
    console.log(res.data);
    
    return res.data.data
})

export default service