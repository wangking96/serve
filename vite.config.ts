import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@import "./src/assets/scss/base.scss";`
            }
        }
    },
    server: {
        proxy: {
            '/api': {
                target: 'http://ai-pc.zbitcloud.com',
                changeOrigin: true,
                rewrite: path => path.replace(/^\api/, '')
            }
        }
    }
})
