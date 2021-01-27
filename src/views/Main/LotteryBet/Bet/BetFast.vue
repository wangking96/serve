<template>
    <div class="betfast">
        <div class="betfast-title">
            <van-dropdown-menu>
                <van-dropdown-item 
                    v-model="curRange" 
                    :options="ranges" 
                    @change="handleChange">
                </van-dropdown-item>
            </van-dropdown-menu>
            <div class="betfast-title-search">
                <input type="text" placeholder="Tìm số" v-model="keyword">
                <i @click="search"><svg-icon icon-class="search" /></i>
            </div>
        </div>
        <div class="betfast-list" id="betfast-list">
            <div class="betfast-list-wrap">
                <div 
                    class="betfast-list-wrap-item" 
                    v-for="item in list"
                    :key="item"
                    @click="handleSelect(item)">
                    <span :class="{'active': selected.includes(item) }">{{ item }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { numBzero } from '@/utils/common'
import { scrollTopTo } from '@/utils/scroll'
const ranges = [
    { value: 0, text: '000-099', min: 0, max: 99},
    { value: 1, text: '100-199', min: 100, max: 199},
    { value: 2, text: '200-299', min: 200, max: 299},
    { value: 3, text: '300-399', min: 300, max: 399},
    { value: 4, text: '400-499', min: 400, max: 499},
    { value: 5, text: '500-599', min: 500, max: 599},
    { value: 6, text: '600-699', min: 600, max: 699},
    { value: 7, text: '700-799', min: 700, max: 799},
    { value: 8, text: '800-899', min: 800, max: 899},
    { value: 9, text: '900-999', min: 900, max: 999}
]
const arrayLike = Array.from({length: 100}, (v, i) => i)
export default {
    data(){
        return {
            ranges,
            list: [],
            selected: [],
            curRange: 0,
            keyword: ''
        }
    },
    created() {
        this.setCurList(0)
    },
    methods: {
        handleChange(i) {
            this.setCurList(i)
        },
        setCurList(n) {
            const min = ranges[n].min
            const max = ranges[n].max
            this.list = Array.from(arrayLike, x => numBzero(x+n*100, 3))
        },
        handleSelect(code){
            const index = this.selected.indexOf(code)
            if (index > -1) {
                this.selected.splice(index, 1)
                return
            }
            this.selected.push(code)
        },
        search() {
            if (!this.keyword) return
            const num = this.keyword.trim()
            const range = ranges.find(item => item.min <= +num && num <= item.max)
            if (range) {
                this.curRange = range.value
                this.handleChange(this.curRange)
                this.handleSelect(num)
                this.scrollBlock(num)
            }
        },
        scrollBlock(num) {
            const betfastList = document.getElementById('betfast-list')
            const children = betfastList.children[0].children
            const cur = children[this.list.indexOf(num)]
            const to = cur.offsetTop - (betfastList.offsetHeight - cur.offsetHeight) / 2
            scrollTopTo(betfastList, to, 0.3)
        }
    }
}
</script>

<style lang="scss">
.betfast-title .van-dropdown-menu__bar {
    background: none;
    box-shadow: none;
    height: 40px;
}
.betfast-title .van-dropdown-menu__title::after {
    border-color: transparent transparent $font-lighter $font-lighter;
}
</style>
<style lang="scss" scoped>
.betfast {
    height: 100%;
    position: relative;
    &-title {
        position: absolute;
        top: 10px;
        left: 10px;
        right: 10px;
        height: 40px;
        padding: 14px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-radius: 8px 8px 0 0;
        background-image: linear-gradient(179deg, #FFFFFF 42%, #E9E9E9 100%);
        &-search, &-menu {
            height: 30px;
            border-radius: 8px;
            border: 1px solid #DDDDDD;
        }   
        &-menu {
            width: 90px;
            position: relative;
            &-text {
                display: block;
                font-size: $font-mini;
                line-height: 28px;
                padding-left: 8px;
            }
            &-arrow {
                width: 0;
                height: 0;
                top: 50%;
                right: 6px;
                position: absolute;
                border: 6px solid transparent;
                border-top: 8px solid $font-lighter;
                transform: translateY(-3px);
            }
        }
        &-search {
            width: 120px;
            position: relative;
            display: flex;
            justify-content: space-between;
            i {
                width: 30px;
                height: 100%;
                position: absolute;
                right: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                .svg-icon {
                    width: 1.3em;
                    height: 1.3em;
                }
            }
            input {
                width: 90px;
                height: 100%;
                border: 0;
                padding: 0;
                padding-left: 6px;
                background-color: transparent;
            }
        }
    }
    &-list {
        position: absolute;
        top: 50px;
        bottom: 0;
        width: 100%;
        padding: 0 10px 10px 10px;
        overflow: hidden auto;
        &-wrap {
            background-color: $white;
            box-shadow: $box-shadow-block;
            border-bottom-left-radius: 8px;
            border-bottom-right-radius: 8px;
            padding: 10px 5px 0 5px;
            display: flex;
            flex-wrap: wrap;
            &-item {
                width: 20%;
                padding-bottom: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
                span {
                    width: 80%;
                    height: 30px;
                    line-height: 30px;
                    text-align: center;
                    border-radius: 8px;
                    display: inline-block;
                    background: #FFFFFF;
                    border: 1px solid #DDDDDD;
                    box-shadow: 0 2px 4px 0 rgba(199,199,199,0.32);
                }
                .active {
                    border: 0;
                    color: #fff;
                    animation: scaleIcon .5s;
                    box-shadow: 0 2px 4px 0 rgba(211,0,0,0.32);
                    background-image: linear-gradient(270deg, #F60000 0%, #FF9400 100%);
                }
            }
        }
    }
}
</style>