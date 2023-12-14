/**
 * @license
 * Copyright 2023 PlayON Technologies
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import defaults from "./utils/defaults.js";

/**
 * @private
 * @since 1.1.0
 */
class PlayonNetworkEvent {
  /**
   * @type {string}
   * @since 1.1.0
   */
  static kLoading = 'loading';

  /**
   * @type {string}
   * @since 1.1.0
   */
  static kLoaded = 'loaded';

  /**
   * @type {string}
   * @since 1.1.0
   */
  static kStarting = 'starting';

  /**
   * @type {string}
   * @since 1.1.0
   */
  static kStarted = 'started';

  /**
   * @package
   * @type {string}
   * @since 1.1.0
   */
  static _kRendered = 'flutter-first-frame';
}

/**
 * Playon Network App abstract class.
 * 
 * @package
 * @type {import("@playon-network/engine").PlayonNetworkApp}
 * @since 1.0.0
 */
export default class PlayonNetworkApp {
  /**
   * @package
   *
   * @param {import("@playon-network/engine").PlayonEngine} engine
   * @param {HTMLElement|string|import("@playon-network/engine").AppOptions} [element]
   * @param {import("@playon-network/engine").AppOptions} [config]
   *
   * @since 1.0.0
   */
  constructor(engine, element, config) {
    if (!engine.isLoaded) {
      throw new Error("Engine is not loaded.");
    }

    if (typeof element === 'string') {
      this._element = document.querySelector(element);
    } else if (element instanceof HTMLElement) {
      this._element = element;
    } else if (!config) {
      config = element;
    }

    this._engine = engine;
    this._config = defaults(config || {}, PlayonNetworkApp._defaultOptions);
  }

  /**
   * @private
   * @type {Object<string, PlayonNetworkApp>}
   * 
   * @since 1.0.0
   */
  static _instances = {};

  /**
   * @private
   * @type {import("@playon-network/engine").AppOptions}
   *
   * @since 1.0.0
   */
  static _defaultOptions = {
    serviceWorkerVersion: null,
    entrypoint: 'app.js',
  };

  /**
   * @package
   *
   * @param {string} name
   * @param {Function} [initializer]
   *
   * @return {PlayonNetworkApp}
   * 
   * @since 1.0.0
   */
  static getInstance(name, initializer) {
    let instance = PlayonNetworkApp._instances[name];

    if (!instance) {
      if (!initializer) {
        throw new Error(`You must initialize the application before use it.`);
      }

      instance = initializer();
      PlayonNetworkApp._instances[name] = instance;
    }

    return instance;
  }
  
  /**
   * @package
   * @since 1.0.0
   */
  load() {
    this._dispatchEvent(new Event(PlayonNetworkEvent.kLoading));

    _flutter.loader.loadEntrypoint({
      entrypointUrl: `${this._engine.baseUrl}${this._config.entrypoint}`,
      onEntrypointLoaded: this._onEntrypointLoaded.bind(this),
      serviceWorker: {
        serviceWorkerVersion: this._engine._config.serviceWorkerVersion,
      },
    });
  }

  /**
   * @private
   * @param {*} engineInitializer 
   * @since 1.0.0
   */
  async _onEntrypointLoaded(engineInitializer) {
    this._listenFirstFrameEvent();

    const appRunner = await engineInitializer.initializeEngine({
      assetBase: this._engine.baseUrl,
      hostElement: this._element,
    });

    this._dispatchEvent(new Event(PlayonNetworkEvent.kLoaded));
    this._dispatchEvent(new Event(PlayonNetworkEvent.kStarting));

    await appRunner.runApp();
  }

  /**
   * @private
   * @since 1.1.0
   */
  _listenFirstFrameEvent() {
    this.__onFirstFrame = this._onFirstFrame.bind(this);
    window.addEventListener(PlayonNetworkEvent._kRendered, this.__onFirstFrame);
  }

  /**
   * @private
   * @since 1.1.0
   */
  _onFirstFrame() {
    window.removeEventListener(PlayonNetworkEvent._kRendered, this.__onFirstFrame);
    this._dispatchEvent(new Event(PlayonNetworkEvent.kStarted));
  }

  /**
   * @private
   * @param {Event} event
   * @return {boolean}
   * @since 1.1.0
   */
  _dispatchEvent(event) {
    if (!this._element) {
      return window.dispatchEvent(event);
    } else {
      return this._element.dispatchEvent(event);
    }
  }
}
