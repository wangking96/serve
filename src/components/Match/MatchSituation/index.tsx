import { defineComponent, computed, inject } from 'vue';
import { useStore } from "vuex";
import { getTotal } from '../../../common/common';

import './index.scss';

interface obj {
    id: number,
    name_zh: string,
    name_en: string,
    name_icon: string,
    position?: number,
    scores: any
}
const footballIcon = require("@assets/images/ball/football_d.png");
const basketballIcon = require("@assets/images/ball/basketball_d.png");

const MatchSituation = defineComponent({
    setup() {
        const store = useStore();
        const match = computed(() => store.state.matchDetail).value;
        const matchType:number | undefined =  inject('sportId');       // 1.足球 2.篮球
        let listHead:string[];
        let list:object[] = [];
        let homeTeam:obj = {
            id: 1,
            name_zh: match.homeNameZh,
            name_en: match.homeNameEn,
            name_icon: match.homeLogo,
            scores: match.homeScores
        };
        let awayTeam:obj = {
            id: 2,
            name_zh: match.awayNameZh,
            name_en: match.awayNameEn,
            name_icon: match.awayLogo,
            scores: match.awayScores
        };
        
        if(matchType === 1) {
            homeTeam.position = match.homePosition;
            awayTeam.position = match.awayPosition;
            listHead = ['球队', '比分', '半场比分', '黄牌', '红牌', '角球', '点球比分', '加时比分', '排名'];
        }else{
            listHead = ['球队', '第一场', '第二场', '第三场', '第四场', '加时', '总分'];
        }
        list = [homeTeam, awayTeam];
        
        return () => (
            <div class="match-situation">
                <div class="list">
                    <div class="list-cell">
                        {
                            listHead.map((item:string|any, index:number) => (
                                <div class={ {'team-ball': item === '球队'} } key={ index }><span>{ item }</span></div>
                            ))
                        }
                    </div>
                    {
                        list.map((item: object | any) => (
                            <div class="list-cell" key={ item.id }>
                                <div class="team-ball">
                                    <img src={ item.name_icon || ( matchType === 1 ? footballIcon : basketballIcon ) } alt=""/>    
                                    <div>{ item.name_zh }</div>
                                </div>
                                {
                                    item.scores && item.scores.map((score:number|any, index: number) => (
                                        <div key={ index }>{ score === 0 ? 0 : score }</div>
                                    ))
                                }
                                <div>
                                    { 
                                        matchType === 1 ? 
                                        (item.position ? item.position : 0) 
                                        : 
                                        (getTotal(item.scores, matchType) === 0 ? 0 : getTotal(item.scores, matchType)) 
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }
})

export default MatchSituation