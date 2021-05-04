import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App);

app.config.globalProperties.$http = '这里是全局属性：xxxxxx';

app.mount('#app');
