<template>
    <div class="betinput">
        <div class="betinput-tips" :style="{height: tipsHeight + 'px'}">
            <div class="betinput-tips-icon">
                <div class="circle">
                    <div class="rect"></div>
                    <div class="dot"></div>
                </div>
            </div>
            <div class="betinput-tips-text">
                Giữa mỗi số cược cần phân cách bởi khoảng trắng <br/>
                [ ] dấu phẩy [ , ] dấu chấm phẩy [ ; ] hoặc dấu [ | ]
            </div>
        </div>
        <div class="betinput-example" :style="{top: tipsHeight + 10 + 'px'}">
            <textarea 
                v-model="content" 
                @input="handleInput"
                placeholder="Giải thích:
1. Có thể sử dụng các ký hiệu đơn giản để ngăn cách các số cược như:
nhập số: 12345 23456 88789">
            </textarea>
        </div>
    </div>
</template>

<script>
import { replaceSeperator } from '@/utils/common'
export default {
    data() {
        return {
            tipsHeight: 56,
            content: ''
        }
    },
    methods: {
        handleInput(e) {
            const str = replaceSeperator(this.content, ',')
            console.log(str)
            this.content = str
        }
    }
}
</script>

<style lang="scss" scoped>
.betinput {
    width: 100%;
    height: 100%;
    position: relative;
    &-tips {
        position: absolute;
        top: 10px;
        left: 10px;
        right: 10px;
        padding: 0 14px;
        display: flex;
        align-items: center;
        background: $bg-light-red;
        border-radius: 8px 8px 0 0;
        box-shadow: $box-shadow-block;
        &-icon {
            margin-right: 14px;
            .circle {
                width: 20px;
                height: 20px;
                padding: 4px;
                border-radius: 50%;
                background-color: $font-maroon;
                .rect {
                    width: 2px;
                    height: 8px;
                    margin: 0 auto 2px;
                    background-color: #fff;
                }
                .dot {
                    width: 2px;
                    height: 2px;
                    margin: 0 auto;
                    background-color: #fff;
                }
            }
        }
        &-text {
            font-size: 12px;
            color: $font-maroon;
            line-height: 14px;
        }
    }
    &-example {
        position: absolute;
        left: 10px;
        right: 10px;
        bottom: 10px;
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
        background-color: #fff;
        box-shadow: $box-shadow-block;
        padding: 15px;
        textarea {
            width: 100%;
            height: 100%;
            border: none;
            resize: none;
            outline: none;
            line-height: 1.5;
            font-size: $font-medium;
        }
    }
}
</style>