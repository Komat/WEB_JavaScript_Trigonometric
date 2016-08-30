/**
 * fileOverview:
 * Project:
 * File:
 * Date:
 * Author:
 */


'use strict';


let navigator = window.navigator;
let platform = navigator.platform;
let userAgent = navigator.userAgent;
let appVersion = navigator.appVersion;
let userAgentLower = userAgent.toLowerCase();
let appVersionLower = appVersion.toLowerCase();


let canvas2D = document.createElement('_canvas');
let _canvasExperimental = document.createElement('_canvas');

// テスト要素
let _div = document.createElement('div');
let _divStyle = _div.style;

/**
 *
 * @param style
 * @returns {boolean}
 */
let styleTest = function (style) {
  return style in _divStyle;
};


/**
 *
 * @param key
 * @returns {string}
 */
let getVersion = function (key) {
  var ua = (userAgent + ';').replace(/ /g, ';');
  var _start = ua.indexOf(key) + key.length;
  var _end = ua.indexOf(';', _start);
  return (ua.substring(_start, _end));
};


export default class BrowserUtil {

  static navigator = navigator;
  static platform = platform;
  static userAgent = userAgent;
  static appVersion = appVersion;
  static userAgentLower = userAgentLower;
  static appVersionLower = appVersionLower;


  // 機能
  static hasUniqueID = document.uniqueID;
  static hasAddEventListener = typeof window.addEventListener === 'undefined';
  static hasOrientation = typeof window.orientation !== 'undefined';
  static hasMouse = !('ontouchstart' in window);
  static hasMobile = !!/mobile/.test(userAgentLower);


  // IE
  static ltIE6 = BrowserUtil.hasAddEventListener && typeof document.documentElement.style.maxHeight === 'undefined';
  static ltIE7 = BrowserUtil.hasAddEventListener && typeof document.querySelectorAll === 'undefined';
  static ltIE8 = BrowserUtil.hasAddEventListener && typeof document.getElementsByClassName === 'undefined';
  static ltIE9 = BrowserUtil.hasUniqueID && !window.matchMedia;
  static isIE10 = BrowserUtil.hasUniqueID && document.documentMode === 10;
  static isIE11 = BrowserUtil.hasUniqueID && BrowserUtil.userAgent.indexOf('trident') > -1;


  // ブラウザ
  static isIE = !!(document.uniqueID);
  static isFirefox = !!(window.sidebar);
  static isOpera = !!(window.opera);
  static isWebkit = (!document.uniqueID) && (!BrowserUtil.isFirefox) && (!BrowserUtil.isOpera) && (!!window.hasOwnProperty('localStorage'));
  static isChrome = BrowserUtil.isWebkit && (userAgentLower.indexOf('chrome') > -1 || userAgentLower.indexOf('crios') > -1);


  // OS
  static isiPhone = /iphone/.test(userAgentLower);
  static isiPod = /ipod/.test(userAgentLower);
  static isiPad = /ipad/.test(userAgentLower);
  static isiOS = (BrowserUtil.isiPhone || BrowserUtil.isiPod || BrowserUtil.isiPad);
  static isAndroid = /android/.test(userAgentLower);
  static isAndroidStdBrowser = /linux; u/.test(userAgentLower);
  static isAndroidTablet = (!!BrowserUtil.isAndroid ? !!BrowserUtil.hasMobile : false);
  static isAndroidPhone = (!!BrowserUtil.isAndroid ? !BrowserUtil.hasMobile : false);


  static isTabletDevice = (userAgentLower.indexOf('windows') != -1 && userAgentLower.indexOf('touch') != -1) ||
    userAgentLower.indexOf('ipad') != -1 ||
    (userAgentLower.indexOf('android') != -1 && userAgentLower.indexOf('mobile') == -1) ||
    (userAgentLower.indexOf('firefox') != -1 && userAgentLower.indexOf('tablet') != -1) ||
    userAgentLower.indexOf('kindle') != -1 || userAgentLower.indexOf('silk') != -1 || userAgentLower.indexOf('playbook') != -1;


  static isMobileDevice = (userAgentLower.indexOf('windows') !== -1 && userAgentLower.indexOf('phone') !== -1) ||
    userAgentLower.indexOf('iphone') !== -1 || userAgentLower.indexOf('ipod') !== -1 ||
    (userAgentLower.indexOf('android') !== -1 && userAgentLower.indexOf('mobile') !== -1) ||
    (userAgentLower.indexOf('firefox') !== -1 && userAgentLower.indexOf('mobile') !== -1) ||
    userAgentLower.indexOf('blackberry') !== -1;

