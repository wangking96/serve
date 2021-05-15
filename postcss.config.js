module.exports = {
    plugins: {
        'postcss-px-to-viewport': {
            unitToConvert: 'px',
            viewportWidth: 750,
            unitPrecision: 13,
            propList: ['*'],
            viewportUnit: 'vw',
            fontViewportUnit: 'vw',
            selectorBlackList: [],
            minPixelValue: 1,
            mediaQuery: false,
            replace: true,
            exclude: [/vant/],
            include: undefined,
            landscape: false,
            landscapeUnit: 'vw',
            landscapeWidth: 568
        }
    }
}