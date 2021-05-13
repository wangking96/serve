import { App, Plugin } from 'vue';
import Fmodal from './Fmodal.vue';

const install = (app: App) => {
    app.component('Fmodal', Fmodal);
};

Fmodal.install = install;

export { Fmodal };

export default (Fmodal as unknown) as Plugin;