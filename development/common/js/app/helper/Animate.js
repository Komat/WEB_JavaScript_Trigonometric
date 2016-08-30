/**
 * @fileOverview
 * @author
 * @name Animate
 * @version
 * @requires core/Core
 */


(function (_) {

  var CLASS_NAME = 'Animate';


  var p, s;

  p = _.ClassFactory.create(null);
  s = p._static;

  //prefix
  s.BROWSER_PERFIX;


  /**
   * [static] to
   * 指定したパラメータでアニメーションします.
   *
   * @param target:element
   * @param duration:number
   * @param params:object
   */
  s.to = function (target, duration, params) {
    if (!target) return false;
    if (!duration) duration = 0;
    if (!params) params = {};
    var anim = new AnimateModel(target, duration, params);
    for (var i = que.length - 1; i >= 0; i--) {
      if (que[i]._target == target) anim._update = true;
    }
    que.push(anim);

    if (que.length >= 1 && !isAnimate) {
      isAnimate = true;
      requestAnimationFrame(s.render);
    }
  };

  /**
   * [static] kill
   * 指定したターゲットのアニメーションを止めます.
   *
   * @param target:element
   */
  s.kill = function (target) {
    if (!target) return false;
    for (var i = que.length - 1; i >= 0; i--) {
      if (que[i]._target == target) que[i]._forcekill = true;
    }
  };

  /**
   * [static] direct
   * 指定パラメータで直ちに値を変更します.
   *
   * @param target:element
   * @param params:object
   */
  s.direct = function (target, params) {
    for (var key in params) {
      if (params.hasOwnProperty(key)) {
        animateProperty(target, key, params[key]);
      }
    }
  };


  /**
   * [static] addRender
   * 指定した関数を継続的に呼び出します.
   *
   * @param event:function
   * @param target:object
   */
  s.addRender = function (event, target) {
    var params = {};
    params.onUpdate = event;
    params.isContinue = true;
    if (!target) target = window;
    var anim = new AnimateModel(target, 0, params);

    que.push(anim);

    if (que.length >= 1 && !isAnimate) {
      isAnimate = true;
      requestAnimationFrame(s.render);
    }
  };


  /**
   * [static] removeRender
   * 継続指定された関数を削除します.
   *
   * @param event:function
   */
  s.removeRender = function (event) {
    for (var i = que.length - 1; i >= 0; i--) {
      if (que[i]._onUpdate == event) que[i]._isContinue = false;
    }
  };


  /**
   * [static] render
   * レンダリング用関数.
   */
  s.render = function () {
    singleRender();

    if (que.length == 0 && isAnimate) {
      isAnimate = false;
    } else {
      isAnimate = true;
      requestAnimationFrame(s.render);
    }
  };


  /**
   * [static] getUnitAdjust
   * 単位を除去したnumberを返します.
   *
   * @param amount
   */
  s.getUnitAdjust = function (amount) {
    if (String(amount).length >= 3) {
      if (String(amount).indexOf("px") != -1) {
        amount = String(amount).replace("px", "");
      }
      return parseInt(amount);
    } else if (amount != null && amount != "") {
      return parseInt(amount);
    } else {
      return 0;
    }
  };


  /**
   * [static] setUnitAdjust
   * 単位を付加したstringを返します.
   *
   * @param amount
   */
  s.setUnitAdjust = function (amount) {
    if (String(amount).indexOf("px") != -1) {
      return amount;
    } else if (amount != null && amount != "") {
      return amount + "px";
    } else {
      return "0px";
    }
  };

  /**
   * [static] getStat
   * 状態を返します(trueが動いている状態、falseが止まっている状態).
   *
   */
  s.getStat = function () {
    return isAnimate;
  };


  /**
   * [static] searchBrowserPrefix
   * 対応しているprefixを返します.
   */
  s.searchBrowserPrefix = function () {
    var prefixes = ["", "webkit", "Moz", "o", "ms"];
    for (var i = 0; i < prefixes.length; i++) {
      if (window && (prefixes[i] + "RequestAnimationFrame") in window) {
        return prefixes[i];
        break;
      }
    }
    return null;
  };


  /* private
   ************************************************************************* */

  //que配列
  var que = [];

  //ループ状態
  var isAnimate = false;

  /**
   * requestAnimationFrame
   * loop用.
   */
  var requestAnimationFrame = (function () {
    if (!s.BROWSER_PERFIX) s.BROWSER_PERFIX = s.searchBrowserPrefix();
    return window[s.BROWSER_PERFIX + "RequestAnimationFrame"] || function (callback, element) {
          window.setTimeout(s.render, 1000 / 30)
        };
  })();


  /**
   * singleRender
   * レンダリング用関数.
   */
  var singleRender = function () {
    var time = new Date().getTime();
    for (var i = que.length - 1; i >= 0; i--) {
      var job = que[i];
      var complete = false;
      if (time >= job._endTime) complete = true;
      if (job._isContinue) complete = false;

      if (job._forcekill) {
        que.splice(i, 1);
        job = null;
        continue;
      }

      if (time >= job._delay) {
        if (job._onStart != null) {
          job._onStart.apply(job._target, (job._onStartParams || []));
          job._onStart = null;
          job._onStartParams = null;
        }

        if (job._update) {
          job.update();
          job._update = false;
        }

        for (var key in job._sparams) {
          if (job._sparams.hasOwnProperty(key)) {
            var nowTime = (time - job._delay);
            var timeAmount = (job._endTime - job._delay);
            var startAmount = job._sparams[key];
            var moveAmount = (job._params[key] - job._sparams[key]);

            var amount = 0;
            if (nowTime >= timeAmount) {
              amount = moveAmount + startAmount;
            } else if (job._ease) {
              amount = job._ease(nowTime, startAmount, moveAmount, timeAmount);
            } else {
              amount = s.linear(nowTime, startAmount, moveAmount, timeAmount);
            }

            if (job._bezier && key == "bezierTime") {
              var bezierPos = bezier(job._bezier, amount);
              animateProperty(job._target, "left", bezierPos.x);
              animateProperty(job._target, "top", bezierPos.y);
            } else {
              animateProperty(job._target, key, amount);
            }

          }
        }
        if (complete) {
          que.splice(i, 1);
          if (job._onComplete != null) {
            job._onComplete.apply(job._target, (job._onCompleteParams || []));
          }
          job = null;
        } else {
          if (job._onUpdate != null) {
            job._onUpdate.apply(job._target, (job._onUpdateParams || []));
          }
        }
      }
    }
  };

  /**
   * AnimateModel
   * que用モデル
   */
  var AnimateModel = function (target, duration, params) {
    this._target = target;
    this._duration = duration;
    this._params = params;
    this._sparams = {};
    this._startTime = new Date().getTime();
    this._endTime = this._startTime + this._duration * 1000;
    this._delay = this._startTime;
    this._ease = null;
    this._onStart = null;
    this._onStartParams = null;
    this._onUpdate = null;
    this._onUpdateParams = null;
    this._onComplete = null;
    this._onCompleteParams = null;
    this._forcekill = false;
    this._isContinue = false;
    this._bezier = null;
    this._firstUpdate = true;

    if (this._params.ease != null && typeof this._params.ease == "function") {
      this._ease = this._params.ease;
      this._params.ease = null;
    }

    if (this._params.delay != null && this._params.delay >= 0) {
      this._delay = this._params.delay * 1000 + this._startTime;
      this._endTime += this._params.delay * 1000;
      this._params.delay = null;
    }

    if (this._params.onStart != null && typeof this._params.onStart == "function") {
      this._onStart = this._params.onStart;
      this._params.onStart = null;
    }

    if (this._params.onStartParams != null) {
      this._onStartParams = this._params.onStartParams;
      this._params.onStartParams = null;
    }

    if (this._params.onUpdate != null && typeof this._params.onUpdate == "function") {
      this._onUpdate = this._params.onUpdate;
      this._params.onUpdate = null;
    }

    if (this._params.onUpdateParams != null) {
      this._onUpdateParams = this._params.onUpdateParams;
      this._params.onUpdateParams = null;
    }

    if (this._params.onComplete != null && typeof this._params.onComplete == "function") {
      this._onComplete = this._params.onComplete;
      this._params.onComplete = null;
    }

    if (this._params.onCompleteParams != null) {
      this._onCompleteParams = this._params.onCompleteParams;
      this._params.onCompleteParams = null;
    }

    if (this._params.isContinue != null) {
      this._isContinue = this._params.isContinue;
      this._params.isContinue = null;
    }


    if (this._params.bezier != null) {
      this._bezier = this._params.bezier;
      this._params.bezierTime = 1;
      this._params.bezier = null;
      this._params.left = null;
      this._params.top = null;
      this._bezier.unshift({
        x: animateProperty(this._target, "left"),
        y: animateProperty(this._target, "top")
      });
    }


    var p, v;
    for (p in this._params) {
      if (this._params.hasOwnProperty(p) && this._params[p] != null) {
        this._sparams[p] = animateProperty(this._target, p);
      }
    }
  };

  AnimateModel.prototype.update = function () {
    for (var p in this._params) {
      if (this._params.hasOwnProperty(p) && this._params[p] != null) {
        this._sparams[p] = animateProperty(this._target, p);
      }
    }
  };

  /* property getter & setter (pre)
   ************************************************************************* */

  var animateProperty = function (target, prop, amount) {
    var isElement = target.nodeType === 1;
    var isGet = amount == null;

    if (!isElement && target != document) return isGet ? target[prop] : target[prop] = amount;

    switch (prop) {
      case "opacity":
        if (isGet) {
          if (target.style.opacity != null) {
            return target.style.opacity == "" ? 1 : Number(target.style.opacity);
          } else if (target.style.MozOpacity != null) {
            return target.style.MozOpacity == "" ? 1 : Number(target.style.MozOpacity);
          } else if (target.style.filter != null || target.style.Msfilter != null) {
            var filterValue = target.style.filter || target.style.Msfilter;

            if (!filterValue) {
              return 1;
            } else {
              var str = String(filterValue).split("alpha(opacity=").join("").split(")").join("");
              if (str != null) {
                return Number(str);
              } else {
                return 1;
              }
            }
          } else return 1;
        } else {
          target.style.Msfilter = 'alpha(opacity=' + (amount * 100) + ')';
          target.style.filter = 'alpha(opacity=' + (amount * 100) + ')';
          target.style.MozOpacity = amount;
          target.style.opacity = amount;
          return null;
        }
        break;

      case "scrollLeft":
      case "scrollTop":

        if (isGet) {
          return document.documentElement[prop] || document.body[prop];
        } else {
          if (document.documentElement[prop] != null) {
            document.documentElement[prop] = amount;
          }
          if (document.body[prop] != null) {
            document.body[prop] = amount;
          }
          return amount;
        }
        break;

      case "bezierTime":
        return isGet ? 0 : 1;
        break;

      default:
        break;
    }

    if (!isGet) {
      target.style[prop] = s.setUnitAdjust(amount);
      return target.style[prop];
    }

    amount = amount == null ? 0 : amount;

    if (target.style && target.style[prop]) {
      amount = target.style[prop];
      return s.getUnitAdjust(amount);
    }

    if (target["currentStyle"]) { //IE or Opera
      if (prop.indexOf("-") != -1) {
        prop = prop.camelize();
      }
      amount = target.currentStyle[prop];
    } else if (getComputedStyle) { //Mozilla or Opera or Safari
      var st = document.defaultView.getComputedStyle(target, '');
      if (st) {
        amount = st.getPropertyValue(prop);
      } else {
        amount = 0;
      }
    }

    return s.getUnitAdjust(amount);
  };

  /* bezier
   ************************************************************************* */

  var bezier = function (pt, t) {
    var total = {
      x: 0,
      y: 0
    };
    var n = pt.length - 1;
    for (var i = 0; i < pt.length; i++) {
      total.x += pt[i].x * combination(n, i) * Math.pow(t, i) * Math.pow(1 - t, n - i);
      total.y += pt[i].y * combination(n, i) * Math.pow(t, i) * Math.pow(1 - t, n - i);
    }
    return total;
  };

  var combination = function (n, r) {
    if ((r == 0) || (r == n)) {
      return 1;
    } else if ((r > n) || (r < 0)) {
      return 0;
    } else {
      return factdivdiv(n, r, n - r);
    }
  };

  var factdivdiv = function (n, k1, k2) {
    if (k1 < k2) {
      i = k1;
      k1 = k2;
      k2 = i;
    }
    if (k1 > n) t = 0;
    else {
      var t = 1;
      while (k2 > 1) t *= k2--;
      var t2 = 1;
      while (n > k1) t2 *= n--;
      t = t2 / t;
    }
    return t;
  };


  /* easing
   ************************************************************************* */

  /**
   * [static] easing
   * イージングタイプ.
   *
   * @param t:number
   * @param b:number
   * @param c:number
   * @param d:number
   */
  s.linear = function (t, b, c, d) {
    return c * t / d + b;
  };

  s.easeInQuad = function (t, b, c, d) {
    return c * (t /= d) * t + b;
  };

  s.easeOutQuad = function (t, b, c, d) {
    return -c * (t /= d) * (t - 2) + b;
  };

  s.easeInOutQuad = function (t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t + b;
    return -c / 2 * ((--t) * (t - 2) - 1) + b;
  };

  s.easeInCubic = function (t, b, c, d) {
    return c * (t /= d) * t * t + b;
  };

  s.easeOutCubic = function (t, b, c, d) {
    return c * ((t = t / d - 1) * t * t + 1) + b;
  };

  s.easeInOutCubic = function (t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
    return c / 2 * ((t -= 2) * t * t + 2) + b;
  };

  s.easeInQuart = function (t, b, c, d) {
    return c * (t /= d) * t * t * t + b;
  };

  s.easeOutQuart = function (t, b, c, d) {
    return -c * ((t = t / d - 1) * t * t * t - 1) + b;
  };

  s.easeInOutQuart = function (t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
    return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
  };

  s.easeInQuint = function (t, b, c, d) {
    return c * (t /= d) * t * t * t * t + b;
  };

  p.easeOutQuint = function (t, b, c, d) {
    return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
  };

  s.easeInOutQuint = function (t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
    return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
  };

  s.easeInSine = function (t, b, c, d) {
    return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
  };

  s.easeOutSine = function (t, b, c, d) {
    return c * Math.sin(t / d * (Math.PI / 2)) + b;
  };

  s.easeInOutSine = function (t, b, c, d) {
    return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
  };

  s.easeInExpo = function (t, b, c, d) {
    return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
  };

  s.easeOutExpo = function (t, b, c, d) {
    return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
  };

  s.easeInOutExpo = function (t, b, c, d) {
    if (t == 0) return b;
    if (t == d) return b + c;
    if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
    return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
  };

  s.easeInCirc = function (t, b, c, d) {
    return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
  };

  s.easeOutCirc = function (t, b, c, d) {
    return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
  };

  s.easeInOutCirc = function (t, b, c, d) {
    if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
    return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
  };

  s.easeInElastic = function (t, b, c, d) {
    var s = 1.70158;
    var p = 0;
    var a = c;
    if (t == 0) return b;
    if ((t /= d) == 1) return b + c;
    if (!p) p = d * .3;
    if (a < Math.abs(c)) {
      a = c;
      var s = p / 4;
    }
    else var s = p / (2 * Math.PI) * Math.asin(c / a);
    return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
  };

  s.easeOutElastic = function (t, b, c, d) {
    var s = 1.70158;
    var p = 0;
    var a = c;
    if (t == 0) return b;
    if ((t /= d) == 1) return b + c;
    if (!p) p = d * .3;
    if (a < Math.abs(c)) {
      a = c;
      var s = p / 4;
    }
    else {
      var s = p / (2 * Math.PI) * Math.asin(c / a);
    }
    return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
  };

  s.easeInOutElastic = function (t, b, c, d) {
    var s = 1.70158;
    var p = 0;
    var a = c;
    if (t == 0) return b;
    if ((t /= d / 2) == 2) return b + c;
    if (!p) p = d * (.3 * 1.5);
    if (a < Math.abs(c)) {
      a = c;
      var s = p / 4;
    } else {
      var s = p / (2 * Math.PI) * Math.asin(c / a);
    }

    if (t < 1) {
      return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    }
    return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
  };

  s.easeInBack = function (t, b, c, d, s) {
    if (s == undefined) {
      s = 1.70158;
    }
    return c * (t /= d) * t * ((s + 1) * t - s) + b;
  };

  s.easeOutBack = function (t, b, c, d, s) {
    if (s == undefined) {
      s = 1.70158;
    }
    return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
  };

  s.easeInOutBack = function (t, b, c, d, s) {
    if (s == undefined) {
      s = 1.70158;
    }
    if ((t /= d / 2) < 1) {
      return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
    }
    return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
  };

  s.easeInBounce = function (t, b, c, d) {
  };

  s.easeOutBounce = function (t, b, c, d) {
    if ((t /= d) < (1 / 2.75)) {
      return c * (7.5625 * t * t) + b;
    } else if (t < (2 / 2.75)) {
      return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
    } else if (t < (2.5 / 2.75)) {
      return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
    } else {
      return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
    }
  };

  s.easeInOutBounce = function (t, b, c, d) {
  };


  /**
   *
   * @returns {string}
   */
  s.toString = function () {
    return '[object ' + CLASS_NAME + ']';
  };


  /**
   *
   */
  p.toString = function () {
    s.toString();
  };


  /**
   *
   * @type {string}
   */
  s.Name = CLASS_NAME;


  /**
   *
   * @type {string}
   */
  p.Name = s.Name;

  /**
   *
   * @type {*|Function|func|e}
   */
  _[CLASS_NAME] = p._self;


}(this.GNS || {}));
