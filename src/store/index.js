import { createStore } from 'vuex';
import createVuexPersistedstate from 'vuex-persistedstate';

import state from './state';
import actions from './actions';
import mutations from './mutations';

const store = createStore({
    state,
    actions,
    mutations,
    plugins: [
        createVuexPersistedstate({
            key: 'persistedstate'
        }),
    ]
})

export default store;
