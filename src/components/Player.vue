<template>
    <div class="player">
        <div class="player-title">
            <div class="goback" @click="gobackFn">
                <img src="../assets/images/public/left-arrow.png" alt="" />
            </div>
            <div>绝对巅峰</div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
export default defineComponent({
    setup() {
        const router = useRouter();
        const gobackFn = () => {
            router.go(-1);
        }
        return {
            gobackFn
        };
    },
});
</script>

<style lang="scss" scoped>
.player {
    width: 100%;
    height: 100%;
    position: relative;
    &-title {
        height: 70px;
        opacity: 0.8;
        position: relative;
        @include flexCenter();
        @include font($size: 30px, $weight: 500, $color: #fff);
        .goback {
            width: 66px;
            height: 100%;
            @include flexCenter();
            transform: translateY(-50%);
            @include position($position: absolute, $top: 50%, $left: 0);
            img {
                width: 20px;
            }
        }
    }
}
</style>
