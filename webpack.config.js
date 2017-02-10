var webpack = require("webpack");
var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
const glob = require('glob'); //匹配文件
var config = {
    watch: true, //增量
    //单个入口文件
    entry: {
        index: './src/main.js'
    },
    //打包输出文件
    output: {
        path: './dist/js/', //打包输出的路径
        publicPath: '/js/',
        filename: '[name].js', //打包后的名字
        chunkFilename: '[id].chunk.js'
    },
    babel: {
        presets: ['es2015', "stage-0"]
    },
    vue: {
        loaders: {
            // js: 'babel!eslint-loader',
            css: ExtractTextPlugin.extract('vue-style-loader', 'css-loader'),
            less: ExtractTextPlugin.extract('vue-style-loader', 'css-loader!less-loader'),
            sass: ExtractTextPlugin.extract('vue-style-loader', 'css-loader!sass-loader'),
            stylus: ExtractTextPlugin.extract('vue-style-loader', 'css-loader!stylus-loader'),
            html: 'html-loader'
        }
    },
    eslint: {
        emitWarning: true
    },
    module: {
        preLoaders: [{
            test: /\.(js|jsx)$/, //匹配要处理的文件
            loader: "babel!eslint-loader", //
            exclude: /node_modules/ //排除node module中的文件
        }],
        //加载器配置
        loaders: [{
            test: /\.vue$/,
            loader: 'vue'
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel'
        }, {
            test: /\.(png|gif|jpg)$/,
            loader: 'url-loader?limit=1024&name=[hash:8].[name].[ext]'
        }, {
            test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "url-loader?limit=10000&minetype=application/font-woff"
        }, {
            test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "file-loader"
        }, {
            test: /\.styl$/,
            loader: 'style-loader!css-loader!stylus-loader'
        }, {
            test: /\.less$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader')
        }, {
            test: /\.sass$/,
            loader: 'style-loader!css-loader!sass-loader'
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style-loader', 'style!css')
        }]
    },
    externals: {
        'vue': 'window.Vue'
    },
    // require 省略后缀
    resolve: {
        extensions: ['', '.less', '.js', '.vue'], //.js后缀可省略,自动补全后缀
        alias: {

        }
    },
    plugins: [
        new ExtractTextPlugin('style.css', { // 抽离css样式 [contenthash:6]
            allChunks: true //关闭合并css 文件信息
        }),
        new webpack.optimize.DedupePlugin(), // 去重
        new webpack.NoErrorsPlugin() //允许错误不打断程序
    ]
}

module.exports = config;
