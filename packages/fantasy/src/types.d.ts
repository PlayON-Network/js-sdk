import { PlayonNetworkEngine } from '@playon-network/engine';
import FantasyApp from "./app";

declare module '@playon-network/fantasy' {
  /**
   * @param {PlayonNetworkEngine} engine
   * @param {HTMLElement|string} element
   * @returns {FantasyApp}
   * @since 1.0.0
   */
  export function initializeFantasyApp(
    engine: PlayonNetworkEngine,
    element: HTMLElement|string,
  ): FantasyApp;
}
