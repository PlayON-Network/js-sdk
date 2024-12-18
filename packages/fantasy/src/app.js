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

import { PlayonNetworkApp } from "@playon-network/engine";

/**
 * Playon Network Fantasy App class.
 *
 * @package
 * @type {import("@playon-network/fantasy").FantasyApp}
 * @since 1.0.0
 */
export default class FantasyApp extends PlayonNetworkApp {
  /**
   * @package
   * @type {PlayonNetworkApp}
   *
   * @since 1.0.0
   */
  static get instance() {
    return PlayonNetworkApp.getInstance(FantasyApp._name);
  }

  /**
   * @package
   *
   * @param {import("@playon-network/engine").PlayonEngine} engine
   * @param {import("@playon-network/engine").AppOptions} [options]
   *
   * @since 1.0.0
   */
  static initialize(engine, options = null) {
    return PlayonNetworkApp.getInstance(
      FantasyApp._name,
      () => new FantasyApp(engine, options),
    );
  }

  /**
   * @private
   * @type {string}
   * @since 1.0.0
   */
  static get _name() {
    return 'fantasy';
  }
}
