<template>
    <div class="lottery">
        <LotteryHomeTop 
            :headerHeight="headerHeight" 
            :bannerHeight="bannerHeight" 
            :featuresHeight="featuresHeight">
        </LotteryHomeTop>
        <div 
            class="lottery-bottom" 
            :style="{top: headerHeight + bannerHeight + 40 + featuresHeight + 'px'}">
            <div 
                class="lottery-bottom-left" 
                :style="{width: leftNavWidth + 'px'}" 
                ref="lotteryLeft">
                <div 
                    class="lottery-bottom-left-item" 
                    :style="{height: leftItemHeight + 'px'}"
                    v-for="(nav, i) in navs" 
                    :key="nav.id" 
                    @click="handleChangeNav(i)">
                    <LotteryTabBtn 
                        class="lottery-bottom-left-item-nav" 
                        :active="nav.id === navs[current].id"
                        :item="nav"
                        :width="leftNavWidth - 12"
                        :height="leftItemHeight - 12">
                    </LotteryTabBtn>
                </div>
            </div>
            <div 
                class="lottery-bottom-right" 
                ref="lotteryRight" 
                @scroll="handleScroll">
                <div 
                    class="lottery-bottom-right-list" 
                    v-for="nav in navs" 
                    :key="nav.id">
                    <div 
                        class="lottery-bottom-right-list-item" 
                        :style="{height: item.height}"
                        v-for="item in nav.list()" 
                        :key="item.id" 
                        @click="handleLottery()">
                        <h1>{{item.n}}:{{item.i}}</h1>
                        <p>{{item.name}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { scrollTopTo, getScrollTop } from '@/utils/scroll'
import LotteryHomeTop from '@/components/LotteryHomeTop'
import LotteryTabBtn from '@/components/LotteryTabBtn'
const list = [
    { id: 1, name: '周一', height: '140px'},
    { id: 2, name: '周二', height: '160px'},
    { id: 3, name: '周三', height: '150px'},
    { id: 4, name: '周四', height: '200px'},
    { id: 5, name: '周五', height: '140px'},
    { id: 6, name: '周六', height: '180px'},
    { id: 7, name: '周日', height: '160px'}
]
const navs = [
    {
        id: 0, 
        name: 'MienNam',
        icon: '/images/lottery/MienNam.png',
        activeIcon: '/images/lottery/MienNam-active.png',
        list() {
            return list.map(item => ({...item, n: 'MienNam', i: 0}))
        }
    },{
        id: 1, 
        name: 'MienTrung',
        icon: '/images/lottery/MienTrung.png',
        activeIcon: '/images/lottery/MienTrung-active.png',
        list() {
            return [list[1], list[2], list[5]].map(item => ({...item, n: 'MienTrung', i: 1}))
        }
    },{
        id: 2, 
        name: 'MienBac',
        icon: '/images/lottery/MienBac.png',
        activeIcon: '/images/lottery/MienBac-active.png',
        list() {
            return list.map(item => ({...item, n: 'MienBac', i: 2}))
        }
    },{
        id: 3, 
        name: 'Captoc',
        icon: '/images/lottery/Captoc.png',
        activeIcon: '/images/lottery/Captoc-active.png',
        list() {
            return [list[1], list[2], list[5]].map(item => ({...item, n: 'Captoc', i: 3}))
        }
    },{
        id: 4, 
        name: 'captocChina',
        icon: '/images/lottery/captocChina.png',
        activeIcon: '/images/lottery/captocChina-active.png',
        list() {
            return list.map(item => ({...item, n: 'captocChina', i: 4}))
        }
    },{
        id: 5, 
        name: 'Yeuthich',
        icon: '/images/lottery/Yeuthich.png',
        activeIcon: '/images/lottery/Yeuthich-active.png',
        list() {
            return [list[1], list[5]].map(item => ({...item, n: 'Yeuthich', i: 5}))
        }
    }
]
export default {
    name: 'Lottery',
    components: {
        LotteryHomeTop,
        LotteryTabBtn
    },
    inject: ['headerHeight', 'bannerHeight', 'featuresHeight', 'leftNavWidth'],
    data() {
        return {
            navs,
            current: 0,
            leftItemHeight: 82,
            isClick: false
        }
    },
    mounted() {
        const lotteryRight = this.$refs['lotteryRight']
        for (let i = 0; i < this.navs.length; i++) {
            const item = lotteryRight.children[i]
            this.navs[i].listHeight = item.offsetHeight + 10
            if (i === 0) {
                this.navs[i].top = 0
                continue
            }
            let sum = 0
            for (let j = 0; j < i; j++) {
                sum += this.navs[j].listHeight
            }
            this.navs[i].top = sum
        }
    },
    methods: {
        /**
         * 左边导航切换
         */
        handleChangeNav(i) {
            this.isClick = true
            this.current = i
            const nav = this.$refs['lotteryLeft']
            if (nav) {
                const cur = nav.children[i]
                const to = cur.offsetTop - (nav.offsetHeight - cur.offsetHeight) / 2
                scrollTopTo(nav, to, 0.3)
                this.blockScrollTo(i)
            }
            setTimeout(() => {
                this.isClick = false
            }, 1000)
        },
        /**
         * 右边滑动
         */
        handleScroll(e) {
            if (this.isClick) return
            const lastIndex = this.navs.length-1
            const scrollTop = getScrollTop(e.target)
            const nav = this.$refs['lotteryLeft']
            const contain = this.$refs['lotteryRight']
            const containHeight = nav.offsetHeight
            const contentHeight = contain.children[lastIndex].offsetHeight + this.navs[lastIndex].top
            // 判断是否滚动到底部
            if (Math.abs(contentHeight - containHeight - scrollTop) <= 50) {
                this.current = lastIndex
                const curNav = nav.children[lastIndex]
                const to = curNav.offsetTop - (nav.offsetHeight - curNav.offsetHeight) / 2
                scrollTopTo(nav, to, 0.3)
                return
            }
            for (let i = 0; i < this.navs.length; i++) {
                const range = Math.abs(scrollTop - this.navs[i].top)
                if (range <= 30) {
                    this.current = i
                    const curNav = nav.children[i]
                    const to = curNav.offsetTop - (nav.offsetHeight - curNav.offsetHeight) / 2
                    scrollTopTo(nav, to, 0.3)
                    break
                }
            }
        },
        /**
         * 驱动右边模块滚动
         */
        blockScrollTo(i) {
            const lotteryRight = this.$refs['lotteryRight']
            if (lotteryRight.children[i]) {
                let to = 0
                if (i === 0) {
                    scrollTopTo(lotteryRight, to, 0.3)
                    return
                }
                to = this.navs[i].top
                scrollTopTo(lotteryRight, to, 0.3)
            }
        },
        handleLottery() {
            this.$router.push({name: 'bet'})
        }
    }
}
</script>

<style lang="scss" scoped>
.lottery {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 5;
    width: 100%;
    bottom: 50px;
    &-bottom {
        position: absolute;
        left: 0;
        width: 100%;
        bottom: 0;
        display: flex;
        &-left {
            overflow: auto;
            &::-webkit-scrollbar { 
                width: 0 !important 
            }
            &-item {
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                &-nav {
                    position: relative;
                    left: 1px;
                }
            }
        }
        &-right {
            flex: 1;
            padding: 6px;
            overflow: auto;
            &::-webkit-scrollbar { 
                width: 0 !important 
            }
            &-list {
                border-bottom: 1px dotted $border-regular;
                margin-bottom: 10px;
                &-item {
                    margin-bottom: 12px;
                    min-height: 140px;
                    line-height: 3;
                    text-align: center;
                    background: $white;
                    border-radius: 10px;
                    box-shadow: $box-shadow-block;
                }
                &:last-child {
                    border-bottom: none;
                    margin-bottom: 0;
                }
            }
        }
    }
}
</style>