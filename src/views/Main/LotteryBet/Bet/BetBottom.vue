<template>
    <div class="bet-bottom van-hairline--top" :style="{height: height + 'px'}">
        <div class="bet-bottom-multiple" :style="{height: height/2 + 'px'}">
            <div class="bet-bottom-multiple-btnbox">
                <div>
                    <span class="bet-bottom-multiple-btnbox-reduce"></span>
                    <input type="text" value="1">
                    <span class="bet-bottom-multiple-btnbox-add">
                        <strong></strong>
                    </span>
                </div>
                <span class="bet-bottom-multiple-btnbox-unit">Cấp số nhân</span>
            </div>
            <div class="bet-bottom-multiple-number">
                <span>Tỷ lệ cược：</span>
                <span>1 ăn 9</span>
            </div>
        </div>
        <div class="bet-bottom-betting" :style="{height: height/2 + 'px'}">
            <div class="bet-bottom-betting-cart">
                <svg-icon icon-class="cart"></svg-icon>
                <div>
                    <p class="bet-bottom-betting-cart-number">Đã chọn<strong>0</strong>Cược</p>
                    <p class="bet-bottom-betting-cart-coin">100,000,000.00 Đ</p>
                </div>
            </div>
            <div class="bet-bottom-betting-submite">Cược Ngay</div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        height: {
            type: Number,
            default: 88
        }
    }
}
</script>

<style lang="scss" scoped>
.bet-bottom { 
    position: absolute;
    left: 0;
    bottom: 0;
    color: #333;
    background-color: #fff;

    &-multiple {
        display: flex;
        padding: 0 10px;
        align-items: center;
        justify-content: space-between;

        &-btnbox {
            display: flex;
            align-items: center;
            
            & > div {
                display: flex;
                margin-right: 10px;
                border-radius: 6px;
                align-items: center;
                border: 1px solid #f4f4f4;
            }
            & > span {
                color: $theme-color;
            }

            &-reduce, &-add {
                width: 28px;
                height: 28px;
                display: block;
                position: relative;
                background-color: #f8f8f8;
                &::after {
                    width: 50%;
                    height: 2px;
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    background-color: #979797;
                    transform: translate(-50%, -50%);
                }
            }
            &-add::before {
                width: 50%;
                height: 2px;
                top: 50%;
                left: 50%;
                content: '';
                position: absolute;
                border-radius: 6px;
                background-color: #979797;
                transform: translate(-50%, -50%) rotate(90deg);
            }
            
            input {
                width: 40px;
                height: 28px;
                border: 0;
                padding: 0;
                text-align: center;
                background-color: #fff;
            }
        }

        
        &-number {
            span:last-child {
                color: $theme-color;
            }
        }
    }

    &-betting {
        display: flex;
        align-items: center;
        
        &-cart{
            flex: 1;
            display: flex;
            align-items: center;
            height: 100%;
            border-top: 1px solid rgba(189, 189, 189, .2);;
            .svg-icon {
                width: 30px;
                height: 28px;
                margin-left: 26px;
                margin-right: 16px;
            }

            &-number strong {
                margin: 0 4px;
                color: $theme-color;
            }

            &-coin {
                color: $theme-color;
                margin-top: 4px;
            }
        }

        &-submite {
            width: 126px;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            background-image: $bg-image-yellow-red;
        }
    }

}
</style>