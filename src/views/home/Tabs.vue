<template>
    <div class="tabs" ref="tabs">
        <div class="tabs-item" 
            v-for="tab in tabs" 
            :key="tab.id"
            :class="{'active': curTab.id == tab.id}"
            @click="tabClick(tab)">
            {{tab.name}}
        </div>
        <div class="tabs-line" :style="{width: curTab.lineWidth + 'px', left: curTab.left + 'px'}"></div>
    </div>
</template>
<script>
const tabs = [
    {id: 1, name: '楼凤兼职'},
    {id: 2, name: '洗浴中心'},
    {id: 3, name: '休闲发廊'},
    {id: 4, name: '狼友推荐'},
    {id: 5, name: '酒店宾馆'},
    {id: 6, name: '兼职小姐'},
]
export default {
    data() {
        return {
            tabs,
            curTab: {
                id: 1
            }
        }
    },
    mounted(){
        this.initTabs()
    },
    methods: {
        initTabs(){
            if(!this.tabs || this.tabs.length === 0) return
            let mainTabs = this.$refs.tabs
            let left = 20 //mainTabs.children[0].offsetWidth 
            for (let i = 0; i < this.tabs.length; i++) {
                this.tabs[i].lineWidth = mainTabs.children[i].offsetWidth
                this.tabs[i].left = left
                left += mainTabs.children[i].offsetWidth + 40
                if(this.curTab.id === this.tabs[i].id) this.curTab = this.tabs[i]
            }
        },
        tabClick(tab) {
            this.curTab = tab
        }
    }
}
</script>