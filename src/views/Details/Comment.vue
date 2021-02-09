<template>
    <div class="comment">
        <div class="comment-title">评论</div>
        <div class="comment-content">
            <div class="comment-content-nodata" v-if="!placeholderText">目前还没有评论！</div>
            <!-- <textarea v-model="placeholderText"></textarea> -->
            <Editor :width="1200" :height="380" :placeholderText="placeholderText" ref="editor" />
        </div>
        <div class="comment-send" @click="commentSendFn">
            <img src="/images/comment1.png" alt="">
            发表评论
        </div>
    </div>
</template>

<script>
import Editor from '@/components/Editor'
import User  from '@/api/user.js'
import {loadingFn} from '@/utils/tools'
export default {
    components: {
        Editor
    },
    props: {
        info: Object
    },
    data() {
        return {
            serveLoading: null,
            placeholderText: '添加老司机评论，一起开车'
        }
    },
    methods: {
        commentSendFn() {
            if(this.$refs.editor.contentHtml === '') {
                this.$message.error('请先输入您的评论！')
                return
            }
            
            this.serveLoading = loadingFn()

            let params = {
                object_id: this.info.id,
                content: this.$refs.editor.contentHtml,
                parent_id: 0
            }
            User.userSetComments(params).then(res => {
                if(res.code === 1) {
                    this.$message.success(res.msg)
                    this.$refs.editor.contentHtml = ''
                    this.$emit('refrech')
                }
            })
            .finally(() => {
                this.serveLoading.close()
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.comment {
    margin-top: 76px;
    margin-bottom: 76px;
    overflow: hidden;
    &-title {
        font-size: 30px;
    }
    &-content {
        position: relative;
        margin-top: 16px;
        margin-bottom: 16px;
        min-height: 210px;
        line-height: 24px;
        text-indent: 30px;
        box-sizing: border-box;
        background: rgba(0, 0, 0, .5);
        &-nodata {
            height: 100%;
            line-height: 210px;
            text-align: center;
        }
        textarea {
            padding: 6px;
            width: 100%;
            height: 100%;
            line-height: 20px;
            text-indent: 28px;
            outline: none;
            resize: none;
            color: #fff;
            border: 1px dashed;
            position: absolute;
            top: -1px;
            left: -1px;
            box-sizing: border-box;
            background: transparent;
        }
    }
    &-send {
        float: right;
        display: flex;
        cursor: pointer;
        align-items: center;
        justify-content: flex-end;
        img {
            width: 26px;
            height: 26px;
            margin-right: 10px;
        }
    }
}
</style>