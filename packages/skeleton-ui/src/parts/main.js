import {LitElement, html, css} from 'lit';
import {skeletonBoxSizing} from "../styles.js";
import "../components/app-bar.js";
import "../components/app-bar--secondary.js";
import "./main/authentication.js";
import "./main/lobby.js";
import "./main/rosters.js";

class SkeletonFantasyMain extends LitElement {
    static properties = {
        screen: {type: String},
    };

    static styles = [
        skeletonBoxSizing,
        css`:host {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }`,
    ];

    render() {
        const content = this._renderContent(this.screen);

        return html`
            <po-skeleton-app-bar></po-skeleton-app-bar>
            <po-skeleton-app-bar--secondary></po-skeleton-app-bar--secondary>
            ${content}
        `;
    }

    _renderContent(screen) {
        switch (screen) {
            case 'lobby':
                return html`<po-fantasy-lobby></po-fantasy-lobby>`;

            case 'my-games':
                return html`<po-fantasy-my-games></po-fantasy-my-games>`;

            default:
                return html`<po-fantasy-rosters></po-fantasy-rosters>`;
        }
    }
}

customElements.define('po-fantasy-main', SkeletonFantasyMain);
