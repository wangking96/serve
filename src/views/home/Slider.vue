<template>
    <div class="slider">
        <div
            class="slider-item"
            v-for="s in sliders"
            :key="s.id"
            @click="jumpMatchLiveRomm(s)"
        >
            <div class="slider-item-top">
                <div class="match-type">{{ s.league_cat }}</div>
                <div class="match-status">
                    {{ s.status == 1 ? '比赛中' : '未开赛' }}
                </div>
            </div>
            <div class="slider-item-middle">
                <div class="team-logo">
                    <img :src="s.team_a_logo" alt="" v-if="s.team_a_logo" />
                </div>
                <div class="match-time">{{ s.starttime }}</div>
                <div class="team-logo">
                    <img :src="s.team_b_logo" alt="" v-if="s.team_b_logo" />
                </div>
            </div>
            <div class="slider-item-bottom">{{ s.league_name }}</div>
        </div>
    </div>
</template>

<script>
import { defineComponent, onMounted, reactive, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import api from '../../api/api';
import Request from '../../common/request';
export default defineComponent({
    setup() {
        const store = useStore();
        const router = useRouter();
        const data = reactive({
            sliders: [],
        });

        const jumpMatchLiveRomm = (item) => {
            store.commit('SET_MATCHINFO', item);
            router.push({
                path: '/matchLiveRoom',
                query: {
                    id: item.match_id
                }
            })
        };

        onMounted(() => {
            Request({
                params: {
                    service: api.slide,
                },
            }).then((res) => {
                if (res.code === 0 && res.info) {
                    data.sliders = res.info[0].list;
                }
            });
        });

        return {
            ...toRefs(data),
            jumpMatchLiveRomm,
        };
    },
});
</script>

<style lang="scss" scoped>
.slider {
    padding: 20px;
    overflow-x: auto;
    overflow-y: hidden;
    @include flexNowrap();
    background-color: #f7f7f7;
    &::-webkit-scrollbar {
        display: none;
    }
    &-item {
        width: 350px;
        height: 180px;
        flex-shrink: 0;
        padding-top: 4px;
        margin-left: 20px;
        border-radius: 8px;
        padding-bottom: 14px;
        box-sizing: border-box;
        background-color: #fff;
        @include flexDirectionColumn();
        &:first-child {
            margin-left: 0;
        }
        &-top {
            padding: 0 6px;
            box-sizing: border-box;
            @include flexBetween();
            .match-type {
                @include font($size: 26px, $color: #2b2626);
            }
            .match-status {
                width: 100px;
                height: 46px;
                line-height: 48px;
                border-radius: 6px;
                background-color: #bbb7b7;
                @include font($size: 20px, $color: #ffffff, $center: center);
            }
        }
        &-middle {
            flex: 1;
            padding: 0 26px;
            box-sizing: border-box;
            @include flexBetween();
            .match-time {
                @include font($size: 28px, $weight: 600, $color: #ff5116);
            }
            .team-logo {
                width: 50px;
                height: 50px;
                overflow: hidden;
                border-radius: 100%;
                background-size: cover;
                background-repeat: no-repeat;
                background-image: url('../../assets/images/platform/logo.png');
                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }
        }
        &-bottom {
            @include font(
                $size: 22px,
                $weight: 400,
                $color: #2b2626,
                $center: center
            );
        }
    }
}
</style>
