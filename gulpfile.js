var gulp = require('gulp');
var babel = require('gulp-babel');
var eslint = require('gulp-eslint');
var flow = require('gulp-flowtype');
var notify = require('gulp-notify');
var changed = require('gulp-changed');
var clean = require('gulp-clean');

gulp.task('clean', function() {
  return gulp.src('lib', { read: false })
          .pipe(clean({ force: true }));
});

gulp.task('hint', function() {
  return gulp.src(['src/**/*.js'], { write: false })
             .pipe(eslint({
               configFile: '.eslintrc',
               useEslintrc: true
             }))
             .pipe(eslint.format())
             .pipe(eslint.failAfterError())
             .on('error', notify.onError('<%= error.message %>'));
});

gulp.task('flow', ['hint'], function() {
  return gulp.src(['src/**/*.js'], { write: false })
             .pipe(flow({
               all: false,
               weak: false,
               killFlow: false,
               beep: false,
               abort: false
             }))
             .on('error', notify.onError('<%= error.message %>'));
});

gulp.task('build-dev', ['hint'], function() {
  return gulp.src(['src/**/*.js'])
             .pipe(changed('lib'))
             .pipe(babel({
               sourceMaps: "inline"
             }))
             .pipe(gulp.dest('lib'));
});

gulp.task('build-prod', ['flow'], function() {
  return gulp.src(['src/**/*.js'])
             .pipe(babel({
               sourceMaps: false,
               compact: true
             }))
             .pipe(gulp.dest('lib'));
});

gulp.task('watch', ['build-dev'], function() {
  return gulp.watch(['src/**/*.js'], ['build-dev']);
});

gulp.task('default', ['build-dev']);
