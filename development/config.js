/* global module */

(function (module) {

  'use strict';

  /*******************************************************************
   * [ import ]
   ******************************************************************/
  let pkg = require('./package.json');
  let banner = require('./gulp/conf/_banner.js');
  let device = require('./gulp/conf/_device.js');


  /*******************************************************************
   * [ flag ]
   ******************************************************************/
  let isDebug = true;

  let mainDeviceSP = false;


  /*******************************************************************
   * [ path ]
   ******************************************************************/
  const PC = 'pc/';

  const SP = 'sp/';


  // express サーバーを走らせるか
  let isRunServer = false;


  let path = {
    common: './common/',
    pc: PC,
    sp: SP,
    dev: './' + (device.isPC ? PC : SP),
    app: '../production/' + (!mainDeviceSP ? (device.isPC ? '' : SP) : (device.isPC ? PC : '')),
    assets: 'assets/',
    scss: 'scss/',
    img: 'img/',
    sprite: 'sprite/',
    font: 'font/',
    css: 'css/',
    js: 'js/',
    jsLibs: './common/js/libs/',
    update: function () {
      this.dev = './' + (device.isPC ? PC : SP);
      this.app = '../production/' + (!mainDeviceSP ? (device.isPC ? '' : SP) : (device.isPC ? PC : ''));
    }
  };


  /*******************************************************************
   * [ js libs ]
   ******************************************************************/
  const JS_LIBS_PATH = path.jsLibs;

  /**
   *
   * @type {{all: *[], gns: *[]}}
   */
  let jsLibs = {
    all: [
      JS_LIBS_PATH + 'TweenMax.min.js',
      JS_LIBS_PATH + 'soundjs-0.6.2.min.js',
      JS_LIBS_PATH + 'preloadjs-0.6.2.min.js'
    ]
  };


  /**
   *
   * @type {*[]}
   */
  let spriteData = [
    {dir: 'icon', name: 'icon'},
    {dir: 'freeze', name: 'freeze'}
  ];



  /*******************************************************************
   * [ export ]
   ******************************************************************/
  module.exports = {
    pkg: pkg,
    path: path,
    isDebug: isDebug,
    device: device,
    banner: banner,
    jsLibs: jsLibs,
    sprite: spriteData,
    isRunServer: isRunServer
  };


}(module));
