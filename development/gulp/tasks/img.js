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
  let rimraf = require('rimraf');
  let pngquant = require('imagemin-pngquant');


  /*******************************************************************
   * [ path ]
   ******************************************************************/
  let app = config.path.app;
  let dev = config.path.dev;
  let assets = app + config.path.assets;
  let img = assets + config.path.img;


  /*******************************************************************
   * [ task ]
   ******************************************************************/
  gulp.task('img', function () {

    let g;

    rimraf(img, function () {

      //gulp.run('copy:gif');

      g = gulp.src(dev + config.path.img + '**/*.+(jpg|jpeg|png|svg)')
        .pipe($.imagemin({
          optimizationLevel: 7,
          progressive: false,
          svgoPlugins: [{removeViewBox: false}]
        }))
        .pipe(gulp.dest(img));
    });


    return g;
  });


}());

