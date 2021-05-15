<template>
    <div class="layout" :style="'height: ' + screenHeight + 'px;'">
        <Navbar :showBack="showBack" v-if="navbar" />

        <div class="layout-main">
            <slot />
        </div>

        <Tabbar v-if="tabbar" />
    </div>
</template>

<script>
import { defineComponent, onMounted, reactive, toRefs } from 'vue';
import Tabbar from './Tabbar.vue';
import Navbar from './Navbar.vue';
import { debounce } from '../common/utils';
export default defineComponent({
    components: {
        Navbar,
        Tabbar,
    },
    props: {
        navbar: {
            type: Boolean,
            default: false,
        },
        tabbar: {
            type: Boolean,
            default: false,
        },
        showBack: {
            type: Boolean,
            default: false,
        },
    },
    setup(props) {
        const data = reactive({
            screenHeight: window.innerHeight || document.body.clientHeight,
        });
        onMounted(() => {
            window.onresize = debounce(() => {
                data.screenHeight = document.documentElement.clientHeight;
            })
        })
        return {
            ...toRefs(data),
        };
    },
});
</script>

<style lang="scss" scoped>
.layout {
    width: 100vw;
    @include flexDirectionColumn();
    &-main {
        flex: 1;
        width: 100%;
        height: calc(100vh - 180px);
        overflow-x: hidden;
        overflow-y: auto;
    }
}
</style>
