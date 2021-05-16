<template>
    <router-view />
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
    setup() {

    }
})
</script>

<style lang="scss">
#app {
    font-family: "微软雅黑", Avenir, Helvetica, Arial, sans-serif;
}
.ovh {
    @include textOverflow();
}
.my-toast {
    padding: 10px !important;
}
</style>
