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
import {skeletonBoxSizing} from "./styles.js";
import "./parts/drawer.js";
import "./parts/main.js";
import "./components/logo.js";

export default class FantasySkeleton extends LitElement {
    constructor() {
        super();
        window.addEventListener('flutter-first-frame', this._fadeOut.bind(this));
    }

    static properties = {
        defaultScreen: {type: String},
    };

    static styles = [
        skeletonBoxSizing,
        css`
          .skeleton {
            z-index: 1;
            position: absolute;
            display: flex;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            background-color: var(--background-color, #F2F3F5);
            transition: opacity 350ms ease-in-out;
          }

          .skeleton--fade-out {
            opacity: 0.0;
          }
          
          .skeleton--authentication {
            background-color: #fff;
          }
        `,
    ];

    _fadeOut() {
        setTimeout(() => {
            const element = this.shadowRoot.getElementById('po-skeleton');

            if (element) {
                element.classList.add('skeleton--fade-out');

                setTimeout( () => {
                    this.remove();
                },  350);
            }
        }, 350);
    }

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
        let screen;
        const parts = window.location.hash
            .replace(/#\/|#/, '')
            .split('/');

        const isMultisport = this._isMultisport(parts);

        if (isMultisport) {
            screen = parts[2];
        } else {
            screen = parts[0];
        }

        return screen || 'teams';
    }

    _isMultisport(parts) {
        return parts.length > 2 &&
            parts[1].length === 4 &&
            Number.isInteger(parseInt(parts[1]));
    }
}
