<template>
    <div class="login">
        <div class="login-logo">
            <img 
                v-if="setting.static_host && setting.h5_logo"
                :src="`${setting.static_host.value}${setting.h5_logo.icon}`" alt="">
        </div>
        <div class="login-main" :style="{height: height + 'px'}">
            <div class="login-main-left">
                <h2>Đăng nhập</h2>
                <div class="login-main-left-form">
                    <div class="login-main-left-form-item">
                        <img class="login-main-left-form-item-left-icon" src="/images/icon-account.png" alt="">
                        <input 
                            type="text" 
                            placeholder="Tài khoản đăng nhập" 
                            v-model="account" >
                    </div>
                    <div class="login-main-left-form-item">
                        <img 
                            class="login-main-left-form-item-left-icon" 
                            src="/images/icon-password.png">
                        <input 
                            :type="isShowPassword ? 'text' : 'password'" 
                            placeholder="Mật khẩu"
                            v-model="password" />
                        <div 
                            class="login-main-left-form-item-right-icon"  
                            @click="showPasswordFn">
                            <img :src="isShowPassword ? '/images/icon-close.png' : '/images/icon-open.png'">
                        </div>
                    </div>
                    <div class="login-main-left-form-item">
                        <img class="login-main-left-form-item-left-icon" src="/images/icon-yzm.png" alt="">
                        <input 
                            type="text" 
                            maxlength="4"
                            placeholder="Vui lòng nhập mã xác minh"
                            v-model="checkVerifyCode" />
                        <img 
                            class="login-main-left-form-item-right-icon" 
                            v-if="verifyCode.img"
                            :src="verifyCode.img"
                            @click="refreshCodeFn">
                    </div>
                    
                    <div class="login-main-left-form-passwordbox">
                        <div class="login-main-left-form-passwordbox-left" @click="isRememberPasswordFn">
                            <span>
                                <img src="/images/icon-jizhumima.png" v-if="isRememberPassword">
                            </span>
                            <label for="remember">Ghi nhớ mật khẩu</label>
                        </div>
                        <div class="login-main-left-form-passwordbox-right">忘记密码？</div>
                    </div>

                    <div class="login-main-left-form-submite" @click="userLoginFn">Đăng nhập</div>
                </div>
            </div>
            <div class="login-main-right">
                <div class="" :style="{height: height/2 + 'px'}" @click="goBackHome">
                    <img src="/images/icon-home.png" alt="">
                    首页
                </div>
                <div>|</div>
                <div class="" :style="{height: height/2 + 'px'}">
                    <img src="/images/icon-register.png" alt="">
                    注册
                </div>
            </div>
        </div>
        <div class="login-other">
            <div class="login-other-text">其他</div>
            <ul class="login-other-list">
                <li 
                    v-for="(item, i) in otherList"
                    :key="i">
                    <img :src="item.icon" alt="">
                    <p>{{ item.text }}</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>

import User from '@/api/User'
import PltCommon from '@/api/PltCommon'
import { mapGetters } from 'vuex'

export default {
    data(){
        return {
            height: 265,
            otherList: [
                { text: '试玩', icon: '/images/login/shiwan.png' },
                { text: '客服', icon: '/images/login/kf.png' },
                { text: '电脑版', icon: '/images/login/pc.png' },
                { text: '下载', icon: '/images/login/app.png' }
            ],
            isRememberPassword: true,
            isShowPassword: false,
            account: '',
            password: '',
            verifyCode: {
                id: null,
                img: ''
            },
            checkVerifyCode: '',
            loginStatus: false

        }
    },
    computed: {
        ...mapGetters(['setting'])
    },
    created(){
        this.getCaptcha()
    },
    methods: {
        getCaptcha(){
            PltCommon.getCaptcha().then(res => {
                const data = res.result
                if(data){
                    this.verifyCode.id = data.captcha_id
                    this.verifyCode.img = data.data
                }
            })
        },  
        refreshCodeFn(){
            this.getCaptcha()
        },      
        isRememberPasswordFn(){
            this.isRememberPassword = !this.isRememberPassword
        },
        goBackHome(){
            this.$router.push('/')
        },
        showPasswordFn(){
            this.isShowPassword = !this.isShowPassword
        },
        userLoginFn(){
            if(this.loginStatus) return
            const data = {
                uname: this.account,
                passwd: this.password,
                domain: location.origin,
                terminal: 2,
                captcha_id: this.verifyCode.id,
                captcha_code: this.checkVerifyCode
            }
            this.loginStatus = true

            User.loginFn(data)
                .then(res => {
                    this.$store.commit('SET_TOKEN', res.data.result)
                    this.$toast({
                        icon: 'success',
                        message: '登录成功',
                        onClose: () => {
                            this.$router.push('/')
                        }
                    })
                })
                .catch(err => {
                    this.getCaptcha()
                })
                .finally(() => {
                    this.loginStatus = false
                })
        }
    }
}
</script>

