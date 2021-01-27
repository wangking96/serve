import User from '@/api/User'

const user = {
	state: {
        setting: {},
        notice: {},
		userInfo: {},
		unCoin: 0,
		userBankList: [],
		from: '',
		token: ''
	},
	mutations: {
        SET_SETTING: (state, setting) => {
            state.setting = setting
        },
        SET_NOTICE: (state, notice) => {
            state.notice = notice
        },
		SET_USERINFO: (state, userInfo) => {
			state.userInfo = userInfo
		},
		SET_USERINFO_PROP: (state, {key,value}) => {
			state.userInfo[key] = value
		},
		DEL_USERINFO: (state) => {
			state.userInfo = {}
			state.unCoin = 0
			state.userBankList = []
			state.from = ''
		},
		SET_UNCOIN: (state, unCoin) => {
			state.unCoin = unCoin
		},
		SET_USERBANKLIST: (state, userBankList) => {
			state.userBankList = userBankList
		},
		SET_FROM: (state, from) => {
			state.from = from
		},
		SET_TOKEN: (state, data) => {
			state.token = data
		}
    },
    actions: {
        getSetting: ({commit, state}) => {
            User.getSetting().then(res => {
				console.log(2);
                commit('SET_SETTING', res.result)
            })
        },
        getNotice: ({commit}) => {
            User.getNotice().then(res => {
				commit('SET_NOTICE', res.result)
			})
        }
    }
}

export default user
