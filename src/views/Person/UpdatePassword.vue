<template>
    <div class="password">
        <div class="password-title">
            <img src="/images/password.png" alt="">
            修改密码
        </div>
        <div class="password-form">
            <div class="password-form-item">
                <label>原密码：</label>
                <input type="password" placeholder="请输入旧密码" v-model="oldPassword">
            </div>
            <div class="password-form-item">
                <label>新密码：</label>
                <input type="password" placeholder="请输入新密码" v-model="newPassword">
            </div>
            <div class="password-form-item">
                <label>重复新密码：</label>
                <input type="password" placeholder="请再次输入新密码" v-model="rePassword">
            </div>
            <div class="submite-btn" @click="submiteFn">
                {{submiteText}}
                <i v-if="submiteStatus" class="el-icon-loading"></i> 
            </div>
        </div>
    </div>
</template>
<script>
import User from '@/api/user.js'
export default {
    data() {
        return {
            oldPassword: '',
            newPassword: '',
            rePassword: '',
            submiteText: '修改密码',
            submiteStatus: false
        }
    },
    methods: {
        submiteFn(){
            if(this.submiteStatus) return
            if(this.oldPassword === '') {
                this.$message.error('请输入旧密码')
                return
            }
            if(this.newPassword === '') {
                this.$message.error('请输入新密码')
                return
            }
            if(this.rePassword === '') {
                this.$message.error('请再次输入新密码')
                return
            }
            if(this.newPassword != this.rePassword ) {
                this.$message.error('两次密码不相同，请重新输入')
                return
            }

            let params = {
                old_password: this.oldPassword,
                password: this.newPassword,
                confirm_password: this.rePassword
            }

            this.submiteText = '提交中...'
            this.submiteStatus = true
            
            User.changePassword(params).then(res => {
                if(res.code === 1) this.$message.success(res.msg)
            })
            .finally(() => {
                this.submiteText = '修改密码'
                this.submiteStatus = false
                this.oldPassword = ''
                this.newPassword = ''
                this.rePassword = ''
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.password {
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
                min-width: 96px;
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
            padding: 0 10px;
            font-family: Microsoft YaHei;
        }
    }
}
</style>