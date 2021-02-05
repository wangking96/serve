import Vue from 'vue'
import store from '@/store'
import Dialog from './Dialog.vue'

function install(){
    const initDialog = () => {
        const Profile = Vue.extend(Dialog)
        const el = new Profile({store}).$mount().$el
        el && document.body.appendChild(el)
        document.body.className = 'is-component'
    } 

    Vue.prototype.$showDialog = (bool, callback) => {
        if(document.querySelector('.dialog')) return
        bool && initDialog()
        callback && callback()
    }
}

export default install