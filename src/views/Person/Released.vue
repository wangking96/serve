<template>
    <div class="released">
        <div class="released-title">
            <img src="/images/release.png" alt="">
            我的发布
        </div>
        
        <Loading v-if="httpServe" />

        <div class="released-content" v-else>
            <template v-if="releaseList.length > 0">
                <div 
                    class="released-content-item" 
                    v-for="item in releaseList" 
                    :key="item.id"
                    @click="jumpDetails(item)">
                    <p>在
                        <span class="red_text">{{item.categroryname}}</span>发布
                        <span class="orgnge_text" :title="item.post_title">{{item.post_title}}</span>
                        {{item.comment_count > 0 ? '回复(' + item.comment_count + ')' : ''}}
                    </p>
                    <div>{{item.create_time}}</div>
                </div>

                <div class="pagination" v-if="pagination.totalpage > 1">
                    <el-pagination
                        background
                        :pager-count="11"
                        layout="prev, pager, next"
                        :page-count="parseInt(pagination.totalpage)"
                        :current-page="parseInt(pagination.page)"
                        @current-change="chuangePageFn">
                    </el-pagination>
                </div>
            </template>
            
            <div class="nodata" v-else>
                <p>暂无发布！</p>
                <p>
                    赶紧来发布信息吧，让狼友一起分享好货 ~
                    <span class="orgnge_text">点击发布信息</span>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import Loading from '@/components/Loading'
import Portal from '@/api/portal.js'
export default {
    components: {
        Loading
    },
    data() {
        return {
            httpServe: true,
            releaseList: [],
            params: {
                page: 0,
                limit: 10,
                category_id: 0
            },
            pagination: {
                page: 0,
                totalpage: 0
            }
        }
    },
    created(){
        this.getReleaseData()
    },
    methods: {
        getReleaseData() {  
            this.httpServe = true
            Portal.getArticles(this.params).then(res => {
                if (res.code === 1) {
                    this.releaseList = res.data.data.list
                    this.pagination = res.data.data.param
                }
                else this.$message.error(res.msg)
            })
            .finally(() => {
                this.httpServe = false
            })
        },
        jumpDetails(item) {
            this.$router.push({
                path: '/details',
                query: {
                    id: item.id
                }
            })
        },
        chuangePageFn(val){
            this.params.page = val
            this.getReleaseData()
        }
    }
}
</script>

<style lang="scss" scoped>
.released {
    padding: 28px;
    min-height: 620px;
    &-title {
        display: flex;
        align-items: center;
        font-weight: 600;
        color: #DF2195;
        font-size: 20px;
        letter-spacing: 2px;
        img {
            margin-right: 10px;
        }
    }
    &-content {
        &-item {
            overflow: hidden;
            margin-top: 26px;
            padding-bottom: 10px;
            border-bottom: 1px dashed rgba(255, 255, 255, .5);
            p { 
                float: left;
                width: 86%;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
            div { float: right; }
            span { 
                cursor: pointer;
                margin-right: 4px;
            }
        }
    }
    .nodata {
        margin-top: 160px;
        text-align: center;
        p {
            font-size: 16px;
            font-weight: bold;
            color: #FFFFFF;
            line-height: 32px;
            letter-spacing: 1px;
            &:first-child {
                font-size: 22px;
                margin-bottom: 20px;
            }
            span {
                cursor: pointer;
            }
        }
    }
     .red_text {
        color: #DF2195;
    }
    .orgnge_text {
        color: #FF9600;
    }
    .pagination {
        text-align: center;
        margin-top: 30px;
    }
}
</style>
<style lang="scss">
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
</style>