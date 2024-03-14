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
import {
    skeletonBoxSizing,
    skeletonAnimated,
    skeletonIcon,
    skeletonLabel, skeletonLabel_h12,
} from "../../styles.js";

class SkeletonBottomBarItem extends LitElement {
    static styles = [
        skeletonBoxSizing,
        skeletonAnimated,
        skeletonIcon,
        skeletonLabel,
        skeletonLabel_h12,
        css`
        :host {
            display: flex;
            flex-direction: column;
            flex: 1;
            align-items: center;
            justify-content: center;
            gap: 8px;
        }
        `,
    ];

    render() {
        return html`
            <div class="skeleton-bottom-bar__item__icon skeleton-icon skeleton-animated"></div>
            <div class="skeleton-bottom-bar__item__label skeleton-label skeleton-label--h12 skeleton-animated"></div>
        `;
    }
}

customElements.define('po-skeleton-bottom-bar-item', SkeletonBottomBarItem);