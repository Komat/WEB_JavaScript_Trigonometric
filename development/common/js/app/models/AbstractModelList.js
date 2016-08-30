/**
 * fileOverview:
 * Project:
 * File:
 * Date:
 * Author:
 */

import ModelEvent from "../events/ModelEvent";
import AbstractModel from "./AbstractModel";

/**
 *
 * @type {string}
 */
const NAME = 'AbstractModelList';


export default class AbstractModelList extends AbstractModel {
  /**
   *
   */
  constructor() {
    super();
    this._models = {};
    this._size = 0;
    this._handleEvent = this.handleEvent.bind(this);
  }


  /**
   *
   */
  refresh() {
    this._models = {};
    this._size = 0;
  }


  /**
   *
   * @returns {number}
   */
  getSize() {
    return this._size;
  };


  /**
   *
   * @param cid
   * @returns {*}
   */
  getIdItem(cid) {

    var item = null;

    if (this._models.hasOwnProperty(cid)) {
      item = this._models[cid].getAllData();
    }

    return item;
  }


  /**
   *
   * @param cid
   * @returns {*}
   */
  getIdModel(cid) {

    var item = null;

    if (this._models.hasOwnProperty(cid)) {
      item = this._models[cid];
    }

    return item;
  }


  /**
   *
   * @param model
   * @returns {boolean}
   */
  has(model) {
    return !!(this._models.hasOwnProperty(model.getCID()));
  }


  /**
   *
   * @returns {boolean|*}
   */
  addModel() {
    var argument, cid, modified;
    var added = [];
    var contents = [];

    for (var i = 0, len = arguments.length; i < len; i += 1) {
      argument = arguments[i];
      cid = argument.getCID();

      if (!this._models.hasOwnProperty(cid)) {

        this._size += 1;
        added.push(argument);
        contents.push(argument.getAllData());
        this._models[cid] = argument;

        if ((typeof argument.on === 'function') && (typeof argument.off === 'function')) {
          argument.on(ModelEvent.DELETE, this._handleEvent);
        }

        if ((typeof argument.addParentEventTarget === 'function') && (typeof argument.removeParentEventTarget === 'function')) {
          argument.addParentEventTarget(this);
        }
      }
    }

    modified = added.length > 0;

    if (modified) {

      this.trigger(ModelEvent.CHANGE, {
        contents: this.toArray(),
        addModel: added,
        deleteModel: []
      }, this);

      this.trigger(ModelEvent.COMPLETE, {
        contents: this.toArray(),
        addModel: added,
        deleteModel: []
      }, this);

    }

    return modified;

  }


  /**
   *
   * @returns {boolean|*}
   */
  deleteModel() {
    var argument, cid, modified;
    var deleted = [];

    for (var i = 0, len = arguments.length; i < len; i += 1) {
      argument = arguments[i];

      cid = argument.getCID();

      if (this._models.hasOwnProperty(cid)) {
        this._size -= 1;
        deleted.push(argument);
        delete this._models[cid];

        if ((typeof argument.on === 'function') && (typeof argument.off === 'function')) {
          argument.off(ModelEvent.DELETE, this._handleEvent);
        }

        if (typeof argument.removeParentEventTarget === 'function') {
          argument.removeParentEventTarget(this);
        }
      }
    }

    modified = deleted.length > 0;

    if (modified) {
      this.trigger(ModelEvent.CHANGE, {
        contents: this.toArray(),
        addModel: [],
        deleteModel: deleted
      }, this);

      this.trigger(ModelEvent.DELETE, {
        contents: this.toArray(),
        addModel: [],
        deleteModel: deleted
      }, this);
    }

    return modified;

  }


  /**
   *
   * @returns {boolean}
   */
  clear() {
    var deleted = this.toArray();
    var result = this.destroy();

    if (result) {
      for (var i = 0, iLen = deleted.length; i < iLen; i++) {
        var element = deleted[i];
        if (typeof element.off === 'function') {
          element.off(ModelEvent.DELETE, this._handleEvent);
        }
      }

      this.trigger(ModelEvent.CHANGE, {
        addModel: [],
        contents: [],
        deleteModel: deleted
      }, this);

      this.trigger(ModelEvent.DELETE_ALL, {
        addModel: [],
        contents: [],
        deleteModel: deleted
      }, this);

    }
    return result;
  }


  /**
   *
   * @returns {boolean}
   */
  destroy() {
    if (this._size > 0) {
      this._refresh();
      return true;
    } else {
      return false;
    }
  }


  /**
   *
   * @param event
   */
  handleEvent(event){
    switch (event.type) {
      case ModelEvent.DELETE:
        this.deleteModel(event.target);
        break;
      default:
        break;

    }
  }


  /**
   *
   * @returns {Array}
   */
  toArray() {
    var models = [];
    for (var prop in this._models) {
      if (this._models.hasOwnProperty(prop)) {
        models.push(this._models[prop]);
      }
    }
    return models;
  }

  /**
   *
   * @param callback
   */
  forEach(callback /*, options */) {
    var thisArg = arguments[1];
    var counter = 0;
    for (var prop in this._models) {
      if (this._models.hasOwnProperty(prop)) {
        callback.call(thisArg, this._models[prop], counter);
        counter += 1;
      }
    }
  }


  /**
   *
   * @param callback
   */
  every(callback /* options */){
    var thisArg = arguments[1];
    var counter = 0;
    for (var prop in this._models) {
      if (this._models.hasOwnProperty(prop) && !callback.call(thisArg, this._models[prop], counter)) {
        return false;
      }
      counter += 1;
    }
    return true;
  }


  /**
   *
   * @param callback
   * @returns {boolean}
   */
  some(callback /* options */){
    var thisArg = arguments[1];
    var counter = 0;
    for (var prop in this._models) {
      if (this._models.hasOwnProperty(prop) && callback.call(thisArg, this._models[prop], counter)) {
        return true;
      }
      counter += 1;
    }
    return false;
  }


  /**
   *
   * @param callback
   * @returns {*}
   */
  reduce(callback /* options */){
    var models = this.toArray();
    var i = 0;
    var len = models.length;
    var accumulator;

    if (arguments.length > 1) {
      accumulator = arguments[1];
    } else if (len < 1) {
      throw new TypeError('reduce of empty set with no initial value');
    } else {
      i = 1;
      accumulator = models[0];
    }

    while (i < len) {
      accumulator = callback.call(undefined, accumulator, models[i]);
      i++;
    }

    return accumulator;
  }

  /**
   *
   * @returns {string}
   */
  get NAME() {
    return NAME;
  }
}
