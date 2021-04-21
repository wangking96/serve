import { createApp } from "vue";
import App from "./pages/App";
import "../src/assets/css/normalize.css";
import "../src/assets/css/base.css";
import router from "./router/index";
import { store } from "./store";
import message from './components/Message/index';

function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then((registration) => {})
        .catch((error) => {});
    });
  }
}

console.log("process.env.NODE_ENV", process.env.NODE_ENV);

process.env.NODE_ENV === "production" && registerServiceWorker();

const app = createApp(App);
app.config.globalProperties.$message = message;
app.use(store).use(router).mount("#root");
