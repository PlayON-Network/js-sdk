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