  static isTablet = BrowserUtil.isAndroidTablet || BrowserUtil.isiPad;
  static isPhone = BrowserUtil.isAndroidPhone || BrowserUtil.isiPhone || BrowserUtil.isiPod;
  static isMobile = BrowserUtil.hasOrientation || BrowserUtil.isTablet || BrowserUtil.isPhone;
  static isMobileUA = BrowserUtil.isAndroid || BrowserUtil.isiOS;


  // MODERN
  static enableTouch = (!BrowserUtil.hasMouse || (window.DocumentTouch && document instanceof DocumentTouch));
  static vendorPrefix = ((/webkit/i).test(BrowserUtil.appVersionLower) ? 'webkit' : ((/firefox/i).test(userAgentLower) ? 'Moz' : ('opera' in window ? 'O' : '')));
  static hasMSpointer = !!navigator.msPointerEnabled;
  static hasCanvas = !!canvas2D && ('getContext' in canvas2D) && !!canvas2D.getContext('2d');
  static hasWebGL = (!!'WebGLRenderingContext' in window) && !!_canvasExperimental.getContext('experimental-webgl');
  static hasCookie = !!navigator.cookieEnabled;
  static hasGeoLocation = !!navigator.geolocation;
  static hasJSONParser = !!(('JSON' in window) && 'stringify' in JSON && 'parse' in JSON);
  static hasLocalStorage = !!('localStorage' in window);
  static hasMatchMedia = ('matchMedia' in window);
  static hasClassList = ('classList' in _div);
  static hasTouch = !!('ontouchstart' in window);
  static hasAudio = !!('HTMLAudioElement' in window);
  static hasHistoryAPI = !!('history' in window) && window.history.pushState && window.history.state !== undefined;
  static hasWorkder = !!('Worker' in window);
  static deviceType = BrowserUtil.isPhone ? 'phone' : (BrowserUtil.isTablet ? 'tablet' : 'pc');
  static supportFilter = ('-webkit-filter' in _divStyle);
  static browserLanguage = navigator.language;
  static pixelRatio = ('devicePixelRatio' in window) ? window.devicePixelRatio : 1;


  // web view
  static isTwitter = /twitter/ig.test(userAgentLower);
  static isFacebook = /fbav/ig.test(userAgentLower);
  static isLine = /line/ig.test(userAgentLower);
  static isWebView = (BrowserUtil.isTwitter || BrowserUtil.isFacebook || BrowserUtil.isLine) || !(/safari|crios|opera/.test(userAgentLower));

  // OS
  static isWindows = /Win(dows )/gi.test(BrowserUtil.userAgent);
  static isMac = /Mac|PPC/gi.test(BrowserUtil.userAgent);


  /**
   * BROWSER
   */
  static get browser() {
    let browser = 'unknown';

    if (userAgentLower.indexOf('msie') !== -1) {
      if (appVersionLower.indexOf('msie 6.') !== -1) {
        browser = 'ie6';
      } else if (appVersionLower.indexOf('msie 7.') !== -1) {
        browser = 'ie7';
      } else if (appVersionLower.indexOf('msie 8.') !== -1) {
        browser = 'ie8';
      } else if (appVersionLower.indexOf('msie 9.') !== -1) {
        browser = 'ie9';
      } else if (appVersionLower.indexOf('msie 10.') !== -1) {
        browser = 'ie10';
      } else if (userAgentLower.indexOf('.NET CLR') > -1) {
      } else {
        browser = 'ie';
      }
    } else if (userAgentLower.indexOf('trident/7') !== -1) {
      browser = 'ie11';
    } else if (userAgentLower.indexOf('chrome') !== -1 || userAgentLower.indexOf('crios') > -1) {
      browser = 'chrome';
    } else if (userAgentLower.indexOf('safari') !== -1) {
      browser = 'safari';
    } else if (userAgentLower.indexOf('opera') !== -1) {
      browser = 'opera';
    } else if (userAgentLower.indexOf('firefox') !== -1) {
      browser = 'firefox';
    } else {
      browser = 'unknown';
    }

    return browser;
  };


  static get venderPrefix() {
    let prefix = 'unknown';

    if (/mozilla/.test(userAgentLower) && !BrowserUtil.isWebkit) {
      prefix = 'mozilla';
    } else if (BrowserUtil.isWebkit) {
      prefix = 'webkit';
    } else if (/opera/.test(userAgentLower)) {
      prefix = 'opera';
    } else if (/msie/.test(userAgentLower)) {
      prefix = 'msie';
    }

    return prefix;
  };


