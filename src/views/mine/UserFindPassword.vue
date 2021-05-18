<template>
    <UserLayout class="find">
        <div class="form">
            <div class="form-item">
                <div class="form-item-input">
                    <div class="icon phone"></div>
                    <input
                        type="text"
                        maxlength="11"
                        placeholder="请输入您的手机号"
                    />
                </div>
                <div class="form-item-tips" v-if="phoneTips">
                    手机号格式有误
                </div>
            </div>
            <div class="form-item">
                <div class="form-item-input">
                    <div class="icon password"></div>
                    <input
                        type="password"
                        maxlength="20"
                        placeholder="请输入密码"
                    />
                </div>
                <div class="form-item-tips" v-if="passwordTips">密码错误</div>
            </div>
            <div class="form-submite" @click="loginFn">立即找回</div>
            <div class="form-bottom">
                <div @click="changRouterFn('/login')">立即登录</div>
                <div @click="changRouterFn('/register')">立即注册</div>
            </div>
        </div>
    </UserLayout>
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import UserLayout from './UserLayout.vue';
export default defineComponent({
    components: {
        UserLayout,
    },
    setup() {
        const router = useRouter();
        const data = reactive({
            phoneTips: false,
            passwordTips: false,
            phone: {
                value: '',
                tips: '手机号格式有误',
            },
        });
       
        const loginFn = () => {
            console.log(data.phone);
        };
        const changRouterFn = () => {
            router.push('/register')
        }
        return {
            loginFn,
            changRouterFn,
            ...toRefs(data),
        };
    },
});
</script>

<style lang="scss" scoped>
.login {
}
</style>
