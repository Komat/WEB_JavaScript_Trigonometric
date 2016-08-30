/**
 * fileOverview:
 * Project:
 * File:
 * Date:
 * Author:
 */


'use strict';

import State from './State';
import StateEvent from '../events/StateEvent';

import ViewEvent from '../events/ViewEvent';
import ModelEvent from '../events/ModelEvent';

export default class AbstractState {
  /**
   *
   * @param id
   */
  constructor(id) {

    this.isSetup = false;
    this.isSelfSetup = false;

    this.id = id;

    this.state = new State({
      id: this.id,
      onEnter: this.onEnter.bind(this),
      onExit: this.onExit.bind(this)
    });

    this.model = null;
    this.view = null;
    this.controller = null;

  }

  /**
   *
   */
  setup() {
    if (!this.isSetup) {
      this.isSetup = true;

      if (this.model) {
        this.model.state = this;
        this.model.setup();
      }

      if (this.view) {
        this.view.state = this;
        this.view.setModelAndController(this.model, this.controller);
        this.view.setup();
      }

      if (this.controller) {
        this.controller.state = this;
        this.controller.setup();
      }
    }
  }


  /**
   *
   * @returns {null}
   */
  getView() {
    return this.view;
  }



  /**
   *
   * @returns {null}
   */
  getModel() {
    return this.model;
  }



  /**
   *
   * @returns {null}
   */
  getController() {
    return this.controller;
  }


  /**
   *
   * @returns {*|{id, dispatcher, hasSubContent, subState, getID, onEnter, onExit}|{id: *, hasSubContent: *, subState: *, getID: *, onEnter: *, onExit: *}}
   */
  getStateParams() {
    return this.state.getStateParams();
  }

  /**
   *
   * @returns {*}
   */
  getSubStateParams() {
    return this.state.getSubStateParams();
  }

  /**
   *
   */
  one() {
    this.state.one.apply(this.state, arguments);
  }

  /**
   *
   */
  addEventListener() {
    this.state.on.apply(this.state, arguments);
  }

  /**
   *
   */
  on() {
    this.addEventListener.apply(this, arguments);
  }


  /**
   *
   */
  removeEventListener() {
    this.state.off.apply(this.state, arguments);
  }

  /**
   *
   */
  off() {
    this.removeEventListener.apply(this, arguments);
  }


  /**
   *
   */
  onEnter() {
    this.setup();
    this.state.trigger(StateEvent.ENTER_BEFORE, {id: this.id});
  }


  /**
   *
   */
  onEnterComplete() {
    if (this.controller) {
      this.controller.addEvent();
    }
    this.state.trigger(StateEvent.ENTER_COMPLETE, {id: this.id});
  }


  /**
   *
   */
  onExit() {
    this.state.trigger(StateEvent.EXIT_BEFORE, {id: this.id});
    if (this.controller) {
      this.controller.removeEvent();
    }
  }


  /**
   *
   */
  onExitComplete() {
    this.state.trigger(StateEvent.EXIT_COMPLETE, {id: this.id});
  }
};
