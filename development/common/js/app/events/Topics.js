/**
 * fileOverview: イベント名リスト
 * Project:
 * File:
 * Date:
 * Author:
 */


'use strict';


export default class Topics {


  /**
   *
   * @returns {string}
   */
  static get SOUND_CAN_PLAN() {
    return 'sound_can_plan';
  }
  

  /**
   *
   * @returns {string}
   */
  static get SOUND_STATUS_CHANGE() {
    return 'sound_status_change';
  }


  /**
   *
   * @returns {string}
   */
  static get SOUND_CHANGE() {
    return 'sound_change';
  }


  /**
   * ローディングの完了
   * @returns {string}
   */
  static get LOADING_COMPLETE() {
    return 'loading_complete';
  }


  /**
   * モデルの更新
   * @returns {string}
   */
  static get MODEL_UPDATE() {
    return 'model_update';
  }

  /**
   * ローディングのターゲットがロード完了されたら発火
   * @returns {string}
   */
  static get LOAD_TARGET_LOADED() {
    return 'load_target_loaded';
  }


  /**
   *  ブロックが変更された際に発火
   * @returns {string}
   */
  static get BLOCK_CHANGE_COMPLETE() {
    return 'block_change_complete';
  }


  /**
   * メニューの開閉状態が変更された際に発火
   * @returns {string}
   */
  static get MENU_TOGGLE() {
    return 'menu_toggle';
  }
};
