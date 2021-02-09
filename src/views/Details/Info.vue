<template>
    <div class="info-wrap">
        <div class="details-info">
            <div class="details-info-leftbox">
                <div class="details-info-title">
                    <div class="details-info-title-box">
                        <div class="details-info-title-box-top"></div>
                        <div class="details-info-title-box-bottom"></div>
                        <div class="details-info-title-text">{{info.post_title}}</div>
                    </div>
                    <div>{{info.categoryname}}{{info.categoryname && ' >> '}}{{info.provincename}} {{info.provincename && '>>' }} {{info.cityname}}  </div>
                    <div>【上传日期】：{{info.update_time}}前发布</div>
                    <template>
                        <div>【小姐数量】：{{info.miss_quantity}} </div>
                        <div>【小姐年龄】：{{info.miss_age}}</div>
                        <div>【小姐质量】：{{info.miss_quality}}</div>
                        <div>【小姐外貌】：{{info.miss_appearance}}</div>
                        <div>【服务项目】：{{info.miss_services}}</div>
                        <div>【小姐价格】：{{info.miss_price}}</div>
                        <div>【营业时间】：{{info.miss_business_hours}}</div>
                        <div>【环境设备】：{{info.miss_environmental_unit}}</div>
                        <div>【安全评估】：{{info.miss_safety_assessment}}</div>
                        <div>【详细地址信息】：{{info.miss_address}}</div>
                        <div>【联系方式】：
                            <!-- <span class="coin">花费10金币查看</span> |  -->
                            <span class="vip">{{user.ismember === 1  ? info.post_vip : '成为VIP查看全站小姐信息(升级VIP)' }}</span>
                        </div>
                    </template>
                </div>
            </div>
            <div
                v-if="info.thumbnail"
                class="details-info-rightbox" @click="scrollPicture">
                <img :src="$baseImg + info.thumbnail" alt="">
            </div>
        </div>

        <div class="overview" v-if="info.data_source === 1">
            <div>【 综合评价 】：</div>
            <div v-html="info.post_content"></div>
        </div>
        <div class="tips">管理提示：本站所有信息均为网友自行投稿分享，请自行判断真伪，谨防被骗！</div>
    </div>
</template>

<script>
export default {
    props: {
        info: {
            type: Object,
            default: function () {
                return {}
            }
        },
        user: {
            type: Object,
            default: function () {
                return {}
            }
        }
    },
    methods: {
        scrollPicture(){
            var el = document.querySelector('.picture')
            el && window.scrollTo({ 
                top: el.offsetTop - 160, 
                behavior: "smooth" 
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.details-info {
    margin-top: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &-leftbox {
        & div:not(:first-child) {
            font-size: 15px;
            padding: 10px 0;
        }
    }
    &-title {
        &-box {
            position: relative;
            width: 160px;
            height: 130px;
            margin-bottom: 10px;
            border: 2px solid #811657;
            border-right: 0;
            &-top, &-bottom {
                right: 0;
                width: 2px;
                height: 34px;
                position: absolute;
                background-color: #811657;
            }
            &-top {
                top: 0;
            }
            &-bottom {
                bottom: 0;
                padding: 0 !important;
            }
        }
        &-text {
            min-width: 1000px;
            height: 32px;
            font-size: 32px !important;
            font-family: "Microsoft YaHei";
            font-weight: 400;
            color: #FFCC1B;
            letter-spacing: 4px;
            padding: 16px 0;
            top: 50%;
            left: 72px;
            position: absolute;
            word-break: keep-all;
            transform: translateY(-50%);
        }
        .coin {
            color: #E91313;
            margin-right: 10px;
        }
        .vip {
            color: #FFD800;
            margin-left: 10px;
        }
        .coin, .vip{
            cursor: pointer;
            letter-spacing: 4px;
        }
    }
    &-rightbox {
        width: 285px;
        height: 350px;
        cursor: pointer;
        border-radius: 6px;
        overflow: hidden;
        // border: 2px solid #D03292;
        box-shadow: 0px 3px 0px 0px rgba(0, 0, 0, 0.35);
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
}
.overview {
    min-height: 210px;
    line-height: 24px;
    margin-top: 10px;
    padding: 10px;
    font-size: 15px;
    box-sizing: border-box;
    background: rgba(0, 0, 0, .5);
    & div:last-child {
        padding-left: 12px;
    }
}
.tips {
    font-size: 14px;
    letter-spacing: 1px;
    margin-top: 16px;
    margin-bottom: 100px;
}

</style>