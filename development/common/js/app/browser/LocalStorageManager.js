/**
 * fileOverview:
 * Project:
 * File:
 * Date:
 * Author:
 */


'use strict';

import BrowserUtil from './BrowserUtil';
import Module from "../utils/Module";
import CookieManager from "./CookieManager";


/**
 *
 * @type {string}
 */
const CUSTOM_STORAGE_KEY = 'storage_name_DA003614-6F53-29EC-94F5-08734F82FCBC';


let storageData = {};


export default class LocalStorageManager {

  /**
   *
   */
  static init() {

    let data;

    if (!!BrowserUtil.hasLocalStorage) {
      data = window.localStorage.getItem(CUSTOM_STORAGE_KEY);
    } else {
      data = CookieManager.getCookie(CUSTOM_STORAGE_KEY);
    }

    if (data) {
      storageData = Module.JSONParse(data);
    }
  }



  /**
   *
   * @param key
   * @returns {{}}
   */
  static getData(key) {

    let data = {};

    if (Object.prototype.hasOwnProperty.call(storageData, key)) {
      data = storageData[key];
    }

    return data;
  };


  /**
   *
   * @param key
   * @param value
   */
  static setData(key, value) {

    storageData[key] = value;

    let jsonData = Module.JSONParse(storageData);

    if (!!BrowserUtil.hasLocalStorage) {
      window.localStorage.setItem(CUSTOM_STORAGE_KEY, jsonData);
    } else {
      CookieManager.setCookie(CUSTOM_STORAGE_KEY, jsonData, CookieManager.getExpDate());
    }

  }


  /**
   * @param key
   * @param value
   */
  static deleteData(key, value) {

    storageData[key] = value;

    delete storageData[key];

    let keys = Object.keys(storageData);

    if (keys.length > 0) {
      window.localStorage.setItem(CUSTOM_STORAGE_KEY, Module.JSONParse(storageData));
    } else {
      window.localStorage.removeItem(CUSTOM_STORAGE_KEY);
    }


  }
}
