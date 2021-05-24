<template>
    <router-view />
</template>

<script>
import { defineComponent, onMounted } from 'vue';
import { useStore } from 'vuex';
import api from './api/api';
import Request from './common/request';
export default defineComponent({
    setup() {
        const store = useStore();
        const configFn = async () => {
            const res = await Request({
                params: {
                    service: api.config
                }
            });
            if(res.code === 0 && res.info.length > 0) {
                store.commit('SET_CONFIG', res.info[0])
            }
        }
        onMounted(() => {
            configFn();
        })
    },
});
</script>

<style lang="scss">
#app {
    font-family: '微软雅黑', Avenir, Helvetica, Arial, sans-serif;
}
.ovh {
    @include textOverflow();
}
.my-toast {
    line-height: 50px !important;
    padding: 20px 24px !important;
}
.my-loading {
    width: 200px !important;
    line-height: 52px !important;
    max-width: auto !important;
    padding: 16px !important;
}
</style>
