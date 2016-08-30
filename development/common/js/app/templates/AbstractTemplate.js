/**
 * fileOverview:
 * Project:
 * File:
 * Date:
 * Author:
 */



'use strict';


/**
 *
 * @type {string}
 */
const NAME = 'AbstractTemplate';


export default class AbstractTemplate {
  static get template() {
    return '<div></div>';
  }

  /**
   *
   * @returns {string}
   */
  get NAME() {
    return NAME;
  }
}

