/**
 * fileOverview:
 * Project:
 * File:
 * Date:
 * Author:
 */


import Module from '../utils/Module';
import PubSub from '../events/PubSub';




export default class State {
  /**
   *
   */
  constructor(config) {

    let settings = Module.extend({
      id: '',
      hasSubContent: false,
      subState: null,
      onEnter: function () {},
      onExit: function () {}
    }, config);

    this.dispatcher = new PubSub;

    this.id = settings.id;
    this.hasSubContent = settings.hasSubContent;
    this.subState = settings.subState;
    this.onEnter = settings.onEnter;
    this.onExit = settings.onExit;

  }


  /**
   * StateMachine で現在の State を取得する際に使用
   * @returns {string|*}
   */
  getID() {
    return this.id;
  }


  /**
   *
   */
  addEventListener() {
    this.dispatcher.on.apply(this.dispatcher, arguments);
  }


  /**
   *
   */
  bind() {
    this.dispatcher.on.apply(this.dispatcher, arguments);
  }


  /**
   *
   */
  one() {
    this.dispatcher.one.apply(this.dispatcher, arguments);
  }


  /**
   *
   */
  on() {
    this.dispatcher.on.apply(this.dispatcher, arguments);
  }


  /**
   *
   */
  removeEventListener() {
    this.dispatcher.off.apply(this.dispatcher, arguments);
  }


  /**
   *
   */
  unbind() {
    this.dispatcher.off.apply(this.dispatcher, arguments);
  }


  /**
   *
   */
  off() {
    this.dispatcher.off.apply(this.dispatcher, arguments);
  }


  /**
   *
   */
  dispatchEvent() {
    this.dispatcher.dispatchEvent.apply(this.dispatcher, arguments);
  }


  /**
   *
   */
  fire() {
    this.dispatcher.dispatchEvent.apply(this.dispatcher, arguments);
  }


  /**
   *
   */
  trigger() {
    this.dispatcher.dispatchEvent.apply(this.dispatcher, arguments);
  }


  /**
   *
   * @param subState
   */
  addSubState(subState) {

    if (!this.subState) {
      this.hasSubContent = true;
      this.subState = {};
    }

    let addSubState = function (state) {
      for (var prop in state) {
        if (state.hasOwnProperty(prop)) {
          this.subState[prop] = state[prop];
        }
      }
    }.bind(this);

    if (Array.isArray(subState)) {
      subState.forEach(function (_subState) {
        addSubState(_subState);
      });
    } else {
      addSubState(subState);
    }
  }

  /**
   *
   * @returns {{id: (string|*), dispatcher: _.EventDispatcher, hasSubContent: (boolean|*), subState: (null|*), getID: State.getID, onEnter: (settings.onEnter|*), onExit: (settings.onExit|*)}}
   */
  getStateParams() {
    return {
      id: this.id,
      dispatcher: this.dispatcher,
      hasSubContent: this.hasSubContent,
      subState: this.subState,
      getID: this.getID,
      onEnter: this.onEnter,
      onExit: this.onExit
    };
  }


  /**
   *
   */
  getSubStateParams() {
    var returnVal = {};
    returnVal[this.id] = this.getStateParams();
    return returnVal;
  }
}
