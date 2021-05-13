<template>
    <div>
        <div class="mask" v-if="visibleMask"></div>
        <transition name="bounce">
            <div class="modal" v-if="visible" :style="`width: ${width}px;top: ${top}%`">
                <div class="modal-main">
                    <div class="modal-title" :class="titleClass" v-if="title">
                        {{ title }}
                    </div>
                    <div class="modal-close" v-if="showClose" @click="closeFn">
                        <i></i>
                    </div>
                    <slot />
                </div>
            </div>
        </transition>
    </div>
</template>

<script lang="ts">
import { ref, Ref, defineComponent, onUpdated } from 'vue';
export default defineComponent({
    props: {
        top: Number,
        width: Number,
        maskClosable: {
            type: Boolean,
            default: true,
        },
        visible: {
            type: Boolean,
            default: false,
        },
        showClose: {
            type: Boolean,
            default: true,
        },
        title: {
            type: String,
            default: '',
        },
        titleClass: {
            type: String,
            default: '',
        },
    },
    setup(props, { emit }) {
        let mask: Element | null = null;
        let modal: Element | null = null;
        let visibleMask: Ref<boolean> = ref(false);
        const closeFn = () => {
            emit('closed');
        };
        onUpdated(() => {
            mask = document.querySelector('.mask');
            modal = document.querySelector('.modal');
            if (mask && props.maskClosable) {
                mask.addEventListener('click', () => {
                    closeFn();
                });
            }
            if (modal && props.maskClosable) {
                modal.addEventListener('click', (e) => {
                    e.stopPropagation();
                });
            }
            if (props.visible) {
                visibleMask.value = props.visible;
            } else {
                setTimeout(() => {
                    visibleMask.value = props.visible;
                }, 500);
            }
        });

        return {
            visibleMask,
            closeFn,
        };
    },
});
</script>

<style scoped lang="scss">
.bounce-enter-active {
    animation: bounce 0.5s;
}
.bounce-leave-active {
    animation: bounce 0.5s reverse;
}
@keyframes bounce {
    0% {
        opacity: 0;
        transform: translate(-50%, -50%) scale(0);
    }
    // 50% {
    //     transform: translate(-50%, -50%) scale(1.2);
    // }
    100% {
        opacity: 10;
        transform: translate(-50%, -50%) scale(1);
    }
}
.mask {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9;
    margin: auto;
    position: fixed;
    background-color: rgba(0, 0, 0, 0.6);
}
.modal {
    min-width: 16vw;
    min-height: 20vh;
    top: 30%;
    left: 50%;
    z-index: 10;
    position: fixed;
    overflow: hidden;
    border-radius: 6px;
    background-color: #fff;
    transform: translate(-50%, -50%);
    &-main {
        width: 100%;
        height: 100%;
        padding: 8px;
        position: relative;
    }
    &-title {
        text-align: center;
    }
    &-close {
        width: 20px;
        height: 20px;
        top: 6px;
        right: 6px;
        position: absolute;
        display: flex;
        justify-content: flex-end;
        cursor: pointer;
        &:hover i {
            transition: all 1s;
            transform: rotate(360deg);
        }
        i {
            width: 14px;
            height: 14px;
            display: block;
            background-size: cover;
            background-repeat: no-repeat;
            background-image: url('//aidj.zbitcloud.com/aigaming/PC/ai-newmyback/close.png');
        }
    }
}
</style>