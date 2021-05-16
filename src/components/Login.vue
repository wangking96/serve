<template>
    <Layout>
        <div class="login bg">
            <div class="bg-back" @click="goBackFn">
                <img src="../assets/images/public/left-arrow.png" alt="back" />
            </div>
            <div class="bg-form">
                <img
                    src="../assets/images/public/login-logo.png"
                    alt="logo"
                    class="logo"
                />
                <div class="bg-form-item">
                    <div class="bg-form-item-input">
                        <div class="icon phone"></div>
                        <input
                            type="text"
                            maxlength="11"
                            placeholder="请输入您的手机号"
                        />
                    </div>
                    <div class="bg-form-item-tips" v-if="phoneTips">
                        手机号格式有误
                    </div>
                </div>
                <div class="bg-form-item">
                    <div class="bg-form-item-input">
                        <div class="icon password"></div>
                        <input
                            type="password"
                            maxlength="20"
                            placeholder="请输入密码"
                        />
                    </div>
                    <div class="bg-form-item-tips" v-if="passwordTips">
                        密码错误
                    </div>
                </div>
                <div class="bg-form-submite">立即登录</div>
                <div class="bg-form-bottom">
                    <div>立即注册</div>
                    <div>忘记密码</div>
                </div>
            </div>
        </div>
    </Layout>
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import Layout from '../components/Layout.vue';

export default defineComponent({
    components: {
        Layout,
    },
    setup() {
        const router = useRouter();
        const data = reactive({
            phoneTips: false,
            passwordTips: false,
        });
        const goBackFn = () => {
            router.go(-1);
        };
        return {
            goBackFn,
            ...toRefs(data),
        };
    },
});
</script>

<style lang="scss" scoped>
.bg {
    width: 100%;
    height: 100%;
    @include bg();
    padding-top: 120px;
    position: relative;
    box-sizing: border-box;
    background-image: url('../assets/images/login/bg.png');
    &-back {
        width: 80px;
        height: 100px;
        @include flexCenter();
        @include position($position: absolute, $top: 0, $left: 0);
        img {
            width: 20px;
            height: 40px;
            display: block;
            object-fit: cover;
            opacity: 0.9;
        }
    }
    &-form {
        width: 520px;
        margin: auto;
        .logo {
            width: 446px;
            display: block;
            margin: 0 auto 100px;
        }
        &-submite,
        &-item-input {
            width: 100%;
            height: 90px;
            padding: 0 40px;
            border-radius: 90px;
            box-sizing: border-box;
        }
        &-item {
            position: relative;
            margin-bottom: 44px;
            &-input {
                @include flexBetween();
                background-color: rgba(255, 255, 255, 0.23);
                .icon {
                    width: 30px;
                    height: 38px;
                    @include bg();
                    margin-right: 14px;
                    &.phone {
                        background-image: url('../assets/images/login/phone.png');
                    }
                    &.password {
                        background-image: url('../assets/images/login/pwd.png');
                    }
                }
                input {
                    flex: 1;
                    border: none;
                    outline: none;
                    margin-bottom: 4px;
                    @include font($size: 24px, $color: #e4e4e4);
                    background-color: transparent;
                    &::placeholder {
                        @include font($size: 24px, $color: #e4e4e4);
                    }
                }
            }
            &-tips {
                @include font($size: 24px, $color: #e84109);
                @include position(
                    $position: absolute,
                    $left: 40px,
                    $bottom: -30px
                );
            }
        }
        &-submite {
            margin-top: 90px;
            margin-bottom: 90px;
            @include flexCenter();
            @include font($size: 34px, $color: #fff);
            background: linear-gradient(to right, #f36536, #e84109);
        }
        &-bottom {
            padding: 0 14px;
            box-sizing: border-box;
            @include flexBetween();
            @include font($size: 24px, $color: #fff);
        }
    }
}
</style>