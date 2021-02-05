const user = {
    state: {
        userInfo: JSON.parse(sessionStorage.getItem('userInfo')) || {},
        token: sessionStorage.getItem('token') || ''
    },
    mutations: {
        set_user_info(state, data){
            state.userInfo = data
            sessionStorage.setItem('userInfo', JSON.stringify(data))
        },
        set_token(state, data){
            state.token = data
            sessionStorage.setItem('token', data)
        }
    }
}

export default user