  /**
   * IE Version
   */
  static get ieVersion() {
    let rv = -1;
    let ua = userAgentLower;
    let msIE = ua.indexOf('MSIE ');
    let trident = ua.indexOf('Trident/');

    if (msIE > 0) {
      rv = parseInt(ua.substring(msIE + 5, ua.indexOf('.', msIE)), 10);
    } else if (trident > 0) {
      var rvNum = ua.indexOf('rv:');
      rv = parseInt(ua.substring(rvNum + 3, ua.indexOf('.', rvNum)), 10);
    }

    return ((rv > -1) ? rv : undefined);
  };


  static get os() {

    let _os = 'unknown';

    if (BrowserUtil.isAndroid) {
      _os = 'android';
    } else if (BrowserUtil.isiOS) {
      _os = 'ios';
    } else if (userAgent.match(/Win(dows )?NT 6\.3/)) {
      _os = 'windows_8_1';
    } else if (userAgent.match(/Win(dows )?NT 6\.2/)) {
      _os = 'windows_8';
    } else if (userAgent.match(/Win(dows )?NT 6\.1/)) {
      _os = 'windows_7';
    } else if (userAgent.match(/Win(dows )?NT 6\.0/)) {
      _os = 'windows_vista';
    } else if (userAgent.match(/Win(dows )?NT 5\.2/)) {
      _os = 'windows_server_2003';
    } else if (userAgent.match(/Win(dows )?(NT 5\.1|XP)/)) {
      _os = 'windows_xp';
    } else if (userAgent.match(/Win(dows)? (9x 4\.90|ME)/)) {
      _os = 'windows_me';
    } else if (userAgent.match(/Win(dows )?(NT 5\.0|2000)/)) {
      _os = 'windows_2000';
    } else if (userAgent.match(/Win(dows )?98/)) {
      _os = 'windows_98';
    } else if (userAgent.match(/Win(dows )?NT( 4\.0)?/)) {
      _os = 'windows_nt';
    } else if (userAgent.match(/Win(dows )?95/)) {
      _os = 'windows_95';
    } else if (userAgent.match(/Mac|PPC/)) {
      _os = 'mac_oc';
    } else if (userAgent.match(/Linux/)) {
      _os = 'linux';
    } else if (userAgent.match(/^.*\s([A-Za-z]+BSD)/)) {
      _os = 'bsd';
    } else if (userAgent.match(/SunOS/)) {
      _os = 'solaris';
    }

    return _os;
  };


  static get iOSVersion() {
    let v, versions = 0;

    if (BrowserUtil.isiOS) {
      v = (appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
      if (v) {
        versions = [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
        return versions[0];
      } else {
        return 0;
      }
    }
    return versions;
  };


  static get androidVersion() {
    if (userAgent.indexOf('Android') > 0) {
      return parseFloat(userAgent.slice(userAgent.indexOf('Android') + 8));
    }
    return 0;
  };


  static getMobileVersion() {
    var _version = 0;
    if (BrowserUtil.isAndroid) {
      _version = BrowserUtil.androidVersion;
    } else if (BrowserUtil.isiOS) {
      _version = BrowserUtil.iOSVersion;
    }
    return _version;
  }

  /**
   *
   * @returns {string}
   */
  static get browserVersion() {

    var _version = 0;

    let browser = BrowserUtil.browser();

    switch (BrowserUtil.deviceType) {
      case 'pc':
        if (browser === 'opera') {
          _version = getVersion('Opera/');
        } else if (browser === 'firefox') {
          _version = getVersion('Firefox/');
        } else if (browser === 'chrome') {
          _version = getVersion('Chrome/');
        } else if (browser === 'safari') {
          _version = getVersion('Version/');
        } else if (browser.indexOf('ie') > 0) {
          _version = BrowserUtil.ieVersion;
        }
        break;
      case 'phone':
        _version = BrowserUtil.getMobileVersion();
        break;
      case 'tablet':
        _version = BrowserUtil.getMobileVersion();
        break;
      default:
        break;
    }

    return (_version + '');
  };


  
  /**
   * スクロールバーの太さ
   * @returns {number}
   */
  static get scrollBarWidth() {
    let inner = document.createElement('p');
    inner.style.width = '100%';
    inner.style.height = '200px';

    let outer = document.createElement('div');
    outer.style.position = 'absolute';
    outer.style.top = 0;
    outer.style.left = 0;
    outer.style.visibility = 'hidden';
    outer.style.width = '200px';
    outer.style.height = '150px';
    outer.style.overflow = 'hidden';
    outer.appendChild(inner);

    document.body.appendChild(outer);
    let w1 = inner.offsetWidth;
    outer.style.overflow = 'scroll';
    let w2 = inner.offsetWidth;

    if (w1 === w2) {
      w2 = outer.clientWidth;
    }

    document.body.removeChild(outer);

    return (w1 - w2);
  }
}
