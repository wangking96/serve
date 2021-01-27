<template>
    <div class="tabbar">
        <div 
            class="tabbar-item" 
            :class="{active: active === tab.route}"
            v-for="tab in TABS" 
            :key="tab.id" 
            @click="handleTab(tab)">
            <img :src="`/images/${active === tab.route ? tab.icon + '-active' : tab.icon}.png`">
            <p>{{tab.name}}</p>
        </div>
    </div>
</template>

<script>
const TABS = [
    {
        id: 0,
        name: 'Vé số',
        icon: 'lottery',
        route: 'lottery'
    },{
        id: 1,
        name: 'Toàn diện',
        icon: 'zonghe',
        route: 'zonghe'
    },{
        id: 2,
        name: 'Giảm giá',
        icon: 'promotion',
        route: 'promotion'
    },{
        id: 3,
        name: 'trò chuyện với',
        icon: 'chat',
        route: 'chat'
    },{
        id: 4,
        name: 'của tôi',
        icon: 'mine',
        route: 'mine'
    }
]
export default {
    props: {
        active: {
            type: String,
            default: 'lottery'
        }
    },
    data() {
        return {
            TABS
        }
    },
    methods: {
        handleTab(tab) {
            this.$emit('change', tab.route)
        }
    }
}
</script>

<style lang="scss" scoped>
.tabbar {
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 5;
    width: 100%;
    height: 50px;
    font-size: 12px;
    color: #666;
    display: flex;
    background: $white;
    box-shadow: 0 -2px 8px rgba(0, 0, 0, .07);
    &-item {
        flex: 1;
        text-align: center;
        padding: 5px 0;
        &.active {
            color: $theme-color;
            img {
                animation: scaleIcon 0.5s;
            }
        }
        & > img {
            width: 26%;
        }
        p {
            margin-top: 5px;
        }
    }
}
</style>