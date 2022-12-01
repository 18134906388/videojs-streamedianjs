/**
 * videojs-streamedianjs
 * @version 0.2.0
 * @copyright 2022 mister-ben <git@misterben.me>
 * @license Apache-2.0
 */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.videojsStreamedianjs = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (global){(function (){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _video = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _video2 = _interopRequireDefault(_video);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @file plugin.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Html5 = _video2.default.getTech('Html5');
var mergeOptions = _video2.default.mergeOptions || _video2.default.util.mergeOptions;
var defaults = {
  mediaDataSource: {},
  config: {}
};

var Streamedianjs = function (_Html) {
  _inherits(Streamedianjs, _Html);

  /**
   * Create an instance of this Tech.
   *
   * @param {Object} [options]
   *        The key/value store of player options.
   *
   * @param {Component~ReadyCallback} ready
   *        Callback function to call when the `Streamedianjs` Tech is ready.
   */
  function Streamedianjs(options, ready) {
    _classCallCheck(this, Streamedianjs);

    options = mergeOptions(defaults, options);
    return _possibleConstructorReturn(this, (Streamedianjs.__proto__ || Object.getPrototypeOf(Streamedianjs)).call(this, options, ready));
  }

  /**
   * A getter/setter for the `Streamedianjs` Tech's source object.
   *
   * @param {Tech~SourceObject} [src]
   *        The source object you want to set on the `Streamedianjs` techs.
   *
   * @return {Tech~SourceObject|undefined}
   *         - The current source object when a source is not passed in.
   *         - undefined when setting
   */


  _createClass(Streamedianjs, [{
    key: 'setSrc',
    value: function setSrc(src) {
      if (this.rtspPlayer) {
        // Is this necessary to change source?
        this.rtspPlayer.destroy();
      }

      var mediaDataSource = this.options_.mediaDataSource;
      var config = JSON.parse(src);

      mediaDataSource.type = mediaDataSource.type === undefined ? 'rtsp' : mediaDataSource.type;
      mediaDataSource.url = config.src;
      this.el_.src = config.src;
      this.rtspPlayer = window.Streamedian.player(this.el_, config);
    }

    /**
     * Dispose of Streamedianjs.
     */

  }, {
    key: 'dispose',
    value: function dispose() {
      if (this.rtspPlayer) {
        this.rtspPlayer.destroy();
      }
      _get(Streamedianjs.prototype.__proto__ || Object.getPrototypeOf(Streamedianjs.prototype), 'dispose', this).call(this);
    }
  }]);

  return Streamedianjs;
}(Html5);

/**
 * Check if the Streamedianjs tech is currently supported.
 *
 * @return {boolean}
 *          - True if the Streamedianjs tech is supported.
 *          - False otherwise.
 */


Streamedianjs.isSupported = function () {

  return window.Streamedian && true;
};

/**
 * Streamedianjs supported mime types.
 *
 * @constant {Object}
 */
Streamedianjs.formats = {
  'video/rtsp': 'Streamedianjs',
  'video/x-rtsp': 'Streamedianjs'
};

/**
 * Check if the tech can support the given type
 *
 * @param {string} type
 *        The mimetype to check
 * @return {string} 'probably', 'maybe', or '' (empty string)
 */
Streamedianjs.canPlayType = function (type) {
  if (Streamedianjs.isSupported() && type in Streamedianjs.formats) {
    return 'maybe';
  }

  return '';
};

/**
 * Check if the tech can support the given source
 * @param {Object} srcObj
 *        The source object
 * @param {Object} options
 *        The options passed to the tech
 * @return {string} 'probably', 'maybe', or '' (empty string)
 */
Streamedianjs.canPlaySource = function (srcObj, options) {
  return Streamedianjs.canPlayType(srcObj.type);
};

// Include the version number.
Streamedianjs.VERSION = '0.2.0';

_video2.default.registerTech('Streamedianjs', Streamedianjs);

exports.default = Streamedianjs;
}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1])(1)
});
