/* global module */

(function (module) {

  'use strict';

  /**
   * ソースのバナー
   * @type {boolean}
   */
    module.exports = '' +
    '/*!\n' +
    ' * @author: <%= pkg.author %> ( <%= pkg.homepage %> )\n' +
    ' * @version: <%= pkg.version %>\n' +
    ' * @license <%= pkg.license %>\n' +
    ' * @Copyright ' + (new Date).getFullYear() + ' \n' +
    ' */\n' +
    '';

}(module));
