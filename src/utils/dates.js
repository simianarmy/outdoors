/**
 * @param {Date} date JS or compatible date object
 * @returns {String} standardized display date with hours
 */
export function displayTime(date) {
  return Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: '2-digit',
    hour: 'numeric',
  }).format(date)
}

/**
 * @param {Date} date JS or compatible date object
 * @returns {String} standardized display date
 */
export function displayDate(date) {
  return Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  }).format(date)
}
