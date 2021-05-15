<template>
   <div class="navbar">
       <img src="../assets/images/navbar/logo.png" alt="logo" class="logo">
       <div class="right-btn">
           <div class="btn go-back" v-if="showBack" @click="goToHomeFn">返回首页</div>
           <a class="btn download" href="" target="_blank">下载APP</a>
       </div>
    </div>
</template>

<script>
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
    props: {
        showBack: {
            type: Boolean,
            default: false
        }
    },
    setup() {
        const router = useRouter();
        const goToHomeFn = () => {
            router.push('/')
        }
        return {
            goToHomeFn
        }
    },
})
</script>

<style lang="scss" scoped>
.navbar {
    width: 100vw;
    height: 90px;
    padding: 0 18px;
    @include flexBetween();
    box-sizing: border-box;
    .logo {
        width: 260px;
        object-fit: cover;
    }
    .right-btn {
        flex: 1;
        @include flexLineEnd();
        .btn {
            display: block;
            width: 140px;
            height: 46px;
            line-height: 48px;
            border-radius: 25px;
            box-sizing: border-box;
            @include font($size: 24px, $weight: 400, $color: #ff5116, $center: center);
        }
        .download {
            color: #fff;
            background-color: #ff5116;
        }
        .go-back {
            line-height: 42px;
            margin-right: 34px;
            border: 1px solid #ff5116;
        }
    }
}
</style>
