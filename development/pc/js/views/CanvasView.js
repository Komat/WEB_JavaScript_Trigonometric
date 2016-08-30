/**
 * fileOverview:
 * Project:
 * File: CanvasView
 * Date: 8/30/16
 * Author: komatsu
 */

'use strict';

import EventEmitter from "events";

/** カーソルのプレフィックス判定 */
const CURSOR_GRAB = 'grab';
const CURSOR_GRABBING = 'grabbing';


const THEME_COLOR = '#333';

export default class CanvasView extends EventEmitter {
  constructor(canvas) {
    super();
    this._canvas = canvas;
    this.context = this._canvas.getContext('2d');
    this._model = null;
    this._controller = null;

    this.updateHandler = this._updateHandler.bind(this);

  }

  setMC(model, controller) {
    this._model = model;
    this._controller = controller;
    this._controller.setMV(this._model, this);
    this._model.on('update', this.updateHandler);
  }

  /** TODO: 後でCSS効いてない原因確認 */
  changeGrab(flag = false) {
    this._canvas.style.cursor = !flag ? CURSOR_GRAB : CURSOR_GRABBING;
  }

  /** ステージを空っぽに */
  clearStage(size) {
    this.context.clearRect(0, 0, size.width, size.height);
  }

  /** 縦横中心線 */
  drawCross(size) {
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
  drawCenterDot(size) {
    this.context.strokeStyle = THEME_COLOR;
    this.context.fillStyle = THEME_COLOR;
    this.context.beginPath();
    this.context.arc(size.centerX, size.centerY, 2, 0, 2 * Math.PI, true);
    this.context.fill();
  }


  /** 中心からターゲットを結ぶ斜線 */
  drawTargetFollowLine(size) {
    this.context.lineWidth = 1;
    this.context.strokeStyle = THEME_COLOR;
    this.context.beginPath();
    this.context.moveTo(size.centerX, size.centerY);
    this.context.lineTo(size.x, size.y);
    this.context.closePath();
    this.context.stroke();
  }

  /** ドラッグターゲット */
  drawTarget(size) {
    this.context.beginPath();
    this.context.arc(size.x, size.y, size.size, 0, 2 * Math.PI, true);
    this.context.stroke();
    this.context.fill();
  }

  /** ターゲットから縦中心線を結ぶ縦線 */
  drawVLine(size) {
    this.context.lineWidth = 1;
    this.context.strokeStyle = THEME_COLOR;
    this.context.beginPath();
    this.context.moveTo(size.x, size.centerY);
    this.context.lineTo(size.x, size.y);
    this.context.closePath();
    this.context.stroke();
  }


  /** ターゲットと中心点を結ぶ斜線が半径の円 */
  drawTargetAroundCircle(size) {
    this.context.lineWidth = 1;
    this.context.strokeStyle = THEME_COLOR;
    this.context.fillStyle = THEME_COLOR;
    this.context.beginPath();
    this.context.arc(size.centerX, size.centerY, size.hypotenuse, 0, 2 * Math.PI, true);
    this.context.stroke();
  }


  /** 中心線とターゲットポイントの直角を結ぶ */
  drawDegree(size) {
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
  drawRotate(size) {
    this.context.lineWidth = 1;
    this.context.strokeStyle = THEME_COLOR;
    this.context.beginPath();
    this.context.moveTo(size.centerX, size.centerY);
    this.context.arc(size.centerX, size.centerY, 50, size.degree, 90 / 180 * Math.PI,);
    this.context.fill();
  }


  draw() {
    let size = this._model.getData();
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

  _updateHandler(event) {
    this.draw();
  }
}