/* global module */

(function (module) {

  'use strict';

  let device = require('./_device.js');

  let pc = 'pc/';

  let sp = 'sp/';


  /**
   * パス
   * @type {{common: string, pc: string, sp: string, dev: string, app: string, assets: string, scripts: {base: string}, scss: string, img: string, css: string, js: string}}
   */
  module.exports = {
    common: './common/',
    pc: pc,
    sp: sp,
    dev: './' + (device.isPC ? pc : sp),
    app: '../production/' + (device.isPC ? '' : sp),
    assets: 'assets/',
    scss: 'scss/',
    img: 'img/',
    sprite: 'sprite/',
    font: 'font/',
    css: 'css/',
    js: 'js/',
    jsLibs: './common/js/libs/'
  };


}(module));
