const path = require('path'),
    webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const resolve = path.resolve;
const webRootDir = resolve(__dirname, '../');


module.exports = {
    entry: { // 入口文件，打包通过入口，找到所有依赖的模块，打包输出
        main: resolve(webRootDir, './src/main.js'),
    },
    output: {
        path: resolve(webRootDir, './build/assets/'), // 输出路径
        publicPath: '/assets/', // 公共资源路径
        filename: '[name].js' // 输出文件名字，此处输出main.js, babel-polyfill.js ,  视情况可以配置[name].[chunkhash].js添加文件hash, 管理缓存
    },
    module: {
        rules: [ //模块化的loader，有对应的loader，该文件才能作为模块被webpack识别
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }, {
                test: /\.(png|jpg|gif|svg|ico)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            }, {
                test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
                loader: 'file-loader'
            }, {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }, {
                test: /\.scss$/,
                loader: 'style-loader!css-loader!autoprefixer-loader?{browsers:["last 5 version", "Firefox' +
                    ' 15"]}!sass-loader?sourceMap&outputStyle=compressed'
            }
        ]
    },

    resolve: {
        extensions: ['.js'], // 定义后缀名 ，import时可以省略“.js”后缀
        alias: { // 别名。 如 import "./src/style/common.css"  ==> import "style/common.css"
            'components': resolve(webRootDir, './src/components'),
            'page': resolve(webRootDir, './src/page'),
            'style': resolve(webRootDir, './src/style'),
            'script': resolve(webRootDir, './src/script'),
            'static': resolve(webRootDir, './static')
        }
    },

    devServer: { // webpack-dev-server 热加载的配置
        host: '127.0.0.1', //本地ip, 如需局域网内其他及其通过ip访问，配置"0.0.0.0"即可
        port: 8080,
        disableHostCheck: true,
        historyApiFallback: true,
        noInfo: true
    },

    performance: {
        hints: false
    },

}
    
module.exports.devtool = '#source-map'

/*插件*/
module.exports.plugins = (module.exports.plugins || []).concat([

    /*webpack 定义变量，可在其他模块访问到该变量值，以便根据不同环境来进行不同情况的打包操作*/
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: `"development"`
        },
    }),
    /*清除之前打包过的文件*/
    new CleanWebpackPlugin(['*'], {
        root: resolve(webRootDir, './build/'),
        verbose: true,
        dry: false,
        exclude: [],
        watch: false
    }),
    /*HTML模板*/
    new HtmlWebpackPlugin({
        // favicon: resolve(webRootDir, './src/static/ico_pb_16X16.ico' ),
        template:'html-withimg-loader!' + resolve(webRootDir, './html-template/index.html'), //html-withimg-loader 可以将html中img标签打包进输出文件
        filename: resolve( webRootDir, './build/index.html'),
        title: 'XX系统',
        inject: 'head',
    }),
    /*压缩，混淆加密*/
    new webpack.optimize.UglifyJsPlugin({
        // sourceMap: true,

        // 最紧凑的输出
        beautify: false,
        // 删除所有的注释
        comments: false,

        compress: {
            warnings: false,
            // 删除所有的 `console` 语句
            // 还可以兼容ie浏览器
            drop_console: true,
            // 内嵌定义了但是只用到一次的变量
            collapse_vars: true,
            // 提取出出现多次但是没有定义成变量去引用的静态值
            reduce_vars: true,
        }
    }),

    new webpack.LoaderOptionsPlugin({
        minimize: true
    }),
    /*提取公用第三方库*/
/*    new webpack.optimize.CommonsChunkPlugin({
        name: "vendor",
        filename: "vendor.js",
        minChunks: Infinity,
        chunks: ["main"], // 只在 main 的 entry 中使用到 commonChunk
    }),
*/
    

])