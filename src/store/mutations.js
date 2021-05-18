const mutations = {
    SET_SERVICE: (state, data) => {
        console.log(state, data);
    },
    SET_USERINFO: (state, data) => {
        state.userInfo = data
    },
    SET_LOGININFO: (state, data) => {
        state.loginInfo = data
    },
}
export default mutations;