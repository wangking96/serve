<template>
    <div class="bet">
        <ResultStatus :height="resultStatusHeight"></ResultStatus>
        <div 
            class="bet-play" 
            :style="{
                top: resultStatusHeight + 'px', 
                height: betPlayHeight + 'px', 
                lineHeight: betPlayHeight + 'px'
            }">
            Bao lô 2 số
        </div>
        <div 
            class="bet-playtype van-hairline--bottom" 
            :style="{
                top: resultStatusHeight + betPlayHeight + 'px', 
                height: playTypeHeight + 'px'
            }">
            <div 
                :class="['bet-playtype-item', {'active': curPlayType.code === playType.code}]" 
                v-for="playType in playTypes" 
                :key="playType.id"
                @click="changePlayTypeFn(playType)">
                {{ playType.name }}
            </div>
        </div>
        <div 
            class="bet-content" 
            :style="{ 
                top: resultStatusHeight + betPlayHeight + playTypeHeight + 'px', 
                bottom: bottomHeight + 'px' 
            }">
            <component :is="curPlayType.code"></component>
        </div>
        <BetBottom class="bet-bottom" :height="bottomHeight"></BetBottom>
    </div>
</template>

<script>
import ResultStatus from './ResultStatus'
import BetInput from "./BetInput"
import BetFast from "./BetFast"
import BetSelect from "./BetSelect"
import BetBottom from "./BetBottom"
const playTypes = [
    {
        code: 'BetSelect',
        name: 'Chọn số'
    },{
        code: 'BetFast',
        name: 'Chọn số nhanh'
    },{
        code: 'BetInput',
        name: 'Nhập số'
    }
]
export default {
    name: 'Bet',
    components: {
        ResultStatus,
        BetInput,
        BetFast,
        BetSelect,
        BetBottom
    },
    data() {
        return {
            resultStatusHeight: 60,
            betPlayHeight: 30,
            playTypeHeight: 52,
            bottomHeight: 88,
            curPlayType: playTypes[0],
            curBettingList: 1,
            playTypes
        }
    },
    methods: {
        changePlayTypeFn(item){
            this.curPlayType = item
        }
    }
}
</script>

<style lang="scss" scoped>
.bet {
    &-play {
        position: absolute;
        left: 0;
        width: 100%;
        font-size: $font-regular;
        color: $font-maroon;
        text-align: center;
        background-color: $bg-light-red;
        cursor: pointer;
        box-shadow: $box-shadow-block;
        &::after {
            width: 0;
            height: 0;
            content: '';
            border: 6px solid transparent;
            border-top: 8px solid $border-maroon;
            position: absolute;
            top: 50%;
            right: 15px;
            transform: translateY(-4px);
        }
    }
    &-playtype {
        position: absolute;
        left: 0;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-around;
        &-item {
            width: 110px;
            height: 32px;
            line-height: 30px;
            text-align: center;
            border-radius: 8px;
            box-shadow: 0 2px 4px 0 rgba(199,199,199,0.32);
            background-image: linear-gradient(179deg, #FFFFFF 42%, #E9E9E9 100%);
            border: 1px solid #e6dfdf;
            &.active{
                color: #fff;
                line-height: 32px;
                border: none;
                animation: scaleIcon 0.3s;
                background-image: $bg-header;
            }
        }
    }
    &-content {
        width: 100%;
        position: absolute;
        &-betting {
            width: 100%;
            position: absolute;
            bottom: 0;
            &-wrap {
                height: 100%;
                padding: 0 10px;
                overflow: auto;
            }
        }
    }
    &-bottom {
        width: 100%;
        position: absolute;
        left: 0;
        bottom: 0;
    }
}
</style>