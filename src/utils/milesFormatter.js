/**
 * Converts miles to a string with commas inserted for formatting
 * @param {number} miles - The miles to format with commas
 * @return {string} formatted - The miles formatted with commas
 */
function milesFormatter(miles) {
  if (typeof miles !== "number") {
    miles = Number(miles);
  }

  if (isNaN(miles)) {
    miles = 0;
  }

  let str = miles.toString();
  let formatted = "";

  let count = 0;

  for (let i = str.length - 1; i >= 0; i--) {
    formatted = str.charAt(i) + formatted;
    count++;
    if (count === 3 && i > 0) {
      formatted = "," + formatted;
      count = 0;
    }
  }

  return formatted;
}

export default milesFormatter;
