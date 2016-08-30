/**
 * fileOverview:
 * Project:
 * File:
 * Date:
 * Author:
 */


'use strict';


import Module from "../utils/Module";

/**
 * 
 * @type {{x: number, y: number, width: number, height: number}}
 */
const DEFAULTS = {
  x: 0,
  y: 0,
  width: 0,
  height: 0
};


export default class Rect {
  /**
   *
   * @param opt
   */
  constructor(opt) {

    let settings = Module.extend({}, DEFAULTS, opt);

    this.x = settings.x;
    this.y = settings.y;
    this.width = settings.width;
    this.height = settings.height;

  }

  /**
   *
   * @param rect
   * @returns {boolean}
   */
  contains(rect) {
    let otherWidth = rect.width || 0;
    let otherHeight = rect.height || 0;
    return this.x <= rect.x && this.y <= rect.y && this.x + this.width >= rect.x + otherWidth && this.y + this.height >= rect.y + otherHeight;
  }


  /**
   *
   * @param rect
   * @returns {boolean}
   */
  overlap(rect) {
    let thisRight = this.x + this.width;
    let thisBottom = this.y + this.height;
    let rectRight = rect.x + rect.width;
    let rectBottom = rect.y + rect.height;

    return this.x < rectRight && thisRight > rect.x && this.y < rectBottom && thisBottom > rect.y;
  }

  /**
   *
   * @param rect
   * @returns {*}
   */
  getMaximalFreeRects(rect) {

    // if no intersection, return false
    if (!this.overlaps(rect)) {
      return false;
    }

    let freeRects = [];
    let freeRect;

    let thisRight = this.x + this.width;
    let thisBottom = this.y + this.height;
    let rectRight = rect.x + rect.width;
    let rectBottom = rect.y + rect.height;

    // top
    if (this.y < rect.y) {
      freeRect = new Rect({
        x: this.x,
        y: this.y,
        width: this.width,
        height: rect.y - this.y
      });
      freeRects.push(freeRect);
    }

    // right
    if (thisRight > rectRight) {
      freeRect = new Rect({
        x: rectRight,
        y: this.y,
        width: thisRight - rectRight,
        height: this.height
      });
      freeRects.push(freeRect);
    }

    // bottom
    if (thisBottom > rectBottom) {
      freeRect = new Rect({
        x: this.x,
        y: rectBottom,
        width: this.width,
        height: thisBottom - rectBottom
      });
      freeRects.push(freeRect);
    }

    // left
    if (this.x < rect.x) {
      freeRect = new Rect({
        x: this.x,
        y: this.y,
        width: rect.x - this.x,
        height: this.height
      });
      freeRects.push(freeRect);
    }

    return freeRects;
  }


  /**
   *
   * @param rect
   * @returns {boolean}
   */
  canFit(rect) {
    return this.width >= rect.width && this.height >= rect.height;
  }

}