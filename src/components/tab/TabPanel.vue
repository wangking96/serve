<template>
    <div class="tabs-panel-item">
        <slot />
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
.tabs-panel-item {
    width: 100%;
    height: 100%;
    flex-shrink: 0;
}
</style>
