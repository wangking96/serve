<template>
    <div class="loading">
        <div class="loading-main">
            <van-loading type="spinner" size="28px" />
            <div class="loading-text">{{text}}</div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
    props: {
        text: {
            type: String,
            default: ''
        }
    },
    setup() {
        return {};
    },
});
</script>

<style lang="scss" scoped>
.loading {
    width: 100%;
    height: 100%;
    transform: translate(-50%, -50%);
    @include flexCenter();
    @include position($position: fixed, $top: 50%, $left: 50%);
    &-main {
        width: 160px;
        height: 160px;
        padding: 44px 24px 0;
        text-align: center;
        border-radius: 16px;
        background-color: rgba(0, 0, 0, 0.7);
    }
    &-text {
        margin-top: 24px;
        @include font($size: 30px, $color: #fff);
    }
}
</style>
