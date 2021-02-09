import qs from 'qs'
import request from '@/utils/request'
const setting = {
    baseUrl1: '/s/portal/index',
    baseUrl2: '/s/portal',
    isClick: true,
    delay: 1000,
    getHomeData(data){
        return new Promise((resolve, reject) => {
            request({
                url: this.baseUrl1,
                method: 'post',
                data: qs.stringify(data),
            }).then((res) => {
                resolve(res.data)
            }).catch((err) => {
                reject(err)
            })
        })
    },
    getDetailsData(id){
        return new Promise((resolve, reject) => {
            request({
                url: this.baseUrl1 + '/detail',
                method: 'get',
                params: {
                    id
                },
            }).then((res) => {
                resolve(res.data)
            }).catch((err) => {
                reject(err)
            })
        })
    },
    getAreaInfo(id){
        return new Promise((resolve, reject) => {
            request({
                url: this.baseUrl1 + '/getAreaInfo',
                method: 'get',
                params: {
                    id
                },
            }).then((res) => {
                resolve(res.data)
            }).catch((err) => {
                reject(err)
            })
        })
    },
    getArticles(params){
        return new Promise((resolve, reject) => {
            request({
                url: this.baseUrl2 + '/user/articles',
                method: 'get',
                params
            }).then((res) => {
                resolve(res.data)
            }).catch((err) => {
                reject(err)
            })
        })
    },
    releaseInfo(data){
        return new Promise((resolve, reject) => {
            request({
                url: this.baseUrl2 + '/articles/addinfo',
                method: 'post',
                data
            }).then((res) => {
                resolve(res.data)
            }).catch((err) => {
                reject(err)
            })
        })
    }
}

export default setting