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

/**
 * @abstract
 * @public
 * @since 1.1.0
 */
export default class PlayonNetworkEventType {
  /**
   * @public
   * @readonly
   * @type {string}
   * @since 1.1.0
   */
  static loading = 'playon-network.app.loading';

  /**
   * @public
   * @readonly
   * @type {string}
   * @since 1.1.0
   */
  static loaded = 'playon-network.app.loaded';

  /**
   * @public
   * @readonly
   * @type {string}
   * @since 1.1.0
   */
  static starting = 'playon-network.app.starting';

  /**
   * @public
   * @readonly
   * @type {string}
   * @since 1.1.0
   */
  static started = 'playon-network.app.started';

  /**
   * @package
   * @readonly
   * @type {string}
   * @since 1.1.0
   */
  static rendered = 'flutter-first-frame';
}
