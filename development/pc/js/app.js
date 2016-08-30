/**
 * fileOverview:
 * Project:
 * File:
 * Date:
 * Author:
 */

'use strict';

import dat from "dat-gui";
import GlobalData from "../../common/js/app/data/GlobalData";
import WindowUtil from "../../common/js/app/browser/WindowUtil";
import DOMUtil from "../../common/js/app/browser/DOMUtil";
import CanvasView from "./views/CanvasView";
import CanvasModel from "./modells/CanvasModel";
import CanvasController from "./controllers/CanvasController";


/**
 * initialize
 */
DOMUtil.Ready(() => {

  GlobalData.init();

  let canvas = document.createElement('canvas');

  GlobalData.body.appendChild(canvas);

  let model = new CanvasModel;
  let view = new CanvasView(canvas);
  let controller = new CanvasController;

  view.setMC(model, controller);


  let gui = new dat.GUI();

  gui.add(model, 'width').listen();
  gui.add(model, 'height').listen();
  gui.add(model, 'x').listen();
  gui.add(model, 'y').listen();
  gui.add(model, 'radian').listen();
  gui.add(model, 'degree').listen();
  gui.add(model, 'hypotenuse').listen();


  let resize = () => {
    let size = WindowUtil.getScreenSize();

    GlobalData.bodyStyle.width = size.width + 'px';
    GlobalData.bodyStyle.height = size.height + 'px';

    canvas.width = size.width;
    canvas.height = size.height;

    model.updateSize(size);
  };


  let timerID = 0;


  let resizeHandler = () => {

    if (timerID) {
      clearTimeout(timerID);
    }

    timerID = setTimeout(resize, 100);

  };

  resize();
  WindowUtil.instance.addEventListener('resize', resizeHandler);

  view.draw();


});


