let path = require('path'),
    webpack = require('webpack'),
    {loader, webpackResolve, webRootDir} = require('./base.js');

// let loader = config.loader;


let resolve = path.resolve;
// let webRootDir = resolve(__dirname, '../');



module.exports = {
    entry: { // 入口文件，打包通过入口，找到所有依赖的模块，打包输出
        main: resolve(webRootDir, './src/main.js'),
    },
    output: {
        path: resolve(webRootDir, './build'), // 输出路径
        publicPath: '/build/', // 公共资源路径
        filename: '[name].js' // 输出文件名字，此处输出main.js, babel-polyfill.js ,  视情况可以配置[name].[chunkhash].js添加文件hash, 管理缓存
    },
    module: {
        rules: loader //模块化的loader，有对应的loader，该文件才能作为模块被webpack识别
    },

    resolve: webpackResolve,


    devServer: { // webpack-dev-server 热加载的配置
        host: '127.0.0.1', //本地ip, 如需局域网内其他及其通过ip访问，配置"0.0.0.0"即可
        port: 8080,
        disableHostCheck: true,
        historyApiFallback: true,
        noInfo: true,

        proxy: {
            '/api/': {
                target: 'http://127.0.0.1:80',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        },
    },

    performance: {
        hints: false
    },

}

module.exports.devtool = '#source-map'

/*插件*/
module.exports.plugins = (module.exports.plugins || []).concat([

    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: `"development"`
        },
        'packageEnv': `"${process.env.NODE_ENV}"`
    }),

])