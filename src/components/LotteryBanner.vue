<template>
    <div class="lottery-banner">
        <van-swipe :style="{height: height + 'px'}" :autoplay="3000" @change="onChange">
            <van-swipe-item 
                v-for="(image, index) in list" 
                :key="index" style="padding: 10px">
                <div class="lottery-banner-item" :style="`background-image:url(${image})`"></div>
            </van-swipe-item>
            <template #indicator>
                <div class="lottery-banner-indicator">
                    <div 
                        class="lottery-banner-indicator-item" 
                        :class="{active: i === current}"
                        v-for="(item, i) in list" 
                        :key="i">
                    </div>
                </div>
            </template>
        </van-swipe>
    </div>
</template>

<script>
export default {
    props: {
        height: {
            type: Number,
            default: 140
        }
    },
    data() {
        return {
            list: [
                '/images/banner.jpg',
                '/images/banner.jpg',
                '/images/banner.jpg',
                '/images/banner.jpg',
            ],
            current: 0
        }
    },
    methods: {
        onChange(i) {
            this.current = i
        }
    }
}
</script>

<style lang="scss" scoped>
.lottery-banner {
    width: 100%;
    background-color: $white;
    &-item {
        height: 100%;
        border-radius: 8px;
        background-size: cover;
        background-position: center;
    }
    &-indicator {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 5;
        height: 30px;
        text-align: center;
        &-item {
            display: inline-block;
            width: 8px;
            height: 4px;
            background-color: rgba(255,255,255,.5);
            border-radius: 2px;
            margin-right: 5px;
            transition: all 0.5s;
            &:last-child {
                margin-right: 0;
            }
            &.active {
                width: 16px;
                background-color: rgba(255,255,255,1);
            }
        }
    }
}
</style>