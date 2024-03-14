/**
 * @license
 * Copyright 2023 PlayON Technologies
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {LitElement, html, css} from 'lit';
import {skeletonBoxSizing} from "../styles.js";
import "../components/app-bar.js";
import "../components/app-bar--secondary.js";
import "../components/app-bar--tertiary.js";
import "../components/bottom-bar.js";
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
        const tertiaryBar = this._renderTertiaryBar(this.screen);

        return html`
            <po-skeleton-app-bar></po-skeleton-app-bar>
            <po-skeleton-app-bar--secondary></po-skeleton-app-bar--secondary>
            ${tertiaryBar}
            ${content}
            <po-skeleton-bottom-bar></po-skeleton-bottom-bar>
        `;
    }

    _renderTertiaryBar(screen) {
        switch (screen) {
            case 'lineups':
            case 'teams':
                return html`<po-skeleton-app-bar--tertiary></po-skeleton-app-bar--tertiary>`;

            default:
                return html``;
        }
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
