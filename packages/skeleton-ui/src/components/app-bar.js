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
    skeletonIconButton
} from "../styles.js";

export const skeletonAppBarStyles = css`
    .skeleton-app-bar {
        background-color: var(--app-bar-color, #fff);
        height: 64px;
        border-bottom: var(--app-bar-border-color, #ECECEE) 0.5px solid;
        display: flex;
        padding: 10px 15px;
        align-items: center;
    }

    @media (min-width: 768px) {
        .skeleton-app-bar {
            height: 72px;
            padding-left: 40px;
            padding-right: 40px;
        }
    }
    
    .skeleton-app-bar__spacer {
        width: 100%;
        flex: 1;
    }

    .skeleton-app-bar__title {
        width: 150px;
        height: 35px;
        border-radius: 4px;
        background-color: var(--skeleton-color, #D1D6DE);
    }

    .skeleton-app-bar__more-button {
        margin-left: auto;
    }
    
    .skeleton-app-bar__burger-button {
        margin-right: 20px;
    }

    .skeleton-app-bar__event-selector {
        width: 100%;
        height: 100%;
        border-radius: 4px;
        background-color: var(--app-bar-event-selector-color, #EBECF0);
    }
    
    .skeleton-app-bar__label {
        width: 60px;
        height: 16px;
        border-radius: 3px;
        background-color: var(--skeleton-color, #D1D6DE);
    }
    
    .skeleton-app-bar__button {
        width: 100px;
        height: 30px;
        border-radius: 4px;
        background-color: var(--app-bar-button-color, #F2F2F2);
    }

    @media (min-width: 768px) {
        .skeleton-app-bar__burger-button {
            display: none;
        }
        
        .skeleton-app-bar__event-selector {
            width: 430px;
        }
    }
`;

class SkeletonAppBar extends LitElement {
    static styles = [
        skeletonBoxSizing,
        skeletonAnimated,
        skeletonIconButton,
        skeletonAppBarStyles,
    ];

    render() {
        return html`
            <div class="skeleton-app-bar">
                <div class="skeleton-animated skeleton-icon-button skeleton-app-bar__burger-button"></div>
                <div class="skeleton-animated skeleton-app-bar__title"></div>
                <div class="skeleton-animated skeleton-icon-button skeleton-app-bar__more-button"></div>
            </div>
        `;
    }
}

customElements.define('po-skeleton-app-bar', SkeletonAppBar);