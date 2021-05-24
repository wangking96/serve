<template>
    <div class="tabbar">
        <div 
            class="tabbar-item" 
            v-for="tab in tabbar"
            :key="tab.id"
            :class="{'active': curPath === tab.path}"
            @click="changeRouteFn(tab)"
        >   
            <img :src="curPath === tab.path ?  tab.selectIcon : tab.icon" alt="">
            <div>{{ tab.title }}</div>
        </div>
    </div>
</template>

<script>
import { defineComponent, reactive, toRefs, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import home  from '../assets/images/tabbar/home.png';
import homeSelect  from '../assets/images/tabbar/home-select.png';
import match from '../assets/images/tabbar/match.png';
import matchSelect from '../assets/images/tabbar/match-select.png';
import app from '../assets/images/platform/logo.png';
import mine from '../assets/images/tabbar/mine.png';
import mineSelect from '../assets/images/tabbar/mine-select.png';
const tabbar = [
    { id: 1, path: '/', title: '首页', icon: home, selectIcon: homeSelect },
    { id: 2, path: '/match', title: '赛事', icon: match, selectIcon: matchSelect },
    { id: 3, path: '', title: 'APP', icon: app, selectIcon: app },
    { id: 4, path: '/mine', title: '我的', icon: mine, selectIcon: mineSelect },
]
export default defineComponent({
    setup() {
        const route = useRoute();
        const router = useRouter();
        const data = reactive({
            tabbar,
            curPath: null
        })

        const changeRouteFn = (tab) => {
            router.push(tab.path)
        }

        watch(
            ()=> route.path,
            path => {
                data.curPath = path
            },
            {
                immediate: true
            }
        )

        return {
            ...toRefs(data),
            changeRouteFn
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
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
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
            transition: all .3s;
        }
        div {
            @include font($size: 24px, $center: center, $color: #646566);
        }
        &.active {
            img {
                animation: scale .3s;
            }
            div {
                color: #ff881a;
            }
        }
    }
}
@keyframes scale {
    0%{
        transform: scale(.8);
    }
    80%{
        transform: scale(1.2);
    }
    100%{
        transform: scale(1);
    }
}
</style>
