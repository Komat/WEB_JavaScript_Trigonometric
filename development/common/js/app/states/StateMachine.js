/**
 * fileOverview:
 * Project:
 * File:
 * Date:
 * Author:
 */


import Module from '../utils/Module';
import StatePathModel from "../models/StatePathModel";
import StateEvent from "../events/StateEvent";
import PubSub from "../events/PubSub";


/**
 *
 * @param flag
 * @private
 */
let _types = (flag) => {
  var _obj = {
    method: '',
    event: ''
  };

  if (flag) {
    _obj.isExit = true;
    _obj.method = 'onExit';
    _obj.event = StateEvent.EXIT_COMPLETE;
  } else {
    _obj.isExit = false;
    _obj.method = 'onEnter';
    _obj.event = StateEvent.ENTER_COMPLETE;
  }

  return _obj;
};

export default class StateMachine {
  /**
   *
   */
  constructor(config) {

    let settings = Module.extend({
      id: '',
      states: [],
      hasSubContent: false,
      subState: null,
      isDirect: true,
      defaultState: '',
      isParallel: false,
      onEnter: function () {
      },
      onExit: function () {
      }
    }, config);

    if (!settings.states) {
      throw new Error();
    }

    this.states = [];
    this.currentState = null;

    this.isProcess = false;

    this.statePathModel = new StatePathModel();

    this.dispatcher = new PubSub;

    this.disposeState(settings.states.slice(0));

    this._defaultState = settings.defaultState;
    this._isDirect = settings.isDirect;
    this._isParalles = settings.isParallel;

    this.goDefault()
  }


  /**
   *
   */
  goDefault() {
  if ((!!this._defaultState) && (!!this._isDirect)) {
      this.goto(this._defaultState);
      this._defaultState = null;
    }
  }


  /**
   *
   */
  setParallel() {
    this._isParalles = true;
  }

  /**
   *
   * @param stateArray
   */
  disposeState(stateArray) {

    let setSubState = function (arr, _state) {
      if (_state.hasSubContent) {
        var subState = _state.subState;
        for (var prop in subState) {
          if (subState.hasOwnProperty(prop)) {
            arr.push(subState[prop]);
            setSubState(arr, subState[prop]);
          }
        }
      }
    };

    stateArray.forEach(function (state) {
      this.states.push(state);
      setSubState(this.states, state);
    }.bind(this));
  }


  /**
   * 現在のステートのパスを返す
   * @returns {string|*}
   */
  getCurrentPath() {
    this.statePathModel.getCurrentPath();
  }


  /**
   *
   * @returns {*}
   */
  getCurrent() {
    let current = this.statePathModel.getCurrentState();
    return  current[0] || '';
  }


  /**
   *
   * @returns {number}
   */
  getCurrentIndex() {
    let current = this.getCurrent();
    let targetIndex = -1;

    this.states.forEach(function (state, index) {
      if (current === state.id && targetIndex === -1) {
        targetIndex = index;
      }
    });

    return targetIndex;
  }


  /**
   *
   * @returns {*}
   */
  nextIndexState() {
    let index = this.getCurrentIndex();

    index += 1;

    if (index > this.getMaxIndex()) {
      index = this.getMaxIndex();
    }

    return this.getIndexTarget(index);
  }



  /**
   *
   * @returns {*}
   */
  previousIndexState() {
    let index = this.getCurrentIndex();

    index -= 1;

    if (index < 0) {
      index = 0;
    }

    return this.getIndexTarget(index);
  }

  /**
   *
   * @param index
   * @returns {*}
   */
  getIndexTarget(index) {
    return Module.clone(this.states[index]);
  }

  /**
   * 現在の状態を取得
   * @param stateName
   * @returns {number}
   */
  getStateIndex(stateName) {

    let _index = -1;

    this.states.forEach(function (state, index) {
      if (_index === -1 && state.getID() === stateName) {
        _index = index;
      }
    });

    return _index;
  }

  /**
   * 現在の状態を取得
   * @param id
   * @returns {boolean}
   * @private
   */
  _getState(id) {

    var _state = false;

    this.states.forEach(function (state) {
      if (state.getID() === id) {
        _state = state;
      }
    });

    return _state;
  }


  /**
   *
   * @returns {boolean}
   */
  getProcess() {
    return this.isProcess;
  }

  /**
   *
   * @param params
   * @private
   */
  _reset(params) {
    this.isProcess = false;
    this.dispatcher.dispatchEvent(StateEvent.CHANGE_COMPLETE, params || null, this);
  };


  /**
   * 強制終了
   */
  forceStop() {

    /**
     * 監視イベントを全部削除
     * @type {Array.<T>}
     */
    let serialList = this.statePathModel.getSerialList();

    serialList.forEach(function (state) {
      (this.getState(Object.keys(state)[0])).dispatcher.offAll();
    }.bind(this));

    this.statePathModel.reset();
    this.reset({});

    this.dispatcher.dispatchEvent(StateEvent.FORCE_STOP, null, this);
  }


  /**
   *
   * @param path
   * @param options
   */
  goto(path, options) {

    if (this.isProcess) {
      return;
    }

    this.isProcess = true;

    var result = this.statePathModel.setReserve(path);

    if (result) {
      result.options = options;
      if (!this._isParalles) {
        this._playGoto(result);
      } else {
        this._playCrossFade(result);
      }
    } else {
      this._reset(options);
    }
  }


