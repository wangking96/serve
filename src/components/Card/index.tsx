import { defineComponent, onMounted, reactive, inject, computed } from "vue";
import classnames from 'classnames';

import "./index.scss";

import { useStore } from "vuex";
import { Api } from '../../common/api';
import { get } from '../../common/server';

import MatchData from "../Match/MatchData";
import MatchLineup from "../Match/MatchLineup";
import MatchSituation from "../Match/MatchSituation";

interface tabItem {
    id: number,
    name: string,
    title: string
}
const tabsList:tabItem[] = [
    { id: 1, name: '赛况', title: '比分走势' },
    { id: 2, name: '阵容', title: '球队阵容' },
    // { id: 3, name: '数据', title: '球队得分榜' },
]

const Card = defineComponent({
    setup() {
        const store = useStore();
        let curCard:tabItem = reactive({
            ...tabsList[0]
        })
        const cardClick = ((item: tabItem) => {
            curCard.id = item.id
            curCard.name = item.name
            curCard.title = item.title
        })
        const sportId = inject('sportId');
        const matchDetail = computed(()=>store.state.matchDetail);

        const getPlayerListFn = async () => {
            const res:any = await get(Api.getPlayerList, {
                homeTeamId: matchDetail.value.homeTeamId,
                awayTeamId: matchDetail.value.awayTeamId,
                sportId
            })
            
            if(res.code === '0000') {
                store.commit("setPlayerList", res.result);
            }
        };

        onMounted(() => {
            getPlayerListFn()
        })

        return () => (
            <div class="details-main">
                <div class="card">
                    <div class="card-tabs">
                        {
                            tabsList.map((item:any) => (
                                <div 
                                    class={classnames('card-tabs-item', {'active' : item.id === curCard.id })} 
                                    onClick={() => cardClick(item)}
                                    key={ item.id }>
                                    { item.name }
                                </div>
                            ))
                        }
                    </div>
                    <div class="card-title">
                        <span class="left">{ curCard.title }</span>
                        { curCard.id === 1 && <span class="right">数据表</span> }
                    </div>
                    {
                        curCard.id === 1 ? ( <MatchSituation />) : <MatchLineup /> // curCard.id === 2 ? (  <MatchLineup /> ) :  (  <MatchData /> )
                    }
                </div>
            </div>
        )
    }
})

export default Card