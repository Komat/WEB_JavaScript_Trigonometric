/**
 * fileOverview:
 * Project:
 * File:
 * Date:
 * Author:
 */


'use strict';


import Module from "../utils/Module";
import Selector from "./Selector";
import BrowserUtil from "./BrowserUtil";


// delegate 関連
let _delegates = {};
let paramCount = 3;
let createParams = function (parent, target, handler) {
  return {
    parent: parent,
    target: target,
    handler: handler
  }
};


// パーサー関連
let trimLeft = /^\s+/;
let trimRight = /\s+$/;


/**
 *
 * @param str
 * @returns {*}
 */
let trim = function (str) {
  return str.replace(trimLeft, '').replace(trimRight, '');
};


/**
 *
 * @param before
 * @param after
 * @param getFirstResult
 * @returns {Function}
 */
let makeParser = function (before, after, getFirstResult) {
  return function (html, doc) {
    let parser = doc.createElement('div');
    let fragment = doc.createDocumentFragment();
    parser.innerHTML = before + html + after;
    let node = getFirstResult(parser);
    let nextNode;
    while (node) {
      nextNode = node.nextSibling;
      fragment.appendChild(node);
      node = nextNode;
    }
    return fragment;
  };
};


let defaultParser = makeParser('', '', Selector.getFirstChild);


let parsers = {
  td: makeParser('<table><tbody><tr>', '</tr><\/tbody></table>', Selector.getFirstGreatGreatGrandChild),
  tr: makeParser('<table><tbody>', '</tbody><\/table>', Selector.getFirstGreatGrandChild),
  tbody: makeParser('<table>', '<\/table>', Selector.getFirstGrandChild),
  col: makeParser('<table><colgroup>', '<\/colgroup></table>', Selector.getFirstGreatGrandChild),
  option: makeParser('<select><option>a<\/option>', '<\/select>', Selector.getSecondGrandChild)
};


parsers.th = parsers.td;
parsers.thead = parsers.tbody;
parsers.tfoot = parsers.tbody;
parsers.caption = parsers.tbody;
parsers.colgroup = parsers.tbody;


let tagRegExp = /^<([a-z]+)/i; // first group must be tag name


/*
 * className
 */
let _regHistory = {};


let _regClassName = function (className) {
  if (_regHistory[className]) {
    return _regHistory[className];
  }

  let reg = new RegExp('(^|\\s+)' + className + '(\\s+|$)');
  _regHistory[className] = reg;
  return reg;
};


let _trim = function (str) {
  return str.replace(/^\s+|\s+$/g, '');
};


/**
 * READY
 */
let _ready = (function () {
  let funcs = [];
  let isReady = document.readyState === 'complete';

  let READY_STATE_CHANGE = 'readystatechange';
  let ON_READY_STATE_CHANGE = 'on_' + READY_STATE_CHANGE;
  let LOAD = 'load';
  let DOMContentLoaded = 'DOMContentLoaded';

  let counter = 0;

  let one = function (elm, type, callback, bubbling) {

    let handler = function () {
      if (elm.removeEventListener) {
        elm.removeEventListener(type, handler, false);
      }
      else if (elm.detachEvent) {
        elm.detachEvent('on' + type, handler);
      }
      else {
        elm['on' + type] = null;
      }
      callback.apply(null, arguments);
    }.bind(this);

    if (elm.addEventListener) {
      elm.addEventListener(type, handler, (bubbling || false));
    }
    else if (elm.attachEvent) {
      elm.attachEvent('on' + type, handler);
    }
    else {
      elm['on' + type] = handler;
    }

  };

  /**
   *
   * @param event
   */
  let handler = function (event) {
    if (isReady) {
      return;
    }

    if (event.type === READY_STATE_CHANGE && document.readyState !== 'complete') {
      return;
    }

    for (let i = 0; i < funcs.length; i += 1) {
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
    }
    else {
      funcs.push(fun);
    }
  };
}());


