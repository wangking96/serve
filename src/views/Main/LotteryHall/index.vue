<template>
    <div class="lotteryhall">
        <van-tabs class="van-hairline--bottom" v-model="active">
            <van-tab :title="item.title" v-for="item in lotterys" :key="item.id"></van-tab>
        </van-tabs>
        <div class="lotteryhall-content">
            <LotteryCell 
                v-for="group in lotterys[active].list" 
                :key="group.id" 
                :group="group">
            </LotteryCell>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import LotteryCell from './LotteryCell'
export default {
    name: 'LotteryHall',
    components: {
        LotteryCell
    },
    data() {
        return {
            active: 0
        }
    },
    computed: {
        ...mapGetters(['lotterys'])
    }
}
</script>

<style lang="scss">
.lotteryhall {
    .van-tabs__wrap {
        height: 36px;
        .van-tab--active {
            color: $theme-color;
        }
        .van-tabs__line {
            height: 2px;
            background-color: $theme-color;
        }
    }
}
</style>

<style lang="scss" scoped>
.lotteryhall {
    &-content {
        position: absolute;
        top: 42px;
        left: 0;
        right: 0;
        bottom: 0;
    }
}
</style>