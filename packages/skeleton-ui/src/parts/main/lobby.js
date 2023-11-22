import {LitElement, html, css} from 'lit';
import {skeletonBoxSizing, skeletonAnimated} from "../../styles.js";
import {skeletonMainContentStyles} from "./styles.js";

class SkeletonFantasyLobby extends LitElement {
    static styles = [
        skeletonBoxSizing,
        skeletonAnimated,
        skeletonMainContentStyles,
        css`:host {
          display: flex;
          flex-wrap: wrap;
        }`,
        css`.skeleton-main__item {
          min-width: 255px;
          max-height: 290px;
        }`,
    ];

    render() {
        const items = [];

        for (let i = 0; i < 30; i++) {
            items.push(html`<div class="skeleton-animated skeleton-main__item"></div>`);
        }

        return html`${items}`;
    }
}

customElements.define('po-fantasy-lobby', SkeletonFantasyLobby);
