/**
 * @fileOverview
 * @author
 * @name YTUtil
 * @version
 */

// import
import Module from './Module';
import BrowserUtil from '../browser/BrowserUtil';
import PubSub from "../events/PubSub";



/**
 *
 * @type {string}
 */
const YT_URL = 'https://www.youtube.com/iframe_api';

/**
 *
 * @type {boolean}
 */
let isInit = false;

/**
 *
 * @type {boolean}
 */
let ytReady = false;


/**
 *
 * @type {Array}
 */
let readyQue = [];

/**
 *
 * @type {number}
 */
const DEFAULT_VOLUME = 90;


/**
 *
 * @type {number}
 */
const DEFAULT_WIDTH = 1280;

/**
 *
 * @type {number}
 */
const DEFAULT_HEIGHT = 720;


/**
 *
 * @param num
 * @returns {*}
 */
let zeroPadding = function (num) {
  if (num < 10) {
    return '0' + num;
  } else {
    return num;
  }
};


/**
 *
 * @param t
 * @returns {string}
 */
let convertTime = function (t) {
  let hms = '';
  let h = t / 3600 | 0;
  let m = t % 3600 / 60 | 0;
  let s = ~~(t % 60);

  if (h !== 0) {
    hms = h + ':' + zeroPadding(m) + ':' + zeroPadding(s);
  } else if (m != 0) {
    hms = zeroPadding(m) + ':' + zeroPadding(s);
  } else {
    hms = '00:' + zeroPadding(s);
  }

  return hms;

};


/**
 *
 * @returns {{width: *, height: *}}
 */
let getScreenSize = () => {
  var _w, _h;

  if (document.documentElement && document.documentElement.clientWidth !== 0) {
    _w = document.documentElement.clientWidth;
  } else if (document.body) {
    _w = document.body.clientWidth;
  }

  if (document.documentElement && document.documentElement.clientHeight !== 0) {
    _h = document.documentElement.clientHeight;
  } else if (document.body) {
    _h = document.body.clientHeight;
  }

  return ({width: _w, height: _h});
};





export default class YTUtil extends PubSub {

  static setup() {
    if (isInit) {
      return;
    }
    isInit = true;
    var scriptTag = document.createElement('script');
    scriptTag.src = YT_URL;
    scriptTag.async = true;
    (document.head || global.GNS.Global.HEAD).appendChild(scriptTag);
  }


  /**
   *
   * @returns {string}
   */
  static get PLAY_START() {
    return 'play_start';
  }


  /**
   *
   * @returns {string}
   */
  static get PLAYING() {
    return 'playing';
  }

  /**
   *
   * @returns {string}
   */
  static get PLAY_END() {
    return 'play_end';
  }

  /**
   *
   * @returns {string}
   */
  static get PLAY_ENDED() {
    return 'play_ended';
  }

  /**
   *
   * @returns {string}
   */
  static get PLAY_STOP() {
    return 'play_stop';
  }

  /**
   *
   * @returns {string}
   */
  static get READY_COMPLETE() {
    return 'ready_complete';
  }

  /**
   *
   * @returns {string}
   */
  static get BEFORE_END() {
    return 'before_end';
  }

  /**
   *
   * @param name
   * @param id
   */
  constructor(name, id) {
    super();

    if (!isInit) {
      YTUtil.setup();
    }

    this.isAuto = false; // 自動再生かどうか

    this.name = name;
    this._videoID = id;

    this.container = null;
    this.style = null;
    this.player = null;

    this.isPause = false;
    this.isPlayed = false;
    this.isReady = false;
    this.isMute = false;

    this._nowPlaying = false;

    this._isPlaying = false;

    this._playerVars = {
      hd: 1,
      rel: 0,            // プレーヤーに関連動画を表示するかどうか
      autoplay: 0,       // 動画を自動再生するかどうか
      showinfo: 1,       // 動画の再生が始まる前に動画のタイトルやアップロードしたユーザーなどの情報
      loop: 0,           // デフォルトは 0 最初の動画が繰り返し再生されます。
      fs: 1,             // 全画面ボタン
      autohide: 1,       // 動画の再生が開始された後に、動画のコントロールを自動的に非表示にするかどうかを指定します
      controls: 1,       // 動画のプレーヤー コントロールを表示するかどうか
      disablekb: 0,      // キーボードで操作
      modestbranding: 1, // YouTube プレーヤーに YouTube ロゴが表示されないよう
      html5: !BrowserUtil.ltIE8 ? 1 : 0,
      playlist: null
    };


  }


  /**
   *
   * @param vars
   */
  updatePlayerVars (vars) {
    Module.extend(this._playerVars, vars);
  }



  /**
   *
   * @param id
   */
  changeID(id) {
    this._videoID = id;
  }

  /**
   *
   * @returns {*}
   */
  get videoID() {
    return this._videoID;
  }


  /**
   *
   * @returns {boolean}
   */
  get isPlaying() {
    return this._isPlaying;
  }


  /**
   *
   * @returns {boolean}
   */
  get nowPlaying() {
    return this._nowPlaying;
  }


  /**
   *
   * @returns {boolean}
   */
  get hasPlayer() {
    return (!!this.player);
  }

