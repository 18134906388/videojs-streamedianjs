/**
 * @file plugin.js
 */

import videojs from 'video.js';

const Html5 = videojs.getTech('Html5');
const mergeOptions = videojs.mergeOptions || videojs.util.mergeOptions;
const defaults = {
  mediaDataSource: {},
  config: {}
};

class Streamedianjs extends Html5 {

  /**
   * Create an instance of this Tech.
   *
   * @param {Object} [options]
   *        The key/value store of player options.
   *
   * @param {Component~ReadyCallback} ready
   *        Callback function to call when the `Streamedianjs` Tech is ready.
   */
   constructor(options, ready) {
     options = mergeOptions(defaults, options);
     super(options, ready);
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
  setSrc(src) {
    if (this.rtspPlayer) {
      // Is this necessary to change source?
      this.rtspPlayer.destroy();
    }

    const mediaDataSource = this.options_.mediaDataSource;
    const config = this.options_.config;

    mediaDataSource.type = mediaDataSource.type === undefined ? 'rtsp' : mediaDataSource.type;
    mediaDataSource.url = src;
    this.el_.src = src;
    this.rtspPlayer = window.Streamedian.player(this.el_, this.options_.source);
  }

  /**
   * Dispose of Streamedianjs.
   */
  dispose() {
    if (this.rtspPlayer) {
      this.rtspPlayer.destroy();
    }
    super.dispose();
  }

}

/**
 * Check if the Streamedianjs tech is currently supported.
 *
 * @return {boolean}
 *          - True if the Streamedianjs tech is supported.
 *          - False otherwise.
 */
 Streamedianjs.isSupported = function() {

  return window.Streamedian  && true;
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
 Streamedianjs.canPlayType = function(type) {
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
 Streamedianjs.canPlaySource = function(srcObj, options) {
  return Streamedianjs.canPlayType(srcObj.type);
};

// Include the version number.
Streamedianjs.VERSION = '__VERSION__';

videojs.registerTech('Streamedianjs', Streamedianjs);

export default Streamedianjs;
