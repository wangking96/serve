<template>
    <Layout :navbar="true" :tabbar="true">
        <MySwiper />
        <Slider />
        <AnchorRecommend :anchor="anchor" />
    </Layout>
</template>

<script>
import { useStore } from 'vuex';
import { defineComponent, onMounted, toRefs, reactive, computed } from 'vue';
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
        const store = useStore();
        const userInfo = computed(() => store.state.userInfo);
        const data = reactive({
            anchor: [],
        });
        onMounted(() => {
            Request({
                params: {
                    service: api.anchorRecommend,
                    uid: userInfo.value.id || '',
                    token: userInfo.value.token || '',
                    limit: '4', //每页记录数
                    p: '1', //页数
                    field: 'recom_sort', //可排序字段，支持 recom_sort, starttime
                    order: 'random', //排序，asc, desc, random
                },
            }).then((res) => {
                if (res.code === 0) {
                    data.anchor = res.info;
                }
            });
        });
        return {
            ...toRefs(data),
        };
    },
});
</script>

<style lang="scss" scoped>
</style>
