<template>
    <div class="dialog">
        <div class="dialog-wrap" :style="style">
            <div class="dialog-wrap-head">
                <img 
                    class="dialog-wrap-close" 
                    src="/images/dialog_close.png" 
                    @click="closeLoginDialog">
            </div>

            <component 
                :is="componentId"
                @showTipsFn="showTipsFn"
                @changeComponent="changeComponent" >
            </component>

            <div class="dialog-wrap-foot">
                <span class="tips" v-if="showTips">{{ tipsText }}</span>
            </div>
        </div>
    </div>
</template>
<script>
import Login from './Login'
import Register from './Register'
import FindPassword from './FindPassword'

export default {
    components: {
        Login,
        Register,
        FindPassword
    },
    data() {
        return {
            componentId: 'Login',
            showTips: false,
            style: {
                marginTop: ''
            },
            timeout: null,
            timeout1: null,
            tipsText: '',
            code: {}
        }
    },
    destroyed(){
        clearTimeout(this.timeout)
        clearTimeout(this.timeout1)
    },
    methods: {
        closeLoginDialog(){
            let el = this.$el.querySelector('.dialog-wrap')
            el.style.marginTop = '-50vh'
            this.timeout1 = setTimeout(() => {
                document.body.removeChild(this.$el)
                document.body.className = ''
            }, 280)
        },
        changeComponent(type){
            this.componentId = type
        },
        showTipsFn(text){
            this.showTips = !this.showTips
            this.tipsText = text
            this.timeout = setTimeout(() => {
                this.showTips = !this.showTips
            }, 2000)
        }
    }
}
</script>
<style lang="scss">
@keyframes slide-down {  
    from { 
        margin-top: -50vh; 
    }
    to { 
        margin-top: 15vh;
    }  
}
@keyframes tips-height {  
    from { 
        height: 0; 
    }
    to { 
        height: 52px; 
    }  
}
.dialog {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 999;
    overflow: auto;
    background: rgba(0,0,0, .5);
    &-wrap {
        width: 710px;
        margin: 0 auto 50px;
        border-radius: 2px;
        margin-top: 15vh;
        animation: slide-down .3s;
        transition-duration: .2s;
        &-head {
            margin-bottom: 80px;
            position: relative;
            height: 60px;
            img {
                position: absolute;
                right: -70px;
                cursor: pointer;
            }
        }
        &-foot {
            .tips {
                text-align: center;
                display: inline-block;
                margin-top: 26px;
                margin-left: 140px;
                padding: 0 18px;
                // width: 272px;
                height: 52px;
                line-height: 52px;
                font-size: 19px;
                font-weight: bold;
                color: #FFFFFF;
                overflow: hidden;
                letter-spacing: 2px;
                border-radius: 7px;
                font-family: Microsoft YaHei;
                background-color: #0D2D4D;
                border: 1px solid #D43198;
                animation: tips-height .4s;
            }
        }
    }
    &-content {
        position: relative;
        &-login {
            height: 50px;
            margin-top: -25px;
            left: 70px;
            position: absolute;
        }
        &-logo {
            position: absolute;
            right: -94px;
            bottom: 0;
        }
        &-bg {
            height: 336px;
        }
        &-form{
            position: absolute;
            top: 46px;
            left: 70px;
            &-item {
                width: 330px;
                height: 32px;
                color: #fff;
                margin-bottom: 18px;
                overflow: hidden;
            }
            input {
                width: 100%;
                height: 100%;
                border: 0;
                outline: none;
                font-size: 14px;
                padding-left: 14px;
                box-sizing: border-box;
            }
            .code, .sum {
                input, div {
                    width: 46%;
                    height: 100%;
                    float: left;
                }
                div {
                    float: right;
                    cursor: pointer;
                    line-height: 32px;
                    text-align: center;
                    letter-spacing: 5px;
                    font-style: italic;
                    img {
                        width: 100%;
                    }
                }
            }
            .code div{
                font-size: 34px;
                font-weight: bold;
                color: #BF9738;
                background-size: cover;
                background-repeat: no-repeat;
                background-position-y: bottom;
            }
            .sum div {
                background-color: #40B619;
            }
            .confirm {
                cursor: pointer;
                line-height: 32px;
                letter-spacing: 2px;
                border-radius: 4px;
                text-align: center;
                justify-content: center;
                background-color: #F49024;
                &:active {
                    background-size: cover;
                    background-repeat: no-repeat;
                    background-image: url('/images/confirm-bg.png');
                }
            }
            .tips {
                font-size: 14px;
                font-weight: bold;
                color: #F49024;
                line-height: 20px;
                text-align: center;
                span {
                    cursor: pointer;
                    margin-right: 20px;
                }
            }
        }
    }
}
</style>