import FantasySkeleton from "./fantasy.js";

/**
 * @since 1.0.0
 */
export function initializeFantasySkeleton() {
  const elem = 'po-fantasy-skeleton';
  customElements.get(elem) || customElements.define(elem, FantasySkeleton);
}
