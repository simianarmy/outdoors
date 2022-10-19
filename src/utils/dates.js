import { Date } from "prismic-reactjs";

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
 * @param {String} timestamp
 * @returns {String} Month DD format
 */
export function displayMonthAndDay(timestamp) {
  return Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
  }).format(new Date(timestamp));
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

/**
 * @param {Date} start
 * @param {Date} end
 * @returns {Number}
 */
export function calculateNights(start, end) {
  return Math.round(
    (Date(end).getTime() - Date(start).getTime()) / (86400 * 1000)
  );
}