  /**
   *
   * @param options
   */
  exit(options) {

    if (this.isProcess) {
      return;
    }

    this.isProcess = true;

    if (this.statePathModel.hasList()) {
      this._playExit(options);
    } else {
      this.statePathModel.reset();
      this._reset(options);
    }
  }


  /**
   *
   * @param id
   * @returns {*}
   */
  getState(id) {
    let _state = null;
    let _find = false;

    this.states.forEach(function (state) {
      if (_find) {
        return;
      }

      if (state.id === id) {
        _state = state;
        _find = true;
      }
    });

    return _state;
  }


  /**
   *
   * @returns {Array.<T>}
   */
  getAllState() {
    return [].slice.call(this.states, 0);
  }


  /**
   *
   * @returns {Number}
   */
  getStateLength() {
    return this.states.length;
  }


  /**
   *
   * @returns {number}
   */
  getMaxIndex() {
    return this.states.length - 1;
  }


  /**
   *
   * @returns {Number}
   */
  getTargetIndex(id) {
    let targetIndex = -1;

    this.states.forEach(function (state, index) {
      if (targetIndex === -1) {
        targetIndex = index;
      }
    });

    return targetIndex;
  }

  /**
   *
   * @param options
   * @private
   */
  _playGoto(options) {
    let counter = 0;
    let settings = null;
    let state = null;
    let _event = '';
    let serialList = this.statePathModel.getSerialList();
    let maxIndex = serialList.length - 1 || 0;
    let _keys = [];
    let _params;

    for (var i = 0, len = serialList.length; i < len; i += 1) {
      _keys.push(Object.keys(serialList[i])[0]);
    }

    _params = Module.extend({}, options || {}, {
      current: '',
      from: _keys[0],
      to: _keys[_keys.length - 1],
      step: _keys
    });

    this.dispatcher.dispatchEvent(StateEvent.CHANGE_BEFORE, _params, this);

    /**
     *
     */
    var serialStart = function (parameter) {

      var prop = Object.keys(serialList[0])[0];

      settings = _types(serialList[0][prop]);

      state = this.getState(prop);

      if (!state) {
        throw new Error(prop + ' ==> ' + state);
      }

      _event = settings.event;

      let onMethodComplete = function (event) {

        if (settings.isExit) {
          this.statePathModel.splice();
        }

        serialList.splice(0, 1);

        if (counter < maxIndex) {
          counter += 1;
          serialStart(parameter);
        } else {
          this._reset(parameter);
        }

      }.bind(this);

      state.dispatcher.one(_event, onMethodComplete);
      state[settings.method](parameter);

    }.bind(this);

    serialStart(_params);
  }




  /**
   *
   * @param options
   * @private
   */
  _playCrossFade(options) {

    let counter = 0;
    let settings = null;
    let state = null;
    let _event = '';
    let parallelList = this.statePathModel.getSerialList();
    let _keys = [];
    let _params;

    for (var i = 0, len = parallelList.length; i < len; i += 1) {
      _keys.push(Object.keys(parallelList[i])[0]);
    }

    _params = Module.extend({}, options || {}, {
      current: '',
      from: _keys[0],
      to: _keys[_keys.length - 1],
      step: _keys
    });

    this.dispatcher.dispatchEvent(StateEvent.CHANGE_BEFORE, _params, this);


    /**
     *
     * @type {function(this:StateMachine)}
     */
    var parallelStart = function (parameter) {

      var prop = Object.keys(parallelList[0])[0];

      settings = _types(parallelList[0][prop]);
      state = this.getState(prop);

      state[settings.method](_params);

      if (settings.isExit) {
        this.statePathModel.splice();
      }

      parallelList.splice(0, 1);

      if (counter < parallelList.length) {

        prop = Object.keys(parallelList[0])[0];
        settings = _types(parallelList[0][prop]);
        state = this.getState(prop);
        _event = settings.event;

        let onMethodComplete = function () {
          if (counter < parallelList.length) {
            this._reset(_params);
          } else {
            parallelStart();
          }
        }.bind(this);

        state.dispatcher.one(_event, onMethodComplete);
        state[settings.method](parameter);

      } else {
        this._reset(_params);
      }

    }.bind(this);

    parallelStart(_params);
  }


  /**
   *
   * @param options
   * @private
   */
  _playExit (options) {

    var stateList = this.statePathModel.getCurrentState();
    var counter = 0;
    var state = null;
    var maxIndex = this.stateList.length - 1 || 0;
    var _param = null;

    _param = Module.extend(options || {}, {
      current: '',
      from: stateList[0],
      to: '',
      step: stateList
    });

    let serialStart = function () {

      var prop = stateList[0];

      state = this.getState(prop);

      let onExitCompleteHandler = function (event) {
        state.dispatcher.off(StateEvent.EXIT_COMPLETE, onExitCompleteHandler);

        stateList.splice(0, 1);

        if (counter < maxIndex) {
          counter += 1;
          serialStart();
        } else {
          this.statePathModel.reset();
          this._reset(_param);
        }

      }.bind(this);

      state.dispatcher.on(StateEvent.EXIT_COMPLETE, onExitCompleteHandler);
      state.onExit(_param);

    }.bind(this);

    serialStart();

  };


  back() {

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
  off() {
    this.dispatcher.off.apply(this.dispatcher, arguments);
  }


  /**
   *
   */
  one() {
    this.dispatcher.one.apply(this.dispatcher, arguments);
  }
}
