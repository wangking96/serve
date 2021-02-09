import serve from '@/utils/http'

const User = {
    url: '/userInfo',
    isClick: true,
    delay: 1000,
    userInfo(data) {
        return new Promise((resolve, reject) => {
            serve({
                url: this.url,
                method: 'get',
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