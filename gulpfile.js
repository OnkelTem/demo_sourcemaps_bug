'use strict';

var path = require('path');
var gulp = require('gulp');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var webserver = require('gulp-webserver');
var connect = require('gulp-connect');

var dest = 'docroot';

gulp.task('browserify', function() {
  return browserify({ entries: ['src/scripts/app.js'], debug: true})
    .bundle()
    .pipe(source('js/main.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    // #1
    .pipe(sourcemaps.write('./', { includeContent: false, sourceRoot: './' }))
    // #2
    // .pipe(sourcemaps.write('./', { includeContent: false }))
    .pipe(gulp.dest(dest));
});

gulp.task('htmlcopy', function() {
  return gulp.src('src/html/*')
    .pipe(gulp.dest(dest));
});

gulp.task('server', function() {
  connect.server({
    root: 'docroot',
    port: 39675
  });
});

gulp.task('serve', [
  'htmlcopy',
  'browserify',
  'server'
]);
