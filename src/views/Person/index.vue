<template>
    <div class="person">
        <Nav />

        <div class="main">
            <div class="person-sidebar">
                <div 
                    :class="{'active': item.id === curSidebar}"
                    v-for="item in sidebar"
                    :key="item.id"
                    @click="changeSidebar(item)">
                    {{ item.name }}
                </div>
            </div>
            <div class="person-right">
                <transition name="slide-fade">
                    <component :is="curComponent" />
                </transition>
            </div>
        </div>
        <Foot />
    </div>
</template>
<script>
import Nav from '@/components/Nav'
import Vip from './Vip'
import Release from './Release'
import Released from './Released'
import Mine from './Mine'
import UpdatePassword from './UpdatePassword'
import Foot from '@/components/Foot'
import User from '@/api/user.js'
import { mapGetters, mapMutations } from 'vuex'
const sidebar = [
    { id:1, name: '升级VIP', com: 'Vip' },
    { id:2, name: '发布信息', com: 'Release' },
    { id:3, name: '我的发布', com: 'Released' },
    { id:4, name: '我的资料', com: 'Mine' },
    { id:5, name: '修改密码', com: 'UpdatePassword' },
    { id:6, name: '安全退出', com: '' },
]

export default {
    name: 'Person',
    components: {
        Nav,
        Vip,
        Release,
        Released,
        Mine,
        UpdatePassword,
        Foot
    },
    computed: {
        ...mapGetters(['token'])
    },
    data() {
        return {
            curComponent: 'Vip',
            sidebar,
            curSidebar: 1,
            timeout: null
        }
    },
    destroyed(){
        clearTimeout(this.timeout)
    },
    methods: {
        ...mapMutations(['set_token', 'set_user_info']),
        changeSidebar(item) {
            if(item.id === 6){
                const loading = this.$loading({
                    lock: true,
                    text: '拼命加载中...',
                    customClass: 'serveloading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                User.userLogout().then(res => {
                    if(res.code === 1){
                        this.$message.success(res.msg)
                        sessionStorage.removeItem('token')
                        this.timeout = setTimeout(()=>{
                            this.set_token('')
                            this.set_user_info({})
                            this.$router.push('/')
                        },1500)
                    }
                })
                .finally(()=>{
                    loading.close()
                })
            }else{
                this.curSidebar = item.id
                this.curComponent = item.com
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.slide-fade-enter-active {
    transition: all .2s ease .4s;
}
.slide-fade-leave-active {
    transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to {
    transform: translateX(10px);
    opacity: 0;
}
.person {
    padding-top: 120px;
    &::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        z-index: -1;
        width: 100%;
        height: 100%;
        padding-bottom: 100px;
        background-size: cover;
        background-repeat: no-repeat;
        background-color: rgba(0,0,0,.95);
        background-image: url('/images/person-bg.png');
    }
    .main {
        overflow: hidden;
        &::after {
            content: '';
            clear: both;
        }
    }
    &-sidebar {
        float: left;
        width: 180px;
        border-radius: 12px;
        padding: 60px 0;
        background: rgba(0,0,0,.4);
        div {
            width: 100%;
            height: 50px;
            line-height: 50px;
            text-align: center;
            font-size: 18px;
            letter-spacing: 2px;
            cursor: pointer;
            color: rgba(255,255,255, .9);
            &:not(:last-child) {
                margin-bottom: 15px;
            }
        }
        .active, div:hover {
            color: #BE3086;
            background: rgba(129,22,87,.3);
        }
    }
    &-right {
        float: right;
        width: 950px;
        border-radius: 12px;
        background-color: rgba(0,0,0,.4);
    }
}
</style>

<style lang="scss">
.serveloading {
    .el-loading-spinner i {
        color: #fff;
        font-size: 44px;
    }
    .el-loading-spinner .el-loading-text {
        color: #fff;
        font-size: 18px;
        padding-left: 16px;
        margin-top: 16px;
        letter-spacing: 1px;
    }
}
</style>