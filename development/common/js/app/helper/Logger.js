/**
 * fileOverview:
 * Project:
 * File:
 * Date:
 * Author:
 */


'use strict';


let hasConsole = 'console' in global &&
    typeof global.console !== 'undefined' &&
    global.console !== null &&
    typeof global.console.log === 'function';


let isTrace = false;


let logPrefix = '[ Logger ] ';


let startTime = 0;

let counter = 0;


export default class Logger {
  /**
   *
   * @param flag {boolean}
   */
  static set trace(flag) {
    isTrace = flag;
  }

  /**
   *
   * @return {boolean}
   */
  static get trace() {
    return isTrace;
  }
  /**
   *
   * @param prefix {string}
   */
  static set prefix(prefix) {
    logPrefix = prefix;
  }

  /**
   *
   * @return {string}
   */
  static get prefix() {
    return logPrefix;
  }


  /**
   *
   */
  static setStartTime() {
    startTime = new Date();
  }


  /**
   *
   * @param prefix
   */
  static getRunningTime(prefix) {
    prefix = prefix || 'RUNNING';
    if (startTime < 1) {
      this.setStartTime();
    }
    this.log(prefix + ' :: ', (new Date() - startTime) + 'ms ( ' + counter + ' )');
    counter += 1;
  }


  /**
   *
   */
  static log () {
    var args;
    args = 1 <= arguments.length ? [].slice.call(arguments, 0) : [];

    if (!isTrace) {
      return;
    }

    if (logPrefix) {
      args.unshift(logPrefix);
    }

    if (hasConsole) {
      global.console.log.apply(global.console, args);
    }
  }


  /**
   *  ?????
   */
  logging(/* message */) {

    if (!isTrace) {
      return;
    }

    try {
      if (hasConsole) {
        var target;
        var arg = [].slice.call(arguments);
        var msg = '';
        for (var i = 0, j = 0, size = 0, len = arg.length; i < len; i += 1) {
          target = arg[i];
          if (!target.nodeType && typeof target === 'object') {
            if (target.constructor === Array) {

              if (msg.length > 1) {
                msg += ' :: ';
              }

              for (j = 0, size = target.length; j < size; j += 1) {
                if (j > 0) {
                  msg += ' | ';
                }
                msg += '[ ' + j + ' : ' + target[j] + ' ]';
              }
            } else {

              if (msg.length > 1) {
                msg += ' :: ';
              }

              for (var prop in target) {
                if (target.hasOwnProperty(prop)) {
                  if (j > 0) {
                    msg += ' | ';
                  }
                  msg += '{ ' + prop + ' : ' + target[prop] + ' }';
                  j += 1;
                }
              }
            }

          } else {

            if (i > 0) {
              msg += ' :: ';
            }
            msg += target;
          }
        }

        global.console.log('[ LOG (' + Date.now() + ') ] ' + msg);
      }
    } catch (error) {

    }
  }


  /**
   *
   * @param msg
   */
  static warn(msg) {
    if (hasConsole) {
      global.console.warn(msg);
    }
  }


  /**
   *
   * @param msg
   */
  static error(msg){
    if (hasConsole) {
      global.console.error(msg);
    }
  }
}
