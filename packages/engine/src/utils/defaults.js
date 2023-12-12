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

// Return the options object filled with the default values if any of them is missed.
//
// @since 1.0.0
//
// @param {Object} options - The options object.
// @param {Object} defaults - The default values object.
//
// @returns {Object} The options object filled with the default values if any of them is missed.
export default function (options, defaults) {
  const filledOptions = {};

  for (const key in defaults) {
    if (options[key] === undefined) {
      filledOptions[key] = defaults[key];
    } else {
      filledOptions[key] = options[key];
    }
  }

  return filledOptions;
}
