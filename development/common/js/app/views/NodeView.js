/**
 * fileOverview:
 * Project:
 * File:
 * Date:
 * Author:
 */



'use strict';


import PubSub from "../events/PubSub";

/**
 *
 * @type {string}
 */
const NAME = 'NodeView';


export default class NodeView extends PubSub {
  constructor() {
    super();
    this.parentNode = null;
    this.previousSibling = null;
    this.nextSibling = null;

    this.childNodes = [];
    this.firstChild = null;
    this.lastChild = null;
  }


  /**
   *
   */
  setup() {

  }

  /**
   *
   */
  destory() {

    var children = this.childNodes.slice(0);
    for (var i = 0, len = children.length; i < len; i += 1) {
      children[i].destroy();
    }

    this.childNodes = null;
    this.firstChild = null;
    this.lastChild = null;

    this.parentNode = null;
    this.previousSibling = null;
    this.nextSibling = null;
  }


  /**
   *  子要素があるかないか
   * @returns {boolean}
   */
  hasChildNodes() {
    return this.childNodes.length > 0;
  };


  /**
   *
   * @param newChild
   * @param oldChild
   * @private
   */
  _nodeViewInsertBefore(newChild, oldChild) {
    if (arguments.length < 2) {
      throw new Error(this.Name + '.insertBefore: not enough arguments.');
    }

    if (oldChild === undefined) {
      oldChild = null;
    }

    if ((newChild === oldChild) ||
      (oldChild && (oldChild.previousSibling === newChild)) ||
      ((oldChild === null) && this.lastChild === newChild)) {
      return;
    }

    var node = this;
    while (node) {
      if (node === newChild) {
        throw new Error(this.Name + '.insertBefore: Node cannot be inserted at the specified point in the hierarchy.');
      }
      node = node.parentNode;
    }

    var parent = newChild.parentNode;
    if (parent) {
      parent.removeChild(newChild);
    }

    var children = this.childNodes;

    var indexForNewChild;
    if (oldChild === null) {

      indexForNewChild = children.length;
    } else {
      for (var i = 0, ilen = children.length; i < ilen; i++) {
        if (children[i] === oldChild) {
          indexForNewChild = i;
          break;
        }
      }
      if (typeof indexForNewChild !== 'number') {
        throw new Error(this.Name + '.insertBefore: Node was not found.');
      }
    }

    children.splice(indexForNewChild, 0, newChild);
    this.firstChild = children[0];
    this.lastChild = children[children.length - 1];
    newChild.parentNode = this;
    var previousSibling = newChild.previousSibling = (children[indexForNewChild - 1] || null);
    if (previousSibling) {
      previousSibling.nextSibling = newChild;
    }
    var nextSibling = newChild.nextSibling = (children[indexForNewChild + 1] || null);
    if (nextSibling) {
      nextSibling.previousSibling = newChild;
    }
  }


  /**
   *
   * var parent = new AbstractNodeView();
   * var child0 = new AbstractNodeView();
   * parent.insertBefore(child0, null);
   * var child1 = new AbstractNodeView
   * parent.insertBefore(child1, child0);
   *
   */
  insertBefore() {
    this._nodeViewInsertBefore.apply(this, arguments)
  }


  /**
   *
   * var parent = new AbstractNodeView();
   * var child0 = new AbstractNodeView();
   * parent.appendChild(child0);
   * var child1 = new AbstractNodeView
   * parent.appendChild(child1, child0);

   * @param newChild
   */
  appendChild(newChild) {
    if (arguments.length < 1) {
      throw new Error(this.Name + '.appendChild: not enough arguments.');
    }
    this.insertBefore(newChild, null);
  };


  /**
   *
   * var parent = new AbstractNodeView();
   * var child0 = new AbstractNodeView();
   * parent.appendChild(child0);
   * var child1 = new AbstractNodeView
   * parent.replaceChild(child1, child0);
   *
   * @param newChild
   * @param oldChild
   */
  replaceChild(newChild, oldChild) {
    if (arguments.length < 2) {
      throw new Error(this.Name + '.replaceChild: not enough arguments.');
    }
    if (!oldChild) {
      throw new Error(this.Name + '.replaceChild: oldChild must not be falsy.');
    }

    if (newChild === oldChild) {
      return;
    }
    this.insertBefore(newChild, oldChild);
    this.removeChild(oldChild);
  }


  /**
   *
   * var parent = new AbstractNodeView();
   * var child0 = new AbstractNodeView();
   * parent.appendChild(child0);
   * parent.removeChild(child);
   *
   * @param oldChild
   */
  removeChild(oldChild) {
    if (arguments.length < 1) {
      throw new Error(this.Name + '.removeChild: not enough arguments.');
    }
    var children = this.childNodes;
    for (var i = 0, ilen = children.length; i < ilen; i++) {
      if (children[i] === oldChild) {
        var previousSibling = children[i - 1];
        if (previousSibling) {
          previousSibling.nextSibling = oldChild.nextSibling;
        }
        var nextSibling = children[i + 1];
        if (nextSibling) {
          nextSibling.previousSibling = oldChild.previousSibling;
        }
        oldChild.parentNode = null;
        oldChild.previousSibling = null;
        oldChild.nextSibling = null;
        children.splice(i, 1);
        this.firstChild = children[0] || null;
        this.lastChild = children[children.length - 1] || null;
        return;
      }
    }
    throw new Error(this.Name + '.removeChild: node not found.');
  }


  /**
   *
   * @returns {string}
   */
  get NAME() {
    return NAME;
  }
}
