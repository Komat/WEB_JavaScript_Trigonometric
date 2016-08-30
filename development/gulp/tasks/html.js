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


  /*******************************************************************
   * [ task ]
   ******************************************************************/
  gulp.task('html', function () {

    // path 途中でパスを更新する為ローカル変数
    let app = config.path.app;

    return gulp.src(app + '/**/*.orig.html')
      .pipe($.rename(function (path) {
        path.basename = path.basename.replace('.orig', '');
      }))
      .pipe($.htmlmin({
        removeComments: true,
        collapseWhitespace: true
      }))
      .pipe(gulp.dest(app));
  });


}());