<style lang="scss" scoped>
.login {
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    color: #fff;
    position: absolute;
    background-size: cover;
    background-repeat: no-repeat;
    background-image: url('/images/login/bg.png');
    &-logo {
        height: 50px;
        margin-top: 30px;
        margin-bottom: 30px;
        text-align: center;
        img {
            width: 175px;
            height: 50px;
        }
    }
    &-main {
        margin: 0 20px;
        display: flex;
        justify-content: space-between;
        border-radius: 20px;
        overflow: hidden;
        &-left {
            padding: 10px 0;
            h2 {
                padding: 10px 0;
                text-align: center;
            }
            flex: 1;
            height: 100%;
            background: rgba(255, 255, 255, 0.2);
            &-form { 
                padding: 0 26px;
                & > div {
                    margin: 0 auto 10px;
                }
                &-item {
                    width: 100%;
                    height: 34px;
                    overflow: hidden;
                    border-radius: 30px;
                    position: relative;
                    background: rgba(0, 0, 0, 0.2);
                    input {
                        width: 60%;
                        padding: 0;
                        border: 0;
                        height: 100%;
                        position: absolute;
                        top: 0;
                        left: 40px;
                        background-color: transparent;
                        &::-webkit-input-placeholder{
                            color: #fff;
                            font-size: 12px;
                        }
                    }
                    &-left-icon {
                        width: 16px;
                        height: 16px;
                        margin-top: -9px;
                        top: 50%;
                        left: 14px;
                        position: absolute;
                    }
                    &-right-icon {
                        width: 30%;
                        height: 100%;
                        top: 0;
                        right: 0;
                        position: absolute;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        img {
                            width: 20px;
                            height: 12px;
                        }
                    }
                }
                &-passwordbox {
                    display: flex;
                    justify-content: space-between;
                    padding: 8px 0px 0px 7px;
                    &-left {
                        display: flex;
                        align-items: center;
                        & > span {
                            display: block;
                            width: 12px;
                            height: 12px;
                            margin-right: 4px;
                            border-radius: 50%;
                            border: 2px solid #fff;
                            overflow: hidden;
                            img {
                                width: 100%;
                                height: 100%;
                            }
                        }
                    }
                }
                &-submite {
                    width: 100%;
                    height: 34px;
                    line-height: 34px;
                    text-align: center;
                    border-radius: 30px;
                    color: $font-important;
                    background-color: #fff;
                }
            }
        }
        &-right {
            width: 50px;
            height: 100%;
            background: rgba(0, 0, 0, 0.3);
            display: flex;
            -webkit-box-orient: vertical;
            -webkit-box-direction: normal;
            -ms-flex-direction: column;
            flex-direction: column;
            align-items: center;
            -ms-flex-pack: distribute;
            justify-content: space-around;
            & > div{
                margin: 0 auto;
                display: flex;
                align-items: center;
                writing-mode: vertical-rl;
                img {
                    width: 18px;
                    height: 18px;
                    margin: 20px 0;
                }
            }
        }
    }
    &-other {
        width: 220px;
        margin: 0 auto;
        &-text {
            margin: 20px auto;
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: space-between;
            &::before, &::after {
                content: '';
                width: 40%;
                height: 1px;
                display: block;
                background-color: #fff;
            }
        }
        &-list {
            display: flex;
            justify-content: space-between;
            li {
                &:not(:last-child) {
                    margin-right: 16px;
                }
                img {
                    width: 36px;
                    height: 36px;
                    margin-bottom: 10px;
                }
                p {
                    text-align: center;
                }
            }
        }
    }
}
</style>