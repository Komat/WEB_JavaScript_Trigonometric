/**
 * Created with IntelliJ IDEA.
 * Author: Komatsu
 * Date: 2013/10/24 15:54
 * FileName: script.js
 */


/**
 * @namespace
 */
var MoresVisual;


(function (window, undefined) {

  "use strict";

  var mixin, modules, console, alert;


  if (window.console) {
    console = window.console;
  } else {
    alert = window.alert;
    console = {
      log: function (msg) {
        alert(msg);
      },
      dir: function (obj) {
        for (var key in obj) {
          if (obj.hasOwnProperty(key)) {
            alert(key + ': ' + obj[key]);
          }
        }
      }
    };
  }


  /**
   * @type {{}}
   */
  MoresVisual = {};


  /**
   *
   * @type {string}
   */
  MoresVisual.name = 'MoresVisual';


  /**
   *
   * @type {string}
   */
  MoresVisual.version = '0.5.0';


  /**
   *
   * @type {boolean}
   */
  MoresVisual.refferer = document.referrer.indexOf('//yokohama-mores.jp/') >= 0;
//  MoresVisual.refferer = true; //test code


  /**
   *
   * @type {{}}
   */
  MoresVisual.paddles = {};





  /**
   *
   * @type {{
   *  appVersion: string,
   *  userAgent: string
   *  ltIE6: boolean,
   *  ltIE7: boolean,
   *  ltIE8: boolean,
   *  isIE: boolean,
   *  isFirefox: boolean,
   *  isOpera: boolean,
   *  isWebkit: boolean,
   *  isMobile: boolean,
   *  isPhone: boolean,
   *  isTablet: boolean,
   *  isAndroid: boolean
   * }}
   */
  MoresVisual.Browser = (function (w) {
    var doc, av, ua, wn;
    doc = w.document;
    wn = w.navigator;
    ua = wn.userAgent.toLowerCase();
    av = wn.appVersion.toLowerCase();

    return {
      appVersion: av,
      userAgent: ua,
      ltIE6: typeof w.addEventListener === 'undefined' && typeof doc.documentElement.style.maxHeight === 'undefined',
      ltIE7: typeof w.addEventListener === 'undefined' && typeof doc.querySelectorAll === 'undefined',
      ltIE8: typeof w.addEventListener === 'undefined' && typeof doc.getElementsByClassName === 'undefined',
      isIE: !!(doc.uniqueID),
      isFirefox: !!(w.sidebar),
      isOpera: !!(w.opera),
      isWebkit: !doc.uniqueID && !w.opera && !w.sidebar && w.localStorage && typeof w.orientation === 'undefined',
      isMobile: typeof w.orientation !== 'undefined',
      isPhone: /iphone|ipod/i.test(ua.toLowerCase()),
      isTablet: /ipad/i.test(ua.toLowerCase()),
      isAndroid: /android/i.test(ua.toLowerCase()),
      isTouch: 'ontouchstart' in window
    };
  })(window);





  /**
   *
   * @type {{
   *  addEvent: Function,
   *  removeEvent: Function,
   *  cancelEvent: Function,
   *  stopEvent: Function,
   *  disableEvent: Function,
   *  proxy: Function,
   *  hasProp: Function,
   *  keys: (*|Function),
   *  each: Function,
   *  extend: Function,
   *  isNode: Function,
   *  isFunction: Function,
   *  isPlainObject: Function,
   *  isObject: Function,
   *  isArray: Function,
   *  clone: Function,
   *  include: Function,
   *  index: Function,
   *  now: Function
   * }}
   */
  MoresVisual.Mixin = mixin = {
    addEvent: (function () {
      if (window.addEventListener) {
        return function (element, event, func) {
          element.addEventListener(event, func, false);
        };
      } else if (window.attachEvent) {
        return function (element, event, func) {
          element.attachEvent("on" + event, func);
        };
      } else {
        return function (element, event, func) {
          element["on" + event] = func;
        };
      }
    }()),
    removeEvent: function (element, event, func) {
      if (element.removeEventListener) {
        element.removeEventListener(event, func, false);
      } else if (element.detachEvent) {
        element.detachEvent("on" + event, func);
      } else {
        element["on" + event] = func;
      }
    },
    cancelEvent: function (event) {
      if (event.preventDefault) {
        event.preventDefault();
      } else {
        event.returnValue = false;
      }
    },
    stopEvent: function (event) {
      if (event.stopPropagation) {
        event.stopPropagation();
      } else {
        event.cancelBubble = true;
      }
    },
    disableEvent: function (event) {
      mixin.cancelEvent(event);
      mixin.stopEvent(event);
    },
    proxy: function (func) {
      var args, _this = this;
      args = Array.prototype.slice.call(arguments, 1);
      return function () {
        func.apply(_this, args);
      };
    },
    hasProp: function (obj, key) {
      return Object.prototype.hasOwnProperty.call(obj, key);
    },
    keys: Object.keys || function (obj) {
      if (obj !== Object(obj)) {
        throw new TypeError('Invalid object');
      }
      var keys = [];
      for (var key in obj) {
        if (this.hasProp(obj, key)) {
          keys.push(key);
        }
      }
      return keys;
    },
    each: function (obj, iterator, context) {
      var i, j,
          _foreach = Array.prototype.forEach,
          _obj = {};

      if (obj === null) {
        return;
      }
      if (_foreach && obj.forEach === _foreach) {
        obj.forEach(iterator, context);
      } else if (obj.length === +obj.length) {
        for (i = 0, j = obj.length; i < j; i += 1) {
          if (iterator.call(context, obj[i], i, obj) === _obj) {
            return;
          }
        }
      } else {
        var keys = this.keys(obj);
        for (i = 0, j = keys.length; i < j; i += 1) {
          if (iterator.call(context, obj[keys[i]], keys[i], obj) === _obj) {
            return;
          }
        }
      }
    },

    /**
     * 第一引数に第二引数以降のオブジェクトを拡張
     * 最終引数に true を渡すと Deep Copy
     * @param org {Object}
     * @returns {*} 拡張したオブジェクトを戻す
     */
    extend: function (org) {
      var i, j, _def, _opt, obj, key, deep, is_deep, is_array, is_plane;

      is_deep = false;
      i = 0;
      j = arguments.length;

      if (typeof arguments[j - 1] === 'boolean') {
        is_deep = true;
        j -= 1;
      }

      for (; i < j; i += 1) {
        for (key in (obj = arguments[i])) {
          if (obj.hasOwnProperty(key)) {
            _def = org[key];
            _opt = obj[key];

            if (_def === _opt) {
              continue;
            }

            is_array = this.isArray(_opt);
            if (is_deep && (this.isPlainObject(_opt) || is_array)) {

              if (is_array) {
                deep = _def || [];
              } else {
                deep = _def || {};
              }
              org[key] = mixin.extend(deep, _opt);

            } else if (_opt !== undefined) {
              org[key] = _opt;
            }
          }
        }
      }
      return org;
    },

    /**
     * 引数オブジェクトに mixin をインクルードする。
     * @param org {Object}
     * @returns {*}
     */
    include: function (org) {
      var _ext = {};
      for (var i = 0, j = arguments.length; i < j; i += 1) {
        mixin.extend(_ext, arguments[i]);
      }
      return mixin.extend(_ext, mixin);
    },
    isNode: function (obj) {
      return obj.nodeType || obj !== null && obj === obj.window;
    },
    isFunction: function (func) {
      return typeof func === "function";
    },
    isPlainObject: function (obj) {
      return mixin.isObject(obj) && !mixin.isFunction(obj) && !mixin.isNode(obj);
    },
    isObject: function (obj) {
      return obj === Object(obj);
    },
    isArray: function (arr) {
      var _isArray;
      if ((_isArray = [].isArray)) {
        return _isArray.call(arr);
      } else {
        return {}.toString.call(arr) === '[object Array]';
      }
    },
    clone: function (obj) {
      if (!mixin.isObject(obj)) {
        return obj;
      }

      if (mixin.isArray(obj)) {
        return obj.slice();
      } else {
        return mixin.extend({}, obj);
      }
    },
    index: function (full, target) {
      if (!full || !target) {
        return -1;
      }
      var _indexOf = Array.prototype.indexOf;
      if (_indexOf && full.indexOf === _indexOf) {
        return full.indexOf(target, 0);
      }
      for (var i = 0, j = full.length; i < j; i += 1) {
        if (full[i] === target) {
          return i;
        }
      }
      return -1;
    },
    now: function () {
      return (new Date()).getTime();
    }
  };





  /**
   *
   * @type {{
   *  getElementsClassName: Function,
   *  getScrollPosition: Function,
   *  getScreenSize: Function,
   *  getDocSize: Function,
   *  getOffset: Function,
   *  getStyle: null,
   *  getNames: Function,
   *  setName: Function,
   *  hasClass: Function,
   *  changeClass: Function,
   *  addClass: Function,
   *  removeClass: Function,
   *  toggleClass: Function
   *  }}
   */
  MoresVisual.Modules = modules = {
    getElementsClassName: function (child_name, parent, tag_name) {
      var i, j, _collection, _i, _len, _targets;
      if (!parent) {
        parent = document;
      }
      if (!tag_name) {
        tag_name = false;
      }
      _collection = [];
      _targets = null;
      if (parent.getElementsByClassName) {
        return parent.getElementsByClassName(child_name);
      } else if (parent.querySelectorAll) {
        return parent.querySelectorAll((tag_name || '') + ("." + child_name));
      } else {
        _targets = parent.getElementsByTagName(tag_name || '*') || document.all;
        for (j = _i = 0, _len = _targets.length; _i < _len; j = ++_i) {
          i = _targets[j];
          if (MoresVisual.Modules.hasClass(i, child_name)) {
            _collection.push(i);
          }
        }
      }
      return _collection;
    },
    getScrollPosition: function () {
      var _x, _y;
      _x = document.documentElement.scrollLeft ||
          document.body.scrollLeft ||
          window.pageXOffset;

      _y = document.documentElement.scrollTop ||
          document.body.scrollTop ||
          window.pageYOffset;

      return ({
        top: _y,
        left: _x
      });
    },
    getScreenSize: function () {
      var _w, _h, doc;
      doc = document;

      if (doc.documentElement && doc.documentElement.clientWidth !== 0) {
        _w = doc.documentElement.clientWidth;
      } else if (doc.body) {
        _w = doc.body.clientWidth;
      }

      if (doc.documentElement && doc.documentElement.clientHeight !== 0) {
        _h = doc.documentElement.clientHeight;
      } else if (doc.body) {
        _h = doc.body.clientHeight;
      }

      return ({
        width: _w,
        height: _h
      });
    },
    getDocSize: function () {
      var _x, _y, win, doc;

      win = window;
      doc = document;

      if (win.innerHeight && win.scrollMaxY) {
        _x = win.innerWidth + win.scrollMaxX;
        _y = win.innerHeight + win.scrollMaxY;
      } else if (doc.body.scrollHeight > doc.body.offsetHeight || doc.documentElement.scrollHeight !== doc.body.scrollHeight) {
        _x = doc.documentElement.scrollWidth || doc.body.scrollWidth;
        _y = doc.documentElement.scrollHeight || doc.body.scrollHeight;
      } else {
        _x = doc.body.offsetWidth;
        _y = doc.body.offsetHeight;
      }

      return ({
        scrollX: _x,
        scrollY: _y
      });
    },
    getOffset: function (element) {
      var _x, _y;
      _x = _y = 0;
      if (!element) {
        return false;
      }
      do {
        _x += element.offsetLeft;
        _y += element.offsetTop;
      } while ((element = element.offsetParent));
      return ({
        top: _y,
        left: _x
      });
    },
    getStyle: (function () {
      var _getStyle;
      if (window.getComputedStyle) {
        _getStyle = function (elem, prop) {
          return window.getComputedStyle(elem, null)[prop];
        };
      } else if (document.documentElement.currentStyle) {
        _getStyle = function (elem, prop) {
          return elem.currentStyle[prop];
        };
      }
      return _getStyle;
    }()),
    getNames: function (class_name) {
      return class_name.match(/\S+/g);
    },
    setName: function (class_name) {
      return (' ' + class_name + ' ').replace(/[\t\r\n\f]/g, ' ');
    },
    hasClass: function (element, class_name, flag) {

      var class_names, own_class, cache;

      if (!element.length) {
        own_class = element.className;
        if (element.nodeType !== 1 && !own_class && own_class.length < 1) {
          return false;
        }

        class_names = modules.getNames(class_name);
        cache = modules.setName(own_class);

        for (var i = 0, j = class_names.length; i < j; i += 1) {
          if (cache.indexOf(class_names[i]) > 0) {
            flag = true;
          }
        }
      } else {
        var el = element.length;
        while (el) {
          if (modules.hasClass(element[el - 1], class_name, flag)) {
            // if (arguments.callee(element[el - 1], class_name, flag)) {
            return true;
          }
          el -= 1;
        }
      }

      return !!flag;
    },
    changeClass: function change_class(element, class_name, compare) {
      var orig_class_name, change_class_name, new_class_name;

//      if (typeof class_name !== 'string' && !class_name) {
//        return false;
//      }

      if (!element.length) {
        orig_class_name = element.className;
        change_class_name = modules.getNames(class_name);
        new_class_name = (orig_class_name ? modules.setName(orig_class_name) : ' ');
        orig_class_name = new_class_name;

        new_class_name = compare(change_class_name, orig_class_name, new_class_name);

        element.className = (new_class_name.replace(/^\s+|\s+$/g, ""));
      } else {
        var el = element.length;
        while (el) {
          change_class(element[el - 1], class_name, compare);
          el -= 1;
        }
      }
    },
    addClass: function (element, class_name) {
      modules.changeClass(element, class_name, function (add_class_name, orig_class_name, new_class_name) {
        var _change_class_name = new_class_name || '';
        for (var i = 0, j = add_class_name.length; i < j; i += 1) {
          if (orig_class_name.indexOf(add_class_name[i]) < 0) {
            _change_class_name += add_class_name[i] + ' ';
          }
        }
        return _change_class_name;
      });
    },
    removeClass: function (element, class_name) {
      modules.changeClass(element, class_name, function (remove_class_name, orig_class_name, new_class_name) {
        var _change_class_name = new_class_name || '';
        for (var i = 0, j = remove_class_name.length; i < j; i += 1) {
          if (orig_class_name.indexOf(remove_class_name[i]) > 0) {
            _change_class_name = _change_class_name.replace(remove_class_name[i], '');
          }
        }
        return _change_class_name;
      });
    },
    toggleClass: function (elm, class_name) {
      var method_type, return_flag;
      return_flag = modules.hasClass(elm, class_name);
      method_type = return_flag ? 'removeClass' : 'addClass';
      modules[method_type](elm, class_name);
      return return_flag;
    }
  };





  MoresVisual.PubSub = (function () {
    var _events = {};

    /**
     *  PubSub
     * @type {{
     *  subscribe   : Function,
     *  publish     : Function,
     *  unsubscribe : Function
     * }}
     */
    return {
      subscribe: function (topic, func) {
        if (!_events[topic]) {
          _events[topic] = [];
        }
        _events[topic].push(func);
        return [topic, func];
      },
      publish: function (topic, args) {
        if (_events[topic]) {
          for (var i = 0, j = _events[topic].length; i < j; i += 1) {
            _events[topic][i].apply(this, args || []);
          }
        }
      },
      unsubscribe: function (topic) {
        if (_events[topic]) {
          _events[topic] = null;
        }
      }
    };
  }());





  /**
   *
   * @type {{
   *  getExpDate   : Function,
   *  setTomorrow  : Function,
   *  getCookieVal : Function,
   *  getCookie    : Function,
   *  setCookie    : Function,
   *  deleteCookie : Function
   *  }}
   */
  MoresVisual.CookieObserver = {
    getExpDate: function (days, hours, minutes) {
      var expDate;
      expDate = new Date();
      if (typeof days === 'number' && typeof hours === 'number' && typeof minutes === 'number') {
        expDate.setDate(expDate.getDate() + parseInt(days, 10));
        expDate.setHours(expDate.getHours() + parseInt(hours, 10));
        expDate.setMinutes(expDate.getMinutes() + parseInt(minutes, 10));
        return expDate.toGMTString();
      }
    },
    setTomorrow: function () {
      var dt;
      dt = new Date();
      dt.setDate(dt.getDate() + 2);
      dt.setHours(-15, 0, 0, 0);
      return dt.toGMTString();
    },
    getCookieVal: function (offset) {
      var endstr;
      endstr = document.cookie.indexOf(';', offset);
      if (endstr === -1) {
        endstr = document.cookie.length;
      }
      return decodeURI(document.cookie.substring(offset, endstr));
    },
    getCookie: function (name) {
      var alen, arg, clen, i, j;
      arg = name + '=';
      alen = arg.length;
      clen = document.cookie.length;
      i = 0;
      while (i < clen) {
        j = i + alen;
        if (document.cookie.substring(i, j) === arg) {
          return this.getCookieVal(j);
        }
        i = document.cookie.indexOf(' ', i) + 1;
        if (i === 0) {
          break;
        }
      }
      return '';
    },
    setCookie: function (name, value, expires, path, domain, secure) {
      document.cookie = name + '=' + encodeURI(value) +
          (expires ? '; expires=' + expires : '') +
          (path ? '; path=' + path : '') +
          (domain ? '; domain=' + domain : '') +
          (secure ? '; secure' : '');
    },
    deleteCookie: function (name, path, domain) {
      if (this.getCookie(name)) {
        document.cookie = name + '=' +
            (path ? '; path=' + path : '') +
            (domain ? "; domain=" + domain : '') +
            '; expires=Thu, 01-Jan-70 00:00:01 GMT';
      }
    }
  };





  MoresVisual.Includes = function () {

    /**
     *
     * @param params
     * @constructor
     */
    function Includes(params) {
      this.params = params;
      this.initialize();
    }

    Includes.head = document.getElementsByTagName('head')[0];

    Includes.isArray = mixin.isArray;

    Includes.createLoop = function (params, func) {
      var i, j, _i, _len, _results;
      if (Includes.isArray(params)) {
        _results = [];
        for (j = _i = 0, _len = params.length; _i < _len; j = ++_i) {
          i = params[j];
          _results.push(func(i));
        }
        return _results;
      } else {
        return func(params);
      }
    };

    Includes.passTo = function (param, type) {
      return this.createLoop(param, this[type]);
    };

    Includes.images = function (param) {
      return this.passTo(param, 'createImg');
    };

    Includes.scripts = function (param) {
      return this.passTo(param, 'createJS');
    };

    Includes.css = function (param) {
      return this.passTo(param, 'createCSS');
    };

    Includes.styles = function (param) {
      return this.passTo(param, 'createStyle');
    };

    Includes.createImg = function (src) {
      var _img;
      _img = new Image();
      _img.src = src;
      return _img;
    };

    Includes.createCSS = function (src) {
      var _style;
      _style = document.createElement('link');
      _style.setAttribute('rel', 'stylesheet');
      src = src.indexOf('.css') > -1 ? src : src + '.css';
      _style.setAttribute('href', src);
      return Includes.head.appendChild(_style);
    };

    Includes.createStyle = function (param) {
      var _style;

      if (Includes.isArray(param)) {
        param = param.join('\n');
      }

      if (typeof param === 'string') {
        _style = document.createElement('style');
        _style.type = 'text/css';
        if (_style.styleSheet) {
          _style.styleSheet.cssText = param;
        } else {
          _style.appendChild(document.createTextNode(param));
        }
        return Includes.head.appendChild(_style);
      } else {
        return false;
      }
    };

    Includes.createJS = function (src) {
      var _script;
      _script = document.createElement('script');
      _script.setAttribute('src', src);
      return Includes.head.appendChild(_script);
    };

    Includes.prototype.keys = ['img', 'css', 'style', 'js'];

    Includes.prototype.creates = Includes.createLoop;

    Includes.prototype.isArray = Includes.isArray;

    Includes.prototype.createImg = Includes.createImg;

    Includes.prototype.createCSS = Includes.createCSS;

    Includes.prototype.createStyle = Includes.createStyle;

    Includes.prototype.createJS = Includes.createJS;

    Includes.prototype.initialize = function () {
      return this.launch();
    };

    Includes.prototype.launch = function () {
      var i, j, key, _i, _len, _ref;
      for (key in this.params) {
        if (this.params.hasOwnProperty(key)) {
          _ref = this.keys;
          for (j = _i = 0, _len = _ref.length; _i < _len; j = ++_i) {
            i = _ref[j];
            if (i === key) {
              this.selector(key);
            }
          }
        }
      }
      return true;
    };

    Includes.prototype.selector = function (key) {
      var _method = '';
      switch (key) {
        case 'img':
          _method = 'createImg';
          break;
        case 'css':
          _method = 'createCSS';
          break;
        case 'style':
          _method = 'createStyle';
          break;
        case 'js':
          _method = 'createJS';
          break;
        default:
          break;
      }

      if (_method.length > -1) {
        return this.creates(this.params[key], this[_method]);
      } else {
        return false;
      }
    };

    return Includes;
  }();





  MoresVisual.Animation = (function () {

    /**
     * 引数は px 等無し。
     * @constructor
     * @param config
     * {
     *    target: null,
     *    fps: number,
     *    params: null,
     *    option: {
     *      duration: number,
     *      easing: string
     *     },
     *     beforehand: null,
     *     afterwards: null
     * }
     */
    function Animation(config) {
      this.extend(this, Animation.defaults, config, true);
      this.initialize();
    }

    Animation.easing = {
      linear: function (time, from, distance, duration) {
        return  distance * time / duration + from;
      },
      swing: function (time, from, distance, duration) {
        return ((-Math.cos(time * Math.PI) / 2) + 0.5) * distance + from;
      },
      cubicIn: function (time, from, distance, duration) {
        return distance * (time /= duration) * time * time + from;
      },
      cubicOut: function (time, from, distance, duration) {
        return distance * ((time = time / duration - 1) * time * time + 1) + from;
      },
      cubicInOut: function (time, from, distance, duration) {
        if ((time /= duration / 2) < 1) {
          return distance / 2 * time * time * time + from;
        }
        return distance / 2 * ((time -= 2) * time * time + 2) + from;
      },
      sineIn: function (time, from, distance, duration) {
        return -distance * Math.cos(time / duration * (Math.PI / 2)) + distance + from;
      },
      sineOut: function (time, from, distance, duration) {
        return distance * Math.sin(time / duration * (Math.PI / 2)) + from;
      },
      sineInOut: function (time, from, distance, duration) {
        return -distance / 2 * (Math.cos(Math.PI * time / duration) - 1) + from;
      },
      backIn: function (time, from, distance, duration, s) {
        if (s === undefined) {
          s = 1.70158;
        }
        return distance * (time /= duration) * time * ((s + 1) * time - s) + from;
      },
      backOut: function (time, from, distance, duration, s) {
        if (s === undefined) {
          s = 1.70158;
        }
        return distance * ((time = time / duration - 1) * time * ((s + 1) * time + s) + 1) + from;
      },
      backInOut: function (time, from, distance, duration, s) {
        if (s === undefined) {
          s = 1.70158;
        }
        if ((time /= duration / 2) < 1) {
          return distance / 2 * (time * time * (((s *= (1.525)) + 1) * time - s)) + from;
        }
        return distance / 2 * ((time -= 2) * time * (((s *= (1.525)) + 1) * time + s) + 2) + from;
      }
    };

    Animation.defaults = {
      target: null,
      fps: 60,
      params: null,
      option: {
        duration: 400,
        easing: 'cubicOut'
      },
      beforehand: null,
      afterwards: null
    };


    Animation.prototype = MoresVisual.Mixin.include({
      //TODO: backgroundPosition etc......
      suffix: /margin|padding|height|width|left|right|top|bottom/i,
      opacity: /opacity/i,
      backgroundPosition: /backgroundPosition/i,
      initialize: function () {
        this.option.easing = Animation.easing[this.option.easing];
        this.style = this.target.style;
        this.fps = Math.round(1000 / (this.fps || 60));
        this._start = 0;
        this.timerID = 0;
        this.que = [];
        this.updateProp(this.params);
      },
      animate: function (param, callback) {
        if (this.timerID) {
          this.gotoEnd();
        }
        this.updateProp(param);
        if (callback) {
          if ('beforehand' in callback) {
            this.beforehand = callback.beforehand;
            this.afterwards = null;
          } else if ('afterwards' in callback) {
            this.beforehand = null;
            this.afterwards = callback.afterwards;
          }
        } else {
          this.beforehand = null;
          this.afterwards = null;
        }

        this.setTimer();
      },
      updateProp: function (param) {
        this.params = this.setProp(param);
      },
      setProp: function (properties) {
        var _cache, que, return_val;
        return_val = [];
        for (var prop in properties) {
          if (properties.hasOwnProperty(prop)) {
            _cache = properties[prop];
            que = {
              key: prop,
              from: _cache.from,
              to: _cache.to,
              distance: _cache.to - _cache.from,
              opacity: this.opacity.test(prop),
              suffix: this.suffix.test(prop)
            };
            return_val.push(que);
          }
        }
        return return_val;
      },
      now: function () {
        return (new Date()).getTime();
      },
      enterFrame: function () {
        var param, option, time, value, flag;
        flag = true;
        option = this.option;
        time = this.now() - this._start;
        for (var i = 0, j = this.params.length; i < j; i += 1) {
          param = this.params[i];
          if (time < option.duration) {
            value = option.easing(time, param.from, param.distance, option.duration);
          } else {
            value = param.to;
            flag = false;
          }

          if (param.suffix) {
            value = value + 'px';
          }

          if (param.opacity) {
            this.style.opacity = value;
            this.style.filter = 'alpha(opacity=' + (value * 100) + ')';
          } else {
            this.style[param.key] = value;
          }
        }

        if (!flag) {
          this.clearTimer();
          if (this.afterwards) {
            this.afterwards();
          }
        }

      },
      destroy: function () {
        this.clearTimer();
      },
      pause: function () {
      },
      gotoEnd: function () {
        if (this.timerID <= 0) {
          return;
        }

        var param, value;
        for (var i = 0, j = this.params.length; i < j; i += 1) {
          param = this.params[i];
          value = param.to;

          if (param.suffix) {
            value = value + 'px';
          }

          this.style[param.key] = value;
        }

        this.clearTimer();
        if (this.afterwards) {
          this.afterwards(true);
        }

      },
      setTimer: function () {
        this._start = this.now();
        if (this.beforehand) {
          this.beforehand();
        }
        this.timerID = setInterval(this.proxy(this.enterFrame), this.fps);
      },
      clearTimer: function () {
        if (this.timerID) {
          clearInterval(this.timerID);
          this._start = 0;
          this.timerID = 0;
        }
      }
    });

    return Animation;
  }());


  MoresVisual.Icon = (function () {

    /**
     *
     * @constructor
     * @param config
     * {
     *    parent  : null,
     *    length  : number,
     *    name    : string,
     *    tagname : string,
     *    template: string
     * }
     */
    function Icon(config) {
      this.extend(this, Icon.defaults, config);
      this.child = null;
      this.initialize();
    }

    Icon.prototype = MoresVisual.Mixin.include({});

    /**
     * default parameters
     */
    Icon.defaults = {
      parent: null,
      length: 0,
      name: 'current_show',
      tagname: 'span',
      template: '<span><\/span>'
    };

    Icon.prototype.initialize = function () {
      this.setUpIcon();
      this.child = this.parent.getElementsByTagName(this.tagname);
      modules.addClass(this.child[0], this.name);
      this.parent.style.display = 'block';
    };

    Icon.prototype.showIcon = function () {
      this.parent.style.visibility = 'visible';
    };

    Icon.prototype.setUpIcon = function () {
      var _icons = [];
      for (var i = this.length - 1; i >= 0; i -= 1) {
        _icons.push(this.template);
      }
      this.parent.innerHTML = _icons.join('');
    };

    Icon.prototype.getIndex = function (element) {
      var val = {};
      for (var i = 0, j = this.child.length; i < j; i += 1) {
        if (this.child[i] === element) {
          val.current = i;
        }

        if (modules.hasClass(this.child[i], this.name)) {
          val.last = i;
        }
      }
      return val;
    };

    Icon.prototype.changeIcon = function (target, index) {
      var val, r_val;
      val = this.getIndex(target);

      if (val.current !== val.last || val.current !== index) {
        r_val = val.current;
        this.toggle(val.current);
        this.toggle(val.last, true);
      } else {
        r_val = false;
      }

      return r_val;
    };

    Icon.prototype.toggle = function (index, flag) {
      var action = !flag ? 'addClass' : 'removeClass';
      modules[action](this.child[index], this.name);
    };

    return Icon;
  }());





  MoresVisual.Paddle = (function () {

    /**
     *
     * @constructor
     * @param config
     * {
     *    parent   : null,
     *    childName: string,
     *    tagName  : string,
     *    delay    : number
     * }
     */
    function Paddle(config) {
      this.extend(this, Paddle.defaults, config, true);
      this.initialize();
    }

    /**
     * default parameters
     */
    Paddle.defaults = {
      parent     : null,
      childName  : 'nav_paddle',
      tagName    : 'IMG',
      delay      : 1500
    };

    Paddle.prototype = MoresVisual.Mixin.include({
      initialize: function () {
        this.timerID = 0;
        this.child = modules.getElementsClassName(this.childName, this.parent, this.tagName);
        this.style = this.child[0].style;
        if (!MoresVisual.Browser.isTouch) {
          this.setListener();
        }
      },
      setListener: function () {
        var _target, _this = this;

        if (MoresVisual.Browser.ltIE6) { return; }

        this.addEvent(this.parent, 'mouseover', function (event) {
          _target = event.target || event.srcElement;
          if (_target.tagName !== _this.tagName) {
            return;
          }
          _this.clearTimer();
          _this.listener();
        });

        this.addEvent(this.parent, 'mouseout', function (event) {
          _target = event.target || event.srcElement;
          if (_target.tagName !== _this.tagName) {
            return;
          }
          _this.setTimer();
        });
      },
      listener: function (flag) {
        this.style.visibility = flag ? 'hidden' : 'visible';
      },
      setTimer: function () {
        var _this = this;
        this.timerID = setTimeout(function () {
          _this.listener(true);
        }, this.delay);
      },
      clearTimer: function () {
        if (this.timerID) {
          clearTimeout(this.timerID);
        }
      }
    });

    return Paddle;
  }());





  MoresVisual.FlickLooper = (function () {

    /**
     *
     * @constructor
     * @param config
     * {
     *    wrapper  : null,
     *    icon     : null,
     *    paddle   : {
     *      parent : null,
     *      next   : null,
     *      prev   : null
     *    },
     *    target   : string,
     *    child    : string,
     *    judge    : number,
     *    duration : number,
     *    delay    : number
     * }
     */
    function FlickLooper(config) {
      this.extend(this, FlickLooper.defaults, config, true);
      this.initialize();
    }

    /**
     * default parameters
     */
    FlickLooper.defaults = {
      wrapper   : null,
      icon      : null,
      paddle: {
        parent  : null,
        next    : null,
        prev    : null
      },
      target    : 'UL',
      child     : 'LI',
      easing    : 'cubicOut',
      duration  : 250,
      judge     : 0.3,
      delay     : 4500
    };


    FlickLooper.prototype = MoresVisual.Mixin.include({
      android_button     : null,
      types              : null,
      touch_current      : null,
      touch_last         : null,
      icon_index         : 0,
      process_num        : 0,
      continuity_time    : 300,
      is_android         : false,
      is_complete        : true,
      is_touch           : false,
      enable_touch       : false,
      disable_succession : false,
      initialize: function () {

        this.children      =  [];
        this.timerID       =  0;
        this.length        =  0;
        this._length       =  0;
        this.start_x       =  0;
        this.start_y       =  0;
        this.positionX     =  0;
        this.positionY     =  0;
        this.away          =  0;
        this.current_index =  0;
        this.last_index    = -1;

        this.container = {
          width: 0,
          height: 0
        };
        this.box = {
          width: 0,
          height: 0
        };

        if (typeof this.target === 'string') {
          this.target = this.wrapper.getElementsByTagName(this.target)[0];
        }

        this.style = this.target.style;
        this.animation = new MoresVisual.Animation({
          target: this.target,
          option: {
            duration: this.duration,
            easing: this.easing
          }
        });

        this.setEventType();
        this.pagePosition();
        this.setChild();
        this.setPanelIndex();

        if (this.length < 2) {
          return;
        }

        if (MoresVisual.Browser.isAndroid) {
          this.is_android = true;
          this.createButton();
        }

        this.setClone();
        this.refreshChild();
        this.setBox();
        this.setStyle();
        this.setListener();
        this.icon.length = this._length;
        this.icon = new MoresVisual.Icon(this.icon);
        this.paddle.parent.style.display = 'block';


//        this.setTimer();

//        this.testChildren();
//        var _self = this;
//        this.addEvent(document.getElementsByTagName('html')[0], 'click', function () {
//          _self.testChildren();
//        });

      },
      loadedMethod: function () {
        this.addEvent(window, 'load', this.proxy(this.setListener));
      },
      /** define touch events */
      setEventType: function () {
        if ('ontouchstart' in window) {
          this.enable_touch = true;
          this.types = {
            start: 'touchstart',
            end: 'touchend',
            move: 'touchmove'
          };
        } else {
          this.types = {
            start: 'mousedown',
            end: 'mouseup',
            move: 'mousemove'
          };
        }
        // this.types = {
        //   start: 'MSPointerDown',
        //   end: 'MSPointerUp',
        //   move: 'MSpointerMove'
        // }
      },
      /** self define function */
      pagePosition: function () {
        var _target;
        if (this.enable_touch) {
          this.pagePosition = function (event) {
            _target = event.changedTouches[0];
            return ({
              x: _target.pageX,
              y: _target.pageY
            });
          };
        } else if (MoresVisual.Browser.ltIE8) {
          this.pagePosition = function (event) {
            _target = document.documentElement;
            return ({
              x: event.clientX + _target.scrollLeft,
              y: event.clientY + _target.scrollTop
            });
          };
        } else {
          this.pagePosition = function (event) {
            return ({
              x: event.pageX,
              y: event.pageY
            });
          };
        }
      },

      /**
       * 一番最後のパネルを一番前へ
       */
      setClone: function () {
        var optional;

        if (this.length === 2) {
          optional = this.setTwin();
        } else {
          optional = this.children[this.length - 1].target;
        }

        this.target.insertBefore(optional, this.children[0].target);
      },

      /**
       * パネルが2枚の時 要素を clone
       * @returns {*}
       */
      setTwin: function () {
        var _clone, _data;

        for (var i = 0, j = this.length; i < j; i += 1) {
          _data = {};
          _clone = this.children[i].target.cloneNode(true);
          this.extend(_data, this.children[i], true);
          _data.target = _clone;
          _data.panel = this.children.length;
          this.children.push(_data);

          if (i === 0) {
            this.target.appendChild(_clone);
          }
        }

        return _clone;
      },

      /**
       * flick ul の css 設定
       */
      setStyle: function () {
        this.style.position = 'absolute';
        this.style.top = 0;
        this.style.left = -this.box.width + 'px';
        this.style.width = this.container.width + 'px';
        this.style.height = this.container.height + 'px';
      },

      /**
       * children = [{
       *  :ID      => パネル固有IDクローンの際は重複有り ex.(ID    => [3, 4, 5, 0, 1, 2])
       *  :index   => 実際のパネルのindex                ex.(index => [0, 1, 2, 3, 4, 5])
       *  :panel   => 表示上のパネルのindex              ex.(panel => [5, 0, 1, 2, 3, 4])
       *  :target  => panel DOM element
       *  :anchor  => { :href => link url, :blank => target  }
       * }]
       */
      setChild: function () {
        var _target, _data;
        for (var i = 0, j = this.target.childNodes.length; i < j; i += 1) {

          _target = this.target.childNodes[i];

          if (this.child === _target.nodeName) {
            _data = {};
            _data.ID = this.children.length;
            _data.target = _target;
            this.children.push(_data);
          }
        }

        this.length = this.children.length;
        this._length = this.length;
      },
      /**
       * children 更新
       */
      refreshChild: function () {
        var _counter, _target, _new_children, _child;

        _new_children = [];
        _counter = -1;

        for (var i = 0, j = this.target.childNodes.length; i < j; i += 1) {
          _target = this.target.childNodes[i];
          if (this.child === _target.nodeName) {
            _child = this.getChild(_target);
            _child.index = _new_children.length;
            if (_counter >= 0) {
              _child.panel = _counter;
            }

            _new_children.push(_child);
            _counter += 1;
          }

          if (i === j - 1) {
            _new_children[0].panel = _new_children.length - 1;
          }
        }

        this.children = _new_children;
        this.length = this.children.length;
      },
      getChild: function (elm) {
        var _child;

        for (var i = 0, j = this.children.length; i < j; i += 1) {
          if (elm === this.children[i].target) {
            _child = this.children[i];
            break;
          }
        }

        return _child;
      },
      setPanelIndex: function () {
        var _child, _anchor;
        for (var i = 0, j = this.length; i < j; i += 1) {
          _child = this.children[i];
          _child.index = i;
          _child.anchor = null;
          _anchor = _child.target.getElementsByTagName('a')[0];

          if (_anchor) {
            _child.anchor = {};
            _child.anchor.href = _anchor;
            _child.anchor.blank = (_anchor.target && _anchor.target === '_blank');
          }
        }
      },
      testChildren: function () {
        for (var i = 0, j = this.length; i < j; i += 1) {
          for (var key in this.children[i]) {
            if (this.children[i].hasOwnProperty(key)) {
              console.log(i + '. ' + key + ': ' + this.children[i][key]);
            }
          }
        }
      },
      setBox: function () {
        this.box.width = this.children[0].target.clientWidth;
        this.box.height = this.children[0].target.clientHeight;
        this.container.width = this.box.width * this.length;
        this.container.height = this.box.height;
        this.judge = Math.floor(this.box.width * this.judge);
        this.away = this.box.width;
      },
      setListener: function () {
        var _this = this;

        this.stopAnchor();

        this.wrapListener();
        this.iconListener();
        this.keyBordListener();

        if (!this.enable_touch) {
          this.paddleListener();
        }

        this.addEvent(this.target, this.types.start, function (event) {
          _this.eventStart(event);
        });

        this.addEvent(this.target, this.types.end, function (event) {
          _this.eventEnd(event);
        });

        this.addEvent(this.target, this.types.move, function (event) {
          _this.eventMove(event);
        });
      },
      wrapListener: function () {
        var _this = this;
        this.addEvent(this.wrapper, 'mouseout', function (event) {
          if (!_this.is_touch) {
            return;
          }
          _this.eventEnd(event);
        });
      },
      iconListener: function () {
        var _index, _target, flag, _this = this;

        flag = false;

        this.addEvent(this.icon.parent, 'click', function (event) {
          _target = event.target || event.srcElement;
          if (_target.nodeName !== _this.icon.tagname.toUpperCase()) {
            return;
          }

          if (_this.icon.getIndex(_target).current === _this.current_index) { return; }

          if (flag) { return; }
          flag = true;

          setTimeout(function () {
            flag = false;
          }, _this.continuity_time);


          _this.clearTimer();
          _index = _this.icon.changeIcon(_target, _this.current_index);
          if (_index === false || _index < 0) {
            return;
          }

          _this.goToNext(_index);
        });

        this.addEvent(this.icon.parent, 'mouseover', function (event) {
          _target = event.target || event.srcElement;
          if (_target.nodeName !== _this.icon.tagname.toUpperCase()) {
            return;
          }

          if (modules.hasClass(_target, _this.icon.name)) { return; }

          modules.addClass(_target, _this.icon.name);

        });

        this.addEvent(this.icon.parent, 'mouseout', function (event) {
          _target = event.target || event.srcElement;
          if (_target.nodeName !== _this.icon.tagname.toUpperCase()) {
            return;
          }

          if (_this.icon.getIndex(_target).current === _this.current_index) { return; }
          if (!modules.hasClass(_target, _this.icon.name)) { return; }

          modules.removeClass(_target, _this.icon.name);

        });

      },
      paddleListener: function () {
        var _this, flag;
        flag = false;
        _this = this;

        this.addEvent(this.paddle.next, 'click', function () {
          if (flag) { return; }
          flag = true;
          _this.clearTimer();
          _this.changePanel(false);
          setTimeout(function () {
            flag = false;
          }, _this.continuity_time);
        });

        this.addEvent(this.paddle.prev, 'click', function () {
          if (flag) { return; }
          flag = true;
          _this.clearTimer();
          _this.changePanel(true);
          setTimeout(function () {
            flag = false;
          }, _this.continuity_time);
        });
      },
      keyBordListener: function () {
        var _this = this,
            key_cancel = false;

        this.addEvent(document, 'keydown', function (event) {
          if (!_this.timerID) { return; }
          if (event.keyCode !== 37 && event.keyCode !== 39 && event.keyCode !== 78 && event.keyCode !== 80) {
            return;
          }
          if (key_cancel) { return; }

          key_cancel = true;
          _this.changePanel(event.keyCode === 37 || event.keyCode === 80);

          setTimeout(function () {
            key_cancel = false;
          }, _this.continuity_time);
        });
      },
      stopAnchor: function () {
        var _anchor = this.target.getElementsByTagName('a');
        for (var i = 0, j = _anchor.length; i < j; i += 1) {
          this.setDisable(_anchor[i]);
        }
      },
      setDisable: function (target) {
        var _this = this;
        this.addEvent(target, 'click', function (event) {
          _this.disableEvent(event);
        });
      },
      setTimer: function () {
//        var _this = this;
//        var before = this.now();
//        this.timerID = setTimeout(function () {
//          console.log((_this.now() - before) / 1000);
//          _this.changePanel();
//        }, this.delay);
        this.clearTimer();
        this.timerID = setTimeout(this.proxy(this.changePanel), this.delay);
      },
      changeIndex: function (flag) {
        this.last_index = this.current_index;
        this.current_index = this.current_index + (flag ? -1 : 1);
        if (this.current_index >= this._length) {
          this.current_index = 0;
        } else if (this.current_index < 0) {
          this.current_index = this._length - 1;
        }

        this.changeIcon();
      },
      changePanel: function (flag) {
//        this.clearTimer();
        this.changeIndex(flag);
        this.goToPanel(flag);
      },
      changeIcon: function () {
        this.icon.toggle(this.last_index, true);
        this.icon.toggle(this.current_index);
      },

      /**
       * Android window.open 挙動対策
       */
      createButton: function () {
        this.android_button = document.createElement('input');
        this.android_button.setAttribute('type', 'button');
        this.android_button.name = 'android_button';
        this.android_button.style.display = 'none';
        document.body.appendChild(this.android_button);
      },

      /**
       * パネルの自動再生停止
       * アニメーションを最終フレームへ移動
       */
      clearTimer: function () {
        if (this.timerID) {
          clearTimeout(this.timerID);
          this.timerID = 0;
//          this.animation.gotoEnd();
        }
      },

      /**
       * アニメーションのコールバック
       * @param flag
       */
      moveElm: function (flag) {
        this.createClone(flag);
        this.positionX = -this.away;
        this.style.left = this.positionX + 'px';
        this.refreshChild();
        this.is_complete = true;
        this.setTimer();
      },

      /**
       * 自動再生 & paddle でパネルを動かす
       * flag で移動位置を決定
       * @param flag
       */
      setNext: function (flag) {
        this.positionX = !flag ? -(this.away * 2) : 0;
      },

      /**
       * event.target から LI 取得
       * @param elm
       * @returns {*}
       */
      getParent: function (elm) {
        var _elm, _before;
        _elm = elm;

        while (_elm) {
          _elm = _elm.parentNode;
          if (_elm && _elm.nodeName === 'UL') {
            if (_elm.panel === this.target.panel) {
              break;
            }
          }
          _before = _elm;
        }

        return this.getChild(_before);
      },

      /**
       * フラグで前後要素複製
       * @param flag
       */
      createClone: function (flag) {
        var _children = this.children;
        if (!flag) {
          this.target.appendChild(_children[0].target);
        } else {
          this.target.insertBefore(_children[this.length - 1].target, _children[0].target);
        }
      },

      /**
       * index から children の中に該当する
       * ID を持つ hash を返す
       * @param index
       */
      goToNext: function (index) {
        var i, j, r_val;

        r_val = 0;

        for (i = 1, j = this.length; i < j; i += 1) {
          if (index === this.children[i].ID) {
            r_val = i;
            break;
          }
        }

        if (r_val === 0) {
          r_val = this.length;
        }

        i = 1;
        while(i < r_val) {
          this.changePanel(false);
          i += 1;
        }
      },
      goToPanel: function (flag) {
        var _go_to = 0;
        if (!flag) {
          _go_to = -this.away * 2;
        }
        this.launchPanel(flag, -this.away, _go_to);
//      this.launchPanel(flag, this.getPoint(), _go_to);
      },

      /**
       * anchor を持つパネルのリンク用
       * @param obj
       */
      gotoJump: function (obj) {
        if (!obj.anchor) {
          return true;
        }
        if (obj.anchor.blank) {

          if (!MoresVisual.Browser.isAndroid) {
            window.open(obj.anchor.href);
          } else {
            var _self = this;
            this.android_button.onclick = function () {
              window.open(obj.anchor.href);
            };
//            setTimeout(_self.android_button.click, 10);
            setTimeout(function () {
              _self.android_button.click();
            }, 10);
          }
        } else {
          location.href = obj.anchor.href;
        }
        return false;
      },
      launchPanel: function (flag, from, to, callback) {
        var _callback, _this;

        _this = this;

        if (callback) {
          _callback = function () {
            callback();
            _this.moveElm(flag);
          };
        } else {
          _callback = function () {
            _this.moveElm(flag);
          };
        }

        this.animation.animate({
          left: {
            from: from,
            to: to
          }
        }, {
          afterwards: _callback
        });
      },
      getLeft: function () {
        return parseInt(modules.getStyle(this.target, 'left'), 10);
      },
      getPoint: function () {
        return ({
          left: parseInt(modules.getStyle(this.target, 'left'), 10),
          top:  parseInt(modules.getStyle(this.target, 'top'), 10)
        });
      },
      eventStart: function (event) {
        var _pos, _scroll;
        if (this.is_touch || this.process_num !== 0) {
          return;
        }

        this.touch_current = this.getParent(event.target || event.srcElement);
        this.current_index = this.touch_current.ID;

        if (this.current_index === this.last_index) {
          this.is_touch = false;
          return;
        }

        this.is_complete = false;
        this.is_touch = true;
        _pos = this.pagePosition(event);
        _scroll = this.getPoint();
        this.start_x = _pos.x;
        this.start_y = _pos.y;
        this.positionX = _scroll.left;
        this.positionY = _scroll.top;
        this.is_complete = false;

        this.clearTimer();
        this.process_num = 1;

//        if (!this.enable_touch) {
          this.disableEvent(event);
//        }
      },
      eventMove: function (event) {
        var _page;

        if (!this.is_touch || this.process_num === 3) {
          return;
        }

        _page = this.calcPoint(event);
        this.style.left = _page.left + 'px';

        this.process_num = 2;
//        if (!this.enable_touch) {
          this.disableEvent(event);
//        }
      },

      /**
       * @param event
       */
      eventEnd: function (event) {
        var _page, _left, _distance, _flag, _this;


        if (!this.is_touch) {
          return;
        }

        _this = this;
        _page = this.calcPoint(event);
        _left = _page.left;
        _distance = _page.x - this.start_x;
        _flag = false;

        this.is_touch = false;

        if (_distance > 0) {
          _flag = true;
        }

        this.touch_last = this.getParent(event.target || event.srcElement);

        if (this.start_x === _page.x || this.process_num === 1) {
          this.gotoJump(this.touch_last);
        }

        this.process_num = 3;

        if (Math.abs(_distance) >= this.judge) {
          this.setNext(_flag);
          this.changeIndex(_flag);
          this.launchPanel(_flag, _left, this.positionX, function () {
            _this.process_num = 0;
          });

        } else {
          this.process_num = 0;
          this.animation.animate(
              { left: { from: _left, to: -this.away }},
              { afterwards: function () {
                _this.setTimer();
              }}
          );
        }


//        if (!this.enable_touch) {
        this.disableEvent(event);
//        }
      },

      calcPoint: function (event_obj) {
        var _page;
        _page = this.pagePosition(event_obj);
        return ({
          x: _page.x,
          y: _page.y,
          left: this.positionX - (this.start_x - _page.x),
          top : this.positionY - (this.start_y - _page.y)
        });
      }
    });

    return FlickLooper;
  }());





  MoresVisual.Loading = (function () {

    /**
     * @param target
     * @param callback
     * @param duration
     * @param fps
     * @param mX
     * @param mY
     * @param dX
     * @param dY
     * @constructor
     */
    function Loading(target, callback, duration, fps, mX, mY, dX, dY) {
      this.target = target;
      this.styles = this.target.style;
      this.callback = callback || null;
      this.duration = duration || 1000;
      this.fps = fps || 16;
      this.moveX = mX || 0.5;
      this.moveY = mY || -0.5;
      this.defX = dX || -80;
      this.defY = dY || 80;
      this.timerID = -1;
      this.initialize();
    }

    Loading.prototype = {
      timer_start: 0,
      timer_stop: 0,
      initialize: function () {
        this.setTimer();
      },
      setTimer: function () {
        this.normalAnim();
        // this.enterFrame();
      },
      clearTimer: function () {
        if (this.timerID) {
          this.timer_stop = mixin.now();
          clearInterval(this.timerID);
          this.timerID = -1;
          if (this.callback) {
            this.callback();
          }
        }
      },
      normalAnim: function () {
        var _self = this,
            posX = this.defX,
            posY = this.defY;

        this.timer_start = mixin.now();
        this.timerID = setInterval(function () {
          _self.styles.backgroundPosition = posY + 'px ' + posX + 'px';
          posY += _self.moveY;
          posX += _self.moveX;
          if (posY < 0) {
            _self.clearTimer();
          }
        }, this.fps);
      },
      now: function () {
        return (new Date()).getTime();
      },
      enterFrame: function () {
        var time,
            from,
            distance,
            duration,
            val,
            _self = this,
            goal = 0;

        this.timer_start = this.now();
        from = this.defX;
        distance = goal - this.defX;
        duration = this.duration;

        var timerID = setInterval(function () {
          time = (_self.now()) - _self.timer_start;
          val = _self.easing(time, from, distance, duration);
          if (time >= _self.duration) {
            clearInterval(timerID);
            val = 0;
            _self.callback();
          }
          _self.styles.backgroundPosition = (-val) + 'px ' + val + 'px';

        }, this.fps);
      },
      easing: function (t, b, c, d) {
        return c * t / d + b;
      }
    };

    return Loading;
  }());





  /**
   * style sheet initialze
   * @type {string}
   */
  MoresVisual.styles = '';

  if (!MoresVisual.refferer) {
    MoresVisual.styles += '#pageTitle img{';
    MoresVisual.styles += 'filter:alpha(opacity=0);-ms-filter:"alpha(opacity=0)";';
    MoresVisual.styles += '-moz-opacity:0;-khtml-opacity:0;opacity:0;}';
  }

  MoresVisual.styles += '#flickContainer{visibility:hidden;left:-954px;}';
  MoresVisual.styles += '#flickContainer li{cursor:hand;cursor:grab;cursor:-moz-grab;cursor:-webkit-grab;}';

  new MoresVisual.Includes({
   style: MoresVisual.styles
  });





  /**
   *
   * @returns {MoresVisual.FlickLooper} instance
   */
  MoresVisual.createInstance = function () {
    var _container;

    MoresVisual.paddles.parent = document.getElementById('paddles');


    /**
     * @type {MoresVisual.Paddle}
     */
    MoresVisual.paddles.next = new MoresVisual.Paddle({
      parent: document.getElementById('paddleNext')
    });

    /**
     *
     * @type {MoresVisual.Paddle}
     */
    MoresVisual.paddles.preview = new MoresVisual.Paddle({
      parent: document.getElementById('paddlePrev')
    });

    _container = document.getElementById('flickContainer');
    _container.style.visibility = 'visible';

    /**
     * @type {MoresVisual.FlickLooper}
     */
    return new MoresVisual.FlickLooper({
      wrapper: document.getElementById('headerGalleryInner'),
      target: _container,
      icon: {
        parent: document.getElementById('iconSet')
      },
      paddle: {
        parent: MoresVisual.paddles.parent,
        next: MoresVisual.paddles.next.parent,
        prev: MoresVisual.paddles.preview.parent
      },
      duration: 350,
      delay: 6000,
      judge: 0.3
    });
  };





  /**
   *
   * @type {{
   *  children: null,
   *  timerID: number,
   *  setTimer: Function,
   *  clearTimer: Function,
   *  setListener: Function,
   *  removeListener: Function,
   *  listener: Function,
   *  toggle: Function
   * }}
   */
  MoresVisual.paddleSetup = {
    children: null,
    timerID: 0,
    setTimer: function () {
      this.timerID = setTimeout(function () {
        MoresVisual.paddles.preview.listener(true);
        MoresVisual.paddles.next.listener(true);
      }, 2000);
    },
    clearTimer: function () {
      if (this.timerID) {
        clearTimeout(this.timerID);
      }
    },
    nexListener: function () {
      MoresVisual.paddleSetup.listener(MoresVisual.paddleSetup.children[0]);
    },
    previewListener: function () {
      MoresVisual.paddleSetup.listener(MoresVisual.paddleSetup.children[1]);
    },
    setListener: function () {
      var _paddle = MoresVisual.paddles,
          _setup = MoresVisual.paddleSetup;
      this.setTimer();
      this.children = [_paddle.preview.child[0], _paddle.next.child[0]];

      mixin.addEvent(_paddle.preview.parent, 'mouseover', _setup.nexListener);
      mixin.addEvent(_paddle.next.parent, 'mouseover', _setup.previewListener);

    },
    removeListener: function () {
      var _paddle = MoresVisual.paddles,
          _setup = MoresVisual.paddleSetup;
      mixin.removeEvent(_paddle.preview.parent, 'mouseover', _setup.nexListener);
      mixin.removeEvent(_paddle.next.parent, 'mouseover', _setup.previewListener);
    },
    listener: function (elm) {
      var target = MoresVisual.paddleSetup.toggle(elm);
      if (target) {
        target.style.visibility = 'hidden';
        MoresVisual.paddleSetup.clearTimer();
        MoresVisual.paddleSetup.removeListener();
      }
    },
    toggle: function (elm) {
      var _child, _target;
      _child = MoresVisual.paddleSetup.children;
      _target = null;
      for (var i = 0, j = _child.length; i < j; i += 1) {
        if (elm !== _child[i]) {
          _target = _child[i];
          break;
        }
      }
      return _target;
    }
  };





  /**
   * Initialize
   */
  MoresVisual.launch = function () {
    var loading_animation, page_title, delete_opening, flick, _launcher;

    MoresVisual.Ready = null;
    mixin.removeEvent(window, 'load', MoresVisual.launch);


    if (MoresVisual.Browser.ltIE8) {
      document.getElementsByTagName('body')[0].onunload = function () {};
    }

    page_title = document.getElementById('pageTitle');

    /**
     * @type {MoresVisual.Animation}
     */
    loading_animation = new MoresVisual.Animation({
      target: page_title.getElementsByTagName('img')[0],
      option: {
        easing: 'linear',
        duration: 1000
      }
    });

    /**
     *
     * @type {MoresVisual.Animation}
     */
    delete_opening = new MoresVisual.Animation({
      target: page_title,
      option: {
        duration: 550
      }
    });



    /**
     * リファラーに関係なく必ず実行される関数群
     * @type {{makeFlick: Function, paddleView: Function, setUp: Function}}
     * @private
     */
    _launcher = {
      makeFlick: function () {
        flick = MoresVisual.createInstance();
      },
      paddleView: function () {

        if (!MoresVisual.Browser.ltIE6 && !MoresVisual.Browser.isTouch) {
          MoresVisual.paddles.preview.listener(false);
          MoresVisual.paddles.next.listener(false);
        }

      },
      setUp: function () {
        setTimeout(function () {
          flick.setTimer();
          delete_opening.animate({
            opacity: {
              from: 1, to: 0
            }
          }, {
            afterwards: function () {
              if (!MoresVisual.Browser.ltIE6 && !MoresVisual.Browser.isTouch) {
                MoresVisual.paddleSetup.setListener();
              }
              page_title.style.display = 'none';

            }
          });
        }, 800);
      }
    };

    if (MoresVisual.refferer) {
      _launcher.makeFlick();
      _launcher.paddleView();
      _launcher.setUp();

    } else {
      setTimeout(function () {
        _launcher.makeFlick();
        loading_animation.animate(
          { opacity: { from: 0, to: 1 }},
          { afterwards: _launcher.paddleView }
        );
      }, 1500);

      new MoresVisual.Loading(
        page_title,
        _launcher.setUp
      );
    }
  };


  /**
   * 引数の関数をDOMの構築完了後に実行する
   * @param fun {Function}
   */
  MoresVisual.Ready = (function () {
    var funcs = [];
    var ready = false;

    function handler(event) {
      if (ready) { return; }

      if (event.type === 'readystatechange' && document.readyState !== 'complete') {
        return;
      }

      for (var i = 0; i < funcs.length; i += 1) {
        funcs[i].call(document);
      }

      ready = true;
      funcs = null;
    }

    if (document.addEventListener) {
      document.addEventListener('DOMContentLoaded', handler, false);
      document.addEventListener('readystatechange', handler, false);
      window.addEventListener('load', handler, false);

    } else if (document.attachEvent) {
      document.attachEvent('onreadystatechange', handler);
      window.attachEvent('onload', handler);
    }

    return function (fun) {
      if (ready) {
        fun.call(document);
      } else {
        funcs.push(fun);
      }
    };

  }());



  /**
   * Initialize
   */
  MoresVisual.Ready(MoresVisual.launch);


}(window));
