import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index';
import store from './store/index';
import coms from './common/useComponents';
// import './common/xiaomiPlayer/xiaomiPlayer.min'
import 'reset-css';
import Fmodal from './components/dialog/index';
const app = createApp(App);

coms.forEach(item => {
    app.use(item);
});

app.use(router).use(store).use(Fmodal);
app.mount('#app');
