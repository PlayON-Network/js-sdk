import { PlayonNetworkApp } from "@playon-network/engine";

/**
 * Playon Network App abstract class.
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
    return PlayonNetworkApp.getInstance(FantasyApp._entrypointName);
  }

  /**
   * @package
   *
   * @param {Engine} engine
   * @param {HTMLElement} element
   *
   * @since 1.0.0
   */
  static initialize(engine, element) {
    return PlayonNetworkApp.initialize(engine, element, FantasyApp._entrypointName, () => {
      return new FantasyApp(engine, element, FantasyApp._entrypointName);
    });
  }

  /**
   * @private
   * @type {string}
   * @since 1.0.0
   */
  static get _entrypointName() {
    return "main.dart";
  }
}
