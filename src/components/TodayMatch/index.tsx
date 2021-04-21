import { defineComponent, computed, inject} from 'vue';
import { useStore } from "vuex";

import './index.scss';
import moment from "moment";

import { getTotal } from "../../common/common";

const footballIcon = require("@assets/images/ball/football_d.png");
const basketballIcon = require("@assets/images/ball/basketball_d.png");

const TodayMatch = defineComponent({
    setup() {
        const store = useStore();
        const match:object|any = computed(() => store.state.matchDetail).value;
        const sportId:number|undefined = inject('sportId');
        
        return () => (
            <div class="today-match">
                <div class="today-match-title">今日赛事</div>
                <div class="today-match-info">
                    <div class="today-match-info-topImg left-topImg">主队</div>
                    <div class="today-match-info-topImg right-topImg">客队</div>
                    <div class="today-match-info-top">今日{sportId === 1 ? '足' : '篮'}球赛事</div>
                    <div class="today-match-info-content">
                        <div class="today-match-info-content-team-name">
                            <div class="home_name">
                                <p class="name_ch">{ match.homeNameZh }</p>
                                <p class="name_en">{ match.homeNameEn }</p>
                            </div>
                            <img src={match.homeLogo || (sportId === 1 ? footballIcon : basketballIcon)} alt=""/>
                        </div>
                        <div class="today-match-info-content-score">
                            <div>{getTotal(match.homeScores, sportId)}</div>
                            <span>VS</span>
                            <div>{getTotal(match.awayScores, sportId)}</div>
                        </div>
                        <div class="today-match-info-content-team-name">
                            <img src={match.awayLogo || (sportId === 1 ? footballIcon : basketballIcon)} alt=""/>
                            <div class="away_name">
                                <p class="name_ch">{ match.awayNameZh }</p>
                                <p class="name_en">{ match.awayNameEn }</p>
                            </div>
                        </div>
                    </div>
                    <div class="today-match-info-bottom">{moment(match.matchTime).format('YYYY/MM/DD HH:mm')}</div>
                </div>
            </div>
        );
    }
})

export default TodayMatch