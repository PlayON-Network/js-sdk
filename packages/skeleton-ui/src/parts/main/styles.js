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

import {css} from 'lit';

export const skeletonMainContentStyles = css`
  :host {
    overflow: hidden;
    flex: 1;
    align-items: center;
    justify-content: center;
    padding: 25px;
  }

  .skeleton-main__item {
    height: 100%;
    border-radius: 10px;
    margin: 15px;
    background-color: var(--item-color, #EBECF0);
  }
`;