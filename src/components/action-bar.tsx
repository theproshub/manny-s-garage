import Link from "next/link";
import { SITE_PHONE_DISPLAY, SITE_PHONE_TEL } from "@/lib/contact";

/**
 * A fixed two-button bar pinned to the bottom of the screen on phones.
 *
 * On a phone the header scrolls away, and every page on this site ends with a
 * customer having to find their way back to a booking link. This is the shop
 * equivalent of the number painted on the van door: call, or book, from
 * anywhere on the site, without scrolling and without opening a menu.
 *
 * Hidden from large screens, where the header stays in view and already
 * carries both. `--action-bar-h` reserves the space it occupies so the bar
 * never covers the last line of a page.
 */
export function ActionBar() {
  return (
    <div className="action-bar lg:hidden">
      <a href={SITE_PHONE_TEL} className="action-bar-call">
        <span className="action-bar-label">Call the shop</span>
        <span className="figure action-bar-value">{SITE_PHONE_DISPLAY}</span>
      </a>
      <Link href="/book" className="action-bar-book">
        Book online
      </Link>
    </div>
  );
}
