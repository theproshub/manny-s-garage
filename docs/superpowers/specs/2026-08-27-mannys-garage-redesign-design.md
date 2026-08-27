# Manny's Garage — Redesign Design Spec

Date: 2026-08-27
Status: Approved for planning

## Problem

Users report the site "looks dummy," question its legibility, and ask whether
the business is real. Investigation found two distinct causes.

### Cause 1 — the visual language belongs to a different industry

`src/app/globals.css` dresses a Fargo auto shop in science fiction: Orbitron as
display face, a neon cyan secondary accent, `.panel-cyber`, `.neon-ring`,
`.neon-text`, `.metal-text` chrome gradients, pulsing hero glows, and a shimmer
animation on stat bars — all on a near-black ground with an orange glow.

That combination (near-black + one hot accent + glow + geometric display face)
is where template generators and AI page builders land. Visitors read it as
generated rather than as a garage. Nothing about brake jobs, TV mounts, or a
rentable lift bay asks for a cyberpunk skin.

### Cause 2 — no evidence the business exists, and some evidence against

| Signal | State at time of writing |
| --- | --- |
| Street address | `schema.ts:21`, `footer.tsx:76`, `about/page.tsx:165` say 1341 Main Ave S. `page.tsx:380,392,405` say 1335 — including the Google Maps embed, which points customers at the wrong building. |
| TV mount rate | `page.tsx:72` says $1.75/inch. `fixed-quote-options.ts:17`, `handyman/services/layout.tsx:6` and every computed package say $1.50/inch. |
| Domain | `layout.tsx` `metadataBase` and `schema.ts` `BASE_URL` are `mannygarage.com`; published email is `service@mannysgarage.com`. |
| Phone | `+1 (609) 498-8246` — 609 is southern New Jersey, on a Fargo business. |
| Photography | `site-images.ts` hot-links Unsplash. `teamAbout` is a stock photo of strangers captioned "Team at Manny's Garage" on the About page. |
| Off-site proof | `schema.ts` `sameAs: []`. No Google Business Profile, socials, reviews, owner name, or licence info. |
| Legal | Privacy Policy and Terms both link to `#` (`footer.tsx:99-100`). |

### Legibility, literally

