var gulp = require('gulp');
var connect = require('gulp-connect');
var webpack = require('webpack-stream');
var wb = require('webpack');

var BUILDDIR = 'dist';
gulp.task('watch', function() {
    gulp.watch('src/js/*/*.js', ['webpack', 'reload']);
});

gulp.task('server', function() {
    connect.server({
        root: './dist',
        port: 3000,
        livereload: true
    })
});
/**
 *   CSS处理
 *   Less编译
 */
gulp.task("webpack", function() {
    return gulp.src("src/js/pages/**.js")
        .pipe(webpack({
            entry: {
                main: './src/js/pages/main.js',
            },
            output: {
                filename: '[name].js'
            },
            devtool: 'source-map',
            plugins: [
                new wb.optimize.UglifyJsPlugin({
                    compress: {
                        warnings: false
                    }
                })
            ],
            loaders: [{
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel', // 'babel-loader' is also a legal name to reference
                query: {
                    presets: ['es2015']
                }
            }]
        }))
        .pipe(gulp.dest(BUILDDIR + '/js'))
});
gulp.task("html", function() {
    return gulp.src("src/views/*.*")
        .pipe(gulp.dest(BUILDDIR));
});
gulp.task('reload', function() {
    gulp.src('dist/*.html')
        .pipe(connect.reload());
});
gulp.task("default", function() {
    gulp.start(['webpack', "html"]);
    return gulp.start(['server'], function() {
        console.log("start server ======")
        return gulp.start(['watch'], function() {
            console.log("start watch =========")
        });
    });
})
gulp.task("dist", function() {
    gulp.start(['webpack', 'less', 'html', 'copy']);
})
