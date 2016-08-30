/* global module */

(function (module) {

  'use strict';


  /**
   *
   * @type {string}
   */
  const SP = 'SP';

  /**
   *
   * @type {string}
   */
  const PC = 'PC';


  /**
   *
   * @type {string}
   */
  let device = [].slice.call(process.argv, 1).indexOf('-sp') > -1 ? SP : PC;

  /**
   * デバイスフラグ PC / SP
   * @type {string}
   */
  module.exports = {
    PC: PC,
    SP: SP,
    type: device,
    isSP: device === SP,
    isPC: device === PC,
    toggle: function () {
      this.type = device !== SP ? SP : PC;
      this.isSP = this.type === SP;
      this.isPC = this.type === PC;
    }
  };

}(module));
