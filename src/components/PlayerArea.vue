<template>
    <div
        class="live-player-area"
        :class="[
            { football: matchInfo.match_type === 3 },
            { basketball: matchInfo.match_type === 2 },
        ]"
    >
        <div class="live-player-area-title">
            <div class="live-player-area-title-main">
                <div class="goback" @click="gobackFn">
                    <img src="../assets/images/public/left-arrow.png" />
                </div>
                <div>{{ title }}</div>
            </div>
        </div>

        <div class="live-player-area-match">
            <div class="live-player-area-match-title">
                {{
                    match.matchStartTime &&
                    matchTimeFn(match.matchStartTime * 1000)
                }}
                {{ match.state_str }}
            </div>
            <div class="live-player-area-match-main">
                <div class="live-player-area-match-main-left">
                    <img
                        v-if="match.home_team.logo"
                        :src="match.home_team.logo"
                    />
                    <p>{{ match.home_team.nameCn }}</p>
                </div>
                <div class="live-player-area-match-main-middle">
                    <p>vs</p>
                    <p>{{ matchStatusFn(match.is_playing) }}</p>
                </div>
                <div class="live-player-area-match-main-right">
                    <img
                        v-if="match.away_team.logo"
                        :src="match.away_team.logo"
                    />
                    <p>{{ match.away_team.nameCn }}</p>
                </div>
            </div>
        </div>

        <div class="live-player-area-main">
            <slot />
        </div>
    </div>
</template>

<script>
import { computed, defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import moment from 'moment';

export default defineComponent({
    props: {
        title: {
            type: String,
            default: '',
        },
        match: {
            type: Object,
            default: {},
        },
    },
    setup(props) {
        const store = useStore();
        const router = useRouter();
        const matchInfo = computed(() => store.state.matchInfo);

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
        };
    },
});
</script>

<style lang="scss" scoped>
.live {
    &-player-area {
        width: 100%;
        height: 462px;
        @include bg();
        overflow: hidden;
        position: relative;
        background-color: #333;
        &.football {
            background-image: url('../assets/images/live/football-bg.png');
        }
        &.basketball {
            background-image: url('../assets/images/live/basketball-bg.png');
        }
        &-title {
            width: 100%;
            height: 70px;
            opacity: 0.9;
            @include position(
                $position: absolute,
                $top: 0,
                $left: 0,
                $zIndex: 99
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
                @include font(
                    $size: 24px,
                    $weight: 500,
                    $color: #fff,
                    $center: center
                );
            }
            &-main {
                @include flexBetween();
                div {
                    flex: 1;
                    @include font($size: 24px, $color: #fff, $center: center);
                }
            }
            &-main {
                box-sizing: border-box;
            }
        }
        &-main {
            width: 100%;
            height: 100%;
        }
    }
}
</style>