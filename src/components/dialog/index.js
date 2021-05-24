import Fmodal from './Dialog.vue';

const install = (app) => {
    app.component('Fmodal', Fmodal);
};

Fmodal.install = install;

export default Fmodal;