<template>
    <div class="main-header" :style="{height: height + 'px'}">
        <div class="main-header-left" :style="{width: height + 'px'}" @click="back">
            <van-icon name="arrow-left" size="22" color="#fff" />
        </div>
        <div 
            class="main-header-content" 
            :style="{lineHeight: height + 'px'}">
            <div class="main-header-content-btn" @click="handleLottery">
                <span class="main-header-content-btn-menu">Bạc Liêu</span>
            </div>
        </div>
        <div 
            class="main-header-right" 
            :style="{width: height + 'px'}"
            @click="handleRight">
            <van-icon name="wap-nav" size="22" color="#fff" />
        </div>
    </div>
</template>

<script>
export default {
    props: {
        height: {
            type: Number,
            default: 46
        }
    },
    methods: {
        back() {
            this.$router.push({name: 'lottery'})
        },
        handleLottery() {
            if (this.$route.path.includes('lotterybet')) {
                this.$router.push({name: 'lotteryhall'})
            } else {
                this.$router.push({name: 'bet'})
            }
        },
        handleRight() {
            this.$emit('on-right')
        }
    }
}
</script>

<style lang="scss" scoped>
.main-header {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    color: $white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-image: $bg-header;
    &-left {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    &-content {
        flex: 1;
        height: 100%;
        text-align: center;
        &-btn {
            margin: 0 auto;
            width: 70%;
            height: 100%;
            &-menu {
                position: relative;
                &::after {
                    width: 0;
                    height: 0;
                    content: '';
                    border: 6px solid transparent;
                    border-top: 8px solid $white;
                    position: absolute;
                    top: 50%;
                    right: -15px;
                    transform: translateY(-4px);
                }
            }
        }
    }

    &-right {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        &-over {
            width: 100px;
            margin-right: 4px;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        &-menu {
            span {
                width: 16px;
                height: 2px;
                display: block;
                border-radius: 19px;
                background-color: #fff;

                &:not(:last-child){
                    margin-bottom: 5px;
                }
            }
        }
    }
}
</style>