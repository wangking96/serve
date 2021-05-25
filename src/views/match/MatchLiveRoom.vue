<template>
    <Layout :navbar="true" :showBack="true">
        <div class="match-live-broadcast">
            <PlayerArea :title="matchInfo.league.leagueNameCn" :match="matchInfo">
                <Player />
            </PlayerArea>
        </div>
    </Layout>
</template>

<script>
import { computed, defineComponent, reactive, toRefs, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import Layout from '../../components/Layout.vue';
import Player from '../../components/Player.vue';
import PlayerArea from '../../components/PlayerArea.vue';
import api from '../../api/api';
import Request from '../../common/request';
import { useStore } from 'vuex';

export default defineComponent({
    components: {
        Layout,
        Player,
        PlayerArea
    },
    setup() {
        const route = useRoute();
        const store = useStore();
        const matchInfo = computed(() => store.state.matchInfo);
        const data = reactive({
            matchInfo: {
                league: {}
            },
        });

        const getMatchFn = async () => {
            const id = matchInfo.value.match_type === 3 ? 1: 2;
            const res = await Request({
                type: 'match',
                url: api.getMatch(id) || 1,
                params: {
                    matchId: route.query.id,
                },
            });
            
            if (res.code === 0) {
                data.matchInfo = res.info || {};
            }
        };

        watchEffect(() => {
            if (route.query.id) {
                getMatchFn();
            }
        });

        return {
            ...toRefs(data),
        };
    },
});
</script>

<style lang="scss" scoped>
.match-live-room {
    width: 100%;
    height: 100%;
    &-wrap {
        width: 100%;
        height: 462px;
        overflow: hidden;
        position: relative;
        background-color: #333;
        &-title {
            width: 100%;
            height: 70px;
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
        &-main {
            width: 100%;
            height: 100%;
        }
    }
}
</style>