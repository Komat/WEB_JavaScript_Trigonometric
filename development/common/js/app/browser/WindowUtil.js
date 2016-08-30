/**
 * fileOverview:
 * Project:
 * File:
 * Date:
 * Author:
 */


'use strict';


import PubSub from "../events/PubSub";
import ES6Symbol from "es6-symbol";

let Symbol = global.Symbol || ES6Symbol;

let singleton = Symbol();
let singletonEnforcer = Symbol();
let instance;



/**
 *
 * @type {string}
 */
const LOAD = 'load';

/**
 *
 * @type {string}
 */
const RESIZE = 'resize';

/**
 *
 * @type {string}
 */
const UNLOAD = 'unload';


/**
 *
 * @type {string}
 */
const MOUSE_WHEEL = 'mousewheel';


/**
 *
 * @type {string}
 */
const REQUEST_ANIMATION_FRAME = 'request_animation_frame';


/**
 * listenGlobalEvent
 *
 * @param type
 * @param listener
 */
let listenGlobalEvent = function (type, listener) {

  if (typeof(global.addEventListener) !== 'undefined') {
    if (type === MOUSE_WHEEL) {
      global.addEventListener('DOMMouseScroll', listener, false);
    }
    global.addEventListener(type, listener, false);
  } else if (typeof(global.attachEvent) !== 'undefined') {
    global.attachEvent('on' + type, listener);
  } else {
    if (global['on' + type] !== null) {
      let existenceListener = global['on' + type];
      global['on' + type] = function (event) {
        existenceListener(event);
        listener(event);
      };
    } else {
      global['on' + type] = listener;
    }
  }
};


/**
 * onLoadHandler
 *
 * @param event
 */
let onLoadHandler = function (event) {
  instance.dispatchEvent(LOAD, {
    originalEvent: event
  }, this);
};


/**
 * onResizeHandler
 *
 * @param event
 */
let onResizeHandler = function (event) {
  instance.dispatchEvent(RESIZE, {
    originalEvent: event
  }, this);
};


/**
 * onUnLoadHandler
 *
 * @param event
 */
let onUnLoadHandler = function (event) {
  instance.dispatchEvent(UNLOAD, {
    originalEvent: event
  }, this);
};


/**
 * onMouseWheelHandler
 *
 * @param event
 */
let onMouseWheelHandler = function (event) {
  let delta = event.detail !== 0 ? event.detail : event.wheelDelta;
  instance.dispatchEvent(MOUSE_WHEEL, {
    originalEvent: event,
    delta: delta
  }, this);
};

let animationID;
let animationFunctions = [];

/**
 *
 * @param event
 */
let animationFrame = function (event) {
  instance.dispatchEvent(REQUEST_ANIMATION_FRAME, {
    originalEvent: event
  }, this);
  animationID = window.requestAnimationFrame(animationFrame);
};

export default class WindowUtil extends PubSub {


  static requestAnimationFrame(callback) {
    return window.requestAnimationFrame(callback);
  }


  static cancelAnimationFrame(id) {
    window.requestAnimationFrame(id);
  }


  static getScreenSize() {
    let _w, _h;
    if (document.documentElement && document.documentElement.clientWidth !== 0) {
      _w = document.documentElement.clientWidth;
    } else if (document.body) {
      _w = document.body.clientWidth;
    }
    if (document.documentElement && document.documentElement.clientHeight !== 0) {
      _h = document.documentElement.clientHeight;
    } else if (document.body) {
      _h = document.body.clientHeight;
    }
    return ({width: _w, height: _h});
  };


  static getDocumentSize() {
    let width, height;

    if (window.innerHeight && window.scrollMaxY) {
      width = window.innerWidth + window.scrollMaxX;
      height = window.innerHeight + window.scrollMaxY;
    } else if (document.body.scrollHeight > document.body.offsetHeight || document.documentElement.scrollHeight !== document.body.scrollHeight) {
      width = document.documentElement.scrollWidth || document.body.scrollWidth;
      height = document.documentElement.scrollHeight || document.body.scrollHeight;
    } else {
      width = document.body.offsetWidth;
      height = document.body.offsetHeight;
    }

    return ({width: width, height: height});
  };


  static getScrollPosition() {
    let _x, _y;
    _x = document.documentElement.scrollLeft || document.body.scrollLeft || window.pageXOffset;
    _y = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset;
    return ({top: _y, left: _x});
  };


  static get instance() {
    if (!this[singleton]) {
      this[singleton] = new WindowUtil(singletonEnforcer);
      instance = this[singleton];
    }
    return this[singleton];
  }


