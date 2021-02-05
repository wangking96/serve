<template>
    <div class="dialog-content">
        <img class="dialog-content-login" src="/images/dialog_find_text.png" alt="">
        <img class="dialog-content-bg" src="/images/dialog_bg.png" alt="">
        <img class="dialog-content-logo" src="/images/dialog_find.png" alt="">
        <div class="dialog-content-form">
            <div class="dialog-content-form-item find-password">
                <div 
                    :class="{'active': curFindType === f.id}" 
                    v-for="f in find" 
                    :key="f.id"
                    @click="changeFindType(f)">
                    {{f.text}}
                </div>
            </div>
            <div class="dialog-content-form-item">
                <input type="text" :placeholder="curFindType === 1 ? '请输入手机号码': '请输入邮箱账号'" v-model="userName">
            </div>
            <div class="dialog-content-form-item code">
                <input type="text" placeholder="输入右侧验证码" v-model="captcha">
                <div :style="{'background-image': `url('${ $baseImg + codeObj.imgurl}')`}" @click="getCodeFn"></div>
            </div>
            <div class="dialog-content-form-item sum">
                <input type="text" placeholder="输入右侧结果" v-model="result">
                <div>{{codeObj.question}}</div>
            </div>
            <div class="dialog-content-form-item confirm">确定</div>
            <div class="tips">
                <span @click="loginFn">已有账号？点此处登录</span>
            </div>
        </div>    
    </div>
</template>

<script>
import { mixinsMethods } from './mixins'
const find = [
    {id: 1, text: '通过手机找回'}, 
    {id: 2, text: '通过邮箱找回'}
]
export default {
    mixins: [mixinsMethods],
    data() {
        return {
            find,
            curFindType: 1,
            userName: '',
            captcha: '',
            result: null
        }
    },
    created(){
        this.getCodeFn()
    },
    methods: {
        loginFn() {
            this.$emit('changeComponent', 'login')
        },
        changeFindType(item) {
            this.curFindType = item.id
        }
    },
}
</script>

<style lang="scss" scoped>
.find-password {
    display: flex;    
    padding: 0 10px;
    align-items: center;
    box-sizing: border-box;
    justify-content: space-around;
    div {
        width: 120px;
        height: 24px;
        line-height: 24px;
        font-size: 12px;
        text-align: center;
        letter-spacing: 2px;
        cursor: pointer;
    }
    .active {
        font-size: 14px;
        font-weight: bold;
        border-radius: 4px;
        background: #F49024;
        border: 1px solid #C66C0B;
    }
}
</style>