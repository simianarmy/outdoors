/**
 * Common date utilities
 */

/**
 * @returns {String} Month DD format
 */
export function displayMonthAndDay(timestamp: string): string {
  return Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
  }).format(new Date(timestamp));
}

/**
 * @returns {String} standardized display date
 */
export function displayDate(date: Date): string {
  return Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  }).format(date)
}

/**
 * @returns {String} standardized display date with hours MM DD, HH
 */
export function displayDateTime(date: Date): string {
  return Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: '2-digit',
    hour: 'numeric',
  }).format(date)
}

export function displayDateTimeFromTimestamp(ts: string): string {
  return displayDateTime(new Date(ts));
}

export function calculateNights(startTime: string, endTime: string): number {
  return Math.round(
    (new Date(endTime).getTime() - new Date(startTime).getTime()) / (86400 * 1000)
  );
}

