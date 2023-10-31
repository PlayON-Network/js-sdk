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