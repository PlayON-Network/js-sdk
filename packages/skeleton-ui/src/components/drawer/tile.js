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
import {skeletonAnimated, skeletonIcon, skeletonLabel, skeletonBoxSizing} from "../../styles.js";

export class SkeletonDrawerTile extends LitElement {
    static properties = {
        modifier: {type: String},
        class: {type: String},
    };

    static styles = [
        skeletonBoxSizing,
        skeletonAnimated,
        skeletonIcon,
        skeletonLabel,
        css`:host {
          width: 100%;
        }`,
        css`.skeleton-drawer__tile {
            display: flex;
            align-items: center;
            padding: 10px;
            border-radius: 4px;
            width: 100%;
            box-sizing: border-box;

            @media (min-width: 1440px) {
                padding: 10px 15px;
            }
        }`,
        css`.skeleton-drawer__tile--competition {
            margin-top: 32px;
            margin-bottom: 18px;
        }`,
        css`.skeleton-drawer__tile.first {
            margin-top: 10px;
        }`,
        css`.skeleton-drawer__tile__label {
            height: 20px;
            margin-left: 20px;
            flex: 1;
            display: none;
            box-sizing: border-box;

            @media (min-width: 1440px) {
              display: block;
            }
        }`,
    ];

    render() {
        const classNames = ['skeleton-drawer__tile'];

        if (this.modifier) {
            classNames.push(this.modifier.split(' ').map(
                m => `skeleton-drawer__tile--${m}`)
            );
        }

        return html`
            <div class="${classNames.join(' ')} ${this.class}">
                <div class="skeleton-animated skeleton-icon skeleton-drawer__tile__icon"></div>
                <div class="skeleton-animated skeleton-label skeleton-drawer__tile__label"></div>
            </div>
        `;
    }
}

customElements.define('po-skeleton-drawer-tile', SkeletonDrawerTile);