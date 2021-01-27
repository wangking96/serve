<template>
    <div 
        class="lottery-tab-btn" 
        :class="{active}" 
        :style="{width: width + 'px', height: height + 'px'}">
        <div 
            class="lottery-tab-btn-middle" 
            :style="{height: height - 5 + 'px'}">
            <div 
                class="lottery-tab-btn-middle-up" 
                :style="{width: width - 2 + 'px', height: height - 7 + 'px'}">
                <img :src="active ? item.activeIcon : item.icon" alt="">
                <p>{{item.name}}</p>
            </div>
        </div>
        
    </div>
</template>

<script>
export default {
    props: {
        item: Object,
        active: {
            type: Boolean,
            default: false
        },
        width: {
            type: Number,
            default: 46
        },
        height: {
            type: Number,
            default: 60
        }
    }
}
</script>

<style lang="scss" scoped>
@keyframes scale {
    20%{
        transform: scale(.95);
    }
    50%{
        transform: scale(1);
    }
    80%{
        transform: scale(1.05);
    }
    100%{
        transform: scale(1);
    }
}
.lottery-tab-btn {
    text-align: center;
    border-radius: 10px;
    background-image: radial-gradient(at 50% 95%, #e9e9e9, #d0d0d0);
    box-shadow: 0 1px 6px rgba(0,0,0,.12);
    cursor: pointer;
    overflow: hidden;
    user-select: none;
    &-middle {
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #fff;
        &-up {
            border-radius: 8px;
            background-image: linear-gradient(#fff, #f6f6f6);
            padding: 5px 8px;
            overflow: hidden;
            img {
                width: 22px;
            }
            p {
                font-size: 14px;
                word-wrap: break-word;
                word-break: break-all;
                color: #999;
            }
        }
    }
    &.active {
        color: #fff;
        background-image: radial-gradient(at 50% 95%, #f44f50, #ca1c0c);
        box-shadow: 0 1px 6px rgba(245, 48, 47, .5);
        animation: scale 0.5s;
        .lottery-tab-btn-middle {
            background-image: radial-gradient(circle at 50% 100%, #ffb5a4, #fc7345, #ffefa6);
            &-up {
                background-image: linear-gradient(#ffac3d, #ea282c);
                p {
                    color: #fff;
                }
            }
        }
    }
}
</style>