const dayjs = require('dayjs')
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CompressionWebpackPlugin = require("compression-webpack-plugin")

// process.env.VUE_APP_PLATFORM = 'default'
process.env.VUE_APP_VTIME = dayjs().format('YYYYMMDDHHmmss')
const target = process.env.NODE_ENV === 'development' ? 'http://red.shortbak.com/' : 'http://red.kingbeach.cn/'
module.exports = {
    outputDir: 'honglou',
    filenameHashing: true,
    productionSourceMap: false,
    devServer: {
        port: 3000,
        proxy: {
            // '/user/*': {
            //     target,
            //     changeOrigin: true,
            //     secure: false
            // },
            // '/portal/*': {
            //     target,
            //     changeOrigin: true,
            //     secure: false
            // }
            '/s/*': {
                target,
                changeOrigin: true,
                secure: false
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
                    from: path.resolve(`./src/assets/images`),
                    to: 'images'
                },
                // {
                //     from: path.resolve(`./platforms/${process.env.VUE_APP_PLATFORM}/favicon.ico`),
                //     to: '.'
                // }
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
    }
}