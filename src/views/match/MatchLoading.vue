<template>
    <div class="match-list-more">
        <van-loading
            size="20px"
            color="#969799"
            style="margin-right: 4px"
        />
        {{ text }}
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
.match-list-more {
    padding: 24px 0;
    @include flexCenter();
    background-color: #f7f7f7;
    @include font($size: 28px, $color: #969799, $center: center);
}
</style>