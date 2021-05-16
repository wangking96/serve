<template>
   <div class="anchor-info">
       <div class="anchor-info-contract">
            <div class="anchor-info-contract-item" v-for="cItem in contract" :key="cItem.id">
                <div class="anchor-info-contract-item-left">
                    <div class="icon">
                        <img src="../../assets/images/live/QQ.png" alt="" v-if="cItem.type == 1"/>
                        <img src="../../assets/images/live/WeChat.png" alt="" v-else />
                    </div>
                    <div class="contract">
                        <p class="type">主播{{cItem.type == 1 ? 'QQ' : '微信'}}</p>
                        <p class="code">{{cItem.contract}}</p>
                    </div>
                </div>
                <div class="anchor-info-contract-item-right">复制</div>
            </div>
       </div>
    </div>
</template>

<script>
import { defineComponent} from "vue";
export default defineComponent({
    props: {
        contract: {
            type: Array,
            default: []
        }
    },
    setup() {
        return {

        }
    },
})
</script>

<style lang="scss" scoped>
.anchor-info {
    &-contract {
        padding: 20px;
        box-sizing: border-box;
        &-item {
            padding: 30px;
            box-sizing: border-box;
            border-radius: 8px;
            background-color: #fff;
            @include flexBetween();
            &-left {
                display: flex;
                .icon {
                    margin-right: 24px;
                    img {
                        width: 60px;
                        display: block;
                        object-fit: cover;
                    }
                }
                .contract {
                    .type {
                        @include font($size: 26px, $color: #2B2626);
                    }
                    .code {
                        margin-top: 24px;
                        @include font($size: 34px, $color: #FF5116);
                    }
                }
            }
            &-right {
                width: 140px;
                height: 54px;
                line-height: 54px;
                border-radius: 54px;
                letter-spacing: 4px;
                @include font($size: 28px, $color: #fff, $center: center);
                background: linear-gradient(to right, #ff6d22, #ff6820);
            }
        }
    }
}
</style>
