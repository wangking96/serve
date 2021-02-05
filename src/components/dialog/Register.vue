<template>
    <div class="dialog-content">
        <img class="dialog-content-login" src="/images/dialog_register_text.png" alt="">
        <img class="dialog-content-bg" src="/images/dialog_bg.png" alt="">
        <img class="dialog-content-logo" src="/images/dialog_register.png" alt="">
        <div class="dialog-content-form">
            <div class="dialog-content-form-item">
                <input type="text" placeholder="输入用户名" v-model="userName">
            </div>
            <div class="dialog-content-form-item">
                <input type="password" placeholder="输入用户密码" v-model="password">
            </div>
            <div class="dialog-content-form-item code">
                <input type="text" placeholder="输入右侧验证码" v-model="captcha">
                <div :style="{'background-image': `url('${$baseImg + codeObj.imgurl}')`}" @click="getCodeFn"></div>
            </div>
            <div class="dialog-content-form-item sum">
                <input type="text" placeholder="输入右侧结果" v-model="code">
                <div>{{codeObj.question}}</div>
            </div>
            <div class="dialog-content-form-item confirm" @click="registerFn">
                {{submiteText}}
                <i v-if="status" class="el-icon-loading"></i> 
            </div>
            <div class="tips">
                <span @click="loginFn">已有账号？点此处登录</span>
            </div>
        </div>    
    </div>
</template>

<script>
import User from '@/api/user.js'
import { mixinsMethods } from './mixins'
export default {
    mixins: [mixinsMethods],
    data() {
        return {
            userName: '',
            password: '',
            captcha: '',
            code: ''
        }
    },
    created() {
        this.getCodeFn()
    },
    methods: {
        loginFn() {
            this.$emit('changeComponent', 'login')
        },
        registerFn(){
            if (this.status) return

            if(this.userName === '') {
                this.$emit('showTipsFn', '请输入用户名！')
                return
            }
            if(this.userName.length > 20) {
                this.$emit('showTipsFn', '用户名长度不能超过20个字符！')
                return
            }
            if(this.password === '') {
                this.$emit('showTipsFn', '请输入用户密码！')
                return
            }
            if(this.password.length < 6 ) {
                this.$emit('showTipsFn', '密码不能小于6个字符!')
                return
            }
            if(this.password.length > 20 ) {
                this.$emit('showTipsFn', '用户密码长度不能超过20个字符！')
                return
            }
            if(this.captcha === '') {
                this.$emit('showTipsFn', '请输入验证码！')
                return
            }
            if(this.captcha.length !== 4) {
                this.$emit('showTipsFn', '验证码格式不对！')
                return
            }
            if(this.code === '') {
                this.$emit('showTipsFn', '请输入右侧结果！')
                return
            }
            let params = {
                username: this.userName,
                password: this.password,
                captcha: this.captcha,
                code: this.code,
                _captcha_id: this.codeObj._captcha_id
            }
            
            this.submiteText = '注册中...'
            this.status = true

            User.userRegister(params).then(res => {
                this.$emit('showTipsFn', res.msg)
                res.code === 1 ? this.$emit('changeComponent', 'login') : this.getCodeFn()
            })
            .finally(() => {
                this.submiteText = '确定'
                this.status = false
            })
        }
    }
}
</script>

<style>

</style>