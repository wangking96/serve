import request from '@/utils/request'

const PltCommon = {
    url: '/pltcommon/notcheck',
    isClick: true,
    delay: 1000,
    getImage(data) {
        return new Promise((resolve, reject) => {
            request({
                url: this.url + '/image',
                method: 'post',
                data
            }).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err)
            })
        })
    },
    getCaptcha(){
        return new Promise((resolve, reject) => {
            request({
                url: this.url + '/captcha',
                method: 'post'
            }).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err)
            })
        })
    }
}

export default PltCommon