<template>
    <div class="main">
        <MainHeader :height="headHeight" @on-right="isRightVisible=true"/>
        <router-view 
            class="main-content" 
            :style="{top: headHeight + 'px'}">
        </router-view>
        <van-popup 
            class="main-popup"
            v-model="isRightVisible" 
            position="right" 
            :duration="0.1">
            内容
        </van-popup>
    </div>
</template>

<script>

import MainHeader from "./MainHeader"
export default {
    name: 'Main',
    components: {
        MainHeader
    },
    data(){
        return {
            headHeight: 46,
            isRightVisible: false
        }
    }
}
</script>

<style lang="scss" scoped>
.main {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 6;
    width: 100%;
    bottom: 0;
    background-color: $bg-light;
    &-content {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
    }
    &-popup {
        width: 60%;
        height: 100%;
    }
}
</style>