/**
 * fileOverview:
 * Project:
 * File: CanvasModel
 * Date: 8/30/16
 * Author: komatsu
 */

'use strict';

import EventEmitter from "events";
import WindowUtil from "../../../common/js/app/browser/WindowUtil";
import MathTrig from "../utils/MathTrig";

const DEFAULT_X = 100;

const DEFAULT_Y = 100;

const CIRCLE_SIZE = 15;

export default class CanvasModel extends EventEmitter {
  constructor() {
    super();

    this.circleSize = CIRCLE_SIZE;
    this.halfSize = this.circleSize * .5;

    this.width = 0;
    this.height = 0;
    this.centerX = 0;
    this.centerY = 0;

    this.x = DEFAULT_X;
    this.y = DEFAULT_Y;
    this._x = this.x;
    this._y = this.y;

    this.degree = 0;
    this.radian = 0;
    this.hypotenuse = 0;

    this.update();

  }

  update() {
    let size = WindowUtil.getScreenSize();
    this.updateSize(size);
    this.updateData();
    this.emit('update', this.getData());
  }

  updateSize(size) {
    this.width = size.width;
    this.height = size.height;
    this.centerX = this.width * .5;
    this.centerY = this.height * .5;
    this._x = this.x + this.centerX;
    this._y = this.y * -1 + this.centerY;
  }


  updateData() {
    this.radian = Math.atan2(this.y, this.x);
    this.degree = this.radian * 180 / Math.PI;
    this.hypotenuse = MathTrig.getHypotenuseFromBaHe(this.x, this.y);
  };


  getData() {
    return Object.assign({}, {
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


  move(pos) {
    this._x = pos.x;
    this._y = pos.y;
    this.x = this.centerX - pos.x;
    this.y = this.centerY - pos.y;
    this.updateData();
    this.emit('update', this.getData());
  }



  includeTarget(pos) {
    return (pos.x >= (this._x - this.halfSize)) &&
           (pos.y >= (this._y - this.halfSize)) &&
           (pos.x <= (this._x + this.halfSize)) &&
           (pos.y <= (this._y + this.halfSize));
  }
}