const HtmlWebpackPlugin = require('html-webpack-plugin');

const webpack = require('webpack');

const paths = require('../paths');

const {
    VueLoaderPlugin
} = require('vue-loader');

const WebpackBar = require('webpackbar');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const cdn = [
    '//unpkg.com/vue@next',
    '//cdnjs.cloudflare.com/ajax/libs/vuex/4.0.0/vuex.global.prod.min.js',
    '//cdnjs.cloudflare.com/ajax/libs/vue-router/4.0.5/vue-router.global.prod.min.js',
    '//cdnjs.cloudflare.com/ajax/libs/single-spa/5.9.2/umd/single-spa.min.js',
    '//cdnjs.cloudflare.com/ajax/libs/react/17.0.2/umd/react.production.min.js',
    '//cdnjs.cloudflare.com/ajax/libs/react-dom/17.0.2/umd/react-dom.production.min.js'
]

const entry = paths.main;

const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development';

const performance = {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
};

const postCssConfig = {
    loader: "postcss-loader",
    options: {
        postcssOptions: {
            plugins: [
                "postcss-preset-env",
                'autoprefixer'
            ],
        },
    },
};

const rules = [{
        test: /\.vue$/,
        use: 'vue-loader'
    },
    {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,

        include: paths.pages,
        type: 'asset/inline',
    },
    {
        test: /\.ts|\.tsx$/,

        include: paths.pages,
        use: [
            'babel-loader',
            'ts-loader'
        ]
    },
    {
        test: /\.(sa|sc|c)ss$/,

        include: paths.pages,
        use: [
            process.env.NODE_ENV === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            postCssConfig,
            {
                loader: 'sass-loader',
                options: {
                    additionalData: `@import '@/assets/public.scss';`
                }
            }
        ]
    },
    {
        test: /\.less$/,

        include: paths.pages,
        use: [
            process.env.NODE_ENV === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            postCssConfig,
            'less-loader',
        ]
    },
    {
        test: /\.(png|jpg|gif|svg|mp(3|4))$/i,

        include: paths.pages,
        type: 'asset/inline'
    },
];

const plugins = [

    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        }
    }),

    new WebpackBar({
        profile: true,
        name: 'webpack5-single-spa-vue3-react',
        color: 'yellowgreen'
    }),

    new HtmlWebpackPlugin({
        title: '球球直播',
        favicon: paths.icon,
        template: paths.html,
        inject: 'body',
        minify: {
            removeAttributeQuotes: true,
            collapseWhitespace: true,
        },
        cdn,
        hash: true
    }),

    new VueLoaderPlugin(),


];

const externals = {
    "vue": "Vue",
    "vuex": "Vuex",
    "vue-router": "VueRouter",
    "react": "React",
    "react-dom": "ReactDOM",
    "single-spa": "singleSpa",
}

module.exports = {
    target: process.env.NODE_ENV === "development" ? "web" : "browserslist",
    mode,
    performance,
    entry,
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx', '.vue', '.json'],
        alias: {
            '@': paths.pages,
            '@assets': paths.assets,
            '@mock': paths.mock,
            '@store': paths.store,
            '@components': paths.components,
        },
        modules: [
            paths.node_modules,
            paths.pages,
            paths.assets,
            paths.mock,
            paths.components,
            paths.store,
        ],
        fallback: {
            "fs": false,
            "tls": false,
            "net": false,
            "path": false,
            "zlib": false,
            "http": false,
            "https": false,
            "stream": false,
            "crypto": false,
            "crypto-browserify": require.resolve('crypto-browserify'), //if you want to use this module also don't forget npm i crypto-browserify 
        }
    },
    module: {
        noParse: /node_modules\/dist/,
        rules,
    },
    externals,
    plugins,
};