/**
 * fileOverview:
 * Project:
 * File:
 * Date:
 * Author:
 */


'use strict';


const rValidChars = /^[\],:{}\s]*$/;
const rValidEscape = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;
const rValidTokens = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
const rValidBraces = /(?:^|:|,)(?:\s*\[)+/g;

const base64list = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';


export default class Module {


  /**
   *
   * @param data
   * @returns {*}
   */
  static JSONParse(data) {
    if (typeof data !== 'string' || !data) {
      return null;
    }

    if (rValidChars.test(data.replace(rValidEscape, '@').replace(rValidTokens, ']').replace(rValidBraces, ''))) {
      return window.JSON && window.JSON.parse ? window.JSON.parse(data) : (new Function('return ' + data))();
    }

    return null;
  }


  /**
   *
   * @param json
   * @returns {string}
   * @constructor
   */
  static JSONStringify(json) {

    if ('JSON' in window) {
      return window.JSON.stringify(obj);
    } else {

      let valType = typeof (json);

      if (valType != 'object' || json === null) {

        if (valType == 'string') {
          json = '"' + json + '"';
        }

        return String(json);

      } else {

        let key;
        let val;
        let obj = [];
        let arr = (json && json.constructor == Array);

        for (key in json) {

          if (Object.prototype.hasOwnProperty.call(json, key)) {

            val = json[key];
            valType = typeof(val);

            if (valType == 'string') {
              val = '"' + val + '"';
            } else if (valType == "object" && val !== null) {
              val = JSON.stringify(val);
            }

            obj.push((arr ? '' : '"' + key + '":') + String(val));

          }
        }

        return (arr ? '[' : '{') + String(obj) + (arr ? ']' : '}');

      }
    }
  }


  /**
   *
   * @param json
   * @returns {string}
   */
  static JSONToQueryString(json) {
    return Object.keys(json).map(function (key) {
      return encodeURIComponent(key) + '=' +
        encodeURIComponent(json[key]);
    }).join('&');
  }


  /**
   *
   * @param str
   * @returns {string}
   */
  static base64encode(str) {
    var t = '', p = -6, a = 0, i = 0, v = 0, c;

    while ((i < str.length) || (p > -6)) {
      if (p < 0) {
        if (i < str.length) {
          c = str.charCodeAt(i++);
          v += 8;
        } else {
          c = 0;
        }
        a = ((a & 255) << 8) | (c & 255);
        p += 8;
      }
      t += base64list.charAt(( v > 0 ) ? (a >> p) & 63 : 64);
      p -= 6;
      v -= 6;
    }
    return t;
  }

  /**
   *
   * @param str
   * @returns {string}
   */
  static base64decode(str) {
    var t = '', p = -8, a = 0, c, d;

    for (var i = 0; i < str.length; i++) {
      if (( c = base64list.indexOf(str.charAt(i)) ) < 0)
        continue;
      a = (a << 6) | (c & 63);
      if (( p += 6 ) >= 0) {
        d = (a >> p) & 255;
        if (c != 64)
          t += String.fromCharCode(d);
        a &= 63;
        p -= 8;
      }
    }
    return t;
  }


  /**
   *
   * @param func
   * @param context
   * @returns {*}
   */
  static proxy(func, context) {
    var args, tmp;

    if (typeof context === 'string') {
      tmp = func[context];
      context = func;
      func = tmp;
    }

    if (typeof func !== 'function') {
      return null;
    }

    args = [].slice.call(arguments, 2);

    return function () {
      func.apply(context || this, args.concat([].slice.call(arguments)));
    };
  }


  /**
   *
   * @param func
   * @param context
   */
  static bind(func, context) {
    this.proxy(func, context);
  }


  /**
   *
   * @param obj
   * @returns {*}
   */
  static extend(obj) {
    if (obj !== Object(obj)) {
      return obj;
    }
    var source, prop;
    for (var i = 1, length = arguments.length; i < length; i++) {
      source = arguments[i];
      for (prop in source) {
        if (Object.prototype.hasOwnProperty.call(source, prop)) {
          obj[prop] = source[prop];
        }
      }
    }
    return obj;
  }


  /**
   *
   * @param obj
   * @returns {*}
   */
  static clone(obj) {
    if (obj !== Object(obj)) {
      return obj;
    }

    return Array.isArray(obj) ? obj.slice() : Module.extend({}, obj);
  }


  /**
   *
   * @param func
   * @param wait
   * @returns {number}
   */
  static delay(func, wait) {
    var args = [].slice.call(arguments, 2);
    return setTimeout(function () {
      return func.apply(null, args);
    }, wait || 100);
  }


  /**
   *
   * @param func
   * @param hasher
   * @returns {memoize}
   */
  static memoize(func, hasher) {
    var memoize = function (key) {
      var cache = memoize.cache;
      var address = hasher ? hasher.apply(this, arguments) : key;
      if (cache != null && Object.prototype.hasOwnProperty.call(cache, address)) {
        cache[address] = func.apply(this, arguments);
      }
      return cache[address];
    };
    memoize.cache = {};
    return memoize;
  }


  /**
   * 要素をシャッフルする
   * @param obj
   * @returns {Array}
   */
  static shuffle(obj) {
    var _set = obj && obj.length === +obj.length ? obj : Object.values(obj);
    var length = _set.length;
    var shuffled = new Array(length);
    for (var index = 0, rand; index < length; index++) {
      rand = this.random(0, index);
      if (rand !== index) {
        shuffled[index] = shuffled[rand];
      }
      shuffled[rand] = _set[index];
    }
    return shuffled;
  };


  /**
   *  ランダム UID を取得
   * @returns {string}
   */
  static getUID() {
    var d = new Date().getTime();
    return 'xxxxxxxx-xxxx-xxxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r;
      r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c === 'x' ? r : (r & 0x7 | 0x8)).toString(16);
    }).toUpperCase();
  }


  /**
   * 数値を2桁にして返す
   * @param num
   * @param [base]
   * @returns {string}
   */
  static zeroPadding(num, base) {

    var BASE_NUM = 10;

    base = base || BASE_NUM;

    var maxIndex = (base + '').length;
    var counter = maxIndex - 1;
    var result = '';

    while (counter > 0) {
      result += '0';
      counter -= 1;
    }

    return (result + num).slice(-maxIndex);

  };


  /**
   * 渡された文字列をキャメルケースへ変換（型チェック無）
   * @param str
   * @returns {XML|string|void}
   */
  static camelize(str) {
    return str.replace(/(?:^|[-_])(\w)/g, function (_, c) {
      return c ? c.toUpperCase() : '';
    })
  }


  /**
   *
   * @param obj
   * @returns {Array}
   */
  static makeArray(obj) {
    var ary = [];

    if (Array.isArray(obj)) {
      ary = obj;
    } else if (obj && typeof obj.length === 'number') {
      // convert nodeList to array
      for (var i = 0, len = obj.length; i < len; i++) {
        ary.push(obj[i]);
      }
    } else {
      // array of single index
      ary.push(obj);
    }
    return ary;

  };


  /**
   *
   * @param obj
   * @param ary
   */
  static removeFrom(obj, ary) {
    var index = [].indexOf(ary, obj);
    if (index !== -1) {
      ary.splice(index, 1);
    }
  };


  /**
   *
   * @param str
   * @returns {string}
   */
  static toDashed(str) {
    return str.replace(/(.)([A-Z])/g, function (match, $1, $2) {
      return $1 + '-' + $2;
    }).toLowerCase();
  }


  /**
   *
   * @param str
   * @param val
   * @returns {*}
   */
  static indexOfAll(str, val) {

    var retVal = null;
    var lastIndex = str.indexOf(val);

    if (lastIndex > -1) {
      retVal = [];

      while (lastIndex > -1) {
        retVal.push(lastIndex);
        lastIndex = str.indexOf(val, lastIndex + 1);
      }
    }

    return retVal;
  }


  /**
   *
   */
  noop() {

  }


  /**
   *
   * @param str
   * @returns {*}
   */
  static trim(str) {
    return str.replace(/^\s+|\s+$/g, '');
  }


  /**
   *
   * @param str
   * @returns {*}
   */
  static escapeHTML(str) {
    return str.replace('&', '&amp;').replace('<', '&lt;');
  }


  /**
   *
   * @param str
   * @returns {boolean}
   */
  static isBlank(str) {
    return /^\s*$/.test(str);
  };

  /**
   * aまでのnumberのみの配列を作成して返す
   * @param a {number}
   * @returns {Array}
   */
  static makeNumberArray (a) {
    var _array = [];
    for (var _i = 0; _i < a; _i++) {
      _array[_i] = _i;
    }
    return _array;
  };
}
