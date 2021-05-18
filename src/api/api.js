const api = {
    config: 'Home.getConfig',
    download: 'PCHome.download',
    anchorRecommend: 'Home.GetHot',
    slide: 'Home.GetSlideEvents',
    swiper: 'Slide.GetSlide',

    // 直播
    liveInfo: 'Live.GetLiveInfo',
    liveAnchorRecommend: 'Home.GetRecommendedStream',

    // 用户
    userInfo: 'User.GetBaseInfo',
    userLogin: 'Login.UserLogin',
    userRegister: 'Login.UserReg',
    getCheckCode: 'Login.GetCode',
    userIsExist: 'PCLogin.CheckUserExists',

    // 赛事
    football: '/api/v1/football/getMatchAllList',
    playingList: 'api/v1/football/getMatchPlayingList',
    matchListByDate: 'api/v1/football/getMatchListByDate',
}
export default api;