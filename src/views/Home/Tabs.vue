<template>
    <div class="tabs" id="tabs" ref="tabs">
        <div 
            :style="{width: `${100 / tabs.length}%`}"
            class="tabs-item"
            :class="{'active': curTab && curTab.id === tab.id}"
            v-for="tab in tabs"
            :key="tab.id"
            @click="handleChange(tab)">
            {{ tab.name }}
        </div>
        <div class="tabs-line"
            v-if="curTab"
            :style="{width: curTab.lineWidth + 'px', left: curTab.left + 'px'}">
        </div>
    </div>
</template>

<script>
export default {
    name: "Tabs",
    props: {
        tabs: Array
    },
    data() {
        return {
            curTab: {
                id: 0
            }
        }
    },
    watch: {
        'curTab.id'(c){
            this.curTab = this.tabs.find(item => item.id === c)
        }
    },
    created(){
        this.initTab()
    },
    methods: {
        initTab(){
            if (!this.tabs || this.tabs.length === 0) return
            const mainTab = this.$refs.tabs
            let left = mainTab.children[0].offsetWidth / 4

            for (let i = 0; i < this.tabs.length; i++) {
                this.tabs[i].lineWidth = mainTab.children[i].offsetWidth / 2
                this.tabs[i].left = left
                left += mainTab.children[i].offsetWidth
                if (this.curTab.id === this.tabs[i].id) this.curTab = this.tabs[i]
            }
        },
        handleChange(item) {
            // if(item.id === 1) return
            this.curTab = item
            this.$emit('tabsClickFn', item)
            this.$store.commit('set_space_type', item.name)
        }
    }
}
</script>

<style lang="scss" scoped>
.tabs {
    position: relative;
    clear: both;
    padding-bottom: 26px;
    border-bottom: 1px solid rgb(255, 255, 255, .6);
    &-item {
        float: left;
        cursor: pointer;
        text-align: center;
        &.active, &:not(:first-child):hover {
            color: #E01E94;
        }
    }
    &-line {
        position: absolute;
        bottom: -2px;
        left: 0;
        z-index: 1;
        height: 2px;
        transition: left 0.4s;
        background-color: #E01E94;
    }
}
</style>