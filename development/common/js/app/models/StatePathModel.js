/**
 * fileOverview:
 * Project:
 * File:
 * Date:
 * Author:
 */


/**
 *
 * @param path
 * @returns {*}
 * @private
 */
let sanitize = (path) => {
  if (path.indexOf('/') === 0) {
    path = path.substr(1);
  }
  return path;
};

/**
 *
 * @param path
 * @returns {Array|*}
 * @private
 */
let pathToArray = (path) => {
  return path.split('/');
};

/**
 *
 * @param a
 * @param b
 * @returns {*}
 * @private
 */
let filterPath = (a, b) => {
  return a.filter(function (item) {
    return b.indexOf(item) < 0;
  });
};


export default class StatePathModel {
  /**
   *
   */
  constructor() {
    this._path = '';
    this._lastPath = '';
    this.serialList = null;
    this.stateHistory = [];
    this.stateList = [];

    this.reset();

  }

  /**
   *
   */
  reset() {
    this._path = '';
    this._lastPath = '';
    this.serialList = null;
    this.stateHistory = [];
    this.stateList = [];
  }


  /**
   *
   */
  getCurrentPath() {
    return this._path || [];
  }


  /**
   *
   * @returns {*|Array.<T>|{value, writable, configurable}}
   */
  splice() {
    var _splice = this.serialList.splice(0, 1);
    this.stateList.splice(0, 1);
    return _splice;
  }


  /**
   *
   * @param path
   */
  setReserve(path) {
    var _self = this;

    this.serialList = [];

    if (this._lastPath === path) {
      return false;
    }

    this._path = sanitize(path);
    this._path = pathToArray(this._path);

    var exitPath = filterPath(this.stateHistory, this._path);
    var enterPath = filterPath(this._path, this.stateHistory);

    exitPath.reverse();

    exitPath.forEach(function (exit) {
      var obj = {};
      obj[exit] = true;
      _self.serialList.push(obj);
    });

    enterPath.forEach(function (enter) {
      var obj = {};
      obj[enter] = false;
      _self.serialList.push(obj);
    });

    this._lastPath = path;
    this.stateHistory = this._path;

    return {
      from: this.serialList[0],
      to: this.serialList[this.serialList.length - 1]
    };
  }


  /**
   *
   * @returns {boolean}
   */
  hasList() {
    return this.stateHistory.length > 0;
  }


  /**
   *
   * @returns {Array.<T>}
   */
  getCurrentState() {
    return [].concat(this.stateHistory.reverse());
  }


  /**
   *
   * @returns {Array.<T>}
   */
  getSerialList() {
    return [].concat(this.serialList);
  }


  /**
   *
   * @param state
   */
  push(state) {

    var _index = this.stateList.indexOf(state);

    if (_index < 0) {
      this.stateList.push(state);
    }
  }


  /**
   *
   * @param index
   */
  prop(index) {
    this.stateList.splice(index || this.stateList.length - 1, 1);
  }


  /**
   *
   * @param index
   * @returns {*}
   */
  getState(index) {
    var state = this.stateList[index];
    this.prop(index);

    return state;
  }
}
