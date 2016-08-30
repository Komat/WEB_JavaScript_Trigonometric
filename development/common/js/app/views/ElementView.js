/**
 * fileOverview:
 * Project:
 * File:
 * Date:
 * Author:
 */



'use strict';


import Module from '../utils/Module';
import AbstractView from "./AbstractView";
import AbstractTemplate from "../templates/AbstractTemplate";
import ViewEvent from '../events/ViewEvent';
import DOMUtil from "../browser/DOMUtil";
import Selector from '../browser/Selector';

/**
 *
 * @type {string}
 */
const NAME = 'ElementView';


/**
 *
 * @type {RegExp}
 */
const ACTION_REGEXP = /^(\S+)\s*(.*)$/;

/**
 *
 * @type {string}
 */
const CONTROLLER_PREFIX = '_viewsBind';



export default class ElementView extends AbstractView {
  /**
   * new constructor({
   *  modelActions: {
   *    update: 'onUpdate'
   *  },
   *  controllerName: 'AbstractController',
   *  controller: AbstractController
   * });
   *
   * @param options
   */
  constructor(options) {

    super(Module.extend({
      modelActions: {
        change: 'update'
      },
      model: null,
      controller: null
    }, options));

    let settings = Module.extend({
      rootEl: null,
      rootElStyle: null,
      doc: global.document,
      template: null,
      templateName: NAME.replace(/(View|)$/, 'Template'),
      uiActions: {},
      moreUIActions: {}
    }, options);

    this._doc = settings.doc;

    this._rootEl = settings.rootEl;
    this._rootElStyle = settings.rootElStyle;

    this._templateName = settings.templateName;
    this._template = settings.template || AbstractTemplate.template;
    this._uiActions = settings.uiActions;

  }


  /**
   *
   * @returns {Node|*}
   */
  build() {
    if (!this._rootEl) {
      this.buildTemplate();
      this.buildUIActions();
      this.buildData();
      this.buildChildViews();
      this.setRootElStyle();
    }
    return this._rootEl;
  }


  /**
   *
   * @returns {Node|*}
   */
  getContainerEl() {
    return this.build();
  }

  /**
   *
   * @param rootEl
   */
  setContainerEl(rootEl) {
    this._rootEl = rootEl;
    this.setRootElStyle();
  }

  /**
   *
   */
  setRootElStyle() {
    if (!!this._rootEl && !this._rootElStyle) {
      this._rootElStyle = this._rootEl.style;
    }
  }

  /**
   *
   * @returns {HTMLDocument|*}
   */
  getDocument() {
    return this._doc || global.document;
  }


  /**
   *
   * @param doc
   */
  setDocument(doc) {
    this._doc = doc;
    var childViews = this.childNodes;
    for (var i = 0, len = childViews.length; i < len; i++) {
      childViews[i].setDocument(doc);
    }
  }


  /**
   *
   * @returns {null|*}
   */
  getTemplate() {
    return this._template;
  }


  /**
   *
   * @param template
   */
  setTemplate(template) {
    this._template = template || this._template || AbstractTemplate.template;
  }


  /**
   *
   */
  buildTemplate() {
    if (!this._rootEl) {
      this._rootEl = DOMUtil.parseHTML(this.getTemplate(), this.getDocument()).firstChild;
    }
  }


  /**
   *
   * @returns {settings.uiActions|{}|*}
   */
  getUIActions() {
    return this._uiActions;
  }


  /**
   *
   * @param uiAction
   */
  setUIActions(uiAction) {
    this._uiActions = Module.extend({}, this._uiActions, uiAction);
  }


  /**
   *
   */
  buildUIActions() {
    var uiActions = this.getUIActions();

    var controller = this.getController();

    if (!controller) {
      return;
    }

    for (var key in uiActions) {
      if (uiActions.hasOwnProperty(key)) {

        var matches = key.match(ACTION_REGEXP),
          eventType = matches[1],
          selector = matches[2],
          methodName = uiActions[key],
          elements = this.findAll(selector);

        if (!(methodName in controller)) {
          continue;
        }

        if (!controller[CONTROLLER_PREFIX + methodName]) {
          controller[CONTROLLER_PREFIX + methodName] = controller[methodName].bind(controller);
        }

        for (var i = 0, len = elements.length; i < len; i++) {
          DOMUtil.off(elements[i], eventType, controller[CONTROLLER_PREFIX + methodName]);
          DOMUtil.on(elements[i], eventType, controller[CONTROLLER_PREFIX + methodName]);
        }
      }
    }
  }


  /**
   * To be overridden by subclasses.
   */
  buildData() {
  }


  /**
   *
   */
  buildChildViews() {
    var childViews = this.childNodes;
    var fragment = document.createDocumentFragment();
    for (var i = 0, iLen = childViews.length; i < iLen; i++) {
      fragment.appendChild(childViews[i].build());
    }
    this.getContainerEl().appendChild(fragment);
  }


  /**
   *
   * @param newChild
   * @param oldChild
   */
  insertBefore(newChild, oldChild) {
    super.insertBefore(newChild, oldChild);
    if (this._rootEl) {
      this.getContainerEl().insertBefore(newChild.build(), oldChild ? oldChild.build() : null);
    }
  }


  /**
   *
   * @param oldChild
   */
  removeChild(oldChild) {
    super.removeChild(oldChild);
    if (this._rootEl) {
      var oldChildRootEl = oldChild.build();
      oldChildRootEl.parentNode.removeChild(oldChildRootEl);
    }
  }

  /**
   *
   * @param selector
   */
  find(selector) {
    return Selector.find(selector, this.getContainerEl());
  }


  /**
   *
   * @param selector
   * @returns {*}
   */
  findAll(selector) {
    return Selector.findAll(selector, this.getContainerEl());
  }


  /**
   *
   * @param css
   */
  css(css) {
    DOMUtil.css(this.getContainerEl().style, css);
  }


  /**
   *
   * @param className
   */
  addClass(className) {
    DOMUtil.addClass(this.getContainerEl(), className);
  }


  /**
   *
   * @param className
   */
  removeClass(className) {
    DOMUtil.removeClass(this.getContainerEl(), className);
  }


  /**
   *
   */
  show() {
    DOMUtil.show(this.getContainerEl());
  }


  /**
   *
   */
  appear() {
    this.show();
    this.trigger(ViewEvent.SHOW_COMPLETE);
  }


  /**
   *
   */
  hide() {
    DOMUtil.hide(this.getContainerEl());
  }


  /**
   *
   */
  disappear() {
    this.hide();
    this.trigger(ViewEvent.HIDE_COMPLETE);
  }


  /**
   *
   * @returns {string}
   */
  get NAME() {
    return NAME;
  }

}
