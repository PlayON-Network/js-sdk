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
import App from './app.js';

/**
 * Creates, initializes and returns a Playon Network Engine instance.
 * 
 * @param {import("@playon-network/engine").EngineOptions} config
 * @returns {Promise<import("@playon-network/engine").PlayonNetworkEngine>}
 * @since 1.0.0
 */
export function initializeEngine(config) {
	const engine = Engine.initialize(config);
	return engine.load();
}

export { App as PlayonNetworkApp };