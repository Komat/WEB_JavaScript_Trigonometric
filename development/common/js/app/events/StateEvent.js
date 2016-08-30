/**
 * fileOverview:
 * Project:
 * File:
 * Date:
 * Author:
 */


'use strict';


export default class StateEvent {

  /**
   *
   * @returns {string}
   */
  static get CATEGORY_ENTER() {
    return 'category_enter';
  }

  /**
   *
   * @returns {string}
   */
  static get CATEGORY_EXIT() {
    return 'category_exit';
  }

  /**
   *
   * @returns {string}
   */
  static get ENTER_COMPLETE() {
    return 'enter_complete';
  }

  /**
   *
   * @returns {string}
   */
  static get ENTER_BEFORE() {
    return 'enter_before';
  }

  /**
   *
   * @returns {string}
   */
  static get EXIT_COMPLETE() {
    return 'exit_complete';
  }

  /**
   *
   * @returns {string}
   */
  static get EXIT_BEFORE() {
    return 'exit_before';
  }

  /**
   *
   * @returns {string}
   */
  static get CHANGE_BEFORE() {
    return 'change_before';
  }

  /**
   *
   * @returns {string}
   */
  static get CHANGE_COMPLETE() {
    return 'change_complete';
  }

  /**
   *
   * @returns {string}
   */
  static get BACK_STATE() {
    return 'back_state';
  }

  /**
   *
   * @returns {string}
   */
  static get FORCE_STOP() {
    return 'force_stop';
  }

  /**
   *
   * @param type
   * @returns {string}
   */
  static getCustomEventType (type) {
    return 'state_event' + type;
  };

  /**
   *
   * @returns {string}
   */
  get Name() {
    return 'StateEvent'
  }
}
