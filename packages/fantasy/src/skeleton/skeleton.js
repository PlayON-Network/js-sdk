import {LitElement, html, css} from 'lit';
import {skeletonBoxSizing} from "./styles.js";
import "./parts/drawer.js";
import "./parts/main.js";
import "./components/logo.js";

class SkeletonFantasy extends LitElement {
    static styles = [
        skeletonBoxSizing,
        css`
          .skeleton {
            z-index: 1;
            position: absolute;
            display: flex;
            width: 100%;
            height: 100%;
            background-color: #F2F3F5;
            transition: opacity 350ms ease-in-out;
          }
          
          .skeleton--authentication {
            background-color: #fff;
          }
        `,
    ];

    render() {
        const screen = this._getScreen();
        const content = this._renderContent(screen);

        return html`
            <div id="po-skeleton" class="skeleton skeleton--${screen}">
                ${content}
            </div>
        `;
    }

    _renderContent(screen) {
        if (screen === 'authentication') {
            return html`
                <po-fantasy-auth>
                    <slot name="auth-logo" slot="logo"></slot>
                </po-fantasy-auth>
            `;
        } else {
            return html`
                <po-fantasy-drawer>
                    <slot name="drawer-logo" slot="logo"></slot>
                </po-fantasy-drawer>
                <po-fantasy-main screen="${screen}"></po-fantasy-main>
            `;
        }
    }

    _getScreen() {
        const parts = window.location.hash
            .replace(/#\/|#/, '')
            .split('/');

        const isMultisport = this._isMultisport(parts);

        if (isMultisport) {
            return parts[2];
        }

        return parts[0];
    }

    _isMultisport(parts) {
        return parts.length > 2 &&
            parts[1].length === 4 &&
            Number.isInteger(parseInt(parts[1]));
    }
}

customElements.define('po-fantasy-skeleton', SkeletonFantasy);
