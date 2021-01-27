<template>
    <div class="zonghe">
        <LotteryHomeTop 
            :headerHeight="headerHeight" 
            :bannerHeight="bannerHeight" 
            :featuresHeight="featuresHeight">
        </LotteryHomeTop>
        <div 
            class="zonghe-bottom" 
            :style="{top: headerHeight + bannerHeight + 40 + featuresHeight + 'px'}">
            <div 
                class="zonghe-bottom-left" 
                :style="{width: leftNavWidth + 'px'}" 
                ref="zongheLeft">
                <div 
                    class="zonghe-bottom-left-item" 
                    :style="{height: leftItemHeight + 'px'}"
                    v-for="(nav, i) in navs" 
                    :key="nav.id" 
                    @click="handleChangeNav(i)">
                    <LotteryTabBtn 
                        class="zonghe-bottom-left-item-nav" 
                        :active="nav.id === navs[current].id"
                        :item="nav"
                        :width="leftNavWidth - 12"
                        :height="leftItemHeight - 12">
                    </LotteryTabBtn>
                </div>
            </div>
            <div class="zonghe-bottom-right">
                <van-swipe 
                    ref="zongheRight"
                    class="zonghe-bottom-right-swipe" 
                    :vertical="true"
                    :show-indicators="false"
                    @change="onPageChange">
                    <van-swipe-item 
                        v-for="(nav, i) in navs" 
                        :key="i" 
                        class="zonghe-bottom-right-swipe-item">
                        <div class="zonghe-bottom-right-swipe-item-in"></div>
                        <div class="zonghe-bottom-right-swipe-item-in"></div>
                        <div class="zonghe-bottom-right-swipe-item-in"></div>
                    </van-swipe-item>
                </van-swipe>
            </div>
        </div>
    </div>
</template>

<script>
import { scrollTopTo } from '@/utils/scroll'
import LotteryHomeTop from '@/components/LotteryHomeTop'
import LotteryTabBtn from '@/components/LotteryTabBtn'
const navs = [
    {
        id: 0, 
        name: 'LiveCasino',
        icon: '/images/zonghe/LiveCasino.png',
        activeIcon: '/images/zonghe/LiveCasino-active.png',
    },{
        id: 1, 
        name: 'Trochoi',
        icon: '/images/zonghe/Trochoi.png',
        activeIcon: '/images/zonghe/Trochoi-active.png',
    },{
        id: 2, 
        name: 'Thethao',
        icon: '/images/zonghe/Thethao.png',
        activeIcon: '/images/zonghe/Thethao-active.png',
    },{
        id: 3, 
        name: 'DaGa',
        icon: '/images/zonghe/DaGa.png',
        activeIcon: '/images/zonghe/DaGa-active.png',
    },{
        id: 4, 
        name: 'Trochoidientu',
        icon: '/images/zonghe/Trochoidientu.png',
        activeIcon: '/images/zonghe/Trochoidientu-active.png',
    }
]
export default {
    name: 'Zonghe',
    components: {
        LotteryHomeTop,
        LotteryTabBtn
    },
    inject: ['headerHeight', 'bannerHeight', 'featuresHeight', 'leftNavWidth'],
    data() {
        return {
            navs,
            current: 0,
            leftItemHeight: 82
        }
    },
    methods: {
        /**
         * 左边导航切换
         */
        handleChangeNav(i, type=true) {
            this.current = i
            const nav = this.$refs['zongheLeft']
            if (nav) {
                const cur = nav.children[i]
                const to = cur.offsetTop - (nav.offsetHeight - cur.offsetHeight) / 2
                scrollTopTo(nav, to, 0.3)
                type && this.$refs['zongheRight'].swipeTo(i)
            }
        },
        onPageChange(i) {
            this.handleChangeNav(i, false)
        }
    }
}
</script>

<style lang="scss" scoped>
.zonghe {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
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
            overflow-x: hidden;
            position: relative;
            &-swipe {
                width: 100%;
                height: 100%;
                &-item {
                    padding: 6px;
                    display: flex;
                    flex-direction: column;
                    &-in {
                        flex: 1;
                        border-radius: 10px;
                        box-shadow: $box-shadow-block;
                        background-color: #fff;
                        text-align: center;
                        font-size: 30px;
                        margin-bottom: 10px;
                        background-image: url('/images/zonghe-item.jpg');
                        background-size: 100% auto;
                        &:last-child {
                            margin-bottom: 0;
                        }
                    }
                }
            }
        }
    }
}
</style>