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
 * @param obj
 */
let toString = (obj) => {
  return {}.toString.call(obj);
};


export default class GetTypeOf {
  /**
   *
   * @param val
   * @returns {boolean}
   */
  static isUndefined(val) {
    return typeof val === 'undefined';
  }

  /**
   *
   */
  static isNull(val) {
    return val === null;
  }

  /**
   *
   * @param val
   */
  static isSet(val) {
    return (!this.isUndefined(val) && !this.isNull(val));
  }


  /**
   *
   */
  static isDOMElement(node) {
    return node.nodeType === 1 || (node !== null && node === node.window);
  }


  /**
   *
   * @type {Function}
   */
  static isElement(el) {
    if (( typeof HTMLElement == 'function' || typeof HTMLElement == 'object' )) {
      return el instanceof HTMLElement;
    } else {
      return el && typeof el == 'object' &&
        el.nodeType == 1 && typeof el.nodeName == 'string';
    }
  }

  /**
   *
   * @param func
   * @returns {boolean}
   */
  static isFunction(func) {
    return typeof func === 'function';
  }


  /**
   *
   * @param obj
   * @returns {boolean}
   */
  static isPlainObject(obj) {
    var result = false;

    if (this.isSet(obj) && this.isObject(obj)) {
      result = !Array.isArray(obj) && !this.isFunction(obj) && !this.isDOMElement(obj);
    }
    return result;
  }

  /**
   * isObject
   *
   * @static
   * @params {Object} obj
   * @return {Boolean}
   */
  static isObject(obj) {
    return obj === Object(obj);
  }


  /**
   * isNumber
   *
   * @static
   * @params {Number} num
   * @return {Boolean}
   */
  static isNumber(num) {
    return ((typeof num === typeof 1) && (null !== num) && isFinite(num));
  }

  /**
   * isString
   *
   * @static
   * @params {String} str
   * @return {Boolean}
   */
  static isString(str) {
    return (typeof str === 'string' ||
    str instanceof String );
  }


  /**
   *
   * @param obj
   * @returns {boolean}
   */
  static isBoolean(obj) {
    return (obj === true ||
    obj === false ||
    toString.call(obj) === '[object Boolean]');
  }


  /**
   *
   * @param arg
   * @returns {boolean}
   */
  static isPrimitive(arg) {
    return (arg === null ||
    typeof arg === 'boolean' ||
    typeof arg === 'number' ||
    typeof arg === 'string' ||
    typeof arg === 'symbol' ||
    typeof arg === 'undefined');
  }


  /**
   *
   * @param obj
   * @returns {boolean}
   */
  static isEmptyObject(obj) {
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        return false;
      }
    }
    prop = null;
    return true;
  }
}
