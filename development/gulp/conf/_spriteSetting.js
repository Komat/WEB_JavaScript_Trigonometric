/* global module */

(function (module) {

  'use strict';

  let config = require('../../config.js');

  /**
   * パス
   * @type {{}}
   */
  module.exports = {
    format: 'scss',
    scssDestDir: 'scss/sprite',
    padding: 10,
    options: {
    },
    data: config.sprite
  };


}(module));
