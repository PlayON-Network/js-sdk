import { PlayonNetworkEngine } from '@playon-network/engine';

declare module '@playon-network/fantasy' {
  /**
   * @param {PlayonNetworkEngine} engine
   * @param {HTMLElement} element
   * @returns {FantasyApp}
   * @since 1.0.0
   */
  export function initializeFantasyApp(engine: PlayonNetworkEngine, element: HTMLElement): FantasyApp;

  /**
   * @public
   * @since 1.0.0
   */
  export interface FantasyApp {
    /**
     * @public
     * @since 1.0.0
     */
    deactivate(): void;
  }
}
