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
const VIEW_EVENT_PREFIX = 'view_event_';

/**
 *
 * @type {RegExp}
 */
const SPACE_REGEXP = /\s/g;

/**
 *
 * @type {RegExp}
 */
const SELECTOR_REGEXP = /\.|#/g;


export default class ViewEvent {

  /**
   *
   * @returns {string}
   */
  static get SETUP_COMPLETE() {
    return 'setup_complete';
  }


  /**
   *
   * @returns {string}
   */
  static get BUILD_COMPLETE() {
    return 'build_complete';
  }


  /**
   *
   * @returns {string}
   */
  static get BEFORE_SHOW() {
    return 'before_show';
  }

  /**
   *
   * @returns {string}
   */
  static get BEFORE_HIDE() {
    return 'before_hide';
  }


  /**
   *
   * @returns {string}
   */
  static get SHOW_COMPLETE() {
    return 'show_complete';
  }


  /**
   *
   * @returns {string}
   */
  static get HIDE_COMPLETE() {
    return 'hide_complete';
  }


  /**
   *
   * @returns {string}
   */
  static get CLICK_MENU() {
    return 'click_menu';
  }


  /**
   * 下記形式のオブジェクトからイベント名を生成
   * {'click .selector': 'methodName'}
   * @param eventName
   * @returns {string}
   */
  static createViewEvent(eventName) {
    return VIEW_EVENT_PREFIX + eventName.replace(SELECTOR_REGEXP, '').replace(SPACE_REGEXP, '_');
  }

  /**
   *
   * @param type
   * @returns {string}
   */
  static getCustomEventType(type) {
    return 'view_event_' + type;
  };


  /**
   *
   * @returns {string}
   */
  get Name() {
    return 'ViewEvent'
  }
}
