<template>
    <Layout :navbar="true" :tabbar="true">
        <MySwiper />
        <Slider />
        <AnchorRecommend />
    </Layout>
</template>

<script>
import { defineComponent } from 'vue';
import Layout from '@/components/Layout.vue';
import AnchorRecommend from '@/components/AnchorRecommend.vue';
import MySwiper from './Swiper.vue';
import Slider from './Slider.vue';
export default defineComponent({
    components: {
        Layout,
        MySwiper,
        Slider,
        AnchorRecommend
    },
    setup() {
        return {};
    },
});
</script>

<style lang="scss" scoped>
</style>
