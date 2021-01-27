<template>
    <div class="result-status" :style="{height: height + 'px'}">
        <div class="result-status-left">
            <p>Bạc Liêu-Lượt xổ : 2020102103</p>
            <ul>
                <li v-for="ball in 6" :key="ball">{{ ball }}</li>
            </ul>
        </div>
        <div class="result-status-right">
            <p>Lượt xổ: 2020102104</p>
            <div class="result-status-right-countdown">
                <svg-icon 
                    :icon-class="isMute ? 'sound' : 'mute'" 
                    @click.native="changeSound">
                </svg-icon>
                <span class="result-status-right-countdown-text">{{ '00:00:00' }}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        height: {
            type: Number,
            default: 60
        }
    },
    data() {
        return {
            isMute: true,
        }
    },
    methods: {
        changeSound() {
            this.isMute = !this.isMute
        }
    }
}
</script>

<style lang="scss" scoped>
.result-status {
    padding: 10px;
    display: flex;
    font-size: $font-mini;
    background-color: #fff;
    color: $font-important;
    &-left {
        flex: 1;
        ul {
            margin-top: 8px;
            display: flex;
            align-items: center;
            li {
                width: 22px;
                height: 22px;
                line-height: 20px;
                margin-right: 4px;
                border-radius: 50%;
                text-align: center;
                color: #fff;
                background-size: cover;
                background-repeat: no-repeat;
                background-image: url('/images/ball.png');
            }
        }
    }
    &-right {
        width: 120px;
        &-countdown {
            text-align: right;
            margin-top: 8px;
            font-size: 20px;
            color: $theme-color;
            &-text {
                font-size: 24px;
                padding-left: 5px;
            }
        }
    }
}
</style>