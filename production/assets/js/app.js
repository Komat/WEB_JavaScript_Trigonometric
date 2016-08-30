/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * fileOverview:
	 * Project:
	 * File:
	 * Date:
	 * Author:
	 */
	
	'use strict';
	
	var _datGui = __webpack_require__(1);
	
	var _datGui2 = _interopRequireDefault(_datGui);
	
	var _GlobalData = __webpack_require__(4);
	
	var _GlobalData2 = _interopRequireDefault(_GlobalData);
	
	var _WindowUtil = __webpack_require__(5);
	
	var _WindowUtil2 = _interopRequireDefault(_WindowUtil);
	
	var _DOMUtil = __webpack_require__(25);
	
	var _DOMUtil2 = _interopRequireDefault(_DOMUtil);
	
	var _CanvasView = __webpack_require__(30);
	
	var _CanvasView2 = _interopRequireDefault(_CanvasView);
	
	var _CanvasModel = __webpack_require__(32);
	
	var _CanvasModel2 = _interopRequireDefault(_CanvasModel);
	
	var _CanvasController = __webpack_require__(34);
	
	var _CanvasController2 = _interopRequireDefault(_CanvasController);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * initialize
	 */
	_DOMUtil2.default.Ready(function () {
	
	  _GlobalData2.default.init();
	
	  var canvas = document.createElement('canvas');
	
	  _GlobalData2.default.body.appendChild(canvas);
	
	  var model = new _CanvasModel2.default();
	  var view = new _CanvasView2.default(canvas);
	  var controller = new _CanvasController2.default();
	
	  view.setMC(model, controller);
	
	  var gui = new _datGui2.default.GUI();
	
	  gui.add(model, 'width').listen();
	  gui.add(model, 'height').listen();
	  gui.add(model, 'x').listen();
	  gui.add(model, 'y').listen();
	  gui.add(model, 'radian').listen();
	  gui.add(model, 'degree').listen();
	  gui.add(model, 'hypotenuse').listen();
	
	  var resize = function resize() {
	    var size = _WindowUtil2.default.getScreenSize();
	
	    _GlobalData2.default.bodyStyle.width = size.width + 'px';
	    _GlobalData2.default.bodyStyle.height = size.height + 'px';
	
	    canvas.width = size.width;
	    canvas.height = size.height;
	
	    model.updateSize(size);
	  };
	
	  var timerID = 0;
	
	  var resizeHandler = function resizeHandler() {
	
	    if (timerID) {
	      clearTimeout(timerID);
	    }
	
	    timerID = setTimeout(resize, 100);
	  };
	
	  resize();
	  _WindowUtil2.default.instance.addEventListener('resize', resizeHandler);
	
	  view.draw();
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(2)
	module.exports.color = __webpack_require__(3)

/***/ },
/* 2 */
/***/ function(module, exports) {

	/**
	 * dat-gui JavaScript Controller Library
	 * http://code.google.com/p/dat-gui
	 *
	 * Copyright 2011 Data Arts Team, Google Creative Lab
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 */
	
	/** @namespace */
	var dat = module.exports = dat || {};
	
	/** @namespace */
	dat.gui = dat.gui || {};
	
	/** @namespace */
	dat.utils = dat.utils || {};
	
	/** @namespace */
	dat.controllers = dat.controllers || {};
	
	/** @namespace */
	dat.dom = dat.dom || {};
	
	/** @namespace */
	dat.color = dat.color || {};
	
	dat.utils.css = (function () {
	  return {
	    load: function (url, doc) {
	      doc = doc || document;
	      var link = doc.createElement('link');
	      link.type = 'text/css';
	      link.rel = 'stylesheet';
	      link.href = url;
	      doc.getElementsByTagName('head')[0].appendChild(link);
	    },
	    inject: function(css, doc) {
	      doc = doc || document;
	      var injected = document.createElement('style');
	      injected.type = 'text/css';
	      injected.innerHTML = css;
	      doc.getElementsByTagName('head')[0].appendChild(injected);
	    }
	  }
	})();
	
	
	dat.utils.common = (function () {
	  
	  var ARR_EACH = Array.prototype.forEach;
	  var ARR_SLICE = Array.prototype.slice;
	
	  /**
	   * Band-aid methods for things that should be a lot easier in JavaScript.
	   * Implementation and structure inspired by underscore.js
	   * http://documentcloud.github.com/underscore/
	   */
	
	  return { 
	    
	    BREAK: {},
	  
	    extend: function(target) {
	      
	      this.each(ARR_SLICE.call(arguments, 1), function(obj) {
	        
	        for (var key in obj)
	          if (!this.isUndefined(obj[key])) 
	            target[key] = obj[key];
	        
	      }, this);
	      
	      return target;
	      
	    },
	    
	    defaults: function(target) {
	      
	      this.each(ARR_SLICE.call(arguments, 1), function(obj) {
	        
	        for (var key in obj)
	          if (this.isUndefined(target[key])) 
	            target[key] = obj[key];
	        
	      }, this);
	      
	      return target;
	    
	    },
	    
	    compose: function() {
	      var toCall = ARR_SLICE.call(arguments);
	            return function() {
	              var args = ARR_SLICE.call(arguments);
	              for (var i = toCall.length -1; i >= 0; i--) {
	                args = [toCall[i].apply(this, args)];
	              }
	              return args[0];
	            }
	    },
	    
	    each: function(obj, itr, scope) {
	
	      
	      if (ARR_EACH && obj.forEach === ARR_EACH) { 
	        
	        obj.forEach(itr, scope);
	        
	      } else if (obj.length === obj.length + 0) { // Is number but not NaN
	        
	        for (var key = 0, l = obj.length; key < l; key++)
	          if (key in obj && itr.call(scope, obj[key], key) === this.BREAK) 
	            return;
	            
	      } else {
	
	        for (var key in obj) 
	          if (itr.call(scope, obj[key], key) === this.BREAK)
	            return;
	            
	      }
	            
	    },
	    
	    defer: function(fnc) {
	      setTimeout(fnc, 0);
	    },
	    
	    toArray: function(obj) {
	      if (obj.toArray) return obj.toArray();
	      return ARR_SLICE.call(obj);
	    },
	
	    isUndefined: function(obj) {
	      return obj === undefined;
	    },
	    
	    isNull: function(obj) {
	      return obj === null;
	    },
	    
	    isNaN: function(obj) {
	      return obj !== obj;
	    },
	    
	    isArray: Array.isArray || function(obj) {
	      return obj.constructor === Array;
	    },
	    
	    isObject: function(obj) {
	      return obj === Object(obj);
	    },
	    
	    isNumber: function(obj) {
	      return obj === obj+0;
	    },
	    
	    isString: function(obj) {
	      return obj === obj+'';
	    },
	    
	    isBoolean: function(obj) {
	      return obj === false || obj === true;
	    },
	    
	    isFunction: function(obj) {
	      return Object.prototype.toString.call(obj) === '[object Function]';
	    }
	  
	  };
	    
	})();
	
	
	dat.controllers.Controller = (function (common) {
	
	  /**
	   * @class An "abstract" class that represents a given property of an object.
	   *
	   * @param {Object} object The object to be manipulated
	   * @param {string} property The name of the property to be manipulated
	   *
	   * @member dat.controllers
	   */
	  var Controller = function(object, property) {
	
	    this.initialValue = object[property];
	
	    /**
	     * Those who extend this class will put their DOM elements in here.
	     * @type {DOMElement}
	     */
	    this.domElement = document.createElement('div');
	
	    /**
	     * The object to manipulate
	     * @type {Object}
	     */
	    this.object = object;
	
	    /**
	     * The name of the property to manipulate
	     * @type {String}
	     */
	    this.property = property;
	
	    /**
	     * The function to be called on change.
	     * @type {Function}
	     * @ignore
	     */
	    this.__onChange = undefined;
	
	    /**
	     * The function to be called on finishing change.
	     * @type {Function}
	     * @ignore
	     */
	    this.__onFinishChange = undefined;
	
	  };
	
	  common.extend(
	
	      Controller.prototype,
	
	      /** @lends dat.controllers.Controller.prototype */
	      {
	
	        /**
	         * Specify that a function fire every time someone changes the value with
	         * this Controller.
	         *
	         * @param {Function} fnc This function will be called whenever the value
	         * is modified via this Controller.
	         * @returns {dat.controllers.Controller} this
	         */
	        onChange: function(fnc) {
	          this.__onChange = fnc;
	          return this;
	        },
	
	        /**
	         * Specify that a function fire every time someone "finishes" changing
	         * the value wih this Controller. Useful for values that change
	         * incrementally like numbers or strings.
	         *
	         * @param {Function} fnc This function will be called whenever
	         * someone "finishes" changing the value via this Controller.
	         * @returns {dat.controllers.Controller} this
	         */
	        onFinishChange: function(fnc) {
	          this.__onFinishChange = fnc;
	          return this;
	        },
	
	        /**
	         * Change the value of <code>object[property]</code>
	         *
	         * @param {Object} newValue The new value of <code>object[property]</code>
	         */
	        setValue: function(newValue) {
	          this.object[this.property] = newValue;
	          if (this.__onChange) {
	            this.__onChange.call(this, newValue);
	          }
	          this.updateDisplay();
	          return this;
	        },
	
	        /**
	         * Gets the value of <code>object[property]</code>
	         *
	         * @returns {Object} The current value of <code>object[property]</code>
	         */
	        getValue: function() {
	          return this.object[this.property];
	        },
	
	        /**
	         * Refreshes the visual display of a Controller in order to keep sync
	         * with the object's current value.
	         * @returns {dat.controllers.Controller} this
	         */
	        updateDisplay: function() {
	          return this;
	        },
	
	        /**
	         * @returns {Boolean} true if the value has deviated from initialValue
	         */
	        isModified: function() {
	          return this.initialValue !== this.getValue()
	        }
	
	      }
	
	  );
	
	  return Controller;
	
	
	})(dat.utils.common);
	
	
	dat.dom.dom = (function (common) {
	
	  var EVENT_MAP = {
	    'HTMLEvents': ['change'],
	    'MouseEvents': ['click','mousemove','mousedown','mouseup', 'mouseover'],
	    'KeyboardEvents': ['keydown']
	  };
	
	  var EVENT_MAP_INV = {};
	  common.each(EVENT_MAP, function(v, k) {
	    common.each(v, function(e) {
	      EVENT_MAP_INV[e] = k;
	    });
	  });
	
	  var CSS_VALUE_PIXELS = /(\d+(\.\d+)?)px/;
	
	  function cssValueToPixels(val) {
	
	    if (val === '0' || common.isUndefined(val)) return 0;
	
	    var match = val.match(CSS_VALUE_PIXELS);
	
	    if (!common.isNull(match)) {
	      return parseFloat(match[1]);
	    }
	
	    // TODO ...ems? %?
	
	    return 0;
	
	  }
	
	  /**
	   * @namespace
	   * @member dat.dom
	   */
	  var dom = {
	
	    /**
	     * 
	     * @param elem
	     * @param selectable
	     */
	    makeSelectable: function(elem, selectable) {
	
	      if (elem === undefined || elem.style === undefined) return;
	
	      elem.onselectstart = selectable ? function() {
	        return false;
	      } : function() {
	      };
	
	      elem.style.MozUserSelect = selectable ? 'auto' : 'none';
	      elem.style.KhtmlUserSelect = selectable ? 'auto' : 'none';
	      elem.unselectable = selectable ? 'on' : 'off';
	
	    },
	
	    /**
	     *
	     * @param elem
	     * @param horizontal
	     * @param vertical
	     */
	    makeFullscreen: function(elem, horizontal, vertical) {
	
	      if (common.isUndefined(horizontal)) horizontal = true;
	      if (common.isUndefined(vertical)) vertical = true;
	
	      elem.style.position = 'absolute';
	
	      if (horizontal) {
	        elem.style.left = 0;
	        elem.style.right = 0;
	      }
	      if (vertical) {
	        elem.style.top = 0;
	        elem.style.bottom = 0;
	      }
	
	    },
	
	    /**
	     *
	     * @param elem
	     * @param eventType
	     * @param params
	     */
	    fakeEvent: function(elem, eventType, params, aux) {
	      params = params || {};
	      var className = EVENT_MAP_INV[eventType];
	      if (!className) {
	        throw new Error('Event type ' + eventType + ' not supported.');
	      }
	      var evt = document.createEvent(className);
	      switch (className) {
	        case 'MouseEvents':
	          var clientX = params.x || params.clientX || 0;
	          var clientY = params.y || params.clientY || 0;
	          evt.initMouseEvent(eventType, params.bubbles || false,
	              params.cancelable || true, window, params.clickCount || 1,
	              0, //screen X
	              0, //screen Y
	              clientX, //client X
	              clientY, //client Y
	              false, false, false, false, 0, null);
	          break;
	        case 'KeyboardEvents':
	          var init = evt.initKeyboardEvent || evt.initKeyEvent; // webkit || moz
	          common.defaults(params, {
	            cancelable: true,
	            ctrlKey: false,
	            altKey: false,
	            shiftKey: false,
	            metaKey: false,
	            keyCode: undefined,
	            charCode: undefined
	          });
	          init(eventType, params.bubbles || false,
	              params.cancelable, window,
	              params.ctrlKey, params.altKey,
	              params.shiftKey, params.metaKey,
	              params.keyCode, params.charCode);
	          break;
	        default:
	          evt.initEvent(eventType, params.bubbles || false,
	              params.cancelable || true);
	          break;
	      }
	      common.defaults(evt, aux);
	      elem.dispatchEvent(evt);
	    },
	
	    /**
	     *
	     * @param elem
	     * @param event
	     * @param func
	     * @param bool
	     */
	    bind: function(elem, event, func, bool) {
	      bool = bool || false;
	      if (elem.addEventListener)
	        elem.addEventListener(event, func, bool);
	      else if (elem.attachEvent)
	        elem.attachEvent('on' + event, func);
	      return dom;
	    },
	
	    /**
	     *
	     * @param elem
	     * @param event
	     * @param func
	     * @param bool
	     */
	    unbind: function(elem, event, func, bool) {
	      bool = bool || false;
	      if (elem.removeEventListener)
	        elem.removeEventListener(event, func, bool);
	      else if (elem.detachEvent)
	        elem.detachEvent('on' + event, func);
	      return dom;
	    },
	
	    /**
	     *
	     * @param elem
	     * @param className
	     */
	    addClass: function(elem, className) {
	      if (elem.className === undefined) {
	        elem.className = className;
	      } else if (elem.className !== className) {
	        var classes = elem.className.split(/ +/);
	        if (classes.indexOf(className) == -1) {
	          classes.push(className);
	          elem.className = classes.join(' ').replace(/^\s+/, '').replace(/\s+$/, '');
	        }
	      }
	      return dom;
	    },
	
	    /**
	     *
	     * @param elem
	     * @param className
	     */
	    removeClass: function(elem, className) {
	      if (className) {
	        if (elem.className === undefined) {
	          // elem.className = className;
	        } else if (elem.className === className) {
	          elem.removeAttribute('class');
	        } else {
	          var classes = elem.className.split(/ +/);
	          var index = classes.indexOf(className);
	          if (index != -1) {
	            classes.splice(index, 1);
	            elem.className = classes.join(' ');
	          }
	        }
	      } else {
	        elem.className = undefined;
	      }
	      return dom;
	    },
	
	    hasClass: function(elem, className) {
	      return new RegExp('(?:^|\\s+)' + className + '(?:\\s+|$)').test(elem.className) || false;
	    },
	
	    /**
	     *
	     * @param elem
	     */
	    getWidth: function(elem) {
	
	      var style = getComputedStyle(elem);
	
	      return cssValueToPixels(style['border-left-width']) +
	          cssValueToPixels(style['border-right-width']) +
	          cssValueToPixels(style['padding-left']) +
	          cssValueToPixels(style['padding-right']) +
	          cssValueToPixels(style['width']);
	    },
	
	    /**
	     *
	     * @param elem
	     */
	    getHeight: function(elem) {
	
	      var style = getComputedStyle(elem);
	
	      return cssValueToPixels(style['border-top-width']) +
	          cssValueToPixels(style['border-bottom-width']) +
	          cssValueToPixels(style['padding-top']) +
	          cssValueToPixels(style['padding-bottom']) +
	          cssValueToPixels(style['height']);
	    },
	
	    /**
	     *
	     * @param elem
	     */
	    getOffset: function(elem) {
	      var offset = {left: 0, top:0};
	      if (elem.offsetParent) {
	        do {
	          offset.left += elem.offsetLeft;
	          offset.top += elem.offsetTop;
	        } while (elem = elem.offsetParent);
	      }
	      return offset;
	    },
	
	    // http://stackoverflow.com/posts/2684561/revisions
	    /**
	     * 
	     * @param elem
	     */
	    isActive: function(elem) {
	      return elem === document.activeElement && ( elem.type || elem.href );
	    }
	
	  };
	
	  return dom;
	
	})(dat.utils.common);
	
	
	dat.controllers.OptionController = (function (Controller, dom, common) {
	
	  /**
	   * @class Provides a select input to alter the property of an object, using a
	   * list of accepted values.
	   *
	   * @extends dat.controllers.Controller
	   *
	   * @param {Object} object The object to be manipulated
	   * @param {string} property The name of the property to be manipulated
	   * @param {Object|string[]} options A map of labels to acceptable values, or
	   * a list of acceptable string values.
	   *
	   * @member dat.controllers
	   */
	  var OptionController = function(object, property, options) {
	
	    OptionController.superclass.call(this, object, property);
	
	    var _this = this;
	
	    /**
	     * The drop down menu
	     * @ignore
	     */
	    this.__select = document.createElement('select');
	
	    if (common.isArray(options)) {
	      var map = {};
	      common.each(options, function(element) {
	        map[element] = element;
	      });
	      options = map;
	    }
	
	    common.each(options, function(value, key) {
	
	      var opt = document.createElement('option');
	      opt.innerHTML = key;
	      opt.setAttribute('value', value);
	      _this.__select.appendChild(opt);
	
	    });
	
	    // Acknowledge original value
	    this.updateDisplay();
	
	    dom.bind(this.__select, 'change', function() {
	      var desiredValue = this.options[this.selectedIndex].value;
	      _this.setValue(desiredValue);
	    });
	
	    this.domElement.appendChild(this.__select);
	
	  };
	
	  OptionController.superclass = Controller;
	
	  common.extend(
	
	      OptionController.prototype,
	      Controller.prototype,
	
	      {
	
	        setValue: function(v) {
	          var toReturn = OptionController.superclass.prototype.setValue.call(this, v);
	          if (this.__onFinishChange) {
	            this.__onFinishChange.call(this, this.getValue());
	          }
	          return toReturn;
	        },
	
	        updateDisplay: function() {
	          this.__select.value = this.getValue();
	          return OptionController.superclass.prototype.updateDisplay.call(this);
	        }
	
	      }
	
	  );
	
	  return OptionController;
	
	})(dat.controllers.Controller,
	dat.dom.dom,
	dat.utils.common);
	
	
	dat.controllers.NumberController = (function (Controller, common) {
	
	  /**
	   * @class Represents a given property of an object that is a number.
	   *
	   * @extends dat.controllers.Controller
	   *
	   * @param {Object} object The object to be manipulated
	   * @param {string} property The name of the property to be manipulated
	   * @param {Object} [params] Optional parameters
	   * @param {Number} [params.min] Minimum allowed value
	   * @param {Number} [params.max] Maximum allowed value
	   * @param {Number} [params.step] Increment by which to change value
	   *
	   * @member dat.controllers
	   */
	  var NumberController = function(object, property, params) {
	
	    NumberController.superclass.call(this, object, property);
	
	    params = params || {};
	
	    this.__min = params.min;
	    this.__max = params.max;
	    this.__step = params.step;
	
	    if (common.isUndefined(this.__step)) {
	
	      if (this.initialValue == 0) {
	        this.__impliedStep = 1; // What are we, psychics?
	      } else {
	        // Hey Doug, check this out.
	        this.__impliedStep = Math.pow(10, Math.floor(Math.log(this.initialValue)/Math.LN10))/10;
	      }
	
	    } else {
	
	      this.__impliedStep = this.__step;
	
	    }
	
	    this.__precision = numDecimals(this.__impliedStep);
	
	
	  };
	
	  NumberController.superclass = Controller;
	
	  common.extend(
	
	      NumberController.prototype,
	      Controller.prototype,
	
	      /** @lends dat.controllers.NumberController.prototype */
	      {
	
	        setValue: function(v) {
	
	          if (this.__min !== undefined && v < this.__min) {
	            v = this.__min;
	          } else if (this.__max !== undefined && v > this.__max) {
	            v = this.__max;
	          }
	
	          if (this.__step !== undefined && v % this.__step != 0) {
	            v = Math.round(v / this.__step) * this.__step;
	          }
	
	          return NumberController.superclass.prototype.setValue.call(this, v);
	
	        },
	
	        /**
	         * Specify a minimum value for <code>object[property]</code>.
	         *
	         * @param {Number} minValue The minimum value for
	         * <code>object[property]</code>
	         * @returns {dat.controllers.NumberController} this
	         */
	        min: function(v) {
	          this.__min = v;
	          return this;
	        },
	
	        /**
	         * Specify a maximum value for <code>object[property]</code>.
	         *
	         * @param {Number} maxValue The maximum value for
	         * <code>object[property]</code>
	         * @returns {dat.controllers.NumberController} this
	         */
	        max: function(v) {
	          this.__max = v;
	          return this;
	        },
	
	        /**
	         * Specify a step value that dat.controllers.NumberController
	         * increments by.
	         *
	         * @param {Number} stepValue The step value for
	         * dat.controllers.NumberController
	         * @default if minimum and maximum specified increment is 1% of the
	         * difference otherwise stepValue is 1
	         * @returns {dat.controllers.NumberController} this
	         */
	        step: function(v) {
	          this.__step = v;
	          return this;
	        }
	
	      }
	
	  );
	
	  function numDecimals(x) {
	    x = x.toString();
	    if (x.indexOf('.') > -1) {
	      return x.length - x.indexOf('.') - 1;
	    } else {
	      return 0;
	    }
	  }
	
	  return NumberController;
	
	})(dat.controllers.Controller,
	dat.utils.common);
	
	
	dat.controllers.NumberControllerBox = (function (NumberController, dom, common) {
	
	  /**
	   * @class Represents a given property of an object that is a number and
	   * provides an input element with which to manipulate it.
	   *
	   * @extends dat.controllers.Controller
	   * @extends dat.controllers.NumberController
	   *
	   * @param {Object} object The object to be manipulated
	   * @param {string} property The name of the property to be manipulated
	   * @param {Object} [params] Optional parameters
	   * @param {Number} [params.min] Minimum allowed value
	   * @param {Number} [params.max] Maximum allowed value
	   * @param {Number} [params.step] Increment by which to change value
	   *
	   * @member dat.controllers
	   */
	  var NumberControllerBox = function(object, property, params) {
	
	    this.__truncationSuspended = false;
	
	    NumberControllerBox.superclass.call(this, object, property, params);
	
	    var _this = this;
	
	    /**
	     * {Number} Previous mouse y position
	     * @ignore
	     */
	    var prev_y;
	
	    this.__input = document.createElement('input');
	    this.__input.setAttribute('type', 'text');
	
	    // Makes it so manually specified values are not truncated.
	
	    dom.bind(this.__input, 'change', onChange);
	    dom.bind(this.__input, 'blur', onBlur);
	    dom.bind(this.__input, 'mousedown', onMouseDown);
	    dom.bind(this.__input, 'keydown', function(e) {
	
	      // When pressing entire, you can be as precise as you want.
	      if (e.keyCode === 13) {
	        _this.__truncationSuspended = true;
	        this.blur();
	        _this.__truncationSuspended = false;
	      }
	
	    });
	
	    function onChange() {
	      var attempted = parseFloat(_this.__input.value);
	      if (!common.isNaN(attempted)) _this.setValue(attempted);
	    }
	
	    function onBlur() {
	      onChange();
	      if (_this.__onFinishChange) {
	        _this.__onFinishChange.call(_this, _this.getValue());
	      }
	    }
	
	    function onMouseDown(e) {
	      dom.bind(window, 'mousemove', onMouseDrag);
	      dom.bind(window, 'mouseup', onMouseUp);
	      prev_y = e.clientY;
	    }
	
	    function onMouseDrag(e) {
	
	      var diff = prev_y - e.clientY;
	      _this.setValue(_this.getValue() + diff * _this.__impliedStep);
	
	      prev_y = e.clientY;
	
	    }
	
	    function onMouseUp() {
	      dom.unbind(window, 'mousemove', onMouseDrag);
	      dom.unbind(window, 'mouseup', onMouseUp);
	    }
	
	    this.updateDisplay();
	
	    this.domElement.appendChild(this.__input);
	
	  };
	
	  NumberControllerBox.superclass = NumberController;
	
	  common.extend(
	
	      NumberControllerBox.prototype,
	      NumberController.prototype,
	
	      {
	
	        updateDisplay: function() {
	
	          this.__input.value = this.__truncationSuspended ? this.getValue() : roundToDecimal(this.getValue(), this.__precision);
	          return NumberControllerBox.superclass.prototype.updateDisplay.call(this);
	        }
	
	      }
	
	  );
	
	  function roundToDecimal(value, decimals) {
	    var tenTo = Math.pow(10, decimals);
	    return Math.round(value * tenTo) / tenTo;
	  }
	
	  return NumberControllerBox;
	
	})(dat.controllers.NumberController,
	dat.dom.dom,
	dat.utils.common);
	
	
	dat.controllers.NumberControllerSlider = (function (NumberController, dom, css, common, styleSheet) {
	
	  /**
	   * @class Represents a given property of an object that is a number, contains
	   * a minimum and maximum, and provides a slider element with which to
	   * manipulate it. It should be noted that the slider element is made up of
	   * <code>&lt;div&gt;</code> tags, <strong>not</strong> the html5
	   * <code>&lt;slider&gt;</code> element.
	   *
	   * @extends dat.controllers.Controller
	   * @extends dat.controllers.NumberController
	   * 
	   * @param {Object} object The object to be manipulated
	   * @param {string} property The name of the property to be manipulated
	   * @param {Number} minValue Minimum allowed value
	   * @param {Number} maxValue Maximum allowed value
	   * @param {Number} stepValue Increment by which to change value
	   *
	   * @member dat.controllers
	   */
	  var NumberControllerSlider = function(object, property, min, max, step) {
	
	    NumberControllerSlider.superclass.call(this, object, property, { min: min, max: max, step: step });
	
	    var _this = this;
	
	    this.__background = document.createElement('div');
	    this.__foreground = document.createElement('div');
	    
	
	
	    dom.bind(this.__background, 'mousedown', onMouseDown);
	    
	    dom.addClass(this.__background, 'slider');
	    dom.addClass(this.__foreground, 'slider-fg');
	
	    function onMouseDown(e) {
	
	      dom.bind(window, 'mousemove', onMouseDrag);
	      dom.bind(window, 'mouseup', onMouseUp);
	
	      onMouseDrag(e);
	    }
	
	    function onMouseDrag(e) {
	
	      e.preventDefault();
	
	      var offset = dom.getOffset(_this.__background);
	      var width = dom.getWidth(_this.__background);
	      
	      _this.setValue(
	        map(e.clientX, offset.left, offset.left + width, _this.__min, _this.__max)
	      );
	
	      return false;
	
	    }
	
	    function onMouseUp() {
	      dom.unbind(window, 'mousemove', onMouseDrag);
	      dom.unbind(window, 'mouseup', onMouseUp);
	      if (_this.__onFinishChange) {
	        _this.__onFinishChange.call(_this, _this.getValue());
	      }
	    }
	
	    this.updateDisplay();
	
	    this.__background.appendChild(this.__foreground);
	    this.domElement.appendChild(this.__background);
	
	  };
	
	  NumberControllerSlider.superclass = NumberController;
	
	  /**
	   * Injects default stylesheet for slider elements.
	   */
	  NumberControllerSlider.useDefaultStyles = function() {
	    css.inject(styleSheet);
	  };
	
	  common.extend(
	
	      NumberControllerSlider.prototype,
	      NumberController.prototype,
	
	      {
	
	        updateDisplay: function() {
	          var pct = (this.getValue() - this.__min)/(this.__max - this.__min);
	          this.__foreground.style.width = pct*100+'%';
	          return NumberControllerSlider.superclass.prototype.updateDisplay.call(this);
	        }
	
	      }
	
	
	
	  );
	
	  function map(v, i1, i2, o1, o2) {
	    return o1 + (o2 - o1) * ((v - i1) / (i2 - i1));
	  }
	
	  return NumberControllerSlider;
	  
	})(dat.controllers.NumberController,
	dat.dom.dom,
	dat.utils.css,
	dat.utils.common,
	".slider {\n  box-shadow: inset 0 2px 4px rgba(0,0,0,0.15);\n  height: 1em;\n  border-radius: 1em;\n  background-color: #eee;\n  padding: 0 0.5em;\n  overflow: hidden;\n}\n\n.slider-fg {\n  padding: 1px 0 2px 0;\n  background-color: #aaa;\n  height: 1em;\n  margin-left: -0.5em;\n  padding-right: 0.5em;\n  border-radius: 1em 0 0 1em;\n}\n\n.slider-fg:after {\n  display: inline-block;\n  border-radius: 1em;\n  background-color: #fff;\n  border:  1px solid #aaa;\n  content: '';\n  float: right;\n  margin-right: -1em;\n  margin-top: -1px;\n  height: 0.9em;\n  width: 0.9em;\n}");
	
	
	dat.controllers.FunctionController = (function (Controller, dom, common) {
	
	  /**
	   * @class Provides a GUI interface to fire a specified method, a property of an object.
	   *
	   * @extends dat.controllers.Controller
	   *
	   * @param {Object} object The object to be manipulated
	   * @param {string} property The name of the property to be manipulated
	   *
	   * @member dat.controllers
	   */
	  var FunctionController = function(object, property, text) {
	
	    FunctionController.superclass.call(this, object, property);
	
	    var _this = this;
	
	    this.__button = document.createElement('div');
	    this.__button.innerHTML = text === undefined ? 'Fire' : text;
	    dom.bind(this.__button, 'click', function(e) {
	      e.preventDefault();
	      _this.fire();
	      return false;
	    });
	
	    dom.addClass(this.__button, 'button');
	
	    this.domElement.appendChild(this.__button);
	
	
	  };
	
	  FunctionController.superclass = Controller;
	
	  common.extend(
	
	      FunctionController.prototype,
	      Controller.prototype,
	      {
	        
	        fire: function() {
	          if (this.__onChange) {
	            this.__onChange.call(this);
	          }
	          if (this.__onFinishChange) {
	            this.__onFinishChange.call(this, this.getValue());
	          }
	          this.getValue().call(this.object);
	        }
	      }
	
	  );
	
	  return FunctionController;
	
	})(dat.controllers.Controller,
	dat.dom.dom,
	dat.utils.common);
	
	
	dat.controllers.BooleanController = (function (Controller, dom, common) {
	
	  /**
	   * @class Provides a checkbox input to alter the boolean property of an object.
	   * @extends dat.controllers.Controller
	   *
	   * @param {Object} object The object to be manipulated
	   * @param {string} property The name of the property to be manipulated
	   *
	   * @member dat.controllers
	   */
	  var BooleanController = function(object, property) {
	
	    BooleanController.superclass.call(this, object, property);
	
	    var _this = this;
	    this.__prev = this.getValue();
	
	    this.__checkbox = document.createElement('input');
	    this.__checkbox.setAttribute('type', 'checkbox');
	
	
	    dom.bind(this.__checkbox, 'change', onChange, false);
	
	    this.domElement.appendChild(this.__checkbox);
	
	    // Match original value
	    this.updateDisplay();
	
	    function onChange() {
	      _this.setValue(!_this.__prev);
	    }
	
	  };
	
	  BooleanController.superclass = Controller;
	
	  common.extend(
	
	      BooleanController.prototype,
	      Controller.prototype,
	
	      {
	
	        setValue: function(v) {
	          var toReturn = BooleanController.superclass.prototype.setValue.call(this, v);
	          if (this.__onFinishChange) {
	            this.__onFinishChange.call(this, this.getValue());
	          }
	          this.__prev = this.getValue();
	          return toReturn;
	        },
	
	        updateDisplay: function() {
	          
	          if (this.getValue() === true) {
	            this.__checkbox.setAttribute('checked', 'checked');
	            this.__checkbox.checked = true;    
	          } else {
	              this.__checkbox.checked = false;
	          }
	
	          return BooleanController.superclass.prototype.updateDisplay.call(this);
	
	        }
	
	
	      }
	
	  );
	
	  return BooleanController;
	
	})(dat.controllers.Controller,
	dat.dom.dom,
	dat.utils.common);
	
	
	dat.color.toString = (function (common) {
	
	  return function(color) {
	
	    if (color.a == 1 || common.isUndefined(color.a)) {
	
	      var s = color.hex.toString(16);
	      while (s.length < 6) {
	        s = '0' + s;
	      }
	
	      return '#' + s;
	
	    } else {
	
	      return 'rgba(' + Math.round(color.r) + ',' + Math.round(color.g) + ',' + Math.round(color.b) + ',' + color.a + ')';
	
	    }
	
	  }
	
	})(dat.utils.common);
	
	
	dat.color.interpret = (function (toString, common) {
	
	  var result, toReturn;
	
	  var interpret = function() {
	
	    toReturn = false;
	
	    var original = arguments.length > 1 ? common.toArray(arguments) : arguments[0];
	
	    common.each(INTERPRETATIONS, function(family) {
	
	      if (family.litmus(original)) {
	
	        common.each(family.conversions, function(conversion, conversionName) {
	
	          result = conversion.read(original);
	
	          if (toReturn === false && result !== false) {
	            toReturn = result;
	            result.conversionName = conversionName;
	            result.conversion = conversion;
	            return common.BREAK;
	
	          }
	
	        });
	
	        return common.BREAK;
	
	      }
	
	    });
	
	    return toReturn;
	
	  };
	
	  var INTERPRETATIONS = [
	
	    // Strings
	    {
	
	      litmus: common.isString,
	
	      conversions: {
	
	        THREE_CHAR_HEX: {
	
	          read: function(original) {
	
	            var test = original.match(/^#([A-F0-9])([A-F0-9])([A-F0-9])$/i);
	            if (test === null) return false;
	
	            return {
	              space: 'HEX',
	              hex: parseInt(
	                  '0x' +
	                      test[1].toString() + test[1].toString() +
	                      test[2].toString() + test[2].toString() +
	                      test[3].toString() + test[3].toString())
	            };
	
	          },
	
	          write: toString
	
	        },
	
	        SIX_CHAR_HEX: {
	
	          read: function(original) {
	
	            var test = original.match(/^#([A-F0-9]{6})$/i);
	            if (test === null) return false;
	
	            return {
	              space: 'HEX',
	              hex: parseInt('0x' + test[1].toString())
	            };
	
	          },
	
	          write: toString
	
	        },
	
	        CSS_RGB: {
	
	          read: function(original) {
	
	            var test = original.match(/^rgb\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\)/);
	            if (test === null) return false;
	
	            return {
	              space: 'RGB',
	              r: parseFloat(test[1]),
	              g: parseFloat(test[2]),
	              b: parseFloat(test[3])
	            };
	
	          },
	
	          write: toString
	
	        },
	
	        CSS_RGBA: {
	
	          read: function(original) {
	
	            var test = original.match(/^rgba\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\,\s*(.+)\s*\)/);
	            if (test === null) return false;
	
	            return {
	              space: 'RGB',
	              r: parseFloat(test[1]),
	              g: parseFloat(test[2]),
	              b: parseFloat(test[3]),
	              a: parseFloat(test[4])
	            };
	
	          },
	
	          write: toString
	
	        }
	
	      }
	
	    },
	
	    // Numbers
	    {
	
	      litmus: common.isNumber,
	
	      conversions: {
	
	        HEX: {
	          read: function(original) {
	            return {
	              space: 'HEX',
	              hex: original,
	              conversionName: 'HEX'
	            }
	          },
	
	          write: function(color) {
	            return color.hex;
	          }
	        }
	
	      }
	
	    },
	
	    // Arrays
	    {
	
	      litmus: common.isArray,
	
	      conversions: {
	
	        RGB_ARRAY: {
	          read: function(original) {
	            if (original.length != 3) return false;
	            return {
	              space: 'RGB',
	              r: original[0],
	              g: original[1],
	              b: original[2]
	            };
	          },
	
	          write: function(color) {
	            return [color.r, color.g, color.b];
	          }
	
	        },
	
	        RGBA_ARRAY: {
	          read: function(original) {
	            if (original.length != 4) return false;
	            return {
	              space: 'RGB',
	              r: original[0],
	              g: original[1],
	              b: original[2],
	              a: original[3]
	            };
	          },
	
	          write: function(color) {
	            return [color.r, color.g, color.b, color.a];
	          }
	
	        }
	
	      }
	
	    },
	
	    // Objects
	    {
	
	      litmus: common.isObject,
	
	      conversions: {
	
	        RGBA_OBJ: {
	          read: function(original) {
	            if (common.isNumber(original.r) &&
	                common.isNumber(original.g) &&
	                common.isNumber(original.b) &&
	                common.isNumber(original.a)) {
	              return {
	                space: 'RGB',
	                r: original.r,
	                g: original.g,
	                b: original.b,
	                a: original.a
	              }
	            }
	            return false;
	          },
	
	          write: function(color) {
	            return {
	              r: color.r,
	              g: color.g,
	              b: color.b,
	              a: color.a
	            }
	          }
	        },
	
	        RGB_OBJ: {
	          read: function(original) {
	            if (common.isNumber(original.r) &&
	                common.isNumber(original.g) &&
	                common.isNumber(original.b)) {
	              return {
	                space: 'RGB',
	                r: original.r,
	                g: original.g,
	                b: original.b
	              }
	            }
	            return false;
	          },
	
	          write: function(color) {
	            return {
	              r: color.r,
	              g: color.g,
	              b: color.b
	            }
	          }
	        },
	
	        HSVA_OBJ: {
	          read: function(original) {
	            if (common.isNumber(original.h) &&
	                common.isNumber(original.s) &&
	                common.isNumber(original.v) &&
	                common.isNumber(original.a)) {
	              return {
	                space: 'HSV',
	                h: original.h,
	                s: original.s,
	                v: original.v,
	                a: original.a
	              }
	            }
	            return false;
	          },
	
	          write: function(color) {
	            return {
	              h: color.h,
	              s: color.s,
	              v: color.v,
	              a: color.a
	            }
	          }
	        },
	
	        HSV_OBJ: {
	          read: function(original) {
	            if (common.isNumber(original.h) &&
	                common.isNumber(original.s) &&
	                common.isNumber(original.v)) {
	              return {
	                space: 'HSV',
	                h: original.h,
	                s: original.s,
	                v: original.v
	              }
	            }
	            return false;
	          },
	
	          write: function(color) {
	            return {
	              h: color.h,
	              s: color.s,
	              v: color.v
	            }
	          }
	
	        }
	
	      }
	
	    }
	
	
	  ];
	
	  return interpret;
	
	
	})(dat.color.toString,
	dat.utils.common);
	
	
	dat.GUI = dat.gui.GUI = (function (css, saveDialogueContents, styleSheet, controllerFactory, Controller, BooleanController, FunctionController, NumberControllerBox, NumberControllerSlider, OptionController, ColorController, requestAnimationFrame, CenteredDiv, dom, common) {
	
	  css.inject(styleSheet);
	
	  /** Outer-most className for GUI's */
	  var CSS_NAMESPACE = 'dg';
	
	  var HIDE_KEY_CODE = 72;
	
	  /** The only value shared between the JS and SCSS. Use caution. */
	  var CLOSE_BUTTON_HEIGHT = 20;
	
	  var DEFAULT_DEFAULT_PRESET_NAME = 'Default';
	
	  var SUPPORTS_LOCAL_STORAGE = (function() {
	    try {
	      return 'localStorage' in window && window['localStorage'] !== null;
	    } catch (e) {
	      return false;
	    }
	  })();
	
	  var SAVE_DIALOGUE;
	
	  /** Have we yet to create an autoPlace GUI? */
	  var auto_place_virgin = true;
	
	  /** Fixed position div that auto place GUI's go inside */
	  var auto_place_container;
	
	  /** Are we hiding the GUI's ? */
	  var hide = false;
	
	  /** GUI's which should be hidden */
	  var hideable_guis = [];
	
	  /**
	   * A lightweight controller library for JavaScript. It allows you to easily
	   * manipulate variables and fire functions on the fly.
	   * @class
	   *
	   * @member dat.gui
	   *
	   * @param {Object} [params]
	   * @param {String} [params.name] The name of this GUI.
	   * @param {Object} [params.load] JSON object representing the saved state of
	   * this GUI.
	   * @param {Boolean} [params.auto=true]
	   * @param {dat.gui.GUI} [params.parent] The GUI I'm nested in.
	   * @param {Boolean} [params.closed] If true, starts closed
	   */
	  var GUI = function(params) {
	
	    var _this = this;
	
	    /**
	     * Outermost DOM Element
	     * @type DOMElement
	     */
	    this.domElement = document.createElement('div');
	    this.__ul = document.createElement('ul');
	    this.domElement.appendChild(this.__ul);
	
	    dom.addClass(this.domElement, CSS_NAMESPACE);
	
	    /**
	     * Nested GUI's by name
	     * @ignore
	     */
	    this.__folders = {};
	
	    this.__controllers = [];
	
	    /**
	     * List of objects I'm remembering for save, only used in top level GUI
	     * @ignore
	     */
	    this.__rememberedObjects = [];
	
	    /**
	     * Maps the index of remembered objects to a map of controllers, only used
	     * in top level GUI.
	     *
	     * @private
	     * @ignore
	     *
	     * @example
	     * [
	     *  {
	     *    propertyName: Controller,
	     *    anotherPropertyName: Controller
	     *  },
	     *  {
	     *    propertyName: Controller
	     *  }
	     * ]
	     */
	    this.__rememberedObjectIndecesToControllers = [];
	
	    this.__listening = [];
	
	    params = params || {};
	
	    // Default parameters
	    params = common.defaults(params, {
	      autoPlace: true,
	      width: GUI.DEFAULT_WIDTH
	    });
	
	    params = common.defaults(params, {
	      resizable: params.autoPlace,
	      hideable: params.autoPlace
	    });
	
	
	    if (!common.isUndefined(params.load)) {
	
	      // Explicit preset
	      if (params.preset) params.load.preset = params.preset;
	
	    } else {
	
	      params.load = { preset: DEFAULT_DEFAULT_PRESET_NAME };
	
	    }
	
	    if (common.isUndefined(params.parent) && params.hideable) {
	      hideable_guis.push(this);
	    }
	
	    // Only root level GUI's are resizable.
	    params.resizable = common.isUndefined(params.parent) && params.resizable;
	
	
	    if (params.autoPlace && common.isUndefined(params.scrollable)) {
	      params.scrollable = true;
	    }
	//    params.scrollable = common.isUndefined(params.parent) && params.scrollable === true;
	
	    // Not part of params because I don't want people passing this in via
	    // constructor. Should be a 'remembered' value.
	    var use_local_storage =
	        SUPPORTS_LOCAL_STORAGE &&
	            localStorage.getItem(getLocalStorageHash(this, 'isLocal')) === 'true';
	
	    Object.defineProperties(this,
	
	        /** @lends dat.gui.GUI.prototype */
	        {
	
	          /**
	           * The parent <code>GUI</code>
	           * @type dat.gui.GUI
	           */
	          parent: {
	            get: function() {
	              return params.parent;
	            }
	          },
	
	          scrollable: {
	            get: function() {
	              return params.scrollable;
	            }
	          },
	
	          /**
	           * Handles <code>GUI</code>'s element placement for you
	           * @type Boolean
	           */
	          autoPlace: {
	            get: function() {
	              return params.autoPlace;
	            }
	          },
	
	          /**
	           * The identifier for a set of saved values
	           * @type String
	           */
	          preset: {
	
	            get: function() {
	              if (_this.parent) {
	                return _this.getRoot().preset;
	              } else {
	                return params.load.preset;
	              }
	            },
	
	            set: function(v) {
	              if (_this.parent) {
	                _this.getRoot().preset = v;
	              } else {
	                params.load.preset = v;
	              }
	              setPresetSelectIndex(this);
	              _this.revert();
	            }
	
	          },
	
	          /**
	           * The width of <code>GUI</code> element
	           * @type Number
	           */
	          width: {
	            get: function() {
	              return params.width;
	            },
	            set: function(v) {
	              params.width = v;
	              setWidth(_this, v);
	            }
	          },
	
	          /**
	           * The name of <code>GUI</code>. Used for folders. i.e
	           * a folder's name
	           * @type String
	           */
	          name: {
	            get: function() {
	              return params.name;
	            },
	            set: function(v) {
	              // TODO Check for collisions among sibling folders
	              params.name = v;
	              if (title_row_name) {
	                title_row_name.innerHTML = params.name;
	              }
	            }
	          },
	
	          /**
	           * Whether the <code>GUI</code> is collapsed or not
	           * @type Boolean
	           */
	          closed: {
	            get: function() {
	              return params.closed;
	            },
	            set: function(v) {
	              params.closed = v;
	              if (params.closed) {
	                dom.addClass(_this.__ul, GUI.CLASS_CLOSED);
	              } else {
	                dom.removeClass(_this.__ul, GUI.CLASS_CLOSED);
	              }
	              // For browsers that aren't going to respect the CSS transition,
	              // Lets just check our height against the window height right off
	              // the bat.
	              this.onResize();
	
	              if (_this.__closeButton) {
	                _this.__closeButton.innerHTML = v ? GUI.TEXT_OPEN : GUI.TEXT_CLOSED;
	              }
	            }
	          },
	
	          /**
	           * Contains all presets
	           * @type Object
	           */
	          load: {
	            get: function() {
	              return params.load;
	            }
	          },
	
	          /**
	           * Determines whether or not to use <a href="https://developer.mozilla.org/en/DOM/Storage#localStorage">localStorage</a> as the means for
	           * <code>remember</code>ing
	           * @type Boolean
	           */
	          useLocalStorage: {
	
	            get: function() {
	              return use_local_storage;
	            },
	            set: function(bool) {
	              if (SUPPORTS_LOCAL_STORAGE) {
	                use_local_storage = bool;
	                if (bool) {
	                  dom.bind(window, 'unload', saveToLocalStorage);
	                } else {
	                  dom.unbind(window, 'unload', saveToLocalStorage);
	                }
	                localStorage.setItem(getLocalStorageHash(_this, 'isLocal'), bool);
	              }
	            }
	
	          }
	
	        });
	
	    // Are we a root level GUI?
	    if (common.isUndefined(params.parent)) {
	
	      params.closed = false;
	
	      dom.addClass(this.domElement, GUI.CLASS_MAIN);
	      dom.makeSelectable(this.domElement, false);
	
	      // Are we supposed to be loading locally?
	      if (SUPPORTS_LOCAL_STORAGE) {
	
	        if (use_local_storage) {
	
	          _this.useLocalStorage = true;
	
	          var saved_gui = localStorage.getItem(getLocalStorageHash(this, 'gui'));
	
	          if (saved_gui) {
	            params.load = JSON.parse(saved_gui);
	          }
	
	        }
	
	      }
	
	      this.__closeButton = document.createElement('div');
	      this.__closeButton.innerHTML = GUI.TEXT_CLOSED;
	      dom.addClass(this.__closeButton, GUI.CLASS_CLOSE_BUTTON);
	      this.domElement.appendChild(this.__closeButton);
	
	      dom.bind(this.__closeButton, 'click', function() {
	
	        _this.closed = !_this.closed;
	
	
	      });
	
	
	      // Oh, you're a nested GUI!
	    } else {
	
	      if (params.closed === undefined) {
	        params.closed = true;
	      }
	
	      var title_row_name = document.createTextNode(params.name);
	      dom.addClass(title_row_name, 'controller-name');
	
	      var title_row = addRow(_this, title_row_name);
	
	      var on_click_title = function(e) {
	        e.preventDefault();
	        _this.closed = !_this.closed;
	        return false;
	      };
	
	      dom.addClass(this.__ul, GUI.CLASS_CLOSED);
	
	      dom.addClass(title_row, 'title');
	      dom.bind(title_row, 'click', on_click_title);
	
	      if (!params.closed) {
	        this.closed = false;
	      }
	
	    }
	
	    if (params.autoPlace) {
	
	      if (common.isUndefined(params.parent)) {
	
	        if (auto_place_virgin) {
	          auto_place_container = document.createElement('div');
	          dom.addClass(auto_place_container, CSS_NAMESPACE);
	          dom.addClass(auto_place_container, GUI.CLASS_AUTO_PLACE_CONTAINER);
	          document.body.appendChild(auto_place_container);
	          auto_place_virgin = false;
	        }
	
	        // Put it in the dom for you.
	        auto_place_container.appendChild(this.domElement);
	
	        // Apply the auto styles
	        dom.addClass(this.domElement, GUI.CLASS_AUTO_PLACE);
	
	      }
	
	
	      // Make it not elastic.
	      if (!this.parent) setWidth(_this, params.width);
	
	    }
	
	    dom.bind(window, 'resize', function() { _this.onResize() });
	    dom.bind(this.__ul, 'webkitTransitionEnd', function() { _this.onResize(); });
	    dom.bind(this.__ul, 'transitionend', function() { _this.onResize() });
	    dom.bind(this.__ul, 'oTransitionEnd', function() { _this.onResize() });
	    this.onResize();
	
	
	    if (params.resizable) {
	      addResizeHandle(this);
	    }
	
	    function saveToLocalStorage() {
	      localStorage.setItem(getLocalStorageHash(_this, 'gui'), JSON.stringify(_this.getSaveObject()));
	    }
	
	    var root = _this.getRoot();
	    function resetWidth() {
	        var root = _this.getRoot();
	        root.width += 1;
	        common.defer(function() {
	          root.width -= 1;
	        });
	      }
	
	      if (!params.parent) {
	        resetWidth();
	      }
	
	  };
	
	  GUI.toggleHide = function() {
	
	    hide = !hide;
	    common.each(hideable_guis, function(gui) {
	      gui.domElement.style.zIndex = hide ? -999 : 999;
	      gui.domElement.style.opacity = hide ? 0 : 1;
	    });
	  };
	
	  GUI.CLASS_AUTO_PLACE = 'a';
	  GUI.CLASS_AUTO_PLACE_CONTAINER = 'ac';
	  GUI.CLASS_MAIN = 'main';
	  GUI.CLASS_CONTROLLER_ROW = 'cr';
	  GUI.CLASS_TOO_TALL = 'taller-than-window';
	  GUI.CLASS_CLOSED = 'closed';
	  GUI.CLASS_CLOSE_BUTTON = 'close-button';
	  GUI.CLASS_DRAG = 'drag';
	
	  GUI.DEFAULT_WIDTH = 245;
	  GUI.TEXT_CLOSED = 'Close Controls';
	  GUI.TEXT_OPEN = 'Open Controls';
	
	  dom.bind(window, 'keydown', function(e) {
	
	    if (document.activeElement.type !== 'text' &&
	        (e.which === HIDE_KEY_CODE || e.keyCode == HIDE_KEY_CODE)) {
	      GUI.toggleHide();
	    }
	
	  }, false);
	
	  common.extend(
	
	      GUI.prototype,
	
	      /** @lends dat.gui.GUI */
	      {
	
	        /**
	         * @param object
	         * @param property
	         * @returns {dat.controllers.Controller} The new controller that was added.
	         * @instance
	         */
	        add: function(object, property) {
	
	          return add(
	              this,
	              object,
	              property,
	              {
	                factoryArgs: Array.prototype.slice.call(arguments, 2)
	              }
	          );
	
	        },
	
	        /**
	         * @param object
	         * @param property
	         * @returns {dat.controllers.ColorController} The new controller that was added.
	         * @instance
	         */
	        addColor: function(object, property) {
	
	          return add(
	              this,
	              object,
	              property,
	              {
	                color: true
	              }
	          );
	
	        },
	
	        /**
	         * @param controller
	         * @instance
	         */
	        remove: function(controller) {
	
	          // TODO listening?
	          this.__ul.removeChild(controller.__li);
	          this.__controllers.slice(this.__controllers.indexOf(controller), 1);
	          var _this = this;
	          common.defer(function() {
	            _this.onResize();
	          });
	
	        },
	
	        destroy: function() {
	
	          if (this.autoPlace) {
	            auto_place_container.removeChild(this.domElement);
	          }
	
	        },
	
	        /**
	         * @param name
	         * @returns {dat.gui.GUI} The new folder.
	         * @throws {Error} if this GUI already has a folder by the specified
	         * name
	         * @instance
	         */
	        addFolder: function(name) {
	
	          // We have to prevent collisions on names in order to have a key
	          // by which to remember saved values
	          if (this.__folders[name] !== undefined) {
	            throw new Error('You already have a folder in this GUI by the' +
	                ' name "' + name + '"');
	          }
	
	          var new_gui_params = { name: name, parent: this };
	
	          // We need to pass down the autoPlace trait so that we can
	          // attach event listeners to open/close folder actions to
	          // ensure that a scrollbar appears if the window is too short.
	          new_gui_params.autoPlace = this.autoPlace;
	
	          // Do we have saved appearance data for this folder?
	
	          if (this.load && // Anything loaded?
	              this.load.folders && // Was my parent a dead-end?
	              this.load.folders[name]) { // Did daddy remember me?
	
	            // Start me closed if I was closed
	            new_gui_params.closed = this.load.folders[name].closed;
	
	            // Pass down the loaded data
	            new_gui_params.load = this.load.folders[name];
	
	          }
	
	          var gui = new GUI(new_gui_params);
	          this.__folders[name] = gui;
	
	          var li = addRow(this, gui.domElement);
	          dom.addClass(li, 'folder');
	          return gui;
	
	        },
	
	        open: function() {
	          this.closed = false;
	        },
	
	        close: function() {
	          this.closed = true;
	        },
	
	        onResize: function() {
	
	          var root = this.getRoot();
	
	          if (root.scrollable) {
	
	            var top = dom.getOffset(root.__ul).top;
	            var h = 0;
	
	            common.each(root.__ul.childNodes, function(node) {
	              if (! (root.autoPlace && node === root.__save_row))
	                h += dom.getHeight(node);
	            });
	
	            if (window.innerHeight - top - CLOSE_BUTTON_HEIGHT < h) {
	              dom.addClass(root.domElement, GUI.CLASS_TOO_TALL);
	              root.__ul.style.height = window.innerHeight - top - CLOSE_BUTTON_HEIGHT + 'px';
	            } else {
	              dom.removeClass(root.domElement, GUI.CLASS_TOO_TALL);
	              root.__ul.style.height = 'auto';
	            }
	
	          }
	
	          if (root.__resize_handle) {
	            common.defer(function() {
	              root.__resize_handle.style.height = root.__ul.offsetHeight + 'px';
	            });
	          }
	
	          if (root.__closeButton) {
	            root.__closeButton.style.width = root.width + 'px';
	          }
	
	        },
	
	        /**
	         * Mark objects for saving. The order of these objects cannot change as
	         * the GUI grows. When remembering new objects, append them to the end
	         * of the list.
	         *
	         * @param {Object...} objects
	         * @throws {Error} if not called on a top level GUI.
	         * @instance
	         */
	        remember: function() {
	
	          if (common.isUndefined(SAVE_DIALOGUE)) {
	            SAVE_DIALOGUE = new CenteredDiv();
	            SAVE_DIALOGUE.domElement.innerHTML = saveDialogueContents;
	          }
	
	          if (this.parent) {
	            throw new Error("You can only call remember on a top level GUI.");
	          }
	
	          var _this = this;
	
	          common.each(Array.prototype.slice.call(arguments), function(object) {
	            if (_this.__rememberedObjects.length == 0) {
	              addSaveMenu(_this);
	            }
	            if (_this.__rememberedObjects.indexOf(object) == -1) {
	              _this.__rememberedObjects.push(object);
	            }
	          });
	
	          if (this.autoPlace) {
	            // Set save row width
	            setWidth(this, this.width);
	          }
	
	        },
	
	        /**
	         * @returns {dat.gui.GUI} the topmost parent GUI of a nested GUI.
	         * @instance
	         */
	        getRoot: function() {
	          var gui = this;
	          while (gui.parent) {
	            gui = gui.parent;
	          }
	          return gui;
	        },
	
	        /**
	         * @returns {Object} a JSON object representing the current state of
	         * this GUI as well as its remembered properties.
	         * @instance
	         */
	        getSaveObject: function() {
	
	          var toReturn = this.load;
	
	          toReturn.closed = this.closed;
	
	          // Am I remembering any values?
	          if (this.__rememberedObjects.length > 0) {
	
	            toReturn.preset = this.preset;
	
	            if (!toReturn.remembered) {
	              toReturn.remembered = {};
	            }
	
	            toReturn.remembered[this.preset] = getCurrentPreset(this);
	
	          }
	
	          toReturn.folders = {};
	          common.each(this.__folders, function(element, key) {
	            toReturn.folders[key] = element.getSaveObject();
	          });
	
	          return toReturn;
	
	        },
	
	        save: function() {
	
	          if (!this.load.remembered) {
	            this.load.remembered = {};
	          }
	
	          this.load.remembered[this.preset] = getCurrentPreset(this);
	          markPresetModified(this, false);
	
	        },
	
	        saveAs: function(presetName) {
	
	          if (!this.load.remembered) {
	
	            // Retain default values upon first save
	            this.load.remembered = {};
	            this.load.remembered[DEFAULT_DEFAULT_PRESET_NAME] = getCurrentPreset(this, true);
	
	          }
	
	          this.load.remembered[presetName] = getCurrentPreset(this);
	          this.preset = presetName;
	          addPresetOption(this, presetName, true);
	
	        },
	
	        revert: function(gui) {
	
	          common.each(this.__controllers, function(controller) {
	            // Make revert work on Default.
	            if (!this.getRoot().load.remembered) {
	              controller.setValue(controller.initialValue);
	            } else {
	              recallSavedValue(gui || this.getRoot(), controller);
	            }
	          }, this);
	
	          common.each(this.__folders, function(folder) {
	            folder.revert(folder);
	          });
	
	          if (!gui) {
	            markPresetModified(this.getRoot(), false);
	          }
	
	
	        },
	
	        listen: function(controller) {
	
	          var init = this.__listening.length == 0;
	          this.__listening.push(controller);
	          if (init) updateDisplays(this.__listening);
	
	        }
	
	      }
	
	  );
	
	  function add(gui, object, property, params) {
	
	    if (object[property] === undefined) {
	      throw new Error("Object " + object + " has no property \"" + property + "\"");
	    }
	
	    var controller;
	
	    if (params.color) {
	
	      controller = new ColorController(object, property);
	
	    } else {
	
	      var factoryArgs = [object,property].concat(params.factoryArgs);
	      controller = controllerFactory.apply(gui, factoryArgs);
	
	    }
	
	    if (params.before instanceof Controller) {
	      params.before = params.before.__li;
	    }
	
	    recallSavedValue(gui, controller);
	
	    dom.addClass(controller.domElement, 'c');
	
	    var name = document.createElement('span');
	    dom.addClass(name, 'property-name');
	    name.innerHTML = controller.property;
	
	    var container = document.createElement('div');
	    container.appendChild(name);
	    container.appendChild(controller.domElement);
	
	    var li = addRow(gui, container, params.before);
	
	    dom.addClass(li, GUI.CLASS_CONTROLLER_ROW);
	    dom.addClass(li, typeof controller.getValue());
	
	    augmentController(gui, li, controller);
	
	    gui.__controllers.push(controller);
	
	    return controller;
	
	  }
	
	  /**
	   * Add a row to the end of the GUI or before another row.
	   *
	   * @param gui
	   * @param [dom] If specified, inserts the dom content in the new row
	   * @param [liBefore] If specified, places the new row before another row
	   */
	  function addRow(gui, dom, liBefore) {
	    var li = document.createElement('li');
	    if (dom) li.appendChild(dom);
	    if (liBefore) {
	      gui.__ul.insertBefore(li, params.before);
	    } else {
	      gui.__ul.appendChild(li);
	    }
	    gui.onResize();
	    return li;
	  }
	
	  function augmentController(gui, li, controller) {
	
	    controller.__li = li;
	    controller.__gui = gui;
	
	    common.extend(controller, {
	
	      options: function(options) {
	
	        if (arguments.length > 1) {
	          controller.remove();
	
	          return add(
	              gui,
	              controller.object,
	              controller.property,
	              {
	                before: controller.__li.nextElementSibling,
	                factoryArgs: [common.toArray(arguments)]
	              }
	          );
	
	        }
	
	        if (common.isArray(options) || common.isObject(options)) {
	          controller.remove();
	
	          return add(
	              gui,
	              controller.object,
	              controller.property,
	              {
	                before: controller.__li.nextElementSibling,
	                factoryArgs: [options]
	              }
	          );
	
	        }
	
	      },
	
	      name: function(v) {
	        controller.__li.firstElementChild.firstElementChild.innerHTML = v;
	        return controller;
	      },
	
	      listen: function() {
	        controller.__gui.listen(controller);
	        return controller;
	      },
	
	      remove: function() {
	        controller.__gui.remove(controller);
	        return controller;
	      }
	
	    });
	
	    // All sliders should be accompanied by a box.
	    if (controller instanceof NumberControllerSlider) {
	
	      var box = new NumberControllerBox(controller.object, controller.property,
	          { min: controller.__min, max: controller.__max, step: controller.__step });
	
	      common.each(['updateDisplay', 'onChange', 'onFinishChange'], function(method) {
	        var pc = controller[method];
	        var pb = box[method];
	        controller[method] = box[method] = function() {
	          var args = Array.prototype.slice.call(arguments);
	          pc.apply(controller, args);
	          return pb.apply(box, args);
	        }
	      });
	
	      dom.addClass(li, 'has-slider');
	      controller.domElement.insertBefore(box.domElement, controller.domElement.firstElementChild);
	
	    }
	    else if (controller instanceof NumberControllerBox) {
	
	      var r = function(returned) {
	
	        // Have we defined both boundaries?
	        if (common.isNumber(controller.__min) && common.isNumber(controller.__max)) {
	
	          // Well, then lets just replace this with a slider.
	          controller.remove();
	          return add(
	              gui,
	              controller.object,
	              controller.property,
	              {
	                before: controller.__li.nextElementSibling,
	                factoryArgs: [controller.__min, controller.__max, controller.__step]
	              });
	
	        }
	
	        return returned;
	
	      };
	
	      controller.min = common.compose(r, controller.min);
	      controller.max = common.compose(r, controller.max);
	
	    }
	    else if (controller instanceof BooleanController) {
	
	      dom.bind(li, 'click', function() {
	        dom.fakeEvent(controller.__checkbox, 'click');
	      });
	
	      dom.bind(controller.__checkbox, 'click', function(e) {
	        e.stopPropagation(); // Prevents double-toggle
	      })
	
	    }
	    else if (controller instanceof FunctionController) {
	
	      dom.bind(li, 'click', function() {
	        dom.fakeEvent(controller.__button, 'click');
	      });
	
	      dom.bind(li, 'mouseover', function() {
	        dom.addClass(controller.__button, 'hover');
	      });
	
	      dom.bind(li, 'mouseout', function() {
	        dom.removeClass(controller.__button, 'hover');
	      });
	
	    }
	    else if (controller instanceof ColorController) {
	
	      dom.addClass(li, 'color');
	      controller.updateDisplay = common.compose(function(r) {
	        li.style.borderLeftColor = controller.__color.toString();
	        return r;
	      }, controller.updateDisplay);
	
	      controller.updateDisplay();
	
	    }
	
	    controller.setValue = common.compose(function(r) {
	      if (gui.getRoot().__preset_select && controller.isModified()) {
	        markPresetModified(gui.getRoot(), true);
	      }
	      return r;
	    }, controller.setValue);
	
	  }
	
	  function recallSavedValue(gui, controller) {
	
	    // Find the topmost GUI, that's where remembered objects live.
	    var root = gui.getRoot();
	
	    // Does the object we're controlling match anything we've been told to
	    // remember?
	    var matched_index = root.__rememberedObjects.indexOf(controller.object);
	
	    // Why yes, it does!
	    if (matched_index != -1) {
	
	      // Let me fetch a map of controllers for thcommon.isObject.
	      var controller_map =
	          root.__rememberedObjectIndecesToControllers[matched_index];
	
	      // Ohp, I believe this is the first controller we've created for this
	      // object. Lets make the map fresh.
	      if (controller_map === undefined) {
	        controller_map = {};
	        root.__rememberedObjectIndecesToControllers[matched_index] =
	            controller_map;
	      }
	
	      // Keep track of this controller
	      controller_map[controller.property] = controller;
	
	      // Okay, now have we saved any values for this controller?
	      if (root.load && root.load.remembered) {
	
	        var preset_map = root.load.remembered;
	
	        // Which preset are we trying to load?
	        var preset;
	
	        if (preset_map[gui.preset]) {
	
	          preset = preset_map[gui.preset];
	
	        } else if (preset_map[DEFAULT_DEFAULT_PRESET_NAME]) {
	
	          // Uhh, you can have the default instead?
	          preset = preset_map[DEFAULT_DEFAULT_PRESET_NAME];
	
	        } else {
	
	          // Nada.
	
	          return;
	
	        }
	
	
	        // Did the loaded object remember thcommon.isObject?
	        if (preset[matched_index] &&
	
	          // Did we remember this particular property?
	            preset[matched_index][controller.property] !== undefined) {
	
	          // We did remember something for this guy ...
	          var value = preset[matched_index][controller.property];
	
	          // And that's what it is.
	          controller.initialValue = value;
	          controller.setValue(value);
	
	        }
	
	      }
	
	    }
	
	  }
	
	  function getLocalStorageHash(gui, key) {
	    // TODO how does this deal with multiple GUI's?
	    return document.location.href + '.' + key;
	
	  }
	
	  function addSaveMenu(gui) {
	
	    var div = gui.__save_row = document.createElement('li');
	
	    dom.addClass(gui.domElement, 'has-save');
	
	    gui.__ul.insertBefore(div, gui.__ul.firstChild);
	
	    dom.addClass(div, 'save-row');
	
	    var gears = document.createElement('span');
	    gears.innerHTML = '&nbsp;';
	    dom.addClass(gears, 'button gears');
	
	    // TODO replace with FunctionController
	    var button = document.createElement('span');
	    button.innerHTML = 'Save';
	    dom.addClass(button, 'button');
	    dom.addClass(button, 'save');
	
	    var button2 = document.createElement('span');
	    button2.innerHTML = 'New';
	    dom.addClass(button2, 'button');
	    dom.addClass(button2, 'save-as');
	
	    var button3 = document.createElement('span');
	    button3.innerHTML = 'Revert';
	    dom.addClass(button3, 'button');
	    dom.addClass(button3, 'revert');
	
	    var select = gui.__preset_select = document.createElement('select');
	
	    if (gui.load && gui.load.remembered) {
	
	      common.each(gui.load.remembered, function(value, key) {
	        addPresetOption(gui, key, key == gui.preset);
	      });
	
	    } else {
	      addPresetOption(gui, DEFAULT_DEFAULT_PRESET_NAME, false);
	    }
	
	    dom.bind(select, 'change', function() {
	
	
	      for (var index = 0; index < gui.__preset_select.length; index++) {
	        gui.__preset_select[index].innerHTML = gui.__preset_select[index].value;
	      }
	
	      gui.preset = this.value;
	
	    });
	
	    div.appendChild(select);
	    div.appendChild(gears);
	    div.appendChild(button);
	    div.appendChild(button2);
	    div.appendChild(button3);
	
	    if (SUPPORTS_LOCAL_STORAGE) {
	
	      var saveLocally = document.getElementById('dg-save-locally');
	      var explain = document.getElementById('dg-local-explain');
	
	      saveLocally.style.display = 'block';
	
	      var localStorageCheckBox = document.getElementById('dg-local-storage');
	
	      if (localStorage.getItem(getLocalStorageHash(gui, 'isLocal')) === 'true') {
	        localStorageCheckBox.setAttribute('checked', 'checked');
	      }
	
	      function showHideExplain() {
	        explain.style.display = gui.useLocalStorage ? 'block' : 'none';
	      }
	
	      showHideExplain();
	
	      // TODO: Use a boolean controller, fool!
	      dom.bind(localStorageCheckBox, 'change', function() {
	        gui.useLocalStorage = !gui.useLocalStorage;
	        showHideExplain();
	      });
	
	    }
	
	    var newConstructorTextArea = document.getElementById('dg-new-constructor');
	
	    dom.bind(newConstructorTextArea, 'keydown', function(e) {
	      if (e.metaKey && (e.which === 67 || e.keyCode == 67)) {
	        SAVE_DIALOGUE.hide();
	      }
	    });
	
	    dom.bind(gears, 'click', function() {
	      newConstructorTextArea.innerHTML = JSON.stringify(gui.getSaveObject(), undefined, 2);
	      SAVE_DIALOGUE.show();
	      newConstructorTextArea.focus();
	      newConstructorTextArea.select();
	    });
	
	    dom.bind(button, 'click', function() {
	      gui.save();
	    });
	
	    dom.bind(button2, 'click', function() {
	      var presetName = prompt('Enter a new preset name.');
	      if (presetName) gui.saveAs(presetName);
	    });
	
	    dom.bind(button3, 'click', function() {
	      gui.revert();
	    });
	
	//    div.appendChild(button2);
	
	  }
	
	  function addResizeHandle(gui) {
	
	    gui.__resize_handle = document.createElement('div');
	
	    common.extend(gui.__resize_handle.style, {
	
	      width: '6px',
	      marginLeft: '-3px',
	      height: '200px',
	      cursor: 'ew-resize',
	      position: 'absolute'
	//      border: '1px solid blue'
	
	    });
	
	    var pmouseX;
	
	    dom.bind(gui.__resize_handle, 'mousedown', dragStart);
	    dom.bind(gui.__closeButton, 'mousedown', dragStart);
	
	    gui.domElement.insertBefore(gui.__resize_handle, gui.domElement.firstElementChild);
	
	    function dragStart(e) {
	
	      e.preventDefault();
	
	      pmouseX = e.clientX;
	
	      dom.addClass(gui.__closeButton, GUI.CLASS_DRAG);
	      dom.bind(window, 'mousemove', drag);
	      dom.bind(window, 'mouseup', dragStop);
	
	      return false;
	
	    }
	
	    function drag(e) {
	
	      e.preventDefault();
	
	      gui.width += pmouseX - e.clientX;
	      gui.onResize();
	      pmouseX = e.clientX;
	
	      return false;
	
	    }
	
	    function dragStop() {
	
	      dom.removeClass(gui.__closeButton, GUI.CLASS_DRAG);
	      dom.unbind(window, 'mousemove', drag);
	      dom.unbind(window, 'mouseup', dragStop);
	
	    }
	
	  }
	
	  function setWidth(gui, w) {
	    gui.domElement.style.width = w + 'px';
	    // Auto placed save-rows are position fixed, so we have to
	    // set the width manually if we want it to bleed to the edge
	    if (gui.__save_row && gui.autoPlace) {
	      gui.__save_row.style.width = w + 'px';
	    }if (gui.__closeButton) {
	      gui.__closeButton.style.width = w + 'px';
	    }
	  }
	
	  function getCurrentPreset(gui, useInitialValues) {
	
	    var toReturn = {};
	
	    // For each object I'm remembering
	    common.each(gui.__rememberedObjects, function(val, index) {
	
	      var saved_values = {};
	
	      // The controllers I've made for thcommon.isObject by property
	      var controller_map =
	          gui.__rememberedObjectIndecesToControllers[index];
	
	      // Remember each value for each property
	      common.each(controller_map, function(controller, property) {
	        saved_values[property] = useInitialValues ? controller.initialValue : controller.getValue();
	      });
	
	      // Save the values for thcommon.isObject
	      toReturn[index] = saved_values;
	
	    });
	
	    return toReturn;
	
	  }
	
	  function addPresetOption(gui, name, setSelected) {
	    var opt = document.createElement('option');
	    opt.innerHTML = name;
	    opt.value = name;
	    gui.__preset_select.appendChild(opt);
	    if (setSelected) {
	      gui.__preset_select.selectedIndex = gui.__preset_select.length - 1;
	    }
	  }
	
	  function setPresetSelectIndex(gui) {
	    for (var index = 0; index < gui.__preset_select.length; index++) {
	      if (gui.__preset_select[index].value == gui.preset) {
	        gui.__preset_select.selectedIndex = index;
	      }
	    }
	  }
	
	  function markPresetModified(gui, modified) {
	    var opt = gui.__preset_select[gui.__preset_select.selectedIndex];
	//    console.log('mark', modified, opt);
	    if (modified) {
	      opt.innerHTML = opt.value + "*";
	    } else {
	      opt.innerHTML = opt.value;
	    }
	  }
	
	  function updateDisplays(controllerArray) {
	
	
	    if (controllerArray.length != 0) {
	
	      requestAnimationFrame(function() {
	        updateDisplays(controllerArray);
	      });
	
	    }
	
	    common.each(controllerArray, function(c) {
	      c.updateDisplay();
	    });
	
	  }
	
	  return GUI;
	
	})(dat.utils.css,
	"<div id=\"dg-save\" class=\"dg dialogue\">\n\n  Here's the new load parameter for your <code>GUI</code>'s constructor:\n\n  <textarea id=\"dg-new-constructor\"></textarea>\n\n  <div id=\"dg-save-locally\">\n\n    <input id=\"dg-local-storage\" type=\"checkbox\"/> Automatically save\n    values to <code>localStorage</code> on exit.\n\n    <div id=\"dg-local-explain\">The values saved to <code>localStorage</code> will\n      override those passed to <code>dat.GUI</code>'s constructor. This makes it\n      easier to work incrementally, but <code>localStorage</code> is fragile,\n      and your friends may not see the same values you do.\n      \n    </div>\n    \n  </div>\n\n</div>",
	".dg ul{list-style:none;margin:0;padding:0;width:100%;clear:both}.dg.ac{position:fixed;top:0;left:0;right:0;height:0;z-index:0}.dg:not(.ac) .main{overflow:hidden}.dg.main{-webkit-transition:opacity 0.1s linear;-o-transition:opacity 0.1s linear;-moz-transition:opacity 0.1s linear;transition:opacity 0.1s linear}.dg.main.taller-than-window{overflow-y:auto}.dg.main.taller-than-window .close-button{opacity:1;margin-top:-1px;border-top:1px solid #2c2c2c}.dg.main ul.closed .close-button{opacity:1 !important}.dg.main:hover .close-button,.dg.main .close-button.drag{opacity:1}.dg.main .close-button{-webkit-transition:opacity 0.1s linear;-o-transition:opacity 0.1s linear;-moz-transition:opacity 0.1s linear;transition:opacity 0.1s linear;border:0;position:absolute;line-height:19px;height:20px;cursor:pointer;text-align:center;background-color:#000}.dg.main .close-button:hover{background-color:#111}.dg.a{float:right;margin-right:15px;overflow-x:hidden}.dg.a.has-save ul{margin-top:27px}.dg.a.has-save ul.closed{margin-top:0}.dg.a .save-row{position:fixed;top:0;z-index:1002}.dg li{-webkit-transition:height 0.1s ease-out;-o-transition:height 0.1s ease-out;-moz-transition:height 0.1s ease-out;transition:height 0.1s ease-out}.dg li:not(.folder){cursor:auto;height:27px;line-height:27px;overflow:hidden;padding:0 4px 0 5px}.dg li.folder{padding:0;border-left:4px solid rgba(0,0,0,0)}.dg li.title{cursor:pointer;margin-left:-4px}.dg .closed li:not(.title),.dg .closed ul li,.dg .closed ul li > *{height:0;overflow:hidden;border:0}.dg .cr{clear:both;padding-left:3px;height:27px}.dg .property-name{cursor:default;float:left;clear:left;width:40%;overflow:hidden;text-overflow:ellipsis}.dg .c{float:left;width:60%}.dg .c input[type=text]{border:0;margin-top:4px;padding:3px;width:100%;float:right}.dg .has-slider input[type=text]{width:30%;margin-left:0}.dg .slider{float:left;width:66%;margin-left:-5px;margin-right:0;height:19px;margin-top:4px}.dg .slider-fg{height:100%}.dg .c input[type=checkbox]{margin-top:9px}.dg .c select{margin-top:5px}.dg .cr.function,.dg .cr.function .property-name,.dg .cr.function *,.dg .cr.boolean,.dg .cr.boolean *{cursor:pointer}.dg .selector{display:none;position:absolute;margin-left:-9px;margin-top:23px;z-index:10}.dg .c:hover .selector,.dg .selector.drag{display:block}.dg li.save-row{padding:0}.dg li.save-row .button{display:inline-block;padding:0px 6px}.dg.dialogue{background-color:#222;width:460px;padding:15px;font-size:13px;line-height:15px}#dg-new-constructor{padding:10px;color:#222;font-family:Monaco, monospace;font-size:10px;border:0;resize:none;box-shadow:inset 1px 1px 1px #888;word-wrap:break-word;margin:12px 0;display:block;width:440px;overflow-y:scroll;height:100px;position:relative}#dg-local-explain{display:none;font-size:11px;line-height:17px;border-radius:3px;background-color:#333;padding:8px;margin-top:10px}#dg-local-explain code{font-size:10px}#dat-gui-save-locally{display:none}.dg{color:#eee;font:11px 'Lucida Grande', sans-serif;text-shadow:0 -1px 0 #111}.dg.main::-webkit-scrollbar{width:5px;background:#1a1a1a}.dg.main::-webkit-scrollbar-corner{height:0;display:none}.dg.main::-webkit-scrollbar-thumb{border-radius:5px;background:#676767}.dg li:not(.folder){background:#1a1a1a;border-bottom:1px solid #2c2c2c}.dg li.save-row{line-height:25px;background:#dad5cb;border:0}.dg li.save-row select{margin-left:5px;width:108px}.dg li.save-row .button{margin-left:5px;margin-top:1px;border-radius:2px;font-size:9px;line-height:7px;padding:4px 4px 5px 4px;background:#c5bdad;color:#fff;text-shadow:0 1px 0 #b0a58f;box-shadow:0 -1px 0 #b0a58f;cursor:pointer}.dg li.save-row .button.gears{background:#c5bdad url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAANCAYAAAB/9ZQ7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQJJREFUeNpiYKAU/P//PwGIC/ApCABiBSAW+I8AClAcgKxQ4T9hoMAEUrxx2QSGN6+egDX+/vWT4e7N82AMYoPAx/evwWoYoSYbACX2s7KxCxzcsezDh3evFoDEBYTEEqycggWAzA9AuUSQQgeYPa9fPv6/YWm/Acx5IPb7ty/fw+QZblw67vDs8R0YHyQhgObx+yAJkBqmG5dPPDh1aPOGR/eugW0G4vlIoTIfyFcA+QekhhHJhPdQxbiAIguMBTQZrPD7108M6roWYDFQiIAAv6Aow/1bFwXgis+f2LUAynwoIaNcz8XNx3Dl7MEJUDGQpx9gtQ8YCueB+D26OECAAQDadt7e46D42QAAAABJRU5ErkJggg==) 2px 1px no-repeat;height:7px;width:8px}.dg li.save-row .button:hover{background-color:#bab19e;box-shadow:0 -1px 0 #b0a58f}.dg li.folder{border-bottom:0}.dg li.title{padding-left:16px;background:#000 url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlI+hKgFxoCgAOw==) 6px 10px no-repeat;cursor:pointer;border-bottom:1px solid rgba(255,255,255,0.2)}.dg .closed li.title{background-image:url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlGIWqMCbWAEAOw==)}.dg .cr.boolean{border-left:3px solid #806787}.dg .cr.function{border-left:3px solid #e61d5f}.dg .cr.number{border-left:3px solid #2fa1d6}.dg .cr.number input[type=text]{color:#2fa1d6}.dg .cr.string{border-left:3px solid #1ed36f}.dg .cr.string input[type=text]{color:#1ed36f}.dg .cr.function:hover,.dg .cr.boolean:hover{background:#111}.dg .c input[type=text]{background:#303030;outline:none}.dg .c input[type=text]:hover{background:#3c3c3c}.dg .c input[type=text]:focus{background:#494949;color:#fff}.dg .c .slider{background:#303030;cursor:ew-resize}.dg .c .slider-fg{background:#2fa1d6}.dg .c .slider:hover{background:#3c3c3c}.dg .c .slider:hover .slider-fg{background:#44abda}\n",
	dat.controllers.factory = (function (OptionController, NumberControllerBox, NumberControllerSlider, StringController, FunctionController, BooleanController, common) {
	
	      return function(object, property) {
	
	        var initialValue = object[property];
	
	        // Providing options?
	        if (common.isArray(arguments[2]) || common.isObject(arguments[2])) {
	          return new OptionController(object, property, arguments[2]);
	        }
	
	        // Providing a map?
	
	        if (common.isNumber(initialValue)) {
	
	          if (common.isNumber(arguments[2]) && common.isNumber(arguments[3])) {
	
	            // Has min and max.
	            return new NumberControllerSlider(object, property, arguments[2], arguments[3]);
	
	          } else {
	
	            return new NumberControllerBox(object, property, { min: arguments[2], max: arguments[3] });
	
	          }
	
	        }
	
	        if (common.isString(initialValue)) {
	          return new StringController(object, property);
	        }
	
	        if (common.isFunction(initialValue)) {
	          return new FunctionController(object, property, '');
	        }
	
	        if (common.isBoolean(initialValue)) {
	          return new BooleanController(object, property);
	        }
	
	      }
	
	    })(dat.controllers.OptionController,
	dat.controllers.NumberControllerBox,
	dat.controllers.NumberControllerSlider,
	dat.controllers.StringController = (function (Controller, dom, common) {
	
	  /**
	   * @class Provides a text input to alter the string property of an object.
	   *
	   * @extends dat.controllers.Controller
	   *
	   * @param {Object} object The object to be manipulated
	   * @param {string} property The name of the property to be manipulated
	   *
	   * @member dat.controllers
	   */
	  var StringController = function(object, property) {
	
	    StringController.superclass.call(this, object, property);
	
	    var _this = this;
	
	    this.__input = document.createElement('input');
	    this.__input.setAttribute('type', 'text');
	
	    dom.bind(this.__input, 'keyup', onChange);
	    dom.bind(this.__input, 'change', onChange);
	    dom.bind(this.__input, 'blur', onBlur);
	    dom.bind(this.__input, 'keydown', function(e) {
	      if (e.keyCode === 13) {
	        this.blur();
	      }
	    });
	    
	
	    function onChange() {
	      _this.setValue(_this.__input.value);
	    }
	
	    function onBlur() {
	      if (_this.__onFinishChange) {
	        _this.__onFinishChange.call(_this, _this.getValue());
	      }
	    }
	
	    this.updateDisplay();
	
	    this.domElement.appendChild(this.__input);
	
	  };
	
	  StringController.superclass = Controller;
	
	  common.extend(
	
	      StringController.prototype,
	      Controller.prototype,
	
	      {
	
	        updateDisplay: function() {
	          // Stops the caret from moving on account of:
	          // keyup -> setValue -> updateDisplay
	          if (!dom.isActive(this.__input)) {
	            this.__input.value = this.getValue();
	          }
	          return StringController.superclass.prototype.updateDisplay.call(this);
	        }
	
	      }
	
	  );
	
	  return StringController;
	
	})(dat.controllers.Controller,
	dat.dom.dom,
	dat.utils.common),
	dat.controllers.FunctionController,
	dat.controllers.BooleanController,
	dat.utils.common),
	dat.controllers.Controller,
	dat.controllers.BooleanController,
	dat.controllers.FunctionController,
	dat.controllers.NumberControllerBox,
	dat.controllers.NumberControllerSlider,
	dat.controllers.OptionController,
	dat.controllers.ColorController = (function (Controller, dom, Color, interpret, common) {
	
	  var ColorController = function(object, property) {
	
	    ColorController.superclass.call(this, object, property);
	
	    this.__color = new Color(this.getValue());
	    this.__temp = new Color(0);
	
	    var _this = this;
	
	    this.domElement = document.createElement('div');
	
	    dom.makeSelectable(this.domElement, false);
	
	    this.__selector = document.createElement('div');
	    this.__selector.className = 'selector';
	
	    this.__saturation_field = document.createElement('div');
	    this.__saturation_field.className = 'saturation-field';
	
	    this.__field_knob = document.createElement('div');
	    this.__field_knob.className = 'field-knob';
	    this.__field_knob_border = '2px solid ';
	
	    this.__hue_knob = document.createElement('div');
	    this.__hue_knob.className = 'hue-knob';
	
	    this.__hue_field = document.createElement('div');
	    this.__hue_field.className = 'hue-field';
	
	    this.__input = document.createElement('input');
	    this.__input.type = 'text';
	    this.__input_textShadow = '0 1px 1px ';
	
	    dom.bind(this.__input, 'keydown', function(e) {
	      if (e.keyCode === 13) { // on enter
	        onBlur.call(this);
	      }
	    });
	
	    dom.bind(this.__input, 'blur', onBlur);
	
	    dom.bind(this.__selector, 'mousedown', function(e) {
	
	      dom
	        .addClass(this, 'drag')
	        .bind(window, 'mouseup', function(e) {
	          dom.removeClass(_this.__selector, 'drag');
	        });
	
	    });
	
	    var value_field = document.createElement('div');
	
	    common.extend(this.__selector.style, {
	      width: '122px',
	      height: '102px',
	      padding: '3px',
	      backgroundColor: '#222',
	      boxShadow: '0px 1px 3px rgba(0,0,0,0.3)'
	    });
	
	    common.extend(this.__field_knob.style, {
	      position: 'absolute',
	      width: '12px',
	      height: '12px',
	      border: this.__field_knob_border + (this.__color.v < .5 ? '#fff' : '#000'),
	      boxShadow: '0px 1px 3px rgba(0,0,0,0.5)',
	      borderRadius: '12px',
	      zIndex: 1
	    });
	    
	    common.extend(this.__hue_knob.style, {
	      position: 'absolute',
	      width: '15px',
	      height: '2px',
	      borderRight: '4px solid #fff',
	      zIndex: 1
	    });
	
	    common.extend(this.__saturation_field.style, {
	      width: '100px',
	      height: '100px',
	      border: '1px solid #555',
	      marginRight: '3px',
	      display: 'inline-block',
	      cursor: 'pointer'
	    });
	
	    common.extend(value_field.style, {
	      width: '100%',
	      height: '100%',
	      background: 'none'
	    });
	    
	    linearGradient(value_field, 'top', 'rgba(0,0,0,0)', '#000');
	
	    common.extend(this.__hue_field.style, {
	      width: '15px',
	      height: '100px',
	      display: 'inline-block',
	      border: '1px solid #555',
	      cursor: 'ns-resize'
	    });
	
	    hueGradient(this.__hue_field);
	
	    common.extend(this.__input.style, {
	      outline: 'none',
	//      width: '120px',
	      textAlign: 'center',
	//      padding: '4px',
	//      marginBottom: '6px',
	      color: '#fff',
	      border: 0,
	      fontWeight: 'bold',
	      textShadow: this.__input_textShadow + 'rgba(0,0,0,0.7)'
	    });
	
	    dom.bind(this.__saturation_field, 'mousedown', fieldDown);
	    dom.bind(this.__field_knob, 'mousedown', fieldDown);
	
	    dom.bind(this.__hue_field, 'mousedown', function(e) {
	      setH(e);
	      dom.bind(window, 'mousemove', setH);
	      dom.bind(window, 'mouseup', unbindH);
	    });
	
	    function fieldDown(e) {
	      setSV(e);
	      // document.body.style.cursor = 'none';
	      dom.bind(window, 'mousemove', setSV);
	      dom.bind(window, 'mouseup', unbindSV);
	    }
	
	    function unbindSV() {
	      dom.unbind(window, 'mousemove', setSV);
	      dom.unbind(window, 'mouseup', unbindSV);
	      // document.body.style.cursor = 'default';
	    }
	
	    function onBlur() {
	      var i = interpret(this.value);
	      if (i !== false) {
	        _this.__color.__state = i;
	        _this.setValue(_this.__color.toOriginal());
	      } else {
	        this.value = _this.__color.toString();
	      }
	    }
	
	    function unbindH() {
	      dom.unbind(window, 'mousemove', setH);
	      dom.unbind(window, 'mouseup', unbindH);
	    }
	
	    this.__saturation_field.appendChild(value_field);
	    this.__selector.appendChild(this.__field_knob);
	    this.__selector.appendChild(this.__saturation_field);
	    this.__selector.appendChild(this.__hue_field);
	    this.__hue_field.appendChild(this.__hue_knob);
	
	    this.domElement.appendChild(this.__input);
	    this.domElement.appendChild(this.__selector);
	
	    this.updateDisplay();
	
	    function setSV(e) {
	
	      e.preventDefault();
	
	      var w = dom.getWidth(_this.__saturation_field);
	      var o = dom.getOffset(_this.__saturation_field);
	      var s = (e.clientX - o.left + document.body.scrollLeft) / w;
	      var v = 1 - (e.clientY - o.top + document.body.scrollTop) / w;
	
	      if (v > 1) v = 1;
	      else if (v < 0) v = 0;
	
	      if (s > 1) s = 1;
	      else if (s < 0) s = 0;
	
	      _this.__color.v = v;
	      _this.__color.s = s;
	
	      _this.setValue(_this.__color.toOriginal());
	
	
	      return false;
	
	    }
	
	    function setH(e) {
	
	      e.preventDefault();
	
	      var s = dom.getHeight(_this.__hue_field);
	      var o = dom.getOffset(_this.__hue_field);
	      var h = 1 - (e.clientY - o.top + document.body.scrollTop) / s;
	
	      if (h > 1) h = 1;
	      else if (h < 0) h = 0;
	
	      _this.__color.h = h * 360;
	
	      _this.setValue(_this.__color.toOriginal());
	
	      return false;
	
	    }
	
	  };
	
	  ColorController.superclass = Controller;
	
	  common.extend(
	
	      ColorController.prototype,
	      Controller.prototype,
	
	      {
	
	        updateDisplay: function() {
	
	          var i = interpret(this.getValue());
	
	          if (i !== false) {
	
	            var mismatch = false;
	
	            // Check for mismatch on the interpreted value.
	
	            common.each(Color.COMPONENTS, function(component) {
	              if (!common.isUndefined(i[component]) &&
	                  !common.isUndefined(this.__color.__state[component]) &&
	                  i[component] !== this.__color.__state[component]) {
	                mismatch = true;
	                return {}; // break
	              }
	            }, this);
	
	            // If nothing diverges, we keep our previous values
	            // for statefulness, otherwise we recalculate fresh
	            if (mismatch) {
	              common.extend(this.__color.__state, i);
	            }
	
	          }
	
	          common.extend(this.__temp.__state, this.__color.__state);
	
	          this.__temp.a = 1;
	
	          var flip = (this.__color.v < .5 || this.__color.s > .5) ? 255 : 0;
	          var _flip = 255 - flip;
	
	          common.extend(this.__field_knob.style, {
	            marginLeft: 100 * this.__color.s - 7 + 'px',
	            marginTop: 100 * (1 - this.__color.v) - 7 + 'px',
	            backgroundColor: this.__temp.toString(),
	            border: this.__field_knob_border + 'rgb(' + flip + ',' + flip + ',' + flip +')'
	          });
	
	          this.__hue_knob.style.marginTop = (1 - this.__color.h / 360) * 100 + 'px'
	
	          this.__temp.s = 1;
	          this.__temp.v = 1;
	
	          linearGradient(this.__saturation_field, 'left', '#fff', this.__temp.toString());
	
	          common.extend(this.__input.style, {
	            backgroundColor: this.__input.value = this.__color.toString(),
	            color: 'rgb(' + flip + ',' + flip + ',' + flip +')',
	            textShadow: this.__input_textShadow + 'rgba(' + _flip + ',' + _flip + ',' + _flip +',.7)'
	          });
	
	        }
	
	      }
	
	  );
	  
	  var vendors = ['-moz-','-o-','-webkit-','-ms-',''];
	  
	  function linearGradient(elem, x, a, b) {
	    elem.style.background = '';
	    common.each(vendors, function(vendor) {
	      elem.style.cssText += 'background: ' + vendor + 'linear-gradient('+x+', '+a+' 0%, ' + b + ' 100%); ';
	    });
	  }
	  
	  function hueGradient(elem) {
	    elem.style.background = '';
	    elem.style.cssText += 'background: -moz-linear-gradient(top,  #ff0000 0%, #ff00ff 17%, #0000ff 34%, #00ffff 50%, #00ff00 67%, #ffff00 84%, #ff0000 100%);'
	    elem.style.cssText += 'background: -webkit-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);'
	    elem.style.cssText += 'background: -o-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);'
	    elem.style.cssText += 'background: -ms-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);'
	    elem.style.cssText += 'background: linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);'
	  }
	
	
	  return ColorController;
	
	})(dat.controllers.Controller,
	dat.dom.dom,
	dat.color.Color = (function (interpret, math, toString, common) {
	
	  var Color = function() {
	
	    this.__state = interpret.apply(this, arguments);
	
	    if (this.__state === false) {
	      throw 'Failed to interpret color arguments';
	    }
	
	    this.__state.a = this.__state.a || 1;
	
	
	  };
	
	  Color.COMPONENTS = ['r','g','b','h','s','v','hex','a'];
	
	  common.extend(Color.prototype, {
	
	    toString: function() {
	      return toString(this);
	    },
	
	    toOriginal: function() {
	      return this.__state.conversion.write(this);
	    }
	
	  });
	
	  defineRGBComponent(Color.prototype, 'r', 2);
	  defineRGBComponent(Color.prototype, 'g', 1);
	  defineRGBComponent(Color.prototype, 'b', 0);
	
	  defineHSVComponent(Color.prototype, 'h');
	  defineHSVComponent(Color.prototype, 's');
	  defineHSVComponent(Color.prototype, 'v');
	
	  Object.defineProperty(Color.prototype, 'a', {
	
	    get: function() {
	      return this.__state.a;
	    },
	
	    set: function(v) {
	      this.__state.a = v;
	    }
	
	  });
	
	  Object.defineProperty(Color.prototype, 'hex', {
	
	    get: function() {
	
	      if (!this.__state.space !== 'HEX') {
	        this.__state.hex = math.rgb_to_hex(this.r, this.g, this.b);
	      }
	
	      return this.__state.hex;
	
	    },
	
	    set: function(v) {
	
	      this.__state.space = 'HEX';
	      this.__state.hex = v;
	
	    }
	
	  });
	
	  function defineRGBComponent(target, component, componentHexIndex) {
	
	    Object.defineProperty(target, component, {
	
	      get: function() {
	
	        if (this.__state.space === 'RGB') {
	          return this.__state[component];
	        }
	
	        recalculateRGB(this, component, componentHexIndex);
	
	        return this.__state[component];
	
	      },
	
	      set: function(v) {
	
	        if (this.__state.space !== 'RGB') {
	          recalculateRGB(this, component, componentHexIndex);
	          this.__state.space = 'RGB';
	        }
	
	        this.__state[component] = v;
	
	      }
	
	    });
	
	  }
	
	  function defineHSVComponent(target, component) {
	
	    Object.defineProperty(target, component, {
	
	      get: function() {
	
	        if (this.__state.space === 'HSV')
	          return this.__state[component];
	
	        recalculateHSV(this);
	
	        return this.__state[component];
	
	      },
	
	      set: function(v) {
	
	        if (this.__state.space !== 'HSV') {
	          recalculateHSV(this);
	          this.__state.space = 'HSV';
	        }
	
	        this.__state[component] = v;
	
	      }
	
	    });
	
	  }
	
	  function recalculateRGB(color, component, componentHexIndex) {
	
	    if (color.__state.space === 'HEX') {
	
	      color.__state[component] = math.component_from_hex(color.__state.hex, componentHexIndex);
	
	    } else if (color.__state.space === 'HSV') {
	
	      common.extend(color.__state, math.hsv_to_rgb(color.__state.h, color.__state.s, color.__state.v));
	
	    } else {
	
	      throw 'Corrupted color state';
	
	    }
	
	  }
	
	  function recalculateHSV(color) {
	
	    var result = math.rgb_to_hsv(color.r, color.g, color.b);
	
	    common.extend(color.__state,
	        {
	          s: result.s,
	          v: result.v
	        }
	    );
	
	    if (!common.isNaN(result.h)) {
	      color.__state.h = result.h;
	    } else if (common.isUndefined(color.__state.h)) {
	      color.__state.h = 0;
	    }
	
	  }
	
	  return Color;
	
	})(dat.color.interpret,
	dat.color.math = (function () {
	
	  var tmpComponent;
	
	  return {
	
	    hsv_to_rgb: function(h, s, v) {
	
	      var hi = Math.floor(h / 60) % 6;
	
	      var f = h / 60 - Math.floor(h / 60);
	      var p = v * (1.0 - s);
	      var q = v * (1.0 - (f * s));
	      var t = v * (1.0 - ((1.0 - f) * s));
	      var c = [
	        [v, t, p],
	        [q, v, p],
	        [p, v, t],
	        [p, q, v],
	        [t, p, v],
	        [v, p, q]
	      ][hi];
	
	      return {
	        r: c[0] * 255,
	        g: c[1] * 255,
	        b: c[2] * 255
	      };
	
	    },
	
	    rgb_to_hsv: function(r, g, b) {
	
	      var min = Math.min(r, g, b),
	          max = Math.max(r, g, b),
	          delta = max - min,
	          h, s;
	
	      if (max != 0) {
	        s = delta / max;
	      } else {
	        return {
	          h: NaN,
	          s: 0,
	          v: 0
	        };
	      }
	
	      if (r == max) {
	        h = (g - b) / delta;
	      } else if (g == max) {
	        h = 2 + (b - r) / delta;
	      } else {
	        h = 4 + (r - g) / delta;
	      }
	      h /= 6;
	      if (h < 0) {
	        h += 1;
	      }
	
	      return {
	        h: h * 360,
	        s: s,
	        v: max / 255
	      };
	    },
	
	    rgb_to_hex: function(r, g, b) {
	      var hex = this.hex_with_component(0, 2, r);
	      hex = this.hex_with_component(hex, 1, g);
	      hex = this.hex_with_component(hex, 0, b);
	      return hex;
	    },
	
	    component_from_hex: function(hex, componentIndex) {
	      return (hex >> (componentIndex * 8)) & 0xFF;
	    },
	
	    hex_with_component: function(hex, componentIndex, value) {
	      return value << (tmpComponent = componentIndex * 8) | (hex & ~ (0xFF << tmpComponent));
	    }
	
	  }
	
	})(),
	dat.color.toString,
	dat.utils.common),
	dat.color.interpret,
	dat.utils.common),
	dat.utils.requestAnimationFrame = (function () {
	
	  /**
	   * requirejs version of Paul Irish's RequestAnimationFrame
	   * http://paulirish.com/2011/requestanimationframe-for-smart-animating/
	   */
	
	  return window.webkitRequestAnimationFrame ||
	      window.mozRequestAnimationFrame ||
	      window.oRequestAnimationFrame ||
	      window.msRequestAnimationFrame ||
	      function(callback, element) {
	
	        window.setTimeout(callback, 1000 / 60);
	
	      };
	})(),
	dat.dom.CenteredDiv = (function (dom, common) {
	
	
	  var CenteredDiv = function() {
	
	    this.backgroundElement = document.createElement('div');
	    common.extend(this.backgroundElement.style, {
	      backgroundColor: 'rgba(0,0,0,0.8)',
	      top: 0,
	      left: 0,
	      display: 'none',
	      zIndex: '1000',
	      opacity: 0,
	      WebkitTransition: 'opacity 0.2s linear'
	    });
	
	    dom.makeFullscreen(this.backgroundElement);
	    this.backgroundElement.style.position = 'fixed';
	
	    this.domElement = document.createElement('div');
	    common.extend(this.domElement.style, {
	      position: 'fixed',
	      display: 'none',
	      zIndex: '1001',
	      opacity: 0,
	      WebkitTransition: '-webkit-transform 0.2s ease-out, opacity 0.2s linear'
	    });
	
	
	    document.body.appendChild(this.backgroundElement);
	    document.body.appendChild(this.domElement);
	
	    var _this = this;
	    dom.bind(this.backgroundElement, 'click', function() {
	      _this.hide();
	    });
	
	
	  };
	
	  CenteredDiv.prototype.show = function() {
	
	    var _this = this;
	    
	
	
	    this.backgroundElement.style.display = 'block';
	
	    this.domElement.style.display = 'block';
	    this.domElement.style.opacity = 0;
	//    this.domElement.style.top = '52%';
	    this.domElement.style.webkitTransform = 'scale(1.1)';
	
	    this.layout();
	
	    common.defer(function() {
	      _this.backgroundElement.style.opacity = 1;
	      _this.domElement.style.opacity = 1;
	      _this.domElement.style.webkitTransform = 'scale(1)';
	    });
	
	  };
	
	  CenteredDiv.prototype.hide = function() {
	
	    var _this = this;
	
	    var hide = function() {
	
	      _this.domElement.style.display = 'none';
	      _this.backgroundElement.style.display = 'none';
	
	      dom.unbind(_this.domElement, 'webkitTransitionEnd', hide);
	      dom.unbind(_this.domElement, 'transitionend', hide);
	      dom.unbind(_this.domElement, 'oTransitionEnd', hide);
	
	    };
	
	    dom.bind(this.domElement, 'webkitTransitionEnd', hide);
	    dom.bind(this.domElement, 'transitionend', hide);
	    dom.bind(this.domElement, 'oTransitionEnd', hide);
	
	    this.backgroundElement.style.opacity = 0;
	//    this.domElement.style.top = '48%';
	    this.domElement.style.opacity = 0;
	    this.domElement.style.webkitTransform = 'scale(1.1)';
	
	  };
	
	  CenteredDiv.prototype.layout = function() {
	    this.domElement.style.left = window.innerWidth/2 - dom.getWidth(this.domElement) / 2 + 'px';
	    this.domElement.style.top = window.innerHeight/2 - dom.getHeight(this.domElement) / 2 + 'px';
	  };
	  
	  function lockScroll(e) {
	    console.log(e);
	  }
	
	  return CenteredDiv;
	
	})(dat.dom.dom,
	dat.utils.common),
	dat.dom.dom,
	dat.utils.common);

/***/ },
/* 3 */
/***/ function(module, exports) {

	/**
	 * dat-gui JavaScript Controller Library
	 * http://code.google.com/p/dat-gui
	 *
	 * Copyright 2011 Data Arts Team, Google Creative Lab
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 */
	
	/** @namespace */
	var dat = module.exports = dat || {};
	
	/** @namespace */
	dat.color = dat.color || {};
	
	/** @namespace */
	dat.utils = dat.utils || {};
	
	dat.utils.common = (function () {
	  
	  var ARR_EACH = Array.prototype.forEach;
	  var ARR_SLICE = Array.prototype.slice;
	
	  /**
	   * Band-aid methods for things that should be a lot easier in JavaScript.
	   * Implementation and structure inspired by underscore.js
	   * http://documentcloud.github.com/underscore/
	   */
	
	  return { 
	    
	    BREAK: {},
	  
	    extend: function(target) {
	      
	      this.each(ARR_SLICE.call(arguments, 1), function(obj) {
	        
	        for (var key in obj)
	          if (!this.isUndefined(obj[key])) 
	            target[key] = obj[key];
	        
	      }, this);
	      
	      return target;
	      
	    },
	    
	    defaults: function(target) {
	      
	      this.each(ARR_SLICE.call(arguments, 1), function(obj) {
	        
	        for (var key in obj)
	          if (this.isUndefined(target[key])) 
	            target[key] = obj[key];
	        
	      }, this);
	      
	      return target;
	    
	    },
	    
	    compose: function() {
	      var toCall = ARR_SLICE.call(arguments);
	            return function() {
	              var args = ARR_SLICE.call(arguments);
	              for (var i = toCall.length -1; i >= 0; i--) {
	                args = [toCall[i].apply(this, args)];
	              }
	              return args[0];
	            }
	    },
	    
	    each: function(obj, itr, scope) {
	
	      
	      if (ARR_EACH && obj.forEach === ARR_EACH) { 
	        
	        obj.forEach(itr, scope);
	        
	      } else if (obj.length === obj.length + 0) { // Is number but not NaN
	        
	        for (var key = 0, l = obj.length; key < l; key++)
	          if (key in obj && itr.call(scope, obj[key], key) === this.BREAK) 
	            return;
	            
	      } else {
	
	        for (var key in obj) 
	          if (itr.call(scope, obj[key], key) === this.BREAK)
	            return;
	            
	      }
	            
	    },
	    
	    defer: function(fnc) {
	      setTimeout(fnc, 0);
	    },
	    
	    toArray: function(obj) {
	      if (obj.toArray) return obj.toArray();
	      return ARR_SLICE.call(obj);
	    },
	
	    isUndefined: function(obj) {
	      return obj === undefined;
	    },
	    
	    isNull: function(obj) {
	      return obj === null;
	    },
	    
	    isNaN: function(obj) {
	      return obj !== obj;
	    },
	    
	    isArray: Array.isArray || function(obj) {
	      return obj.constructor === Array;
	    },
	    
	    isObject: function(obj) {
	      return obj === Object(obj);
	    },
	    
	    isNumber: function(obj) {
	      return obj === obj+0;
	    },
	    
	    isString: function(obj) {
	      return obj === obj+'';
	    },
	    
	    isBoolean: function(obj) {
	      return obj === false || obj === true;
	    },
	    
	    isFunction: function(obj) {
	      return Object.prototype.toString.call(obj) === '[object Function]';
	    }
	  
	  };
	    
	})();
	
	
	dat.color.toString = (function (common) {
	
	  return function(color) {
	
	    if (color.a == 1 || common.isUndefined(color.a)) {
	
	      var s = color.hex.toString(16);
	      while (s.length < 6) {
	        s = '0' + s;
	      }
	
	      return '#' + s;
	
	    } else {
	
	      return 'rgba(' + Math.round(color.r) + ',' + Math.round(color.g) + ',' + Math.round(color.b) + ',' + color.a + ')';
	
	    }
	
	  }
	
	})(dat.utils.common);
	
	
	dat.Color = dat.color.Color = (function (interpret, math, toString, common) {
	
	  var Color = function() {
	
	    this.__state = interpret.apply(this, arguments);
	
	    if (this.__state === false) {
	      throw 'Failed to interpret color arguments';
	    }
	
	    this.__state.a = this.__state.a || 1;
	
	
	  };
	
	  Color.COMPONENTS = ['r','g','b','h','s','v','hex','a'];
	
	  common.extend(Color.prototype, {
	
	    toString: function() {
	      return toString(this);
	    },
	
	    toOriginal: function() {
	      return this.__state.conversion.write(this);
	    }
	
	  });
	
	  defineRGBComponent(Color.prototype, 'r', 2);
	  defineRGBComponent(Color.prototype, 'g', 1);
	  defineRGBComponent(Color.prototype, 'b', 0);
	
	  defineHSVComponent(Color.prototype, 'h');
	  defineHSVComponent(Color.prototype, 's');
	  defineHSVComponent(Color.prototype, 'v');
	
	  Object.defineProperty(Color.prototype, 'a', {
	
	    get: function() {
	      return this.__state.a;
	    },
	
	    set: function(v) {
	      this.__state.a = v;
	    }
	
	  });
	
	  Object.defineProperty(Color.prototype, 'hex', {
	
	    get: function() {
	
	      if (!this.__state.space !== 'HEX') {
	        this.__state.hex = math.rgb_to_hex(this.r, this.g, this.b);
	      }
	
	      return this.__state.hex;
	
	    },
	
	    set: function(v) {
	
	      this.__state.space = 'HEX';
	      this.__state.hex = v;
	
	    }
	
	  });
	
	  function defineRGBComponent(target, component, componentHexIndex) {
	
	    Object.defineProperty(target, component, {
	
	      get: function() {
	
	        if (this.__state.space === 'RGB') {
	          return this.__state[component];
	        }
	
	        recalculateRGB(this, component, componentHexIndex);
	
	        return this.__state[component];
	
	      },
	
	      set: function(v) {
	
	        if (this.__state.space !== 'RGB') {
	          recalculateRGB(this, component, componentHexIndex);
	          this.__state.space = 'RGB';
	        }
	
	        this.__state[component] = v;
	
	      }
	
	    });
	
	  }
	
	  function defineHSVComponent(target, component) {
	
	    Object.defineProperty(target, component, {
	
	      get: function() {
	
	        if (this.__state.space === 'HSV')
	          return this.__state[component];
	
	        recalculateHSV(this);
	
	        return this.__state[component];
	
	      },
	
	      set: function(v) {
	
	        if (this.__state.space !== 'HSV') {
	          recalculateHSV(this);
	          this.__state.space = 'HSV';
	        }
	
	        this.__state[component] = v;
	
	      }
	
	    });
	
	  }
	
	  function recalculateRGB(color, component, componentHexIndex) {
	
	    if (color.__state.space === 'HEX') {
	
	      color.__state[component] = math.component_from_hex(color.__state.hex, componentHexIndex);
	
	    } else if (color.__state.space === 'HSV') {
	
	      common.extend(color.__state, math.hsv_to_rgb(color.__state.h, color.__state.s, color.__state.v));
	
	    } else {
	
	      throw 'Corrupted color state';
	
	    }
	
	  }
	
	  function recalculateHSV(color) {
	
	    var result = math.rgb_to_hsv(color.r, color.g, color.b);
	
	    common.extend(color.__state,
	        {
	          s: result.s,
	          v: result.v
	        }
	    );
	
	    if (!common.isNaN(result.h)) {
	      color.__state.h = result.h;
	    } else if (common.isUndefined(color.__state.h)) {
	      color.__state.h = 0;
	    }
	
	  }
	
	  return Color;
	
	})(dat.color.interpret = (function (toString, common) {
	
	  var result, toReturn;
	
	  var interpret = function() {
	
	    toReturn = false;
	
	    var original = arguments.length > 1 ? common.toArray(arguments) : arguments[0];
	
	    common.each(INTERPRETATIONS, function(family) {
	
	      if (family.litmus(original)) {
	
	        common.each(family.conversions, function(conversion, conversionName) {
	
	          result = conversion.read(original);
	
	          if (toReturn === false && result !== false) {
	            toReturn = result;
	            result.conversionName = conversionName;
	            result.conversion = conversion;
	            return common.BREAK;
	
	          }
	
	        });
	
	        return common.BREAK;
	
	      }
	
	    });
	
	    return toReturn;
	
	  };
	
	  var INTERPRETATIONS = [
	
	    // Strings
	    {
	
	      litmus: common.isString,
	
	      conversions: {
	
	        THREE_CHAR_HEX: {
	
	          read: function(original) {
	
	            var test = original.match(/^#([A-F0-9])([A-F0-9])([A-F0-9])$/i);
	            if (test === null) return false;
	
	            return {
	              space: 'HEX',
	              hex: parseInt(
	                  '0x' +
	                      test[1].toString() + test[1].toString() +
	                      test[2].toString() + test[2].toString() +
	                      test[3].toString() + test[3].toString())
	            };
	
	          },
	
	          write: toString
	
	        },
	
	        SIX_CHAR_HEX: {
	
	          read: function(original) {
	
	            var test = original.match(/^#([A-F0-9]{6})$/i);
	            if (test === null) return false;
	
	            return {
	              space: 'HEX',
	              hex: parseInt('0x' + test[1].toString())
	            };
	
	          },
	
	          write: toString
	
	        },
	
	        CSS_RGB: {
	
	          read: function(original) {
	
	            var test = original.match(/^rgb\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\)/);
	            if (test === null) return false;
	
	            return {
	              space: 'RGB',
	              r: parseFloat(test[1]),
	              g: parseFloat(test[2]),
	              b: parseFloat(test[3])
	            };
	
	          },
	
	          write: toString
	
	        },
	
	        CSS_RGBA: {
	
	          read: function(original) {
	
	            var test = original.match(/^rgba\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\,\s*(.+)\s*\)/);
	            if (test === null) return false;
	
	            return {
	              space: 'RGB',
	              r: parseFloat(test[1]),
	              g: parseFloat(test[2]),
	              b: parseFloat(test[3]),
	              a: parseFloat(test[4])
	            };
	
	          },
	
	          write: toString
	
	        }
	
	      }
	
	    },
	
	    // Numbers
	    {
	
	      litmus: common.isNumber,
	
	      conversions: {
	
	        HEX: {
	          read: function(original) {
	            return {
	              space: 'HEX',
	              hex: original,
	              conversionName: 'HEX'
	            }
	          },
	
	          write: function(color) {
	            return color.hex;
	          }
	        }
	
	      }
	
	    },
	
	    // Arrays
	    {
	
	      litmus: common.isArray,
	
	      conversions: {
	
	        RGB_ARRAY: {
	          read: function(original) {
	            if (original.length != 3) return false;
	            return {
	              space: 'RGB',
	              r: original[0],
	              g: original[1],
	              b: original[2]
	            };
	          },
	
	          write: function(color) {
	            return [color.r, color.g, color.b];
	          }
	
	        },
	
	        RGBA_ARRAY: {
	          read: function(original) {
	            if (original.length != 4) return false;
	            return {
	              space: 'RGB',
	              r: original[0],
	              g: original[1],
	              b: original[2],
	              a: original[3]
	            };
	          },
	
	          write: function(color) {
	            return [color.r, color.g, color.b, color.a];
	          }
	
	        }
	
	      }
	
	    },
	
	    // Objects
	    {
	
	      litmus: common.isObject,
	
	      conversions: {
	
	        RGBA_OBJ: {
	          read: function(original) {
	            if (common.isNumber(original.r) &&
	                common.isNumber(original.g) &&
	                common.isNumber(original.b) &&
	                common.isNumber(original.a)) {
	              return {
	                space: 'RGB',
	                r: original.r,
	                g: original.g,
	                b: original.b,
	                a: original.a
	              }
	            }
	            return false;
	          },
	
	          write: function(color) {
	            return {
	              r: color.r,
	              g: color.g,
	              b: color.b,
	              a: color.a
	            }
	          }
	        },
	
	        RGB_OBJ: {
	          read: function(original) {
	            if (common.isNumber(original.r) &&
	                common.isNumber(original.g) &&
	                common.isNumber(original.b)) {
	              return {
	                space: 'RGB',
	                r: original.r,
	                g: original.g,
	                b: original.b
	              }
	            }
	            return false;
	          },
	
	          write: function(color) {
	            return {
	              r: color.r,
	              g: color.g,
	              b: color.b
	            }
	          }
	        },
	
	        HSVA_OBJ: {
	          read: function(original) {
	            if (common.isNumber(original.h) &&
	                common.isNumber(original.s) &&
	                common.isNumber(original.v) &&
	                common.isNumber(original.a)) {
	              return {
	                space: 'HSV',
	                h: original.h,
	                s: original.s,
	                v: original.v,
	                a: original.a
	              }
	            }
	            return false;
	          },
	
	          write: function(color) {
	            return {
	              h: color.h,
	              s: color.s,
	              v: color.v,
	              a: color.a
	            }
	          }
	        },
	
	        HSV_OBJ: {
	          read: function(original) {
	            if (common.isNumber(original.h) &&
	                common.isNumber(original.s) &&
	                common.isNumber(original.v)) {
	              return {
	                space: 'HSV',
	                h: original.h,
	                s: original.s,
	                v: original.v
	              }
	            }
	            return false;
	          },
	
	          write: function(color) {
	            return {
	              h: color.h,
	              s: color.s,
	              v: color.v
	            }
	          }
	
	        }
	
	      }
	
	    }
	
	
	  ];
	
	  return interpret;
	
	
	})(dat.color.toString,
	dat.utils.common),
	dat.color.math = (function () {
	
	  var tmpComponent;
	
	  return {
	
	    hsv_to_rgb: function(h, s, v) {
	
	      var hi = Math.floor(h / 60) % 6;
	
	      var f = h / 60 - Math.floor(h / 60);
	      var p = v * (1.0 - s);
	      var q = v * (1.0 - (f * s));
	      var t = v * (1.0 - ((1.0 - f) * s));
	      var c = [
	        [v, t, p],
	        [q, v, p],
	        [p, v, t],
	        [p, q, v],
	        [t, p, v],
	        [v, p, q]
	      ][hi];
	
	      return {
	        r: c[0] * 255,
	        g: c[1] * 255,
	        b: c[2] * 255
	      };
	
	    },
	
	    rgb_to_hsv: function(r, g, b) {
	
	      var min = Math.min(r, g, b),
	          max = Math.max(r, g, b),
	          delta = max - min,
	          h, s;
	
	      if (max != 0) {
	        s = delta / max;
	      } else {
	        return {
	          h: NaN,
	          s: 0,
	          v: 0
	        };
	      }
	
	      if (r == max) {
	        h = (g - b) / delta;
	      } else if (g == max) {
	        h = 2 + (b - r) / delta;
	      } else {
	        h = 4 + (r - g) / delta;
	      }
	      h /= 6;
	      if (h < 0) {
	        h += 1;
	      }
	
	      return {
	        h: h * 360,
	        s: s,
	        v: max / 255
	      };
	    },
	
	    rgb_to_hex: function(r, g, b) {
	      var hex = this.hex_with_component(0, 2, r);
	      hex = this.hex_with_component(hex, 1, g);
	      hex = this.hex_with_component(hex, 0, b);
	      return hex;
	    },
	
	    component_from_hex: function(hex, componentIndex) {
	      return (hex >> (componentIndex * 8)) & 0xFF;
	    },
	
	    hex_with_component: function(hex, componentIndex, value) {
	      return value << (tmpComponent = componentIndex * 8) | (hex & ~ (0xFF << tmpComponent));
	    }
	
	  }
	
	})(),
	dat.color.toString,
	dat.utils.common);

/***/ },
/* 4 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * fileOverview:
	 * Project:
	 * File:
	 * Date:
	 * Author:
	 */
	
	/**
	 *
	 */
	var WINDOW = global.window;
	
	/**
	 *
	 * @type {HTMLDocument}
	 */
	var DOCUMENT = document;
	
	var location = WINDOW.location;
	
	var hash = location.hash;
	
	var baseURL = location.href;
	
	/**
	 * クエリにをオブｋじぇくと形式に変換
	 * @type {{}}
	 */
	var queryObject = {};
	
	var queries = location.search;
	
	if (1 < queries.length) {
	
	  var query = queries.substring(1);
	  var params = query.split('&');
	
	  for (var i = 0, len = params.length; i < len; i += 1) {
	    var element = params[i].split('=');
	    queryObject[decodeURIComponent(element[0])] = decodeURIComponent(element[1]);
	  }
	}
	
	var GlobalData = function () {
	  function GlobalData() {
	    _classCallCheck(this, GlobalData);
	  }
	
	  _createClass(GlobalData, null, [{
	    key: 'init',
	    value: function init() {
	      this.html = document.getElementsByTagName('html')[0];
	      this.htmlStyle = this.html.style;
	
	      this.body = document.getElementsByTagName('body')[0];
	      this.bodyStyle = this.body.style;
	    }
	
	    /**
	     *
	     */
	
	
	    /**
	     *
	     */
	
	
	    /**
	     *
	     */
	
	
	    /**
	     *
	     */
	
	
	    /**
	     *
	     */
	
	
	    /**
	     *
	     */
	
	
	    /**
	     *
	     */
	
	
	    /**
	     *
	     */
	
	
	    /**
	     * ローカル環境かどうか
	     * @returns {boolean}
	     */
	
	  }, {
	    key: 'getHasQuery',
	
	
	    /**
	     *
	     * @param q
	     * @returns {boolean}
	     */
	    value: function getHasQuery(q) {
	      return !!queryObject.hasOwnProperty(q);
	    }
	  }, {
	    key: 'getQueryVal',
	
	
	    /**
	     *
	     * @param q
	     * @returns {null}
	     */
	    value: function getQueryVal(q) {
	      return queryObject.hasOwnProperty(q) ? queryObject[q] : null;
	    }
	  }, {
	    key: 'isNewCommeer',
	
	
	    /**
	     * 初回訪問かどうか
	     * @returns {boolean}
	     */
	    get: function get() {
	      return DOCUMENT.referrer.indexOf(this.domain) < 0;
	    }
	
	    /**
	     * セキュア接続かどうか
	     * @type {boolean}
	     */
	
	  }, {
	    key: 'queryObject',
	
	
	    /**
	     *
	     * @returns {{}}
	     */
	    get: function get() {
	      return queryObject;
	    }
	  }]);
	
	  return GlobalData;
	}();
	
	GlobalData.window = WINDOW;
	GlobalData.docment = DOCUMENT;
	GlobalData.html = null;
	GlobalData.htmlStyle = null;
	GlobalData.body = null;
	GlobalData.bodyStyle = null;
	GlobalData.location = location;
	GlobalData.domain = DOCUMENT.domain;
	GlobalData.search = location.search;
	GlobalData.protocol = location.protocol;
	GlobalData.hash = hash;
	GlobalData.hashVal = !!hash ? hash.split('#')[1] : '';
	GlobalData.port = location.port;
	GlobalData.url = baseURL;
	GlobalData.planeURL = location.origin + location.pathname;
	GlobalData.isLocal = baseURL.indexOf('file://') > -1 || baseURL.indexOf('://localhost') > -1 || baseURL.indexOf('://192') > -1;
	GlobalData.isSSL = baseURL.indexOf('https') === 0;
	exports.default = GlobalData;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * fileOverview:
	 * Project:
	 * File:
	 * Date:
	 * Author:
	 */
	
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _PubSub2 = __webpack_require__(6);
	
	var _PubSub3 = _interopRequireDefault(_PubSub2);
	
	var _es6Symbol = __webpack_require__(7);
	
	var _es6Symbol2 = _interopRequireDefault(_es6Symbol);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _Symbol = global.Symbol || _es6Symbol2.default;
	
	var singleton = _Symbol();
	var singletonEnforcer = _Symbol();
	var instance = void 0;
	
	/**
	 *
	 * @type {string}
	 */
	var LOAD = 'load';
	
	/**
	 *
	 * @type {string}
	 */
	var RESIZE = 'resize';
	
	/**
	 *
	 * @type {string}
	 */
	var UNLOAD = 'unload';
	
	/**
	 *
	 * @type {string}
	 */
	var MOUSE_WHEEL = 'mousewheel';
	
	/**
	 *
	 * @type {string}
	 */
	var REQUEST_ANIMATION_FRAME = 'request_animation_frame';
	
	/**
	 * listenGlobalEvent
	 *
	 * @param type
	 * @param listener
	 */
	var listenGlobalEvent = function listenGlobalEvent(type, listener) {
	
	  if (typeof global.addEventListener !== 'undefined') {
	    if (type === MOUSE_WHEEL) {
	      global.addEventListener('DOMMouseScroll', listener, false);
	    }
	    global.addEventListener(type, listener, false);
	  } else if (typeof global.attachEvent !== 'undefined') {
	    global.attachEvent('on' + type, listener);
	  } else {
	    if (global['on' + type] !== null) {
	      (function () {
	        var existenceListener = global['on' + type];
	        global['on' + type] = function (event) {
	          existenceListener(event);
	          listener(event);
	        };
	      })();
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
	var onLoadHandler = function onLoadHandler(event) {
	  instance.dispatchEvent(LOAD, {
	    originalEvent: event
	  }, this);
	};
	
	/**
	 * onResizeHandler
	 *
	 * @param event
	 */
	var onResizeHandler = function onResizeHandler(event) {
	  instance.dispatchEvent(RESIZE, {
	    originalEvent: event
	  }, this);
	};
	
	/**
	 * onUnLoadHandler
	 *
	 * @param event
	 */
	var onUnLoadHandler = function onUnLoadHandler(event) {
	  instance.dispatchEvent(UNLOAD, {
	    originalEvent: event
	  }, this);
	};
	
	/**
	 * onMouseWheelHandler
	 *
	 * @param event
	 */
	var onMouseWheelHandler = function onMouseWheelHandler(event) {
	  var delta = event.detail !== 0 ? event.detail : event.wheelDelta;
	  instance.dispatchEvent(MOUSE_WHEEL, {
	    originalEvent: event,
	    delta: delta
	  }, this);
	};
	
	var animationID = void 0;
	var animationFunctions = [];
	
	/**
	 *
	 * @param event
	 */
	var animationFrame = function animationFrame(event) {
	  instance.dispatchEvent(REQUEST_ANIMATION_FRAME, {
	    originalEvent: event
	  }, this);
	  animationID = window.requestAnimationFrame(animationFrame);
	};
	
	var WindowUtil = function (_PubSub) {
	  _inherits(WindowUtil, _PubSub);
	
	  _createClass(WindowUtil, null, [{
	    key: "requestAnimationFrame",
	    value: function requestAnimationFrame(callback) {
	      return window.requestAnimationFrame(callback);
	    }
	  }, {
	    key: "cancelAnimationFrame",
	    value: function cancelAnimationFrame(id) {
	      window.requestAnimationFrame(id);
	    }
	  }, {
	    key: "getScreenSize",
	    value: function getScreenSize() {
	      var _w = void 0,
	          _h = void 0;
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
	      return { width: _w, height: _h };
	    }
	  }, {
	    key: "getDocumentSize",
	    value: function getDocumentSize() {
	      var width = void 0,
	          height = void 0;
	
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
	
	      return { width: width, height: height };
	    }
	  }, {
	    key: "getScrollPosition",
	    value: function getScrollPosition() {
	      var _x = void 0,
	          _y = void 0;
	      _x = document.documentElement.scrollLeft || document.body.scrollLeft || window.pageXOffset;
	      _y = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset;
	      return { top: _y, left: _x };
	    }
	  }, {
	    key: "instance",
	    get: function get() {
	      if (!this[singleton]) {
	        this[singleton] = new WindowUtil(singletonEnforcer);
	        instance = this[singleton];
	      }
	      return this[singleton];
	    }
	  }]);
	
	  function WindowUtil(enforcer) {
	    _classCallCheck(this, WindowUtil);
	
	    if (enforcer === singletonEnforcer) {
	      var _this = _possibleConstructorReturn(this, (WindowUtil.__proto__ || Object.getPrototypeOf(WindowUtil)).call(this));
	
	      var globalEvents = ['load', 'resize', 'unload', MOUSE_WHEEL];
	      var globalListeners = [onLoadHandler, onResizeHandler, onUnLoadHandler, onMouseWheelHandler];
	
	      var length = globalEvents.length;
	      for (var i = 0; i < length; i += 1) {
	        listenGlobalEvent(globalEvents[i], globalListeners[i]);
	      }
	    } else {
	      throw "Cannot construct singleton";
	    }
	    return _possibleConstructorReturn(_this);
	  }
	
	  /**
	   *
	   * @param type
	   * @param listener
	   */
	
	
	  _createClass(WindowUtil, [{
	    key: "addEventListener",
	    value: function addEventListener(type, listener) {
	      _get(WindowUtil.prototype.__proto__ || Object.getPrototypeOf(WindowUtil.prototype), "addEventListener", this).call(this, type, listener);
	
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
	
	  }, {
	    key: "on",
	    value: function on(type, listener) {
	      this.addEventListener(type, listener);
	    }
	
	    /**
	     *
	     * @param type
	     * @param listener
	     */
	
	  }, {
	    key: "bind",
	    value: function bind(type, listener) {
	      this.addEventListener(type, listener);
	    }
	
	    /**
	     *
	     * @param type
	     * @param listener
	     */
	
	  }, {
	    key: "removeEventListener",
	    value: function removeEventListener(type, listener) {
	      _get(WindowUtil.prototype.__proto__ || Object.getPrototypeOf(WindowUtil.prototype), "removeEventListener", this).call(this, type, listener);
	
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
	
	  }, {
	    key: "off",
	    value: function off(type, listener) {
	      this.removeEventListener(type, listener);
	    }
	
	    /**
	     *
	     * @param type
	     * @param listener
	     */
	
	  }, {
	    key: "unbind",
	    value: function unbind(type, listener) {
	      this.removeEventListener(type, listener);
	    }
	
	    /**
	     *
	     * @param type
	     * @param listener
	     */
	
	  }, {
	    key: "one",
	    value: function one(type, listener) {
	      var _this2 = this,
	          _arguments = arguments;
	
	      var _listener = function _listener() {
	        _this2.off(type, _listener);
	        listener.apply(null, _arguments);
	      };
	
	      this.on(type, _listener);
	    }
	  }]);
	
	  return WindowUtil;
	}(_PubSub3.default);
	
	exports.default = WindowUtil;
	
	
	(function (window) {
	
	  var lastTime = 0;
	  var vendors = ['ms', 'moz', 'webkit', 'o'];
	
	  for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
	    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
	    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
	  }
	
	  if (!window.requestAnimationFrame) {
	    window.requestAnimationFrame = function (callback, element) {
	      var currTime = new Date().getTime();
	      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
	      var id = window.setTimeout(function () {
	        callback(currTime + timeToCall);
	      }, timeToCall);
	      lastTime = currTime + timeToCall;
	      return id;
	    };
	  }
	
	  if (!window.cancelAnimationFrame) {
	    window.cancelAnimationFrame = function (id) {
	      clearTimeout(id);
	    };
	  }
	
	  var startOffset = Date.now ? Date.now() : +new Date(),
	      performance = window.performance || {},
	      _entries = [],
	      _marksIndex = {},
	      _filterEntries = function _filterEntries(key, value) {
	    var i = 0,
	        n = _entries.length,
	        result = [];
	    for (; i < n; i++) {
	      if (_entries[i][key] == value) {
	        result.push(_entries[i]);
	      }
	    }
	    return result;
	  },
	      _clearEntries = function _clearEntries(type, name) {
	    var i = _entries.length,
	        entry = void 0;
	    while (i--) {
	      entry = _entries[i];
	      if (entry.entryType == type && (name === void 0 || entry.name == name)) {
	        _entries.splice(i, 1);
	      }
	    }
	  };
	
	  if (!performance.now) {
	    performance.now = performance.webkitNow || performance.mozNow || performance.msNow || function () {
	      return (Date.now ? Date.now() : +new Date()) - startOffset;
	    };
	  }
	
	  if (!performance.mark) {
	    performance.mark = performance.webkitMark || function (name) {
	      var mark = {
	        name: name,
	        entryType: 'mark',
	        startTime: performance.now(),
	        duration: 0
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
	        name: name,
	        entryType: 'measure',
	        startTime: startMark,
	        duration: endMark - startMark
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
	})(window);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 6 */
/***/ function(module, exports) {

	/**
	 * fileOverview: イベントディスパッチャー代替
	 * Project:
	 * File:
	 * Date:
	 * Author:
	 */
	
	'use strict';
	
	/**
	 *
	 * @type {{}}
	 * @private
	 */
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var _events = {};
	
	var PubSub = function () {
	  _createClass(PubSub, null, [{
	    key: 'hasTopic',
	
	
	    /**
	     *
	     * @param topic
	     * @returns {*}
	     */
	    value: function hasTopic(topic) {
	      return Object.prototype.hasOwnProperty.call(_events, topic);
	    }
	
	    /**
	     *
	     * @param topic
	     * @param func
	     * @returns {*[]}
	     */
	
	  }, {
	    key: 'subscribe',
	    value: function subscribe(topic, func) {
	      if (!PubSub.hasTopic(topic)) {
	        _events[topic] = [];
	      }
	      _events[topic].push(func);
	      return [topic, func];
	    }
	
	    /**
	     *
	     * @param topic
	     * @param args
	     * @returns {boolean}
	     */
	
	  }, {
	    key: 'publish',
	    value: function publish(topic, args) {
	      if (!PubSub.hasTopic(topic)) {
	        return false;
	      }
	      for (var i = 0, j = _events[topic].length; i < j; i += 1) {
	        _events[topic][i].apply(null, args || []);
	      }
	    }
	
	    /**
	     *
	     * @param topic
	     * @returns {boolean}
	     */
	
	  }, {
	    key: 'unsubscribe',
	    value: function unsubscribe(topic) {
	      if (!PubSub.hasTopic(topic)) {
	        return false;
	      }
	      _events[topic] = null;
	    }
	  }]);
	
	  /**
	   * @constructor
	   */
	  function PubSub(context) {
	    _classCallCheck(this, PubSub);
	
	    this._events = {};
	    this._parentEventTarget = [];
	    this._context = context;
	  }
	
	  /**
	   *
	   * @param type
	   * @param callback
	   * @param context
	   * @param priority
	   */
	
	
	  _createClass(PubSub, [{
	    key: 'one',
	    value: function one(type, callback, context, priority) {
	
	      var handler = function () {
	        this.off(type, handler);
	        callback.apply(this, arguments);
	      }.bind(this);
	
	      this.on(type, handler, context, priority);
	    }
	
	    /**
	     *
	     * @param type
	     * @param callback
	     * @param context
	     * @param priority
	     */
	
	  }, {
	    key: 'addEventListener',
	    value: function addEventListener(type, callback, context, priority) {
	
	      priority = priority || 0;
	
	      this._events[type] = {}.hasOwnProperty.call(this._events, type) ? this._events[type] : {};
	      var listenerToInsert = { context: context, callback: callback, priority: priority };
	
	      if (this._events[type].listeners) {
	        var listeners = this._events[type].listeners;
	        var inserted = false;
	        for (var i = 0, length = listeners.length; i < length; i++) {
	          var listener = listeners[i];
	          var eventPriority = listener.priority;
	          if (priority < eventPriority) {
	            listeners.splice(i, 0, listenerToInsert);
	            inserted = true;
	            break;
	          }
	        }
	        if (!inserted) {
	          listeners.push(listenerToInsert);
	        }
	      } else {
	        this._events[type].listeners = [listenerToInsert];
	      }
	    }
	  }, {
	    key: 'subscribe',
	
	
	    /**
	     *
	     */
	    value: function subscribe() {
	      this.addEventListener.apply(this, arguments);
	    }
	
	    /**
	     *
	     */
	
	  }, {
	    key: 'bind',
	    value: function bind() {
	      this.addEventListener.apply(this, arguments);
	    }
	
	    /**
	     *
	     */
	
	  }, {
	    key: 'on',
	    value: function on() {
	      this.addEventListener.apply(this, arguments);
	    }
	
	    /**
	     *
	     * @param type
	     * @param callback
	     * @returns {boolean}
	     */
	
	  }, {
	    key: 'removeEventListener',
	    value: function removeEventListener(type, callback) {
	      var listeners = this._events[type] ? this._events[type].listeners : null;
	
	      if (!listeners || listeners.length < 1) {
	        return false;
	      }
	
	      if (!callback) {
	        this._events[type].listeners = [];
	        return true;
	      }
	
	      for (var i = 0, length = listeners.length; i < length; i++) {
	        var listener = listeners[i];
	        if (listener.callback === callback) {
	          listeners.splice(i, 1);
	          return true;
	        }
	      }
	
	      return false;
	    }
	
	    /**
	     *
	     */
	
	  }, {
	    key: 'unsubscribe',
	    value: function unsubscribe() {
	      this.removeEventListener.apply(this, arguments);
	    }
	
	    /**
	     *
	     */
	
	  }, {
	    key: 'unbind',
	    value: function unbind() {
	      this.removeEventListener.apply(this, arguments);
	    }
	
	    /**
	     *
	     */
	
	  }, {
	    key: 'off',
	    value: function off() {
	      this.removeEventListener.apply(this, arguments);
	    }
	
	    /**
	     *
	     */
	
	  }, {
	    key: 'removeAllEventListener',
	    value: function removeAllEventListener() {
	      for (var key in this._events) {
	        if (this._events.hasOwnProperty(key)) {
	          this._events[key].listeners.length = 0;
	          delete this._events[key];
	        }
	      }
	
	      this._events = [];
	    }
	  }, {
	    key: 'unbindAll',
	
	
	    /**
	     *
	     */
	    value: function unbindAll() {
	      this.removeAllEventListener.apply(this, arguments);
	    }
	
	    /**
	     *
	     */
	
	  }, {
	    key: 'offAll',
	    value: function offAll() {
	      this.removeAllEventListener.apply(this, arguments);
	    }
	
	    /**
	     *
	     * @param type
	     * @param callback
	     * @returns {boolean}
	     */
	
	  }, {
	    key: 'hasEventListener',
	    value: function hasEventListener(type, callback) {
	      var listeners = this._events[type] ? this._events[type].listeners : null;
	
	      if (!listeners) {
	        return false;
	      }
	
	      if (!callback) {
	        return listeners.length > 0;
	      }
	
	      for (var i = 0, length = listeners.length; i < length; i++) {
	        var listener = listeners[i];
	        if (listener.callback === callback) {
	          return true;
	        }
	      }
	
	      return false;
	    }
	
	    /**
	     *
	     */
	
	  }, {
	    key: 'hasTopic',
	    value: function hasTopic() {
	      this.hasEventListener.apply(this, arguments);
	    }
	
	    /**
	     *
	     * @param type
	     * @param option
	     * @param target
	     */
	
	  }, {
	    key: 'dispatchEvent',
	    value: function dispatchEvent(type, option, target) {
	
	      var event = {
	        type: type,
	        params: option
	      };
	
	      if (target) {
	        event.target = target;
	      }
	
	      var listeners = this._events[type] ? this._events[type].listeners : null;
	
	      if (!listeners || listeners.length < 1) {
	        return;
	      }
	
	      for (var i = listeners.length - 1; i >= 0; i--) {
	        var listener = listeners[i];
	        var callback = listener.callback;
	        var callbackContext = listener.context ? listener.context : this._context;
	
	        if (!('target' in event)) {
	          event.target = this;
	        }
	
	        event.currentTarget = this;
	        event.context = callbackContext;
	        var result = null;
	
	        if (!callback) {
	          return;
	        }
	
	        if (typeof callback === 'function') {
	          result = callback.call(this, event);
	        } else if (callback.hasOwnProperty('handleEvent') && typeof callback.handleEvent === 'function') {
	          result = callback.handleEvent.call(this, event);
	        }
	
	        if (result !== undefined && !result) {
	          break;
	        }
	      }
	    }
	  }, {
	    key: 'publish',
	
	
	    /**
	     *
	     */
	    value: function publish() {
	      this.dispatchEvent.apply(this, arguments);
	    }
	  }, {
	    key: 'trigger',
	
	
	    /**
	     *
	     */
	    value: function trigger() {
	      this.dispatchEvent.apply(this, arguments);
	    }
	
	    /**
	     *
	     */
	
	  }, {
	    key: 'fire',
	    value: function fire() {
	      this.dispatchEvent.apply(this, arguments);
	    }
	
	    /**
	     *
	     */
	
	  }, {
	    key: 'dispatch',
	    value: function dispatch() {
	      this.dispatchEvent.apply(this, arguments);
	    }
	  }]);
	
	  return PubSub;
	}();
	
	exports.default = PubSub;
	;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = __webpack_require__(8)() ? Symbol : __webpack_require__(9);


/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';
	
	var validTypes = { object: true, symbol: true };
	
	module.exports = function () {
		var symbol;
		if (typeof Symbol !== 'function') return false;
		symbol = Symbol('test symbol');
		try { String(symbol); } catch (e) { return false; }
	
		// Return 'true' also for polyfills
		if (!validTypes[typeof Symbol.iterator]) return false;
		if (!validTypes[typeof Symbol.toPrimitive]) return false;
		if (!validTypes[typeof Symbol.toStringTag]) return false;
	
		return true;
	};


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	// ES2015 Symbol polyfill for environments that do not support it (or partially support it)
	
	'use strict';
	
	var d              = __webpack_require__(10)
	  , validateSymbol = __webpack_require__(23)
	
	  , create = Object.create, defineProperties = Object.defineProperties
	  , defineProperty = Object.defineProperty, objPrototype = Object.prototype
	  , NativeSymbol, SymbolPolyfill, HiddenSymbol, globalSymbols = create(null)
	  , isNativeSafe;
	
	if (typeof Symbol === 'function') {
		NativeSymbol = Symbol;
		try {
			String(NativeSymbol());
			isNativeSafe = true;
		} catch (ignore) {}
	}
	
	var generateName = (function () {
		var created = create(null);
		return function (desc) {
			var postfix = 0, name, ie11BugWorkaround;
			while (created[desc + (postfix || '')]) ++postfix;
			desc += (postfix || '');
			created[desc] = true;
			name = '@@' + desc;
			defineProperty(objPrototype, name, d.gs(null, function (value) {
				// For IE11 issue see:
				// https://connect.microsoft.com/IE/feedbackdetail/view/1928508/
				//    ie11-broken-getters-on-dom-objects
				// https://github.com/medikoo/es6-symbol/issues/12
				if (ie11BugWorkaround) return;
				ie11BugWorkaround = true;
				defineProperty(this, name, d(value));
				ie11BugWorkaround = false;
			}));
			return name;
		};
	}());
	
	// Internal constructor (not one exposed) for creating Symbol instances.
	// This one is used to ensure that `someSymbol instanceof Symbol` always return false
	HiddenSymbol = function Symbol(description) {
		if (this instanceof HiddenSymbol) throw new TypeError('TypeError: Symbol is not a constructor');
		return SymbolPolyfill(description);
	};
	
	// Exposed `Symbol` constructor
	// (returns instances of HiddenSymbol)
	module.exports = SymbolPolyfill = function Symbol(description) {
		var symbol;
		if (this instanceof Symbol) throw new TypeError('TypeError: Symbol is not a constructor');
		if (isNativeSafe) return NativeSymbol(description);
		symbol = create(HiddenSymbol.prototype);
		description = (description === undefined ? '' : String(description));
		return defineProperties(symbol, {
			__description__: d('', description),
			__name__: d('', generateName(description))
		});
	};
	defineProperties(SymbolPolyfill, {
		for: d(function (key) {
			if (globalSymbols[key]) return globalSymbols[key];
			return (globalSymbols[key] = SymbolPolyfill(String(key)));
		}),
		keyFor: d(function (s) {
			var key;
			validateSymbol(s);
			for (key in globalSymbols) if (globalSymbols[key] === s) return key;
		}),
	
		// If there's native implementation of given symbol, let's fallback to it
		// to ensure proper interoperability with other native functions e.g. Array.from
		hasInstance: d('', (NativeSymbol && NativeSymbol.hasInstance) || SymbolPolyfill('hasInstance')),
		isConcatSpreadable: d('', (NativeSymbol && NativeSymbol.isConcatSpreadable) ||
			SymbolPolyfill('isConcatSpreadable')),
		iterator: d('', (NativeSymbol && NativeSymbol.iterator) || SymbolPolyfill('iterator')),
		match: d('', (NativeSymbol && NativeSymbol.match) || SymbolPolyfill('match')),
		replace: d('', (NativeSymbol && NativeSymbol.replace) || SymbolPolyfill('replace')),
		search: d('', (NativeSymbol && NativeSymbol.search) || SymbolPolyfill('search')),
		species: d('', (NativeSymbol && NativeSymbol.species) || SymbolPolyfill('species')),
		split: d('', (NativeSymbol && NativeSymbol.split) || SymbolPolyfill('split')),
		toPrimitive: d('', (NativeSymbol && NativeSymbol.toPrimitive) || SymbolPolyfill('toPrimitive')),
		toStringTag: d('', (NativeSymbol && NativeSymbol.toStringTag) || SymbolPolyfill('toStringTag')),
		unscopables: d('', (NativeSymbol && NativeSymbol.unscopables) || SymbolPolyfill('unscopables'))
	});
	
	// Internal tweaks for real symbol producer
	defineProperties(HiddenSymbol.prototype, {
		constructor: d(SymbolPolyfill),
		toString: d('', function () { return this.__name__; })
	});
	
	// Proper implementation of methods exposed on Symbol.prototype
	// They won't be accessible on produced symbol instances as they derive from HiddenSymbol.prototype
	defineProperties(SymbolPolyfill.prototype, {
		toString: d(function () { return 'Symbol (' + validateSymbol(this).__description__ + ')'; }),
		valueOf: d(function () { return validateSymbol(this); })
	});
	defineProperty(SymbolPolyfill.prototype, SymbolPolyfill.toPrimitive, d('', function () {
		var symbol = validateSymbol(this);
		if (typeof symbol === 'symbol') return symbol;
		return symbol.toString();
	}));
	defineProperty(SymbolPolyfill.prototype, SymbolPolyfill.toStringTag, d('c', 'Symbol'));
	
	// Proper implementaton of toPrimitive and toStringTag for returned symbol instances
	defineProperty(HiddenSymbol.prototype, SymbolPolyfill.toStringTag,
		d('c', SymbolPolyfill.prototype[SymbolPolyfill.toStringTag]));
	
	// Note: It's important to define `toPrimitive` as last one, as some implementations
	// implement `toPrimitive` natively without implementing `toStringTag` (or other specified symbols)
	// And that may invoke error in definition flow:
	// See: https://github.com/medikoo/es6-symbol/issues/13#issuecomment-164146149
	defineProperty(HiddenSymbol.prototype, SymbolPolyfill.toPrimitive,
		d('c', SymbolPolyfill.prototype[SymbolPolyfill.toPrimitive]));


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var assign        = __webpack_require__(11)
	  , normalizeOpts = __webpack_require__(18)
	  , isCallable    = __webpack_require__(19)
	  , contains      = __webpack_require__(20)
	
	  , d;
	
	d = module.exports = function (dscr, value/*, options*/) {
		var c, e, w, options, desc;
		if ((arguments.length < 2) || (typeof dscr !== 'string')) {
			options = value;
			value = dscr;
			dscr = null;
		} else {
			options = arguments[2];
		}
		if (dscr == null) {
			c = w = true;
			e = false;
		} else {
			c = contains.call(dscr, 'c');
			e = contains.call(dscr, 'e');
			w = contains.call(dscr, 'w');
		}
	
		desc = { value: value, configurable: c, enumerable: e, writable: w };
		return !options ? desc : assign(normalizeOpts(options), desc);
	};
	
	d.gs = function (dscr, get, set/*, options*/) {
		var c, e, options, desc;
		if (typeof dscr !== 'string') {
			options = set;
			set = get;
			get = dscr;
			dscr = null;
		} else {
			options = arguments[3];
		}
		if (get == null) {
			get = undefined;
		} else if (!isCallable(get)) {
			options = get;
			get = set = undefined;
		} else if (set == null) {
			set = undefined;
		} else if (!isCallable(set)) {
			options = set;
			set = undefined;
		}
		if (dscr == null) {
			c = true;
			e = false;
		} else {
			c = contains.call(dscr, 'c');
			e = contains.call(dscr, 'e');
		}
	
		desc = { get: get, set: set, configurable: c, enumerable: e };
		return !options ? desc : assign(normalizeOpts(options), desc);
	};


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = __webpack_require__(12)()
		? Object.assign
		: __webpack_require__(13);


/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function () {
		var assign = Object.assign, obj;
		if (typeof assign !== 'function') return false;
		obj = { foo: 'raz' };
		assign(obj, { bar: 'dwa' }, { trzy: 'trzy' });
		return (obj.foo + obj.bar + obj.trzy) === 'razdwatrzy';
	};


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var keys  = __webpack_require__(14)
	  , value = __webpack_require__(17)
	
	  , max = Math.max;
	
	module.exports = function (dest, src/*, …srcn*/) {
		var error, i, l = max(arguments.length, 2), assign;
		dest = Object(value(dest));
		assign = function (key) {
			try { dest[key] = src[key]; } catch (e) {
				if (!error) error = e;
			}
		};
		for (i = 1; i < l; ++i) {
			src = arguments[i];
			keys(src).forEach(assign);
		}
		if (error !== undefined) throw error;
		return dest;
	};


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = __webpack_require__(15)()
		? Object.keys
		: __webpack_require__(16);


/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function () {
		try {
			Object.keys('primitive');
			return true;
		} catch (e) { return false; }
	};


/***/ },
/* 16 */
/***/ function(module, exports) {

	'use strict';
	
	var keys = Object.keys;
	
	module.exports = function (object) {
		return keys(object == null ? object : Object(object));
	};


/***/ },
/* 17 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function (value) {
		if (value == null) throw new TypeError("Cannot use null or undefined");
		return value;
	};


/***/ },
/* 18 */
/***/ function(module, exports) {

	'use strict';
	
	var forEach = Array.prototype.forEach, create = Object.create;
	
	var process = function (src, obj) {
		var key;
		for (key in src) obj[key] = src[key];
	};
	
	module.exports = function (options/*, …options*/) {
		var result = create(null);
		forEach.call(arguments, function (options) {
			if (options == null) return;
			process(Object(options), result);
		});
		return result;
	};


/***/ },
/* 19 */
/***/ function(module, exports) {

	// Deprecated
	
	'use strict';
	
	module.exports = function (obj) { return typeof obj === 'function'; };


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = __webpack_require__(21)()
		? String.prototype.contains
		: __webpack_require__(22);


/***/ },
/* 21 */
/***/ function(module, exports) {

	'use strict';
	
	var str = 'razdwatrzy';
	
	module.exports = function () {
		if (typeof str.contains !== 'function') return false;
		return ((str.contains('dwa') === true) && (str.contains('foo') === false));
	};


/***/ },
/* 22 */
/***/ function(module, exports) {

	'use strict';
	
	var indexOf = String.prototype.indexOf;
	
	module.exports = function (searchString/*, position*/) {
		return indexOf.call(this, searchString, arguments[1]) > -1;
	};


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var isSymbol = __webpack_require__(24);
	
	module.exports = function (value) {
		if (!isSymbol(value)) throw new TypeError(value + " is not a symbol");
		return value;
	};


/***/ },
/* 24 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function (x) {
		if (!x) return false;
		if (typeof x === 'symbol') return true;
		if (!x.constructor) return false;
		if (x.constructor.name !== 'Symbol') return false;
		return (x[x.constructor.toStringTag] === 'Symbol');
	};


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * fileOverview:
	 * Project:
	 * File:
	 * Date:
	 * Author:
	 */
	
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Module = __webpack_require__(26);
	
	var _Module2 = _interopRequireDefault(_Module);
	
	var _Selector = __webpack_require__(27);
	
	var _Selector2 = _interopRequireDefault(_Selector);
	
	var _BrowserUtil = __webpack_require__(29);
	
	var _BrowserUtil2 = _interopRequireDefault(_BrowserUtil);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	// delegate 関連
	var _delegates = {};
	var paramCount = 3;
	var createParams = function createParams(parent, target, handler) {
	  return {
	    parent: parent,
	    target: target,
	    handler: handler
	  };
	};
	
	// パーサー関連
	var trimLeft = /^\s+/;
	var trimRight = /\s+$/;
	
	/**
	 *
	 * @param str
	 * @returns {*}
	 */
	var trim = function trim(str) {
	  return str.replace(trimLeft, '').replace(trimRight, '');
	};
	
	/**
	 *
	 * @param before
	 * @param after
	 * @param getFirstResult
	 * @returns {Function}
	 */
	var makeParser = function makeParser(before, after, getFirstResult) {
	  return function (html, doc) {
	    var parser = doc.createElement('div');
	    var fragment = doc.createDocumentFragment();
	    parser.innerHTML = before + html + after;
	    var node = getFirstResult(parser);
	    var nextNode = void 0;
	    while (node) {
	      nextNode = node.nextSibling;
	      fragment.appendChild(node);
	      node = nextNode;
	    }
	    return fragment;
	  };
	};
	
	var defaultParser = makeParser('', '', _Selector2.default.getFirstChild);
	
	var parsers = {
	  td: makeParser('<table><tbody><tr>', '</tr><\/tbody></table>', _Selector2.default.getFirstGreatGreatGrandChild),
	  tr: makeParser('<table><tbody>', '</tbody><\/table>', _Selector2.default.getFirstGreatGrandChild),
	  tbody: makeParser('<table>', '<\/table>', _Selector2.default.getFirstGrandChild),
	  col: makeParser('<table><colgroup>', '<\/colgroup></table>', _Selector2.default.getFirstGreatGrandChild),
	  option: makeParser('<select><option>a<\/option>', '<\/select>', _Selector2.default.getSecondGrandChild)
	};
	
	parsers.th = parsers.td;
	parsers.thead = parsers.tbody;
	parsers.tfoot = parsers.tbody;
	parsers.caption = parsers.tbody;
	parsers.colgroup = parsers.tbody;
	
	var tagRegExp = /^<([a-z]+)/i; // first group must be tag name
	
	
	/*
	 * className
	 */
	var _regHistory = {};
	
	var _regClassName = function _regClassName(className) {
	  if (_regHistory[className]) {
	    return _regHistory[className];
	  }
	
	  var reg = new RegExp('(^|\\s+)' + className + '(\\s+|$)');
	  _regHistory[className] = reg;
	  return reg;
	};
	
	var _trim = function _trim(str) {
	  return str.replace(/^\s+|\s+$/g, '');
	};
	
	/**
	 * READY
	 */
	var _ready = function () {
	  var funcs = [];
	  var isReady = document.readyState === 'complete';
	
	  var READY_STATE_CHANGE = 'readystatechange';
	  var ON_READY_STATE_CHANGE = 'on_' + READY_STATE_CHANGE;
	  var LOAD = 'load';
	  var DOMContentLoaded = 'DOMContentLoaded';
	
	  var counter = 0;
	
	  var one = function one(elm, type, callback, bubbling) {
	
	    var handler = function () {
	      if (elm.removeEventListener) {
	        elm.removeEventListener(type, handler, false);
	      } else if (elm.detachEvent) {
	        elm.detachEvent('on' + type, handler);
	      } else {
	        elm['on' + type] = null;
	      }
	      callback.apply(null, arguments);
	    }.bind(this);
	
	    if (elm.addEventListener) {
	      elm.addEventListener(type, handler, bubbling || false);
	    } else if (elm.attachEvent) {
	      elm.attachEvent('on' + type, handler);
	    } else {
	      elm['on' + type] = handler;
	    }
	  };
	
	  /**
	   *
	   * @param event
	   */
	  var handler = function handler(event) {
	    if (isReady) {
	      return;
	    }
	
	    if (event.type === READY_STATE_CHANGE && document.readyState !== 'complete') {
	      return;
	    }
	
	    for (var i = 0; i < funcs.length; i += 1) {
	      funcs[i].call(document);
	    }
	
	    counter += 1;
	
	    isReady = true;
	    funcs = null;
	  };
	
	  if (document.addEventListener) {
	    one(document, DOMContentLoaded, handler, false);
	  } else if (document.attachEvent) {
	    one(document, ON_READY_STATE_CHANGE, handler);
	  }
	
	  one(window, LOAD, handler);
	
	  /**
	   * @param func
	   */
	  return function (fun) {
	    if (isReady) {
	      setTimeout(fun.call(document), 0);
	    } else {
	      funcs.push(fun);
	    }
	  };
	}();
	
	var DOMUtil = function () {
	  function DOMUtil() {
	    _classCallCheck(this, DOMUtil);
	  }
	
	  _createClass(DOMUtil, null, [{
	    key: "addEventListener",
	
	    /**
	     *
	     * @param elem
	     * @param type
	     * @param handler
	     * @param bubbling
	     */
	    value: function addEventListener(elem, type, handler, bubbling) {
	
	      if (!elem || !type || !handler) {
	        return;
	      }
	
	      if (elem.addEventListener) {
	        elem.addEventListener(type, handler, bubbling || false);
	      } else if (elem.attachEvent) {
	        elem.attachEvent('on' + type, handler);
	      } else {
	        elem['on' + type] = handler;
	      }
	    }
	
	    /**
	     *
	     * @param elem
	     * @param type
	     * @param handler
	     * @param bubbling
	     */
	
	  }, {
	    key: "addEvent",
	    value: function addEvent(elem, type, handler, bubbling) {
	      DOMUtil.addEventListener(elem, type, handler, bubbling);
	    }
	
	    /**
	     *
	     * @param elem
	     * @param type
	     * @param handler
	     * @param bubbling
	     */
	
	  }, {
	    key: "on",
	    value: function on(elem, type, handler, bubbling) {
	      DOMUtil.addEventListener(elem, type, handler, bubbling);
	    }
	
	    /**
	     *
	     * @param elem
	     * @param type
	     * @param handler
	     * @param bubbling
	     */
	
	  }, {
	    key: "bind",
	    value: function bind(elem, type, handler, bubbling) {
	      DOMUtil.addEventListener(elem, type, handler, bubbling);
	    }
	
	    /**
	     *
	     * @param elm
	     * @param type
	     * @param callback
	     * @param bubbling
	     */
	
	  }, {
	    key: "one",
	    value: function one(elm, type, callback, bubbling) {
	      var _this = this,
	          _arguments = arguments;
	
	      var handler = function handler() {
	        _this.off(elm, type, handler);
	        callback.apply(null, _arguments);
	      };
	
	      this.on(elm, type, handler, bubbling);
	    }
	
	    /**
	     *
	     * @param elem
	     * @param type
	     * @param handler
	     * @param bubbling
	     */
	
	  }, {
	    key: "removeEventListener",
	    value: function removeEventListener(elem, type, handler, bubbling) {
	
	      if (!elem || !type || !handler) {
	        return;
	      }
	
	      if (elem.removeEventListener) {
	        elem.removeEventListener(type, handler, bubbling || false);
	      } else if (elem.detachEvent) {
	        elem.detachEvent('on' + type, handler);
	      } else {
	        elem['on' + type] = null;
	      }
	    }
	
	    /**
	     *
	     * @param elem
	     * @param type
	     * @param handler
	     * @param bubbling
	     */
	
	  }, {
	    key: "removeEvent",
	    value: function removeEvent(elem, type, handler, bubbling) {
	      DOMUtil.removeEventListener(elem, type, handler, bubbling);
	    }
	
	    /**
	     *
	     * @param elem
	     * @param type
	     * @param handler
	     * @param bubbling
	     */
	
	  }, {
	    key: "unbind",
	    value: function unbind(elem, type, handler, bubbling) {
	      DOMUtil.removeEventListener(elem, type, handler, bubbling);
	    }
	
	    /**
	     *
	     * @param elem
	     * @param type
	     * @param handler
	     * @param bubbling
	     */
	
	  }, {
	    key: "off",
	    value: function off(elem, type, handler, bubbling) {
	      DOMUtil.removeEventListener(elem, type, handler, bubbling);
	    }
	
	    /**
	     *
	     * @param event
	     */
	
	  }, {
	    key: "cancelEvent",
	    value: function cancelEvent(event) {
	      if (!event) {
	        return;
	      }
	      if (event.preventDefault) {
	        event.preventDefault();
	      } else {
	        event.returnValue = false;
	      }
	    }
	
	    /**
	     *
	     * @param event
	     */
	
	  }, {
	    key: "stopEvent",
	    value: function stopEvent(event) {
	      if (!event) {
	        return;
	      }
	      if (event.stopPropagation) {
	        event.stopPropagation();
	      } else {
	        event.cancelBubble = true;
	      }
	    }
	
	    /**
	     *
	     * @param event
	     */
	
	  }, {
	    key: "disableEvent",
	    value: function disableEvent(event) {
	
	      if ('originalEvent' in event && event.hasOwnProperty('originalEvent')) {
	        event = event.originalEvent;
	      }
	
	      DOMUtil.stopEvent(event);
	      DOMUtil.cancelEvent(event);
	    }
	  }, {
	    key: "triggerEvent",
	
	
	    /**
	     *
	     * @param element
	     * @param event
	     * @returns {*}
	     */
	    value: function triggerEvent(element, event) {
	      var evt = void 0;
	
	      var isString = function isString(it) {
	        return typeof it == 'string' || it instanceof String;
	      };
	
	      element = isString(element) ? document.getElementById(element) : element;
	      if (document.createEventObject) {
	        evt = document.createEventObject();
	        return element.fireEvent('on' + event, evt);
	      } else {
	        evt = document.createEvent('HTMLEvents');
	        evt.initEvent(event, true, true);
	        return !element.dispatchEvent(evt);
	      }
	    }
	  }, {
	    key: "delegate",
	
	
	    /**
	     *
	     * @param parent
	     * @param target
	     * @param type
	     * @param handler
	     */
	    value: function delegate(parent, target, type, handler) {
	
	      _delegates[type] = _delegates.hasOwnProperty(type) ? _delegates[type] : [];
	
	      var _children = null;
	      var selectorType = '';
	
	      if (target.indexOf('.') > -1) {
	        selectorType = 'className';
	        target = target.replace(/\./ig, '');
	        _children = _Module2.default.makeArray(_Selector2.default.getElementsByClassName(target, parent));
	      } else if (target.indexOf('#') > -1) {
	        selectorType = 'id';
	        _children = [document.getElementById(target)];
	        target = target.replace(/#/ig, '');
	      } else {
	        selectorType = 'tag';
	        _children = _Module2.default.makeArray(parent.getElementsByTagName(target));
	        target = target.toUpperCase();
	      }
	
	      var delegateHandler = function delegateHandler(event) {
	
	        var _target = event.target || event.srcElement;
	
	        if (!_target) {
	          return;
	        }
	
	        var eventTarget = null;
	
	        switch (selectorType) {
	          case 'className':
	            eventTarget = DOMUtil.hasClass(_target, target) ? _target : _Selector2.default.getParentClassNameNode(_target, target);
	            break;
	          case 'id':
	            eventTarget = _target.id === target ? _target : _Selector2.default.getParentIdNameNode(_target, target);
	            break;
	          case 'tag':
	            eventTarget = _target.tagName === target ? _target : _Selector2.default.getParentNode(_target, target);
	            break;
	          default:
	            eventTarget = _target.tagName === target ? _target : _Selector2.default.getParentNode(_target, target);
	            break;
	        }
	
	        if (!eventTarget) {
	          return;
	        }
	
	        handler({
	          originalEvent: event,
	          target: eventTarget,
	          index: _children.indexOf(eventTarget),
	          stop: function stop() {
	            DOMUtil.disableEvent(event);
	          },
	          preventDefault: function preventDefault() {
	            DOMUtil.disableEvent(event);
	          }
	        });
	      };
	
	      var params = createParams(parent, target, handler);
	
	      params.delegateHandler = delegateHandler;
	
	      _delegates[type].push(params);
	
	      DOMUtil.on(parent, type, delegateHandler);
	    }
	
	    /**
	     *
	     * @param parent
	     * @param target
	     * @param type
	     * @param handler
	     */
	
	  }, {
	    key: "undelegate",
	    value: function undelegate(parent, target, type, handler) {
	
	      var listeners = _delegates[type] ? _delegates[type] : null;
	
	      if (!listeners) {
	        return;
	      }
	
	      var params = createParams(parent, target, handler);
	
	      var sameCount = 0;
	
	      listeners.forEach(function (listener) {
	
	        sameCount = 0;
	
	        for (var prop in listener) {
	          if (listener.hasOwnProperty(prop) && params.hasOwnProperty(prop)) {
	            sameCount += 1;
	
	            if (sameCount === paramCount) {
	              DOMUtil.off(parent, type, listener.delegateHandler);
	            }
	          }
	        }
	      });
	    }
	
	    /**
	     *
	     * @param html
	     * @param doc
	     * @returns {*}
	     */
	
	  }, {
	    key: "parseHTML",
	    value: function parseHTML(html, doc) {
	      html = trim(html);
	
	      var parser = defaultParser;
	      var matches = html.match(tagRegExp);
	      if (matches) {
	        var name = matches[1].toLowerCase();
	        if (Object.prototype.hasOwnProperty.call(parsers, name)) {
	          parser = parsers[name];
	        }
	      }
	      return parser(html, doc || document);
	    }
	  }, {
	    key: "getEventPoint",
	    value: function getEventPoint(event) {
	      if (_BrowserUtil2.default.ltIE8) {
	        var target = document.documentElement;
	        return {
	          x: event.clientX + target.scrollLeft,
	          y: event.clientY + target.scrollTop
	        };
	      } else if (_BrowserUtil2.default.enableTouch) {
	        var _target2 = event.changedTouches[0];
	        return {
	          x: _target2.pageX,
	          y: _target2.pageY
	        };
	      } else {
	        return {
	          x: event.pageX,
	          y: event.pageY
	        };
	      }
	    }
	
	    /**
	     *
	     * @returns {*}
	     */
	
	  }, {
	    key: "removeProp",
	    value: function removeProp() {
	      var _style = document.body.style;
	      return _style.removeProperty ? _style.removeProperty : _style.removeAttribute;
	    }
	
	    /**
	     * @param element
	     * @param className
	     */
	
	  }, {
	    key: "addClass",
	    value: function addClass(element, className) {
	      var defaultClassName = element.className;
	      var result = false;
	      if (!DOMUtil.hasClass(element, className)) {
	        element.className += (defaultClassName ? ' ' : '') + className;
	        result = true;
	      }
	      return result;
	    }
	  }, {
	    key: "removeClass",
	
	
	    /**
	     *
	     * @param element
	     * @param className
	     * @param [_except]
	     */
	    value: function removeClass(element, className, _except) {
	
	      var defaultClassName = element.className;
	      var newClassName = '';
	      var result = false;
	
	      if (_except || DOMUtil.hasClass(element, className)) {
	        newClassName = _trim(defaultClassName.replace(_regClassName(className), ' '));
	        element.className = newClassName;
	        result = true;
	      }
	      return result;
	    }
	  }, {
	    key: "toggleClass",
	
	
	    /**
	     * @param element
	     * @param className
	     */
	    value: function toggleClass(element, className) {
	      var methodName = DOMUtil.hasClass(element, className) ? 'removeClass' : 'addClass';
	      DOMUtil[methodName](element, className);
	    }
	  }, {
	    key: "hasClass",
	
	
	    /**
	     * @param element
	     * @param className
	     * @returns {boolean}
	     */
	    value: function hasClass(element, className) {
	      var defaultClassName = element.className;
	
	      if (!defaultClassName || defaultClassName.length === 0) {
	        return false;
	      } else if (defaultClassName === className) {
	        return true;
	      }
	
	      return _regClassName(className).test(defaultClassName);
	    }
	  }, {
	    key: "getText",
	
	
	    /**
	     * 指定要素の中のテキストを取得
	     */
	    value: function getText(elem) {
	      var _docElem = document.documentElement;
	
	      if (_docElem.textContent) {
	        return elem.textContent;
	      } else {
	        return elem.innerText;
	      }
	    }
	
	    /**
	     *
	     * @param element
	     * @param string
	     */
	
	  }, {
	    key: "text",
	    value: function text(element, string) {
	      element.textContent !== undefined ? element.textContent = string : element.innerText = string;
	    }
	
	    /**
	     *
	     * @param element
	     */
	
	  }, {
	    key: "show",
	    value: function show(element) {
	      if (element !== null && typeof element !== 'undefined') {
	        if ('style' in element) {
	          element.style.display = 'block';
	        } else {
	          element.display = 'block';
	        }
	      }
	    }
	
	    /**
	     *
	     * @param element
	     */
	
	  }, {
	    key: "hide",
	    value: function hide(element) {
	      if (element !== null && typeof element !== 'undefined') {
	        if ('style' in element) {
	          element.style.display = 'none';
	        } else {
	          element.display = 'none';
	        }
	      }
	    }
	
	    /**
	     *
	     * @param element
	     */
	
	  }, {
	    key: "empty",
	    value: function empty(element) {
	      if (element !== null && typeof element !== 'undefined') {
	        while (element.firstChild) {
	          element.removeChild(element.firstChild);
	        }
	      }
	    }
	
	    /**
	     *
	     * @param elStyle
	     * @param styles
	     */
	
	  }, {
	    key: "css",
	    value: function css(elStyle, styles) {
	      if (!elStyle || !styles) {
	        return;
	      }
	
	      elStyle = 'style' in elStyle ? elStyle.style : elStyle;
	
	      for (var prop in styles) {
	        if (styles.hasOwnProperty(prop)) {
	          elStyle[prop] = styles[prop];
	        }
	      }
	    }
	
	    /**
	     *
	     * @param rurles  {array}
	     */
	
	  }, {
	    key: "makeCSSRules",
	    value: function makeCSSRules(rurles) {
	      if (!Array.isArray(rurles) || rurles.length <= 0) {
	        return;
	      }
	      if (document.createStyleSheet) {
	        var _sheet = document.createStyleSheet();
	        _sheet.cssText = rurles.join('');
	        _sheet = null;
	      } else {
	        var _style = document.createElement('style');
	        var _head = document.getElementsByTagName('head')[0];
	        _style.textContent = rurles.join('');
	        _head.appendChild(_style);
	        _style = null;
	        _head = null;
	      }
	    }
	
	    /**
	     *
	     * @param element
	     * @returns {{left: (Number|number), top: (Number|number)}}
	     */
	
	  }, {
	    key: "getPosition",
	    value: function getPosition(element) {
	      return { left: element.offsetLeft, top: element.offsetTop };
	    }
	
	    /**
	     *
	     * @param element
	     * @returns {*}
	     */
	
	  }, {
	    key: "getOffset",
	    value: function getOffset(element) {
	      var _x = void 0,
	          _y = void 0;
	      _x = _y = 0;
	      if (!element) {
	        return false;
	      }
	
	      do {
	        _x += element.offsetLeft;
	        _y += element.offsetTop;
	      } while (element = element.offsetParent);
	
	      return { top: _y, left: _x };
	    }
	  }, {
	    key: "getOffsetPosition",
	    value: function getOffsetPosition(el) {
	      var xPos = 0;
	      var yPos = 0;
	
	      while (el) {
	        if (el.tagName == "BODY") {
	          var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
	          var yScroll = el.scrollTop || document.documentElement.scrollTop;
	
	          xPos += el.offsetLeft - xScroll + el.clientLeft;
	          yPos += el.offsetTop - yScroll + el.clientTop;
	        } else {
	          // for all other non-BODY elements
	          xPos += el.offsetLeft - el.scrollLeft + el.clientLeft;
	          yPos += el.offsetTop - el.scrollTop + el.clientTop;
	        }
	
	        el = el.offsetParent;
	      }
	      return {
	        left: xPos,
	        top: yPos
	      };
	    }
	
	    /**
	     *
	     * @param element
	     * @returns {*}
	     */
	
	  }, {
	    key: "getRect",
	    value: function getRect(element) {
	      var rect = DOMUtil.getOffset(element);
	      rect.width = element.offsetWidth;
	      rect.height = element.offsetHeight;
	      rect.right = rect.left + rect.width;
	      rect.bottom = rect.top + rect.height;
	      return rect;
	    }
	
	    /**
	     *
	     * @param elem
	     * @returns {*}
	     */
	
	  }, {
	    key: "getStyle",
	    value: function getStyle(elem) {
	      var _styleData = null;
	
	      if (window.getComputedStyle) {
	        _styleData = window.getComputedStyle(elem, null);
	      } else if (document.documentElement.currentStyle) {
	        _styleData = elem.currentStyle;
	      }
	
	      return _styleData;
	    }
	
	    /**
	     *  スタイルプロパティーを取得
	     */
	
	  }, {
	    key: "getStylePropertyfunction",
	    value: function getStylePropertyfunction(propName) {
	
	      var prefixes = 'Webkit Moz ms Ms O'.split(' ');
	      var docElemStyle = document.documentElement.style;
	
	      if (!propName) {
	        return;
	      }
	
	      if (typeof docElemStyle[propName] === 'string') {
	        return propName;
	      }
	
	      propName = propName.charAt(0).toUpperCase() + propName.slice(1);
	
	      var prefixed = void 0;
	      for (var i = 0, len = prefixes.length; i < len; i++) {
	        prefixed = prefixes[i] + propName;
	        if (typeof docElemStyle[prefixed] === 'string') {
	          return prefixed;
	        }
	      }
	    }
	
	    /**
	     *
	     * @param elem
	     * @returns {{}}
	     */
	
	  }, {
	    key: "getElementSize",
	    value: function getElementSize(elem) {
	
	      var getStyleSize = function getStyleSize(val) {
	        var num = parseFloat(val);
	
	        var isValid = val.indexOf('%') === -1 && !isNaN(num);
	        return isValid && num;
	      };
	
	      var measurements = ['paddingLeft', 'paddingRight', 'paddingTop', 'paddingBottom', 'marginLeft', 'marginRight', 'marginTop', 'marginBottom', 'borderLeftWidth', 'borderRightWidth', 'borderTopWidth', 'borderBottomWidth'];
	
	      var getZeroSize = function getZeroSize() {
	        var size = {
	          width: 0,
	          height: 0,
	          innerWidth: 0,
	          innerHeight: 0,
	          outerWidth: 0,
	          outerHeight: 0
	        };
	
	        for (var i = 0, len = measurements.length; i < len; i++) {
	          var measurement = measurements[i];
	          size[measurement] = 0;
	        }
	        return size;
	      };
	
	      var boxSizingProp = DOMUtil.getStyleProperty('boxSizing');
	      var isBoxSizeOuter = void 0;
	
	      (function () {
	        if (!boxSizingProp) {
	          return;
	        }
	
	        var _div = document.createElement('div');
	        _div.style.width = '200px';
	        _div.style.padding = '1px 2px 3px 4px';
	        _div.style.borderStyle = 'solid';
	        _div.style.borderWidth = '1px 2px 3px 4px';
	        _div.style[boxSizingProp] = 'border-box';
	
	        var body = document.body || document.documentElement;
	        body.appendChild(_div);
	        var style = DOMUtil.getStyle(_div);
	
	        isBoxSizeOuter = getStyleSize(style.width) === 200;
	        body.removeChild(_div);
	      })();
	
	      var mungeNonPixel = function mungeNonPixel(elem, value) {
	
	        if (window.getComputedStyle || value.indexOf('%') === -1) {
	          return value;
	        }
	
	        var style = elem.style;
	        var left = style.left;
	        var rs = elem.runtimeStyle;
	        var rsLeft = rs && rs.left;
	
	        if (rsLeft) {
	          rs.left = elem.currentStyle.left;
	        }
	        style.left = value;
	        value = style.pixelLeft;
	
	        style.left = left;
	        if (rsLeft) {
	          rs.left = rsLeft;
	        }
	
	        return value;
	      };
	
	      if (typeof elem === 'string') {
	        elem = document.querySelector(elem);
	      }
	
	      if (!elem || (typeof elem === "undefined" ? "undefined" : _typeof(elem)) !== 'object' || !elem.nodeType) {
	        return;
	      }
	
	      var style = DOMUtil.getStyle(elem);
	
	      if (style.display === 'none') {
	        return getZeroSize();
	      }
	
	      var size = {};
	      size.width = elem.offsetWidth;
	      size.height = elem.offsetHeight;
	
	      var isBorderBox = size.isBorderBox = !!(boxSizingProp && style[boxSizingProp] && style[boxSizingProp] === 'border-box');
	
	      for (var i = 0, len = measurements.length; i < len; i++) {
	        var measurement = measurements[i];
	        var value = style[measurement];
	        value = mungeNonPixel(elem, value);
	        var num = parseFloat(value);
	        size[measurement] = !isNaN(num) ? num : 0;
	      }
	
	      var paddingWidth = size.paddingLeft + size.paddingRight;
	      var paddingHeight = size.paddingTop + size.paddingBottom;
	      var marginWidth = size.marginLeft + size.marginRight;
	      var marginHeight = size.marginTop + size.marginBottom;
	      var borderWidth = size.borderLeftWidth + size.borderRightWidth;
	      var borderHeight = size.borderTopWidth + size.borderBottomWidth;
	
	      var isBorderBoxSizeOuter = isBorderBox && isBoxSizeOuter;
	
	      var styleWidth = getStyleSize(style.width);
	      if (styleWidth !== false) {
	        size.width = styleWidth + (isBorderBoxSizeOuter ? 0 : paddingWidth + borderWidth);
	      }
	
	      var styleHeight = getStyleSize(style.height);
	      if (styleHeight !== false) {
	        size.height = styleHeight + (isBorderBoxSizeOuter ? 0 : paddingHeight + borderHeight);
	      }
	
	      size.innerWidth = size.width - (paddingWidth + borderWidth);
	      size.innerHeight = size.height - (paddingHeight + borderHeight);
	
	      size.outerWidth = size.width + marginWidth;
	      size.outerHeight = size.height + marginHeight;
	
	      return size;
	    }
	
	    /**
	     * 画像のサイズを取得
	     * @param image
	     * @returns {{width: *, height: *}}
	     */
	
	  }, {
	    key: "getImageNaturalSize",
	    value: function getImageNaturalSize(image) {
	      var mem = void 0;
	      var w = image.width,
	          h = image.height;
	
	      if (typeof image.naturalWidth !== 'undefined') {
	        w = image.naturalWidth;
	        h = image.naturalHeight;
	      } else if (typeof image.runtimeStyle !== 'undefined') {
	        var run = image.runtimeStyle;
	        mem = { w: run.width, h: run.height };
	        run.width = 'auto';
	        run.height = 'auto';
	        w = image.width;
	        h = image.height;
	        run.width = mem.w;
	        run.height = mem.h;
	      } else {
	        mem = { w: image.width, h: image.height };
	        image.removeAttribute('width');
	        image.removeAttribute('height');
	        w = image.width;
	        h = image.height;
	        image.width = mem.w;
	        image.height = mem.h;
	      }
	
	      return { width: w, height: h };
	    }
	  }, {
	    key: "Ready",
	
	
	    /**
	     *
	     * @param func
	     */
	    value: function Ready(func) {
	      _ready(func);
	    }
	  }]);
	
	  return DOMUtil;
	}();
	
	exports.default = DOMUtil;

/***/ },
/* 26 */
/***/ function(module, exports) {

	/**
	 * fileOverview:
	 * Project:
	 * File:
	 * Date:
	 * Author:
	 */
	
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var rValidChars = /^[\],:{}\s]*$/;
	var rValidEscape = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;
	var rValidTokens = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
	var rValidBraces = /(?:^|:|,)(?:\s*\[)+/g;
	
	var base64list = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
	
	var Module = function () {
	  function Module() {
	    _classCallCheck(this, Module);
	  }
	
	  _createClass(Module, [{
	    key: 'noop',
	
	
	    /**
	     *
	     */
	    value: function noop() {}
	
	    /**
	     *
	     * @param str
	     * @returns {*}
	     */
	
	  }], [{
	    key: 'JSONParse',
	
	
	    /**
	     *
	     * @param data
	     * @returns {*}
	     */
	    value: function JSONParse(data) {
	      if (typeof data !== 'string' || !data) {
	        return null;
	      }
	
	      if (rValidChars.test(data.replace(rValidEscape, '@').replace(rValidTokens, ']').replace(rValidBraces, ''))) {
	        return window.JSON && window.JSON.parse ? window.JSON.parse(data) : new Function('return ' + data)();
	      }
	
	      return null;
	    }
	
	    /**
	     *
	     * @param json
	     * @returns {string}
	     * @constructor
	     */
	
	  }, {
	    key: 'JSONStringify',
	    value: function JSONStringify(json) {
	
	      if ('JSON' in window) {
	        return window.JSON.stringify(obj);
	      } else {
	
	        var valType = typeof json === 'undefined' ? 'undefined' : _typeof(json);
	
	        if (valType != 'object' || json === null) {
	
	          if (valType == 'string') {
	            json = '"' + json + '"';
	          }
	
	          return String(json);
	        } else {
	
	          var key = void 0;
	          var val = void 0;
	          var _obj = [];
	          var arr = json && json.constructor == Array;
	
	          for (key in json) {
	
	            if (Object.prototype.hasOwnProperty.call(json, key)) {
	
	              val = json[key];
	              valType = typeof val === 'undefined' ? 'undefined' : _typeof(val);
	
	              if (valType == 'string') {
	                val = '"' + val + '"';
	              } else if (valType == "object" && val !== null) {
	                val = JSON.stringify(val);
	              }
	
	              _obj.push((arr ? '' : '"' + key + '":') + String(val));
	            }
	          }
	
	          return (arr ? '[' : '{') + String(_obj) + (arr ? ']' : '}');
	        }
	      }
	    }
	
	    /**
	     *
	     * @param json
	     * @returns {string}
	     */
	
	  }, {
	    key: 'JSONToQueryString',
	    value: function JSONToQueryString(json) {
	      return Object.keys(json).map(function (key) {
	        return encodeURIComponent(key) + '=' + encodeURIComponent(json[key]);
	      }).join('&');
	    }
	
	    /**
	     *
	     * @param str
	     * @returns {string}
	     */
	
	  }, {
	    key: 'base64encode',
	    value: function base64encode(str) {
	      var t = '',
	          p = -6,
	          a = 0,
	          i = 0,
	          v = 0,
	          c;
	
	      while (i < str.length || p > -6) {
	        if (p < 0) {
	          if (i < str.length) {
	            c = str.charCodeAt(i++);
	            v += 8;
	          } else {
	            c = 0;
	          }
	          a = (a & 255) << 8 | c & 255;
	          p += 8;
	        }
	        t += base64list.charAt(v > 0 ? a >> p & 63 : 64);
	        p -= 6;
	        v -= 6;
	      }
	      return t;
	    }
	
	    /**
	     *
	     * @param str
	     * @returns {string}
	     */
	
	  }, {
	    key: 'base64decode',
	    value: function base64decode(str) {
	      var t = '',
	          p = -8,
	          a = 0,
	          c,
	          d;
	
	      for (var i = 0; i < str.length; i++) {
	        if ((c = base64list.indexOf(str.charAt(i))) < 0) continue;
	        a = a << 6 | c & 63;
	        if ((p += 6) >= 0) {
	          d = a >> p & 255;
	          if (c != 64) t += String.fromCharCode(d);
	          a &= 63;
	          p -= 8;
	        }
	      }
	      return t;
	    }
	
	    /**
	     *
	     * @param func
	     * @param context
	     * @returns {*}
	     */
	
	  }, {
	    key: 'proxy',
	    value: function proxy(func, context) {
	      var args, tmp;
	
	      if (typeof context === 'string') {
	        tmp = func[context];
	        context = func;
	        func = tmp;
	      }
	
	      if (typeof func !== 'function') {
	        return null;
	      }
	
	      args = [].slice.call(arguments, 2);
	
	      return function () {
	        func.apply(context || this, args.concat([].slice.call(arguments)));
	      };
	    }
	
	    /**
	     *
	     * @param func
	     * @param context
	     */
	
	  }, {
	    key: 'bind',
	    value: function bind(func, context) {
	      this.proxy(func, context);
	    }
	
	    /**
	     *
	     * @param obj
	     * @returns {*}
	     */
	
	  }, {
	    key: 'extend',
	    value: function extend(obj) {
	      if (obj !== Object(obj)) {
	        return obj;
	      }
	      var source, prop;
	      for (var i = 1, length = arguments.length; i < length; i++) {
	        source = arguments[i];
	        for (prop in source) {
	          if (Object.prototype.hasOwnProperty.call(source, prop)) {
	            obj[prop] = source[prop];
	          }
	        }
	      }
	      return obj;
	    }
	
	    /**
	     *
	     * @param obj
	     * @returns {*}
	     */
	
	  }, {
	    key: 'clone',
	    value: function clone(obj) {
	      if (obj !== Object(obj)) {
	        return obj;
	      }
	
	      return Array.isArray(obj) ? obj.slice() : Module.extend({}, obj);
	    }
	
	    /**
	     *
	     * @param func
	     * @param wait
	     * @returns {number}
	     */
	
	  }, {
	    key: 'delay',
	    value: function delay(func, wait) {
	      var args = [].slice.call(arguments, 2);
	      return setTimeout(function () {
	        return func.apply(null, args);
	      }, wait || 100);
	    }
	
	    /**
	     *
	     * @param func
	     * @param hasher
	     * @returns {memoize}
	     */
	
	  }, {
	    key: 'memoize',
	    value: function memoize(func, hasher) {
	      var memoize = function memoize(key) {
	        var cache = memoize.cache;
	        var address = hasher ? hasher.apply(this, arguments) : key;
	        if (cache != null && Object.prototype.hasOwnProperty.call(cache, address)) {
	          cache[address] = func.apply(this, arguments);
	        }
	        return cache[address];
	      };
	      memoize.cache = {};
	      return memoize;
	    }
	
	    /**
	     * 要素をシャッフルする
	     * @param obj
	     * @returns {Array}
	     */
	
	  }, {
	    key: 'shuffle',
	    value: function shuffle(obj) {
	      var _set = obj && obj.length === +obj.length ? obj : Object.values(obj);
	      var length = _set.length;
	      var shuffled = new Array(length);
	      for (var index = 0, rand; index < length; index++) {
	        rand = this.random(0, index);
	        if (rand !== index) {
	          shuffled[index] = shuffled[rand];
	        }
	        shuffled[rand] = _set[index];
	      }
	      return shuffled;
	    }
	  }, {
	    key: 'getUID',
	
	
	    /**
	     *  ランダム UID を取得
	     * @returns {string}
	     */
	    value: function getUID() {
	      var d = new Date().getTime();
	      return 'xxxxxxxx-xxxx-xxxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
	        var r;
	        r = (d + Math.random() * 16) % 16 | 0;
	        d = Math.floor(d / 16);
	        return (c === 'x' ? r : r & 0x7 | 0x8).toString(16);
	      }).toUpperCase();
	    }
	
	    /**
	     * 数値を2桁にして返す
	     * @param num
	     * @param [base]
	     * @returns {string}
	     */
	
	  }, {
	    key: 'zeroPadding',
	    value: function zeroPadding(num, base) {
	
	      var BASE_NUM = 10;
	
	      base = base || BASE_NUM;
	
	      var maxIndex = (base + '').length;
	      var counter = maxIndex - 1;
	      var result = '';
	
	      while (counter > 0) {
	        result += '0';
	        counter -= 1;
	      }
	
	      return (result + num).slice(-maxIndex);
	    }
	  }, {
	    key: 'camelize',
	
	
	    /**
	     * 渡された文字列をキャメルケースへ変換（型チェック無）
	     * @param str
	     * @returns {XML|string|void}
	     */
	    value: function camelize(str) {
	      return str.replace(/(?:^|[-_])(\w)/g, function (_, c) {
	        return c ? c.toUpperCase() : '';
	      });
	    }
	
	    /**
	     *
	     * @param obj
	     * @returns {Array}
	     */
	
	  }, {
	    key: 'makeArray',
	    value: function makeArray(obj) {
	      var ary = [];
	
	      if (Array.isArray(obj)) {
	        ary = obj;
	      } else if (obj && typeof obj.length === 'number') {
	        // convert nodeList to array
	        for (var i = 0, len = obj.length; i < len; i++) {
	          ary.push(obj[i]);
	        }
	      } else {
	        // array of single index
	        ary.push(obj);
	      }
	      return ary;
	    }
	  }, {
	    key: 'removeFrom',
	
	
	    /**
	     *
	     * @param obj
	     * @param ary
	     */
	    value: function removeFrom(obj, ary) {
	      var index = [].indexOf(ary, obj);
	      if (index !== -1) {
	        ary.splice(index, 1);
	      }
	    }
	  }, {
	    key: 'toDashed',
	
	
	    /**
	     *
	     * @param str
	     * @returns {string}
	     */
	    value: function toDashed(str) {
	      return str.replace(/(.)([A-Z])/g, function (match, $1, $2) {
	        return $1 + '-' + $2;
	      }).toLowerCase();
	    }
	
	    /**
	     *
	     * @param str
	     * @param val
	     * @returns {*}
	     */
	
	  }, {
	    key: 'indexOfAll',
	    value: function indexOfAll(str, val) {
	
	      var retVal = null;
	      var lastIndex = str.indexOf(val);
	
	      if (lastIndex > -1) {
	        retVal = [];
	
	        while (lastIndex > -1) {
	          retVal.push(lastIndex);
	          lastIndex = str.indexOf(val, lastIndex + 1);
	        }
	      }
	
	      return retVal;
	    }
	  }, {
	    key: 'trim',
	    value: function trim(str) {
	      return str.replace(/^\s+|\s+$/g, '');
	    }
	
	    /**
	     *
	     * @param str
	     * @returns {*}
	     */
	
	  }, {
	    key: 'escapeHTML',
	    value: function escapeHTML(str) {
	      return str.replace('&', '&amp;').replace('<', '&lt;');
	    }
	
	    /**
	     *
	     * @param str
	     * @returns {boolean}
	     */
	
	  }, {
	    key: 'isBlank',
	    value: function isBlank(str) {
	      return (/^\s*$/.test(str)
	      );
	    }
	  }, {
	    key: 'makeNumberArray',
	
	
	    /**
	     * aまでのnumberのみの配列を作成して返す
	     * @param a {number}
	     * @returns {Array}
	     */
	    value: function makeNumberArray(a) {
	      var _array = [];
	      for (var _i = 0; _i < a; _i++) {
	        _array[_i] = _i;
	      }
	      return _array;
	    }
	  }]);
	
	  return Module;
	}();
	
	exports.default = Module;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * fileOverview:
	 * Project:
	 * File:
	 * Date:
	 * Author:
	 */
	
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _Module = __webpack_require__(26);
	
	var _Module2 = _interopRequireDefault(_Module);
	
	var _GetTypeOf = __webpack_require__(28);
	
	var _GetTypeOf2 = _interopRequireDefault(_GetTypeOf);
	
	var _DOMUtil = __webpack_require__(25);
	
	var _DOMUtil2 = _interopRequireDefault(_DOMUtil);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var trimLeft = /^\s+/;
	var trimRight = /\s+$/;
	
	var idRegExp = /^#(\S+)$/;
	
	var tagClassRegExp = /^([\w-]+)?(?:\.([\w-]+))?$/;
	
	/**
	 *
	 * @param str
	 * @returns {*}
	 */
	var trim = function trim(str) {
	  return str.replace(trimLeft, '').replace(trimRight, '');
	};
	
	/**
	 *
	 * @param obj
	 * @param prop
	 * @returns {boolean}
	 */
	var isHostMethod = function isHostMethod(obj, prop) {
	  return typeof obj[prop] === 'function' || _typeof(obj[prop]) === 'object' && obj[prop] !== null; // Internet Explorer
	};
	
	/**
	 *
	 * @param node
	 * @param func
	 * @returns {Array}
	 */
	var filterDOM = function filterDOM(node, func) {
	  var results = [];
	
	  function walk(node) {
	    if (func(node)) {
	      results.push(node);
	    }
	    node = node.firstChild;
	    while (node) {
	      walk(node);
	      node = node.nextSibling;
	    }
	  }
	
	  walk(node);
	  return results;
	};
	
	/**
	 *
	 * @param node
	 * @param func
	 * @returns {*}
	 */
	var firstInDOM = function firstInDOM(node, func) {
	  function walk(node) {
	    if (func(node)) {
	      return node;
	    }
	    node = node.firstChild;
	    while (node) {
	      var result = walk(node);
	      if (result) {
	        return result;
	      }
	      node = node.nextSibling;
	    }
	  }
	
	  return walk(node);
	};
	
	/**
	 *
	 * @param id
	 * @param root
	 * @returns {*}
	 */
	var findById = function findById(id, root) {
	  return root.id === id ? root : isHostMethod(root, 'getElementById') ? root.getElementById(id) : isHostMethod(root, 'querySelector') ? root.querySelector('#' + id) : firstInDOM(root, function (node) {
	    return node.id === id;
	  });
	};
	
	var Selector = function () {
	  function Selector() {
	    _classCallCheck(this, Selector);
	  }
	
	  _createClass(Selector, null, [{
	    key: "$",
	    value: function $(selector) {
	
	      if (document.getElementById) {
	        return document.getElementById(selector);
	      }
	
	      if (document.all) {
	        return document.all(selector);
	      }
	      if (document.layers) {
	        var s = '';
	        for (var i = 1; i < arguments.length; i++) {
	          s += 'document.layers.' + arguments[i] + '.';
	        }
	        return eval(s + 'document.layers.' + selector);
	      }
	      return null;
	    }
	
	    /**
	     * 指定の id のエレメントを取得
	     * @param id
	     * @returns {Array|*|Element}
	     */
	
	  }, {
	    key: "getElement",
	    value: function getElement(id) {
	      return document.all && document.all(id) || document.getElementById && document.getElementById(id);
	    }
	
	    /**
	     *
	     * @param className
	     * @param parent
	     * @param tagName
	     * @returns {*}
	     */
	
	  }, {
	    key: "getElementsByClassName",
	    value: function getElementsByClassName(className, parent, tagName) {
	      var classElements = null;
	      var _parent = parent || document;
	      var target = null;
	
	      tagName = tagName || '';
	
	      if (_parent.getElementsByClassName) {
	        classElements = _parent.getElementsByClassName(className);
	      } else if (_parent.querySelectorAll) {
	        classElements = _parent.querySelectorAll(tagName + ('.' + className));
	      } else {
	        classElements = [];
	        target = _parent.getElementsByTagName(tagName.length > 0 ? tagName : '*') || document.all;
	
	        for (var i = 0, len = target.length; i < len; i += 1) {
	          if (_DOMUtil2.default.hasClass(target[i], className)) {
	            classElements.push(target[i]);
	          }
	        }
	      }
	
	      return classElements;
	    }
	
	    /**
	     *
	     * @param tagName
	     * @param className
	     * @returns {Function}
	     */
	
	  }, {
	    key: "getTagNameClassNameMatcher",
	    value: function getTagNameClassNameMatcher(tagName, className) {
	      var regExp = void 0;
	      tagName = tagName ? tagName.toUpperCase() : '*';
	      if (className) {
	        regExp = new RegExp('(?:^|\\s+)' + className + '(?:\\s+|$)');
	      }
	      return function (element) {
	        return (tagName === '*' || element.tagName && element.tagName.toUpperCase() === tagName) && (!className || regExp.test(element.className));
	      };
	    }
	
	    /**
	     *
	     * @param selector
	     * @param root
	     * @returns {*}
	     */
	
	  }, {
	    key: "findAll",
	    value: function findAll(selector, root) {
	      selector = trim(selector);
	      root = root || document;
	      var matches;
	      if (matches = selector.match(idRegExp)) {
	        var el = findById(matches[1], root);
	        return el ? [el] : [];
	      } else if (matches = selector.match(tagClassRegExp)) {
	        var tagNameClassNameMatcher = Selector.getTagNameClassNameMatcher(matches[1], matches[2]);
	        if (isHostMethod(root, 'querySelectorAll')) {
	          var elements;
	          var results = [];
	          if (tagNameClassNameMatcher(root)) {
	            results.push(root);
	          }
	          elements = root.querySelectorAll(selector);
	          for (var i = 0, ilen = elements.length; i < ilen; i++) {
	            results.push(elements[i]);
	          }
	          return results;
	        } else {
	          return filterDOM(root, tagNameClassNameMatcher);
	        }
	      } else {
	        throw new Error('DOMUtil.findAll: Unsupported selector "' + selector + '".');
	      }
	    }
	
	    /**
	     *
	     * @param selector
	     * @param root
	     * @returns {*|document}
	     */
	
	  }, {
	    key: "find",
	    value: function find(selector, root) {
	      selector = trim(selector);
	      root = root || document;
	      var matches;
	      if (matches = selector.match(idRegExp)) {
	        return findById(matches[1], root);
	      } else if (matches = selector.match(tagClassRegExp)) {
	        var tagNameClassNameMatcher = Selector.getTagNameClassNameMatcher(matches[1], matches[2]);
	        if (isHostMethod(root, 'querySelector')) {
	          return tagNameClassNameMatcher(root) ? root : root.querySelector(selector);
	        } else {
	          return firstInDOM(root, tagNameClassNameMatcher);
	        }
	      } else {
	        throw new Error('grail.find: Unsupported selector "' + selector + '".');
	      }
	    }
	
	    /**
	     *
	     * @param elems
	     * @param selector
	     * @returns {*}
	     */
	
	  }, {
	    key: "filterFindElements",
	    value: function filterFindElements(elems, selector) {
	      elems = _Module2.default.makeArray(elems);
	
	      var filteredElems = [];
	
	      for (var i = 0, len = elems.length; i < len; i++) {
	        var elem = elems[i];
	
	        if (!_GetTypeOf2.default.isElement(elem)) {
	          continue;
	        }
	
	        if (selector) {
	          if (Selector.matchesSelector(elem, selector)) {
	            filteredElems.push(elem);
	          }
	
	          var childElems = elem.querySelectorAll(selector);
	
	          for (var j = 0, jLen = childElems.length; j < jLen; j++) {
	            filteredElems.push(childElems[j]);
	          }
	        } else {
	          filteredElems.push(elem);
	        }
	      }
	
	      return filteredElems;
	    }
	
	    /**
	     *
	     * @param element
	     * @returns {*|null|Node}
	     */
	
	  }, {
	    key: "getFirstChild",
	    value: function getFirstChild(element) {
	      return element.firstChild;
	    }
	
	    /**
	     *
	     * @param element
	     * @returns {Node}
	     */
	
	  }, {
	    key: "getFirstGrandChild",
	    value: function getFirstGrandChild(element) {
	      return element.firstChild.firstChild;
	    }
	
	    /**
	     *
	     * @param element
	     * @returns {Node}
	     */
	
	  }, {
	    key: "getSecondGrandChild",
	    value: function getSecondGrandChild(element) {
	      return element.firstChild.firstChild.nextSibling;
	    }
	
	    /**
	     *
	     * @param element
	     * @returns {Node}
	     */
	
	  }, {
	    key: "getFirstGreatGrandChild",
	    value: function getFirstGreatGrandChild(element) {
	      return element.firstChild.firstChild.firstChild;
	    }
	
	    /**
	     *
	     * @param element
	     * @returns {Node}
	     */
	
	  }, {
	    key: "getFirstGreatGreatGrandChild",
	    value: function getFirstGreatGreatGrandChild(element) {
	      return element.firstChild.firstChild.firstChild.firstChild;
	    }
	
	    /**
	     *
	     * @param target
	     * @param tag
	     * @returns {Function|Node}
	     */
	
	  }, {
	    key: "getParentNode",
	    value: function getParentNode(target, tag) {
	
	      var parent = void 0;
	      var _target = target.parentNode;
	
	      tag = tag.toUpperCase();
	
	      if (target.tagName === tag) {
	        return target;
	      } else if (!!_target && _target.tagName === tag) {
	        return _target;
	      } else {
	        while (_target) {
	          if (_target.tagName === tag) {
	            parent = _target;
	            _target = null;
	            return parent;
	          }
	          _target = _target.parentNode;
	        }
	      }
	    }
	
	    /**
	     *
	     * @param target
	     * @param className
	     * @returns {*}
	     */
	
	  }, {
	    key: "getParentClassNameNode",
	    value: function getParentClassNameNode(target, className) {
	      var parent = void 0;
	
	      if (_DOMUtil2.default.hasClass(target, className)) {
	        return target;
	      } else {
	        while (target) {
	          if (_DOMUtil2.default.hasClass(target, className)) {
	            parent = target;
	            target = null;
	            return parent;
	          }
	          target = target.parentNode;
	        }
	      }
	    }
	
	    /**
	     *
	     * @param target
	     * @param id
	     * @returns {*}
	     */
	
	  }, {
	    key: "getParentIdNameNode",
	    value: function getParentIdNameNode(target, id) {
	
	      var parent = void 0;
	
	      if (target.id === id) {
	        return target;
	      } else {
	        while (target) {
	          if (target.id === id) {
	            parent = target;
	            target = null;
	            return parent;
	          }
	          target = target.parentNode;
	        }
	      }
	    }
	
	    /**
	     * マッチセレクター
	     */
	
	  }, {
	    key: "matchesSelector",
	    value: function matchesSelector() {
	
	      if (!('Element' in window)) {
	        return;
	      }
	
	      var elPrototype = window.Element.prototype;
	
	      var matchesMethod = function () {
	        if (elPrototype.matchesSelector) {
	          return 'matchesSelector';
	        }
	        var prefixes = ['webkit', 'moz', 'ms', 'o'];
	
	        for (var i = 0, len = prefixes.length; i < len; i++) {
	          var prefix = prefixes[i];
	          var method = prefix + 'MatchesSelector';
	          if (elPrototype[method]) {
	            return method;
	          }
	        }
	      }();
	
	      var match = function match(elem, selector) {
	        return elem[matchesMethod](selector);
	      };
	
	      var checkParent = function checkParent(elem) {
	        if (elem.parentNode) {
	          return;
	        }
	        var fragment = document.createDocumentFragment();
	        fragment.appendChild(elem);
	      };
	
	      var query = function query(elem, selector) {
	        checkParent(elem);
	
	        var elems = elem.parentNode.querySelectorAll(selector);
	        for (var i = 0, len = elems.length; i < len; i++) {
	          if (elems[i] === elem) {
	            return true;
	          }
	        }
	        return false;
	      };
	
	      var matchChild = function matchChild(elem, selector) {
	        checkParent(elem);
	        return match(elem, selector);
	      };
	
	      var matchesSelector = void 0;
	
	      if (matchesMethod) {
	        var div = document.createElement('div');
	        var supportsOrphans = match(div, 'div');
	        matchesSelector = supportsOrphans ? match : matchChild;
	      } else {
	        matchesSelector = query;
	      }
	
	      return matchesSelector;
	    }
	  }]);
	
	  return Selector;
	}();
	
	exports.default = Selector;

/***/ },
/* 28 */
/***/ function(module, exports) {

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
	 * @param obj
	 */
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var toString = function toString(obj) {
	  return {}.toString.call(obj);
	};
	
	var GetTypeOf = function () {
	  function GetTypeOf() {
	    _classCallCheck(this, GetTypeOf);
	  }
	
	  _createClass(GetTypeOf, null, [{
	    key: 'isUndefined',
	
	    /**
	     *
	     * @param val
	     * @returns {boolean}
	     */
	    value: function isUndefined(val) {
	      return typeof val === 'undefined';
	    }
	
	    /**
	     *
	     */
	
	  }, {
	    key: 'isNull',
	    value: function isNull(val) {
	      return val === null;
	    }
	
	    /**
	     *
	     * @param val
	     */
	
	  }, {
	    key: 'isSet',
	    value: function isSet(val) {
	      return !this.isUndefined(val) && !this.isNull(val);
	    }
	
	    /**
	     *
	     */
	
	  }, {
	    key: 'isDOMElement',
	    value: function isDOMElement(node) {
	      return node.nodeType === 1 || node !== null && node === node.window;
	    }
	
	    /**
	     *
	     * @type {Function}
	     */
	
	  }, {
	    key: 'isElement',
	    value: function isElement(el) {
	      if (typeof HTMLElement == 'function' || (typeof HTMLElement === 'undefined' ? 'undefined' : _typeof(HTMLElement)) == 'object') {
	        return el instanceof HTMLElement;
	      } else {
	        return el && (typeof el === 'undefined' ? 'undefined' : _typeof(el)) == 'object' && el.nodeType == 1 && typeof el.nodeName == 'string';
	      }
	    }
	
	    /**
	     *
	     * @param func
	     * @returns {boolean}
	     */
	
	  }, {
	    key: 'isFunction',
	    value: function isFunction(func) {
	      return typeof func === 'function';
	    }
	
	    /**
	     *
	     * @param obj
	     * @returns {boolean}
	     */
	
	  }, {
	    key: 'isPlainObject',
	    value: function isPlainObject(obj) {
	      var result = false;
	
	      if (this.isSet(obj) && this.isObject(obj)) {
	        result = !Array.isArray(obj) && !this.isFunction(obj) && !this.isDOMElement(obj);
	      }
	      return result;
	    }
	
	    /**
	     * isObject
	     *
	     * @static
	     * @params {Object} obj
	     * @return {Boolean}
	     */
	
	  }, {
	    key: 'isObject',
	    value: function isObject(obj) {
	      return obj === Object(obj);
	    }
	
	    /**
	     * isNumber
	     *
	     * @static
	     * @params {Number} num
	     * @return {Boolean}
	     */
	
	  }, {
	    key: 'isNumber',
	    value: function isNumber(num) {
	      return (typeof num === 'undefined' ? 'undefined' : _typeof(num)) === _typeof(1) && null !== num && isFinite(num);
	    }
	
	    /**
	     * isString
	     *
	     * @static
	     * @params {String} str
	     * @return {Boolean}
	     */
	
	  }, {
	    key: 'isString',
	    value: function isString(str) {
	      return typeof str === 'string' || str instanceof String;
	    }
	
	    /**
	     *
	     * @param obj
	     * @returns {boolean}
	     */
	
	  }, {
	    key: 'isBoolean',
	    value: function isBoolean(obj) {
	      return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
	    }
	
	    /**
	     *
	     * @param arg
	     * @returns {boolean}
	     */
	
	  }, {
	    key: 'isPrimitive',
	    value: function isPrimitive(arg) {
	      return arg === null || typeof arg === 'boolean' || typeof arg === 'number' || typeof arg === 'string' || (typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) === 'symbol' || typeof arg === 'undefined';
	    }
	
	    /**
	     *
	     * @param obj
	     * @returns {boolean}
	     */
	
	  }, {
	    key: 'isEmptyObject',
	    value: function isEmptyObject(obj) {
	      for (var prop in obj) {
	        if (obj.hasOwnProperty(prop)) {
	          return false;
	        }
	      }
	      prop = null;
	      return true;
	    }
	  }]);
	
	  return GetTypeOf;
	}();
	
	exports.default = GetTypeOf;

/***/ },
/* 29 */
/***/ function(module, exports) {

	/**
	 * fileOverview:
	 * Project:
	 * File:
	 * Date:
	 * Author:
	 */
	
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var navigator = window.navigator;
	var platform = navigator.platform;
	var userAgent = navigator.userAgent;
	var appVersion = navigator.appVersion;
	var userAgentLower = userAgent.toLowerCase();
	var appVersionLower = appVersion.toLowerCase();
	
	var canvas2D = document.createElement('_canvas');
	var _canvasExperimental = document.createElement('_canvas');
	
	// テスト要素
	var _div = document.createElement('div');
	var _divStyle = _div.style;
	
	/**
	 *
	 * @param style
	 * @returns {boolean}
	 */
	var styleTest = function styleTest(style) {
	  return style in _divStyle;
	};
	
	/**
	 *
	 * @param key
	 * @returns {string}
	 */
	var getVersion = function getVersion(key) {
	  var ua = (userAgent + ';').replace(/ /g, ';');
	  var _start = ua.indexOf(key) + key.length;
	  var _end = ua.indexOf(';', _start);
	  return ua.substring(_start, _end);
	};
	
	var BrowserUtil = function () {
	  function BrowserUtil() {
	    _classCallCheck(this, BrowserUtil);
	  }
	
	  _createClass(BrowserUtil, null, [{
	    key: 'getMobileVersion',
	    value: function getMobileVersion() {
	      var _version = 0;
	      if (BrowserUtil.isAndroid) {
	        _version = BrowserUtil.androidVersion;
	      } else if (BrowserUtil.isiOS) {
	        _version = BrowserUtil.iOSVersion;
	      }
	      return _version;
	    }
	
	    /**
	     *
	     * @returns {string}
	     */
	
	  }, {
	    key: 'browser',
	
	
	    /**
	     * BROWSER
	     */
	
	
	    // OS
	
	
	    // web view
	
	
	    // ブラウザ
	
	
	    // IE
	    get: function get() {
	      var browser = 'unknown';
	
	      if (userAgentLower.indexOf('msie') !== -1) {
	        if (appVersionLower.indexOf('msie 6.') !== -1) {
	          browser = 'ie6';
	        } else if (appVersionLower.indexOf('msie 7.') !== -1) {
	          browser = 'ie7';
	        } else if (appVersionLower.indexOf('msie 8.') !== -1) {
	          browser = 'ie8';
	        } else if (appVersionLower.indexOf('msie 9.') !== -1) {
	          browser = 'ie9';
	        } else if (appVersionLower.indexOf('msie 10.') !== -1) {
	          browser = 'ie10';
	        } else if (userAgentLower.indexOf('.NET CLR') > -1) {} else {
	          browser = 'ie';
	        }
	      } else if (userAgentLower.indexOf('trident/7') !== -1) {
	        browser = 'ie11';
	      } else if (userAgentLower.indexOf('chrome') !== -1 || userAgentLower.indexOf('crios') > -1) {
	        browser = 'chrome';
	      } else if (userAgentLower.indexOf('safari') !== -1) {
	        browser = 'safari';
	      } else if (userAgentLower.indexOf('opera') !== -1) {
	        browser = 'opera';
	      } else if (userAgentLower.indexOf('firefox') !== -1) {
	        browser = 'firefox';
	      } else {
	        browser = 'unknown';
	      }
	
	      return browser;
	    }
	
	    // MODERN
	
	
	    // OS
	
	
	    // 機能
	
	  }, {
	    key: 'venderPrefix',
	    get: function get() {
	      var prefix = 'unknown';
	
	      if (/mozilla/.test(userAgentLower) && !BrowserUtil.isWebkit) {
	        prefix = 'mozilla';
	      } else if (BrowserUtil.isWebkit) {
	        prefix = 'webkit';
	      } else if (/opera/.test(userAgentLower)) {
	        prefix = 'opera';
	      } else if (/msie/.test(userAgentLower)) {
	        prefix = 'msie';
	      }
	
	      return prefix;
	    }
	  }, {
	    key: 'ieVersion',
	
	
	    /**
	     * IE Version
	     */
	    get: function get() {
	      var rv = -1;
	      var ua = userAgentLower;
	      var msIE = ua.indexOf('MSIE ');
	      var trident = ua.indexOf('Trident/');
	
	      if (msIE > 0) {
	        rv = parseInt(ua.substring(msIE + 5, ua.indexOf('.', msIE)), 10);
	      } else if (trident > 0) {
	        var rvNum = ua.indexOf('rv:');
	        rv = parseInt(ua.substring(rvNum + 3, ua.indexOf('.', rvNum)), 10);
	      }
	
	      return rv > -1 ? rv : undefined;
	    }
	  }, {
	    key: 'os',
	    get: function get() {
	
	      var _os = 'unknown';
	
	      if (BrowserUtil.isAndroid) {
	        _os = 'android';
	      } else if (BrowserUtil.isiOS) {
	        _os = 'ios';
	      } else if (userAgent.match(/Win(dows )?NT 6\.3/)) {
	        _os = 'windows_8_1';
	      } else if (userAgent.match(/Win(dows )?NT 6\.2/)) {
	        _os = 'windows_8';
	      } else if (userAgent.match(/Win(dows )?NT 6\.1/)) {
	        _os = 'windows_7';
	      } else if (userAgent.match(/Win(dows )?NT 6\.0/)) {
	        _os = 'windows_vista';
	      } else if (userAgent.match(/Win(dows )?NT 5\.2/)) {
	        _os = 'windows_server_2003';
	      } else if (userAgent.match(/Win(dows )?(NT 5\.1|XP)/)) {
	        _os = 'windows_xp';
	      } else if (userAgent.match(/Win(dows)? (9x 4\.90|ME)/)) {
	        _os = 'windows_me';
	      } else if (userAgent.match(/Win(dows )?(NT 5\.0|2000)/)) {
	        _os = 'windows_2000';
	      } else if (userAgent.match(/Win(dows )?98/)) {
	        _os = 'windows_98';
	      } else if (userAgent.match(/Win(dows )?NT( 4\.0)?/)) {
	        _os = 'windows_nt';
	      } else if (userAgent.match(/Win(dows )?95/)) {
	        _os = 'windows_95';
	      } else if (userAgent.match(/Mac|PPC/)) {
	        _os = 'mac_oc';
	      } else if (userAgent.match(/Linux/)) {
	        _os = 'linux';
	      } else if (userAgent.match(/^.*\s([A-Za-z]+BSD)/)) {
	        _os = 'bsd';
	      } else if (userAgent.match(/SunOS/)) {
	        _os = 'solaris';
	      }
	
	      return _os;
	    }
	  }, {
	    key: 'iOSVersion',
	    get: function get() {
	      var v = void 0,
	          versions = 0;
	
	      if (BrowserUtil.isiOS) {
	        v = appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
	        if (v) {
	          versions = [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
	          return versions[0];
	        } else {
	          return 0;
	        }
	      }
	      return versions;
	    }
	  }, {
	    key: 'androidVersion',
	    get: function get() {
	      if (userAgent.indexOf('Android') > 0) {
	        return parseFloat(userAgent.slice(userAgent.indexOf('Android') + 8));
	      }
	      return 0;
	    }
	  }, {
	    key: 'browserVersion',
	    get: function get() {
	
	      var _version = 0;
	
	      var browser = BrowserUtil.browser();
	
	      switch (BrowserUtil.deviceType) {
	        case 'pc':
	          if (browser === 'opera') {
	            _version = getVersion('Opera/');
	          } else if (browser === 'firefox') {
	            _version = getVersion('Firefox/');
	          } else if (browser === 'chrome') {
	            _version = getVersion('Chrome/');
	          } else if (browser === 'safari') {
	            _version = getVersion('Version/');
	          } else if (browser.indexOf('ie') > 0) {
	            _version = BrowserUtil.ieVersion;
	          }
	          break;
	        case 'phone':
	          _version = BrowserUtil.getMobileVersion();
	          break;
	        case 'tablet':
	          _version = BrowserUtil.getMobileVersion();
	          break;
	        default:
	          break;
	      }
	
	      return _version + '';
	    }
	  }, {
	    key: 'scrollBarWidth',
	
	
	    /**
	     * スクロールバーの太さ
	     * @returns {number}
	     */
	    get: function get() {
	      var inner = document.createElement('p');
	      inner.style.width = '100%';
	      inner.style.height = '200px';
	
	      var outer = document.createElement('div');
	      outer.style.position = 'absolute';
	      outer.style.top = 0;
	      outer.style.left = 0;
	      outer.style.visibility = 'hidden';
	      outer.style.width = '200px';
	      outer.style.height = '150px';
	      outer.style.overflow = 'hidden';
	      outer.appendChild(inner);
	
	      document.body.appendChild(outer);
	      var w1 = inner.offsetWidth;
	      outer.style.overflow = 'scroll';
	      var w2 = inner.offsetWidth;
	
	      if (w1 === w2) {
	        w2 = outer.clientWidth;
	      }
	
	      document.body.removeChild(outer);
	
	      return w1 - w2;
	    }
	  }]);
	
	  return BrowserUtil;
	}();
	
	BrowserUtil.navigator = navigator;
	BrowserUtil.platform = platform;
	BrowserUtil.userAgent = userAgent;
	BrowserUtil.appVersion = appVersion;
	BrowserUtil.userAgentLower = userAgentLower;
	BrowserUtil.appVersionLower = appVersionLower;
	BrowserUtil.hasUniqueID = document.uniqueID;
	BrowserUtil.hasAddEventListener = typeof window.addEventListener === 'undefined';
	BrowserUtil.hasOrientation = typeof window.orientation !== 'undefined';
	BrowserUtil.hasMouse = !('ontouchstart' in window);
	BrowserUtil.hasMobile = !!/mobile/.test(userAgentLower);
	BrowserUtil.ltIE6 = BrowserUtil.hasAddEventListener && typeof document.documentElement.style.maxHeight === 'undefined';
	BrowserUtil.ltIE7 = BrowserUtil.hasAddEventListener && typeof document.querySelectorAll === 'undefined';
	BrowserUtil.ltIE8 = BrowserUtil.hasAddEventListener && typeof document.getElementsByClassName === 'undefined';
	BrowserUtil.ltIE9 = BrowserUtil.hasUniqueID && !window.matchMedia;
	BrowserUtil.isIE10 = BrowserUtil.hasUniqueID && document.documentMode === 10;
	BrowserUtil.isIE11 = BrowserUtil.hasUniqueID && BrowserUtil.userAgent.indexOf('trident') > -1;
	BrowserUtil.isIE = !!document.uniqueID;
	BrowserUtil.isFirefox = !!window.sidebar;
	BrowserUtil.isOpera = !!window.opera;
	BrowserUtil.isWebkit = !document.uniqueID && !BrowserUtil.isFirefox && !BrowserUtil.isOpera && !!window.hasOwnProperty('localStorage');
	BrowserUtil.isChrome = BrowserUtil.isWebkit && (userAgentLower.indexOf('chrome') > -1 || userAgentLower.indexOf('crios') > -1);
	BrowserUtil.isiPhone = /iphone/.test(userAgentLower);
	BrowserUtil.isiPod = /ipod/.test(userAgentLower);
	BrowserUtil.isiPad = /ipad/.test(userAgentLower);
	BrowserUtil.isiOS = BrowserUtil.isiPhone || BrowserUtil.isiPod || BrowserUtil.isiPad;
	BrowserUtil.isAndroid = /android/.test(userAgentLower);
	BrowserUtil.isAndroidStdBrowser = /linux; u/.test(userAgentLower);
	BrowserUtil.isAndroidTablet = !!BrowserUtil.isAndroid ? !!BrowserUtil.hasMobile : false;
	BrowserUtil.isAndroidPhone = !!BrowserUtil.isAndroid ? !BrowserUtil.hasMobile : false;
	BrowserUtil.isTabletDevice = userAgentLower.indexOf('windows') != -1 && userAgentLower.indexOf('touch') != -1 || userAgentLower.indexOf('ipad') != -1 || userAgentLower.indexOf('android') != -1 && userAgentLower.indexOf('mobile') == -1 || userAgentLower.indexOf('firefox') != -1 && userAgentLower.indexOf('tablet') != -1 || userAgentLower.indexOf('kindle') != -1 || userAgentLower.indexOf('silk') != -1 || userAgentLower.indexOf('playbook') != -1;
	BrowserUtil.isMobileDevice = userAgentLower.indexOf('windows') !== -1 && userAgentLower.indexOf('phone') !== -1 || userAgentLower.indexOf('iphone') !== -1 || userAgentLower.indexOf('ipod') !== -1 || userAgentLower.indexOf('android') !== -1 && userAgentLower.indexOf('mobile') !== -1 || userAgentLower.indexOf('firefox') !== -1 && userAgentLower.indexOf('mobile') !== -1 || userAgentLower.indexOf('blackberry') !== -1;
	BrowserUtil.isTablet = BrowserUtil.isAndroidTablet || BrowserUtil.isiPad;
	BrowserUtil.isPhone = BrowserUtil.isAndroidPhone || BrowserUtil.isiPhone || BrowserUtil.isiPod;
	BrowserUtil.isMobile = BrowserUtil.hasOrientation || BrowserUtil.isTablet || BrowserUtil.isPhone;
	BrowserUtil.isMobileUA = BrowserUtil.isAndroid || BrowserUtil.isiOS;
	BrowserUtil.enableTouch = !BrowserUtil.hasMouse || window.DocumentTouch && document instanceof DocumentTouch;
	BrowserUtil.vendorPrefix = /webkit/i.test(BrowserUtil.appVersionLower) ? 'webkit' : /firefox/i.test(userAgentLower) ? 'Moz' : 'opera' in window ? 'O' : '';
	BrowserUtil.hasMSpointer = !!navigator.msPointerEnabled;
	BrowserUtil.hasCanvas = !!canvas2D && 'getContext' in canvas2D && !!canvas2D.getContext('2d');
	BrowserUtil.hasWebGL = !!'WebGLRenderingContext' in window && !!_canvasExperimental.getContext('experimental-webgl');
	BrowserUtil.hasCookie = !!navigator.cookieEnabled;
	BrowserUtil.hasGeoLocation = !!navigator.geolocation;
	BrowserUtil.hasJSONParser = !!('JSON' in window && 'stringify' in JSON && 'parse' in JSON);
	BrowserUtil.hasLocalStorage = !!('localStorage' in window);
	BrowserUtil.hasMatchMedia = 'matchMedia' in window;
	BrowserUtil.hasClassList = 'classList' in _div;
	BrowserUtil.hasTouch = !!('ontouchstart' in window);
	BrowserUtil.hasAudio = !!('HTMLAudioElement' in window);
	BrowserUtil.hasHistoryAPI = !!('history' in window) && window.history.pushState && window.history.state !== undefined;
	BrowserUtil.hasWorkder = !!('Worker' in window);
	BrowserUtil.deviceType = BrowserUtil.isPhone ? 'phone' : BrowserUtil.isTablet ? 'tablet' : 'pc';
	BrowserUtil.supportFilter = '-webkit-filter' in _divStyle;
	BrowserUtil.browserLanguage = navigator.language;
	BrowserUtil.pixelRatio = 'devicePixelRatio' in window ? window.devicePixelRatio : 1;
	BrowserUtil.isTwitter = /twitter/ig.test(userAgentLower);
	BrowserUtil.isFacebook = /fbav/ig.test(userAgentLower);
	BrowserUtil.isLine = /line/ig.test(userAgentLower);
	BrowserUtil.isWebView = BrowserUtil.isTwitter || BrowserUtil.isFacebook || BrowserUtil.isLine || !/safari|crios|opera/.test(userAgentLower);
	BrowserUtil.isWindows = /Win(dows )/gi.test(BrowserUtil.userAgent);
	BrowserUtil.isMac = /Mac|PPC/gi.test(BrowserUtil.userAgent);
	exports.default = BrowserUtil;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * fileOverview:
	 * Project:
	 * File: CanvasView
	 * Date: 8/30/16
	 * Author: komatsu
	 */
	
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _events = __webpack_require__(31);
	
	var _events2 = _interopRequireDefault(_events);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	/** カーソルのプレフィックス判定 */
	var CURSOR_GRAB = 'grab';
	var CURSOR_GRABBING = 'grabbing';
	
	var THEME_COLOR = '#333';
	
	var CanvasView = function (_EventEmitter) {
	  _inherits(CanvasView, _EventEmitter);
	
	  function CanvasView(canvas) {
	    _classCallCheck(this, CanvasView);
	
	    var _this = _possibleConstructorReturn(this, (CanvasView.__proto__ || Object.getPrototypeOf(CanvasView)).call(this));
	
	    _this._canvas = canvas;
	    _this.context = _this._canvas.getContext('2d');
	    _this._model = null;
	    _this._controller = null;
	
	    _this.updateHandler = _this._updateHandler.bind(_this);
	
	    return _this;
	  }
	
	  _createClass(CanvasView, [{
	    key: 'setMC',
	    value: function setMC(model, controller) {
	      this._model = model;
	      this._controller = controller;
	      this._controller.setMV(this._model, this);
	      this._model.on('update', this.updateHandler);
	    }
	
	    /** TODO: 後でCSS効いてない原因確認 */
	
	  }, {
	    key: 'changeGrab',
	    value: function changeGrab() {
	      var flag = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];
	
	      this._canvas.style.cursor = !flag ? CURSOR_GRAB : CURSOR_GRABBING;
	    }
	
	    /** ステージを空っぽに */
	
	  }, {
	    key: 'clearStage',
	    value: function clearStage(size) {
	      this.context.clearRect(0, 0, size.width, size.height);
	    }
	
	    /** 縦横中心線 */
	
	  }, {
	    key: 'drawCross',
	    value: function drawCross(size) {
	      this.context.lineWidth = 1;
	      this.context.strokeStyle = THEME_COLOR;
	      this.context.beginPath();
	      this.context.moveTo(size.centerX, 0);
	      this.context.lineTo(size.centerX, size.height);
	      this.context.moveTo(0, size.centerY);
	      this.context.lineTo(size.width, size.centerY);
	      this.context.closePath();
	      this.context.stroke();
	    }
	
	    /** 中心の点（いらないかも？） */
	
	  }, {
	    key: 'drawCenterDot',
	    value: function drawCenterDot(size) {
	      this.context.strokeStyle = THEME_COLOR;
	      this.context.fillStyle = THEME_COLOR;
	      this.context.beginPath();
	      this.context.arc(size.centerX, size.centerY, 2, 0, 2 * Math.PI, true);
	      this.context.fill();
	    }
	
	    /** 中心からターゲットを結ぶ斜線 */
	
	  }, {
	    key: 'drawTargetFollowLine',
	    value: function drawTargetFollowLine(size) {
	      this.context.lineWidth = 1;
	      this.context.strokeStyle = THEME_COLOR;
	      this.context.beginPath();
	      this.context.moveTo(size.centerX, size.centerY);
	      this.context.lineTo(size.x, size.y);
	      this.context.closePath();
	      this.context.stroke();
	    }
	
	    /** ドラッグターゲット */
	
	  }, {
	    key: 'drawTarget',
	    value: function drawTarget(size) {
	      this.context.beginPath();
	      this.context.arc(size.x, size.y, size.size, 0, 2 * Math.PI, true);
	      this.context.stroke();
	      this.context.fill();
	    }
	
	    /** ターゲットから縦中心線を結ぶ縦線 */
	
	  }, {
	    key: 'drawVLine',
	    value: function drawVLine(size) {
	      this.context.lineWidth = 1;
	      this.context.strokeStyle = THEME_COLOR;
	      this.context.beginPath();
	      this.context.moveTo(size.x, size.centerY);
	      this.context.lineTo(size.x, size.y);
	      this.context.closePath();
	      this.context.stroke();
	    }
	
	    /** ターゲットと中心点を結ぶ斜線が半径の円 */
	
	  }, {
	    key: 'drawTargetAroundCircle',
	    value: function drawTargetAroundCircle(size) {
	      this.context.lineWidth = 1;
	      this.context.strokeStyle = THEME_COLOR;
	      this.context.fillStyle = THEME_COLOR;
	      this.context.beginPath();
	      this.context.arc(size.centerX, size.centerY, size.hypotenuse, 0, 2 * Math.PI, true);
	      this.context.stroke();
	    }
	
	    /** 中心線とターゲットポイントの直角を結ぶ */
	
	  }, {
	    key: 'drawDegree',
	    value: function drawDegree(size) {
	      this.context.lineWidth = 1;
	      this.context.strokeStyle = THEME_COLOR;
	      this.context.beginPath();
	      this.context.moveTo(size.x + 10, size.centerY);
	      this.context.lineTo(size.x + 10, size.centerY - 10);
	      this.context.closePath();
	      this.context.stroke();
	      this.context.beginPath();
	      this.context.moveTo(size.x, size.centerY - 10);
	      this.context.lineTo(size.x + 10, size.centerY - 10);
	      this.context.closePath();
	      this.context.stroke();
	    }
	
	    /** 角度を表示した円 */
	
	  }, {
	    key: 'drawRotate',
	    value: function drawRotate(size) {
	      this.context.lineWidth = 1;
	      this.context.strokeStyle = THEME_COLOR;
	      this.context.beginPath();
	      this.context.moveTo(size.centerX, size.centerY);
	      this.context.arc(size.centerX, size.centerY, 50, size.degree, 90 / 180 * Math.PI);
	      this.context.fill();
	    }
	  }, {
	    key: 'draw',
	    value: function draw() {
	      var size = this._model.getData();
	      this.clearStage(size);
	      this.drawCross(size);
	      this.drawCenterDot(size);
	      this.drawTargetFollowLine(size);
	      this.drawVLine(size);
	      this.drawDegree(size);
	      this.drawRotate(size);
	      this.drawTargetAroundCircle(size);
	      this.drawTarget(size);
	    }
	  }, {
	    key: '_updateHandler',
	    value: function _updateHandler(event) {
	      this.draw();
	    }
	  }]);
	
	  return CanvasView;
	}(_events2.default);
	
	exports.default = CanvasView;

/***/ },
/* 31 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	function EventEmitter() {
	  this._events = this._events || {};
	  this._maxListeners = this._maxListeners || undefined;
	}
	module.exports = EventEmitter;
	
	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;
	
	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;
	
	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;
	
	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function(n) {
	  if (!isNumber(n) || n < 0 || isNaN(n))
	    throw TypeError('n must be a positive number');
	  this._maxListeners = n;
	  return this;
	};
	
	EventEmitter.prototype.emit = function(type) {
	  var er, handler, len, args, i, listeners;
	
	  if (!this._events)
	    this._events = {};
	
	  // If there is no 'error' event listener then throw.
	  if (type === 'error') {
	    if (!this._events.error ||
	        (isObject(this._events.error) && !this._events.error.length)) {
	      er = arguments[1];
	      if (er instanceof Error) {
	        throw er; // Unhandled 'error' event
	      } else {
	        // At least give some kind of context to the user
	        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
	        err.context = er;
	        throw err;
	      }
	    }
	  }
	
	  handler = this._events[type];
	
	  if (isUndefined(handler))
	    return false;
	
	  if (isFunction(handler)) {
	    switch (arguments.length) {
	      // fast cases
	      case 1:
	        handler.call(this);
	        break;
	      case 2:
	        handler.call(this, arguments[1]);
	        break;
	      case 3:
	        handler.call(this, arguments[1], arguments[2]);
	        break;
	      // slower
	      default:
	        args = Array.prototype.slice.call(arguments, 1);
	        handler.apply(this, args);
	    }
	  } else if (isObject(handler)) {
	    args = Array.prototype.slice.call(arguments, 1);
	    listeners = handler.slice();
	    len = listeners.length;
	    for (i = 0; i < len; i++)
	      listeners[i].apply(this, args);
	  }
	
	  return true;
	};
	
	EventEmitter.prototype.addListener = function(type, listener) {
	  var m;
	
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');
	
	  if (!this._events)
	    this._events = {};
	
	  // To avoid recursion in the case that type === "newListener"! Before
	  // adding it to the listeners, first emit "newListener".
	  if (this._events.newListener)
	    this.emit('newListener', type,
	              isFunction(listener.listener) ?
	              listener.listener : listener);
	
	  if (!this._events[type])
	    // Optimize the case of one listener. Don't need the extra array object.
	    this._events[type] = listener;
	  else if (isObject(this._events[type]))
	    // If we've already got an array, just append.
	    this._events[type].push(listener);
	  else
	    // Adding the second element, need to change to array.
	    this._events[type] = [this._events[type], listener];
	
	  // Check for listener leak
	  if (isObject(this._events[type]) && !this._events[type].warned) {
	    if (!isUndefined(this._maxListeners)) {
	      m = this._maxListeners;
	    } else {
	      m = EventEmitter.defaultMaxListeners;
	    }
	
	    if (m && m > 0 && this._events[type].length > m) {
	      this._events[type].warned = true;
	      console.error('(node) warning: possible EventEmitter memory ' +
	                    'leak detected. %d listeners added. ' +
	                    'Use emitter.setMaxListeners() to increase limit.',
	                    this._events[type].length);
	      if (typeof console.trace === 'function') {
	        // not supported in IE 10
	        console.trace();
	      }
	    }
	  }
	
	  return this;
	};
	
	EventEmitter.prototype.on = EventEmitter.prototype.addListener;
	
	EventEmitter.prototype.once = function(type, listener) {
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');
	
	  var fired = false;
	
	  function g() {
	    this.removeListener(type, g);
	
	    if (!fired) {
	      fired = true;
	      listener.apply(this, arguments);
	    }
	  }
	
	  g.listener = listener;
	  this.on(type, g);
	
	  return this;
	};
	
	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener = function(type, listener) {
	  var list, position, length, i;
	
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');
	
	  if (!this._events || !this._events[type])
	    return this;
	
	  list = this._events[type];
	  length = list.length;
	  position = -1;
	
	  if (list === listener ||
	      (isFunction(list.listener) && list.listener === listener)) {
	    delete this._events[type];
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	
	  } else if (isObject(list)) {
	    for (i = length; i-- > 0;) {
	      if (list[i] === listener ||
	          (list[i].listener && list[i].listener === listener)) {
	        position = i;
	        break;
	      }
	    }
	
	    if (position < 0)
	      return this;
	
	    if (list.length === 1) {
	      list.length = 0;
	      delete this._events[type];
	    } else {
	      list.splice(position, 1);
	    }
	
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	  }
	
	  return this;
	};
	
	EventEmitter.prototype.removeAllListeners = function(type) {
	  var key, listeners;
	
	  if (!this._events)
	    return this;
	
	  // not listening for removeListener, no need to emit
	  if (!this._events.removeListener) {
	    if (arguments.length === 0)
	      this._events = {};
	    else if (this._events[type])
	      delete this._events[type];
	    return this;
	  }
	
	  // emit removeListener for all listeners on all events
	  if (arguments.length === 0) {
	    for (key in this._events) {
	      if (key === 'removeListener') continue;
	      this.removeAllListeners(key);
	    }
	    this.removeAllListeners('removeListener');
	    this._events = {};
	    return this;
	  }
	
	  listeners = this._events[type];
	
	  if (isFunction(listeners)) {
	    this.removeListener(type, listeners);
	  } else if (listeners) {
	    // LIFO order
	    while (listeners.length)
	      this.removeListener(type, listeners[listeners.length - 1]);
	  }
	  delete this._events[type];
	
	  return this;
	};
	
	EventEmitter.prototype.listeners = function(type) {
	  var ret;
	  if (!this._events || !this._events[type])
	    ret = [];
	  else if (isFunction(this._events[type]))
	    ret = [this._events[type]];
	  else
	    ret = this._events[type].slice();
	  return ret;
	};
	
	EventEmitter.prototype.listenerCount = function(type) {
	  if (this._events) {
	    var evlistener = this._events[type];
	
	    if (isFunction(evlistener))
	      return 1;
	    else if (evlistener)
	      return evlistener.length;
	  }
	  return 0;
	};
	
	EventEmitter.listenerCount = function(emitter, type) {
	  return emitter.listenerCount(type);
	};
	
	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	
	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	
	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	
	function isUndefined(arg) {
	  return arg === void 0;
	}


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * fileOverview:
	 * Project:
	 * File: CanvasModel
	 * Date: 8/30/16
	 * Author: komatsu
	 */
	
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _events = __webpack_require__(31);
	
	var _events2 = _interopRequireDefault(_events);
	
	var _WindowUtil = __webpack_require__(5);
	
	var _WindowUtil2 = _interopRequireDefault(_WindowUtil);
	
	var _MathTrig = __webpack_require__(33);
	
	var _MathTrig2 = _interopRequireDefault(_MathTrig);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var DEFAULT_X = 100;
	
	var DEFAULT_Y = 100;
	
	var CIRCLE_SIZE = 15;
	
	var CanvasModel = function (_EventEmitter) {
	  _inherits(CanvasModel, _EventEmitter);
	
	  function CanvasModel() {
	    _classCallCheck(this, CanvasModel);
	
	    var _this = _possibleConstructorReturn(this, (CanvasModel.__proto__ || Object.getPrototypeOf(CanvasModel)).call(this));
	
	    _this.circleSize = CIRCLE_SIZE;
	    _this.halfSize = _this.circleSize * .5;
	
	    _this.width = 0;
	    _this.height = 0;
	    _this.centerX = 0;
	    _this.centerY = 0;
	
	    _this.x = DEFAULT_X;
	    _this.y = DEFAULT_Y;
	    _this._x = _this.x;
	    _this._y = _this.y;
	
	    _this.degree = 0;
	    _this.radian = 0;
	    _this.hypotenuse = 0;
	
	    _this.update();
	
	    return _this;
	  }
	
	  _createClass(CanvasModel, [{
	    key: "update",
	    value: function update() {
	      var size = _WindowUtil2.default.getScreenSize();
	      this.updateSize(size);
	      this.updateData();
	      this.emit('update', this.getData());
	    }
	  }, {
	    key: "updateSize",
	    value: function updateSize(size) {
	      this.width = size.width;
	      this.height = size.height;
	      this.centerX = this.width * .5;
	      this.centerY = this.height * .5;
	      this._x = this.x + this.centerX;
	      this._y = this.y * -1 + this.centerY;
	    }
	  }, {
	    key: "updateData",
	    value: function updateData() {
	      this.radian = Math.atan2(this.y, this.x);
	      this.degree = this.radian * 180 / Math.PI;
	      this.hypotenuse = _MathTrig2.default.getHypotenuseFromBaHe(this.x, this.y);
	    }
	  }, {
	    key: "getData",
	    value: function getData() {
	      return _extends({}, {
	        width: this.width,
	        height: this.height,
	        centerX: this.centerX,
	        centerY: this.centerY,
	        size: this.circleSize,
	        half: this.halfSize,
	        radian: this.radian,
	        degree: this.degree,
	        hypotenuse: this.hypotenuse,
	        x: this._x,
	        y: this._y
	      });
	    }
	  }, {
	    key: "move",
	    value: function move(pos) {
	      this._x = pos.x;
	      this._y = pos.y;
	      this.x = this.centerX - pos.x;
	      this.y = this.centerY - pos.y;
	      this.updateData();
	      this.emit('update', this.getData());
	    }
	  }, {
	    key: "includeTarget",
	    value: function includeTarget(pos) {
	      return pos.x >= this._x - this.halfSize && pos.y >= this._y - this.halfSize && pos.x <= this._x + this.halfSize && pos.y <= this._y + this.halfSize;
	    }
	  }]);
	
	  return CanvasModel;
	}(_events2.default);
	
	exports.default = CanvasModel;

/***/ },
/* 33 */
/***/ function(module, exports) {

	/**
	 * fileOverview:
	 * Project:
	 * File: MathTrig
	 * Date: 8/30/16
	 * Author: komatsu
	 */
	
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var MathTrig = function () {
	  function MathTrig() {
	    _classCallCheck(this, MathTrig);
	  }
	
	  _createClass(MathTrig, null, [{
	    key: 'getRadian',
	
	
	    /*********************************************************
	     * 角度を求める
	     *********************************************************/
	    // 度数からラジアンを取得
	    value: function getRadian(angle) {
	      return angle * Math.PI / 180;
	    }
	  }, {
	    key: 'getDegree',
	
	
	    // ラジアンから度数を取得
	    value: function getDegree(radian) {
	      return radian * 180 / Math.PI;
	    }
	  }, {
	    key: 'getAngleFromBaHe',
	
	
	    // 底辺と高さから
	    value: function getAngleFromBaHe(base, height) {
	      return Math.atan2(height, base);
	    }
	  }, {
	    key: 'getAngleFromBaHy',
	
	
	    // 底辺と斜辺から
	    value: function getAngleFromBaHy(base, hypotenuse) {
	      return Math.acos(base / hypotenuse);
	    }
	  }, {
	    key: 'getAngleFromHeHy',
	
	
	    // 高さと斜辺から
	    value: function getAngleFromHeHy(height, hypotenuse) {
	      return Math.asin(height / hypotenuse);
	    }
	  }, {
	    key: 'getHypotenuseFromBaAn',
	
	
	    /*********************************************************
	     * 斜辺を求める
	     *********************************************************/
	    // 底辺と角度から
	    value: function getHypotenuseFromBaAn(base, angle) {
	      return base / Math.sin(angle);
	    }
	  }, {
	    key: 'getHypotenuseFromHeAn',
	
	
	    // 高さと角度から
	    value: function getHypotenuseFromHeAn(height, angle) {
	      return height / Math.sin(angle);
	    }
	  }, {
	    key: 'getHypotenuseFromBaHe',
	
	
	    // 底辺と高さから
	    value: function getHypotenuseFromBaHe(base, height) {
	      return Math.sqrt(Math.pow(base, 2) + Math.pow(height, 2));
	    }
	  }, {
	    key: 'getHeightFromBaAn',
	
	
	    /*********************************************************
	     * 高さを求める
	     *********************************************************/
	    // 底辺と角度から
	    value: function getHeightFromBaAn(base, angle) {
	      return base * Math.tan(angle);
	    }
	  }, {
	    key: 'getHeightFromHyAn',
	
	
	    // 斜辺と角度から
	    value: function getHeightFromHyAn(hypotenuse, angle) {
	      return hypotenuse * Math.sin(angle);
	    }
	  }, {
	    key: 'getHeightFromBaHy',
	
	
	    // 底辺と斜辺から
	    value: function getHeightFromBaHy(base, hypotenuse) {
	      return Math.sqrt(Math.pow(hypotenuse, 2) - Math.pow(base, 2));
	    }
	  }, {
	    key: 'getBaseFromHeAn',
	
	
	    /*********************************************************
	     * 底辺を求める
	     *********************************************************/
	    // 高さと角度から
	    value: function getBaseFromHeAn(height, angle) {
	      return height / Math.tan(angle);
	    }
	  }, {
	    key: 'getBaseFromHyAn',
	
	
	    // 斜辺と角度から
	    value: function getBaseFromHyAn(hypotenuse, angle) {
	      return hypotenuse * Math.cos(angle);
	    }
	  }, {
	    key: 'getBaseFromHeHy',
	
	
	    // 高さと斜辺から
	    value: function getBaseFromHeHy(height, hypotenuse) {
	      return Math.sqrt(Math.pow(hypotenuse, 2) - Math.pow(height, 2));
	    }
	  }]);
	
	  return MathTrig;
	}();
	
	exports.default = MathTrig;

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * fileOverview:
	 * Project:
	 * File: CanvasController
	 * Date: 8/30/16
	 * Author: komatsu
	 */
	
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _DOMUtil = __webpack_require__(25);
	
	var _DOMUtil2 = _interopRequireDefault(_DOMUtil);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var CanvasController = function () {
	  function CanvasController() {
	    _classCallCheck(this, CanvasController);
	
	    this._model = null;
	    this._view = null;
	
	    this.positionX = 0;
	    this.positionY = 0;
	
	    this.eventHandler = this._eventHandler.bind(this);
	  }
	
	  _createClass(CanvasController, [{
	    key: 'setMV',
	    value: function setMV(model, view) {
	      this._model = model;
	      this._view = view;
	
	      this.addEvent();
	    }
	  }, {
	    key: '_eventHandler',
	    value: function _eventHandler(event) {
	      event.preventDefault();
	
	      switch (event.type) {
	        case 'mousedown':
	          this.downHandler(event);
	          break;
	
	        case 'mousemove':
	          this.moveHandler(event);
	          break;
	
	        case 'mouseup':
	          this.upHandler(event);
	          break;
	      }
	    }
	  }, {
	    key: 'downHandler',
	    value: function downHandler(event) {
	
	      var position = _DOMUtil2.default.getEventPoint(event);
	      var included = this._model.includeTarget(position);
	
	      if (included) {
	        this._view.changeGrab(true);
	
	        window.addEventListener('mousemove', this.eventHandler);
	        window.addEventListener('mouseup', this.eventHandler);
	      }
	    }
	  }, {
	    key: 'moveHandler',
	    value: function moveHandler(event) {
	      var position = _DOMUtil2.default.getEventPoint(event);
	      this._model.move(position);
	    }
	  }, {
	    key: 'upHandler',
	    value: function upHandler(event) {
	      this._view.changeGrab(false);
	      window.removeEventListener('mousemove', this.eventHandler);
	      window.removeEventListener('mouseup', this.eventHandler);
	      this.startX = 0;
	      this.startY = 0;
	    }
	  }, {
	    key: 'addEvent',
	    value: function addEvent() {
	      this._view._canvas.addEventListener('mousedown', this.eventHandler, false);
	    }
	  }, {
	    key: 'removeEvent',
	    value: function removeEvent() {
	      this._view._canvas.addEventListener('mousedown', this.eventHandler, true);
	    }
	  }]);
	
	  return CanvasController;
	}();
	
	exports.default = CanvasController;

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgN2ExNTc2NzhiZDJkMGVlNTc1NGYiLCJ3ZWJwYWNrOi8vLy4vcGMvanMvYXBwLmpzIiwid2VicGFjazovLy8uL34vZGF0LWd1aS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+L2RhdC1ndWkvdmVuZG9yL2RhdC5ndWkuanMiLCJ3ZWJwYWNrOi8vLy4vfi9kYXQtZ3VpL3ZlbmRvci9kYXQuY29sb3IuanMiLCJ3ZWJwYWNrOi8vLy4vY29tbW9uL2pzL2FwcC9kYXRhL0dsb2JhbERhdGEuanMiLCJ3ZWJwYWNrOi8vLy4vY29tbW9uL2pzL2FwcC9icm93c2VyL1dpbmRvd1V0aWwuanMiLCJ3ZWJwYWNrOi8vLy4vY29tbW9uL2pzL2FwcC9ldmVudHMvUHViU3ViLmpzIiwid2VicGFjazovLy8uL34vZXM2LXN5bWJvbC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+L2VzNi1zeW1ib2wvaXMtaW1wbGVtZW50ZWQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9lczYtc3ltYm9sL3BvbHlmaWxsLmpzIiwid2VicGFjazovLy8uL34vZC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+L2VzNS1leHQvb2JqZWN0L2Fzc2lnbi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+L2VzNS1leHQvb2JqZWN0L2Fzc2lnbi9pcy1pbXBsZW1lbnRlZC5qcyIsIndlYnBhY2s6Ly8vLi9+L2VzNS1leHQvb2JqZWN0L2Fzc2lnbi9zaGltLmpzIiwid2VicGFjazovLy8uL34vZXM1LWV4dC9vYmplY3Qva2V5cy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+L2VzNS1leHQvb2JqZWN0L2tleXMvaXMtaW1wbGVtZW50ZWQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9lczUtZXh0L29iamVjdC9rZXlzL3NoaW0uanMiLCJ3ZWJwYWNrOi8vLy4vfi9lczUtZXh0L29iamVjdC92YWxpZC12YWx1ZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2VzNS1leHQvb2JqZWN0L25vcm1hbGl6ZS1vcHRpb25zLmpzIiwid2VicGFjazovLy8uL34vZXM1LWV4dC9vYmplY3QvaXMtY2FsbGFibGUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9lczUtZXh0L3N0cmluZy8jL2NvbnRhaW5zL2luZGV4LmpzIiwid2VicGFjazovLy8uL34vZXM1LWV4dC9zdHJpbmcvIy9jb250YWlucy9pcy1pbXBsZW1lbnRlZC5qcyIsIndlYnBhY2s6Ly8vLi9+L2VzNS1leHQvc3RyaW5nLyMvY29udGFpbnMvc2hpbS5qcyIsIndlYnBhY2s6Ly8vLi9+L2VzNi1zeW1ib2wvdmFsaWRhdGUtc3ltYm9sLmpzIiwid2VicGFjazovLy8uL34vZXM2LXN5bWJvbC9pcy1zeW1ib2wuanMiLCJ3ZWJwYWNrOi8vLy4vY29tbW9uL2pzL2FwcC9icm93c2VyL0RPTVV0aWwuanMiLCJ3ZWJwYWNrOi8vLy4vY29tbW9uL2pzL2FwcC91dGlscy9Nb2R1bGUuanMiLCJ3ZWJwYWNrOi8vLy4vY29tbW9uL2pzL2FwcC9icm93c2VyL1NlbGVjdG9yLmpzIiwid2VicGFjazovLy8uL2NvbW1vbi9qcy9hcHAvdXRpbHMvR2V0VHlwZU9mLmpzIiwid2VicGFjazovLy8uL2NvbW1vbi9qcy9hcHAvYnJvd3Nlci9Ccm93c2VyVXRpbC5qcyIsIndlYnBhY2s6Ly8vLi9wYy9qcy92aWV3cy9DYW52YXNWaWV3LmpzIiwid2VicGFjazovLy8uL34vZXZlbnRzL2V2ZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9wYy9qcy9tb2RlbGxzL0NhbnZhc01vZGVsLmpzIiwid2VicGFjazovLy8uL3BjL2pzL3V0aWxzL01hdGhUcmlnLmpzIiwid2VicGFjazovLy8uL3BjL2pzL2NvbnRyb2xsZXJzL0NhbnZhc0NvbnRyb2xsZXIuanMiXSwibmFtZXMiOlsiUmVhZHkiLCJpbml0IiwiY2FudmFzIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiYm9keSIsImFwcGVuZENoaWxkIiwibW9kZWwiLCJ2aWV3IiwiY29udHJvbGxlciIsInNldE1DIiwiZ3VpIiwiR1VJIiwiYWRkIiwibGlzdGVuIiwicmVzaXplIiwic2l6ZSIsImdldFNjcmVlblNpemUiLCJib2R5U3R5bGUiLCJ3aWR0aCIsImhlaWdodCIsInVwZGF0ZVNpemUiLCJ0aW1lcklEIiwicmVzaXplSGFuZGxlciIsImNsZWFyVGltZW91dCIsInNldFRpbWVvdXQiLCJpbnN0YW5jZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJkcmF3IiwiV0lORE9XIiwiZ2xvYmFsIiwid2luZG93IiwiRE9DVU1FTlQiLCJsb2NhdGlvbiIsImhhc2giLCJiYXNlVVJMIiwiaHJlZiIsInF1ZXJ5T2JqZWN0IiwicXVlcmllcyIsInNlYXJjaCIsImxlbmd0aCIsInF1ZXJ5Iiwic3Vic3RyaW5nIiwicGFyYW1zIiwic3BsaXQiLCJpIiwibGVuIiwiZWxlbWVudCIsImRlY29kZVVSSUNvbXBvbmVudCIsIkdsb2JhbERhdGEiLCJodG1sIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJodG1sU3R5bGUiLCJzdHlsZSIsInEiLCJoYXNPd25Qcm9wZXJ0eSIsInJlZmVycmVyIiwiaW5kZXhPZiIsImRvbWFpbiIsImRvY21lbnQiLCJwcm90b2NvbCIsImhhc2hWYWwiLCJwb3J0IiwidXJsIiwicGxhbmVVUkwiLCJvcmlnaW4iLCJwYXRobmFtZSIsImlzTG9jYWwiLCJpc1NTTCIsIlN5bWJvbCIsInNpbmdsZXRvbiIsInNpbmdsZXRvbkVuZm9yY2VyIiwiTE9BRCIsIlJFU0laRSIsIlVOTE9BRCIsIk1PVVNFX1dIRUVMIiwiUkVRVUVTVF9BTklNQVRJT05fRlJBTUUiLCJsaXN0ZW5HbG9iYWxFdmVudCIsInR5cGUiLCJsaXN0ZW5lciIsImF0dGFjaEV2ZW50IiwiZXhpc3RlbmNlTGlzdGVuZXIiLCJldmVudCIsIm9uTG9hZEhhbmRsZXIiLCJkaXNwYXRjaEV2ZW50Iiwib3JpZ2luYWxFdmVudCIsIm9uUmVzaXplSGFuZGxlciIsIm9uVW5Mb2FkSGFuZGxlciIsIm9uTW91c2VXaGVlbEhhbmRsZXIiLCJkZWx0YSIsImRldGFpbCIsIndoZWVsRGVsdGEiLCJhbmltYXRpb25JRCIsImFuaW1hdGlvbkZ1bmN0aW9ucyIsImFuaW1hdGlvbkZyYW1lIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiV2luZG93VXRpbCIsImNhbGxiYWNrIiwiaWQiLCJfdyIsIl9oIiwiZG9jdW1lbnRFbGVtZW50IiwiY2xpZW50V2lkdGgiLCJjbGllbnRIZWlnaHQiLCJpbm5lckhlaWdodCIsInNjcm9sbE1heFkiLCJpbm5lcldpZHRoIiwic2Nyb2xsTWF4WCIsInNjcm9sbEhlaWdodCIsIm9mZnNldEhlaWdodCIsInNjcm9sbFdpZHRoIiwib2Zmc2V0V2lkdGgiLCJfeCIsIl95Iiwic2Nyb2xsTGVmdCIsInBhZ2VYT2Zmc2V0Iiwic2Nyb2xsVG9wIiwicGFnZVlPZmZzZXQiLCJ0b3AiLCJsZWZ0IiwiZW5mb3JjZXIiLCJnbG9iYWxFdmVudHMiLCJnbG9iYWxMaXN0ZW5lcnMiLCJpTGVuIiwicHVzaCIsInNwbGljZSIsImNhbmNlbEFuaW1hdGlvbkZyYW1lIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsIl9saXN0ZW5lciIsIm9mZiIsImFwcGx5Iiwib24iLCJsYXN0VGltZSIsInZlbmRvcnMiLCJ4IiwiY3VyclRpbWUiLCJEYXRlIiwiZ2V0VGltZSIsInRpbWVUb0NhbGwiLCJNYXRoIiwibWF4Iiwic3RhcnRPZmZzZXQiLCJub3ciLCJwZXJmb3JtYW5jZSIsIl9lbnRyaWVzIiwiX21hcmtzSW5kZXgiLCJfZmlsdGVyRW50cmllcyIsImtleSIsInZhbHVlIiwibiIsInJlc3VsdCIsIl9jbGVhckVudHJpZXMiLCJuYW1lIiwiZW50cnkiLCJlbnRyeVR5cGUiLCJ3ZWJraXROb3ciLCJtb3pOb3ciLCJtc05vdyIsIm1hcmsiLCJ3ZWJraXRNYXJrIiwic3RhcnRUaW1lIiwiZHVyYXRpb24iLCJtZWFzdXJlIiwid2Via2l0TWVhc3VyZSIsInN0YXJ0TWFyayIsImVuZE1hcmsiLCJnZXRFbnRyaWVzQnlUeXBlIiwid2Via2l0R2V0RW50cmllc0J5VHlwZSIsImdldEVudHJpZXNCeU5hbWUiLCJ3ZWJraXRHZXRFbnRyaWVzQnlOYW1lIiwiY2xlYXJNYXJrcyIsIndlYmtpdENsZWFyTWFya3MiLCJjbGVhck1lYXN1cmVzIiwid2Via2l0Q2xlYXJNZWFzdXJlcyIsIl9ldmVudHMiLCJQdWJTdWIiLCJ0b3BpYyIsIk9iamVjdCIsInByb3RvdHlwZSIsImNhbGwiLCJmdW5jIiwiaGFzVG9waWMiLCJhcmdzIiwiaiIsImNvbnRleHQiLCJfcGFyZW50RXZlbnRUYXJnZXQiLCJfY29udGV4dCIsInByaW9yaXR5IiwiaGFuZGxlciIsImFyZ3VtZW50cyIsImJpbmQiLCJsaXN0ZW5lclRvSW5zZXJ0IiwibGlzdGVuZXJzIiwiaW5zZXJ0ZWQiLCJldmVudFByaW9yaXR5IiwicmVtb3ZlQWxsRXZlbnRMaXN0ZW5lciIsImhhc0V2ZW50TGlzdGVuZXIiLCJvcHRpb24iLCJ0YXJnZXQiLCJjYWxsYmFja0NvbnRleHQiLCJjdXJyZW50VGFyZ2V0IiwiaGFuZGxlRXZlbnQiLCJ1bmRlZmluZWQiLCJfZGVsZWdhdGVzIiwicGFyYW1Db3VudCIsImNyZWF0ZVBhcmFtcyIsInBhcmVudCIsInRyaW1MZWZ0IiwidHJpbVJpZ2h0IiwidHJpbSIsInN0ciIsInJlcGxhY2UiLCJtYWtlUGFyc2VyIiwiYmVmb3JlIiwiYWZ0ZXIiLCJnZXRGaXJzdFJlc3VsdCIsImRvYyIsInBhcnNlciIsImZyYWdtZW50IiwiY3JlYXRlRG9jdW1lbnRGcmFnbWVudCIsImlubmVySFRNTCIsIm5vZGUiLCJuZXh0Tm9kZSIsIm5leHRTaWJsaW5nIiwiZGVmYXVsdFBhcnNlciIsImdldEZpcnN0Q2hpbGQiLCJwYXJzZXJzIiwidGQiLCJnZXRGaXJzdEdyZWF0R3JlYXRHcmFuZENoaWxkIiwidHIiLCJnZXRGaXJzdEdyZWF0R3JhbmRDaGlsZCIsInRib2R5IiwiZ2V0Rmlyc3RHcmFuZENoaWxkIiwiY29sIiwiZ2V0U2Vjb25kR3JhbmRDaGlsZCIsInRoIiwidGhlYWQiLCJ0Zm9vdCIsImNhcHRpb24iLCJjb2xncm91cCIsInRhZ1JlZ0V4cCIsIl9yZWdIaXN0b3J5IiwiX3JlZ0NsYXNzTmFtZSIsImNsYXNzTmFtZSIsInJlZyIsIlJlZ0V4cCIsIl90cmltIiwiX3JlYWR5IiwiZnVuY3MiLCJpc1JlYWR5IiwicmVhZHlTdGF0ZSIsIlJFQURZX1NUQVRFX0NIQU5HRSIsIk9OX1JFQURZX1NUQVRFX0NIQU5HRSIsIkRPTUNvbnRlbnRMb2FkZWQiLCJjb3VudGVyIiwib25lIiwiZWxtIiwiYnViYmxpbmciLCJkZXRhY2hFdmVudCIsImZ1biIsIkRPTVV0aWwiLCJlbGVtIiwicHJldmVudERlZmF1bHQiLCJyZXR1cm5WYWx1ZSIsInN0b3BQcm9wYWdhdGlvbiIsImNhbmNlbEJ1YmJsZSIsInN0b3BFdmVudCIsImNhbmNlbEV2ZW50IiwiZXZ0IiwiaXNTdHJpbmciLCJpdCIsIlN0cmluZyIsImdldEVsZW1lbnRCeUlkIiwiY3JlYXRlRXZlbnRPYmplY3QiLCJmaXJlRXZlbnQiLCJjcmVhdGVFdmVudCIsImluaXRFdmVudCIsIl9jaGlsZHJlbiIsInNlbGVjdG9yVHlwZSIsIm1ha2VBcnJheSIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJ0b1VwcGVyQ2FzZSIsImRlbGVnYXRlSGFuZGxlciIsIl90YXJnZXQiLCJzcmNFbGVtZW50IiwiZXZlbnRUYXJnZXQiLCJoYXNDbGFzcyIsImdldFBhcmVudENsYXNzTmFtZU5vZGUiLCJnZXRQYXJlbnRJZE5hbWVOb2RlIiwidGFnTmFtZSIsImdldFBhcmVudE5vZGUiLCJpbmRleCIsInN0b3AiLCJkaXNhYmxlRXZlbnQiLCJzYW1lQ291bnQiLCJmb3JFYWNoIiwicHJvcCIsIm1hdGNoZXMiLCJtYXRjaCIsInRvTG93ZXJDYXNlIiwibHRJRTgiLCJjbGllbnRYIiwieSIsImNsaWVudFkiLCJlbmFibGVUb3VjaCIsImNoYW5nZWRUb3VjaGVzIiwicGFnZVgiLCJwYWdlWSIsIl9zdHlsZSIsInJlbW92ZVByb3BlcnR5IiwicmVtb3ZlQXR0cmlidXRlIiwiZGVmYXVsdENsYXNzTmFtZSIsIl9leGNlcHQiLCJuZXdDbGFzc05hbWUiLCJtZXRob2ROYW1lIiwidGVzdCIsIl9kb2NFbGVtIiwidGV4dENvbnRlbnQiLCJpbm5lclRleHQiLCJzdHJpbmciLCJkaXNwbGF5IiwiZmlyc3RDaGlsZCIsInJlbW92ZUNoaWxkIiwiZWxTdHlsZSIsInN0eWxlcyIsInJ1cmxlcyIsIkFycmF5IiwiaXNBcnJheSIsImNyZWF0ZVN0eWxlU2hlZXQiLCJfc2hlZXQiLCJjc3NUZXh0Iiwiam9pbiIsIl9oZWFkIiwib2Zmc2V0TGVmdCIsIm9mZnNldFRvcCIsIm9mZnNldFBhcmVudCIsImVsIiwieFBvcyIsInlQb3MiLCJ4U2Nyb2xsIiwieVNjcm9sbCIsImNsaWVudExlZnQiLCJjbGllbnRUb3AiLCJyZWN0IiwiZ2V0T2Zmc2V0IiwicmlnaHQiLCJib3R0b20iLCJfc3R5bGVEYXRhIiwiZ2V0Q29tcHV0ZWRTdHlsZSIsImN1cnJlbnRTdHlsZSIsInByb3BOYW1lIiwicHJlZml4ZXMiLCJkb2NFbGVtU3R5bGUiLCJjaGFyQXQiLCJzbGljZSIsInByZWZpeGVkIiwiZ2V0U3R5bGVTaXplIiwidmFsIiwibnVtIiwicGFyc2VGbG9hdCIsImlzVmFsaWQiLCJpc05hTiIsIm1lYXN1cmVtZW50cyIsImdldFplcm9TaXplIiwib3V0ZXJXaWR0aCIsIm91dGVySGVpZ2h0IiwibWVhc3VyZW1lbnQiLCJib3hTaXppbmdQcm9wIiwiZ2V0U3R5bGVQcm9wZXJ0eSIsImlzQm94U2l6ZU91dGVyIiwiX2RpdiIsInBhZGRpbmciLCJib3JkZXJTdHlsZSIsImJvcmRlcldpZHRoIiwiZ2V0U3R5bGUiLCJtdW5nZU5vblBpeGVsIiwicnMiLCJydW50aW1lU3R5bGUiLCJyc0xlZnQiLCJwaXhlbExlZnQiLCJxdWVyeVNlbGVjdG9yIiwibm9kZVR5cGUiLCJpc0JvcmRlckJveCIsInBhZGRpbmdXaWR0aCIsInBhZGRpbmdMZWZ0IiwicGFkZGluZ1JpZ2h0IiwicGFkZGluZ0hlaWdodCIsInBhZGRpbmdUb3AiLCJwYWRkaW5nQm90dG9tIiwibWFyZ2luV2lkdGgiLCJtYXJnaW5MZWZ0IiwibWFyZ2luUmlnaHQiLCJtYXJnaW5IZWlnaHQiLCJtYXJnaW5Ub3AiLCJtYXJnaW5Cb3R0b20iLCJib3JkZXJMZWZ0V2lkdGgiLCJib3JkZXJSaWdodFdpZHRoIiwiYm9yZGVySGVpZ2h0IiwiYm9yZGVyVG9wV2lkdGgiLCJib3JkZXJCb3R0b21XaWR0aCIsImlzQm9yZGVyQm94U2l6ZU91dGVyIiwic3R5bGVXaWR0aCIsInN0eWxlSGVpZ2h0IiwiaW1hZ2UiLCJtZW0iLCJ3IiwiaCIsIm5hdHVyYWxXaWR0aCIsIm5hdHVyYWxIZWlnaHQiLCJydW4iLCJyVmFsaWRDaGFycyIsInJWYWxpZEVzY2FwZSIsInJWYWxpZFRva2VucyIsInJWYWxpZEJyYWNlcyIsImJhc2U2NGxpc3QiLCJNb2R1bGUiLCJkYXRhIiwiSlNPTiIsInBhcnNlIiwiRnVuY3Rpb24iLCJqc29uIiwic3RyaW5naWZ5Iiwib2JqIiwidmFsVHlwZSIsImFyciIsImNvbnN0cnVjdG9yIiwia2V5cyIsIm1hcCIsImVuY29kZVVSSUNvbXBvbmVudCIsInQiLCJwIiwiYSIsInYiLCJjIiwiY2hhckNvZGVBdCIsImQiLCJmcm9tQ2hhckNvZGUiLCJ0bXAiLCJjb25jYXQiLCJwcm94eSIsInNvdXJjZSIsImV4dGVuZCIsIndhaXQiLCJoYXNoZXIiLCJtZW1vaXplIiwiY2FjaGUiLCJhZGRyZXNzIiwiX3NldCIsInZhbHVlcyIsInNodWZmbGVkIiwicmFuZCIsInJhbmRvbSIsInIiLCJmbG9vciIsInRvU3RyaW5nIiwiYmFzZSIsIkJBU0VfTlVNIiwibWF4SW5kZXgiLCJfIiwiYXJ5IiwiJDEiLCIkMiIsInJldFZhbCIsImxhc3RJbmRleCIsIl9hcnJheSIsIl9pIiwiaWRSZWdFeHAiLCJ0YWdDbGFzc1JlZ0V4cCIsImlzSG9zdE1ldGhvZCIsImZpbHRlckRPTSIsInJlc3VsdHMiLCJ3YWxrIiwiZmlyc3RJbkRPTSIsImZpbmRCeUlkIiwicm9vdCIsIlNlbGVjdG9yIiwic2VsZWN0b3IiLCJhbGwiLCJsYXllcnMiLCJzIiwiZXZhbCIsImNsYXNzRWxlbWVudHMiLCJfcGFyZW50IiwicXVlcnlTZWxlY3RvckFsbCIsInJlZ0V4cCIsInRhZ05hbWVDbGFzc05hbWVNYXRjaGVyIiwiZ2V0VGFnTmFtZUNsYXNzTmFtZU1hdGNoZXIiLCJlbGVtZW50cyIsImlsZW4iLCJFcnJvciIsImVsZW1zIiwiZmlsdGVyZWRFbGVtcyIsImlzRWxlbWVudCIsIm1hdGNoZXNTZWxlY3RvciIsImNoaWxkRWxlbXMiLCJqTGVuIiwidGFnIiwicGFyZW50Tm9kZSIsImVsUHJvdG90eXBlIiwiRWxlbWVudCIsIm1hdGNoZXNNZXRob2QiLCJwcmVmaXgiLCJtZXRob2QiLCJjaGVja1BhcmVudCIsIm1hdGNoQ2hpbGQiLCJkaXYiLCJzdXBwb3J0c09ycGhhbnMiLCJHZXRUeXBlT2YiLCJpc1VuZGVmaW5lZCIsImlzTnVsbCIsIkhUTUxFbGVtZW50Iiwibm9kZU5hbWUiLCJpc1NldCIsImlzT2JqZWN0IiwiaXNGdW5jdGlvbiIsImlzRE9NRWxlbWVudCIsImlzRmluaXRlIiwiYXJnIiwibmF2aWdhdG9yIiwicGxhdGZvcm0iLCJ1c2VyQWdlbnQiLCJhcHBWZXJzaW9uIiwidXNlckFnZW50TG93ZXIiLCJhcHBWZXJzaW9uTG93ZXIiLCJjYW52YXMyRCIsIl9jYW52YXNFeHBlcmltZW50YWwiLCJfZGl2U3R5bGUiLCJzdHlsZVRlc3QiLCJnZXRWZXJzaW9uIiwidWEiLCJfc3RhcnQiLCJfZW5kIiwiQnJvd3NlclV0aWwiLCJfdmVyc2lvbiIsImlzQW5kcm9pZCIsImFuZHJvaWRWZXJzaW9uIiwiaXNpT1MiLCJpT1NWZXJzaW9uIiwiYnJvd3NlciIsImlzV2Via2l0IiwicnYiLCJtc0lFIiwidHJpZGVudCIsInBhcnNlSW50IiwicnZOdW0iLCJfb3MiLCJ2ZXJzaW9ucyIsImRldmljZVR5cGUiLCJpZVZlcnNpb24iLCJnZXRNb2JpbGVWZXJzaW9uIiwiaW5uZXIiLCJvdXRlciIsInBvc2l0aW9uIiwidmlzaWJpbGl0eSIsIm92ZXJmbG93IiwidzEiLCJ3MiIsImhhc1VuaXF1ZUlEIiwidW5pcXVlSUQiLCJoYXNBZGRFdmVudExpc3RlbmVyIiwiaGFzT3JpZW50YXRpb24iLCJvcmllbnRhdGlvbiIsImhhc01vdXNlIiwiaGFzTW9iaWxlIiwibHRJRTYiLCJtYXhIZWlnaHQiLCJsdElFNyIsImx0SUU5IiwibWF0Y2hNZWRpYSIsImlzSUUxMCIsImRvY3VtZW50TW9kZSIsImlzSUUxMSIsImlzSUUiLCJpc0ZpcmVmb3giLCJzaWRlYmFyIiwiaXNPcGVyYSIsIm9wZXJhIiwiaXNDaHJvbWUiLCJpc2lQaG9uZSIsImlzaVBvZCIsImlzaVBhZCIsImlzQW5kcm9pZFN0ZEJyb3dzZXIiLCJpc0FuZHJvaWRUYWJsZXQiLCJpc0FuZHJvaWRQaG9uZSIsImlzVGFibGV0RGV2aWNlIiwiaXNNb2JpbGVEZXZpY2UiLCJpc1RhYmxldCIsImlzUGhvbmUiLCJpc01vYmlsZSIsImlzTW9iaWxlVUEiLCJEb2N1bWVudFRvdWNoIiwidmVuZG9yUHJlZml4IiwiaGFzTVNwb2ludGVyIiwibXNQb2ludGVyRW5hYmxlZCIsImhhc0NhbnZhcyIsImdldENvbnRleHQiLCJoYXNXZWJHTCIsImhhc0Nvb2tpZSIsImNvb2tpZUVuYWJsZWQiLCJoYXNHZW9Mb2NhdGlvbiIsImdlb2xvY2F0aW9uIiwiaGFzSlNPTlBhcnNlciIsImhhc0xvY2FsU3RvcmFnZSIsImhhc01hdGNoTWVkaWEiLCJoYXNDbGFzc0xpc3QiLCJoYXNUb3VjaCIsImhhc0F1ZGlvIiwiaGFzSGlzdG9yeUFQSSIsImhpc3RvcnkiLCJwdXNoU3RhdGUiLCJzdGF0ZSIsImhhc1dvcmtkZXIiLCJzdXBwb3J0RmlsdGVyIiwiYnJvd3Nlckxhbmd1YWdlIiwibGFuZ3VhZ2UiLCJwaXhlbFJhdGlvIiwiZGV2aWNlUGl4ZWxSYXRpbyIsImlzVHdpdHRlciIsImlzRmFjZWJvb2siLCJpc0xpbmUiLCJpc1dlYlZpZXciLCJpc1dpbmRvd3MiLCJpc01hYyIsIkNVUlNPUl9HUkFCIiwiQ1VSU09SX0dSQUJCSU5HIiwiVEhFTUVfQ09MT1IiLCJDYW52YXNWaWV3IiwiX2NhbnZhcyIsIl9tb2RlbCIsIl9jb250cm9sbGVyIiwidXBkYXRlSGFuZGxlciIsIl91cGRhdGVIYW5kbGVyIiwic2V0TVYiLCJmbGFnIiwiY3Vyc29yIiwiY2xlYXJSZWN0IiwibGluZVdpZHRoIiwic3Ryb2tlU3R5bGUiLCJiZWdpblBhdGgiLCJtb3ZlVG8iLCJjZW50ZXJYIiwibGluZVRvIiwiY2VudGVyWSIsImNsb3NlUGF0aCIsInN0cm9rZSIsImZpbGxTdHlsZSIsImFyYyIsIlBJIiwiZmlsbCIsImh5cG90ZW51c2UiLCJkZWdyZWUiLCJnZXREYXRhIiwiY2xlYXJTdGFnZSIsImRyYXdDcm9zcyIsImRyYXdDZW50ZXJEb3QiLCJkcmF3VGFyZ2V0Rm9sbG93TGluZSIsImRyYXdWTGluZSIsImRyYXdEZWdyZWUiLCJkcmF3Um90YXRlIiwiZHJhd1RhcmdldEFyb3VuZENpcmNsZSIsImRyYXdUYXJnZXQiLCJERUZBVUxUX1giLCJERUZBVUxUX1kiLCJDSVJDTEVfU0laRSIsIkNhbnZhc01vZGVsIiwiY2lyY2xlU2l6ZSIsImhhbGZTaXplIiwicmFkaWFuIiwidXBkYXRlIiwidXBkYXRlRGF0YSIsImVtaXQiLCJhdGFuMiIsImdldEh5cG90ZW51c2VGcm9tQmFIZSIsImhhbGYiLCJwb3MiLCJNYXRoVHJpZyIsImFuZ2xlIiwiYWNvcyIsImFzaW4iLCJzaW4iLCJzcXJ0IiwicG93IiwidGFuIiwiY29zIiwiQ2FudmFzQ29udHJvbGxlciIsIl92aWV3IiwicG9zaXRpb25YIiwicG9zaXRpb25ZIiwiZXZlbnRIYW5kbGVyIiwiX2V2ZW50SGFuZGxlciIsImFkZEV2ZW50IiwiZG93bkhhbmRsZXIiLCJtb3ZlSGFuZGxlciIsInVwSGFuZGxlciIsImdldEV2ZW50UG9pbnQiLCJpbmNsdWRlZCIsImluY2x1ZGVUYXJnZXQiLCJjaGFuZ2VHcmFiIiwibW92ZSIsInN0YXJ0WCIsInN0YXJ0WSJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtB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QUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTOztBQUVUOztBQUVBO0FBQ0E7QUFDQSw0QztBQUNBLFlBQVc7QUFDWDtBQUNBOztBQUVBOztBQUVBOzs7QUFHQTs7QUFFQTs7QUFFQTs7QUFFQSxFQUFDO0FBQ0Q7QUFDQTs7O0FBR0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsTUFBSzs7QUFFTDs7QUFFQTs7QUFFQTs7QUFFQSxFQUFDOzs7QUFHRDs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLFVBQVM7O0FBRVQ7O0FBRUE7O0FBRUEsTUFBSzs7QUFFTDs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxZQUFXOztBQUVYOztBQUVBLFVBQVM7O0FBRVQ7O0FBRUE7O0FBRUEsb0RBQW1ELEVBQUU7QUFDckQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsWUFBVzs7QUFFWDs7QUFFQSxVQUFTOztBQUVUOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFlBQVc7O0FBRVg7O0FBRUEsVUFBUzs7QUFFVDs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFlBQVc7O0FBRVg7O0FBRUE7O0FBRUE7O0FBRUEsTUFBSzs7QUFFTDtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVzs7QUFFWDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxNQUFLOztBQUVMO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVzs7QUFFWDtBQUNBO0FBQ0E7O0FBRUEsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVc7O0FBRVg7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLE1BQUs7O0FBRUw7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFXOztBQUVYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVzs7QUFFWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVzs7QUFFWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVc7O0FBRVg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7OztBQUdBOztBQUVBOzs7QUFHQSxFQUFDO0FBQ0Q7OztBQUdBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLElBQUc7O0FBRUg7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7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O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxRQUFPOztBQUVQO0FBQ0E7QUFDQTtBQUNBLFFBQU87O0FBRVA7QUFDQTtBQUNBO0FBQ0EsUUFBTzs7QUFFUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxNQUFLOztBQUVMO0FBQ0E7O0FBRUE7QUFDQSxZQUFXLHdFQUF3RTs7QUFFbkY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87O0FBRVA7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWU7O0FBRWY7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxRQUFPOztBQUVQO0FBQ0EsNkJBQTRCO0FBQzVCLFFBQU87O0FBRVA7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsUUFBTzs7QUFFUDtBQUNBO0FBQ0EsUUFBTzs7QUFFUDtBQUNBO0FBQ0EsUUFBTzs7QUFFUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTzs7QUFFUDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxVQUFTOztBQUVUO0FBQ0E7O0FBRUEsVUFBUzs7QUFFVDs7QUFFQTs7QUFFQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBLDhCQUE2QjtBQUM3Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxRQUFPOztBQUVQLE1BQUs7QUFDTDtBQUNBOztBQUVBOzs7QUFHQSwwQkFBeUIsb0NBQW9DO0FBQzdEO0FBQ0E7O0FBRUE7O0FBRUEsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87O0FBRVA7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBLE1BQUs7O0FBRUw7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE1BQUs7O0FBRUw7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQU87O0FBRVA7QUFDQTs7QUFFQSxNQUFLOztBQUVMOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHdCQUF1QixvQ0FBb0M7QUFDM0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTs7O0FBR0E7O0FBRUE7QUFDQTtBQUNBLFFBQU87O0FBRVA7O0FBRUE7QUFDQTtBQUNBLE1BQUs7O0FBRUw7O0FBRUE7O0FBRUEsRUFBQztBQUNEO0FBQ0EsU0FBUSxnQkFBZ0IsU0FBUyxVQUFVLFdBQVcsV0FBVyxPQUFPLGVBQWUsTUFBTSxPQUFPLFFBQVEsU0FBUyxVQUFVLG1CQUFtQixnQkFBZ0IsU0FBUyx1Q0FBdUMsa0NBQWtDLG9DQUFvQywrQkFBK0IsNEJBQTRCLGdCQUFnQiwwQ0FBMEMsVUFBVSxnQkFBZ0IsNkJBQTZCLGlDQUFpQyxxQkFBcUIseURBQXlELFVBQVUsdUJBQXVCLHVDQUF1QyxrQ0FBa0Msb0NBQW9DLCtCQUErQixTQUFTLGtCQUFrQixpQkFBaUIsWUFBWSxlQUFlLGtCQUFrQixzQkFBc0IsNkJBQTZCLHNCQUFzQixNQUFNLFlBQVksa0JBQWtCLGtCQUFrQixrQkFBa0IsZ0JBQWdCLHlCQUF5QixhQUFhLGdCQUFnQixlQUFlLE1BQU0sYUFBYSxPQUFPLHdDQUF3QyxtQ0FBbUMscUNBQXFDLGdDQUFnQyxvQkFBb0IsWUFBWSxZQUFZLGlCQUFpQixnQkFBZ0Isb0JBQW9CLGNBQWMsVUFBVSxvQ0FBb0MsYUFBYSxlQUFlLGlCQUFpQixtRUFBbUUsU0FBUyxnQkFBZ0IsU0FBUyxRQUFRLFdBQVcsaUJBQWlCLFlBQVksbUJBQW1CLGVBQWUsV0FBVyxXQUFXLFVBQVUsZ0JBQWdCLHVCQUF1QixPQUFPLFdBQVcsVUFBVSx3QkFBd0IsU0FBUyxlQUFlLFlBQVksV0FBVyxZQUFZLGlDQUFpQyxVQUFVLGNBQWMsWUFBWSxXQUFXLFVBQVUsaUJBQWlCLGVBQWUsWUFBWSxlQUFlLGVBQWUsWUFBWSw0QkFBNEIsZUFBZSxjQUFjLGVBQWUsc0dBQXNHLGVBQWUsY0FBYyxhQUFhLGtCQUFrQixpQkFBaUIsZ0JBQWdCLFdBQVcsMENBQTBDLGNBQWMsZ0JBQWdCLFVBQVUsd0JBQXdCLHFCQUFxQixnQkFBZ0IsYUFBYSxzQkFBc0IsWUFBWSxhQUFhLGVBQWUsaUJBQWlCLG9CQUFvQixhQUFhLFdBQVcsOEJBQThCLGVBQWUsU0FBUyxZQUFZLGtDQUFrQyxxQkFBcUIsY0FBYyxjQUFjLFlBQVksa0JBQWtCLGFBQWEsa0JBQWtCLGtCQUFrQixhQUFhLGVBQWUsaUJBQWlCLGtCQUFrQixzQkFBc0IsWUFBWSxnQkFBZ0IsdUJBQXVCLGVBQWUsc0JBQXNCLGFBQWEsSUFBSSxXQUFXLHNDQUFzQywwQkFBMEIsNEJBQTRCLFVBQVUsbUJBQW1CLG1DQUFtQyxTQUFTLGFBQWEsa0NBQWtDLGtCQUFrQixtQkFBbUIsb0JBQW9CLG1CQUFtQixnQ0FBZ0MsZ0JBQWdCLGlCQUFpQixtQkFBbUIsU0FBUyx1QkFBdUIsZ0JBQWdCLFlBQVksd0JBQXdCLGdCQUFnQixlQUFlLGtCQUFrQixjQUFjLGdCQUFnQix3QkFBd0IsbUJBQW1CLFdBQVcsNEJBQTRCLDRCQUE0QixlQUFlLDhCQUE4QixzQ0FBc0MsbWZBQW1mLFdBQVcsVUFBVSw4QkFBOEIseUJBQXlCLDRCQUE0QixjQUFjLGdCQUFnQixhQUFhLGtCQUFrQixtQ0FBbUMsd0dBQXdHLGVBQWUsOENBQThDLHFCQUFxQixvQ0FBb0MscUZBQXFGLGdCQUFnQiw4QkFBOEIsaUJBQWlCLDhCQUE4QixlQUFlLDhCQUE4QixnQ0FBZ0MsY0FBYyxlQUFlLDhCQUE4QixnQ0FBZ0MsY0FBYyw2Q0FBNkMsZ0JBQWdCLHdCQUF3QixtQkFBbUIsYUFBYSw4QkFBOEIsbUJBQW1CLDhCQUE4QixtQkFBbUIsV0FBVyxlQUFlLG1CQUFtQixpQkFBaUIsa0JBQWtCLG1CQUFtQixxQkFBcUIsbUJBQW1CLGdDQUFnQyxtQkFBbUI7QUFDeHZLOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUEsWUFBVzs7QUFFWCwrREFBOEQsdUNBQXVDOztBQUVyRzs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxNQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhLE9BQU87QUFDcEIsY0FBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLOzs7QUFHTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUEsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhCQUE2QjtBQUM3QjtBQUNBO0FBQ0EsTUFBSzs7QUFFTDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7O0FBRVQsTUFBSzs7QUFFTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLOztBQUVMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7OztBQUdBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEwQjtBQUMxQjtBQUNBLGNBQWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFXOztBQUVYOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFXOztBQUVYOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHlHQUF3RztBQUN4RyxNQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBLDhKQUE2SjtBQUM3SiwySkFBMEo7QUFDMUosc0pBQXFKO0FBQ3JKLHVKQUFzSjtBQUN0SixtSkFBa0o7QUFDbEo7OztBQUdBOztBQUVBLEVBQUM7QUFDRDtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7O0FBR0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBOztBQUVBLElBQUc7O0FBRUg7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7O0FBRUEsSUFBRzs7QUFFSDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsTUFBSzs7QUFFTDs7QUFFQTtBQUNBOztBQUVBOztBQUVBLElBQUc7O0FBRUg7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLFFBQU87O0FBRVA7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsTUFBSzs7QUFFTDs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLFFBQU87O0FBRVA7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsTUFBSzs7QUFFTDs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQSxNQUFLOztBQUVMOztBQUVBLE1BQUs7O0FBRUw7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxFQUFDO0FBQ0Q7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsTUFBSzs7QUFFTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLEVBQUM7QUFDRDs7O0FBR0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7O0FBR0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFLOzs7QUFHTDs7QUFFQTs7QUFFQTs7OztBQUlBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBLEVBQUM7QUFDRDtBQUNBO0FBQ0EsbUI7Ozs7OztBQzNrSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxXOztBQUVBLGNBQWE7O0FBRWI7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBLFFBQU87O0FBRVA7O0FBRUEsTUFBSzs7QUFFTDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsUUFBTzs7QUFFUDs7QUFFQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTRDLFFBQVE7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLOztBQUVMOzs7QUFHQSxrRDs7QUFFQTs7QUFFQSxRQUFPLDBDQUEwQzs7QUFFakQsMENBQXlDLFNBQVM7QUFDbEQ7QUFDQTs7QUFFQSxRQUFPOztBQUVQO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxNQUFLOztBQUVMO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBOztBQUVBOztBQUVBLEVBQUM7OztBQUdEOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLE1BQUs7O0FBRUw7O0FBRUE7O0FBRUE7O0FBRUEsRUFBQzs7O0FBR0Q7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOzs7QUFHQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7O0FBRUEsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTs7QUFFQSxJQUFHOztBQUVIOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxNQUFLOztBQUVMOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUEsSUFBRzs7QUFFSDs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsUUFBTzs7QUFFUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxNQUFLOztBQUVMOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsUUFBTzs7QUFFUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxNQUFLOztBQUVMOztBQUVBOztBQUVBOztBQUVBOztBQUVBLE1BQUs7O0FBRUw7O0FBRUEsTUFBSzs7QUFFTDs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBOztBQUVBOztBQUVBOztBQUVBLEVBQUM7O0FBRUQ7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxVQUFTOztBQUVUOztBQUVBOztBQUVBLE1BQUs7O0FBRUw7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsWUFBVzs7QUFFWDs7QUFFQSxVQUFTOztBQUVUOztBQUVBOztBQUVBLG9EQUFtRCxFQUFFO0FBQ3JEOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFlBQVc7O0FBRVg7O0FBRUEsVUFBUzs7QUFFVDs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxZQUFXOztBQUVYOztBQUVBLFVBQVM7O0FBRVQ7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxZQUFXOztBQUVYOztBQUVBOztBQUVBOztBQUVBLE1BQUs7O0FBRUw7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVc7O0FBRVg7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsTUFBSzs7QUFFTDtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVc7O0FBRVg7QUFDQTtBQUNBOztBQUVBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFXOztBQUVYO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxNQUFLOztBQUVMO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVzs7QUFFWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVc7O0FBRVg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVc7O0FBRVg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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Q0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLElBQUc7QUFDSCxxQkFBb0IsU0FBUztBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7OztBQzdTQTs7Ozs7Ozs7QUFRQTs7Ozs7Ozs7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBLEtBQU1tQyxZQUFZLEdBQWxCOztBQUVBLEtBQU1DLFlBQVksR0FB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Rjs7O2lDQUVXOWxCLEssRUFBTztBQUNqQixXQUFJc2QsV0FBVyxrQkFBUThJLGFBQVIsQ0FBc0JwbUIsS0FBdEIsQ0FBZjtBQUNBLFlBQUtraUIsTUFBTCxDQUFZc0UsSUFBWixDQUFpQmxKLFFBQWpCO0FBQ0Q7OzsrQkFFU3RkLEssRUFBTztBQUNmLFlBQUsybEIsS0FBTCxDQUFXWSxVQUFYLENBQXNCLEtBQXRCO0FBQ0ExcEIsY0FBT2dHLG1CQUFQLENBQTJCLFdBQTNCLEVBQXdDLEtBQUtpakIsWUFBN0M7QUFDQWpwQixjQUFPZ0csbUJBQVAsQ0FBMkIsU0FBM0IsRUFBc0MsS0FBS2lqQixZQUEzQztBQUNBLFlBQUtXLE1BQUwsR0FBYyxDQUFkO0FBQ0EsWUFBS0MsTUFBTCxHQUFjLENBQWQ7QUFDRDs7O2dDQUdVO0FBQ1QsWUFBS2YsS0FBTCxDQUFXMUQsT0FBWCxDQUFtQnhsQixnQkFBbkIsQ0FBb0MsV0FBcEMsRUFBaUQsS0FBS3FwQixZQUF0RCxFQUFvRSxLQUFwRTtBQUNEOzs7bUNBRWE7QUFDWixZQUFLSCxLQUFMLENBQVcxRCxPQUFYLENBQW1CeGxCLGdCQUFuQixDQUFvQyxXQUFwQyxFQUFpRCxLQUFLcXBCLFlBQXRELEVBQW9FLElBQXBFO0FBQ0Q7Ozs7OzttQkF4RWtCSixnQiIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDdhMTU3Njc4YmQyZDBlZTU3NTRmXG4gKiovIiwiLyoqXG4gKiBmaWxlT3ZlcnZpZXc6XG4gKiBQcm9qZWN0OlxuICogRmlsZTpcbiAqIERhdGU6XG4gKiBBdXRob3I6XG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgZGF0IGZyb20gXCJkYXQtZ3VpXCI7XG5pbXBvcnQgR2xvYmFsRGF0YSBmcm9tIFwiLi4vLi4vY29tbW9uL2pzL2FwcC9kYXRhL0dsb2JhbERhdGFcIjtcbmltcG9ydCBXaW5kb3dVdGlsIGZyb20gXCIuLi8uLi9jb21tb24vanMvYXBwL2Jyb3dzZXIvV2luZG93VXRpbFwiO1xuaW1wb3J0IERPTVV0aWwgZnJvbSBcIi4uLy4uL2NvbW1vbi9qcy9hcHAvYnJvd3Nlci9ET01VdGlsXCI7XG5pbXBvcnQgQ2FudmFzVmlldyBmcm9tIFwiLi92aWV3cy9DYW52YXNWaWV3XCI7XG5pbXBvcnQgQ2FudmFzTW9kZWwgZnJvbSBcIi4vbW9kZWxscy9DYW52YXNNb2RlbFwiO1xuaW1wb3J0IENhbnZhc0NvbnRyb2xsZXIgZnJvbSBcIi4vY29udHJvbGxlcnMvQ2FudmFzQ29udHJvbGxlclwiO1xuXG5cbi8qKlxuICogaW5pdGlhbGl6ZVxuICovXG5ET01VdGlsLlJlYWR5KCgpID0+IHtcblxuICBHbG9iYWxEYXRhLmluaXQoKTtcblxuICBsZXQgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG5cbiAgR2xvYmFsRGF0YS5ib2R5LmFwcGVuZENoaWxkKGNhbnZhcyk7XG5cbiAgbGV0IG1vZGVsID0gbmV3IENhbnZhc01vZGVsO1xuICBsZXQgdmlldyA9IG5ldyBDYW52YXNWaWV3KGNhbnZhcyk7XG4gIGxldCBjb250cm9sbGVyID0gbmV3IENhbnZhc0NvbnRyb2xsZXI7XG5cbiAgdmlldy5zZXRNQyhtb2RlbCwgY29udHJvbGxlcik7XG5cblxuICBsZXQgZ3VpID0gbmV3IGRhdC5HVUkoKTtcblxuICBndWkuYWRkKG1vZGVsLCAnd2lkdGgnKS5saXN0ZW4oKTtcbiAgZ3VpLmFkZChtb2RlbCwgJ2hlaWdodCcpLmxpc3RlbigpO1xuICBndWkuYWRkKG1vZGVsLCAneCcpLmxpc3RlbigpO1xuICBndWkuYWRkKG1vZGVsLCAneScpLmxpc3RlbigpO1xuICBndWkuYWRkKG1vZGVsLCAncmFkaWFuJykubGlzdGVuKCk7XG4gIGd1aS5hZGQobW9kZWwsICdkZWdyZWUnKS5saXN0ZW4oKTtcbiAgZ3VpLmFkZChtb2RlbCwgJ2h5cG90ZW51c2UnKS5saXN0ZW4oKTtcblxuXG4gIGxldCByZXNpemUgPSAoKSA9PiB7XG4gICAgbGV0IHNpemUgPSBXaW5kb3dVdGlsLmdldFNjcmVlblNpemUoKTtcblxuICAgIEdsb2JhbERhdGEuYm9keVN0eWxlLndpZHRoID0gc2l6ZS53aWR0aCArICdweCc7XG4gICAgR2xvYmFsRGF0YS5ib2R5U3R5bGUuaGVpZ2h0ID0gc2l6ZS5oZWlnaHQgKyAncHgnO1xuXG4gICAgY2FudmFzLndpZHRoID0gc2l6ZS53aWR0aDtcbiAgICBjYW52YXMuaGVpZ2h0ID0gc2l6ZS5oZWlnaHQ7XG5cbiAgICBtb2RlbC51cGRhdGVTaXplKHNpemUpO1xuICB9O1xuXG5cbiAgbGV0IHRpbWVySUQgPSAwO1xuXG5cbiAgbGV0IHJlc2l6ZUhhbmRsZXIgPSAoKSA9PiB7XG5cbiAgICBpZiAodGltZXJJRCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVySUQpO1xuICAgIH1cblxuICAgIHRpbWVySUQgPSBzZXRUaW1lb3V0KHJlc2l6ZSwgMTAwKTtcblxuICB9O1xuXG4gIHJlc2l6ZSgpO1xuICBXaW5kb3dVdGlsLmluc3RhbmNlLmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHJlc2l6ZUhhbmRsZXIpO1xuXG4gIHZpZXcuZHJhdygpO1xuXG5cbn0pO1xuXG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vcGMvanMvYXBwLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL3ZlbmRvci9kYXQuZ3VpJylcbm1vZHVsZS5leHBvcnRzLmNvbG9yID0gcmVxdWlyZSgnLi92ZW5kb3IvZGF0LmNvbG9yJylcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9kYXQtZ3VpL2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqXG4gKiBkYXQtZ3VpIEphdmFTY3JpcHQgQ29udHJvbGxlciBMaWJyYXJ5XG4gKiBodHRwOi8vY29kZS5nb29nbGUuY29tL3AvZGF0LWd1aVxuICpcbiAqIENvcHlyaWdodCAyMDExIERhdGEgQXJ0cyBUZWFtLCBHb29nbGUgQ3JlYXRpdmUgTGFiXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICovXG5cbi8qKiBAbmFtZXNwYWNlICovXG52YXIgZGF0ID0gbW9kdWxlLmV4cG9ydHMgPSBkYXQgfHwge307XG5cbi8qKiBAbmFtZXNwYWNlICovXG5kYXQuZ3VpID0gZGF0Lmd1aSB8fCB7fTtcblxuLyoqIEBuYW1lc3BhY2UgKi9cbmRhdC51dGlscyA9IGRhdC51dGlscyB8fCB7fTtcblxuLyoqIEBuYW1lc3BhY2UgKi9cbmRhdC5jb250cm9sbGVycyA9IGRhdC5jb250cm9sbGVycyB8fCB7fTtcblxuLyoqIEBuYW1lc3BhY2UgKi9cbmRhdC5kb20gPSBkYXQuZG9tIHx8IHt9O1xuXG4vKiogQG5hbWVzcGFjZSAqL1xuZGF0LmNvbG9yID0gZGF0LmNvbG9yIHx8IHt9O1xuXG5kYXQudXRpbHMuY3NzID0gKGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHtcbiAgICBsb2FkOiBmdW5jdGlvbiAodXJsLCBkb2MpIHtcbiAgICAgIGRvYyA9IGRvYyB8fCBkb2N1bWVudDtcbiAgICAgIHZhciBsaW5rID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKTtcbiAgICAgIGxpbmsudHlwZSA9ICd0ZXh0L2Nzcyc7XG4gICAgICBsaW5rLnJlbCA9ICdzdHlsZXNoZWV0JztcbiAgICAgIGxpbmsuaHJlZiA9IHVybDtcbiAgICAgIGRvYy5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdLmFwcGVuZENoaWxkKGxpbmspO1xuICAgIH0sXG4gICAgaW5qZWN0OiBmdW5jdGlvbihjc3MsIGRvYykge1xuICAgICAgZG9jID0gZG9jIHx8IGRvY3VtZW50O1xuICAgICAgdmFyIGluamVjdGVkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICAgIGluamVjdGVkLnR5cGUgPSAndGV4dC9jc3MnO1xuICAgICAgaW5qZWN0ZWQuaW5uZXJIVE1MID0gY3NzO1xuICAgICAgZG9jLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF0uYXBwZW5kQ2hpbGQoaW5qZWN0ZWQpO1xuICAgIH1cbiAgfVxufSkoKTtcblxuXG5kYXQudXRpbHMuY29tbW9uID0gKGZ1bmN0aW9uICgpIHtcbiAgXG4gIHZhciBBUlJfRUFDSCA9IEFycmF5LnByb3RvdHlwZS5mb3JFYWNoO1xuICB2YXIgQVJSX1NMSUNFID0gQXJyYXkucHJvdG90eXBlLnNsaWNlO1xuXG4gIC8qKlxuICAgKiBCYW5kLWFpZCBtZXRob2RzIGZvciB0aGluZ3MgdGhhdCBzaG91bGQgYmUgYSBsb3QgZWFzaWVyIGluIEphdmFTY3JpcHQuXG4gICAqIEltcGxlbWVudGF0aW9uIGFuZCBzdHJ1Y3R1cmUgaW5zcGlyZWQgYnkgdW5kZXJzY29yZS5qc1xuICAgKiBodHRwOi8vZG9jdW1lbnRjbG91ZC5naXRodWIuY29tL3VuZGVyc2NvcmUvXG4gICAqL1xuXG4gIHJldHVybiB7IFxuICAgIFxuICAgIEJSRUFLOiB7fSxcbiAgXG4gICAgZXh0ZW5kOiBmdW5jdGlvbih0YXJnZXQpIHtcbiAgICAgIFxuICAgICAgdGhpcy5lYWNoKEFSUl9TTElDRS5jYWxsKGFyZ3VtZW50cywgMSksIGZ1bmN0aW9uKG9iaikge1xuICAgICAgICBcbiAgICAgICAgZm9yICh2YXIga2V5IGluIG9iailcbiAgICAgICAgICBpZiAoIXRoaXMuaXNVbmRlZmluZWQob2JqW2tleV0pKSBcbiAgICAgICAgICAgIHRhcmdldFtrZXldID0gb2JqW2tleV07XG4gICAgICAgIFxuICAgICAgfSwgdGhpcyk7XG4gICAgICBcbiAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgICBcbiAgICB9LFxuICAgIFxuICAgIGRlZmF1bHRzOiBmdW5jdGlvbih0YXJnZXQpIHtcbiAgICAgIFxuICAgICAgdGhpcy5lYWNoKEFSUl9TTElDRS5jYWxsKGFyZ3VtZW50cywgMSksIGZ1bmN0aW9uKG9iaikge1xuICAgICAgICBcbiAgICAgICAgZm9yICh2YXIga2V5IGluIG9iailcbiAgICAgICAgICBpZiAodGhpcy5pc1VuZGVmaW5lZCh0YXJnZXRba2V5XSkpIFxuICAgICAgICAgICAgdGFyZ2V0W2tleV0gPSBvYmpba2V5XTtcbiAgICAgICAgXG4gICAgICB9LCB0aGlzKTtcbiAgICAgIFxuICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICBcbiAgICB9LFxuICAgIFxuICAgIGNvbXBvc2U6IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHRvQ2FsbCA9IEFSUl9TTElDRS5jYWxsKGFyZ3VtZW50cyk7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHZhciBhcmdzID0gQVJSX1NMSUNFLmNhbGwoYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IHRvQ2FsbC5sZW5ndGggLTE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICAgICAgYXJncyA9IFt0b0NhbGxbaV0uYXBwbHkodGhpcywgYXJncyldO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiBhcmdzWzBdO1xuICAgICAgICAgICAgfVxuICAgIH0sXG4gICAgXG4gICAgZWFjaDogZnVuY3Rpb24ob2JqLCBpdHIsIHNjb3BlKSB7XG5cbiAgICAgIFxuICAgICAgaWYgKEFSUl9FQUNIICYmIG9iai5mb3JFYWNoID09PSBBUlJfRUFDSCkgeyBcbiAgICAgICAgXG4gICAgICAgIG9iai5mb3JFYWNoKGl0ciwgc2NvcGUpO1xuICAgICAgICBcbiAgICAgIH0gZWxzZSBpZiAob2JqLmxlbmd0aCA9PT0gb2JqLmxlbmd0aCArIDApIHsgLy8gSXMgbnVtYmVyIGJ1dCBub3QgTmFOXG4gICAgICAgIFxuICAgICAgICBmb3IgKHZhciBrZXkgPSAwLCBsID0gb2JqLmxlbmd0aDsga2V5IDwgbDsga2V5KyspXG4gICAgICAgICAgaWYgKGtleSBpbiBvYmogJiYgaXRyLmNhbGwoc2NvcGUsIG9ialtrZXldLCBrZXkpID09PSB0aGlzLkJSRUFLKSBcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIFxuICAgICAgfSBlbHNlIHtcblxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSBcbiAgICAgICAgICBpZiAoaXRyLmNhbGwoc2NvcGUsIG9ialtrZXldLCBrZXkpID09PSB0aGlzLkJSRUFLKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgXG4gICAgICB9XG4gICAgICAgICAgICBcbiAgICB9LFxuICAgIFxuICAgIGRlZmVyOiBmdW5jdGlvbihmbmMpIHtcbiAgICAgIHNldFRpbWVvdXQoZm5jLCAwKTtcbiAgICB9LFxuICAgIFxuICAgIHRvQXJyYXk6IGZ1bmN0aW9uKG9iaikge1xuICAgICAgaWYgKG9iai50b0FycmF5KSByZXR1cm4gb2JqLnRvQXJyYXkoKTtcbiAgICAgIHJldHVybiBBUlJfU0xJQ0UuY2FsbChvYmopO1xuICAgIH0sXG5cbiAgICBpc1VuZGVmaW5lZDogZnVuY3Rpb24ob2JqKSB7XG4gICAgICByZXR1cm4gb2JqID09PSB1bmRlZmluZWQ7XG4gICAgfSxcbiAgICBcbiAgICBpc051bGw6IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiA9PT0gbnVsbDtcbiAgICB9LFxuICAgIFxuICAgIGlzTmFOOiBmdW5jdGlvbihvYmopIHtcbiAgICAgIHJldHVybiBvYmogIT09IG9iajtcbiAgICB9LFxuICAgIFxuICAgIGlzQXJyYXk6IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24ob2JqKSB7XG4gICAgICByZXR1cm4gb2JqLmNvbnN0cnVjdG9yID09PSBBcnJheTtcbiAgICB9LFxuICAgIFxuICAgIGlzT2JqZWN0OiBmdW5jdGlvbihvYmopIHtcbiAgICAgIHJldHVybiBvYmogPT09IE9iamVjdChvYmopO1xuICAgIH0sXG4gICAgXG4gICAgaXNOdW1iZXI6IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiA9PT0gb2JqKzA7XG4gICAgfSxcbiAgICBcbiAgICBpc1N0cmluZzogZnVuY3Rpb24ob2JqKSB7XG4gICAgICByZXR1cm4gb2JqID09PSBvYmorJyc7XG4gICAgfSxcbiAgICBcbiAgICBpc0Jvb2xlYW46IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiA9PT0gZmFsc2UgfHwgb2JqID09PSB0cnVlO1xuICAgIH0sXG4gICAgXG4gICAgaXNGdW5jdGlvbjogZnVuY3Rpb24ob2JqKSB7XG4gICAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG4gICAgfVxuICBcbiAgfTtcbiAgICBcbn0pKCk7XG5cblxuZGF0LmNvbnRyb2xsZXJzLkNvbnRyb2xsZXIgPSAoZnVuY3Rpb24gKGNvbW1vbikge1xuXG4gIC8qKlxuICAgKiBAY2xhc3MgQW4gXCJhYnN0cmFjdFwiIGNsYXNzIHRoYXQgcmVwcmVzZW50cyBhIGdpdmVuIHByb3BlcnR5IG9mIGFuIG9iamVjdC5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGJlIG1hbmlwdWxhdGVkXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wZXJ0eSBUaGUgbmFtZSBvZiB0aGUgcHJvcGVydHkgdG8gYmUgbWFuaXB1bGF0ZWRcbiAgICpcbiAgICogQG1lbWJlciBkYXQuY29udHJvbGxlcnNcbiAgICovXG4gIHZhciBDb250cm9sbGVyID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkge1xuXG4gICAgdGhpcy5pbml0aWFsVmFsdWUgPSBvYmplY3RbcHJvcGVydHldO1xuXG4gICAgLyoqXG4gICAgICogVGhvc2Ugd2hvIGV4dGVuZCB0aGlzIGNsYXNzIHdpbGwgcHV0IHRoZWlyIERPTSBlbGVtZW50cyBpbiBoZXJlLlxuICAgICAqIEB0eXBlIHtET01FbGVtZW50fVxuICAgICAqL1xuICAgIHRoaXMuZG9tRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgLyoqXG4gICAgICogVGhlIG9iamVjdCB0byBtYW5pcHVsYXRlXG4gICAgICogQHR5cGUge09iamVjdH1cbiAgICAgKi9cbiAgICB0aGlzLm9iamVjdCA9IG9iamVjdDtcblxuICAgIC8qKlxuICAgICAqIFRoZSBuYW1lIG9mIHRoZSBwcm9wZXJ0eSB0byBtYW5pcHVsYXRlXG4gICAgICogQHR5cGUge1N0cmluZ31cbiAgICAgKi9cbiAgICB0aGlzLnByb3BlcnR5ID0gcHJvcGVydHk7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgZnVuY3Rpb24gdG8gYmUgY2FsbGVkIG9uIGNoYW5nZS5cbiAgICAgKiBAdHlwZSB7RnVuY3Rpb259XG4gICAgICogQGlnbm9yZVxuICAgICAqL1xuICAgIHRoaXMuX19vbkNoYW5nZSA9IHVuZGVmaW5lZDtcblxuICAgIC8qKlxuICAgICAqIFRoZSBmdW5jdGlvbiB0byBiZSBjYWxsZWQgb24gZmluaXNoaW5nIGNoYW5nZS5cbiAgICAgKiBAdHlwZSB7RnVuY3Rpb259XG4gICAgICogQGlnbm9yZVxuICAgICAqL1xuICAgIHRoaXMuX19vbkZpbmlzaENoYW5nZSA9IHVuZGVmaW5lZDtcblxuICB9O1xuXG4gIGNvbW1vbi5leHRlbmQoXG5cbiAgICAgIENvbnRyb2xsZXIucHJvdG90eXBlLFxuXG4gICAgICAvKiogQGxlbmRzIGRhdC5jb250cm9sbGVycy5Db250cm9sbGVyLnByb3RvdHlwZSAqL1xuICAgICAge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTcGVjaWZ5IHRoYXQgYSBmdW5jdGlvbiBmaXJlIGV2ZXJ5IHRpbWUgc29tZW9uZSBjaGFuZ2VzIHRoZSB2YWx1ZSB3aXRoXG4gICAgICAgICAqIHRoaXMgQ29udHJvbGxlci5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm5jIFRoaXMgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgd2hlbmV2ZXIgdGhlIHZhbHVlXG4gICAgICAgICAqIGlzIG1vZGlmaWVkIHZpYSB0aGlzIENvbnRyb2xsZXIuXG4gICAgICAgICAqIEByZXR1cm5zIHtkYXQuY29udHJvbGxlcnMuQ29udHJvbGxlcn0gdGhpc1xuICAgICAgICAgKi9cbiAgICAgICAgb25DaGFuZ2U6IGZ1bmN0aW9uKGZuYykge1xuICAgICAgICAgIHRoaXMuX19vbkNoYW5nZSA9IGZuYztcbiAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogU3BlY2lmeSB0aGF0IGEgZnVuY3Rpb24gZmlyZSBldmVyeSB0aW1lIHNvbWVvbmUgXCJmaW5pc2hlc1wiIGNoYW5naW5nXG4gICAgICAgICAqIHRoZSB2YWx1ZSB3aWggdGhpcyBDb250cm9sbGVyLiBVc2VmdWwgZm9yIHZhbHVlcyB0aGF0IGNoYW5nZVxuICAgICAgICAgKiBpbmNyZW1lbnRhbGx5IGxpa2UgbnVtYmVycyBvciBzdHJpbmdzLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbmMgVGhpcyBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCB3aGVuZXZlclxuICAgICAgICAgKiBzb21lb25lIFwiZmluaXNoZXNcIiBjaGFuZ2luZyB0aGUgdmFsdWUgdmlhIHRoaXMgQ29udHJvbGxlci5cbiAgICAgICAgICogQHJldHVybnMge2RhdC5jb250cm9sbGVycy5Db250cm9sbGVyfSB0aGlzXG4gICAgICAgICAqL1xuICAgICAgICBvbkZpbmlzaENoYW5nZTogZnVuY3Rpb24oZm5jKSB7XG4gICAgICAgICAgdGhpcy5fX29uRmluaXNoQ2hhbmdlID0gZm5jO1xuICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDaGFuZ2UgdGhlIHZhbHVlIG9mIDxjb2RlPm9iamVjdFtwcm9wZXJ0eV08L2NvZGU+XG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBuZXdWYWx1ZSBUaGUgbmV3IHZhbHVlIG9mIDxjb2RlPm9iamVjdFtwcm9wZXJ0eV08L2NvZGU+XG4gICAgICAgICAqL1xuICAgICAgICBzZXRWYWx1ZTogZnVuY3Rpb24obmV3VmFsdWUpIHtcbiAgICAgICAgICB0aGlzLm9iamVjdFt0aGlzLnByb3BlcnR5XSA9IG5ld1ZhbHVlO1xuICAgICAgICAgIGlmICh0aGlzLl9fb25DaGFuZ2UpIHtcbiAgICAgICAgICAgIHRoaXMuX19vbkNoYW5nZS5jYWxsKHRoaXMsIG5ld1ZhbHVlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy51cGRhdGVEaXNwbGF5KCk7XG4gICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdldHMgdGhlIHZhbHVlIG9mIDxjb2RlPm9iamVjdFtwcm9wZXJ0eV08L2NvZGU+XG4gICAgICAgICAqXG4gICAgICAgICAqIEByZXR1cm5zIHtPYmplY3R9IFRoZSBjdXJyZW50IHZhbHVlIG9mIDxjb2RlPm9iamVjdFtwcm9wZXJ0eV08L2NvZGU+XG4gICAgICAgICAqL1xuICAgICAgICBnZXRWYWx1ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMub2JqZWN0W3RoaXMucHJvcGVydHldO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZWZyZXNoZXMgdGhlIHZpc3VhbCBkaXNwbGF5IG9mIGEgQ29udHJvbGxlciBpbiBvcmRlciB0byBrZWVwIHN5bmNcbiAgICAgICAgICogd2l0aCB0aGUgb2JqZWN0J3MgY3VycmVudCB2YWx1ZS5cbiAgICAgICAgICogQHJldHVybnMge2RhdC5jb250cm9sbGVycy5Db250cm9sbGVyfSB0aGlzXG4gICAgICAgICAqL1xuICAgICAgICB1cGRhdGVEaXNwbGF5OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHJldHVybnMge0Jvb2xlYW59IHRydWUgaWYgdGhlIHZhbHVlIGhhcyBkZXZpYXRlZCBmcm9tIGluaXRpYWxWYWx1ZVxuICAgICAgICAgKi9cbiAgICAgICAgaXNNb2RpZmllZDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuaW5pdGlhbFZhbHVlICE9PSB0aGlzLmdldFZhbHVlKClcbiAgICAgICAgfVxuXG4gICAgICB9XG5cbiAgKTtcblxuICByZXR1cm4gQ29udHJvbGxlcjtcblxuXG59KShkYXQudXRpbHMuY29tbW9uKTtcblxuXG5kYXQuZG9tLmRvbSA9IChmdW5jdGlvbiAoY29tbW9uKSB7XG5cbiAgdmFyIEVWRU5UX01BUCA9IHtcbiAgICAnSFRNTEV2ZW50cyc6IFsnY2hhbmdlJ10sXG4gICAgJ01vdXNlRXZlbnRzJzogWydjbGljaycsJ21vdXNlbW92ZScsJ21vdXNlZG93bicsJ21vdXNldXAnLCAnbW91c2VvdmVyJ10sXG4gICAgJ0tleWJvYXJkRXZlbnRzJzogWydrZXlkb3duJ11cbiAgfTtcblxuICB2YXIgRVZFTlRfTUFQX0lOViA9IHt9O1xuICBjb21tb24uZWFjaChFVkVOVF9NQVAsIGZ1bmN0aW9uKHYsIGspIHtcbiAgICBjb21tb24uZWFjaCh2LCBmdW5jdGlvbihlKSB7XG4gICAgICBFVkVOVF9NQVBfSU5WW2VdID0gaztcbiAgICB9KTtcbiAgfSk7XG5cbiAgdmFyIENTU19WQUxVRV9QSVhFTFMgPSAvKFxcZCsoXFwuXFxkKyk/KXB4LztcblxuICBmdW5jdGlvbiBjc3NWYWx1ZVRvUGl4ZWxzKHZhbCkge1xuXG4gICAgaWYgKHZhbCA9PT0gJzAnIHx8IGNvbW1vbi5pc1VuZGVmaW5lZCh2YWwpKSByZXR1cm4gMDtcblxuICAgIHZhciBtYXRjaCA9IHZhbC5tYXRjaChDU1NfVkFMVUVfUElYRUxTKTtcblxuICAgIGlmICghY29tbW9uLmlzTnVsbChtYXRjaCkpIHtcbiAgICAgIHJldHVybiBwYXJzZUZsb2F0KG1hdGNoWzFdKTtcbiAgICB9XG5cbiAgICAvLyBUT0RPIC4uLmVtcz8gJT9cblxuICAgIHJldHVybiAwO1xuXG4gIH1cblxuICAvKipcbiAgICogQG5hbWVzcGFjZVxuICAgKiBAbWVtYmVyIGRhdC5kb21cbiAgICovXG4gIHZhciBkb20gPSB7XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gZWxlbVxuICAgICAqIEBwYXJhbSBzZWxlY3RhYmxlXG4gICAgICovXG4gICAgbWFrZVNlbGVjdGFibGU6IGZ1bmN0aW9uKGVsZW0sIHNlbGVjdGFibGUpIHtcblxuICAgICAgaWYgKGVsZW0gPT09IHVuZGVmaW5lZCB8fCBlbGVtLnN0eWxlID09PSB1bmRlZmluZWQpIHJldHVybjtcblxuICAgICAgZWxlbS5vbnNlbGVjdHN0YXJ0ID0gc2VsZWN0YWJsZSA/IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9IDogZnVuY3Rpb24oKSB7XG4gICAgICB9O1xuXG4gICAgICBlbGVtLnN0eWxlLk1velVzZXJTZWxlY3QgPSBzZWxlY3RhYmxlID8gJ2F1dG8nIDogJ25vbmUnO1xuICAgICAgZWxlbS5zdHlsZS5LaHRtbFVzZXJTZWxlY3QgPSBzZWxlY3RhYmxlID8gJ2F1dG8nIDogJ25vbmUnO1xuICAgICAgZWxlbS51bnNlbGVjdGFibGUgPSBzZWxlY3RhYmxlID8gJ29uJyA6ICdvZmYnO1xuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIGVsZW1cbiAgICAgKiBAcGFyYW0gaG9yaXpvbnRhbFxuICAgICAqIEBwYXJhbSB2ZXJ0aWNhbFxuICAgICAqL1xuICAgIG1ha2VGdWxsc2NyZWVuOiBmdW5jdGlvbihlbGVtLCBob3Jpem9udGFsLCB2ZXJ0aWNhbCkge1xuXG4gICAgICBpZiAoY29tbW9uLmlzVW5kZWZpbmVkKGhvcml6b250YWwpKSBob3Jpem9udGFsID0gdHJ1ZTtcbiAgICAgIGlmIChjb21tb24uaXNVbmRlZmluZWQodmVydGljYWwpKSB2ZXJ0aWNhbCA9IHRydWU7XG5cbiAgICAgIGVsZW0uc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuXG4gICAgICBpZiAoaG9yaXpvbnRhbCkge1xuICAgICAgICBlbGVtLnN0eWxlLmxlZnQgPSAwO1xuICAgICAgICBlbGVtLnN0eWxlLnJpZ2h0ID0gMDtcbiAgICAgIH1cbiAgICAgIGlmICh2ZXJ0aWNhbCkge1xuICAgICAgICBlbGVtLnN0eWxlLnRvcCA9IDA7XG4gICAgICAgIGVsZW0uc3R5bGUuYm90dG9tID0gMDtcbiAgICAgIH1cblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSBlbGVtXG4gICAgICogQHBhcmFtIGV2ZW50VHlwZVxuICAgICAqIEBwYXJhbSBwYXJhbXNcbiAgICAgKi9cbiAgICBmYWtlRXZlbnQ6IGZ1bmN0aW9uKGVsZW0sIGV2ZW50VHlwZSwgcGFyYW1zLCBhdXgpIHtcbiAgICAgIHBhcmFtcyA9IHBhcmFtcyB8fCB7fTtcbiAgICAgIHZhciBjbGFzc05hbWUgPSBFVkVOVF9NQVBfSU5WW2V2ZW50VHlwZV07XG4gICAgICBpZiAoIWNsYXNzTmFtZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0V2ZW50IHR5cGUgJyArIGV2ZW50VHlwZSArICcgbm90IHN1cHBvcnRlZC4nKTtcbiAgICAgIH1cbiAgICAgIHZhciBldnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudChjbGFzc05hbWUpO1xuICAgICAgc3dpdGNoIChjbGFzc05hbWUpIHtcbiAgICAgICAgY2FzZSAnTW91c2VFdmVudHMnOlxuICAgICAgICAgIHZhciBjbGllbnRYID0gcGFyYW1zLnggfHwgcGFyYW1zLmNsaWVudFggfHwgMDtcbiAgICAgICAgICB2YXIgY2xpZW50WSA9IHBhcmFtcy55IHx8IHBhcmFtcy5jbGllbnRZIHx8IDA7XG4gICAgICAgICAgZXZ0LmluaXRNb3VzZUV2ZW50KGV2ZW50VHlwZSwgcGFyYW1zLmJ1YmJsZXMgfHwgZmFsc2UsXG4gICAgICAgICAgICAgIHBhcmFtcy5jYW5jZWxhYmxlIHx8IHRydWUsIHdpbmRvdywgcGFyYW1zLmNsaWNrQ291bnQgfHwgMSxcbiAgICAgICAgICAgICAgMCwgLy9zY3JlZW4gWFxuICAgICAgICAgICAgICAwLCAvL3NjcmVlbiBZXG4gICAgICAgICAgICAgIGNsaWVudFgsIC8vY2xpZW50IFhcbiAgICAgICAgICAgICAgY2xpZW50WSwgLy9jbGllbnQgWVxuICAgICAgICAgICAgICBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgMCwgbnVsbCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ0tleWJvYXJkRXZlbnRzJzpcbiAgICAgICAgICB2YXIgaW5pdCA9IGV2dC5pbml0S2V5Ym9hcmRFdmVudCB8fCBldnQuaW5pdEtleUV2ZW50OyAvLyB3ZWJraXQgfHwgbW96XG4gICAgICAgICAgY29tbW9uLmRlZmF1bHRzKHBhcmFtcywge1xuICAgICAgICAgICAgY2FuY2VsYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGN0cmxLZXk6IGZhbHNlLFxuICAgICAgICAgICAgYWx0S2V5OiBmYWxzZSxcbiAgICAgICAgICAgIHNoaWZ0S2V5OiBmYWxzZSxcbiAgICAgICAgICAgIG1ldGFLZXk6IGZhbHNlLFxuICAgICAgICAgICAga2V5Q29kZTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgY2hhckNvZGU6IHVuZGVmaW5lZFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGluaXQoZXZlbnRUeXBlLCBwYXJhbXMuYnViYmxlcyB8fCBmYWxzZSxcbiAgICAgICAgICAgICAgcGFyYW1zLmNhbmNlbGFibGUsIHdpbmRvdyxcbiAgICAgICAgICAgICAgcGFyYW1zLmN0cmxLZXksIHBhcmFtcy5hbHRLZXksXG4gICAgICAgICAgICAgIHBhcmFtcy5zaGlmdEtleSwgcGFyYW1zLm1ldGFLZXksXG4gICAgICAgICAgICAgIHBhcmFtcy5rZXlDb2RlLCBwYXJhbXMuY2hhckNvZGUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGV2dC5pbml0RXZlbnQoZXZlbnRUeXBlLCBwYXJhbXMuYnViYmxlcyB8fCBmYWxzZSxcbiAgICAgICAgICAgICAgcGFyYW1zLmNhbmNlbGFibGUgfHwgdHJ1ZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjb21tb24uZGVmYXVsdHMoZXZ0LCBhdXgpO1xuICAgICAgZWxlbS5kaXNwYXRjaEV2ZW50KGV2dCk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIGVsZW1cbiAgICAgKiBAcGFyYW0gZXZlbnRcbiAgICAgKiBAcGFyYW0gZnVuY1xuICAgICAqIEBwYXJhbSBib29sXG4gICAgICovXG4gICAgYmluZDogZnVuY3Rpb24oZWxlbSwgZXZlbnQsIGZ1bmMsIGJvb2wpIHtcbiAgICAgIGJvb2wgPSBib29sIHx8IGZhbHNlO1xuICAgICAgaWYgKGVsZW0uYWRkRXZlbnRMaXN0ZW5lcilcbiAgICAgICAgZWxlbS5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBmdW5jLCBib29sKTtcbiAgICAgIGVsc2UgaWYgKGVsZW0uYXR0YWNoRXZlbnQpXG4gICAgICAgIGVsZW0uYXR0YWNoRXZlbnQoJ29uJyArIGV2ZW50LCBmdW5jKTtcbiAgICAgIHJldHVybiBkb207XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIGVsZW1cbiAgICAgKiBAcGFyYW0gZXZlbnRcbiAgICAgKiBAcGFyYW0gZnVuY1xuICAgICAqIEBwYXJhbSBib29sXG4gICAgICovXG4gICAgdW5iaW5kOiBmdW5jdGlvbihlbGVtLCBldmVudCwgZnVuYywgYm9vbCkge1xuICAgICAgYm9vbCA9IGJvb2wgfHwgZmFsc2U7XG4gICAgICBpZiAoZWxlbS5yZW1vdmVFdmVudExpc3RlbmVyKVxuICAgICAgICBlbGVtLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQsIGZ1bmMsIGJvb2wpO1xuICAgICAgZWxzZSBpZiAoZWxlbS5kZXRhY2hFdmVudClcbiAgICAgICAgZWxlbS5kZXRhY2hFdmVudCgnb24nICsgZXZlbnQsIGZ1bmMpO1xuICAgICAgcmV0dXJuIGRvbTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZWxlbVxuICAgICAqIEBwYXJhbSBjbGFzc05hbWVcbiAgICAgKi9cbiAgICBhZGRDbGFzczogZnVuY3Rpb24oZWxlbSwgY2xhc3NOYW1lKSB7XG4gICAgICBpZiAoZWxlbS5jbGFzc05hbWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBlbGVtLmNsYXNzTmFtZSA9IGNsYXNzTmFtZTtcbiAgICAgIH0gZWxzZSBpZiAoZWxlbS5jbGFzc05hbWUgIT09IGNsYXNzTmFtZSkge1xuICAgICAgICB2YXIgY2xhc3NlcyA9IGVsZW0uY2xhc3NOYW1lLnNwbGl0KC8gKy8pO1xuICAgICAgICBpZiAoY2xhc3Nlcy5pbmRleE9mKGNsYXNzTmFtZSkgPT0gLTEpIHtcbiAgICAgICAgICBjbGFzc2VzLnB1c2goY2xhc3NOYW1lKTtcbiAgICAgICAgICBlbGVtLmNsYXNzTmFtZSA9IGNsYXNzZXMuam9pbignICcpLnJlcGxhY2UoL15cXHMrLywgJycpLnJlcGxhY2UoL1xccyskLywgJycpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gZG9tO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSBlbGVtXG4gICAgICogQHBhcmFtIGNsYXNzTmFtZVxuICAgICAqL1xuICAgIHJlbW92ZUNsYXNzOiBmdW5jdGlvbihlbGVtLCBjbGFzc05hbWUpIHtcbiAgICAgIGlmIChjbGFzc05hbWUpIHtcbiAgICAgICAgaWYgKGVsZW0uY2xhc3NOYW1lID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAvLyBlbGVtLmNsYXNzTmFtZSA9IGNsYXNzTmFtZTtcbiAgICAgICAgfSBlbHNlIGlmIChlbGVtLmNsYXNzTmFtZSA9PT0gY2xhc3NOYW1lKSB7XG4gICAgICAgICAgZWxlbS5yZW1vdmVBdHRyaWJ1dGUoJ2NsYXNzJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFyIGNsYXNzZXMgPSBlbGVtLmNsYXNzTmFtZS5zcGxpdCgvICsvKTtcbiAgICAgICAgICB2YXIgaW5kZXggPSBjbGFzc2VzLmluZGV4T2YoY2xhc3NOYW1lKTtcbiAgICAgICAgICBpZiAoaW5kZXggIT0gLTEpIHtcbiAgICAgICAgICAgIGNsYXNzZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIGVsZW0uY2xhc3NOYW1lID0gY2xhc3Nlcy5qb2luKCcgJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbGVtLmNsYXNzTmFtZSA9IHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBkb207XG4gICAgfSxcblxuICAgIGhhc0NsYXNzOiBmdW5jdGlvbihlbGVtLCBjbGFzc05hbWUpIHtcbiAgICAgIHJldHVybiBuZXcgUmVnRXhwKCcoPzpefFxcXFxzKyknICsgY2xhc3NOYW1lICsgJyg/OlxcXFxzK3wkKScpLnRlc3QoZWxlbS5jbGFzc05hbWUpIHx8IGZhbHNlO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSBlbGVtXG4gICAgICovXG4gICAgZ2V0V2lkdGg6IGZ1bmN0aW9uKGVsZW0pIHtcblxuICAgICAgdmFyIHN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZShlbGVtKTtcblxuICAgICAgcmV0dXJuIGNzc1ZhbHVlVG9QaXhlbHMoc3R5bGVbJ2JvcmRlci1sZWZ0LXdpZHRoJ10pICtcbiAgICAgICAgICBjc3NWYWx1ZVRvUGl4ZWxzKHN0eWxlWydib3JkZXItcmlnaHQtd2lkdGgnXSkgK1xuICAgICAgICAgIGNzc1ZhbHVlVG9QaXhlbHMoc3R5bGVbJ3BhZGRpbmctbGVmdCddKSArXG4gICAgICAgICAgY3NzVmFsdWVUb1BpeGVscyhzdHlsZVsncGFkZGluZy1yaWdodCddKSArXG4gICAgICAgICAgY3NzVmFsdWVUb1BpeGVscyhzdHlsZVsnd2lkdGgnXSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIGVsZW1cbiAgICAgKi9cbiAgICBnZXRIZWlnaHQ6IGZ1bmN0aW9uKGVsZW0pIHtcblxuICAgICAgdmFyIHN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZShlbGVtKTtcblxuICAgICAgcmV0dXJuIGNzc1ZhbHVlVG9QaXhlbHMoc3R5bGVbJ2JvcmRlci10b3Atd2lkdGgnXSkgK1xuICAgICAgICAgIGNzc1ZhbHVlVG9QaXhlbHMoc3R5bGVbJ2JvcmRlci1ib3R0b20td2lkdGgnXSkgK1xuICAgICAgICAgIGNzc1ZhbHVlVG9QaXhlbHMoc3R5bGVbJ3BhZGRpbmctdG9wJ10pICtcbiAgICAgICAgICBjc3NWYWx1ZVRvUGl4ZWxzKHN0eWxlWydwYWRkaW5nLWJvdHRvbSddKSArXG4gICAgICAgICAgY3NzVmFsdWVUb1BpeGVscyhzdHlsZVsnaGVpZ2h0J10pO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSBlbGVtXG4gICAgICovXG4gICAgZ2V0T2Zmc2V0OiBmdW5jdGlvbihlbGVtKSB7XG4gICAgICB2YXIgb2Zmc2V0ID0ge2xlZnQ6IDAsIHRvcDowfTtcbiAgICAgIGlmIChlbGVtLm9mZnNldFBhcmVudCkge1xuICAgICAgICBkbyB7XG4gICAgICAgICAgb2Zmc2V0LmxlZnQgKz0gZWxlbS5vZmZzZXRMZWZ0O1xuICAgICAgICAgIG9mZnNldC50b3AgKz0gZWxlbS5vZmZzZXRUb3A7XG4gICAgICAgIH0gd2hpbGUgKGVsZW0gPSBlbGVtLm9mZnNldFBhcmVudCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gb2Zmc2V0O1xuICAgIH0sXG5cbiAgICAvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcG9zdHMvMjY4NDU2MS9yZXZpc2lvbnNcbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gZWxlbVxuICAgICAqL1xuICAgIGlzQWN0aXZlOiBmdW5jdGlvbihlbGVtKSB7XG4gICAgICByZXR1cm4gZWxlbSA9PT0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCAmJiAoIGVsZW0udHlwZSB8fCBlbGVtLmhyZWYgKTtcbiAgICB9XG5cbiAgfTtcblxuICByZXR1cm4gZG9tO1xuXG59KShkYXQudXRpbHMuY29tbW9uKTtcblxuXG5kYXQuY29udHJvbGxlcnMuT3B0aW9uQ29udHJvbGxlciA9IChmdW5jdGlvbiAoQ29udHJvbGxlciwgZG9tLCBjb21tb24pIHtcblxuICAvKipcbiAgICogQGNsYXNzIFByb3ZpZGVzIGEgc2VsZWN0IGlucHV0IHRvIGFsdGVyIHRoZSBwcm9wZXJ0eSBvZiBhbiBvYmplY3QsIHVzaW5nIGFcbiAgICogbGlzdCBvZiBhY2NlcHRlZCB2YWx1ZXMuXG4gICAqXG4gICAqIEBleHRlbmRzIGRhdC5jb250cm9sbGVycy5Db250cm9sbGVyXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBiZSBtYW5pcHVsYXRlZFxuICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvcGVydHkgVGhlIG5hbWUgb2YgdGhlIHByb3BlcnR5IHRvIGJlIG1hbmlwdWxhdGVkXG4gICAqIEBwYXJhbSB7T2JqZWN0fHN0cmluZ1tdfSBvcHRpb25zIEEgbWFwIG9mIGxhYmVscyB0byBhY2NlcHRhYmxlIHZhbHVlcywgb3JcbiAgICogYSBsaXN0IG9mIGFjY2VwdGFibGUgc3RyaW5nIHZhbHVlcy5cbiAgICpcbiAgICogQG1lbWJlciBkYXQuY29udHJvbGxlcnNcbiAgICovXG4gIHZhciBPcHRpb25Db250cm9sbGVyID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSwgb3B0aW9ucykge1xuXG4gICAgT3B0aW9uQ29udHJvbGxlci5zdXBlcmNsYXNzLmNhbGwodGhpcywgb2JqZWN0LCBwcm9wZXJ0eSk7XG5cbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgLyoqXG4gICAgICogVGhlIGRyb3AgZG93biBtZW51XG4gICAgICogQGlnbm9yZVxuICAgICAqL1xuICAgIHRoaXMuX19zZWxlY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzZWxlY3QnKTtcblxuICAgIGlmIChjb21tb24uaXNBcnJheShvcHRpb25zKSkge1xuICAgICAgdmFyIG1hcCA9IHt9O1xuICAgICAgY29tbW9uLmVhY2gob3B0aW9ucywgZnVuY3Rpb24oZWxlbWVudCkge1xuICAgICAgICBtYXBbZWxlbWVudF0gPSBlbGVtZW50O1xuICAgICAgfSk7XG4gICAgICBvcHRpb25zID0gbWFwO1xuICAgIH1cblxuICAgIGNvbW1vbi5lYWNoKG9wdGlvbnMsIGZ1bmN0aW9uKHZhbHVlLCBrZXkpIHtcblxuICAgICAgdmFyIG9wdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpO1xuICAgICAgb3B0LmlubmVySFRNTCA9IGtleTtcbiAgICAgIG9wdC5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgdmFsdWUpO1xuICAgICAgX3RoaXMuX19zZWxlY3QuYXBwZW5kQ2hpbGQob3B0KTtcblxuICAgIH0pO1xuXG4gICAgLy8gQWNrbm93bGVkZ2Ugb3JpZ2luYWwgdmFsdWVcbiAgICB0aGlzLnVwZGF0ZURpc3BsYXkoKTtcblxuICAgIGRvbS5iaW5kKHRoaXMuX19zZWxlY3QsICdjaGFuZ2UnLCBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBkZXNpcmVkVmFsdWUgPSB0aGlzLm9wdGlvbnNbdGhpcy5zZWxlY3RlZEluZGV4XS52YWx1ZTtcbiAgICAgIF90aGlzLnNldFZhbHVlKGRlc2lyZWRWYWx1ZSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmRvbUVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5fX3NlbGVjdCk7XG5cbiAgfTtcblxuICBPcHRpb25Db250cm9sbGVyLnN1cGVyY2xhc3MgPSBDb250cm9sbGVyO1xuXG4gIGNvbW1vbi5leHRlbmQoXG5cbiAgICAgIE9wdGlvbkNvbnRyb2xsZXIucHJvdG90eXBlLFxuICAgICAgQ29udHJvbGxlci5wcm90b3R5cGUsXG5cbiAgICAgIHtcblxuICAgICAgICBzZXRWYWx1ZTogZnVuY3Rpb24odikge1xuICAgICAgICAgIHZhciB0b1JldHVybiA9IE9wdGlvbkNvbnRyb2xsZXIuc3VwZXJjbGFzcy5wcm90b3R5cGUuc2V0VmFsdWUuY2FsbCh0aGlzLCB2KTtcbiAgICAgICAgICBpZiAodGhpcy5fX29uRmluaXNoQ2hhbmdlKSB7XG4gICAgICAgICAgICB0aGlzLl9fb25GaW5pc2hDaGFuZ2UuY2FsbCh0aGlzLCB0aGlzLmdldFZhbHVlKCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdG9SZXR1cm47XG4gICAgICAgIH0sXG5cbiAgICAgICAgdXBkYXRlRGlzcGxheTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdGhpcy5fX3NlbGVjdC52YWx1ZSA9IHRoaXMuZ2V0VmFsdWUoKTtcbiAgICAgICAgICByZXR1cm4gT3B0aW9uQ29udHJvbGxlci5zdXBlcmNsYXNzLnByb3RvdHlwZS51cGRhdGVEaXNwbGF5LmNhbGwodGhpcyk7XG4gICAgICAgIH1cblxuICAgICAgfVxuXG4gICk7XG5cbiAgcmV0dXJuIE9wdGlvbkNvbnRyb2xsZXI7XG5cbn0pKGRhdC5jb250cm9sbGVycy5Db250cm9sbGVyLFxuZGF0LmRvbS5kb20sXG5kYXQudXRpbHMuY29tbW9uKTtcblxuXG5kYXQuY29udHJvbGxlcnMuTnVtYmVyQ29udHJvbGxlciA9IChmdW5jdGlvbiAoQ29udHJvbGxlciwgY29tbW9uKSB7XG5cbiAgLyoqXG4gICAqIEBjbGFzcyBSZXByZXNlbnRzIGEgZ2l2ZW4gcHJvcGVydHkgb2YgYW4gb2JqZWN0IHRoYXQgaXMgYSBudW1iZXIuXG4gICAqXG4gICAqIEBleHRlbmRzIGRhdC5jb250cm9sbGVycy5Db250cm9sbGVyXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBiZSBtYW5pcHVsYXRlZFxuICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvcGVydHkgVGhlIG5hbWUgb2YgdGhlIHByb3BlcnR5IHRvIGJlIG1hbmlwdWxhdGVkXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSBPcHRpb25hbCBwYXJhbWV0ZXJzXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbcGFyYW1zLm1pbl0gTWluaW11bSBhbGxvd2VkIHZhbHVlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbcGFyYW1zLm1heF0gTWF4aW11bSBhbGxvd2VkIHZhbHVlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbcGFyYW1zLnN0ZXBdIEluY3JlbWVudCBieSB3aGljaCB0byBjaGFuZ2UgdmFsdWVcbiAgICpcbiAgICogQG1lbWJlciBkYXQuY29udHJvbGxlcnNcbiAgICovXG4gIHZhciBOdW1iZXJDb250cm9sbGVyID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSwgcGFyYW1zKSB7XG5cbiAgICBOdW1iZXJDb250cm9sbGVyLnN1cGVyY2xhc3MuY2FsbCh0aGlzLCBvYmplY3QsIHByb3BlcnR5KTtcblxuICAgIHBhcmFtcyA9IHBhcmFtcyB8fCB7fTtcblxuICAgIHRoaXMuX19taW4gPSBwYXJhbXMubWluO1xuICAgIHRoaXMuX19tYXggPSBwYXJhbXMubWF4O1xuICAgIHRoaXMuX19zdGVwID0gcGFyYW1zLnN0ZXA7XG5cbiAgICBpZiAoY29tbW9uLmlzVW5kZWZpbmVkKHRoaXMuX19zdGVwKSkge1xuXG4gICAgICBpZiAodGhpcy5pbml0aWFsVmFsdWUgPT0gMCkge1xuICAgICAgICB0aGlzLl9faW1wbGllZFN0ZXAgPSAxOyAvLyBXaGF0IGFyZSB3ZSwgcHN5Y2hpY3M/XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBIZXkgRG91ZywgY2hlY2sgdGhpcyBvdXQuXG4gICAgICAgIHRoaXMuX19pbXBsaWVkU3RlcCA9IE1hdGgucG93KDEwLCBNYXRoLmZsb29yKE1hdGgubG9nKHRoaXMuaW5pdGlhbFZhbHVlKS9NYXRoLkxOMTApKS8xMDtcbiAgICAgIH1cblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIHRoaXMuX19pbXBsaWVkU3RlcCA9IHRoaXMuX19zdGVwO1xuXG4gICAgfVxuXG4gICAgdGhpcy5fX3ByZWNpc2lvbiA9IG51bURlY2ltYWxzKHRoaXMuX19pbXBsaWVkU3RlcCk7XG5cblxuICB9O1xuXG4gIE51bWJlckNvbnRyb2xsZXIuc3VwZXJjbGFzcyA9IENvbnRyb2xsZXI7XG5cbiAgY29tbW9uLmV4dGVuZChcblxuICAgICAgTnVtYmVyQ29udHJvbGxlci5wcm90b3R5cGUsXG4gICAgICBDb250cm9sbGVyLnByb3RvdHlwZSxcblxuICAgICAgLyoqIEBsZW5kcyBkYXQuY29udHJvbGxlcnMuTnVtYmVyQ29udHJvbGxlci5wcm90b3R5cGUgKi9cbiAgICAgIHtcblxuICAgICAgICBzZXRWYWx1ZTogZnVuY3Rpb24odikge1xuXG4gICAgICAgICAgaWYgKHRoaXMuX19taW4gIT09IHVuZGVmaW5lZCAmJiB2IDwgdGhpcy5fX21pbikge1xuICAgICAgICAgICAgdiA9IHRoaXMuX19taW47XG4gICAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9fbWF4ICE9PSB1bmRlZmluZWQgJiYgdiA+IHRoaXMuX19tYXgpIHtcbiAgICAgICAgICAgIHYgPSB0aGlzLl9fbWF4O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh0aGlzLl9fc3RlcCAhPT0gdW5kZWZpbmVkICYmIHYgJSB0aGlzLl9fc3RlcCAhPSAwKSB7XG4gICAgICAgICAgICB2ID0gTWF0aC5yb3VuZCh2IC8gdGhpcy5fX3N0ZXApICogdGhpcy5fX3N0ZXA7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIE51bWJlckNvbnRyb2xsZXIuc3VwZXJjbGFzcy5wcm90b3R5cGUuc2V0VmFsdWUuY2FsbCh0aGlzLCB2KTtcblxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTcGVjaWZ5IGEgbWluaW11bSB2YWx1ZSBmb3IgPGNvZGU+b2JqZWN0W3Byb3BlcnR5XTwvY29kZT4uXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7TnVtYmVyfSBtaW5WYWx1ZSBUaGUgbWluaW11bSB2YWx1ZSBmb3JcbiAgICAgICAgICogPGNvZGU+b2JqZWN0W3Byb3BlcnR5XTwvY29kZT5cbiAgICAgICAgICogQHJldHVybnMge2RhdC5jb250cm9sbGVycy5OdW1iZXJDb250cm9sbGVyfSB0aGlzXG4gICAgICAgICAqL1xuICAgICAgICBtaW46IGZ1bmN0aW9uKHYpIHtcbiAgICAgICAgICB0aGlzLl9fbWluID0gdjtcbiAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogU3BlY2lmeSBhIG1heGltdW0gdmFsdWUgZm9yIDxjb2RlPm9iamVjdFtwcm9wZXJ0eV08L2NvZGU+LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge051bWJlcn0gbWF4VmFsdWUgVGhlIG1heGltdW0gdmFsdWUgZm9yXG4gICAgICAgICAqIDxjb2RlPm9iamVjdFtwcm9wZXJ0eV08L2NvZGU+XG4gICAgICAgICAqIEByZXR1cm5zIHtkYXQuY29udHJvbGxlcnMuTnVtYmVyQ29udHJvbGxlcn0gdGhpc1xuICAgICAgICAgKi9cbiAgICAgICAgbWF4OiBmdW5jdGlvbih2KSB7XG4gICAgICAgICAgdGhpcy5fX21heCA9IHY7XG4gICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNwZWNpZnkgYSBzdGVwIHZhbHVlIHRoYXQgZGF0LmNvbnRyb2xsZXJzLk51bWJlckNvbnRyb2xsZXJcbiAgICAgICAgICogaW5jcmVtZW50cyBieS5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtOdW1iZXJ9IHN0ZXBWYWx1ZSBUaGUgc3RlcCB2YWx1ZSBmb3JcbiAgICAgICAgICogZGF0LmNvbnRyb2xsZXJzLk51bWJlckNvbnRyb2xsZXJcbiAgICAgICAgICogQGRlZmF1bHQgaWYgbWluaW11bSBhbmQgbWF4aW11bSBzcGVjaWZpZWQgaW5jcmVtZW50IGlzIDElIG9mIHRoZVxuICAgICAgICAgKiBkaWZmZXJlbmNlIG90aGVyd2lzZSBzdGVwVmFsdWUgaXMgMVxuICAgICAgICAgKiBAcmV0dXJucyB7ZGF0LmNvbnRyb2xsZXJzLk51bWJlckNvbnRyb2xsZXJ9IHRoaXNcbiAgICAgICAgICovXG4gICAgICAgIHN0ZXA6IGZ1bmN0aW9uKHYpIHtcbiAgICAgICAgICB0aGlzLl9fc3RlcCA9IHY7XG4gICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgfVxuXG4gICk7XG5cbiAgZnVuY3Rpb24gbnVtRGVjaW1hbHMoeCkge1xuICAgIHggPSB4LnRvU3RyaW5nKCk7XG4gICAgaWYgKHguaW5kZXhPZignLicpID4gLTEpIHtcbiAgICAgIHJldHVybiB4Lmxlbmd0aCAtIHguaW5kZXhPZignLicpIC0gMTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIE51bWJlckNvbnRyb2xsZXI7XG5cbn0pKGRhdC5jb250cm9sbGVycy5Db250cm9sbGVyLFxuZGF0LnV0aWxzLmNvbW1vbik7XG5cblxuZGF0LmNvbnRyb2xsZXJzLk51bWJlckNvbnRyb2xsZXJCb3ggPSAoZnVuY3Rpb24gKE51bWJlckNvbnRyb2xsZXIsIGRvbSwgY29tbW9uKSB7XG5cbiAgLyoqXG4gICAqIEBjbGFzcyBSZXByZXNlbnRzIGEgZ2l2ZW4gcHJvcGVydHkgb2YgYW4gb2JqZWN0IHRoYXQgaXMgYSBudW1iZXIgYW5kXG4gICAqIHByb3ZpZGVzIGFuIGlucHV0IGVsZW1lbnQgd2l0aCB3aGljaCB0byBtYW5pcHVsYXRlIGl0LlxuICAgKlxuICAgKiBAZXh0ZW5kcyBkYXQuY29udHJvbGxlcnMuQ29udHJvbGxlclxuICAgKiBAZXh0ZW5kcyBkYXQuY29udHJvbGxlcnMuTnVtYmVyQ29udHJvbGxlclxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gYmUgbWFuaXB1bGF0ZWRcbiAgICogQHBhcmFtIHtzdHJpbmd9IHByb3BlcnR5IFRoZSBuYW1lIG9mIHRoZSBwcm9wZXJ0eSB0byBiZSBtYW5pcHVsYXRlZFxuICAgKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc10gT3B0aW9uYWwgcGFyYW1ldGVyc1xuICAgKiBAcGFyYW0ge051bWJlcn0gW3BhcmFtcy5taW5dIE1pbmltdW0gYWxsb3dlZCB2YWx1ZVxuICAgKiBAcGFyYW0ge051bWJlcn0gW3BhcmFtcy5tYXhdIE1heGltdW0gYWxsb3dlZCB2YWx1ZVxuICAgKiBAcGFyYW0ge051bWJlcn0gW3BhcmFtcy5zdGVwXSBJbmNyZW1lbnQgYnkgd2hpY2ggdG8gY2hhbmdlIHZhbHVlXG4gICAqXG4gICAqIEBtZW1iZXIgZGF0LmNvbnRyb2xsZXJzXG4gICAqL1xuICB2YXIgTnVtYmVyQ29udHJvbGxlckJveCA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHksIHBhcmFtcykge1xuXG4gICAgdGhpcy5fX3RydW5jYXRpb25TdXNwZW5kZWQgPSBmYWxzZTtcblxuICAgIE51bWJlckNvbnRyb2xsZXJCb3guc3VwZXJjbGFzcy5jYWxsKHRoaXMsIG9iamVjdCwgcHJvcGVydHksIHBhcmFtcyk7XG5cbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgLyoqXG4gICAgICoge051bWJlcn0gUHJldmlvdXMgbW91c2UgeSBwb3NpdGlvblxuICAgICAqIEBpZ25vcmVcbiAgICAgKi9cbiAgICB2YXIgcHJldl95O1xuXG4gICAgdGhpcy5fX2lucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICB0aGlzLl9faW5wdXQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ3RleHQnKTtcblxuICAgIC8vIE1ha2VzIGl0IHNvIG1hbnVhbGx5IHNwZWNpZmllZCB2YWx1ZXMgYXJlIG5vdCB0cnVuY2F0ZWQuXG5cbiAgICBkb20uYmluZCh0aGlzLl9faW5wdXQsICdjaGFuZ2UnLCBvbkNoYW5nZSk7XG4gICAgZG9tLmJpbmQodGhpcy5fX2lucHV0LCAnYmx1cicsIG9uQmx1cik7XG4gICAgZG9tLmJpbmQodGhpcy5fX2lucHV0LCAnbW91c2Vkb3duJywgb25Nb3VzZURvd24pO1xuICAgIGRvbS5iaW5kKHRoaXMuX19pbnB1dCwgJ2tleWRvd24nLCBmdW5jdGlvbihlKSB7XG5cbiAgICAgIC8vIFdoZW4gcHJlc3NpbmcgZW50aXJlLCB5b3UgY2FuIGJlIGFzIHByZWNpc2UgYXMgeW91IHdhbnQuXG4gICAgICBpZiAoZS5rZXlDb2RlID09PSAxMykge1xuICAgICAgICBfdGhpcy5fX3RydW5jYXRpb25TdXNwZW5kZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLmJsdXIoKTtcbiAgICAgICAgX3RoaXMuX190cnVuY2F0aW9uU3VzcGVuZGVkID0gZmFsc2U7XG4gICAgICB9XG5cbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIG9uQ2hhbmdlKCkge1xuICAgICAgdmFyIGF0dGVtcHRlZCA9IHBhcnNlRmxvYXQoX3RoaXMuX19pbnB1dC52YWx1ZSk7XG4gICAgICBpZiAoIWNvbW1vbi5pc05hTihhdHRlbXB0ZWQpKSBfdGhpcy5zZXRWYWx1ZShhdHRlbXB0ZWQpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uQmx1cigpIHtcbiAgICAgIG9uQ2hhbmdlKCk7XG4gICAgICBpZiAoX3RoaXMuX19vbkZpbmlzaENoYW5nZSkge1xuICAgICAgICBfdGhpcy5fX29uRmluaXNoQ2hhbmdlLmNhbGwoX3RoaXMsIF90aGlzLmdldFZhbHVlKCkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uTW91c2VEb3duKGUpIHtcbiAgICAgIGRvbS5iaW5kKHdpbmRvdywgJ21vdXNlbW92ZScsIG9uTW91c2VEcmFnKTtcbiAgICAgIGRvbS5iaW5kKHdpbmRvdywgJ21vdXNldXAnLCBvbk1vdXNlVXApO1xuICAgICAgcHJldl95ID0gZS5jbGllbnRZO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uTW91c2VEcmFnKGUpIHtcblxuICAgICAgdmFyIGRpZmYgPSBwcmV2X3kgLSBlLmNsaWVudFk7XG4gICAgICBfdGhpcy5zZXRWYWx1ZShfdGhpcy5nZXRWYWx1ZSgpICsgZGlmZiAqIF90aGlzLl9faW1wbGllZFN0ZXApO1xuXG4gICAgICBwcmV2X3kgPSBlLmNsaWVudFk7XG5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbk1vdXNlVXAoKSB7XG4gICAgICBkb20udW5iaW5kKHdpbmRvdywgJ21vdXNlbW92ZScsIG9uTW91c2VEcmFnKTtcbiAgICAgIGRvbS51bmJpbmQod2luZG93LCAnbW91c2V1cCcsIG9uTW91c2VVcCk7XG4gICAgfVxuXG4gICAgdGhpcy51cGRhdGVEaXNwbGF5KCk7XG5cbiAgICB0aGlzLmRvbUVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5fX2lucHV0KTtcblxuICB9O1xuXG4gIE51bWJlckNvbnRyb2xsZXJCb3guc3VwZXJjbGFzcyA9IE51bWJlckNvbnRyb2xsZXI7XG5cbiAgY29tbW9uLmV4dGVuZChcblxuICAgICAgTnVtYmVyQ29udHJvbGxlckJveC5wcm90b3R5cGUsXG4gICAgICBOdW1iZXJDb250cm9sbGVyLnByb3RvdHlwZSxcblxuICAgICAge1xuXG4gICAgICAgIHVwZGF0ZURpc3BsYXk6IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgdGhpcy5fX2lucHV0LnZhbHVlID0gdGhpcy5fX3RydW5jYXRpb25TdXNwZW5kZWQgPyB0aGlzLmdldFZhbHVlKCkgOiByb3VuZFRvRGVjaW1hbCh0aGlzLmdldFZhbHVlKCksIHRoaXMuX19wcmVjaXNpb24pO1xuICAgICAgICAgIHJldHVybiBOdW1iZXJDb250cm9sbGVyQm94LnN1cGVyY2xhc3MucHJvdG90eXBlLnVwZGF0ZURpc3BsYXkuY2FsbCh0aGlzKTtcbiAgICAgICAgfVxuXG4gICAgICB9XG5cbiAgKTtcblxuICBmdW5jdGlvbiByb3VuZFRvRGVjaW1hbCh2YWx1ZSwgZGVjaW1hbHMpIHtcbiAgICB2YXIgdGVuVG8gPSBNYXRoLnBvdygxMCwgZGVjaW1hbHMpO1xuICAgIHJldHVybiBNYXRoLnJvdW5kKHZhbHVlICogdGVuVG8pIC8gdGVuVG87XG4gIH1cblxuICByZXR1cm4gTnVtYmVyQ29udHJvbGxlckJveDtcblxufSkoZGF0LmNvbnRyb2xsZXJzLk51bWJlckNvbnRyb2xsZXIsXG5kYXQuZG9tLmRvbSxcbmRhdC51dGlscy5jb21tb24pO1xuXG5cbmRhdC5jb250cm9sbGVycy5OdW1iZXJDb250cm9sbGVyU2xpZGVyID0gKGZ1bmN0aW9uIChOdW1iZXJDb250cm9sbGVyLCBkb20sIGNzcywgY29tbW9uLCBzdHlsZVNoZWV0KSB7XG5cbiAgLyoqXG4gICAqIEBjbGFzcyBSZXByZXNlbnRzIGEgZ2l2ZW4gcHJvcGVydHkgb2YgYW4gb2JqZWN0IHRoYXQgaXMgYSBudW1iZXIsIGNvbnRhaW5zXG4gICAqIGEgbWluaW11bSBhbmQgbWF4aW11bSwgYW5kIHByb3ZpZGVzIGEgc2xpZGVyIGVsZW1lbnQgd2l0aCB3aGljaCB0b1xuICAgKiBtYW5pcHVsYXRlIGl0LiBJdCBzaG91bGQgYmUgbm90ZWQgdGhhdCB0aGUgc2xpZGVyIGVsZW1lbnQgaXMgbWFkZSB1cCBvZlxuICAgKiA8Y29kZT4mbHQ7ZGl2Jmd0OzwvY29kZT4gdGFncywgPHN0cm9uZz5ub3Q8L3N0cm9uZz4gdGhlIGh0bWw1XG4gICAqIDxjb2RlPiZsdDtzbGlkZXImZ3Q7PC9jb2RlPiBlbGVtZW50LlxuICAgKlxuICAgKiBAZXh0ZW5kcyBkYXQuY29udHJvbGxlcnMuQ29udHJvbGxlclxuICAgKiBAZXh0ZW5kcyBkYXQuY29udHJvbGxlcnMuTnVtYmVyQ29udHJvbGxlclxuICAgKiBcbiAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGJlIG1hbmlwdWxhdGVkXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wZXJ0eSBUaGUgbmFtZSBvZiB0aGUgcHJvcGVydHkgdG8gYmUgbWFuaXB1bGF0ZWRcbiAgICogQHBhcmFtIHtOdW1iZXJ9IG1pblZhbHVlIE1pbmltdW0gYWxsb3dlZCB2YWx1ZVxuICAgKiBAcGFyYW0ge051bWJlcn0gbWF4VmFsdWUgTWF4aW11bSBhbGxvd2VkIHZhbHVlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBzdGVwVmFsdWUgSW5jcmVtZW50IGJ5IHdoaWNoIHRvIGNoYW5nZSB2YWx1ZVxuICAgKlxuICAgKiBAbWVtYmVyIGRhdC5jb250cm9sbGVyc1xuICAgKi9cbiAgdmFyIE51bWJlckNvbnRyb2xsZXJTbGlkZXIgPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5LCBtaW4sIG1heCwgc3RlcCkge1xuXG4gICAgTnVtYmVyQ29udHJvbGxlclNsaWRlci5zdXBlcmNsYXNzLmNhbGwodGhpcywgb2JqZWN0LCBwcm9wZXJ0eSwgeyBtaW46IG1pbiwgbWF4OiBtYXgsIHN0ZXA6IHN0ZXAgfSk7XG5cbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgdGhpcy5fX2JhY2tncm91bmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLl9fZm9yZWdyb3VuZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIFxuXG5cbiAgICBkb20uYmluZCh0aGlzLl9fYmFja2dyb3VuZCwgJ21vdXNlZG93bicsIG9uTW91c2VEb3duKTtcbiAgICBcbiAgICBkb20uYWRkQ2xhc3ModGhpcy5fX2JhY2tncm91bmQsICdzbGlkZXInKTtcbiAgICBkb20uYWRkQ2xhc3ModGhpcy5fX2ZvcmVncm91bmQsICdzbGlkZXItZmcnKTtcblxuICAgIGZ1bmN0aW9uIG9uTW91c2VEb3duKGUpIHtcblxuICAgICAgZG9tLmJpbmQod2luZG93LCAnbW91c2Vtb3ZlJywgb25Nb3VzZURyYWcpO1xuICAgICAgZG9tLmJpbmQod2luZG93LCAnbW91c2V1cCcsIG9uTW91c2VVcCk7XG5cbiAgICAgIG9uTW91c2VEcmFnKGUpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uTW91c2VEcmFnKGUpIHtcblxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICB2YXIgb2Zmc2V0ID0gZG9tLmdldE9mZnNldChfdGhpcy5fX2JhY2tncm91bmQpO1xuICAgICAgdmFyIHdpZHRoID0gZG9tLmdldFdpZHRoKF90aGlzLl9fYmFja2dyb3VuZCk7XG4gICAgICBcbiAgICAgIF90aGlzLnNldFZhbHVlKFxuICAgICAgICBtYXAoZS5jbGllbnRYLCBvZmZzZXQubGVmdCwgb2Zmc2V0LmxlZnQgKyB3aWR0aCwgX3RoaXMuX19taW4sIF90aGlzLl9fbWF4KVxuICAgICAgKTtcblxuICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25Nb3VzZVVwKCkge1xuICAgICAgZG9tLnVuYmluZCh3aW5kb3csICdtb3VzZW1vdmUnLCBvbk1vdXNlRHJhZyk7XG4gICAgICBkb20udW5iaW5kKHdpbmRvdywgJ21vdXNldXAnLCBvbk1vdXNlVXApO1xuICAgICAgaWYgKF90aGlzLl9fb25GaW5pc2hDaGFuZ2UpIHtcbiAgICAgICAgX3RoaXMuX19vbkZpbmlzaENoYW5nZS5jYWxsKF90aGlzLCBfdGhpcy5nZXRWYWx1ZSgpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnVwZGF0ZURpc3BsYXkoKTtcblxuICAgIHRoaXMuX19iYWNrZ3JvdW5kLmFwcGVuZENoaWxkKHRoaXMuX19mb3JlZ3JvdW5kKTtcbiAgICB0aGlzLmRvbUVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5fX2JhY2tncm91bmQpO1xuXG4gIH07XG5cbiAgTnVtYmVyQ29udHJvbGxlclNsaWRlci5zdXBlcmNsYXNzID0gTnVtYmVyQ29udHJvbGxlcjtcblxuICAvKipcbiAgICogSW5qZWN0cyBkZWZhdWx0IHN0eWxlc2hlZXQgZm9yIHNsaWRlciBlbGVtZW50cy5cbiAgICovXG4gIE51bWJlckNvbnRyb2xsZXJTbGlkZXIudXNlRGVmYXVsdFN0eWxlcyA9IGZ1bmN0aW9uKCkge1xuICAgIGNzcy5pbmplY3Qoc3R5bGVTaGVldCk7XG4gIH07XG5cbiAgY29tbW9uLmV4dGVuZChcblxuICAgICAgTnVtYmVyQ29udHJvbGxlclNsaWRlci5wcm90b3R5cGUsXG4gICAgICBOdW1iZXJDb250cm9sbGVyLnByb3RvdHlwZSxcblxuICAgICAge1xuXG4gICAgICAgIHVwZGF0ZURpc3BsYXk6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciBwY3QgPSAodGhpcy5nZXRWYWx1ZSgpIC0gdGhpcy5fX21pbikvKHRoaXMuX19tYXggLSB0aGlzLl9fbWluKTtcbiAgICAgICAgICB0aGlzLl9fZm9yZWdyb3VuZC5zdHlsZS53aWR0aCA9IHBjdCoxMDArJyUnO1xuICAgICAgICAgIHJldHVybiBOdW1iZXJDb250cm9sbGVyU2xpZGVyLnN1cGVyY2xhc3MucHJvdG90eXBlLnVwZGF0ZURpc3BsYXkuY2FsbCh0aGlzKTtcbiAgICAgICAgfVxuXG4gICAgICB9XG5cblxuXG4gICk7XG5cbiAgZnVuY3Rpb24gbWFwKHYsIGkxLCBpMiwgbzEsIG8yKSB7XG4gICAgcmV0dXJuIG8xICsgKG8yIC0gbzEpICogKCh2IC0gaTEpIC8gKGkyIC0gaTEpKTtcbiAgfVxuXG4gIHJldHVybiBOdW1iZXJDb250cm9sbGVyU2xpZGVyO1xuICBcbn0pKGRhdC5jb250cm9sbGVycy5OdW1iZXJDb250cm9sbGVyLFxuZGF0LmRvbS5kb20sXG5kYXQudXRpbHMuY3NzLFxuZGF0LnV0aWxzLmNvbW1vbixcblwiLnNsaWRlciB7XFxuICBib3gtc2hhZG93OiBpbnNldCAwIDJweCA0cHggcmdiYSgwLDAsMCwwLjE1KTtcXG4gIGhlaWdodDogMWVtO1xcbiAgYm9yZGVyLXJhZGl1czogMWVtO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2VlZTtcXG4gIHBhZGRpbmc6IDAgMC41ZW07XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbn1cXG5cXG4uc2xpZGVyLWZnIHtcXG4gIHBhZGRpbmc6IDFweCAwIDJweCAwO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2FhYTtcXG4gIGhlaWdodDogMWVtO1xcbiAgbWFyZ2luLWxlZnQ6IC0wLjVlbTtcXG4gIHBhZGRpbmctcmlnaHQ6IDAuNWVtO1xcbiAgYm9yZGVyLXJhZGl1czogMWVtIDAgMCAxZW07XFxufVxcblxcbi5zbGlkZXItZmc6YWZ0ZXIge1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgYm9yZGVyLXJhZGl1czogMWVtO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXG4gIGJvcmRlcjogIDFweCBzb2xpZCAjYWFhO1xcbiAgY29udGVudDogJyc7XFxuICBmbG9hdDogcmlnaHQ7XFxuICBtYXJnaW4tcmlnaHQ6IC0xZW07XFxuICBtYXJnaW4tdG9wOiAtMXB4O1xcbiAgaGVpZ2h0OiAwLjllbTtcXG4gIHdpZHRoOiAwLjllbTtcXG59XCIpO1xuXG5cbmRhdC5jb250cm9sbGVycy5GdW5jdGlvbkNvbnRyb2xsZXIgPSAoZnVuY3Rpb24gKENvbnRyb2xsZXIsIGRvbSwgY29tbW9uKSB7XG5cbiAgLyoqXG4gICAqIEBjbGFzcyBQcm92aWRlcyBhIEdVSSBpbnRlcmZhY2UgdG8gZmlyZSBhIHNwZWNpZmllZCBtZXRob2QsIGEgcHJvcGVydHkgb2YgYW4gb2JqZWN0LlxuICAgKlxuICAgKiBAZXh0ZW5kcyBkYXQuY29udHJvbGxlcnMuQ29udHJvbGxlclxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gYmUgbWFuaXB1bGF0ZWRcbiAgICogQHBhcmFtIHtzdHJpbmd9IHByb3BlcnR5IFRoZSBuYW1lIG9mIHRoZSBwcm9wZXJ0eSB0byBiZSBtYW5pcHVsYXRlZFxuICAgKlxuICAgKiBAbWVtYmVyIGRhdC5jb250cm9sbGVyc1xuICAgKi9cbiAgdmFyIEZ1bmN0aW9uQ29udHJvbGxlciA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHksIHRleHQpIHtcblxuICAgIEZ1bmN0aW9uQ29udHJvbGxlci5zdXBlcmNsYXNzLmNhbGwodGhpcywgb2JqZWN0LCBwcm9wZXJ0eSk7XG5cbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgdGhpcy5fX2J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMuX19idXR0b24uaW5uZXJIVE1MID0gdGV4dCA9PT0gdW5kZWZpbmVkID8gJ0ZpcmUnIDogdGV4dDtcbiAgICBkb20uYmluZCh0aGlzLl9fYnV0dG9uLCAnY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBfdGhpcy5maXJlKCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG5cbiAgICBkb20uYWRkQ2xhc3ModGhpcy5fX2J1dHRvbiwgJ2J1dHRvbicpO1xuXG4gICAgdGhpcy5kb21FbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuX19idXR0b24pO1xuXG5cbiAgfTtcblxuICBGdW5jdGlvbkNvbnRyb2xsZXIuc3VwZXJjbGFzcyA9IENvbnRyb2xsZXI7XG5cbiAgY29tbW9uLmV4dGVuZChcblxuICAgICAgRnVuY3Rpb25Db250cm9sbGVyLnByb3RvdHlwZSxcbiAgICAgIENvbnRyb2xsZXIucHJvdG90eXBlLFxuICAgICAge1xuICAgICAgICBcbiAgICAgICAgZmlyZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYgKHRoaXMuX19vbkNoYW5nZSkge1xuICAgICAgICAgICAgdGhpcy5fX29uQ2hhbmdlLmNhbGwodGhpcyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICh0aGlzLl9fb25GaW5pc2hDaGFuZ2UpIHtcbiAgICAgICAgICAgIHRoaXMuX19vbkZpbmlzaENoYW5nZS5jYWxsKHRoaXMsIHRoaXMuZ2V0VmFsdWUoKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuZ2V0VmFsdWUoKS5jYWxsKHRoaXMub2JqZWN0KTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICk7XG5cbiAgcmV0dXJuIEZ1bmN0aW9uQ29udHJvbGxlcjtcblxufSkoZGF0LmNvbnRyb2xsZXJzLkNvbnRyb2xsZXIsXG5kYXQuZG9tLmRvbSxcbmRhdC51dGlscy5jb21tb24pO1xuXG5cbmRhdC5jb250cm9sbGVycy5Cb29sZWFuQ29udHJvbGxlciA9IChmdW5jdGlvbiAoQ29udHJvbGxlciwgZG9tLCBjb21tb24pIHtcblxuICAvKipcbiAgICogQGNsYXNzIFByb3ZpZGVzIGEgY2hlY2tib3ggaW5wdXQgdG8gYWx0ZXIgdGhlIGJvb2xlYW4gcHJvcGVydHkgb2YgYW4gb2JqZWN0LlxuICAgKiBAZXh0ZW5kcyBkYXQuY29udHJvbGxlcnMuQ29udHJvbGxlclxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gYmUgbWFuaXB1bGF0ZWRcbiAgICogQHBhcmFtIHtzdHJpbmd9IHByb3BlcnR5IFRoZSBuYW1lIG9mIHRoZSBwcm9wZXJ0eSB0byBiZSBtYW5pcHVsYXRlZFxuICAgKlxuICAgKiBAbWVtYmVyIGRhdC5jb250cm9sbGVyc1xuICAgKi9cbiAgdmFyIEJvb2xlYW5Db250cm9sbGVyID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkge1xuXG4gICAgQm9vbGVhbkNvbnRyb2xsZXIuc3VwZXJjbGFzcy5jYWxsKHRoaXMsIG9iamVjdCwgcHJvcGVydHkpO1xuXG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICB0aGlzLl9fcHJldiA9IHRoaXMuZ2V0VmFsdWUoKTtcblxuICAgIHRoaXMuX19jaGVja2JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgdGhpcy5fX2NoZWNrYm94LnNldEF0dHJpYnV0ZSgndHlwZScsICdjaGVja2JveCcpO1xuXG5cbiAgICBkb20uYmluZCh0aGlzLl9fY2hlY2tib3gsICdjaGFuZ2UnLCBvbkNoYW5nZSwgZmFsc2UpO1xuXG4gICAgdGhpcy5kb21FbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuX19jaGVja2JveCk7XG5cbiAgICAvLyBNYXRjaCBvcmlnaW5hbCB2YWx1ZVxuICAgIHRoaXMudXBkYXRlRGlzcGxheSgpO1xuXG4gICAgZnVuY3Rpb24gb25DaGFuZ2UoKSB7XG4gICAgICBfdGhpcy5zZXRWYWx1ZSghX3RoaXMuX19wcmV2KTtcbiAgICB9XG5cbiAgfTtcblxuICBCb29sZWFuQ29udHJvbGxlci5zdXBlcmNsYXNzID0gQ29udHJvbGxlcjtcblxuICBjb21tb24uZXh0ZW5kKFxuXG4gICAgICBCb29sZWFuQ29udHJvbGxlci5wcm90b3R5cGUsXG4gICAgICBDb250cm9sbGVyLnByb3RvdHlwZSxcblxuICAgICAge1xuXG4gICAgICAgIHNldFZhbHVlOiBmdW5jdGlvbih2KSB7XG4gICAgICAgICAgdmFyIHRvUmV0dXJuID0gQm9vbGVhbkNvbnRyb2xsZXIuc3VwZXJjbGFzcy5wcm90b3R5cGUuc2V0VmFsdWUuY2FsbCh0aGlzLCB2KTtcbiAgICAgICAgICBpZiAodGhpcy5fX29uRmluaXNoQ2hhbmdlKSB7XG4gICAgICAgICAgICB0aGlzLl9fb25GaW5pc2hDaGFuZ2UuY2FsbCh0aGlzLCB0aGlzLmdldFZhbHVlKCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLl9fcHJldiA9IHRoaXMuZ2V0VmFsdWUoKTtcbiAgICAgICAgICByZXR1cm4gdG9SZXR1cm47XG4gICAgICAgIH0sXG5cbiAgICAgICAgdXBkYXRlRGlzcGxheTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgXG4gICAgICAgICAgaWYgKHRoaXMuZ2V0VmFsdWUoKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgdGhpcy5fX2NoZWNrYm94LnNldEF0dHJpYnV0ZSgnY2hlY2tlZCcsICdjaGVja2VkJyk7XG4gICAgICAgICAgICB0aGlzLl9fY2hlY2tib3guY2hlY2tlZCA9IHRydWU7ICAgIFxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMuX19jaGVja2JveC5jaGVja2VkID0gZmFsc2U7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIEJvb2xlYW5Db250cm9sbGVyLnN1cGVyY2xhc3MucHJvdG90eXBlLnVwZGF0ZURpc3BsYXkuY2FsbCh0aGlzKTtcblxuICAgICAgICB9XG5cblxuICAgICAgfVxuXG4gICk7XG5cbiAgcmV0dXJuIEJvb2xlYW5Db250cm9sbGVyO1xuXG59KShkYXQuY29udHJvbGxlcnMuQ29udHJvbGxlcixcbmRhdC5kb20uZG9tLFxuZGF0LnV0aWxzLmNvbW1vbik7XG5cblxuZGF0LmNvbG9yLnRvU3RyaW5nID0gKGZ1bmN0aW9uIChjb21tb24pIHtcblxuICByZXR1cm4gZnVuY3Rpb24oY29sb3IpIHtcblxuICAgIGlmIChjb2xvci5hID09IDEgfHwgY29tbW9uLmlzVW5kZWZpbmVkKGNvbG9yLmEpKSB7XG5cbiAgICAgIHZhciBzID0gY29sb3IuaGV4LnRvU3RyaW5nKDE2KTtcbiAgICAgIHdoaWxlIChzLmxlbmd0aCA8IDYpIHtcbiAgICAgICAgcyA9ICcwJyArIHM7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAnIycgKyBzO1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgcmV0dXJuICdyZ2JhKCcgKyBNYXRoLnJvdW5kKGNvbG9yLnIpICsgJywnICsgTWF0aC5yb3VuZChjb2xvci5nKSArICcsJyArIE1hdGgucm91bmQoY29sb3IuYikgKyAnLCcgKyBjb2xvci5hICsgJyknO1xuXG4gICAgfVxuXG4gIH1cblxufSkoZGF0LnV0aWxzLmNvbW1vbik7XG5cblxuZGF0LmNvbG9yLmludGVycHJldCA9IChmdW5jdGlvbiAodG9TdHJpbmcsIGNvbW1vbikge1xuXG4gIHZhciByZXN1bHQsIHRvUmV0dXJuO1xuXG4gIHZhciBpbnRlcnByZXQgPSBmdW5jdGlvbigpIHtcblxuICAgIHRvUmV0dXJuID0gZmFsc2U7XG5cbiAgICB2YXIgb3JpZ2luYWwgPSBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGNvbW1vbi50b0FycmF5KGFyZ3VtZW50cykgOiBhcmd1bWVudHNbMF07XG5cbiAgICBjb21tb24uZWFjaChJTlRFUlBSRVRBVElPTlMsIGZ1bmN0aW9uKGZhbWlseSkge1xuXG4gICAgICBpZiAoZmFtaWx5LmxpdG11cyhvcmlnaW5hbCkpIHtcblxuICAgICAgICBjb21tb24uZWFjaChmYW1pbHkuY29udmVyc2lvbnMsIGZ1bmN0aW9uKGNvbnZlcnNpb24sIGNvbnZlcnNpb25OYW1lKSB7XG5cbiAgICAgICAgICByZXN1bHQgPSBjb252ZXJzaW9uLnJlYWQob3JpZ2luYWwpO1xuXG4gICAgICAgICAgaWYgKHRvUmV0dXJuID09PSBmYWxzZSAmJiByZXN1bHQgIT09IGZhbHNlKSB7XG4gICAgICAgICAgICB0b1JldHVybiA9IHJlc3VsdDtcbiAgICAgICAgICAgIHJlc3VsdC5jb252ZXJzaW9uTmFtZSA9IGNvbnZlcnNpb25OYW1lO1xuICAgICAgICAgICAgcmVzdWx0LmNvbnZlcnNpb24gPSBjb252ZXJzaW9uO1xuICAgICAgICAgICAgcmV0dXJuIGNvbW1vbi5CUkVBSztcblxuICAgICAgICAgIH1cblxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gY29tbW9uLkJSRUFLO1xuXG4gICAgICB9XG5cbiAgICB9KTtcblxuICAgIHJldHVybiB0b1JldHVybjtcblxuICB9O1xuXG4gIHZhciBJTlRFUlBSRVRBVElPTlMgPSBbXG5cbiAgICAvLyBTdHJpbmdzXG4gICAge1xuXG4gICAgICBsaXRtdXM6IGNvbW1vbi5pc1N0cmluZyxcblxuICAgICAgY29udmVyc2lvbnM6IHtcblxuICAgICAgICBUSFJFRV9DSEFSX0hFWDoge1xuXG4gICAgICAgICAgcmVhZDogZnVuY3Rpb24ob3JpZ2luYWwpIHtcblxuICAgICAgICAgICAgdmFyIHRlc3QgPSBvcmlnaW5hbC5tYXRjaCgvXiMoW0EtRjAtOV0pKFtBLUYwLTldKShbQS1GMC05XSkkL2kpO1xuICAgICAgICAgICAgaWYgKHRlc3QgPT09IG51bGwpIHJldHVybiBmYWxzZTtcblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgc3BhY2U6ICdIRVgnLFxuICAgICAgICAgICAgICBoZXg6IHBhcnNlSW50KFxuICAgICAgICAgICAgICAgICAgJzB4JyArXG4gICAgICAgICAgICAgICAgICAgICAgdGVzdFsxXS50b1N0cmluZygpICsgdGVzdFsxXS50b1N0cmluZygpICtcbiAgICAgICAgICAgICAgICAgICAgICB0ZXN0WzJdLnRvU3RyaW5nKCkgKyB0ZXN0WzJdLnRvU3RyaW5nKCkgK1xuICAgICAgICAgICAgICAgICAgICAgIHRlc3RbM10udG9TdHJpbmcoKSArIHRlc3RbM10udG9TdHJpbmcoKSlcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgd3JpdGU6IHRvU3RyaW5nXG5cbiAgICAgICAgfSxcblxuICAgICAgICBTSVhfQ0hBUl9IRVg6IHtcblxuICAgICAgICAgIHJlYWQ6IGZ1bmN0aW9uKG9yaWdpbmFsKSB7XG5cbiAgICAgICAgICAgIHZhciB0ZXN0ID0gb3JpZ2luYWwubWF0Y2goL14jKFtBLUYwLTldezZ9KSQvaSk7XG4gICAgICAgICAgICBpZiAodGVzdCA9PT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBzcGFjZTogJ0hFWCcsXG4gICAgICAgICAgICAgIGhleDogcGFyc2VJbnQoJzB4JyArIHRlc3RbMV0udG9TdHJpbmcoKSlcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgd3JpdGU6IHRvU3RyaW5nXG5cbiAgICAgICAgfSxcblxuICAgICAgICBDU1NfUkdCOiB7XG5cbiAgICAgICAgICByZWFkOiBmdW5jdGlvbihvcmlnaW5hbCkge1xuXG4gICAgICAgICAgICB2YXIgdGVzdCA9IG9yaWdpbmFsLm1hdGNoKC9ecmdiXFwoXFxzKiguKylcXHMqLFxccyooLispXFxzKixcXHMqKC4rKVxccypcXCkvKTtcbiAgICAgICAgICAgIGlmICh0ZXN0ID09PSBudWxsKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIHNwYWNlOiAnUkdCJyxcbiAgICAgICAgICAgICAgcjogcGFyc2VGbG9hdCh0ZXN0WzFdKSxcbiAgICAgICAgICAgICAgZzogcGFyc2VGbG9hdCh0ZXN0WzJdKSxcbiAgICAgICAgICAgICAgYjogcGFyc2VGbG9hdCh0ZXN0WzNdKVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgIH0sXG5cbiAgICAgICAgICB3cml0ZTogdG9TdHJpbmdcblxuICAgICAgICB9LFxuXG4gICAgICAgIENTU19SR0JBOiB7XG5cbiAgICAgICAgICByZWFkOiBmdW5jdGlvbihvcmlnaW5hbCkge1xuXG4gICAgICAgICAgICB2YXIgdGVzdCA9IG9yaWdpbmFsLm1hdGNoKC9ecmdiYVxcKFxccyooLispXFxzKixcXHMqKC4rKVxccyosXFxzKiguKylcXHMqXFwsXFxzKiguKylcXHMqXFwpLyk7XG4gICAgICAgICAgICBpZiAodGVzdCA9PT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBzcGFjZTogJ1JHQicsXG4gICAgICAgICAgICAgIHI6IHBhcnNlRmxvYXQodGVzdFsxXSksXG4gICAgICAgICAgICAgIGc6IHBhcnNlRmxvYXQodGVzdFsyXSksXG4gICAgICAgICAgICAgIGI6IHBhcnNlRmxvYXQodGVzdFszXSksXG4gICAgICAgICAgICAgIGE6IHBhcnNlRmxvYXQodGVzdFs0XSlcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgd3JpdGU6IHRvU3RyaW5nXG5cbiAgICAgICAgfVxuXG4gICAgICB9XG5cbiAgICB9LFxuXG4gICAgLy8gTnVtYmVyc1xuICAgIHtcblxuICAgICAgbGl0bXVzOiBjb21tb24uaXNOdW1iZXIsXG5cbiAgICAgIGNvbnZlcnNpb25zOiB7XG5cbiAgICAgICAgSEVYOiB7XG4gICAgICAgICAgcmVhZDogZnVuY3Rpb24ob3JpZ2luYWwpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIHNwYWNlOiAnSEVYJyxcbiAgICAgICAgICAgICAgaGV4OiBvcmlnaW5hbCxcbiAgICAgICAgICAgICAgY29udmVyc2lvbk5hbWU6ICdIRVgnXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIHdyaXRlOiBmdW5jdGlvbihjb2xvcikge1xuICAgICAgICAgICAgcmV0dXJuIGNvbG9yLmhleDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgfVxuXG4gICAgfSxcblxuICAgIC8vIEFycmF5c1xuICAgIHtcblxuICAgICAgbGl0bXVzOiBjb21tb24uaXNBcnJheSxcblxuICAgICAgY29udmVyc2lvbnM6IHtcblxuICAgICAgICBSR0JfQVJSQVk6IHtcbiAgICAgICAgICByZWFkOiBmdW5jdGlvbihvcmlnaW5hbCkge1xuICAgICAgICAgICAgaWYgKG9yaWdpbmFsLmxlbmd0aCAhPSAzKSByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBzcGFjZTogJ1JHQicsXG4gICAgICAgICAgICAgIHI6IG9yaWdpbmFsWzBdLFxuICAgICAgICAgICAgICBnOiBvcmlnaW5hbFsxXSxcbiAgICAgICAgICAgICAgYjogb3JpZ2luYWxbMl1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIHdyaXRlOiBmdW5jdGlvbihjb2xvcikge1xuICAgICAgICAgICAgcmV0dXJuIFtjb2xvci5yLCBjb2xvci5nLCBjb2xvci5iXTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgfSxcblxuICAgICAgICBSR0JBX0FSUkFZOiB7XG4gICAgICAgICAgcmVhZDogZnVuY3Rpb24ob3JpZ2luYWwpIHtcbiAgICAgICAgICAgIGlmIChvcmlnaW5hbC5sZW5ndGggIT0gNCkgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgc3BhY2U6ICdSR0InLFxuICAgICAgICAgICAgICByOiBvcmlnaW5hbFswXSxcbiAgICAgICAgICAgICAgZzogb3JpZ2luYWxbMV0sXG4gICAgICAgICAgICAgIGI6IG9yaWdpbmFsWzJdLFxuICAgICAgICAgICAgICBhOiBvcmlnaW5hbFszXVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgd3JpdGU6IGZ1bmN0aW9uKGNvbG9yKSB7XG4gICAgICAgICAgICByZXR1cm4gW2NvbG9yLnIsIGNvbG9yLmcsIGNvbG9yLmIsIGNvbG9yLmFdO1xuICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgIH1cblxuICAgIH0sXG5cbiAgICAvLyBPYmplY3RzXG4gICAge1xuXG4gICAgICBsaXRtdXM6IGNvbW1vbi5pc09iamVjdCxcblxuICAgICAgY29udmVyc2lvbnM6IHtcblxuICAgICAgICBSR0JBX09CSjoge1xuICAgICAgICAgIHJlYWQ6IGZ1bmN0aW9uKG9yaWdpbmFsKSB7XG4gICAgICAgICAgICBpZiAoY29tbW9uLmlzTnVtYmVyKG9yaWdpbmFsLnIpICYmXG4gICAgICAgICAgICAgICAgY29tbW9uLmlzTnVtYmVyKG9yaWdpbmFsLmcpICYmXG4gICAgICAgICAgICAgICAgY29tbW9uLmlzTnVtYmVyKG9yaWdpbmFsLmIpICYmXG4gICAgICAgICAgICAgICAgY29tbW9uLmlzTnVtYmVyKG9yaWdpbmFsLmEpKSB7XG4gICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgc3BhY2U6ICdSR0InLFxuICAgICAgICAgICAgICAgIHI6IG9yaWdpbmFsLnIsXG4gICAgICAgICAgICAgICAgZzogb3JpZ2luYWwuZyxcbiAgICAgICAgICAgICAgICBiOiBvcmlnaW5hbC5iLFxuICAgICAgICAgICAgICAgIGE6IG9yaWdpbmFsLmFcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH0sXG5cbiAgICAgICAgICB3cml0ZTogZnVuY3Rpb24oY29sb3IpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIHI6IGNvbG9yLnIsXG4gICAgICAgICAgICAgIGc6IGNvbG9yLmcsXG4gICAgICAgICAgICAgIGI6IGNvbG9yLmIsXG4gICAgICAgICAgICAgIGE6IGNvbG9yLmFcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgUkdCX09CSjoge1xuICAgICAgICAgIHJlYWQ6IGZ1bmN0aW9uKG9yaWdpbmFsKSB7XG4gICAgICAgICAgICBpZiAoY29tbW9uLmlzTnVtYmVyKG9yaWdpbmFsLnIpICYmXG4gICAgICAgICAgICAgICAgY29tbW9uLmlzTnVtYmVyKG9yaWdpbmFsLmcpICYmXG4gICAgICAgICAgICAgICAgY29tbW9uLmlzTnVtYmVyKG9yaWdpbmFsLmIpKSB7XG4gICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgc3BhY2U6ICdSR0InLFxuICAgICAgICAgICAgICAgIHI6IG9yaWdpbmFsLnIsXG4gICAgICAgICAgICAgICAgZzogb3JpZ2luYWwuZyxcbiAgICAgICAgICAgICAgICBiOiBvcmlnaW5hbC5iXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgd3JpdGU6IGZ1bmN0aW9uKGNvbG9yKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICByOiBjb2xvci5yLFxuICAgICAgICAgICAgICBnOiBjb2xvci5nLFxuICAgICAgICAgICAgICBiOiBjb2xvci5iXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIEhTVkFfT0JKOiB7XG4gICAgICAgICAgcmVhZDogZnVuY3Rpb24ob3JpZ2luYWwpIHtcbiAgICAgICAgICAgIGlmIChjb21tb24uaXNOdW1iZXIob3JpZ2luYWwuaCkgJiZcbiAgICAgICAgICAgICAgICBjb21tb24uaXNOdW1iZXIob3JpZ2luYWwucykgJiZcbiAgICAgICAgICAgICAgICBjb21tb24uaXNOdW1iZXIob3JpZ2luYWwudikgJiZcbiAgICAgICAgICAgICAgICBjb21tb24uaXNOdW1iZXIob3JpZ2luYWwuYSkpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBzcGFjZTogJ0hTVicsXG4gICAgICAgICAgICAgICAgaDogb3JpZ2luYWwuaCxcbiAgICAgICAgICAgICAgICBzOiBvcmlnaW5hbC5zLFxuICAgICAgICAgICAgICAgIHY6IG9yaWdpbmFsLnYsXG4gICAgICAgICAgICAgICAgYTogb3JpZ2luYWwuYVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIHdyaXRlOiBmdW5jdGlvbihjb2xvcikge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgaDogY29sb3IuaCxcbiAgICAgICAgICAgICAgczogY29sb3IucyxcbiAgICAgICAgICAgICAgdjogY29sb3IudixcbiAgICAgICAgICAgICAgYTogY29sb3IuYVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBIU1ZfT0JKOiB7XG4gICAgICAgICAgcmVhZDogZnVuY3Rpb24ob3JpZ2luYWwpIHtcbiAgICAgICAgICAgIGlmIChjb21tb24uaXNOdW1iZXIob3JpZ2luYWwuaCkgJiZcbiAgICAgICAgICAgICAgICBjb21tb24uaXNOdW1iZXIob3JpZ2luYWwucykgJiZcbiAgICAgICAgICAgICAgICBjb21tb24uaXNOdW1iZXIob3JpZ2luYWwudikpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBzcGFjZTogJ0hTVicsXG4gICAgICAgICAgICAgICAgaDogb3JpZ2luYWwuaCxcbiAgICAgICAgICAgICAgICBzOiBvcmlnaW5hbC5zLFxuICAgICAgICAgICAgICAgIHY6IG9yaWdpbmFsLnZcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH0sXG5cbiAgICAgICAgICB3cml0ZTogZnVuY3Rpb24oY29sb3IpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIGg6IGNvbG9yLmgsXG4gICAgICAgICAgICAgIHM6IGNvbG9yLnMsXG4gICAgICAgICAgICAgIHY6IGNvbG9yLnZcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICB9XG5cbiAgICB9XG5cblxuICBdO1xuXG4gIHJldHVybiBpbnRlcnByZXQ7XG5cblxufSkoZGF0LmNvbG9yLnRvU3RyaW5nLFxuZGF0LnV0aWxzLmNvbW1vbik7XG5cblxuZGF0LkdVSSA9IGRhdC5ndWkuR1VJID0gKGZ1bmN0aW9uIChjc3MsIHNhdmVEaWFsb2d1ZUNvbnRlbnRzLCBzdHlsZVNoZWV0LCBjb250cm9sbGVyRmFjdG9yeSwgQ29udHJvbGxlciwgQm9vbGVhbkNvbnRyb2xsZXIsIEZ1bmN0aW9uQ29udHJvbGxlciwgTnVtYmVyQ29udHJvbGxlckJveCwgTnVtYmVyQ29udHJvbGxlclNsaWRlciwgT3B0aW9uQ29udHJvbGxlciwgQ29sb3JDb250cm9sbGVyLCByZXF1ZXN0QW5pbWF0aW9uRnJhbWUsIENlbnRlcmVkRGl2LCBkb20sIGNvbW1vbikge1xuXG4gIGNzcy5pbmplY3Qoc3R5bGVTaGVldCk7XG5cbiAgLyoqIE91dGVyLW1vc3QgY2xhc3NOYW1lIGZvciBHVUkncyAqL1xuICB2YXIgQ1NTX05BTUVTUEFDRSA9ICdkZyc7XG5cbiAgdmFyIEhJREVfS0VZX0NPREUgPSA3MjtcblxuICAvKiogVGhlIG9ubHkgdmFsdWUgc2hhcmVkIGJldHdlZW4gdGhlIEpTIGFuZCBTQ1NTLiBVc2UgY2F1dGlvbi4gKi9cbiAgdmFyIENMT1NFX0JVVFRPTl9IRUlHSFQgPSAyMDtcblxuICB2YXIgREVGQVVMVF9ERUZBVUxUX1BSRVNFVF9OQU1FID0gJ0RlZmF1bHQnO1xuXG4gIHZhciBTVVBQT1JUU19MT0NBTF9TVE9SQUdFID0gKGZ1bmN0aW9uKCkge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gJ2xvY2FsU3RvcmFnZScgaW4gd2luZG93ICYmIHdpbmRvd1snbG9jYWxTdG9yYWdlJ10gIT09IG51bGw7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfSkoKTtcblxuICB2YXIgU0FWRV9ESUFMT0dVRTtcblxuICAvKiogSGF2ZSB3ZSB5ZXQgdG8gY3JlYXRlIGFuIGF1dG9QbGFjZSBHVUk/ICovXG4gIHZhciBhdXRvX3BsYWNlX3ZpcmdpbiA9IHRydWU7XG5cbiAgLyoqIEZpeGVkIHBvc2l0aW9uIGRpdiB0aGF0IGF1dG8gcGxhY2UgR1VJJ3MgZ28gaW5zaWRlICovXG4gIHZhciBhdXRvX3BsYWNlX2NvbnRhaW5lcjtcblxuICAvKiogQXJlIHdlIGhpZGluZyB0aGUgR1VJJ3MgPyAqL1xuICB2YXIgaGlkZSA9IGZhbHNlO1xuXG4gIC8qKiBHVUkncyB3aGljaCBzaG91bGQgYmUgaGlkZGVuICovXG4gIHZhciBoaWRlYWJsZV9ndWlzID0gW107XG5cbiAgLyoqXG4gICAqIEEgbGlnaHR3ZWlnaHQgY29udHJvbGxlciBsaWJyYXJ5IGZvciBKYXZhU2NyaXB0LiBJdCBhbGxvd3MgeW91IHRvIGVhc2lseVxuICAgKiBtYW5pcHVsYXRlIHZhcmlhYmxlcyBhbmQgZmlyZSBmdW5jdGlvbnMgb24gdGhlIGZseS5cbiAgICogQGNsYXNzXG4gICAqXG4gICAqIEBtZW1iZXIgZGF0Lmd1aVxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc11cbiAgICogQHBhcmFtIHtTdHJpbmd9IFtwYXJhbXMubmFtZV0gVGhlIG5hbWUgb2YgdGhpcyBHVUkuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zLmxvYWRdIEpTT04gb2JqZWN0IHJlcHJlc2VudGluZyB0aGUgc2F2ZWQgc3RhdGUgb2ZcbiAgICogdGhpcyBHVUkuXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gW3BhcmFtcy5hdXRvPXRydWVdXG4gICAqIEBwYXJhbSB7ZGF0Lmd1aS5HVUl9IFtwYXJhbXMucGFyZW50XSBUaGUgR1VJIEknbSBuZXN0ZWQgaW4uXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gW3BhcmFtcy5jbG9zZWRdIElmIHRydWUsIHN0YXJ0cyBjbG9zZWRcbiAgICovXG4gIHZhciBHVUkgPSBmdW5jdGlvbihwYXJhbXMpIHtcblxuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAvKipcbiAgICAgKiBPdXRlcm1vc3QgRE9NIEVsZW1lbnRcbiAgICAgKiBAdHlwZSBET01FbGVtZW50XG4gICAgICovXG4gICAgdGhpcy5kb21FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5fX3VsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcbiAgICB0aGlzLmRvbUVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5fX3VsKTtcblxuICAgIGRvbS5hZGRDbGFzcyh0aGlzLmRvbUVsZW1lbnQsIENTU19OQU1FU1BBQ0UpO1xuXG4gICAgLyoqXG4gICAgICogTmVzdGVkIEdVSSdzIGJ5IG5hbWVcbiAgICAgKiBAaWdub3JlXG4gICAgICovXG4gICAgdGhpcy5fX2ZvbGRlcnMgPSB7fTtcblxuICAgIHRoaXMuX19jb250cm9sbGVycyA9IFtdO1xuXG4gICAgLyoqXG4gICAgICogTGlzdCBvZiBvYmplY3RzIEknbSByZW1lbWJlcmluZyBmb3Igc2F2ZSwgb25seSB1c2VkIGluIHRvcCBsZXZlbCBHVUlcbiAgICAgKiBAaWdub3JlXG4gICAgICovXG4gICAgdGhpcy5fX3JlbWVtYmVyZWRPYmplY3RzID0gW107XG5cbiAgICAvKipcbiAgICAgKiBNYXBzIHRoZSBpbmRleCBvZiByZW1lbWJlcmVkIG9iamVjdHMgdG8gYSBtYXAgb2YgY29udHJvbGxlcnMsIG9ubHkgdXNlZFxuICAgICAqIGluIHRvcCBsZXZlbCBHVUkuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBpZ25vcmVcbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogW1xuICAgICAqICB7XG4gICAgICogICAgcHJvcGVydHlOYW1lOiBDb250cm9sbGVyLFxuICAgICAqICAgIGFub3RoZXJQcm9wZXJ0eU5hbWU6IENvbnRyb2xsZXJcbiAgICAgKiAgfSxcbiAgICAgKiAge1xuICAgICAqICAgIHByb3BlcnR5TmFtZTogQ29udHJvbGxlclxuICAgICAqICB9XG4gICAgICogXVxuICAgICAqL1xuICAgIHRoaXMuX19yZW1lbWJlcmVkT2JqZWN0SW5kZWNlc1RvQ29udHJvbGxlcnMgPSBbXTtcblxuICAgIHRoaXMuX19saXN0ZW5pbmcgPSBbXTtcblxuICAgIHBhcmFtcyA9IHBhcmFtcyB8fCB7fTtcblxuICAgIC8vIERlZmF1bHQgcGFyYW1ldGVyc1xuICAgIHBhcmFtcyA9IGNvbW1vbi5kZWZhdWx0cyhwYXJhbXMsIHtcbiAgICAgIGF1dG9QbGFjZTogdHJ1ZSxcbiAgICAgIHdpZHRoOiBHVUkuREVGQVVMVF9XSURUSFxuICAgIH0pO1xuXG4gICAgcGFyYW1zID0gY29tbW9uLmRlZmF1bHRzKHBhcmFtcywge1xuICAgICAgcmVzaXphYmxlOiBwYXJhbXMuYXV0b1BsYWNlLFxuICAgICAgaGlkZWFibGU6IHBhcmFtcy5hdXRvUGxhY2VcbiAgICB9KTtcblxuXG4gICAgaWYgKCFjb21tb24uaXNVbmRlZmluZWQocGFyYW1zLmxvYWQpKSB7XG5cbiAgICAgIC8vIEV4cGxpY2l0IHByZXNldFxuICAgICAgaWYgKHBhcmFtcy5wcmVzZXQpIHBhcmFtcy5sb2FkLnByZXNldCA9IHBhcmFtcy5wcmVzZXQ7XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICBwYXJhbXMubG9hZCA9IHsgcHJlc2V0OiBERUZBVUxUX0RFRkFVTFRfUFJFU0VUX05BTUUgfTtcblxuICAgIH1cblxuICAgIGlmIChjb21tb24uaXNVbmRlZmluZWQocGFyYW1zLnBhcmVudCkgJiYgcGFyYW1zLmhpZGVhYmxlKSB7XG4gICAgICBoaWRlYWJsZV9ndWlzLnB1c2godGhpcyk7XG4gICAgfVxuXG4gICAgLy8gT25seSByb290IGxldmVsIEdVSSdzIGFyZSByZXNpemFibGUuXG4gICAgcGFyYW1zLnJlc2l6YWJsZSA9IGNvbW1vbi5pc1VuZGVmaW5lZChwYXJhbXMucGFyZW50KSAmJiBwYXJhbXMucmVzaXphYmxlO1xuXG5cbiAgICBpZiAocGFyYW1zLmF1dG9QbGFjZSAmJiBjb21tb24uaXNVbmRlZmluZWQocGFyYW1zLnNjcm9sbGFibGUpKSB7XG4gICAgICBwYXJhbXMuc2Nyb2xsYWJsZSA9IHRydWU7XG4gICAgfVxuLy8gICAgcGFyYW1zLnNjcm9sbGFibGUgPSBjb21tb24uaXNVbmRlZmluZWQocGFyYW1zLnBhcmVudCkgJiYgcGFyYW1zLnNjcm9sbGFibGUgPT09IHRydWU7XG5cbiAgICAvLyBOb3QgcGFydCBvZiBwYXJhbXMgYmVjYXVzZSBJIGRvbid0IHdhbnQgcGVvcGxlIHBhc3NpbmcgdGhpcyBpbiB2aWFcbiAgICAvLyBjb25zdHJ1Y3Rvci4gU2hvdWxkIGJlIGEgJ3JlbWVtYmVyZWQnIHZhbHVlLlxuICAgIHZhciB1c2VfbG9jYWxfc3RvcmFnZSA9XG4gICAgICAgIFNVUFBPUlRTX0xPQ0FMX1NUT1JBR0UgJiZcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5nZXRJdGVtKGdldExvY2FsU3RvcmFnZUhhc2godGhpcywgJ2lzTG9jYWwnKSkgPT09ICd0cnVlJztcblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHRoaXMsXG5cbiAgICAgICAgLyoqIEBsZW5kcyBkYXQuZ3VpLkdVSS5wcm90b3R5cGUgKi9cbiAgICAgICAge1xuXG4gICAgICAgICAgLyoqXG4gICAgICAgICAgICogVGhlIHBhcmVudCA8Y29kZT5HVUk8L2NvZGU+XG4gICAgICAgICAgICogQHR5cGUgZGF0Lmd1aS5HVUlcbiAgICAgICAgICAgKi9cbiAgICAgICAgICBwYXJlbnQ6IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHJldHVybiBwYXJhbXMucGFyZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG5cbiAgICAgICAgICBzY3JvbGxhYmxlOiB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICByZXR1cm4gcGFyYW1zLnNjcm9sbGFibGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIC8qKlxuICAgICAgICAgICAqIEhhbmRsZXMgPGNvZGU+R1VJPC9jb2RlPidzIGVsZW1lbnQgcGxhY2VtZW50IGZvciB5b3VcbiAgICAgICAgICAgKiBAdHlwZSBCb29sZWFuXG4gICAgICAgICAgICovXG4gICAgICAgICAgYXV0b1BsYWNlOiB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICByZXR1cm4gcGFyYW1zLmF1dG9QbGFjZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgLyoqXG4gICAgICAgICAgICogVGhlIGlkZW50aWZpZXIgZm9yIGEgc2V0IG9mIHNhdmVkIHZhbHVlc1xuICAgICAgICAgICAqIEB0eXBlIFN0cmluZ1xuICAgICAgICAgICAqL1xuICAgICAgICAgIHByZXNldDoge1xuXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICBpZiAoX3RoaXMucGFyZW50KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF90aGlzLmdldFJvb3QoKS5wcmVzZXQ7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhcmFtcy5sb2FkLnByZXNldDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2KSB7XG4gICAgICAgICAgICAgIGlmIChfdGhpcy5wYXJlbnQpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5nZXRSb290KCkucHJlc2V0ID0gdjtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBwYXJhbXMubG9hZC5wcmVzZXQgPSB2O1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHNldFByZXNldFNlbGVjdEluZGV4KHRoaXMpO1xuICAgICAgICAgICAgICBfdGhpcy5yZXZlcnQoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0sXG5cbiAgICAgICAgICAvKipcbiAgICAgICAgICAgKiBUaGUgd2lkdGggb2YgPGNvZGU+R1VJPC9jb2RlPiBlbGVtZW50XG4gICAgICAgICAgICogQHR5cGUgTnVtYmVyXG4gICAgICAgICAgICovXG4gICAgICAgICAgd2lkdGg6IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHJldHVybiBwYXJhbXMud2lkdGg7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2KSB7XG4gICAgICAgICAgICAgIHBhcmFtcy53aWR0aCA9IHY7XG4gICAgICAgICAgICAgIHNldFdpZHRoKF90aGlzLCB2KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgLyoqXG4gICAgICAgICAgICogVGhlIG5hbWUgb2YgPGNvZGU+R1VJPC9jb2RlPi4gVXNlZCBmb3IgZm9sZGVycy4gaS5lXG4gICAgICAgICAgICogYSBmb2xkZXIncyBuYW1lXG4gICAgICAgICAgICogQHR5cGUgU3RyaW5nXG4gICAgICAgICAgICovXG4gICAgICAgICAgbmFtZToge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHBhcmFtcy5uYW1lO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24odikge1xuICAgICAgICAgICAgICAvLyBUT0RPIENoZWNrIGZvciBjb2xsaXNpb25zIGFtb25nIHNpYmxpbmcgZm9sZGVyc1xuICAgICAgICAgICAgICBwYXJhbXMubmFtZSA9IHY7XG4gICAgICAgICAgICAgIGlmICh0aXRsZV9yb3dfbmFtZSkge1xuICAgICAgICAgICAgICAgIHRpdGxlX3Jvd19uYW1lLmlubmVySFRNTCA9IHBhcmFtcy5uYW1lO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIC8qKlxuICAgICAgICAgICAqIFdoZXRoZXIgdGhlIDxjb2RlPkdVSTwvY29kZT4gaXMgY29sbGFwc2VkIG9yIG5vdFxuICAgICAgICAgICAqIEB0eXBlIEJvb2xlYW5cbiAgICAgICAgICAgKi9cbiAgICAgICAgICBjbG9zZWQ6IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHJldHVybiBwYXJhbXMuY2xvc2VkO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24odikge1xuICAgICAgICAgICAgICBwYXJhbXMuY2xvc2VkID0gdjtcbiAgICAgICAgICAgICAgaWYgKHBhcmFtcy5jbG9zZWQpIHtcbiAgICAgICAgICAgICAgICBkb20uYWRkQ2xhc3MoX3RoaXMuX191bCwgR1VJLkNMQVNTX0NMT1NFRCk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZG9tLnJlbW92ZUNsYXNzKF90aGlzLl9fdWwsIEdVSS5DTEFTU19DTE9TRUQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIC8vIEZvciBicm93c2VycyB0aGF0IGFyZW4ndCBnb2luZyB0byByZXNwZWN0IHRoZSBDU1MgdHJhbnNpdGlvbixcbiAgICAgICAgICAgICAgLy8gTGV0cyBqdXN0IGNoZWNrIG91ciBoZWlnaHQgYWdhaW5zdCB0aGUgd2luZG93IGhlaWdodCByaWdodCBvZmZcbiAgICAgICAgICAgICAgLy8gdGhlIGJhdC5cbiAgICAgICAgICAgICAgdGhpcy5vblJlc2l6ZSgpO1xuXG4gICAgICAgICAgICAgIGlmIChfdGhpcy5fX2Nsb3NlQnV0dG9uKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuX19jbG9zZUJ1dHRvbi5pbm5lckhUTUwgPSB2ID8gR1VJLlRFWFRfT1BFTiA6IEdVSS5URVhUX0NMT1NFRDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG5cbiAgICAgICAgICAvKipcbiAgICAgICAgICAgKiBDb250YWlucyBhbGwgcHJlc2V0c1xuICAgICAgICAgICAqIEB0eXBlIE9iamVjdFxuICAgICAgICAgICAqL1xuICAgICAgICAgIGxvYWQ6IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHJldHVybiBwYXJhbXMubG9hZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgLyoqXG4gICAgICAgICAgICogRGV0ZXJtaW5lcyB3aGV0aGVyIG9yIG5vdCB0byB1c2UgPGEgaHJlZj1cImh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuL0RPTS9TdG9yYWdlI2xvY2FsU3RvcmFnZVwiPmxvY2FsU3RvcmFnZTwvYT4gYXMgdGhlIG1lYW5zIGZvclxuICAgICAgICAgICAqIDxjb2RlPnJlbWVtYmVyPC9jb2RlPmluZ1xuICAgICAgICAgICAqIEB0eXBlIEJvb2xlYW5cbiAgICAgICAgICAgKi9cbiAgICAgICAgICB1c2VMb2NhbFN0b3JhZ2U6IHtcblxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHVzZV9sb2NhbF9zdG9yYWdlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24oYm9vbCkge1xuICAgICAgICAgICAgICBpZiAoU1VQUE9SVFNfTE9DQUxfU1RPUkFHRSkge1xuICAgICAgICAgICAgICAgIHVzZV9sb2NhbF9zdG9yYWdlID0gYm9vbDtcbiAgICAgICAgICAgICAgICBpZiAoYm9vbCkge1xuICAgICAgICAgICAgICAgICAgZG9tLmJpbmQod2luZG93LCAndW5sb2FkJywgc2F2ZVRvTG9jYWxTdG9yYWdlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgZG9tLnVuYmluZCh3aW5kb3csICd1bmxvYWQnLCBzYXZlVG9Mb2NhbFN0b3JhZ2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShnZXRMb2NhbFN0b3JhZ2VIYXNoKF90aGlzLCAnaXNMb2NhbCcpLCBib29sKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfVxuXG4gICAgICAgIH0pO1xuXG4gICAgLy8gQXJlIHdlIGEgcm9vdCBsZXZlbCBHVUk/XG4gICAgaWYgKGNvbW1vbi5pc1VuZGVmaW5lZChwYXJhbXMucGFyZW50KSkge1xuXG4gICAgICBwYXJhbXMuY2xvc2VkID0gZmFsc2U7XG5cbiAgICAgIGRvbS5hZGRDbGFzcyh0aGlzLmRvbUVsZW1lbnQsIEdVSS5DTEFTU19NQUlOKTtcbiAgICAgIGRvbS5tYWtlU2VsZWN0YWJsZSh0aGlzLmRvbUVsZW1lbnQsIGZhbHNlKTtcblxuICAgICAgLy8gQXJlIHdlIHN1cHBvc2VkIHRvIGJlIGxvYWRpbmcgbG9jYWxseT9cbiAgICAgIGlmIChTVVBQT1JUU19MT0NBTF9TVE9SQUdFKSB7XG5cbiAgICAgICAgaWYgKHVzZV9sb2NhbF9zdG9yYWdlKSB7XG5cbiAgICAgICAgICBfdGhpcy51c2VMb2NhbFN0b3JhZ2UgPSB0cnVlO1xuXG4gICAgICAgICAgdmFyIHNhdmVkX2d1aSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGdldExvY2FsU3RvcmFnZUhhc2godGhpcywgJ2d1aScpKTtcblxuICAgICAgICAgIGlmIChzYXZlZF9ndWkpIHtcbiAgICAgICAgICAgIHBhcmFtcy5sb2FkID0gSlNPTi5wYXJzZShzYXZlZF9ndWkpO1xuICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgIH1cblxuICAgICAgdGhpcy5fX2Nsb3NlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICB0aGlzLl9fY2xvc2VCdXR0b24uaW5uZXJIVE1MID0gR1VJLlRFWFRfQ0xPU0VEO1xuICAgICAgZG9tLmFkZENsYXNzKHRoaXMuX19jbG9zZUJ1dHRvbiwgR1VJLkNMQVNTX0NMT1NFX0JVVFRPTik7XG4gICAgICB0aGlzLmRvbUVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5fX2Nsb3NlQnV0dG9uKTtcblxuICAgICAgZG9tLmJpbmQodGhpcy5fX2Nsb3NlQnV0dG9uLCAnY2xpY2snLCBmdW5jdGlvbigpIHtcblxuICAgICAgICBfdGhpcy5jbG9zZWQgPSAhX3RoaXMuY2xvc2VkO1xuXG5cbiAgICAgIH0pO1xuXG5cbiAgICAgIC8vIE9oLCB5b3UncmUgYSBuZXN0ZWQgR1VJIVxuICAgIH0gZWxzZSB7XG5cbiAgICAgIGlmIChwYXJhbXMuY2xvc2VkID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcGFyYW1zLmNsb3NlZCA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIHZhciB0aXRsZV9yb3dfbmFtZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHBhcmFtcy5uYW1lKTtcbiAgICAgIGRvbS5hZGRDbGFzcyh0aXRsZV9yb3dfbmFtZSwgJ2NvbnRyb2xsZXItbmFtZScpO1xuXG4gICAgICB2YXIgdGl0bGVfcm93ID0gYWRkUm93KF90aGlzLCB0aXRsZV9yb3dfbmFtZSk7XG5cbiAgICAgIHZhciBvbl9jbGlja190aXRsZSA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBfdGhpcy5jbG9zZWQgPSAhX3RoaXMuY2xvc2VkO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9O1xuXG4gICAgICBkb20uYWRkQ2xhc3ModGhpcy5fX3VsLCBHVUkuQ0xBU1NfQ0xPU0VEKTtcblxuICAgICAgZG9tLmFkZENsYXNzKHRpdGxlX3JvdywgJ3RpdGxlJyk7XG4gICAgICBkb20uYmluZCh0aXRsZV9yb3csICdjbGljaycsIG9uX2NsaWNrX3RpdGxlKTtcblxuICAgICAgaWYgKCFwYXJhbXMuY2xvc2VkKSB7XG4gICAgICAgIHRoaXMuY2xvc2VkID0gZmFsc2U7XG4gICAgICB9XG5cbiAgICB9XG5cbiAgICBpZiAocGFyYW1zLmF1dG9QbGFjZSkge1xuXG4gICAgICBpZiAoY29tbW9uLmlzVW5kZWZpbmVkKHBhcmFtcy5wYXJlbnQpKSB7XG5cbiAgICAgICAgaWYgKGF1dG9fcGxhY2VfdmlyZ2luKSB7XG4gICAgICAgICAgYXV0b19wbGFjZV9jb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICBkb20uYWRkQ2xhc3MoYXV0b19wbGFjZV9jb250YWluZXIsIENTU19OQU1FU1BBQ0UpO1xuICAgICAgICAgIGRvbS5hZGRDbGFzcyhhdXRvX3BsYWNlX2NvbnRhaW5lciwgR1VJLkNMQVNTX0FVVE9fUExBQ0VfQ09OVEFJTkVSKTtcbiAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGF1dG9fcGxhY2VfY29udGFpbmVyKTtcbiAgICAgICAgICBhdXRvX3BsYWNlX3ZpcmdpbiA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gUHV0IGl0IGluIHRoZSBkb20gZm9yIHlvdS5cbiAgICAgICAgYXV0b19wbGFjZV9jb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5kb21FbGVtZW50KTtcblxuICAgICAgICAvLyBBcHBseSB0aGUgYXV0byBzdHlsZXNcbiAgICAgICAgZG9tLmFkZENsYXNzKHRoaXMuZG9tRWxlbWVudCwgR1VJLkNMQVNTX0FVVE9fUExBQ0UpO1xuXG4gICAgICB9XG5cblxuICAgICAgLy8gTWFrZSBpdCBub3QgZWxhc3RpYy5cbiAgICAgIGlmICghdGhpcy5wYXJlbnQpIHNldFdpZHRoKF90aGlzLCBwYXJhbXMud2lkdGgpO1xuXG4gICAgfVxuXG4gICAgZG9tLmJpbmQod2luZG93LCAncmVzaXplJywgZnVuY3Rpb24oKSB7IF90aGlzLm9uUmVzaXplKCkgfSk7XG4gICAgZG9tLmJpbmQodGhpcy5fX3VsLCAnd2Via2l0VHJhbnNpdGlvbkVuZCcsIGZ1bmN0aW9uKCkgeyBfdGhpcy5vblJlc2l6ZSgpOyB9KTtcbiAgICBkb20uYmluZCh0aGlzLl9fdWwsICd0cmFuc2l0aW9uZW5kJywgZnVuY3Rpb24oKSB7IF90aGlzLm9uUmVzaXplKCkgfSk7XG4gICAgZG9tLmJpbmQodGhpcy5fX3VsLCAnb1RyYW5zaXRpb25FbmQnLCBmdW5jdGlvbigpIHsgX3RoaXMub25SZXNpemUoKSB9KTtcbiAgICB0aGlzLm9uUmVzaXplKCk7XG5cblxuICAgIGlmIChwYXJhbXMucmVzaXphYmxlKSB7XG4gICAgICBhZGRSZXNpemVIYW5kbGUodGhpcyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2F2ZVRvTG9jYWxTdG9yYWdlKCkge1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oZ2V0TG9jYWxTdG9yYWdlSGFzaChfdGhpcywgJ2d1aScpLCBKU09OLnN0cmluZ2lmeShfdGhpcy5nZXRTYXZlT2JqZWN0KCkpKTtcbiAgICB9XG5cbiAgICB2YXIgcm9vdCA9IF90aGlzLmdldFJvb3QoKTtcbiAgICBmdW5jdGlvbiByZXNldFdpZHRoKCkge1xuICAgICAgICB2YXIgcm9vdCA9IF90aGlzLmdldFJvb3QoKTtcbiAgICAgICAgcm9vdC53aWR0aCArPSAxO1xuICAgICAgICBjb21tb24uZGVmZXIoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcm9vdC53aWR0aCAtPSAxO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFwYXJhbXMucGFyZW50KSB7XG4gICAgICAgIHJlc2V0V2lkdGgoKTtcbiAgICAgIH1cblxuICB9O1xuXG4gIEdVSS50b2dnbGVIaWRlID0gZnVuY3Rpb24oKSB7XG5cbiAgICBoaWRlID0gIWhpZGU7XG4gICAgY29tbW9uLmVhY2goaGlkZWFibGVfZ3VpcywgZnVuY3Rpb24oZ3VpKSB7XG4gICAgICBndWkuZG9tRWxlbWVudC5zdHlsZS56SW5kZXggPSBoaWRlID8gLTk5OSA6IDk5OTtcbiAgICAgIGd1aS5kb21FbGVtZW50LnN0eWxlLm9wYWNpdHkgPSBoaWRlID8gMCA6IDE7XG4gICAgfSk7XG4gIH07XG5cbiAgR1VJLkNMQVNTX0FVVE9fUExBQ0UgPSAnYSc7XG4gIEdVSS5DTEFTU19BVVRPX1BMQUNFX0NPTlRBSU5FUiA9ICdhYyc7XG4gIEdVSS5DTEFTU19NQUlOID0gJ21haW4nO1xuICBHVUkuQ0xBU1NfQ09OVFJPTExFUl9ST1cgPSAnY3InO1xuICBHVUkuQ0xBU1NfVE9PX1RBTEwgPSAndGFsbGVyLXRoYW4td2luZG93JztcbiAgR1VJLkNMQVNTX0NMT1NFRCA9ICdjbG9zZWQnO1xuICBHVUkuQ0xBU1NfQ0xPU0VfQlVUVE9OID0gJ2Nsb3NlLWJ1dHRvbic7XG4gIEdVSS5DTEFTU19EUkFHID0gJ2RyYWcnO1xuXG4gIEdVSS5ERUZBVUxUX1dJRFRIID0gMjQ1O1xuICBHVUkuVEVYVF9DTE9TRUQgPSAnQ2xvc2UgQ29udHJvbHMnO1xuICBHVUkuVEVYVF9PUEVOID0gJ09wZW4gQ29udHJvbHMnO1xuXG4gIGRvbS5iaW5kKHdpbmRvdywgJ2tleWRvd24nLCBmdW5jdGlvbihlKSB7XG5cbiAgICBpZiAoZG9jdW1lbnQuYWN0aXZlRWxlbWVudC50eXBlICE9PSAndGV4dCcgJiZcbiAgICAgICAgKGUud2hpY2ggPT09IEhJREVfS0VZX0NPREUgfHwgZS5rZXlDb2RlID09IEhJREVfS0VZX0NPREUpKSB7XG4gICAgICBHVUkudG9nZ2xlSGlkZSgpO1xuICAgIH1cblxuICB9LCBmYWxzZSk7XG5cbiAgY29tbW9uLmV4dGVuZChcblxuICAgICAgR1VJLnByb3RvdHlwZSxcblxuICAgICAgLyoqIEBsZW5kcyBkYXQuZ3VpLkdVSSAqL1xuICAgICAge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcGFyYW0gb2JqZWN0XG4gICAgICAgICAqIEBwYXJhbSBwcm9wZXJ0eVxuICAgICAgICAgKiBAcmV0dXJucyB7ZGF0LmNvbnRyb2xsZXJzLkNvbnRyb2xsZXJ9IFRoZSBuZXcgY29udHJvbGxlciB0aGF0IHdhcyBhZGRlZC5cbiAgICAgICAgICogQGluc3RhbmNlXG4gICAgICAgICAqL1xuICAgICAgICBhZGQ6IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHtcblxuICAgICAgICAgIHJldHVybiBhZGQoXG4gICAgICAgICAgICAgIHRoaXMsXG4gICAgICAgICAgICAgIG9iamVjdCxcbiAgICAgICAgICAgICAgcHJvcGVydHksXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmYWN0b3J5QXJnczogQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAyKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgKTtcblxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcGFyYW0gb2JqZWN0XG4gICAgICAgICAqIEBwYXJhbSBwcm9wZXJ0eVxuICAgICAgICAgKiBAcmV0dXJucyB7ZGF0LmNvbnRyb2xsZXJzLkNvbG9yQ29udHJvbGxlcn0gVGhlIG5ldyBjb250cm9sbGVyIHRoYXQgd2FzIGFkZGVkLlxuICAgICAgICAgKiBAaW5zdGFuY2VcbiAgICAgICAgICovXG4gICAgICAgIGFkZENvbG9yOiBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7XG5cbiAgICAgICAgICByZXR1cm4gYWRkKFxuICAgICAgICAgICAgICB0aGlzLFxuICAgICAgICAgICAgICBvYmplY3QsXG4gICAgICAgICAgICAgIHByb3BlcnR5LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgY29sb3I6IHRydWVcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICk7XG5cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHBhcmFtIGNvbnRyb2xsZXJcbiAgICAgICAgICogQGluc3RhbmNlXG4gICAgICAgICAqL1xuICAgICAgICByZW1vdmU6IGZ1bmN0aW9uKGNvbnRyb2xsZXIpIHtcblxuICAgICAgICAgIC8vIFRPRE8gbGlzdGVuaW5nP1xuICAgICAgICAgIHRoaXMuX191bC5yZW1vdmVDaGlsZChjb250cm9sbGVyLl9fbGkpO1xuICAgICAgICAgIHRoaXMuX19jb250cm9sbGVycy5zbGljZSh0aGlzLl9fY29udHJvbGxlcnMuaW5kZXhPZihjb250cm9sbGVyKSwgMSk7XG4gICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgICBjb21tb24uZGVmZXIoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBfdGhpcy5vblJlc2l6ZSgpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0sXG5cbiAgICAgICAgZGVzdHJveTogZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICBpZiAodGhpcy5hdXRvUGxhY2UpIHtcbiAgICAgICAgICAgIGF1dG9fcGxhY2VfY29udGFpbmVyLnJlbW92ZUNoaWxkKHRoaXMuZG9tRWxlbWVudCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwYXJhbSBuYW1lXG4gICAgICAgICAqIEByZXR1cm5zIHtkYXQuZ3VpLkdVSX0gVGhlIG5ldyBmb2xkZXIuXG4gICAgICAgICAqIEB0aHJvd3Mge0Vycm9yfSBpZiB0aGlzIEdVSSBhbHJlYWR5IGhhcyBhIGZvbGRlciBieSB0aGUgc3BlY2lmaWVkXG4gICAgICAgICAqIG5hbWVcbiAgICAgICAgICogQGluc3RhbmNlXG4gICAgICAgICAqL1xuICAgICAgICBhZGRGb2xkZXI6IGZ1bmN0aW9uKG5hbWUpIHtcblxuICAgICAgICAgIC8vIFdlIGhhdmUgdG8gcHJldmVudCBjb2xsaXNpb25zIG9uIG5hbWVzIGluIG9yZGVyIHRvIGhhdmUgYSBrZXlcbiAgICAgICAgICAvLyBieSB3aGljaCB0byByZW1lbWJlciBzYXZlZCB2YWx1ZXNcbiAgICAgICAgICBpZiAodGhpcy5fX2ZvbGRlcnNbbmFtZV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdZb3UgYWxyZWFkeSBoYXZlIGEgZm9sZGVyIGluIHRoaXMgR1VJIGJ5IHRoZScgK1xuICAgICAgICAgICAgICAgICcgbmFtZSBcIicgKyBuYW1lICsgJ1wiJyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIG5ld19ndWlfcGFyYW1zID0geyBuYW1lOiBuYW1lLCBwYXJlbnQ6IHRoaXMgfTtcblxuICAgICAgICAgIC8vIFdlIG5lZWQgdG8gcGFzcyBkb3duIHRoZSBhdXRvUGxhY2UgdHJhaXQgc28gdGhhdCB3ZSBjYW5cbiAgICAgICAgICAvLyBhdHRhY2ggZXZlbnQgbGlzdGVuZXJzIHRvIG9wZW4vY2xvc2UgZm9sZGVyIGFjdGlvbnMgdG9cbiAgICAgICAgICAvLyBlbnN1cmUgdGhhdCBhIHNjcm9sbGJhciBhcHBlYXJzIGlmIHRoZSB3aW5kb3cgaXMgdG9vIHNob3J0LlxuICAgICAgICAgIG5ld19ndWlfcGFyYW1zLmF1dG9QbGFjZSA9IHRoaXMuYXV0b1BsYWNlO1xuXG4gICAgICAgICAgLy8gRG8gd2UgaGF2ZSBzYXZlZCBhcHBlYXJhbmNlIGRhdGEgZm9yIHRoaXMgZm9sZGVyP1xuXG4gICAgICAgICAgaWYgKHRoaXMubG9hZCAmJiAvLyBBbnl0aGluZyBsb2FkZWQ/XG4gICAgICAgICAgICAgIHRoaXMubG9hZC5mb2xkZXJzICYmIC8vIFdhcyBteSBwYXJlbnQgYSBkZWFkLWVuZD9cbiAgICAgICAgICAgICAgdGhpcy5sb2FkLmZvbGRlcnNbbmFtZV0pIHsgLy8gRGlkIGRhZGR5IHJlbWVtYmVyIG1lP1xuXG4gICAgICAgICAgICAvLyBTdGFydCBtZSBjbG9zZWQgaWYgSSB3YXMgY2xvc2VkXG4gICAgICAgICAgICBuZXdfZ3VpX3BhcmFtcy5jbG9zZWQgPSB0aGlzLmxvYWQuZm9sZGVyc1tuYW1lXS5jbG9zZWQ7XG5cbiAgICAgICAgICAgIC8vIFBhc3MgZG93biB0aGUgbG9hZGVkIGRhdGFcbiAgICAgICAgICAgIG5ld19ndWlfcGFyYW1zLmxvYWQgPSB0aGlzLmxvYWQuZm9sZGVyc1tuYW1lXTtcblxuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciBndWkgPSBuZXcgR1VJKG5ld19ndWlfcGFyYW1zKTtcbiAgICAgICAgICB0aGlzLl9fZm9sZGVyc1tuYW1lXSA9IGd1aTtcblxuICAgICAgICAgIHZhciBsaSA9IGFkZFJvdyh0aGlzLCBndWkuZG9tRWxlbWVudCk7XG4gICAgICAgICAgZG9tLmFkZENsYXNzKGxpLCAnZm9sZGVyJyk7XG4gICAgICAgICAgcmV0dXJuIGd1aTtcblxuICAgICAgICB9LFxuXG4gICAgICAgIG9wZW46IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHRoaXMuY2xvc2VkID0gZmFsc2U7XG4gICAgICAgIH0sXG5cbiAgICAgICAgY2xvc2U6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHRoaXMuY2xvc2VkID0gdHJ1ZTtcbiAgICAgICAgfSxcblxuICAgICAgICBvblJlc2l6ZTogZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICB2YXIgcm9vdCA9IHRoaXMuZ2V0Um9vdCgpO1xuXG4gICAgICAgICAgaWYgKHJvb3Quc2Nyb2xsYWJsZSkge1xuXG4gICAgICAgICAgICB2YXIgdG9wID0gZG9tLmdldE9mZnNldChyb290Ll9fdWwpLnRvcDtcbiAgICAgICAgICAgIHZhciBoID0gMDtcblxuICAgICAgICAgICAgY29tbW9uLmVhY2gocm9vdC5fX3VsLmNoaWxkTm9kZXMsIGZ1bmN0aW9uKG5vZGUpIHtcbiAgICAgICAgICAgICAgaWYgKCEgKHJvb3QuYXV0b1BsYWNlICYmIG5vZGUgPT09IHJvb3QuX19zYXZlX3JvdykpXG4gICAgICAgICAgICAgICAgaCArPSBkb20uZ2V0SGVpZ2h0KG5vZGUpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmICh3aW5kb3cuaW5uZXJIZWlnaHQgLSB0b3AgLSBDTE9TRV9CVVRUT05fSEVJR0hUIDwgaCkge1xuICAgICAgICAgICAgICBkb20uYWRkQ2xhc3Mocm9vdC5kb21FbGVtZW50LCBHVUkuQ0xBU1NfVE9PX1RBTEwpO1xuICAgICAgICAgICAgICByb290Ll9fdWwuc3R5bGUuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0IC0gdG9wIC0gQ0xPU0VfQlVUVE9OX0hFSUdIVCArICdweCc7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBkb20ucmVtb3ZlQ2xhc3Mocm9vdC5kb21FbGVtZW50LCBHVUkuQ0xBU1NfVE9PX1RBTEwpO1xuICAgICAgICAgICAgICByb290Ll9fdWwuc3R5bGUuaGVpZ2h0ID0gJ2F1dG8nO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHJvb3QuX19yZXNpemVfaGFuZGxlKSB7XG4gICAgICAgICAgICBjb21tb24uZGVmZXIoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHJvb3QuX19yZXNpemVfaGFuZGxlLnN0eWxlLmhlaWdodCA9IHJvb3QuX191bC5vZmZzZXRIZWlnaHQgKyAncHgnO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHJvb3QuX19jbG9zZUJ1dHRvbikge1xuICAgICAgICAgICAgcm9vdC5fX2Nsb3NlQnV0dG9uLnN0eWxlLndpZHRoID0gcm9vdC53aWR0aCArICdweCc7XG4gICAgICAgICAgfVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIE1hcmsgb2JqZWN0cyBmb3Igc2F2aW5nLiBUaGUgb3JkZXIgb2YgdGhlc2Ugb2JqZWN0cyBjYW5ub3QgY2hhbmdlIGFzXG4gICAgICAgICAqIHRoZSBHVUkgZ3Jvd3MuIFdoZW4gcmVtZW1iZXJpbmcgbmV3IG9iamVjdHMsIGFwcGVuZCB0aGVtIHRvIHRoZSBlbmRcbiAgICAgICAgICogb2YgdGhlIGxpc3QuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0Li4ufSBvYmplY3RzXG4gICAgICAgICAqIEB0aHJvd3Mge0Vycm9yfSBpZiBub3QgY2FsbGVkIG9uIGEgdG9wIGxldmVsIEdVSS5cbiAgICAgICAgICogQGluc3RhbmNlXG4gICAgICAgICAqL1xuICAgICAgICByZW1lbWJlcjogZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICBpZiAoY29tbW9uLmlzVW5kZWZpbmVkKFNBVkVfRElBTE9HVUUpKSB7XG4gICAgICAgICAgICBTQVZFX0RJQUxPR1VFID0gbmV3IENlbnRlcmVkRGl2KCk7XG4gICAgICAgICAgICBTQVZFX0RJQUxPR1VFLmRvbUVsZW1lbnQuaW5uZXJIVE1MID0gc2F2ZURpYWxvZ3VlQ29udGVudHM7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHRoaXMucGFyZW50KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJZb3UgY2FuIG9ubHkgY2FsbCByZW1lbWJlciBvbiBhIHRvcCBsZXZlbCBHVUkuXCIpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgICBjb21tb24uZWFjaChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpLCBmdW5jdGlvbihvYmplY3QpIHtcbiAgICAgICAgICAgIGlmIChfdGhpcy5fX3JlbWVtYmVyZWRPYmplY3RzLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICAgIGFkZFNhdmVNZW51KF90aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChfdGhpcy5fX3JlbWVtYmVyZWRPYmplY3RzLmluZGV4T2Yob2JqZWN0KSA9PSAtMSkge1xuICAgICAgICAgICAgICBfdGhpcy5fX3JlbWVtYmVyZWRPYmplY3RzLnB1c2gob2JqZWN0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGlmICh0aGlzLmF1dG9QbGFjZSkge1xuICAgICAgICAgICAgLy8gU2V0IHNhdmUgcm93IHdpZHRoXG4gICAgICAgICAgICBzZXRXaWR0aCh0aGlzLCB0aGlzLndpZHRoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHJldHVybnMge2RhdC5ndWkuR1VJfSB0aGUgdG9wbW9zdCBwYXJlbnQgR1VJIG9mIGEgbmVzdGVkIEdVSS5cbiAgICAgICAgICogQGluc3RhbmNlXG4gICAgICAgICAqL1xuICAgICAgICBnZXRSb290OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgZ3VpID0gdGhpcztcbiAgICAgICAgICB3aGlsZSAoZ3VpLnBhcmVudCkge1xuICAgICAgICAgICAgZ3VpID0gZ3VpLnBhcmVudDtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGd1aTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHJldHVybnMge09iamVjdH0gYSBKU09OIG9iamVjdCByZXByZXNlbnRpbmcgdGhlIGN1cnJlbnQgc3RhdGUgb2ZcbiAgICAgICAgICogdGhpcyBHVUkgYXMgd2VsbCBhcyBpdHMgcmVtZW1iZXJlZCBwcm9wZXJ0aWVzLlxuICAgICAgICAgKiBAaW5zdGFuY2VcbiAgICAgICAgICovXG4gICAgICAgIGdldFNhdmVPYmplY3Q6IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgdmFyIHRvUmV0dXJuID0gdGhpcy5sb2FkO1xuXG4gICAgICAgICAgdG9SZXR1cm4uY2xvc2VkID0gdGhpcy5jbG9zZWQ7XG5cbiAgICAgICAgICAvLyBBbSBJIHJlbWVtYmVyaW5nIGFueSB2YWx1ZXM/XG4gICAgICAgICAgaWYgKHRoaXMuX19yZW1lbWJlcmVkT2JqZWN0cy5sZW5ndGggPiAwKSB7XG5cbiAgICAgICAgICAgIHRvUmV0dXJuLnByZXNldCA9IHRoaXMucHJlc2V0O1xuXG4gICAgICAgICAgICBpZiAoIXRvUmV0dXJuLnJlbWVtYmVyZWQpIHtcbiAgICAgICAgICAgICAgdG9SZXR1cm4ucmVtZW1iZXJlZCA9IHt9O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0b1JldHVybi5yZW1lbWJlcmVkW3RoaXMucHJlc2V0XSA9IGdldEN1cnJlbnRQcmVzZXQodGhpcyk7XG5cbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0b1JldHVybi5mb2xkZXJzID0ge307XG4gICAgICAgICAgY29tbW9uLmVhY2godGhpcy5fX2ZvbGRlcnMsIGZ1bmN0aW9uKGVsZW1lbnQsIGtleSkge1xuICAgICAgICAgICAgdG9SZXR1cm4uZm9sZGVyc1trZXldID0gZWxlbWVudC5nZXRTYXZlT2JqZWN0KCk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICByZXR1cm4gdG9SZXR1cm47XG5cbiAgICAgICAgfSxcblxuICAgICAgICBzYXZlOiBmdW5jdGlvbigpIHtcblxuICAgICAgICAgIGlmICghdGhpcy5sb2FkLnJlbWVtYmVyZWQpIHtcbiAgICAgICAgICAgIHRoaXMubG9hZC5yZW1lbWJlcmVkID0ge307XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy5sb2FkLnJlbWVtYmVyZWRbdGhpcy5wcmVzZXRdID0gZ2V0Q3VycmVudFByZXNldCh0aGlzKTtcbiAgICAgICAgICBtYXJrUHJlc2V0TW9kaWZpZWQodGhpcywgZmFsc2UpO1xuXG4gICAgICAgIH0sXG5cbiAgICAgICAgc2F2ZUFzOiBmdW5jdGlvbihwcmVzZXROYW1lKSB7XG5cbiAgICAgICAgICBpZiAoIXRoaXMubG9hZC5yZW1lbWJlcmVkKSB7XG5cbiAgICAgICAgICAgIC8vIFJldGFpbiBkZWZhdWx0IHZhbHVlcyB1cG9uIGZpcnN0IHNhdmVcbiAgICAgICAgICAgIHRoaXMubG9hZC5yZW1lbWJlcmVkID0ge307XG4gICAgICAgICAgICB0aGlzLmxvYWQucmVtZW1iZXJlZFtERUZBVUxUX0RFRkFVTFRfUFJFU0VUX05BTUVdID0gZ2V0Q3VycmVudFByZXNldCh0aGlzLCB0cnVlKTtcblxuICAgICAgICAgIH1cblxuICAgICAgICAgIHRoaXMubG9hZC5yZW1lbWJlcmVkW3ByZXNldE5hbWVdID0gZ2V0Q3VycmVudFByZXNldCh0aGlzKTtcbiAgICAgICAgICB0aGlzLnByZXNldCA9IHByZXNldE5hbWU7XG4gICAgICAgICAgYWRkUHJlc2V0T3B0aW9uKHRoaXMsIHByZXNldE5hbWUsIHRydWUpO1xuXG4gICAgICAgIH0sXG5cbiAgICAgICAgcmV2ZXJ0OiBmdW5jdGlvbihndWkpIHtcblxuICAgICAgICAgIGNvbW1vbi5lYWNoKHRoaXMuX19jb250cm9sbGVycywgZnVuY3Rpb24oY29udHJvbGxlcikge1xuICAgICAgICAgICAgLy8gTWFrZSByZXZlcnQgd29yayBvbiBEZWZhdWx0LlxuICAgICAgICAgICAgaWYgKCF0aGlzLmdldFJvb3QoKS5sb2FkLnJlbWVtYmVyZWQpIHtcbiAgICAgICAgICAgICAgY29udHJvbGxlci5zZXRWYWx1ZShjb250cm9sbGVyLmluaXRpYWxWYWx1ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZWNhbGxTYXZlZFZhbHVlKGd1aSB8fCB0aGlzLmdldFJvb3QoKSwgY29udHJvbGxlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSwgdGhpcyk7XG5cbiAgICAgICAgICBjb21tb24uZWFjaCh0aGlzLl9fZm9sZGVycywgZnVuY3Rpb24oZm9sZGVyKSB7XG4gICAgICAgICAgICBmb2xkZXIucmV2ZXJ0KGZvbGRlcik7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBpZiAoIWd1aSkge1xuICAgICAgICAgICAgbWFya1ByZXNldE1vZGlmaWVkKHRoaXMuZ2V0Um9vdCgpLCBmYWxzZSk7XG4gICAgICAgICAgfVxuXG5cbiAgICAgICAgfSxcblxuICAgICAgICBsaXN0ZW46IGZ1bmN0aW9uKGNvbnRyb2xsZXIpIHtcblxuICAgICAgICAgIHZhciBpbml0ID0gdGhpcy5fX2xpc3RlbmluZy5sZW5ndGggPT0gMDtcbiAgICAgICAgICB0aGlzLl9fbGlzdGVuaW5nLnB1c2goY29udHJvbGxlcik7XG4gICAgICAgICAgaWYgKGluaXQpIHVwZGF0ZURpc3BsYXlzKHRoaXMuX19saXN0ZW5pbmcpO1xuXG4gICAgICAgIH1cblxuICAgICAgfVxuXG4gICk7XG5cbiAgZnVuY3Rpb24gYWRkKGd1aSwgb2JqZWN0LCBwcm9wZXJ0eSwgcGFyYW1zKSB7XG5cbiAgICBpZiAob2JqZWN0W3Byb3BlcnR5XSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJPYmplY3QgXCIgKyBvYmplY3QgKyBcIiBoYXMgbm8gcHJvcGVydHkgXFxcIlwiICsgcHJvcGVydHkgKyBcIlxcXCJcIik7XG4gICAgfVxuXG4gICAgdmFyIGNvbnRyb2xsZXI7XG5cbiAgICBpZiAocGFyYW1zLmNvbG9yKSB7XG5cbiAgICAgIGNvbnRyb2xsZXIgPSBuZXcgQ29sb3JDb250cm9sbGVyKG9iamVjdCwgcHJvcGVydHkpO1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgdmFyIGZhY3RvcnlBcmdzID0gW29iamVjdCxwcm9wZXJ0eV0uY29uY2F0KHBhcmFtcy5mYWN0b3J5QXJncyk7XG4gICAgICBjb250cm9sbGVyID0gY29udHJvbGxlckZhY3RvcnkuYXBwbHkoZ3VpLCBmYWN0b3J5QXJncyk7XG5cbiAgICB9XG5cbiAgICBpZiAocGFyYW1zLmJlZm9yZSBpbnN0YW5jZW9mIENvbnRyb2xsZXIpIHtcbiAgICAgIHBhcmFtcy5iZWZvcmUgPSBwYXJhbXMuYmVmb3JlLl9fbGk7XG4gICAgfVxuXG4gICAgcmVjYWxsU2F2ZWRWYWx1ZShndWksIGNvbnRyb2xsZXIpO1xuXG4gICAgZG9tLmFkZENsYXNzKGNvbnRyb2xsZXIuZG9tRWxlbWVudCwgJ2MnKTtcblxuICAgIHZhciBuYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGRvbS5hZGRDbGFzcyhuYW1lLCAncHJvcGVydHktbmFtZScpO1xuICAgIG5hbWUuaW5uZXJIVE1MID0gY29udHJvbGxlci5wcm9wZXJ0eTtcblxuICAgIHZhciBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQobmFtZSk7XG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGNvbnRyb2xsZXIuZG9tRWxlbWVudCk7XG5cbiAgICB2YXIgbGkgPSBhZGRSb3coZ3VpLCBjb250YWluZXIsIHBhcmFtcy5iZWZvcmUpO1xuXG4gICAgZG9tLmFkZENsYXNzKGxpLCBHVUkuQ0xBU1NfQ09OVFJPTExFUl9ST1cpO1xuICAgIGRvbS5hZGRDbGFzcyhsaSwgdHlwZW9mIGNvbnRyb2xsZXIuZ2V0VmFsdWUoKSk7XG5cbiAgICBhdWdtZW50Q29udHJvbGxlcihndWksIGxpLCBjb250cm9sbGVyKTtcblxuICAgIGd1aS5fX2NvbnRyb2xsZXJzLnB1c2goY29udHJvbGxlcik7XG5cbiAgICByZXR1cm4gY29udHJvbGxlcjtcblxuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBhIHJvdyB0byB0aGUgZW5kIG9mIHRoZSBHVUkgb3IgYmVmb3JlIGFub3RoZXIgcm93LlxuICAgKlxuICAgKiBAcGFyYW0gZ3VpXG4gICAqIEBwYXJhbSBbZG9tXSBJZiBzcGVjaWZpZWQsIGluc2VydHMgdGhlIGRvbSBjb250ZW50IGluIHRoZSBuZXcgcm93XG4gICAqIEBwYXJhbSBbbGlCZWZvcmVdIElmIHNwZWNpZmllZCwgcGxhY2VzIHRoZSBuZXcgcm93IGJlZm9yZSBhbm90aGVyIHJvd1xuICAgKi9cbiAgZnVuY3Rpb24gYWRkUm93KGd1aSwgZG9tLCBsaUJlZm9yZSkge1xuICAgIHZhciBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgaWYgKGRvbSkgbGkuYXBwZW5kQ2hpbGQoZG9tKTtcbiAgICBpZiAobGlCZWZvcmUpIHtcbiAgICAgIGd1aS5fX3VsLmluc2VydEJlZm9yZShsaSwgcGFyYW1zLmJlZm9yZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGd1aS5fX3VsLmFwcGVuZENoaWxkKGxpKTtcbiAgICB9XG4gICAgZ3VpLm9uUmVzaXplKCk7XG4gICAgcmV0dXJuIGxpO1xuICB9XG5cbiAgZnVuY3Rpb24gYXVnbWVudENvbnRyb2xsZXIoZ3VpLCBsaSwgY29udHJvbGxlcikge1xuXG4gICAgY29udHJvbGxlci5fX2xpID0gbGk7XG4gICAgY29udHJvbGxlci5fX2d1aSA9IGd1aTtcblxuICAgIGNvbW1vbi5leHRlbmQoY29udHJvbGxlciwge1xuXG4gICAgICBvcHRpb25zOiBmdW5jdGlvbihvcHRpb25zKSB7XG5cbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgY29udHJvbGxlci5yZW1vdmUoKTtcblxuICAgICAgICAgIHJldHVybiBhZGQoXG4gICAgICAgICAgICAgIGd1aSxcbiAgICAgICAgICAgICAgY29udHJvbGxlci5vYmplY3QsXG4gICAgICAgICAgICAgIGNvbnRyb2xsZXIucHJvcGVydHksXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBiZWZvcmU6IGNvbnRyb2xsZXIuX19saS5uZXh0RWxlbWVudFNpYmxpbmcsXG4gICAgICAgICAgICAgICAgZmFjdG9yeUFyZ3M6IFtjb21tb24udG9BcnJheShhcmd1bWVudHMpXVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbW1vbi5pc0FycmF5KG9wdGlvbnMpIHx8IGNvbW1vbi5pc09iamVjdChvcHRpb25zKSkge1xuICAgICAgICAgIGNvbnRyb2xsZXIucmVtb3ZlKCk7XG5cbiAgICAgICAgICByZXR1cm4gYWRkKFxuICAgICAgICAgICAgICBndWksXG4gICAgICAgICAgICAgIGNvbnRyb2xsZXIub2JqZWN0LFxuICAgICAgICAgICAgICBjb250cm9sbGVyLnByb3BlcnR5LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYmVmb3JlOiBjb250cm9sbGVyLl9fbGkubmV4dEVsZW1lbnRTaWJsaW5nLFxuICAgICAgICAgICAgICAgIGZhY3RvcnlBcmdzOiBbb3B0aW9uc11cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICk7XG5cbiAgICAgICAgfVxuXG4gICAgICB9LFxuXG4gICAgICBuYW1lOiBmdW5jdGlvbih2KSB7XG4gICAgICAgIGNvbnRyb2xsZXIuX19saS5maXJzdEVsZW1lbnRDaGlsZC5maXJzdEVsZW1lbnRDaGlsZC5pbm5lckhUTUwgPSB2O1xuICAgICAgICByZXR1cm4gY29udHJvbGxlcjtcbiAgICAgIH0sXG5cbiAgICAgIGxpc3RlbjogZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnRyb2xsZXIuX19ndWkubGlzdGVuKGNvbnRyb2xsZXIpO1xuICAgICAgICByZXR1cm4gY29udHJvbGxlcjtcbiAgICAgIH0sXG5cbiAgICAgIHJlbW92ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnRyb2xsZXIuX19ndWkucmVtb3ZlKGNvbnRyb2xsZXIpO1xuICAgICAgICByZXR1cm4gY29udHJvbGxlcjtcbiAgICAgIH1cblxuICAgIH0pO1xuXG4gICAgLy8gQWxsIHNsaWRlcnMgc2hvdWxkIGJlIGFjY29tcGFuaWVkIGJ5IGEgYm94LlxuICAgIGlmIChjb250cm9sbGVyIGluc3RhbmNlb2YgTnVtYmVyQ29udHJvbGxlclNsaWRlcikge1xuXG4gICAgICB2YXIgYm94ID0gbmV3IE51bWJlckNvbnRyb2xsZXJCb3goY29udHJvbGxlci5vYmplY3QsIGNvbnRyb2xsZXIucHJvcGVydHksXG4gICAgICAgICAgeyBtaW46IGNvbnRyb2xsZXIuX19taW4sIG1heDogY29udHJvbGxlci5fX21heCwgc3RlcDogY29udHJvbGxlci5fX3N0ZXAgfSk7XG5cbiAgICAgIGNvbW1vbi5lYWNoKFsndXBkYXRlRGlzcGxheScsICdvbkNoYW5nZScsICdvbkZpbmlzaENoYW5nZSddLCBmdW5jdGlvbihtZXRob2QpIHtcbiAgICAgICAgdmFyIHBjID0gY29udHJvbGxlclttZXRob2RdO1xuICAgICAgICB2YXIgcGIgPSBib3hbbWV0aG9kXTtcbiAgICAgICAgY29udHJvbGxlclttZXRob2RdID0gYm94W21ldGhvZF0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG4gICAgICAgICAgcGMuYXBwbHkoY29udHJvbGxlciwgYXJncyk7XG4gICAgICAgICAgcmV0dXJuIHBiLmFwcGx5KGJveCwgYXJncyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBkb20uYWRkQ2xhc3MobGksICdoYXMtc2xpZGVyJyk7XG4gICAgICBjb250cm9sbGVyLmRvbUVsZW1lbnQuaW5zZXJ0QmVmb3JlKGJveC5kb21FbGVtZW50LCBjb250cm9sbGVyLmRvbUVsZW1lbnQuZmlyc3RFbGVtZW50Q2hpbGQpO1xuXG4gICAgfVxuICAgIGVsc2UgaWYgKGNvbnRyb2xsZXIgaW5zdGFuY2VvZiBOdW1iZXJDb250cm9sbGVyQm94KSB7XG5cbiAgICAgIHZhciByID0gZnVuY3Rpb24ocmV0dXJuZWQpIHtcblxuICAgICAgICAvLyBIYXZlIHdlIGRlZmluZWQgYm90aCBib3VuZGFyaWVzP1xuICAgICAgICBpZiAoY29tbW9uLmlzTnVtYmVyKGNvbnRyb2xsZXIuX19taW4pICYmIGNvbW1vbi5pc051bWJlcihjb250cm9sbGVyLl9fbWF4KSkge1xuXG4gICAgICAgICAgLy8gV2VsbCwgdGhlbiBsZXRzIGp1c3QgcmVwbGFjZSB0aGlzIHdpdGggYSBzbGlkZXIuXG4gICAgICAgICAgY29udHJvbGxlci5yZW1vdmUoKTtcbiAgICAgICAgICByZXR1cm4gYWRkKFxuICAgICAgICAgICAgICBndWksXG4gICAgICAgICAgICAgIGNvbnRyb2xsZXIub2JqZWN0LFxuICAgICAgICAgICAgICBjb250cm9sbGVyLnByb3BlcnR5LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYmVmb3JlOiBjb250cm9sbGVyLl9fbGkubmV4dEVsZW1lbnRTaWJsaW5nLFxuICAgICAgICAgICAgICAgIGZhY3RvcnlBcmdzOiBbY29udHJvbGxlci5fX21pbiwgY29udHJvbGxlci5fX21heCwgY29udHJvbGxlci5fX3N0ZXBdXG4gICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmV0dXJuZWQ7XG5cbiAgICAgIH07XG5cbiAgICAgIGNvbnRyb2xsZXIubWluID0gY29tbW9uLmNvbXBvc2UociwgY29udHJvbGxlci5taW4pO1xuICAgICAgY29udHJvbGxlci5tYXggPSBjb21tb24uY29tcG9zZShyLCBjb250cm9sbGVyLm1heCk7XG5cbiAgICB9XG4gICAgZWxzZSBpZiAoY29udHJvbGxlciBpbnN0YW5jZW9mIEJvb2xlYW5Db250cm9sbGVyKSB7XG5cbiAgICAgIGRvbS5iaW5kKGxpLCAnY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZG9tLmZha2VFdmVudChjb250cm9sbGVyLl9fY2hlY2tib3gsICdjbGljaycpO1xuICAgICAgfSk7XG5cbiAgICAgIGRvbS5iaW5kKGNvbnRyb2xsZXIuX19jaGVja2JveCwgJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpOyAvLyBQcmV2ZW50cyBkb3VibGUtdG9nZ2xlXG4gICAgICB9KVxuXG4gICAgfVxuICAgIGVsc2UgaWYgKGNvbnRyb2xsZXIgaW5zdGFuY2VvZiBGdW5jdGlvbkNvbnRyb2xsZXIpIHtcblxuICAgICAgZG9tLmJpbmQobGksICdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICBkb20uZmFrZUV2ZW50KGNvbnRyb2xsZXIuX19idXR0b24sICdjbGljaycpO1xuICAgICAgfSk7XG5cbiAgICAgIGRvbS5iaW5kKGxpLCAnbW91c2VvdmVyJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGRvbS5hZGRDbGFzcyhjb250cm9sbGVyLl9fYnV0dG9uLCAnaG92ZXInKTtcbiAgICAgIH0pO1xuXG4gICAgICBkb20uYmluZChsaSwgJ21vdXNlb3V0JywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGRvbS5yZW1vdmVDbGFzcyhjb250cm9sbGVyLl9fYnV0dG9uLCAnaG92ZXInKTtcbiAgICAgIH0pO1xuXG4gICAgfVxuICAgIGVsc2UgaWYgKGNvbnRyb2xsZXIgaW5zdGFuY2VvZiBDb2xvckNvbnRyb2xsZXIpIHtcblxuICAgICAgZG9tLmFkZENsYXNzKGxpLCAnY29sb3InKTtcbiAgICAgIGNvbnRyb2xsZXIudXBkYXRlRGlzcGxheSA9IGNvbW1vbi5jb21wb3NlKGZ1bmN0aW9uKHIpIHtcbiAgICAgICAgbGkuc3R5bGUuYm9yZGVyTGVmdENvbG9yID0gY29udHJvbGxlci5fX2NvbG9yLnRvU3RyaW5nKCk7XG4gICAgICAgIHJldHVybiByO1xuICAgICAgfSwgY29udHJvbGxlci51cGRhdGVEaXNwbGF5KTtcblxuICAgICAgY29udHJvbGxlci51cGRhdGVEaXNwbGF5KCk7XG5cbiAgICB9XG5cbiAgICBjb250cm9sbGVyLnNldFZhbHVlID0gY29tbW9uLmNvbXBvc2UoZnVuY3Rpb24ocikge1xuICAgICAgaWYgKGd1aS5nZXRSb290KCkuX19wcmVzZXRfc2VsZWN0ICYmIGNvbnRyb2xsZXIuaXNNb2RpZmllZCgpKSB7XG4gICAgICAgIG1hcmtQcmVzZXRNb2RpZmllZChndWkuZ2V0Um9vdCgpLCB0cnVlKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByO1xuICAgIH0sIGNvbnRyb2xsZXIuc2V0VmFsdWUpO1xuXG4gIH1cblxuICBmdW5jdGlvbiByZWNhbGxTYXZlZFZhbHVlKGd1aSwgY29udHJvbGxlcikge1xuXG4gICAgLy8gRmluZCB0aGUgdG9wbW9zdCBHVUksIHRoYXQncyB3aGVyZSByZW1lbWJlcmVkIG9iamVjdHMgbGl2ZS5cbiAgICB2YXIgcm9vdCA9IGd1aS5nZXRSb290KCk7XG5cbiAgICAvLyBEb2VzIHRoZSBvYmplY3Qgd2UncmUgY29udHJvbGxpbmcgbWF0Y2ggYW55dGhpbmcgd2UndmUgYmVlbiB0b2xkIHRvXG4gICAgLy8gcmVtZW1iZXI/XG4gICAgdmFyIG1hdGNoZWRfaW5kZXggPSByb290Ll9fcmVtZW1iZXJlZE9iamVjdHMuaW5kZXhPZihjb250cm9sbGVyLm9iamVjdCk7XG5cbiAgICAvLyBXaHkgeWVzLCBpdCBkb2VzIVxuICAgIGlmIChtYXRjaGVkX2luZGV4ICE9IC0xKSB7XG5cbiAgICAgIC8vIExldCBtZSBmZXRjaCBhIG1hcCBvZiBjb250cm9sbGVycyBmb3IgdGhjb21tb24uaXNPYmplY3QuXG4gICAgICB2YXIgY29udHJvbGxlcl9tYXAgPVxuICAgICAgICAgIHJvb3QuX19yZW1lbWJlcmVkT2JqZWN0SW5kZWNlc1RvQ29udHJvbGxlcnNbbWF0Y2hlZF9pbmRleF07XG5cbiAgICAgIC8vIE9ocCwgSSBiZWxpZXZlIHRoaXMgaXMgdGhlIGZpcnN0IGNvbnRyb2xsZXIgd2UndmUgY3JlYXRlZCBmb3IgdGhpc1xuICAgICAgLy8gb2JqZWN0LiBMZXRzIG1ha2UgdGhlIG1hcCBmcmVzaC5cbiAgICAgIGlmIChjb250cm9sbGVyX21hcCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvbnRyb2xsZXJfbWFwID0ge307XG4gICAgICAgIHJvb3QuX19yZW1lbWJlcmVkT2JqZWN0SW5kZWNlc1RvQ29udHJvbGxlcnNbbWF0Y2hlZF9pbmRleF0gPVxuICAgICAgICAgICAgY29udHJvbGxlcl9tYXA7XG4gICAgICB9XG5cbiAgICAgIC8vIEtlZXAgdHJhY2sgb2YgdGhpcyBjb250cm9sbGVyXG4gICAgICBjb250cm9sbGVyX21hcFtjb250cm9sbGVyLnByb3BlcnR5XSA9IGNvbnRyb2xsZXI7XG5cbiAgICAgIC8vIE9rYXksIG5vdyBoYXZlIHdlIHNhdmVkIGFueSB2YWx1ZXMgZm9yIHRoaXMgY29udHJvbGxlcj9cbiAgICAgIGlmIChyb290LmxvYWQgJiYgcm9vdC5sb2FkLnJlbWVtYmVyZWQpIHtcblxuICAgICAgICB2YXIgcHJlc2V0X21hcCA9IHJvb3QubG9hZC5yZW1lbWJlcmVkO1xuXG4gICAgICAgIC8vIFdoaWNoIHByZXNldCBhcmUgd2UgdHJ5aW5nIHRvIGxvYWQ/XG4gICAgICAgIHZhciBwcmVzZXQ7XG5cbiAgICAgICAgaWYgKHByZXNldF9tYXBbZ3VpLnByZXNldF0pIHtcblxuICAgICAgICAgIHByZXNldCA9IHByZXNldF9tYXBbZ3VpLnByZXNldF07XG5cbiAgICAgICAgfSBlbHNlIGlmIChwcmVzZXRfbWFwW0RFRkFVTFRfREVGQVVMVF9QUkVTRVRfTkFNRV0pIHtcblxuICAgICAgICAgIC8vIFVoaCwgeW91IGNhbiBoYXZlIHRoZSBkZWZhdWx0IGluc3RlYWQ/XG4gICAgICAgICAgcHJlc2V0ID0gcHJlc2V0X21hcFtERUZBVUxUX0RFRkFVTFRfUFJFU0VUX05BTUVdO1xuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAvLyBOYWRhLlxuXG4gICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8vIERpZCB0aGUgbG9hZGVkIG9iamVjdCByZW1lbWJlciB0aGNvbW1vbi5pc09iamVjdD9cbiAgICAgICAgaWYgKHByZXNldFttYXRjaGVkX2luZGV4XSAmJlxuXG4gICAgICAgICAgLy8gRGlkIHdlIHJlbWVtYmVyIHRoaXMgcGFydGljdWxhciBwcm9wZXJ0eT9cbiAgICAgICAgICAgIHByZXNldFttYXRjaGVkX2luZGV4XVtjb250cm9sbGVyLnByb3BlcnR5XSAhPT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAvLyBXZSBkaWQgcmVtZW1iZXIgc29tZXRoaW5nIGZvciB0aGlzIGd1eSAuLi5cbiAgICAgICAgICB2YXIgdmFsdWUgPSBwcmVzZXRbbWF0Y2hlZF9pbmRleF1bY29udHJvbGxlci5wcm9wZXJ0eV07XG5cbiAgICAgICAgICAvLyBBbmQgdGhhdCdzIHdoYXQgaXQgaXMuXG4gICAgICAgICAgY29udHJvbGxlci5pbml0aWFsVmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICBjb250cm9sbGVyLnNldFZhbHVlKHZhbHVlKTtcblxuICAgICAgICB9XG5cbiAgICAgIH1cblxuICAgIH1cblxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0TG9jYWxTdG9yYWdlSGFzaChndWksIGtleSkge1xuICAgIC8vIFRPRE8gaG93IGRvZXMgdGhpcyBkZWFsIHdpdGggbXVsdGlwbGUgR1VJJ3M/XG4gICAgcmV0dXJuIGRvY3VtZW50LmxvY2F0aW9uLmhyZWYgKyAnLicgKyBrZXk7XG5cbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZFNhdmVNZW51KGd1aSkge1xuXG4gICAgdmFyIGRpdiA9IGd1aS5fX3NhdmVfcm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcblxuICAgIGRvbS5hZGRDbGFzcyhndWkuZG9tRWxlbWVudCwgJ2hhcy1zYXZlJyk7XG5cbiAgICBndWkuX191bC5pbnNlcnRCZWZvcmUoZGl2LCBndWkuX191bC5maXJzdENoaWxkKTtcblxuICAgIGRvbS5hZGRDbGFzcyhkaXYsICdzYXZlLXJvdycpO1xuXG4gICAgdmFyIGdlYXJzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGdlYXJzLmlubmVySFRNTCA9ICcmbmJzcDsnO1xuICAgIGRvbS5hZGRDbGFzcyhnZWFycywgJ2J1dHRvbiBnZWFycycpO1xuXG4gICAgLy8gVE9ETyByZXBsYWNlIHdpdGggRnVuY3Rpb25Db250cm9sbGVyXG4gICAgdmFyIGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBidXR0b24uaW5uZXJIVE1MID0gJ1NhdmUnO1xuICAgIGRvbS5hZGRDbGFzcyhidXR0b24sICdidXR0b24nKTtcbiAgICBkb20uYWRkQ2xhc3MoYnV0dG9uLCAnc2F2ZScpO1xuXG4gICAgdmFyIGJ1dHRvbjIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgYnV0dG9uMi5pbm5lckhUTUwgPSAnTmV3JztcbiAgICBkb20uYWRkQ2xhc3MoYnV0dG9uMiwgJ2J1dHRvbicpO1xuICAgIGRvbS5hZGRDbGFzcyhidXR0b24yLCAnc2F2ZS1hcycpO1xuXG4gICAgdmFyIGJ1dHRvbjMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgYnV0dG9uMy5pbm5lckhUTUwgPSAnUmV2ZXJ0JztcbiAgICBkb20uYWRkQ2xhc3MoYnV0dG9uMywgJ2J1dHRvbicpO1xuICAgIGRvbS5hZGRDbGFzcyhidXR0b24zLCAncmV2ZXJ0Jyk7XG5cbiAgICB2YXIgc2VsZWN0ID0gZ3VpLl9fcHJlc2V0X3NlbGVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NlbGVjdCcpO1xuXG4gICAgaWYgKGd1aS5sb2FkICYmIGd1aS5sb2FkLnJlbWVtYmVyZWQpIHtcblxuICAgICAgY29tbW9uLmVhY2goZ3VpLmxvYWQucmVtZW1iZXJlZCwgZnVuY3Rpb24odmFsdWUsIGtleSkge1xuICAgICAgICBhZGRQcmVzZXRPcHRpb24oZ3VpLCBrZXksIGtleSA9PSBndWkucHJlc2V0KTtcbiAgICAgIH0pO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgIGFkZFByZXNldE9wdGlvbihndWksIERFRkFVTFRfREVGQVVMVF9QUkVTRVRfTkFNRSwgZmFsc2UpO1xuICAgIH1cblxuICAgIGRvbS5iaW5kKHNlbGVjdCwgJ2NoYW5nZScsIGZ1bmN0aW9uKCkge1xuXG5cbiAgICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCBndWkuX19wcmVzZXRfc2VsZWN0Lmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICBndWkuX19wcmVzZXRfc2VsZWN0W2luZGV4XS5pbm5lckhUTUwgPSBndWkuX19wcmVzZXRfc2VsZWN0W2luZGV4XS52YWx1ZTtcbiAgICAgIH1cblxuICAgICAgZ3VpLnByZXNldCA9IHRoaXMudmFsdWU7XG5cbiAgICB9KTtcblxuICAgIGRpdi5hcHBlbmRDaGlsZChzZWxlY3QpO1xuICAgIGRpdi5hcHBlbmRDaGlsZChnZWFycyk7XG4gICAgZGl2LmFwcGVuZENoaWxkKGJ1dHRvbik7XG4gICAgZGl2LmFwcGVuZENoaWxkKGJ1dHRvbjIpO1xuICAgIGRpdi5hcHBlbmRDaGlsZChidXR0b24zKTtcblxuICAgIGlmIChTVVBQT1JUU19MT0NBTF9TVE9SQUdFKSB7XG5cbiAgICAgIHZhciBzYXZlTG9jYWxseSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkZy1zYXZlLWxvY2FsbHknKTtcbiAgICAgIHZhciBleHBsYWluID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RnLWxvY2FsLWV4cGxhaW4nKTtcblxuICAgICAgc2F2ZUxvY2FsbHkuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG5cbiAgICAgIHZhciBsb2NhbFN0b3JhZ2VDaGVja0JveCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkZy1sb2NhbC1zdG9yYWdlJyk7XG5cbiAgICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbShnZXRMb2NhbFN0b3JhZ2VIYXNoKGd1aSwgJ2lzTG9jYWwnKSkgPT09ICd0cnVlJykge1xuICAgICAgICBsb2NhbFN0b3JhZ2VDaGVja0JveC5zZXRBdHRyaWJ1dGUoJ2NoZWNrZWQnLCAnY2hlY2tlZCcpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBzaG93SGlkZUV4cGxhaW4oKSB7XG4gICAgICAgIGV4cGxhaW4uc3R5bGUuZGlzcGxheSA9IGd1aS51c2VMb2NhbFN0b3JhZ2UgPyAnYmxvY2snIDogJ25vbmUnO1xuICAgICAgfVxuXG4gICAgICBzaG93SGlkZUV4cGxhaW4oKTtcblxuICAgICAgLy8gVE9ETzogVXNlIGEgYm9vbGVhbiBjb250cm9sbGVyLCBmb29sIVxuICAgICAgZG9tLmJpbmQobG9jYWxTdG9yYWdlQ2hlY2tCb3gsICdjaGFuZ2UnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZ3VpLnVzZUxvY2FsU3RvcmFnZSA9ICFndWkudXNlTG9jYWxTdG9yYWdlO1xuICAgICAgICBzaG93SGlkZUV4cGxhaW4oKTtcbiAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgdmFyIG5ld0NvbnN0cnVjdG9yVGV4dEFyZWEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGctbmV3LWNvbnN0cnVjdG9yJyk7XG5cbiAgICBkb20uYmluZChuZXdDb25zdHJ1Y3RvclRleHRBcmVhLCAna2V5ZG93bicsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIGlmIChlLm1ldGFLZXkgJiYgKGUud2hpY2ggPT09IDY3IHx8IGUua2V5Q29kZSA9PSA2NykpIHtcbiAgICAgICAgU0FWRV9ESUFMT0dVRS5oaWRlKCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBkb20uYmluZChnZWFycywgJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICBuZXdDb25zdHJ1Y3RvclRleHRBcmVhLmlubmVySFRNTCA9IEpTT04uc3RyaW5naWZ5KGd1aS5nZXRTYXZlT2JqZWN0KCksIHVuZGVmaW5lZCwgMik7XG4gICAgICBTQVZFX0RJQUxPR1VFLnNob3coKTtcbiAgICAgIG5ld0NvbnN0cnVjdG9yVGV4dEFyZWEuZm9jdXMoKTtcbiAgICAgIG5ld0NvbnN0cnVjdG9yVGV4dEFyZWEuc2VsZWN0KCk7XG4gICAgfSk7XG5cbiAgICBkb20uYmluZChidXR0b24sICdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgZ3VpLnNhdmUoKTtcbiAgICB9KTtcblxuICAgIGRvbS5iaW5kKGJ1dHRvbjIsICdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHByZXNldE5hbWUgPSBwcm9tcHQoJ0VudGVyIGEgbmV3IHByZXNldCBuYW1lLicpO1xuICAgICAgaWYgKHByZXNldE5hbWUpIGd1aS5zYXZlQXMocHJlc2V0TmFtZSk7XG4gICAgfSk7XG5cbiAgICBkb20uYmluZChidXR0b24zLCAnY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgIGd1aS5yZXZlcnQoKTtcbiAgICB9KTtcblxuLy8gICAgZGl2LmFwcGVuZENoaWxkKGJ1dHRvbjIpO1xuXG4gIH1cblxuICBmdW5jdGlvbiBhZGRSZXNpemVIYW5kbGUoZ3VpKSB7XG5cbiAgICBndWkuX19yZXNpemVfaGFuZGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICBjb21tb24uZXh0ZW5kKGd1aS5fX3Jlc2l6ZV9oYW5kbGUuc3R5bGUsIHtcblxuICAgICAgd2lkdGg6ICc2cHgnLFxuICAgICAgbWFyZ2luTGVmdDogJy0zcHgnLFxuICAgICAgaGVpZ2h0OiAnMjAwcHgnLFxuICAgICAgY3Vyc29yOiAnZXctcmVzaXplJyxcbiAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnXG4vLyAgICAgIGJvcmRlcjogJzFweCBzb2xpZCBibHVlJ1xuXG4gICAgfSk7XG5cbiAgICB2YXIgcG1vdXNlWDtcblxuICAgIGRvbS5iaW5kKGd1aS5fX3Jlc2l6ZV9oYW5kbGUsICdtb3VzZWRvd24nLCBkcmFnU3RhcnQpO1xuICAgIGRvbS5iaW5kKGd1aS5fX2Nsb3NlQnV0dG9uLCAnbW91c2Vkb3duJywgZHJhZ1N0YXJ0KTtcblxuICAgIGd1aS5kb21FbGVtZW50Lmluc2VydEJlZm9yZShndWkuX19yZXNpemVfaGFuZGxlLCBndWkuZG9tRWxlbWVudC5maXJzdEVsZW1lbnRDaGlsZCk7XG5cbiAgICBmdW5jdGlvbiBkcmFnU3RhcnQoZSkge1xuXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgIHBtb3VzZVggPSBlLmNsaWVudFg7XG5cbiAgICAgIGRvbS5hZGRDbGFzcyhndWkuX19jbG9zZUJ1dHRvbiwgR1VJLkNMQVNTX0RSQUcpO1xuICAgICAgZG9tLmJpbmQod2luZG93LCAnbW91c2Vtb3ZlJywgZHJhZyk7XG4gICAgICBkb20uYmluZCh3aW5kb3csICdtb3VzZXVwJywgZHJhZ1N0b3ApO1xuXG4gICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkcmFnKGUpIHtcblxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICBndWkud2lkdGggKz0gcG1vdXNlWCAtIGUuY2xpZW50WDtcbiAgICAgIGd1aS5vblJlc2l6ZSgpO1xuICAgICAgcG1vdXNlWCA9IGUuY2xpZW50WDtcblxuICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZHJhZ1N0b3AoKSB7XG5cbiAgICAgIGRvbS5yZW1vdmVDbGFzcyhndWkuX19jbG9zZUJ1dHRvbiwgR1VJLkNMQVNTX0RSQUcpO1xuICAgICAgZG9tLnVuYmluZCh3aW5kb3csICdtb3VzZW1vdmUnLCBkcmFnKTtcbiAgICAgIGRvbS51bmJpbmQod2luZG93LCAnbW91c2V1cCcsIGRyYWdTdG9wKTtcblxuICAgIH1cblxuICB9XG5cbiAgZnVuY3Rpb24gc2V0V2lkdGgoZ3VpLCB3KSB7XG4gICAgZ3VpLmRvbUVsZW1lbnQuc3R5bGUud2lkdGggPSB3ICsgJ3B4JztcbiAgICAvLyBBdXRvIHBsYWNlZCBzYXZlLXJvd3MgYXJlIHBvc2l0aW9uIGZpeGVkLCBzbyB3ZSBoYXZlIHRvXG4gICAgLy8gc2V0IHRoZSB3aWR0aCBtYW51YWxseSBpZiB3ZSB3YW50IGl0IHRvIGJsZWVkIHRvIHRoZSBlZGdlXG4gICAgaWYgKGd1aS5fX3NhdmVfcm93ICYmIGd1aS5hdXRvUGxhY2UpIHtcbiAgICAgIGd1aS5fX3NhdmVfcm93LnN0eWxlLndpZHRoID0gdyArICdweCc7XG4gICAgfWlmIChndWkuX19jbG9zZUJ1dHRvbikge1xuICAgICAgZ3VpLl9fY2xvc2VCdXR0b24uc3R5bGUud2lkdGggPSB3ICsgJ3B4JztcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBnZXRDdXJyZW50UHJlc2V0KGd1aSwgdXNlSW5pdGlhbFZhbHVlcykge1xuXG4gICAgdmFyIHRvUmV0dXJuID0ge307XG5cbiAgICAvLyBGb3IgZWFjaCBvYmplY3QgSSdtIHJlbWVtYmVyaW5nXG4gICAgY29tbW9uLmVhY2goZ3VpLl9fcmVtZW1iZXJlZE9iamVjdHMsIGZ1bmN0aW9uKHZhbCwgaW5kZXgpIHtcblxuICAgICAgdmFyIHNhdmVkX3ZhbHVlcyA9IHt9O1xuXG4gICAgICAvLyBUaGUgY29udHJvbGxlcnMgSSd2ZSBtYWRlIGZvciB0aGNvbW1vbi5pc09iamVjdCBieSBwcm9wZXJ0eVxuICAgICAgdmFyIGNvbnRyb2xsZXJfbWFwID1cbiAgICAgICAgICBndWkuX19yZW1lbWJlcmVkT2JqZWN0SW5kZWNlc1RvQ29udHJvbGxlcnNbaW5kZXhdO1xuXG4gICAgICAvLyBSZW1lbWJlciBlYWNoIHZhbHVlIGZvciBlYWNoIHByb3BlcnR5XG4gICAgICBjb21tb24uZWFjaChjb250cm9sbGVyX21hcCwgZnVuY3Rpb24oY29udHJvbGxlciwgcHJvcGVydHkpIHtcbiAgICAgICAgc2F2ZWRfdmFsdWVzW3Byb3BlcnR5XSA9IHVzZUluaXRpYWxWYWx1ZXMgPyBjb250cm9sbGVyLmluaXRpYWxWYWx1ZSA6IGNvbnRyb2xsZXIuZ2V0VmFsdWUoKTtcbiAgICAgIH0pO1xuXG4gICAgICAvLyBTYXZlIHRoZSB2YWx1ZXMgZm9yIHRoY29tbW9uLmlzT2JqZWN0XG4gICAgICB0b1JldHVybltpbmRleF0gPSBzYXZlZF92YWx1ZXM7XG5cbiAgICB9KTtcblxuICAgIHJldHVybiB0b1JldHVybjtcblxuICB9XG5cbiAgZnVuY3Rpb24gYWRkUHJlc2V0T3B0aW9uKGd1aSwgbmFtZSwgc2V0U2VsZWN0ZWQpIHtcbiAgICB2YXIgb3B0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XG4gICAgb3B0LmlubmVySFRNTCA9IG5hbWU7XG4gICAgb3B0LnZhbHVlID0gbmFtZTtcbiAgICBndWkuX19wcmVzZXRfc2VsZWN0LmFwcGVuZENoaWxkKG9wdCk7XG4gICAgaWYgKHNldFNlbGVjdGVkKSB7XG4gICAgICBndWkuX19wcmVzZXRfc2VsZWN0LnNlbGVjdGVkSW5kZXggPSBndWkuX19wcmVzZXRfc2VsZWN0Lmxlbmd0aCAtIDE7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc2V0UHJlc2V0U2VsZWN0SW5kZXgoZ3VpKSB7XG4gICAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IGd1aS5fX3ByZXNldF9zZWxlY3QubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICBpZiAoZ3VpLl9fcHJlc2V0X3NlbGVjdFtpbmRleF0udmFsdWUgPT0gZ3VpLnByZXNldCkge1xuICAgICAgICBndWkuX19wcmVzZXRfc2VsZWN0LnNlbGVjdGVkSW5kZXggPSBpbmRleDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBtYXJrUHJlc2V0TW9kaWZpZWQoZ3VpLCBtb2RpZmllZCkge1xuICAgIHZhciBvcHQgPSBndWkuX19wcmVzZXRfc2VsZWN0W2d1aS5fX3ByZXNldF9zZWxlY3Quc2VsZWN0ZWRJbmRleF07XG4vLyAgICBjb25zb2xlLmxvZygnbWFyaycsIG1vZGlmaWVkLCBvcHQpO1xuICAgIGlmIChtb2RpZmllZCkge1xuICAgICAgb3B0LmlubmVySFRNTCA9IG9wdC52YWx1ZSArIFwiKlwiO1xuICAgIH0gZWxzZSB7XG4gICAgICBvcHQuaW5uZXJIVE1MID0gb3B0LnZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZURpc3BsYXlzKGNvbnRyb2xsZXJBcnJheSkge1xuXG5cbiAgICBpZiAoY29udHJvbGxlckFycmF5Lmxlbmd0aCAhPSAwKSB7XG5cbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbigpIHtcbiAgICAgICAgdXBkYXRlRGlzcGxheXMoY29udHJvbGxlckFycmF5KTtcbiAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgY29tbW9uLmVhY2goY29udHJvbGxlckFycmF5LCBmdW5jdGlvbihjKSB7XG4gICAgICBjLnVwZGF0ZURpc3BsYXkoKTtcbiAgICB9KTtcblxuICB9XG5cbiAgcmV0dXJuIEdVSTtcblxufSkoZGF0LnV0aWxzLmNzcyxcblwiPGRpdiBpZD1cXFwiZGctc2F2ZVxcXCIgY2xhc3M9XFxcImRnIGRpYWxvZ3VlXFxcIj5cXG5cXG4gIEhlcmUncyB0aGUgbmV3IGxvYWQgcGFyYW1ldGVyIGZvciB5b3VyIDxjb2RlPkdVSTwvY29kZT4ncyBjb25zdHJ1Y3RvcjpcXG5cXG4gIDx0ZXh0YXJlYSBpZD1cXFwiZGctbmV3LWNvbnN0cnVjdG9yXFxcIj48L3RleHRhcmVhPlxcblxcbiAgPGRpdiBpZD1cXFwiZGctc2F2ZS1sb2NhbGx5XFxcIj5cXG5cXG4gICAgPGlucHV0IGlkPVxcXCJkZy1sb2NhbC1zdG9yYWdlXFxcIiB0eXBlPVxcXCJjaGVja2JveFxcXCIvPiBBdXRvbWF0aWNhbGx5IHNhdmVcXG4gICAgdmFsdWVzIHRvIDxjb2RlPmxvY2FsU3RvcmFnZTwvY29kZT4gb24gZXhpdC5cXG5cXG4gICAgPGRpdiBpZD1cXFwiZGctbG9jYWwtZXhwbGFpblxcXCI+VGhlIHZhbHVlcyBzYXZlZCB0byA8Y29kZT5sb2NhbFN0b3JhZ2U8L2NvZGU+IHdpbGxcXG4gICAgICBvdmVycmlkZSB0aG9zZSBwYXNzZWQgdG8gPGNvZGU+ZGF0LkdVSTwvY29kZT4ncyBjb25zdHJ1Y3Rvci4gVGhpcyBtYWtlcyBpdFxcbiAgICAgIGVhc2llciB0byB3b3JrIGluY3JlbWVudGFsbHksIGJ1dCA8Y29kZT5sb2NhbFN0b3JhZ2U8L2NvZGU+IGlzIGZyYWdpbGUsXFxuICAgICAgYW5kIHlvdXIgZnJpZW5kcyBtYXkgbm90IHNlZSB0aGUgc2FtZSB2YWx1ZXMgeW91IGRvLlxcbiAgICAgIFxcbiAgICA8L2Rpdj5cXG4gICAgXFxuICA8L2Rpdj5cXG5cXG48L2Rpdj5cIixcblwiLmRnIHVse2xpc3Qtc3R5bGU6bm9uZTttYXJnaW46MDtwYWRkaW5nOjA7d2lkdGg6MTAwJTtjbGVhcjpib3RofS5kZy5hY3twb3NpdGlvbjpmaXhlZDt0b3A6MDtsZWZ0OjA7cmlnaHQ6MDtoZWlnaHQ6MDt6LWluZGV4OjB9LmRnOm5vdCguYWMpIC5tYWlue292ZXJmbG93OmhpZGRlbn0uZGcubWFpbnstd2Via2l0LXRyYW5zaXRpb246b3BhY2l0eSAwLjFzIGxpbmVhcjstby10cmFuc2l0aW9uOm9wYWNpdHkgMC4xcyBsaW5lYXI7LW1vei10cmFuc2l0aW9uOm9wYWNpdHkgMC4xcyBsaW5lYXI7dHJhbnNpdGlvbjpvcGFjaXR5IDAuMXMgbGluZWFyfS5kZy5tYWluLnRhbGxlci10aGFuLXdpbmRvd3tvdmVyZmxvdy15OmF1dG99LmRnLm1haW4udGFsbGVyLXRoYW4td2luZG93IC5jbG9zZS1idXR0b257b3BhY2l0eToxO21hcmdpbi10b3A6LTFweDtib3JkZXItdG9wOjFweCBzb2xpZCAjMmMyYzJjfS5kZy5tYWluIHVsLmNsb3NlZCAuY2xvc2UtYnV0dG9ue29wYWNpdHk6MSAhaW1wb3J0YW50fS5kZy5tYWluOmhvdmVyIC5jbG9zZS1idXR0b24sLmRnLm1haW4gLmNsb3NlLWJ1dHRvbi5kcmFne29wYWNpdHk6MX0uZGcubWFpbiAuY2xvc2UtYnV0dG9uey13ZWJraXQtdHJhbnNpdGlvbjpvcGFjaXR5IDAuMXMgbGluZWFyOy1vLXRyYW5zaXRpb246b3BhY2l0eSAwLjFzIGxpbmVhcjstbW96LXRyYW5zaXRpb246b3BhY2l0eSAwLjFzIGxpbmVhcjt0cmFuc2l0aW9uOm9wYWNpdHkgMC4xcyBsaW5lYXI7Ym9yZGVyOjA7cG9zaXRpb246YWJzb2x1dGU7bGluZS1oZWlnaHQ6MTlweDtoZWlnaHQ6MjBweDtjdXJzb3I6cG9pbnRlcjt0ZXh0LWFsaWduOmNlbnRlcjtiYWNrZ3JvdW5kLWNvbG9yOiMwMDB9LmRnLm1haW4gLmNsb3NlLWJ1dHRvbjpob3ZlcntiYWNrZ3JvdW5kLWNvbG9yOiMxMTF9LmRnLmF7ZmxvYXQ6cmlnaHQ7bWFyZ2luLXJpZ2h0OjE1cHg7b3ZlcmZsb3cteDpoaWRkZW59LmRnLmEuaGFzLXNhdmUgdWx7bWFyZ2luLXRvcDoyN3B4fS5kZy5hLmhhcy1zYXZlIHVsLmNsb3NlZHttYXJnaW4tdG9wOjB9LmRnLmEgLnNhdmUtcm93e3Bvc2l0aW9uOmZpeGVkO3RvcDowO3otaW5kZXg6MTAwMn0uZGcgbGl7LXdlYmtpdC10cmFuc2l0aW9uOmhlaWdodCAwLjFzIGVhc2Utb3V0Oy1vLXRyYW5zaXRpb246aGVpZ2h0IDAuMXMgZWFzZS1vdXQ7LW1vei10cmFuc2l0aW9uOmhlaWdodCAwLjFzIGVhc2Utb3V0O3RyYW5zaXRpb246aGVpZ2h0IDAuMXMgZWFzZS1vdXR9LmRnIGxpOm5vdCguZm9sZGVyKXtjdXJzb3I6YXV0bztoZWlnaHQ6MjdweDtsaW5lLWhlaWdodDoyN3B4O292ZXJmbG93OmhpZGRlbjtwYWRkaW5nOjAgNHB4IDAgNXB4fS5kZyBsaS5mb2xkZXJ7cGFkZGluZzowO2JvcmRlci1sZWZ0OjRweCBzb2xpZCByZ2JhKDAsMCwwLDApfS5kZyBsaS50aXRsZXtjdXJzb3I6cG9pbnRlcjttYXJnaW4tbGVmdDotNHB4fS5kZyAuY2xvc2VkIGxpOm5vdCgudGl0bGUpLC5kZyAuY2xvc2VkIHVsIGxpLC5kZyAuY2xvc2VkIHVsIGxpID4gKntoZWlnaHQ6MDtvdmVyZmxvdzpoaWRkZW47Ym9yZGVyOjB9LmRnIC5jcntjbGVhcjpib3RoO3BhZGRpbmctbGVmdDozcHg7aGVpZ2h0OjI3cHh9LmRnIC5wcm9wZXJ0eS1uYW1le2N1cnNvcjpkZWZhdWx0O2Zsb2F0OmxlZnQ7Y2xlYXI6bGVmdDt3aWR0aDo0MCU7b3ZlcmZsb3c6aGlkZGVuO3RleHQtb3ZlcmZsb3c6ZWxsaXBzaXN9LmRnIC5je2Zsb2F0OmxlZnQ7d2lkdGg6NjAlfS5kZyAuYyBpbnB1dFt0eXBlPXRleHRde2JvcmRlcjowO21hcmdpbi10b3A6NHB4O3BhZGRpbmc6M3B4O3dpZHRoOjEwMCU7ZmxvYXQ6cmlnaHR9LmRnIC5oYXMtc2xpZGVyIGlucHV0W3R5cGU9dGV4dF17d2lkdGg6MzAlO21hcmdpbi1sZWZ0OjB9LmRnIC5zbGlkZXJ7ZmxvYXQ6bGVmdDt3aWR0aDo2NiU7bWFyZ2luLWxlZnQ6LTVweDttYXJnaW4tcmlnaHQ6MDtoZWlnaHQ6MTlweDttYXJnaW4tdG9wOjRweH0uZGcgLnNsaWRlci1mZ3toZWlnaHQ6MTAwJX0uZGcgLmMgaW5wdXRbdHlwZT1jaGVja2JveF17bWFyZ2luLXRvcDo5cHh9LmRnIC5jIHNlbGVjdHttYXJnaW4tdG9wOjVweH0uZGcgLmNyLmZ1bmN0aW9uLC5kZyAuY3IuZnVuY3Rpb24gLnByb3BlcnR5LW5hbWUsLmRnIC5jci5mdW5jdGlvbiAqLC5kZyAuY3IuYm9vbGVhbiwuZGcgLmNyLmJvb2xlYW4gKntjdXJzb3I6cG9pbnRlcn0uZGcgLnNlbGVjdG9ye2Rpc3BsYXk6bm9uZTtwb3NpdGlvbjphYnNvbHV0ZTttYXJnaW4tbGVmdDotOXB4O21hcmdpbi10b3A6MjNweDt6LWluZGV4OjEwfS5kZyAuYzpob3ZlciAuc2VsZWN0b3IsLmRnIC5zZWxlY3Rvci5kcmFne2Rpc3BsYXk6YmxvY2t9LmRnIGxpLnNhdmUtcm93e3BhZGRpbmc6MH0uZGcgbGkuc2F2ZS1yb3cgLmJ1dHRvbntkaXNwbGF5OmlubGluZS1ibG9jaztwYWRkaW5nOjBweCA2cHh9LmRnLmRpYWxvZ3Vle2JhY2tncm91bmQtY29sb3I6IzIyMjt3aWR0aDo0NjBweDtwYWRkaW5nOjE1cHg7Zm9udC1zaXplOjEzcHg7bGluZS1oZWlnaHQ6MTVweH0jZGctbmV3LWNvbnN0cnVjdG9ye3BhZGRpbmc6MTBweDtjb2xvcjojMjIyO2ZvbnQtZmFtaWx5Ok1vbmFjbywgbW9ub3NwYWNlO2ZvbnQtc2l6ZToxMHB4O2JvcmRlcjowO3Jlc2l6ZTpub25lO2JveC1zaGFkb3c6aW5zZXQgMXB4IDFweCAxcHggIzg4ODt3b3JkLXdyYXA6YnJlYWstd29yZDttYXJnaW46MTJweCAwO2Rpc3BsYXk6YmxvY2s7d2lkdGg6NDQwcHg7b3ZlcmZsb3cteTpzY3JvbGw7aGVpZ2h0OjEwMHB4O3Bvc2l0aW9uOnJlbGF0aXZlfSNkZy1sb2NhbC1leHBsYWlue2Rpc3BsYXk6bm9uZTtmb250LXNpemU6MTFweDtsaW5lLWhlaWdodDoxN3B4O2JvcmRlci1yYWRpdXM6M3B4O2JhY2tncm91bmQtY29sb3I6IzMzMztwYWRkaW5nOjhweDttYXJnaW4tdG9wOjEwcHh9I2RnLWxvY2FsLWV4cGxhaW4gY29kZXtmb250LXNpemU6MTBweH0jZGF0LWd1aS1zYXZlLWxvY2FsbHl7ZGlzcGxheTpub25lfS5kZ3tjb2xvcjojZWVlO2ZvbnQ6MTFweCAnTHVjaWRhIEdyYW5kZScsIHNhbnMtc2VyaWY7dGV4dC1zaGFkb3c6MCAtMXB4IDAgIzExMX0uZGcubWFpbjo6LXdlYmtpdC1zY3JvbGxiYXJ7d2lkdGg6NXB4O2JhY2tncm91bmQ6IzFhMWExYX0uZGcubWFpbjo6LXdlYmtpdC1zY3JvbGxiYXItY29ybmVye2hlaWdodDowO2Rpc3BsYXk6bm9uZX0uZGcubWFpbjo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWJ7Ym9yZGVyLXJhZGl1czo1cHg7YmFja2dyb3VuZDojNjc2NzY3fS5kZyBsaTpub3QoLmZvbGRlcil7YmFja2dyb3VuZDojMWExYTFhO2JvcmRlci1ib3R0b206MXB4IHNvbGlkICMyYzJjMmN9LmRnIGxpLnNhdmUtcm93e2xpbmUtaGVpZ2h0OjI1cHg7YmFja2dyb3VuZDojZGFkNWNiO2JvcmRlcjowfS5kZyBsaS5zYXZlLXJvdyBzZWxlY3R7bWFyZ2luLWxlZnQ6NXB4O3dpZHRoOjEwOHB4fS5kZyBsaS5zYXZlLXJvdyAuYnV0dG9ue21hcmdpbi1sZWZ0OjVweDttYXJnaW4tdG9wOjFweDtib3JkZXItcmFkaXVzOjJweDtmb250LXNpemU6OXB4O2xpbmUtaGVpZ2h0OjdweDtwYWRkaW5nOjRweCA0cHggNXB4IDRweDtiYWNrZ3JvdW5kOiNjNWJkYWQ7Y29sb3I6I2ZmZjt0ZXh0LXNoYWRvdzowIDFweCAwICNiMGE1OGY7Ym94LXNoYWRvdzowIC0xcHggMCAjYjBhNThmO2N1cnNvcjpwb2ludGVyfS5kZyBsaS5zYXZlLXJvdyAuYnV0dG9uLmdlYXJze2JhY2tncm91bmQ6I2M1YmRhZCB1cmwoZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFBc0FBQUFOQ0FZQUFBQi85WlE3QUFBQUdYUkZXSFJUYjJaMGQyRnlaUUJCWkc5aVpTQkpiV0ZuWlZKbFlXUjVjY2xsUEFBQUFRSkpSRUZVZU5waVlLQVUvUC8vUHdHSUMvQXBDQUJpQlNBVytJOEFDbEFjZ0t4UTRUOWhvTUFFVXJ4eDJRU0dONitlZ0RYKy92V1Q0ZTdOODJBTVlvUEF4L2V2d1dvWW9TWWJBQ1gyczdLeEN4emNzZXpEaDNldkZvREVCWVRFRXF5Y2dnV0F6QTlBdVVTUVFnZVlQYTlmUHY2L1lXbS9BY3g1SVBiN3R5L2Z3K1FaYmx3Njd2RHM4UjBZSHlRaGdPYngreUFKa0JxbUc1ZFBQRGgxYVBPR1IvZXVnVzBHNHZsSW9USWZ5RmNBK1Fla2hoSEpoUGRReGJpQUlndU1CVFFaclBENzEwOE02cm9XWURGUWlJQUF2NkFvdy8xYkZ3WGdpcytmMkxVQXlud29JYU5jejhYTngzRGw3TUVKVURHUXB4OWd0UThZQ3VlQitEMjZPRUNBQVFEYWR0N2U0NkQ0MlFBQUFBQkpSVTVFcmtKZ2dnPT0pIDJweCAxcHggbm8tcmVwZWF0O2hlaWdodDo3cHg7d2lkdGg6OHB4fS5kZyBsaS5zYXZlLXJvdyAuYnV0dG9uOmhvdmVye2JhY2tncm91bmQtY29sb3I6I2JhYjE5ZTtib3gtc2hhZG93OjAgLTFweCAwICNiMGE1OGZ9LmRnIGxpLmZvbGRlcntib3JkZXItYm90dG9tOjB9LmRnIGxpLnRpdGxle3BhZGRpbmctbGVmdDoxNnB4O2JhY2tncm91bmQ6IzAwMCB1cmwoZGF0YTppbWFnZS9naWY7YmFzZTY0LFIwbEdPRGxoQlFBRkFKRUFBUC8vLy9QejgvLy8vLy8vL3lINUJBRUFBQUlBTEFBQUFBQUZBQVVBQUFJSWxJK2hLZ0Z4b0NnQU93PT0pIDZweCAxMHB4IG5vLXJlcGVhdDtjdXJzb3I6cG9pbnRlcjtib3JkZXItYm90dG9tOjFweCBzb2xpZCByZ2JhKDI1NSwyNTUsMjU1LDAuMil9LmRnIC5jbG9zZWQgbGkudGl0bGV7YmFja2dyb3VuZC1pbWFnZTp1cmwoZGF0YTppbWFnZS9naWY7YmFzZTY0LFIwbEdPRGxoQlFBRkFKRUFBUC8vLy9QejgvLy8vLy8vL3lINUJBRUFBQUlBTEFBQUFBQUZBQVVBQUFJSWxHSVdxTUNiV0FFQU93PT0pfS5kZyAuY3IuYm9vbGVhbntib3JkZXItbGVmdDozcHggc29saWQgIzgwNjc4N30uZGcgLmNyLmZ1bmN0aW9ue2JvcmRlci1sZWZ0OjNweCBzb2xpZCAjZTYxZDVmfS5kZyAuY3IubnVtYmVye2JvcmRlci1sZWZ0OjNweCBzb2xpZCAjMmZhMWQ2fS5kZyAuY3IubnVtYmVyIGlucHV0W3R5cGU9dGV4dF17Y29sb3I6IzJmYTFkNn0uZGcgLmNyLnN0cmluZ3tib3JkZXItbGVmdDozcHggc29saWQgIzFlZDM2Zn0uZGcgLmNyLnN0cmluZyBpbnB1dFt0eXBlPXRleHRde2NvbG9yOiMxZWQzNmZ9LmRnIC5jci5mdW5jdGlvbjpob3ZlciwuZGcgLmNyLmJvb2xlYW46aG92ZXJ7YmFja2dyb3VuZDojMTExfS5kZyAuYyBpbnB1dFt0eXBlPXRleHRde2JhY2tncm91bmQ6IzMwMzAzMDtvdXRsaW5lOm5vbmV9LmRnIC5jIGlucHV0W3R5cGU9dGV4dF06aG92ZXJ7YmFja2dyb3VuZDojM2MzYzNjfS5kZyAuYyBpbnB1dFt0eXBlPXRleHRdOmZvY3Vze2JhY2tncm91bmQ6IzQ5NDk0OTtjb2xvcjojZmZmfS5kZyAuYyAuc2xpZGVye2JhY2tncm91bmQ6IzMwMzAzMDtjdXJzb3I6ZXctcmVzaXplfS5kZyAuYyAuc2xpZGVyLWZne2JhY2tncm91bmQ6IzJmYTFkNn0uZGcgLmMgLnNsaWRlcjpob3ZlcntiYWNrZ3JvdW5kOiMzYzNjM2N9LmRnIC5jIC5zbGlkZXI6aG92ZXIgLnNsaWRlci1mZ3tiYWNrZ3JvdW5kOiM0NGFiZGF9XFxuXCIsXG5kYXQuY29udHJvbGxlcnMuZmFjdG9yeSA9IChmdW5jdGlvbiAoT3B0aW9uQ29udHJvbGxlciwgTnVtYmVyQ29udHJvbGxlckJveCwgTnVtYmVyQ29udHJvbGxlclNsaWRlciwgU3RyaW5nQ29udHJvbGxlciwgRnVuY3Rpb25Db250cm9sbGVyLCBCb29sZWFuQ29udHJvbGxlciwgY29tbW9uKSB7XG5cbiAgICAgIHJldHVybiBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7XG5cbiAgICAgICAgdmFyIGluaXRpYWxWYWx1ZSA9IG9iamVjdFtwcm9wZXJ0eV07XG5cbiAgICAgICAgLy8gUHJvdmlkaW5nIG9wdGlvbnM/XG4gICAgICAgIGlmIChjb21tb24uaXNBcnJheShhcmd1bWVudHNbMl0pIHx8IGNvbW1vbi5pc09iamVjdChhcmd1bWVudHNbMl0pKSB7XG4gICAgICAgICAgcmV0dXJuIG5ldyBPcHRpb25Db250cm9sbGVyKG9iamVjdCwgcHJvcGVydHksIGFyZ3VtZW50c1syXSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBQcm92aWRpbmcgYSBtYXA/XG5cbiAgICAgICAgaWYgKGNvbW1vbi5pc051bWJlcihpbml0aWFsVmFsdWUpKSB7XG5cbiAgICAgICAgICBpZiAoY29tbW9uLmlzTnVtYmVyKGFyZ3VtZW50c1syXSkgJiYgY29tbW9uLmlzTnVtYmVyKGFyZ3VtZW50c1szXSkpIHtcblxuICAgICAgICAgICAgLy8gSGFzIG1pbiBhbmQgbWF4LlxuICAgICAgICAgICAgcmV0dXJuIG5ldyBOdW1iZXJDb250cm9sbGVyU2xpZGVyKG9iamVjdCwgcHJvcGVydHksIGFyZ3VtZW50c1syXSwgYXJndW1lbnRzWzNdKTtcblxuICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgTnVtYmVyQ29udHJvbGxlckJveChvYmplY3QsIHByb3BlcnR5LCB7IG1pbjogYXJndW1lbnRzWzJdLCBtYXg6IGFyZ3VtZW50c1szXSB9KTtcblxuICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbW1vbi5pc1N0cmluZyhpbml0aWFsVmFsdWUpKSB7XG4gICAgICAgICAgcmV0dXJuIG5ldyBTdHJpbmdDb250cm9sbGVyKG9iamVjdCwgcHJvcGVydHkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbW1vbi5pc0Z1bmN0aW9uKGluaXRpYWxWYWx1ZSkpIHtcbiAgICAgICAgICByZXR1cm4gbmV3IEZ1bmN0aW9uQ29udHJvbGxlcihvYmplY3QsIHByb3BlcnR5LCAnJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29tbW9uLmlzQm9vbGVhbihpbml0aWFsVmFsdWUpKSB7XG4gICAgICAgICAgcmV0dXJuIG5ldyBCb29sZWFuQ29udHJvbGxlcihvYmplY3QsIHByb3BlcnR5KTtcbiAgICAgICAgfVxuXG4gICAgICB9XG5cbiAgICB9KShkYXQuY29udHJvbGxlcnMuT3B0aW9uQ29udHJvbGxlcixcbmRhdC5jb250cm9sbGVycy5OdW1iZXJDb250cm9sbGVyQm94LFxuZGF0LmNvbnRyb2xsZXJzLk51bWJlckNvbnRyb2xsZXJTbGlkZXIsXG5kYXQuY29udHJvbGxlcnMuU3RyaW5nQ29udHJvbGxlciA9IChmdW5jdGlvbiAoQ29udHJvbGxlciwgZG9tLCBjb21tb24pIHtcblxuICAvKipcbiAgICogQGNsYXNzIFByb3ZpZGVzIGEgdGV4dCBpbnB1dCB0byBhbHRlciB0aGUgc3RyaW5nIHByb3BlcnR5IG9mIGFuIG9iamVjdC5cbiAgICpcbiAgICogQGV4dGVuZHMgZGF0LmNvbnRyb2xsZXJzLkNvbnRyb2xsZXJcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGJlIG1hbmlwdWxhdGVkXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wZXJ0eSBUaGUgbmFtZSBvZiB0aGUgcHJvcGVydHkgdG8gYmUgbWFuaXB1bGF0ZWRcbiAgICpcbiAgICogQG1lbWJlciBkYXQuY29udHJvbGxlcnNcbiAgICovXG4gIHZhciBTdHJpbmdDb250cm9sbGVyID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkge1xuXG4gICAgU3RyaW5nQ29udHJvbGxlci5zdXBlcmNsYXNzLmNhbGwodGhpcywgb2JqZWN0LCBwcm9wZXJ0eSk7XG5cbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgdGhpcy5fX2lucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICB0aGlzLl9faW5wdXQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ3RleHQnKTtcblxuICAgIGRvbS5iaW5kKHRoaXMuX19pbnB1dCwgJ2tleXVwJywgb25DaGFuZ2UpO1xuICAgIGRvbS5iaW5kKHRoaXMuX19pbnB1dCwgJ2NoYW5nZScsIG9uQ2hhbmdlKTtcbiAgICBkb20uYmluZCh0aGlzLl9faW5wdXQsICdibHVyJywgb25CbHVyKTtcbiAgICBkb20uYmluZCh0aGlzLl9faW5wdXQsICdrZXlkb3duJywgZnVuY3Rpb24oZSkge1xuICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMTMpIHtcbiAgICAgICAgdGhpcy5ibHVyKCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgXG5cbiAgICBmdW5jdGlvbiBvbkNoYW5nZSgpIHtcbiAgICAgIF90aGlzLnNldFZhbHVlKF90aGlzLl9faW5wdXQudmFsdWUpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uQmx1cigpIHtcbiAgICAgIGlmIChfdGhpcy5fX29uRmluaXNoQ2hhbmdlKSB7XG4gICAgICAgIF90aGlzLl9fb25GaW5pc2hDaGFuZ2UuY2FsbChfdGhpcywgX3RoaXMuZ2V0VmFsdWUoKSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy51cGRhdGVEaXNwbGF5KCk7XG5cbiAgICB0aGlzLmRvbUVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5fX2lucHV0KTtcblxuICB9O1xuXG4gIFN0cmluZ0NvbnRyb2xsZXIuc3VwZXJjbGFzcyA9IENvbnRyb2xsZXI7XG5cbiAgY29tbW9uLmV4dGVuZChcblxuICAgICAgU3RyaW5nQ29udHJvbGxlci5wcm90b3R5cGUsXG4gICAgICBDb250cm9sbGVyLnByb3RvdHlwZSxcblxuICAgICAge1xuXG4gICAgICAgIHVwZGF0ZURpc3BsYXk6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIC8vIFN0b3BzIHRoZSBjYXJldCBmcm9tIG1vdmluZyBvbiBhY2NvdW50IG9mOlxuICAgICAgICAgIC8vIGtleXVwIC0+IHNldFZhbHVlIC0+IHVwZGF0ZURpc3BsYXlcbiAgICAgICAgICBpZiAoIWRvbS5pc0FjdGl2ZSh0aGlzLl9faW5wdXQpKSB7XG4gICAgICAgICAgICB0aGlzLl9faW5wdXQudmFsdWUgPSB0aGlzLmdldFZhbHVlKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBTdHJpbmdDb250cm9sbGVyLnN1cGVyY2xhc3MucHJvdG90eXBlLnVwZGF0ZURpc3BsYXkuY2FsbCh0aGlzKTtcbiAgICAgICAgfVxuXG4gICAgICB9XG5cbiAgKTtcblxuICByZXR1cm4gU3RyaW5nQ29udHJvbGxlcjtcblxufSkoZGF0LmNvbnRyb2xsZXJzLkNvbnRyb2xsZXIsXG5kYXQuZG9tLmRvbSxcbmRhdC51dGlscy5jb21tb24pLFxuZGF0LmNvbnRyb2xsZXJzLkZ1bmN0aW9uQ29udHJvbGxlcixcbmRhdC5jb250cm9sbGVycy5Cb29sZWFuQ29udHJvbGxlcixcbmRhdC51dGlscy5jb21tb24pLFxuZGF0LmNvbnRyb2xsZXJzLkNvbnRyb2xsZXIsXG5kYXQuY29udHJvbGxlcnMuQm9vbGVhbkNvbnRyb2xsZXIsXG5kYXQuY29udHJvbGxlcnMuRnVuY3Rpb25Db250cm9sbGVyLFxuZGF0LmNvbnRyb2xsZXJzLk51bWJlckNvbnRyb2xsZXJCb3gsXG5kYXQuY29udHJvbGxlcnMuTnVtYmVyQ29udHJvbGxlclNsaWRlcixcbmRhdC5jb250cm9sbGVycy5PcHRpb25Db250cm9sbGVyLFxuZGF0LmNvbnRyb2xsZXJzLkNvbG9yQ29udHJvbGxlciA9IChmdW5jdGlvbiAoQ29udHJvbGxlciwgZG9tLCBDb2xvciwgaW50ZXJwcmV0LCBjb21tb24pIHtcblxuICB2YXIgQ29sb3JDb250cm9sbGVyID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkge1xuXG4gICAgQ29sb3JDb250cm9sbGVyLnN1cGVyY2xhc3MuY2FsbCh0aGlzLCBvYmplY3QsIHByb3BlcnR5KTtcblxuICAgIHRoaXMuX19jb2xvciA9IG5ldyBDb2xvcih0aGlzLmdldFZhbHVlKCkpO1xuICAgIHRoaXMuX190ZW1wID0gbmV3IENvbG9yKDApO1xuXG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIHRoaXMuZG9tRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgZG9tLm1ha2VTZWxlY3RhYmxlKHRoaXMuZG9tRWxlbWVudCwgZmFsc2UpO1xuXG4gICAgdGhpcy5fX3NlbGVjdG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5fX3NlbGVjdG9yLmNsYXNzTmFtZSA9ICdzZWxlY3Rvcic7XG5cbiAgICB0aGlzLl9fc2F0dXJhdGlvbl9maWVsZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMuX19zYXR1cmF0aW9uX2ZpZWxkLmNsYXNzTmFtZSA9ICdzYXR1cmF0aW9uLWZpZWxkJztcblxuICAgIHRoaXMuX19maWVsZF9rbm9iID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5fX2ZpZWxkX2tub2IuY2xhc3NOYW1lID0gJ2ZpZWxkLWtub2InO1xuICAgIHRoaXMuX19maWVsZF9rbm9iX2JvcmRlciA9ICcycHggc29saWQgJztcblxuICAgIHRoaXMuX19odWVfa25vYiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMuX19odWVfa25vYi5jbGFzc05hbWUgPSAnaHVlLWtub2InO1xuXG4gICAgdGhpcy5fX2h1ZV9maWVsZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMuX19odWVfZmllbGQuY2xhc3NOYW1lID0gJ2h1ZS1maWVsZCc7XG5cbiAgICB0aGlzLl9faW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIHRoaXMuX19pbnB1dC50eXBlID0gJ3RleHQnO1xuICAgIHRoaXMuX19pbnB1dF90ZXh0U2hhZG93ID0gJzAgMXB4IDFweCAnO1xuXG4gICAgZG9tLmJpbmQodGhpcy5fX2lucHV0LCAna2V5ZG93bicsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIGlmIChlLmtleUNvZGUgPT09IDEzKSB7IC8vIG9uIGVudGVyXG4gICAgICAgIG9uQmx1ci5jYWxsKHRoaXMpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgZG9tLmJpbmQodGhpcy5fX2lucHV0LCAnYmx1cicsIG9uQmx1cik7XG5cbiAgICBkb20uYmluZCh0aGlzLl9fc2VsZWN0b3IsICdtb3VzZWRvd24nLCBmdW5jdGlvbihlKSB7XG5cbiAgICAgIGRvbVxuICAgICAgICAuYWRkQ2xhc3ModGhpcywgJ2RyYWcnKVxuICAgICAgICAuYmluZCh3aW5kb3csICdtb3VzZXVwJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgIGRvbS5yZW1vdmVDbGFzcyhfdGhpcy5fX3NlbGVjdG9yLCAnZHJhZycpO1xuICAgICAgICB9KTtcblxuICAgIH0pO1xuXG4gICAgdmFyIHZhbHVlX2ZpZWxkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICBjb21tb24uZXh0ZW5kKHRoaXMuX19zZWxlY3Rvci5zdHlsZSwge1xuICAgICAgd2lkdGg6ICcxMjJweCcsXG4gICAgICBoZWlnaHQ6ICcxMDJweCcsXG4gICAgICBwYWRkaW5nOiAnM3B4JyxcbiAgICAgIGJhY2tncm91bmRDb2xvcjogJyMyMjInLFxuICAgICAgYm94U2hhZG93OiAnMHB4IDFweCAzcHggcmdiYSgwLDAsMCwwLjMpJ1xuICAgIH0pO1xuXG4gICAgY29tbW9uLmV4dGVuZCh0aGlzLl9fZmllbGRfa25vYi5zdHlsZSwge1xuICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICB3aWR0aDogJzEycHgnLFxuICAgICAgaGVpZ2h0OiAnMTJweCcsXG4gICAgICBib3JkZXI6IHRoaXMuX19maWVsZF9rbm9iX2JvcmRlciArICh0aGlzLl9fY29sb3IudiA8IC41ID8gJyNmZmYnIDogJyMwMDAnKSxcbiAgICAgIGJveFNoYWRvdzogJzBweCAxcHggM3B4IHJnYmEoMCwwLDAsMC41KScsXG4gICAgICBib3JkZXJSYWRpdXM6ICcxMnB4JyxcbiAgICAgIHpJbmRleDogMVxuICAgIH0pO1xuICAgIFxuICAgIGNvbW1vbi5leHRlbmQodGhpcy5fX2h1ZV9rbm9iLnN0eWxlLCB7XG4gICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgIHdpZHRoOiAnMTVweCcsXG4gICAgICBoZWlnaHQ6ICcycHgnLFxuICAgICAgYm9yZGVyUmlnaHQ6ICc0cHggc29saWQgI2ZmZicsXG4gICAgICB6SW5kZXg6IDFcbiAgICB9KTtcblxuICAgIGNvbW1vbi5leHRlbmQodGhpcy5fX3NhdHVyYXRpb25fZmllbGQuc3R5bGUsIHtcbiAgICAgIHdpZHRoOiAnMTAwcHgnLFxuICAgICAgaGVpZ2h0OiAnMTAwcHgnLFxuICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkICM1NTUnLFxuICAgICAgbWFyZ2luUmlnaHQ6ICczcHgnLFxuICAgICAgZGlzcGxheTogJ2lubGluZS1ibG9jaycsXG4gICAgICBjdXJzb3I6ICdwb2ludGVyJ1xuICAgIH0pO1xuXG4gICAgY29tbW9uLmV4dGVuZCh2YWx1ZV9maWVsZC5zdHlsZSwge1xuICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICAgIGhlaWdodDogJzEwMCUnLFxuICAgICAgYmFja2dyb3VuZDogJ25vbmUnXG4gICAgfSk7XG4gICAgXG4gICAgbGluZWFyR3JhZGllbnQodmFsdWVfZmllbGQsICd0b3AnLCAncmdiYSgwLDAsMCwwKScsICcjMDAwJyk7XG5cbiAgICBjb21tb24uZXh0ZW5kKHRoaXMuX19odWVfZmllbGQuc3R5bGUsIHtcbiAgICAgIHdpZHRoOiAnMTVweCcsXG4gICAgICBoZWlnaHQ6ICcxMDBweCcsXG4gICAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcbiAgICAgIGJvcmRlcjogJzFweCBzb2xpZCAjNTU1JyxcbiAgICAgIGN1cnNvcjogJ25zLXJlc2l6ZSdcbiAgICB9KTtcblxuICAgIGh1ZUdyYWRpZW50KHRoaXMuX19odWVfZmllbGQpO1xuXG4gICAgY29tbW9uLmV4dGVuZCh0aGlzLl9faW5wdXQuc3R5bGUsIHtcbiAgICAgIG91dGxpbmU6ICdub25lJyxcbi8vICAgICAgd2lkdGg6ICcxMjBweCcsXG4gICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxuLy8gICAgICBwYWRkaW5nOiAnNHB4Jyxcbi8vICAgICAgbWFyZ2luQm90dG9tOiAnNnB4JyxcbiAgICAgIGNvbG9yOiAnI2ZmZicsXG4gICAgICBib3JkZXI6IDAsXG4gICAgICBmb250V2VpZ2h0OiAnYm9sZCcsXG4gICAgICB0ZXh0U2hhZG93OiB0aGlzLl9faW5wdXRfdGV4dFNoYWRvdyArICdyZ2JhKDAsMCwwLDAuNyknXG4gICAgfSk7XG5cbiAgICBkb20uYmluZCh0aGlzLl9fc2F0dXJhdGlvbl9maWVsZCwgJ21vdXNlZG93bicsIGZpZWxkRG93bik7XG4gICAgZG9tLmJpbmQodGhpcy5fX2ZpZWxkX2tub2IsICdtb3VzZWRvd24nLCBmaWVsZERvd24pO1xuXG4gICAgZG9tLmJpbmQodGhpcy5fX2h1ZV9maWVsZCwgJ21vdXNlZG93bicsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIHNldEgoZSk7XG4gICAgICBkb20uYmluZCh3aW5kb3csICdtb3VzZW1vdmUnLCBzZXRIKTtcbiAgICAgIGRvbS5iaW5kKHdpbmRvdywgJ21vdXNldXAnLCB1bmJpbmRIKTtcbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIGZpZWxkRG93bihlKSB7XG4gICAgICBzZXRTVihlKTtcbiAgICAgIC8vIGRvY3VtZW50LmJvZHkuc3R5bGUuY3Vyc29yID0gJ25vbmUnO1xuICAgICAgZG9tLmJpbmQod2luZG93LCAnbW91c2Vtb3ZlJywgc2V0U1YpO1xuICAgICAgZG9tLmJpbmQod2luZG93LCAnbW91c2V1cCcsIHVuYmluZFNWKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1bmJpbmRTVigpIHtcbiAgICAgIGRvbS51bmJpbmQod2luZG93LCAnbW91c2Vtb3ZlJywgc2V0U1YpO1xuICAgICAgZG9tLnVuYmluZCh3aW5kb3csICdtb3VzZXVwJywgdW5iaW5kU1YpO1xuICAgICAgLy8gZG9jdW1lbnQuYm9keS5zdHlsZS5jdXJzb3IgPSAnZGVmYXVsdCc7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25CbHVyKCkge1xuICAgICAgdmFyIGkgPSBpbnRlcnByZXQodGhpcy52YWx1ZSk7XG4gICAgICBpZiAoaSAhPT0gZmFsc2UpIHtcbiAgICAgICAgX3RoaXMuX19jb2xvci5fX3N0YXRlID0gaTtcbiAgICAgICAgX3RoaXMuc2V0VmFsdWUoX3RoaXMuX19jb2xvci50b09yaWdpbmFsKCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IF90aGlzLl9fY29sb3IudG9TdHJpbmcoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1bmJpbmRIKCkge1xuICAgICAgZG9tLnVuYmluZCh3aW5kb3csICdtb3VzZW1vdmUnLCBzZXRIKTtcbiAgICAgIGRvbS51bmJpbmQod2luZG93LCAnbW91c2V1cCcsIHVuYmluZEgpO1xuICAgIH1cblxuICAgIHRoaXMuX19zYXR1cmF0aW9uX2ZpZWxkLmFwcGVuZENoaWxkKHZhbHVlX2ZpZWxkKTtcbiAgICB0aGlzLl9fc2VsZWN0b3IuYXBwZW5kQ2hpbGQodGhpcy5fX2ZpZWxkX2tub2IpO1xuICAgIHRoaXMuX19zZWxlY3Rvci5hcHBlbmRDaGlsZCh0aGlzLl9fc2F0dXJhdGlvbl9maWVsZCk7XG4gICAgdGhpcy5fX3NlbGVjdG9yLmFwcGVuZENoaWxkKHRoaXMuX19odWVfZmllbGQpO1xuICAgIHRoaXMuX19odWVfZmllbGQuYXBwZW5kQ2hpbGQodGhpcy5fX2h1ZV9rbm9iKTtcblxuICAgIHRoaXMuZG9tRWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLl9faW5wdXQpO1xuICAgIHRoaXMuZG9tRWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLl9fc2VsZWN0b3IpO1xuXG4gICAgdGhpcy51cGRhdGVEaXNwbGF5KCk7XG5cbiAgICBmdW5jdGlvbiBzZXRTVihlKSB7XG5cbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgdmFyIHcgPSBkb20uZ2V0V2lkdGgoX3RoaXMuX19zYXR1cmF0aW9uX2ZpZWxkKTtcbiAgICAgIHZhciBvID0gZG9tLmdldE9mZnNldChfdGhpcy5fX3NhdHVyYXRpb25fZmllbGQpO1xuICAgICAgdmFyIHMgPSAoZS5jbGllbnRYIC0gby5sZWZ0ICsgZG9jdW1lbnQuYm9keS5zY3JvbGxMZWZ0KSAvIHc7XG4gICAgICB2YXIgdiA9IDEgLSAoZS5jbGllbnRZIC0gby50b3AgKyBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCkgLyB3O1xuXG4gICAgICBpZiAodiA+IDEpIHYgPSAxO1xuICAgICAgZWxzZSBpZiAodiA8IDApIHYgPSAwO1xuXG4gICAgICBpZiAocyA+IDEpIHMgPSAxO1xuICAgICAgZWxzZSBpZiAocyA8IDApIHMgPSAwO1xuXG4gICAgICBfdGhpcy5fX2NvbG9yLnYgPSB2O1xuICAgICAgX3RoaXMuX19jb2xvci5zID0gcztcblxuICAgICAgX3RoaXMuc2V0VmFsdWUoX3RoaXMuX19jb2xvci50b09yaWdpbmFsKCkpO1xuXG5cbiAgICAgIHJldHVybiBmYWxzZTtcblxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldEgoZSkge1xuXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgIHZhciBzID0gZG9tLmdldEhlaWdodChfdGhpcy5fX2h1ZV9maWVsZCk7XG4gICAgICB2YXIgbyA9IGRvbS5nZXRPZmZzZXQoX3RoaXMuX19odWVfZmllbGQpO1xuICAgICAgdmFyIGggPSAxIC0gKGUuY2xpZW50WSAtIG8udG9wICsgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3ApIC8gcztcblxuICAgICAgaWYgKGggPiAxKSBoID0gMTtcbiAgICAgIGVsc2UgaWYgKGggPCAwKSBoID0gMDtcblxuICAgICAgX3RoaXMuX19jb2xvci5oID0gaCAqIDM2MDtcblxuICAgICAgX3RoaXMuc2V0VmFsdWUoX3RoaXMuX19jb2xvci50b09yaWdpbmFsKCkpO1xuXG4gICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICB9XG5cbiAgfTtcblxuICBDb2xvckNvbnRyb2xsZXIuc3VwZXJjbGFzcyA9IENvbnRyb2xsZXI7XG5cbiAgY29tbW9uLmV4dGVuZChcblxuICAgICAgQ29sb3JDb250cm9sbGVyLnByb3RvdHlwZSxcbiAgICAgIENvbnRyb2xsZXIucHJvdG90eXBlLFxuXG4gICAgICB7XG5cbiAgICAgICAgdXBkYXRlRGlzcGxheTogZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICB2YXIgaSA9IGludGVycHJldCh0aGlzLmdldFZhbHVlKCkpO1xuXG4gICAgICAgICAgaWYgKGkgIT09IGZhbHNlKSB7XG5cbiAgICAgICAgICAgIHZhciBtaXNtYXRjaCA9IGZhbHNlO1xuXG4gICAgICAgICAgICAvLyBDaGVjayBmb3IgbWlzbWF0Y2ggb24gdGhlIGludGVycHJldGVkIHZhbHVlLlxuXG4gICAgICAgICAgICBjb21tb24uZWFjaChDb2xvci5DT01QT05FTlRTLCBmdW5jdGlvbihjb21wb25lbnQpIHtcbiAgICAgICAgICAgICAgaWYgKCFjb21tb24uaXNVbmRlZmluZWQoaVtjb21wb25lbnRdKSAmJlxuICAgICAgICAgICAgICAgICAgIWNvbW1vbi5pc1VuZGVmaW5lZCh0aGlzLl9fY29sb3IuX19zdGF0ZVtjb21wb25lbnRdKSAmJlxuICAgICAgICAgICAgICAgICAgaVtjb21wb25lbnRdICE9PSB0aGlzLl9fY29sb3IuX19zdGF0ZVtjb21wb25lbnRdKSB7XG4gICAgICAgICAgICAgICAgbWlzbWF0Y2ggPSB0cnVlO1xuICAgICAgICAgICAgICAgIHJldHVybiB7fTsgLy8gYnJlYWtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgdGhpcyk7XG5cbiAgICAgICAgICAgIC8vIElmIG5vdGhpbmcgZGl2ZXJnZXMsIHdlIGtlZXAgb3VyIHByZXZpb3VzIHZhbHVlc1xuICAgICAgICAgICAgLy8gZm9yIHN0YXRlZnVsbmVzcywgb3RoZXJ3aXNlIHdlIHJlY2FsY3VsYXRlIGZyZXNoXG4gICAgICAgICAgICBpZiAobWlzbWF0Y2gpIHtcbiAgICAgICAgICAgICAgY29tbW9uLmV4dGVuZCh0aGlzLl9fY29sb3IuX19zdGF0ZSwgaSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb21tb24uZXh0ZW5kKHRoaXMuX190ZW1wLl9fc3RhdGUsIHRoaXMuX19jb2xvci5fX3N0YXRlKTtcblxuICAgICAgICAgIHRoaXMuX190ZW1wLmEgPSAxO1xuXG4gICAgICAgICAgdmFyIGZsaXAgPSAodGhpcy5fX2NvbG9yLnYgPCAuNSB8fCB0aGlzLl9fY29sb3IucyA+IC41KSA/IDI1NSA6IDA7XG4gICAgICAgICAgdmFyIF9mbGlwID0gMjU1IC0gZmxpcDtcblxuICAgICAgICAgIGNvbW1vbi5leHRlbmQodGhpcy5fX2ZpZWxkX2tub2Iuc3R5bGUsIHtcbiAgICAgICAgICAgIG1hcmdpbkxlZnQ6IDEwMCAqIHRoaXMuX19jb2xvci5zIC0gNyArICdweCcsXG4gICAgICAgICAgICBtYXJnaW5Ub3A6IDEwMCAqICgxIC0gdGhpcy5fX2NvbG9yLnYpIC0gNyArICdweCcsXG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IHRoaXMuX190ZW1wLnRvU3RyaW5nKCksXG4gICAgICAgICAgICBib3JkZXI6IHRoaXMuX19maWVsZF9rbm9iX2JvcmRlciArICdyZ2IoJyArIGZsaXAgKyAnLCcgKyBmbGlwICsgJywnICsgZmxpcCArJyknXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICB0aGlzLl9faHVlX2tub2Iuc3R5bGUubWFyZ2luVG9wID0gKDEgLSB0aGlzLl9fY29sb3IuaCAvIDM2MCkgKiAxMDAgKyAncHgnXG5cbiAgICAgICAgICB0aGlzLl9fdGVtcC5zID0gMTtcbiAgICAgICAgICB0aGlzLl9fdGVtcC52ID0gMTtcblxuICAgICAgICAgIGxpbmVhckdyYWRpZW50KHRoaXMuX19zYXR1cmF0aW9uX2ZpZWxkLCAnbGVmdCcsICcjZmZmJywgdGhpcy5fX3RlbXAudG9TdHJpbmcoKSk7XG5cbiAgICAgICAgICBjb21tb24uZXh0ZW5kKHRoaXMuX19pbnB1dC5zdHlsZSwge1xuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiB0aGlzLl9faW5wdXQudmFsdWUgPSB0aGlzLl9fY29sb3IudG9TdHJpbmcoKSxcbiAgICAgICAgICAgIGNvbG9yOiAncmdiKCcgKyBmbGlwICsgJywnICsgZmxpcCArICcsJyArIGZsaXAgKycpJyxcbiAgICAgICAgICAgIHRleHRTaGFkb3c6IHRoaXMuX19pbnB1dF90ZXh0U2hhZG93ICsgJ3JnYmEoJyArIF9mbGlwICsgJywnICsgX2ZsaXAgKyAnLCcgKyBfZmxpcCArJywuNyknXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuXG4gICAgICB9XG5cbiAgKTtcbiAgXG4gIHZhciB2ZW5kb3JzID0gWyctbW96LScsJy1vLScsJy13ZWJraXQtJywnLW1zLScsJyddO1xuICBcbiAgZnVuY3Rpb24gbGluZWFyR3JhZGllbnQoZWxlbSwgeCwgYSwgYikge1xuICAgIGVsZW0uc3R5bGUuYmFja2dyb3VuZCA9ICcnO1xuICAgIGNvbW1vbi5lYWNoKHZlbmRvcnMsIGZ1bmN0aW9uKHZlbmRvcikge1xuICAgICAgZWxlbS5zdHlsZS5jc3NUZXh0ICs9ICdiYWNrZ3JvdW5kOiAnICsgdmVuZG9yICsgJ2xpbmVhci1ncmFkaWVudCgnK3grJywgJythKycgMCUsICcgKyBiICsgJyAxMDAlKTsgJztcbiAgICB9KTtcbiAgfVxuICBcbiAgZnVuY3Rpb24gaHVlR3JhZGllbnQoZWxlbSkge1xuICAgIGVsZW0uc3R5bGUuYmFja2dyb3VuZCA9ICcnO1xuICAgIGVsZW0uc3R5bGUuY3NzVGV4dCArPSAnYmFja2dyb3VuZDogLW1vei1saW5lYXItZ3JhZGllbnQodG9wLCAgI2ZmMDAwMCAwJSwgI2ZmMDBmZiAxNyUsICMwMDAwZmYgMzQlLCAjMDBmZmZmIDUwJSwgIzAwZmYwMCA2NyUsICNmZmZmMDAgODQlLCAjZmYwMDAwIDEwMCUpOydcbiAgICBlbGVtLnN0eWxlLmNzc1RleHQgKz0gJ2JhY2tncm91bmQ6IC13ZWJraXQtbGluZWFyLWdyYWRpZW50KHRvcCwgICNmZjAwMDAgMCUsI2ZmMDBmZiAxNyUsIzAwMDBmZiAzNCUsIzAwZmZmZiA1MCUsIzAwZmYwMCA2NyUsI2ZmZmYwMCA4NCUsI2ZmMDAwMCAxMDAlKTsnXG4gICAgZWxlbS5zdHlsZS5jc3NUZXh0ICs9ICdiYWNrZ3JvdW5kOiAtby1saW5lYXItZ3JhZGllbnQodG9wLCAgI2ZmMDAwMCAwJSwjZmYwMGZmIDE3JSwjMDAwMGZmIDM0JSwjMDBmZmZmIDUwJSwjMDBmZjAwIDY3JSwjZmZmZjAwIDg0JSwjZmYwMDAwIDEwMCUpOydcbiAgICBlbGVtLnN0eWxlLmNzc1RleHQgKz0gJ2JhY2tncm91bmQ6IC1tcy1saW5lYXItZ3JhZGllbnQodG9wLCAgI2ZmMDAwMCAwJSwjZmYwMGZmIDE3JSwjMDAwMGZmIDM0JSwjMDBmZmZmIDUwJSwjMDBmZjAwIDY3JSwjZmZmZjAwIDg0JSwjZmYwMDAwIDEwMCUpOydcbiAgICBlbGVtLnN0eWxlLmNzc1RleHQgKz0gJ2JhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCh0b3AsICAjZmYwMDAwIDAlLCNmZjAwZmYgMTclLCMwMDAwZmYgMzQlLCMwMGZmZmYgNTAlLCMwMGZmMDAgNjclLCNmZmZmMDAgODQlLCNmZjAwMDAgMTAwJSk7J1xuICB9XG5cblxuICByZXR1cm4gQ29sb3JDb250cm9sbGVyO1xuXG59KShkYXQuY29udHJvbGxlcnMuQ29udHJvbGxlcixcbmRhdC5kb20uZG9tLFxuZGF0LmNvbG9yLkNvbG9yID0gKGZ1bmN0aW9uIChpbnRlcnByZXQsIG1hdGgsIHRvU3RyaW5nLCBjb21tb24pIHtcblxuICB2YXIgQ29sb3IgPSBmdW5jdGlvbigpIHtcblxuICAgIHRoaXMuX19zdGF0ZSA9IGludGVycHJldC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXG4gICAgaWYgKHRoaXMuX19zdGF0ZSA9PT0gZmFsc2UpIHtcbiAgICAgIHRocm93ICdGYWlsZWQgdG8gaW50ZXJwcmV0IGNvbG9yIGFyZ3VtZW50cyc7XG4gICAgfVxuXG4gICAgdGhpcy5fX3N0YXRlLmEgPSB0aGlzLl9fc3RhdGUuYSB8fCAxO1xuXG5cbiAgfTtcblxuICBDb2xvci5DT01QT05FTlRTID0gWydyJywnZycsJ2InLCdoJywncycsJ3YnLCdoZXgnLCdhJ107XG5cbiAgY29tbW9uLmV4dGVuZChDb2xvci5wcm90b3R5cGUsIHtcblxuICAgIHRvU3RyaW5nOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0b1N0cmluZyh0aGlzKTtcbiAgICB9LFxuXG4gICAgdG9PcmlnaW5hbDogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5fX3N0YXRlLmNvbnZlcnNpb24ud3JpdGUodGhpcyk7XG4gICAgfVxuXG4gIH0pO1xuXG4gIGRlZmluZVJHQkNvbXBvbmVudChDb2xvci5wcm90b3R5cGUsICdyJywgMik7XG4gIGRlZmluZVJHQkNvbXBvbmVudChDb2xvci5wcm90b3R5cGUsICdnJywgMSk7XG4gIGRlZmluZVJHQkNvbXBvbmVudChDb2xvci5wcm90b3R5cGUsICdiJywgMCk7XG5cbiAgZGVmaW5lSFNWQ29tcG9uZW50KENvbG9yLnByb3RvdHlwZSwgJ2gnKTtcbiAgZGVmaW5lSFNWQ29tcG9uZW50KENvbG9yLnByb3RvdHlwZSwgJ3MnKTtcbiAgZGVmaW5lSFNWQ29tcG9uZW50KENvbG9yLnByb3RvdHlwZSwgJ3YnKTtcblxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ29sb3IucHJvdG90eXBlLCAnYScsIHtcblxuICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5fX3N0YXRlLmE7XG4gICAgfSxcblxuICAgIHNldDogZnVuY3Rpb24odikge1xuICAgICAgdGhpcy5fX3N0YXRlLmEgPSB2O1xuICAgIH1cblxuICB9KTtcblxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ29sb3IucHJvdG90eXBlLCAnaGV4Jywge1xuXG4gICAgZ2V0OiBmdW5jdGlvbigpIHtcblxuICAgICAgaWYgKCF0aGlzLl9fc3RhdGUuc3BhY2UgIT09ICdIRVgnKSB7XG4gICAgICAgIHRoaXMuX19zdGF0ZS5oZXggPSBtYXRoLnJnYl90b19oZXgodGhpcy5yLCB0aGlzLmcsIHRoaXMuYik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLl9fc3RhdGUuaGV4O1xuXG4gICAgfSxcblxuICAgIHNldDogZnVuY3Rpb24odikge1xuXG4gICAgICB0aGlzLl9fc3RhdGUuc3BhY2UgPSAnSEVYJztcbiAgICAgIHRoaXMuX19zdGF0ZS5oZXggPSB2O1xuXG4gICAgfVxuXG4gIH0pO1xuXG4gIGZ1bmN0aW9uIGRlZmluZVJHQkNvbXBvbmVudCh0YXJnZXQsIGNvbXBvbmVudCwgY29tcG9uZW50SGV4SW5kZXgpIHtcblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGNvbXBvbmVudCwge1xuXG4gICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIGlmICh0aGlzLl9fc3RhdGUuc3BhY2UgPT09ICdSR0InKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuX19zdGF0ZVtjb21wb25lbnRdO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVjYWxjdWxhdGVSR0IodGhpcywgY29tcG9uZW50LCBjb21wb25lbnRIZXhJbmRleCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX19zdGF0ZVtjb21wb25lbnRdO1xuXG4gICAgICB9LFxuXG4gICAgICBzZXQ6IGZ1bmN0aW9uKHYpIHtcblxuICAgICAgICBpZiAodGhpcy5fX3N0YXRlLnNwYWNlICE9PSAnUkdCJykge1xuICAgICAgICAgIHJlY2FsY3VsYXRlUkdCKHRoaXMsIGNvbXBvbmVudCwgY29tcG9uZW50SGV4SW5kZXgpO1xuICAgICAgICAgIHRoaXMuX19zdGF0ZS5zcGFjZSA9ICdSR0InO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fX3N0YXRlW2NvbXBvbmVudF0gPSB2O1xuXG4gICAgICB9XG5cbiAgICB9KTtcblxuICB9XG5cbiAgZnVuY3Rpb24gZGVmaW5lSFNWQ29tcG9uZW50KHRhcmdldCwgY29tcG9uZW50KSB7XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBjb21wb25lbnQsIHtcblxuICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcblxuICAgICAgICBpZiAodGhpcy5fX3N0YXRlLnNwYWNlID09PSAnSFNWJylcbiAgICAgICAgICByZXR1cm4gdGhpcy5fX3N0YXRlW2NvbXBvbmVudF07XG5cbiAgICAgICAgcmVjYWxjdWxhdGVIU1YodGhpcyk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX19zdGF0ZVtjb21wb25lbnRdO1xuXG4gICAgICB9LFxuXG4gICAgICBzZXQ6IGZ1bmN0aW9uKHYpIHtcblxuICAgICAgICBpZiAodGhpcy5fX3N0YXRlLnNwYWNlICE9PSAnSFNWJykge1xuICAgICAgICAgIHJlY2FsY3VsYXRlSFNWKHRoaXMpO1xuICAgICAgICAgIHRoaXMuX19zdGF0ZS5zcGFjZSA9ICdIU1YnO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fX3N0YXRlW2NvbXBvbmVudF0gPSB2O1xuXG4gICAgICB9XG5cbiAgICB9KTtcblxuICB9XG5cbiAgZnVuY3Rpb24gcmVjYWxjdWxhdGVSR0IoY29sb3IsIGNvbXBvbmVudCwgY29tcG9uZW50SGV4SW5kZXgpIHtcblxuICAgIGlmIChjb2xvci5fX3N0YXRlLnNwYWNlID09PSAnSEVYJykge1xuXG4gICAgICBjb2xvci5fX3N0YXRlW2NvbXBvbmVudF0gPSBtYXRoLmNvbXBvbmVudF9mcm9tX2hleChjb2xvci5fX3N0YXRlLmhleCwgY29tcG9uZW50SGV4SW5kZXgpO1xuXG4gICAgfSBlbHNlIGlmIChjb2xvci5fX3N0YXRlLnNwYWNlID09PSAnSFNWJykge1xuXG4gICAgICBjb21tb24uZXh0ZW5kKGNvbG9yLl9fc3RhdGUsIG1hdGguaHN2X3RvX3JnYihjb2xvci5fX3N0YXRlLmgsIGNvbG9yLl9fc3RhdGUucywgY29sb3IuX19zdGF0ZS52KSk7XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICB0aHJvdyAnQ29ycnVwdGVkIGNvbG9yIHN0YXRlJztcblxuICAgIH1cblxuICB9XG5cbiAgZnVuY3Rpb24gcmVjYWxjdWxhdGVIU1YoY29sb3IpIHtcblxuICAgIHZhciByZXN1bHQgPSBtYXRoLnJnYl90b19oc3YoY29sb3IuciwgY29sb3IuZywgY29sb3IuYik7XG5cbiAgICBjb21tb24uZXh0ZW5kKGNvbG9yLl9fc3RhdGUsXG4gICAgICAgIHtcbiAgICAgICAgICBzOiByZXN1bHQucyxcbiAgICAgICAgICB2OiByZXN1bHQudlxuICAgICAgICB9XG4gICAgKTtcblxuICAgIGlmICghY29tbW9uLmlzTmFOKHJlc3VsdC5oKSkge1xuICAgICAgY29sb3IuX19zdGF0ZS5oID0gcmVzdWx0Lmg7XG4gICAgfSBlbHNlIGlmIChjb21tb24uaXNVbmRlZmluZWQoY29sb3IuX19zdGF0ZS5oKSkge1xuICAgICAgY29sb3IuX19zdGF0ZS5oID0gMDtcbiAgICB9XG5cbiAgfVxuXG4gIHJldHVybiBDb2xvcjtcblxufSkoZGF0LmNvbG9yLmludGVycHJldCxcbmRhdC5jb2xvci5tYXRoID0gKGZ1bmN0aW9uICgpIHtcblxuICB2YXIgdG1wQ29tcG9uZW50O1xuXG4gIHJldHVybiB7XG5cbiAgICBoc3ZfdG9fcmdiOiBmdW5jdGlvbihoLCBzLCB2KSB7XG5cbiAgICAgIHZhciBoaSA9IE1hdGguZmxvb3IoaCAvIDYwKSAlIDY7XG5cbiAgICAgIHZhciBmID0gaCAvIDYwIC0gTWF0aC5mbG9vcihoIC8gNjApO1xuICAgICAgdmFyIHAgPSB2ICogKDEuMCAtIHMpO1xuICAgICAgdmFyIHEgPSB2ICogKDEuMCAtIChmICogcykpO1xuICAgICAgdmFyIHQgPSB2ICogKDEuMCAtICgoMS4wIC0gZikgKiBzKSk7XG4gICAgICB2YXIgYyA9IFtcbiAgICAgICAgW3YsIHQsIHBdLFxuICAgICAgICBbcSwgdiwgcF0sXG4gICAgICAgIFtwLCB2LCB0XSxcbiAgICAgICAgW3AsIHEsIHZdLFxuICAgICAgICBbdCwgcCwgdl0sXG4gICAgICAgIFt2LCBwLCBxXVxuICAgICAgXVtoaV07XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHI6IGNbMF0gKiAyNTUsXG4gICAgICAgIGc6IGNbMV0gKiAyNTUsXG4gICAgICAgIGI6IGNbMl0gKiAyNTVcbiAgICAgIH07XG5cbiAgICB9LFxuXG4gICAgcmdiX3RvX2hzdjogZnVuY3Rpb24ociwgZywgYikge1xuXG4gICAgICB2YXIgbWluID0gTWF0aC5taW4ociwgZywgYiksXG4gICAgICAgICAgbWF4ID0gTWF0aC5tYXgociwgZywgYiksXG4gICAgICAgICAgZGVsdGEgPSBtYXggLSBtaW4sXG4gICAgICAgICAgaCwgcztcblxuICAgICAgaWYgKG1heCAhPSAwKSB7XG4gICAgICAgIHMgPSBkZWx0YSAvIG1heDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgaDogTmFOLFxuICAgICAgICAgIHM6IDAsXG4gICAgICAgICAgdjogMFxuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICBpZiAociA9PSBtYXgpIHtcbiAgICAgICAgaCA9IChnIC0gYikgLyBkZWx0YTtcbiAgICAgIH0gZWxzZSBpZiAoZyA9PSBtYXgpIHtcbiAgICAgICAgaCA9IDIgKyAoYiAtIHIpIC8gZGVsdGE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBoID0gNCArIChyIC0gZykgLyBkZWx0YTtcbiAgICAgIH1cbiAgICAgIGggLz0gNjtcbiAgICAgIGlmIChoIDwgMCkge1xuICAgICAgICBoICs9IDE7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGg6IGggKiAzNjAsXG4gICAgICAgIHM6IHMsXG4gICAgICAgIHY6IG1heCAvIDI1NVxuICAgICAgfTtcbiAgICB9LFxuXG4gICAgcmdiX3RvX2hleDogZnVuY3Rpb24ociwgZywgYikge1xuICAgICAgdmFyIGhleCA9IHRoaXMuaGV4X3dpdGhfY29tcG9uZW50KDAsIDIsIHIpO1xuICAgICAgaGV4ID0gdGhpcy5oZXhfd2l0aF9jb21wb25lbnQoaGV4LCAxLCBnKTtcbiAgICAgIGhleCA9IHRoaXMuaGV4X3dpdGhfY29tcG9uZW50KGhleCwgMCwgYik7XG4gICAgICByZXR1cm4gaGV4O1xuICAgIH0sXG5cbiAgICBjb21wb25lbnRfZnJvbV9oZXg6IGZ1bmN0aW9uKGhleCwgY29tcG9uZW50SW5kZXgpIHtcbiAgICAgIHJldHVybiAoaGV4ID4+IChjb21wb25lbnRJbmRleCAqIDgpKSAmIDB4RkY7XG4gICAgfSxcblxuICAgIGhleF93aXRoX2NvbXBvbmVudDogZnVuY3Rpb24oaGV4LCBjb21wb25lbnRJbmRleCwgdmFsdWUpIHtcbiAgICAgIHJldHVybiB2YWx1ZSA8PCAodG1wQ29tcG9uZW50ID0gY29tcG9uZW50SW5kZXggKiA4KSB8IChoZXggJiB+ICgweEZGIDw8IHRtcENvbXBvbmVudCkpO1xuICAgIH1cblxuICB9XG5cbn0pKCksXG5kYXQuY29sb3IudG9TdHJpbmcsXG5kYXQudXRpbHMuY29tbW9uKSxcbmRhdC5jb2xvci5pbnRlcnByZXQsXG5kYXQudXRpbHMuY29tbW9uKSxcbmRhdC51dGlscy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSAoZnVuY3Rpb24gKCkge1xuXG4gIC8qKlxuICAgKiByZXF1aXJlanMgdmVyc2lvbiBvZiBQYXVsIElyaXNoJ3MgUmVxdWVzdEFuaW1hdGlvbkZyYW1lXG4gICAqIGh0dHA6Ly9wYXVsaXJpc2guY29tLzIwMTEvcmVxdWVzdGFuaW1hdGlvbmZyYW1lLWZvci1zbWFydC1hbmltYXRpbmcvXG4gICAqL1xuXG4gIHJldHVybiB3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICB3aW5kb3cubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICB3aW5kb3cub1JlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgICAgd2luZG93Lm1zUmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICBmdW5jdGlvbihjYWxsYmFjaywgZWxlbWVudCkge1xuXG4gICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGNhbGxiYWNrLCAxMDAwIC8gNjApO1xuXG4gICAgICB9O1xufSkoKSxcbmRhdC5kb20uQ2VudGVyZWREaXYgPSAoZnVuY3Rpb24gKGRvbSwgY29tbW9uKSB7XG5cblxuICB2YXIgQ2VudGVyZWREaXYgPSBmdW5jdGlvbigpIHtcblxuICAgIHRoaXMuYmFja2dyb3VuZEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb21tb24uZXh0ZW5kKHRoaXMuYmFja2dyb3VuZEVsZW1lbnQuc3R5bGUsIHtcbiAgICAgIGJhY2tncm91bmRDb2xvcjogJ3JnYmEoMCwwLDAsMC44KScsXG4gICAgICB0b3A6IDAsXG4gICAgICBsZWZ0OiAwLFxuICAgICAgZGlzcGxheTogJ25vbmUnLFxuICAgICAgekluZGV4OiAnMTAwMCcsXG4gICAgICBvcGFjaXR5OiAwLFxuICAgICAgV2Via2l0VHJhbnNpdGlvbjogJ29wYWNpdHkgMC4ycyBsaW5lYXInXG4gICAgfSk7XG5cbiAgICBkb20ubWFrZUZ1bGxzY3JlZW4odGhpcy5iYWNrZ3JvdW5kRWxlbWVudCk7XG4gICAgdGhpcy5iYWNrZ3JvdW5kRWxlbWVudC5zdHlsZS5wb3NpdGlvbiA9ICdmaXhlZCc7XG5cbiAgICB0aGlzLmRvbUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb21tb24uZXh0ZW5kKHRoaXMuZG9tRWxlbWVudC5zdHlsZSwge1xuICAgICAgcG9zaXRpb246ICdmaXhlZCcsXG4gICAgICBkaXNwbGF5OiAnbm9uZScsXG4gICAgICB6SW5kZXg6ICcxMDAxJyxcbiAgICAgIG9wYWNpdHk6IDAsXG4gICAgICBXZWJraXRUcmFuc2l0aW9uOiAnLXdlYmtpdC10cmFuc2Zvcm0gMC4ycyBlYXNlLW91dCwgb3BhY2l0eSAwLjJzIGxpbmVhcidcbiAgICB9KTtcblxuXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLmJhY2tncm91bmRFbGVtZW50KTtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMuZG9tRWxlbWVudCk7XG5cbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgIGRvbS5iaW5kKHRoaXMuYmFja2dyb3VuZEVsZW1lbnQsICdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgX3RoaXMuaGlkZSgpO1xuICAgIH0pO1xuXG5cbiAgfTtcblxuICBDZW50ZXJlZERpdi5wcm90b3R5cGUuc2hvdyA9IGZ1bmN0aW9uKCkge1xuXG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICBcblxuXG4gICAgdGhpcy5iYWNrZ3JvdW5kRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcblxuICAgIHRoaXMuZG9tRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICB0aGlzLmRvbUVsZW1lbnQuc3R5bGUub3BhY2l0eSA9IDA7XG4vLyAgICB0aGlzLmRvbUVsZW1lbnQuc3R5bGUudG9wID0gJzUyJSc7XG4gICAgdGhpcy5kb21FbGVtZW50LnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9ICdzY2FsZSgxLjEpJztcblxuICAgIHRoaXMubGF5b3V0KCk7XG5cbiAgICBjb21tb24uZGVmZXIoZnVuY3Rpb24oKSB7XG4gICAgICBfdGhpcy5iYWNrZ3JvdW5kRWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gMTtcbiAgICAgIF90aGlzLmRvbUVsZW1lbnQuc3R5bGUub3BhY2l0eSA9IDE7XG4gICAgICBfdGhpcy5kb21FbGVtZW50LnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9ICdzY2FsZSgxKSc7XG4gICAgfSk7XG5cbiAgfTtcblxuICBDZW50ZXJlZERpdi5wcm90b3R5cGUuaGlkZSA9IGZ1bmN0aW9uKCkge1xuXG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIHZhciBoaWRlID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgIF90aGlzLmRvbUVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgIF90aGlzLmJhY2tncm91bmRFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cbiAgICAgIGRvbS51bmJpbmQoX3RoaXMuZG9tRWxlbWVudCwgJ3dlYmtpdFRyYW5zaXRpb25FbmQnLCBoaWRlKTtcbiAgICAgIGRvbS51bmJpbmQoX3RoaXMuZG9tRWxlbWVudCwgJ3RyYW5zaXRpb25lbmQnLCBoaWRlKTtcbiAgICAgIGRvbS51bmJpbmQoX3RoaXMuZG9tRWxlbWVudCwgJ29UcmFuc2l0aW9uRW5kJywgaGlkZSk7XG5cbiAgICB9O1xuXG4gICAgZG9tLmJpbmQodGhpcy5kb21FbGVtZW50LCAnd2Via2l0VHJhbnNpdGlvbkVuZCcsIGhpZGUpO1xuICAgIGRvbS5iaW5kKHRoaXMuZG9tRWxlbWVudCwgJ3RyYW5zaXRpb25lbmQnLCBoaWRlKTtcbiAgICBkb20uYmluZCh0aGlzLmRvbUVsZW1lbnQsICdvVHJhbnNpdGlvbkVuZCcsIGhpZGUpO1xuXG4gICAgdGhpcy5iYWNrZ3JvdW5kRWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gMDtcbi8vICAgIHRoaXMuZG9tRWxlbWVudC5zdHlsZS50b3AgPSAnNDglJztcbiAgICB0aGlzLmRvbUVsZW1lbnQuc3R5bGUub3BhY2l0eSA9IDA7XG4gICAgdGhpcy5kb21FbGVtZW50LnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9ICdzY2FsZSgxLjEpJztcblxuICB9O1xuXG4gIENlbnRlcmVkRGl2LnByb3RvdHlwZS5sYXlvdXQgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLmRvbUVsZW1lbnQuc3R5bGUubGVmdCA9IHdpbmRvdy5pbm5lcldpZHRoLzIgLSBkb20uZ2V0V2lkdGgodGhpcy5kb21FbGVtZW50KSAvIDIgKyAncHgnO1xuICAgIHRoaXMuZG9tRWxlbWVudC5zdHlsZS50b3AgPSB3aW5kb3cuaW5uZXJIZWlnaHQvMiAtIGRvbS5nZXRIZWlnaHQodGhpcy5kb21FbGVtZW50KSAvIDIgKyAncHgnO1xuICB9O1xuICBcbiAgZnVuY3Rpb24gbG9ja1Njcm9sbChlKSB7XG4gICAgY29uc29sZS5sb2coZSk7XG4gIH1cblxuICByZXR1cm4gQ2VudGVyZWREaXY7XG5cbn0pKGRhdC5kb20uZG9tLFxuZGF0LnV0aWxzLmNvbW1vbiksXG5kYXQuZG9tLmRvbSxcbmRhdC51dGlscy5jb21tb24pO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2RhdC1ndWkvdmVuZG9yL2RhdC5ndWkuanNcbiAqKiBtb2R1bGUgaWQgPSAyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKipcbiAqIGRhdC1ndWkgSmF2YVNjcmlwdCBDb250cm9sbGVyIExpYnJhcnlcbiAqIGh0dHA6Ly9jb2RlLmdvb2dsZS5jb20vcC9kYXQtZ3VpXG4gKlxuICogQ29weXJpZ2h0IDIwMTEgRGF0YSBBcnRzIFRlYW0sIEdvb2dsZSBDcmVhdGl2ZSBMYWJcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKi9cblxuLyoqIEBuYW1lc3BhY2UgKi9cbnZhciBkYXQgPSBtb2R1bGUuZXhwb3J0cyA9IGRhdCB8fCB7fTtcblxuLyoqIEBuYW1lc3BhY2UgKi9cbmRhdC5jb2xvciA9IGRhdC5jb2xvciB8fCB7fTtcblxuLyoqIEBuYW1lc3BhY2UgKi9cbmRhdC51dGlscyA9IGRhdC51dGlscyB8fCB7fTtcblxuZGF0LnV0aWxzLmNvbW1vbiA9IChmdW5jdGlvbiAoKSB7XG4gIFxuICB2YXIgQVJSX0VBQ0ggPSBBcnJheS5wcm90b3R5cGUuZm9yRWFjaDtcbiAgdmFyIEFSUl9TTElDRSA9IEFycmF5LnByb3RvdHlwZS5zbGljZTtcblxuICAvKipcbiAgICogQmFuZC1haWQgbWV0aG9kcyBmb3IgdGhpbmdzIHRoYXQgc2hvdWxkIGJlIGEgbG90IGVhc2llciBpbiBKYXZhU2NyaXB0LlxuICAgKiBJbXBsZW1lbnRhdGlvbiBhbmQgc3RydWN0dXJlIGluc3BpcmVkIGJ5IHVuZGVyc2NvcmUuanNcbiAgICogaHR0cDovL2RvY3VtZW50Y2xvdWQuZ2l0aHViLmNvbS91bmRlcnNjb3JlL1xuICAgKi9cblxuICByZXR1cm4geyBcbiAgICBcbiAgICBCUkVBSzoge30sXG4gIFxuICAgIGV4dGVuZDogZnVuY3Rpb24odGFyZ2V0KSB7XG4gICAgICBcbiAgICAgIHRoaXMuZWFjaChBUlJfU0xJQ0UuY2FsbChhcmd1bWVudHMsIDEpLCBmdW5jdGlvbihvYmopIHtcbiAgICAgICAgXG4gICAgICAgIGZvciAodmFyIGtleSBpbiBvYmopXG4gICAgICAgICAgaWYgKCF0aGlzLmlzVW5kZWZpbmVkKG9ialtrZXldKSkgXG4gICAgICAgICAgICB0YXJnZXRba2V5XSA9IG9ialtrZXldO1xuICAgICAgICBcbiAgICAgIH0sIHRoaXMpO1xuICAgICAgXG4gICAgICByZXR1cm4gdGFyZ2V0O1xuICAgICAgXG4gICAgfSxcbiAgICBcbiAgICBkZWZhdWx0czogZnVuY3Rpb24odGFyZ2V0KSB7XG4gICAgICBcbiAgICAgIHRoaXMuZWFjaChBUlJfU0xJQ0UuY2FsbChhcmd1bWVudHMsIDEpLCBmdW5jdGlvbihvYmopIHtcbiAgICAgICAgXG4gICAgICAgIGZvciAodmFyIGtleSBpbiBvYmopXG4gICAgICAgICAgaWYgKHRoaXMuaXNVbmRlZmluZWQodGFyZ2V0W2tleV0pKSBcbiAgICAgICAgICAgIHRhcmdldFtrZXldID0gb2JqW2tleV07XG4gICAgICAgIFxuICAgICAgfSwgdGhpcyk7XG4gICAgICBcbiAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgXG4gICAgfSxcbiAgICBcbiAgICBjb21wb3NlOiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciB0b0NhbGwgPSBBUlJfU0xJQ0UuY2FsbChhcmd1bWVudHMpO1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICB2YXIgYXJncyA9IEFSUl9TTElDRS5jYWxsKGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgIGZvciAodmFyIGkgPSB0b0NhbGwubGVuZ3RoIC0xOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgICAgIGFyZ3MgPSBbdG9DYWxsW2ldLmFwcGx5KHRoaXMsIGFyZ3MpXTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm4gYXJnc1swXTtcbiAgICAgICAgICAgIH1cbiAgICB9LFxuICAgIFxuICAgIGVhY2g6IGZ1bmN0aW9uKG9iaiwgaXRyLCBzY29wZSkge1xuXG4gICAgICBcbiAgICAgIGlmIChBUlJfRUFDSCAmJiBvYmouZm9yRWFjaCA9PT0gQVJSX0VBQ0gpIHsgXG4gICAgICAgIFxuICAgICAgICBvYmouZm9yRWFjaChpdHIsIHNjb3BlKTtcbiAgICAgICAgXG4gICAgICB9IGVsc2UgaWYgKG9iai5sZW5ndGggPT09IG9iai5sZW5ndGggKyAwKSB7IC8vIElzIG51bWJlciBidXQgbm90IE5hTlxuICAgICAgICBcbiAgICAgICAgZm9yICh2YXIga2V5ID0gMCwgbCA9IG9iai5sZW5ndGg7IGtleSA8IGw7IGtleSsrKVxuICAgICAgICAgIGlmIChrZXkgaW4gb2JqICYmIGl0ci5jYWxsKHNjb3BlLCBvYmpba2V5XSwga2V5KSA9PT0gdGhpcy5CUkVBSykgXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBcbiAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgZm9yICh2YXIga2V5IGluIG9iaikgXG4gICAgICAgICAgaWYgKGl0ci5jYWxsKHNjb3BlLCBvYmpba2V5XSwga2V5KSA9PT0gdGhpcy5CUkVBSylcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIFxuICAgICAgfVxuICAgICAgICAgICAgXG4gICAgfSxcbiAgICBcbiAgICBkZWZlcjogZnVuY3Rpb24oZm5jKSB7XG4gICAgICBzZXRUaW1lb3V0KGZuYywgMCk7XG4gICAgfSxcbiAgICBcbiAgICB0b0FycmF5OiBmdW5jdGlvbihvYmopIHtcbiAgICAgIGlmIChvYmoudG9BcnJheSkgcmV0dXJuIG9iai50b0FycmF5KCk7XG4gICAgICByZXR1cm4gQVJSX1NMSUNFLmNhbGwob2JqKTtcbiAgICB9LFxuXG4gICAgaXNVbmRlZmluZWQ6IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiA9PT0gdW5kZWZpbmVkO1xuICAgIH0sXG4gICAgXG4gICAgaXNOdWxsOiBmdW5jdGlvbihvYmopIHtcbiAgICAgIHJldHVybiBvYmogPT09IG51bGw7XG4gICAgfSxcbiAgICBcbiAgICBpc05hTjogZnVuY3Rpb24ob2JqKSB7XG4gICAgICByZXR1cm4gb2JqICE9PSBvYmo7XG4gICAgfSxcbiAgICBcbiAgICBpc0FycmF5OiBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIG9iai5jb25zdHJ1Y3RvciA9PT0gQXJyYXk7XG4gICAgfSxcbiAgICBcbiAgICBpc09iamVjdDogZnVuY3Rpb24ob2JqKSB7XG4gICAgICByZXR1cm4gb2JqID09PSBPYmplY3Qob2JqKTtcbiAgICB9LFxuICAgIFxuICAgIGlzTnVtYmVyOiBmdW5jdGlvbihvYmopIHtcbiAgICAgIHJldHVybiBvYmogPT09IG9iaiswO1xuICAgIH0sXG4gICAgXG4gICAgaXNTdHJpbmc6IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiA9PT0gb2JqKycnO1xuICAgIH0sXG4gICAgXG4gICAgaXNCb29sZWFuOiBmdW5jdGlvbihvYmopIHtcbiAgICAgIHJldHVybiBvYmogPT09IGZhbHNlIHx8IG9iaiA9PT0gdHJ1ZTtcbiAgICB9LFxuICAgIFxuICAgIGlzRnVuY3Rpb246IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBGdW5jdGlvbl0nO1xuICAgIH1cbiAgXG4gIH07XG4gICAgXG59KSgpO1xuXG5cbmRhdC5jb2xvci50b1N0cmluZyA9IChmdW5jdGlvbiAoY29tbW9uKSB7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uKGNvbG9yKSB7XG5cbiAgICBpZiAoY29sb3IuYSA9PSAxIHx8IGNvbW1vbi5pc1VuZGVmaW5lZChjb2xvci5hKSkge1xuXG4gICAgICB2YXIgcyA9IGNvbG9yLmhleC50b1N0cmluZygxNik7XG4gICAgICB3aGlsZSAocy5sZW5ndGggPCA2KSB7XG4gICAgICAgIHMgPSAnMCcgKyBzO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gJyMnICsgcztcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIHJldHVybiAncmdiYSgnICsgTWF0aC5yb3VuZChjb2xvci5yKSArICcsJyArIE1hdGgucm91bmQoY29sb3IuZykgKyAnLCcgKyBNYXRoLnJvdW5kKGNvbG9yLmIpICsgJywnICsgY29sb3IuYSArICcpJztcblxuICAgIH1cblxuICB9XG5cbn0pKGRhdC51dGlscy5jb21tb24pO1xuXG5cbmRhdC5Db2xvciA9IGRhdC5jb2xvci5Db2xvciA9IChmdW5jdGlvbiAoaW50ZXJwcmV0LCBtYXRoLCB0b1N0cmluZywgY29tbW9uKSB7XG5cbiAgdmFyIENvbG9yID0gZnVuY3Rpb24oKSB7XG5cbiAgICB0aGlzLl9fc3RhdGUgPSBpbnRlcnByZXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblxuICAgIGlmICh0aGlzLl9fc3RhdGUgPT09IGZhbHNlKSB7XG4gICAgICB0aHJvdyAnRmFpbGVkIHRvIGludGVycHJldCBjb2xvciBhcmd1bWVudHMnO1xuICAgIH1cblxuICAgIHRoaXMuX19zdGF0ZS5hID0gdGhpcy5fX3N0YXRlLmEgfHwgMTtcblxuXG4gIH07XG5cbiAgQ29sb3IuQ09NUE9ORU5UUyA9IFsncicsJ2cnLCdiJywnaCcsJ3MnLCd2JywnaGV4JywnYSddO1xuXG4gIGNvbW1vbi5leHRlbmQoQ29sb3IucHJvdG90eXBlLCB7XG5cbiAgICB0b1N0cmluZzogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdG9TdHJpbmcodGhpcyk7XG4gICAgfSxcblxuICAgIHRvT3JpZ2luYWw6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMuX19zdGF0ZS5jb252ZXJzaW9uLndyaXRlKHRoaXMpO1xuICAgIH1cblxuICB9KTtcblxuICBkZWZpbmVSR0JDb21wb25lbnQoQ29sb3IucHJvdG90eXBlLCAncicsIDIpO1xuICBkZWZpbmVSR0JDb21wb25lbnQoQ29sb3IucHJvdG90eXBlLCAnZycsIDEpO1xuICBkZWZpbmVSR0JDb21wb25lbnQoQ29sb3IucHJvdG90eXBlLCAnYicsIDApO1xuXG4gIGRlZmluZUhTVkNvbXBvbmVudChDb2xvci5wcm90b3R5cGUsICdoJyk7XG4gIGRlZmluZUhTVkNvbXBvbmVudChDb2xvci5wcm90b3R5cGUsICdzJyk7XG4gIGRlZmluZUhTVkNvbXBvbmVudChDb2xvci5wcm90b3R5cGUsICd2Jyk7XG5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KENvbG9yLnByb3RvdHlwZSwgJ2EnLCB7XG5cbiAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMuX19zdGF0ZS5hO1xuICAgIH0sXG5cbiAgICBzZXQ6IGZ1bmN0aW9uKHYpIHtcbiAgICAgIHRoaXMuX19zdGF0ZS5hID0gdjtcbiAgICB9XG5cbiAgfSk7XG5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KENvbG9yLnByb3RvdHlwZSwgJ2hleCcsIHtcblxuICAgIGdldDogZnVuY3Rpb24oKSB7XG5cbiAgICAgIGlmICghdGhpcy5fX3N0YXRlLnNwYWNlICE9PSAnSEVYJykge1xuICAgICAgICB0aGlzLl9fc3RhdGUuaGV4ID0gbWF0aC5yZ2JfdG9faGV4KHRoaXMuciwgdGhpcy5nLCB0aGlzLmIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5fX3N0YXRlLmhleDtcblxuICAgIH0sXG5cbiAgICBzZXQ6IGZ1bmN0aW9uKHYpIHtcblxuICAgICAgdGhpcy5fX3N0YXRlLnNwYWNlID0gJ0hFWCc7XG4gICAgICB0aGlzLl9fc3RhdGUuaGV4ID0gdjtcblxuICAgIH1cblxuICB9KTtcblxuICBmdW5jdGlvbiBkZWZpbmVSR0JDb21wb25lbnQodGFyZ2V0LCBjb21wb25lbnQsIGNvbXBvbmVudEhleEluZGV4KSB7XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBjb21wb25lbnQsIHtcblxuICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcblxuICAgICAgICBpZiAodGhpcy5fX3N0YXRlLnNwYWNlID09PSAnUkdCJykge1xuICAgICAgICAgIHJldHVybiB0aGlzLl9fc3RhdGVbY29tcG9uZW50XTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlY2FsY3VsYXRlUkdCKHRoaXMsIGNvbXBvbmVudCwgY29tcG9uZW50SGV4SW5kZXgpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLl9fc3RhdGVbY29tcG9uZW50XTtcblxuICAgICAgfSxcblxuICAgICAgc2V0OiBmdW5jdGlvbih2KSB7XG5cbiAgICAgICAgaWYgKHRoaXMuX19zdGF0ZS5zcGFjZSAhPT0gJ1JHQicpIHtcbiAgICAgICAgICByZWNhbGN1bGF0ZVJHQih0aGlzLCBjb21wb25lbnQsIGNvbXBvbmVudEhleEluZGV4KTtcbiAgICAgICAgICB0aGlzLl9fc3RhdGUuc3BhY2UgPSAnUkdCJztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX19zdGF0ZVtjb21wb25lbnRdID0gdjtcblxuICAgICAgfVxuXG4gICAgfSk7XG5cbiAgfVxuXG4gIGZ1bmN0aW9uIGRlZmluZUhTVkNvbXBvbmVudCh0YXJnZXQsIGNvbXBvbmVudCkge1xuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgY29tcG9uZW50LCB7XG5cbiAgICAgIGdldDogZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgaWYgKHRoaXMuX19zdGF0ZS5zcGFjZSA9PT0gJ0hTVicpXG4gICAgICAgICAgcmV0dXJuIHRoaXMuX19zdGF0ZVtjb21wb25lbnRdO1xuXG4gICAgICAgIHJlY2FsY3VsYXRlSFNWKHRoaXMpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLl9fc3RhdGVbY29tcG9uZW50XTtcblxuICAgICAgfSxcblxuICAgICAgc2V0OiBmdW5jdGlvbih2KSB7XG5cbiAgICAgICAgaWYgKHRoaXMuX19zdGF0ZS5zcGFjZSAhPT0gJ0hTVicpIHtcbiAgICAgICAgICByZWNhbGN1bGF0ZUhTVih0aGlzKTtcbiAgICAgICAgICB0aGlzLl9fc3RhdGUuc3BhY2UgPSAnSFNWJztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX19zdGF0ZVtjb21wb25lbnRdID0gdjtcblxuICAgICAgfVxuXG4gICAgfSk7XG5cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlY2FsY3VsYXRlUkdCKGNvbG9yLCBjb21wb25lbnQsIGNvbXBvbmVudEhleEluZGV4KSB7XG5cbiAgICBpZiAoY29sb3IuX19zdGF0ZS5zcGFjZSA9PT0gJ0hFWCcpIHtcblxuICAgICAgY29sb3IuX19zdGF0ZVtjb21wb25lbnRdID0gbWF0aC5jb21wb25lbnRfZnJvbV9oZXgoY29sb3IuX19zdGF0ZS5oZXgsIGNvbXBvbmVudEhleEluZGV4KTtcblxuICAgIH0gZWxzZSBpZiAoY29sb3IuX19zdGF0ZS5zcGFjZSA9PT0gJ0hTVicpIHtcblxuICAgICAgY29tbW9uLmV4dGVuZChjb2xvci5fX3N0YXRlLCBtYXRoLmhzdl90b19yZ2IoY29sb3IuX19zdGF0ZS5oLCBjb2xvci5fX3N0YXRlLnMsIGNvbG9yLl9fc3RhdGUudikpO1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgdGhyb3cgJ0NvcnJ1cHRlZCBjb2xvciBzdGF0ZSc7XG5cbiAgICB9XG5cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlY2FsY3VsYXRlSFNWKGNvbG9yKSB7XG5cbiAgICB2YXIgcmVzdWx0ID0gbWF0aC5yZ2JfdG9faHN2KGNvbG9yLnIsIGNvbG9yLmcsIGNvbG9yLmIpO1xuXG4gICAgY29tbW9uLmV4dGVuZChjb2xvci5fX3N0YXRlLFxuICAgICAgICB7XG4gICAgICAgICAgczogcmVzdWx0LnMsXG4gICAgICAgICAgdjogcmVzdWx0LnZcbiAgICAgICAgfVxuICAgICk7XG5cbiAgICBpZiAoIWNvbW1vbi5pc05hTihyZXN1bHQuaCkpIHtcbiAgICAgIGNvbG9yLl9fc3RhdGUuaCA9IHJlc3VsdC5oO1xuICAgIH0gZWxzZSBpZiAoY29tbW9uLmlzVW5kZWZpbmVkKGNvbG9yLl9fc3RhdGUuaCkpIHtcbiAgICAgIGNvbG9yLl9fc3RhdGUuaCA9IDA7XG4gICAgfVxuXG4gIH1cblxuICByZXR1cm4gQ29sb3I7XG5cbn0pKGRhdC5jb2xvci5pbnRlcnByZXQgPSAoZnVuY3Rpb24gKHRvU3RyaW5nLCBjb21tb24pIHtcblxuICB2YXIgcmVzdWx0LCB0b1JldHVybjtcblxuICB2YXIgaW50ZXJwcmV0ID0gZnVuY3Rpb24oKSB7XG5cbiAgICB0b1JldHVybiA9IGZhbHNlO1xuXG4gICAgdmFyIG9yaWdpbmFsID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBjb21tb24udG9BcnJheShhcmd1bWVudHMpIDogYXJndW1lbnRzWzBdO1xuXG4gICAgY29tbW9uLmVhY2goSU5URVJQUkVUQVRJT05TLCBmdW5jdGlvbihmYW1pbHkpIHtcblxuICAgICAgaWYgKGZhbWlseS5saXRtdXMob3JpZ2luYWwpKSB7XG5cbiAgICAgICAgY29tbW9uLmVhY2goZmFtaWx5LmNvbnZlcnNpb25zLCBmdW5jdGlvbihjb252ZXJzaW9uLCBjb252ZXJzaW9uTmFtZSkge1xuXG4gICAgICAgICAgcmVzdWx0ID0gY29udmVyc2lvbi5yZWFkKG9yaWdpbmFsKTtcblxuICAgICAgICAgIGlmICh0b1JldHVybiA9PT0gZmFsc2UgJiYgcmVzdWx0ICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgdG9SZXR1cm4gPSByZXN1bHQ7XG4gICAgICAgICAgICByZXN1bHQuY29udmVyc2lvbk5hbWUgPSBjb252ZXJzaW9uTmFtZTtcbiAgICAgICAgICAgIHJlc3VsdC5jb252ZXJzaW9uID0gY29udmVyc2lvbjtcbiAgICAgICAgICAgIHJldHVybiBjb21tb24uQlJFQUs7XG5cbiAgICAgICAgICB9XG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGNvbW1vbi5CUkVBSztcblxuICAgICAgfVxuXG4gICAgfSk7XG5cbiAgICByZXR1cm4gdG9SZXR1cm47XG5cbiAgfTtcblxuICB2YXIgSU5URVJQUkVUQVRJT05TID0gW1xuXG4gICAgLy8gU3RyaW5nc1xuICAgIHtcblxuICAgICAgbGl0bXVzOiBjb21tb24uaXNTdHJpbmcsXG5cbiAgICAgIGNvbnZlcnNpb25zOiB7XG5cbiAgICAgICAgVEhSRUVfQ0hBUl9IRVg6IHtcblxuICAgICAgICAgIHJlYWQ6IGZ1bmN0aW9uKG9yaWdpbmFsKSB7XG5cbiAgICAgICAgICAgIHZhciB0ZXN0ID0gb3JpZ2luYWwubWF0Y2goL14jKFtBLUYwLTldKShbQS1GMC05XSkoW0EtRjAtOV0pJC9pKTtcbiAgICAgICAgICAgIGlmICh0ZXN0ID09PSBudWxsKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIHNwYWNlOiAnSEVYJyxcbiAgICAgICAgICAgICAgaGV4OiBwYXJzZUludChcbiAgICAgICAgICAgICAgICAgICcweCcgK1xuICAgICAgICAgICAgICAgICAgICAgIHRlc3RbMV0udG9TdHJpbmcoKSArIHRlc3RbMV0udG9TdHJpbmcoKSArXG4gICAgICAgICAgICAgICAgICAgICAgdGVzdFsyXS50b1N0cmluZygpICsgdGVzdFsyXS50b1N0cmluZygpICtcbiAgICAgICAgICAgICAgICAgICAgICB0ZXN0WzNdLnRvU3RyaW5nKCkgKyB0ZXN0WzNdLnRvU3RyaW5nKCkpXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgfSxcblxuICAgICAgICAgIHdyaXRlOiB0b1N0cmluZ1xuXG4gICAgICAgIH0sXG5cbiAgICAgICAgU0lYX0NIQVJfSEVYOiB7XG5cbiAgICAgICAgICByZWFkOiBmdW5jdGlvbihvcmlnaW5hbCkge1xuXG4gICAgICAgICAgICB2YXIgdGVzdCA9IG9yaWdpbmFsLm1hdGNoKC9eIyhbQS1GMC05XXs2fSkkL2kpO1xuICAgICAgICAgICAgaWYgKHRlc3QgPT09IG51bGwpIHJldHVybiBmYWxzZTtcblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgc3BhY2U6ICdIRVgnLFxuICAgICAgICAgICAgICBoZXg6IHBhcnNlSW50KCcweCcgKyB0ZXN0WzFdLnRvU3RyaW5nKCkpXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgfSxcblxuICAgICAgICAgIHdyaXRlOiB0b1N0cmluZ1xuXG4gICAgICAgIH0sXG5cbiAgICAgICAgQ1NTX1JHQjoge1xuXG4gICAgICAgICAgcmVhZDogZnVuY3Rpb24ob3JpZ2luYWwpIHtcblxuICAgICAgICAgICAgdmFyIHRlc3QgPSBvcmlnaW5hbC5tYXRjaCgvXnJnYlxcKFxccyooLispXFxzKixcXHMqKC4rKVxccyosXFxzKiguKylcXHMqXFwpLyk7XG4gICAgICAgICAgICBpZiAodGVzdCA9PT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBzcGFjZTogJ1JHQicsXG4gICAgICAgICAgICAgIHI6IHBhcnNlRmxvYXQodGVzdFsxXSksXG4gICAgICAgICAgICAgIGc6IHBhcnNlRmxvYXQodGVzdFsyXSksXG4gICAgICAgICAgICAgIGI6IHBhcnNlRmxvYXQodGVzdFszXSlcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgd3JpdGU6IHRvU3RyaW5nXG5cbiAgICAgICAgfSxcblxuICAgICAgICBDU1NfUkdCQToge1xuXG4gICAgICAgICAgcmVhZDogZnVuY3Rpb24ob3JpZ2luYWwpIHtcblxuICAgICAgICAgICAgdmFyIHRlc3QgPSBvcmlnaW5hbC5tYXRjaCgvXnJnYmFcXChcXHMqKC4rKVxccyosXFxzKiguKylcXHMqLFxccyooLispXFxzKlxcLFxccyooLispXFxzKlxcKS8pO1xuICAgICAgICAgICAgaWYgKHRlc3QgPT09IG51bGwpIHJldHVybiBmYWxzZTtcblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgc3BhY2U6ICdSR0InLFxuICAgICAgICAgICAgICByOiBwYXJzZUZsb2F0KHRlc3RbMV0pLFxuICAgICAgICAgICAgICBnOiBwYXJzZUZsb2F0KHRlc3RbMl0pLFxuICAgICAgICAgICAgICBiOiBwYXJzZUZsb2F0KHRlc3RbM10pLFxuICAgICAgICAgICAgICBhOiBwYXJzZUZsb2F0KHRlc3RbNF0pXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgfSxcblxuICAgICAgICAgIHdyaXRlOiB0b1N0cmluZ1xuXG4gICAgICAgIH1cblxuICAgICAgfVxuXG4gICAgfSxcblxuICAgIC8vIE51bWJlcnNcbiAgICB7XG5cbiAgICAgIGxpdG11czogY29tbW9uLmlzTnVtYmVyLFxuXG4gICAgICBjb252ZXJzaW9uczoge1xuXG4gICAgICAgIEhFWDoge1xuICAgICAgICAgIHJlYWQ6IGZ1bmN0aW9uKG9yaWdpbmFsKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBzcGFjZTogJ0hFWCcsXG4gICAgICAgICAgICAgIGhleDogb3JpZ2luYWwsXG4gICAgICAgICAgICAgIGNvbnZlcnNpb25OYW1lOiAnSEVYJ1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG5cbiAgICAgICAgICB3cml0ZTogZnVuY3Rpb24oY29sb3IpIHtcbiAgICAgICAgICAgIHJldHVybiBjb2xvci5oZXg7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgIH1cblxuICAgIH0sXG5cbiAgICAvLyBBcnJheXNcbiAgICB7XG5cbiAgICAgIGxpdG11czogY29tbW9uLmlzQXJyYXksXG5cbiAgICAgIGNvbnZlcnNpb25zOiB7XG5cbiAgICAgICAgUkdCX0FSUkFZOiB7XG4gICAgICAgICAgcmVhZDogZnVuY3Rpb24ob3JpZ2luYWwpIHtcbiAgICAgICAgICAgIGlmIChvcmlnaW5hbC5sZW5ndGggIT0gMykgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgc3BhY2U6ICdSR0InLFxuICAgICAgICAgICAgICByOiBvcmlnaW5hbFswXSxcbiAgICAgICAgICAgICAgZzogb3JpZ2luYWxbMV0sXG4gICAgICAgICAgICAgIGI6IG9yaWdpbmFsWzJdXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0sXG5cbiAgICAgICAgICB3cml0ZTogZnVuY3Rpb24oY29sb3IpIHtcbiAgICAgICAgICAgIHJldHVybiBbY29sb3IuciwgY29sb3IuZywgY29sb3IuYl07XG4gICAgICAgICAgfVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgUkdCQV9BUlJBWToge1xuICAgICAgICAgIHJlYWQ6IGZ1bmN0aW9uKG9yaWdpbmFsKSB7XG4gICAgICAgICAgICBpZiAob3JpZ2luYWwubGVuZ3RoICE9IDQpIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIHNwYWNlOiAnUkdCJyxcbiAgICAgICAgICAgICAgcjogb3JpZ2luYWxbMF0sXG4gICAgICAgICAgICAgIGc6IG9yaWdpbmFsWzFdLFxuICAgICAgICAgICAgICBiOiBvcmlnaW5hbFsyXSxcbiAgICAgICAgICAgICAgYTogb3JpZ2luYWxbM11cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIHdyaXRlOiBmdW5jdGlvbihjb2xvcikge1xuICAgICAgICAgICAgcmV0dXJuIFtjb2xvci5yLCBjb2xvci5nLCBjb2xvci5iLCBjb2xvci5hXTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICB9XG5cbiAgICB9LFxuXG4gICAgLy8gT2JqZWN0c1xuICAgIHtcblxuICAgICAgbGl0bXVzOiBjb21tb24uaXNPYmplY3QsXG5cbiAgICAgIGNvbnZlcnNpb25zOiB7XG5cbiAgICAgICAgUkdCQV9PQko6IHtcbiAgICAgICAgICByZWFkOiBmdW5jdGlvbihvcmlnaW5hbCkge1xuICAgICAgICAgICAgaWYgKGNvbW1vbi5pc051bWJlcihvcmlnaW5hbC5yKSAmJlxuICAgICAgICAgICAgICAgIGNvbW1vbi5pc051bWJlcihvcmlnaW5hbC5nKSAmJlxuICAgICAgICAgICAgICAgIGNvbW1vbi5pc051bWJlcihvcmlnaW5hbC5iKSAmJlxuICAgICAgICAgICAgICAgIGNvbW1vbi5pc051bWJlcihvcmlnaW5hbC5hKSkge1xuICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHNwYWNlOiAnUkdCJyxcbiAgICAgICAgICAgICAgICByOiBvcmlnaW5hbC5yLFxuICAgICAgICAgICAgICAgIGc6IG9yaWdpbmFsLmcsXG4gICAgICAgICAgICAgICAgYjogb3JpZ2luYWwuYixcbiAgICAgICAgICAgICAgICBhOiBvcmlnaW5hbC5hXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgd3JpdGU6IGZ1bmN0aW9uKGNvbG9yKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICByOiBjb2xvci5yLFxuICAgICAgICAgICAgICBnOiBjb2xvci5nLFxuICAgICAgICAgICAgICBiOiBjb2xvci5iLFxuICAgICAgICAgICAgICBhOiBjb2xvci5hXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIFJHQl9PQko6IHtcbiAgICAgICAgICByZWFkOiBmdW5jdGlvbihvcmlnaW5hbCkge1xuICAgICAgICAgICAgaWYgKGNvbW1vbi5pc051bWJlcihvcmlnaW5hbC5yKSAmJlxuICAgICAgICAgICAgICAgIGNvbW1vbi5pc051bWJlcihvcmlnaW5hbC5nKSAmJlxuICAgICAgICAgICAgICAgIGNvbW1vbi5pc051bWJlcihvcmlnaW5hbC5iKSkge1xuICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHNwYWNlOiAnUkdCJyxcbiAgICAgICAgICAgICAgICByOiBvcmlnaW5hbC5yLFxuICAgICAgICAgICAgICAgIGc6IG9yaWdpbmFsLmcsXG4gICAgICAgICAgICAgICAgYjogb3JpZ2luYWwuYlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIHdyaXRlOiBmdW5jdGlvbihjb2xvcikge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgcjogY29sb3IucixcbiAgICAgICAgICAgICAgZzogY29sb3IuZyxcbiAgICAgICAgICAgICAgYjogY29sb3IuYlxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBIU1ZBX09CSjoge1xuICAgICAgICAgIHJlYWQ6IGZ1bmN0aW9uKG9yaWdpbmFsKSB7XG4gICAgICAgICAgICBpZiAoY29tbW9uLmlzTnVtYmVyKG9yaWdpbmFsLmgpICYmXG4gICAgICAgICAgICAgICAgY29tbW9uLmlzTnVtYmVyKG9yaWdpbmFsLnMpICYmXG4gICAgICAgICAgICAgICAgY29tbW9uLmlzTnVtYmVyKG9yaWdpbmFsLnYpICYmXG4gICAgICAgICAgICAgICAgY29tbW9uLmlzTnVtYmVyKG9yaWdpbmFsLmEpKSB7XG4gICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgc3BhY2U6ICdIU1YnLFxuICAgICAgICAgICAgICAgIGg6IG9yaWdpbmFsLmgsXG4gICAgICAgICAgICAgICAgczogb3JpZ2luYWwucyxcbiAgICAgICAgICAgICAgICB2OiBvcmlnaW5hbC52LFxuICAgICAgICAgICAgICAgIGE6IG9yaWdpbmFsLmFcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH0sXG5cbiAgICAgICAgICB3cml0ZTogZnVuY3Rpb24oY29sb3IpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIGg6IGNvbG9yLmgsXG4gICAgICAgICAgICAgIHM6IGNvbG9yLnMsXG4gICAgICAgICAgICAgIHY6IGNvbG9yLnYsXG4gICAgICAgICAgICAgIGE6IGNvbG9yLmFcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgSFNWX09CSjoge1xuICAgICAgICAgIHJlYWQ6IGZ1bmN0aW9uKG9yaWdpbmFsKSB7XG4gICAgICAgICAgICBpZiAoY29tbW9uLmlzTnVtYmVyKG9yaWdpbmFsLmgpICYmXG4gICAgICAgICAgICAgICAgY29tbW9uLmlzTnVtYmVyKG9yaWdpbmFsLnMpICYmXG4gICAgICAgICAgICAgICAgY29tbW9uLmlzTnVtYmVyKG9yaWdpbmFsLnYpKSB7XG4gICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgc3BhY2U6ICdIU1YnLFxuICAgICAgICAgICAgICAgIGg6IG9yaWdpbmFsLmgsXG4gICAgICAgICAgICAgICAgczogb3JpZ2luYWwucyxcbiAgICAgICAgICAgICAgICB2OiBvcmlnaW5hbC52XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgd3JpdGU6IGZ1bmN0aW9uKGNvbG9yKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBoOiBjb2xvci5oLFxuICAgICAgICAgICAgICBzOiBjb2xvci5zLFxuICAgICAgICAgICAgICB2OiBjb2xvci52XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgfVxuXG4gICAgfVxuXG5cbiAgXTtcblxuICByZXR1cm4gaW50ZXJwcmV0O1xuXG5cbn0pKGRhdC5jb2xvci50b1N0cmluZyxcbmRhdC51dGlscy5jb21tb24pLFxuZGF0LmNvbG9yLm1hdGggPSAoZnVuY3Rpb24gKCkge1xuXG4gIHZhciB0bXBDb21wb25lbnQ7XG5cbiAgcmV0dXJuIHtcblxuICAgIGhzdl90b19yZ2I6IGZ1bmN0aW9uKGgsIHMsIHYpIHtcblxuICAgICAgdmFyIGhpID0gTWF0aC5mbG9vcihoIC8gNjApICUgNjtcblxuICAgICAgdmFyIGYgPSBoIC8gNjAgLSBNYXRoLmZsb29yKGggLyA2MCk7XG4gICAgICB2YXIgcCA9IHYgKiAoMS4wIC0gcyk7XG4gICAgICB2YXIgcSA9IHYgKiAoMS4wIC0gKGYgKiBzKSk7XG4gICAgICB2YXIgdCA9IHYgKiAoMS4wIC0gKCgxLjAgLSBmKSAqIHMpKTtcbiAgICAgIHZhciBjID0gW1xuICAgICAgICBbdiwgdCwgcF0sXG4gICAgICAgIFtxLCB2LCBwXSxcbiAgICAgICAgW3AsIHYsIHRdLFxuICAgICAgICBbcCwgcSwgdl0sXG4gICAgICAgIFt0LCBwLCB2XSxcbiAgICAgICAgW3YsIHAsIHFdXG4gICAgICBdW2hpXTtcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcjogY1swXSAqIDI1NSxcbiAgICAgICAgZzogY1sxXSAqIDI1NSxcbiAgICAgICAgYjogY1syXSAqIDI1NVxuICAgICAgfTtcblxuICAgIH0sXG5cbiAgICByZ2JfdG9faHN2OiBmdW5jdGlvbihyLCBnLCBiKSB7XG5cbiAgICAgIHZhciBtaW4gPSBNYXRoLm1pbihyLCBnLCBiKSxcbiAgICAgICAgICBtYXggPSBNYXRoLm1heChyLCBnLCBiKSxcbiAgICAgICAgICBkZWx0YSA9IG1heCAtIG1pbixcbiAgICAgICAgICBoLCBzO1xuXG4gICAgICBpZiAobWF4ICE9IDApIHtcbiAgICAgICAgcyA9IGRlbHRhIC8gbWF4O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBoOiBOYU4sXG4gICAgICAgICAgczogMCxcbiAgICAgICAgICB2OiAwXG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIGlmIChyID09IG1heCkge1xuICAgICAgICBoID0gKGcgLSBiKSAvIGRlbHRhO1xuICAgICAgfSBlbHNlIGlmIChnID09IG1heCkge1xuICAgICAgICBoID0gMiArIChiIC0gcikgLyBkZWx0YTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGggPSA0ICsgKHIgLSBnKSAvIGRlbHRhO1xuICAgICAgfVxuICAgICAgaCAvPSA2O1xuICAgICAgaWYgKGggPCAwKSB7XG4gICAgICAgIGggKz0gMTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaDogaCAqIDM2MCxcbiAgICAgICAgczogcyxcbiAgICAgICAgdjogbWF4IC8gMjU1XG4gICAgICB9O1xuICAgIH0sXG5cbiAgICByZ2JfdG9faGV4OiBmdW5jdGlvbihyLCBnLCBiKSB7XG4gICAgICB2YXIgaGV4ID0gdGhpcy5oZXhfd2l0aF9jb21wb25lbnQoMCwgMiwgcik7XG4gICAgICBoZXggPSB0aGlzLmhleF93aXRoX2NvbXBvbmVudChoZXgsIDEsIGcpO1xuICAgICAgaGV4ID0gdGhpcy5oZXhfd2l0aF9jb21wb25lbnQoaGV4LCAwLCBiKTtcbiAgICAgIHJldHVybiBoZXg7XG4gICAgfSxcblxuICAgIGNvbXBvbmVudF9mcm9tX2hleDogZnVuY3Rpb24oaGV4LCBjb21wb25lbnRJbmRleCkge1xuICAgICAgcmV0dXJuIChoZXggPj4gKGNvbXBvbmVudEluZGV4ICogOCkpICYgMHhGRjtcbiAgICB9LFxuXG4gICAgaGV4X3dpdGhfY29tcG9uZW50OiBmdW5jdGlvbihoZXgsIGNvbXBvbmVudEluZGV4LCB2YWx1ZSkge1xuICAgICAgcmV0dXJuIHZhbHVlIDw8ICh0bXBDb21wb25lbnQgPSBjb21wb25lbnRJbmRleCAqIDgpIHwgKGhleCAmIH4gKDB4RkYgPDwgdG1wQ29tcG9uZW50KSk7XG4gICAgfVxuXG4gIH1cblxufSkoKSxcbmRhdC5jb2xvci50b1N0cmluZyxcbmRhdC51dGlscy5jb21tb24pO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2RhdC1ndWkvdmVuZG9yL2RhdC5jb2xvci5qc1xuICoqIG1vZHVsZSBpZCA9IDNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKlxuICogZmlsZU92ZXJ2aWV3OlxuICogUHJvamVjdDpcbiAqIEZpbGU6XG4gKiBEYXRlOlxuICogQXV0aG9yOlxuICovXG5cbi8qKlxuICpcbiAqL1xuY29uc3QgV0lORE9XID0gZ2xvYmFsLndpbmRvdztcblxuLyoqXG4gKlxuICogQHR5cGUge0hUTUxEb2N1bWVudH1cbiAqL1xuY29uc3QgRE9DVU1FTlQgPSBkb2N1bWVudDtcblxuXG5sZXQgbG9jYXRpb24gPSBXSU5ET1cubG9jYXRpb247XG5cbmxldCBoYXNoID0gbG9jYXRpb24uaGFzaDtcblxubGV0IGJhc2VVUkwgPSBsb2NhdGlvbi5ocmVmO1xuXG5cbi8qKlxuICog44Kv44Ko44Oq44Gr44KS44Kq44OW772L44GY44GH44GP44Go5b2i5byP44Gr5aSJ5o+bXG4gKiBAdHlwZSB7e319XG4gKi9cbmxldCBxdWVyeU9iamVjdCA9IHt9O1xuXG5sZXQgcXVlcmllcyA9IGxvY2F0aW9uLnNlYXJjaDtcblxuaWYgKDEgPCBxdWVyaWVzLmxlbmd0aCkge1xuXG4gIHZhciBxdWVyeSA9IHF1ZXJpZXMuc3Vic3RyaW5nKDEpO1xuICB2YXIgcGFyYW1zID0gcXVlcnkuc3BsaXQoJyYnKTtcblxuICBmb3IgKHZhciBpID0gMCwgbGVuID0gcGFyYW1zLmxlbmd0aDsgaSA8IGxlbjsgaSArPSAxKSB7XG4gICAgdmFyIGVsZW1lbnQgPSBwYXJhbXNbaV0uc3BsaXQoJz0nKTtcbiAgICBxdWVyeU9iamVjdFtkZWNvZGVVUklDb21wb25lbnQoZWxlbWVudFswXSldID0gZGVjb2RlVVJJQ29tcG9uZW50KGVsZW1lbnRbMV0pO1xuICB9XG59XG5cblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHbG9iYWxEYXRhIHtcblxuICBzdGF0aWMgd2luZG93ID0gV0lORE9XO1xuXG4gIHN0YXRpYyBkb2NtZW50ID0gRE9DVU1FTlQ7XG5cbiAgc3RhdGljIGh0bWwgPSBudWxsO1xuICBzdGF0aWMgaHRtbFN0eWxlID0gbnVsbDtcblxuICBzdGF0aWMgYm9keSA9IG51bGw7XG4gIHN0YXRpYyBib2R5U3R5bGUgPSBudWxsO1xuXG5cbiAgc3RhdGljIGluaXQoKSB7XG4gICAgdGhpcy5odG1sID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2h0bWwnKVswXTtcbiAgICB0aGlzLmh0bWxTdHlsZSA9IHRoaXMuaHRtbC5zdHlsZTtcblxuICAgIHRoaXMuYm9keSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdib2R5JylbMF07XG4gICAgdGhpcy5ib2R5U3R5bGUgPSB0aGlzLmJvZHkuc3R5bGU7XG4gIH1cblxuXG4gIC8qKlxuICAgKlxuICAgKi9cbiAgc3RhdGljIGxvY2F0aW9uID0gbG9jYXRpb247XG5cbiAgLyoqXG4gICAqXG4gICAqL1xuICBzdGF0aWMgZG9tYWluID0gRE9DVU1FTlQuZG9tYWluO1xuXG4gIC8qKlxuICAgKlxuICAgKi9cbiAgc3RhdGljIHNlYXJjaCA9IGxvY2F0aW9uLnNlYXJjaDtcblxuICAvKipcbiAgICpcbiAgICovXG4gIHN0YXRpYyBwcm90b2NvbCA9IGxvY2F0aW9uLnByb3RvY29sO1xuXG4gIC8qKlxuICAgKlxuICAgKi9cbiAgc3RhdGljIGhhc2ggPSBoYXNoO1xuXG4gIC8qKlxuICAgKlxuICAgKi9cbiAgc3RhdGljIGhhc2hWYWwgPSAhIWhhc2ggPyBoYXNoLnNwbGl0KCcjJylbMV0gOiAnJztcblxuICAvKipcbiAgICpcbiAgICovXG4gIHN0YXRpYyBwb3J0ID0gbG9jYXRpb24ucG9ydDtcblxuICAvKipcbiAgICpcbiAgICovXG4gIHN0YXRpYyB1cmwgPSBiYXNlVVJMO1xuXG5cbiAgc3RhdGljIHBsYW5lVVJMID0gbG9jYXRpb24ub3JpZ2luICsgbG9jYXRpb24ucGF0aG5hbWU7XG5cblxuICAvKipcbiAgICog44Ot44O844Kr44Or55Kw5aKD44GL44Gp44GG44GLXG4gICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgKi9cbiAgc3RhdGljIGlzTG9jYWwgPSAgKGJhc2VVUkwuaW5kZXhPZignZmlsZTovLycpID4gLTEgfHwgYmFzZVVSTC5pbmRleE9mKCc6Ly9sb2NhbGhvc3QnKSA+IC0xIHx8IGJhc2VVUkwuaW5kZXhPZignOi8vMTkyJykgPiAtMSk7XG5cbiAgLyoqXG4gICAqIOWIneWbnuioquWVj+OBi+OBqeOBhuOBi1xuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICovXG4gIHN0YXRpYyBnZXQgaXNOZXdDb21tZWVyKCkge1xuICAgIHJldHVybiBET0NVTUVOVC5yZWZlcnJlci5pbmRleE9mKHRoaXMuZG9tYWluKSA8IDA7XG4gIH1cblxuXG4gIC8qKlxuICAgKiDjgrvjgq3jg6XjgqLmjqXntprjgYvjganjgYbjgYtcbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqL1xuICBzdGF0aWMgaXNTU0wgPSBiYXNlVVJMLmluZGV4T2YoJ2h0dHBzJykgPT09IDA7XG5cblxuICAvKipcbiAgICpcbiAgICogQHJldHVybnMge3t9fVxuICAgKi9cbiAgc3RhdGljIGdldCBxdWVyeU9iamVjdCgpIHtcbiAgICByZXR1cm4gcXVlcnlPYmplY3Q7XG4gIH1cblxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0gcVxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICovXG4gIHN0YXRpYyBnZXRIYXNRdWVyeShxKSB7XG4gICAgcmV0dXJuICEhKHF1ZXJ5T2JqZWN0Lmhhc093blByb3BlcnR5KHEpKTtcbiAgfTtcblxuXG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSBxXG4gICAqIEByZXR1cm5zIHtudWxsfVxuICAgKi9cbiAgc3RhdGljIGdldFF1ZXJ5VmFsIChxKSB7XG4gICAgcmV0dXJuIChxdWVyeU9iamVjdC5oYXNPd25Qcm9wZXJ0eShxKSA/IHF1ZXJ5T2JqZWN0W3FdIDogbnVsbCk7XG4gIH1cblxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9jb21tb24vanMvYXBwL2RhdGEvR2xvYmFsRGF0YS5qc1xuICoqLyIsIi8qKlxuICogZmlsZU92ZXJ2aWV3OlxuICogUHJvamVjdDpcbiAqIEZpbGU6XG4gKiBEYXRlOlxuICogQXV0aG9yOlxuICovXG5cblxuJ3VzZSBzdHJpY3QnO1xuXG5cbmltcG9ydCBQdWJTdWIgZnJvbSBcIi4uL2V2ZW50cy9QdWJTdWJcIjtcbmltcG9ydCBFUzZTeW1ib2wgZnJvbSBcImVzNi1zeW1ib2xcIjtcblxubGV0IFN5bWJvbCA9IGdsb2JhbC5TeW1ib2wgfHwgRVM2U3ltYm9sO1xuXG5sZXQgc2luZ2xldG9uID0gU3ltYm9sKCk7XG5sZXQgc2luZ2xldG9uRW5mb3JjZXIgPSBTeW1ib2woKTtcbmxldCBpbnN0YW5jZTtcblxuXG5cbi8qKlxuICpcbiAqIEB0eXBlIHtzdHJpbmd9XG4gKi9cbmNvbnN0IExPQUQgPSAnbG9hZCc7XG5cbi8qKlxuICpcbiAqIEB0eXBlIHtzdHJpbmd9XG4gKi9cbmNvbnN0IFJFU0laRSA9ICdyZXNpemUnO1xuXG4vKipcbiAqXG4gKiBAdHlwZSB7c3RyaW5nfVxuICovXG5jb25zdCBVTkxPQUQgPSAndW5sb2FkJztcblxuXG4vKipcbiAqXG4gKiBAdHlwZSB7c3RyaW5nfVxuICovXG5jb25zdCBNT1VTRV9XSEVFTCA9ICdtb3VzZXdoZWVsJztcblxuXG4vKipcbiAqXG4gKiBAdHlwZSB7c3RyaW5nfVxuICovXG5jb25zdCBSRVFVRVNUX0FOSU1BVElPTl9GUkFNRSA9ICdyZXF1ZXN0X2FuaW1hdGlvbl9mcmFtZSc7XG5cblxuLyoqXG4gKiBsaXN0ZW5HbG9iYWxFdmVudFxuICpcbiAqIEBwYXJhbSB0eXBlXG4gKiBAcGFyYW0gbGlzdGVuZXJcbiAqL1xubGV0IGxpc3Rlbkdsb2JhbEV2ZW50ID0gZnVuY3Rpb24gKHR5cGUsIGxpc3RlbmVyKSB7XG5cbiAgaWYgKHR5cGVvZihnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lcikgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgaWYgKHR5cGUgPT09IE1PVVNFX1dIRUVMKSB7XG4gICAgICBnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lcignRE9NTW91c2VTY3JvbGwnLCBsaXN0ZW5lciwgZmFsc2UpO1xuICAgIH1cbiAgICBnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lciwgZmFsc2UpO1xuICB9IGVsc2UgaWYgKHR5cGVvZihnbG9iYWwuYXR0YWNoRXZlbnQpICE9PSAndW5kZWZpbmVkJykge1xuICAgIGdsb2JhbC5hdHRhY2hFdmVudCgnb24nICsgdHlwZSwgbGlzdGVuZXIpO1xuICB9IGVsc2Uge1xuICAgIGlmIChnbG9iYWxbJ29uJyArIHR5cGVdICE9PSBudWxsKSB7XG4gICAgICBsZXQgZXhpc3RlbmNlTGlzdGVuZXIgPSBnbG9iYWxbJ29uJyArIHR5cGVdO1xuICAgICAgZ2xvYmFsWydvbicgKyB0eXBlXSA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBleGlzdGVuY2VMaXN0ZW5lcihldmVudCk7XG4gICAgICAgIGxpc3RlbmVyKGV2ZW50KTtcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIGdsb2JhbFsnb24nICsgdHlwZV0gPSBsaXN0ZW5lcjtcbiAgICB9XG4gIH1cbn07XG5cblxuLyoqXG4gKiBvbkxvYWRIYW5kbGVyXG4gKlxuICogQHBhcmFtIGV2ZW50XG4gKi9cbmxldCBvbkxvYWRIYW5kbGVyID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gIGluc3RhbmNlLmRpc3BhdGNoRXZlbnQoTE9BRCwge1xuICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50XG4gIH0sIHRoaXMpO1xufTtcblxuXG4vKipcbiAqIG9uUmVzaXplSGFuZGxlclxuICpcbiAqIEBwYXJhbSBldmVudFxuICovXG5sZXQgb25SZXNpemVIYW5kbGVyID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gIGluc3RhbmNlLmRpc3BhdGNoRXZlbnQoUkVTSVpFLCB7XG4gICAgb3JpZ2luYWxFdmVudDogZXZlbnRcbiAgfSwgdGhpcyk7XG59O1xuXG5cbi8qKlxuICogb25VbkxvYWRIYW5kbGVyXG4gKlxuICogQHBhcmFtIGV2ZW50XG4gKi9cbmxldCBvblVuTG9hZEhhbmRsZXIgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgaW5zdGFuY2UuZGlzcGF0Y2hFdmVudChVTkxPQUQsIHtcbiAgICBvcmlnaW5hbEV2ZW50OiBldmVudFxuICB9LCB0aGlzKTtcbn07XG5cblxuLyoqXG4gKiBvbk1vdXNlV2hlZWxIYW5kbGVyXG4gKlxuICogQHBhcmFtIGV2ZW50XG4gKi9cbmxldCBvbk1vdXNlV2hlZWxIYW5kbGVyID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gIGxldCBkZWx0YSA9IGV2ZW50LmRldGFpbCAhPT0gMCA/IGV2ZW50LmRldGFpbCA6IGV2ZW50LndoZWVsRGVsdGE7XG4gIGluc3RhbmNlLmRpc3BhdGNoRXZlbnQoTU9VU0VfV0hFRUwsIHtcbiAgICBvcmlnaW5hbEV2ZW50OiBldmVudCxcbiAgICBkZWx0YTogZGVsdGFcbiAgfSwgdGhpcyk7XG59O1xuXG5sZXQgYW5pbWF0aW9uSUQ7XG5sZXQgYW5pbWF0aW9uRnVuY3Rpb25zID0gW107XG5cbi8qKlxuICpcbiAqIEBwYXJhbSBldmVudFxuICovXG5sZXQgYW5pbWF0aW9uRnJhbWUgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgaW5zdGFuY2UuZGlzcGF0Y2hFdmVudChSRVFVRVNUX0FOSU1BVElPTl9GUkFNRSwge1xuICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50XG4gIH0sIHRoaXMpO1xuICBhbmltYXRpb25JRCA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYW5pbWF0aW9uRnJhbWUpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2luZG93VXRpbCBleHRlbmRzIFB1YlN1YiB7XG5cblxuICBzdGF0aWMgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGNhbGxiYWNrKSB7XG4gICAgcmV0dXJuIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoY2FsbGJhY2spO1xuICB9XG5cblxuICBzdGF0aWMgY2FuY2VsQW5pbWF0aW9uRnJhbWUoaWQpIHtcbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGlkKTtcbiAgfVxuXG5cbiAgc3RhdGljIGdldFNjcmVlblNpemUoKSB7XG4gICAgbGV0IF93LCBfaDtcbiAgICBpZiAoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50ICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCAhPT0gMCkge1xuICAgICAgX3cgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGg7XG4gICAgfSBlbHNlIGlmIChkb2N1bWVudC5ib2R5KSB7XG4gICAgICBfdyA9IGRvY3VtZW50LmJvZHkuY2xpZW50V2lkdGg7XG4gICAgfVxuICAgIGlmIChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCAhPT0gMCkge1xuICAgICAgX2ggPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0O1xuICAgIH0gZWxzZSBpZiAoZG9jdW1lbnQuYm9keSkge1xuICAgICAgX2ggPSBkb2N1bWVudC5ib2R5LmNsaWVudEhlaWdodDtcbiAgICB9XG4gICAgcmV0dXJuICh7d2lkdGg6IF93LCBoZWlnaHQ6IF9ofSk7XG4gIH07XG5cblxuICBzdGF0aWMgZ2V0RG9jdW1lbnRTaXplKCkge1xuICAgIGxldCB3aWR0aCwgaGVpZ2h0O1xuXG4gICAgaWYgKHdpbmRvdy5pbm5lckhlaWdodCAmJiB3aW5kb3cuc2Nyb2xsTWF4WSkge1xuICAgICAgd2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aCArIHdpbmRvdy5zY3JvbGxNYXhYO1xuICAgICAgaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0ICsgd2luZG93LnNjcm9sbE1heFk7XG4gICAgfSBlbHNlIGlmIChkb2N1bWVudC5ib2R5LnNjcm9sbEhlaWdodCA+IGRvY3VtZW50LmJvZHkub2Zmc2V0SGVpZ2h0IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxIZWlnaHQgIT09IGRvY3VtZW50LmJvZHkuc2Nyb2xsSGVpZ2h0KSB7XG4gICAgICB3aWR0aCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxXaWR0aCB8fCBkb2N1bWVudC5ib2R5LnNjcm9sbFdpZHRoO1xuICAgICAgaGVpZ2h0ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbEhlaWdodCB8fCBkb2N1bWVudC5ib2R5LnNjcm9sbEhlaWdodDtcbiAgICB9IGVsc2Uge1xuICAgICAgd2lkdGggPSBkb2N1bWVudC5ib2R5Lm9mZnNldFdpZHRoO1xuICAgICAgaGVpZ2h0ID0gZG9jdW1lbnQuYm9keS5vZmZzZXRIZWlnaHQ7XG4gICAgfVxuXG4gICAgcmV0dXJuICh7d2lkdGg6IHdpZHRoLCBoZWlnaHQ6IGhlaWdodH0pO1xuICB9O1xuXG5cbiAgc3RhdGljIGdldFNjcm9sbFBvc2l0aW9uKCkge1xuICAgIGxldCBfeCwgX3k7XG4gICAgX3ggPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsTGVmdCB8fCBkb2N1bWVudC5ib2R5LnNjcm9sbExlZnQgfHwgd2luZG93LnBhZ2VYT2Zmc2V0O1xuICAgIF95ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCB8fCBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCB8fCB3aW5kb3cucGFnZVlPZmZzZXQ7XG4gICAgcmV0dXJuICh7dG9wOiBfeSwgbGVmdDogX3h9KTtcbiAgfTtcblxuXG4gIHN0YXRpYyBnZXQgaW5zdGFuY2UoKSB7XG4gICAgaWYgKCF0aGlzW3NpbmdsZXRvbl0pIHtcbiAgICAgIHRoaXNbc2luZ2xldG9uXSA9IG5ldyBXaW5kb3dVdGlsKHNpbmdsZXRvbkVuZm9yY2VyKTtcbiAgICAgIGluc3RhbmNlID0gdGhpc1tzaW5nbGV0b25dO1xuICAgIH1cbiAgICByZXR1cm4gdGhpc1tzaW5nbGV0b25dO1xuICB9XG5cblxuICBjb25zdHJ1Y3RvcihlbmZvcmNlcikge1xuICAgIGlmIChlbmZvcmNlciA9PT0gc2luZ2xldG9uRW5mb3JjZXIpIHtcbiAgICAgIHN1cGVyKCk7XG4gICAgICBsZXQgZ2xvYmFsRXZlbnRzID0gWydsb2FkJywgJ3Jlc2l6ZScsICd1bmxvYWQnLCBNT1VTRV9XSEVFTF07XG4gICAgICBsZXQgZ2xvYmFsTGlzdGVuZXJzID0gW29uTG9hZEhhbmRsZXIsIG9uUmVzaXplSGFuZGxlciwgb25VbkxvYWRIYW5kbGVyLCBvbk1vdXNlV2hlZWxIYW5kbGVyXTtcblxuICAgICAgbGV0IGxlbmd0aCA9IGdsb2JhbEV2ZW50cy5sZW5ndGg7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGxpc3Rlbkdsb2JhbEV2ZW50KGdsb2JhbEV2ZW50c1tpXSwgZ2xvYmFsTGlzdGVuZXJzW2ldKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgXCJDYW5ub3QgY29uc3RydWN0IHNpbmdsZXRvblwiXG4gICAgfVxuICB9XG5cblxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0gdHlwZVxuICAgKiBAcGFyYW0gbGlzdGVuZXJcbiAgICovXG4gIGFkZEV2ZW50TGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgICBzdXBlci5hZGRFdmVudExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKTtcblxuICAgIGlmICh0eXBlID09PSBSRVFVRVNUX0FOSU1BVElPTl9GUkFNRSkge1xuICAgICAgZm9yICh2YXIgaSA9IDAsIGlMZW4gPSBhbmltYXRpb25GdW5jdGlvbnMubGVuZ3RoOyBpIDwgaUxlbjsgaSArPSAxKSB7XG4gICAgICAgIGlmIChhbmltYXRpb25GdW5jdGlvbnNbaV0gPT09IGxpc3RlbmVyKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGFuaW1hdGlvbkZ1bmN0aW9ucy5wdXNoKGxpc3RlbmVyKTtcblxuICAgICAgaWYgKGFuaW1hdGlvbkZ1bmN0aW9ucy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgYW5pbWF0aW9uRnJhbWUoKTtcbiAgICAgIH1cblxuICAgIH1cbiAgfVxuXG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB0eXBlXG4gICAqIEBwYXJhbSBsaXN0ZW5lclxuICAgKi9cbiAgb24odHlwZSwgbGlzdGVuZXIpIHtcbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpO1xuICB9XG5cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHR5cGVcbiAgICogQHBhcmFtIGxpc3RlbmVyXG4gICAqL1xuICBiaW5kKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB0eXBlXG4gICAqIEBwYXJhbSBsaXN0ZW5lclxuICAgKi9cbiAgcmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICAgIHN1cGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpO1xuXG4gICAgaWYgKHR5cGUgPT09IFJFUVVFU1RfQU5JTUFUSU9OX0ZSQU1FKSB7XG4gICAgICBmb3IgKHZhciBpID0gMCwgaUxlbiA9IGFuaW1hdGlvbkZ1bmN0aW9ucy5sZW5ndGg7IGkgPCBpTGVuOyBpICs9IDEpIHtcbiAgICAgICAgaWYgKGFuaW1hdGlvbkZ1bmN0aW9uc1tpXSA9PT0gbGlzdGVuZXIpIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoaSAhPT0gYW5pbWF0aW9uRnVuY3Rpb25zLmxlbmd0aCkge1xuICAgICAgICBhbmltYXRpb25GdW5jdGlvbnMuc3BsaWNlKGksIDEpO1xuICAgICAgfVxuXG4gICAgICBpZiAoYW5pbWF0aW9uRnVuY3Rpb25zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBjYW5jZWxBbmltYXRpb25GcmFtZShhbmltYXRpb25JRCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHR5cGVcbiAgICogQHBhcmFtIGxpc3RlbmVyXG4gICAqL1xuICBvZmYodHlwZSwgbGlzdGVuZXIpIHtcbiAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpO1xuICB9XG5cblxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0gdHlwZVxuICAgKiBAcGFyYW0gbGlzdGVuZXJcbiAgICovXG4gIHVuYmluZCh0eXBlLCBsaXN0ZW5lcikge1xuICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcik7XG4gIH1cblxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0gdHlwZVxuICAgKiBAcGFyYW0gbGlzdGVuZXJcbiAgICovXG4gIG9uZSh0eXBlLCBsaXN0ZW5lcikge1xuICAgIGxldCBfbGlzdGVuZXIgPSAoKSA9PiB7XG4gICAgICB0aGlzLm9mZih0eXBlLCBfbGlzdGVuZXIpO1xuICAgICAgbGlzdGVuZXIuYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcbiAgICB9O1xuXG4gICAgdGhpcy5vbih0eXBlLCBfbGlzdGVuZXIpO1xuICB9XG59XG5cblxuKGZ1bmN0aW9uICh3aW5kb3cpIHtcblxuICBsZXQgbGFzdFRpbWUgPSAwO1xuICBsZXQgdmVuZG9ycyA9IFsnbXMnLCAnbW96JywgJ3dlYmtpdCcsICdvJ107XG5cbiAgZm9yIChsZXQgeCA9IDA7IHggPCB2ZW5kb3JzLmxlbmd0aCAmJiAhd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZTsgKyt4KSB7XG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSA9IHdpbmRvd1t2ZW5kb3JzW3hdICsgJ1JlcXVlc3RBbmltYXRpb25GcmFtZSddO1xuICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSA9IHdpbmRvd1t2ZW5kb3JzW3hdICsgJ0NhbmNlbEFuaW1hdGlvbkZyYW1lJ10gfHwgd2luZG93W3ZlbmRvcnNbeF0gKyAnQ2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lJ107XG4gIH1cblxuICBpZiAoIXdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUpIHtcbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gZnVuY3Rpb24gKGNhbGxiYWNrLCBlbGVtZW50KSB7XG4gICAgICBsZXQgY3VyclRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgIGxldCB0aW1lVG9DYWxsID0gTWF0aC5tYXgoMCwgMTYgLSAoY3VyclRpbWUgLSBsYXN0VGltZSkpO1xuICAgICAgbGV0IGlkID0gd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGNhbGxiYWNrKGN1cnJUaW1lICsgdGltZVRvQ2FsbCk7XG4gICAgICAgIH0sXG4gICAgICAgIHRpbWVUb0NhbGwpO1xuICAgICAgbGFzdFRpbWUgPSBjdXJyVGltZSArIHRpbWVUb0NhbGw7XG4gICAgICByZXR1cm4gaWQ7XG4gICAgfTtcbiAgfVxuXG4gIGlmICghd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lKSB7XG4gICAgd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICBjbGVhclRpbWVvdXQoaWQpO1xuICAgIH07XG4gIH1cblxuICB2YXJcbiAgICBzdGFydE9mZnNldCA9IERhdGUubm93ID8gRGF0ZS5ub3coKSA6ICsobmV3IERhdGUpXG4gICAgLCBwZXJmb3JtYW5jZSA9IHdpbmRvdy5wZXJmb3JtYW5jZSB8fCB7fVxuXG4gICAgLCBfZW50cmllcyA9IFtdXG4gICAgLCBfbWFya3NJbmRleCA9IHt9XG5cbiAgICAsIF9maWx0ZXJFbnRyaWVzID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgICAgIGxldCBpID0gMCwgbiA9IF9lbnRyaWVzLmxlbmd0aCwgcmVzdWx0ID0gW107XG4gICAgICBmb3IgKDsgaSA8IG47IGkrKykge1xuICAgICAgICBpZiAoX2VudHJpZXNbaV1ba2V5XSA9PSB2YWx1ZSkge1xuICAgICAgICAgIHJlc3VsdC5wdXNoKF9lbnRyaWVzW2ldKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICAsIF9jbGVhckVudHJpZXMgPSBmdW5jdGlvbiAodHlwZSwgbmFtZSkge1xuICAgICAgbGV0IGkgPSBfZW50cmllcy5sZW5ndGgsIGVudHJ5O1xuICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICBlbnRyeSA9IF9lbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkuZW50cnlUeXBlID09IHR5cGUgJiYgKG5hbWUgPT09IHZvaWQgMCB8fCBlbnRyeS5uYW1lID09IG5hbWUpKSB7XG4gICAgICAgICAgX2VudHJpZXMuc3BsaWNlKGksIDEpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIDtcblxuXG4gIGlmICghcGVyZm9ybWFuY2Uubm93KSB7XG4gICAgcGVyZm9ybWFuY2Uubm93ID0gcGVyZm9ybWFuY2Uud2Via2l0Tm93IHx8IHBlcmZvcm1hbmNlLm1vek5vdyB8fCBwZXJmb3JtYW5jZS5tc05vdyB8fCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAoRGF0ZS5ub3cgPyBEYXRlLm5vdygpIDogKyhuZXcgRGF0ZSkpIC0gc3RhcnRPZmZzZXQ7XG4gICAgICB9O1xuICB9XG5cblxuICBpZiAoIXBlcmZvcm1hbmNlLm1hcmspIHtcbiAgICBwZXJmb3JtYW5jZS5tYXJrID0gcGVyZm9ybWFuY2Uud2Via2l0TWFyayB8fCBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICBsZXQgbWFyayA9IHtcbiAgICAgICAgICBuYW1lOiBuYW1lXG4gICAgICAgICAgLCBlbnRyeVR5cGU6ICdtYXJrJ1xuICAgICAgICAgICwgc3RhcnRUaW1lOiBwZXJmb3JtYW5jZS5ub3coKVxuICAgICAgICAgICwgZHVyYXRpb246IDBcbiAgICAgICAgfTtcbiAgICAgICAgX2VudHJpZXMucHVzaChtYXJrKTtcbiAgICAgICAgX21hcmtzSW5kZXhbbmFtZV0gPSBtYXJrO1xuICAgICAgfTtcbiAgfVxuXG5cbiAgaWYgKCFwZXJmb3JtYW5jZS5tZWFzdXJlKSB7XG4gICAgcGVyZm9ybWFuY2UubWVhc3VyZSA9IHBlcmZvcm1hbmNlLndlYmtpdE1lYXN1cmUgfHwgZnVuY3Rpb24gKG5hbWUsIHN0YXJ0TWFyaywgZW5kTWFyaykge1xuICAgICAgICBzdGFydE1hcmsgPSBfbWFya3NJbmRleFtzdGFydE1hcmtdLnN0YXJ0VGltZTtcbiAgICAgICAgZW5kTWFyayA9IF9tYXJrc0luZGV4W2VuZE1hcmtdLnN0YXJ0VGltZTtcblxuICAgICAgICBfZW50cmllcy5wdXNoKHtcbiAgICAgICAgICBuYW1lOiBuYW1lXG4gICAgICAgICAgLCBlbnRyeVR5cGU6ICdtZWFzdXJlJ1xuICAgICAgICAgICwgc3RhcnRUaW1lOiBzdGFydE1hcmtcbiAgICAgICAgICAsIGR1cmF0aW9uOiBlbmRNYXJrIC0gc3RhcnRNYXJrXG4gICAgICAgIH0pO1xuICAgICAgfTtcbiAgfVxuXG5cbiAgaWYgKCFwZXJmb3JtYW5jZS5nZXRFbnRyaWVzQnlUeXBlKSB7XG4gICAgcGVyZm9ybWFuY2UuZ2V0RW50cmllc0J5VHlwZSA9IHBlcmZvcm1hbmNlLndlYmtpdEdldEVudHJpZXNCeVR5cGUgfHwgZnVuY3Rpb24gKHR5cGUpIHtcbiAgICAgICAgcmV0dXJuIF9maWx0ZXJFbnRyaWVzKCdlbnRyeVR5cGUnLCB0eXBlKTtcbiAgICAgIH07XG4gIH1cblxuXG4gIGlmICghcGVyZm9ybWFuY2UuZ2V0RW50cmllc0J5TmFtZSkge1xuICAgIHBlcmZvcm1hbmNlLmdldEVudHJpZXNCeU5hbWUgPSBwZXJmb3JtYW5jZS53ZWJraXRHZXRFbnRyaWVzQnlOYW1lIHx8IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgIHJldHVybiBfZmlsdGVyRW50cmllcygnbmFtZScsIG5hbWUpO1xuICAgICAgfTtcbiAgfVxuXG5cbiAgaWYgKCFwZXJmb3JtYW5jZS5jbGVhck1hcmtzKSB7XG4gICAgcGVyZm9ybWFuY2UuY2xlYXJNYXJrcyA9IHBlcmZvcm1hbmNlLndlYmtpdENsZWFyTWFya3MgfHwgZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgX2NsZWFyRW50cmllcygnbWFyaycsIG5hbWUpO1xuICAgICAgfTtcbiAgfVxuXG5cbiAgaWYgKCFwZXJmb3JtYW5jZS5jbGVhck1lYXN1cmVzKSB7XG4gICAgcGVyZm9ybWFuY2UuY2xlYXJNZWFzdXJlcyA9IHBlcmZvcm1hbmNlLndlYmtpdENsZWFyTWVhc3VyZXMgfHwgZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgX2NsZWFyRW50cmllcygnbWVhc3VyZScsIG5hbWUpO1xuICAgICAgfTtcbiAgfVxuXG5cbiAgLy8gZXhwb3J0c1xuICB3aW5kb3cucGVyZm9ybWFuY2UgPSBwZXJmb3JtYW5jZTtcblxufSh3aW5kb3cpKTtcblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9jb21tb24vanMvYXBwL2Jyb3dzZXIvV2luZG93VXRpbC5qc1xuICoqLyIsIi8qKlxuICogZmlsZU92ZXJ2aWV3OiDjgqTjg5njg7Pjg4jjg4fjgqPjgrnjg5Hjg4Pjg4Hjg6Pjg7zku6Pmm79cbiAqIFByb2plY3Q6XG4gKiBGaWxlOlxuICogRGF0ZTpcbiAqIEF1dGhvcjpcbiAqL1xuXG5cbid1c2Ugc3RyaWN0JztcblxuXG4vKipcbiAqXG4gKiBAdHlwZSB7e319XG4gKiBAcHJpdmF0ZVxuICovXG5sZXQgX2V2ZW50cyA9IHt9O1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFB1YlN1YiB7XG5cblxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0gdG9waWNcbiAgICogQHJldHVybnMgeyp9XG4gICAqL1xuICBzdGF0aWMgaGFzVG9waWMgKHRvcGljKSB7XG4gICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChfZXZlbnRzLCB0b3BpYyk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHRvcGljXG4gICAqIEBwYXJhbSBmdW5jXG4gICAqIEByZXR1cm5zIHsqW119XG4gICAqL1xuICBzdGF0aWMgc3Vic2NyaWJlKHRvcGljLCBmdW5jKSB7XG4gICAgaWYgKCFQdWJTdWIuaGFzVG9waWModG9waWMpKSB7XG4gICAgICBfZXZlbnRzW3RvcGljXSA9IFtdO1xuICAgIH1cbiAgICBfZXZlbnRzW3RvcGljXS5wdXNoKGZ1bmMpO1xuICAgIHJldHVybiBbdG9waWMsIGZ1bmNdO1xuICB9XG5cblxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0gdG9waWNcbiAgICogQHBhcmFtIGFyZ3NcbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqL1xuICBzdGF0aWMgcHVibGlzaCh0b3BpYywgYXJncykge1xuICAgIGlmICghUHViU3ViLmhhc1RvcGljKHRvcGljKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBmb3IgKHZhciBpID0gMCwgaiA9IF9ldmVudHNbdG9waWNdLmxlbmd0aDsgaSA8IGo7IGkgKz0gMSkge1xuICAgICAgX2V2ZW50c1t0b3BpY11baV0uYXBwbHkobnVsbCwgYXJncyB8fCBbXSk7XG4gICAgfVxuICB9XG5cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHRvcGljXG4gICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgKi9cbiAgc3RhdGljIHVuc3Vic2NyaWJlICh0b3BpYykge1xuICAgIGlmICghUHViU3ViLmhhc1RvcGljKHRvcGljKSkgeyByZXR1cm4gZmFsc2U7IH1cbiAgICBfZXZlbnRzW3RvcGljXSA9IG51bGw7XG4gIH07XG5cblxuXG5cbiAgLyoqXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKi9cbiAgY29uc3RydWN0b3IoY29udGV4dCkge1xuICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuICAgIHRoaXMuX3BhcmVudEV2ZW50VGFyZ2V0ID0gW107XG4gICAgdGhpcy5fY29udGV4dCA9IGNvbnRleHQ7XG4gIH1cblxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0gdHlwZVxuICAgKiBAcGFyYW0gY2FsbGJhY2tcbiAgICogQHBhcmFtIGNvbnRleHRcbiAgICogQHBhcmFtIHByaW9yaXR5XG4gICAqL1xuICBvbmUodHlwZSwgY2FsbGJhY2ssIGNvbnRleHQsIHByaW9yaXR5KSB7XG5cbiAgICB2YXIgaGFuZGxlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMub2ZmKHR5cGUsIGhhbmRsZXIpO1xuICAgICAgY2FsbGJhY2suYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9LmJpbmQodGhpcyk7XG5cbiAgICB0aGlzLm9uKHR5cGUsIGhhbmRsZXIsIGNvbnRleHQsIHByaW9yaXR5KTtcblxuICB9XG5cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHR5cGVcbiAgICogQHBhcmFtIGNhbGxiYWNrXG4gICAqIEBwYXJhbSBjb250ZXh0XG4gICAqIEBwYXJhbSBwcmlvcml0eVxuICAgKi9cbiAgYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBjYWxsYmFjaywgY29udGV4dCwgcHJpb3JpdHkpIHtcblxuICAgIHByaW9yaXR5ID0gcHJpb3JpdHkgfHwgMDtcblxuICAgIHRoaXMuX2V2ZW50c1t0eXBlXSA9IHt9Lmhhc093blByb3BlcnR5LmNhbGwodGhpcy5fZXZlbnRzLCB0eXBlKSA/IHRoaXMuX2V2ZW50c1t0eXBlXSA6IHt9O1xuICAgIHZhciBsaXN0ZW5lclRvSW5zZXJ0ID0ge2NvbnRleHQ6IGNvbnRleHQsIGNhbGxiYWNrOiBjYWxsYmFjaywgcHJpb3JpdHk6IHByaW9yaXR5fTtcblxuICAgIGlmICh0aGlzLl9ldmVudHNbdHlwZV0ubGlzdGVuZXJzKSB7XG4gICAgICB2YXIgbGlzdGVuZXJzID0gdGhpcy5fZXZlbnRzW3R5cGVdLmxpc3RlbmVycztcbiAgICAgIHZhciBpbnNlcnRlZCA9IGZhbHNlO1xuICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IGxpc3RlbmVycy5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgbGlzdGVuZXIgPSBsaXN0ZW5lcnNbaV07XG4gICAgICAgIHZhciBldmVudFByaW9yaXR5ID0gbGlzdGVuZXIucHJpb3JpdHk7XG4gICAgICAgIGlmIChwcmlvcml0eSA8IGV2ZW50UHJpb3JpdHkpIHtcbiAgICAgICAgICBsaXN0ZW5lcnMuc3BsaWNlKGksIDAsIGxpc3RlbmVyVG9JbnNlcnQpO1xuICAgICAgICAgIGluc2VydGVkID0gdHJ1ZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKCFpbnNlcnRlZCkge1xuICAgICAgICBsaXN0ZW5lcnMucHVzaChsaXN0ZW5lclRvSW5zZXJ0KTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fZXZlbnRzW3R5cGVdLmxpc3RlbmVycyA9IFtsaXN0ZW5lclRvSW5zZXJ0XTtcbiAgICB9XG4gIH07XG5cblxuICAvKipcbiAgICpcbiAgICovXG4gIHN1YnNjcmliZSgpIHtcbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKi9cbiAgYmluZCgpIHtcbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKi9cbiAgb24oKSB7XG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH1cblxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0gdHlwZVxuICAgKiBAcGFyYW0gY2FsbGJhY2tcbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqL1xuICByZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIGNhbGxiYWNrKSB7XG4gICAgdmFyIGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50c1t0eXBlXSA/IHRoaXMuX2V2ZW50c1t0eXBlXS5saXN0ZW5lcnMgOiBudWxsO1xuXG4gICAgaWYgKCFsaXN0ZW5lcnMgfHwgbGlzdGVuZXJzLmxlbmd0aCA8IDEpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoIWNhbGxiYWNrKSB7XG4gICAgICB0aGlzLl9ldmVudHNbdHlwZV0ubGlzdGVuZXJzID0gW107XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMCwgbGVuZ3RoID0gbGlzdGVuZXJzLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgbGlzdGVuZXIgPSBsaXN0ZW5lcnNbaV07XG4gICAgICBpZiAobGlzdGVuZXIuY2FsbGJhY2sgPT09IGNhbGxiYWNrKSB7XG4gICAgICAgIGxpc3RlbmVycy5zcGxpY2UoaSwgMSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqXG4gICAqL1xuICB1bnN1YnNjcmliZSgpIHtcbiAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqXG4gICAqL1xuICB1bmJpbmQoKSB7XG4gICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICovXG4gIG9mZigpIHtcbiAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqXG4gICAqL1xuICByZW1vdmVBbGxFdmVudExpc3RlbmVyKCkge1xuICAgIGZvciAodmFyIGtleSBpbiB0aGlzLl9ldmVudHMpIHtcbiAgICAgIGlmICh0aGlzLl9ldmVudHMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICB0aGlzLl9ldmVudHNba2V5XS5saXN0ZW5lcnMubGVuZ3RoID0gMDtcbiAgICAgICAgZGVsZXRlIHRoaXMuX2V2ZW50c1trZXldO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuX2V2ZW50cyA9IFtdO1xuICB9O1xuXG5cbiAgLyoqXG4gICAqXG4gICAqL1xuICB1bmJpbmRBbGwoKSB7XG4gICAgdGhpcy5yZW1vdmVBbGxFdmVudExpc3RlbmVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH1cblxuXG4gIC8qKlxuICAgKlxuICAgKi9cbiAgb2ZmQWxsKCkge1xuICAgIHRoaXMucmVtb3ZlQWxsRXZlbnRMaXN0ZW5lci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9XG5cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHR5cGVcbiAgICogQHBhcmFtIGNhbGxiYWNrXG4gICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgKi9cbiAgaGFzRXZlbnRMaXN0ZW5lcih0eXBlLCBjYWxsYmFjaykge1xuICAgIHZhciBsaXN0ZW5lcnMgPSB0aGlzLl9ldmVudHNbdHlwZV0gPyB0aGlzLl9ldmVudHNbdHlwZV0ubGlzdGVuZXJzIDogbnVsbDtcblxuICAgIGlmICghbGlzdGVuZXJzKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKCFjYWxsYmFjaykge1xuICAgICAgcmV0dXJuIGxpc3RlbmVycy5sZW5ndGggPiAwO1xuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBsaXN0ZW5lcnMubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBsaXN0ZW5lciA9IGxpc3RlbmVyc1tpXTtcbiAgICAgIGlmIChsaXN0ZW5lci5jYWxsYmFjayA9PT0gY2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cblxuICAvKipcbiAgICpcbiAgICovXG4gIGhhc1RvcGljKCkge1xuICAgIHRoaXMuaGFzRXZlbnRMaXN0ZW5lci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9XG5cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHR5cGVcbiAgICogQHBhcmFtIG9wdGlvblxuICAgKiBAcGFyYW0gdGFyZ2V0XG4gICAqL1xuICBkaXNwYXRjaEV2ZW50KHR5cGUsIG9wdGlvbiwgdGFyZ2V0KSB7XG5cbiAgICB2YXIgZXZlbnQgPSB7XG4gICAgICB0eXBlOiB0eXBlLFxuICAgICAgcGFyYW1zOiBvcHRpb25cbiAgICB9O1xuXG4gICAgaWYgKHRhcmdldCkge1xuICAgICAgZXZlbnQudGFyZ2V0ID0gdGFyZ2V0O1xuICAgIH1cblxuICAgIHZhciBsaXN0ZW5lcnMgPSB0aGlzLl9ldmVudHNbdHlwZV0gPyB0aGlzLl9ldmVudHNbdHlwZV0ubGlzdGVuZXJzIDogbnVsbDtcblxuICAgIGlmICghbGlzdGVuZXJzIHx8IGxpc3RlbmVycy5sZW5ndGggPCAxKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IGxpc3RlbmVycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgdmFyIGxpc3RlbmVyID0gbGlzdGVuZXJzW2ldO1xuICAgICAgdmFyIGNhbGxiYWNrID0gbGlzdGVuZXIuY2FsbGJhY2s7XG4gICAgICB2YXIgY2FsbGJhY2tDb250ZXh0ID0gbGlzdGVuZXIuY29udGV4dCA/IGxpc3RlbmVyLmNvbnRleHQgOiB0aGlzLl9jb250ZXh0O1xuXG4gICAgICBpZiAoISgndGFyZ2V0JyBpbiBldmVudCkpIHtcbiAgICAgICAgZXZlbnQudGFyZ2V0ID0gdGhpcztcbiAgICAgIH1cblxuICAgICAgZXZlbnQuY3VycmVudFRhcmdldCA9IHRoaXM7XG4gICAgICBldmVudC5jb250ZXh0ID0gY2FsbGJhY2tDb250ZXh0O1xuICAgICAgdmFyIHJlc3VsdCA9IG51bGw7XG5cbiAgICAgIGlmICghY2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGNhbGxiYWNrID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJlc3VsdCA9IGNhbGxiYWNrLmNhbGwodGhpcywgZXZlbnQpO1xuICAgICAgfSBlbHNlIGlmIChjYWxsYmFjay5oYXNPd25Qcm9wZXJ0eSgnaGFuZGxlRXZlbnQnKSAmJiB0eXBlb2YgY2FsbGJhY2suaGFuZGxlRXZlbnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmVzdWx0ID0gY2FsbGJhY2suaGFuZGxlRXZlbnQuY2FsbCh0aGlzLCBldmVudCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChyZXN1bHQgIT09IHVuZGVmaW5lZCAmJiAhcmVzdWx0KSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuXG4gIC8qKlxuICAgKlxuICAgKi9cbiAgcHVibGlzaCgpIHtcbiAgICB0aGlzLmRpc3BhdGNoRXZlbnQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfTtcblxuXG4gIC8qKlxuICAgKlxuICAgKi9cbiAgdHJpZ2dlcigpIHtcbiAgICB0aGlzLmRpc3BhdGNoRXZlbnQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqXG4gICAqL1xuICBmaXJlKCkge1xuICAgIHRoaXMuZGlzcGF0Y2hFdmVudC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9XG5cblxuICAvKipcbiAgICpcbiAgICovXG4gIGRpc3BhdGNoKCkge1xuICAgIHRoaXMuZGlzcGF0Y2hFdmVudC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9XG5cblxufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vY29tbW9uL2pzL2FwcC9ldmVudHMvUHViU3ViLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vaXMtaW1wbGVtZW50ZWQnKSgpID8gU3ltYm9sIDogcmVxdWlyZSgnLi9wb2x5ZmlsbCcpO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vZXM2LXN5bWJvbC9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxudmFyIHZhbGlkVHlwZXMgPSB7IG9iamVjdDogdHJ1ZSwgc3ltYm9sOiB0cnVlIH07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkge1xuXHR2YXIgc3ltYm9sO1xuXHRpZiAodHlwZW9mIFN5bWJvbCAhPT0gJ2Z1bmN0aW9uJykgcmV0dXJuIGZhbHNlO1xuXHRzeW1ib2wgPSBTeW1ib2woJ3Rlc3Qgc3ltYm9sJyk7XG5cdHRyeSB7IFN0cmluZyhzeW1ib2wpOyB9IGNhdGNoIChlKSB7IHJldHVybiBmYWxzZTsgfVxuXG5cdC8vIFJldHVybiAndHJ1ZScgYWxzbyBmb3IgcG9seWZpbGxzXG5cdGlmICghdmFsaWRUeXBlc1t0eXBlb2YgU3ltYm9sLml0ZXJhdG9yXSkgcmV0dXJuIGZhbHNlO1xuXHRpZiAoIXZhbGlkVHlwZXNbdHlwZW9mIFN5bWJvbC50b1ByaW1pdGl2ZV0pIHJldHVybiBmYWxzZTtcblx0aWYgKCF2YWxpZFR5cGVzW3R5cGVvZiBTeW1ib2wudG9TdHJpbmdUYWddKSByZXR1cm4gZmFsc2U7XG5cblx0cmV0dXJuIHRydWU7XG59O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vZXM2LXN5bWJvbC9pcy1pbXBsZW1lbnRlZC5qc1xuICoqIG1vZHVsZSBpZCA9IDhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIEVTMjAxNSBTeW1ib2wgcG9seWZpbGwgZm9yIGVudmlyb25tZW50cyB0aGF0IGRvIG5vdCBzdXBwb3J0IGl0IChvciBwYXJ0aWFsbHkgc3VwcG9ydCBpdClcblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZCAgICAgICAgICAgICAgPSByZXF1aXJlKCdkJylcbiAgLCB2YWxpZGF0ZVN5bWJvbCA9IHJlcXVpcmUoJy4vdmFsaWRhdGUtc3ltYm9sJylcblxuICAsIGNyZWF0ZSA9IE9iamVjdC5jcmVhdGUsIGRlZmluZVByb3BlcnRpZXMgPSBPYmplY3QuZGVmaW5lUHJvcGVydGllc1xuICAsIGRlZmluZVByb3BlcnR5ID0gT2JqZWN0LmRlZmluZVByb3BlcnR5LCBvYmpQcm90b3R5cGUgPSBPYmplY3QucHJvdG90eXBlXG4gICwgTmF0aXZlU3ltYm9sLCBTeW1ib2xQb2x5ZmlsbCwgSGlkZGVuU3ltYm9sLCBnbG9iYWxTeW1ib2xzID0gY3JlYXRlKG51bGwpXG4gICwgaXNOYXRpdmVTYWZlO1xuXG5pZiAodHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJykge1xuXHROYXRpdmVTeW1ib2wgPSBTeW1ib2w7XG5cdHRyeSB7XG5cdFx0U3RyaW5nKE5hdGl2ZVN5bWJvbCgpKTtcblx0XHRpc05hdGl2ZVNhZmUgPSB0cnVlO1xuXHR9IGNhdGNoIChpZ25vcmUpIHt9XG59XG5cbnZhciBnZW5lcmF0ZU5hbWUgPSAoZnVuY3Rpb24gKCkge1xuXHR2YXIgY3JlYXRlZCA9IGNyZWF0ZShudWxsKTtcblx0cmV0dXJuIGZ1bmN0aW9uIChkZXNjKSB7XG5cdFx0dmFyIHBvc3RmaXggPSAwLCBuYW1lLCBpZTExQnVnV29ya2Fyb3VuZDtcblx0XHR3aGlsZSAoY3JlYXRlZFtkZXNjICsgKHBvc3RmaXggfHwgJycpXSkgKytwb3N0Zml4O1xuXHRcdGRlc2MgKz0gKHBvc3RmaXggfHwgJycpO1xuXHRcdGNyZWF0ZWRbZGVzY10gPSB0cnVlO1xuXHRcdG5hbWUgPSAnQEAnICsgZGVzYztcblx0XHRkZWZpbmVQcm9wZXJ0eShvYmpQcm90b3R5cGUsIG5hbWUsIGQuZ3MobnVsbCwgZnVuY3Rpb24gKHZhbHVlKSB7XG5cdFx0XHQvLyBGb3IgSUUxMSBpc3N1ZSBzZWU6XG5cdFx0XHQvLyBodHRwczovL2Nvbm5lY3QubWljcm9zb2Z0LmNvbS9JRS9mZWVkYmFja2RldGFpbC92aWV3LzE5Mjg1MDgvXG5cdFx0XHQvLyAgICBpZTExLWJyb2tlbi1nZXR0ZXJzLW9uLWRvbS1vYmplY3RzXG5cdFx0XHQvLyBodHRwczovL2dpdGh1Yi5jb20vbWVkaWtvby9lczYtc3ltYm9sL2lzc3Vlcy8xMlxuXHRcdFx0aWYgKGllMTFCdWdXb3JrYXJvdW5kKSByZXR1cm47XG5cdFx0XHRpZTExQnVnV29ya2Fyb3VuZCA9IHRydWU7XG5cdFx0XHRkZWZpbmVQcm9wZXJ0eSh0aGlzLCBuYW1lLCBkKHZhbHVlKSk7XG5cdFx0XHRpZTExQnVnV29ya2Fyb3VuZCA9IGZhbHNlO1xuXHRcdH0pKTtcblx0XHRyZXR1cm4gbmFtZTtcblx0fTtcbn0oKSk7XG5cbi8vIEludGVybmFsIGNvbnN0cnVjdG9yIChub3Qgb25lIGV4cG9zZWQpIGZvciBjcmVhdGluZyBTeW1ib2wgaW5zdGFuY2VzLlxuLy8gVGhpcyBvbmUgaXMgdXNlZCB0byBlbnN1cmUgdGhhdCBgc29tZVN5bWJvbCBpbnN0YW5jZW9mIFN5bWJvbGAgYWx3YXlzIHJldHVybiBmYWxzZVxuSGlkZGVuU3ltYm9sID0gZnVuY3Rpb24gU3ltYm9sKGRlc2NyaXB0aW9uKSB7XG5cdGlmICh0aGlzIGluc3RhbmNlb2YgSGlkZGVuU3ltYm9sKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdUeXBlRXJyb3I6IFN5bWJvbCBpcyBub3QgYSBjb25zdHJ1Y3RvcicpO1xuXHRyZXR1cm4gU3ltYm9sUG9seWZpbGwoZGVzY3JpcHRpb24pO1xufTtcblxuLy8gRXhwb3NlZCBgU3ltYm9sYCBjb25zdHJ1Y3RvclxuLy8gKHJldHVybnMgaW5zdGFuY2VzIG9mIEhpZGRlblN5bWJvbClcbm1vZHVsZS5leHBvcnRzID0gU3ltYm9sUG9seWZpbGwgPSBmdW5jdGlvbiBTeW1ib2woZGVzY3JpcHRpb24pIHtcblx0dmFyIHN5bWJvbDtcblx0aWYgKHRoaXMgaW5zdGFuY2VvZiBTeW1ib2wpIHRocm93IG5ldyBUeXBlRXJyb3IoJ1R5cGVFcnJvcjogU3ltYm9sIGlzIG5vdCBhIGNvbnN0cnVjdG9yJyk7XG5cdGlmIChpc05hdGl2ZVNhZmUpIHJldHVybiBOYXRpdmVTeW1ib2woZGVzY3JpcHRpb24pO1xuXHRzeW1ib2wgPSBjcmVhdGUoSGlkZGVuU3ltYm9sLnByb3RvdHlwZSk7XG5cdGRlc2NyaXB0aW9uID0gKGRlc2NyaXB0aW9uID09PSB1bmRlZmluZWQgPyAnJyA6IFN0cmluZyhkZXNjcmlwdGlvbikpO1xuXHRyZXR1cm4gZGVmaW5lUHJvcGVydGllcyhzeW1ib2wsIHtcblx0XHRfX2Rlc2NyaXB0aW9uX186IGQoJycsIGRlc2NyaXB0aW9uKSxcblx0XHRfX25hbWVfXzogZCgnJywgZ2VuZXJhdGVOYW1lKGRlc2NyaXB0aW9uKSlcblx0fSk7XG59O1xuZGVmaW5lUHJvcGVydGllcyhTeW1ib2xQb2x5ZmlsbCwge1xuXHRmb3I6IGQoZnVuY3Rpb24gKGtleSkge1xuXHRcdGlmIChnbG9iYWxTeW1ib2xzW2tleV0pIHJldHVybiBnbG9iYWxTeW1ib2xzW2tleV07XG5cdFx0cmV0dXJuIChnbG9iYWxTeW1ib2xzW2tleV0gPSBTeW1ib2xQb2x5ZmlsbChTdHJpbmcoa2V5KSkpO1xuXHR9KSxcblx0a2V5Rm9yOiBkKGZ1bmN0aW9uIChzKSB7XG5cdFx0dmFyIGtleTtcblx0XHR2YWxpZGF0ZVN5bWJvbChzKTtcblx0XHRmb3IgKGtleSBpbiBnbG9iYWxTeW1ib2xzKSBpZiAoZ2xvYmFsU3ltYm9sc1trZXldID09PSBzKSByZXR1cm4ga2V5O1xuXHR9KSxcblxuXHQvLyBJZiB0aGVyZSdzIG5hdGl2ZSBpbXBsZW1lbnRhdGlvbiBvZiBnaXZlbiBzeW1ib2wsIGxldCdzIGZhbGxiYWNrIHRvIGl0XG5cdC8vIHRvIGVuc3VyZSBwcm9wZXIgaW50ZXJvcGVyYWJpbGl0eSB3aXRoIG90aGVyIG5hdGl2ZSBmdW5jdGlvbnMgZS5nLiBBcnJheS5mcm9tXG5cdGhhc0luc3RhbmNlOiBkKCcnLCAoTmF0aXZlU3ltYm9sICYmIE5hdGl2ZVN5bWJvbC5oYXNJbnN0YW5jZSkgfHwgU3ltYm9sUG9seWZpbGwoJ2hhc0luc3RhbmNlJykpLFxuXHRpc0NvbmNhdFNwcmVhZGFibGU6IGQoJycsIChOYXRpdmVTeW1ib2wgJiYgTmF0aXZlU3ltYm9sLmlzQ29uY2F0U3ByZWFkYWJsZSkgfHxcblx0XHRTeW1ib2xQb2x5ZmlsbCgnaXNDb25jYXRTcHJlYWRhYmxlJykpLFxuXHRpdGVyYXRvcjogZCgnJywgKE5hdGl2ZVN5bWJvbCAmJiBOYXRpdmVTeW1ib2wuaXRlcmF0b3IpIHx8IFN5bWJvbFBvbHlmaWxsKCdpdGVyYXRvcicpKSxcblx0bWF0Y2g6IGQoJycsIChOYXRpdmVTeW1ib2wgJiYgTmF0aXZlU3ltYm9sLm1hdGNoKSB8fCBTeW1ib2xQb2x5ZmlsbCgnbWF0Y2gnKSksXG5cdHJlcGxhY2U6IGQoJycsIChOYXRpdmVTeW1ib2wgJiYgTmF0aXZlU3ltYm9sLnJlcGxhY2UpIHx8IFN5bWJvbFBvbHlmaWxsKCdyZXBsYWNlJykpLFxuXHRzZWFyY2g6IGQoJycsIChOYXRpdmVTeW1ib2wgJiYgTmF0aXZlU3ltYm9sLnNlYXJjaCkgfHwgU3ltYm9sUG9seWZpbGwoJ3NlYXJjaCcpKSxcblx0c3BlY2llczogZCgnJywgKE5hdGl2ZVN5bWJvbCAmJiBOYXRpdmVTeW1ib2wuc3BlY2llcykgfHwgU3ltYm9sUG9seWZpbGwoJ3NwZWNpZXMnKSksXG5cdHNwbGl0OiBkKCcnLCAoTmF0aXZlU3ltYm9sICYmIE5hdGl2ZVN5bWJvbC5zcGxpdCkgfHwgU3ltYm9sUG9seWZpbGwoJ3NwbGl0JykpLFxuXHR0b1ByaW1pdGl2ZTogZCgnJywgKE5hdGl2ZVN5bWJvbCAmJiBOYXRpdmVTeW1ib2wudG9QcmltaXRpdmUpIHx8IFN5bWJvbFBvbHlmaWxsKCd0b1ByaW1pdGl2ZScpKSxcblx0dG9TdHJpbmdUYWc6IGQoJycsIChOYXRpdmVTeW1ib2wgJiYgTmF0aXZlU3ltYm9sLnRvU3RyaW5nVGFnKSB8fCBTeW1ib2xQb2x5ZmlsbCgndG9TdHJpbmdUYWcnKSksXG5cdHVuc2NvcGFibGVzOiBkKCcnLCAoTmF0aXZlU3ltYm9sICYmIE5hdGl2ZVN5bWJvbC51bnNjb3BhYmxlcykgfHwgU3ltYm9sUG9seWZpbGwoJ3Vuc2NvcGFibGVzJykpXG59KTtcblxuLy8gSW50ZXJuYWwgdHdlYWtzIGZvciByZWFsIHN5bWJvbCBwcm9kdWNlclxuZGVmaW5lUHJvcGVydGllcyhIaWRkZW5TeW1ib2wucHJvdG90eXBlLCB7XG5cdGNvbnN0cnVjdG9yOiBkKFN5bWJvbFBvbHlmaWxsKSxcblx0dG9TdHJpbmc6IGQoJycsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMuX19uYW1lX187IH0pXG59KTtcblxuLy8gUHJvcGVyIGltcGxlbWVudGF0aW9uIG9mIG1ldGhvZHMgZXhwb3NlZCBvbiBTeW1ib2wucHJvdG90eXBlXG4vLyBUaGV5IHdvbid0IGJlIGFjY2Vzc2libGUgb24gcHJvZHVjZWQgc3ltYm9sIGluc3RhbmNlcyBhcyB0aGV5IGRlcml2ZSBmcm9tIEhpZGRlblN5bWJvbC5wcm90b3R5cGVcbmRlZmluZVByb3BlcnRpZXMoU3ltYm9sUG9seWZpbGwucHJvdG90eXBlLCB7XG5cdHRvU3RyaW5nOiBkKGZ1bmN0aW9uICgpIHsgcmV0dXJuICdTeW1ib2wgKCcgKyB2YWxpZGF0ZVN5bWJvbCh0aGlzKS5fX2Rlc2NyaXB0aW9uX18gKyAnKSc7IH0pLFxuXHR2YWx1ZU9mOiBkKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHZhbGlkYXRlU3ltYm9sKHRoaXMpOyB9KVxufSk7XG5kZWZpbmVQcm9wZXJ0eShTeW1ib2xQb2x5ZmlsbC5wcm90b3R5cGUsIFN5bWJvbFBvbHlmaWxsLnRvUHJpbWl0aXZlLCBkKCcnLCBmdW5jdGlvbiAoKSB7XG5cdHZhciBzeW1ib2wgPSB2YWxpZGF0ZVN5bWJvbCh0aGlzKTtcblx0aWYgKHR5cGVvZiBzeW1ib2wgPT09ICdzeW1ib2wnKSByZXR1cm4gc3ltYm9sO1xuXHRyZXR1cm4gc3ltYm9sLnRvU3RyaW5nKCk7XG59KSk7XG5kZWZpbmVQcm9wZXJ0eShTeW1ib2xQb2x5ZmlsbC5wcm90b3R5cGUsIFN5bWJvbFBvbHlmaWxsLnRvU3RyaW5nVGFnLCBkKCdjJywgJ1N5bWJvbCcpKTtcblxuLy8gUHJvcGVyIGltcGxlbWVudGF0b24gb2YgdG9QcmltaXRpdmUgYW5kIHRvU3RyaW5nVGFnIGZvciByZXR1cm5lZCBzeW1ib2wgaW5zdGFuY2VzXG5kZWZpbmVQcm9wZXJ0eShIaWRkZW5TeW1ib2wucHJvdG90eXBlLCBTeW1ib2xQb2x5ZmlsbC50b1N0cmluZ1RhZyxcblx0ZCgnYycsIFN5bWJvbFBvbHlmaWxsLnByb3RvdHlwZVtTeW1ib2xQb2x5ZmlsbC50b1N0cmluZ1RhZ10pKTtcblxuLy8gTm90ZTogSXQncyBpbXBvcnRhbnQgdG8gZGVmaW5lIGB0b1ByaW1pdGl2ZWAgYXMgbGFzdCBvbmUsIGFzIHNvbWUgaW1wbGVtZW50YXRpb25zXG4vLyBpbXBsZW1lbnQgYHRvUHJpbWl0aXZlYCBuYXRpdmVseSB3aXRob3V0IGltcGxlbWVudGluZyBgdG9TdHJpbmdUYWdgIChvciBvdGhlciBzcGVjaWZpZWQgc3ltYm9scylcbi8vIEFuZCB0aGF0IG1heSBpbnZva2UgZXJyb3IgaW4gZGVmaW5pdGlvbiBmbG93OlxuLy8gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vbWVkaWtvby9lczYtc3ltYm9sL2lzc3Vlcy8xMyNpc3N1ZWNvbW1lbnQtMTY0MTQ2MTQ5XG5kZWZpbmVQcm9wZXJ0eShIaWRkZW5TeW1ib2wucHJvdG90eXBlLCBTeW1ib2xQb2x5ZmlsbC50b1ByaW1pdGl2ZSxcblx0ZCgnYycsIFN5bWJvbFBvbHlmaWxsLnByb3RvdHlwZVtTeW1ib2xQb2x5ZmlsbC50b1ByaW1pdGl2ZV0pKTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2VzNi1zeW1ib2wvcG9seWZpbGwuanNcbiAqKiBtb2R1bGUgaWQgPSA5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbnZhciBhc3NpZ24gICAgICAgID0gcmVxdWlyZSgnZXM1LWV4dC9vYmplY3QvYXNzaWduJylcbiAgLCBub3JtYWxpemVPcHRzID0gcmVxdWlyZSgnZXM1LWV4dC9vYmplY3Qvbm9ybWFsaXplLW9wdGlvbnMnKVxuICAsIGlzQ2FsbGFibGUgICAgPSByZXF1aXJlKCdlczUtZXh0L29iamVjdC9pcy1jYWxsYWJsZScpXG4gICwgY29udGFpbnMgICAgICA9IHJlcXVpcmUoJ2VzNS1leHQvc3RyaW5nLyMvY29udGFpbnMnKVxuXG4gICwgZDtcblxuZCA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGRzY3IsIHZhbHVlLyosIG9wdGlvbnMqLykge1xuXHR2YXIgYywgZSwgdywgb3B0aW9ucywgZGVzYztcblx0aWYgKChhcmd1bWVudHMubGVuZ3RoIDwgMikgfHwgKHR5cGVvZiBkc2NyICE9PSAnc3RyaW5nJykpIHtcblx0XHRvcHRpb25zID0gdmFsdWU7XG5cdFx0dmFsdWUgPSBkc2NyO1xuXHRcdGRzY3IgPSBudWxsO1xuXHR9IGVsc2Uge1xuXHRcdG9wdGlvbnMgPSBhcmd1bWVudHNbMl07XG5cdH1cblx0aWYgKGRzY3IgPT0gbnVsbCkge1xuXHRcdGMgPSB3ID0gdHJ1ZTtcblx0XHRlID0gZmFsc2U7XG5cdH0gZWxzZSB7XG5cdFx0YyA9IGNvbnRhaW5zLmNhbGwoZHNjciwgJ2MnKTtcblx0XHRlID0gY29udGFpbnMuY2FsbChkc2NyLCAnZScpO1xuXHRcdHcgPSBjb250YWlucy5jYWxsKGRzY3IsICd3Jyk7XG5cdH1cblxuXHRkZXNjID0geyB2YWx1ZTogdmFsdWUsIGNvbmZpZ3VyYWJsZTogYywgZW51bWVyYWJsZTogZSwgd3JpdGFibGU6IHcgfTtcblx0cmV0dXJuICFvcHRpb25zID8gZGVzYyA6IGFzc2lnbihub3JtYWxpemVPcHRzKG9wdGlvbnMpLCBkZXNjKTtcbn07XG5cbmQuZ3MgPSBmdW5jdGlvbiAoZHNjciwgZ2V0LCBzZXQvKiwgb3B0aW9ucyovKSB7XG5cdHZhciBjLCBlLCBvcHRpb25zLCBkZXNjO1xuXHRpZiAodHlwZW9mIGRzY3IgIT09ICdzdHJpbmcnKSB7XG5cdFx0b3B0aW9ucyA9IHNldDtcblx0XHRzZXQgPSBnZXQ7XG5cdFx0Z2V0ID0gZHNjcjtcblx0XHRkc2NyID0gbnVsbDtcblx0fSBlbHNlIHtcblx0XHRvcHRpb25zID0gYXJndW1lbnRzWzNdO1xuXHR9XG5cdGlmIChnZXQgPT0gbnVsbCkge1xuXHRcdGdldCA9IHVuZGVmaW5lZDtcblx0fSBlbHNlIGlmICghaXNDYWxsYWJsZShnZXQpKSB7XG5cdFx0b3B0aW9ucyA9IGdldDtcblx0XHRnZXQgPSBzZXQgPSB1bmRlZmluZWQ7XG5cdH0gZWxzZSBpZiAoc2V0ID09IG51bGwpIHtcblx0XHRzZXQgPSB1bmRlZmluZWQ7XG5cdH0gZWxzZSBpZiAoIWlzQ2FsbGFibGUoc2V0KSkge1xuXHRcdG9wdGlvbnMgPSBzZXQ7XG5cdFx0c2V0ID0gdW5kZWZpbmVkO1xuXHR9XG5cdGlmIChkc2NyID09IG51bGwpIHtcblx0XHRjID0gdHJ1ZTtcblx0XHRlID0gZmFsc2U7XG5cdH0gZWxzZSB7XG5cdFx0YyA9IGNvbnRhaW5zLmNhbGwoZHNjciwgJ2MnKTtcblx0XHRlID0gY29udGFpbnMuY2FsbChkc2NyLCAnZScpO1xuXHR9XG5cblx0ZGVzYyA9IHsgZ2V0OiBnZXQsIHNldDogc2V0LCBjb25maWd1cmFibGU6IGMsIGVudW1lcmFibGU6IGUgfTtcblx0cmV0dXJuICFvcHRpb25zID8gZGVzYyA6IGFzc2lnbihub3JtYWxpemVPcHRzKG9wdGlvbnMpLCBkZXNjKTtcbn07XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9kL2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gMTBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2lzLWltcGxlbWVudGVkJykoKVxuXHQ/IE9iamVjdC5hc3NpZ25cblx0OiByZXF1aXJlKCcuL3NoaW0nKTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2VzNS1leHQvb2JqZWN0L2Fzc2lnbi9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDExXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkge1xuXHR2YXIgYXNzaWduID0gT2JqZWN0LmFzc2lnbiwgb2JqO1xuXHRpZiAodHlwZW9mIGFzc2lnbiAhPT0gJ2Z1bmN0aW9uJykgcmV0dXJuIGZhbHNlO1xuXHRvYmogPSB7IGZvbzogJ3JheicgfTtcblx0YXNzaWduKG9iaiwgeyBiYXI6ICdkd2EnIH0sIHsgdHJ6eTogJ3RyenknIH0pO1xuXHRyZXR1cm4gKG9iai5mb28gKyBvYmouYmFyICsgb2JqLnRyenkpID09PSAncmF6ZHdhdHJ6eSc7XG59O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vZXM1LWV4dC9vYmplY3QvYXNzaWduL2lzLWltcGxlbWVudGVkLmpzXG4gKiogbW9kdWxlIGlkID0gMTJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxudmFyIGtleXMgID0gcmVxdWlyZSgnLi4va2V5cycpXG4gICwgdmFsdWUgPSByZXF1aXJlKCcuLi92YWxpZC12YWx1ZScpXG5cbiAgLCBtYXggPSBNYXRoLm1heDtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZGVzdCwgc3JjLyosIOKApnNyY24qLykge1xuXHR2YXIgZXJyb3IsIGksIGwgPSBtYXgoYXJndW1lbnRzLmxlbmd0aCwgMiksIGFzc2lnbjtcblx0ZGVzdCA9IE9iamVjdCh2YWx1ZShkZXN0KSk7XG5cdGFzc2lnbiA9IGZ1bmN0aW9uIChrZXkpIHtcblx0XHR0cnkgeyBkZXN0W2tleV0gPSBzcmNba2V5XTsgfSBjYXRjaCAoZSkge1xuXHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlO1xuXHRcdH1cblx0fTtcblx0Zm9yIChpID0gMTsgaSA8IGw7ICsraSkge1xuXHRcdHNyYyA9IGFyZ3VtZW50c1tpXTtcblx0XHRrZXlzKHNyYykuZm9yRWFjaChhc3NpZ24pO1xuXHR9XG5cdGlmIChlcnJvciAhPT0gdW5kZWZpbmVkKSB0aHJvdyBlcnJvcjtcblx0cmV0dXJuIGRlc3Q7XG59O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vZXM1LWV4dC9vYmplY3QvYXNzaWduL3NoaW0uanNcbiAqKiBtb2R1bGUgaWQgPSAxM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vaXMtaW1wbGVtZW50ZWQnKSgpXG5cdD8gT2JqZWN0LmtleXNcblx0OiByZXF1aXJlKCcuL3NoaW0nKTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2VzNS1leHQvb2JqZWN0L2tleXMvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSAxNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcblx0dHJ5IHtcblx0XHRPYmplY3Qua2V5cygncHJpbWl0aXZlJyk7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH0gY2F0Y2ggKGUpIHsgcmV0dXJuIGZhbHNlOyB9XG59O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vZXM1LWV4dC9vYmplY3Qva2V5cy9pcy1pbXBsZW1lbnRlZC5qc1xuICoqIG1vZHVsZSBpZCA9IDE1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbnZhciBrZXlzID0gT2JqZWN0LmtleXM7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iamVjdCkge1xuXHRyZXR1cm4ga2V5cyhvYmplY3QgPT0gbnVsbCA/IG9iamVjdCA6IE9iamVjdChvYmplY3QpKTtcbn07XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9lczUtZXh0L29iamVjdC9rZXlzL3NoaW0uanNcbiAqKiBtb2R1bGUgaWQgPSAxNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuXHRpZiAodmFsdWUgPT0gbnVsbCkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCB1c2UgbnVsbCBvciB1bmRlZmluZWRcIik7XG5cdHJldHVybiB2YWx1ZTtcbn07XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9lczUtZXh0L29iamVjdC92YWxpZC12YWx1ZS5qc1xuICoqIG1vZHVsZSBpZCA9IDE3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbnZhciBmb3JFYWNoID0gQXJyYXkucHJvdG90eXBlLmZvckVhY2gsIGNyZWF0ZSA9IE9iamVjdC5jcmVhdGU7XG5cbnZhciBwcm9jZXNzID0gZnVuY3Rpb24gKHNyYywgb2JqKSB7XG5cdHZhciBrZXk7XG5cdGZvciAoa2V5IGluIHNyYykgb2JqW2tleV0gPSBzcmNba2V5XTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9wdGlvbnMvKiwg4oCmb3B0aW9ucyovKSB7XG5cdHZhciByZXN1bHQgPSBjcmVhdGUobnVsbCk7XG5cdGZvckVhY2guY2FsbChhcmd1bWVudHMsIGZ1bmN0aW9uIChvcHRpb25zKSB7XG5cdFx0aWYgKG9wdGlvbnMgPT0gbnVsbCkgcmV0dXJuO1xuXHRcdHByb2Nlc3MoT2JqZWN0KG9wdGlvbnMpLCByZXN1bHQpO1xuXHR9KTtcblx0cmV0dXJuIHJlc3VsdDtcbn07XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9lczUtZXh0L29iamVjdC9ub3JtYWxpemUtb3B0aW9ucy5qc1xuICoqIG1vZHVsZSBpZCA9IDE4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyBEZXByZWNhdGVkXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqID09PSAnZnVuY3Rpb24nOyB9O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vZXM1LWV4dC9vYmplY3QvaXMtY2FsbGFibGUuanNcbiAqKiBtb2R1bGUgaWQgPSAxOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vaXMtaW1wbGVtZW50ZWQnKSgpXG5cdD8gU3RyaW5nLnByb3RvdHlwZS5jb250YWluc1xuXHQ6IHJlcXVpcmUoJy4vc2hpbScpO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vZXM1LWV4dC9zdHJpbmcvIy9jb250YWlucy9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDIwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbnZhciBzdHIgPSAncmF6ZHdhdHJ6eSc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkge1xuXHRpZiAodHlwZW9mIHN0ci5jb250YWlucyAhPT0gJ2Z1bmN0aW9uJykgcmV0dXJuIGZhbHNlO1xuXHRyZXR1cm4gKChzdHIuY29udGFpbnMoJ2R3YScpID09PSB0cnVlKSAmJiAoc3RyLmNvbnRhaW5zKCdmb28nKSA9PT0gZmFsc2UpKTtcbn07XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9lczUtZXh0L3N0cmluZy8jL2NvbnRhaW5zL2lzLWltcGxlbWVudGVkLmpzXG4gKiogbW9kdWxlIGlkID0gMjFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxudmFyIGluZGV4T2YgPSBTdHJpbmcucHJvdG90eXBlLmluZGV4T2Y7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHNlYXJjaFN0cmluZy8qLCBwb3NpdGlvbiovKSB7XG5cdHJldHVybiBpbmRleE9mLmNhbGwodGhpcywgc2VhcmNoU3RyaW5nLCBhcmd1bWVudHNbMV0pID4gLTE7XG59O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vZXM1LWV4dC9zdHJpbmcvIy9jb250YWlucy9zaGltLmpzXG4gKiogbW9kdWxlIGlkID0gMjJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxudmFyIGlzU3ltYm9sID0gcmVxdWlyZSgnLi9pcy1zeW1ib2wnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodmFsdWUpIHtcblx0aWYgKCFpc1N5bWJvbCh2YWx1ZSkpIHRocm93IG5ldyBUeXBlRXJyb3IodmFsdWUgKyBcIiBpcyBub3QgYSBzeW1ib2xcIik7XG5cdHJldHVybiB2YWx1ZTtcbn07XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9lczYtc3ltYm9sL3ZhbGlkYXRlLXN5bWJvbC5qc1xuICoqIG1vZHVsZSBpZCA9IDIzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHgpIHtcblx0aWYgKCF4KSByZXR1cm4gZmFsc2U7XG5cdGlmICh0eXBlb2YgeCA9PT0gJ3N5bWJvbCcpIHJldHVybiB0cnVlO1xuXHRpZiAoIXguY29uc3RydWN0b3IpIHJldHVybiBmYWxzZTtcblx0aWYgKHguY29uc3RydWN0b3IubmFtZSAhPT0gJ1N5bWJvbCcpIHJldHVybiBmYWxzZTtcblx0cmV0dXJuICh4W3guY29uc3RydWN0b3IudG9TdHJpbmdUYWddID09PSAnU3ltYm9sJyk7XG59O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vZXM2LXN5bWJvbC9pcy1zeW1ib2wuanNcbiAqKiBtb2R1bGUgaWQgPSAyNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqXG4gKiBmaWxlT3ZlcnZpZXc6XG4gKiBQcm9qZWN0OlxuICogRmlsZTpcbiAqIERhdGU6XG4gKiBBdXRob3I6XG4gKi9cblxuXG4ndXNlIHN0cmljdCc7XG5cblxuaW1wb3J0IE1vZHVsZSBmcm9tIFwiLi4vdXRpbHMvTW9kdWxlXCI7XG5pbXBvcnQgU2VsZWN0b3IgZnJvbSBcIi4vU2VsZWN0b3JcIjtcbmltcG9ydCBCcm93c2VyVXRpbCBmcm9tIFwiLi9Ccm93c2VyVXRpbFwiO1xuXG5cbi8vIGRlbGVnYXRlIOmWoumAo1xubGV0IF9kZWxlZ2F0ZXMgPSB7fTtcbmxldCBwYXJhbUNvdW50ID0gMztcbmxldCBjcmVhdGVQYXJhbXMgPSBmdW5jdGlvbiAocGFyZW50LCB0YXJnZXQsIGhhbmRsZXIpIHtcbiAgcmV0dXJuIHtcbiAgICBwYXJlbnQ6IHBhcmVudCxcbiAgICB0YXJnZXQ6IHRhcmdldCxcbiAgICBoYW5kbGVyOiBoYW5kbGVyXG4gIH1cbn07XG5cblxuLy8g44OR44O844K144O86Zai6YCjXG5sZXQgdHJpbUxlZnQgPSAvXlxccysvO1xubGV0IHRyaW1SaWdodCA9IC9cXHMrJC87XG5cblxuLyoqXG4gKlxuICogQHBhcmFtIHN0clxuICogQHJldHVybnMgeyp9XG4gKi9cbmxldCB0cmltID0gZnVuY3Rpb24gKHN0cikge1xuICByZXR1cm4gc3RyLnJlcGxhY2UodHJpbUxlZnQsICcnKS5yZXBsYWNlKHRyaW1SaWdodCwgJycpO1xufTtcblxuXG4vKipcbiAqXG4gKiBAcGFyYW0gYmVmb3JlXG4gKiBAcGFyYW0gYWZ0ZXJcbiAqIEBwYXJhbSBnZXRGaXJzdFJlc3VsdFxuICogQHJldHVybnMge0Z1bmN0aW9ufVxuICovXG5sZXQgbWFrZVBhcnNlciA9IGZ1bmN0aW9uIChiZWZvcmUsIGFmdGVyLCBnZXRGaXJzdFJlc3VsdCkge1xuICByZXR1cm4gZnVuY3Rpb24gKGh0bWwsIGRvYykge1xuICAgIGxldCBwYXJzZXIgPSBkb2MuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgbGV0IGZyYWdtZW50ID0gZG9jLmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICBwYXJzZXIuaW5uZXJIVE1MID0gYmVmb3JlICsgaHRtbCArIGFmdGVyO1xuICAgIGxldCBub2RlID0gZ2V0Rmlyc3RSZXN1bHQocGFyc2VyKTtcbiAgICBsZXQgbmV4dE5vZGU7XG4gICAgd2hpbGUgKG5vZGUpIHtcbiAgICAgIG5leHROb2RlID0gbm9kZS5uZXh0U2libGluZztcbiAgICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKG5vZGUpO1xuICAgICAgbm9kZSA9IG5leHROb2RlO1xuICAgIH1cbiAgICByZXR1cm4gZnJhZ21lbnQ7XG4gIH07XG59O1xuXG5cbmxldCBkZWZhdWx0UGFyc2VyID0gbWFrZVBhcnNlcignJywgJycsIFNlbGVjdG9yLmdldEZpcnN0Q2hpbGQpO1xuXG5cbmxldCBwYXJzZXJzID0ge1xuICB0ZDogbWFrZVBhcnNlcignPHRhYmxlPjx0Ym9keT48dHI+JywgJzwvdHI+PFxcL3Rib2R5PjwvdGFibGU+JywgU2VsZWN0b3IuZ2V0Rmlyc3RHcmVhdEdyZWF0R3JhbmRDaGlsZCksXG4gIHRyOiBtYWtlUGFyc2VyKCc8dGFibGU+PHRib2R5PicsICc8L3Rib2R5PjxcXC90YWJsZT4nLCBTZWxlY3Rvci5nZXRGaXJzdEdyZWF0R3JhbmRDaGlsZCksXG4gIHRib2R5OiBtYWtlUGFyc2VyKCc8dGFibGU+JywgJzxcXC90YWJsZT4nLCBTZWxlY3Rvci5nZXRGaXJzdEdyYW5kQ2hpbGQpLFxuICBjb2w6IG1ha2VQYXJzZXIoJzx0YWJsZT48Y29sZ3JvdXA+JywgJzxcXC9jb2xncm91cD48L3RhYmxlPicsIFNlbGVjdG9yLmdldEZpcnN0R3JlYXRHcmFuZENoaWxkKSxcbiAgb3B0aW9uOiBtYWtlUGFyc2VyKCc8c2VsZWN0PjxvcHRpb24+YTxcXC9vcHRpb24+JywgJzxcXC9zZWxlY3Q+JywgU2VsZWN0b3IuZ2V0U2Vjb25kR3JhbmRDaGlsZClcbn07XG5cblxucGFyc2Vycy50aCA9IHBhcnNlcnMudGQ7XG5wYXJzZXJzLnRoZWFkID0gcGFyc2Vycy50Ym9keTtcbnBhcnNlcnMudGZvb3QgPSBwYXJzZXJzLnRib2R5O1xucGFyc2Vycy5jYXB0aW9uID0gcGFyc2Vycy50Ym9keTtcbnBhcnNlcnMuY29sZ3JvdXAgPSBwYXJzZXJzLnRib2R5O1xuXG5cbmxldCB0YWdSZWdFeHAgPSAvXjwoW2Etel0rKS9pOyAvLyBmaXJzdCBncm91cCBtdXN0IGJlIHRhZyBuYW1lXG5cblxuLypcbiAqIGNsYXNzTmFtZVxuICovXG5sZXQgX3JlZ0hpc3RvcnkgPSB7fTtcblxuXG5sZXQgX3JlZ0NsYXNzTmFtZSA9IGZ1bmN0aW9uIChjbGFzc05hbWUpIHtcbiAgaWYgKF9yZWdIaXN0b3J5W2NsYXNzTmFtZV0pIHtcbiAgICByZXR1cm4gX3JlZ0hpc3RvcnlbY2xhc3NOYW1lXTtcbiAgfVxuXG4gIGxldCByZWcgPSBuZXcgUmVnRXhwKCcoXnxcXFxccyspJyArIGNsYXNzTmFtZSArICcoXFxcXHMrfCQpJyk7XG4gIF9yZWdIaXN0b3J5W2NsYXNzTmFtZV0gPSByZWc7XG4gIHJldHVybiByZWc7XG59O1xuXG5cbmxldCBfdHJpbSA9IGZ1bmN0aW9uIChzdHIpIHtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCAnJyk7XG59O1xuXG5cbi8qKlxuICogUkVBRFlcbiAqL1xubGV0IF9yZWFkeSA9IChmdW5jdGlvbiAoKSB7XG4gIGxldCBmdW5jcyA9IFtdO1xuICBsZXQgaXNSZWFkeSA9IGRvY3VtZW50LnJlYWR5U3RhdGUgPT09ICdjb21wbGV0ZSc7XG5cbiAgbGV0IFJFQURZX1NUQVRFX0NIQU5HRSA9ICdyZWFkeXN0YXRlY2hhbmdlJztcbiAgbGV0IE9OX1JFQURZX1NUQVRFX0NIQU5HRSA9ICdvbl8nICsgUkVBRFlfU1RBVEVfQ0hBTkdFO1xuICBsZXQgTE9BRCA9ICdsb2FkJztcbiAgbGV0IERPTUNvbnRlbnRMb2FkZWQgPSAnRE9NQ29udGVudExvYWRlZCc7XG5cbiAgbGV0IGNvdW50ZXIgPSAwO1xuXG4gIGxldCBvbmUgPSBmdW5jdGlvbiAoZWxtLCB0eXBlLCBjYWxsYmFjaywgYnViYmxpbmcpIHtcblxuICAgIGxldCBoYW5kbGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKGVsbS5yZW1vdmVFdmVudExpc3RlbmVyKSB7XG4gICAgICAgIGVsbS5yZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIGhhbmRsZXIsIGZhbHNlKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGVsbS5kZXRhY2hFdmVudCkge1xuICAgICAgICBlbG0uZGV0YWNoRXZlbnQoJ29uJyArIHR5cGUsIGhhbmRsZXIpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGVsbVsnb24nICsgdHlwZV0gPSBudWxsO1xuICAgICAgfVxuICAgICAgY2FsbGJhY2suYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcbiAgICB9LmJpbmQodGhpcyk7XG5cbiAgICBpZiAoZWxtLmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICAgIGVsbS5hZGRFdmVudExpc3RlbmVyKHR5cGUsIGhhbmRsZXIsIChidWJibGluZyB8fCBmYWxzZSkpO1xuICAgIH1cbiAgICBlbHNlIGlmIChlbG0uYXR0YWNoRXZlbnQpIHtcbiAgICAgIGVsbS5hdHRhY2hFdmVudCgnb24nICsgdHlwZSwgaGFuZGxlcik7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgZWxtWydvbicgKyB0eXBlXSA9IGhhbmRsZXI7XG4gICAgfVxuXG4gIH07XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSBldmVudFxuICAgKi9cbiAgbGV0IGhhbmRsZXIgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICBpZiAoaXNSZWFkeSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChldmVudC50eXBlID09PSBSRUFEWV9TVEFURV9DSEFOR0UgJiYgZG9jdW1lbnQucmVhZHlTdGF0ZSAhPT0gJ2NvbXBsZXRlJykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZnVuY3MubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGZ1bmNzW2ldLmNhbGwoZG9jdW1lbnQpO1xuICAgIH1cblxuICAgIGNvdW50ZXIgKz0gMTtcblxuICAgIGlzUmVhZHkgPSB0cnVlO1xuICAgIGZ1bmNzID0gbnVsbDtcbiAgfTtcblxuXG4gIGlmIChkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgb25lKGRvY3VtZW50LCBET01Db250ZW50TG9hZGVkLCBoYW5kbGVyLCBmYWxzZSk7XG4gIH0gZWxzZSBpZiAoZG9jdW1lbnQuYXR0YWNoRXZlbnQpIHtcbiAgICBvbmUoZG9jdW1lbnQsIE9OX1JFQURZX1NUQVRFX0NIQU5HRSwgaGFuZGxlcik7XG4gIH1cblxuXG4gIG9uZSh3aW5kb3csIExPQUQsIGhhbmRsZXIpO1xuXG5cbiAgLyoqXG4gICAqIEBwYXJhbSBmdW5jXG4gICAqL1xuICByZXR1cm4gZnVuY3Rpb24gKGZ1bikge1xuICAgIGlmIChpc1JlYWR5KSB7XG4gICAgICBzZXRUaW1lb3V0KGZ1bi5jYWxsKGRvY3VtZW50KSwgMCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgZnVuY3MucHVzaChmdW4pO1xuICAgIH1cbiAgfTtcbn0oKSk7XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRE9NVXRpbCB7XG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0gZWxlbVxuICAgKiBAcGFyYW0gdHlwZVxuICAgKiBAcGFyYW0gaGFuZGxlclxuICAgKiBAcGFyYW0gYnViYmxpbmdcbiAgICovXG4gIHN0YXRpYyBhZGRFdmVudExpc3RlbmVyKGVsZW0sIHR5cGUsIGhhbmRsZXIsIGJ1YmJsaW5nKSB7XG5cbiAgICBpZiAoIWVsZW0gfHwgIXR5cGUgfHwgIWhhbmRsZXIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoZWxlbS5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgaGFuZGxlciwgKGJ1YmJsaW5nIHx8IGZhbHNlKSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGVsZW0uYXR0YWNoRXZlbnQpIHtcbiAgICAgIGVsZW0uYXR0YWNoRXZlbnQoJ29uJyArIHR5cGUsIGhhbmRsZXIpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGVsZW1bJ29uJyArIHR5cGVdID0gaGFuZGxlcjtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIGVsZW1cbiAgICogQHBhcmFtIHR5cGVcbiAgICogQHBhcmFtIGhhbmRsZXJcbiAgICogQHBhcmFtIGJ1YmJsaW5nXG4gICAqL1xuICBzdGF0aWMgYWRkRXZlbnQoZWxlbSwgdHlwZSwgaGFuZGxlciwgYnViYmxpbmcpIHtcbiAgICBET01VdGlsLmFkZEV2ZW50TGlzdGVuZXIoZWxlbSwgdHlwZSwgaGFuZGxlciwgYnViYmxpbmcpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSBlbGVtXG4gICAqIEBwYXJhbSB0eXBlXG4gICAqIEBwYXJhbSBoYW5kbGVyXG4gICAqIEBwYXJhbSBidWJibGluZ1xuICAgKi9cbiAgc3RhdGljIG9uKGVsZW0sIHR5cGUsIGhhbmRsZXIsIGJ1YmJsaW5nKSB7XG4gICAgRE9NVXRpbC5hZGRFdmVudExpc3RlbmVyKGVsZW0sIHR5cGUsIGhhbmRsZXIsIGJ1YmJsaW5nKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0gZWxlbVxuICAgKiBAcGFyYW0gdHlwZVxuICAgKiBAcGFyYW0gaGFuZGxlclxuICAgKiBAcGFyYW0gYnViYmxpbmdcbiAgICovXG4gIHN0YXRpYyBiaW5kKGVsZW0sIHR5cGUsIGhhbmRsZXIsIGJ1YmJsaW5nKSB7XG4gICAgRE9NVXRpbC5hZGRFdmVudExpc3RlbmVyKGVsZW0sIHR5cGUsIGhhbmRsZXIsIGJ1YmJsaW5nKTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSBlbG1cbiAgICogQHBhcmFtIHR5cGVcbiAgICogQHBhcmFtIGNhbGxiYWNrXG4gICAqIEBwYXJhbSBidWJibGluZ1xuICAgKi9cbiAgc3RhdGljIG9uZShlbG0sIHR5cGUsIGNhbGxiYWNrLCBidWJibGluZykge1xuXG4gICAgbGV0IGhhbmRsZXIgPSAoKSA9PiB7XG4gICAgICB0aGlzLm9mZihlbG0sIHR5cGUsIGhhbmRsZXIpO1xuICAgICAgY2FsbGJhY2suYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcbiAgICB9O1xuXG4gICAgdGhpcy5vbihlbG0sIHR5cGUsIGhhbmRsZXIsIGJ1YmJsaW5nKTtcblxuICB9XG5cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIGVsZW1cbiAgICogQHBhcmFtIHR5cGVcbiAgICogQHBhcmFtIGhhbmRsZXJcbiAgICogQHBhcmFtIGJ1YmJsaW5nXG4gICAqL1xuICBzdGF0aWMgcmVtb3ZlRXZlbnRMaXN0ZW5lcihlbGVtLCB0eXBlLCBoYW5kbGVyLCBidWJibGluZykge1xuXG4gICAgaWYgKCFlbGVtIHx8ICF0eXBlIHx8ICFoYW5kbGVyKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGVsZW0ucmVtb3ZlRXZlbnRMaXN0ZW5lcikge1xuICAgICAgZWxlbS5yZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIGhhbmRsZXIsIChidWJibGluZyB8fCBmYWxzZSkpO1xuICAgIH1cbiAgICBlbHNlIGlmIChlbGVtLmRldGFjaEV2ZW50KSB7XG4gICAgICBlbGVtLmRldGFjaEV2ZW50KCdvbicgKyB0eXBlLCBoYW5kbGVyKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBlbGVtWydvbicgKyB0eXBlXSA9IG51bGw7XG4gICAgfVxuICB9XG5cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIGVsZW1cbiAgICogQHBhcmFtIHR5cGVcbiAgICogQHBhcmFtIGhhbmRsZXJcbiAgICogQHBhcmFtIGJ1YmJsaW5nXG4gICAqL1xuICBzdGF0aWMgcmVtb3ZlRXZlbnQoZWxlbSwgdHlwZSwgaGFuZGxlciwgYnViYmxpbmcpIHtcbiAgICBET01VdGlsLnJlbW92ZUV2ZW50TGlzdGVuZXIoZWxlbSwgdHlwZSwgaGFuZGxlciwgYnViYmxpbmcpO1xuICB9XG5cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIGVsZW1cbiAgICogQHBhcmFtIHR5cGVcbiAgICogQHBhcmFtIGhhbmRsZXJcbiAgICogQHBhcmFtIGJ1YmJsaW5nXG4gICAqL1xuICBzdGF0aWMgdW5iaW5kKGVsZW0sIHR5cGUsIGhhbmRsZXIsIGJ1YmJsaW5nKSB7XG4gICAgRE9NVXRpbC5yZW1vdmVFdmVudExpc3RlbmVyKGVsZW0sIHR5cGUsIGhhbmRsZXIsIGJ1YmJsaW5nKTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSBlbGVtXG4gICAqIEBwYXJhbSB0eXBlXG4gICAqIEBwYXJhbSBoYW5kbGVyXG4gICAqIEBwYXJhbSBidWJibGluZ1xuICAgKi9cbiAgc3RhdGljIG9mZihlbGVtLCB0eXBlLCBoYW5kbGVyLCBidWJibGluZykge1xuICAgIERPTVV0aWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihlbGVtLCB0eXBlLCBoYW5kbGVyLCBidWJibGluZyk7XG4gIH1cblxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0gZXZlbnRcbiAgICovXG4gIHN0YXRpYyBjYW5jZWxFdmVudChldmVudCkge1xuICAgIGlmICghZXZlbnQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGV2ZW50LnByZXZlbnREZWZhdWx0KSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBldmVudC5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSBldmVudFxuICAgKi9cbiAgc3RhdGljIHN0b3BFdmVudChldmVudCkge1xuICAgIGlmICghZXZlbnQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGV2ZW50LnN0b3BQcm9wYWdhdGlvbikge1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgZXZlbnQuY2FuY2VsQnViYmxlID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0gZXZlbnRcbiAgICovXG4gIHN0YXRpYyBkaXNhYmxlRXZlbnQoZXZlbnQpIHtcblxuICAgIGlmICgnb3JpZ2luYWxFdmVudCcgaW4gZXZlbnQgJiYgZXZlbnQuaGFzT3duUHJvcGVydHkoJ29yaWdpbmFsRXZlbnQnKSkge1xuICAgICAgZXZlbnQgPSBldmVudC5vcmlnaW5hbEV2ZW50O1xuICAgIH1cblxuICAgIERPTVV0aWwuc3RvcEV2ZW50KGV2ZW50KTtcbiAgICBET01VdGlsLmNhbmNlbEV2ZW50KGV2ZW50KTtcbiAgfTtcblxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0gZWxlbWVudFxuICAgKiBAcGFyYW0gZXZlbnRcbiAgICogQHJldHVybnMgeyp9XG4gICAqL1xuICBzdGF0aWMgdHJpZ2dlckV2ZW50KGVsZW1lbnQsIGV2ZW50KSB7XG4gICAgbGV0IGV2dDtcblxuICAgIGxldCBpc1N0cmluZyA9IGZ1bmN0aW9uIChpdCkge1xuICAgICAgcmV0dXJuIHR5cGVvZiBpdCA9PSAnc3RyaW5nJyB8fCBpdCBpbnN0YW5jZW9mIFN0cmluZztcbiAgICB9O1xuXG4gICAgZWxlbWVudCA9IChpc1N0cmluZyhlbGVtZW50KSkgPyBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50KSA6IGVsZW1lbnQ7XG4gICAgaWYgKGRvY3VtZW50LmNyZWF0ZUV2ZW50T2JqZWN0KSB7XG4gICAgICBldnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudE9iamVjdCgpO1xuICAgICAgcmV0dXJuIGVsZW1lbnQuZmlyZUV2ZW50KCdvbicgKyBldmVudCwgZXZ0KVxuICAgIH0gZWxzZSB7XG4gICAgICBldnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnSFRNTEV2ZW50cycpO1xuICAgICAgZXZ0LmluaXRFdmVudChldmVudCwgdHJ1ZSwgdHJ1ZSk7XG4gICAgICByZXR1cm4gIWVsZW1lbnQuZGlzcGF0Y2hFdmVudChldnQpO1xuICAgIH1cblxuICB9O1xuXG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSBwYXJlbnRcbiAgICogQHBhcmFtIHRhcmdldFxuICAgKiBAcGFyYW0gdHlwZVxuICAgKiBAcGFyYW0gaGFuZGxlclxuICAgKi9cbiAgc3RhdGljIGRlbGVnYXRlKHBhcmVudCwgdGFyZ2V0LCB0eXBlLCBoYW5kbGVyKSB7XG5cbiAgICBfZGVsZWdhdGVzW3R5cGVdID0gX2RlbGVnYXRlcy5oYXNPd25Qcm9wZXJ0eSh0eXBlKSA/IF9kZWxlZ2F0ZXNbdHlwZV0gOiBbXTtcblxuICAgIGxldCBfY2hpbGRyZW4gPSBudWxsO1xuICAgIGxldCBzZWxlY3RvclR5cGUgPSAnJztcblxuICAgIGlmICh0YXJnZXQuaW5kZXhPZignLicpID4gLTEpIHtcbiAgICAgIHNlbGVjdG9yVHlwZSA9ICdjbGFzc05hbWUnO1xuICAgICAgdGFyZ2V0ID0gdGFyZ2V0LnJlcGxhY2UoL1xcLi9pZywgJycpO1xuICAgICAgX2NoaWxkcmVuID0gTW9kdWxlLm1ha2VBcnJheShTZWxlY3Rvci5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHRhcmdldCwgcGFyZW50KSk7XG4gICAgfSBlbHNlIGlmICh0YXJnZXQuaW5kZXhPZignIycpID4gLTEpIHtcbiAgICAgIHNlbGVjdG9yVHlwZSA9ICdpZCc7XG4gICAgICBfY2hpbGRyZW4gPSBbZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGFyZ2V0KV07XG4gICAgICB0YXJnZXQgPSB0YXJnZXQucmVwbGFjZSgvIy9pZywgJycpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzZWxlY3RvclR5cGUgPSAndGFnJztcbiAgICAgIF9jaGlsZHJlbiA9IE1vZHVsZS5tYWtlQXJyYXkocGFyZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKHRhcmdldCkpO1xuICAgICAgdGFyZ2V0ID0gdGFyZ2V0LnRvVXBwZXJDYXNlKCk7XG4gICAgfVxuXG4gICAgbGV0IGRlbGVnYXRlSGFuZGxlciA9IGZ1bmN0aW9uIChldmVudCkge1xuXG4gICAgICBsZXQgX3RhcmdldCA9IGV2ZW50LnRhcmdldCB8fCBldmVudC5zcmNFbGVtZW50O1xuXG4gICAgICBpZiAoIV90YXJnZXQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBsZXQgZXZlbnRUYXJnZXQgPSBudWxsO1xuXG4gICAgICBzd2l0Y2ggKHNlbGVjdG9yVHlwZSkge1xuICAgICAgICBjYXNlICdjbGFzc05hbWUnOlxuICAgICAgICAgIGV2ZW50VGFyZ2V0ID0gRE9NVXRpbC5oYXNDbGFzcyhfdGFyZ2V0LCB0YXJnZXQpID8gX3RhcmdldCA6IFNlbGVjdG9yLmdldFBhcmVudENsYXNzTmFtZU5vZGUoX3RhcmdldCwgdGFyZ2V0KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnaWQnOlxuICAgICAgICAgIGV2ZW50VGFyZ2V0ID0gX3RhcmdldC5pZCA9PT0gdGFyZ2V0ID8gX3RhcmdldCA6IFNlbGVjdG9yLmdldFBhcmVudElkTmFtZU5vZGUoX3RhcmdldCwgdGFyZ2V0KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAndGFnJzpcbiAgICAgICAgICBldmVudFRhcmdldCA9IF90YXJnZXQudGFnTmFtZSA9PT0gdGFyZ2V0ID8gX3RhcmdldCA6IFNlbGVjdG9yLmdldFBhcmVudE5vZGUoX3RhcmdldCwgdGFyZ2V0KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBldmVudFRhcmdldCA9IF90YXJnZXQudGFnTmFtZSA9PT0gdGFyZ2V0ID8gX3RhcmdldCA6IFNlbGVjdG9yLmdldFBhcmVudE5vZGUoX3RhcmdldCwgdGFyZ2V0KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgaWYgKCFldmVudFRhcmdldCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGhhbmRsZXIoe1xuICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudCxcbiAgICAgICAgdGFyZ2V0OiBldmVudFRhcmdldCxcbiAgICAgICAgaW5kZXg6IF9jaGlsZHJlbi5pbmRleE9mKGV2ZW50VGFyZ2V0KSxcbiAgICAgICAgc3RvcDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIERPTVV0aWwuZGlzYWJsZUV2ZW50KGV2ZW50KTtcbiAgICAgICAgfSxcbiAgICAgICAgcHJldmVudERlZmF1bHQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBET01VdGlsLmRpc2FibGVFdmVudChldmVudCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgfTtcblxuICAgIGxldCBwYXJhbXMgPSBjcmVhdGVQYXJhbXMocGFyZW50LCB0YXJnZXQsIGhhbmRsZXIpO1xuXG4gICAgcGFyYW1zLmRlbGVnYXRlSGFuZGxlciA9IGRlbGVnYXRlSGFuZGxlcjtcblxuICAgIF9kZWxlZ2F0ZXNbdHlwZV0ucHVzaChwYXJhbXMpO1xuXG4gICAgRE9NVXRpbC5vbihwYXJlbnQsIHR5cGUsIGRlbGVnYXRlSGFuZGxlcik7XG5cbiAgfVxuXG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSBwYXJlbnRcbiAgICogQHBhcmFtIHRhcmdldFxuICAgKiBAcGFyYW0gdHlwZVxuICAgKiBAcGFyYW0gaGFuZGxlclxuICAgKi9cbiAgc3RhdGljIHVuZGVsZWdhdGUocGFyZW50LCB0YXJnZXQsIHR5cGUsIGhhbmRsZXIpIHtcblxuICAgIGxldCBsaXN0ZW5lcnMgPSBfZGVsZWdhdGVzW3R5cGVdID8gX2RlbGVnYXRlc1t0eXBlXSA6IG51bGw7XG5cbiAgICBpZiAoIWxpc3RlbmVycykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBwYXJhbXMgPSBjcmVhdGVQYXJhbXMocGFyZW50LCB0YXJnZXQsIGhhbmRsZXIpO1xuXG4gICAgbGV0IHNhbWVDb3VudCA9IDA7XG5cbiAgICBsaXN0ZW5lcnMuZm9yRWFjaChmdW5jdGlvbiAobGlzdGVuZXIpIHtcblxuICAgICAgc2FtZUNvdW50ID0gMDtcblxuICAgICAgZm9yIChsZXQgcHJvcCBpbiBsaXN0ZW5lcikge1xuICAgICAgICBpZiAobGlzdGVuZXIuaGFzT3duUHJvcGVydHkocHJvcCkgJiYgcGFyYW1zLmhhc093blByb3BlcnR5KHByb3ApKSB7XG4gICAgICAgICAgc2FtZUNvdW50ICs9IDE7XG5cbiAgICAgICAgICBpZiAoc2FtZUNvdW50ID09PSBwYXJhbUNvdW50KSB7XG4gICAgICAgICAgICBET01VdGlsLm9mZihwYXJlbnQsIHR5cGUsIGxpc3RlbmVyLmRlbGVnYXRlSGFuZGxlcik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0gaHRtbFxuICAgKiBAcGFyYW0gZG9jXG4gICAqIEByZXR1cm5zIHsqfVxuICAgKi9cbiAgc3RhdGljIHBhcnNlSFRNTChodG1sLCBkb2MpIHtcbiAgICBodG1sID0gdHJpbShodG1sKTtcblxuICAgIGxldCBwYXJzZXIgPSBkZWZhdWx0UGFyc2VyO1xuICAgIGxldCBtYXRjaGVzID0gaHRtbC5tYXRjaCh0YWdSZWdFeHApO1xuICAgIGlmIChtYXRjaGVzKSB7XG4gICAgICBsZXQgbmFtZSA9IG1hdGNoZXNbMV0udG9Mb3dlckNhc2UoKTtcbiAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocGFyc2VycywgbmFtZSkpIHtcbiAgICAgICAgcGFyc2VyID0gcGFyc2Vyc1tuYW1lXTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHBhcnNlcihodG1sLCBkb2MgfHwgZG9jdW1lbnQpO1xuICB9O1xuXG5cbiAgc3RhdGljIGdldEV2ZW50UG9pbnQoZXZlbnQpIHtcbiAgICBpZiAoQnJvd3NlclV0aWwubHRJRTgpIHtcbiAgICAgIGxldCB0YXJnZXQgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG4gICAgICByZXR1cm4gKHtcbiAgICAgICAgeDogZXZlbnQuY2xpZW50WCArIHRhcmdldC5zY3JvbGxMZWZ0LFxuICAgICAgICB5OiBldmVudC5jbGllbnRZICsgdGFyZ2V0LnNjcm9sbFRvcFxuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmIChCcm93c2VyVXRpbC5lbmFibGVUb3VjaCkge1xuICAgICAgbGV0IHRhcmdldCA9IGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdO1xuICAgICAgcmV0dXJuICh7XG4gICAgICAgIHg6IHRhcmdldC5wYWdlWCxcbiAgICAgICAgeTogdGFyZ2V0LnBhZ2VZXG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gKHtcbiAgICAgICAgeDogZXZlbnQucGFnZVgsXG4gICAgICAgIHk6IGV2ZW50LnBhZ2VZXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHJldHVybnMgeyp9XG4gICAqL1xuICBzdGF0aWMgcmVtb3ZlUHJvcCgpIHtcbiAgICBsZXQgX3N0eWxlID0gZG9jdW1lbnQuYm9keS5zdHlsZTtcbiAgICByZXR1cm4gKF9zdHlsZS5yZW1vdmVQcm9wZXJ0eSA/IF9zdHlsZS5yZW1vdmVQcm9wZXJ0eSA6IF9zdHlsZS5yZW1vdmVBdHRyaWJ1dGUpO1xuICB9XG5cblxuICAvKipcbiAgICogQHBhcmFtIGVsZW1lbnRcbiAgICogQHBhcmFtIGNsYXNzTmFtZVxuICAgKi9cbiAgc3RhdGljIGFkZENsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSkge1xuICAgIGxldCBkZWZhdWx0Q2xhc3NOYW1lID0gZWxlbWVudC5jbGFzc05hbWU7XG4gICAgbGV0IHJlc3VsdCA9IGZhbHNlO1xuICAgIGlmICghRE9NVXRpbC5oYXNDbGFzcyhlbGVtZW50LCBjbGFzc05hbWUpKSB7XG4gICAgICBlbGVtZW50LmNsYXNzTmFtZSArPSAoZGVmYXVsdENsYXNzTmFtZSA/ICcgJyA6ICcnKSArIGNsYXNzTmFtZTtcbiAgICAgIHJlc3VsdCA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIGVsZW1lbnRcbiAgICogQHBhcmFtIGNsYXNzTmFtZVxuICAgKiBAcGFyYW0gW19leGNlcHRdXG4gICAqL1xuICBzdGF0aWMgcmVtb3ZlQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lLCBfZXhjZXB0KSB7XG5cbiAgICBsZXQgZGVmYXVsdENsYXNzTmFtZSA9IGVsZW1lbnQuY2xhc3NOYW1lO1xuICAgIGxldCBuZXdDbGFzc05hbWUgPSAnJztcbiAgICBsZXQgcmVzdWx0ID0gZmFsc2U7XG5cbiAgICBpZiAoX2V4Y2VwdCB8fCBET01VdGlsLmhhc0NsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSkpIHtcbiAgICAgIG5ld0NsYXNzTmFtZSA9IF90cmltKGRlZmF1bHRDbGFzc05hbWUucmVwbGFjZShfcmVnQ2xhc3NOYW1lKGNsYXNzTmFtZSksICcgJykpO1xuICAgICAgZWxlbWVudC5jbGFzc05hbWUgPSBuZXdDbGFzc05hbWU7XG4gICAgICByZXN1bHQgPSB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG5cbiAgLyoqXG4gICAqIEBwYXJhbSBlbGVtZW50XG4gICAqIEBwYXJhbSBjbGFzc05hbWVcbiAgICovXG4gIHN0YXRpYyB0b2dnbGVDbGFzcyhlbGVtZW50LCBjbGFzc05hbWUpIHtcbiAgICBsZXQgbWV0aG9kTmFtZSA9IERPTVV0aWwuaGFzQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKSA/ICdyZW1vdmVDbGFzcycgOiAnYWRkQ2xhc3MnO1xuICAgIERPTVV0aWxbbWV0aG9kTmFtZV0oZWxlbWVudCwgY2xhc3NOYW1lKTtcbiAgfTtcblxuXG4gIC8qKlxuICAgKiBAcGFyYW0gZWxlbWVudFxuICAgKiBAcGFyYW0gY2xhc3NOYW1lXG4gICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgKi9cbiAgc3RhdGljIGhhc0NsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSkge1xuICAgIGxldCBkZWZhdWx0Q2xhc3NOYW1lID0gZWxlbWVudC5jbGFzc05hbWU7XG5cbiAgICBpZiAoIWRlZmF1bHRDbGFzc05hbWUgfHwgZGVmYXVsdENsYXNzTmFtZS5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGVsc2UgaWYgKGRlZmF1bHRDbGFzc05hbWUgPT09IGNsYXNzTmFtZSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIF9yZWdDbGFzc05hbWUoY2xhc3NOYW1lKS50ZXN0KGRlZmF1bHRDbGFzc05hbWUpO1xuICB9O1xuXG5cbiAgLyoqXG4gICAqIOaMh+Wumuimgee0oOOBruS4reOBruODhuOCreOCueODiOOCkuWPluW+l1xuICAgKi9cbiAgc3RhdGljIGdldFRleHQoZWxlbSkge1xuICAgIGxldCBfZG9jRWxlbSA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcblxuICAgIGlmIChfZG9jRWxlbS50ZXh0Q29udGVudCkge1xuICAgICAgcmV0dXJuIGVsZW0udGV4dENvbnRlbnQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBlbGVtLmlubmVyVGV4dDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIGVsZW1lbnRcbiAgICogQHBhcmFtIHN0cmluZ1xuICAgKi9cbiAgc3RhdGljIHRleHQoZWxlbWVudCwgc3RyaW5nKSB7XG4gICAgKGVsZW1lbnQudGV4dENvbnRlbnQgIT09IHVuZGVmaW5lZCkgPyBlbGVtZW50LnRleHRDb250ZW50ID0gc3RyaW5nIDogZWxlbWVudC5pbm5lclRleHQgPSBzdHJpbmc7XG4gIH1cblxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0gZWxlbWVudFxuICAgKi9cbiAgc3RhdGljIHNob3cgKGVsZW1lbnQpIHtcbiAgICBpZiAoZWxlbWVudCAhPT0gbnVsbCAmJiB0eXBlb2YgZWxlbWVudCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGlmICgnc3R5bGUnIGluIGVsZW1lbnQpIHtcbiAgICAgICAgZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVsZW1lbnQuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICB9XG4gICAgfVxuICB9XG5cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIGVsZW1lbnRcbiAgICovXG4gIHN0YXRpYyBoaWRlKGVsZW1lbnQpIHtcbiAgICBpZiAoZWxlbWVudCAhPT0gbnVsbCAmJiB0eXBlb2YgZWxlbWVudCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGlmICgnc3R5bGUnIGluIGVsZW1lbnQpIHtcbiAgICAgICAgZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWxlbWVudC5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSBlbGVtZW50XG4gICAqL1xuICBzdGF0aWMgZW1wdHkoZWxlbWVudCkge1xuICAgIGlmIChlbGVtZW50ICE9PSBudWxsICYmIHR5cGVvZiBlbGVtZW50ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgd2hpbGUgKGVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgICBlbGVtZW50LnJlbW92ZUNoaWxkKGVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIGVsU3R5bGVcbiAgICogQHBhcmFtIHN0eWxlc1xuICAgKi9cbiAgc3RhdGljIGNzcyhlbFN0eWxlLCBzdHlsZXMpIHtcbiAgICBpZiAoIWVsU3R5bGUgfHwgIXN0eWxlcykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGVsU3R5bGUgPSAnc3R5bGUnIGluIGVsU3R5bGUgPyBlbFN0eWxlLnN0eWxlIDogZWxTdHlsZTtcblxuICAgIGZvciAobGV0IHByb3AgaW4gc3R5bGVzKSB7XG4gICAgICBpZiAoc3R5bGVzLmhhc093blByb3BlcnR5KHByb3ApKSB7XG4gICAgICAgIGVsU3R5bGVbcHJvcF0gPSBzdHlsZXNbcHJvcF07XG4gICAgICB9XG4gICAgfVxuICB9XG5cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHJ1cmxlcyAge2FycmF5fVxuICAgKi9cbiAgc3RhdGljIG1ha2VDU1NSdWxlcyhydXJsZXMpIHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkocnVybGVzKSB8fCBydXJsZXMubGVuZ3RoIDw9IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGRvY3VtZW50LmNyZWF0ZVN0eWxlU2hlZXQpIHtcbiAgICAgIGxldCBfc2hlZXQgPSBkb2N1bWVudC5jcmVhdGVTdHlsZVNoZWV0KCk7XG4gICAgICBfc2hlZXQuY3NzVGV4dCA9IHJ1cmxlcy5qb2luKCcnKTtcbiAgICAgIF9zaGVldCA9IG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBfc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgICAgbGV0IF9oZWFkID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXTtcbiAgICAgIF9zdHlsZS50ZXh0Q29udGVudCA9IHJ1cmxlcy5qb2luKCcnKTtcbiAgICAgIF9oZWFkLmFwcGVuZENoaWxkKF9zdHlsZSk7XG4gICAgICBfc3R5bGUgPSBudWxsO1xuICAgICAgX2hlYWQgPSBudWxsO1xuICAgIH1cbiAgfVxuXG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSBlbGVtZW50XG4gICAqIEByZXR1cm5zIHt7bGVmdDogKE51bWJlcnxudW1iZXIpLCB0b3A6IChOdW1iZXJ8bnVtYmVyKX19XG4gICAqL1xuICBzdGF0aWMgZ2V0UG9zaXRpb24oZWxlbWVudCkge1xuICAgIHJldHVybiB7bGVmdDogZWxlbWVudC5vZmZzZXRMZWZ0LCB0b3A6IGVsZW1lbnQub2Zmc2V0VG9wfTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSBlbGVtZW50XG4gICAqIEByZXR1cm5zIHsqfVxuICAgKi9cbiAgc3RhdGljIGdldE9mZnNldChlbGVtZW50KSB7XG4gICAgbGV0IF94LCBfeTtcbiAgICBfeCA9IF95ID0gMDtcbiAgICBpZiAoIWVsZW1lbnQpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBkbyB7XG4gICAgICBfeCArPSBlbGVtZW50Lm9mZnNldExlZnQ7XG4gICAgICBfeSArPSBlbGVtZW50Lm9mZnNldFRvcDtcbiAgICB9IHdoaWxlICgoZWxlbWVudCA9IGVsZW1lbnQub2Zmc2V0UGFyZW50KSk7XG5cbiAgICByZXR1cm4gKHt0b3A6IF95LCBsZWZ0OiBfeH0pO1xuICB9XG5cblxuICBzdGF0aWMgZ2V0T2Zmc2V0UG9zaXRpb24oZWwpIHtcbiAgICB2YXIgeFBvcyA9IDA7XG4gICAgdmFyIHlQb3MgPSAwO1xuXG4gICAgd2hpbGUgKGVsKSB7XG4gICAgICBpZiAoZWwudGFnTmFtZSA9PSBcIkJPRFlcIikge1xuICAgICAgICB2YXIgeFNjcm9sbCA9IGVsLnNjcm9sbExlZnQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbExlZnQ7XG4gICAgICAgIHZhciB5U2Nyb2xsID0gZWwuc2Nyb2xsVG9wIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3A7XG5cbiAgICAgICAgeFBvcyArPSAoZWwub2Zmc2V0TGVmdCAtIHhTY3JvbGwgKyBlbC5jbGllbnRMZWZ0KTtcbiAgICAgICAgeVBvcyArPSAoZWwub2Zmc2V0VG9wIC0geVNjcm9sbCArIGVsLmNsaWVudFRvcCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBmb3IgYWxsIG90aGVyIG5vbi1CT0RZIGVsZW1lbnRzXG4gICAgICAgIHhQb3MgKz0gKGVsLm9mZnNldExlZnQgLSBlbC5zY3JvbGxMZWZ0ICsgZWwuY2xpZW50TGVmdCk7XG4gICAgICAgIHlQb3MgKz0gKGVsLm9mZnNldFRvcCAtIGVsLnNjcm9sbFRvcCArIGVsLmNsaWVudFRvcCk7XG4gICAgICB9XG5cbiAgICAgIGVsID0gZWwub2Zmc2V0UGFyZW50O1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgbGVmdDogeFBvcyxcbiAgICAgIHRvcDogeVBvc1xuICAgIH07XG5cbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0gZWxlbWVudFxuICAgKiBAcmV0dXJucyB7Kn1cbiAgICovXG4gIHN0YXRpYyBnZXRSZWN0KGVsZW1lbnQpIHtcbiAgICBsZXQgcmVjdCA9IERPTVV0aWwuZ2V0T2Zmc2V0KGVsZW1lbnQpO1xuICAgIHJlY3Qud2lkdGggPSBlbGVtZW50Lm9mZnNldFdpZHRoO1xuICAgIHJlY3QuaGVpZ2h0ID0gZWxlbWVudC5vZmZzZXRIZWlnaHQ7XG4gICAgcmVjdC5yaWdodCA9IHJlY3QubGVmdCArIHJlY3Qud2lkdGg7XG4gICAgcmVjdC5ib3R0b20gPSByZWN0LnRvcCArIHJlY3QuaGVpZ2h0O1xuICAgIHJldHVybiByZWN0O1xuICB9XG5cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIGVsZW1cbiAgICogQHJldHVybnMgeyp9XG4gICAqL1xuICBzdGF0aWMgZ2V0U3R5bGUoZWxlbSkge1xuICAgIGxldCBfc3R5bGVEYXRhID0gbnVsbDtcblxuICAgIGlmICh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSkge1xuICAgICAgX3N0eWxlRGF0YSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsZW0sIG51bGwpO1xuICAgIH0gZWxzZSBpZiAoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmN1cnJlbnRTdHlsZSkge1xuICAgICAgX3N0eWxlRGF0YSA9IGVsZW0uY3VycmVudFN0eWxlO1xuICAgIH1cblxuICAgIHJldHVybiBfc3R5bGVEYXRhO1xuICB9XG5cblxuICAvKipcbiAgICogIOOCueOCv+OCpOODq+ODl+ODreODkeODhuOCo+ODvOOCkuWPluW+l1xuICAgKi9cbiAgc3RhdGljIGdldFN0eWxlUHJvcGVydHlmdW5jdGlvbihwcm9wTmFtZSkge1xuXG4gICAgbGV0IHByZWZpeGVzID0gJ1dlYmtpdCBNb3ogbXMgTXMgTycuc3BsaXQoJyAnKTtcbiAgICBsZXQgZG9jRWxlbVN0eWxlID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlO1xuXG4gICAgaWYgKCFwcm9wTmFtZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgZG9jRWxlbVN0eWxlW3Byb3BOYW1lXSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiBwcm9wTmFtZTtcbiAgICB9XG5cbiAgICBwcm9wTmFtZSA9IHByb3BOYW1lLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgcHJvcE5hbWUuc2xpY2UoMSk7XG5cbiAgICBsZXQgcHJlZml4ZWQ7XG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHByZWZpeGVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBwcmVmaXhlZCA9IHByZWZpeGVzW2ldICsgcHJvcE5hbWU7XG4gICAgICBpZiAodHlwZW9mIGRvY0VsZW1TdHlsZVtwcmVmaXhlZF0gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiBwcmVmaXhlZDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0gZWxlbVxuICAgKiBAcmV0dXJucyB7e319XG4gICAqL1xuICBzdGF0aWMgZ2V0RWxlbWVudFNpemUoZWxlbSkge1xuXG4gICAgbGV0IGdldFN0eWxlU2l6ZSA9IGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgIGxldCBudW0gPSBwYXJzZUZsb2F0KHZhbCk7XG5cbiAgICAgIGxldCBpc1ZhbGlkID0gdmFsLmluZGV4T2YoJyUnKSA9PT0gLTEgJiYgIWlzTmFOKG51bSk7XG4gICAgICByZXR1cm4gaXNWYWxpZCAmJiBudW07XG4gICAgfTtcblxuICAgIGxldCBtZWFzdXJlbWVudHMgPSBbXG4gICAgICAncGFkZGluZ0xlZnQnLFxuICAgICAgJ3BhZGRpbmdSaWdodCcsXG4gICAgICAncGFkZGluZ1RvcCcsXG4gICAgICAncGFkZGluZ0JvdHRvbScsXG4gICAgICAnbWFyZ2luTGVmdCcsXG4gICAgICAnbWFyZ2luUmlnaHQnLFxuICAgICAgJ21hcmdpblRvcCcsXG4gICAgICAnbWFyZ2luQm90dG9tJyxcbiAgICAgICdib3JkZXJMZWZ0V2lkdGgnLFxuICAgICAgJ2JvcmRlclJpZ2h0V2lkdGgnLFxuICAgICAgJ2JvcmRlclRvcFdpZHRoJyxcbiAgICAgICdib3JkZXJCb3R0b21XaWR0aCdcbiAgICBdO1xuXG4gICAgbGV0IGdldFplcm9TaXplID0gZnVuY3Rpb24gKCkge1xuICAgICAgbGV0IHNpemUgPSB7XG4gICAgICAgIHdpZHRoOiAwLFxuICAgICAgICBoZWlnaHQ6IDAsXG4gICAgICAgIGlubmVyV2lkdGg6IDAsXG4gICAgICAgIGlubmVySGVpZ2h0OiAwLFxuICAgICAgICBvdXRlcldpZHRoOiAwLFxuICAgICAgICBvdXRlckhlaWdodDogMFxuICAgICAgfTtcblxuICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IG1lYXN1cmVtZW50cy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBsZXQgbWVhc3VyZW1lbnQgPSBtZWFzdXJlbWVudHNbaV07XG4gICAgICAgIHNpemVbbWVhc3VyZW1lbnRdID0gMDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzaXplO1xuICAgIH07XG5cbiAgICBsZXQgYm94U2l6aW5nUHJvcCA9IERPTVV0aWwuZ2V0U3R5bGVQcm9wZXJ0eSgnYm94U2l6aW5nJyk7XG4gICAgbGV0IGlzQm94U2l6ZU91dGVyO1xuXG4gICAgKGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICghYm94U2l6aW5nUHJvcCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGxldCBfZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBfZGl2LnN0eWxlLndpZHRoID0gJzIwMHB4JztcbiAgICAgIF9kaXYuc3R5bGUucGFkZGluZyA9ICcxcHggMnB4IDNweCA0cHgnO1xuICAgICAgX2Rpdi5zdHlsZS5ib3JkZXJTdHlsZSA9ICdzb2xpZCc7XG4gICAgICBfZGl2LnN0eWxlLmJvcmRlcldpZHRoID0gJzFweCAycHggM3B4IDRweCc7XG4gICAgICBfZGl2LnN0eWxlW2JveFNpemluZ1Byb3BdID0gJ2JvcmRlci1ib3gnO1xuXG4gICAgICBsZXQgYm9keSA9IGRvY3VtZW50LmJvZHkgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuICAgICAgYm9keS5hcHBlbmRDaGlsZChfZGl2KTtcbiAgICAgIGxldCBzdHlsZSA9IERPTVV0aWwuZ2V0U3R5bGUoX2Rpdik7XG5cbiAgICAgIGlzQm94U2l6ZU91dGVyID0gZ2V0U3R5bGVTaXplKHN0eWxlLndpZHRoKSA9PT0gMjAwO1xuICAgICAgYm9keS5yZW1vdmVDaGlsZChfZGl2KTtcbiAgICB9KCkpO1xuXG4gICAgbGV0IG11bmdlTm9uUGl4ZWwgPSBmdW5jdGlvbiAoZWxlbSwgdmFsdWUpIHtcblxuICAgICAgaWYgKHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlIHx8IHZhbHVlLmluZGV4T2YoJyUnKSA9PT0gLTEpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgfVxuXG4gICAgICBsZXQgc3R5bGUgPSBlbGVtLnN0eWxlO1xuICAgICAgbGV0IGxlZnQgPSBzdHlsZS5sZWZ0O1xuICAgICAgbGV0IHJzID0gZWxlbS5ydW50aW1lU3R5bGU7XG4gICAgICBsZXQgcnNMZWZ0ID0gcnMgJiYgcnMubGVmdDtcblxuICAgICAgaWYgKHJzTGVmdCkge1xuICAgICAgICBycy5sZWZ0ID0gZWxlbS5jdXJyZW50U3R5bGUubGVmdDtcbiAgICAgIH1cbiAgICAgIHN0eWxlLmxlZnQgPSB2YWx1ZTtcbiAgICAgIHZhbHVlID0gc3R5bGUucGl4ZWxMZWZ0O1xuXG4gICAgICBzdHlsZS5sZWZ0ID0gbGVmdDtcbiAgICAgIGlmIChyc0xlZnQpIHtcbiAgICAgICAgcnMubGVmdCA9IHJzTGVmdDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH07XG5cblxuICAgIGlmICh0eXBlb2YgZWxlbSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGVsZW0pO1xuICAgIH1cblxuXG4gICAgaWYgKCFlbGVtIHx8IHR5cGVvZiBlbGVtICE9PSAnb2JqZWN0JyB8fCAhZWxlbS5ub2RlVHlwZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBzdHlsZSA9IERPTVV0aWwuZ2V0U3R5bGUoZWxlbSk7XG5cbiAgICBpZiAoc3R5bGUuZGlzcGxheSA9PT0gJ25vbmUnKSB7XG4gICAgICByZXR1cm4gZ2V0WmVyb1NpemUoKTtcbiAgICB9XG5cbiAgICBsZXQgc2l6ZSA9IHt9O1xuICAgIHNpemUud2lkdGggPSBlbGVtLm9mZnNldFdpZHRoO1xuICAgIHNpemUuaGVpZ2h0ID0gZWxlbS5vZmZzZXRIZWlnaHQ7XG5cbiAgICBsZXQgaXNCb3JkZXJCb3ggPSBzaXplLmlzQm9yZGVyQm94ID0gISEoIGJveFNpemluZ1Byb3AgJiZcbiAgICBzdHlsZVtib3hTaXppbmdQcm9wXSAmJiBzdHlsZVtib3hTaXppbmdQcm9wXSA9PT0gJ2JvcmRlci1ib3gnICk7XG5cbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gbWVhc3VyZW1lbnRzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBsZXQgbWVhc3VyZW1lbnQgPSBtZWFzdXJlbWVudHNbaV07XG4gICAgICBsZXQgdmFsdWUgPSBzdHlsZVttZWFzdXJlbWVudF07XG4gICAgICB2YWx1ZSA9IG11bmdlTm9uUGl4ZWwoZWxlbSwgdmFsdWUpO1xuICAgICAgbGV0IG51bSA9IHBhcnNlRmxvYXQodmFsdWUpO1xuICAgICAgc2l6ZVttZWFzdXJlbWVudF0gPSAhaXNOYU4obnVtKSA/IG51bSA6IDA7XG4gICAgfVxuXG4gICAgbGV0IHBhZGRpbmdXaWR0aCA9IHNpemUucGFkZGluZ0xlZnQgKyBzaXplLnBhZGRpbmdSaWdodDtcbiAgICBsZXQgcGFkZGluZ0hlaWdodCA9IHNpemUucGFkZGluZ1RvcCArIHNpemUucGFkZGluZ0JvdHRvbTtcbiAgICBsZXQgbWFyZ2luV2lkdGggPSBzaXplLm1hcmdpbkxlZnQgKyBzaXplLm1hcmdpblJpZ2h0O1xuICAgIGxldCBtYXJnaW5IZWlnaHQgPSBzaXplLm1hcmdpblRvcCArIHNpemUubWFyZ2luQm90dG9tO1xuICAgIGxldCBib3JkZXJXaWR0aCA9IHNpemUuYm9yZGVyTGVmdFdpZHRoICsgc2l6ZS5ib3JkZXJSaWdodFdpZHRoO1xuICAgIGxldCBib3JkZXJIZWlnaHQgPSBzaXplLmJvcmRlclRvcFdpZHRoICsgc2l6ZS5ib3JkZXJCb3R0b21XaWR0aDtcblxuICAgIGxldCBpc0JvcmRlckJveFNpemVPdXRlciA9IGlzQm9yZGVyQm94ICYmIGlzQm94U2l6ZU91dGVyO1xuXG4gICAgbGV0IHN0eWxlV2lkdGggPSBnZXRTdHlsZVNpemUoc3R5bGUud2lkdGgpO1xuICAgIGlmIChzdHlsZVdpZHRoICE9PSBmYWxzZSkge1xuICAgICAgc2l6ZS53aWR0aCA9IHN0eWxlV2lkdGggKyAoIGlzQm9yZGVyQm94U2l6ZU91dGVyID8gMCA6IHBhZGRpbmdXaWR0aCArIGJvcmRlcldpZHRoICk7XG4gICAgfVxuXG4gICAgbGV0IHN0eWxlSGVpZ2h0ID0gZ2V0U3R5bGVTaXplKHN0eWxlLmhlaWdodCk7XG4gICAgaWYgKHN0eWxlSGVpZ2h0ICE9PSBmYWxzZSkge1xuICAgICAgc2l6ZS5oZWlnaHQgPSBzdHlsZUhlaWdodCArICggaXNCb3JkZXJCb3hTaXplT3V0ZXIgPyAwIDogcGFkZGluZ0hlaWdodCArIGJvcmRlckhlaWdodCApO1xuICAgIH1cblxuICAgIHNpemUuaW5uZXJXaWR0aCA9IHNpemUud2lkdGggLSAoIHBhZGRpbmdXaWR0aCArIGJvcmRlcldpZHRoICk7XG4gICAgc2l6ZS5pbm5lckhlaWdodCA9IHNpemUuaGVpZ2h0IC0gKCBwYWRkaW5nSGVpZ2h0ICsgYm9yZGVySGVpZ2h0ICk7XG5cbiAgICBzaXplLm91dGVyV2lkdGggPSBzaXplLndpZHRoICsgbWFyZ2luV2lkdGg7XG4gICAgc2l6ZS5vdXRlckhlaWdodCA9IHNpemUuaGVpZ2h0ICsgbWFyZ2luSGVpZ2h0O1xuXG4gICAgcmV0dXJuIHNpemU7XG4gIH1cblxuXG4gIC8qKlxuICAgKiDnlLvlg4/jga7jgrXjgqTjgrrjgpLlj5blvpdcbiAgICogQHBhcmFtIGltYWdlXG4gICAqIEByZXR1cm5zIHt7d2lkdGg6ICosIGhlaWdodDogKn19XG4gICAqL1xuICBzdGF0aWMgZ2V0SW1hZ2VOYXR1cmFsU2l6ZShpbWFnZSkge1xuICAgIGxldCBtZW07XG4gICAgbGV0IHcgPSBpbWFnZS53aWR0aCxcbiAgICAgIGggPSBpbWFnZS5oZWlnaHQ7XG5cbiAgICBpZiAodHlwZW9mIGltYWdlLm5hdHVyYWxXaWR0aCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHcgPSBpbWFnZS5uYXR1cmFsV2lkdGg7XG4gICAgICBoID0gaW1hZ2UubmF0dXJhbEhlaWdodDtcblxuICAgIH0gZWxzZSBpZiAodHlwZW9mIGltYWdlLnJ1bnRpbWVTdHlsZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGxldCBydW4gPSBpbWFnZS5ydW50aW1lU3R5bGU7XG4gICAgICBtZW0gPSB7dzogcnVuLndpZHRoLCBoOiBydW4uaGVpZ2h0fTtcbiAgICAgIHJ1bi53aWR0aCA9ICdhdXRvJztcbiAgICAgIHJ1bi5oZWlnaHQgPSAnYXV0byc7XG4gICAgICB3ID0gaW1hZ2Uud2lkdGg7XG4gICAgICBoID0gaW1hZ2UuaGVpZ2h0O1xuICAgICAgcnVuLndpZHRoID0gbWVtLnc7XG4gICAgICBydW4uaGVpZ2h0ID0gbWVtLmg7XG5cbiAgICB9IGVsc2Uge1xuICAgICAgbWVtID0ge3c6IGltYWdlLndpZHRoLCBoOiBpbWFnZS5oZWlnaHR9O1xuICAgICAgaW1hZ2UucmVtb3ZlQXR0cmlidXRlKCd3aWR0aCcpO1xuICAgICAgaW1hZ2UucmVtb3ZlQXR0cmlidXRlKCdoZWlnaHQnKTtcbiAgICAgIHcgPSBpbWFnZS53aWR0aDtcbiAgICAgIGggPSBpbWFnZS5oZWlnaHQ7XG4gICAgICBpbWFnZS53aWR0aCA9IG1lbS53O1xuICAgICAgaW1hZ2UuaGVpZ2h0ID0gbWVtLmg7XG4gICAgfVxuXG4gICAgcmV0dXJuIHt3aWR0aDogdywgaGVpZ2h0OiBofTtcbiAgfTtcblxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0gZnVuY1xuICAgKi9cbiAgc3RhdGljIFJlYWR5KGZ1bmMpIHtcbiAgICBfcmVhZHkoZnVuYyk7XG4gIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vY29tbW9uL2pzL2FwcC9icm93c2VyL0RPTVV0aWwuanNcbiAqKi8iLCIvKipcbiAqIGZpbGVPdmVydmlldzpcbiAqIFByb2plY3Q6XG4gKiBGaWxlOlxuICogRGF0ZTpcbiAqIEF1dGhvcjpcbiAqL1xuXG5cbid1c2Ugc3RyaWN0JztcblxuXG5jb25zdCByVmFsaWRDaGFycyA9IC9eW1xcXSw6e31cXHNdKiQvO1xuY29uc3QgclZhbGlkRXNjYXBlID0gL1xcXFwoPzpbXCJcXFxcXFwvYmZucnRdfHVbMC05YS1mQS1GXXs0fSkvZztcbmNvbnN0IHJWYWxpZFRva2VucyA9IC9cIlteXCJcXFxcXFxuXFxyXSpcInx0cnVlfGZhbHNlfG51bGx8LT9cXGQrKD86XFwuXFxkKik/KD86W2VFXVsrXFwtXT9cXGQrKT8vZztcbmNvbnN0IHJWYWxpZEJyYWNlcyA9IC8oPzpefDp8LCkoPzpcXHMqXFxbKSsvZztcblxuY29uc3QgYmFzZTY0bGlzdCA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvPSc7XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9kdWxlIHtcblxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0gZGF0YVxuICAgKiBAcmV0dXJucyB7Kn1cbiAgICovXG4gIHN0YXRpYyBKU09OUGFyc2UoZGF0YSkge1xuICAgIGlmICh0eXBlb2YgZGF0YSAhPT0gJ3N0cmluZycgfHwgIWRhdGEpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGlmIChyVmFsaWRDaGFycy50ZXN0KGRhdGEucmVwbGFjZShyVmFsaWRFc2NhcGUsICdAJykucmVwbGFjZShyVmFsaWRUb2tlbnMsICddJykucmVwbGFjZShyVmFsaWRCcmFjZXMsICcnKSkpIHtcbiAgICAgIHJldHVybiB3aW5kb3cuSlNPTiAmJiB3aW5kb3cuSlNPTi5wYXJzZSA/IHdpbmRvdy5KU09OLnBhcnNlKGRhdGEpIDogKG5ldyBGdW5jdGlvbigncmV0dXJuICcgKyBkYXRhKSkoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSBqc29uXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKi9cbiAgc3RhdGljIEpTT05TdHJpbmdpZnkoanNvbikge1xuXG4gICAgaWYgKCdKU09OJyBpbiB3aW5kb3cpIHtcbiAgICAgIHJldHVybiB3aW5kb3cuSlNPTi5zdHJpbmdpZnkob2JqKTtcbiAgICB9IGVsc2Uge1xuXG4gICAgICBsZXQgdmFsVHlwZSA9IHR5cGVvZiAoanNvbik7XG5cbiAgICAgIGlmICh2YWxUeXBlICE9ICdvYmplY3QnIHx8IGpzb24gPT09IG51bGwpIHtcblxuICAgICAgICBpZiAodmFsVHlwZSA9PSAnc3RyaW5nJykge1xuICAgICAgICAgIGpzb24gPSAnXCInICsganNvbiArICdcIic7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gU3RyaW5nKGpzb24pO1xuXG4gICAgICB9IGVsc2Uge1xuXG4gICAgICAgIGxldCBrZXk7XG4gICAgICAgIGxldCB2YWw7XG4gICAgICAgIGxldCBvYmogPSBbXTtcbiAgICAgICAgbGV0IGFyciA9IChqc29uICYmIGpzb24uY29uc3RydWN0b3IgPT0gQXJyYXkpO1xuXG4gICAgICAgIGZvciAoa2V5IGluIGpzb24pIHtcblxuICAgICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoanNvbiwga2V5KSkge1xuXG4gICAgICAgICAgICB2YWwgPSBqc29uW2tleV07XG4gICAgICAgICAgICB2YWxUeXBlID0gdHlwZW9mKHZhbCk7XG5cbiAgICAgICAgICAgIGlmICh2YWxUeXBlID09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgIHZhbCA9ICdcIicgKyB2YWwgKyAnXCInO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh2YWxUeXBlID09IFwib2JqZWN0XCIgJiYgdmFsICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgIHZhbCA9IEpTT04uc3RyaW5naWZ5KHZhbCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG9iai5wdXNoKChhcnIgPyAnJyA6ICdcIicgKyBrZXkgKyAnXCI6JykgKyBTdHJpbmcodmFsKSk7XG5cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKGFyciA/ICdbJyA6ICd7JykgKyBTdHJpbmcob2JqKSArIChhcnIgPyAnXScgOiAnfScpO1xuXG4gICAgICB9XG4gICAgfVxuICB9XG5cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIGpzb25cbiAgICogQHJldHVybnMge3N0cmluZ31cbiAgICovXG4gIHN0YXRpYyBKU09OVG9RdWVyeVN0cmluZyhqc29uKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKGpzb24pLm1hcChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KGtleSkgKyAnPScgK1xuICAgICAgICBlbmNvZGVVUklDb21wb25lbnQoanNvbltrZXldKTtcbiAgICB9KS5qb2luKCcmJyk7XG4gIH1cblxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0gc3RyXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAqL1xuICBzdGF0aWMgYmFzZTY0ZW5jb2RlKHN0cikge1xuICAgIHZhciB0ID0gJycsIHAgPSAtNiwgYSA9IDAsIGkgPSAwLCB2ID0gMCwgYztcblxuICAgIHdoaWxlICgoaSA8IHN0ci5sZW5ndGgpIHx8IChwID4gLTYpKSB7XG4gICAgICBpZiAocCA8IDApIHtcbiAgICAgICAgaWYgKGkgPCBzdHIubGVuZ3RoKSB7XG4gICAgICAgICAgYyA9IHN0ci5jaGFyQ29kZUF0KGkrKyk7XG4gICAgICAgICAgdiArPSA4O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGMgPSAwO1xuICAgICAgICB9XG4gICAgICAgIGEgPSAoKGEgJiAyNTUpIDw8IDgpIHwgKGMgJiAyNTUpO1xuICAgICAgICBwICs9IDg7XG4gICAgICB9XG4gICAgICB0ICs9IGJhc2U2NGxpc3QuY2hhckF0KCggdiA+IDAgKSA/IChhID4+IHApICYgNjMgOiA2NCk7XG4gICAgICBwIC09IDY7XG4gICAgICB2IC09IDY7XG4gICAgfVxuICAgIHJldHVybiB0O1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSBzdHJcbiAgICogQHJldHVybnMge3N0cmluZ31cbiAgICovXG4gIHN0YXRpYyBiYXNlNjRkZWNvZGUoc3RyKSB7XG4gICAgdmFyIHQgPSAnJywgcCA9IC04LCBhID0gMCwgYywgZDtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoKCBjID0gYmFzZTY0bGlzdC5pbmRleE9mKHN0ci5jaGFyQXQoaSkpICkgPCAwKVxuICAgICAgICBjb250aW51ZTtcbiAgICAgIGEgPSAoYSA8PCA2KSB8IChjICYgNjMpO1xuICAgICAgaWYgKCggcCArPSA2ICkgPj0gMCkge1xuICAgICAgICBkID0gKGEgPj4gcCkgJiAyNTU7XG4gICAgICAgIGlmIChjICE9IDY0KVxuICAgICAgICAgIHQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShkKTtcbiAgICAgICAgYSAmPSA2MztcbiAgICAgICAgcCAtPSA4O1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdDtcbiAgfVxuXG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSBmdW5jXG4gICAqIEBwYXJhbSBjb250ZXh0XG4gICAqIEByZXR1cm5zIHsqfVxuICAgKi9cbiAgc3RhdGljIHByb3h5KGZ1bmMsIGNvbnRleHQpIHtcbiAgICB2YXIgYXJncywgdG1wO1xuXG4gICAgaWYgKHR5cGVvZiBjb250ZXh0ID09PSAnc3RyaW5nJykge1xuICAgICAgdG1wID0gZnVuY1tjb250ZXh0XTtcbiAgICAgIGNvbnRleHQgPSBmdW5jO1xuICAgICAgZnVuYyA9IHRtcDtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGZ1bmMgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMik7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgZnVuYy5hcHBseShjb250ZXh0IHx8IHRoaXMsIGFyZ3MuY29uY2F0KFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzKSkpO1xuICAgIH07XG4gIH1cblxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0gZnVuY1xuICAgKiBAcGFyYW0gY29udGV4dFxuICAgKi9cbiAgc3RhdGljIGJpbmQoZnVuYywgY29udGV4dCkge1xuICAgIHRoaXMucHJveHkoZnVuYywgY29udGV4dCk7XG4gIH1cblxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0gb2JqXG4gICAqIEByZXR1cm5zIHsqfVxuICAgKi9cbiAgc3RhdGljIGV4dGVuZChvYmopIHtcbiAgICBpZiAob2JqICE9PSBPYmplY3Qob2JqKSkge1xuICAgICAgcmV0dXJuIG9iajtcbiAgICB9XG4gICAgdmFyIHNvdXJjZSwgcHJvcDtcbiAgICBmb3IgKHZhciBpID0gMSwgbGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBzb3VyY2UgPSBhcmd1bWVudHNbaV07XG4gICAgICBmb3IgKHByb3AgaW4gc291cmNlKSB7XG4gICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBwcm9wKSkge1xuICAgICAgICAgIG9ialtwcm9wXSA9IHNvdXJjZVtwcm9wXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb2JqO1xuICB9XG5cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIG9ialxuICAgKiBAcmV0dXJucyB7Kn1cbiAgICovXG4gIHN0YXRpYyBjbG9uZShvYmopIHtcbiAgICBpZiAob2JqICE9PSBPYmplY3Qob2JqKSkge1xuICAgICAgcmV0dXJuIG9iajtcbiAgICB9XG5cbiAgICByZXR1cm4gQXJyYXkuaXNBcnJheShvYmopID8gb2JqLnNsaWNlKCkgOiBNb2R1bGUuZXh0ZW5kKHt9LCBvYmopO1xuICB9XG5cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIGZ1bmNcbiAgICogQHBhcmFtIHdhaXRcbiAgICogQHJldHVybnMge251bWJlcn1cbiAgICovXG4gIHN0YXRpYyBkZWxheShmdW5jLCB3YWl0KSB7XG4gICAgdmFyIGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMik7XG4gICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGZ1bmMuYXBwbHkobnVsbCwgYXJncyk7XG4gICAgfSwgd2FpdCB8fCAxMDApO1xuICB9XG5cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIGZ1bmNcbiAgICogQHBhcmFtIGhhc2hlclxuICAgKiBAcmV0dXJucyB7bWVtb2l6ZX1cbiAgICovXG4gIHN0YXRpYyBtZW1vaXplKGZ1bmMsIGhhc2hlcikge1xuICAgIHZhciBtZW1vaXplID0gZnVuY3Rpb24gKGtleSkge1xuICAgICAgdmFyIGNhY2hlID0gbWVtb2l6ZS5jYWNoZTtcbiAgICAgIHZhciBhZGRyZXNzID0gaGFzaGVyID8gaGFzaGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgOiBrZXk7XG4gICAgICBpZiAoY2FjaGUgIT0gbnVsbCAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoY2FjaGUsIGFkZHJlc3MpKSB7XG4gICAgICAgIGNhY2hlW2FkZHJlc3NdID0gZnVuYy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNhY2hlW2FkZHJlc3NdO1xuICAgIH07XG4gICAgbWVtb2l6ZS5jYWNoZSA9IHt9O1xuICAgIHJldHVybiBtZW1vaXplO1xuICB9XG5cblxuICAvKipcbiAgICog6KaB57Sg44KS44K344Oj44OD44OV44Or44GZ44KLXG4gICAqIEBwYXJhbSBvYmpcbiAgICogQHJldHVybnMge0FycmF5fVxuICAgKi9cbiAgc3RhdGljIHNodWZmbGUob2JqKSB7XG4gICAgdmFyIF9zZXQgPSBvYmogJiYgb2JqLmxlbmd0aCA9PT0gK29iai5sZW5ndGggPyBvYmogOiBPYmplY3QudmFsdWVzKG9iaik7XG4gICAgdmFyIGxlbmd0aCA9IF9zZXQubGVuZ3RoO1xuICAgIHZhciBzaHVmZmxlZCA9IG5ldyBBcnJheShsZW5ndGgpO1xuICAgIGZvciAodmFyIGluZGV4ID0gMCwgcmFuZDsgaW5kZXggPCBsZW5ndGg7IGluZGV4KyspIHtcbiAgICAgIHJhbmQgPSB0aGlzLnJhbmRvbSgwLCBpbmRleCk7XG4gICAgICBpZiAocmFuZCAhPT0gaW5kZXgpIHtcbiAgICAgICAgc2h1ZmZsZWRbaW5kZXhdID0gc2h1ZmZsZWRbcmFuZF07XG4gICAgICB9XG4gICAgICBzaHVmZmxlZFtyYW5kXSA9IF9zZXRbaW5kZXhdO1xuICAgIH1cbiAgICByZXR1cm4gc2h1ZmZsZWQ7XG4gIH07XG5cblxuICAvKipcbiAgICogIOODqeODs+ODgOODoCBVSUQg44KS5Y+W5b6XXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAqL1xuICBzdGF0aWMgZ2V0VUlEKCkge1xuICAgIHZhciBkID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgcmV0dXJuICd4eHh4eHh4eC14eHh4LXh4eHgteXh4eC14eHh4eHh4eHh4eHgnLnJlcGxhY2UoL1t4eV0vZywgZnVuY3Rpb24gKGMpIHtcbiAgICAgIHZhciByO1xuICAgICAgciA9IChkICsgTWF0aC5yYW5kb20oKSAqIDE2KSAlIDE2IHwgMDtcbiAgICAgIGQgPSBNYXRoLmZsb29yKGQgLyAxNik7XG4gICAgICByZXR1cm4gKGMgPT09ICd4JyA/IHIgOiAociAmIDB4NyB8IDB4OCkpLnRvU3RyaW5nKDE2KTtcbiAgICB9KS50b1VwcGVyQ2FzZSgpO1xuICB9XG5cblxuICAvKipcbiAgICog5pWw5YCk44KSMuahgeOBq+OBl+OBpui/lOOBmVxuICAgKiBAcGFyYW0gbnVtXG4gICAqIEBwYXJhbSBbYmFzZV1cbiAgICogQHJldHVybnMge3N0cmluZ31cbiAgICovXG4gIHN0YXRpYyB6ZXJvUGFkZGluZyhudW0sIGJhc2UpIHtcblxuICAgIHZhciBCQVNFX05VTSA9IDEwO1xuXG4gICAgYmFzZSA9IGJhc2UgfHwgQkFTRV9OVU07XG5cbiAgICB2YXIgbWF4SW5kZXggPSAoYmFzZSArICcnKS5sZW5ndGg7XG4gICAgdmFyIGNvdW50ZXIgPSBtYXhJbmRleCAtIDE7XG4gICAgdmFyIHJlc3VsdCA9ICcnO1xuXG4gICAgd2hpbGUgKGNvdW50ZXIgPiAwKSB7XG4gICAgICByZXN1bHQgKz0gJzAnO1xuICAgICAgY291bnRlciAtPSAxO1xuICAgIH1cblxuICAgIHJldHVybiAocmVzdWx0ICsgbnVtKS5zbGljZSgtbWF4SW5kZXgpO1xuXG4gIH07XG5cblxuICAvKipcbiAgICog5rih44GV44KM44Gf5paH5a2X5YiX44KS44Kt44Oj44Oh44Or44Kx44O844K544G45aSJ5o+b77yI5Z6L44OB44Kn44OD44Kv54Sh77yJXG4gICAqIEBwYXJhbSBzdHJcbiAgICogQHJldHVybnMge1hNTHxzdHJpbmd8dm9pZH1cbiAgICovXG4gIHN0YXRpYyBjYW1lbGl6ZShzdHIpIHtcbiAgICByZXR1cm4gc3RyLnJlcGxhY2UoLyg/Ol58Wy1fXSkoXFx3KS9nLCBmdW5jdGlvbiAoXywgYykge1xuICAgICAgcmV0dXJuIGMgPyBjLnRvVXBwZXJDYXNlKCkgOiAnJztcbiAgICB9KVxuICB9XG5cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIG9ialxuICAgKiBAcmV0dXJucyB7QXJyYXl9XG4gICAqL1xuICBzdGF0aWMgbWFrZUFycmF5KG9iaikge1xuICAgIHZhciBhcnkgPSBbXTtcblxuICAgIGlmIChBcnJheS5pc0FycmF5KG9iaikpIHtcbiAgICAgIGFyeSA9IG9iajtcbiAgICB9IGVsc2UgaWYgKG9iaiAmJiB0eXBlb2Ygb2JqLmxlbmd0aCA9PT0gJ251bWJlcicpIHtcbiAgICAgIC8vIGNvbnZlcnQgbm9kZUxpc3QgdG8gYXJyYXlcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBvYmoubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgYXJ5LnB1c2gob2JqW2ldKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gYXJyYXkgb2Ygc2luZ2xlIGluZGV4XG4gICAgICBhcnkucHVzaChvYmopO1xuICAgIH1cbiAgICByZXR1cm4gYXJ5O1xuXG4gIH07XG5cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIG9ialxuICAgKiBAcGFyYW0gYXJ5XG4gICAqL1xuICBzdGF0aWMgcmVtb3ZlRnJvbShvYmosIGFyeSkge1xuICAgIHZhciBpbmRleCA9IFtdLmluZGV4T2YoYXJ5LCBvYmopO1xuICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgIGFyeS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbiAgfTtcblxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0gc3RyXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAqL1xuICBzdGF0aWMgdG9EYXNoZWQoc3RyKSB7XG4gICAgcmV0dXJuIHN0ci5yZXBsYWNlKC8oLikoW0EtWl0pL2csIGZ1bmN0aW9uIChtYXRjaCwgJDEsICQyKSB7XG4gICAgICByZXR1cm4gJDEgKyAnLScgKyAkMjtcbiAgICB9KS50b0xvd2VyQ2FzZSgpO1xuICB9XG5cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHN0clxuICAgKiBAcGFyYW0gdmFsXG4gICAqIEByZXR1cm5zIHsqfVxuICAgKi9cbiAgc3RhdGljIGluZGV4T2ZBbGwoc3RyLCB2YWwpIHtcblxuICAgIHZhciByZXRWYWwgPSBudWxsO1xuICAgIHZhciBsYXN0SW5kZXggPSBzdHIuaW5kZXhPZih2YWwpO1xuXG4gICAgaWYgKGxhc3RJbmRleCA+IC0xKSB7XG4gICAgICByZXRWYWwgPSBbXTtcblxuICAgICAgd2hpbGUgKGxhc3RJbmRleCA+IC0xKSB7XG4gICAgICAgIHJldFZhbC5wdXNoKGxhc3RJbmRleCk7XG4gICAgICAgIGxhc3RJbmRleCA9IHN0ci5pbmRleE9mKHZhbCwgbGFzdEluZGV4ICsgMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJldFZhbDtcbiAgfVxuXG5cbiAgLyoqXG4gICAqXG4gICAqL1xuICBub29wKCkge1xuXG4gIH1cblxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0gc3RyXG4gICAqIEByZXR1cm5zIHsqfVxuICAgKi9cbiAgc3RhdGljIHRyaW0oc3RyKSB7XG4gICAgcmV0dXJuIHN0ci5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCAnJyk7XG4gIH1cblxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0gc3RyXG4gICAqIEByZXR1cm5zIHsqfVxuICAgKi9cbiAgc3RhdGljIGVzY2FwZUhUTUwoc3RyKSB7XG4gICAgcmV0dXJuIHN0ci5yZXBsYWNlKCcmJywgJyZhbXA7JykucmVwbGFjZSgnPCcsICcmbHQ7Jyk7XG4gIH1cblxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0gc3RyXG4gICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgKi9cbiAgc3RhdGljIGlzQmxhbmsoc3RyKSB7XG4gICAgcmV0dXJuIC9eXFxzKiQvLnRlc3Qoc3RyKTtcbiAgfTtcblxuICAvKipcbiAgICogYeOBvuOBp+OBrm51bWJlcuOBruOBv+OBrumFjeWIl+OCkuS9nOaIkOOBl+OBpui/lOOBmVxuICAgKiBAcGFyYW0gYSB7bnVtYmVyfVxuICAgKiBAcmV0dXJucyB7QXJyYXl9XG4gICAqL1xuICBzdGF0aWMgbWFrZU51bWJlckFycmF5IChhKSB7XG4gICAgdmFyIF9hcnJheSA9IFtdO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhOyBfaSsrKSB7XG4gICAgICBfYXJyYXlbX2ldID0gX2k7XG4gICAgfVxuICAgIHJldHVybiBfYXJyYXk7XG4gIH07XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2NvbW1vbi9qcy9hcHAvdXRpbHMvTW9kdWxlLmpzXG4gKiovIiwiLyoqXG4gKiBmaWxlT3ZlcnZpZXc6XG4gKiBQcm9qZWN0OlxuICogRmlsZTpcbiAqIERhdGU6XG4gKiBBdXRob3I6XG4gKi9cblxuXG4ndXNlIHN0cmljdCc7XG5cblxuaW1wb3J0IE1vZHVsZSBmcm9tIFwiLi4vdXRpbHMvTW9kdWxlXCI7XG5pbXBvcnQgR2V0VHlwZU9mIGZyb20gXCIuLi91dGlscy9HZXRUeXBlT2ZcIjtcbmltcG9ydCBET01VdGlsIGZyb20gXCIuL0RPTVV0aWxcIjtcblxuXG5sZXQgdHJpbUxlZnQgPSAvXlxccysvO1xubGV0IHRyaW1SaWdodCA9IC9cXHMrJC87XG5cbmxldCBpZFJlZ0V4cCA9IC9eIyhcXFMrKSQvO1xuXG5sZXQgdGFnQ2xhc3NSZWdFeHAgPSAvXihbXFx3LV0rKT8oPzpcXC4oW1xcdy1dKykpPyQvO1xuXG5cbi8qKlxuICpcbiAqIEBwYXJhbSBzdHJcbiAqIEByZXR1cm5zIHsqfVxuICovXG5sZXQgdHJpbSA9IGZ1bmN0aW9uIChzdHIpIHtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKHRyaW1MZWZ0LCAnJykucmVwbGFjZSh0cmltUmlnaHQsICcnKTtcbn07XG5cblxuLyoqXG4gKlxuICogQHBhcmFtIG9ialxuICogQHBhcmFtIHByb3BcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5sZXQgaXNIb3N0TWV0aG9kID0gZnVuY3Rpb24gKG9iaiwgcHJvcCkge1xuICByZXR1cm4gKHR5cGVvZiBvYmpbcHJvcF0gPT09ICdmdW5jdGlvbicpIHx8XG4gICAgKCh0eXBlb2Ygb2JqW3Byb3BdID09PSAnb2JqZWN0JykgJiYgKG9ialtwcm9wXSAhPT0gbnVsbCkpOyAvLyBJbnRlcm5ldCBFeHBsb3JlclxufTtcblxuXG4vKipcbiAqXG4gKiBAcGFyYW0gbm9kZVxuICogQHBhcmFtIGZ1bmNcbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqL1xubGV0IGZpbHRlckRPTSA9IGZ1bmN0aW9uIChub2RlLCBmdW5jKSB7XG4gIGxldCByZXN1bHRzID0gW107XG5cbiAgZnVuY3Rpb24gd2Fsayhub2RlKSB7XG4gICAgaWYgKGZ1bmMobm9kZSkpIHtcbiAgICAgIHJlc3VsdHMucHVzaChub2RlKTtcbiAgICB9XG4gICAgbm9kZSA9IG5vZGUuZmlyc3RDaGlsZDtcbiAgICB3aGlsZSAobm9kZSkge1xuICAgICAgd2Fsayhub2RlKTtcbiAgICAgIG5vZGUgPSBub2RlLm5leHRTaWJsaW5nO1xuICAgIH1cbiAgfVxuXG4gIHdhbGsobm9kZSk7XG4gIHJldHVybiByZXN1bHRzO1xufTtcblxuXG4vKipcbiAqXG4gKiBAcGFyYW0gbm9kZVxuICogQHBhcmFtIGZ1bmNcbiAqIEByZXR1cm5zIHsqfVxuICovXG5sZXQgZmlyc3RJbkRPTSA9IGZ1bmN0aW9uIChub2RlLCBmdW5jKSB7XG4gIGZ1bmN0aW9uIHdhbGsobm9kZSkge1xuICAgIGlmIChmdW5jKG5vZGUpKSB7XG4gICAgICByZXR1cm4gbm9kZTtcbiAgICB9XG4gICAgbm9kZSA9IG5vZGUuZmlyc3RDaGlsZDtcbiAgICB3aGlsZSAobm9kZSkge1xuICAgICAgbGV0IHJlc3VsdCA9IHdhbGsobm9kZSk7XG4gICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9XG4gICAgICBub2RlID0gbm9kZS5uZXh0U2libGluZztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gd2Fsayhub2RlKTtcbn07XG5cblxuLyoqXG4gKlxuICogQHBhcmFtIGlkXG4gKiBAcGFyYW0gcm9vdFxuICogQHJldHVybnMgeyp9XG4gKi9cbmxldCBmaW5kQnlJZCA9IGZ1bmN0aW9uIChpZCwgcm9vdCkge1xuICByZXR1cm4gKHJvb3QuaWQgPT09IGlkKSA/XG4gICAgcm9vdCA6XG4gICAgKGlzSG9zdE1ldGhvZChyb290LCAnZ2V0RWxlbWVudEJ5SWQnKSkgP1xuICAgICAgcm9vdC5nZXRFbGVtZW50QnlJZChpZCkgOlxuICAgICAgKGlzSG9zdE1ldGhvZChyb290LCAncXVlcnlTZWxlY3RvcicpKSA/XG4gICAgICAgIHJvb3QucXVlcnlTZWxlY3RvcignIycgKyBpZCkgOlxuICAgICAgICBmaXJzdEluRE9NKHJvb3QsIGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgICAgcmV0dXJuIG5vZGUuaWQgPT09IGlkO1xuICAgICAgICB9KTtcbn07XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VsZWN0b3Ige1xuXG5cbiAgc3RhdGljICQoc2VsZWN0b3IpIHtcblxuXG4gICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKSB7XG4gICAgICByZXR1cm4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc2VsZWN0b3IpO1xuICAgIH1cblxuICAgIGlmIChkb2N1bWVudC5hbGwpIHtcbiAgICAgIHJldHVybiBkb2N1bWVudC5hbGwoc2VsZWN0b3IpO1xuICAgIH1cbiAgICBpZiAoZG9jdW1lbnQubGF5ZXJzKSB7XG4gICAgICBsZXQgcyA9ICcnO1xuICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcyArPSAnZG9jdW1lbnQubGF5ZXJzLicgKyBhcmd1bWVudHNbaV0gKyAnLic7XG4gICAgICB9XG4gICAgICByZXR1cm4gZXZhbChzICsgJ2RvY3VtZW50LmxheWVycy4nICsgc2VsZWN0b3IpO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcblxuICB9XG5cbiAgLyoqXG4gICAqIOaMh+WumuOBriBpZCDjga7jgqjjg6zjg6Hjg7Pjg4jjgpLlj5blvpdcbiAgICogQHBhcmFtIGlkXG4gICAqIEByZXR1cm5zIHtBcnJheXwqfEVsZW1lbnR9XG4gICAqL1xuICBzdGF0aWMgZ2V0RWxlbWVudChpZCkge1xuICAgIHJldHVybiBkb2N1bWVudC5hbGwgJiYgZG9jdW1lbnQuYWxsKGlkKSB8fCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCAmJiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XG4gIH1cblxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0gY2xhc3NOYW1lXG4gICAqIEBwYXJhbSBwYXJlbnRcbiAgICogQHBhcmFtIHRhZ05hbWVcbiAgICogQHJldHVybnMgeyp9XG4gICAqL1xuICBzdGF0aWMgZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShjbGFzc05hbWUsIHBhcmVudCwgdGFnTmFtZSkge1xuICAgIGxldCBjbGFzc0VsZW1lbnRzID0gbnVsbDtcbiAgICBsZXQgX3BhcmVudCA9IHBhcmVudCB8fCBkb2N1bWVudDtcbiAgICBsZXQgdGFyZ2V0ID0gbnVsbDtcblxuICAgIHRhZ05hbWUgPSB0YWdOYW1lIHx8ICcnO1xuXG4gICAgaWYgKF9wYXJlbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSkge1xuICAgICAgY2xhc3NFbGVtZW50cyA9IF9wYXJlbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShjbGFzc05hbWUpO1xuXG4gICAgfVxuICAgIGVsc2UgaWYgKF9wYXJlbnQucXVlcnlTZWxlY3RvckFsbCkge1xuICAgICAgY2xhc3NFbGVtZW50cyA9IF9wYXJlbnQucXVlcnlTZWxlY3RvckFsbCh0YWdOYW1lICsgKCcuJyArIGNsYXNzTmFtZSkpO1xuXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgY2xhc3NFbGVtZW50cyA9IFtdO1xuICAgICAgdGFyZ2V0ID0gX3BhcmVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSh0YWdOYW1lLmxlbmd0aCA+IDAgPyB0YWdOYW1lIDogJyonKSB8fCBkb2N1bWVudC5hbGw7XG5cbiAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSB0YXJnZXQubGVuZ3RoOyBpIDwgbGVuOyBpICs9IDEpIHtcbiAgICAgICAgaWYgKERPTVV0aWwuaGFzQ2xhc3ModGFyZ2V0W2ldLCBjbGFzc05hbWUpKSB7XG4gICAgICAgICAgY2xhc3NFbGVtZW50cy5wdXNoKHRhcmdldFtpXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gY2xhc3NFbGVtZW50cztcbiAgfVxuXG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB0YWdOYW1lXG4gICAqIEBwYXJhbSBjbGFzc05hbWVcbiAgICogQHJldHVybnMge0Z1bmN0aW9ufVxuICAgKi9cbiAgc3RhdGljIGdldFRhZ05hbWVDbGFzc05hbWVNYXRjaGVyKHRhZ05hbWUsIGNsYXNzTmFtZSkge1xuICAgIGxldCByZWdFeHA7XG4gICAgdGFnTmFtZSA9IHRhZ05hbWUgPyB0YWdOYW1lLnRvVXBwZXJDYXNlKCkgOiAnKic7XG4gICAgaWYgKGNsYXNzTmFtZSkge1xuICAgICAgcmVnRXhwID0gbmV3IFJlZ0V4cCgnKD86XnxcXFxccyspJyArIGNsYXNzTmFtZSArICcoPzpcXFxccyt8JCknKTtcbiAgICB9XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICByZXR1cm4gKCgodGFnTmFtZSA9PT0gJyonKSB8fFxuICAgICAgKGVsZW1lbnQudGFnTmFtZSAmJiAoZWxlbWVudC50YWdOYW1lLnRvVXBwZXJDYXNlKCkgPT09IHRhZ05hbWUpKSkgJiZcbiAgICAgICgoIWNsYXNzTmFtZSkgfHxcbiAgICAgIHJlZ0V4cC50ZXN0KGVsZW1lbnQuY2xhc3NOYW1lKSkpO1xuICAgIH1cbiAgfVxuXG5cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHNlbGVjdG9yXG4gICAqIEBwYXJhbSByb290XG4gICAqIEByZXR1cm5zIHsqfVxuICAgKi9cbiAgc3RhdGljIGZpbmRBbGwgKHNlbGVjdG9yLCByb290KSB7XG4gICAgc2VsZWN0b3IgPSB0cmltKHNlbGVjdG9yKTtcbiAgICByb290ID0gcm9vdCB8fCBkb2N1bWVudDtcbiAgICB2YXIgbWF0Y2hlcztcbiAgICBpZiAobWF0Y2hlcyA9IHNlbGVjdG9yLm1hdGNoKGlkUmVnRXhwKSkge1xuICAgICAgdmFyIGVsID0gZmluZEJ5SWQobWF0Y2hlc1sxXSwgcm9vdCk7XG4gICAgICByZXR1cm4gZWwgPyBbZWxdIDogW107XG4gICAgfVxuICAgIGVsc2UgaWYgKG1hdGNoZXMgPSBzZWxlY3Rvci5tYXRjaCh0YWdDbGFzc1JlZ0V4cCkpIHtcbiAgICAgIHZhciB0YWdOYW1lQ2xhc3NOYW1lTWF0Y2hlciA9IFNlbGVjdG9yLmdldFRhZ05hbWVDbGFzc05hbWVNYXRjaGVyKG1hdGNoZXNbMV0sIG1hdGNoZXNbMl0pO1xuICAgICAgaWYgKGlzSG9zdE1ldGhvZChyb290LCAncXVlcnlTZWxlY3RvckFsbCcpKSB7XG4gICAgICAgIHZhciBlbGVtZW50cztcbiAgICAgICAgdmFyIHJlc3VsdHMgPSBbXTtcbiAgICAgICAgaWYgKHRhZ05hbWVDbGFzc05hbWVNYXRjaGVyKHJvb3QpKSB7XG4gICAgICAgICAgcmVzdWx0cy5wdXNoKHJvb3QpO1xuICAgICAgICB9XG4gICAgICAgIGVsZW1lbnRzID0gcm9vdC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGlsZW4gPSBlbGVtZW50cy5sZW5ndGg7IGkgPCBpbGVuOyBpKyspIHtcbiAgICAgICAgICByZXN1bHRzLnB1c2goZWxlbWVudHNbaV0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBmaWx0ZXJET00ocm9vdCwgdGFnTmFtZUNsYXNzTmFtZU1hdGNoZXIpO1xuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRE9NVXRpbC5maW5kQWxsOiBVbnN1cHBvcnRlZCBzZWxlY3RvciBcIicgKyBzZWxlY3RvciArICdcIi4nKTtcbiAgICB9XG4gIH1cblxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0gc2VsZWN0b3JcbiAgICogQHBhcmFtIHJvb3RcbiAgICogQHJldHVybnMgeyp8ZG9jdW1lbnR9XG4gICAqL1xuICBzdGF0aWMgZmluZCAoc2VsZWN0b3IsIHJvb3QpIHtcbiAgICBzZWxlY3RvciA9IHRyaW0oc2VsZWN0b3IpO1xuICAgIHJvb3QgPSByb290IHx8IGRvY3VtZW50O1xuICAgIHZhciBtYXRjaGVzO1xuICAgIGlmIChtYXRjaGVzID0gc2VsZWN0b3IubWF0Y2goaWRSZWdFeHApKSB7XG4gICAgICByZXR1cm4gZmluZEJ5SWQobWF0Y2hlc1sxXSwgcm9vdCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKG1hdGNoZXMgPSBzZWxlY3Rvci5tYXRjaCh0YWdDbGFzc1JlZ0V4cCkpIHtcbiAgICAgIHZhciB0YWdOYW1lQ2xhc3NOYW1lTWF0Y2hlciA9IFNlbGVjdG9yLmdldFRhZ05hbWVDbGFzc05hbWVNYXRjaGVyKG1hdGNoZXNbMV0sIG1hdGNoZXNbMl0pO1xuICAgICAgaWYgKGlzSG9zdE1ldGhvZChyb290LCAncXVlcnlTZWxlY3RvcicpKSB7XG4gICAgICAgIHJldHVybiB0YWdOYW1lQ2xhc3NOYW1lTWF0Y2hlcihyb290KSA/IHJvb3QgOiByb290LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBmaXJzdEluRE9NKHJvb3QsIHRhZ05hbWVDbGFzc05hbWVNYXRjaGVyKTtcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2dyYWlsLmZpbmQ6IFVuc3VwcG9ydGVkIHNlbGVjdG9yIFwiJyArIHNlbGVjdG9yICsgJ1wiLicpO1xuICAgIH1cblxuICB9XG5cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIGVsZW1zXG4gICAqIEBwYXJhbSBzZWxlY3RvclxuICAgKiBAcmV0dXJucyB7Kn1cbiAgICovXG4gIHN0YXRpYyBmaWx0ZXJGaW5kRWxlbWVudHMoZWxlbXMsIHNlbGVjdG9yKSB7XG4gICAgZWxlbXMgPSBNb2R1bGUubWFrZUFycmF5KGVsZW1zKTtcblxuICAgIHZhciBmaWx0ZXJlZEVsZW1zID0gW107XG5cbiAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gZWxlbXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIHZhciBlbGVtID0gZWxlbXNbaV07XG5cbiAgICAgIGlmICghR2V0VHlwZU9mLmlzRWxlbWVudChlbGVtKSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHNlbGVjdG9yKSB7XG4gICAgICAgIGlmIChTZWxlY3Rvci5tYXRjaGVzU2VsZWN0b3IoZWxlbSwgc2VsZWN0b3IpKSB7XG4gICAgICAgICAgZmlsdGVyZWRFbGVtcy5wdXNoKGVsZW0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGNoaWxkRWxlbXMgPSBlbGVtLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xuXG4gICAgICAgIGZvciAodmFyIGogPSAwLCBqTGVuID0gY2hpbGRFbGVtcy5sZW5ndGg7IGogPCBqTGVuOyBqKyspIHtcbiAgICAgICAgICBmaWx0ZXJlZEVsZW1zLnB1c2goY2hpbGRFbGVtc1tqXSk7XG4gICAgICAgIH1cblxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZmlsdGVyZWRFbGVtcy5wdXNoKGVsZW0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmaWx0ZXJlZEVsZW1zO1xuICB9XG5cblxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0gZWxlbWVudFxuICAgKiBAcmV0dXJucyB7KnxudWxsfE5vZGV9XG4gICAqL1xuICBzdGF0aWMgZ2V0Rmlyc3RDaGlsZChlbGVtZW50KSB7XG4gICAgcmV0dXJuIGVsZW1lbnQuZmlyc3RDaGlsZDtcbiAgfVxuXG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSBlbGVtZW50XG4gICAqIEByZXR1cm5zIHtOb2RlfVxuICAgKi9cbiAgc3RhdGljIGdldEZpcnN0R3JhbmRDaGlsZChlbGVtZW50KSB7XG4gICAgcmV0dXJuIGVsZW1lbnQuZmlyc3RDaGlsZC5maXJzdENoaWxkO1xuICB9XG5cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIGVsZW1lbnRcbiAgICogQHJldHVybnMge05vZGV9XG4gICAqL1xuICBzdGF0aWMgZ2V0U2Vjb25kR3JhbmRDaGlsZChlbGVtZW50KSB7XG4gICAgcmV0dXJuIGVsZW1lbnQuZmlyc3RDaGlsZC5maXJzdENoaWxkLm5leHRTaWJsaW5nO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSBlbGVtZW50XG4gICAqIEByZXR1cm5zIHtOb2RlfVxuICAgKi9cbiAgc3RhdGljIGdldEZpcnN0R3JlYXRHcmFuZENoaWxkKGVsZW1lbnQpIHtcbiAgICByZXR1cm4gZWxlbWVudC5maXJzdENoaWxkLmZpcnN0Q2hpbGQuZmlyc3RDaGlsZDtcbiAgfVxuXG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSBlbGVtZW50XG4gICAqIEByZXR1cm5zIHtOb2RlfVxuICAgKi9cbiAgc3RhdGljIGdldEZpcnN0R3JlYXRHcmVhdEdyYW5kQ2hpbGQoZWxlbWVudCkge1xuICAgIHJldHVybiBlbGVtZW50LmZpcnN0Q2hpbGQuZmlyc3RDaGlsZC5maXJzdENoaWxkLmZpcnN0Q2hpbGQ7XG4gIH1cblxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0gdGFyZ2V0XG4gICAqIEBwYXJhbSB0YWdcbiAgICogQHJldHVybnMge0Z1bmN0aW9ufE5vZGV9XG4gICAqL1xuICBzdGF0aWMgZ2V0UGFyZW50Tm9kZSh0YXJnZXQsIHRhZykge1xuXG4gICAgbGV0IHBhcmVudDtcbiAgICBsZXQgX3RhcmdldCA9IHRhcmdldC5wYXJlbnROb2RlO1xuXG4gICAgdGFnID0gdGFnLnRvVXBwZXJDYXNlKCk7XG5cbiAgICBpZiAodGFyZ2V0LnRhZ05hbWUgPT09IHRhZykge1xuICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICB9IGVsc2UgaWYgKCEhX3RhcmdldCAmJiBfdGFyZ2V0LnRhZ05hbWUgPT09IHRhZykge1xuICAgICAgcmV0dXJuIF90YXJnZXQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHdoaWxlIChfdGFyZ2V0KSB7XG4gICAgICAgIGlmIChfdGFyZ2V0LnRhZ05hbWUgPT09IHRhZykge1xuICAgICAgICAgIHBhcmVudCA9IF90YXJnZXQ7XG4gICAgICAgICAgX3RhcmdldCA9IG51bGw7XG4gICAgICAgICAgcmV0dXJuIHBhcmVudDtcbiAgICAgICAgfVxuICAgICAgICBfdGFyZ2V0ID0gX3RhcmdldC5wYXJlbnROb2RlO1xuICAgICAgfVxuICAgIH1cblxuICB9XG5cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHRhcmdldFxuICAgKiBAcGFyYW0gY2xhc3NOYW1lXG4gICAqIEByZXR1cm5zIHsqfVxuICAgKi9cbiAgc3RhdGljIGdldFBhcmVudENsYXNzTmFtZU5vZGUodGFyZ2V0LCBjbGFzc05hbWUpIHtcbiAgICBsZXQgcGFyZW50O1xuXG4gICAgaWYgKERPTVV0aWwuaGFzQ2xhc3ModGFyZ2V0LCBjbGFzc05hbWUpKSB7XG4gICAgICByZXR1cm4gdGFyZ2V0O1xuICAgIH0gZWxzZSB7XG4gICAgICB3aGlsZSAodGFyZ2V0KSB7XG4gICAgICAgIGlmIChET01VdGlsLmhhc0NsYXNzKHRhcmdldCwgY2xhc3NOYW1lKSkge1xuICAgICAgICAgIHBhcmVudCA9IHRhcmdldDtcbiAgICAgICAgICB0YXJnZXQgPSBudWxsO1xuICAgICAgICAgIHJldHVybiBwYXJlbnQ7XG4gICAgICAgIH1cbiAgICAgICAgdGFyZ2V0ID0gdGFyZ2V0LnBhcmVudE5vZGU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHRhcmdldFxuICAgKiBAcGFyYW0gaWRcbiAgICogQHJldHVybnMgeyp9XG4gICAqL1xuICBzdGF0aWMgZ2V0UGFyZW50SWROYW1lTm9kZSh0YXJnZXQsIGlkKSB7XG5cbiAgICBsZXQgcGFyZW50O1xuXG4gICAgaWYgKHRhcmdldC5pZCA9PT0gaWQpIHtcbiAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHdoaWxlICh0YXJnZXQpIHtcbiAgICAgICAgaWYgKHRhcmdldC5pZCA9PT0gaWQpIHtcbiAgICAgICAgICBwYXJlbnQgPSB0YXJnZXQ7XG4gICAgICAgICAgdGFyZ2V0ID0gbnVsbDtcbiAgICAgICAgICByZXR1cm4gcGFyZW50O1xuICAgICAgICB9XG4gICAgICAgIHRhcmdldCA9IHRhcmdldC5wYXJlbnROb2RlO1xuICAgICAgfVxuICAgIH1cblxuICB9XG5cbiAgLyoqXG4gICAqIOODnuODg+ODgeOCu+ODrOOCr+OCv+ODvFxuICAgKi9cbiAgc3RhdGljIG1hdGNoZXNTZWxlY3RvcigpIHtcblxuICAgIGlmICghKCdFbGVtZW50JyBpbiB3aW5kb3cpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IGVsUHJvdG90eXBlID0gd2luZG93LkVsZW1lbnQucHJvdG90eXBlO1xuXG4gICAgbGV0IG1hdGNoZXNNZXRob2QgPSAoZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKGVsUHJvdG90eXBlLm1hdGNoZXNTZWxlY3Rvcikge1xuICAgICAgICByZXR1cm4gJ21hdGNoZXNTZWxlY3Rvcic7XG4gICAgICB9XG4gICAgICBsZXQgcHJlZml4ZXMgPSBbJ3dlYmtpdCcsICdtb3onLCAnbXMnLCAnbyddO1xuXG4gICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gcHJlZml4ZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgbGV0IHByZWZpeCA9IHByZWZpeGVzW2ldO1xuICAgICAgICBsZXQgbWV0aG9kID0gcHJlZml4ICsgJ01hdGNoZXNTZWxlY3Rvcic7XG4gICAgICAgIGlmIChlbFByb3RvdHlwZVttZXRob2RdKSB7XG4gICAgICAgICAgcmV0dXJuIG1ldGhvZDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pKCk7XG5cblxuICAgIGxldCBtYXRjaCA9IGZ1bmN0aW9uIChlbGVtLCBzZWxlY3Rvcikge1xuICAgICAgcmV0dXJuIGVsZW1bbWF0Y2hlc01ldGhvZF0oc2VsZWN0b3IpO1xuICAgIH07XG5cblxuICAgIGxldCBjaGVja1BhcmVudCA9IGZ1bmN0aW9uIChlbGVtKSB7XG4gICAgICBpZiAoZWxlbS5wYXJlbnROb2RlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGxldCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKGVsZW0pO1xuICAgIH07XG5cblxuICAgIGxldCBxdWVyeSA9IGZ1bmN0aW9uIChlbGVtLCBzZWxlY3Rvcikge1xuICAgICAgY2hlY2tQYXJlbnQoZWxlbSk7XG5cbiAgICAgIGxldCBlbGVtcyA9IGVsZW0ucGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcbiAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBlbGVtcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBpZiAoZWxlbXNbaV0gPT09IGVsZW0pIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG5cblxuICAgIGxldCBtYXRjaENoaWxkID0gZnVuY3Rpb24gKGVsZW0sIHNlbGVjdG9yKSB7XG4gICAgICBjaGVja1BhcmVudChlbGVtKTtcbiAgICAgIHJldHVybiBtYXRjaChlbGVtLCBzZWxlY3Rvcik7XG4gICAgfTtcblxuXG4gICAgbGV0IG1hdGNoZXNTZWxlY3RvcjtcblxuICAgIGlmIChtYXRjaGVzTWV0aG9kKSB7XG4gICAgICBsZXQgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBsZXQgc3VwcG9ydHNPcnBoYW5zID0gbWF0Y2goZGl2LCAnZGl2Jyk7XG4gICAgICBtYXRjaGVzU2VsZWN0b3IgPSBzdXBwb3J0c09ycGhhbnMgPyBtYXRjaCA6IG1hdGNoQ2hpbGQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIG1hdGNoZXNTZWxlY3RvciA9IHF1ZXJ5O1xuICAgIH1cblxuICAgIHJldHVybiBtYXRjaGVzU2VsZWN0b3I7XG5cbiAgfTtcblxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9jb21tb24vanMvYXBwL2Jyb3dzZXIvU2VsZWN0b3IuanNcbiAqKi8iLCIvKipcbiAqIGZpbGVPdmVydmlldzpcbiAqIFByb2plY3Q6XG4gKiBGaWxlOlxuICogRGF0ZTpcbiAqIEF1dGhvcjpcbiAqL1xuXG5cbid1c2Ugc3RyaWN0JztcblxuXG4vKipcbiAqXG4gKiBAcGFyYW0gb2JqXG4gKi9cbmxldCB0b1N0cmluZyA9IChvYmopID0+IHtcbiAgcmV0dXJuIHt9LnRvU3RyaW5nLmNhbGwob2JqKTtcbn07XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2V0VHlwZU9mIHtcbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB2YWxcbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqL1xuICBzdGF0aWMgaXNVbmRlZmluZWQodmFsKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqL1xuICBzdGF0aWMgaXNOdWxsKHZhbCkge1xuICAgIHJldHVybiB2YWwgPT09IG51bGw7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHZhbFxuICAgKi9cbiAgc3RhdGljIGlzU2V0KHZhbCkge1xuICAgIHJldHVybiAoIXRoaXMuaXNVbmRlZmluZWQodmFsKSAmJiAhdGhpcy5pc051bGwodmFsKSk7XG4gIH1cblxuXG4gIC8qKlxuICAgKlxuICAgKi9cbiAgc3RhdGljIGlzRE9NRWxlbWVudChub2RlKSB7XG4gICAgcmV0dXJuIG5vZGUubm9kZVR5cGUgPT09IDEgfHwgKG5vZGUgIT09IG51bGwgJiYgbm9kZSA9PT0gbm9kZS53aW5kb3cpO1xuICB9XG5cblxuICAvKipcbiAgICpcbiAgICogQHR5cGUge0Z1bmN0aW9ufVxuICAgKi9cbiAgc3RhdGljIGlzRWxlbWVudChlbCkge1xuICAgIGlmICgoIHR5cGVvZiBIVE1MRWxlbWVudCA9PSAnZnVuY3Rpb24nIHx8IHR5cGVvZiBIVE1MRWxlbWVudCA9PSAnb2JqZWN0JyApKSB7XG4gICAgICByZXR1cm4gZWwgaW5zdGFuY2VvZiBIVE1MRWxlbWVudDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGVsICYmIHR5cGVvZiBlbCA9PSAnb2JqZWN0JyAmJlxuICAgICAgICBlbC5ub2RlVHlwZSA9PSAxICYmIHR5cGVvZiBlbC5ub2RlTmFtZSA9PSAnc3RyaW5nJztcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIGZ1bmNcbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqL1xuICBzdGF0aWMgaXNGdW5jdGlvbihmdW5jKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBmdW5jID09PSAnZnVuY3Rpb24nO1xuICB9XG5cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIG9ialxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICovXG4gIHN0YXRpYyBpc1BsYWluT2JqZWN0KG9iaikge1xuICAgIHZhciByZXN1bHQgPSBmYWxzZTtcblxuICAgIGlmICh0aGlzLmlzU2V0KG9iaikgJiYgdGhpcy5pc09iamVjdChvYmopKSB7XG4gICAgICByZXN1bHQgPSAhQXJyYXkuaXNBcnJheShvYmopICYmICF0aGlzLmlzRnVuY3Rpb24ob2JqKSAmJiAhdGhpcy5pc0RPTUVsZW1lbnQob2JqKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBpc09iamVjdFxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBwYXJhbXMge09iamVjdH0gb2JqXG4gICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAqL1xuICBzdGF0aWMgaXNPYmplY3Qob2JqKSB7XG4gICAgcmV0dXJuIG9iaiA9PT0gT2JqZWN0KG9iaik7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBpc051bWJlclxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBwYXJhbXMge051bWJlcn0gbnVtXG4gICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAqL1xuICBzdGF0aWMgaXNOdW1iZXIobnVtKSB7XG4gICAgcmV0dXJuICgodHlwZW9mIG51bSA9PT0gdHlwZW9mIDEpICYmIChudWxsICE9PSBudW0pICYmIGlzRmluaXRlKG51bSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIGlzU3RyaW5nXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQHBhcmFtcyB7U3RyaW5nfSBzdHJcbiAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICovXG4gIHN0YXRpYyBpc1N0cmluZyhzdHIpIHtcbiAgICByZXR1cm4gKHR5cGVvZiBzdHIgPT09ICdzdHJpbmcnIHx8XG4gICAgc3RyIGluc3RhbmNlb2YgU3RyaW5nICk7XG4gIH1cblxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0gb2JqXG4gICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgKi9cbiAgc3RhdGljIGlzQm9vbGVhbihvYmopIHtcbiAgICByZXR1cm4gKG9iaiA9PT0gdHJ1ZSB8fFxuICAgIG9iaiA9PT0gZmFsc2UgfHxcbiAgICB0b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IEJvb2xlYW5dJyk7XG4gIH1cblxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0gYXJnXG4gICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgKi9cbiAgc3RhdGljIGlzUHJpbWl0aXZlKGFyZykge1xuICAgIHJldHVybiAoYXJnID09PSBudWxsIHx8XG4gICAgdHlwZW9mIGFyZyA9PT0gJ2Jvb2xlYW4nIHx8XG4gICAgdHlwZW9mIGFyZyA9PT0gJ251bWJlcicgfHxcbiAgICB0eXBlb2YgYXJnID09PSAnc3RyaW5nJyB8fFxuICAgIHR5cGVvZiBhcmcgPT09ICdzeW1ib2wnIHx8XG4gICAgdHlwZW9mIGFyZyA9PT0gJ3VuZGVmaW5lZCcpO1xuICB9XG5cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIG9ialxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICovXG4gIHN0YXRpYyBpc0VtcHR5T2JqZWN0KG9iaikge1xuICAgIGZvciAodmFyIHByb3AgaW4gb2JqKSB7XG4gICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KHByb3ApKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcHJvcCA9IG51bGw7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vY29tbW9uL2pzL2FwcC91dGlscy9HZXRUeXBlT2YuanNcbiAqKi8iLCIvKipcbiAqIGZpbGVPdmVydmlldzpcbiAqIFByb2plY3Q6XG4gKiBGaWxlOlxuICogRGF0ZTpcbiAqIEF1dGhvcjpcbiAqL1xuXG5cbid1c2Ugc3RyaWN0JztcblxuXG5sZXQgbmF2aWdhdG9yID0gd2luZG93Lm5hdmlnYXRvcjtcbmxldCBwbGF0Zm9ybSA9IG5hdmlnYXRvci5wbGF0Zm9ybTtcbmxldCB1c2VyQWdlbnQgPSBuYXZpZ2F0b3IudXNlckFnZW50O1xubGV0IGFwcFZlcnNpb24gPSBuYXZpZ2F0b3IuYXBwVmVyc2lvbjtcbmxldCB1c2VyQWdlbnRMb3dlciA9IHVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpO1xubGV0IGFwcFZlcnNpb25Mb3dlciA9IGFwcFZlcnNpb24udG9Mb3dlckNhc2UoKTtcblxuXG5sZXQgY2FudmFzMkQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdfY2FudmFzJyk7XG5sZXQgX2NhbnZhc0V4cGVyaW1lbnRhbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ19jYW52YXMnKTtcblxuLy8g44OG44K544OI6KaB57SgXG5sZXQgX2RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xubGV0IF9kaXZTdHlsZSA9IF9kaXYuc3R5bGU7XG5cbi8qKlxuICpcbiAqIEBwYXJhbSBzdHlsZVxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmxldCBzdHlsZVRlc3QgPSBmdW5jdGlvbiAoc3R5bGUpIHtcbiAgcmV0dXJuIHN0eWxlIGluIF9kaXZTdHlsZTtcbn07XG5cblxuLyoqXG4gKlxuICogQHBhcmFtIGtleVxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xubGV0IGdldFZlcnNpb24gPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHZhciB1YSA9ICh1c2VyQWdlbnQgKyAnOycpLnJlcGxhY2UoLyAvZywgJzsnKTtcbiAgdmFyIF9zdGFydCA9IHVhLmluZGV4T2Yoa2V5KSArIGtleS5sZW5ndGg7XG4gIHZhciBfZW5kID0gdWEuaW5kZXhPZignOycsIF9zdGFydCk7XG4gIHJldHVybiAodWEuc3Vic3RyaW5nKF9zdGFydCwgX2VuZCkpO1xufTtcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCcm93c2VyVXRpbCB7XG5cbiAgc3RhdGljIG5hdmlnYXRvciA9IG5hdmlnYXRvcjtcbiAgc3RhdGljIHBsYXRmb3JtID0gcGxhdGZvcm07XG4gIHN0YXRpYyB1c2VyQWdlbnQgPSB1c2VyQWdlbnQ7XG4gIHN0YXRpYyBhcHBWZXJzaW9uID0gYXBwVmVyc2lvbjtcbiAgc3RhdGljIHVzZXJBZ2VudExvd2VyID0gdXNlckFnZW50TG93ZXI7XG4gIHN0YXRpYyBhcHBWZXJzaW9uTG93ZXIgPSBhcHBWZXJzaW9uTG93ZXI7XG5cblxuICAvLyDmqZ/og71cbiAgc3RhdGljIGhhc1VuaXF1ZUlEID0gZG9jdW1lbnQudW5pcXVlSUQ7XG4gIHN0YXRpYyBoYXNBZGRFdmVudExpc3RlbmVyID0gdHlwZW9mIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyID09PSAndW5kZWZpbmVkJztcbiAgc3RhdGljIGhhc09yaWVudGF0aW9uID0gdHlwZW9mIHdpbmRvdy5vcmllbnRhdGlvbiAhPT0gJ3VuZGVmaW5lZCc7XG4gIHN0YXRpYyBoYXNNb3VzZSA9ICEoJ29udG91Y2hzdGFydCcgaW4gd2luZG93KTtcbiAgc3RhdGljIGhhc01vYmlsZSA9ICEhL21vYmlsZS8udGVzdCh1c2VyQWdlbnRMb3dlcik7XG5cblxuICAvLyBJRVxuICBzdGF0aWMgbHRJRTYgPSBCcm93c2VyVXRpbC5oYXNBZGRFdmVudExpc3RlbmVyICYmIHR5cGVvZiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUubWF4SGVpZ2h0ID09PSAndW5kZWZpbmVkJztcbiAgc3RhdGljIGx0SUU3ID0gQnJvd3NlclV0aWwuaGFzQWRkRXZlbnRMaXN0ZW5lciAmJiB0eXBlb2YgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCA9PT0gJ3VuZGVmaW5lZCc7XG4gIHN0YXRpYyBsdElFOCA9IEJyb3dzZXJVdGlsLmhhc0FkZEV2ZW50TGlzdGVuZXIgJiYgdHlwZW9mIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUgPT09ICd1bmRlZmluZWQnO1xuICBzdGF0aWMgbHRJRTkgPSBCcm93c2VyVXRpbC5oYXNVbmlxdWVJRCAmJiAhd2luZG93Lm1hdGNoTWVkaWE7XG4gIHN0YXRpYyBpc0lFMTAgPSBCcm93c2VyVXRpbC5oYXNVbmlxdWVJRCAmJiBkb2N1bWVudC5kb2N1bWVudE1vZGUgPT09IDEwO1xuICBzdGF0aWMgaXNJRTExID0gQnJvd3NlclV0aWwuaGFzVW5pcXVlSUQgJiYgQnJvd3NlclV0aWwudXNlckFnZW50LmluZGV4T2YoJ3RyaWRlbnQnKSA+IC0xO1xuXG5cbiAgLy8g44OW44Op44Km44K2XG4gIHN0YXRpYyBpc0lFID0gISEoZG9jdW1lbnQudW5pcXVlSUQpO1xuICBzdGF0aWMgaXNGaXJlZm94ID0gISEod2luZG93LnNpZGViYXIpO1xuICBzdGF0aWMgaXNPcGVyYSA9ICEhKHdpbmRvdy5vcGVyYSk7XG4gIHN0YXRpYyBpc1dlYmtpdCA9ICghZG9jdW1lbnQudW5pcXVlSUQpICYmICghQnJvd3NlclV0aWwuaXNGaXJlZm94KSAmJiAoIUJyb3dzZXJVdGlsLmlzT3BlcmEpICYmICghIXdpbmRvdy5oYXNPd25Qcm9wZXJ0eSgnbG9jYWxTdG9yYWdlJykpO1xuICBzdGF0aWMgaXNDaHJvbWUgPSBCcm93c2VyVXRpbC5pc1dlYmtpdCAmJiAodXNlckFnZW50TG93ZXIuaW5kZXhPZignY2hyb21lJykgPiAtMSB8fCB1c2VyQWdlbnRMb3dlci5pbmRleE9mKCdjcmlvcycpID4gLTEpO1xuXG5cbiAgLy8gT1NcbiAgc3RhdGljIGlzaVBob25lID0gL2lwaG9uZS8udGVzdCh1c2VyQWdlbnRMb3dlcik7XG4gIHN0YXRpYyBpc2lQb2QgPSAvaXBvZC8udGVzdCh1c2VyQWdlbnRMb3dlcik7XG4gIHN0YXRpYyBpc2lQYWQgPSAvaXBhZC8udGVzdCh1c2VyQWdlbnRMb3dlcik7XG4gIHN0YXRpYyBpc2lPUyA9IChCcm93c2VyVXRpbC5pc2lQaG9uZSB8fCBCcm93c2VyVXRpbC5pc2lQb2QgfHwgQnJvd3NlclV0aWwuaXNpUGFkKTtcbiAgc3RhdGljIGlzQW5kcm9pZCA9IC9hbmRyb2lkLy50ZXN0KHVzZXJBZ2VudExvd2VyKTtcbiAgc3RhdGljIGlzQW5kcm9pZFN0ZEJyb3dzZXIgPSAvbGludXg7IHUvLnRlc3QodXNlckFnZW50TG93ZXIpO1xuICBzdGF0aWMgaXNBbmRyb2lkVGFibGV0ID0gKCEhQnJvd3NlclV0aWwuaXNBbmRyb2lkID8gISFCcm93c2VyVXRpbC5oYXNNb2JpbGUgOiBmYWxzZSk7XG4gIHN0YXRpYyBpc0FuZHJvaWRQaG9uZSA9ICghIUJyb3dzZXJVdGlsLmlzQW5kcm9pZCA/ICFCcm93c2VyVXRpbC5oYXNNb2JpbGUgOiBmYWxzZSk7XG5cblxuICBzdGF0aWMgaXNUYWJsZXREZXZpY2UgPSAodXNlckFnZW50TG93ZXIuaW5kZXhPZignd2luZG93cycpICE9IC0xICYmIHVzZXJBZ2VudExvd2VyLmluZGV4T2YoJ3RvdWNoJykgIT0gLTEpIHx8XG4gICAgdXNlckFnZW50TG93ZXIuaW5kZXhPZignaXBhZCcpICE9IC0xIHx8XG4gICAgKHVzZXJBZ2VudExvd2VyLmluZGV4T2YoJ2FuZHJvaWQnKSAhPSAtMSAmJiB1c2VyQWdlbnRMb3dlci5pbmRleE9mKCdtb2JpbGUnKSA9PSAtMSkgfHxcbiAgICAodXNlckFnZW50TG93ZXIuaW5kZXhPZignZmlyZWZveCcpICE9IC0xICYmIHVzZXJBZ2VudExvd2VyLmluZGV4T2YoJ3RhYmxldCcpICE9IC0xKSB8fFxuICAgIHVzZXJBZ2VudExvd2VyLmluZGV4T2YoJ2tpbmRsZScpICE9IC0xIHx8IHVzZXJBZ2VudExvd2VyLmluZGV4T2YoJ3NpbGsnKSAhPSAtMSB8fCB1c2VyQWdlbnRMb3dlci5pbmRleE9mKCdwbGF5Ym9vaycpICE9IC0xO1xuXG5cbiAgc3RhdGljIGlzTW9iaWxlRGV2aWNlID0gKHVzZXJBZ2VudExvd2VyLmluZGV4T2YoJ3dpbmRvd3MnKSAhPT0gLTEgJiYgdXNlckFnZW50TG93ZXIuaW5kZXhPZigncGhvbmUnKSAhPT0gLTEpIHx8XG4gICAgdXNlckFnZW50TG93ZXIuaW5kZXhPZignaXBob25lJykgIT09IC0xIHx8IHVzZXJBZ2VudExvd2VyLmluZGV4T2YoJ2lwb2QnKSAhPT0gLTEgfHxcbiAgICAodXNlckFnZW50TG93ZXIuaW5kZXhPZignYW5kcm9pZCcpICE9PSAtMSAmJiB1c2VyQWdlbnRMb3dlci5pbmRleE9mKCdtb2JpbGUnKSAhPT0gLTEpIHx8XG4gICAgKHVzZXJBZ2VudExvd2VyLmluZGV4T2YoJ2ZpcmVmb3gnKSAhPT0gLTEgJiYgdXNlckFnZW50TG93ZXIuaW5kZXhPZignbW9iaWxlJykgIT09IC0xKSB8fFxuICAgIHVzZXJBZ2VudExvd2VyLmluZGV4T2YoJ2JsYWNrYmVycnknKSAhPT0gLTE7XG5cbiAgc3RhdGljIGlzVGFibGV0ID0gQnJvd3NlclV0aWwuaXNBbmRyb2lkVGFibGV0IHx8IEJyb3dzZXJVdGlsLmlzaVBhZDtcbiAgc3RhdGljIGlzUGhvbmUgPSBCcm93c2VyVXRpbC5pc0FuZHJvaWRQaG9uZSB8fCBCcm93c2VyVXRpbC5pc2lQaG9uZSB8fCBCcm93c2VyVXRpbC5pc2lQb2Q7XG4gIHN0YXRpYyBpc01vYmlsZSA9IEJyb3dzZXJVdGlsLmhhc09yaWVudGF0aW9uIHx8IEJyb3dzZXJVdGlsLmlzVGFibGV0IHx8IEJyb3dzZXJVdGlsLmlzUGhvbmU7XG4gIHN0YXRpYyBpc01vYmlsZVVBID0gQnJvd3NlclV0aWwuaXNBbmRyb2lkIHx8IEJyb3dzZXJVdGlsLmlzaU9TO1xuXG5cbiAgLy8gTU9ERVJOXG4gIHN0YXRpYyBlbmFibGVUb3VjaCA9ICghQnJvd3NlclV0aWwuaGFzTW91c2UgfHwgKHdpbmRvdy5Eb2N1bWVudFRvdWNoICYmIGRvY3VtZW50IGluc3RhbmNlb2YgRG9jdW1lbnRUb3VjaCkpO1xuICBzdGF0aWMgdmVuZG9yUHJlZml4ID0gKCgvd2Via2l0L2kpLnRlc3QoQnJvd3NlclV0aWwuYXBwVmVyc2lvbkxvd2VyKSA/ICd3ZWJraXQnIDogKCgvZmlyZWZveC9pKS50ZXN0KHVzZXJBZ2VudExvd2VyKSA/ICdNb3onIDogKCdvcGVyYScgaW4gd2luZG93ID8gJ08nIDogJycpKSk7XG4gIHN0YXRpYyBoYXNNU3BvaW50ZXIgPSAhIW5hdmlnYXRvci5tc1BvaW50ZXJFbmFibGVkO1xuICBzdGF0aWMgaGFzQ2FudmFzID0gISFjYW52YXMyRCAmJiAoJ2dldENvbnRleHQnIGluIGNhbnZhczJEKSAmJiAhIWNhbnZhczJELmdldENvbnRleHQoJzJkJyk7XG4gIHN0YXRpYyBoYXNXZWJHTCA9ICghISdXZWJHTFJlbmRlcmluZ0NvbnRleHQnIGluIHdpbmRvdykgJiYgISFfY2FudmFzRXhwZXJpbWVudGFsLmdldENvbnRleHQoJ2V4cGVyaW1lbnRhbC13ZWJnbCcpO1xuICBzdGF0aWMgaGFzQ29va2llID0gISFuYXZpZ2F0b3IuY29va2llRW5hYmxlZDtcbiAgc3RhdGljIGhhc0dlb0xvY2F0aW9uID0gISFuYXZpZ2F0b3IuZ2VvbG9jYXRpb247XG4gIHN0YXRpYyBoYXNKU09OUGFyc2VyID0gISEoKCdKU09OJyBpbiB3aW5kb3cpICYmICdzdHJpbmdpZnknIGluIEpTT04gJiYgJ3BhcnNlJyBpbiBKU09OKTtcbiAgc3RhdGljIGhhc0xvY2FsU3RvcmFnZSA9ICEhKCdsb2NhbFN0b3JhZ2UnIGluIHdpbmRvdyk7XG4gIHN0YXRpYyBoYXNNYXRjaE1lZGlhID0gKCdtYXRjaE1lZGlhJyBpbiB3aW5kb3cpO1xuICBzdGF0aWMgaGFzQ2xhc3NMaXN0ID0gKCdjbGFzc0xpc3QnIGluIF9kaXYpO1xuICBzdGF0aWMgaGFzVG91Y2ggPSAhISgnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3cpO1xuICBzdGF0aWMgaGFzQXVkaW8gPSAhISgnSFRNTEF1ZGlvRWxlbWVudCcgaW4gd2luZG93KTtcbiAgc3RhdGljIGhhc0hpc3RvcnlBUEkgPSAhISgnaGlzdG9yeScgaW4gd2luZG93KSAmJiB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUgJiYgd2luZG93Lmhpc3Rvcnkuc3RhdGUgIT09IHVuZGVmaW5lZDtcbiAgc3RhdGljIGhhc1dvcmtkZXIgPSAhISgnV29ya2VyJyBpbiB3aW5kb3cpO1xuICBzdGF0aWMgZGV2aWNlVHlwZSA9IEJyb3dzZXJVdGlsLmlzUGhvbmUgPyAncGhvbmUnIDogKEJyb3dzZXJVdGlsLmlzVGFibGV0ID8gJ3RhYmxldCcgOiAncGMnKTtcbiAgc3RhdGljIHN1cHBvcnRGaWx0ZXIgPSAoJy13ZWJraXQtZmlsdGVyJyBpbiBfZGl2U3R5bGUpO1xuICBzdGF0aWMgYnJvd3Nlckxhbmd1YWdlID0gbmF2aWdhdG9yLmxhbmd1YWdlO1xuICBzdGF0aWMgcGl4ZWxSYXRpbyA9ICgnZGV2aWNlUGl4ZWxSYXRpbycgaW4gd2luZG93KSA/IHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvIDogMTtcblxuXG4gIC8vIHdlYiB2aWV3XG4gIHN0YXRpYyBpc1R3aXR0ZXIgPSAvdHdpdHRlci9pZy50ZXN0KHVzZXJBZ2VudExvd2VyKTtcbiAgc3RhdGljIGlzRmFjZWJvb2sgPSAvZmJhdi9pZy50ZXN0KHVzZXJBZ2VudExvd2VyKTtcbiAgc3RhdGljIGlzTGluZSA9IC9saW5lL2lnLnRlc3QodXNlckFnZW50TG93ZXIpO1xuICBzdGF0aWMgaXNXZWJWaWV3ID0gKEJyb3dzZXJVdGlsLmlzVHdpdHRlciB8fCBCcm93c2VyVXRpbC5pc0ZhY2Vib29rIHx8IEJyb3dzZXJVdGlsLmlzTGluZSkgfHwgISgvc2FmYXJpfGNyaW9zfG9wZXJhLy50ZXN0KHVzZXJBZ2VudExvd2VyKSk7XG5cbiAgLy8gT1NcbiAgc3RhdGljIGlzV2luZG93cyA9IC9XaW4oZG93cyApL2dpLnRlc3QoQnJvd3NlclV0aWwudXNlckFnZW50KTtcbiAgc3RhdGljIGlzTWFjID0gL01hY3xQUEMvZ2kudGVzdChCcm93c2VyVXRpbC51c2VyQWdlbnQpO1xuXG5cbiAgLyoqXG4gICAqIEJST1dTRVJcbiAgICovXG4gIHN0YXRpYyBnZXQgYnJvd3NlcigpIHtcbiAgICBsZXQgYnJvd3NlciA9ICd1bmtub3duJztcblxuICAgIGlmICh1c2VyQWdlbnRMb3dlci5pbmRleE9mKCdtc2llJykgIT09IC0xKSB7XG4gICAgICBpZiAoYXBwVmVyc2lvbkxvd2VyLmluZGV4T2YoJ21zaWUgNi4nKSAhPT0gLTEpIHtcbiAgICAgICAgYnJvd3NlciA9ICdpZTYnO1xuICAgICAgfSBlbHNlIGlmIChhcHBWZXJzaW9uTG93ZXIuaW5kZXhPZignbXNpZSA3LicpICE9PSAtMSkge1xuICAgICAgICBicm93c2VyID0gJ2llNyc7XG4gICAgICB9IGVsc2UgaWYgKGFwcFZlcnNpb25Mb3dlci5pbmRleE9mKCdtc2llIDguJykgIT09IC0xKSB7XG4gICAgICAgIGJyb3dzZXIgPSAnaWU4JztcbiAgICAgIH0gZWxzZSBpZiAoYXBwVmVyc2lvbkxvd2VyLmluZGV4T2YoJ21zaWUgOS4nKSAhPT0gLTEpIHtcbiAgICAgICAgYnJvd3NlciA9ICdpZTknO1xuICAgICAgfSBlbHNlIGlmIChhcHBWZXJzaW9uTG93ZXIuaW5kZXhPZignbXNpZSAxMC4nKSAhPT0gLTEpIHtcbiAgICAgICAgYnJvd3NlciA9ICdpZTEwJztcbiAgICAgIH0gZWxzZSBpZiAodXNlckFnZW50TG93ZXIuaW5kZXhPZignLk5FVCBDTFInKSA+IC0xKSB7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBicm93c2VyID0gJ2llJztcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHVzZXJBZ2VudExvd2VyLmluZGV4T2YoJ3RyaWRlbnQvNycpICE9PSAtMSkge1xuICAgICAgYnJvd3NlciA9ICdpZTExJztcbiAgICB9IGVsc2UgaWYgKHVzZXJBZ2VudExvd2VyLmluZGV4T2YoJ2Nocm9tZScpICE9PSAtMSB8fCB1c2VyQWdlbnRMb3dlci5pbmRleE9mKCdjcmlvcycpID4gLTEpIHtcbiAgICAgIGJyb3dzZXIgPSAnY2hyb21lJztcbiAgICB9IGVsc2UgaWYgKHVzZXJBZ2VudExvd2VyLmluZGV4T2YoJ3NhZmFyaScpICE9PSAtMSkge1xuICAgICAgYnJvd3NlciA9ICdzYWZhcmknO1xuICAgIH0gZWxzZSBpZiAodXNlckFnZW50TG93ZXIuaW5kZXhPZignb3BlcmEnKSAhPT0gLTEpIHtcbiAgICAgIGJyb3dzZXIgPSAnb3BlcmEnO1xuICAgIH0gZWxzZSBpZiAodXNlckFnZW50TG93ZXIuaW5kZXhPZignZmlyZWZveCcpICE9PSAtMSkge1xuICAgICAgYnJvd3NlciA9ICdmaXJlZm94JztcbiAgICB9IGVsc2Uge1xuICAgICAgYnJvd3NlciA9ICd1bmtub3duJztcbiAgICB9XG5cbiAgICByZXR1cm4gYnJvd3NlcjtcbiAgfTtcblxuXG4gIHN0YXRpYyBnZXQgdmVuZGVyUHJlZml4KCkge1xuICAgIGxldCBwcmVmaXggPSAndW5rbm93bic7XG5cbiAgICBpZiAoL21vemlsbGEvLnRlc3QodXNlckFnZW50TG93ZXIpICYmICFCcm93c2VyVXRpbC5pc1dlYmtpdCkge1xuICAgICAgcHJlZml4ID0gJ21vemlsbGEnO1xuICAgIH0gZWxzZSBpZiAoQnJvd3NlclV0aWwuaXNXZWJraXQpIHtcbiAgICAgIHByZWZpeCA9ICd3ZWJraXQnO1xuICAgIH0gZWxzZSBpZiAoL29wZXJhLy50ZXN0KHVzZXJBZ2VudExvd2VyKSkge1xuICAgICAgcHJlZml4ID0gJ29wZXJhJztcbiAgICB9IGVsc2UgaWYgKC9tc2llLy50ZXN0KHVzZXJBZ2VudExvd2VyKSkge1xuICAgICAgcHJlZml4ID0gJ21zaWUnO1xuICAgIH1cblxuICAgIHJldHVybiBwcmVmaXg7XG4gIH07XG5cblxuICAvKipcbiAgICogSUUgVmVyc2lvblxuICAgKi9cbiAgc3RhdGljIGdldCBpZVZlcnNpb24oKSB7XG4gICAgbGV0IHJ2ID0gLTE7XG4gICAgbGV0IHVhID0gdXNlckFnZW50TG93ZXI7XG4gICAgbGV0IG1zSUUgPSB1YS5pbmRleE9mKCdNU0lFICcpO1xuICAgIGxldCB0cmlkZW50ID0gdWEuaW5kZXhPZignVHJpZGVudC8nKTtcblxuICAgIGlmIChtc0lFID4gMCkge1xuICAgICAgcnYgPSBwYXJzZUludCh1YS5zdWJzdHJpbmcobXNJRSArIDUsIHVhLmluZGV4T2YoJy4nLCBtc0lFKSksIDEwKTtcbiAgICB9IGVsc2UgaWYgKHRyaWRlbnQgPiAwKSB7XG4gICAgICB2YXIgcnZOdW0gPSB1YS5pbmRleE9mKCdydjonKTtcbiAgICAgIHJ2ID0gcGFyc2VJbnQodWEuc3Vic3RyaW5nKHJ2TnVtICsgMywgdWEuaW5kZXhPZignLicsIHJ2TnVtKSksIDEwKTtcbiAgICB9XG5cbiAgICByZXR1cm4gKChydiA+IC0xKSA/IHJ2IDogdW5kZWZpbmVkKTtcbiAgfTtcblxuXG4gIHN0YXRpYyBnZXQgb3MoKSB7XG5cbiAgICBsZXQgX29zID0gJ3Vua25vd24nO1xuXG4gICAgaWYgKEJyb3dzZXJVdGlsLmlzQW5kcm9pZCkge1xuICAgICAgX29zID0gJ2FuZHJvaWQnO1xuICAgIH0gZWxzZSBpZiAoQnJvd3NlclV0aWwuaXNpT1MpIHtcbiAgICAgIF9vcyA9ICdpb3MnO1xuICAgIH0gZWxzZSBpZiAodXNlckFnZW50Lm1hdGNoKC9XaW4oZG93cyApP05UIDZcXC4zLykpIHtcbiAgICAgIF9vcyA9ICd3aW5kb3dzXzhfMSc7XG4gICAgfSBlbHNlIGlmICh1c2VyQWdlbnQubWF0Y2goL1dpbihkb3dzICk/TlQgNlxcLjIvKSkge1xuICAgICAgX29zID0gJ3dpbmRvd3NfOCc7XG4gICAgfSBlbHNlIGlmICh1c2VyQWdlbnQubWF0Y2goL1dpbihkb3dzICk/TlQgNlxcLjEvKSkge1xuICAgICAgX29zID0gJ3dpbmRvd3NfNyc7XG4gICAgfSBlbHNlIGlmICh1c2VyQWdlbnQubWF0Y2goL1dpbihkb3dzICk/TlQgNlxcLjAvKSkge1xuICAgICAgX29zID0gJ3dpbmRvd3NfdmlzdGEnO1xuICAgIH0gZWxzZSBpZiAodXNlckFnZW50Lm1hdGNoKC9XaW4oZG93cyApP05UIDVcXC4yLykpIHtcbiAgICAgIF9vcyA9ICd3aW5kb3dzX3NlcnZlcl8yMDAzJztcbiAgICB9IGVsc2UgaWYgKHVzZXJBZ2VudC5tYXRjaCgvV2luKGRvd3MgKT8oTlQgNVxcLjF8WFApLykpIHtcbiAgICAgIF9vcyA9ICd3aW5kb3dzX3hwJztcbiAgICB9IGVsc2UgaWYgKHVzZXJBZ2VudC5tYXRjaCgvV2luKGRvd3MpPyAoOXggNFxcLjkwfE1FKS8pKSB7XG4gICAgICBfb3MgPSAnd2luZG93c19tZSc7XG4gICAgfSBlbHNlIGlmICh1c2VyQWdlbnQubWF0Y2goL1dpbihkb3dzICk/KE5UIDVcXC4wfDIwMDApLykpIHtcbiAgICAgIF9vcyA9ICd3aW5kb3dzXzIwMDAnO1xuICAgIH0gZWxzZSBpZiAodXNlckFnZW50Lm1hdGNoKC9XaW4oZG93cyApPzk4LykpIHtcbiAgICAgIF9vcyA9ICd3aW5kb3dzXzk4JztcbiAgICB9IGVsc2UgaWYgKHVzZXJBZ2VudC5tYXRjaCgvV2luKGRvd3MgKT9OVCggNFxcLjApPy8pKSB7XG4gICAgICBfb3MgPSAnd2luZG93c19udCc7XG4gICAgfSBlbHNlIGlmICh1c2VyQWdlbnQubWF0Y2goL1dpbihkb3dzICk/OTUvKSkge1xuICAgICAgX29zID0gJ3dpbmRvd3NfOTUnO1xuICAgIH0gZWxzZSBpZiAodXNlckFnZW50Lm1hdGNoKC9NYWN8UFBDLykpIHtcbiAgICAgIF9vcyA9ICdtYWNfb2MnO1xuICAgIH0gZWxzZSBpZiAodXNlckFnZW50Lm1hdGNoKC9MaW51eC8pKSB7XG4gICAgICBfb3MgPSAnbGludXgnO1xuICAgIH0gZWxzZSBpZiAodXNlckFnZW50Lm1hdGNoKC9eLipcXHMoW0EtWmEtel0rQlNEKS8pKSB7XG4gICAgICBfb3MgPSAnYnNkJztcbiAgICB9IGVsc2UgaWYgKHVzZXJBZ2VudC5tYXRjaCgvU3VuT1MvKSkge1xuICAgICAgX29zID0gJ3NvbGFyaXMnO1xuICAgIH1cblxuICAgIHJldHVybiBfb3M7XG4gIH07XG5cblxuICBzdGF0aWMgZ2V0IGlPU1ZlcnNpb24oKSB7XG4gICAgbGV0IHYsIHZlcnNpb25zID0gMDtcblxuICAgIGlmIChCcm93c2VyVXRpbC5pc2lPUykge1xuICAgICAgdiA9IChhcHBWZXJzaW9uKS5tYXRjaCgvT1MgKFxcZCspXyhcXGQrKV8/KFxcZCspPy8pO1xuICAgICAgaWYgKHYpIHtcbiAgICAgICAgdmVyc2lvbnMgPSBbcGFyc2VJbnQodlsxXSwgMTApLCBwYXJzZUludCh2WzJdLCAxMCksIHBhcnNlSW50KHZbM10gfHwgMCwgMTApXTtcbiAgICAgICAgcmV0dXJuIHZlcnNpb25zWzBdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB2ZXJzaW9ucztcbiAgfTtcblxuXG4gIHN0YXRpYyBnZXQgYW5kcm9pZFZlcnNpb24oKSB7XG4gICAgaWYgKHVzZXJBZ2VudC5pbmRleE9mKCdBbmRyb2lkJykgPiAwKSB7XG4gICAgICByZXR1cm4gcGFyc2VGbG9hdCh1c2VyQWdlbnQuc2xpY2UodXNlckFnZW50LmluZGV4T2YoJ0FuZHJvaWQnKSArIDgpKTtcbiAgICB9XG4gICAgcmV0dXJuIDA7XG4gIH07XG5cblxuICBzdGF0aWMgZ2V0TW9iaWxlVmVyc2lvbigpIHtcbiAgICB2YXIgX3ZlcnNpb24gPSAwO1xuICAgIGlmIChCcm93c2VyVXRpbC5pc0FuZHJvaWQpIHtcbiAgICAgIF92ZXJzaW9uID0gQnJvd3NlclV0aWwuYW5kcm9pZFZlcnNpb247XG4gICAgfSBlbHNlIGlmIChCcm93c2VyVXRpbC5pc2lPUykge1xuICAgICAgX3ZlcnNpb24gPSBCcm93c2VyVXRpbC5pT1NWZXJzaW9uO1xuICAgIH1cbiAgICByZXR1cm4gX3ZlcnNpb247XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHJldHVybnMge3N0cmluZ31cbiAgICovXG4gIHN0YXRpYyBnZXQgYnJvd3NlclZlcnNpb24oKSB7XG5cbiAgICB2YXIgX3ZlcnNpb24gPSAwO1xuXG4gICAgbGV0IGJyb3dzZXIgPSBCcm93c2VyVXRpbC5icm93c2VyKCk7XG5cbiAgICBzd2l0Y2ggKEJyb3dzZXJVdGlsLmRldmljZVR5cGUpIHtcbiAgICAgIGNhc2UgJ3BjJzpcbiAgICAgICAgaWYgKGJyb3dzZXIgPT09ICdvcGVyYScpIHtcbiAgICAgICAgICBfdmVyc2lvbiA9IGdldFZlcnNpb24oJ09wZXJhLycpO1xuICAgICAgICB9IGVsc2UgaWYgKGJyb3dzZXIgPT09ICdmaXJlZm94Jykge1xuICAgICAgICAgIF92ZXJzaW9uID0gZ2V0VmVyc2lvbignRmlyZWZveC8nKTtcbiAgICAgICAgfSBlbHNlIGlmIChicm93c2VyID09PSAnY2hyb21lJykge1xuICAgICAgICAgIF92ZXJzaW9uID0gZ2V0VmVyc2lvbignQ2hyb21lLycpO1xuICAgICAgICB9IGVsc2UgaWYgKGJyb3dzZXIgPT09ICdzYWZhcmknKSB7XG4gICAgICAgICAgX3ZlcnNpb24gPSBnZXRWZXJzaW9uKCdWZXJzaW9uLycpO1xuICAgICAgICB9IGVsc2UgaWYgKGJyb3dzZXIuaW5kZXhPZignaWUnKSA+IDApIHtcbiAgICAgICAgICBfdmVyc2lvbiA9IEJyb3dzZXJVdGlsLmllVmVyc2lvbjtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3Bob25lJzpcbiAgICAgICAgX3ZlcnNpb24gPSBCcm93c2VyVXRpbC5nZXRNb2JpbGVWZXJzaW9uKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAndGFibGV0JzpcbiAgICAgICAgX3ZlcnNpb24gPSBCcm93c2VyVXRpbC5nZXRNb2JpbGVWZXJzaW9uKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgcmV0dXJuIChfdmVyc2lvbiArICcnKTtcbiAgfTtcblxuXG4gIFxuICAvKipcbiAgICog44K544Kv44Ot44O844Or44OQ44O844Gu5aSq44GVXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAqL1xuICBzdGF0aWMgZ2V0IHNjcm9sbEJhcldpZHRoKCkge1xuICAgIGxldCBpbm5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICBpbm5lci5zdHlsZS53aWR0aCA9ICcxMDAlJztcbiAgICBpbm5lci5zdHlsZS5oZWlnaHQgPSAnMjAwcHgnO1xuXG4gICAgbGV0IG91dGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgb3V0ZXIuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgIG91dGVyLnN0eWxlLnRvcCA9IDA7XG4gICAgb3V0ZXIuc3R5bGUubGVmdCA9IDA7XG4gICAgb3V0ZXIuc3R5bGUudmlzaWJpbGl0eSA9ICdoaWRkZW4nO1xuICAgIG91dGVyLnN0eWxlLndpZHRoID0gJzIwMHB4JztcbiAgICBvdXRlci5zdHlsZS5oZWlnaHQgPSAnMTUwcHgnO1xuICAgIG91dGVyLnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XG4gICAgb3V0ZXIuYXBwZW5kQ2hpbGQoaW5uZXIpO1xuXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChvdXRlcik7XG4gICAgbGV0IHcxID0gaW5uZXIub2Zmc2V0V2lkdGg7XG4gICAgb3V0ZXIuc3R5bGUub3ZlcmZsb3cgPSAnc2Nyb2xsJztcbiAgICBsZXQgdzIgPSBpbm5lci5vZmZzZXRXaWR0aDtcblxuICAgIGlmICh3MSA9PT0gdzIpIHtcbiAgICAgIHcyID0gb3V0ZXIuY2xpZW50V2lkdGg7XG4gICAgfVxuXG4gICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChvdXRlcik7XG5cbiAgICByZXR1cm4gKHcxIC0gdzIpO1xuICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2NvbW1vbi9qcy9hcHAvYnJvd3Nlci9Ccm93c2VyVXRpbC5qc1xuICoqLyIsIi8qKlxuICogZmlsZU92ZXJ2aWV3OlxuICogUHJvamVjdDpcbiAqIEZpbGU6IENhbnZhc1ZpZXdcbiAqIERhdGU6IDgvMzAvMTZcbiAqIEF1dGhvcjoga29tYXRzdVxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tIFwiZXZlbnRzXCI7XG5cbi8qKiDjgqvjg7zjgr3jg6vjga7jg5fjg6zjg5XjgqPjg4Pjgq/jgrnliKTlrpogKi9cbmNvbnN0IENVUlNPUl9HUkFCID0gJ2dyYWInO1xuY29uc3QgQ1VSU09SX0dSQUJCSU5HID0gJ2dyYWJiaW5nJztcblxuXG5jb25zdCBUSEVNRV9DT0xPUiA9ICcjMzMzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FudmFzVmlldyBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG4gIGNvbnN0cnVjdG9yKGNhbnZhcykge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5fY2FudmFzID0gY2FudmFzO1xuICAgIHRoaXMuY29udGV4dCA9IHRoaXMuX2NhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgIHRoaXMuX21vZGVsID0gbnVsbDtcbiAgICB0aGlzLl9jb250cm9sbGVyID0gbnVsbDtcblxuICAgIHRoaXMudXBkYXRlSGFuZGxlciA9IHRoaXMuX3VwZGF0ZUhhbmRsZXIuYmluZCh0aGlzKTtcblxuICB9XG5cbiAgc2V0TUMobW9kZWwsIGNvbnRyb2xsZXIpIHtcbiAgICB0aGlzLl9tb2RlbCA9IG1vZGVsO1xuICAgIHRoaXMuX2NvbnRyb2xsZXIgPSBjb250cm9sbGVyO1xuICAgIHRoaXMuX2NvbnRyb2xsZXIuc2V0TVYodGhpcy5fbW9kZWwsIHRoaXMpO1xuICAgIHRoaXMuX21vZGVsLm9uKCd1cGRhdGUnLCB0aGlzLnVwZGF0ZUhhbmRsZXIpO1xuICB9XG5cbiAgLyoqIFRPRE86IOW+jOOBp0NTU+WKueOBhOOBpuOBquOBhOWOn+WboOeiuuiqjSAqL1xuICBjaGFuZ2VHcmFiKGZsYWcgPSBmYWxzZSkge1xuICAgIHRoaXMuX2NhbnZhcy5zdHlsZS5jdXJzb3IgPSAhZmxhZyA/IENVUlNPUl9HUkFCIDogQ1VSU09SX0dSQUJCSU5HO1xuICB9XG5cbiAgLyoqIOOCueODhuODvOOCuOOCkuepuuOBo+OBveOBqyAqL1xuICBjbGVhclN0YWdlKHNpemUpIHtcbiAgICB0aGlzLmNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIHNpemUud2lkdGgsIHNpemUuaGVpZ2h0KTtcbiAgfVxuXG4gIC8qKiDnuKbmqKrkuK3lv4Pnt5ogKi9cbiAgZHJhd0Nyb3NzKHNpemUpIHtcbiAgICB0aGlzLmNvbnRleHQubGluZVdpZHRoID0gMTtcbiAgICB0aGlzLmNvbnRleHQuc3Ryb2tlU3R5bGUgPSBUSEVNRV9DT0xPUjtcbiAgICB0aGlzLmNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgdGhpcy5jb250ZXh0Lm1vdmVUbyhzaXplLmNlbnRlclgsIDApO1xuICAgIHRoaXMuY29udGV4dC5saW5lVG8oc2l6ZS5jZW50ZXJYLCBzaXplLmhlaWdodCk7XG4gICAgdGhpcy5jb250ZXh0Lm1vdmVUbygwLCBzaXplLmNlbnRlclkpO1xuICAgIHRoaXMuY29udGV4dC5saW5lVG8oc2l6ZS53aWR0aCwgc2l6ZS5jZW50ZXJZKTtcbiAgICB0aGlzLmNvbnRleHQuY2xvc2VQYXRoKCk7XG4gICAgdGhpcy5jb250ZXh0LnN0cm9rZSgpO1xuICB9XG5cbiAgLyoqIOS4reW/g+OBrueCue+8iOOBhOOCieOBquOBhOOBi+OCgu+8n++8iSAqL1xuICBkcmF3Q2VudGVyRG90KHNpemUpIHtcbiAgICB0aGlzLmNvbnRleHQuc3Ryb2tlU3R5bGUgPSBUSEVNRV9DT0xPUjtcbiAgICB0aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gVEhFTUVfQ09MT1I7XG4gICAgdGhpcy5jb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgIHRoaXMuY29udGV4dC5hcmMoc2l6ZS5jZW50ZXJYLCBzaXplLmNlbnRlclksIDIsIDAsIDIgKiBNYXRoLlBJLCB0cnVlKTtcbiAgICB0aGlzLmNvbnRleHQuZmlsbCgpO1xuICB9XG5cblxuICAvKiog5Lit5b+D44GL44KJ44K/44O844Ky44OD44OI44KS57WQ44G25pac57eaICovXG4gIGRyYXdUYXJnZXRGb2xsb3dMaW5lKHNpemUpIHtcbiAgICB0aGlzLmNvbnRleHQubGluZVdpZHRoID0gMTtcbiAgICB0aGlzLmNvbnRleHQuc3Ryb2tlU3R5bGUgPSBUSEVNRV9DT0xPUjtcbiAgICB0aGlzLmNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgdGhpcy5jb250ZXh0Lm1vdmVUbyhzaXplLmNlbnRlclgsIHNpemUuY2VudGVyWSk7XG4gICAgdGhpcy5jb250ZXh0LmxpbmVUbyhzaXplLngsIHNpemUueSk7XG4gICAgdGhpcy5jb250ZXh0LmNsb3NlUGF0aCgpO1xuICAgIHRoaXMuY29udGV4dC5zdHJva2UoKTtcbiAgfVxuXG4gIC8qKiDjg4njg6njg4PjgrDjgr/jg7zjgrLjg4Pjg4ggKi9cbiAgZHJhd1RhcmdldChzaXplKSB7XG4gICAgdGhpcy5jb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgIHRoaXMuY29udGV4dC5hcmMoc2l6ZS54LCBzaXplLnksIHNpemUuc2l6ZSwgMCwgMiAqIE1hdGguUEksIHRydWUpO1xuICAgIHRoaXMuY29udGV4dC5zdHJva2UoKTtcbiAgICB0aGlzLmNvbnRleHQuZmlsbCgpO1xuICB9XG5cbiAgLyoqIOOCv+ODvOOCsuODg+ODiOOBi+OCiee4puS4reW/g+e3muOCkue1kOOBtue4pue3miAqL1xuICBkcmF3VkxpbmUoc2l6ZSkge1xuICAgIHRoaXMuY29udGV4dC5saW5lV2lkdGggPSAxO1xuICAgIHRoaXMuY29udGV4dC5zdHJva2VTdHlsZSA9IFRIRU1FX0NPTE9SO1xuICAgIHRoaXMuY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICB0aGlzLmNvbnRleHQubW92ZVRvKHNpemUueCwgc2l6ZS5jZW50ZXJZKTtcbiAgICB0aGlzLmNvbnRleHQubGluZVRvKHNpemUueCwgc2l6ZS55KTtcbiAgICB0aGlzLmNvbnRleHQuY2xvc2VQYXRoKCk7XG4gICAgdGhpcy5jb250ZXh0LnN0cm9rZSgpO1xuICB9XG5cblxuICAvKiog44K/44O844Ky44OD44OI44Go5Lit5b+D54K544KS57WQ44G25pac57ea44GM5Y2K5b6E44Gu5YaGICovXG4gIGRyYXdUYXJnZXRBcm91bmRDaXJjbGUoc2l6ZSkge1xuICAgIHRoaXMuY29udGV4dC5saW5lV2lkdGggPSAxO1xuICAgIHRoaXMuY29udGV4dC5zdHJva2VTdHlsZSA9IFRIRU1FX0NPTE9SO1xuICAgIHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSBUSEVNRV9DT0xPUjtcbiAgICB0aGlzLmNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgdGhpcy5jb250ZXh0LmFyYyhzaXplLmNlbnRlclgsIHNpemUuY2VudGVyWSwgc2l6ZS5oeXBvdGVudXNlLCAwLCAyICogTWF0aC5QSSwgdHJ1ZSk7XG4gICAgdGhpcy5jb250ZXh0LnN0cm9rZSgpO1xuICB9XG5cblxuICAvKiog5Lit5b+D57ea44Go44K/44O844Ky44OD44OI44Od44Kk44Oz44OI44Gu55u06KeS44KS57WQ44G2ICovXG4gIGRyYXdEZWdyZWUoc2l6ZSkge1xuICAgIHRoaXMuY29udGV4dC5saW5lV2lkdGggPSAxO1xuICAgIHRoaXMuY29udGV4dC5zdHJva2VTdHlsZSA9IFRIRU1FX0NPTE9SO1xuICAgIHRoaXMuY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICB0aGlzLmNvbnRleHQubW92ZVRvKHNpemUueCArIDEwLCBzaXplLmNlbnRlclkpO1xuICAgIHRoaXMuY29udGV4dC5saW5lVG8oc2l6ZS54ICsgMTAsIHNpemUuY2VudGVyWSAtIDEwKTtcbiAgICB0aGlzLmNvbnRleHQuY2xvc2VQYXRoKCk7XG4gICAgdGhpcy5jb250ZXh0LnN0cm9rZSgpO1xuICAgIHRoaXMuY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICB0aGlzLmNvbnRleHQubW92ZVRvKHNpemUueCwgc2l6ZS5jZW50ZXJZIC0gMTApO1xuICAgIHRoaXMuY29udGV4dC5saW5lVG8oc2l6ZS54ICsgMTAsIHNpemUuY2VudGVyWSAtIDEwKTtcbiAgICB0aGlzLmNvbnRleHQuY2xvc2VQYXRoKCk7XG4gICAgdGhpcy5jb250ZXh0LnN0cm9rZSgpO1xuICB9XG5cblxuICAvKiog6KeS5bqm44KS6KGo56S644GX44Gf5YaGICovXG4gIGRyYXdSb3RhdGUoc2l6ZSkge1xuICAgIHRoaXMuY29udGV4dC5saW5lV2lkdGggPSAxO1xuICAgIHRoaXMuY29udGV4dC5zdHJva2VTdHlsZSA9IFRIRU1FX0NPTE9SO1xuICAgIHRoaXMuY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICB0aGlzLmNvbnRleHQubW92ZVRvKHNpemUuY2VudGVyWCwgc2l6ZS5jZW50ZXJZKTtcbiAgICB0aGlzLmNvbnRleHQuYXJjKHNpemUuY2VudGVyWCwgc2l6ZS5jZW50ZXJZLCA1MCwgc2l6ZS5kZWdyZWUsIDkwIC8gMTgwICogTWF0aC5QSSwpO1xuICAgIHRoaXMuY29udGV4dC5maWxsKCk7XG4gIH1cblxuXG4gIGRyYXcoKSB7XG4gICAgbGV0IHNpemUgPSB0aGlzLl9tb2RlbC5nZXREYXRhKCk7XG4gICAgdGhpcy5jbGVhclN0YWdlKHNpemUpO1xuICAgIHRoaXMuZHJhd0Nyb3NzKHNpemUpO1xuICAgIHRoaXMuZHJhd0NlbnRlckRvdChzaXplKTtcbiAgICB0aGlzLmRyYXdUYXJnZXRGb2xsb3dMaW5lKHNpemUpO1xuICAgIHRoaXMuZHJhd1ZMaW5lKHNpemUpO1xuICAgIHRoaXMuZHJhd0RlZ3JlZShzaXplKTtcbiAgICB0aGlzLmRyYXdSb3RhdGUoc2l6ZSk7XG4gICAgdGhpcy5kcmF3VGFyZ2V0QXJvdW5kQ2lyY2xlKHNpemUpO1xuICAgIHRoaXMuZHJhd1RhcmdldChzaXplKTtcbiAgfVxuXG4gIF91cGRhdGVIYW5kbGVyKGV2ZW50KSB7XG4gICAgdGhpcy5kcmF3KCk7XG4gIH1cbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3BjL2pzL3ZpZXdzL0NhbnZhc1ZpZXcuanNcbiAqKi8iLCIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuZnVuY3Rpb24gRXZlbnRFbWl0dGVyKCkge1xuICB0aGlzLl9ldmVudHMgPSB0aGlzLl9ldmVudHMgfHwge307XG4gIHRoaXMuX21heExpc3RlbmVycyA9IHRoaXMuX21heExpc3RlbmVycyB8fCB1bmRlZmluZWQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IEV2ZW50RW1pdHRlcjtcblxuLy8gQmFja3dhcmRzLWNvbXBhdCB3aXRoIG5vZGUgMC4xMC54XG5FdmVudEVtaXR0ZXIuRXZlbnRFbWl0dGVyID0gRXZlbnRFbWl0dGVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9ldmVudHMgPSB1bmRlZmluZWQ7XG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9tYXhMaXN0ZW5lcnMgPSB1bmRlZmluZWQ7XG5cbi8vIEJ5IGRlZmF1bHQgRXZlbnRFbWl0dGVycyB3aWxsIHByaW50IGEgd2FybmluZyBpZiBtb3JlIHRoYW4gMTAgbGlzdGVuZXJzIGFyZVxuLy8gYWRkZWQgdG8gaXQuIFRoaXMgaXMgYSB1c2VmdWwgZGVmYXVsdCB3aGljaCBoZWxwcyBmaW5kaW5nIG1lbW9yeSBsZWFrcy5cbkV2ZW50RW1pdHRlci5kZWZhdWx0TWF4TGlzdGVuZXJzID0gMTA7XG5cbi8vIE9idmlvdXNseSBub3QgYWxsIEVtaXR0ZXJzIHNob3VsZCBiZSBsaW1pdGVkIHRvIDEwLiBUaGlzIGZ1bmN0aW9uIGFsbG93c1xuLy8gdGhhdCB0byBiZSBpbmNyZWFzZWQuIFNldCB0byB6ZXJvIGZvciB1bmxpbWl0ZWQuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnNldE1heExpc3RlbmVycyA9IGZ1bmN0aW9uKG4pIHtcbiAgaWYgKCFpc051bWJlcihuKSB8fCBuIDwgMCB8fCBpc05hTihuKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ24gbXVzdCBiZSBhIHBvc2l0aXZlIG51bWJlcicpO1xuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSBuO1xuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgdmFyIGVyLCBoYW5kbGVyLCBsZW4sIGFyZ3MsIGksIGxpc3RlbmVycztcblxuICBpZiAoIXRoaXMuX2V2ZW50cylcbiAgICB0aGlzLl9ldmVudHMgPSB7fTtcblxuICAvLyBJZiB0aGVyZSBpcyBubyAnZXJyb3InIGV2ZW50IGxpc3RlbmVyIHRoZW4gdGhyb3cuXG4gIGlmICh0eXBlID09PSAnZXJyb3InKSB7XG4gICAgaWYgKCF0aGlzLl9ldmVudHMuZXJyb3IgfHxcbiAgICAgICAgKGlzT2JqZWN0KHRoaXMuX2V2ZW50cy5lcnJvcikgJiYgIXRoaXMuX2V2ZW50cy5lcnJvci5sZW5ndGgpKSB7XG4gICAgICBlciA9IGFyZ3VtZW50c1sxXTtcbiAgICAgIGlmIChlciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgIHRocm93IGVyOyAvLyBVbmhhbmRsZWQgJ2Vycm9yJyBldmVudFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gQXQgbGVhc3QgZ2l2ZSBzb21lIGtpbmQgb2YgY29udGV4dCB0byB0aGUgdXNlclxuICAgICAgICB2YXIgZXJyID0gbmV3IEVycm9yKCdVbmNhdWdodCwgdW5zcGVjaWZpZWQgXCJlcnJvclwiIGV2ZW50LiAoJyArIGVyICsgJyknKTtcbiAgICAgICAgZXJyLmNvbnRleHQgPSBlcjtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGhhbmRsZXIgPSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgaWYgKGlzVW5kZWZpbmVkKGhhbmRsZXIpKVxuICAgIHJldHVybiBmYWxzZTtcblxuICBpZiAoaXNGdW5jdGlvbihoYW5kbGVyKSkge1xuICAgIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgLy8gZmFzdCBjYXNlc1xuICAgICAgY2FzZSAxOlxuICAgICAgICBoYW5kbGVyLmNhbGwodGhpcyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAyOlxuICAgICAgICBoYW5kbGVyLmNhbGwodGhpcywgYXJndW1lbnRzWzFdKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDM6XG4gICAgICAgIGhhbmRsZXIuY2FsbCh0aGlzLCBhcmd1bWVudHNbMV0sIGFyZ3VtZW50c1syXSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgLy8gc2xvd2VyXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgICAgICAgaGFuZGxlci5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoaXNPYmplY3QoaGFuZGxlcikpIHtcbiAgICBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgICBsaXN0ZW5lcnMgPSBoYW5kbGVyLnNsaWNlKCk7XG4gICAgbGVuID0gbGlzdGVuZXJzLmxlbmd0aDtcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspXG4gICAgICBsaXN0ZW5lcnNbaV0uYXBwbHkodGhpcywgYXJncyk7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXIgPSBmdW5jdGlvbih0eXBlLCBsaXN0ZW5lcikge1xuICB2YXIgbTtcblxuICBpZiAoIWlzRnVuY3Rpb24obGlzdGVuZXIpKVxuICAgIHRocm93IFR5cGVFcnJvcignbGlzdGVuZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMpXG4gICAgdGhpcy5fZXZlbnRzID0ge307XG5cbiAgLy8gVG8gYXZvaWQgcmVjdXJzaW9uIGluIHRoZSBjYXNlIHRoYXQgdHlwZSA9PT0gXCJuZXdMaXN0ZW5lclwiISBCZWZvcmVcbiAgLy8gYWRkaW5nIGl0IHRvIHRoZSBsaXN0ZW5lcnMsIGZpcnN0IGVtaXQgXCJuZXdMaXN0ZW5lclwiLlxuICBpZiAodGhpcy5fZXZlbnRzLm5ld0xpc3RlbmVyKVxuICAgIHRoaXMuZW1pdCgnbmV3TGlzdGVuZXInLCB0eXBlLFxuICAgICAgICAgICAgICBpc0Z1bmN0aW9uKGxpc3RlbmVyLmxpc3RlbmVyKSA/XG4gICAgICAgICAgICAgIGxpc3RlbmVyLmxpc3RlbmVyIDogbGlzdGVuZXIpO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzW3R5cGVdKVxuICAgIC8vIE9wdGltaXplIHRoZSBjYXNlIG9mIG9uZSBsaXN0ZW5lci4gRG9uJ3QgbmVlZCB0aGUgZXh0cmEgYXJyYXkgb2JqZWN0LlxuICAgIHRoaXMuX2V2ZW50c1t0eXBlXSA9IGxpc3RlbmVyO1xuICBlbHNlIGlmIChpc09iamVjdCh0aGlzLl9ldmVudHNbdHlwZV0pKVxuICAgIC8vIElmIHdlJ3ZlIGFscmVhZHkgZ290IGFuIGFycmF5LCBqdXN0IGFwcGVuZC5cbiAgICB0aGlzLl9ldmVudHNbdHlwZV0ucHVzaChsaXN0ZW5lcik7XG4gIGVsc2VcbiAgICAvLyBBZGRpbmcgdGhlIHNlY29uZCBlbGVtZW50LCBuZWVkIHRvIGNoYW5nZSB0byBhcnJheS5cbiAgICB0aGlzLl9ldmVudHNbdHlwZV0gPSBbdGhpcy5fZXZlbnRzW3R5cGVdLCBsaXN0ZW5lcl07XG5cbiAgLy8gQ2hlY2sgZm9yIGxpc3RlbmVyIGxlYWtcbiAgaWYgKGlzT2JqZWN0KHRoaXMuX2V2ZW50c1t0eXBlXSkgJiYgIXRoaXMuX2V2ZW50c1t0eXBlXS53YXJuZWQpIHtcbiAgICBpZiAoIWlzVW5kZWZpbmVkKHRoaXMuX21heExpc3RlbmVycykpIHtcbiAgICAgIG0gPSB0aGlzLl9tYXhMaXN0ZW5lcnM7XG4gICAgfSBlbHNlIHtcbiAgICAgIG0gPSBFdmVudEVtaXR0ZXIuZGVmYXVsdE1heExpc3RlbmVycztcbiAgICB9XG5cbiAgICBpZiAobSAmJiBtID4gMCAmJiB0aGlzLl9ldmVudHNbdHlwZV0ubGVuZ3RoID4gbSkge1xuICAgICAgdGhpcy5fZXZlbnRzW3R5cGVdLndhcm5lZCA9IHRydWU7XG4gICAgICBjb25zb2xlLmVycm9yKCcobm9kZSkgd2FybmluZzogcG9zc2libGUgRXZlbnRFbWl0dGVyIG1lbW9yeSAnICtcbiAgICAgICAgICAgICAgICAgICAgJ2xlYWsgZGV0ZWN0ZWQuICVkIGxpc3RlbmVycyBhZGRlZC4gJyArXG4gICAgICAgICAgICAgICAgICAgICdVc2UgZW1pdHRlci5zZXRNYXhMaXN0ZW5lcnMoKSB0byBpbmNyZWFzZSBsaW1pdC4nLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9ldmVudHNbdHlwZV0ubGVuZ3RoKTtcbiAgICAgIGlmICh0eXBlb2YgY29uc29sZS50cmFjZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAvLyBub3Qgc3VwcG9ydGVkIGluIElFIDEwXG4gICAgICAgIGNvbnNvbGUudHJhY2UoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub24gPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbih0eXBlLCBsaXN0ZW5lcikge1xuICBpZiAoIWlzRnVuY3Rpb24obGlzdGVuZXIpKVxuICAgIHRocm93IFR5cGVFcnJvcignbGlzdGVuZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG5cbiAgdmFyIGZpcmVkID0gZmFsc2U7XG5cbiAgZnVuY3Rpb24gZygpIHtcbiAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGcpO1xuXG4gICAgaWYgKCFmaXJlZCkge1xuICAgICAgZmlyZWQgPSB0cnVlO1xuICAgICAgbGlzdGVuZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9XG4gIH1cblxuICBnLmxpc3RlbmVyID0gbGlzdGVuZXI7XG4gIHRoaXMub24odHlwZSwgZyk7XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vLyBlbWl0cyBhICdyZW1vdmVMaXN0ZW5lcicgZXZlbnQgaWZmIHRoZSBsaXN0ZW5lciB3YXMgcmVtb3ZlZFxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lciA9IGZ1bmN0aW9uKHR5cGUsIGxpc3RlbmVyKSB7XG4gIHZhciBsaXN0LCBwb3NpdGlvbiwgbGVuZ3RoLCBpO1xuXG4gIGlmICghaXNGdW5jdGlvbihsaXN0ZW5lcikpXG4gICAgdGhyb3cgVHlwZUVycm9yKCdsaXN0ZW5lciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcblxuICBpZiAoIXRoaXMuX2V2ZW50cyB8fCAhdGhpcy5fZXZlbnRzW3R5cGVdKVxuICAgIHJldHVybiB0aGlzO1xuXG4gIGxpc3QgPSB0aGlzLl9ldmVudHNbdHlwZV07XG4gIGxlbmd0aCA9IGxpc3QubGVuZ3RoO1xuICBwb3NpdGlvbiA9IC0xO1xuXG4gIGlmIChsaXN0ID09PSBsaXN0ZW5lciB8fFxuICAgICAgKGlzRnVuY3Rpb24obGlzdC5saXN0ZW5lcikgJiYgbGlzdC5saXN0ZW5lciA9PT0gbGlzdGVuZXIpKSB7XG4gICAgZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgICBpZiAodGhpcy5fZXZlbnRzLnJlbW92ZUxpc3RlbmVyKVxuICAgICAgdGhpcy5lbWl0KCdyZW1vdmVMaXN0ZW5lcicsIHR5cGUsIGxpc3RlbmVyKTtcblxuICB9IGVsc2UgaWYgKGlzT2JqZWN0KGxpc3QpKSB7XG4gICAgZm9yIChpID0gbGVuZ3RoOyBpLS0gPiAwOykge1xuICAgICAgaWYgKGxpc3RbaV0gPT09IGxpc3RlbmVyIHx8XG4gICAgICAgICAgKGxpc3RbaV0ubGlzdGVuZXIgJiYgbGlzdFtpXS5saXN0ZW5lciA9PT0gbGlzdGVuZXIpKSB7XG4gICAgICAgIHBvc2l0aW9uID0gaTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHBvc2l0aW9uIDwgMClcbiAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgaWYgKGxpc3QubGVuZ3RoID09PSAxKSB7XG4gICAgICBsaXN0Lmxlbmd0aCA9IDA7XG4gICAgICBkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO1xuICAgIH0gZWxzZSB7XG4gICAgICBsaXN0LnNwbGljZShwb3NpdGlvbiwgMSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2V2ZW50cy5yZW1vdmVMaXN0ZW5lcilcbiAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBsaXN0ZW5lcik7XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlQWxsTGlzdGVuZXJzID0gZnVuY3Rpb24odHlwZSkge1xuICB2YXIga2V5LCBsaXN0ZW5lcnM7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMpXG4gICAgcmV0dXJuIHRoaXM7XG5cbiAgLy8gbm90IGxpc3RlbmluZyBmb3IgcmVtb3ZlTGlzdGVuZXIsIG5vIG5lZWQgdG8gZW1pdFxuICBpZiAoIXRoaXMuX2V2ZW50cy5yZW1vdmVMaXN0ZW5lcikge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKVxuICAgICAgdGhpcy5fZXZlbnRzID0ge307XG4gICAgZWxzZSBpZiAodGhpcy5fZXZlbnRzW3R5cGVdKVxuICAgICAgZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vIGVtaXQgcmVtb3ZlTGlzdGVuZXIgZm9yIGFsbCBsaXN0ZW5lcnMgb24gYWxsIGV2ZW50c1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgIGZvciAoa2V5IGluIHRoaXMuX2V2ZW50cykge1xuICAgICAgaWYgKGtleSA9PT0gJ3JlbW92ZUxpc3RlbmVyJykgY29udGludWU7XG4gICAgICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycyhrZXkpO1xuICAgIH1cbiAgICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycygncmVtb3ZlTGlzdGVuZXInKTtcbiAgICB0aGlzLl9ldmVudHMgPSB7fTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50c1t0eXBlXTtcblxuICBpZiAoaXNGdW5jdGlvbihsaXN0ZW5lcnMpKSB7XG4gICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcnMpO1xuICB9IGVsc2UgaWYgKGxpc3RlbmVycykge1xuICAgIC8vIExJRk8gb3JkZXJcbiAgICB3aGlsZSAobGlzdGVuZXJzLmxlbmd0aClcbiAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXJzW2xpc3RlbmVycy5sZW5ndGggLSAxXSk7XG4gIH1cbiAgZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtcblxuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJzID0gZnVuY3Rpb24odHlwZSkge1xuICB2YXIgcmV0O1xuICBpZiAoIXRoaXMuX2V2ZW50cyB8fCAhdGhpcy5fZXZlbnRzW3R5cGVdKVxuICAgIHJldCA9IFtdO1xuICBlbHNlIGlmIChpc0Z1bmN0aW9uKHRoaXMuX2V2ZW50c1t0eXBlXSkpXG4gICAgcmV0ID0gW3RoaXMuX2V2ZW50c1t0eXBlXV07XG4gIGVsc2VcbiAgICByZXQgPSB0aGlzLl9ldmVudHNbdHlwZV0uc2xpY2UoKTtcbiAgcmV0dXJuIHJldDtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJDb3VudCA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgaWYgKHRoaXMuX2V2ZW50cykge1xuICAgIHZhciBldmxpc3RlbmVyID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuXG4gICAgaWYgKGlzRnVuY3Rpb24oZXZsaXN0ZW5lcikpXG4gICAgICByZXR1cm4gMTtcbiAgICBlbHNlIGlmIChldmxpc3RlbmVyKVxuICAgICAgcmV0dXJuIGV2bGlzdGVuZXIubGVuZ3RoO1xuICB9XG4gIHJldHVybiAwO1xufTtcblxuRXZlbnRFbWl0dGVyLmxpc3RlbmVyQ291bnQgPSBmdW5jdGlvbihlbWl0dGVyLCB0eXBlKSB7XG4gIHJldHVybiBlbWl0dGVyLmxpc3RlbmVyQ291bnQodHlwZSk7XG59O1xuXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ2Z1bmN0aW9uJztcbn1cblxuZnVuY3Rpb24gaXNOdW1iZXIoYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnbnVtYmVyJztcbn1cblxuZnVuY3Rpb24gaXNPYmplY3QoYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnb2JqZWN0JyAmJiBhcmcgIT09IG51bGw7XG59XG5cbmZ1bmN0aW9uIGlzVW5kZWZpbmVkKGFyZykge1xuICByZXR1cm4gYXJnID09PSB2b2lkIDA7XG59XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9ldmVudHMvZXZlbnRzLmpzXG4gKiogbW9kdWxlIGlkID0gMzFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKlxuICogZmlsZU92ZXJ2aWV3OlxuICogUHJvamVjdDpcbiAqIEZpbGU6IENhbnZhc01vZGVsXG4gKiBEYXRlOiA4LzMwLzE2XG4gKiBBdXRob3I6IGtvbWF0c3VcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbmltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSBcImV2ZW50c1wiO1xuaW1wb3J0IFdpbmRvd1V0aWwgZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9qcy9hcHAvYnJvd3Nlci9XaW5kb3dVdGlsXCI7XG5pbXBvcnQgTWF0aFRyaWcgZnJvbSBcIi4uL3V0aWxzL01hdGhUcmlnXCI7XG5cbmNvbnN0IERFRkFVTFRfWCA9IDEwMDtcblxuY29uc3QgREVGQVVMVF9ZID0gMTAwO1xuXG5jb25zdCBDSVJDTEVfU0laRSA9IDE1O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYW52YXNNb2RlbCBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLmNpcmNsZVNpemUgPSBDSVJDTEVfU0laRTtcbiAgICB0aGlzLmhhbGZTaXplID0gdGhpcy5jaXJjbGVTaXplICogLjU7XG5cbiAgICB0aGlzLndpZHRoID0gMDtcbiAgICB0aGlzLmhlaWdodCA9IDA7XG4gICAgdGhpcy5jZW50ZXJYID0gMDtcbiAgICB0aGlzLmNlbnRlclkgPSAwO1xuXG4gICAgdGhpcy54ID0gREVGQVVMVF9YO1xuICAgIHRoaXMueSA9IERFRkFVTFRfWTtcbiAgICB0aGlzLl94ID0gdGhpcy54O1xuICAgIHRoaXMuX3kgPSB0aGlzLnk7XG5cbiAgICB0aGlzLmRlZ3JlZSA9IDA7XG4gICAgdGhpcy5yYWRpYW4gPSAwO1xuICAgIHRoaXMuaHlwb3RlbnVzZSA9IDA7XG5cbiAgICB0aGlzLnVwZGF0ZSgpO1xuXG4gIH1cblxuICB1cGRhdGUoKSB7XG4gICAgbGV0IHNpemUgPSBXaW5kb3dVdGlsLmdldFNjcmVlblNpemUoKTtcbiAgICB0aGlzLnVwZGF0ZVNpemUoc2l6ZSk7XG4gICAgdGhpcy51cGRhdGVEYXRhKCk7XG4gICAgdGhpcy5lbWl0KCd1cGRhdGUnLCB0aGlzLmdldERhdGEoKSk7XG4gIH1cblxuICB1cGRhdGVTaXplKHNpemUpIHtcbiAgICB0aGlzLndpZHRoID0gc2l6ZS53aWR0aDtcbiAgICB0aGlzLmhlaWdodCA9IHNpemUuaGVpZ2h0O1xuICAgIHRoaXMuY2VudGVyWCA9IHRoaXMud2lkdGggKiAuNTtcbiAgICB0aGlzLmNlbnRlclkgPSB0aGlzLmhlaWdodCAqIC41O1xuICAgIHRoaXMuX3ggPSB0aGlzLnggKyB0aGlzLmNlbnRlclg7XG4gICAgdGhpcy5feSA9IHRoaXMueSAqIC0xICsgdGhpcy5jZW50ZXJZO1xuICB9XG5cblxuICB1cGRhdGVEYXRhKCkge1xuICAgIHRoaXMucmFkaWFuID0gTWF0aC5hdGFuMih0aGlzLnksIHRoaXMueCk7XG4gICAgdGhpcy5kZWdyZWUgPSB0aGlzLnJhZGlhbiAqIDE4MCAvIE1hdGguUEk7XG4gICAgdGhpcy5oeXBvdGVudXNlID0gTWF0aFRyaWcuZ2V0SHlwb3RlbnVzZUZyb21CYUhlKHRoaXMueCwgdGhpcy55KTtcbiAgfTtcblxuXG4gIGdldERhdGEoKSB7XG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHtcbiAgICAgIHdpZHRoOiB0aGlzLndpZHRoLFxuICAgICAgaGVpZ2h0OiB0aGlzLmhlaWdodCxcbiAgICAgIGNlbnRlclg6IHRoaXMuY2VudGVyWCxcbiAgICAgIGNlbnRlclk6IHRoaXMuY2VudGVyWSxcbiAgICAgIHNpemU6IHRoaXMuY2lyY2xlU2l6ZSxcbiAgICAgIGhhbGY6IHRoaXMuaGFsZlNpemUsXG4gICAgICByYWRpYW46IHRoaXMucmFkaWFuLFxuICAgICAgZGVncmVlOiB0aGlzLmRlZ3JlZSxcbiAgICAgIGh5cG90ZW51c2U6IHRoaXMuaHlwb3RlbnVzZSxcbiAgICAgIHg6IHRoaXMuX3gsXG4gICAgICB5OiB0aGlzLl95XG4gICAgfSk7XG4gIH1cblxuXG4gIG1vdmUocG9zKSB7XG4gICAgdGhpcy5feCA9IHBvcy54O1xuICAgIHRoaXMuX3kgPSBwb3MueTtcbiAgICB0aGlzLnggPSB0aGlzLmNlbnRlclggLSBwb3MueDtcbiAgICB0aGlzLnkgPSB0aGlzLmNlbnRlclkgLSBwb3MueTtcbiAgICB0aGlzLnVwZGF0ZURhdGEoKTtcbiAgICB0aGlzLmVtaXQoJ3VwZGF0ZScsIHRoaXMuZ2V0RGF0YSgpKTtcbiAgfVxuXG5cblxuICBpbmNsdWRlVGFyZ2V0KHBvcykge1xuICAgIHJldHVybiAocG9zLnggPj0gKHRoaXMuX3ggLSB0aGlzLmhhbGZTaXplKSkgJiZcbiAgICAgICAgICAgKHBvcy55ID49ICh0aGlzLl95IC0gdGhpcy5oYWxmU2l6ZSkpICYmXG4gICAgICAgICAgIChwb3MueCA8PSAodGhpcy5feCArIHRoaXMuaGFsZlNpemUpKSAmJlxuICAgICAgICAgICAocG9zLnkgPD0gKHRoaXMuX3kgKyB0aGlzLmhhbGZTaXplKSk7XG4gIH1cbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3BjL2pzL21vZGVsbHMvQ2FudmFzTW9kZWwuanNcbiAqKi8iLCIvKipcbiAqIGZpbGVPdmVydmlldzpcbiAqIFByb2plY3Q6XG4gKiBGaWxlOiBNYXRoVHJpZ1xuICogRGF0ZTogOC8zMC8xNlxuICogQXV0aG9yOiBrb21hdHN1XG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1hdGhUcmlnIHtcblxuICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAqIOinkuW6puOCkuaxguOCgeOCi1xuICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICAvLyDluqbmlbDjgYvjgonjg6njgrjjgqLjg7PjgpLlj5blvpdcbiAgc3RhdGljICBnZXRSYWRpYW4oYW5nbGUpIHtcbiAgICByZXR1cm4gYW5nbGUgKiBNYXRoLlBJIC8gMTgwO1xuICB9O1xuXG4gIC8vIOODqeOCuOOCouODs+OBi+OCieW6puaVsOOCkuWPluW+l1xuICBzdGF0aWMgIGdldERlZ3JlZShyYWRpYW4pIHtcbiAgICByZXR1cm4gcmFkaWFuICogMTgwIC8gTWF0aC5QSTtcbiAgfTtcblxuICAvLyDlupXovrrjgajpq5jjgZXjgYvjgolcbiAgc3RhdGljIGdldEFuZ2xlRnJvbUJhSGUoYmFzZSwgaGVpZ2h0KSB7XG4gICAgcmV0dXJuIE1hdGguYXRhbjIoaGVpZ2h0LCBiYXNlKTtcbiAgfTtcblxuICAvLyDlupXovrrjgajmlpzovrrjgYvjgolcbiAgc3RhdGljIGdldEFuZ2xlRnJvbUJhSHkoYmFzZSwgaHlwb3RlbnVzZSkge1xuICAgIHJldHVybiBNYXRoLmFjb3MoYmFzZSAvIGh5cG90ZW51c2UpO1xuICB9O1xuXG4gIC8vIOmrmOOBleOBqOaWnOi+uuOBi+OCiVxuICBzdGF0aWMgZ2V0QW5nbGVGcm9tSGVIeShoZWlnaHQsIGh5cG90ZW51c2UpIHtcbiAgICByZXR1cm4gTWF0aC5hc2luKGhlaWdodCAvIGh5cG90ZW51c2UpO1xuICB9O1xuXG5cbiAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgKiDmlpzovrrjgpLmsYLjgoHjgotcbiAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgLy8g5bqV6L6644Go6KeS5bqm44GL44KJXG4gIHN0YXRpYyBnZXRIeXBvdGVudXNlRnJvbUJhQW4oYmFzZSwgYW5nbGUpIHtcbiAgICByZXR1cm4gYmFzZSAvIE1hdGguc2luKGFuZ2xlKTtcbiAgfTtcblxuICAvLyDpq5jjgZXjgajop5LluqbjgYvjgolcbiAgc3RhdGljIGdldEh5cG90ZW51c2VGcm9tSGVBbihoZWlnaHQsIGFuZ2xlKSB7XG4gICAgcmV0dXJuIGhlaWdodCAvIE1hdGguc2luKGFuZ2xlKTtcbiAgfTtcblxuICAvLyDlupXovrrjgajpq5jjgZXjgYvjgolcbiAgc3RhdGljIGdldEh5cG90ZW51c2VGcm9tQmFIZShiYXNlLCBoZWlnaHQpIHtcbiAgICByZXR1cm4gTWF0aC5zcXJ0KE1hdGgucG93KGJhc2UsIDIpICsgTWF0aC5wb3coaGVpZ2h0LCAyKSk7XG4gIH07XG5cbiAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgKiDpq5jjgZXjgpLmsYLjgoHjgotcbiAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgLy8g5bqV6L6644Go6KeS5bqm44GL44KJXG4gIHN0YXRpYyBnZXRIZWlnaHRGcm9tQmFBbihiYXNlLCBhbmdsZSkge1xuICAgIHJldHVybiBiYXNlICogTWF0aC50YW4oYW5nbGUpO1xuICB9O1xuXG4gIC8vIOaWnOi+uuOBqOinkuW6puOBi+OCiVxuICBzdGF0aWMgZ2V0SGVpZ2h0RnJvbUh5QW4oaHlwb3RlbnVzZSwgYW5nbGUpIHtcbiAgICByZXR1cm4gaHlwb3RlbnVzZSAqIE1hdGguc2luKGFuZ2xlKTtcbiAgfTtcblxuICAvLyDlupXovrrjgajmlpzovrrjgYvjgolcbiAgc3RhdGljIGdldEhlaWdodEZyb21CYUh5KGJhc2UsIGh5cG90ZW51c2UpIHtcbiAgICByZXR1cm4gTWF0aC5zcXJ0KE1hdGgucG93KGh5cG90ZW51c2UsIDIpIC0gTWF0aC5wb3coYmFzZSwgMikpO1xuICB9O1xuXG4gIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICog5bqV6L6644KS5rGC44KB44KLXG4gICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gIC8vIOmrmOOBleOBqOinkuW6puOBi+OCiVxuICBzdGF0aWMgZ2V0QmFzZUZyb21IZUFuKGhlaWdodCwgYW5nbGUpIHtcbiAgICByZXR1cm4gaGVpZ2h0IC8gTWF0aC50YW4oYW5nbGUpO1xuICB9O1xuXG4gIC8vIOaWnOi+uuOBqOinkuW6puOBi+OCiVxuICBzdGF0aWMgZ2V0QmFzZUZyb21IeUFuKGh5cG90ZW51c2UsIGFuZ2xlKSB7XG4gICAgcmV0dXJuIGh5cG90ZW51c2UgKiBNYXRoLmNvcyhhbmdsZSk7XG4gIH07XG5cbiAgLy8g6auY44GV44Go5pac6L6644GL44KJXG4gIHN0YXRpYyBnZXRCYXNlRnJvbUhlSHkoaGVpZ2h0LCBoeXBvdGVudXNlKSB7XG4gICAgcmV0dXJuIE1hdGguc3FydChNYXRoLnBvdyhoeXBvdGVudXNlLCAyKSAtIE1hdGgucG93KGhlaWdodCwgMikpO1xuICB9O1xufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vcGMvanMvdXRpbHMvTWF0aFRyaWcuanNcbiAqKi8iLCIvKipcbiAqIGZpbGVPdmVydmlldzpcbiAqIFByb2plY3Q6XG4gKiBGaWxlOiBDYW52YXNDb250cm9sbGVyXG4gKiBEYXRlOiA4LzMwLzE2XG4gKiBBdXRob3I6IGtvbWF0c3VcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cblxuaW1wb3J0IERPTVV0aWwgZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9qcy9hcHAvYnJvd3Nlci9ET01VdGlsXCI7XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FudmFzQ29udHJvbGxlciB7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5fbW9kZWwgPSBudWxsO1xuICAgIHRoaXMuX3ZpZXcgPSBudWxsO1xuXG4gICAgdGhpcy5wb3NpdGlvblggPSAwO1xuICAgIHRoaXMucG9zaXRpb25ZID0gMDtcblxuICAgIHRoaXMuZXZlbnRIYW5kbGVyID0gdGhpcy5fZXZlbnRIYW5kbGVyLmJpbmQodGhpcyk7XG5cbiAgfVxuXG4gIHNldE1WKG1vZGVsLCB2aWV3KSB7XG4gICAgdGhpcy5fbW9kZWwgPSBtb2RlbDtcbiAgICB0aGlzLl92aWV3ID0gdmlldztcblxuICAgIHRoaXMuYWRkRXZlbnQoKTtcblxuICB9XG5cbiAgX2V2ZW50SGFuZGxlcihldmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBzd2l0Y2ggKGV2ZW50LnR5cGUpIHtcbiAgICAgIGNhc2UgJ21vdXNlZG93bic6XG4gICAgICAgIHRoaXMuZG93bkhhbmRsZXIoZXZlbnQpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAnbW91c2Vtb3ZlJzpcbiAgICAgICAgdGhpcy5tb3ZlSGFuZGxlcihldmVudCk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlICdtb3VzZXVwJzpcbiAgICAgICAgdGhpcy51cEhhbmRsZXIoZXZlbnQpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBkb3duSGFuZGxlcihldmVudCkge1xuXG4gICAgbGV0IHBvc2l0aW9uID0gRE9NVXRpbC5nZXRFdmVudFBvaW50KGV2ZW50KTtcbiAgICBsZXQgaW5jbHVkZWQgPSB0aGlzLl9tb2RlbC5pbmNsdWRlVGFyZ2V0KHBvc2l0aW9uKTtcblxuICAgIGlmIChpbmNsdWRlZCkge1xuICAgICAgdGhpcy5fdmlldy5jaGFuZ2VHcmFiKHRydWUpO1xuXG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5ldmVudEhhbmRsZXIpO1xuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLmV2ZW50SGFuZGxlcik7XG4gICAgfVxuICB9O1xuXG4gIG1vdmVIYW5kbGVyKGV2ZW50KSB7XG4gICAgbGV0IHBvc2l0aW9uID0gRE9NVXRpbC5nZXRFdmVudFBvaW50KGV2ZW50KTtcbiAgICB0aGlzLl9tb2RlbC5tb3ZlKHBvc2l0aW9uKTtcbiAgfTtcblxuICB1cEhhbmRsZXIoZXZlbnQpIHtcbiAgICB0aGlzLl92aWV3LmNoYW5nZUdyYWIoZmFsc2UpO1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLmV2ZW50SGFuZGxlcik7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLmV2ZW50SGFuZGxlcik7XG4gICAgdGhpcy5zdGFydFggPSAwO1xuICAgIHRoaXMuc3RhcnRZID0gMDtcbiAgfTtcblxuXG4gIGFkZEV2ZW50KCkge1xuICAgIHRoaXMuX3ZpZXcuX2NhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLmV2ZW50SGFuZGxlciwgZmFsc2UpO1xuICB9XG5cbiAgcmVtb3ZlRXZlbnQoKSB7XG4gICAgdGhpcy5fdmlldy5fY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuZXZlbnRIYW5kbGVyLCB0cnVlKTtcbiAgfVxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vcGMvanMvY29udHJvbGxlcnMvQ2FudmFzQ29udHJvbGxlci5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=