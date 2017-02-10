/**
 * 引入插件
 */
var gulp = require("gulp"); //本地安装gulp所用到的地方
var gutil = require("gulp-util");
var del = require("del"); //删除文件
var less = require('gulp-less'); //less语法
var concat = require("gulp-concat"); //合并
var minifycss = require('gulp-minify-css'); //压缩css
var autoprefixer = require('gulp-autoprefixer'); //自动补全浏览器兼容后缀
var cached = require('gulp-cached'); // 搭配 gulp-remember 可增量编译
var remember = require('gulp-remember'); //搭配 gulp-cached 可增量编译
var plumber = require('gulp-plumber'); //校正报错
var replace = require('gulp-replace'); //替换
var webpack = require("webpack");
var webpackConfig = require("./webpack.config.js"); // 引入webpack js
var connect = require('gulp-connect'); //本地服务
var rest = require('connect-rest');
var config = require('./config'); //端口配置

/**
 *开发路径
 */
var src = {
    html: "src/*.html", // html 文件
    vendor: "src/vendor/**/*", // vendor 目录
    style: "src/static/styles/*/{index,login,ie9}.less", // style 目录下所有less
    icon: "src/static/icon/*",
    doc: "src/static/doc/*",
    font: "src/static/font/*", //font 字体
    lib: "src/static/lib/*", // 公用库
    view: "src/views/**/*.{vue,js,less}", //view目录
    js: "src/*.js", // js
    data: "src/data/*.json", // 数据
    img: "src/static/images/**/*", // 图片
    components: "src/components/**/*"
};

/**
 *开发生成路径
 */
var dist = {
    root: "dist/",
    // html: "dist/js/index.html",
    style: "dist/static/styles/",
    icon: "dist/static/icon/",
    doc: "dist/static/doc/",
    font: "dist/static/font/",
    lib: "dist/js/",
    vendor: "dist/vendor",
    data: "dist/data/",
    img: "dist/static/images/"
};

/**
 * 清除开发目录文件
 */
function clean(done) {
    del.sync(['dist/**/*']);
    done();
}
// exports.clean = clean; //创建清除文件任务

/**
 * 清除发布目录文件
 */
function cleanBin(done) {
    del.sync(bin.root);
    done();
}

/**
 * 复制vendor文件到开发路径
 */
function vendor() {
    return gulp.src(src.vendor)
        .pipe(gulp.dest(dist.vendor));
}
// exports.vendor = vendor; //创建复制插件包任务

/**
 * 复制 本地数据
 */
function data() {
    return gulp.src(src.data)
        .pipe(gulp.dest(dist.data));
}

function icon() {
    return gulp.src(src.icon)
        .pipe(gulp.dest(dist.icon));
}

function doc() {
    return gulp.src(src.doc)
        .pipe(gulp.dest(dist.doc));
}
/**
 * 复制html文件到开发路径
 */
function html() {
    return gulp.src(src.html)
        .pipe(plumber())
        .pipe(cached('html')) // 只传递更改过的文件
        .pipe(replace(/\~\/(\S.*.(js|css|png|jpg|gif))/g, function(match, p1) {
            return config.host + p1
        }))
        .pipe(remember('html')) // 把所有的文件放回 stream
        .pipe(gulp.dest(dist.root))
}

/**
 * 打包样式
 */
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

/**
 * 字体
 */
function font() {
    return gulp.src([src.font])
        .pipe(gulp.dest(dist.font))
}

/**
 * 库
 */
function lib() {
    return gulp.src([src.lib])
        .pipe(gulp.dest(dist.lib))
}

/**
 * error 处理函数
 */
function handleError(err) {
    if (err.message) {
        console.log(err.message)
    } else {
        console.log(err)
    }
    this.emit('end')
}
/**
 * 复制img目录到开发路径
 */
function img() {
    return gulp.src(src.img)
        .pipe(cached('img'))
        .pipe(remember('img'))
        .pipe(gulp.dest(dist.img))
}

/**
 * 复制开发路径文件到生产路径
 */
function copyDist() {
    return gulp.src(dist.root + '**/*')
        .pipe(gulp.dest(bin.root));
}


/**
 * 生产环境
 */

function webpackProduction(done) {
    var config = Object.create(webpackConfig);
    config.plugins = config.plugins.concat(
        new webpack.DefinePlugin({
            // "process.env": {
            //     "NODE_ENV": "production"
            // }
        }),
        //压缩文件
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false //
            },
            sourceMap: true, //这里的soucemap 不能少，可以在线上生成soucemap文件，便于调试
            mangle: true
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

/**
 * 开发环境
 */

var devConfig, devCompiler;
devConfig = Object.create(webpackConfig);
// devConfig.devtool = "source-map";//错误定位，方便调试
devConfig.debug = true;
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


/**
 * gulp 本地服务
 */
function server(done) {
    connect.server({
        root: dist.root,
        port: config.livereload.port || 8080,
        livereload: false,
        middleware: function(connect, opt) {
            return [rest.rester({
                context: "/"
            })]
        }
    });
    done();
}
exports.server = server;
/**
 * 刷新
 */
function reload() {
    return gulp.src('dist/')
        .pipe(connect.reload()); //自动刷新
}

/**
 * 监控事件
 */
function showMessage(text, event) {
    console.log((text + " changed: ").yellow + event.path);
}

function watch() {
    var wHtml = gulp.watch(src.html, gulp.series(html, reload));
    wHtml.on('change', function(event) {
        // console.log(event);
        if (event.type === 'deleted') {
            delete cached.caches.html[event.path];
            remember.forget('html', event.path);
        }

    });
    var wStyle = gulp.watch('src/static/styles/**/*.less', gulp.series(style, reload));
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
        src.view,
        src.js,
        src.components,
        'src/static/lib/*/*.js',
        'src/static/styles/*/*.less',
        'src/*.vue',
        'src/util/*.js',
        'src/locales/*.js'
    ], gulp.series(webpackDevelopment, reload));
}

/**
 * 开发任务
 */
gulp.task("default", gulp.series(
    clean,
    webpackDevelopment,
    gulp.parallel(html, img, style, vendor, data, icon, doc, lib),
    server,
    watch
));
/**
 * 生产任务
 */
gulp.task("build", gulp.series(
    clean,
    webpackProduction,
    gulp.parallel(html, img, style, vendor, data, icon, doc, lib),
    function(done) {
        console.log('build success');
        done();
    },
    watch
));
