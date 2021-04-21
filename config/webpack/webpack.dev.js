const webpack = require('webpack');

const {merge} = require('webpack-merge');

const commonConfig = require('./webpack.common');

const devtool = 'source-map';

const plugins = [
    new webpack.HotModuleReplacementPlugin(),
];

const proxy = {
    "/data-inf": {
        target: "http://129.28.205.151:9000/data-inf",
        changeOrigin: true,
        pathRewrite: {"^/data-inf": ""}
    },
}

const devServer = {
    historyApiFallback: true,
    disableHostCheck: true,
    inline: true,
    host: "127.0.0.1",
    port: "8001",
    hot: true,
    open: true,
    compress: true,
    proxy,
}

const devConfig = {
    devtool,
    plugins,
    devServer
};

module.exports = merge([commonConfig, devConfig]);
