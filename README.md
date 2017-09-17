# webpack-simple-template

## 集成功能

### 基本
1. 图片请求压缩，小于8k的图片用base64编码内联。
2. scss 预编译，postcss autoprefixer 向下兼容处理
3. babel es6 编译,支持对象解构赋值`...`语法


### 开发环境
0. webpack-dev-server 热加载页面。
1. devServer.proxy 请求代理转发，解决开发环境前后端交互问题

### 生产环境
0. `ExtractTextPlugin` css文件抽离打包，抽离css文件到单独的样式文件中。
1. `HtmlWebpackPlugin` html模板：html文件根据html模板文件打包生成。
2. 代码混淆加密压缩。

