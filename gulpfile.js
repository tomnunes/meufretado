// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');

// Compile Our Sass
gulp.task('styles', function() {
    return gulp.src('./assets/styles/var.scss')
        .pipe(sass({
            includePaths: [
            './assets/components/'
            ]
        }))
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('./src/css'));
});

gulp.task('scripts', function () {
    gulp.src('./assets/components/scripts/app.js')
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('./src/js'));

    return gulp.src('./assets/components/jquery/dist/jquery.min.js')
        .pipe(gulp.dest('./src/js'));
});

// Lint Task
gulp.task('lint', function() {
    return gulp.src('.assets/scripts/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('./assets/js/*.js', ['lint', 'scripts']);
    gulp.watch('scss/*.scss', ['styles']);
});

// Default Task
gulp.task('default', ['styles','scripts']);