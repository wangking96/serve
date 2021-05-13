/*
 * @version:  ;
 * @description:  ;
 * @autor: Full
 * @date: Do not edit
 */
import { App, Plugin } from 'vue';
import Tabs from './Ftabs.vue';
import Tab from './Ftab.vue';
import TabPanel from './FtabPanel.vue';
import TabPanels from './FtabPanels.vue';

const install = (app: App) => {
    app.component('Ftabs', Tabs);
    app.component('Ftab', Tab);
    app.component('FtabPanels', TabPanels);
    app.component('FtabPanel', TabPanel);
};

Tabs.install = install;

export { Tabs, Tab, TabPanels, TabPanel };

export default (Tabs as unknown) as Plugin;
