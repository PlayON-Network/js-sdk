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
import {skeletonBoxSizing} from "../../styles.js";

class SkeletonDrawerDivider extends LitElement {
    static properties = {
        modifier: {type: String},
        class: {type: String},
    };

    static styles = [
        skeletonBoxSizing,
        css`:host {
          width: 100%;
          min-height: 2px;
          background-color: var(--drawer-divider-color, #ECECEE);
          margin: 10px 0;
        }`,
    ];
}

customElements.define('po-skeleton-drawer-divider', SkeletonDrawerDivider);