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

import FantasyApp from "./app.js";
import { PlayonNetworkApp } from "@playon-network/engine";

/**
 * @param {import("@playon-network/engine").PlayonEngine} engine
 * @param {HTMLElement} element
 * @returns {PlayonNetworkApp}
 * @since 1.0.0
 */
export function initializeFantasyApp(engine, element, _options) {
  /**
   * @type {PlayonNetworkApp}
   */
  const app = FantasyApp.initialize(engine, element, _options);
  app.load();

  return app;
}
