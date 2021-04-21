import { defineComponent, reactive, onMounted, onUnmounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { statusList, getColor, getTotal, scrollToBottom, getScrollTop, getMainTop, } from "../../../common/common";
import moment from "moment";
import { Api } from '../../../common/api';
import { get } from "../../../common/server";
import { tabListItem, argumentsItem } from "./data";
import './index.scss';

const timeIcon = require("@assets/images/ball/clock.png");
const timeIconDefault = require("@assets/images/ball/clock_default.png");
const ballIcon = require("@assets/images/ball/basketball_d.png");

// 比赛状态（1已完赛，2进行中，3未开赛）
const tabList:Array<tabListItem> = [
    { id: 1, name: "比赛中", status: 2},
    { id: 2, name: "未开赛", status: 3},
    { id: 3, name: "已完赛", status: 1}
];

const ballMatchList = defineComponent({
    props: {
        ballType: Number        // 1.足球 2.篮球
    },
    setup(props) {
        const router = useRouter();
        const store = useStore();
        let data = reactive({
            curTab: 1,
            status: 2,
            page: 1,
            pageSize: 10,
            matchList: [] as any,
            requestLoading: false,
            hasMore: false,
            timeout1: null as any,
            timeout2: null as any
        })
        
        const tabsClickFn = ((item: any) => {
            if(data.curTab === item.id) return
            data.page = 1
            data.curTab = item.id
            data.status = item.status;
            getMatchListFn({
                isEmpty: true,
                callback: () => {
                    if(getMainTop('.ball-match-list') < getScrollTop()) {
                        document.body.scrollTop = getMainTop('.ball-match-list') + 1
                    }
                }
            })
        });
        const goToDetails = ((item:any) => {
            store.commit("setMatchDetal", item);
            const path: string = props.ballType === 1 ? 'FootballDetail' : 'BasketballDetail';
            router.push({
                name: path,
                query: {
                    id: item.id,
                    status: data.status,
                },
            });
        });
        
        const getMatchListFn = async (args?:argumentsItem) => {
            data.requestLoading = true
  
            let res:any = await get(Api.matchDiaryList, {
                sportId: props.ballType,                 // 赛事类别（1足球，2篮球）
                matchTime: (args && args.time) || moment(new Date()).format("YYYY-MM-DD"), // 赛事时间
                status: data.status,        // 比赛状态（1已完赛，2进行中，3未开赛）
                pageNumber: data.page,
                pageSize: data.pageSize,
            })
            if(res.code === '0000') {
                data.hasMore = data.page * data.pageSize >= res.result.total;
                
                data.timeout1 = setTimeout(() => {
                    (args && args.isEmpty) && (data.matchList = [])
                    args && args.callback && args.callback()
                    data.matchList = [...data.matchList, ...res.result.list];
                }, 400);
            }

            data.timeout2 = setTimeout(() => {
                data.requestLoading = false;
            }, 400);           
        };

        const changTime = () => {
            const key:number|any = moment(data.matchList[0].matchTime).format('d') || 0;
            const weekObj:any = {
                0: '星期日',
                1: '星期一',
                2: '星期二',
                3: '星期三',
                4: '星期四',
                5: '星期五',
                6: '星期六',
            };
            return weekObj[key];
        };

        onMounted(() => {
            getMatchListFn();
            scrollToBottom((bool:boolean) => {
                if(bool && !data.hasMore && !data.requestLoading) {
                    data.page++;
                    getMatchListFn({isEmpty: false})
                }else {
                    const tabs:HTMLElement | null = document.querySelector('.ball-match-list-tabs');
                    getMainTop('.ball-match-list') < getScrollTop() ? tabs && tabs.classList.add('tabs-fixed') : tabs && tabs.classList.remove('tabs-fixed');
                }
            });
        });
        onUnmounted(() => {
            clearTimeout(data.timeout1)
            clearTimeout(data.timeout2)
        });
        
        return () => (
            <div class="ball-match-list">
                <div class="ball-match-list-tabs">
                    <div class="main">
                        <div class="ball-match-list-tabs-left">
                            {
                                tabList.map((item:tabListItem) => (
                                    <div class={data.curTab === item.id ? 'active' : ''} onClick={ () => tabsClickFn(item) } key={ item.id }>{ item.name }</div>
                                ))
                            }
                        </div>
                        <div class="ball-match-list-tabs-right">
                            <img src={require("@assets/images/ball/hot.png")} alt="" />
                            <span>今日赛事</span>
                        </div>
                    </div>
                </div>
                <div class="ball-match-list-time">
                    {data.matchList[0] && ('今日' + moment(data.matchList[0].matchTime).format('YYYY-MM-DD') + '  ' + changTime())}
                </div>
                <div class="ball-match-list-content">
                    {
                        data.matchList && data.matchList.map((item:any) => 
                            <div class="ball-match-list-content-item" onClick={ () => goToDetails(item) } key={ item.id }>
                                <div class="ball-match-list-content-item-match-time">
                                    <img src={ data.curTab === 3 ? timeIconDefault : timeIcon } alt=""/>
                                    <span>{ moment(item.matchTime).format('HH:mm') }</span>
                                </div>
                                <div class="ball-match-list-content-item-middle">
                                    <div class="ball-match-list-content-item-team-name">
                                        <div>
                                            <p class="name_zh">{ item.homeNameZh }</p>
                                            <p class="name_en">{ item.homeNameEn }</p>
                                        </div>
                                        <img src={ item.homeLogo || ballIcon } alt=""/>
                                    </div>
                                    <div class="ball-match-list-content-item-team-score">
                                        <span>{ getTotal(item.homeScores, props.ballType) }</span>
                                        <div>VS</div>
                                        <span>{ getTotal(item.awayScores, props.ballType) }</span>
                                    </div>
                                    <div class="ball-match-list-content-item-team-name">
                                        <img src={ item.awayLogo || ballIcon } alt=""/>
                                        <div>
                                            <p class="name_zh">{ item.awayNameZh }</p>
                                            <p class="name_en">{ item.awayNameEn }</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="ball-match-list-content-item-match-status">
                                    <span style={{backgroundColor: getColor(props.ballType, item.matchStatusCode)}}>
                                        { props.ballType === 1 ? statusList[item.matchStatusCode] : item.matchStatusName }
                                    </span>
                                </div>
                            </div>
                        )
                    }
                    <div class="ball-match-list-content-loading" v-show={ data.requestLoading }>
                        <img src={ require("@assets/images/ball/loading.gif") } alt=""/>
                        <p>拼命加载中...</p>
                    </div>
                    <div class="ball-match-list-content-more" v-show={ data.hasMore && !data.requestLoading }>--没有更多了--</div>
                </div>
            </div>
        )
    }
})

export default ballMatchList