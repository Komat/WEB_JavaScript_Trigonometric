(function () {

  'use strict';

  /*******************************************************************
   * [ import ]
   ******************************************************************/
  let config = require('../../config.js');
  let gulp = require('gulp');
  let $ = require('gulp-load-plugins')();


  /*******************************************************************
   * [ variable ]
   ******************************************************************/
  let rimraf = require('rimraf');


  /*******************************************************************
   * [ path ]
   ******************************************************************/
  let app = config.path.app;
  let assets = app + config.path.assets;
  let css = assets + config.path.css;
  let js = assets + config.path.js;
  let img = assets + config.path.img;


  /*******************************************************************
   * [ task ]
   ******************************************************************/
  gulp.task('clean', function (data) {
    rimraf(assets, data);
  });

  gulp.task('clean:js', function (data) {
    rimraf(js, data);
  });

  gulp.task('clean:css', function (data) {
    rimraf(css, data);
  });

  gulp.task('clean:img', function (data) {
    rimraf(img, data);
  });


}());

