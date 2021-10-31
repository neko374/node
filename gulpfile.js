// 引入gulp
var gulp = require("gulp")
var less = require("gulp-less")
var cssnano = require("gulp-cssnano");
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var connect = require("gulp-connect");
var clean = require('gulp-clean');
var sequence = require('run-sequence');
var obfuse = require('gulp-obfuscate');

// 1.gulp.task()
// =>定义一个gulp任务，gulp.task("任务名称",任务处理函数)
// gulp.task("hello",function({
// console.log("hello world");
// }))

// hello
gulp.task("hello", function () {
    console.log("hello world");
})
// 复制
gulp.task("copyImg", function () {
    // 先拿到src/img;复制：放到dist/src
    gulp.src("./src/img/**").pipe(gulp.dest("./dist/img"))
})
gulp.task("copyJson", function () {
    // 先拿到src/json;复制：放到dist/src
    gulp.src("./src/data/**").pipe(gulp.dest("./dist/data"))
})

// less转成css
gulp.task("less", function () {
    // 先拿到src/less;转成css;放到dist/css
    gulp.src("./src/less/*.less").pipe(less()).pipe(gulp.dest("./dist/css"))
})

//压缩css 
gulp.task("dssnano", function () {
    return gulp.src("./src/css/*.css")
        .pipe(cssnano())
        .pipe(gulp.dest("./dist/css"));
});

// 合并文件gulp-concat，把多个类型相同的文件合并成同一个
gulp.task('jsConcat', function () {
    return gulp.src('./src/js/*.js')
        .pipe(concat('all.js'))//合并后的⽂件名 
        .pipe(gulp.dest('./dist/js'));gulp
});

// 压缩js gulp-uglify
gulp.task("textUglify", function () {
    return gulp.src('./src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'));
});

// 压缩html gulp-htmlmin
gulp.task("htmlmin", function () {
    var options = {
        removeComments: true,//是否清除注释 
        collapseWhitespace: true,//是否清除所有空格
        collapseBooleanAttributes: true,//是否去掉所有布尔属性的值<input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//是否去掉所有空属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//去掉script标签的type属性，type="text/javascript"
        removeStyleLinkTypeAttributes: true,//去掉<style>和<link>标签的type属性，type="text/css"
        minifyJS: true,//压缩⻚⾯上的js
        minifyCSS: true//压缩内联css
    }
    return gulp.src('./src/*.html')
        .pipe(htmlmin(options))
        .pipe(gulp.dest('./dist'));
})

// 浏览器同步 gulp-connect
gulp.task("server", function () {//配置热加载更新服务器
    connect.server({
        root: "./dist",//指定服务器根目录
        livereload: true, //是否允许热更新
        port: 8030
    })
})

gulp.task("watch", function () {
    gulp.watch("./dist/**/*.*", ["reload"])//监听dist下所欲子目录下的所有文件
})

gulp.task("reload", function () {
    return gulp.src("./dist/*.html")
        .pipe(connect.reload());
})

// 组合任务，同时执行server和watch
gulp.task("default", ["server", "watch"], function () {

});

// 清空dist目录，gulp-clean
gulp.task("clean", function () {
    console.log('清空dist⽬录');
    return gulp.src('./dist/', { //清空之前禁止读取该目录
        read: false
    }).pipe(clean({
        force: true //强制清空
    }))
})

// 多任务按顺序执行，run-sequence,先清空，再依次执行打包任务
gulp.task("sequence", function (callback) {
    sequence('clean', 'copyImg', 'copyJson', 'less', 'dssnano', 'jsConcat', 'textUglify', 'htmlmin', callback)
})

// 混淆js
gulp.task('obfuse', function () {
    return gulp.src('./dist/js/all.js')
        .pipe(obfuse())
        .pipe(gulp.dest('./dist/js'));
});