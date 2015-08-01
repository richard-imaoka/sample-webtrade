'use strict';

var watchify = require('watchify');
var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var assign = require('lodash.assign');
var babelify = require('babelify');
var uglifyify = require('uglifyify');


gulp.task('watchify', function(){
  var opts = assign({}, watchify.args, { entries: ['./src/javascripts/app.js'], debug: true, verbose: true });

  //Be careful - gulp-browserify plugin is deprecated now
  var watchifyBundler = watchify(browserify(opts));

  //Register transforms and on-event callbacks
  watchifyBundler.transform(babelify);
  watchifyBundler.transform({global: true},uglifyify);
  watchifyBundler.on('update', bundle); // on any dep update, runs the bundler
  watchifyBundler.on('log', gutil.log); // output build logs to terminal
  watchifyBundler.on('error', gutil.log.bind(gutil, 'Browserify Error')) // log errors if they happen

  //bundle() step to be run every time on update
  function bundle() {
    return watchifyBundler
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())  // optional, remove if you don't need to buffer file contents
        .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
        .pipe(sourcemaps.write('./')) // writes .map file
        .pipe(gulp.dest('./dist'));
  }

  return bundle();
});

gulp.task('copy-html-to-dist', function(){
  return gulp.src('./*.html').pipe( gulp.dest('dist') );
});

gulp.task('watch', ['watchify'], function(){
  return gulp.watch('./*.html', ['copy-html-to-dist']);
});