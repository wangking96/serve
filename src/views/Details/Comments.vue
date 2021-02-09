<template>
    <div class="comments">
        <div class="comments-item" v-for="item in commentList" :key="item.id">
            <div class="comments-item-box">
                <div class="comments-avatar">
                    <img src="" alt="">
                </div>
                <div class="comments-content">
                    <div>{{item.full_name}}</div>
                    <div>{{changeTime(item.create_time)}}</div>
                    <div class="content" v-html="item.content"></div>
                </div>
                <div class="comments-btn">
                    <p @click="replyClickFn(item)">
                        <img src="/images/comment1.png">
                        {{item.reply_count}}
                    </p>
                    <p>{{item.like_count}}</p>
                </div>
            </div>

            <div 
                class="comments-item-editor" 
                v-if="item.showEditor">
                <Editor 
                    :width="1160" 
                    :height="250" 
                    :placeholderText="'回复：'" 
                    ref="ed" />
                <div class="comments-item-editor-btn">
                    <div class="cancel" @click="cancelReplyFn(item)">
                        <span>取消</span>
                    </div>
                    <div 
                        class="reply" 
                        :style="`cursor: ${submiteStatus ? 'not-allowed' : 'pointer'}`"
                        @click="replySubmite(item)">
                        <span>回复</span>
                        <i v-if="submiteStatus" class="el-icon-loading"></i> 
                    </div>
                </div>
                
            </div>
        </div>
    </div>
</template>
<script>
import User  from '@/api/user.js'
import Editor from '@/components/Editor'
export default {
    components: {
        Editor
    },
    props: {
        commentList: Array
    },
    data() {
        return {
            submiteStatus: false
        }
    },
    methods: {
        changeTime(t) {
            t = this.$moment(t * 1000).format('YYYY-MM-DD HH:mm:ss')
            return t
        },
        replyClickFn(item){
            this.commentList.forEach(i => {
                i.showEditor = false
            })
            item.showEditor = !item.showEditor
        },
        cancelReplyFn(item){
            item.showEditor = !item.showEditor
        },
        replySubmite(item){
            if(this.submiteStatus) return
            let params = {
                object_id: item.object_id,
                parent_id: item.parent_id,
                content: this.$refs.ed[0].contentHtml
            }
            this.submiteStatus = true
            User.userSetComments(params).then(res => {
                if(res.code === 1) {
                    this.$message.success(res.msg)
                    this.$refs.ed[0].contentHtml = ''
                    item.showEditor = false
                    this.$emit('refrech')
                }
            })
            .finally(() => {
                this.submiteStatus = false
            })
        }
    }
}
</script>
<style lang="scss" scoped>
@keyframes slide-down {  
    from { 
        height: 0; 
    }
    to { 
        height: 200px;
    }  
}
.comments {
    padding: 0 20px;
    box-sizing: border-box;
    &-item {
        margin-top: 44px;
        &-box {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        &-editor {
            margin-top: 16px;
            overflow: hidden;
            transition-duration: .2s;
            animation: slide-down .3s;
            &-btn {
                float: right;
                margin-top: 14px;
                div {
                    display: inline-block;
                    min-width: 80px;
                    height: 34px;
                    border-radius: 4px;
                    text-align: center;
                    line-height: 34px;
                    font-size: 16px;
                    cursor: pointer;
                    font-family: Microsoft YaHei;
                    span {
                        letter-spacing: 4px;
                    }
                }
                .cancel {
                    margin-right: 14px;
                    background-color: #FF9600;
                }
                .reply {
                    background: #0C8988;
                }
            }
        }
    }
    &-avatar {
        width: 50px;
        height: 50px;
        margin-right: 20px;
        border: 1px solid;
        border-radius: 100%;
    }
    &-content {
        flex: 1;
        width: 80%;
        div {
            color: #fff;
            margin-top: 10px;
        }
        .content {
            overflow: hidden;
            padding-right: 20px;
            p {
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
        }
    }
    &-btn {
        overflow: hidden;
        p {
            float: left;
            font-size: 20px;
            cursor: pointer;
            display: flex;
            align-items: center;
            img {
                margin-right: 8px;
            }
            &:last-child {
                margin-left: 26px;
            }
        }
    }
}
</style>