<template>
    <div class="chat-room">
        <div class="chat-room-list" ref="listEl">
            <div class="chat-room-announcement">
                {{ config.chat_announcement }}
            </div>
            <div
                class="chat-room-item"
                :class="{ welcome: item.type === 'come' }"
                v-for="(item, index) in chatRecords"
                :key="item.type + index"
            >
                <span
                    class="icon"
                    :style="`background-image: url('/images/platform/${platform}/logo.png');`"
                >
                    <img
                        :src="userInfo.avatar_thumb || loginInfo.avatar_thumb"
                        v-if="userInfo.avatar_thumb || loginInfo.avatar_thumb"
                        alt=""
                    />
                </span>
                <span class="welcome-content" v-if="item.type === 'come'">
                    欢迎
                    <span class="nickname">{{ item.user_nicename }}</span>
                    进入直播间
                </span>
                <template v-else>
                    <span class="nickname"
                        >{{
                            loginInfo.id == item.user.uid &&
                            item.type !== 'come'
                                ? '我'
                                : item.user.user_nicename
                        }}:&nbsp;</span
                    >
                    <span class="content">{{ item.msg }}</span>
                </template>
            </div>
        </div>
        <div class="chat-room-send">
            <input
                type="text"
                v-model="sendMsg"
                v-if="loginInfo.token"
                :placeholder="placeholderText"
                :disabled="!loginInfo.token"
                :readonly="!loginInfo.token"
            />
            <div class="nologin" @click="goToLogin" v-else>
                <span>登录</span>发弹幕，参与主播互动
            </div>
            <div class="btn" @click="sendMsgFn">
                <div v-if="countdown > 0">{{ countdown }}s</div>
                <div
                    v-else
                    class="icon"
                    :style="`background-image: url('/images/platform/${platform}/${
                        loginInfo.token ? 'logo-default' : 'logo'
                    }.png');`"
                ></div>
            </div>
        </div>
    </div>
</template>

<script>
import {
    computed,
    defineComponent,
    onBeforeUnmount,
    onMounted,
    reactive,
    ref,
    toRefs,
    watchEffect,
} from 'vue';
import { useStore } from 'vuex';
import ws from '../../common/ws';
import { Toast, Dialog } from 'vant';
import { useRouter } from 'vue-router';

export default defineComponent({
    props: {
        chatRecords: {
            type: Array,
            default: [],
        },
        chatRoomOpening: {
            type: Boolean,
            default: false,
        },
        countdown: {
            type: Number,
            default: 3,
        },
    },
    setup(props, { emit }) {
        const store = useStore();
        const router = useRouter();
        const config = computed(() => store.state.config);
        const liveInfo = computed(() => store.state.liveInfo);
        const userInfo = computed(() => store.state.userInfo);
        const loginInfo = computed(() => store.state.loginInfo);
        const data = reactive({
            connectioning: false,
            placeholderText: '发条友善的弹幕，参与互动',
            sendMsg: '',
            disabled: false,
            listEl: ref(null),
            timeout: null,
            platform: import.meta.env.MODE,
        });
        const goToLogin = () => {
            router.push({
                path: '/login',
                query: {
                    back: 1,
                },
            });
        };

        const sendMsgFn = () => {
            if (!loginInfo.value.token) {
                Dialog.confirm({
                    title: '温馨提示',
                    message: '您确定去登录么？',
                })
                    .then(() => {
                        goToLogin();
                    })
                    .catch(() => {});
                return;
            }
            if (props.countdown > 0) {
                Toast('发言过于频繁');
                return;
            }
            if (!data.sendMsg) {
                Toast('发送内容不能为空');
                return;
            }
            let sendData = {
                type: 'sendMsg',
                msg: {
                    uid: loginInfo.value.id,
                    liveuid: liveInfo.value.uid || '',
                    livetype: 'live',
                    send: data.sendMsg,
                },
            };
            ws.send(JSON.stringify(sendData));
        };

        const scrollFn = () => {
            if (data.listEl) {
                data.scrollTimeout = setTimeout(() => {
                    data.listEl.scrollTo({
                        top: data.listEl.scrollHeight,
                        behavior: 'smooth',
                    });
                }, 200);
            }
        };

        onMounted(() => {
            data.timeout = setTimeout(() => {
                scrollFn();
            }, 100);
        });

        onBeforeUnmount(() => {
            clearTimeout(data.timeout);
        });

        watchEffect(() => {
            if (!loginInfo.value.token) {
                data.placeholderText = '';
            }
        });

        return {
            config,
            userInfo,
            loginInfo,
            sendMsgFn,
            scrollFn,
            goToLogin,
            ...toRefs(data),
        };
    },
});
</script>

<style lang="scss" scoped>
.chat-room {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background-color: #ffffff;
    border-top: 1px solid #ededed;
    &-announcement {
        line-height: 30px;
        @include font(
            $size: 24px,
            $center: justify,
            $color: rgb(100, 100, 100)
        );
    }
    &-list {
        width: 100%;
        height: calc(100% - 84px);
        overflow-x: hidden;
        overflow-y: scroll;
        box-sizing: border-box;
        padding: 30px 20px 0 20px;
    }
    &-item {
        margin-top: 16px;
        .icon {
            width: 34px;
            height: 34px;
            @include bg();
            margin-right: 4px;
            display: inline-block;
            vertical-align: middle;
            img {
                width: 100%;
                display: block;
                border-radius: 50%;
            }
        }
        span {
            line-height: 24px;
            @include font($size: 24px, $center: justify);
        }
        .nickname {
            color: #1890ff;
        }
        &.welcome {
            padding: 10px 0;
            color: #646464;
            background-color: rgb(253, 247, 243);
        }
    }
    &-send {
        width: 100%;
        height: 80px;
        @include flexBetween();
        box-sizing: border-box;
        input {
            flex: 1;
            height: 100%;
            border: none;
            outline: none;
            padding-left: 24px;
            box-sizing: border-box;
            border-top: 2px solid #eee;
            @include font($size: 24px, $color: #333);
            &::-webkit-input-placeholder {
                @include font($size: 24px, $color: #333);
            }
        }
        .nologin {
            flex: 1;
            height: 80px;
            line-height: 80px;
            padding-left: 24px;
            box-sizing: border-box;
            border-radius: 6px 0 0 6px;
            background-color: #fff;
            border-top: 1px solid #f0f0f0;
            border-left: 1px solid #f0f0f0;
            @include font($size: 28px, $color: #919191);
            span {
                color: red;
                margin-right: 8px;
            }
        }
        .btn {
            width: 90px;
            height: 100%;
            box-sizing: border-box;
            border-top: 2px solid #eee;
            border-left: 2px solid #eee;
            @include flexCenter();
            div {
                width: 56px;
                height: 56px;
                @include bg();
                color: red;
                overflow: hidden;
                border-radius: 50%;
                @include flexCenter();
            }
        }
    }
}
</style>