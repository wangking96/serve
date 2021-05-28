<template>
    <div
        class="live-player-area"
        :class="[
            { football: matchId === 1 },
            { basketball: matchId === 2 },
        ]"
    >
        <div class="live-player-area-title">
            <div class="live-player-area-title-main">
                <div class="goback" @click="gobackFn">
                    <img src="/images/common/left-arrow.png" />
                </div>
                <div>{{ title || matchInfo.league && (matchId === 1 ? matchInfo.league.leagueNameCn : matchInfo.league.leagueNameCnShort) }}</div>
            </div>
        </div>

        <div class="live-player-area-match" v-if="type === 'match'">
            <div class="live-player-area-match-title">
                {{
                    matchInfo.matchStartTime &&
                    matchTimeFn(matchInfo.matchStartTime * 1000)
                }}
                {{ matchInfo.state_str }}
            </div>
            <div class="live-player-area-match-main">
                <div class="live-player-area-match-main-left">
                    <div :style="`background-image: url('/images/platform/${platform}/logo-default.png');`">
                        <img
                            v-if="matchInfo.home_team && matchInfo.home_team.logo"
                            :src="matchInfo.home_team && matchInfo.home_team.logo"
                        />
                    </div>
                    <p>{{ matchInfo.home_team && matchInfo.home_team.nameCn }}</p>
                </div>
                <div class="live-player-area-match-main-middle">
                    <div class="vs">vs</div>
                    <p>{{ matchStatusFn(matchInfo.is_playing) }}</p>
                </div>
                <div class="live-player-area-match-main-right">
                    <div :style="`background-image: url('/images/platform/${platform}/logo-default.png');`">
                        <img
                            v-if="matchInfo.away_team && matchInfo.away_team.logo"
                            :src="matchInfo.away_team && matchInfo.away_team.logo"
                        />
                    </div>
                    <p>{{ matchInfo.away_team && matchInfo.away_team.nameCn }}</p>
                </div>
            </div>
        </div>

        <div class="live-player-area-main">
            <slot />
        </div>
    </div>
</template>

<script>
import { computed, defineComponent, reactive, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import moment from 'moment';

export default defineComponent({
    props: {
        title: {
            type: String,
            default: '',
        },
        type: {
            type: String,
            default: '',
        },
        matchId: Number
    },
    setup(props) {
        const store = useStore();
        const router = useRouter();
        const matchInfo = computed(() => store.state.matchInfo);
        const data = reactive({
            platform: import.meta.env.MODE
        })
        const gobackFn = () => {
            router.go(-1);
        };
        const matchTimeFn = (time) => {
            const newTime = moment(time).format('YYYY-MM-DD HH:MM') || '';
            return newTime;
        };
        const matchStatusFn = (status) => {
            const statusObj = {
                1: '未开赛',
                3: '比赛结束',
            };
            return statusObj[status] || '';
        };

        return {
            gobackFn,
            matchInfo,
            matchTimeFn,
            matchStatusFn,
            ...toRefs(data)
        };
    },
});
</script>

<style lang="scss" scoped>
.live {
    &-player-area {
        width: 100%;
        height: 100%;
        @include bg();
        overflow: hidden;
        position: relative;
        background-color: #333;
        &.football {
            background-image: url('/images/live/football-bg.png');
        }
        &.basketball {
            background-image: url('/images/live/basketball-bg.png');
        }
        &-title {
            width: 100%;
            height: 70px;
            opacity: 0.9;
            @include position(
                $position: absolute,
                $top: 0,
                $left: 0,
                $zIndex: 299
            );
            &-main {
                width: 100%;
                height: 100%;
                @include flexCenter();
                @include font($size: 30px, $weight: 500, $color: #fff);
                .goback {
                    width: 66px;
                    height: 100%;
                    @include flexCenter();
                    transform: translateY(-50%);
                    @include position($position: absolute, $top: 50%, $left: 0);
                    img {
                        width: 20px;
                    }
                }
            }
        }
        &-match {
            width: 100%;
            @include position(
                $position: absolute,
                $top: 80px,
                $left: 0,
                $zIndex: 99
            );
            &-title {
                margin-bottom: 64px;
                @include font(
                    $size: 24px,
                    $weight: 500,
                    $color: #fff,
                    $center: center
                );
            }
            &-main {
                @include flexBetween();
                box-sizing: border-box;
                &-left,
                &-middle,
                &-right {
                    flex: 1;
                    text-align: center;
                    div {
                        height: 104px;
                        margin-bottom: 40px;
                    }
                    p {
                        @include font($size: 28px, $color: #fff, $center: center);
                    }
                }
                &-left,
                &-right {
                    div {
                        width: 104px;
                        margin: 0 auto 40px;
                        border-radius: 50%;
                        overflow: hidden;
                        @include bg();
                        img {
                            width: 100%;
                            display: block;
                        }
                    }
                }
                &-middle {
                    .vs {
                        height: 104px;
                        padding-top: 20px;
                        box-sizing: border-box;
                        @include font($size: 54px, $weight: 600, $color: #fff);
                    }
                }
            }
        }
        &-main {
            width: 100%;
            height: 100%;
        }
    }
}
</style>