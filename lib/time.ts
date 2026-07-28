// The sleep window straddles midnight, so a "night" has to belong to one day.
// Rule: anything before 2am counts as the previous day's night. The night of
// Jul 28 therefore runs 10pm Jul 28 -> 2am Jul 29, and 2am is also the moment
// the daily tasks roll over.

export const WINDOW_OPEN_HOUR = 22; // 10pm
export const WINDOW_CLOSE_HOUR = 2; // 2am

/** A night is identified by the calendar date it *started* on. */
export type NightKey = string; // YYYY-MM-DD

function toKey(d: Date): NightKey {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function nightKey(now: Date): NightKey {
  const d = new Date(now);
  if (d.getHours() < WINDOW_CLOSE_HOUR) d.setDate(d.getDate() - 1);
  return toKey(d);
}

export function previousNight(key: NightKey): NightKey {
  const [y, m, d] = key.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  date.setDate(date.getDate() - 1);
  return toKey(date);
}

export function isWindowOpen(now: Date): boolean {
  const h = now.getHours();
  return h >= WINDOW_OPEN_HOUR || h < WINDOW_CLOSE_HOUR;
}

/** Milliseconds until the window next opens. Only meaningful while it's shut. */
export function msUntilWindowOpens(now: Date): number {
  const next = new Date(now);
  next.setHours(WINDOW_OPEN_HOUR, 0, 0, 0);
  if (next.getTime() <= now.getTime()) next.setDate(next.getDate() + 1);
  return next.getTime() - now.getTime();
}

export function formatClock(d: Date): string {
  return d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

/**
 * 22 -> "10:00 PM", using the device locale. Only safe to render once mounted,
 * since the server's locale may not match the browser's.
 */
export function formatHour(hour: number): string {
  const d = new Date();
  d.setHours(hour, 0, 0, 0);
  return formatClock(d);
}

/** 22 -> "10pm". Locale-free and clock-free, so it survives server rendering. */
export function hourLabel(hour: number): string {
  const suffix = hour >= 12 ? "pm" : "am";
  const h = hour % 12 === 0 ? 12 : hour % 12;
  return `${h}${suffix}`;
}

export function formatCountdown(ms: number): string {
  const totalMinutes = Math.max(0, Math.ceil(ms / 60000));
  if (totalMinutes < 1) return "less than a minute";
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours === 0) return `${minutes}m`;
  return `${hours}h ${minutes}m`;
}
