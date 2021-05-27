import { defineConfig } from 'vite';
import path from "path";
import vue from '@vitejs/plugin-vue';
import styleImport from 'vite-plugin-style-import';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        styleImport({
            libs: [{
                libraryName: 'vant',
                esModule: true,
                resolveStyle: (name) => `vant/es/${name}/style`,
            },],
        })
    ],
    base: '/',
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
    // 打包配置
    build: {
        // target: 'modules',
        // outDir: 'dist', //指定输出路径
        // assetsDir: 'assets', // 指定生成静态资源的存放路径
        minify: 'terser', // 混淆器，terser构建后文件体积更小
        // cssCodeSplit: false
    },
    server: {
        port: 3000, //启动端口
        open: true,
        proxy: {
            // 选项写法
            "/api": "", //代理网址
        },
        cors: true,
        host: ''
    },
})