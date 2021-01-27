const getters = {
    setting: state => state.user.setting,
    token: state => state.user.token,
    userInfo: state => state.user.userInfo,
    notice: state => state.user.notice,
    lotterys: state => state.lottery.lotterys,
    lotteryMap: state => state.lottery.lotteryMap
}

export default getters