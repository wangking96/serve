<template>
    <Layout :navbar="true" :showBack="true">
        <div class="live-room">
            <div class="live-room-player">
                <div class="live-room-player-title">
                    <div class="goback" @click="gobackFn">
                        <img
                            src="../../assets/images/public/left-arrow.png"
                            alt=""
                        />
                    </div>
                    <div>绝对巅峰</div>
                </div>
            </div>

            <div class="live-room-tabs">
                <div class="tabs">
                    <div class="tabs-nav" ref="tabsNav">
                        <div
                            class="tabs-nav-item"
                            v-for="(item, index) in tabs"
                            :key="item.id"
                            @click="tabsClickFn(item, index)"
                        >
                            {{ item.name }}
                            <img :src="item.icon" alt="" />
                        </div>
                        <div
                            class="tabs-nav-line"
                            :style="`width: ${curTabs.lineWidth}px;left: ${curTabs.left}px`"
                        ></div>
                    </div>
                    <div class="tabs-panel"></div>
                </div>
            </div>
        </div>
    </Layout>
</template>

<script>
import {
    defineComponent,
    nextTick,
    onMounted,
    reactive,
    ref,
    toRefs,
} from 'vue';
import { useRouter } from 'vue-router';
import Layout from '../../components/Layout.vue';
export default defineComponent({
    components: {
        Layout,
    },
    setup() {
        const router = useRouter();
        let tabsNav = ref(null);
        const data = reactive({
            tabs: [
                { id: 1, name: '聊天' },
                { id: 2, name: '联系主播' },
                { id: 3, name: '直播' },
            ],
            curTabs: {
                id: 1,
                name: '',
                left: 0,
                lineWidth: 0,
            },
        });
        
        onMounted(() => {
            nextTick(() => {
                initTabsFn();
            });
        });

        const gobackFn = () => {
            router.go(-1);
        };

        const initTabsFn = () => {
            if (!data.tabs || data.tabs.length === 0) return;
            let tabsChilds = tabsNav.value.children;
            let left = 0
            for (let i = 0; i < data.tabs.length; i++) {
                data.tabs[i].lineWidth = tabsChilds[i].offsetWidth
                let marginLeft = parseInt(getComputedStyle(tabsChilds[i]).marginLeft)

                data.tabs[i].left = left + marginLeft
                left += tabsChilds[i].offsetWidth + marginLeft
                if(data.curTabs.tabId === data.tabs[i].tabId) data.curTabs = data.tabs[i]
            }
            
            console.log(data.tabs);
        };
        const tabsClickFn = () => {
            
        }
        return {
            tabsNav,
            ...toRefs(data),
            gobackFn,
            tabsClickFn
        };
    },
});
</script>

<style lang="scss" scoped>
.live-room {
    width: 100%;
    height: 100%;
    &-player {
        width: 100%;
        height: 462px;
        position: relative;
        background-color: #333;
        &-title {
            height: 70px;
            opacity: 0.8;
            position: relative;
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
    &-tabs {
        width: 100%;
        height: calc(100% - 462px);
    }
    .tabs-nav {
        height: 90px;
        position: relative;
        @include flexAlignItemsCenter();
        &-item {
            flex: 1;
            height: 100%;
            @include flexCenter();
        }
        &-line {
            height: 4px;
            background-color: #FF5116 ;
            @include position($position: absolute, $left: 0, $bottom: 0);
        }
    }
}
</style>
