/**
 * Formatting utilities used across components.
 * Pure functions — no side effects, fully testable.
 */

/** Format a number with locale-aware thousands separator */
export function formatNumber(n: number, locale = 'en-IN'): string {
  return new Intl.NumberFormat(locale).format(n);
}

/** Format an ISO date string to a readable display date */
export function formatDate(iso: string, options?: Intl.DateTimeFormatOptions): string {
  const defaults: Intl.DateTimeFormatOptions = {
    year: 'numeric', month: 'short', day: 'numeric',
  };
  return new Intl.DateTimeFormat('en-IN', options ?? defaults).format(new Date(iso));
}

/** Relative time: "2 days ago", "in 3 hours" */
export function relativeTime(iso: string): string {
  const rtf  = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
  const diff = Date.now() - new Date(iso).getTime();
  const secs = Math.floor(diff / 1000);

  if (secs < 60)     return rtf.format(-secs,            'second');
  if (secs < 3600)   return rtf.format(-Math.floor(secs / 60),    'minute');
  if (secs < 86400)  return rtf.format(-Math.floor(secs / 3600),  'hour');
  if (secs < 604800) return rtf.format(-Math.floor(secs / 86400), 'day');
  if (secs < 2592000)return rtf.format(-Math.floor(secs / 604800),'week');
  return rtf.format(-Math.floor(secs / 2592000), 'month');
}

/** Clamp a number between min and max */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** Build initials from a full name */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');
}
