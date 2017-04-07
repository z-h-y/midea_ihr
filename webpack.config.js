var webpack = require("webpack");
var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var WebpackMd5Hash = require('webpack-md5-hash');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const glob = require('glob'); //匹配文件

module.exports = {
    // devtool: "#source-map",
    //单个入口文件
    entry: {
        index: './src/main.js'
    },
    //打包输出文件
    output: {
        path: path.resolve(__dirname, 'dist'), //打包输出的路径
        // publicPath: '/js/',
        filename: 'js/[name].js', //打包后的名字
        chunkFilename: 'js/[id].chunk.js'
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        modules: [path.resolve(__dirname, 'node_modules')],
        mainFields: ['jsnext:main', 'main'],
        alias: {
            jquery: path.resolve(__dirname, 'src/assets/lib/jquery/dist/jquery.min.js'),
        }
    },
    module: {
        //noParse可以配置某些包脱离webpack 解析,有些库是自成一体不依赖其他库的没有使用模块化的，比如jquey、momentjs、chart.js
        //noParse:
        //加载器配置
        rules: [{
            test: /\.js$/,
            use: 'babel-loader?cacheDirectory', // ?cacheDirectory 參數有用
            include: path.resolve(__dirname, 'src')
        }, {
            test: /\.vue$/,
            loader: 'vue-loader',
            include: path.resolve(__dirname, 'src'),
            options: {
                loaders: {
                    css: ExtractTextPlugin.extract({
                        use: 'css-loader',
                        fallback: 'vue-style-loader'
                    }),
                    less: ExtractTextPlugin.extract({
                        use: 'css-loader!less-loader',
                        fallback: 'vue-style-loader'
                    }),
                    sass: ExtractTextPlugin.extract({
                        use: 'css-loader!sass-loader',
                        fallback: 'vue-style-loader'
                    }),
                    scss: ExtractTextPlugin.extract({
                        use: 'css-loader!sass-loader',
                        fallback: 'vue-style-loader'
                    }),
                    stylus: ExtractTextPlugin.extract({
                        use: 'css-loader!stylus-loader',
                        fallback: 'vue-style-loader'
                    })
                }
            }
        }, {
            test: /\.css$/,
            include: path.resolve(__dirname, 'src'),
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: "css-loader"
            })
        }, {
            test: /\.less$/,
            include: path.resolve(__dirname, 'src'),
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: "css-loader!less-loader"
            })
        }, {
            test: /\.(png|gif|jp?g)$/,
            include: path.resolve(__dirname, 'src'),
            loader: 'url-loader?limit=1024&name=/images/[hash:8].[name].[ext]'
        }, {
            test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            include: path.resolve(__dirname, 'src'),
            loader: "url-loader?limit=10000&minetype=application/font-woff&name=/font/[hash:8].[name].[ext]"
        }, {
            test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            include: path.resolve(__dirname, 'src'),
            loader: "file-loader?name=/font/[hash:8].[name].[ext]"
        }]
    },

    externals: {
        'vue': 'window.Vue'
    },
    plugins: [
        new WebpackMd5Hash(),
        new ExtractTextPlugin({
            filename: 'js/style.[contenthash:8].css',
            allChunks: true //关闭合并css 文件信息
        }),
        new HtmlWebpackPlugin({
            // title: 用来生成页面的 title 元素
            // filename: 输出的 HTML 文件名，默认是 index.html, 也可以直接配置带有子目录。
            // template: 模板文件路径，支持加载器，比如 html!./index.html
            // inject: true | 'head' | 'body' | false  ,注入所有的资源到特定的 template 或者 templateContent 中，如果设置为 true 或者 body，所有的 javascript 资源将被放置到 body 元素的底部，'head' 将放置到 head 元素中。
            // favicon: 添加特定的 favicon 路径到输出的 HTML 文件中。
            // minify: {} | false , 传递 html-minifier 选项给 minify 输出
            // hash: true | false, 如果为 true, 将添加一个唯一的 webpack 编译 hash 到所有包含的脚本和 CSS 文件，对于解除 cache 很有用。
            // cache: true | false，如果为 true, 这是默认值，仅仅在文件修改之后才会发布文件。
            // showErrors: true | false, 如果为 true, 这是默认值，错误信息会写入到 HTML 页面中
            // chunks: 允许只添加某些块 (比如，仅仅 unit test 块)
            // chunksSortMode: 允许控制块在添加到页面之前的排序方式，支持的值：'none' | 'default' | {function}-default:'auto'
            // excludeChunks: 允许跳过某些块，(比如，跳过单元测试的块)
            // title: '一卡通消费系统',
            filename: 'index.html',
            template: './src/index.html',
            inject: true,
            hash: false,
            minify: {
                removeComments: false,
                collapseWhitespace: false
            }
        }),
        new HtmlWebpackPlugin({
            filename: 'login.html',
            template: './src/login.html',
            inject: true,
            hash: false,
            minify: {
                removeComments: false,
                collapseWhitespace: false
            }
        })
    ]
}
