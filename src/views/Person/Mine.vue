<template>
    <div class="mine">
        <div class="mine-title">
            <img src="/images/mine.png" alt="">
            我的资料
        </div>
        <div class="mine-form">
            <div class="mine-form-item">
                <label>用户名:</label>
                <div class="user-name">{{userInfo.user_login}}</div>
            </div>
            <div class="mine-form-item">
                <label>昵称:</label>
                <input type="text" placeholder="请输入昵称" v-model="userNickname">
            </div>
            <div class="mine-form-item">
                <label>邮箱:</label>
                <input type="text" placeholder="请输入绑定邮箱便于密码找回" v-model="userEmail">
            </div>
            <div class="mine-form-item">
                <label>手机:</label>
                <input type="text" placeholder="请输入绑定手机号码便于密码找回" v-model="userPhone">
            </div>
            <div class="submite-btn" @click="submiteFn">
                {{submiteText}}
                <i v-if="submiteStatus" class="el-icon-loading"></i> 
            </div>
        </div>
        <div class="tips">
            <div>注意事项：</div>
            <p>请务必修改成你正确的邮箱地址，以便于忘记密码时用来重置密码。</p>
            <p>获取验证码时，邮件发送时间有时会稍长，请您耐心等待。</p>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import User from '@/api/user'
export default {
    data() {
        return {
            userNickname: '',
            userEmail: '',
            userPhone: '',
            submiteStatus: false,
            submiteText: '修改资料'
        }
    },
    computed: {
        ...mapGetters(['userInfo'])
    },
    watch: {
        userInfo: {
            handler:function(v){
                this.userNickname = v.user_nickname
                this.userEmail = v.user_email
                this.userPhone = v.mobile
            },
            immediate: true
        }
    },
    created() {
        console.log(this.userInfo);
    },
    methods: {
        submiteFn(){
            if(this.submiteStatus) return
            // const nameReg = /^[\u4e00-\u9fa5]+(·[\u4e00-\u9fa5]+)*$/
            const emailReg = /^([a-zA-Z0-9]+[-_]?)+@[a-zA-Z0-9]+\.[a-z]+$/
            const phoneReg = /^1[3456789]\d{9}$/
            if(this.userNickname === '') {
                this.$message.error('请输入昵称')
                return
            }
            if(this.userNickname === '') {
                this.$message.error('请输入昵称')
                return
            }
            if(this.userEmail === '') {
                this.$message.error('请输入邮箱')
                return
            }
            if(!emailReg.test(this.userEmail)){
                this.$message.error('邮箱格式不对！')
                return
            }
            if(this.userPhone === '') {
                this.$message.error('请输入手机号码')
                return
            }
            if(!phoneReg.test(this.userPhone)){
                this.$message.error('手机格式不对！')
                return
            }

            this.submiteStatus = true
            this.submiteText = '修改中...'
            let params = {
                user_nickname: this.userNickname,
                user_email: this.userEmail,
                mobile: this.userPhone,
            }
            User.updateUserInfo(params).then(res => {
                if (res.code === 1) {
                    this.userNickname = ''
                    this.userEmail = ''
                    this.userPhone = ''
                    this.$message.success(res.msg)
                }
            })
            .finally(() => {
                this.submiteStatus = false
                this.submiteText = '修改资料'
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.mine {
    padding: 28px;
    min-height: 740px;
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
    &-form {
        margin-top: 68px;
        &-item {
            margin-top: 20px;
            label {
                min-width: 88px;
                text-align: right;
                margin-right: 20px;
                display: inline-block;
            }
            .user-name {
                display: inline-block;
            }
            input {
                width: 400px;
                height: 32px;
                background: #000;
                border: 1px solid #393D42;
                border-radius: 4px;
                box-sizing: border-box;
                outline: none;
                color: #fff;
                padding-left: 20px;
                letter-spacing: 1px;
            }
        }
        .submite-btn {
            min-width: 110px;
            height: 38px;
            display: inline-block;
            background: #0C8988;
            border-radius: 4px;
            text-align: center;
            line-height: 38px;
            margin: 64px 0 64px 108px;
            font-size: 16px;
            letter-spacing: 1px;
            cursor: pointer;
            font-family: Microsoft YaHei;
        }
    }
    .tips {
        div {
            margin-left: 10px;
            letter-spacing: 2px;
            font-weight: 600;
            margin-bottom: 34px;
        }
        p {
            padding-left: 100px;
            box-sizing: border-box;
            font-size: 14px;
            letter-spacing: 2px;
            margin-top: 20px;
        }
    }
}
</style>