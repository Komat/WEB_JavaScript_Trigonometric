/**
 * fileOverview:
 * Project:
 * File:
 * Date:
 * Author:
 */

import Module from '../utils/Module';
import PubSub from "../events/PubSub";
import ModelEvent from "../events/ModelEvent";

/**
 *
 * @type {string}
 */
const NAME = 'AbstractModel';


/**
 *
 * @type {number}
 * @private
 */
let _idCounter = 0;


/**
 *
 * @type {string}
 */
const ID_PREFIX = 'cid';




/**
 *
 * @param prefix
 * @returns {string}
 */
let uniqueId = (prefix) => {
  let id = (_idCounter += 1) + '';
  return (prefix ? prefix + id : id);
};



export default class AbstractModel extends PubSub {
  constructor() {
    super();
    this._cid = uniqueId(ID_PREFIX);
    this._hasData = false;
    this.attributeCount = 0;
    this._attr = {};
    this._attr.cid = this.cid;
    this._previousAttr = {};
  }

  /**
   *
   */
  setup() {

  }


  /**
   *
   */
  destory() {

  }


  /**
   *
   * @returns {*}
   */
  get cid() {
    return this._cid;
  }



  /**
   *
   * @returns {*}
   */
  getCID() {
    return this._cid;
  }


  /**
   *
   * @param params
   */
  setData(params) {

    let _counter = 0;
    var changeAttr = {};

    for (var prop in params) {
      if (params.hasOwnProperty(prop)) {

        if (prop in this._attr) {
          this._previousAttr[prop] = this._attr[prop];
          changeAttr[prop] = this._attr[prop];
          this.trigger(ModelEvent.UPDATE, {
            data: Module.clone.call(this, this._attr[prop])
          }, this);
        }

        this._attr[prop] = params[prop];
        _counter += 1;

        var _data = {};
        _data[prop] = params[prop];

        this.attributeCount += 1;
        this.trigger(ModelEvent.CHANGE, {
          data: _data
        }, this);
      }
    }

    this.trigger(ModelEvent.COMPLETE, {
      previousAttr: Module.clone.call(this, this._previousAttr),
      currentAttr: Module.clone.call(this, this._attr),
      changeAttr: Module.clone.call(this, changeAttr)
    }, this);

    if (_counter > 0 && !this._hasData) {
      this._hasData = true;
    }
  }


  /**
   *
   * @param attr
   * @returns {*}
   */
  getData(attr) {
    return this._attr[attr];
  }


  /**
   *
   * @returns {*}
   */
  getAllData() {
    return Module.clone.call(this, this._attr);
  }


  /**
   * overfide method
   */
  getCurrentData() {
  }


  /**
   *
   * @returns {number}
   */
  getDataCount() {
    return this.attributeCount;
  }

  /**
   *
   * @param attr
   * @returns {boolean}
   */
  hasData(attr) {
    return (attr in this._attr);
  }


  /**
   *
   * @param attr
   * @returns {boolean}
   */
  deleteData(attr) {
    var _result = false;
    if (this.hasData(attr)) {
      delete this._attr[attr];
      this.attributeCount -= 1;

      this.trigger(ModelEvent.DELETE, null, this);
      this.trigger(ModelEvent.UPDATE, null, this);
      _result = true;

      if (this.attributeCount < 1) {
        this.trigger(ModelEvent.DELETE_ALL, null, this);
      }
    }
    return _result;
  }


  /**
   *
   * @returns {boolean}
   */
  deleteAll() {
    var _result = false;

    if (this.attributeCount > 0) {
      _result = true;
      this.attributeCount = 0;
      this._attr = {};
      this._previousAttr = {};
      this.trigger(ModelEvent.DELETE, null, this);
      this.trigger(ModelEvent.DELETE_ALL, null, this);
      this.trigger(ModelEvent.UPDATE, null, this);
    }

    return _result;
  }


  /**
   *
   * @param parent
   */
  addParentEventTarget(parent) {

    if (typeof parent.dispatchEvent !== 'function') {
      throw new TypeError(this.NAME + '.prototype.addParentEventTarget ==> Parents must have dispatchEvent method.');
    }

    this._parentEventTarget = !!this._parentEventTarget ? this._parentEventTarget : [];

    var parents = this._parentEventTarget;

    for (var i = 0, len = parents.length; i < len; i += 1) {
      if (parents[i] === parent) {
        return;
      }
    }
    parents.push(parent);
  };


  /**
   *
   * @param parent
   */
  removeParentEventTarget(parent) {
    if (!!this._parentEventTarget) {
      var parents = this._parentEventTarget;
      for (var i = 0, len = parents.length; i < len; i += 1) {
        if (parents[i] === parent) {
          parents.splice(i, 1);
          return;
        }
      }
    }
  }


  /**
   *
   * @param type
   * @param params
   */
  dispatchEvent(type, params) {

    super.dispatchEvent(type, params, this);

    if (!!this._parentEventTarget && this._parentEventTarget.length > 0) {
      var parents = this._parentEventTarget.slice(0);

      for (let i = 0, len = parents.length; i < len; i++) {
        parents[i].dispatchEvent(type, params, this);
      }
    }
  }

  /**
   *
   * @returns {string}
   */
  get NAME() {
    return NAME;
  }
}
