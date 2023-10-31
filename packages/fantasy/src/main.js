import FantasyApp from "./app.js";
import { PlayonNetworkApp } from "@playon-network/engine";

/**
 * @param {import("@playon-network/engine").PlayonEngine} engine
 * @param {HTMLElement} element
 * @returns {PlayonNetworkApp}
 * @since 1.0.0
 */
export function initializeFantasyApp(engine, element) {
  /**
   * @type {PlayonNetworkApp}
   */
  const app = FantasyApp.initialize(engine, element);
  app.load();

  return app;
}
