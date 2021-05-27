<template>
    <div class="match-list-loading">
        <van-loading
            size="20px"
            color="#969799"
            style="margin-right: 4px"
        />
        加载中...
    </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    setup() {
        return {};
    },
});
</script>

<style lang="scss" scoped>
.match-list-loading {
    padding: 24px 0;
    @include flexCenter();
    // background-color: #f7f7f7;
    @include font($size: 28px, $color: #969799, $center: center);
}
</style>