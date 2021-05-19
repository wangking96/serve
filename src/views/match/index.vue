<template>
    <Layout :tabbar="true">
        <div class="match">
            <div class="match-menu">
                <div
                    class="match-menu-item"
                    v-for="mItem in menus"
                    :key="mItem.id"
                    @click="menuClickFn(mItem)"
                >
                    <div :class="{ active: curMenu.id === mItem.id }">
                        {{ mItem.name }}
                    </div>
                </div>
            </div>
            <Tab
                class="match-tab"
                :tab="tab"
                :active="curTab.id"
                @clickFn="tabClick"
            >
                <TabPanel v-for="item in tab" :key="item.id">
                    <van-pull-refresh
                        v-model="refreshing"
                        v-if="item.id === curTab.id"
                        @refresh="onRefreshFn"
                        :disabled="disabled"
                    >
                        <div class="match-time" v-if="time && !isDown">
                            {{ time }}
                        </div>
                        <div
                            class="match-time"
                            v-if="[3, 4].includes(curTab.id)"
                        >
                        </div>
                        <div
                            class="match-list"
                            @scroll="scrollFn"
                            v-if="curTab.list.length > 0"
                        >
                            <template v-for="l in curTab.list" :key="l.id">
                                <MatchItem :item="l" />
                            </template>
                            <MatchLoading :text="moreText" v-if="showMore" />
                        </div>
                        <MatchLoading :text="moreText" v-if="loading" />
                        <div class="match-nodata" v-if="curTab.list.length < 1 && !loading">
                            <img
                                src="../../assets/images/match/nodata.png"
                                alt=""
                            />
                            <div>暂无数据</div>
                        </div>
                    </van-pull-refresh>
                </TabPanel>
            </Tab>
        </div>
    </Layout>
</template>

<script>
import { defineComponent, onMounted, onUnmounted, reactive, toRefs } from 'vue';
import { Toast } from 'vant';
import Layout from '@/components/Layout.vue';
import Tab from '../../components/tab/Tab.vue';
import TabPanel from '../../components/tab/TabPanel.vue';
import MatchLoading from './MatchLoading.vue';
import MatchItem from './MatchItem.vue';

import moment from 'moment';
import api from '../../api/api';
import Request from '../../common/request';
import { prevWeek, nextWeek } from '../../common/tools';

export default defineComponent({
    components: {
        Tab,
        Layout,
        TabPanel,
        MatchItem,
        MatchLoading,
    },
    setup() {
        const data = reactive({
            menus: [
                { id: 1, name: '足球' },
                { id: 2, name: '篮球' },
                { id: 3, name: '电竞' },
                { id: 4, name: '其他' },
            ],
            curMenu: {
                id: 1,
                name: '足球',
            },
            tab: [
                {
                    id: 1,
                    name: '全部',
                    list: [],
                    action: null,
                    api: api.football,
                },
                {
                    id: 2,
                    name: '进行中',
                    list: [],
                    action: 0,
                    api: api.playingList,
                },
                {
                    id: 3,
                    name: '赛程',
                    list: [],
                    action: 1,
                    api: api.matchListByDate,
                },
                {
                    id: 4,
                    name: '赛果',
                    list: [],
                    action: 2,
                    api: api.matchListByDate,
                },
            ],
            curTab: {
                id: 1,
                list: [],
                name: '全部',
                action: null,
                api: api.football,
            },
            time: '',
            page: 1,
            disabled: false,
            refreshing: false,
            isDown: false,
            loading: false, // 显示loading
            isLoading: false,
            showMore: true,
            moreText: '加载中...',
            timeout: null,
            refreshTimeout: null,
            prevWeek: prevWeek(), 
            nextWeek: nextWeek()
        });
        const tabClick = (args) => {
            args.list = [];
            data.page = 1;
            data.curTab = args;
            matchFootballFn();
        };

        const menuClickFn = (args) => {
            data.curMenu = args;
        };
        const onRefreshFn = () => {
            data.curTab.list = [];
            data.isDown = true;
            data.showMore = false;
            data.refreshTimeout = setTimeout(() => {
                Toast('刷新成功');
                data.page = 1;
                matchFootballFn();
                data.isDown = false;
                data.refreshing = false;
            }, 500);
        };
        const matchFootballFn = async () => {
            data.loading = true;
            const res = await Request({
                type: 'match',
                url: data.curTab.api,
                params: {
                    page: data.page,
                    action: data.curTab.action,
                    date: moment(new Date()).format('YYYY-MM-DD'),
                },
            });
            if (res.code === 0) {
                const resData = res.info;
                if (resData.length > 0) {
                    let list;
                    if (data.curTab.id === 1) {
                        list = resData[0].list;
                        data.time = resData[0].week_day_str;
                    } else if ([3, 4].includes(data.curTab.id)) {
                        list = resData;
                        data.time = '';
                    }
                    if (list && list.length > 0) {
                        data.showMore = true;
                        list.forEach((item) => {
                            data.curTab.list.push(item);
                        });
                    }
                    data.showMore = true;
                    data.moreText = '加载中...';
                } else {
                    data.time = '';
                    data.curTab.list = [];
                    data.showMore = false;
                    data.moreText = '没有更多了';
                }
            } else {
                Toast('数据获取失败！');
            }

            data.loading = false;
        };
        const scrollFn = (e) => {
            data.disabled = e.target.scrollTop > 1 ? true : false;
            if (data.isLoading) return;
            if (!data.showMore) return;
            if (
                e.target.scrollTop + e.target.clientHeight >=
                e.target.scrollHeight
            ) {
                // console.log('到底了');
                data.isLoading = true;
                data.timeout = setTimeout(() => {
                    data.page += 1;
                    matchFootballFn();
                    data.isLoading = false;
                }, 500);
            }
        };
        onMounted(() => {
            matchFootballFn();
        });

        onUnmounted(() => {
            clearTimeout(data.timeout);
            clearTimeout(data.refreshTimeout);
        });

        return {
            tabClick,
            scrollFn,
            menuClickFn,
            onRefreshFn,
            ...toRefs(data),
        };
    },
});
</script>

<style lang="scss" scoped>
.match {
    width: 100%;
    height: 100%;
    &-menu {
        width: 100%;
        height: 90px;
        box-sizing: border-box;
        @include flexBetween();
        border-bottom: 1px solid #f4f4f4;
        &-item {
            flex: 1;
            @include flexCenter();
            & > div {
                width: 106px;
                height: 56px;
                line-height: 56px;
                text-align: center;
            }
            .active {
                transition: all 0.2s;
                background-color: #ff5116;
                border-radius: 0 18px 0 18px;
                @include font($size: 36px, $color: #fff, $weight: 600);
            }
        }
    }
    &-tab {
        width: 100%;
        height: calc(100% - 90px);
    }
    &-time {
        width: 100%;
        height: 64px;
        line-height: 64px;
        background-color: #f7f7f7;
        @include font($size: 28px, $color: #323233, $center: center);
    }
    &-list {
        width: 100%;
        height: calc(100% - 64px);
        overflow-y: scroll;
        overflow-x: hidden;
    }
    &-nodata {
        width: 100%;
        height: calc(100% - 64px);
        @include flexCenterColumn();
        @include font($size: 24px, $weight: 400, $color: rgb(153, 153, 153));
        img {
            width: 184px;
            display: block;
            margin-bottom: 24px;
        }
    }
}
</style>
<style lang="scss">
.match-tab {
    .van-pull-refresh,
    .van-pull-refresh__track {
        width: 100%;
        height: 100%;
    }
}
</style>