<template>
    <div class="dialog-content">
        <img class="dialog-content-login" src="/images/dialog_login_text.png" alt="">
        <img class="dialog-content-bg" src="/images/dialog_bg.png" alt="">
        <img class="dialog-content-logo" src="/images/dialog_login.png" alt="">
        
        <div class="dialog-content-form">
            <div class="dialog-content-form-item">
                <input type="text" placeholder="输入用户名" v-model="name">
            </div>
            <div class="dialog-content-form-item">
                <input type="password" placeholder="输入用户密码" v-model="password">
            </div>
            <div class="dialog-content-form-item code">
                <input type="text" placeholder="输入右侧验证码" v-model="captcha">
                <div :style="{'background-image': `url('${ $baseImg + codeObj.imgurl}')`}" @click="getCodeFn"></div>
                <!-- <div @click="refreshCodeFn">
                    <img :src="codeImg" alt="">
                </div> -->
            </div>
            <div class="dialog-content-form-item sum">
                <input type="text" placeholder="输入右侧结果" v-model="result">
                <div>{{codeObj.question}}</div>
            </div>
            <div class="dialog-content-form-item confirm" @click="comfirmFn">
                {{ submiteText }} 
                <i v-if="status" class="el-icon-loading"></i>    
            </div>
            <div class="tips">
                <span @click="changeComponent('register')">现在注册</span>
                <span @click="changeComponent('FindPassword')">忘记密码</span>
            </div>
        </div>   
    </div>
</template>

<script>
import User from '@/api/user.js'
import { mixinsMethods } from './mixins'
import { mapMutations } from 'vuex'
export default {
    mixins: [mixinsMethods],
    data() {
        return {
            name: '',
            password: '',
            captcha: '',
            result: '',
            timer: null
        }
    },
    created(){
        this.getCodeFn()
    },
    destroyed(){
        clearTimeout(this.timer)
        clearTimeout(this.timeout)
    },
    methods: {
        comfirmFn(){
            if (this.status) return

            if(this.name === '') {
                this.$emit('showTipsFn', '请输入用户名！')
                return
            }
            if(this.name.length > 20) {
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
            if(this.result === '') {
                this.$emit('showTipsFn', '请输入右侧结果！')
                return
            }
            this.submiteText = '登录中...'
            this.status = true
            let params = {
                username: this.name, 
                password: this.password, 
                captcha: this.captcha,
                code: this.result,
                _captcha_id: this.codeObj._captcha_id,
            }
            User.userLogin(params).then(res => {
                this.$emit('showTipsFn', res.msg)
                if (res.code === 1) {
                    this.set_token(res.data.token)
                    this.set_user_info(res.data.user)
                    this.timer = setTimeout(()=>{
                        this.hideDialogFn()
                    },1500)
                }else{
                    this.result = ''
                    this.captcha = ''
                    this.getCodeFn()
                }
                
            })
            .finally(() => {
                this.submiteText = '确定'
                this.status = false
            })
        },
        changeComponent(type) {
            this.$emit('changeComponent', type)
        },
        ...mapMutations(['set_token', 'set_user_info'])
    },
}
</script>

<style>

</style>