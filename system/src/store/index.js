import { createStore } from 'vuex'
import getters from './getters'

const files = require.context('./modules', true, /\.js$/)
const modules = files.keys().reduce((modules, path) => {
    const name = path.replace(/^\.\/(.*)\.\w+$/, '$1')
    modules[name] = files(path).default
    return modules
}, {})

export default createStore({
    getters,
    modules
})
