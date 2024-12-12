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

import defaults from './utils/defaults.js';
import {
  PlayonNetworkNidRequiredException,
  PlayonNetworkAuthTokenRequiredException,
  PlayonNetworkOnAuthTokenErrorRequiredException,
  PlayonNetworkAttestationTokenRequiredException,
  PlayonNetworkPathWrongFormattedException,
  PlayonNetworkEngineNotInitializedException,
  PlayonNetworkUnableToLoadEngineException,
} from './exception.js';

/**
 * Playon Network Engine class.
 *
 * @package
 * @type {import("@playon-network/engine").PlayonNetworkEngine}
 * @since 1.0.0
 */
export default class PlayonNetworkEngine {
  /**
   * @private
   * @param {import("@playon-network/engine").EngineOptions} config
   * @since 1.0.0
   */
  constructor(config) {
    const nid = config?.nid;
    let env;

    if (!nid) {
      throw new PlayonNetworkNidRequiredException();
    }

    if (!config.authToken) {
      throw new PlayonNetworkAuthTokenRequiredException();
    } else if (config.authToken !== 'fantasy-account' && !config.onAuthTokenError) {
      throw new PlayonNetworkOnAuthTokenErrorRequiredException();
    }

    if (config.isTesting && !config.attestationToken) {
      throw new PlayonNetworkAttestationTokenRequiredException();
    }

    this._config = defaults(config, PlayonNetworkEngine._defaultOptions);

    if (this._config.isTesting && this._config.attestationToken && self) {
      env = 'staging';
      self.FIREBASE_APPCHECK_DEBUG_TOKEN = this._config.attestationToken;
    } else {
      env = 'www';
    }

    const path = this._config.path;

    if (!path.startsWith('/') || !path.endsWith('/')) {
      throw new PlayonNetworkPathWrongFormattedException(path);
    }

    if (this._config.isStandalone) {
      this._base = `${location.origin}${path}`;
    } else {
      this._base = `https://${env}.playon.network${path}${nid}/`;
    }
  }

  /**
   * The base URL of the operator in the Playon Network.
   *
   * @private
   * @type {string}
   * @since 1.0.0
   */
  _base;

  /**
   * Check if the engine is loaded and ready to be used.
   *
   * @private
   * @type {boolean}
   * @since 1.0.0
   */
  _loaded = false;

  /**
   * Check if the engine is loaded and ready to be used.
   *
   * @public
   * @type {boolean}
   * @since 1.0.0
   */
  get isLoaded() {
    return this._loaded;
  }

  /**
   * @package
   * @type {string}
   * @since 1.0.0
   */
  get baseUrl() {
    return this._base;
  }

  /**
   * @private
   * @type {import("@playon-network/engine").PlayonNetworkEngine}
   *
   * @since 1.0.0
   */
  static _instance;

  /**
   * @private
   * @type {import("@playon-network/engine").EngineOptions}
   *
   * @since 1.0.0
   */
  static _defaultOptions = {
    nid: null,
    authToken: null,
    onAuthTokenError: null,
    onRequestAddFunds: null,
    attestationToken: null,
    isTesting: false,
    isStandalone: false,
    path: '/app/',
    entrypoint: 'engine.js',
  };

  /**
   * @package
   * @type {import("@playon-network/engine").PlayonNetworkEngine}
   *
   * @since 1.0.0
   */
  static get instance() {
    if (!PlayonNetworkEngine._instance) {
      throw new PlayonNetworkEngineNotInitializedException();
    }

    return PlayonNetworkEngine._instance;
  }

  /**
   * @public
   * @param {import("@playon-network/engine").EngineOptions} config
   * @return {import("@playon-network/engine").PlayonNetworkEngine}
   * @since 1.0.0
   */
  static initialize(config) {
    if (!PlayonNetworkEngine._instance) {
      PlayonNetworkEngine._instance = new PlayonNetworkEngine(config);

      // Save the instance in the window to be accessible by the Flutter app using JS interoperability:
      // https://dart.dev/interop/js-interop
      window.PLAYON_NETWORK_ENGINE_INSTANCE = PlayonNetworkEngine._instance;
    }

    return PlayonNetworkEngine._instance;
  }

  /**
   * @package
   * @return {Promise<import("@playon-network/engine").PlayonNetworkEngine>}
   * @since 1.0.0
   */
  load() {
    if (this._loaded) {
      return Promise.resolve(this);
    }

    if (!this._loading) {
      this._loading = new Promise((resolve, reject) => {
        const scripts = [this._config.entrypoint];

        this._resolveCounter = scripts.length;

        for (const script of scripts) {
          this._loadScript(script, resolve, reject);
        }
      });
    }

    return this._loading;
  }

  /**
   * @private
   * @since 1.0.0
   */
  _loadScript(fileName, resolve, reject) {
    const scriptElement = document.createElement('script');

    scriptElement.src = `${this._base}${fileName}`;
    scriptElement.addEventListener('load', () => {
      this._scriptLoaded(resolve);
    });

    scriptElement.addEventListener('error', (event) => {
      reject(new PlayonNetworkUnableToLoadEngineException(event.error));
    });

    document.head.appendChild(scriptElement);
  }

  /**
   * @private
   * @since 1.0.0
   */
  _scriptLoaded(resolve) {
    this._resolveCounter--;

    if (this._resolveCounter === 0) {
      this._loaded = true;
      resolve(this);
    }
  }
}
