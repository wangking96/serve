<template>
    <div class="home">
        <Nav />
        
        <FirstScreen />
            
        <div class="container">
            <Carousel />
            <div class="main">
                <div class="place">
                    <div class="place-title">各地小姐</div>
                    <div class="place-line"></div>
                    <div class="place-title">MASSAGE</div>
                </div>
                
                    <Tabs :tabs="homeData.category" @tabsClickFn="tabsClickFn" />

                    <Area 
                        :homeData="homeData"
                        @areaClick="areaClickFn" 
                        @cityClick="cityClickFn"
                        @provinceClick="provinceClickFn"  />

                <Content 
                    :homeData="homeData"
                    :httpServe="httpServe"
                    @changePage="changePageFn" 
                    @keywordSearch="keywordSearch" />
        
            </div>
            
            <Foot />
        </div>
    </div>
</template>

<script>
import Nav from "@/components/Nav"
import Tabs from "./Tabs"
import Area from "./Area"
import Content from "./Content"
import Carousel from "./Carousel"
import FirstScreen from "./FirstScreen"
import Foot from '@/components/Foot'
import { mapGetters } from 'vuex'
import Portal from '@/api/portal'
import { getScrollTop } from '@/utils/tools'

export default {
    name: 'Home',
    components: {
        Nav,
        Tabs,
        Area,
        Content,
        Carousel,
        FirstScreen,
        Foot
    },
    data(){
        return {
            homeData: {},
            scroll: 0,
            params: {
                cat: 0,
                c1: 0,
                c2: 0,
                c3: 0,
                keyword: '',
                page: 0
            },
            pagination: {},
            httpServe: true
        }
    },
    computed: {
        ...mapGetters(['scrollTop'])
    },
    mounted(){
        this.getHomeData(this.params)
        document.addEventListener('mousewheel', this.listenScrollFn)
    }, 
    destroyed() {
        document.removeEventListener('mousewheel', this.listenScrollFn)
    },
    activated(){
        window.scrollTo({ 
            top: this.scrollTop, 
            behavior: "smooth" 
        })
    }, 
    methods: {
        getHomeData(params, callback){
            this.httpServe = true
            Portal.getHomeData(params).then(res => {
                if(res.code === 1) {
                    this.homeData = res.data
                    callback && callback()
                }
            }).finally(() => {
                this.params.keyword = ''
                this.httpServe = false
            })
        },
        // 分页搜索
        changePageFn(val){
            this.params.page = val
            this.getHomeData(this.params, () => {
                var area = document.querySelector('.area')
                area && window.scrollTo({ 
                    top: area.offsetTop, 
                    behavior: "smooth" 
                })
            })
        },
        // 关键字搜索
        keywordSearch(k) {
            this.params.keyword = k
            this.getHomeData(this.params)
        },
        // 分类切换
        tabsClickFn(val){
            this.params.cat = val.id
            this.getHomeData(this.params)
        },
        // 省份搜索
        provinceClickFn(val){
            this.params.c2 = 0
            this.params.c3 = 0
            this.params.c1 = parseInt(val)
            this.getHomeData(this.params)
        },
        // 城市搜索
        cityClickFn(val){
            this.params.c3 = 0
            this.params.c2 = parseInt(val)
            this.getHomeData(this.params)
        },
        //区县搜索
        areaClickFn(val){
            this.params.c3 = parseInt(val)
            this.getHomeData(this.params)
        },
        listenScrollFn(e){
            let el = document.querySelector('.first-screen')
            let top = el && el.offsetHeight
            if(e.deltaY > 0 && getScrollTop() <= top) {
                this.$route.name === 'Home' && window.scrollTo({ 
                    top: top, 
                    behavior: "smooth" 
                })
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.home {
    width: 100%;
    height: 100%;
    .wrap {
        width: 100%;
        height: 100%;
        position: relative;
    }
    .container {
        padding-top: 200px;
        background-size: cover;
        background-repeat: no-repeat;
        background-image: url('/images/bg.png');
    }
    .place {
        padding: 120px 0 40px;
        &-title {
            width: 124px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            font-size: 20px;
            font-weight: bold;
            font-family: Microsoft YaHei;
            border: 2px solid #811657;
        }
        div {
            margin: 0 auto;
        }
        div:first-child {
            border-bottom: 0;
        }
        div:last-child {
            border-top: 0;
        }
        &-line {
            width: 890px;
            height: 2px;
            margin: 6px auto !important;
            background: linear-gradient(to right, #000, #ece2e2, #000 );
        }
    }
}
</style>

<style lang="scss">
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
}
.el-carousel__item:nth-child(2n) {
    background-color: #d3dce6;
}

.el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
}
.loading {
    .el-icon-loading {
        color: #fff;
        font-size: 38px;
    }
    .el-loading-text {
        color: #fff;
        font-size: 16px;
        margin-top: 12px;
        padding-left: 12px;
    }
}
</style>