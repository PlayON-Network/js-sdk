import {LitElement, html} from 'lit';
import {skeletonLogoSm, skeletonLogoMd, skeletonBoxSizing} from "../styles.js";

export class SkeletonLogo extends LitElement {
    static properties = {
        src: {type: String},
        alt: {type: String},
        size: {type: String},
    };

    static styles = [
        skeletonBoxSizing,
        skeletonLogoSm,
        skeletonLogoMd,
    ];

    render() {
        return html`
            <img
                alt="${this.alt || 'Logo'}"
                class="skeleton-logo skeleton-logo--${this.size || 'default'}"
                src="${this.src}"
            >
        `;
    }
}

customElements.define('po-skeleton-logo', SkeletonLogo);