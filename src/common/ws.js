import { wsurl } from '../config/index';

const ws = {
    delay: 5000,
    websocket: null,
    isConnection: false,            // 是否正在连接中
    connectionArgs: {},
    connectionTimer: null,
    heartTimer: null,
    init(args){
        this.websocket = new WebSocket(wsurl);
        this.connectionArgs = args;
        this.onopen();
        this.onerror();
        this.onmessage();
    },
    connection(){
        if(this.isConnection) return;
        this.connectionTimer = setInterval(() => {
            this.init();
        }, 5000)
    },
    onopen(){
        this.websocket.onopen = () => {
            if(this.isConnection) return;
            console.log('connection success!!!');
            clearInterval(this.connectionTimer);
            this.isConnection = true;
            this.send(this.connectionArgs);
            
            this.heartTimer = setInterval(() => {
                this.heartbeat();
            }, 15000);
        }
    },
    onerror(){
        this.websocket.onerror = () => {
            console.log('connection error!!!');
            this.isConnection = false;
            clearInterval(this.connectionTimer);
            this.connection();
        }
    },
    onmessage(cb){
        if(this.websocket) {
            this.websocket.onmessage = (res) => {
                cb && cb(res)
            }
        }
    },
    heartbeat() {
        let heart = {
            type: 'heartbeat',
        };
        this.send(JSON.stringify(heart));
        console.log('---发送heartbeat消息响应----');
    },
    send(args){
        if(this.websocket && this.websocket.readyState === 1) {
            this.websocket.send(args);
        }
    },
    close() {
        if(this.websocket) {
            this.websocket.close();
            this.websocket = null;
        }
        this.isConnection = false;
        clearInterval(this.heartTimer);
        clearInterval(this.connectionTimer);
        console.log('The connection is severed');
    }
}

export default ws;