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