  constructor(enforcer) {
    if (enforcer === singletonEnforcer) {
      super();
      let globalEvents = ['load', 'resize', 'unload', MOUSE_WHEEL];
      let globalListeners = [onLoadHandler, onResizeHandler, onUnLoadHandler, onMouseWheelHandler];

      let length = globalEvents.length;
      for (let i = 0; i < length; i += 1) {
        listenGlobalEvent(globalEvents[i], globalListeners[i]);
      }
    } else {
      throw "Cannot construct singleton"
    }
  }



  /**
   *
   * @param type
   * @param listener
   */
  addEventListener(type, listener) {
    super.addEventListener(type, listener);

    if (type === REQUEST_ANIMATION_FRAME) {
      for (var i = 0, iLen = animationFunctions.length; i < iLen; i += 1) {
        if (animationFunctions[i] === listener) {
          return;
        }
      }

      animationFunctions.push(listener);

      if (animationFunctions.length === 1) {
        animationFrame();
      }

    }
  }


  /**
   *
   * @param type
   * @param listener
   */
  on(type, listener) {
    this.addEventListener(type, listener);
  }


  /**
   *
   * @param type
   * @param listener
   */
  bind(type, listener) {
    this.addEventListener(type, listener);
  }


  /**
   *
   * @param type
   * @param listener
   */
  removeEventListener(type, listener) {
    super.removeEventListener(type, listener);

    if (type === REQUEST_ANIMATION_FRAME) {
      for (var i = 0, iLen = animationFunctions.length; i < iLen; i += 1) {
        if (animationFunctions[i] === listener) {
          break;
        }
      }

      if (i !== animationFunctions.length) {
        animationFunctions.splice(i, 1);
      }

      if (animationFunctions.length === 0) {
        cancelAnimationFrame(animationID);
      }
    }
  }


  /**
   *
   * @param type
   * @param listener
   */
  off(type, listener) {
    this.removeEventListener(type, listener);
  }



  /**
   *
   * @param type
   * @param listener
   */
  unbind(type, listener) {
    this.removeEventListener(type, listener);
  }


  /**
   *
   * @param type
   * @param listener
   */
  one(type, listener) {
    let _listener = () => {
      this.off(type, _listener);
      listener.apply(null, arguments);
    };

    this.on(type, _listener);
  }
}


(function (window) {

  let lastTime = 0;
  let vendors = ['ms', 'moz', 'webkit', 'o'];

  for (let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
  }

  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function (callback, element) {
      let currTime = new Date().getTime();
      let timeToCall = Math.max(0, 16 - (currTime - lastTime));
      let id = window.setTimeout(function () {
          callback(currTime + timeToCall);
        },
        timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
  }

  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function (id) {
      clearTimeout(id);
    };
  }

  var
    startOffset = Date.now ? Date.now() : +(new Date)
    , performance = window.performance || {}

    , _entries = []
    , _marksIndex = {}

    , _filterEntries = function (key, value) {
      let i = 0, n = _entries.length, result = [];
      for (; i < n; i++) {
        if (_entries[i][key] == value) {
          result.push(_entries[i]);
        }
      }
      return result;
    }

    , _clearEntries = function (type, name) {
      let i = _entries.length, entry;
      while (i--) {
        entry = _entries[i];
        if (entry.entryType == type && (name === void 0 || entry.name == name)) {
          _entries.splice(i, 1);
        }
      }
    }
    ;


  if (!performance.now) {
    performance.now = performance.webkitNow || performance.mozNow || performance.msNow || function () {
        return (Date.now ? Date.now() : +(new Date)) - startOffset;
      };
  }


  if (!performance.mark) {
    performance.mark = performance.webkitMark || function (name) {
        let mark = {
          name: name
          , entryType: 'mark'
          , startTime: performance.now()
          , duration: 0
        };
        _entries.push(mark);
        _marksIndex[name] = mark;
      };
  }


  if (!performance.measure) {
    performance.measure = performance.webkitMeasure || function (name, startMark, endMark) {
        startMark = _marksIndex[startMark].startTime;
        endMark = _marksIndex[endMark].startTime;

        _entries.push({
          name: name
          , entryType: 'measure'
          , startTime: startMark
          , duration: endMark - startMark
        });
      };
  }


  if (!performance.getEntriesByType) {
    performance.getEntriesByType = performance.webkitGetEntriesByType || function (type) {
        return _filterEntries('entryType', type);
      };
  }


  if (!performance.getEntriesByName) {
    performance.getEntriesByName = performance.webkitGetEntriesByName || function (name) {
        return _filterEntries('name', name);
      };
  }


  if (!performance.clearMarks) {
    performance.clearMarks = performance.webkitClearMarks || function (name) {
        _clearEntries('mark', name);
      };
  }


  if (!performance.clearMeasures) {
    performance.clearMeasures = performance.webkitClearMeasures || function (name) {
        _clearEntries('measure', name);
      };
  }


  // exports
  window.performance = performance;

}(window));

