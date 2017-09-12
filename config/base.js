exports.loader =
    [ //模块化的loader，有对应的loader，该文件才能作为模块被webpack识别
        {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        }, {
            test: /\.(png|jpg|jpeg|gif|ico|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 8192 // 小于 8k 的图片，会被编码成为base64内联，减少请求量
                }
            }]
        }, {
            test: /\.(css|scss)$/,
            use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
        },
    ];

