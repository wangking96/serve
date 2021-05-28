<template>
    <a 
        :href="appSource === 'ios' ? config.ipa_url : config.apk_url"
        :target="appSource === 'ios' ? '_blank' : ''" 
    >
        <slot />
    </a>
</template>

<script>
import { computed, defineComponent, reactive, toRefs } from 'vue';
import { useStore } from 'vuex';
import { appSource } from '../common/tools.js';

export default defineComponent({
    setup() {
        const store = useStore();
        const config = computed(() => store.state.config);
        const data = reactive({
            appSource: appSource()
        });
        return {
            config,
            ...toRefs(data)
        };
    },
});
</script>

<style lang="scss" scoped>
</style>