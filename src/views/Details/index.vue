<template>
    <div class="details">
        <Nav />
        <div class="main">
            <Ad />
            <template v-if="infoData.info">
                <Info 
                    :info="infoData.info" 
                    :user="infoData.userInfo" />

                <Picture :info="infoData.info" />
                
                <Comment 
                    :info="infoData.info" 
                    @refrech="refrech" />

                <Comments 
                    :commentList="commentList" 
                    @refrech="refrech" />
            </template>

            <Loading v-if="loadingStatus" />
        </div>
        <Foot />
    </div>
</template>

<script>
import Nav from '@/components/Nav'
import Info from './Info'
import Picture from './Picture'
import Comment from './Comment'
import Comments from './Comments'
import Ad from './Ad'
import Foot from '@/components/Foot'
import Loading from '@/components/Loading'

import User from '@/api/user'
import Portal from '@/api/portal'

export default {
    name: 'Details',
    components: {
        Nav,
        Info,
        Picture,
        Comment,
        Comments,
        Ad,
        Foot,
        Loading
    },
    data() {
        return {
            infoData: {},
            loadingStatus: false,
            params: {
                object_id: 0,
                page: 0
            },
            commentList: []
        }
    },
    watch: {
        '$route.query.id'(){
            this.infoData = {}
            this.getData()
            this.getCommentData()
        }
    },
    created(){
        this.getData()
        this.getCommentData()
    },
    methods: {
        getData(){
            this.loadingStatus = true
            Portal.getDetailsData(this.$route.query.id).then(res=>{
                if(res.code === 1) this.infoData = res.data
            })
            .finally(() => {
                this.loadingStatus = false
            })
        },
        getCommentData(){
            this.params.object_id = this.$route.query.id
            User.getComments(this.params).then(res => {
                this.commentList = []
                if(res.code === 1 && res.data) {
                    res.data[0].forEach(item => {
                        item.showEditor = false
                        this.commentList.push(item)
                    })
                }
            })
        },
        refrech(){
            this.getCommentData()
        }
    }
}
</script>

<style lang="scss" scoped>
.details {
    padding-top: 84px;
    &::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        z-index: -1;
        width: 100%;
        height: 100%;
        padding-bottom: 100px;
        background-size: cover;
        background-repeat: no-repeat;
        background-color: rgba(0,0,0,.87);
        background-image: url('/images/details-bg.png');
    }
}
</style>