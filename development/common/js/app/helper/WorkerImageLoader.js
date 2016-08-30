/**
 * fileOverview:
 * Project:
 * File:
 * Date:
 * Author:
 */


'use strict';


import BrowserUtil from "../browser/BrowserUtil";
import ImageLoader from "./ImageLoader";


/**
 *
 * @returns {*}
 */
let getWorkerBody = function () {

  let workerBody = (function () {

    self.addEventListener('message', function (event) {

      var xhr, load;

      var xhrList = [];
      var blobList = [];

      var count = 0;
      var errorCount = 0;
      var urls = event.data;
      var urlLength = urls.length;

      var handler = function () {
        if (count === urlLength) {
          self.postMessage({
            'type': 'complete',
            'errorCount': errorCount,
            'count': count,
            'total': urlLength,
            'blobs': blobList
          });
        } else {
          self.postMessage({
            'type': 'change',
            'errorCount': errorCount,
            'count': count,
            'total': urlLength
          });
          load();
        }
      };

      load = function () {

        if (!xhr) {
          xhr = new XMLHttpRequest();
        }

        xhr.open('GET', urls[count], true);

        xhr.responseType = 'blob';

        xhr.onload = function (event) {

          if (this.status === 200) {
            blobList.push(this.response);
          } else {
            blobList.push(null);
          }
          ++count;
          handler();

        };

        xhr.onerror = function () {
          blobList.push(null);
          ++count;
          ++errorCount;
          handler();
        };

        xhr.send();

        xhrList[count] = xhr;

        self.postMessage({
          'type': 'load',
          'src': urls[count]
        });

      };

      load();

    }, false);
  }).toString().trim().match(
    /^function\s*\w*\s*\([\w\s,]*\)\s*{([\w\W]*?)}$/
  )[1];

  return URL.createObjectURL(
    new Blob([workerBody], {type: 'text/javascript'})
  );
};


export default class WorkerImageLoader extends ImageLoader {
  constructor() {
    super();
    this.loader = null;
    BrowserUtil.hasWorkder;
    this.hasWorker = !!('Worker' in window);
    this.worker = null;
    this.workerhandler = this._workerHandler.bind(this);
  }


  /**
   *
   * @param event
   */
  _workerHandler(event) {

    switch (event.data.type) {
      case ImageLoader.LOAD:
        this.trigger(ImageLoader.LOAD, event.data);
        break;
      case ImageLoader.CHANGE:
        this.trigger(ImageLoader.CHANGE, event.data);
        break;
      case ImageLoader.LOAD_COMPLETE:
        this.trigger(ImageLoader.COMPLETE, event.data);
        this.loader.terminate();
        break;
    }
  }


  /**
   *
   */
  start() {
    let i, len, ref, val;
    if (this.total !== 0) {
      if (this.hasWorker) {
        this.loaderWorker(this.urls);
      } else {
        ref = this.urlList;
        for (i = 0; i < this.urlLength; i++) {
          val = ref[i];
          this.loadWithXHR(val);
        }
      }
    }
  }

  /**
   *
   */
  loaderWorker() {
    this.loader = new window.Worker(getWorkerBody());
    this.loader.onmessage = this.workerhandler;
    this.loader.postMessage(this.urlList);
  }


  /**
   *
   * @param url
   */
  loaderXHR(url) {
    var self = this;
    this.loader = new XMLHttpRequest();
    this.loader.open('GET', url, false);
    this.loader.onreadystatechange = function (data) {
      if (xhr.readyState === 4) {
        self.loadComplete();
      }
    };
    this.loader.send(null);
  }

}
