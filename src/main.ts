import { createApp } from 'vue';
import App from './App.vue';
import '@/assets/css/normalize.css';
import '@/assets/css/base.css';
import router from '@/router/index';
import store from '@/store/index';
// 图片懒加载
import lazyPlugin from '@/common/imagelazy/index';
import loading from '@/assets/images/default_thumb.jpg';

// 表单验证
import Finput from '@/components/Finput/index';
// tabs切换
import Ftabs from '@/components/Ftabs/index';
// 模态框
import Fmodal from '@/components/Fmodal/index';
// 消息框
import FMessage from '@/components/Fmessage/index';

const app = createApp(App);

app.use(router)
    .use(store)
    .use(lazyPlugin, {
        loading,
    })
    .use(FMessage)
    .use(Finput)
    .use(Ftabs)
    .use(Fmodal)
    .mount('#app');
