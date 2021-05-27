<template>
    <Layout :tabbar="true">
        <div class="mine">
            <div class="mine-head">
                <div class="mine-head-avatar">
                    <img
                        :src="userInfo.avatar_thumb"
                        v-if="userInfo.avatar_thumb"
                        alt="头像"
                    />
                </div>
                <div class="mine-head-user">
                    <div class="mine-head-user-nickname" v-if="loginInfo.token">
                        {{ loginInfo.user_nicename }}
                    </div>
                    <div
                        class="mine-head-user-go-login"
                        @click="goToLoginFn"
                        v-else
                    >
                        点击登录
                    </div>
                    <div class="mine-head-user-desc">
                        {{
                            loginInfo.token
                                ? 'ID：' + loginInfo.id
                                : '您当前是访客身份'
                        }}
                    </div>
                </div>
            </div>
            <div class="mine-banner">
                <a href="" target="_blank">
                    <img
                        src="/images/mine/banner.png"
                        alt="banner"
                    />
                </a>
            </div>
            <div class="mine-settings">
                <div
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
                </div>
                <div class="mine-settings-item signout" v-if="loginInfo.token" @click="signOutFn">
                    <div class="mine-settings-item-left">
                        <div class="icon"></div>
                        <div class="title">退出登录</div>
                    </div>
                    <div class="mine-settings-item-right"></div>
                </div>
            </div>
        </div>
    </Layout>
</template>

<script>
import { Toast } from 'vant';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { computed, defineComponent, onMounted, reactive, toRefs } from 'vue';
import Layout from '@/components/Layout.vue';
import api from '../../api/api';
import Request from '../../common/request';
export default defineComponent({
    components: {
        Layout,
    },
    setup() {
        const store = useStore();
        const router = useRouter();
        const data = reactive({
            settings: [
                { id: 1, title: '订阅主播', icon: '/images/mine/user.png', path: '/subscribe' },
                { id: 2, title: '在线客服', icon: '/images/mine/online.png' },
                { id: 3, title: '修改密码', icon: '/images/mine/pwd.png', path: '/changePasswprd' },
                { id: 4, title: '意见反馈', icon: '/images/mine/opinion.png' },
            ],
        });
        const userInfo = computed(() => store.state.userInfo);
        const loginInfo = computed(() => store.state.loginInfo);
        const goToLoginFn = () => {
            router.push('/login');
        };
        const settingsClickFn = (sItem) => {
            if (!loginInfo.value.token) {
                Toast({
                    message: '请先登录!',
                    icon: 'warning-o',
                });
                return;
            }
            const list = userInfo.value.list;
            if (!(list && list[2][1])) return;
            switch (sItem.id) {
                case 2:
                    const kefuUrl = `${list[2][1].href}?uid=${loginInfo.value.id}&token=${loginInfo.value.token}`;
                    window.open(kefuUrl, 'blank');
                    break;
                case 4:
                    const url = `${list[2][2].href}?uid=${loginInfo.value.id}&token=${loginInfo.value.token}`;
                    window.open(url, 'blank');
                    break;
                default:
                    router.push(sItem.path)
                    break;
            }
        };

        const signOutFn = () => {
            store.commit('SET_USERINFO');
            store.commit('SET_LIVEINFO');
            store.commit('SET_LOGININFO');
            Toast({
                type: 'success',
                message: '退出成功!',
                duration: 1800
            });
        };

        onMounted(() => {
            Request({
                params: {
                    uid: loginInfo.value.id || '',
                    token: loginInfo.value.token || '',
                    service: api.userInfo,
                },
            }).then((res) => {
                if (res.code === 0) {
                    store.commit('SET_USERINFO', res.info[0]);
                }
                if (res.code === 700) {
                    Toast(res.msg);
                    localStorage.clear();
                    return;
                }
            });
        });
        return {
            userInfo,
            loginInfo,
            ...toRefs(data),
            signOutFn,
            goToLoginFn,
            settingsClickFn,
        };
    },
});
</script>

<style lang="scss" scoped>
.mine {
    width: 100%;
    height: 362px;
    @include bg();
    background-image: url('/images/mine/mine-head-bg.png');
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
            background-image: url('/images/platform/fengxin/logo-default.png');
            img {
                width: 100%;
                display: block;
                object-fit: cover;
            }
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
        margin: -54px auto 40px;
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
            padding: 36px 26px;
            box-sizing: border-box;
            @include flexBetween();
            border-bottom: 1px solid rgba(245, 246, 247, 0.9);
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
                background-image: url('/images/mine/arrow-right.png');
            }
        }
        .signout .mine-settings-item-left .icon {
            background-image: url('/images/mine/pwd.png');
        }
    }
}
</style>