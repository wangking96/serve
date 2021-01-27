<template>
    <div class="mine">
        <div class="mine-bg"></div>
        <div class="mine-content">
            <div class="mine-content-user">
                <div class="mine-content-user-avatar">
                    <img src="ww" alt="">
                </div>
                <div class="mine-content-user-info">
                    <p class="mine-content-user-name">
                        <span>best01</span>
                        <img src="https://static.ustest01.com/ac/28/afb923a431573110cee8108630e3.gif" alt="">
                    </p>
                    <p class="mine-content-user-level-experience">
                        <span>普通</span>
                        <van-progress pivot-text="" :percentage="50" />
                        <span>1级</span>
                    </p>
                    <p class="experience"></p>
                </div>
            </div>
            <div class="mine-content-money">
                <van-grid :border="true" :column-num="3">
                    <van-grid-item v-for="(item, i) in moneyCenterArr" :key="i">
                        <label v-if="item.icon">0.00</label>  
                        <p :class="item.icon ? 'wallet' : 'recycle'">
                            <template v-if="item.icon">
                                <span>{{ item.title }}</span>
                                <van-icon :name="item.icon" size="16" />
                            </template>
                            <van-button
                                v-else
                                plain
                                size="small"
                                :disabled="true"
                            >
                                {{ item.title }}
                            </van-button>
                        </p>  
                    </van-grid-item>
                </van-grid>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Mine',
    data(){
        return {
            moneyCenterArr: [
                { title: '中心钱包', icon: '/images/refresh.png' },
                { title: '锁定钱包', icon: '/images/refresh.png' },
                { title: '一键回收', icon: '' }
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
.mine {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    width: 100%;
    bottom: 50px;
    &-bg{
        width: 100%;
        height: 145px;
        background-size: cover;
        background-repeat: no-repeat;
        background-image: url('/images/mine-bg.png');
    }
    &-content{
        width: 100%;
        padding: 0 10px;
        top: 46px;
        position: absolute;
        &-user{
            color: #fff;
            display: flex;
            p{
                display: flex;
            }
            &-avatar{
                padding-left: 34px;
                img{
                    width: 52px;
                    height: 52px;
                    border-radius: 50%;
                }
            }
            &-info{
                margin-left: 10px;
                
            }
            &-name{
                align-items: center;
                span{
                    font-size: 14px;
                }
                img{
                    height: 30px;
                }
            }
        }

        &-money{
            margin: 12px 0;
            overflow: hidden;
            border-radius: 6px;
            box-shadow: 0px 1px 6px 0px rgba(113, 113, 113, 0.44);
            .wallet{
                display: flex;
                align-items: center;
                i{
                    margin-left: 4px;
                }
            }
            .recycle{
                border: 1px solid #6392E8;
            }
        }
    }
}
</style>