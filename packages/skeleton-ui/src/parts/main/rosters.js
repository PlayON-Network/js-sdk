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
import {skeletonBoxSizing, skeletonAnimated} from "../../styles.js";
import {skeletonMainContentStyles} from "./styles.js";

class SkeletonFantasyRosters extends LitElement {
    static styles = [
        skeletonBoxSizing,
        skeletonAnimated,
        skeletonMainContentStyles,
        css`:host {
          display: flex;
        }`,
        css`@media (max-width: 1264px) {
          :host {
            justify-content: start;
          }
        }`,
        css`.skeleton-main__item {
          min-width: 350px;
          max-height: 600px;
        }`,
    ];

    render() {
        return html`
            <div class="skeleton-animated skeleton-main__item"></div>
            <div class="skeleton-animated skeleton-main__item"></div>
            <div class="skeleton-animated skeleton-main__item"></div>
        `;
    }
}

customElements.define('po-fantasy-rosters', SkeletonFantasyRosters);
