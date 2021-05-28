const api = {
    config: 'Home.getConfig',
    download: 'PCHome.download',
    anchorRecommend: 'Home.GetHot',
    slide: 'Home.GetSlideEvents',
    swiper: 'Slide.GetSlide',

    // 直播
    liveInfo: 'Live.GetLiveInfo',
    enterLiveRoom: 'Live.EnterRoom',
    liveAnchorRecommend: 'Home.GetRecommendedStream',
    subscribe: 'User.GetSubscribe',
    subscribeAnchor: 'Home.SubscribeAnchor',
    sensitiveWords: 'Home.GetFilterField',                  // 获取敏感词

    // 用户
    userInfo: 'User.GetBaseInfo',
    userLogin: 'Login.UserLogin',
    userRegister: 'Login.UserReg',
    getCheckCode: 'Login.GetCode',
    userIsExist: 'PCLogin.CheckUserExists',
    userChangePass: 'User.UpdatePass',      

    // 赛事
    // football: '/api/v1/football/getMatchAllList',
    // playingList: 'api/v1/football/getMatchPlayingList',
    // matchListByDate: 'api/v1/football/getMatchListByDate',

    // 篮球足球 赛事    1 足球  2 篮球
    getMatch: (id = 1) => {
        return `/api/v1/${id === 1 ? 'football' : 'basketball'}/getMatch`;
    },
    matchAllList: (id = 1) => {
        return `/api/v1/${id === 1 ? 'football' : 'basketball'}/getMatchAllList`;
    },
    matchPlayingList: (id = 1) => {
        return `/api/v1/${id === 1 ? 'football' : 'basketball'}/getMatchPlayingList`;
    },
    matchListByDate: (id = 1) => {
        return `/api/v1/${id === 1 ? 'football' : 'basketball'}/getMatchListByDate`;
    },
    // 电竞赛事     status => 1 进行中  0 赛程  2 赛果
    gamingMatchAll: 'Match.GetLOLMatchList',
    gameingMatchListByStat:'Match.GetLOLMatchListByStat',
}
export default api;