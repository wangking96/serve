<template>
    <div class="tab">
        <div class="tab-nav" ref="tabNav">
            <div
                class="tab-nav-item"
                v-for="item in tab"
                :key="item.id"
                :class="{'active': item.id === curTab.id}"
                @click="tabClickFn(item)"
            >
                {{ item.name }}
                <img :src="item.icon" alt="" />
            </div>
            <div
                class="tab-nav-line"
                :style="`width: ${curTab.lineWidth}px;left: ${curTab.left}px`"
            ></div>
        </div>
        <div
            class="tab-panel"
            :style="`transform: translateX(-${
                (curTab.id - 1) * 100
            }%);transition-duration: 0.${panelDuration}s`"
        >
            <slot />
        </div>
    </div>
</template>

<script>
import {
    defineComponent,
    reactive,
    toRefs,
    nextTick,
    onMounted,
    ref,
} from 'vue';
export default defineComponent({
    props: {
        tab: {
            type: Object,
            default: {},
        },
        active: {
            type: Number,
            default: 1
        }
    },
    setup(props, { emit }) {
        let tabNav = ref(null);
        const data = reactive({
            curTab: {
                id: 1,
                name: '',
                left: 0,
                lineWidth: 0,
            },
            panelDuration: 2,
        });
        onMounted(() => {
            nextTick(() => {
                initTabsFn();
            });
        });
        const initTabsFn = () => {
            if (!props.tab || props.tab.length === 0) return;
            let tabsChilds = tabNav.value.children;
            let left = 0;
            for (let i = 0; i < props.tab.length; i++) {
                const lineWidth = tabsChilds[i].offsetWidth;
                props.tab[i].lineWidth = lineWidth / 2;
                props.tab[i].left = left + lineWidth / 4;
                left += lineWidth;
                if (props.active === props.tab[i].id)
                    data.curTab = props.tab[i];
            }
        };
        const tabClickFn = (tab) => {
            if (data.curTab.id === tab.id) return;
            if (Math.abs(data.curTab.id - tab.id) > 1) {
                data.panelDuration = 0;
            } else {
                data.panelDuration = 2;
            }
            data.curTab = tab;
            emit('clickFn', tab);
        };
        return {
            tabNav,
            ...toRefs(data),
            tabClickFn,
        };
    },
});
</script>

<style lang="scss" scoped>
.tab {
    width: 100%;
    height: 100%;
    &-nav {
        height: 90px;
        position: relative;
        @include flexAlignItemsCenter();
        &-item {
            flex: 1;
            height: 100%;
            font-size: 26px;
            transition: all .2s;
            @include flexCenter();
            &.active {
                color: #ff5116;
                transform: scale(1.2);
            }
        }
        &-line {
            height: 4px;
            transition: all 0.2s;
            background-color: #ff5116;
            @include position($position: absolute, $left: 0, $bottom: 0);
        }
    }
    &-panel {
        width: 100%;
        height: calc(100% - 90px);
        transition: all 0.3s;
        @include flexAlignItemsCenter();
    }
}
</style>
