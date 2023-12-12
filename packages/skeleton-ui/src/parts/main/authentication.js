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
    skeletonLabel,
    skeletonLabel_w100,
    skeletonLabel_w150,
    skeletonLabel_w250,
    skeletonLabel_w350,
    skeletonLabel_h12,
    skeletonLabel_h18,
    skeletonLabel_h25,
    skeletonVSpace5,
    skeletonVSpace10,
    skeletonVSpace20,
    skeletonVSpace25,
    skeletonVSpace45,
} from "../../styles.js";
import {skeletonMainContentStyles} from "./styles.js";

class SkeletonFantasyAuth extends LitElement {
    static styles = [
        skeletonBoxSizing,
        skeletonAnimated,
        skeletonMainContentStyles,
        skeletonLabel,
        skeletonLabel_w100,
        skeletonLabel_w150,
        skeletonLabel_w250,
        skeletonLabel_w350,
        skeletonLabel_h12,
        skeletonLabel_h18,
        skeletonLabel_h25,
        skeletonVSpace5,
        skeletonVSpace10,
        skeletonVSpace20,
        skeletonVSpace25,
        skeletonVSpace45,
        css`:host {
          display: flex;
          flex-direction: column;
          justify-content: start;
          padding-top: 20px;
        }`,
        css`.skeleton-form {
          display: flex;
          flex-direction: column;
          width: 400px;
          margin-bottom: 25px;
        }`,
        css`.skeleton-form .skeleton-label {
          height: 12px;
          margin-bottom: 6px;
        }`,
        css`.skeleton-form .skeleton-field, .skeleton-form .skeleton-submit {
          height: 42px;
          border-radius: 3px;
          background-color: var(--skeleton-color, #D1D6DE);
        }`,
        css`.skeleton-form .skeleton-field {
          margin-bottom: 15px;
        }`,
        css`.skeleton-form .skeleton-submit {
          margin: 10px 0;
        }`,
    ];

    render() {
        return html`
            <slot name="logo"></slot>
            <div class="skeleton-animated skeleton-vspace--20"></div>
            <div class="skeleton-animated skeleton-label skeleton-label--w150 skeleton-label--h18"></div>
            <div class="skeleton-animated skeleton-vspace--10"></div>
            <div class="skeleton-animated skeleton-label skeleton-label--w250 skeleton-label--h25"></div>
            <div class="skeleton-animated skeleton-vspace--25"></div>
            <div class="skeleton-animated skeleton-label skeleton-label--w350 skeleton-label--h12"></div>
            <div class="skeleton-animated skeleton-vspace--45"></div>

            <div class="skeleton-form">
                <div class="skeleton-animated skeleton-label"></div>
                <div class="skeleton-animated skeleton-field"></div>

                <div class="skeleton-animated skeleton-label skeleton-label--w100"></div>
                <div class="skeleton-animated skeleton-field"></div>

                <div class="skeleton-animated skeleton-submit"></div>
            </div>

            <div class="skeleton-animated skeleton-label skeleton-label--w100 skeleton-label--h12"></div>
        `;
    }
}

customElements.define('po-fantasy-auth', SkeletonFantasyAuth);
