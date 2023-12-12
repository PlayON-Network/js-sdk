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
import {skeletonAnimated, skeletonBoxSizing, skeletonIcon} from "../styles.js";
import {skeletonAppBarStyles} from "./app-bar.js";

class SkeletonAppBarSecondary extends LitElement {
    static styles = [
        skeletonBoxSizing,
        skeletonAnimated,
        skeletonIcon,
        skeletonAppBarStyles,
        css`.skeleton-app-bar--secondary {
          background-color: var(--secondary-app-bar-color, var(--app-bar-color, #fff));
          height: 64px;
        }`,
    ];

    render() {
        return html`
            <div class="skeleton-app-bar skeleton-app-bar--secondary">
                <div class="skeleton-animated skeleton-app-bar__event-selector"></div>
                <div class="skeleton-animated skeleton-app-bar__label"></div>
                <div class="skeleton-animated skeleton-app-bar__label"></div>
                <div class="skeleton-animated skeleton-app-bar__label"></div>
                <div class="skeleton-animated skeleton-app-bar__button"></div>
            </div>
        `;
    }
}

customElements.define('po-skeleton-app-bar--secondary', SkeletonAppBarSecondary);