(function () {

  'use strict';


  /*******************************************************************
   * [ import ]
   ******************************************************************/
  let config = require('../../config.js');
  let gulp = require('gulp');
  let $ = require('gulp-load-plugins')();


  /*******************************************************************
   * [ variables ]
   ******************************************************************/


  /*******************************************************************
   * [ path ]
   ******************************************************************/
  let app = config.path.app;
  let assets = app + config.path.assets;
  let css = assets + config.path.css;
  let js = assets + config.path.js;
  let img = assets + config.path.img;
  let font = assets + config.path.font;


  /*******************************************************************
   * [ task ]
   ******************************************************************/
  gulp.task('copy:css', function () {
    return gulp.src(css + '*.css').pipe(gulp.dest(config.path.css));
  });

  gulp.task('copy:js', function () {
    return gulp.src(js + '*.js').pipe(gulp.dest(config.path.js));
  });

  gulp.task('copy:img', function () {
    return gulp.src(img + '/**/*').pipe(gulp.dest(config.path.img));
  });

  gulp.task('copy:gif', function () {
    return gulp.src(img + '/**/*.gif').pipe(gulp.dest(config.path.img));
  });

  gulp.task('copy:font', function () {
    return gulp.src(font + "/**/*").pipe(gulp.dest(config.path.font));
  });

  gulp.task('copy', ['copy:css', 'copy:js', 'copy:img', 'copy:font']);


}());

