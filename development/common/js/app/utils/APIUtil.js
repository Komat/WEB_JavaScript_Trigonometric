/**
 * fileOverview:
 * Project:
 * File: APIUtil
 * Date: 5/19/16
 * Author: komatsu
 */

'use strict';


import EventEmitter from "events";


/**
 * タイムアウト時間
 * @type {number}
 */
const TIMEOUT = 50000;


let jsonToQueryString = (json) => {
  return Object.keys(json).map((key) => {
    return encodeURIComponent(key) + '=' +
      encodeURIComponent(json[key]);
  }).join('&');
};


export default class APIUtil extends EventEmitter {


  static TIMEOUT= TIMEOUT;

  static TYPE = {
    XML: 'application/xml',
    JSON: 'application/json',
    DATA: 'application/x-www-form-urlencoded; charset=UTF-8',
    HTML: 'text/html'
  };


  static ERROR = {
    TYPE: 'Type not found.',
    TARGET: 'Invalid target.',
    CONNECT: 'Connection error.',
    NOT_SUPPORT: 'Not Supported.'
  };


  static POST = 'post';

  static GET = 'get';


  static EVENT = {
    SUCCESS: 'success',
    FAILED: 'failed',
    CANCEL: 'cancel',
    ERROR: 'error',
    TIMEOUT: 'timeout',
    DONE: 'OK',
    UNAOUTH: 'Unauthorized',
    COMPLETE: 'complete',
  };


  static request(apiRequest, url, params, type, async, callback) {

    let request = apiRequest || new APIUtil();

    /**
     *
     */
    var removeListener = function () {
      request.removeListener(APIUtil.EVENT.TIMEOUT, timeoutHandler);
      request.removeListener(APIUtil.EVENT.SUCCESS, _callback);
      request.removeListener(APIUtil.EVENT.FAILED, _callback);
      request.removeListener(APIUtil.EVENT.CANCEL, _callback);
    };


    /**
     *
     */
    var timeoutHandler = function () {
      removeListener();
      request.emit(APIUtil.EVENT.TIMEOUT);
      // TODO: エラー分岐を記述（現在エラーの場合はメッセージのみのためタイプが返って来たら）
      throw new Error('API REQUEST TIME OUT...');
    };


    /**
     *
     * @param event
     * @private
     */
    var _callback = function (event) {
      removeListener();

      var defaults = {
        success: false,
        error: 'ERROR',
        content: null
      };

      if (!event || event.type === APIUtil.EVENT.FAILED || event.type === APIUtil.EVENT.CANCEL) {
        if (callback) {
          callback(event, defaults);
        }

        throw new Error('response is inValid...');

      }

      var jsonData = JSON.parse(event.content.responseText);

      if (!jsonData/* || !!jsonData.error*/) {
      }

      jsonData = Object.assign({}, defaults, jsonData);

      if (callback) {
        callback(event, jsonData);
      }

      request.emit(APIUtil.EVENT.COMPLETE, jsonData);

    };

    request.cancel();
    request.on(APIUtil.EVENT.TIMEOUT, timeoutHandler);
    request.on(APIUtil.EVENT.SUCCESS, _callback);
    request.on(APIUtil.EVENT.FAILED, _callback);
    request.on(APIUtil.EVENT.CANCEL, _callback);

    request.loadData(url, params, type, async);

    return request;

  }

  constructor() {
    super();
    this.httpRequest = this._createHttpRequest();
    this.isLoad = false;
  }


  /**
   * 指定したXMLを読み込む
   * @param _target
   * @param _data
   * @param _method
   * @param _async
   */
  loadXML(_target, _data, _method, _async) {
    this.load(APIUtil.TYPE.XML, _target, _data, _method, _async);
  }


  /**
   * 指定したJSONを読み込む
   * @param _target
   * @param _data
   * @param _method
   * @param _async
   */
  loadJSON(_target, _data, _method, _async) {
    this.load(APIUtil.TYPE.JSON, _target, _data, _method, _async);
  }

  /**
   * 指定したDATAを読み込む
   * @param {string} _target
   * @param {object} _data
   * @param {string} _method (GET｜POST｜PUT｜PROPFIND)
   * @param {boolean} _async
   */
  loadData(_target, _data, _method, _async) {
    this.load(APIUtil.TYPE.DATA, _target, _data, _method, _async);
  };


