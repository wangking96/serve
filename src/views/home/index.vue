<template>
    <Layout :navbar="true" :tabbar="true">
        <MySwiper />
        <Slider />
        <AnchorRecommend :anchor="anchor" />
    </Layout>
</template>

<script>
import { defineComponent, onMounted, toRefs, reactive  } from 'vue';
import Layout from '@/components/Layout.vue';
import AnchorRecommend from '@/components/AnchorRecommend.vue';
import MySwiper from './Swiper.vue';
import Slider from './Slider.vue';
import api from '../../api/api';
import Request from '../../common/request';
export default defineComponent({
    components: {
        Layout,
        MySwiper,
        Slider,
        AnchorRecommend,
    },
    setup() {
        const data = reactive({
            anchor: [],
        });
        onMounted(() => {
            Request({
                params: {
                    service: api.anchorRecommend,
                },
            }).then((res) => {
                if (res.code === 0) {
                    data.anchor = res.info;
                }
            });
        });
        return {
            ...toRefs(data)
        };
    },
});
</script>

<style lang="scss" scoped>
</style>
