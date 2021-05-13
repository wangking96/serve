import { App, createApp } from 'vue';
import Fmessage from './Fmessage.vue';

interface optItem {
    message?: string,
    type?: string,
    duration?: number,
    offset?: number,
    close?: any,
    id?: number
}
let top = 0, instances:any[] = [], seed = 1;

const Message = (opt:optItem = {}) => {
    if(typeof opt !== 'object') throw ('传参有误！');
    const dom:any = document.createElement('div');
    dom.id = 'message_' + seed++
    document.body.appendChild(dom);  
    top = opt.offset || 40;
    opt.id = seed;
    const app = createApp(Fmessage, {
        show() {
            app.mount(dom);
        },
        hide(id:number) {
            app.unmount(); 
            document.body.removeChild(dom);
            opt.close && opt.close();
            onClose(id)
        },
        ...opt
    })
    app.mount(dom)
    const domM = dom.querySelector('.message');

    instances.push({domM, seed})
    instances.forEach(vm => {
        top += (vm.domM.offsetHeight || 0) + 16;
        vm.domM.style.top = top + 'px'
    })
}
const onClose = (id:number) => {
    const idx = instances.findIndex(({ seed }) => {
        return id === seed;
    });
    if (idx === -1) {
        return;
    }
    const { domM } = instances[idx];
    if (!domM) return;

    instances.splice(idx, 1);

    const len = instances.length;
    if (len < 1) return;

    for (let i = idx; i < len; i++) {
        const pos = instances[i].domM.offsetTop - domM.offsetHeight - 56;
        instances[i].domM.style.top = pos + 'px'
    }
}

Message.install = (app:App) => {
    app.config.globalProperties.$message = Message;
};

export default Message;