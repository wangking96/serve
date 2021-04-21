import { createApp } from 'vue';
import Message from './Message';

interface optItem {
    text?: string,
    type?: string,
    duration?: number,
    close?: any
}

function showMessage (opt = {} as optItem) {
    if(typeof opt !== 'object') throw ('传参有误！')
    const dom:Element | null = document.createElement('div')
    document.body.appendChild(dom)
    const app = createApp(Message, {
        hide: () => {
            app.unmount(); 
            document.body.removeChild(dom);
            opt.close && opt.close();
        },
        show: () => {
            app.mount(dom)
        },
        ...opt
    })
    app.mount(dom)
}
export default showMessage
// text: string