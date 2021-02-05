<template>
    <div class="nav">
        <div class="wrap">
            <img src="/images/nav.bg.png" alt="">
            <div class="main">
                <div class="nav-item" :class="{'active': navActive.home}" @click="jumpHome">首页</div>
                <div class="nav-item" :class="{'active': navActive.miss}" @click="jumpMiss">小姐</div>
                <div class="nav-item"><a href="http://kumi111.com/" target="_blank">看片</a></div>
                <div class="nav-item"><a href="https://www.ob148.com/app/home" target="_blank">娱乐</a></div>
                <div class="user-info">
                    <div v-if="token" @click="jumpPerson">
                        <i class="person"></i>
                        个人中心
                    </div>
                    <div @click="showLoginFn" v-else>
                        <i class="login"></i>
                        登录
                    </div>
                    <div>
                        <i class="kf"></i>
                        客服
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    data(){
        return {
            scrollTop: 0,
            el: null
        }
    },
    computed: {
        ...mapGetters(['navActive', 'token'])
    },
    watch: {
        scrollTop(s) {
            this.$route.name === 'Home' && this.$store.commit('set_navActive', {
                home: s >= this.el.offsetTop - 94 ? false : true,
                miss: s >= this.el.offsetTop - 94 ? true : false
            })
        }
    },
    mounted () {
        this.$store.commit('set_navActive', {home: false, miss: false})
        this.el = document.querySelector('.place')
        window.addEventListener('scroll', this.handleScroll, true)
    },
    destroyed () {
        window.removeEventListener('scroll', this.handleScroll)
    },
    methods: {
        jumpHome() {
            this.$store.commit('set_scroll_top', 0)
            this.scrollFn(0, true, false)
        },
        jumpMiss() {
            if(this.$route.name != 'Home') {
                this.scrollFn(0, false, true)
            }else {
                this.el && this.scrollFn(this.el.offsetTop, false, true)
            }
        },
        scrollFn(top, home, miss){
            this.$route.name === 'Home' && window.scrollTo({ 
                top, 
                behavior: "smooth" 
            })
            this.$store.commit('set_navActive', {
                home,
                miss
            })
            this.$router.push('/')
        },
        handleScroll () {
            this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        },
        showLoginFn(){
            this.$showDialog(true)
        },

        jumpPerson(){
            this.$store.commit('set_navActive', {home: false, miss: false})
            this.$router.push('/person')
        }
    }
}
</script>

<style lang="scss" scoped>
.nav {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    .wrap {
        position: relative;
    }
    img {
        margin-left: -1px;
        width: calc(100% + 1px);
        display: block;
    }
    .main {
        height: 84px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -600px;
        transform: translateY(-50%);
        .user-info{
            overflow: hidden;
            margin-left: 24px;
            div {
                float: left;
                display: flex;
                margin-right: 24px;
                align-items: center;
                word-break: keep-all;
                cursor: pointer;
                &:hover {
                    color: #FF9600;
                }
                &:hover .login {
                    background-image: url('/images/login-active.png');
                }
                &:hover .kf {
                    background-image: url('/images/kf-active.png');
                }
                &:hover .person {
                    background-image: url('/images/person-active.png');
                }
                i {
                    width: 28px;
                    height: 28px;
                    display: block;
                    margin-right: 10px;
                    background-size: cover;
                    background-repeat: no-repeat;
                    &.login {
                        background-image: url('/images/login.png');
                    }
                    &.kf {
                        background-image: url('/images/kf.png');
                    }
                    &.person {
                        height: 26px;
                        margin-right: 4px;
                        background-size: contain;
                        background-image: url('/images/person.png');
                    }
                }
            }
        }
    }
    &-item {
        width: 140px;
        height: 54px;
        line-height: 54px;
        text-align: center;
        cursor: pointer;
        background-size: contain;
        background-position-x: 50%;
        background-position-y: 2px;
        background-repeat: no-repeat;
        background-image: url('/images/nav-default.png');
        a {
            display: block;
            color: #fff;
            text-decoration: none;
        }
    }
    .active {
        background-image: url('/images/nav-active.png');
    }
}
</style>