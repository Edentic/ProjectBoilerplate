var gulp = require('gulp'),
    livereload = require('gulp-livereload'),
    prefix = require('gulp-autoprefixer'),
    minifyCSS = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    exec = require('gulp-exec'),
    compass = require('gulp-compass'),
    imagemin = require('gulp-imagemin');

var themeDir = '';
var scssDir = themeDir + 'sass/';
var jsDir = themeDir + 'js/';
var cssDir = themeDir + 'stylesheets/';
var test = themeDir + 'css/';
var assetDir = themeDir + 'assets/img/';

function handleError(err) {
    console.log(err.toString());
    this.emit('end');
}

gulp.task('js', function() {
    gulp.src(jsDir + 'vendor/*.js')
        .pipe(concat('lib.js'))
        .pipe(uglify())
        .pipe(gulp.dest(jsDir));

    gulp.src(jsDir + '/plugins/*.js')
        .pipe(concat('plugins.js'))
        .pipe(uglify())
        .pipe(gulp.dest(jsDir));

    gulp.src(jsDir + 'app/*.js')
        .pipe(uglify())
        .pipe(gulp.dest(jsDir + 'min'));
});

gulp.task('compass', function() {
    gulp.src(scssDir + '**/**.scss')
        .pipe(compass({css: cssDir, sass: scssDir})).on('error', handleError)
        .pipe(prefix({ cascade: true }))
        .pipe(minifyCSS())
        .pipe(gulp.dest(cssDir));
});

gulp.task('imageoptim', function() {
    return gulp.src('img/**/*')
        .pipe(imagemin({
            svgoPlugins: [{removeUselessStrokeAndFill: false}]
        }))
        .pipe(gulp.dest(assetDir));
});

gulp.task('watch', function() {
    livereload.listen();
    gulp.watch(scssDir + '**/**.scss', ['compass']);
    gulp.watch([jsDir + 'vendor/*.js', jsDir + 'plugins/*.js', jsDir + 'app/*.js'], ['js']);
    gulp.watch(jsDir + '**.css').on('change', livereload.changed);
});

gulp.task('default', ['js', 'compass', 'imageoptim'], function() {

});