import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index';
import store from './store/index';
import coms from './common/useComponents';
import 'normalize.css';
const app = createApp(App);

coms.forEach(item => {
    app.use(item);
});

app.use(router).use(store);
app.mount('#app');
