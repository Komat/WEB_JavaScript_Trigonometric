(function () {

  'use strict';


  /*******************************************************************
   * [ variables ]
   ******************************************************************/
  let gulp = require('gulp');
  let $ = require('gulp-load-plugins')();
  let requireDir = require('require-dir');
  let config = require('./config.js');
  let runSequence = require('run-sequence');
  let browserSync = require('browser-sync').create();
  let server = require('gulp-express');

  requireDir('./gulp/tasks', {recurse: true});

  /*******************************************************************
   * [ browser sync ]
   ******************************************************************/
  let timerId;

  function reload() {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(function () {
      console.log("reload");
      browserSync.reload();
    }, 100);
  }

  function getSequenceTask() {
    var args = arguments;
    return function () {
      return runSequence.apply(null, args);
    }
  }

  gulp.task('reload', function () {
    reload();
  });


  gulp.task('server', ['build'], function () {

    $.notify({ message: ('target type ==> ' + config.device.type)});

    browserSync.init({
      notify: false,
      open: 'external',
      server: {
        baseDir: config.path.app
      }
    });

    if (!!config.isRunServer) {
      server.run(['server.js']);
    }

    gulp.watch(config.path.dev + config.path.js + '/**/*.js', getSequenceTask('js', 'reload'));
    gulp.watch(config.path.dev + config.path.scss + '/**/*.scss', getSequenceTask('css', 'reload'));

    gulp.watch(config.path.common + config.path.js + '/**/*.js',  getSequenceTask('js', 'reload'));
    gulp.watch(config.path.sp + config.path.js + '/**/*.js',  getSequenceTask('js', 'reload'));
    gulp.watch(config.path.common + config.path.scss + '/**/*.scss', getSequenceTask('css', 'reload'));

    gulp.watch(config.path.app + '/**/*.orig.html', getSequenceTask('html', 'reload'));

  });


  gulp.task('_changeDeviceType', function () {
    config.device.toggle();
    config.path.update();
  });


  gulp.task('build', ['css', 'js:libs', 'js', 'html']);

  gulp.task('live', ['server']);

  gulp.task('default', ['live']);

  gulp.task('all', function () {
    return runSequence(
      'build',
      '_changeDeviceType',
      'build'
    );
  });

}());

