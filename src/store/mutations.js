const mutations = {
    SET_CONFIG: (state, data) => {
        state.config = data;
    },
    SET_SERVICE: (state, data) => {
        console.log(state, data);
    },
    SET_USERINFO: (state, data = {}) => {
        state.userInfo = data;
    },
    SET_LOGININFO: (state, data = {}) => {
        state.loginInfo = data;
    },
    SET_LIVEINFO: (state, data = {}) => {
        state.liveInfo = data;
    },
    SET_MATCHINFO: (state, data = {}) => {
        state.matchInfo = data;
    }
}
export default mutations;