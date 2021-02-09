const getters = {
    spaceType: state => state.settings.spaceType,
    province: state => state.settings.province,
    city: state => state.settings.city,
    area: state => state.settings.area,
    navActive: state => state.settings.navActive,
    scrollTop: state => state.settings.scrollTop,
    token: state => state.user.token,
    userInfo: state => state.user.userInfo,
}

export default getters 