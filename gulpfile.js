'use strict';

var gulp = require('gulp'),
    notify = require('gulp-notify'),
    watch = require('gulp-watch'),
    browserSync = require('browser-sync').create(),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    merge = require('merge-stream');

function onError(err) {
    console.log(err);
    this.emit('end');
}

// --------------------------------------------------- SASS/CSS DEST

var sassInput = './scss/**/*.scss',
    // cssInput = './public/css/*.css',
    devInput = './public/*.html';

// --------------------------------------------------- COMPILE OPTIONS

var sassOptions = {
    errLogToConsole: true,
    outputStyle: 'expanded'
};

// --------------------------------------------------- AUTOPREFIXER OPTIONS

var autoprefixerOptions = {
    browsers: ['last 2 versions', '> 1%', 'Safari 8', 'Firefox ESR']
};

// --------------------------------------------------- SASS TASK

gulp.task('sass', () => {
    return gulp.src('./scss/**/*.scss')
        .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(gulp.dest('./public/css/'));
});

// --------------------------------------------------- BROWSERSYNC TASK (combines 'sass' with 'browsersync')

gulp.task('serve', gulp.series('sass', () => {

    browserSync.init({
        browser: ["chrome"],
        server: {
            baseDir: 'public/'
        },
    });

    gulp.watch(sassInput, gulp.series('sass'));
    gulp.watch(sassInput).on('change', browserSync.reload);
    gulp.watch(devInput).on('change', browserSync.reload);
}));

gulp.task('watch', gulp.series('sass', () => {
    gulp.watch(sassInput, gulp.series('sass'));
}));
