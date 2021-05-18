<template>
    <UserLayout class="register">
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
                <div class="form-item-input" :class="{ error: valiCode.tips }">
                    <div class="icon password"></div>
                    <input
                        type="text"
                        maxlength="6"
                        placeholder="请输入验证码"
                        v-model="valiCode.value"
                    />
                    <div class="form-item-input-right" @click="getValiCodeFn">
                        {{ isCountdown ? '(' + countdown + ')' : checkCode }}
                    </div>
                </div>
                <div class="form-item-tips" v-if="valiCode.tips">
                    {{ valiCode.tips }}
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
            <div class="form-submite" @click="registerClickFn">立即注册</div>
            <div class="form-bottom">
                <div @click="changRouterFn('/login')">立即登录</div>
                <div @click="changRouterFn('/find')">忘记密码</div>
            </div>
        </div>
        <Loading text="注册中..." v-if="isLoading" />
    </UserLayout>
</template>

<script>
import { Toast } from 'vant';
import { defineComponent, reactive, toRefs, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import UserLayout from './UserLayout.vue';
import Loading from '../../components/Loading.vue';
import api from '../../api/api';
import Request from '../../common/request';
import { encrypt } from '../../common/tools';
import md5 from 'blueimp-md5';
import { useStore } from 'vuex';

const phoneReg = /^[1]([3-9])[0-9]{9}$/;
const pwdReg = /^(?=.*\d)(?=.*[a-z])[a-zA-Z\d]{6,20}$/;

export default defineComponent({
    components: {
        Loading,
        UserLayout,
    },
    setup() {
        const store = useStore();
        const router = useRouter();
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
            valiCode: {
                value: '',
                tips: '',
            },
            checkCode: '获取验证码',
            countdown: 60,
            isCountdown: false,
            timer: null,
            isLoading: false
        });

        const changRouterFn = (path) => {
            router.push(path);
        };

        const registerClickFn = () => {
            if (data.httpStatus) return;
            if (!phoneReg.test(data.phone.value)) {
                data.phone.tips = '手机号格式有误';
                return;
            }
            if (data.valiCode.value === '') {
                data.valiCode.tips = '验证码不能为空';
                return;
            }
            if (!pwdReg.test(data.password.value)) {
                data.password.tips = '密码为6-20位字母数字组合';
                return;
            }
            const formData = {
                user_login: data.phone.value,
                user_pass: data.password.value,
                code: data.valiCode.value,
                service: api.userRegister,
            };
            if (!data.isCountdown) {
                Toast({
                    icon: 'warning-o',
                    className: 'my-toast',
                    message: '请先获取验证码',
                });
                return;
            }
            // 判断用户是否存在
            Request({
                params: {
                    service: api.userIsExist,
                    user_login: data.phone.value,
                },
            })
                .then((res) => {
                    if (res.code === 1006) {
                        data.httpStatus = true;
                        registerFn(formData);
                    } else {
                        Toast({
                            icon: 'warning-o',
                            message: res.msg,
                        });
                    }
                })
                .catch(() => {
                    data.httpStatus = false;
                });
        };

        const registerFn = async (params) => {
            data.isLoading = true;
            const res = await Request({ params });
            if(res.code === 0) {
                store.commit('SET_LOGININFO', res.info[0]);
                Toast({
                    type: 'success',
                    message: res.msg
                })
                router.push('/');
            } else {
                Toast({
                    icon: 'warning-o',
                    message: res.msg,
                    className: 'my-loading',
                });
                data.httpStatus = false;
            }
            data.isLoading = false;
        };

        const getValiCodeFn = async () => {
            if (data.isCountdown) return;
            if (!phoneReg.test(data.phone.value)) {
                data.phone.tips = '手机号格式有误';
                return;
            }
            const res = await Request({
                params: {
                    mobile: data.phone.value,
                    service: api.getCheckCode,
                    sign: md5(encrypt({ mobile: data.phone.value })) || '',
                }
            });
            if (res.code !== 0) {
                Toast(res.msg);
                return;
            } else {
                Toast({
                    type: 'success',
                    className: 'my-toast',
                    message: '验证码获取成功!',
                });
                countdownFn();
            }
        };

        const countdownFn = () => {
            data.isCountdown = true;
            data.timer = setInterval(() => {
                data.countdown -= 1;
                if (data.countdown <= 0) {
                    data.countdown = 60;
                    data.checkCode = '获取验证码';
                    data.isCountdown = false;
                    clearTimeout(data.timer);
                }
            }, 1000);
        };

        watchEffect(() => {
            if (data.phone.value) {
                data.phone.tips = '';
            }
            if (data.password.value) {
                data.password.tips = '';
            }
            if (data.valiCode.value) {
                data.valiCode.tips = '';
            }
        });

        return {
            registerClickFn,
            changRouterFn,
            getValiCodeFn,
            ...toRefs(data),
        };
    },
});
</script>

<style lang="scss" scoped>
.register {
}
</style>
