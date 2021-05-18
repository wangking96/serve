<template>
    <router-view />
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
    setup() {},
});
</script>

<style lang="scss">
#app {
    font-family: '微软雅黑', Avenir, Helvetica, Arial, sans-serif;
}
.ovh {
    @include textOverflow();
}
.my-toast {
    width: auto !important;
    line-height: 50px !important;
    padding: 20px 24px !important;
}
.my-loading {
    width: 200px !important;
    line-height: 52px !important;
    max-width: auto !important;
    padding: 16px !important;
}
</style>
