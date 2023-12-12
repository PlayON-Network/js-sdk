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
export default function (urlQuery) {
  const query = {};

  if (!!urlQuery) {
      const pairs = urlQuery.split('&');

      for (let i = 0; i < pairs.length; i++) {
          const pair = pairs[i].split('=');
          const key = decodeURIComponent(pair[0]);
          let value = decodeURIComponent(pair[1] || true);

          if (value === 'true') {
            value = true;
          } else if (value === 'false') {
            value = false;
          } else {
            const number = parseInt(value);

            if (!isNaN(number)) {
              value = number;
            }
          }

          query[key] = value;
      }
  }

  return query;
}
