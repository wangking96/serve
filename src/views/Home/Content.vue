<template>
    <div class="content">
        <Loading v-if="httpServe" />
        <template v-else>
            <div class="search">
                <input type="text" placeholder="关键字搜索" v-model="keywordSearchFn">
            </div>

            <div class="wrap">
                <div class="breadcrumb">
                    首页
                    <i class="el-icon-arrow-right" v-if="spaceType"></i>
                    {{spaceType}}
                    <i class="el-icon-arrow-right" v-if="province"></i>
                    {{province}}
                    <i class="el-icon-arrow-right" v-if="city"></i>
                    {{city}}
                    <i class="el-icon-arrow-right" v-if="area"></i>
                    {{area}}
                </div>
                <div class="picture">
                    <template v-if="homeData.list.length > 0">
                        <div class="picture-item"
                        v-for="(item) in homeData.list"
                        :key="item.id"
                        @click.stop="jumpDetails(item)">
                        <div class="picture-person">
                            <img class="person" v-lazy="$baseImg + item.thumbnail" alt="">
                            <p>加载失败</p>
                            <img class="search-btn" src="/images/search.png" alt="">
                        </div>
                        <div class="picture-bottom">
                            <div class="title">{{ item.categoryname }}</div>
                            <div class="desc" :title="item.post_title">{{ item.post_title }}</div>
                            <div class="address">地区：{{ item.provincename + ' - ' + item.cityname }}</div>
                            <div class="social">
                                <div class="time">
                                    <img src="/images/time.png" alt="">
                                    <span>{{item.update_time}}发布</span>
                                </div>
                                <div class="browse">
                                    <img src="/images/browse.png" alt="">
                                    <span>{{item.post_hits}}浏览</span>
                                </div>
                                <div class="comment">
                                    <img src="/images/comment.png" alt="">
                                    <span>{{item.comment_count}}评论</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    </template>
                    <div v-else class="no-data">暂无数据</div>
                </div>
            </div>

            <div class="pagination" v-if="homeData.list.length > 0">
                <el-pagination
                    background
                    :pager-count="11"
                    layout="prev, pager, next"
                    :page-count="homeData.param.totalpage"
                    :current-page="parseInt(homeData.param.page)"
                    @current-change="chuangePageFn">
                </el-pagination>
            </div>
            
        </template>
    </div>
</template>

<script>
import Loading from '@/components/Loading'
import { mapGetters, mapMutations } from 'vuex'
import { getScrollTop } from '@/utils/tools'
export default {
    components: {
        Loading
    },
    props: {
        homeData: Object,
        httpServe: Boolean
    },
    data() {
        return {
            timer: null,
            keywordSearchFn: ''
        }
    },
    computed: {
        ...mapGetters(['spaceType', 'province', 'city', 'area'])
    },
    watch: {
        keywordSearchFn(k){
            if(k) {
                this.timer = setTimeout(() => {
                    this.$emit('keywordSearch', k)
                }, 1000)
            }
        }
    },
    destroyed() {
        clearTimeout(this.timer)
    },
    methods: {
        chuangePageFn(val){
            this.$emit('changePage', val)
        },
        jumpDetails(item) {
            this.set_scroll_top(getScrollTop())
            this.set_navActive({home: false, miss: false})
            this.$router.push({
                path: '/details',
                query: {
                    id: item.id
                }
            })
        },
        changeTime(t){
            return this.$moment(t).format('YYYY-MM-DD')
        },
        categoryFn(c){
            let title = ''
            this.homeData.category.forEach(t => {
                if(t.id === c) title = t.name
            })
            return title
        },
        ...mapMutations(['set_navActive', 'set_scroll_top'])
    }
}
</script>

