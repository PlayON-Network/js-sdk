import defaults from './utils/defaults.js';

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
    const nid = config.nid;

    if (!nid) {
      throw new Error('Your Playon Network ID is required.');
    }
    
    if (!config.authToken) {
      throw new Error('An Auth Token is required.');
    }

    this._config = defaults(config, PlayonNetworkEngine._defaultOptions);

    const env = this._config.isTesting ? 'staging' : 'www';
    this._base = `https://${env}.playon.network/app/${nid}/`;
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
    shouldAutoload: false,
    selector: '#fantasy_app',
    isTesting: false,
  };

  /**
   * @package
   * @type {import("@playon-network/engine").PlayonNetworkEngine}
   * 
   * @since 1.0.0
   */
  static get instance() {
    if (!PlayonNetworkEngine._instance) {
      throw new Error('You must initialize the Engine before use it.');
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
    }

    return PlayonNetworkEngine._instance;
  }

  /**
   * @package
   * @return {Promise<import("@playon-network/engine").PlayonNetworkEngine>}
   * @since 1.0.0
   */
  load() {
    return new Promise((resolve) => {
      if (!this._loaded) {
        const scripts = ['engine.js'];

        this._resolveCounter = scripts.length;

        for (const script of scripts) {
          this._loadScript(script, resolve);
        }
      } else {
        resolve(this);
      }  
    });
  }

  /**
   * @private
   * @since 1.0.0
   */
  _loadScript(fileName, resolve) {
    const scriptElement = document.createElement('script');
    
    scriptElement.src = `${this._base}${fileName}`;
    scriptElement.addEventListener('load', () => {
      this._scriptLoaded(resolve);
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
