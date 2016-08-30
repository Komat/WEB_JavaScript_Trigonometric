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
 * @param str
 * @returns {boolean}
 */
let getIsString = (str) => {
  return (typeof str === 'string' || str instanceof String );
};


export default class Math {

  /**
   *
   * @param str
   * @returns {boolean}
   */
  static isHiragane(str) {
    if (!getIsString(str)) {
      str = String(str);
    }
    return /^[ぁ-ん|ー]+$/.test(str);
  }


  /**
   * 全てカタカナかどうか
   * @param str   {string}
   * @returns {boolean}
   */
  static isKatakana(str) {
    if (!getIsString(str)) {
      str = String(str);
    }
    return /^[ァ-ロワヲンー ｧ-ﾝﾞﾟ|^　|]*$/.test(str);
  }


  /**
   * 日本の郵便番号かどうかxxxyyyy or xxx-yyyyが形式
   * @param str   {string}
   * @returns {boolean}
   */
  static isJPZipCode(str) {
    if (!getIsString(str)) {
      str = String(str);
    }
    return /^\d{3}-|−?\d{4}$/.test(str);
  }


  /**
   * 日本の携帯番号かどうか
   * @param str   {string}
   * @returns {boolean}
   */
  static isCellPhoneNumber(str) {
    if (!getIsString(str)) {
      str = String(str);
    }
    return /^\d{3}-?\d{4}-?\d{4}$/.test(str);
  }


  /**
   * e-mailの形式かどうか
   * @param str   {string}
   * @returns {boolean}
   */
  static isEmail(str) {
    if (!getIsString(str)) {
      str = String(str);
    }
    return /^[a-zA-Z0-9!$&*.=^`|~#%'+\/?_{}-]+@([a-zA-Z0-9_-]+\.)+[a-zA-Z]{2,4}$/.test(str);
  }


  /**
   * 文字列にハイフンが含まれてるかどうか
   * @param str   {string}
   * @returns {boolean}
   */
  static hasHyphen(str) {
    if (!getIsString(str)) str = String(str);
    return /-|−/.test(str);
  }

  /**
   * 全角文字が含まれてるかどうか
   * @param str
   * @param bool
   * @returns {boolean}
   */
  static hasMultiByteString(str) {
    if (!getIsString(str)) {
      str = String(str);
    }
    //if(bool === null) bool = true;
    var _c = 0, _has = false;
    for (var _i = 0, _num = str.length; _i < _num; _i++) {
      _c = str.charAt(_i);
      if ((_c >= 0x0 && _c < 0x81) || (_c === 0xf8f0) || (_c >= 0xff61 && _c < 0xffa0) || (_c >= 0xf8f1 && _c < 0xf8f4)) {
        //if(!bool) return true;
        //return false;
      } else {
        //if(bool) return true;
        //return true;
        _has = true;
        break;
      }
    }
    //return false;
    return _has;
  }


  /**
   * 半角 & 全角の数字をふくんでるかどうか
   * @param str   {string}
   * @returns {boolean}
   */
  static hasNumberChar(str) {
    if (!getIsString(str)) {
      str = String(str);
    }
    return /[0-9 ０-９]/.test(str);
  }

  /**
   * 閏年かどうか
   * @param year  {number}
   * @returns {boolean}
   */
  static isLeapYear(year) {
    return new Date(year, 1, 29).getMonth() === 1;
  }


  /**
   * 全角の英数を半角にする
   * @param str   {string}
   * @returns {string}
   */
  static convertToSingleChar(str) {
    if (!getIsString(str)) {
      str = String(str);
    }
    if (!this.hasMultiByteString(str)) return str;
    return str.replace(/[Ａ-Ｚａ-ｚ０-９！-～]/g, function (s) {
      return String.fromCharCode(this.charCodeAt(0) - 0xFEE0);
    });
  }


  /**
   * 文字列の先頭 or 末尾にspaceがあるかどうか
   * @param str   {string}
   * @returns {boolean}
   */
  static hasSpaceAtFirstEnd(str) {
    if (!getIsString(str)) {
      str = String(str);
    }
    return /^\s+|\s+$/g.test(str);
  }

  /**
   * 文字列の先頭 & 末尾にspaceがあれば削除する
   * @param str
   * @returns {*}
   */
  static trimSpaceFromFirstEnd (str) {
    if (!getIsString(str)) {
      str = String(str);
    }
    return (!this.hasSpaceAtFirstEnd(str)) ? str : str.replace(/^\s+|\s+$/g, '');
  }
}
