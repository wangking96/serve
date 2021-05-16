import { defineConfig } from 'vite';
import path from "path";
import vue from '@vitejs/plugin-vue';
import styleImport from 'vite-plugin-style-import';

// process.env.VUE_APP_VTIME = dayjs().format('YYYYMMDDHHmmss');

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        styleImport({
            libs: [{
                libraryName: 'vant',
                esModule: true,
                resolveStyle: (name) => `vant/es/${name}/style`,
            }, ],
        })
    ],
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
        }
    },
    server: {
        port: 3000, //启动端口
        open: true,
        proxy: {
          // 选项写法
          "/api": "", //代理网址
        },
        cors: true,
        // host: ''
    },
})