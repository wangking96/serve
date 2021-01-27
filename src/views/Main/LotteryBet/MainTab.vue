<template>
    <div 
        class="main-tab" 
        id="main-tab"
        :style="{height: height + 'px'}">
        <div 
            class="main-tab-item" 
            :class="{'active': current === tab.code}"
            :style="{height: height - 2 + 'px', lineHeight: height - 2 + 'px'}"
            v-for="tab in tabs" 
            :key="tab.code" 
            @click="handleChange(tab)">
            {{tab.name}}
            <span 
                class="main-tab-item-arrow" 
                :class="{'active': current === tab.code}"
                v-if="tab.code === 'chat'">
            </span>
        </div>
        <div 
            v-if="curTab"
            class="main-tab-line" 
            :style="{width: curTab.lineWidth + 'px', left: curTab.left + curTab.lineOffset + 'px'}">
        </div>
    </div>
</template>

<script>

export default {
    props: {
        height: {
            type: Number,
            default: 40
        },
        tabs: Array,
        current: String
    },
    data() {
        return {
            curTab: null
        }
    },
    watch: {
        current(c) {
            this.curTab = this.tabs.find(item => item.code === c)
        }
    },
    mounted() {
        if (!this.tabs || this.tabs.length === 0) return
        const mainTab = document.getElementById('main-tab')
        let left = 0
        for (let i = 0; i < this.tabs.length; i++) {
            this.tabs[i].lineWidth = mainTab.children[i].offsetWidth * 0.4
            this.tabs[i].left = left
            left += mainTab.children[i].offsetWidth
            this.tabs[i].lineOffset = mainTab.children[i].offsetWidth * 0.3
            if (this.current === this.tabs[i].code) this.curTab = this.tabs[i]

        }
    },
    methods: {
        handleChange(item) {
            if (item.code === this.curTab.code) return
            this.$router.push({name: item.code})
        }
    }
}
</script>

<style lang="scss" scoped>
.main-tab {
    width: 100%;
    display: flex;
    color: $font-important;
    background-color: $white;
    position: relative;
    &-item {
        flex: 1;
        text-align: center;
        padding: 0 5px;
        &-arrow {
            display: inline-block;
            position: relative;
            top: -3px;
            width: 6px;
            height: 6px;
            border-left: 2px solid $font-main;
            border-bottom: 2px solid $font-main;
            transform: rotate(-45deg);
            &.active {
                border-color: $theme-color;
            }
        }
        &.active {
            color: $theme-color;
        }
    }
    &-line {
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 1;
        height: 2px;
        background-color: $theme-color;
        transition: left 0.2s;
    }
}
</style>