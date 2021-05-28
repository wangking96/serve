<template>
    <div class="navbar" :class="{ 'flex-center': type !== 'default' }">
        <template v-if="type === 'default'">
            <img
                :src="`/images/platform/${platform}/navbar-logo.png`"
                alt="logo"
                class="logo"
            />
            <div class="right-btn">
                <div class="btn go-back" v-if="showBack" @click="goToHomeFn">
                    返回首页
                </div>
                <AppDownload class="btn download">下载APP</AppDownload>
            </div>
        </template>
        <template v-else>
            <div class="back-last-page" @click="backFn">
                <img src="/images/mine/arrow-left.png" alt="" />
            </div>
            <div class="navbar-title">{{ title }}</div>
        </template>
    </div>
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import AppDownload from '../components/AppDownload.vue';
export default defineComponent({
    components: {
        AppDownload
    },
    props: {
        showBack: {
            type: Boolean,
            default: false,
        },
        type: {
            type: String,
            default: 'default',
        },
        title: {
            type: String,
            default: '',
        },
    },
    setup() {
        const router = useRouter();

        const data = reactive({
            platform: import.meta.env.MODE,
        });
        const backFn = () => {
            router.go(-1);
        };
        const goToHomeFn = () => {
            router.push('/');
        };

        return {
            backFn,
            goToHomeFn,
            ...toRefs(data),
        };
    },
});
</script>

<style lang="scss" scoped>
.navbar {
    width: 100vw;
    height: 96px;
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
            @include font(
                $size: 24px,
                $weight: 400,
                $color: #ff5116,
                $center: center
            );
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
    &.flex-center {
        @include flexCenter();
        position: relative;
        background-color: #f8f8f8;
        box-sizing: border-box;
        border-bottom: 1px solid #ddd;
        .back-last-page {
            width: 90px;
            height: 100%;
            @include flexCenter();
            @include position($position: absolute, $top: 0, $left: 0);
            img {
                width: 60px;
                display: block;
            }
        }
        .navbar-title {
            @include font($size: 34px, $color: #323232ff);
        }
    }
}
</style>
