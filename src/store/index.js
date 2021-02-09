import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import getters from './getters'
import user from './modules/user'
import settings from './modules/settings'

export default new Vuex.Store({
    getters,
    modules: {
        user,
        settings
    }
})
