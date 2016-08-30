/**
 * fileOverview:
 * Project:
 * File:
 * Date:
 * Author:
 */


'use strict';


import Module from "../utils/Module";
import GetTypeOf from "../utils/GetTypeOf";
import DOMUtil from "./DOMUtil";


let trimLeft = /^\s+/;
let trimRight = /\s+$/;

let idRegExp = /^#(\S+)$/;

let tagClassRegExp = /^([\w-]+)?(?:\.([\w-]+))?$/;


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
 * @param obj
 * @param prop
 * @returns {boolean}
 */
let isHostMethod = function (obj, prop) {
  return (typeof obj[prop] === 'function') ||
    ((typeof obj[prop] === 'object') && (obj[prop] !== null)); // Internet Explorer
};


/**
 *
 * @param node
 * @param func
 * @returns {Array}
 */
let filterDOM = function (node, func) {
  let results = [];

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
let firstInDOM = function (node, func) {
  function walk(node) {
    if (func(node)) {
      return node;
    }
    node = node.firstChild;
    while (node) {
      let result = walk(node);
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
let findById = function (id, root) {
  return (root.id === id) ?
    root :
    (isHostMethod(root, 'getElementById')) ?
      root.getElementById(id) :
      (isHostMethod(root, 'querySelector')) ?
        root.querySelector('#' + id) :
        firstInDOM(root, function (node) {
          return node.id === id;
        });
};


export default class Selector {


  static $(selector) {


    if (document.getElementById) {
      return document.getElementById(selector);
    }

    if (document.all) {
      return document.all(selector);
    }
    if (document.layers) {
      let s = '';
      for (let i = 1; i < arguments.length; i++) {
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
  static getElement(id) {
    return document.all && document.all(id) || document.getElementById && document.getElementById(id);
  }


  /**
   *
   * @param className
   * @param parent
   * @param tagName
   * @returns {*}
   */
  static getElementsByClassName(className, parent, tagName) {
    let classElements = null;
    let _parent = parent || document;
    let target = null;

    tagName = tagName || '';

    if (_parent.getElementsByClassName) {
      classElements = _parent.getElementsByClassName(className);

    }
    else if (_parent.querySelectorAll) {
      classElements = _parent.querySelectorAll(tagName + ('.' + className));

    }
    else {
      classElements = [];
      target = _parent.getElementsByTagName(tagName.length > 0 ? tagName : '*') || document.all;

      for (let i = 0, len = target.length; i < len; i += 1) {
        if (DOMUtil.hasClass(target[i], className)) {
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
  static getTagNameClassNameMatcher(tagName, className) {
    let regExp;
    tagName = tagName ? tagName.toUpperCase() : '*';
    if (className) {
      regExp = new RegExp('(?:^|\\s+)' + className + '(?:\\s+|$)');
    }
    return function (element) {
      return (((tagName === '*') ||
      (element.tagName && (element.tagName.toUpperCase() === tagName))) &&
      ((!className) ||
      regExp.test(element.className)));
    }
  }



  /**
   *
   * @param selector
   * @param root
   * @returns {*}
   */
  static findAll (selector, root) {
    selector = trim(selector);
    root = root || document;
    var matches;
    if (matches = selector.match(idRegExp)) {
      var el = findById(matches[1], root);
      return el ? [el] : [];
    }
    else if (matches = selector.match(tagClassRegExp)) {
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
      }
      else {
        return filterDOM(root, tagNameClassNameMatcher);
      }
    }
    else {
      throw new Error('DOMUtil.findAll: Unsupported selector "' + selector + '".');
    }
  }


  /**
   *
   * @param selector
   * @param root
   * @returns {*|document}
   */
  static find (selector, root) {
    selector = trim(selector);
    root = root || document;
    var matches;
    if (matches = selector.match(idRegExp)) {
      return findById(matches[1], root);
    }
    else if (matches = selector.match(tagClassRegExp)) {
      var tagNameClassNameMatcher = Selector.getTagNameClassNameMatcher(matches[1], matches[2]);
      if (isHostMethod(root, 'querySelector')) {
        return tagNameClassNameMatcher(root) ? root : root.querySelector(selector);
      }
      else {
        return firstInDOM(root, tagNameClassNameMatcher);
      }
    }
    else {
      throw new Error('grail.find: Unsupported selector "' + selector + '".');
    }

  }


  /**
   *
   * @param elems
   * @param selector
   * @returns {*}
   */
  static filterFindElements(elems, selector) {
    elems = Module.makeArray(elems);

    var filteredElems = [];

    for (var i = 0, len = elems.length; i < len; i++) {
      var elem = elems[i];

      if (!GetTypeOf.isElement(elem)) {
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
  static getFirstChild(element) {
    return element.firstChild;
  }


  /**
   *
   * @param element
   * @returns {Node}
   */
  static getFirstGrandChild(element) {
    return element.firstChild.firstChild;
  }


  /**
   *
   * @param element
   * @returns {Node}
   */
  static getSecondGrandChild(element) {
    return element.firstChild.firstChild.nextSibling;
  }

  /**
   *
   * @param element
   * @returns {Node}
   */
  static getFirstGreatGrandChild(element) {
    return element.firstChild.firstChild.firstChild;
  }


  /**
   *
   * @param element
   * @returns {Node}
   */
  static getFirstGreatGreatGrandChild(element) {
    return element.firstChild.firstChild.firstChild.firstChild;
  }


  /**
   *
   * @param target
   * @param tag
   * @returns {Function|Node}
   */
  static getParentNode(target, tag) {

    let parent;
    let _target = target.parentNode;

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
  static getParentClassNameNode(target, className) {
    let parent;

    if (DOMUtil.hasClass(target, className)) {
      return target;
    } else {
      while (target) {
        if (DOMUtil.hasClass(target, className)) {
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
  static getParentIdNameNode(target, id) {

    let parent;

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
  static matchesSelector() {

    if (!('Element' in window)) {
      return;
    }

    let elPrototype = window.Element.prototype;

    let matchesMethod = (function () {
      if (elPrototype.matchesSelector) {
        return 'matchesSelector';
      }
      let prefixes = ['webkit', 'moz', 'ms', 'o'];

      for (let i = 0, len = prefixes.length; i < len; i++) {
        let prefix = prefixes[i];
        let method = prefix + 'MatchesSelector';
        if (elPrototype[method]) {
          return method;
        }
      }
    })();


    let match = function (elem, selector) {
      return elem[matchesMethod](selector);
    };


    let checkParent = function (elem) {
      if (elem.parentNode) {
        return;
      }
      let fragment = document.createDocumentFragment();
      fragment.appendChild(elem);
    };


    let query = function (elem, selector) {
      checkParent(elem);

      let elems = elem.parentNode.querySelectorAll(selector);
      for (let i = 0, len = elems.length; i < len; i++) {
        if (elems[i] === elem) {
          return true;
        }
      }
      return false;
    };


    let matchChild = function (elem, selector) {
      checkParent(elem);
      return match(elem, selector);
    };


    let matchesSelector;

    if (matchesMethod) {
      let div = document.createElement('div');
      let supportsOrphans = match(div, 'div');
      matchesSelector = supportsOrphans ? match : matchChild;
    } else {
      matchesSelector = query;
    }

    return matchesSelector;

  };

}
