import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { injectHtml } from "vite-plugin-html";
import legacy from "@vitejs/plugin-legacy";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    injectHtml({
      injectData: {
        title: "小米盲盒",
      },
    }),
    legacy({
      targets: [
        "defaults",
        "ie >= 8",
        "Firefox >= 3.5",
        "chrome  >= 35",
        "opera >= 11.5",
      ],
      ignoreBrowserslistConfig: true,
    }),
  ],
  base: "./", //打包路径
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), //设置别名
     
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import '@/assets/scss/public.scss';`, //设置公共scss
      },
    },
    modules: {
      scopeBehaviour: "global",
      localsConvention: "camelCase", // 默认只支持驼峰，修改为横线和驼峰
    },
  },
  json: {
    stringify: true,
  },
  build: {
    manifest: true,
    sourcemap: false,
    target: ["es2015", "chrome58"],
  },
  server: {
    port: 4000, //启动端口
    open: true,
    proxy: {
      // 选项写法
      "/api": "http://ai-pc.zbitcloud.com", //代理网址
    },
    cors: true,
  },
});
