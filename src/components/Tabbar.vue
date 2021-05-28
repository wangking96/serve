<template>
    <div class="tabbar">
        <div
            class="tabbar-item"
            v-for="tab in tabbar"
            :key="tab.id"
            :class="{ active: curPath === tab.path }"
            @click="changeRouteFn(tab)"
        >
            <AppDownload v-if="tab.id === 3">
                <img
                    :src="curPath === tab.path ? tab.selectIcon : tab.icon"
                    alt=""
                />
                <div>{{ tab.title }}</div>
            </AppDownload>
            <template v-else>
                <img
                    :src="curPath === tab.path ? tab.selectIcon : tab.icon"
                    alt=""
                />
                <div>{{ tab.title }}</div>
            </template>
        </div>
    </div>
</template>

<script>
import { defineComponent, reactive, toRefs, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import AppDownload from '../components/AppDownload.vue';

const plat = import.meta.env.MODE;
const tabbar = [
    {
        id: 1,
        path: '/',
        title: '首页',
        icon: '/images/tabbar/home.png',
        selectIcon: '/images/tabbar/home-select.png',
    }, {
        id: 2,
        path: '/match',
        title: '赛事',
        icon: '/images/tabbar/match.png',
        selectIcon: '/images/tabbar/match-select.png',
    }, {
        id: 3,
        path: '',
        title: 'APP',
        icon: `/images/platform/${plat}/logo.png`,
        selectIcon: `/images/platform/${plat}/logo.png`,
    }, {
        id: 4,
        path: '/mine',
        title: '我的',
        icon: '/images/tabbar/mine.png',
        selectIcon: '/images/tabbar/mine-select.png',
    },
];
export default defineComponent({
    components: {
        AppDownload
    },
    setup() {
        const route = useRoute();
        const router = useRouter();
        const data = reactive({
            tabbar,
            curPath: null,
        });

        const changeRouteFn = (tab) => {
            router.push(tab.path);
        };

        watch(
            () => route.path,
            (path) => {
                data.curPath = path;
            },
            {
                immediate: true,
            }
        );

        return {
            ...toRefs(data),
            changeRouteFn,
        };
    },
});
</script>

<style lang="scss" scoped>
.tabbar {
    width: 100%;
    height: 100px;
    background-color: #fff;
    box-sizing: content-box;
    @include flexAlignItemsCenter();
    // @include position($position: fixed, $left: 0, $bottom: 0, $zIndex: 9);
    &-item {
        flex: 1;
        line-height: 1;
        img {
            width: 48px;
            height: 48px;
            display: block;
            object-fit: cover;
            margin: 8px auto;
            transition: all 0.3s;
        }
        div {
            @include font($size: 24px, $center: center, $color: #646566);
        }
        a {
            display: block;
            text-decoration: none;
        }
        &.active {
            img {
                animation: scale 0.3s;
            }
            div {
                color: #ff881a;
            }
        }
    }
}
@keyframes scale {
    0% {
        transform: scale(0.8);
    }
    80% {
        transform: scale(1.2);
    }
    100% {
        transform: scale(1);
    }
}
</style>
