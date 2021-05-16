<template>
    <Layout :tabbar="true">
        <div class="mine">
            <div class="mine-head">
                <div class="mine-head-avatar"></div>
                <div class="mine-head-user">
                    <div class="mine-head-user-nickname" v-if="isLogin"></div>
                    <div class="mine-head-user-go-login" @click="goToLoginFn" v-else>点击登录</div>
                    <div class="mine-head-user-desc">您当前是访客身份</div>
                </div>
            </div>
            <div class="mine-banner">
                <a href="" target="_blank">
                    <img
                        src="../../assets/images/mine/banner.png"
                        alt="banner"
                    />
                </a>
            </div>
            <div class="mine-settings">
                <dic
                    class="mine-settings-item"
                    v-for="sItem in settings"
                    :key="sItem.id"
                    @click="settingsClickFn(sItem)"
                >
                    <div class="mine-settings-item-left">
                        <div
                            class="icon"
                            :style="`background-image: url('${sItem.icon}')`"
                        ></div>
                        <div class="title">{{ sItem.title }}</div>
                    </div>
                    <div class="mine-settings-item-right"></div>
                </dic>
            </div>
        </div>
    </Layout>
</template>

<script>
import { Toast } from 'vant';
import { defineComponent, reactive, toRefs } from 'vue';
import Layout from '@/components/Layout.vue';
import subs from '../../assets/images/mine/user.png';
import online from '../../assets/images/mine/online.png';
import pwd from '../../assets/images/mine/pwd.png';
import exit from '../../assets/images/mine/exit.png';
import { useRouter } from 'vue-router';
export default defineComponent({
    components: {
        Layout,
    },
    setup() {
        const router = useRouter();
        const data = reactive({
            isLogin: false,
            settings: [
                { id: 1, title: '订阅主播', icon: subs },
                { id: 2, title: '在线客服', icon: online },
                { id: 3, title: '修改密码', icon: pwd },
                { id: 4, title: '意见反馈', icon: exit },
            ],
        });
        const goToLoginFn = () => {
            router.push('/login');
        }
        const settingsClickFn = () => {
            Toast({
                message: '请先登录!',
                icon: 'warning-o',
                className: 'my-toast'
            })
        }
        return {
            ...toRefs(data),
            goToLoginFn,
            settingsClickFn
        };
    },
});
</script>

<style lang="scss" scoped>
.mine {
    width: 100%;
    height: 362px;
    @include bg();
    background-image: url('../../assets/images/mine/mine-head-bg.png');
    &-head {
        height: 300px;
        @include flexAlignItemsCenter();
        &-avatar {
            width: 134px;
            height: 134px;
            @include bg();
            margin-left: 50px;
            margin-right: 40px;
            overflow: hidden;
            border-radius: 50%;
            background-image: url('../../assets/images/public/logo-default.png');
        }
        &-user {
            color: #fff;
            &-go-login {
                @include font($size: 40px, $weight: 600);
            }
            &-desc {
                margin-top: 14px;
                @include font($size: 24px, $weight: 600);
            }
        }
    }
    &-banner {
        width: 684px;
        height: 192px;
        margin: -54px auto 0;
        a,
        img {
            width: 100%;
            display: block;
        }
        a {
            height: 100%;
            text-decoration: none;
        }
        img {
            object-fit: cover;
        }
    }
    &-settings {
        &-item {
            padding: 30px 26px;
            box-sizing: border-box;
            @include flexBetween();
            border-bottom: 1px solid rgba(245, 246, 247, .9);
            &-left {
                @include flexAlignItemsCenter();
                .icon {
                    width: 40px;
                    height: 40px;
                    @include bg();
                    margin-right: 14px;
                }
                .title {
                    @include font($size: 28px, $weight: 500, $color: #2b2626);
                }
            }
            &-right {
                width: 30px;
                height: 30px;
                @include bg();
                background-image: url('../../assets/images/mine/arrow-right.png');
            }
        }
    }
}
</style>
