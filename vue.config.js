const dayjs = require('dayjs')
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CompressionWebpackPlugin = require("compression-webpack-plugin")

process.env.VUE_APP_PLATFORM = 'default'
process.env.VUE_APP_VTIME = dayjs().format('YYYYMMDDHHmmss')

module.exports = {
    devServer: {
        port: 3000,
        proxy: {
            '/api/*': {
                // target: 'https://m.ustest01.com',
                target: 'http://18.163.112.59:98',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/'
                }
            }
        }
    },
    configureWebpack: config => {
        const plugins = []
        const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i

        config.output.filename = `js/[name].js?v=${process.env.VUE_APP_VTIME}`
        config.output.chunkFilename = `js/[name].js?v=${process.env.VUE_APP_VTIME}`

        plugins.push(new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(`./platforms/${process.env.VUE_APP_PLATFORM}/images`),
                    to: 'images'
                },{
                    from: path.resolve(`./platforms/${process.env.VUE_APP_PLATFORM}/favicon.ico`),
                    to: '.'
                }
            ]
        }))

        if (['pre', 'prod'].includes(process.env.VUE_APP_ENV)) {
            plugins.push(
                new CompressionWebpackPlugin({
                    filename: "[path].gz[query]",
                    algorithm: "gzip",
                    test: productionGzipExtensions,
                    threshold: 10240,
                    minRatio: 0.8
                })
            )
        }
        config.plugins = [...config.plugins, ...plugins]
    },
    chainWebpack: config => {
        const svgRule = config.module.rule('svg')
        // 清除已有的所有 loader。
        // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
        svgRule.uses.clear()
        // 添加要替换的 loader
        svgRule
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
    },
    css: {
        loaderOptions: {
            scss: {
                additionalData: `
                @import "./platforms/${process.env.VUE_APP_PLATFORM}/style.scss";
                `
            }
        }
    },
    pwa: {
        name: '越南版',
        themeColor: '#E9242B',
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: 'black',
        manifestOptions: {
            start_url: '.',
            background_color: '#ffffff',
            display: 'standalone',
            icons: [
                {
                    "src": "./images/app-icons/android-chrome-192x192.png",
                    "sizes": "192x192",
                    "type": "image/png"
                },
                {
                    "src": "./images/app-icons/android-chrome-512x512.png",
                    "sizes": "512x512",
                    "type": "image/png"
                },
                {
                    "src": "./images/app-icons/android-chrome-maskable-192x192.png",
                    "sizes": "192x192",
                    "type": "image/png",
                    "purpose": "maskable"
                },
                {
                    "src": "./images/app-icons/android-chrome-maskable-512x512.png",
                    "sizes": "512x512",
                    "type": "image/png",
                    "purpose": "maskable"
                },
                {
                    "src": "./images/app-icons/apple-startup-1024x1024.png",
                    "sizes": "1024x1024",
                    "type": "image/png",
                    "purpose": "startup"
                }
            ]
        },
        iconPaths: {
            favicon32: './images/app-icons/favicon-32x32.png',
            favicon16: './images/app-icons/favicon-16x16.png',
            appleTouchIcon: './images/app-icons/apple-touch-icon-152x152.png',
            maskIcon: './images/app-icons/safari-pinned-tab.svg',
            msTileImage: './images/app-icons/msapplication-icon-144x144.png'
        },
        workboxPluginMode: 'GenerateSW',
        workboxOptions: {
        }
    }
}