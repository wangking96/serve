import qs from 'qs'
import request from '@/utils/request'
const User = {
    baseurl1: '/s/user/public',
    baseurl2: '/s/user/profile',
    baseurl3: '/s/user',
    isClick: true,
    delay: 1000,
    getCode() { 
        return new Promise((resolve, reject) => {
            request({
                url: this.baseurl1 + '/getCode'
            }).then(res => {
                resolve(res.data.data)
            }).catch(err => {
                reject(err)
            })
        })
    },
    userLogin(data) {
        return new Promise((resolve, reject) => {
            request({
                data: qs.stringify(data),
                method: 'post',
                url: this.baseurl1 + '/login',
            }).then(res => {
                res && resolve(res.data)
            }).catch(err => {
                reject(err)
            })
        })
    },
    userRegister(data) {
        return new Promise((resolve, reject) => {
            request({
                data: qs.stringify(data),
                method: 'post',
                url: this.baseurl1 + '/register',
            }).then(res => {
                res && resolve(res.data)
            }).catch(err => {
                reject(err)
            })
        })
    },
    userLogout() {
        return new Promise((resolve, reject) => {
            request({
                method: 'get',
                url: this.baseurl1 + '/logout',
            }).then(res => {
                res && resolve(res.data)
            }).catch(err => {
                reject(err)
            })
        })
    },
    changePassword(data) {
        return new Promise((resolve, reject) => {
            request({
                data,
                method: 'post',
                url: this.baseurl2 + '/changePassword',
            }).then(res => {
                res && resolve(res.data)
            }).catch(err => {
                reject(err)
            })
        })
    },
    findPassword(data) {
        return new Promise((resolve, reject) => {
            request({
                data,
                method: 'post',
                url: this.baseurl1 + '/findPwd',
            }).then(res => {
                res && resolve(res.data)
            }).catch(err => {
                reject(err)
            })
        })
    },
    updateUserInfo(data) {
        return new Promise((resolve, reject) => {
            request({
                data,
                method: 'post',
                url: this.baseurl2 + '/userInfo',
            }).then(res => {
                res && resolve(res.data)
            }).catch(err => {
                reject(err)
            })
        })
    },
    userSetComments(data) {
        return new Promise((resolve, reject) => {
            request({
                data,
                method: 'post',
                url: this.baseurl3 + '/comments/setComments',
            }).then(res => {
                res && resolve(res.data)
            }).catch(err => {
                reject(err)
            })
        })
    },
    getComments(params) {
        return new Promise((resolve, reject) => {
            request({
                params,
                url: this.baseurl3 + '/comments/getComments',
            }).then(res => {
                res && resolve(res.data)
            }).catch(err => {
                reject(err)
            })
        })
    },
    fileUpload(data) {
        return new Promise((resolve, reject) => {
            request({
                data,
                method: 'post',
                url: this.baseurl3 + '/upload/one',
            }).then(res => {
                res && resolve(res.data)
            }).catch(err => {
                reject(err)
            })
        })
    },
    deleteFile(data) {
        return new Promise((resolve, reject) => {
            request({
                data,
                method: 'post',
                url: this.baseurl3 + '/upload/delete',
            }).then(res => {
                res && resolve(res.data)
            }).catch(err => {
                reject(err)
            })
        })
    }
}

export default User