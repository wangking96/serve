import { defineComponent, computed, reactive, inject } from 'vue';
import { useStore } from 'vuex';
import { positionFn } from '../../../common/common';
import './index.scss';

const footballIcon = require("@assets/images/ball/football_d.png");
const footballHomeIcon = require('@assets/images/ball/football_home.png');
const footballAwaysIcon = require('@assets/images/ball/football_ayaws.png');

const basketballIcon = require("@assets/images/ball/basketball_d.png");
const basketballHomeIcon = require('@assets/images/ball/basketball_home.png');
const basketballAwaysIcon = require('@assets/images/ball/basket_aways.png');

const Lineup = defineComponent({
    setup() {
        const store = useStore();
        const personArr:any = reactive([]);
        const sportId:number = inject('sportId') || 1;
        const matchDetail:object|any = computed(()=>store.state.matchDetail);
        const playerList:object|any = computed(()=>store.state.playerList);

        personArr.push({
            id: 1,
            name: matchDetail.value.homeNameZh,
            name_icon: matchDetail.value.homeLogo,
            list: playerList.value && playerList.value.homePlayerList
        })
        personArr.push({
            id: 2,
            name: matchDetail.value.awayNameZh,
            name_icon: matchDetail.value.awayLogo,
            list: playerList.value && playerList.value.awayPlayerList
        })
        
        return () => (
            <div class="lineup">
                <div class="lineup-content">
                    {
                        personArr.map((item:any) => (
                            <div class="lineup-content-cell" key={ item.id }>
                                <div class="lineup-content-cell-top">
                                    <img src={ item.name_icon || ( sportId === 1 ? footballIcon : basketballIcon ) } alt=""/>
                                    <span>{ item.name }</span>
                                </div>
                                <div class="lineup-content-cell-main">
                                    {
                                        item.list 
                                            ? 
                                        item.list.map((p: any) => (
                                            <div class="lineup-content-cell-main-person" key={ p.id }>
                                                <div class="person" style={ `background-image: url(${p.logo ? p.logo : (
                                                    item.id === 1 
                                                        ? 
                                                            (sportId === 1 ? footballHomeIcon : basketballHomeIcon) 
                                                        : 
                                                            (sportId === 1 ? footballAwaysIcon : basketballAwaysIcon)
                                                )})` }></div>
                                                <p class="name" title={ p.nameZh }>{ p.nameZh }</p>
                                                <p class="position">{ positionFn(sportId, p.position) }</p>
                                            </div>
                                        ))
                                            :
                                        (
                                            <div class="lineup-content-cell-main-person">
                                                <div class="person" style={ `background-image: url(${sportId === 1 ? footballHomeIcon : basketballHomeIcon})` }></div>
                                                <p class="name">未知</p>
                                                <p class="position"></p>
                                            </div>
                                        )
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

export default Lineup