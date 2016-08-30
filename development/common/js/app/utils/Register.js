/**
 * Project: src
 * File: Register
 * Date: 2014/11/20
 * Author:
 */


/**
 * 登録リスト用クラス.
 * @param key
 * @param params
 */
let KeyClass = function (key, params) {
  this.key = key;
  this.params = params;
};


export default class Register {
  /**
   *
   */
  constructor() {
    this.register = [];
    this.length = 0;
  }

  /**
   * 登録された対象を返す
   * @param key
   * @returns {*}
   */
  getKey(key) {
    for (var i = 0; i < this.register.length; i++) {
      if (key === this.register[i].key) {
        return this.register[i].params;
      }
    }
    return null;
  }


  /**
   * 登録された対象の格納されているインデックス番号を返す
   * @param key
   * @returns {*}
   */
  getKeyIndex(key) {
    for (var i = 0; i < this.register.length; i++) {
      if (key === this.register[i].key) {
        return i;
      }
    }
    return -1;
  }


  /**
   * @param key
   * @param params
   * @returns {boolean}
   */
  updateParams(key, params) {
    var num = this.getKeyIndex(key);

    if (num > -1) {
      var _params = this.register[num].params;
      this.register[num].params = _.Module.extend(_params, params);
      return true;
    }

    return false;
  }

  /**
   * getKeyFromNumber
   * 登録されたリスト順で対象を返します.
   * @param i
   * @returns {*}
   */
  getKeyFromNumber(i) {
    if (i < this.length && i >= 0) {
      return this.register[i].params;
    } else {
      return null;
    }
  }

  /**
   * リストを返します.
   * @returns {null|*}
   */
  getList() {
    return this.register;
  }

  /**
   * 対象を登録リストへ追加します.第三引数がある場合は指定の並び順に挿入します
   * @param key
   * @param params
   * @param sort
   */
  addKey(key, params, sort) {
    if (sort >= 0) {
      this.register.splice(sort, 0, new KeyClass(key, params));
    }
    else {
      this.register.push(new KeyClass(key, params));
    }
    this.length = this.register.length;
  }


  /**
   * 登録リストから対象を削除します.
   * @param key
   */
  removeKey(key) {
    for (var i = this.register.length - 1; i >= 0; i--) {
      if (key === this.register[i].key) {
        this.register.splice(i, 1);
        this.length = this.register.length;
        break;
      }
    }
  }

  /**
   * 全てのリストを削除します.
   */
  removeAll() {
    this.register = null;
    this.register = [];
    this.length = 0;
  };

}
