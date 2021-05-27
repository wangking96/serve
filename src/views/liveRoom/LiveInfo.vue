<template>
    <div class="live-info">
        <div class="live-info-top">
            <div class="live-info-anchor">
                <div class="live-info-anchor-left">
                    <div class="avatar">
                        <img
                            :src="liveInfo.avatar"
                            alt=""
                            v-if="liveInfo.avatar"
                        />
                    </div>
                    <div>
                        <p class="title">{{ liveInfo.user_nicename }}</p>
                        <p class="hot">{{ liveInfo.viewnum }}</p>
                    </div>
                </div>
                <div
                    class="live-info-anchor-right"
                    :class="{ subscribed: liveInfo.isSubscribe != 0 }"
                    @click="subscribeAnchor"
                >
                    {{ liveInfo.isSubscribe == 0 ? '订阅' : '已订阅' }}
                </div>
            </div>
            <div class="live-info-notice">
                <div class="live-info-notice-title">直播公告.</div>
                <div class="live-info-notice-desc">主播很低调什么也没留下</div>
            </div>
        </div>

        <div class="live-info-anchor-recommend">
            <AnchorRecommend :anchor="anchor" />
        </div>
    </div>
</template>

<script>
import { computed, defineComponent, onMounted, reactive, toRefs } from 'vue';
import AnchorRecommend from '../../components/AnchorRecommend.vue';
import api from '../../api/api';
import Request from '../../common/request';
import { useStore } from 'vuex';
import { Toast } from 'vant';
export default defineComponent({
    components: {
        AnchorRecommend,
    },
    props: {
        liveInfo: {
            type: Object,
            default: {},
        },
    },
    setup(props, { emit }) {
        const store = useStore();
        const userInfo = computed(() => store.state.userInfo);
        const loginInfo = computed(() => store.state.loginInfo);
        const data = reactive({
            anchor: [],
            httpStatus: false,
        });
        const getRecommendedStream = () => {
            Request({
                params: {
                    limit: '4', //每页记录数
                    p: '1', //页数
                    field: 'recom_sort', //可排序字段，支持 recom_sort, starttime
                    order: 'random', //排序，asc, desc, random
                    uid: userInfo.value.id || '',
                    token: userInfo.value.token || '',
                    service: api.liveAnchorRecommend,
                },
            }).then((res) => {
                if (res.code === 0) {
                    data.anchor = res.info;
                }
            });
        };
        const subscribeAnchor = async () => {
            if (data.httpStatus) return;
            data.httpStatus = true;
            const res = await Request({
                params: {
                    touid: props.liveInfo.uid,
                    type: props.liveInfo.isSubscribe === 0 ? 1 : 2,
                    uid: loginInfo.value.id,
                    token: loginInfo.value.token,
                    service: api.subscribeAnchor,
                },
            });

            if (res.code === 0) {
                Toast({
                    type: 'success',
                    message: res.msg,
                });
                emit('refresh');
            }
            data.httpStatus = false;
        };
        onMounted(() => {
            getRecommendedStream();
        });
        return {
            subscribeAnchor,
            ...toRefs(data),
        };
    },
});
</script>

<style lang="scss" scoped>
.live-info {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    border-top: 28px solid#f7f7f7;
    overflow-y: auto;
    overflow-x: hidden;
    &::-webkit-scrollbar {
        width: 0;
    }
    &-top {
        padding: 24px;
        box-sizing: border-box;
        background-color: #fff;
    }
    &-anchor {
        width: 100%;
        @include flexBetween();
        &-left {
            @include flexAlignItemsCenter();
            .avatar {
                width: 92px;
                height: 92px;
                overflow: hidden;
                margin-right: 24px;
                border-radius: 50%;
                @include bg();
                background-image: url('/images/live/avatar-default.png');
                img {
                    width: 100%;
                    display: block;
                    object-fit: cover;
                }
            }
            .title {
                @include font($size: 30px, $weight: bold, $color: #2b2626);
            }
            .hot {
                margin-top: 14px;
                @include flexAlignItemsCenter();
                @include font($size: 24px, $weight: 400, $color: #2b2626);
                &::before {
                    content: '';
                    display: block;
                    width: 26px;
                    height: 32px;
                    @include bg();
                    margin-right: 6px;
                    background-image: url('/images/common/hot.png');
                }
            }
        }
        &-right {
            width: 108px;
            height: 40px;
            line-height: 40px;
            border-radius: 40px;
            background-color: #ff5116;
            @include font(
                $size: 20px,
                $weight: 400,
                $color: #fff,
                $center: center
            );
            &.subscribed {
                background-color: rgb(204, 204, 204);
            }
        }
    }
    &-notice {
        &-title {
            margin-top: 40px;
            @include flexAlignItemsCenter();
            @include font($size: 22px, $weight: 400, $color: #2b2626);
            &:before {
                content: '';
                display: block;
                width: 26px;
                height: 30px;
                object-fit: cover;
                @include bg();
                margin-right: 8px;
                background-image: url('/images/common/notice.png');
            }
        }
        &-desc {
            margin-top: 10px;
            @include font($size: 22px, $weight: 400, $color: #2b2626);
        }
    }
    &-anchor-recommend {
        margin-top: 24px;
        background-color: #fff;
    }
}
</style>
