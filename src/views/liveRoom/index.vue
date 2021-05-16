<template>
    <Layout :navbar="true" :showBack="true">
        <div class="live-room">
            <div class="live-room-player">
                <Player />
            </div>
            <div class="live-room-tab">
                <tab :tab="tab" :active="curTab.id" @clickFn="tabClick">
                    <tab-panel
                        v-for="item in tab"
                        :key="item.id"
                        class="live-room-tab-item"
                    >
                        <component
                            :contract="item.com === curTab.com && contract"
                            :liveInfo="item.com === curTab.com && liveInfo"
                            v-if="item.com === curTab.com"
                            :is="curTab.com"
                        ></component>
                    </tab-panel>
                </tab>
            </div>
        </div>
    </Layout>
</template>

<script>
import { defineComponent, reactive, toRefs, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Layout from '../../components/Layout.vue';
import Tab from '../../components/tab/Tab.vue';
import TabPanel from '../../components/tab/TabPanel.vue';
import Player from '../../components/Player.vue';
import AnchorInfo from './AnchorInfo.vue';
import LiveInfo from './LiveInfo.vue';
import api from '../../api/api';
import Request from '../../common/request';
export default defineComponent({
    components: {
        Layout,
        Player,
        Tab,
        TabPanel,
        AnchorInfo,
        LiveInfo,
    },
    setup() {
        const route = useRoute();
        const router = useRouter();
        const data = reactive({
            tab: [
                { id: 1, name: '聊天', com: '' },
                { id: 2, name: '主播', com: 'AnchorInfo' },
                { id: 3, name: '直播', com: 'LiveInfo' },
                // { id: 4, name: '赛事', com: '' },
            ],
            curTab: { 
                id: 2, 
                name: '主播', 
                com: 'AnchorInfo' 
            },
            contract: null,
            liveInfo: {},
        });

        const getLiveInfoFn = () => {
            Request({
                params: {
                    uid: '',
                    token: '',
                    liveuid: 2,
                    service: api.liveInfo,
                },
            }).then((res) => {
                if (res.code === 0) {
                    data.liveInfo = res.info[0];
                    data.contract = res.info[0].contract.filter(
                        (item) => item.status != 0
                    );
                }
            });
        };

        const gobackFn = () => {
            router.go(-1);
        };

        const tabClick = (tab) => {
            data.curTab = tab;
        };

        watchEffect(() => {
            if (route.query.id) {
                getLiveInfoFn();
            }
        });

        return {
            ...toRefs(data),
            gobackFn,
            tabClick,
        };
    },
});
</script>

<style lang="scss" scoped>
.live-room {
    width: 100%;
    height: 100%;
    &-player {
        width: 100%;
        height: 462px;
        background-color: #333;
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
