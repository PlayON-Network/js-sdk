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
import {PlayonNetworkApplicationNotInitializedException, PlayonNetworkEngineNotLoadedException} from "./exception.js";
import PlayonNetworkEventType from "./event-types.js";

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
   * @param {import("@playon-network/engine").AppOptions} [config]
   *
   * @since 1.0.0
   */
  constructor(engine, config) {
    if (!engine.isLoaded) {
      throw new PlayonNetworkEngineNotLoadedException();
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
        throw new PlayonNetworkApplicationNotInitializedException();
      }

      instance = initializer();
      PlayonNetworkApp._instances[name] = instance;

      // Save the instance in the window to be accessible by the Flutter app using JS interoperability:
      // https://dart.dev/interop/js-interop
      window.PLAYON_NETWORK_APP_INSTANCES = window.PLAYON_NETWORK_APP_INSTANCES || {};
      window.PLAYON_NETWORK_APP_INSTANCES[name] = instance;
    }

    return instance;
  }

  /**
   * @package
   * @param {HTMLElement|string} [element]
   * @since 1.0.0
   */
  load(element) {
    if (typeof element === 'string') {
      this._element = document.querySelector(element);
    } else if (element instanceof HTMLElement) {
      this._element = element;
    }

    if (!this._loading) {
      this._loading = true;
      this._dispatchEvent(new Event(PlayonNetworkEventType.loading));

      const serviceWorkerVersion = this._config.serviceWorkerVersion;
      let serviceWorker = null;

      if (serviceWorkerVersion && this._engine._config.isStandalone) {
        serviceWorker = {
          serviceWorkerVersion: serviceWorkerVersion,
        };
      }

      // noinspection JSUnresolvedReference
      _flutter.loader.loadEntrypoint({
        entrypointUrl: `${this._engine.baseUrl}${this._config.entrypoint}`,
        onEntrypointLoaded: async (engineInitializer) => {
          this._dispatchEvent(new Event(PlayonNetworkEventType.loaded));
          this._engineInitializer = engineInitializer;
          await this.run();
        },
        serviceWorker: serviceWorker,
      });
    } else if (this._engineInitializer) {
      // noinspection JSIgnoredPromiseFromCall
      this.run();
    }
  }

  /**
   * @private
   * @since 1.0.0
   */
  async run() {
    this._setupBodyStyles();
    this._listenFirstFrameEvent();

    const appRunner = await this._engineInitializer.initializeEngine({
      assetBase: this._engine.baseUrl,
      hostElement: this._element,
    });

    this._dispatchEvent(new Event(PlayonNetworkEventType.starting));

    // noinspection JSUnresolvedReference
    await appRunner.runApp();
  }

  /**
   * Add the styles to the body tag needed to avoid issues with the Flutter app.
   *
   * @private
   * @since 1.1.0
   */
  _setupBodyStyles() {
    document.body.style.cssText = 'overflow: hidden; user-select: none; touch-action: none;';
  }

  /**
   * @private
   * @since 1.1.0
   */
  _listenFirstFrameEvent() {
    this.__onFirstFrame = this._onFirstFrame.bind(this);
    window.addEventListener(PlayonNetworkEventType.rendered, this.__onFirstFrame);
  }

  /**
   * @private
   * @since 1.1.0
   */
  _onFirstFrame() {
    window.removeEventListener(PlayonNetworkEventType.rendered, this.__onFirstFrame);
    this._dispatchEvent(new Event(PlayonNetworkEventType.started));
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
