<template>
    <div class="lotterybet">
        <MainTab 
            class="lotterybet-tab van-hairline--bottom"
            :height="tabHeight" 
            :tabs="TABS" 
            :current="$route.name">
        </MainTab>
        <router-view 
            class="lotterybet-content" 
            :style="{top: tabHeight + 'px'}">
        </router-view>
    </div>
</template>

<script>
import MainTab from './MainTab'
const TABS = [
    { code: 'bet', name: 'cược' },
    { code: 'chat', name: 'chat' },
    { code: 'openrecord', name: 'Kết quả' },
    { code: 'betrecord', name: 'Lịch sử' }
]
export default {
    name: 'LotteryBet',
    components: {
        MainTab
    },
    data() {
        return {
            TABS,
            tabHeight: 38
        }
    }
}
</script>

<style lang="scss" scoped>
.lotterybet {
    &-tab {
        position: absolute;
        left: 0;
        top: 0;
    }
    &-content {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
    }
}
</style>