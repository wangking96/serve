<template>
    <div>直播</div>
    <p>{{ num }}</p>
    <p>{{ getNum }}</p>
    <button @click="add">+1</button>
    <button @click="sub">-1</button>
    <button @click="goOpenBoxs">去开箱页</button>
    <div class="live-box">
        <div>表单验证</div>
        <Form @submit="onSubmit" :validation-schema="schema">
            <Finput
                label="用户名"
                type="text"
                name="username"
                placeholder="请输入用户名"
                maxlength="8"
                success-message="输入正确"
            ></Finput>
            <Finput
                label="密码"
                type="password"
                name="password"
                placeholder="请输入密码"
                maxlength="12"
                success-message="输入正确"
            ></Finput>
            <Finput
                label="确认密码"
                type="password"
                name="confirm_password"
                placeholder="请输入密码"
                maxlength="12"
                success-message="输入正确"
            ></Finput>
            <button class="submit-btn" type="submit">Submit</button>
        </Form>
    </div>
    <div class="ui-box">
        <div>
            <div>图片懒加载</div>
            <div v-for="item in 10" :key="item" class="img-lazy">
                <img
                    alt=""
                    v-lazy="
                        '//aidj.zbitcloud.com/aigaming/PC/al-live-message/bg.png'
                    "
                />
            </div>
        </div>
        <div class="tabs">
            <h3>tabs切换</h3>
            <Ftabs v-model="selectedTab">
                <Ftab
                    v-for="(tab, i) in tabs"
                    :key="`t${i}`"
                    :val="tab"
                    :label="tab"
                    :indicator="true"
                />
            </Ftabs>
            <Ftab-panels
                v-model="selectedTab"
                :animate="true"
                :swipeable="true"
            >
                <Ftab-panel v-for="(tab, i) in tabs" :key="`tp${i}`" :val="tab">
                    {{ tab }}
                </Ftab-panel>
            </Ftab-panels>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed, reactive, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '../../store';
import { liveActionTypes } from '../../store/modules/live/action-types';

import * as Yup from 'yup';
export default defineComponent({
    name: 'Live',

    setup() {
        const tabs = ['A', 'B', 'C'];
        const state = reactive({
            selectedTab: tabs[1],
        });
        const store = useStore();
        const router = useRouter();
        const num = computed(() => store.state.live.count);
        const getNum = computed(() => store.getters.getCount);

        const add = () => {
            store.dispatch(liveActionTypes.COUNT_ACTION, 1);
        };
        const sub = () => {
            store.dispatch(liveActionTypes.SUB_ACTION, 1);
        };
        const goOpenBoxs = () => router.push('/OpenBoxs');

        const schema = Yup.object().shape({
            username: Yup.string()
                .trim()
                .matches(
                    /^[a-zA-Z_\d]{5,8}$/,
                    '长度为5到8位，只能出现数字、字母、下划线'
                )
                .required('请输入用户名'),
            password: Yup.string()
                .trim()
                .min(6)
                .matches(
                    /^[a-zA-Z_\d]{5,12}$/,
                    '长度为5到12位，只能出现数字、字母、下划线'
                )
                .required('请输入密码'),
            confirm_password: Yup.string()
                .trim()
                .required('请输入确认密码')
                .oneOf([Yup.ref('password')], '两次密码输入的不一致'),
        });
        const onSubmit = (values: any) => {
            alert(JSON.stringify(values, null, 2));
        };
        return {
            add,
            num,
            getNum,
            goOpenBoxs,
            sub,
            tabs,
            ...toRefs(state),
            onSubmit,
            schema,
        };
    },
});
</script>
<style scoped lang="scss">
.live-box {
    @include flexColumnCenter();
    width: 500px;
}
.submit-btn {
    background: $primary-color;
    outline: none;
    border: none;
    color: #fff;
    font-size: 18px;
    padding: 10px 15px;
    display: block;
    width: 100%;
    border-radius: 7px;
    margin-top: 40px;
    transition: transform 0.3s ease-in-out;
    cursor: pointer;
}
.ui-box {
    @include flexCenter();
    .img-lazy {
        width: 384px;
        height: 274px;
        margin-top: 40px;
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
    .tabs {
        align-self: flex-start;
    }
}
</style>
