/**
 * fileOverview:
 * Project:
 * File:
 * Date:
 * Author:
 */


'use strict';


/**
 * 数字かどうかをテスト
 * @param arr
 * @returns {boolean}
 * @private
 */
let checkNumber = function (arr) {
  var _flag = true;
  for (var i = 0, j = arr.length; i < j; i += 1) {
    if (!_flag || typeof arr[i] !== 'number') {
      return false;
    }
  }
  return _flag;
};


export default class CookieManager {

  /**
   * 日付を cookie で使用できるようフォーマット
   * @param days
   * @param hours
   * @param minutes
   * @returns {*}
   */
  static getExpDate(days, hours = 0, minutes = 0) {
    let expDate = new Date();
    expDate.setDate(expDate.getDate() + parseInt(days, 10));
    expDate.setHours(expDate.getHours() + parseInt(hours, 10));
    expDate.setMinutes(expDate.getMinutes() + parseInt(minutes, 10));
    return expDate.toGMTString();
  }


  /**
   * 期限を翌日に設定する際のユーティリティー
   * @returns {*}
   */
  static get tomorrow() {
    let dt = new Date();
    dt.setDate(dt.getDate() + 2);
    dt.setHours(-15, 0, 0, 0);
    return dt.toGMTString();
  };


  /**
   *
   * @param offset
   * @returns {string}
   * @private
   */
  static _getCookieVal(offset) {
    let endStr = document.cookie.indexOf(';', offset);
    if (endStr === -1) {
      endStr = document.cookie.length;
    }
    return decodeURI(document.cookie.substring(offset, endStr));
  }


  /**
   *
   * @param name
   * @returns {*}
   */
  static getCookie(name) {
    let arg = name + '=',
      aLen = arg.length,
      cLen = document.cookie.length,
      i = 0,
      j;

    while (i < cLen) {
      j = i + aLen;
      if (document.cookie.substring(i, j) === arg) {
        return CookieManager._getCookieVal(j);
      }

      i = document.cookie.indexOf(' ', i) + 1;
      if (i === 0) {
        break;
      }
    }
    return '';
  };


  /**
   * @param name
   * @param value
   * @param expires
   * @param path
   * @param domain
   * @param secure
   */
  static setCookie(name, value, expires, path, domain, secure) {
    let cookie_val = '';
    cookie_val += name + '=' + encodeURI(value);
    cookie_val += (expires ? '; expires=' + expires : '');
    cookie_val += (path ? '; path=' + path : '');
    cookie_val += (domain ? '; domain=' + domain : '');
    cookie_val += (secure ? '; secure' : '');
    document.cookie = cookie_val;
  }


  /**
   * クッキーを削除
   * @param name
   * @param path
   * @param domain
   */
  static deleteCookie(name, path, domain) {
    var _cookie_val = '';
    if (CookieManager.getCookie(name)) {
      _cookie_val += name + '=';
      _cookie_val += (path ? '; path=' + path : '');
      _cookie_val += (domain ? '; domain=' + domain : '');
      _cookie_val += '; expires=Thu, 01-Jan-70 00:00:01 GMT';
      document.cookie = _cookie_val;
    }
  }
}
