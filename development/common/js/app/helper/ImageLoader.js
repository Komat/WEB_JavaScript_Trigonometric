/**
 * fileOverview:
 * Project:
 * File:
 * Date:
 * Author:
 */


'use strict';


import GetTypeOf from "../utils/GetTypeOf";
import PubSub from "../events/PubSub";

export default class ImageLoader extends PubSub {

  /**
   *
   * @returns {string}
   */
  static get LOAD() {
    return 'img_load';
  }


  /**
   *
   * @returns {string}
   */
  static get CHANGE() {
    return 'img_change';
  } 

  /**
   *
   * @returns {string}
   */
  static get LOAD_COMPLETE() {
    return 'img_load_complete';
  }


  constructor() {
    super();
    this.urlList = [];
    this.sizeList = [];
    this.urlLength = -1;
    this.count = 0;
  }


  /**
   *
   * @param url
   */
  add(url) {
    if (GetTypeOf.isNull(url) || GetTypeOf.isUndefined(url)) {
      throw new Error('引数がnullまたはundefinedです。');
    }

    if (Array.isArray(url)) {
      var self = this;
      url.forEach(function (singleUrl) {
        self._add(singleUrl);
      });
    } else {
      this._add(url);
    }
  }


  /**
   *
   * @param url
   * @private
   */
  _add(url) {
    this.urlList.push(url + '?did=' + Date.now());
    this.urlLength += 1;
  }

  /**
   *
   */
  start() {
    this.load();
  }


  /**
   *
   * @param index
   * @private
   */
  _loadComplete(index) {

    this.count += 1;

    if (this.count === this.urlList.length) {
      this._completeTrigger();
    }

  }


  load() {
    if (this.count >= 0 && this.count <= this.urlList.length - 1) {
      let img = new Image();
      img.onload = function (_img) {
        this.sizeList[this.urlList[this.count]] = {
          width: _img.width,
          height: _img.height
        };
      }.bind(this, img);
      img.src = this.urlList[this.count];
      this.count++;
      this.load();
    } else {

      this.trigger(ImageLoader.LOAD_COMPLETE, {
        urlList: this.urlList,
        sizeList: this.sizeList
      }, this);

    }
  }


  /**
   *
   * @private
   */
  _completeTrigger() {
    this.trigger(ImageLoader.LOAD, {
      urlList: this.urlList,
      sizeList: this.sizeList
    }, this);
  }


  /**
   *
   * @returns {Array.<T>}
   */
  getCurrentList() {
    return this.urlList.slice(0);
  }


  /**
   * 指定したURLのwidth / heightを返す
   * @param url
   * @returns {*}
   */
  getSizeList(url) {
    return this.sizeList[url];
  }


  /**
   * ためこんでいたキューを全て削除
   */
  reset() {
    this.urlList = [];
    this.sizeList = [];
    this.urlLength = 0;
    this.count = 0;
  }


  /**
   *
   * @param func
   */
  one(func) {
    super.one(ImageLoader.LOAD_COMPLETE, func);
  }


  /**
   *
   * @param func
   */
  on(func) {
    super.on(ImageLoader.LOAD_COMPLETE, func);
  }


  /**
   *
   * @param func
   */
  off(func) {
    super.off(ImageLoader.LOAD_COMPLETE, func);
  }
}
