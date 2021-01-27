import request from '@/utils/request'

const Bet = {
    url: '/bet',
    isClick: true,
    delay: 1000,
    getLotteryList(params) {
        return new Promise((resolve, reject) => {
            request({
                url: this.url + '/v3/user/applist',
                params
            }).then(res => {
                resolve(res.data.result)
            }).catch(err => {
                reject(err)
            })
        })
    }
}

export default Bet