export default class DOMUtil {
  /**
   *
   * @param elem
   * @param type
   * @param handler
   * @param bubbling
   */
  static addEventListener(elem, type, handler, bubbling) {

    if (!elem || !type || !handler) {
      return;
    }

    if (elem.addEventListener) {
      elem.addEventListener(type, handler, (bubbling || false));
    }
    else if (elem.attachEvent) {
      elem.attachEvent('on' + type, handler);
    }
    else {
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
  static addEvent(elem, type, handler, bubbling) {
    DOMUtil.addEventListener(elem, type, handler, bubbling);
  }

  /**
   *
   * @param elem
   * @param type
   * @param handler
   * @param bubbling
   */
  static on(elem, type, handler, bubbling) {
    DOMUtil.addEventListener(elem, type, handler, bubbling);
  }

  /**
   *
   * @param elem
   * @param type
   * @param handler
   * @param bubbling
   */
  static bind(elem, type, handler, bubbling) {
    DOMUtil.addEventListener(elem, type, handler, bubbling);
  }


  /**
   *
   * @param elm
   * @param type
   * @param callback
   * @param bubbling
   */
  static one(elm, type, callback, bubbling) {

    let handler = () => {
      this.off(elm, type, handler);
      callback.apply(null, arguments);
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
  static removeEventListener(elem, type, handler, bubbling) {

    if (!elem || !type || !handler) {
      return;
    }

    if (elem.removeEventListener) {
      elem.removeEventListener(type, handler, (bubbling || false));
    }
    else if (elem.detachEvent) {
      elem.detachEvent('on' + type, handler);
    }
    else {
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
  static removeEvent(elem, type, handler, bubbling) {
    DOMUtil.removeEventListener(elem, type, handler, bubbling);
  }


  /**
   *
   * @param elem
   * @param type
   * @param handler
   * @param bubbling
   */
  static unbind(elem, type, handler, bubbling) {
    DOMUtil.removeEventListener(elem, type, handler, bubbling);
  }


  /**
   *
   * @param elem
   * @param type
   * @param handler
   * @param bubbling
   */
  static off(elem, type, handler, bubbling) {
    DOMUtil.removeEventListener(elem, type, handler, bubbling);
  }


  /**
   *
   * @param event
   */
  static cancelEvent(event) {
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
  static stopEvent(event) {
    if (!event) {
      return;
    }
    if (event.stopPropagation) {
      event.stopPropagation();
    }
    else {
      event.cancelBubble = true;
    }
  }


  /**
   *
   * @param event
   */
  static disableEvent(event) {

    if ('originalEvent' in event && event.hasOwnProperty('originalEvent')) {
      event = event.originalEvent;
    }

    DOMUtil.stopEvent(event);
    DOMUtil.cancelEvent(event);
  };


  /**
   *
   * @param element
   * @param event
   * @returns {*}
   */
  static triggerEvent(element, event) {
    let evt;

    let isString = function (it) {
      return typeof it == 'string' || it instanceof String;
    };

    element = (isString(element)) ? document.getElementById(element) : element;
    if (document.createEventObject) {
      evt = document.createEventObject();
      return element.fireEvent('on' + event, evt)
    } else {
      evt = document.createEvent('HTMLEvents');
      evt.initEvent(event, true, true);
      return !element.dispatchEvent(evt);
    }

  };


  /**
   *
   * @param parent
   * @param target
   * @param type
   * @param handler
   */
  static delegate(parent, target, type, handler) {

    _delegates[type] = _delegates.hasOwnProperty(type) ? _delegates[type] : [];

    let _children = null;
    let selectorType = '';

    if (target.indexOf('.') > -1) {
      selectorType = 'className';
      target = target.replace(/\./ig, '');
      _children = Module.makeArray(Selector.getElementsByClassName(target, parent));
    } else if (target.indexOf('#') > -1) {
      selectorType = 'id';
      _children = [document.getElementById(target)];
      target = target.replace(/#/ig, '');
    } else {
      selectorType = 'tag';
      _children = Module.makeArray(parent.getElementsByTagName(target));
      target = target.toUpperCase();
    }

    let delegateHandler = function (event) {

      let _target = event.target || event.srcElement;

      if (!_target) {
        return;
      }

      let eventTarget = null;

      switch (selectorType) {
        case 'className':
          eventTarget = DOMUtil.hasClass(_target, target) ? _target : Selector.getParentClassNameNode(_target, target);
          break;
        case 'id':
          eventTarget = _target.id === target ? _target : Selector.getParentIdNameNode(_target, target);
          break;
        case 'tag':
          eventTarget = _target.tagName === target ? _target : Selector.getParentNode(_target, target);
          break;
        default:
          eventTarget = _target.tagName === target ? _target : Selector.getParentNode(_target, target);
          break;
      }

      if (!eventTarget) {
        return;
      }

      handler({
        originalEvent: event,
        target: eventTarget,
        index: _children.indexOf(eventTarget),
        stop: function () {
          DOMUtil.disableEvent(event);
        },
        preventDefault: function () {
          DOMUtil.disableEvent(event);
        }
      });

    };

    let params = createParams(parent, target, handler);

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
  static undelegate(parent, target, type, handler) {

    let listeners = _delegates[type] ? _delegates[type] : null;

    if (!listeners) {
      return;
    }

    let params = createParams(parent, target, handler);

    let sameCount = 0;

    listeners.forEach(function (listener) {

      sameCount = 0;

      for (let prop in listener) {
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
  static parseHTML(html, doc) {
    html = trim(html);

    let parser = defaultParser;
    let matches = html.match(tagRegExp);
    if (matches) {
      let name = matches[1].toLowerCase();
      if (Object.prototype.hasOwnProperty.call(parsers, name)) {
        parser = parsers[name];
      }
    }
    return parser(html, doc || document);
  };


  static getEventPoint(event) {
    if (BrowserUtil.ltIE8) {
      let target = document.documentElement;
      return ({
        x: event.clientX + target.scrollLeft,
        y: event.clientY + target.scrollTop
      });
    } else if (BrowserUtil.enableTouch) {
      let target = event.changedTouches[0];
      return ({
        x: target.pageX,
        y: target.pageY
      })
    } else {
      return ({
        x: event.pageX,
        y: event.pageY
      });
    }
  }

  /**
   *
   * @returns {*}
   */
  static removeProp() {
    let _style = document.body.style;
    return (_style.removeProperty ? _style.removeProperty : _style.removeAttribute);
  }


  /**
   * @param element
   * @param className
   */
  static addClass(element, className) {
    let defaultClassName = element.className;
    let result = false;
    if (!DOMUtil.hasClass(element, className)) {
      element.className += (defaultClassName ? ' ' : '') + className;
      result = true;
    }
    return result;
  };


  /**
   *
   * @param element
   * @param className
   * @param [_except]
   */
  static removeClass(element, className, _except) {

    let defaultClassName = element.className;
    let newClassName = '';
    let result = false;

    if (_except || DOMUtil.hasClass(element, className)) {
      newClassName = _trim(defaultClassName.replace(_regClassName(className), ' '));
      element.className = newClassName;
      result = true;
    }
    return result;
  };


  /**
   * @param element
   * @param className
   */
  static toggleClass(element, className) {
    let methodName = DOMUtil.hasClass(element, className) ? 'removeClass' : 'addClass';
    DOMUtil[methodName](element, className);
  };


  /**
   * @param element
   * @param className
   * @returns {boolean}
   */
  static hasClass(element, className) {
    let defaultClassName = element.className;

    if (!defaultClassName || defaultClassName.length === 0) {
      return false;
    } else if (defaultClassName === className) {
      return true;
    }

    return _regClassName(className).test(defaultClassName);
  };


  /**
   * 指定要素の中のテキストを取得
   */
  static getText(elem) {
    let _docElem = document.documentElement;

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
  static text(element, string) {
    (element.textContent !== undefined) ? element.textContent = string : element.innerText = string;
  }


  /**
   *
   * @param element
   */
  static show (element) {
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
  static hide(element) {
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
  static empty(element) {
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
  static css(elStyle, styles) {
    if (!elStyle || !styles) {
      return;
    }

    elStyle = 'style' in elStyle ? elStyle.style : elStyle;

    for (let prop in styles) {
      if (styles.hasOwnProperty(prop)) {
        elStyle[prop] = styles[prop];
      }
    }
  }


  /**
   *
   * @param rurles  {array}
   */
  static makeCSSRules(rurles) {
    if (!Array.isArray(rurles) || rurles.length <= 0) {
      return;
    }
    if (document.createStyleSheet) {
      let _sheet = document.createStyleSheet();
      _sheet.cssText = rurles.join('');
      _sheet = null;
    } else {
      let _style = document.createElement('style');
      let _head = document.getElementsByTagName('head')[0];
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
  static getPosition(element) {
    return {left: element.offsetLeft, top: element.offsetTop};
  }


  /**
   *
   * @param element
   * @returns {*}
   */
  static getOffset(element) {
    let _x, _y;
    _x = _y = 0;
    if (!element) {
      return false;
    }

    do {
      _x += element.offsetLeft;
      _y += element.offsetTop;
    } while ((element = element.offsetParent));

    return ({top: _y, left: _x});
  }


  static getOffsetPosition(el) {
    var xPos = 0;
    var yPos = 0;

    while (el) {
      if (el.tagName == "BODY") {
        var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
        var yScroll = el.scrollTop || document.documentElement.scrollTop;

        xPos += (el.offsetLeft - xScroll + el.clientLeft);
        yPos += (el.offsetTop - yScroll + el.clientTop);
      } else {
        // for all other non-BODY elements
        xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
        yPos += (el.offsetTop - el.scrollTop + el.clientTop);
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
  static getRect(element) {
    let rect = DOMUtil.getOffset(element);
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
  static getStyle(elem) {
    let _styleData = null;

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
  static getStylePropertyfunction(propName) {

    let prefixes = 'Webkit Moz ms Ms O'.split(' ');
    let docElemStyle = document.documentElement.style;

    if (!propName) {
      return;
    }

    if (typeof docElemStyle[propName] === 'string') {
      return propName;
    }

    propName = propName.charAt(0).toUpperCase() + propName.slice(1);

    let prefixed;
    for (let i = 0, len = prefixes.length; i < len; i++) {
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
  static getElementSize(elem) {

    let getStyleSize = function (val) {
      let num = parseFloat(val);

      let isValid = val.indexOf('%') === -1 && !isNaN(num);
      return isValid && num;
    };

    let measurements = [
      'paddingLeft',
      'paddingRight',
      'paddingTop',
      'paddingBottom',
      'marginLeft',
      'marginRight',
      'marginTop',
      'marginBottom',
      'borderLeftWidth',
      'borderRightWidth',
      'borderTopWidth',
      'borderBottomWidth'
    ];

    let getZeroSize = function () {
      let size = {
        width: 0,
        height: 0,
        innerWidth: 0,
        innerHeight: 0,
        outerWidth: 0,
        outerHeight: 0
      };

      for (let i = 0, len = measurements.length; i < len; i++) {
        let measurement = measurements[i];
        size[measurement] = 0;
      }
      return size;
    };

    let boxSizingProp = DOMUtil.getStyleProperty('boxSizing');
    let isBoxSizeOuter;

    (function () {
      if (!boxSizingProp) {
        return;
      }

      let _div = document.createElement('div');
      _div.style.width = '200px';
      _div.style.padding = '1px 2px 3px 4px';
      _div.style.borderStyle = 'solid';
      _div.style.borderWidth = '1px 2px 3px 4px';
      _div.style[boxSizingProp] = 'border-box';

      let body = document.body || document.documentElement;
      body.appendChild(_div);
      let style = DOMUtil.getStyle(_div);

      isBoxSizeOuter = getStyleSize(style.width) === 200;
      body.removeChild(_div);
    }());

    let mungeNonPixel = function (elem, value) {

      if (window.getComputedStyle || value.indexOf('%') === -1) {
        return value;
      }

      let style = elem.style;
      let left = style.left;
      let rs = elem.runtimeStyle;
      let rsLeft = rs && rs.left;

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


    if (!elem || typeof elem !== 'object' || !elem.nodeType) {
      return;
    }

    let style = DOMUtil.getStyle(elem);

    if (style.display === 'none') {
      return getZeroSize();
    }

    let size = {};
    size.width = elem.offsetWidth;
    size.height = elem.offsetHeight;

    let isBorderBox = size.isBorderBox = !!( boxSizingProp &&
    style[boxSizingProp] && style[boxSizingProp] === 'border-box' );

    for (let i = 0, len = measurements.length; i < len; i++) {
      let measurement = measurements[i];
      let value = style[measurement];
      value = mungeNonPixel(elem, value);
      let num = parseFloat(value);
      size[measurement] = !isNaN(num) ? num : 0;
    }

    let paddingWidth = size.paddingLeft + size.paddingRight;
    let paddingHeight = size.paddingTop + size.paddingBottom;
    let marginWidth = size.marginLeft + size.marginRight;
    let marginHeight = size.marginTop + size.marginBottom;
    let borderWidth = size.borderLeftWidth + size.borderRightWidth;
    let borderHeight = size.borderTopWidth + size.borderBottomWidth;

    let isBorderBoxSizeOuter = isBorderBox && isBoxSizeOuter;

    let styleWidth = getStyleSize(style.width);
    if (styleWidth !== false) {
      size.width = styleWidth + ( isBorderBoxSizeOuter ? 0 : paddingWidth + borderWidth );
    }

    let styleHeight = getStyleSize(style.height);
    if (styleHeight !== false) {
      size.height = styleHeight + ( isBorderBoxSizeOuter ? 0 : paddingHeight + borderHeight );
    }

    size.innerWidth = size.width - ( paddingWidth + borderWidth );
    size.innerHeight = size.height - ( paddingHeight + borderHeight );

    size.outerWidth = size.width + marginWidth;
    size.outerHeight = size.height + marginHeight;

    return size;
  }


  /**
   * 画像のサイズを取得
   * @param image
   * @returns {{width: *, height: *}}
   */
  static getImageNaturalSize(image) {
    let mem;
    let w = image.width,
      h = image.height;

    if (typeof image.naturalWidth !== 'undefined') {
      w = image.naturalWidth;
      h = image.naturalHeight;

    } else if (typeof image.runtimeStyle !== 'undefined') {
      let run = image.runtimeStyle;
      mem = {w: run.width, h: run.height};
      run.width = 'auto';
      run.height = 'auto';
      w = image.width;
      h = image.height;
      run.width = mem.w;
      run.height = mem.h;

    } else {
      mem = {w: image.width, h: image.height};
      image.removeAttribute('width');
      image.removeAttribute('height');
      w = image.width;
      h = image.height;
      image.width = mem.w;
      image.height = mem.h;
    }

    return {width: w, height: h};
  };


  /**
   *
   * @param func
   */
  static Ready(func) {
    _ready(func);
  }
}
