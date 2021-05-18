<template>
    <Layout>
        <div class="user-bg">
            <div class="user-bg-back" @click="goBackFn">
                <img
                    src="../../assets/images/public/left-arrow.png"
                    alt="back"
                />
            </div>
            <div class="user-bg-form">
                <img
                    src="../../assets/images/public/login-logo.png"
                    alt="logo"
                    class="logo"
                />
                <slot />
            </div>
        </div>
    </Layout>
</template>

<script>
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import Layout from '../../components/Layout.vue';

export default defineComponent({
    components: {
        Layout,
    },
    setup() {
        const router = useRouter();
        const goBackFn = () => {
            router.go(-1);
        };
        return {
            goBackFn,
        };
    },
});
</script>

<style lang="scss">
.user-bg {
    width: 100%;
    height: 100%;
    @include bg();
    padding-top: 120px;
    position: relative;
    box-sizing: border-box;
    background-image: url('../../assets/images/login/bg.png');
    &-back {
        width: 80px;
        height: 100px;
        @include flexCenter();
        @include position($position: absolute, $top: 0, $left: 0, $zIndex: 9);
        img {
            width: 20px;
            height: 40px;
            display: block;
            object-fit: cover;
            opacity: 0.9;
        }
    }
    .logo {
        width: 446px;
        display: block;
        margin: 0 auto 100px;
    }
}
.find,
.login,
.register {
    .form {
        width: 520px;
        margin: auto;
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
                        background-image: url('../../assets/images/login/phone.png');
                    }
                    &.password {
                        background-image: url('../../assets/images/login/pwd.png');
                    }
                }
                input {
                    flex: 1;
                    width: 60%;
                    border: none;
                    outline: none;
                    margin-bottom: 4px;
                    box-sizing: border-box;
                    background-color: transparent;
                    @include font($size: 28px, $color: #e4e4e4);
                    &::placeholder {
                        @include font($size: 24px, $color: #e4e4e4);
                    }
                }
                &-right {
                    height: 100%;
                    white-space: nowrap;
                    @include flexAlignItemsCenter();
                    @include font($size: 24px, $color: #e4e4e4);
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
            .error {
                background-color: #ab747487;
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