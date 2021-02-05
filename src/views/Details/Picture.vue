<template>
    <div class="picture">
        <div class="picture-title">照片展示</div>
        <div class="btn">
            <div class="prev-btn" @click="prevMissFn">上一篇：</div>
            <div class="next-btn" @click="nextMissFn">下一篇：</div>
        </div>

        <div class="picture-list" v-if="info.miss_img">
            <img v-lazy="$baseImg + item" v-for="item in info.miss_img" :key="item">
        </div>

        <div class="no-data" v-else>暂无数据</div>

        <div class="btn">
            <div class="prev-btn" @click="prevMissFn">上一篇：</div>
            <div class="next-btn" @click="nextMissFn">下一篇：</div>
        </div>
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
    },
    methods: {
        prevMissFn(){
            if(!this.info.pre) {
                this.$message.error('已经是第一篇了！')
            }
            this.info.pre && this.$router.push({
                path: '/details',
                query: {
                    id: this.info.pre 
                }
            })
        },
        nextMissFn(){
            if(!this.info.next) {
                this.$message.error('已经是最后一篇了！')
            }
            this.info.next && this.$router.push({
                path: '/details',
                query: {
                    id: this.info.next
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.picture {
    .btn {
        display: flex;
        margin-top: 50px;
        margin-bottom: 36px;
        justify-content: space-between;
        div {
            cursor: pointer;
            &:hover {
                color: #FF9600;
            }
        }
    }
    &-title {
        font-size: 18px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        margin: 20px auto;
        width: 150px;
        height: 36px;
        line-height: 36px;
        text-align: center;
        border: 1px solid #FFF;
    }
    &-list {
        img {
            display: block;
            max-width: 800px;
            margin: 50px auto;
        }
    }
}
</style>