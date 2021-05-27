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
                        <div
                            class="match-time"
                            v-if="[1, 2].includes(curTab.id) && !isDown"
                        >
                            {{ time }}
                        </div>
                        <div
                            class="match-date"
                            v-if="[3, 4].includes(curTab.id)"
                        >
                            <div class="week" ref="weekDom">
                                <div
                                    class="week-item"
                                    v-for="(wItem, index) in week"
                                    :key="wItem.id"
                                    :class="{ active: curWeek.id === wItem.id }"
                                    @click="weekClick(wItem, index)"
                                >
                                    <p class="week-item-date">
                                        {{ wItem.date }}
                                    </p>
                                    <p class="week-item-week">
                                        {{ wItem.week }}
                                    </p>
                                </div>
                            </div>
                            <div class="calendar" @click="showDateFn">
                                <img
                                    src="/images/match/date.png"
                                    alt=""
                                />
                            </div>
                        </div>
                        <div
                            class="match-list"
                            @scroll="scrollFn"
                            v-if="curTab.list.length > 0"
                        >
                            <template v-for="l in curTab.list" :key="l.id">
                                <MatchItem :item="l" @click="jumpMatchLiveRoomFn(l)" />
                            </template>
                            <div class="nomore" v-if="showMore">没有更多了</div>
                            <Loading v-else />
                        </div>
                        <Loading v-if="loading" />
                        <div class="match-nodata" v-if="curTab.list.length < 1">
                            <img
                                src="/images/common/nodata.png"
                                alt=""
                            />
                            <div>暂无数据</div>
                        </div>
                    </van-pull-refresh>
                </TabPanel>
            </Tab>
            <van-calendar
                class="my-calendar"
                v-model:show="showDate"
                row-height="34"
                color="#FF865C"
                :min-date="minDate"
                :max-date="maxDate"
                @confirm="onConfirm"
            />
        </div>
    </Layout>
</template>

<script>
import {
    defineComponent,
    onMounted,
    onUnmounted,
    reactive,
    ref,
    toRefs,
} from 'vue';
import { Toast } from 'vant';
import Layout from '@/components/Layout.vue';
import Tab from '../../components/tab/Tab.vue';
import TabPanel from '../../components/tab/TabPanel.vue';
import Loading from '../../components/Loading.vue';
import MatchItem from './MatchItem.vue';

import moment from 'moment';
import api from '../../api/api';
import Request from '../../common/request';
import { prevWeek, nextWeek, debounce } from '../../common/tools';
import { useRouter } from 'vue-router';

