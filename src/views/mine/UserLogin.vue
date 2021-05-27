<template>
    <UserLayout class="login">
        <div class="form">
            <div class="form-item">
                <div class="form-item-input" :class="{ error: phone.tips }">
                    <div class="icon phone"></div>
                    <input
                        type="text"
                        maxlength="11"
                        placeholder="请输入您的手机号"
                        v-model="phone.value"
                    />
                </div>
                <div class="form-item-tips" v-if="phone.tips">
                    {{ phone.tips }}
                </div>
            </div>
            <div class="form-item">
                <div class="form-item-input" :class="{ error: password.tips }">
                    <div class="icon password"></div>
                    <input
                        type="password"
                        maxlength="20"
                        placeholder="请输入密码"
                        v-model="password.value"
                    />
                </div>
                <div class="form-item-tips" v-if="password.tips">
                    {{ password.tips }}
                </div>
            </div>
            <div class="form-submite" @click="loginClickFn">立即登录</div>
            <div class="form-bottom">
                <div @click="changRouterFn('/register')">立即注册</div>
                <div @click="changRouterFn('/find')">忘记密码</div>
            </div>
        </div>
        <Loading text="登录中..." v-if="httpStatus" />
    </UserLayout>
</template>

<script>
import { Toast } from 'vant';
import { defineComponent, reactive, toRefs, watchEffect } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import UserLayout from './UserLayout.vue';
import Loading from '../../components/PopupLoading.vue';
import api from '../../api/api';
import Request from '../../common/request';

const phoneReg = /^[1]([3-9])[0-9]{9}$/;
const pwdReg = /^(?=.*\d)(?=.*[a-z])[a-zA-Z\d]{6,20}$/;

export default defineComponent({
    components: {
        Loading,
        UserLayout,
    },
    setup() {
        const router = useRouter();
        const store = useStore();
        const data = reactive({
            httpStatus: false,
            phone: {
                value: '',
                tips: '',
            },
            password: {
                value: '',
                tips: '',
            },
        });

        const loginClickFn = () => {
            if (data.httpStatus) return;
            if (!phoneReg.test(data.phone.value)) {
                data.phone.tips = '手机号格式有误';
                return;
            }
            if (!pwdReg.test(data.password.value)) {
                data.password.tips = '密码为6-20位字母数字组合';
                return;
            }
            const formData = {
                user_login: data.phone.value,
                user_pass: data.password.value,
                service: api.userLogin,
            };
            data.httpStatus = true;
            loginFn(formData);
        };

        const loginFn = (params) => {
            Request({
                params,
            })
                .then((res) => {
                    if (res.code === 1001) {
                        Toast({
                            icon: 'warning-o',
                            message: res.msg,
                            className: 'my-loading',
                        });
                        return;
                    }
                    if (res.code === 0) {
                        store.commit('SET_LOGININFO', res.info[0]);
                        Toast({
                            type: 'success',
                            message: '登录成功!',
                        });
                        router.replace('/');
                    }
                })
                .finally(() => {
                    data.httpStatus = false;
                });
        };

        const changRouterFn = (path) => {
            router.push(path);
        };

        watchEffect(() => {
            if (data.phone.value) {
                data.phone.tips = '';
            }
            if (data.password.value) {
                data.password.tips = '';
            }
        });
        return {
            loginClickFn,
            changRouterFn,
            ...toRefs(data),
        };
    },
});
</script>

<style lang="scss" scoped>
</style>
