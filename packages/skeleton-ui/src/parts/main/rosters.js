import {LitElement, html, css} from 'lit';
import {skeletonBoxSizing, skeletonAnimated} from "../../styles.js";
import {skeletonMainContentStyles} from "./styles.js";

class SkeletonFantasyRosters extends LitElement {
    static styles = [
        skeletonBoxSizing,
        skeletonAnimated,
        skeletonMainContentStyles,
        css`:host {
          display: flex;
        }`,
        css`@media (max-width: 1264px) {
          :host {
            justify-content: start;
          }
        }`,
        css`.skeleton-main__item {
          min-width: 350px;
          max-height: 600px;
        }`,
    ];

    render() {
        return html`
            <div class="skeleton-animated skeleton-main__item"></div>
            <div class="skeleton-animated skeleton-main__item"></div>
            <div class="skeleton-animated skeleton-main__item"></div>
        `;
    }
}

customElements.define('po-fantasy-rosters', SkeletonFantasyRosters);