  /**
   *
   */
  setup() {

    /**
     *
     * @type {function(this:YTUtil)}
     */
    let readyHandler = function () {

      ytReady = true;

      this.player = new global.YT.Player(this.name, {
        width: DEFAULT_WIDTH,
        height: DEFAULT_HEIGHT,
        videoId: this._videoID,
        playerVars: this._playerVars,
        events: {
          onReady: this.onPlayerReady.bind(this),
          onStateChange: this.onPlayerStateChange.bind(this)
        }
      });

    }.bind(this);

    if (!ytReady) {
      readyQue.push(readyHandler);
      global.onYouTubeIframeAPIReady = function () {
        readyQue.forEach(function (que) {
          que();
        });
      };
    } else {
      readyHandler();
    }

  }


  onPlayerReady(event) {

    if (!this.container) {
      this.container = document.getElementById(this.name);
      this.style = this.container.style;
    }

    if (!BrowserUtil.isMobile) {
      if (this.isAuto && !this._isPlaying) {
        this._isPlaying = true;
        this.isPlayed = true;
        this.player.playVideo();
        this.trigger(YTUtil.PLAY_START, event);
      }
    }

    this.isReady = true;
    this.trigger(YTUtil.READY_COMPLETE, event);

  }


  /**
   *
   * @param event
   */
  onPlayerStateChange(event) {

    if (event.data === global.YT.PlayerState.PLAYING) {
      this._nowPlaying = true;
      this.trigger(YTUtil.PLAYING, event);
    }

    if (event.data === 0 || event.data === 2) {
      this._nowPlaying = false;
      this.trigger(YTUtil.PLAY_END, event);
      this._isPlaying = false;
    }

    if (event.data === global.YT.PlayerState.ENDED) {
      this._nowPlaying = false;
      this.trigger(YTUtil.PLAY_ENDED, event);
    }
  }


  /**
   *
   * @param event
   */
  playVideo(event) {

    if (this.player && 'playVideo' in this.player) {

      if (this._isPlaying) {
        return;
      }

      if (this.isPlayed && !this.isPause) {
        this.player.seekTo(this.startTime);
      } else {
        this.player.playVideo();
        this.trigger(YTUtil.PLAY_START, event);
        this.isPause = false;
      }

      this._isPlaying = true;
    }
  }


  /**
   *
   * @param id
   */
  setVideoId(id) {
    this._videoID = id;
  }


  /**
   *
   * @param flag
   */
  setLoop(flag = false) {
    this.player.setLoop(flag);
  }


  /**
   *
   * @param id
   */
  changeVideo(id) {
    if (!this.isReady) {
      this._videoID = id;
      this.playVideo();
    } else {
      this._videoID = id;
      this.player.loadVideoById(this._videoID);
    }
  }



  /**
   *
   * @private
   */
  _stopVideo() {
    if (this.player && 'stopVideo' in this.player) {
      this.player.stopVideo();
      this.player.cueVideoById(this._videoID);
      this.trigger(YTUtil.PLAY_STOP);
    }
  };



  /**
   *
   */
  stopVideo() {
    this._stopVideo();
  };



  /**
   *
   */
  pauseVideo() {
    if (this.player && 'pauseVideo' in this.player) {
      this.isPause = true;
      this.player.pauseVideo();
    }
  }

  play() {
    this.playVideo();
  }


  pause() {
    this.pauseVideo();
  }


  /**
   *
   */
  resumeVideo() {
    if (this.player && !!this.isPause) {
      this.isPause = false;
      this.player.playVideo();
    }
  }


  /**
   *
   * @returns {number}
   */
  getVideoTime () {
    return ('getDuration' in this.player ? this.player.getDuration() : 0);
  };

  /**
   *
   * @param volume
   * @private
   */
  _changeVolume(volume) {
    this.player.setVolume(volume);
  }

  /**
   *
   */
  soundON() {
    this._changeVolume(DEFAULT_VOLUME);
  }


  /**
   *
   */
  soundOFF() {
    this.mute();
  }

  /**
   *
   */
  mute() {
    this._changeVolume(0);
  }

  /**
   *
   * @returns {boolean}
   */
  soundToggle() {

    if (this.player.isMuted() || this.isMute) {
      this.player.unMute();
      this.isMute = false;
    } else {
      this.player.mute();
      this.isMute = true;
    }

    return this.isMute;
  };


  /**
   *
   */
  resize() {
    if (!!this.style) {

      this.style.width = '100%';
      this.style.height = '100%';

      var width = this.container.offsetWidth;
      var height = this.container.offsetHeight;

      var videoHeight = ~~((width * DEFAULT_HEIGHT) / DEFAULT_WIDTH);

      if (videoHeight < height) {

        this.player.setSize(width, videoHeight);
        this.style.width = width + 'px';
        this.style.height = videoHeight + 'px';
        this.style.marginTop = ~~((height - videoHeight) * .5) + 'px';

      } else {

        let width = ~~((height * DEFAULT_WIDTH) / DEFAULT_HEIGHT);
        this.player.setSize(width, height);

        this.style.width = width + 'px';
        this.style.height = height + 'px';
        this.style.marginTop = 0;
      }
    }
  }
}



