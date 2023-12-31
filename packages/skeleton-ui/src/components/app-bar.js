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
    skeletonAnimated,
    skeletonBoxSizing,
    skeletonIcon
} from "../styles.js";

export const skeletonAppBarStyles = css`
    .skeleton-app-bar {
        background-color: var(--app-bar-color, #fff);
        height: 72px;
        border-bottom: var(--app-bar-border-color, #ECECEE) 0.5px solid;
        display: flex;
        padding: 10px 40px;
        align-items: center;
    }

    .skeleton-app-bar__title {
        width: 150px;
        height: 35px;
        border-radius: 4px;
        background-color: var(--skeleton-color, #D1D6DE);
    }

    .skeleton-app-bar__icon {
        margin-left: auto;
    }

    .skeleton-app-bar__event-selector {
        width: 430px;
        height: 100%;
        border-radius: 4px;
        background-color: var(--app-bar-event-selector-color, #EBECF0);
        margin-right: auto;
    }
    
    .skeleton-app-bar__label {
        width: 60px;
        height: 16px;
        border-radius: 3px;
        background-color: var(--skeleton-color, #D1D6DE);
        margin-left: 30px;
    }
    
    .skeleton-app-bar__button {
        width: 100px;
        height: 30px;
        border-radius: 4px;
        background-color: var(--app-bar-button-color, #F2F2F2);
        margin-left: 30px;
    }
`;

class SkeletonAppBar extends LitElement {
    static styles = [
        skeletonBoxSizing,
        skeletonAnimated,
        skeletonIcon,
        skeletonAppBarStyles,
    ];

    render() {
        return html`
            <div class="skeleton-app-bar">
                <div class="skeleton-animated skeleton-app-bar__title"></div>
                <div class="skeleton-animated skeleton-icon skeleton-app-bar__icon"></div>
            </div>
        `;
    }
}

customElements.define('po-skeleton-app-bar', SkeletonAppBar);