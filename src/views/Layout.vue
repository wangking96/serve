<template>
    <div class="layout">
        <router-view></router-view>
        <TabBar 
            :active="active" 
            @change="handleChangeTab">
        </TabBar>
    </div>
</template>
<script>
import TabBar from '@/components/TabBar'
const headerHeight = 46
const bannerHeight = 150
const featuresHeight = 60
const leftNavWidth = 70
export default {
    components: {
        TabBar,
    },
    data() {
        return {
            active: 'lottery'
        }
    },
    provide() {
        return {
            headerHeight,
            bannerHeight,
            featuresHeight,
            leftNavWidth
        }
    },
    watch: {
        $route(v) {
            this.active = v.name
        }
    },
    created() {
        this.$store.dispatch('getNotice')
        this.$store.dispatch('getLottery')
    },
    methods: {
        handleChangeTab(route) {
            this.active = route
            this.$router.push({name: route})
        }
    }
}
</script>
<style lang="scss" scoped>
.layout {
    height: 100%;
    position: relative;
}
</style>