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
 * @type {number}
 */
const PI = 3.141592653589793;

/**
 *
 */
const math = Math;


export default class Math {

  /**
   *
   * @param num
   * @returns {number}
   */
  static floor(num) {
    return num >= 0 ? ~~(num) : (~~(num) + 1) * -1;
  }


  /**
   * Math.round
   * @param num {number}
   * @returns {number}
   */
  static round(num) {
    return (num * 2 | 0) - (num | 0);
  }


  /**
   * Math.abs
   * @param num {number}
   * @returns {number}
   */
  static abs(num) {
    return (num ^ ( num >> 31)) - (num >> 31);
  }


  /**
   * Math.ceil
   * @param num {number}
   * @returns {number}
   */
  static ceil(num) {
    if (num < 0) {
      return ~~(num);
    } else {
      return (num == this.floor(num)) ? num : this.floor(num + 1);
    }
  }


  /**
   * Math.pow
   * @param base     {number}
   * @param num   {number}
   * @returns {number}
   */
  pow(base, num) {
    if (num >= 1) {
      var _m = 1;
      for (var _i = 0; _i < num; _i++) {
        _m *= base;
      }
      return _m;
    } else if (num === 0) {
      return 1;
    }
  }


  /**
   *
   * @param min
   * @param max
   * @returns {*}
   */
  static random(min, max) {
    if (max === null) {
      max = min;
      min = 0;
    }
    return min + math.floor(math.random() * (max - min + 1));
  }


  /**
   * minからmaxの間のrangeの乱数を返す
   * @param min
   * @param max
   * @param rounded
   * @returns {number}
   */
  static getRandomNumber(min, max, rounded) {
    if (rounded === null || typeof rounded === 'undefined') {
      rounded = true;
    }
    let randomNum = this.random(min, max);
    return rounded ? this.round(randomNum) : randomNum;
  }


  /**
   * 引数aまでの偶数の乱数を生成
   * @param num {number}
   * @returns {number}
   */
  static getEvenRandomNumber(num) {
    if (num & 1) num -= 1;
    return this.floor(math.random() * (num * .5 + 1)) * 2;
  }

  /**
   * 引数aまでの奇数の乱数を生成
   * @param num {number}
   * @returns {number}
   */
  static getOddRandomNumber(num) {
    if (!(num & 1)) num -= 1;
    return this.floor(math.random() * this.floor(num * .5 + 1)) * 2 + 1;
  }


  /**
   * 奇数のみの配列を返す
   * @param array
   * @returns {Array}
   */
  static getOddArray(array) {
    var _odds = [];
    for (var _i = 0, _num = array.length; _i < _num; _i++) {
      if (this.isOdd(array[_i])) {
        _odds.push(array[_i]);
      }
    }
    return _odds;
  }

  /**
   * 偶数のみの配列を返す
   * @param array
   * @returns {Array}
   */
  static getEvenArray(array) {
    var _evens = [];
    for (var _i = 0, _num = array.length; _i < _num; _i++) {
      if (this.isEven(array[_i])) {
        _evens.push(array[_i]);
      }
    }
    return _evens;
  }


  /**
   * 配列からtargetの近似値を求めて返す
   * @param target    {number}
   * @param array     {array}<T>
   * @return {number}
   */
  static getApproximateNumber(target, array) {
    var _result = 0, _abs = 0, _preAbs = -1;
    for (var _i = 0, _num = array.length; _i < _num; _i++) {
      _abs = this.abs(target - array[_i]);
      if (_abs < _preAbs) _result = array[_i];
      _preAbs = _abs;
    }
    return _result;
  }


  /**
   * Math.max
   * @param num1 {number}
   * @param num2 {number}
   * @returns {number}
   */
  static max(num1, num2) {
    return (num1 > num2) ? num1 : num2;
  }

  /**
   * Math.min
   * @param num1 {number}
   * @param num2 {number}
   * @returns {number}
   */
  static min(num1, num2) {
    return (num1 < num2) ? num1 : num2;
  }


  /**
   * 配列内の最大値を返す
   * @param array Array<number>
   * @returns {number}
   */
  static getMax(array) {
    var _num = array.length;
    if (_num === 1) {
      return array[0];
    }
    var _max = array[0], _value = 0;
    for (var _i = 0; _i < _num; _i++) {
      _value = array[_i];
      if (_max < _value) _max = this.max(_max, _value);
    }
    return _max;
  }


  /**
   * 奇数かどうか
   * @param num {number}
   * @returns {boolean}
   */
  static isOdd(num) {
    return (num & 1) == 1;
  }

  /**
   * 偶数かどうか
   * @param num {number}
   * @returns {boolean}
   */
  static isEven(num) {
    return (num & 1) == 0;
  }


  /**
   *
   * @param num
   * @returns {number}
   */
  static not(num) {
    return ~~num + 1;
  }

  /**
   *
   * @param num1
   * @param num2
   * @returns {number}
   */
  static percent(num1, num2) {
    return (num1 / num2) * 100;
  }

  /**
   *
   * @param num1
   * @param num2
   * @returns {*}
   */
  static add(num1, num2) {
    return num1 + num2;
  }

  /**
   *
   * @param num
   * @returns {*}
   */
  static double(num) {
    return num << 1;
  }

  /**
   *
   * @param num
   * @returns {*}
   */
  static half(num) {
    return num >> 1;
  }


  /**
   * 階乗を求めて返す
   * @param num {number}
   * @returns {number}
   */
  static factorial(num) {
    if (num == 1) return 1;
    return num * this.factorial(num - 1);
  }

  /**
   *
   * @param angle
   * @returns {number}
   */
  static changeToRadian(angle) {
    return angle * PI / 180;
  }

  /**
   *
   * @param radian
   * @returns {number}
   */
  static changeToDegree(radian) {
    return radian * 180 / PI;
  }


  /**
   * 2点間の座標からの角度をもとめて返す
   * @param dx    {number}    x座標
   * @param dy    {number}    y座標
   * @returns {number}
   */
  static getAgreeByPoints(dx, dy) {
    return this.atan2(dy, dx) * 180 / PI;
  }


  /**
   * numberの配列内の合計値をnumberで返す
   * @param array {array}<number>
   * @returns {number}
   */
  static arraySum (array) {
    var _num = array.length, _result = 0;
    while (_num--) {
      _result += array[_num] || 0;
    }
    return _result;
  }


  /**
   *
   * @param bytes
   * @returns {*}
   */
  static bytesToSize(bytes) {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return 0;
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    if (i == 0) return bytes + '' + sizes[i];
    return (bytes / Math.pow(1024, i)).toFixed(1) + '' + sizes[i];
  }
}
