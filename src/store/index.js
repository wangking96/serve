import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getters'
import user from './modules/user'
import lottery from './modules/lottery'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		user,
		lottery
	},
	getters
})