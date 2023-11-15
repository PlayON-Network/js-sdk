import {LitElement, html, css} from 'lit';
import {skeletonAnimated, skeletonBoxSizing, skeletonIcon} from "../styles.js";
import {skeletonAppBarStyles} from "./app-bar.js";

class SkeletonAppBarSecondary extends LitElement {
    static styles = [
        skeletonBoxSizing,
        skeletonAnimated,
        skeletonIcon,
        skeletonAppBarStyles,
        css`.skeleton-app-bar--secondary {
          height: 64px;
        }`,
    ];

    render() {
        return html`
            <div class="skeleton-app-bar skeleton-app-bar--secondary">
                <div class="skeleton-animated skeleton-app-bar__event-selector"></div>
                <div class="skeleton-animated skeleton-app-bar__label"></div>
                <div class="skeleton-animated skeleton-app-bar__label"></div>
                <div class="skeleton-animated skeleton-app-bar__label"></div>
                <div class="skeleton-animated skeleton-app-bar__button"></div>
            </div>
        `;
    }
}

customElements.define('po-skeleton-app-bar--secondary', SkeletonAppBarSecondary);