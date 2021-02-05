<template>
    <div class="vip">
        <div class="vip-title"> 升级VIP</div>

        <div class="vip-tab">
            <div
                class="vip-tab-item"
                :class="{'active': tab.id === curTab.id}"
                v-for="tab in card" 
                :key="tab.id"
                @click="changeTab(tab)">
                {{ tab.name }}
            </div>
        </div>
        <transition name="slide-fade">
            <component :is="curComponent" />
        </transition>
        
    </div>
</template>

<script>
import JiVip from './JiVip'
import YearVip from './YearVip'
import AllVip from './AllVip'
const card = [
    { id: 1, name: '包季会员', component: 'JiVip' },
    { id: 2, name: '包年会员', component: 'YearVip' },
    { id: 3, name: '终身会员', component: 'AllVip' },
]
export default {
    components: {
        JiVip,
        YearVip,
        AllVip
    },
    data() {
        return {
            card,
            curTab: {},
            curComponent: 'JiVip'
        }
    },
    created() {
        this.curTab = card[0]
    },
    methods: {
        changeTab(item) {
            this.curTab = item
            this.curComponent = item.component
        },
    }
}
</script>

<style lang="scss" scoped>
.slide-fade-enter-active {
    transition: all .2s ease .4s;
}
.slide-fade-leave-active {
    transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to {
    transform: translateX(10px);
    opacity: 0;
}
.vip {
    &-title {
        width: 142px;
        height: 40px;
        line-height: 52px;
        text-align: center;
        padding-left: 26px;
        font-weight: bold;
        letter-spacing: 2px;
        box-sizing: border-box;
        background-size: cover;
        background-repeat: no-repeat;
        background-image: url('/images/vip.png');
    }
    &-tab {
        margin-top: 46px;
        padding: 0 80px;
        display: flex;
        justify-content: space-between;
        &-item {
            width: 120px;
            height: 34px;
            line-height: 34px;
            text-align: center;
            opacity: 0.75;
            cursor: pointer;
            letter-spacing: 4px;
            border: 2px solid #FFFFFF;
            border-radius: 20px;
        }
        .active, &-item:hover {
            color: #F141AC;
            border-color: #F141AC;
        }
    }
}
</style>