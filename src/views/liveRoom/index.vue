<template>
    <Layout :navbar="true" :showBack="true">
        <div class="live-broadcast">
            <div class="live-broadcast-play">
                <PlayerArea :title="liveInfo.title">
                    <Player />
                </PlayerArea>
            </div>
            <div class="live-broadcast-tab">
                <tab :tab="tab" :active="curTab.id" @clickFn="tabClick">
                    <tab-panel class="live-broadcast-tab-item">
                        <ChatRoom
                            v-if="curTab.com === 'ChatRoom'"
                            :chatRecords="chatRecords"
                            :countdown="countdown"
                            ref="chatRoom"
                        />
                    </tab-panel>
                    <tab-panel class="live-broadcast-tab-item">
                        <AnchorInfo
                            v-if="curTab.com === 'AnchorInfo'"
                            :contract="contract"
                        />
                    </tab-panel>
                    <tab-panel class="live-broadcast-tab-item">
                        <LiveInfo
                            v-if="curTab.com === 'LiveInfo'"
                            :liveInfo="liveData"
                            @refresh="refreshFn"
                        />
                    </tab-panel>
                </tab>
            </div>
        </div>
    </Layout>
</template>

<script>
import {
    defineComponent,
    reactive,
    toRefs,
    watchEffect,
    computed,
    onMounted,
    onBeforeUnmount,
    ref,
} from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import Layout from '../../components/Layout.vue';
import Tab from '../../components/tab/Tab.vue';
import TabPanel from '../../components/tab/TabPanel.vue';
import Player from '../../components/Player.vue';
import PlayerArea from '../../components/PlayerArea.vue';
import AnchorInfo from './AnchorInfo.vue';
import LiveInfo from './LiveInfo.vue';
import ChatRoom from './ChatRoom.vue';
import ws from '../../common/ws';
import api from '../../api/api';
import Request from '../../common/request';
import { Toast, Dialog } from 'vant';
export default defineComponent({
    components: {
        Layout,
        Tab,
        TabPanel,
        AnchorInfo,
        LiveInfo,
        ChatRoom,
        Player,
        PlayerArea
    },
    setup() {
        const route = useRoute();
        const router = useRouter();
        const store = useStore();
        const liveInfo = computed(() => store.state.liveInfo);
        const loginInfo = computed(() => store.state.loginInfo);
        const data = reactive({
            tab: [
                { id: 1, name: '聊天', com: 'ChatRoom' },
                { id: 2, name: '主播', com: 'AnchorInfo' },
                { id: 3, name: '直播', com: 'LiveInfo' },
                // { id: 4, name: '赛事', com: '' },
            ],
            curTab: {
                id: 1,
                name: '',
                com: '',
            },
            contract: null,
            chatRoom: ref(null),
            liveData: {},
            ws: null,
            chatRecords: [],
            chatRoomOpening: false,
            visible: false,
            countdown: 0,
            countdownTimer: null,
        });
        const getLiveInfoFn = (bool) => {
            Request({
                params: {
                    uid: loginInfo.value.id || '',
                    token: loginInfo.value.token || '',
                    liveuid: liveInfo.value.uid || liveInfo.value.id || 0,
                    service: api.liveInfo,
                },
            }).then((res) => {
                if (res.code === 0) {
                    data.liveData = res.info[0];
                    data.contract = res.info[0].contract.filter(
                        (item) => item.status != 0
                    );
                    bool && enterLiveRoomFn(res.info[0]);
                }
            });
        };

        const refreshFn = () => {
            getLiveInfoFn();
        };

        const tabClick = (tab) => {
            data.curTab = tab;
        };

        // 聊天室状态码
        const statusCode = {
            0: {
                handle(args) {
                    if (args.data.type !== 'come') {
                        data.sendMsg = '';
                        data.countdown = 3;
                        data.countdownTimer = setInterval(() => {
                            data.countdown -= 1;
                            if (data.countdown < 0)
                                clearInterval(data.countdownTimer);
                        }, 1000);
                    }
                },
            },
            1002: {
                handle(args) {
                    Dialog.confirm({
                        title: '温馨提示',
                        message: args.msg,
                    })
                        .then(() => {
                            router.push({
                                path: '/login',
                                query: {
                                    back: 1,
                                },
                            });
                        })
                        .catch(() => {
                            // on cancel
                        });
                },
            },
        };
        // 进入聊天室
        const enterLiveRoomFn = async (params) => {
            const res = await Request({
                params: {
                    uid: loginInfo.value.id || '',
                    token: loginInfo.value.token || '',
                    stream: params.stream || '',
                    liveuid: params.uid || '',
                    device: 3, // H5
                    service: api.enterLiveRoom,
                },
            });

            if (res.code === 0 && res.info && res.info.length > 0) {
                const resData = res.info[0];
                if (resData.is_chat_off === 1) {
                    data.chatRecords = [];
                    data.connectioning = false;
                    data.chatRoomOpening = false;
                    data.placeholderText = '聊天室已关闭';
                    // ws.close();
                } else {
                    data.chatRoomOpening = true;
                    createChatRoomFn();
                }
            } else {
                Toast('进入房间失败！');
            }
        };
        // 创建聊天室房间
        const createChatRoomFn = () => {
            const initData = {
                type: 'init',
                msg: {
                    send: '',
                    device: 'h5',
                    livetype: 'live',
                    uid: loginInfo.value.id || '',
                    liveuid: liveInfo.value.uid || '',
                },
            };
            ws.init(JSON.stringify(initData));

            ws.onmessage((res) => {
                if (res.data === 'live') return;
                let resData = res.data && JSON.parse(res.data);

                console.log(resData);

                if (resData.data.logs && resData.data.logs.length > 0) {
                    data.chatRecords = resData.data.logs;
                }
                if (resData.data.type === 'come') {
                    data.connectioning = resData.code === 0 ? true : false;
                    data.chatRecords.push({
                        user_nicename: resData.data.user.user_nicename,
                        type: 'come',
                    });
                }
                if (resData.data.type === 'chat') {
                    data.chatRecords.push(resData.data);
                }

                statusCode[resData.code] &&
                    statusCode[resData.code].handle(resData);

                if (data.chatRoom) {
                    data.chatRoom.sendMsg = '';
                    data.chatRoom.scrollFn && data.chatRoom.scrollFn();
                }
            });
        };

        watchEffect(() => {
            if (route.query.id) {
                getLiveInfoFn(true);
            }
        });

        onMounted(() => {
            data.curTab = data.tab[1];
        });

        onBeforeUnmount(() => {
            ws.close();
            clearTimeout(data.scrollTimeout);
        });

        return {
            refreshFn,
            liveInfo,
            tabClick,
            ...toRefs(data),
        };
    },
});
</script>

<style lang="scss" scoped>
.live-broadcast {
    width: 100%;
    height: 100%;
    &-play {
        width: 100%;
        height: 462px;
    }
    &-tab {
        width: 100%;
        height: calc(100% - 462px);
        &-item {
            background-color: #f7f7f7;
        }
    }
}
</style>
<style lang="scss">
.van-dialog {
    width: 520px !important;
    .van-dialog__header {
        padding-top: 26px;
    }
    .van-dialog__message--has-title {
        padding: 30px 0;
    }
}
</style>
