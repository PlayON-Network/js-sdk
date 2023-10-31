declare module '@playon-network/engine' {
  /**
   * @param {EngineOptions} config
   * @returns {Promise<PlayonNetworkEngine>}
   * @since 1.0.0
   */
  export function initializeEngine(config: EngineOptions): Promise<PlayonNetworkEngine>;

  /**
   * @public
   * @since 1.0.0
   */
  export interface PlayonNetworkEngine {
    /**
     * Check if the engine is loaded and ready to be used.
     *
     * @public
     * @readonly
     * @type {boolean}
     * @since 1.0.0
     */
    isLoaded: boolean;
    
    /**
     * The base URL of the operator in the Playon Network
     *
     * @package
     * @readonly
     * @type {string}
     * @since 1.0.0
     */
    baseUrl: string;
  }

  /**
   * @public
   * @since 1.0.0
   */
  export interface PlayonNetworkApp {
    /**
     * @protected
     * @param {import("@playon-network/engine").PlayonNetworkEngine} engine
     * @param {HTMLElement} element
     * @since 1.0.0
     */
    constructor(engine: PlayonNetworkEngine, element: HTMLElement): void;

    /**
     * @package
     * @returns {Promise<PlayonNetworkApp>}
     * @since 1.0.0
     */
    load(): PlayonNetworkApp;
  }

  /**
   * Configuration options for the PlayON Network Engine.
   * 
   * @public
   * @since 1.0.0
   */
  export interface EngineOptions {
    /**
     * The PlayON Network ID (NID) associated to your account.
     * 
     * @since 1.0.0
     */
    nid: string;
    
    /**
     * @since 1.0.0
     */
    authToken: string;
    
    /**
     * The DOM element selector used by the autoload feature to find the element
     * where show the application.
     * 
     * @default '#fantasy_app'
     * @see {@link EngineOptions.shouldAutoload}
     * @since 1.0.0
     */
    selector?: string;

    /**
     * Tells to the engone if it should load automatically or not.
     * 
     * @default false
     * @since 1.0.0
     */
    shouldAutoload?: boolean;
    
    /**
     * Configure the Engine in test mode to use the staging environment
     * of the PlayON Network. Default value is `false`.
     * 
     * @default false
     * @since 1.0.0
     */
    isTesting?: boolean;
  }
}