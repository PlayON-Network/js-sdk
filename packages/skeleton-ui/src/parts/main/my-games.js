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

class SkeletonFantasyMyGames extends LitElement {
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

customElements.define('po-fantasy-my-games', SkeletonFantasyMyGames);
