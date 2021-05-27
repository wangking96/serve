<template>
    <div class="anchor-recommend">
        <div class="anchor-recommend-title">
            <div class="anchor-recommend-title-icon"></div>
            <div class="anchor-recommend-title-text">推荐直播</div>
        </div>
        <div class="anchor-recommend-list" v-if="anchor.length > 0">
            <div
                class="anchor-recommend-item"
                v-for="item in anchor"
                :key="item.id"
            >
                <div
                    class="anchor-recommend-item-cover"
                    @click="goToLiveRoomFn(item)"
                >
                    <div class="living"></div>
                    <img v-lazy="item.thumb" alt="" />
                </div>
                <div class="anchor-recommend-item-title ovh">
                    {{ item.title }}
                </div>
                <div class="anchor-recommend-item-desc">
                    <div class="nickname ovh">{{ item.user_nicename }}</div>
                    <div class="hot">{{ item.viewnum }}</div>
                </div>
            </div>
        </div>
        <div class="nodata" v-else>
            <img src="/images/common/no-data.png" alt="" />
            <p>主播正在路上，下载app更多超清比赛</p>
        </div>
    </div>
</template>

<script>
import { computed, defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import ws from '../common/ws';
export default defineComponent({
    props: {
        anchor: {
            type: Array,
            default: [],
        },
        source: {
            type: String,
            default: ''
        }
    },
    setup(props) {
        const store = useStore();
        const router = useRouter();
        const liveInfo = computed(() => store.state.liveInfo);

        const goToLiveRoomFn = (item) => {
            if(item.uid === liveInfo.value.uid && !props.source) return;
            store.commit('SET_LIVEINFO', item);
            ws.close();
            router.push({
                path: '/liveRoom',
                query: {
                    id: item.uid,
                },
            });
        };
        return {
            goToLiveRoomFn,
        };
    },
});
</script>

<style lang="scss" scoped>
.anchor-recommend {
    padding: 20px 16px;
    box-sizing: border-box;
    &-title {
        width: 100%;
        margin-bottom: 22px;
        @include flexAlignItemsCenter();
        &-icon {
            width: 34px;
            height: 43px;
            @include bg();
            margin-right: 14px;
            background-image: url('/images/common/hot.png');
        }
        &-text {
            @include font($size: 30px, $weight: 500, $color: #000);
        }
    }
    &-list {
        @include flexWrapBetween();
    }
    &-item {
        width: 350px;
        margin-bottom: 30px;
        &-cover {
            width: 350px;
            height: 204px;
            border-radius: 8px;
            overflow: hidden;
            position: relative;
            .living {
                width: 40px;
                height: 40px;
                @include bg();
                background-image: url('/images/common/living.webp');
                @include position($position: absolute, $top: 4px, $right: 8px);
            }
            img {
                width: 100%;
                height: 100%;
                display: block;
                object-fit: cover;
            }
        }
        &-title {
            margin-top: 14px;
            @include font($size: 28px, $weight: bold, $color: #2b2626);
        }
        &-desc {
            padding-right: 12px;
            margin-top: 14px;
            overflow: hidden;
            @include flexBetween();
            @include font($size: 24px, $weight: 500, $color: #2b2626);
            .nickname {
                width: 60%;
            }
            .hot {
                @include flexAlignItemsCenter();
                &::before {
                    content: '';
                    width: 14px;
                    height: 18px;
                    @include bg();
                    display: block;
                    margin-right: 6px;
                    background-image: url('/images/common/hot.png');
                }
            }
        }
    }
    .nodata {
        width: 100%;
        img {
            width: 600px;
            margin: auto;
            display: block;
        }
        p {
            @include font($size: 30px, $weight: 500, $color: #000, $center: center);
        }
    }
}
</style>
