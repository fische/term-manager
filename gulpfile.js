var gulp = require('gulp');
var babel = require('gulp-babel');
var eslint = require('gulp-eslint');
var flow = require('gulp-flowtype');
var notify = require('gulp-notify');
var changed = require('gulp-changed');
var clean = require('gulp-clean');
var todo = require('gulp-todo');

gulp.task('todo', function() {
  gulp.src('src/**/*.js')
    .pipe(todo())
    .pipe(gulp.dest('./'));
});

gulp.task('clean', function() {
  return gulp.src('lib', {
    read: false
  })
    .pipe(clean({
      force: true
    }));
});

gulp.task('hint', function() {
  return gulp.src(['src/**/*.js'], {
    write: false
  })
    .pipe(eslint({
      configFile: '.eslintrc',
      useEslintrc: true
    }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('build-dev', ['hint'], function() {
  return gulp.src(['src/**/*.js'])
    .pipe(changed('lib'))
    .pipe(babel({
      sourceMaps: "inline"
    }))
    .pipe(gulp.dest('lib'));
});

gulp.task('build-prod', ['hint', 'clean', 'todo'], function() {
  return gulp.src(['src/**/*.js'])
    .pipe(babel({
      sourceMaps: false,
      compact: true
    }))
    .pipe(gulp.dest('lib'))
    .on('error', notify.onError('<%= error.message %>'));
});

gulp.task('watch', function() {
  return gulp.watch(['src/**/*.js'], ['build-dev']);
});

gulp.task('default', ['build-dev']);
