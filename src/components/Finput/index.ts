/*
 * @version:  ;
 * @description:  ;
 * @autor: Full
 * @date: Do not edit
 */
import { App, Plugin } from 'vue';
import Finput from './Finput.vue';
import { Form } from 'vee-validate';
const install = (app: App) => {
    app.component('Finput', Finput);
    app.component('Form', Form);
};

Finput.install = install;

export { Finput,Form };

export default (Finput as unknown) as Plugin;
