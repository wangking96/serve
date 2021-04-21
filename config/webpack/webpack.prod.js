const paths = require('../paths');

const webpack = require('webpack');

const {merge} = require('webpack-merge');

const commonConfig = require('./webpack.common');

const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const WorkBoxPlugin = require('workbox-webpack-plugin');

const WebpackPwaManifest = require('webpack-pwa-manifest');

const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');

const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin');

const output = {
    path: paths.dist,
    filename: '[name]-[hash:8].js',
}

const plugins = [
    new CleanWebpackPlugin({
        cleanAfterEveryBuildPatterns: ["dist"],
    }),

    new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1,
    }),

    new WorkBoxPlugin.GenerateSW({
        exclude: [/\.(?:png|jpg|jpeg|svg)$/],
        maximumFileSizeToCacheInBytes: 50000000,
        runtimeCaching: [
            {
                urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
                handler: "StaleWhileRevalidate",
                options: {
                    cacheName: "images",
                    expiration: {
                        maxEntries: 10,
                        maxAgeSeconds: 60
                    },
                    backgroundSync: {
                        name: "queue",
                        options: {
                            maxRetentionTime: 60 * 60
                        }
                    },
                    cacheableResponse: {
                        statuses: [0, 200],
                        headers: {"x-test": "true"}
                    },
                    broadcastUpdate: {
                        channelName: "update"
                    },
                    fetchOptions: {
                        mode: "no-cors"
                    },
                    matchOptions: {
                        ignoreSearch: true
                    }
                }
            }
        ],
        skipWaiting: true,
        clientsClaim: true,
        cacheId: "work-webpack-plugin",
        offlineGoogleAnalytics: true
    }),

    new WebpackPwaManifest({
        name: 'Title',
        short_name: 'Title',
        description: 'Title',
        background_color: '#ffffff',
        crossorigin: 'use-credentials',
        ios: true,
        icons: [
            {
                src: paths.logo,
                sizes: [96, 128, 192, 256, 384, 512],
                destination: paths.iosDestination,
                ios: true
            },
            {
                src: paths.logo,
                size: '1024x1024',
                destination: paths.iosDestination,
                ios: 'startup'
            },
            {
                src: paths.logo,
                sizes: [36, 48, 72, 96, 144, 192, 512],
                destination: paths.androidDestination
            }
        ]
    }),

    new MiniCssExtractPlugin({
        filename: 'static/css/[name].css',
        chunkFilename: '[id].css',
        ignoreOrder: false
    }),
]

const devServer = {
    writeToDisk: true,
}

const prodConfig = {
    output,
    plugins,
    devServer,
    optimization: {
        removeEmptyChunks: true,
        minimizer: [
            new ParallelUglifyPlugin({
                cacheDir: '.cache/',
                uglifyJS: {
                    output: {
                        comments: false,
                    },
                    warnings: true,
                    compress: {
                        drop_console: true,
                        collapse_vars: true,
                        reduce_vars: true,
                    }
                },
            }),
            new OptimizeCssPlugin({cssProcessorOptions: {safe: true}}),
        ],
        splitChunks: {
            chunks: 'all',
            minSize: 0,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                commons: {
                    chunks: "initial",
                    minChunks: 2,
                    name: "commons",
                    maxInitialRequests: 5,
                    minSize: 0,
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
                // reactBase: {
                //     test: (module) => {
                //         return /react|redux|prop-types/.test(module.context);
                //     },
                //     chunks: "initial",
                //     name: "reactBase",
                //     priority: 10,
                // },
            }
        },
    },
};

module.exports = merge([commonConfig, prodConfig]);
