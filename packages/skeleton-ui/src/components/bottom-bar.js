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

import "../components/bottom-bar/item.js";
import {LitElement, html, css} from 'lit';
import {
    skeletonAnimated,
    skeletonBoxSizing,
} from "../styles.js";

class SkeletonBottomBar extends LitElement {
    static styles = [
        skeletonBoxSizing,
        skeletonAnimated,
        css`
            :host {
                display: flex;
                flex-direction: row;
                overflow: hidden;
                height: 56px;
                background-color: var(--bottom-bar-color, #fff);
            }

            @media (min-width: 768px) {
                :host {
                    display: none;
                }
            }
        `,
    ];

    render() {
        return html`
            <po-skeleton-bottom-bar-item></po-skeleton-bottom-bar-item>
            <po-skeleton-bottom-bar-item></po-skeleton-bottom-bar-item>
            <po-skeleton-bottom-bar-item></po-skeleton-bottom-bar-item>
            <po-skeleton-bottom-bar-item></po-skeleton-bottom-bar-item>
        `;
    }
}

customElements.define('po-skeleton-bottom-bar', SkeletonBottomBar);