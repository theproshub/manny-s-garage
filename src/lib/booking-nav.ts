/**
 * Schedule & contact section on /book (Preferred day, time, name, phone, details).
 * Keep in sync with the ref wrapper in `src/app/book/page.tsx`.
 */
export const BOOK_SCHEDULE_FRAGMENT = "booking-schedule";

export const BOOK_SCHEDULE_HASH = `#${BOOK_SCHEDULE_FRAGMENT}`;

/** Append schedule anchor so /book opens scrolled to the booking fields when the form is shown. */
export function bookUrlWithSchedule(path: string): string {
  if (!path.startsWith("/book")) return path;
  if (path.includes("#")) return path;
  return `${path}${BOOK_SCHEDULE_HASH}`;
}