// 比赛接口
const ballMatchApiUrl = {
    1: 'matchAllList',
    2: 'matchPlayingList',
    3: 'matchListByDate',
    4: 'matchListByDate',
};
export default defineComponent({
    components: {
        Tab,
        Layout,
        TabPanel,
        MatchItem,
        Loading,
    },
    setup() {
        const router = useRouter();
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
                { id: 1, name: '全部', list: [], action: null, status: 0 },
                { id: 2, name: '进行中', list: [], action: 0, status: 1 },
                { id: 3, name: '赛程', list: [], action: 1, status: 0 },
                { id: 4, name: '赛果', list: [], action: 2, status: 2 },
            ],
            curTab: {
                id: 1,
                list: [],
                name: '全部',
                action: null,
                status: null,
            },
            time: '',
            sendData: {
                type: 'match',
                url: '',
                params: {
                    service: '',
                    page: 1,
                },
            },

            disabled: false,
            refreshing: false,
            isDown: false,
            loading: false, // 显示loading
            isLoading: false,
            showMore: false,
            timeout: null,
            refreshTimeout: null,
            week: [],
            curWeek: {
                id: null,
            },
            weekDom: ref(null),
            showDate: false,
            minDate: new Date(),
            maxDate: new Date(),
        });
        const tabClick = (args) => {
            let today = moment().date();
            args.list = [];
            data.sendData.params.page = 1;
            data.curTab = args;
            data.disabled = false;
            if ([1, 2].includes(data.curMenu.id)) {
                const curApi = ballMatchApiUrl[args.id];
                data.sendData.url = api[curApi](data.curMenu.id);
                data.sendData.params.action = args.action;
                data.sendData.type = 'match';
                data.sendData.params.qdate = null;
                data.sendData.params.date = moment(new Date()).format(
                    'YYYY-MM-DD'
                );
                data.sendData.params.service = null;
            } else if (data.curMenu.id === 3) {
                data.sendData.params.page = null;
                data.sendData.params.date = null;
                data.sendData.url = 'api';
                data.sendData.type = 'default';
                data.sendData.params.action = null;
                data.sendData.params.date = null;
                data.sendData.params.qdate = moment(new Date()).format(
                    'YYYY-MM-DD'
                );
                data.sendData.params.status = args.status;
                data.sendData.params.service =
                    args.id === 1
                        ? api.gamingMatchAll
                        : api.gameingMatchListByStat;
            }
            if (args.id === 3) {
                data.week = nextWeek();
                data.minDate = moment().toDate();
                data.maxDate = moment()
                    .date(today + 13)
                    .toDate();
            } else if (args.id === 4) {
                data.week = prevWeek();
                data.maxDate = moment().toDate();
                data.minDate = moment()
                    .date(today - 13)
                    .toDate();
            }
            data.curWeek = data.week[0];

            getMatchFn();
        };

        const menuClickFn = (args) => {
            data.curTab.list = [];
            data.curMenu = args;
            if ([1, 2].includes(data.curMenu.id) && data.curTab.id === 1) {
                data.sendData.type = 'match';
                data.sendData.params.qdate = null;
                data.sendData.params.service = null;
                data.sendData.url = api.matchAllList(data.curMenu.id);
                data.sendData.params.date = moment(new Date()).format(
                    'YYYY-MM-DD'
                );
                getMatchFn();
            } else if (data.curMenu.id === 3) {
                data.sendData.url = 'api';
                data.sendData.type = 'default';
                data.sendData.params.date = null;
                data.sendData.params.service = api.gamingMatchAll;
                getMatchFn();
            }
            const el = document.querySelectorAll('.tab-nav-item');
            const firstEl = el && el[0];
            firstEl.click();
        };
        const onRefreshFn = () => {
            data.curTab.list = [];
            data.isDown = true;
            data.showMore = false;
            data.refreshTimeout = setTimeout(() => {
                Toast('刷新成功');
                data.sendData.params.page = 1;
                getMatchFn();
                data.isDown = false;
                data.refreshing = false;
            }, 500);
        };
        const getMatchFn = async () => {
            data.loading = true;
            const res = await Request(data.sendData);
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
                        list.forEach((item) => {
                            data.curTab.list.push(item);
                        });
                    }
                    if (list.length < 10) {
                        data.showMore = true;
                    } else {
                        data.showMore = false;
                    }
                }
            } else if (res.code === 1001) {
                Toast(res.msg);
            } else {
                Toast('数据获取失败！');
            }
            data.loading = false;
        };
        const scrollFn = debounce((e) => {
            data.disabled = e.target.scrollTop > 1 ? true : false;
            if (data.isLoading) return;
            if (data.showMore) return;
            if (
                e.target.scrollTop + e.target.clientHeight >=
                e.target.scrollHeight
            ) {
                // console.log('到底了');
                data.isLoading = true;
                data.sendData.params.page += 1;
                getMatchFn();
                data.isLoading = false;
            }
        });

        const weekClick = (item, index, time) => {
            const year = moment().format('YYYY') + '-';
            data.curWeek = item;
            const curWeek = data.weekDom.children[index];
            const moveTo =
                curWeek.offsetLeft -
                (data.weekDom.offsetWidth - curWeek.offsetWidth) / 2;
            data.weekDom.scrollTo({
                top: 0,
                left: moveTo,
                behavior: 'smooth',
            });
            if ([1, 2].includes(data.curMenu.id)) { 
                data.sendData.params.qdate = null;
                data.sendData.params.date = time || year + data.curWeek.date;
            } else if (data.curTab.id === 3) {
                data.sendData.params.date = null;
                data.sendData.params.qdate = time || year + data.curWeek.date;
            }
            data.curTab.list = [];
            getMatchFn();
        };
        const onConfirm = (time) => {
            const newTime = moment(time).format('YYYY-MM-DD');
            data.week.forEach((item, index) => {
                if(item.date === moment(time).format('MM-DD')) {
                    weekClick(item, index, newTime);
                }
            });
            data.showDate = false;
        };
        const showDateFn = () => {
            data.showDate = !data.showDate;
        };
        const jumpMatchLiveRoomFn = (item) => {
            router.push({
                path: '/matchLiveRoom',
                query: {
                    id: item.matchId,
                    matchId: data.curMenu.id,
                }
            })
        }

        onMounted(() => {
            data.curTab = data.tab[0];
            data.sendData.url = api.matchAllList();
            getMatchFn();
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
            weekClick,
            onConfirm,
            showDateFn,
            jumpMatchLiveRoomFn,
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
    &-date {
        width: 100%;
        height: 100px;
        background-color: #f7f7f7;
        @include flexWrapBetween();
        @include font($size: 28px, $color: #323233, $center: center);
        .week {
            flex: 1;
            width: 100%;
            height: 80px;
            overflow-y: hidden;
            overflow-x: scroll;
            background-color: #fff;
            @include flexAlignItemsCenter();
            &::-webkit-scrollbar {
                display: none;
            }
            &-item {
                height: 100%;
                flex-shrink: 0;
                font-size: 12px;
                padding: 6px;
                margin: 0 10px;
                box-sizing: border-box;
                @include flexColumnCenter();
                &-date {
                    color: #2b2626;
                }
                &-week {
                    color: #a8a8a8;
                }
                &.active {
                    .week-item-date,
                    .week-item-week {
                        color: #ff5116;
                    }
                }
            }
        }
        .calendar {
            width: 60px;
            height: 80px;
            box-sizing: border-box;
            @include flexCenter();
            background-color: #fff;
            img {
                width: 40px;
                display: block;
                object-fit: cover;
            }
        }
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
    .nomore {
        padding: 24px 0;
        background-color: #f7f7f7;
        @include font($size: 28px, $color: #969799, $center: center);
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
.match {
    .my-calendar {
        height: 60%;
        transition: transform .2s;
        border-radius: 16px 16px 0 0;
    }
    .van-calendar__header-title,
    .van-calendar__header-subtitle {
        height: 60px;
        line-height: 60px;
    }
}
</style>