import {createStore} from 'vuex';
import {state} from './state';
import {mutations} from './mutations';
import {actions} from './actions';
import createPersistedState from "vuex-persistedstate";
export const store = createStore({
    state,
    mutations,
    actions,
    plugins: [createPersistedState()],
})
