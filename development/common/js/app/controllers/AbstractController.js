/**
 * fileOverview:
 * Project:
 * File:
 * Date:
 * Author:
 */


'use strict';


const NAME = 'AbstractController';


export default class AbstractController {

  /**
   *
   */
  constructor() {
    this._model = null;
    this._view = null;
  }


  setup() {

  }

  /**
   *
   */
  destory() {
    this._model = null;

    if (this._view) {
      this._view.setController(null);
      this._view = null;
    }
  }



  /**
   *
   */
  set model(model) {
    this.setModel(model);
  }


  /**
   *
   */
  get model() {
    return this.getModel();
  }


  /**
   *
   * @param model
   */
  setModel(model) {
    this._model = model;
  }


  /**
   *
   */
  getModel() {
    return this._model;
  }

  /**
   *
   * @param view
   */
  set view(view) {
    this.setView(view);
  }


  /**
   *
   */
  get view() {
    return this.getView();
  }


  /**
   *
   * @param view
   */
  setView(view) {
    this._view = view;
  }


  /**
   *
   */
  getView() {
    return this._view;
  }


  /**
   *
   */
  addEvent() {

  }


  /**
   *
   */
  removeEvent() {

  }


  /**
   *
   * @returns {string}
   */
  get NAME() {
    return NAME;
  }
}
