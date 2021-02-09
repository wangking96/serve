<template>
    <div class="first-screen" ref="firstScreen" :style="{height: h + 'px'}">
        <video muted autoplay loop src="/images/pc_video.mp4" ref="video"></video>
        <div class="arrow" @click="arrowClickFn">
            <div>性息分享</div>
            <div>全国各地小姐姐最新性息</div>
            <div>看片约炮两不误</div>
            <img src="/images/arrow.png" alt="">
        </div>
    </div>
</template>

<script>
export default {
    name: 'FirstScreen',
    data(){
        return {
            h: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
        }
    },
    mounted() {
        window.addEventListener('resize', this.resizeFn)
    },
    destroyed() {
        window.removeEventListener('resize', this.resizeFn)
    },
    activated(){
        this.$refs.video && this.$refs.video.play()
    },
    methods: {
        arrowClickFn() {
            this.$refs.firstScreen && this.scrollFn(this.$refs.firstScreen.offsetHeight)
        },
        scrollFn(top){
            window.scrollTo({ 
                top: top, 
                behavior: "smooth" 
            })
        },
        resizeFn() {
            this.h = window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight
        }
    }
}
</script>

<style lang="scss" scoped>
.first-screen {
    width: 100%;
    height: 100%;
    position: relative;
    video {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    .arrow {
        position: absolute;
        bottom: 30px;
        left: 50%;
        transform: translate(-50%);
        text-align: center;
        cursor: pointer;
        font-size: 14px;
        font-family: "Microsoft YaHei";
        font-weight: 400;
        letter-spacing: 2px;
        & div:first-child {
            font-size: 18px;
            font-weight: bold;
        }
        & div:nth-child(2) {
            margin: 10px 1px;
        }
        & div:nth-child(3) {
            margin-bottom: 14px;
        }
        img {
            cursor: pointer;
            animation: move 1s linear infinite;
        }
    }
}
@keyframes move {
    0% {
        transform: scale(1);
        transform: translateY(0px);
    }
    100% {
        transform: scale(1.5);
        transform: translateY(16px);
    }
}
</style>