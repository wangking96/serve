<template>
    <Layout :navbar="true" :tabbar="true">
        <h1>match</h1>
    </Layout>
</template>

<script>
import { defineComponent } from 'vue';
import Layout from '@/components/Layout.vue';
export default defineComponent({
    components: {
        Layout,
    },
    setup() {
        return {};
    },
});
</script>

<style lang="scss" scoped>
</style>
