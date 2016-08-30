/**
 * fileOverview:
 * Project:
 * File:
 * Date:
 * Author:
 */



'use strict';


import Module from '../utils/Module';
import NodeView from "./NodeView";
import AbstractController from "../controllers/AbstractController";

/**
 *
 * @type {string}
 */
const NAME = 'AbstractView';




export default class AbstractView extends NodeView {
  /**
   * new constructor({
   *  modelActions: {
   *    update: 'onUpdate'
   *  },
   *  controllerName: 'AbstractController',
   *  controller: AbstractController
   * });
   *
   * @param options
   */
  constructor(options) {
    super();

    this._model = null;
    this._controller = null;

    this._modelActions = options.modelActions;
    this._lastModelActions = this._modelActions;

    this.setModel(options.model);
    this.setController(options.controller);

  }


  /**
   * To be overridden by subclasses.
   */
  setup() {

  }


  /**
   * To be overridden by subclasses.
   */
  update() {

  }


  /**
   *
   */
  destroy() {
    this.removeAllEventListener();

    var eventMap = this._lastModelActions;

    for (var type in eventMap) {
      if (Object.prototype.hasOwnProperty.call(eventMap, type)) {
        this._model.off(type, this[eventMap[type]]);
      }
    }

    delete this._lastModelActions;

    this._lastModelActions = null;

    if (this._controller) {
      this._controller.destroy();
      this._controller = null;
    }

    this._model = null;

    super.destory();
  }


  /**
   *
   * @param model
   */
  setModel(model) {
    this._setModelAndController(model, this._controller);
  }

  /**
   *
   */
  getModel() {
    return this._model;
  }

  /**
   *
   */
  get model() {
    return this.getModel();
  }


  /**
   *
   * @param controller
   */
  setController(controller) {
    this._setModelAndController(this._model, controller);
  }


  /**
   *
   */
  getController() {
    if (!this._controller) {
      this.setController(this.getDefaultController());
    }
    return this._controller;
  }

  /**
   *
   * @returns {*}
   */
  get controller() {
    return this.getController();
  }


  /**
   *
   */
  getDefaultController() {
    return new AbstractController();
  }

  /**
   *
   * @returns {AbstractView.modelActions|settings.modelActions|{change}|{change: string}|*}
   */
  getModelActions() {
    return this._modelActions;
  };


  /**
   *
   * @returns {settings.modelActions|{change}|*}
   */
  setModelActions(actions) {
    this._modelActions = Module.extend({}, this._modelActions, actions);
  };


  /**
   *
   * @param model
   * @param controller
   */
  setModelAndController(model, controller) {
    this._setModelAndController(model, controller);
  }


  /**
   *
   * @param model
   * @param controller
   * @private
   */
  _setModelAndController(model, controller) {
    let type, eventMap;

    if (this._model !== model) {
      if (this._model) {
        eventMap = this._lastModelActions;
        for (type in eventMap) {
          if (Object.prototype.hasOwnProperty.call(eventMap, type)) {
            this._model.off(type, this[eventMap[type]]);
          }
        }
      }

      if (model) {
        eventMap = this._lastModelActions = this._modelActions || {};
        for (type in eventMap) {
          if (Object.prototype.hasOwnProperty.call(eventMap, type)) {
            if (!!this[eventMap[type]]) {
              this[eventMap[type]] = this[eventMap[type]].bind(this);
              model.on(type, this[eventMap[type]]);
            }
          }
        }
      }
      this._model = model;
    }

    if ((this._controller !== controller) && this._controller) {
      this._controller.setView(null);
      this._controller.setModel(null);
    }

    if (controller) {
      controller.setView(this);
      controller.setModel(model);
    }

    this._controller = controller;
  }


  /**
   *
   * @returns {string}
   */
  get NAME() {
    return NAME;
  }
}
