<template>
    <div class="lottery-top">
        <LotteryHeader :height="headerHeight"/>
        <LotteryBanner :height="bannerHeight"/>
        <Notice/>
        <LotteryFeatures :height="featuresHeight"/>
    </div>
</template>
<script>
import Notice from '@/components/Notice'
import LotteryHeader from './LotteryHeader'
import LotteryBanner from './LotteryBanner'
import LotteryFeatures from './LotteryFeatures'
export default {
    components: {
        Notice,
        LotteryHeader,
        LotteryBanner,
        LotteryFeatures
    },
    props: {
        headerHeight: Number,
        bannerHeight: Number,
        featuresHeight: Number
    }
}
</script>

<style lang="scss" scoped>
.lottery-top {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
}
</style>