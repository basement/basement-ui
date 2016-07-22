var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var reload = browserSync.reload;

module.exports = gulp;

gulp.task('browser-sync', function() {
  browserSync({
    port: 4099,
    server: {
      baseDir: "./",
      directory: true
    }
  });
});

gulp.task('sass', function() {
  return gulp.src('src/scss/**/*.scss')
    .pipe(sass({
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(gulp.dest('src/css/'))
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('src/css/'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('bs-reload', function() {
  browserSync.reload();
});

gulp.task('default', ['sass', 'browser-sync'], function() {
  gulp.watch("src/scss/**/*.scss", ['sass', 'bs-reload']);
  gulp.watch("test/*.html", [ 'bs-reload']);
});