  /**
   * 読み込みを開始
   * @param _type
   * @param _target
   * @param _data
   * @param _method
   * @param _async
   * @param _options
   * @returns {null}
   */
  load(_type, _target, _data, _method, _async, _options) {

    if (!this.httpRequest) {
      this.emit(APIUtil.EVENT.FAILED, {
        type: APIUtil.EVENT.FAILED,
        target: this,
        content: null
      });
      return null;
    }

    if (!_type) {
      this.emit(APIUtil.EVENT.FAILED, {
        type: APIUtil.EVENT.FAILED,
        target: this,
        content: null
      });
      return null;
    }
    if (!_target) {
      this.emit(APIUtil.EVENT.FAILED, {
        type: APIUtil.EVENT.FAILED,
        target: this,
        content: null
      });
      return null;
    }

    if (!_method) {
      _method = APIUtil.GET;
    }

    var params = '';
    if (_method === APIUtil.GET && _data) {
      for (var s in _data) {
        if (params !== '') {
          params += '&';
        }
        if (_data.hasOwnProperty(s)) {
          params += s + '=' + escape(_data[s]);
        }
      }
    }

    if (_async === null) {
      _async = true;
    }


    this.isLoad = true;

    this.timeoutTimer = setTimeout(function () {
      this.httpRequest.abort();
      this.emit(APIUtil.EVENT.TIMEOUT, {
        type: APIUtil.EVENT.TIMEOUT,
        target: this,
        content: this.httpRequest
      });
    }.bind(this), TIMEOUT);

    this.httpRequest.open(_method, _target + (_method === APIUtil.GET ? '?' + params : ''), _async);

    this.httpRequest.onreadystatechange = function () {

      if (!this.httpRequest.readyState && this.httpRequest.readyState < 4) {
        return;
      }

      if (this.httpRequest.readyState === 4 && (this.httpRequest.status === 200 || this.httpRequest.status === 201)) {
        clearTimeout(this.timeoutTimer);
        this.emit(APIUtil.EVENT.SUCCESS, {
          type: APIUtil.EVENT.SUCCESS,
          content: this.httpRequest,
          target: this
        });
      } else if (this.httpRequest.status === 404 || this.httpRequest.status === 302) {
        clearTimeout(this.timeoutTimer);
        this.emit(APIUtil.EVENT.FAILED, {
          type: APIUtil.EVENT.FAILED,
          content: this.httpRequest,
          target: this
        });

      } else if (this.httpRequest.status === 0) {
        //MEMO: タイムアウト判定
        // clearTimeout(this.timeoutTimer);
        // this.emit(APIUtil.EVENT.TIMEOUT, {target: this, content: this.httpRequest});
      }

    }.bind(this);

    this.httpRequest.setRequestHeader('Content-Type', _type);

    if (!!_options && _options.hasOwnProperty('beforeSend')) {
      _options.beforeSend(this.httpRequest);
    }

    // this.httpRequest.timeout = TIMEOUT;

    this.httpRequest.send(_method === APIUtil.GET ? null : (_data !== Object(_data) ? _data : jsonToQueryString(_data)));
  }


  /**
   * 読み込みキャンセル
   */
  cancel() {
    if (!this.isLoad) {
      return;
    }

    this.httpRequest.abort();
    clearTimeout(this.timeoutTimer);
    this.emit(APIUtil.EVENT.CANCEL, {target: this});
  }


  /**
   *
   * @returns {*}
   * @private
   */
  _createHttpRequest() {
    if (global.window.ActiveXObject) {
      try {
        return new ActiveXObject('MSXML2.XMLHTTP.6.0');
      }
      catch (e) {
        try {
          return new ActiveXObject('MSXML2.XMLHTTP.3.0');
        }
        catch (e) {
          try {
            return new ActiveXObject('Msxml2.XMLHTTP');
          }
          catch (e) {
            try {
              return new ActiveXObject('Microsoft.XMLHTTP');
            }
            catch (e) {
              return null;
            }
          }
        }
      }
    }
    else if (global.window.XMLHttpRequest) {
      return new XMLHttpRequest();
    }
    else {
      return null;
    }
  }
}
