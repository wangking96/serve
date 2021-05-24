<template>
    <div class="layout" :style="'height: ' + screenHeight + 'px;'">
        <Navbar
            :type="type"
            :title="title"
            :showBack="showBack"
            v-if="navbar"
        />

        <div class="layout-main">
            <slot />
        </div>

        <Tabbar v-if="tabbar" />
    </div>
</template>

<script>
import { defineComponent, nextTick, onMounted, reactive, toRefs } from 'vue';
import Tabbar from './Tabbar.vue';
import Navbar from './Navbar.vue';
import { debounce } from '../common/tools';
export default defineComponent({
    components: {
        Navbar,
        Tabbar,
    },
    props: {
        type: {
            type: String,
            default: 'default',
        },
        title: {
            type: String,
            default: '',
        },
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
            nextTick(() => {
                window.onresize = debounce(() => {
                    data.screenHeight =
                        window.innerHeight || document.body.clientHeight;
                });
            });
        });
        return {
            ...toRefs(data),
        };
    },
});
</script>

<style lang="scss" scoped>
.layout {
    width: 100vw;
    overflow: hidden;
    @include flexDirectionColumn();
    &-main {
        flex: 1;
        width: 100%;
        height: calc(100% - 196px);
        overflow-x: hidden;
        overflow-y: auto;
        box-sizing: border-box;
    }
}
</style>
