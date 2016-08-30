(function () {

  'use strict';

  /*******************************************************************
   * [ common ]
   ******************************************************************/
  let config = require('../../config.js');
  let gulp = require('gulp');
  let $ = require('gulp-load-plugins')();


  /*******************************************************************
   * [ variable ]
   ******************************************************************/
  let spriteSetting = require('../conf/_spriteSetting.js');


  /*******************************************************************
   * [ path ]
   ******************************************************************/
  let app = config.path.app;
  let dev = config.path.dev;
  let assets = app + config.path.assets;
  let sprite = dev + config.path.sprite;
  let img = assets + config.path.img;



  /*******************************************************************
   * [ task ]
   ******************************************************************/
  gulp.task('sprite', function () {

    spriteSetting.data.forEach(function (prop) {

      let _dir = (prop.dir !== '' ? prop.dir + '/' : '');
      let srcImage = sprite + _dir + '*.png';

      let spriteData = gulp.src(srcImage)
        .pipe($.spritesmith({
          imgName: prop.name + '.png',
          cssName: '_' + prop.name + '.' + spriteSetting.format,
          imgPath: '../' +  config.path.img + _dir + prop.name + '.png',
          padding: spriteSetting.padding,
          cssFormat: spriteSetting.format,
          cssOpts: {
            cssClass: function (item) {
              if (item.name.indexOf('-hover') !== -1) {
                return item.name.replace('-hover', ':hover');
              } else {
                return item.name;
              }
            }
          },
          cssVarMap: function (sprite) {}
        }));

      spriteData.img.pipe(gulp.dest(img + _dir));
      spriteData.css.pipe(gulp.dest(dev + '/' + spriteSetting.scssDestDir));

    });

  });




}());

