import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index';
import store from './store/index';
import coms from './common/useComponents';
// import './common/xiaomiPlayer/xiaomiPlayer.min'
import 'reset-css';
import Fmodal from './components/dialog/index';
import { Lazyload } from 'vant';
import { title } from './config/index';
const app = createApp(App);
const platform = import.meta.env.MODE;

coms.forEach(item => {
    app.use(item);
});

app.use(router).use(store).use(Fmodal).use(Lazyload, {
    error: `/images/platform/${platform}/default-bg.png`,
    loading: '',
    attempt: 1
}).mount('#app');

document.title = title[platform];
const faviconurl = `/images/platform/${platform}/logo.png`;
var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
link.type = 'image/x-icon';
link.rel = 'icon';
link.href = faviconurl;
document.getElementsByTagName('head')[0].appendChild(link);