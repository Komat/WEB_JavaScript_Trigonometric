/**
 * fileOverview:
 * Project:
 * File:
 * Date:
 * Author:
 */



'use strict';


import ElementView from "./ElementView";

/**
 *
 * @type {string}
 */
const NAME = 'ElementListView';


export default class ElementListView extends ElementView {
  /**
   *
   * @param options
   */
  constructor(options) {
    super(options);
  }


  /**
   *
   */
  buildChildViews() {
    var childModels = this.getModel().toArray();
    for (var i = 0, len = childModels.length; i < len; i++) {
      this.appendChild(this.createChildView({model: childModels[i]}));
    }
  }


  /**
   * 自動で呼ばれる
   * @param options
   * @returns {ElementView}
   */
  createChildView(options) {
    return new ElementView(options);
  };


  /**
   *
   * @param event
   */
  update(event) {
    if (event.target === this.getModel()) {
      if (event.params.addModel && event.params.addModel.length) {
        this.handleAdd(event.params.addModel);
      }

      if (event.params.deleteModel && event.params.deleteModel.length) {
        this.handleDelete(event.params.deleteModel);
      }
    }
  }


  /**
   *
   * @param childModels
   */
  handleAdd(childModels) {
    for (var i = 0, len = childModels.length; i < len; i += 1) {
      this.appendChild(this.createChildView({model: childModels[i]}));
    }
  };


  /**
   *
   * @param childModels
   */
  handleDelete(childModels) {
    for (var i = 0, iLen = childModels.length; i < iLen; i += 1) {
      var childModel = childModels[i];
      var childViews = this.childNodes;
      for (var j = 0, jLen = childViews.length; j < jLen; j += 1) {
        var childView = childViews[j];
        if (childView.getModel() === childModel) {
          this.removeChild(childView);
          childView.destroy();
          break;
        }
      }
    }
  }


  /**
   *
   */
  destroy() {
    super.destory();
    this.getContainerEl().parentNode.removeChild(this.getContainerEl());
  }

  /**
   *
   * @returns {string}
   */
  get NAME() {
    return NAME;
  }

}
