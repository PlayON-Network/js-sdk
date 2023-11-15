import { PlayonNetworkEngine } from '@playon-network/engine';
import {SkeletonDrawerTile} from "./skeleton/components/drawer/tile";

declare module '@playon-network/fantasy' {
  /**
   * @param {PlayonNetworkEngine} engine
   * @param {HTMLElement} element
   * @returns {FantasyApp}
   * @since 1.0.0
   */
  export function initializeFantasyApp(engine: PlayonNetworkEngine, element: HTMLElement): FantasyApp;

  /**
   * @param {PlayonNetworkEngine} engine
   * @param {HTMLElement} element
   * @param {string} [authToken]
   * @returns {FantasyApp}
   * @since 1.0.0
   */
  export function initializeFantasyApp(engine: PlayonNetworkEngine, element: HTMLElement, authToken?: string): FantasyApp;

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

declare global {
  interface HTMLElementTagNameMap {
    "po-skeleton-drawer-tile": SkeletonDrawerTile;
  }
}

