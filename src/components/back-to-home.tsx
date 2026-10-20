import Link from "next/link";

/**
 * A plain text link, not a pill with an arrow glyph in it. The word "Back"
 * already says the direction; the icon was repeating it.
 */
export function BackToHome() {
  return (
    <Link
      href="/"
      className="inline-flex min-h-11 items-center text-sm text-[var(--ink)] underline-offset-4 transition-colors hover:text-[var(--ink)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
    >
      Back to home
    </Link>
  );
}
