/*
 * @version:  ;
 * @description:  ;
 * @autor: Full
 * @date: Do not edit
 */
import qs from "qs";
export default class WS {
  // websocket链接地址
  public url: string;
  // WebSocket实例
  public websocket: any;
  // 心跳定时器
  public setIntervalWesocketPush: any;
  // 是否在重连中
  public isReconnectionLoading: boolean;
  // 延时重连的 id
  public timeId: any;
  // 是否是用户手动关闭连接
  public isCustomClose: boolean;

  constructor(url: string) {
    this.url = url;
    this.createSocket();
    this.isCustomClose = false;
    this.setIntervalWesocketPush = null;
    this.isReconnectionLoading = false;
    this.timeId = null;
  }
  createSocket() {
    if ("WebSocket" in window) {
      if (this.url) {
        console.log("建立websocket连接");
        this.websocket = new WebSocket(this.url);
        this.onopenWS();
        this.onmessageWS();
        this.onerrorWS();
        this.oncloseWS();
      }
    } else {
      console.log("你的浏览器不支持 WebSocket");
    }
  }
  onopenWS() {
    this.websocket.onopen = () => {
      this.sendLoginInfo();
      this.sendPing();
      this.isReconnectionLoading = false;
    };
  }
  onmessageWS() {
    this.websocket.onmessage = (e: any) => {
      window.dispatchEvent(
        new CustomEvent("onmessageWS", {
          detail: {
            data: e.data,
          },
        })
      );
    };
  }
  onerrorWS() {
    this.websocket.onerror = () => {
      console.log("websocket连接错误...");
      this.reconnection();
      this.isReconnectionLoading = false;
      clearInterval(this.setIntervalWesocketPush);
    };
  }
  oncloseWS() {
    this.websocket.onclose = () => {
      // 用户手动关闭的不重连
      console.log("关闭websocket连接...");
      if (this.isCustomClose) return;
      this.reconnection();
      this.isReconnectionLoading = false;
      clearInterval(this.setIntervalWesocketPush);
    };
  }

  /**
   * @description:  手动关闭;
   * @param {*}
   * @return {*}
   * @author: Full
   */
  close() {
    console.log("手动关闭websocket连接...");
    this.isCustomClose = true;
    this.websocket.close();
    clearInterval(this.setIntervalWesocketPush);
  }

  /**
   * @description:  手动开启;
   * @param {*}
   * @return {*}
   * @author: Full
   */
  start() {
    console.log("手动开启websocket连接...");
    this.isCustomClose = false;
    this.reconnection();
  }

  /**
   * @description:  重连;
   * @param {*}
   * @return {*}
   * @author: Full
   */
  reconnection() {
    if (this.isReconnectionLoading) return;
    this.isReconnectionLoading = true;
    clearTimeout(this.timeId);
    this.timeId = setTimeout(() => {
      console.log("重新连接中...");
      this.createSocket();
    }, 3000);
  }

  /**
   * @Description: 发送心跳 ;
   * @param {number} time 心跳间隔毫秒 默认5000
   * @param {string} ping 心跳名称 默认字符串ping
   * @Author: Full
   */
  sendPing = (time = 5000, ping = "heartbeat") => {
    let pingObj = {
      type: ping,
    };
    clearInterval(this.setIntervalWesocketPush);
    this.websocket.send(JSON.stringify(pingObj));
    this.setIntervalWesocketPush = setInterval(() => {
      this.websocket.send(JSON.stringify(pingObj));
    }, time);
  };
  /**
   * @description: 发送用户信息 ;
   * @param {*}
   * @return {*}
   * @author: Full
   */
  sendLoginInfo = () => {
    let liveUserInfo = localStorage.getItem("liveUserInfo") as any;
    let msgObj = {
      type: "init",
      msg: {
        uid: JSON.parse(liveUserInfo)?.id,
        liveuid: qs.parse(window.location.search)["?id"],
        livetype: "live",
        device: "pc",
      },
    };
    this.websocket.send(JSON.stringify(msgObj));
  };

  /**
   * @description: 发送数据 ;
   * @param {any} message 需要发送的数据
   * @return {*}
   * @author: Full
   */

  sendWSPush = (message: any) => {
    this.websocket.send(JSON.stringify(message));
  };
}
