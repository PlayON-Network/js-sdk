import {LitElement, html, css} from 'lit';
import {skeletonLogoSm, skeletonBoxSizing} from "../../styles.js";

export class SkeletonDrawerLogo extends LitElement {
    static properties = {
        src: {type: String},
    };

    static styles = [
        skeletonBoxSizing,
        skeletonLogoSm,
        css`.skeleton-drawer__logo {
          margin-top: 25px;
        }`,
    ];

    render() {
        return html`
            <img
                alt="Application Logo"
                class="skeleton-drawer__logo skeleton-logo--sm"
                src="${this.src}"
            >
        `;
    }
}

customElements.define('po-skeleton-drawer-logo', SkeletonDrawerLogo);