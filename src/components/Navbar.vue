<template>
    <div class="navbar">
        <div class="navbar-item" v-for="nav in navbar" :key="nav.id">
            {{ nav.title }}
        </div>
    </div>
</template>
<script lang="ts">
import { ref, Ref, defineComponent } from 'vue';

interface navItem {
    id: number;
    title: string;
}
export default defineComponent({
    setup() {
        const navbar: Ref<navItem[]> = ref([
            { id: 1, title: '百度' },
            { id: 2, title: '阿里巴巴' },
            { id: 3, title: '腾讯' },
            { id: 4, title: '字节跳动' },
            { id: 5, title: '京东' },
        ]);

        return {
            navbar,
        };
    },
});
</script>
<style lang="scss" scoped>
.navbar {
    overflow: hidden;
    &-item {
        float: left;
        min-width: 120px;
        text-align: center;
        cursor: pointer;
        position: relative;
        margin-left: 20px;
        color: #fff;
        &::after {
            content: '';
            width: 0%;
            height: 0;
            position: absolute;
            left: 50%;
            bottom: 0;
            transition: all 0.6s;
            background: linear-gradient(
                to top,
                rgba(126, 122, 123, 0.5),
                #03e9f4
            );
        }
        &:hover::after {
            left: 0;
            width: 100%;
            height: 100%;
        }
    }
}
</style>