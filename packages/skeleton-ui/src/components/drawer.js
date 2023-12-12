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
import {skeletonBoxSizing} from "../styles.js";

export class SkeletonDrawer extends LitElement {
    static styles = [
        skeletonBoxSizing,
        css`:host {
          background-color: var(--drawer-color, #fff);
          width: 74px;
          height: 100%;
          border-right: var(--drawer-border-color, #ECECEE) 1px solid;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 25px 15px 0;
          overflow: hidden;
          box-sizing: border-box;

          @media (min-width: 1440px) {
            width: 250px;
          }
        }`,
    ];

    render() {
        return html`<slot></slot>`;
    }
}

customElements.define('po-skeleton-drawer', SkeletonDrawer);