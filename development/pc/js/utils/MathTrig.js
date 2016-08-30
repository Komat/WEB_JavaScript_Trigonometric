/**
 * fileOverview:
 * Project:
 * File: MathTrig
 * Date: 8/30/16
 * Author: komatsu
 */

'use strict';


export default class MathTrig {

  /*********************************************************
   * 角度を求める
   *********************************************************/
  // 度数からラジアンを取得
  static  getRadian(angle) {
    return angle * Math.PI / 180;
  };

  // ラジアンから度数を取得
  static  getDegree(radian) {
    return radian * 180 / Math.PI;
  };

  // 底辺と高さから
  static getAngleFromBaHe(base, height) {
    return Math.atan2(height, base);
  };

  // 底辺と斜辺から
  static getAngleFromBaHy(base, hypotenuse) {
    return Math.acos(base / hypotenuse);
  };

  // 高さと斜辺から
  static getAngleFromHeHy(height, hypotenuse) {
    return Math.asin(height / hypotenuse);
  };


  /*********************************************************
   * 斜辺を求める
   *********************************************************/
  // 底辺と角度から
  static getHypotenuseFromBaAn(base, angle) {
    return base / Math.sin(angle);
  };

  // 高さと角度から
  static getHypotenuseFromHeAn(height, angle) {
    return height / Math.sin(angle);
  };

  // 底辺と高さから
  static getHypotenuseFromBaHe(base, height) {
    return Math.sqrt(Math.pow(base, 2) + Math.pow(height, 2));
  };

  /*********************************************************
   * 高さを求める
   *********************************************************/
  // 底辺と角度から
  static getHeightFromBaAn(base, angle) {
    return base * Math.tan(angle);
  };

  // 斜辺と角度から
  static getHeightFromHyAn(hypotenuse, angle) {
    return hypotenuse * Math.sin(angle);
  };

  // 底辺と斜辺から
  static getHeightFromBaHy(base, hypotenuse) {
    return Math.sqrt(Math.pow(hypotenuse, 2) - Math.pow(base, 2));
  };

  /*********************************************************
   * 底辺を求める
   *********************************************************/
  // 高さと角度から
  static getBaseFromHeAn(height, angle) {
    return height / Math.tan(angle);
  };

  // 斜辺と角度から
  static getBaseFromHyAn(hypotenuse, angle) {
    return hypotenuse * Math.cos(angle);
  };

  // 高さと斜辺から
  static getBaseFromHeHy(height, hypotenuse) {
    return Math.sqrt(Math.pow(hypotenuse, 2) - Math.pow(height, 2));
  };
}