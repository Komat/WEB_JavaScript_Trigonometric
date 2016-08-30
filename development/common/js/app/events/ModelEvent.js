/**
 * fileOverview:
 * Project:
 * File:
 * Date:
 * Author:
 */


'use strict';

export default class ModelEvent {

  /**
   *
   * @returns {string}
   */
  static get SETUP() {
    return 'setup';
  }


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
  static get LOAD() {
    return 'load';
  }


  /**
   *
   * @returns {string}
   * @constructor
   */
  static get LOAD_COMPLETE() {
    return 'load_complete';
  }

  /**
   *
   * @returns {string}
   */
  static get COMPLETE() {
    return 'complete';
  }

  /**
   *
   * @returns {string}
   */
  static get COMPLETE_ALL() {
    return 'complete_all';
  }

  /**
   *
   * @returns {string}
   */
  static get CHANGE() {
    return 'change';
  }

  /**
   *
   * @returns {string}
   */
  static get UPDATE() {
    return 'update';
  }

  /**
   *
   * @returns {string}
   */
  static get REFRESH() {
    return 'refresh';
  }

  /**
   *
   * @returns {string}
   */
  static get DELETE() {
    return 'delete';
  }

  /**
   *
   * @returns {string}
   */
  static get DELETE_ALL() {
    return 'delete_all';
  }

  /**
   *
   * @returns {string}
   */
  static get DESTORY() {
    return 'destroy';
  }

  /**
   *
   * @returns {*[]}
   */
  static get eventTypes() {
    return [
      this.LOAD,
      this.COMPLETE,
      this.CHANGE,
      this.UPDATE,
      this.DELETE,
      this.DELETE_ALL
    ];
  }


  /**
   *
   * @param type
   * @returns {string}
   */
  static getCustomEventType(type) {
    return ('model_event_' + type);
  }


  /**
   *
   * @returns {string}
   */
  get Name() {
    return 'ModelEvent'
  }
}
