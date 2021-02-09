import axios from 'axios'

const serve = axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? '/api' : '/',
    // baseURL: 'http://172.17.124.44:30/api/',
    timeout: 15000
})

serve.interceptors.request.use(config => {
    return config
}, err => {
    console.log(err)
})

serve.interceptors.response.use(res => {
    return res.data
}, err=> {
    console.log(err);
})

export default serve