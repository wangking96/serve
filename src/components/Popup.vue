<template>
    <transition name="van-fade">
        <div 
            v-show="isVisible"
            @click.stop
            class="popup" 
            :style="{top: top+ 'px', right: right + 'px'}">
            <div class="popup-mask"></div>
            <slot></slot>
        </div>
    </transition>
</template>

<script>
export default {
    props: {
        top: {
            type: Number,
            default: 20
        },
        right: {
            type: Number,
            default: 20
        },
        isVisible: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style lang="scss" scoped>
.popup {
    position: absolute;
    z-index: 1;
    background-color: $white;
    box-shadow: $box-shadow-popup;
    border-radius: 10px;
    padding: 16px;
    &:before {
        position: absolute;
        top: -6px;
        right: 30px;
        z-index: 0;
        transform: rotate(45deg);
        content: "";
        display: block;
        width: 12px;
        height: 12px;
        background-color: $white;
        box-shadow: $box-shadow-popup;
    }
    &-mask {
        position: absolute;
        top: 0;
        right: 20px;
        z-index: 1;
        width: 100px;
        height: 15px;
        background-color: $white;
    }
}
</style>