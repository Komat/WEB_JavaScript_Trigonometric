(function () {

  'use strict';

  /*******************************************************************
   * [ import ]
   ******************************************************************/
  let config = require('../../config.js');
  let gulp = require('gulp');
  let $ = require('gulp-load-plugins')();

  let pc_version = ['last 2 version', 'ie 9'];
  let sp_version = ['iOS 8', 'Android 4'];

  /*******************************************************************
   * [ task ]
   ******************************************************************/
  gulp.task('css', function () {

    // path 途中でパスを更新する為ローカル変数
    let app = config.path.app;
    let dev = config.path.dev;
    let assets = app + config.path.assets;
    let scss = dev + config.path.scss;
    let css = assets + config.path.css;
    let version =   config.device.isPC ? pc_version : sp_version;



    let g = gulp.src(scss + '/**/*.scss');

    if (config.isDebug) {
      g = g.pipe($.plumber())
        .pipe($.sourcemaps.init())
        .pipe($.sass({
          outputStyle: 'expand'
        }));
    } else {
      g = g.pipe($.sass({
        outputStyle: 'compressed'
      }));
    }

    g = g.pipe($.rename({
      basename: config.pkg.fileName
    }));

    g = g.pipe(
      $.autoprefixer({browsers: version})
    );

    if (config.isDebug) {
      g = g.pipe($.sourcemaps.write());
    }

    return g.pipe($.header(config.banner, {pkg: config.pkg}))
      .pipe(gulp.dest(css));
  });



}());

