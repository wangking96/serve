<template>
    <Layout :navbar="true" type="title" title="密码重置">
        <div class="change-password">
            <div class="form">
                <div class="form-item">
                    <label>旧密码</label>
                    <input
                        type="password"
                        maxlength="20"
                        placeholder="请输入旧密码"
                        v-model="oldPwd.value"
                    />
                    <div class="form-item-tips" v-if="oldPwd.tips">
                        {{ oldPwd.tips }}
                    </div>
                </div>
                <div class="form-item">
                    <label>新密码</label>
                    <input
                        type="password"
                        maxlength="20"
                        placeholder="请输入新密码"
                        v-model="newPwd.value"
                    />
                    <div class="form-item-tips" v-if="newPwd.tips">
                        {{ newPwd.tips }}
                    </div>
                </div>
                <div class="form-item">
                    <label>确认密码</label>
                    <input
                        type="password"
                        maxlength="20"
                        placeholder="请输入确认密码"
                        v-model="confirmPwd.value"
                    />
                    <div class="form-item-tips" v-if="confirmPwd.tips">
                        {{ confirmPwd.tips }}
                    </div>
                </div>
            </div>
            <div class="form-btn" @click="submiteFn">立即修改</div>
        </div>
        <Loading v-if="loading" text="修改中..." />
    </Layout>
</template>

<script>
import { computed, defineComponent, reactive, toRefs, watchEffect } from 'vue';
import Layout from '@/components/Layout.vue';
import Loading from '../../components/PopupLoading.vue';
import api from '../../api/api';
import Request from '../../common/request';
import { useStore } from 'vuex';
import { Toast } from 'vant';

const pwdReg = /^(?=.*\d)(?=.*[a-z])[a-zA-Z\d]{6,20}$/;

export default defineComponent({
    components: {
        Layout,
        Loading
    },
    setup() {
        const store = useStore();
        const loginInfo = computed(() => store.state.loginInfo);
        
        const data = reactive({
            loading: false,
            oldPwd: {
                value: '',
                tips: '',
            },
            newPwd: {
                value: '',
                tips: '',
            },
            confirmPwd: {
                value: '',
                tips: '',
            },
        });

        const submiteFn = () => {
            if(data.loading) return;
            if (!pwdReg.test(data.oldPwd.value)) {
                data.oldPwd.tips = '密码为6-20位字母数字组合！';
                return;
            }
            if (!pwdReg.test(data.newPwd.value)) {
                data.newPwd.tips = '密码为6-20位字母数字组合！';
                return;
            }
            if (data.newPwd.value !== data.confirmPwd.value) {
                data.confirmPwd.tips = '两次密码不一致！';
                return;
            }
            data.loading = true;

            setTimeout(() => {
                sendRequestFn();
            }, 500);
        };

        const sendRequestFn = async () => {
            const res = await Request({
                params: {
                    service: api.userChangePass,
                    oldpass: data.oldPwd.value,
                    pass: data.newPwd.value,
                    pass2: data.confirmPwd.value,
                    uid: loginInfo.value.id || '',
                    token: loginInfo.value.token || ''
                }
            })
            let obj = {
                message: res.msg,
                className: 'my-toast'
            }
            if(res.code === 1003) {
                obj.icon = 'warning-o';
            }
            if(res.code === 0) {
                obj.type = 'success';
                obj.message = '修改成功';
                data.oldPwd.value = '';
                data.newPwd.value = '';
                data.confirmPwd.value = '';
            }
            Toast(obj);
            data.loading = false;
        }

        watchEffect(() => {
            if (data.oldPwd.value) {
                data.oldPwd.tips = '';
            }
            if (data.newPwd.value) {
                data.newPwd.tips = '';
            }
            if (data.confirmPwd.value) {
                data.confirmPwd.tips = '';
            }
        })

        return {
            ...toRefs(data),
            submiteFn,
        };
    },
});
</script>

<style lang="scss" scoped>
.change-password {
    width: 100%;
    min-height: 100%;
    padding-top: 14%;
    box-sizing: border-box;
    background-color: #f8f8f8;
    .form {
        width: 100%;
        padding: 30px 0;
        background-color: #ffffff;
        &-item {
            height: 80px;
            position: relative;
            margin-bottom: 24px;
            @include flexAlignItemsCenter();
            @include font($size: 28px, $color: #2b2626);
            &:last-child {
                margin-bottom: 0;
            }
            label {
                width: 150px;
                margin-right: 40px;
                text-align: right;
            }
            input {
                flex: 1;
                width: 100%;
                height: 100%;
                border: none;
                outline: none;
                background-color: transparent;
            }
            &-tips {
                color: red;
                @include position(
                    $position: absolute,
                    $left: 190px,
                    $top: 80px
                );
            }
        }
        &-btn {
            width: 60%;
            height: 80px;
            line-height: 80px;
            margin: 64px auto 0;
            letter-spacing: 3px;
            border-radius: 80px;
            background-color: #ff5116;
            @include font($size: 28px, $color: #fff, $center: center);
        }
    }
}
</style>