The complaint is also true in the plain sense. Body copy is `text-zinc-400`
(#a1a1aa) on near-black at 14px; labels drop to `text-[10px]`; the footer uses
`text-zinc-500`. Both readings of "legibility" point the same direction.

## Constraints

Confirmed with the owner:

- The business is **open and operating** in Fargo.
- **No** real photos, owner name/face, or Google Business Profile are available
  yet. The design must not depend on them, and must accommodate them later.
- Correct address is **1341 Main Ave S, Fargo, ND 58103**.
- Correct TV mount rate is **$1.50 per inch**.
- Canonical domain is **`mannygarage.com`**; the email must move to match it.

The one genuine asset available: concrete, itemized prices ($40 oil change,
$180 brake pads/axle, $20/hr bay, $1.50/inch TV mount, $50/item assembly,
$120/camera) and a real Square Appointments account. Vague pricing is a scam
signal; published pricing is a trust asset. It is currently buried.

## Design direction

Per `~/Documents/GitHub/CLAUDE.md`, the source is named before any UI.

**Source.** The paperwork a repair shop produces: the carbon-copy repair order,
the itemized estimate, the parts invoice, the labour-hours line, the signed
ticket. Figures in columns. Job codes. Rules that separate line items because
line items need separating.

**Signature.** Every service on the site is a real line on an estimate —
description, code, spec, price — in tabular figures. The whole site reads as
one document a customer could sign. The trust argument is carried by the
format, not by adjectives: businesses that publish itemized estimates are real.

**Deliberately not doing.** Near-black + orange glow + Orbitron. Letterspaced
uppercase eyebrow → heading → hairline rule. Rounded cards in a grid with
`hover:border-accent`. One uniform `py-16 sm:py-24` on every section. Oversized
translucent numerals. Pill-chips. A dark full-width CTA band above the footer.
Serif display + sans body. Also explicitly avoiding the warm cream `#F4F1EA` +
terracotta pairing that `CLAUDE.md` names as the unguided-output default.

Approaches considered and rejected: **shop-floor wayfinding** (bay numbers,
stencils, safety yellow) — strong but "industrial stencil" is itself a
recognizable template look; **Fargo Main Ave vernacular** — requires the
photography that does not exist yet, and collapses into generic Americana
without it. Revisit the latter once storefront photos exist.

## System

### Palette

Derived from multi-part carbonless forms: a white original with a canary
second copy.

| Token | Value | Role |
| --- | --- | --- |
| `--paper` | `#F5F5F2` | Ground. Neutral bond — deliberately not warm cream. |
| `--ink` | `#1A1A18` | Body text. |
| `--rule` | `#D5D4CD` | Line-item rules, form boxes. |
| `--canary` | `#F7E9AE` | Second-copy tint. Price column, customer-copy blocks. |
| `--stamp` | `#A8420A` | Brand orange pulled to a printable ink orange. Stamps, CTAs, required marks. |

The stamp value was chosen against measured contrast, not by eye. A brighter
`#D4570F` was the first candidate and **fails AA**: 3.72:1 on `--paper` (body
text needs 4.5:1) and 4.06:1 for white-on-fill, so CTA labels would have failed
too. `#A8420A` measures 5.57:1 on paper, 6.09:1 for white-on-fill and 4.99:1 on
canary — passing at every size. A brighter orange may be used only for large
non-text stamp graphics, never behind or as text.

Neon cyan is removed entirely — it has no counterpart in the source. No
separate stamp red: the brand orange *is* the stamp, preserving continuity with
the existing logo and favicons.

**Dark mode is the shop's file copy** — dark card stock, same rules, same
structure. Source-derived rather than a mechanical inversion.

### Type

One family, three widths, three jobs. IBM Plex was drawn for institutional
documents and forms, which is what this imitates.

- **IBM Plex Mono** — every figure: prices, codes, hours, phone, estimate
  numbers. `font-variant-numeric: tabular-nums` throughout so columns align.
  This is the signature.
- **IBM Plex Sans Condensed** — form headers, field labels, masthead.
- **IBM Plex Sans** — body copy.

Orbitron and Plus Jakarta Sans are both removed. No serif. Body minimum rises
to 16px, labels to 12px.

### Layout

**The line-item row is the universal primitive** and replaces the card grid.
Services, prices, hours, standards and FAQ all become rows: description left,
spec/quantity centre, figure right-aligned in Plex Mono. Where data is genuinely
tabular, use real `<table>` markup — a semantics and screen-reader win.

**Two measures, each encoding something.** Prose sits at a ~68ch reading
measure; line-item tables run wider to a ruled ledger area. Width signals which
kind of content is present. Not everything in one centred `max-w-7xl`.

**Rules divide line items or mark a subtotal only** — never garnish a heading.

**Three density tiers**, assigned by content type rather than one uniform
rhythm: letterhead tight, ledger tables dense (~48px rows), prose open.

**Job codes** (`A-110 Oil change`, `H-220 TV mount`) appear on line items.
Owner-approved: shops assign their own codes, and the scheme must be internally
consistent.

### Page mapping

| Route | Becomes |
| --- | --- |
| Header | Letterhead — name, 1341 Main Ave S, phone, date, hours. Replaces the floating glass nav; puts the address permanently on screen. |
| `/` | Top of the estimate: letterhead → four ruled category sections → signature line. |
| `/auto`, `/handyman`, `/diy-garage`, `/it` | One category expanded into a full line-item schedule. |
| `/quote` | Building the estimate — existing tabs retained, plus a running subtotal. |
| `/book` | Signing it — hands off to Square. |
| `/about` | The shop's particulars, set as a form. |
| Footer | Tear-off stub — dashed perforation rule (informational: marks the tear), identity, hours, address. |

The CTA is a **signature line** at the document's end — rule, date field,
*Book this estimate*. There is no dark CTA band above the footer.

## Trust layer

Principle: **replace claimed trust with checkable fact.** Lines such as "Local
service you can trust in Fargo" (`footer.tsx:28`) and "Trusted Mechanics"
(`auto/page.tsx:37`) are in the register of fake sites — real shops state hours
and prices rather than asserting trustworthiness. Every such line is replaced
with something verifiable.

1. **One source of truth.** `src/lib/contact.ts` grows into `business.ts`
   holding address, hours, phone, email and rates. `schema.ts`, the letterhead,
   footer, FAQ and all pages import from it. The address is currently typed in
   four places and the TV rate in three — which is why they drifted. This also
   feeds the letterhead, so the fix and the design are the same work.
2. **Surface Square.** A real Square Appointments account with a location ID is
   third-party validation that cannot be faked. State "Booking and payment
   handled by Square" plainly, with the live link.
3. **Specificity as evidence.** The DIY bay equipment list (lift, diagnostic
   scanner, oil and tire tools, air compressor, power tools, workbench,
   lighting, 8-hour max session) is promoted from buried FAQ prose into a ruled
   inventory schedule.
4. **The parts disclaimer becomes a feature.** "Listed price does not include
   parts unless otherwise noted—we confirm parts cost before work."
   (`fixed-quote-options.ts:122`) moves up into the estimate's terms block.
   Publishing what is *not* included reads as honest.
5. **Real legal pages.** Two short Privacy and Terms pages replace the `#`
   links. Wary visitors check these specifically.

### Corrections (do first, independent of design)

- `page.tsx:380,392,405` → 1341 Main Ave S, including both map targets.
- `page.tsx:72` → $1.50 per inch.
- Email domain → `service@mannygarage.com` at `page.tsx:374`,
  `about/page.tsx:178` (href and link text), `footer.tsx:85,87`, and
  `schema.ts:18`. Every URL in the codebase already uses `mannygarage.com`;
  only the email diverged.

  **Blocked on provisioning.** Do not publish `service@mannygarage.com` until
  that mailbox exists and is monitored. A published address that bounces is
  worse than a mismatched one — it converts a doubt into a confirmed dead end.
  Verify delivery before this correction ships.

  `booking-preference.ts:1` uses the storage key
  `mannysgarage_preferred_service`. Leave it. It is internal, never shown, and
  renaming it would silently discard returning visitors' saved preference.

### Deletions

- All Unsplash/Pexels stock and `site-images.ts` hot-linking. Most urgent:
  `teamAbout`, a stock photo of strangers captioned "Team at Manny's Garage."
  Remove the corresponding `remotePatterns` entries in `next.config.ts`.
- `src/components/chat-assistant.tsx` (446 lines) and its two usages
  (`auto/page.tsx:11,303`; `it/page.tsx:20,296`). Owner-approved. A bot that
  cannot answer anything reinforces the "generated" impression and competes
  with the Square flow that already works. Replaced by a plain Call / Text
  action on the real number.
- `AnimatedCard` and the rounded-card grid; `.panel-cyber`, `.neon-ring`,
  `.neon-text`, `.metal-text`, `.orange-divider`, `.cyber-divider`,
  `.section-title-accent`, `.noise-overlay`, hero glow animations.
- Homepage hero carousel (5 auto-rotating images, several stock).
  Owner-approved. Auto-rotating stock imagery is a loud template tell, and
  imagery is the weakest available card while no real photos exist. Re-add real
  photos later as captioned, dated evidence — not as a carousel.

## Out of scope

Owner action items, listed in impact order. Each of the first two moves the
needle more than the redesign itself; this is stated plainly so the redesign is
not mistaken for a complete fix.

1. A **701 phone number**. The 609 area code is the loudest remaining fake
   signal and no design change addresses it.
2. A **Google Business Profile**. Free, first thing people check, fills
   `sameAs: []`, and creates a Maps presence.
3. **Photos of the actual shop** — storefront with signage, bays, lift. Phone
   photos are fine; real beats good here.
4. **Owner name and face** on About.
5. **First reviews**, once the profile exists.

## Open questions

None outstanding. Resolved during planning:

- **Job code scheme** — resolved 2026-08-27. `A-` automotive, `H-` handyman,
  `D-` DIY bay, `I-` I.T., numbered with gaps so services can be added without
  renumbering. Owner-approved. Codes are customer-facing and must stay stable
  once published.

One dependency remains outside the codebase: `service@mannygarage.com` must be
confirmed to receive mail before the email correction ships (see Corrections).

## Verification

Per `CLAUDE.md`, verification is not optional and exit codes are read directly
rather than piped through `tail`.

- `npm run lint` and `npm run build` must both exit 0.
- Rendered output checked at **360px** and in **dark mode**.
- Contrast confirmed in-browser for every token pair. Computed baselines to
  verify against: ink on paper 15.96:1, ink on canary 14.29:1, stamp on paper
  5.57:1, white on stamp 6.09:1, stamp on canary 4.99:1 — all AA at any size.
  Dark-mode pairs must be measured the same way; none are assumed from code.
- Grep for `1335`, `1.75`, `unsplash`, `pexels`, `Orbitron`, `ChatAssistant`
  must return no matches in `src/` when complete. `mannysgarage` must match
  only `booking-preference.ts:1`, which is deliberately retained.
- The `service@mannygarage.com` mailbox must be confirmed to receive mail
  before the email correction is deployed.
