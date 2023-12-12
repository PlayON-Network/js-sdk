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

import Engine from './engine.js';

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
   * @param {Engine} engine
   * @param {HTMLElement} element
   * @param {string} entrypoint
   *
   * @since 1.0.0
   */
  constructor(engine, element, entrypoint) {
    if (!engine.isLoaded) {
      throw new Error("Engine is not loaded.");
    }

    this._engine = engine;
    this._element = element;
    this._entrypoint = entrypoint;
  }

  /**
   * @private
   * @type {Object<string, PlayonNetworkApp>}
   * 
   * @since 1.0.0
   */
  static _instances = {};

  /**
   * @package
   * @type {PlayonNetworkApp}
   * 
   * @since 1.0.0
   */
  static getInstance(entrypointName) {
    const instance = PlayonNetworkApp._instances[entrypointName];

    if (!instance) {
      throw new Error(`You must initialize the application before use it.`);
    }

    return instance;
  }

  /**
   * Check if the application is initialized and ready to be loaded.
   *
   * @public
   * @type {boolean}
   * @since 1.0.0
   */
  get isLoaded() {
    return !!this._engineInitializer;
  }

  /**
   * @package
   *
   * @param {PlayonNetworkEngine} engine
   * @param {HTMLElement} element
   * @param {string} entrypoint
   * @param {Function} initializer
   *
   * @since 1.0.0
   */
  static initialize(engine, element, entrypoint, initializer) {
    let instance = PlayonNetworkApp._instances[entrypoint];

    if (!instance) {
      instance = initializer(engine, element, entrypoint);
      PlayonNetworkApp._instances[entrypoint] = instance;
    } else {
      instance._element = element;
      instance._engine = engine;
      instance._entrypoint = entrypoint;
    }

    return instance;
  }
  
  /**
   * @package
   * @since 1.0.0
   */
  load() {
    this._element.dispatchEvent(new Event("loading"));

    _flutter.loader.loadEntrypoint({
      entrypointUrl: `${this._engine.baseUrl}${this._entrypoint}.js`,
      onEntrypointLoaded: this._onEntrypointLoaded.bind(this),
      serviceWorker: {
        serviceWorkerVersion: serviceWorkerVersion,
      },
    });
  }

  /**
   * @private
   * @param {*} engineInitializer 
   * @since 1.0.0
   */
  async _onEntrypointLoaded(engineInitializer) {
    this._element.dispatchEvent(new Event("loaded"));
    this._element.dispatchEvent(new Event("initializing"));

    const appRunner = await engineInitializer.initializeEngine({
      assetBase: this._engine.baseUrl,
      hostElement: this._element,
    });

    this._element.dispatchEvent(new Event("initialized"));
    this._element.dispatchEvent(new Event("starting"));
    await appRunner.runApp();
    this._element.dispatchEvent(new Event("started"));
  }

  activate() {
    this._onEntrypointLoaded(this._engineInitializer, this._element);
  }

  deactivate() {
  }
}
