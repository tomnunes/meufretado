// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var cleanCSS = require('gulp-clean-css');

// Compile Our Sass
gulp.task('styles', function() {
    return gulp.src('./assets/styles/application.scss')
        .pipe(sass({
            includePaths: [
            './assets/components/'
            ]
        }))
        .pipe(concat('styles.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('minify-css', function() {
    return gulp.src('./dist/css/styles.css')
        .pipe(cleanCSS({compatibility: 'ie9'}))
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('scripts', function () {
    gulp.src('./assets/components/scripts/app.js')
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('./dist/js'));

    return gulp.src('./assets/components/jquery/dist/jquery.min.js')
        .pipe(gulp.dest('./dist/js'));
});

// Lint Task
gulp.task('lint', function() {
    return gulp.src('.assets/scripts/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('./assets/scripts/*.js', ['lint', 'scripts']);
    gulp.watch('./assets/styles/**/*.scss', ['styles','minify-css']);
});

// Default Task
gulp.task('default', ['styles','minify-css','scripts']);