import { computed, defineComponent, inject } from "vue";
import { useStore } from "vuex";
import { tabItem, teamItem, playerItem } from './data';
import Tabs from '../../Tabs';
import './index.scss';

const listHead = ['排名', '球队', '胜负', '胜率', '胜差', '连胜负'];
const footballIcon = require("@assets/images/ball/football_d.png");
const basketballIcon = require("@assets/images/ball/basketball_d.png");

const MatchData = defineComponent({
    setup() {
        const store = useStore();
        const match:object|any = computed(() => store.state.matchDetail).value;
        const matchType:number | undefined =  inject('sportId');  
        let scoringList:object[] = [];
        let playerList:object[] = [];
        const homePosition = match.homePosition || 0
        const awayPosition = match.awayPosition || 0
        const homeTeam:teamItem = {
            id: 1,
            name_zh: match.homeNameZh,
            name_icon: match.homeLogo,
            scores:[homePosition, 0, 0, 0, 0]
        }
        const awaysTeam:teamItem = {
            id: 2,
            name_zh: match.awayNameZh,
            name_icon: match.awayLogo,
            scores:[awayPosition, 0, 0, 0, 0]
        }
        scoringList = [homeTeam, awaysTeam];
        
        const tabsList:tabItem[] = [
            {id: 1, title: match.homeNameZh, title_icon: match.homeLogo},
            {id: 2, title: match.awayNameZh, title_icon: match.awayLogo},
        ]
        const playerHead:string[] = ['球号', '队员名字', '助攻榜', '篮板榜', '抢断榜', '盖帽榜'];
        const playerHome:playerItem[] = [
            {id: 0, playerNumber: 1, playerName: '伊查索', assists: 10.5, rebounds: 0, steals: 0, block: 0 },
            {id: 1, playerNumber: 20, playerName: '哈登', assists: 0, rebounds: 0, steals: 0, block: 0 },
            {id: 2, playerNumber: 6, playerName: '东契奇', assists: 0, rebounds: 0, steals: 0, block: 0 },
            {id: 3, playerNumber: 5, playerName: '杨', assists: 0, rebounds: 0, steals: 0, block: 0 },
            {id: 4, playerNumber: 16, playerName: '哈登', assists: 0, rebounds: 0, steals: 0, block: 0 },
        ]
        const playerAyaws:playerItem[] = [
            {id: 0, playerNumber: 1, playerName: '伊查索', assists: 10.5, rebounds: 0, steals: 0, block: 0 },
            {id: 1, playerNumber: 20, playerName: '哈登', assists: 0, rebounds: 0, steals: 0, block: 0 },
            {id: 2, playerNumber: 6, playerName: '东契奇', assists: 0, rebounds: 0, steals: 0, block: 0 },
            {id: 3, playerNumber: 5, playerName: '杨', assists: 0, rebounds: 0, steals: 0, block: 0 },
            {id: 4, playerNumber: 16, playerName: '哈登', assists: 0, rebounds: 0, steals: 0, block: 0 },
        ]
        playerList = [playerHome, playerAyaws]
        
        const slotName = () => {
            return playerList.map((item:object|any) => (
                    <div class="content-item">
                        <div class="list">
                            <div class="list-cell">
                                {
                                    playerHead.map((p:string) => (
                                        <div>{ p }</div>
                                    ))
                                }
                            </div>
                            {
                                item.map((item:object|any) => (
                                    <div class="list-cell" key={ item.id }>
                                        <div>{ item.playerNumber }</div>
                                        <div>{ item.playerName }</div>
                                        <div>{ item.assists }</div>
                                        <div>{ item.rebounds }</div>
                                        <div>{ item.steals }</div>
                                        <div>{ item.block }</div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                ))
        }
        return () => (
            <div class="match-data">
                <div class="match-data-scoring-list list">
                    <div class="list-cell">
                        {
                            listHead.map((item:string|any, index:number) => (
                                <div class={ {'team-ball': item === '球队'} } key={ index }><span>{ item }</span></div>
                            ))
                        }
                    </div>
                    {
                        scoringList.map((item: object | any) => (
                            <div class="list-cell" key={ item.id }>
                                {
                                    item.scores && item.scores.map((score:number|any, index: number) => (
                                        index === 1 
                                            ?
                                                <>
                                                    <div class="team-ball">
                                                        <img src={ item.name_icon || ( matchType === 1 ? footballIcon : basketballIcon ) } alt=""/>    
                                                        <div>{ item.name_zh }</div>
                                                    </div>
                                                    <div key={ index }>{ score === 0 ? '/' : score }</div>
                                                </>
                                            :
                                                <div key={ index }>{ score === 0 ? '/' : score }</div>
                                    ))
                                }
                            </div>
                        )) 
                    }
                </div>
                
                <div class="match-data-player-list">
                    <div class="card-title">
                        <span class="left">队员列表</span>
                    </div>
                    <Tabs tabsList={ tabsList } slotName={ slotName() }/>
                </div>

                <div class="match-data-recent-record">
                    <div class="card-title">
                        <span class="left">最近战绩</span>
                    </div>
                    <Tabs tabsList={ tabsList } slotName={ slotName() }/>
                </div>
            </div>
        )
    }
})

export default MatchData