<template>
    <div class="betrow">
        <div class="betrow-top">
            <div class="betrow-title">{{row.unit.name}}</div>
            <div class="betrow-fixtab">
                <div 
                    :class="['betrow-fixtab-tab', {'active': item.code === selectedControl.code }]" 
                    v-for="(item, i) in CONTROLS" 
                    @click="handleControl(item)"
                    :key="i">
                    {{ item.name }}
                </div>
            </div>
        </div>
        <div class="betrow-list">
            <div
                class="betrow-list-item" 
                v-for="ball in row.availableBalls" 
                :key="ball">
                <div 
                    class="betrow-list-item-ball" 
                    :class="{'active': row.balls.includes(ball)}"
                    @click="handleSelectBall(ball)">
                    {{ ball }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
const CONTROLS = [
    { code: 'QUAN', name: 'Tổng' },
    { code: 'DA', name: 'Tài' },
    { code: 'XIAO', name: 'Xỉu' },
    { code: 'DAN', name: 'Lẻ' },
    { code: 'SHUANG', name: 'Chẵn' },
    { code: 'QING', name: 'Xóa' },
]
export default {
    props: {
        row: Object,
        middle: Number,
    },
    data(){
        return {
            height: 165,
            CONTROLS,
            selectedControl: {}
        }
    },
    methods: {
        handleSelectBall(item) {
            const index = this.row.balls.indexOf(item)
            if (index > -1) {
                this.row.balls.splice(index, 1)
            } else {
                this.row.balls.push(item)
            }
            this.selectedControl = {}
        },
        handleControl(data) {
            this.selectedControl = data
            if (data.code === 'QUAN') {
                this.row.balls = [...this.row.availableBalls]
            } else if (data.code === 'DA') {
                this.row.balls = this.row.availableBalls.filter(item => item >= this.middle)
            } else if (data.code === 'XIAO') {
                this.row.balls = this.row.availableBalls.filter(item => item < this.middle)
            } else if (data.code === 'DAN') {
                this.row.balls = this.row.availableBalls.filter(item => item % 2)
            } else if (data.code === 'SHUANG') {
                this.row.balls = this.row.availableBalls.filter(item => item % 2 === 0)
            } else if (data.code === 'QING') {
                this.row.balls = []
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.betrow {
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 10px;
    box-shadow: $box-shadow-block;
    &-top {
        height: 30px;
        padding: 0 10px;
        display: flex;
        align-items: center;
        background-image: linear-gradient(179deg, #FFFFFF 42%, #E9E9E9 100%);
    }

    &-title {
        flex: 1;
    }

    &-fixtab{
        flex: 2;
        display: flex;
        align-items: center;
        &-tab {
            flex: 1;
            text-align: center;
            &.active {
                color: $theme-color;
            }
        }
    }

    &-list {
        background-color: #fff;
        padding-bottom: 20px;
        display: flex;
        flex-wrap: wrap;
        &-item { 
            width: 20%;
            padding-top: 20px;
            $ball-width: 46px;
            &-ball {
                margin: 0 auto;
                width: $ball-width;
                height: $ball-width;
                line-height: $ball-width - 2px;
                text-align: center;
                color: $font-important;
                border-radius: 100%;
                font-size: 22px;
                background-image: $betrow-ball-bg-image-regular;
                box-shadow: 0 2px 6px 0 rgba(0,0,0,0.1);
                border: 1px solid $border-light;
                &.active {
                    color: #fff;
                    animation: scaleIcon .3s;
                    border: none;
                    line-height: $ball-width;
                    box-shadow: $box-shadow-maroon;
                    background-image: $betrow-ball-bg-image-yellow-red;
                }
            }
        }
    }
}
</style>