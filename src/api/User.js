import request from '@/utils/request'

const User = {
    url: '/user',
    isClick: true,
    delay: 1000,
    getSetting() {
        return new Promise((resolve, reject) => {
            request({
                url: this.url + '/v1/home/setting'
            }).then(res => {
                resolve(res.data.result)
            }).catch(err => {
                reject(err)
            })
        })
    },
    getNotice() {
        return new Promise((resolve, reject) => {
            request({
                url: this.url + '/v1/content/annlist'
            }).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err)
            })
        })
    },
    loginFn(data){
        return new Promise((resolve, reject) => {
            request({
                url: this.url + '/v3/user/sign',
                method: 'post',
                data
            }).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    }
}

export default User