<style lang="scss" scoped>
.search {
    margin-top: 100px;
    input {
        width: 512px;
        height: 38px;
        display: block;
        margin: 0 auto;
        outline: none;
        font-size: 16px;
        border-radius: 20px;
        border: 0;
        color: #fff;
        text-align: center;
        background-color: rgba(0,0,0,.5);
        &::placeholder {
            color: #666;
            font-style: italic;
            letter-spacing: 2px;
        }
    }
}
.breadcrumb{
    margin-top: 30px;
    font-size: 16px;
    font-family: Microsoft YaHei;
    line-height: 32px;
    letter-spacing: 2px;
}
.picture {
    overflow: hidden;
    &-item {
        width: 25%;
        float: left;
        padding: 10px;
        margin-bottom: 20px;
        box-sizing: border-box;
        &:nth-child(4n) {
            padding-right: 0;
        }
        &:nth-child(5n), &:first-child {
            padding-left: 0;
        }
        .title {
            width: 110px;
            height: 28px;
            line-height: 28px;
            margin: 12px 0 12px -10px;
            color: #B20F0F;
            cursor: pointer;
            font-weight: bold;
            padding-left: 10px;
            letter-spacing: 2px;
            background-size: cover;
            background-repeat: no-repeat;
            background-image: url('/images/type.png');
        }
        .desc, .address {
            font-size: 14px;
            font-weight: bold;
            line-height: 18px;
            cursor: pointer;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
        .desc:hover {
            color: #FF9600;
        }
        .address {
            color: #2A5EE1;
            margin: 12px 0px;
            min-height: 18px;
        }
        .social {
            display: flex;
            font-size: 14px;
            justify-content: space-between;
            div {
                display: flex;
                align-items: center;
                img {
                    margin-right: 4px;
                }
            }
        }
        .time, 
        .browse, 
        .comment {
            cursor: pointer;
        }
    }
    &-person {
        width: 100%;
        height: 350px;
        overflow: hidden;
        cursor: pointer;
        position: relative;
        box-sizing: border-box;
        background-color: #121212;
        p {
            position: absolute;
            bottom: 50px;
            left: 50%;
            transform: translateX(-50%);
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #5a5e65;
            letter-spacing: 2px;
        }
        img.person {
            width: 100%;
            height: 100%;
            opacity: .88;
            display: block;
            z-index: 99;
            position: relative;
            transition: all .2s ease-in-out;
        }
        &:hover img.person {
            transform: scale(1.2);
        }
        &:hover .search-btn {
            width: 66px;
            height: 66px;
        }
        .search-btn {
            width: 0;
            height: 0;
            overflow: hidden;
            position: absolute;
            top: 50%;
            left: 50%;
            opacity: .5;
            transition: all .2s ease-in-out;
            transform: translate(-50%, -50%);
            &:hover {
                opacity: 1;
            }
        }
        img[lazy="error"] {
            width: auto;
            height: auto;
            margin: 110px auto 0;
            &::after {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 30px;
                z-index: 22;
            }
        }
    }
    &-bottom {
        padding: 10px;
        box-sizing: border-box;
        background-color: #242425;
    }
}
.pagination {
    text-align: center;
    margin-top: 30px;
}
</style>

<style>
.pagination .el-pagination.is-background .btn-next, 
.pagination .el-pagination.is-background .btn-prev, 
.pagination .el-pagination.is-background .el-pager li {
    min-width: 40px;
    height: 24px;
    line-height: 24px;
    border-radius: 2px;
    color: #fff;
    border: 1px solid #fff;
    background-color: transparent;
}
.pagination .el-pager .more::before {
    line-height: 24px;
}
.pagination .el-pagination.is-background .el-pager li:not(.disabled).active,
.pagination .el-pagination.is-background .el-pager li:not(.disabled):hover,
.pagination .el-pagination.is-background .btn-prev:hover,
.pagination .el-pagination.is-background .btn-next:hover {
    color: #fff;
    background-color: #f3b748;
}
#tinymce,
.mce-content-body[data-mce-placeholder]:not(.mce-visualblocks)::before{
    color: #fff !important;
}
</style>