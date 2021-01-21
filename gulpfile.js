const gulp = require("gulp") ;
const sass = require("gulp-sass");
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
const notifier = require('node-notifier');
const c = require('ansi-colors');


sass.compiler = require('node-sass');

function myError(err) {
console.log( c.red(err.messageFormatted) )

notifier.notify({
  title: 'Error in SASS',
  message: err.messageFormatted
});
}

const server = function(cb) {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    cb();
};


const css = function(){
    return gulp.src('./scss/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
        outputStyle: "expanded" //compressed, compact, expand
    }).on('error', myError))
    .pipe(autoprefixer({
            cascade: false
        }))

    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream())
}

const watch = function (){
    gulp.watch('./scss/**/*.scss', gulp.series(css));
    gulp.watch("*.html").on('change', browserSync.reload);
}

exports.css = css;

exports.default = gulp.series(css, server, watch);