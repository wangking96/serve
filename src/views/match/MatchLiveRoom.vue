<template>
    <Layout :navbar="true" :showBack="true">
        <div class="match-live-broadcast">
            <PlayerArea
                class="match-live-broadcast-play"
                type="match"
                :matchId="matchId"
            >
                <Player />
            </PlayerArea>

            <div class="match-live-broadcast-tab"></div>
        </div>
    </Layout>
</template>

<script>
import { defineComponent, reactive, toRefs, watchEffect } from 'vue';
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
        PlayerArea,
    },
    setup() {
        const route = useRoute();
        const store = useStore();
        const data = reactive({
            matchId: 1
        });

        const getMatchFn = async () => {
            const res = await Request({
                type: 'match',
                url: api.getMatch(parseInt(route.query.matchId)) || 1,
                params: {
                    matchId: route.query.id,
                },
            });

            if (res.code === 0) {
                store.commit('SET_MATCHINFO', res.info || {});
            }
        };

        watchEffect(() => {
            if (route.query.id) {
                getMatchFn();
            }
            if(route.query.matchId){
                data.matchId = parseInt(route.query.matchId) || 1;
            }
        });

        return {
            ...toRefs(data),
        };
    },
});
</script>

<style lang="scss" scoped>
.match-live-broadcast {
    width: 100%;
    height: 100%;
    &-play {
        height: 462px;
    }
    &-tab {
        width: 100%;
        height: calc(100% - 462px);
    }
}
</style>