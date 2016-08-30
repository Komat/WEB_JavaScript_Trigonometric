/**
 * fileOverview:
 * Project:
 * File: CanvasController
 * Date: 8/30/16
 * Author: komatsu
 */

'use strict';


import DOMUtil from "../../../common/js/app/browser/DOMUtil";


export default class CanvasController {

  constructor() {
    this._model = null;
    this._view = null;

    this.positionX = 0;
    this.positionY = 0;

    this.eventHandler = this._eventHandler.bind(this);

  }

  setMV(model, view) {
    this._model = model;
    this._view = view;

    this.addEvent();

  }

  _eventHandler(event) {
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

  downHandler(event) {

    let position = DOMUtil.getEventPoint(event);
    let included = this._model.includeTarget(position);

    if (included) {
      this._view.changeGrab(true);

      window.addEventListener('mousemove', this.eventHandler);
      window.addEventListener('mouseup', this.eventHandler);
    }
  };

  moveHandler(event) {
    let position = DOMUtil.getEventPoint(event);
    this._model.move(position);
  };

  upHandler(event) {
    this._view.changeGrab(false);
    window.removeEventListener('mousemove', this.eventHandler);
    window.removeEventListener('mouseup', this.eventHandler);
    this.startX = 0;
    this.startY = 0;
  };


  addEvent() {
    this._view._canvas.addEventListener('mousedown', this.eventHandler, false);
  }

  removeEvent() {
    this._view._canvas.addEventListener('mousedown', this.eventHandler, true);
  }
}