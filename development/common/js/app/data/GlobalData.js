/**
 * fileOverview:
 * Project:
 * File:
 * Date:
 * Author:
 */

/**
 *
 */
const WINDOW = global.window;

/**
 *
 * @type {HTMLDocument}
 */
const DOCUMENT = document;


let location = WINDOW.location;

let hash = location.hash;

let baseURL = location.href;


/**
 * クエリにをオブｋじぇくと形式に変換
 * @type {{}}
 */
let queryObject = {};

let queries = location.search;

if (1 < queries.length) {

  var query = queries.substring(1);
  var params = query.split('&');

  for (var i = 0, len = params.length; i < len; i += 1) {
    var element = params[i].split('=');
    queryObject[decodeURIComponent(element[0])] = decodeURIComponent(element[1]);
  }
}



export default class GlobalData {

  static window = WINDOW;

  static docment = DOCUMENT;

  static html = null;
  static htmlStyle = null;

  static body = null;
  static bodyStyle = null;


  static init() {
    this.html = document.getElementsByTagName('html')[0];
    this.htmlStyle = this.html.style;

    this.body = document.getElementsByTagName('body')[0];
    this.bodyStyle = this.body.style;
  }


  /**
   *
   */
  static location = location;

  /**
   *
   */
  static domain = DOCUMENT.domain;

  /**
   *
   */
  static search = location.search;

  /**
   *
   */
  static protocol = location.protocol;

  /**
   *
   */
  static hash = hash;

  /**
   *
   */
  static hashVal = !!hash ? hash.split('#')[1] : '';

  /**
   *
   */
  static port = location.port;

  /**
   *
   */
  static url = baseURL;


  static planeURL = location.origin + location.pathname;


  /**
   * ローカル環境かどうか
   * @returns {boolean}
   */
  static isLocal =  (baseURL.indexOf('file://') > -1 || baseURL.indexOf('://localhost') > -1 || baseURL.indexOf('://192') > -1);

  /**
   * 初回訪問かどうか
   * @returns {boolean}
   */
  static get isNewCommeer() {
    return DOCUMENT.referrer.indexOf(this.domain) < 0;
  }


  /**
   * セキュア接続かどうか
   * @type {boolean}
   */
  static isSSL = baseURL.indexOf('https') === 0;


  /**
   *
   * @returns {{}}
   */
  static get queryObject() {
    return queryObject;
  }


  /**
   *
   * @param q
   * @returns {boolean}
   */
  static getHasQuery(q) {
    return !!(queryObject.hasOwnProperty(q));
  };



  /**
   *
   * @param q
   * @returns {null}
   */
  static getQueryVal (q) {
    return (queryObject.hasOwnProperty(q) ? queryObject[q] : null);
  }

}
