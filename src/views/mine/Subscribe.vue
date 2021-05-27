<template>
    <Layout :tabbar="false" :navbar="true" type="title" title="订阅主播">
        <div class="subscribe">
            <div class="subscribe-loading" v-if="requestLoading">
                <van-loading color="#969799" />
                加载中...
            </div>
            <div class="subscribe-list" v-else>
                <div class="subscribe-item" v-for="item in list" :key="item.id" @click="goToLiveRommFn(item)">
                    <div class="anchor-avatar" :style="`background-image: url('/images/platform/${platform}/logo-default.png');`">
                        <img class="avatar" :src="item.avatar_thumb" alt="" />
                        <img
                            class="living"
                            v-if="item.islive == 1"
                            src="/images/common/living.webp"
                            alt=""
                        />
                    </div>
                    <div class="anchor-nickname">
                        {{ item.user_nicename }}
                    </div>
                </div>
            </div>
        </div>
    </Layout>
</template>

<script>
import {
    computed,
    defineComponent,
    onBeforeUnmount,
    onMounted,
    reactive,
    toRefs,
} from 'vue';
import Layout from '../../components/Layout.vue';
import api from '../../api/api.js';
import Request from '../../common/request';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
export default defineComponent({
    components: {
        Layout,
    },
    setup() {
        const store = useStore();
        const router = useRouter();
        const loginInfo = computed(() => store.state.loginInfo);
        const data = reactive({
            list: [],
            requestLoading: false,
            timeout: null,
            platform: import.meta.env.MODE
        });
        const getListDataFn = async () => {
            data.requestLoading = true;
            const res = await Request({
                params: {
                    service: api.subscribe,
                    limit: 30,
                    p: 1,
                    uid: loginInfo.value.id,
                    token: loginInfo.value.token || '',
                },
            });
            if (res.code === 0) {
                if (res.info.length > 0) {
                    data.list = res.info || [];
                }
            }
            data.timeout = setTimeout(() => {
                data.requestLoading = false;
            }, 500);
        };
        const goToLiveRommFn = (item) => {
            store.commit('SET_LIVEINFO', item);
            router.push({
                path: '/liveRoom',
                query: {
                    id: item.id
                }
            });
        }
        onMounted(() => {
            getListDataFn();
        });
        onBeforeUnmount(() => {
            clearTimeout(data.timeout);
        });
        return {
            ...toRefs(data),
            goToLiveRommFn
        };
    },
});
</script>

<style lang="scss" scoped>
.subscribe {
    width: 100%;
    height: 100%;
    padding: 18px;
    box-sizing: border-box;
    background-color: #f8f8f8;
    overflow-x: hidden;
    overflow-y: scroll;
    &-loading {
        margin-top: 30px;
        @include flexCenter();
        @include font($size: 28px, $color: #969799, $center: center);
    }
    &-list {
        padding: 16px 0;
        @include flexWrap();
        border-radius: 6px;
        box-sizing: border-box;
        background-color: #fff;
    }
    &-item {
        width: 25%;
        margin-top: 24px;
        &:nth-child(1),
        &:nth-child(2),
        &:nth-child(3),
        &:nth-child(4) {
            margin-top: 0;
        }
        .anchor-avatar {
            width: 80px;
            height: 80px;
            margin: auto;
            @include bg();
            border-radius: 50%;
            position: relative;
            .avatar {
                width: 100%;
                height: 100%;
                display: block;
                object-fit: cover;
            }
        }
        .anchor-nickname {
            margin-top: 14px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            @include font($size: 28px, $color: #2b2626, $center: center);
        }
        .living {
            width: 30px;
            height: 30px;
            @include position($position: absolute, $top: -10px, $right: -10px);
        }
    }
}
</style>
