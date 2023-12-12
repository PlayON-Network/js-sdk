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

import {LitElement, html} from 'lit';
import {skeletonLogoSm, skeletonLogoMd, skeletonBoxSizing} from "../styles.js";

export class SkeletonLogo extends LitElement {
    static properties = {
        src: {type: String},
        alt: {type: String},
        size: {type: String},
    };

    static styles = [
        skeletonBoxSizing,
        skeletonLogoSm,
        skeletonLogoMd,
    ];

    render() {
        return html`
            <img
                alt="${this.alt || 'Logo'}"
                class="skeleton-logo skeleton-logo--${this.size || 'default'}"
                src="${this.src}"
            >
        `;
    }
}

customElements.define('po-skeleton-logo', SkeletonLogo);