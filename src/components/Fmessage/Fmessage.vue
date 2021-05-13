<template>
    <div class="message" :class="'message-' + type">
        {{ message }}
    </div>
</template>

<script lang="ts">
import { defineComponent, onUnmounted, onUpdated } from 'vue';
export default defineComponent({
    props: {
        message: {
            type: String,
            default: '',
        },
        type: {
            type: String,
            default: 'info',
        },
        hide: {
            type: Function,
        },
        show: {
            type: Function,
        },
        id: Number,
        duration: {
            type: Number,
            default: 3000,
        },
    },
    setup(props) {
        let timeout: any = null
        onUpdated(() => {
            props.show && props.show(); 
        })
        onUnmounted(() => {
            clearTimeout(timeout)
        })

        timeout = setTimeout(() => {
            props.hide && props.hide(props.id);
        }, props.duration);

        return {
            timeout
        };
    },
});
</script>

<style scoped lang="scss">
.message {
    position: fixed;
    top: 0;
    left: 50%;
    z-index: 1000;
    transform: translate(-50%, -50%);
    letter-spacing: 1px;
    padding: 10px 20px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    font-size: 20px;
    font-weight: 500;
    white-space: nowrap;
    color: #fefefe;
    transition: all .3s;
    animation: side-down 0.3s;
    color: #909399;
    border: 1px solid #ebeef5;
    background-color: #edf2fc;
    &-error {
        color: #f56c6c;
        border: 1px solid;
        border-color: #fde2e2;
        background-color: #fef0f0;
    }
    &-success {
        color: #67c23a;
        border-color: #e1f3d8;
        background-color: #f0f9eb;
    }
}
</style>
