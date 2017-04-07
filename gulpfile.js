/*引入插件*/
var gulp = require("gulp"); //本地安装gulp所用到的地方
var less = require('gulp-less'); //less语法
var gutil = require("gulp-util"); // 处理命令行打印工具,常用util.log
var del = require("del"); //删除文件
var concat = require("gulp-concat"); //合并
var minifycss = require('gulp-minify-css'); //压缩css
var autoprefixer = require('gulp-autoprefixer'); //自动补全浏览器兼容后缀
var cached = require('gulp-cached'); // 搭配 gulp-remember 可增量编译
var remember = require('gulp-remember'); //搭配 gulp-cached 可增量编译
var webpack = require("webpack");
var webpackConfig = require("./webpack.config.js"); // 引入webpack js
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var connect = require('gulp-connect'); //本地服务
var rest = require('connect-rest');
var config = require('./config'); //端口配置

/*开发路径*/
var src = {
    html: "src/*.html", // html 文件
    vendor: "src/vendor/**/*", // vendor 目录
    style: "src/assets/styles/*/{index,login,ie9}.less", // style 目录下所有less
    icon: "src/assets/icon/*",
    doc: "src/assets/doc/*",
    font: "src/assets/font/*", //font 字体
    lib: "src/assets/lib/*.js", // 公用库
    view: "src/views/**/*.{vue,js,less}", //view目录
    js: "src/*.js", // js
    lang: "src/lang/*.json", // 数据
    img: "src/assets/images/**/*", // 图片
    components: "src/components/**/*"
};

/*开发生成路径*/
var dist = {
    root: "dist/",
    style: "dist/assets/styles/",
    icon: "dist/assets/icon/",
    doc: "dist/assets/doc/",
    font: "dist/assets/font/",
    lib: "dist/js/",
    vendor: "dist/vendor",
    lang: "dist/lang/",
    img: "dist/assets/images/"
};

/*清除构建目录文件*/
function clean(done) {
    del.sync(['dist/**/*']);
    done();
}
// exports.clean = clean; //创建清除文件任务

/*复制vendor文件到开发路径*/
function vendor() {
    return gulp.src(src.vendor)
        .pipe(gulp.dest(dist.vendor));
}
// exports.vendor = vendor; //创建复制插件包任务

/*复制 本地数据*/
function lang() {
    return gulp.src(src.lang)
        .pipe(gulp.dest(dist.lang));
}

function icon() {
    return gulp.src(src.icon)
        .pipe(gulp.dest(dist.icon));
}

function doc() {
    return gulp.src(src.doc)
        .pipe(gulp.dest(dist.doc));
}

/*样式*/
function style() {
    return gulp.src([src.style])
        // .pipe(cached('style'))
        .pipe(less()) //编译less语法
        .pipe(minifycss()) //压缩css
        .on('error', handleError)
        // 自动补全浏览器 css 前缀
        .pipe(autoprefixer({
            browsers: ['last 2 version'] //支持主流浏览器最近2个版本
        }))
        // .pipe(remember('style'))
        .pipe(gulp.dest(dist.style))
}

/*字体*/
function font() {
    return gulp.src([src.font])
        .pipe(gulp.dest(dist.font))
}

/*库*/
function lib() {
    return gulp.src([src.lib])
        .pipe(gulp.dest(dist.lib))
}

/*error 处理函数*/
function handleError(err) {
    if (err.message) {
        console.log(err.message)
    } else {
        console.log(err)
    }
    this.emit('end')
}
/*复制img目录到开发路径*/
function img() {
    return gulp.src(src.img)
        .pipe(cached('img'))
        .pipe(remember('img'))
        .pipe(gulp.dest(dist.img))
}

/*开发环境*/
var devConfig, devCompiler;
devConfig = Object.create(webpackConfig);
devCompiler = webpack(devConfig);

function webpackDevelopment(done) {
    devCompiler.run(function(err, stats) {
        if (err) {
            throw new gutil.PluginError("webpack:build-dev", err);
            return;
        }
        gutil.log("[webpack:build-dev]", stats.toString({
            children: false, // 关闭抽离css 插件信息
            chunks: false, //关闭输出打包js文件名
            colors: true //颜色
        }));
        done();
    });
}
// exports.webpackDevelopment = webpackDevelopment;

/*生产环境*/
function webpackProduction(done) {
    let config = Object.create(webpackConfig);
    config.output.filename = 'js/[name].[chunkhash:8].js';
    config.output.chunkFilename = 'js/[id].[chunkhash:8].chunk.js';
    config.plugins = config.plugins.concat(
        new webpack.DefinePlugin({
            "process.env": {
                "NODE_ENV": "production"
            }
        }),
        //压缩文件
        new UglifyJSPlugin({
            // 最紧凑的输出
            beautify: false,
            // 删除所有的注释
            comments: false,
            compress: {
                // 在UglifyJs删除没有用到的代码时不输出警告
                warnings: false,
                // 删除所有的 `console` 语句
                // 还可以兼容ie浏览器
                drop_console: true,
                // 内嵌定义了但是只用到一次的变量
                collapse_vars: true,
                // 提取出出现多次但是没有定义成变量去引用的静态值
                reduce_vars: true,
            }
        })
    );

    webpack(config, function(err, stats) {
        if (err) throw new gutil.PluginError("webpack:build", err);
        gutil.log("[webpack:production]", stats.toString({
            chunks: false,
            children: false,
            colors: true
        }));
        done();
    });
}

/*gulp 本地服务*/
function server(done) {
    connect.server({
        root: dist.root,
        port: config.livereload.port,
        livereload: true,
        middleware: function(connect, opt) {
            return [rest.rester({
                context: "/"
            })]
        }
    });
    done();
}
exports.server = server;

/*刷新*/
function reload() {
    return gulp.src('dist/')
        .pipe(connect.reload()); //自动刷新
}

function end(done) {
    console.log('build success');
    done();
}

function watch() {
    var wStyle = gulp.watch('src/assets/styles/**/*.less', gulp.series(style, reload));
    wStyle.on('change', function(event) {
        if (event.type === 'deleted') {
            delete cached.caches.style[event.path];
            remember.forget('style', event.path);
        }
    });
    var wImg = gulp.watch(src.img, gulp.series(img));
    wImg.on('change', function(event) {
        if (event.type === 'deleted') {
            delete cached.caches.img[event.path];
            remember.forget('img', event.path);
        }
    });
    var wDoc = gulp.watch(src.doc, gulp.series(doc));
    wDoc.on('change', function(event) {
        if (event.type === 'deleted') {
            delete cached.caches.doc[event.path];
            remember.forget('doc', event.path);
        }
    });
    var wVendor = gulp.watch(src.vendor, gulp.series(vendor));
    wVendor.on('change', function(event) {
        if (event.type === 'deleted') {
            delete cached.caches.vendor[event.path];
            remember.forget('vendor', event.path);
        }
    });

    gulp.watch([
        src.html,
        src.view,
        src.js,
        src.components,
        'src/assets/styles/*/*.less',
        'src/*.vue',
        'src/util/*.js',
        'src/locales/*.js',
        'src/lang/*.json'
    ], gulp.series(webpackDevelopment, reload));
}

/* 开发任务*/
gulp.task("default", gulp.series(
    clean,
    webpackDevelopment,
    gulp.parallel(img, style, doc, lib, lang),
    server,
    watch
));

/*生产任务*/
gulp.task("build", gulp.series(
    clean,
    webpackProduction,
    gulp.parallel(img, style, doc, lib, lang),
    end
));
