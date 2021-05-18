<template>
    <div class="football-item">
        <div class="football-item-top flex">
            <div>{{ changeMatchTimeFn(item.matchStartTime) }}</div>
            <img src="../../assets/images/public/football.png" alt="" />
            <div class="match-name">
                {{
                    item.league.leagueNameCn
                        ? item.league.leagueNameCn
                        : item.league.leagueNameCnShort
                }}
            </div>
        </div>
        <div class="football-item-middle flex">
            <div>
                <div class="team-logo">
                    <img
                        v-if="item.home_team.logo"
                        :src="item.home_team.logo"
                        alt=""
                    />
                </div>
            </div>
            <div class="vs">
                <div>{{ item.homeScore || 0 }}</div>
                <div>VS</div>
                <div>{{ item.awayScore || 0 }}</div>
            </div>
            <div>
                <div class="team-logo">
                    <img
                        v-if="item.away_team.logo"
                        :src="item.away_team.logo"
                        alt=""
                    />
                </div>
            </div>
        </div>
        <div class="football-item-bottom flex">
            <div>{{ item.home_team.nameCn }}</div>
            <div class="match-status">
                <span v-if="item.is_playing === 1" class="sp02">
                    未开赛<i class="icon02"></i>
                </span>
                <span v-else-if="item.is_playing === 2">
                    正在直播<i class="icon01"></i>
                </span>
                <span v-else-if="item.is_playing === 3" class="sp02">
                    已完赛<i class="icon03"></i>
                </span>
            </div>
            <div>{{ item.away_team.nameCn }}</div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import moment from 'moment';

export default defineComponent({
    props: {
        item: {
            type: Object,
            default: {},
        },
    },
    setup(props) {
        const changeMatchTimeFn = (time) => {
            const newTime = moment(time * 1000).format('HH:MM');
            return newTime || '';
        };

        return {
            changeMatchTimeFn,
        };
    },
});
</script>

<style lang="scss" scoped>
.football {
    &-item {
        padding: 44px 20px;
        box-sizing: border-box;
        border-bottom: 2px solid #eee;
        .flex {
            @include flexCenter();
        }
        &-top {
            @include font($size: 24px, $weight: 400, $color: #2b2626);
            .match-name {
                font-weight: 600;
            }
            img {
                width: 30px;
                display: block;
                object-fit: cover;
                margin-left: 40px;
                margin-right: 24px;
            }
        }
        &-middle {
            margin: 24px 0;
            & > div {
                width: 39%;
                @include flexCenter();
            }
            .team-logo {
                width: 66px;
                height: 66px;
                @include bg();
                overflow: hidden;
                background-image: url('../../assets/images/public/logo.png');
                img {
                    width: 100%;
                    height: 100%;
                    display: block;
                    object-fit: cover;
                }
            }
            .vs {
                width: 26%;
                @include flexBetween();
            }
        }
        &-bottom {
            div {
                width: 40%;
                @include font($size: 24px, $color: #6b6767, $center: center);
            }
            .match-status {
                width: 20%;
                text-align: center;
                span {
                    padding: 4px 20px;
                    border-radius: 8px;
                    background-color: #858585;
                    @include font($size: 24px, $color: #fff);
                }
            }
        }
    }
}
</style>