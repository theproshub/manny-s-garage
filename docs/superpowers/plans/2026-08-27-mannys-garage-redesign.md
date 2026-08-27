# Manny's Garage Work-Order Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the site's visual system around the repair-order/estimate it
already produces, and replace claimed trust with checkable fact, so visitors
stop asking whether the business is real.

**Architecture:** A single source of truth (`src/lib/business.ts`) feeds every
factual claim on the site and is guarded by a dependency-free invariant script.
On top of it sits one visual primitive — the ruled line-item row — from which
the letterhead, service schedules, quote builder and tear-off footer are all
composed. Pages are sections of one document rather than independent layouts.

**Tech Stack:** Next.js 16 (App Router), React 19, Tailwind CSS v4, TypeScript,
`next/font/google` (IBM Plex Sans / Sans Condensed / Mono), Node ESM scripts.

**Spec:** `docs/superpowers/specs/2026-08-27-mannys-garage-redesign-design.md`

## Testing note — read before Task 1

This repo has **no test runner**. `package.json` exposes only `dev`, `build`,
`start`, `lint`. Do not introduce Jest/Vitest — it is not in scope and the spec
does not ask for it.

The verification cycle for this plan is:

| Gate | Command | Applies to |
| --- | --- | --- |
| Fact invariants | `npm run check:facts` | Tasks 1–3, 8, 14 |
| Lint | `npm run lint` | every task |
| Build | `npm run build` | every task |
| Browser | 360px + dark mode + contrast | Tasks 4–14 |

**Read exit codes directly. Never pipe a gate through `tail`, `head`, or
`grep` — `CLAUDE.md` calls this out specifically, because it hides failures.**

`check:facts` is written in Task 1 *before* the code that satisfies it, and is
the regression test for the exact bug class that caused this project: the same
fact typed into several files and drifting apart.

## Global Constraints

Values below are copied verbatim from the spec. Every task's requirements
implicitly include this section.

- Street address is **`1341 Main Ave S, Fargo, ND 58103`**. The string `1335`
  must not appear anywhere in `src/`.
- TV wall mount rate is **`$1.50` per inch**. The string `1.75` must not appear
  in `src/` as a rate.
- Canonical domain is **`mannygarage.com`**. `mannysgarage` may appear only in
  `src/lib/booking-preference.ts:1` (localStorage key, deliberately retained —
  renaming it silently discards returning visitors' saved preference).
- **Do not deploy the email change until `service@mannygarage.com` is confirmed
  to receive mail.** A published address that bounces is worse than a
  mismatched one. Task 1 gates on this.
- Palette tokens: `--paper #F5F5F2`, `--ink #1A1A18`, `--rule #D5D4CD`,
  `--canary #F7E9AE`, `--stamp #A8420A`.
- `#D4570F` is **forbidden** — it fails AA (3.72:1 on paper, 4.06:1
  white-on-fill). A brighter orange may be used only for large non-text stamp
  graphics.
- Typefaces: IBM Plex Mono (all figures, `tabular-nums`), IBM Plex Sans
  Condensed (headers/labels), IBM Plex Sans (body). **Orbitron and Plus Jakarta
  Sans must not appear in `src/`.** No serif.
- Body text minimum 16px; label minimum 12px.
- Rules divide line items or mark a subtotal only — never garnish a heading.
- Forbidden patterns (from `CLAUDE.md`): letterspaced uppercase eyebrow →
  heading → hairline rule; rounded cards in a grid with `hover:border-accent`;
  everything in one centred `max-w-7xl`; one uniform `py-16 sm:py-24`;
  oversized translucent numerals; pill-chips; dark full-width CTA band above
  the footer; arrow-right icon on every link.
- No stock photography. `images.unsplash.com` and `images.pexels.com` must not
  appear in `src/` or `next.config.ts`.
- Commit after every task. Branch off `main` first — do not commit to `main`.

---

## File Structure

**Created**

| Path | Responsibility |
| --- | --- |
| `src/lib/business.ts` | Single source of truth: identity, address, hours, phone, email, rates |
| `scripts/check-facts.mjs` | Dependency-free invariant checker |
| `src/lib/service-catalog.ts` | Line items with job codes, grouped by category |
| `src/components/estimate/line-item.tsx` | The row primitive |
| `src/components/estimate/schedule.tsx` | A ruled table of line items |
| `src/components/estimate/letterhead.tsx` | Document header; replaces sticky nav |
| `src/components/estimate/signature-line.tsx` | End-of-document CTA |
| `src/components/estimate/stub.tsx` | Tear-off footer |
| `src/app/privacy/page.tsx` | Real privacy page |
| `src/app/terms/page.tsx` | Real terms page |

**Modified**

`src/lib/contact.ts` (re-export shim) · `src/lib/schema.ts` ·
`src/lib/site-images.ts` · `src/lib/fixed-quote-options.ts` ·
`src/app/globals.css` · `src/app/layout.tsx` · `src/app/page.tsx` ·
`src/app/about/page.tsx` · `src/app/quote/page.tsx` · `src/app/book/page.tsx` ·
the eight `auto|handyman|diy-garage|it` page/layout files ·
`src/components/footer.tsx` · `next.config.ts` · `package.json`

**Deleted**

`src/components/chat-assistant.tsx` · `src/components/animated-card.tsx` ·
`src/components/section-heading.tsx`

---

## Task 1: Single source of truth for every published fact

Fixes all three factual contradictions in one move and installs the guard that
stops them recurring. Ships safely on its own, independent of any design work.

**Files:**
- Create: `src/lib/business.ts`
- Create: `scripts/check-facts.mjs`
- Modify: `package.json` (add `check:facts` script)
- Modify: `src/lib/contact.ts` (re-export shim)
- Modify: `src/lib/schema.ts:3,18,21`
- Modify: `src/app/page.tsx:72,374,380,392,405`
- Modify: `src/app/about/page.tsx:178`
- Modify: `src/components/footer.tsx:85,87`

**Interfaces:**
- Consumes: nothing.
- Produces: `BUSINESS` and `RATES` const objects (shapes below). Every later
  task imports these instead of hardcoding a fact.

- [ ] **Step 1: Write the failing invariant check**

Create `scripts/check-facts.mjs`:

```js
#!/usr/bin/env node
// Dependency-free invariant checker. Guards the facts that drifted apart
// across files and made the site look fake. Run: npm run check:facts
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const failures = [];
const fail = (msg) => failures.push(msg);

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else if (/\.(ts|tsx|mjs|css)$/.test(entry)) out.push(p);
  }
  return out;
}

const files = walk("src");
const read = (p) => readFileSync(p, "utf8");

// 1. The wrong street number must be gone everywhere.
for (const f of files) {
  if (read(f).includes("1335")) fail(`${f}: contains "1335" (address must be 1341 Main Ave S)`);
}

// 2. The wrong TV rate must be gone everywhere.
for (const f of files) {
  if (/\$?1\.75\s*(\/|\s*per\s*)inch/i.test(read(f))) fail(`${f}: TV rate must be $1.50/inch, found 1.75`);
}

// 3. The wrong email domain may survive only as the localStorage key.
for (const f of files) {
  if (!read(f).includes("mannysgarage")) continue;
  if (f.endsWith("booking-preference.ts")) continue;
  fail(`${f}: uses "mannysgarage" — canonical domain is mannygarage.com`);
}

// 4. Retired type families must not reappear.
for (const f of files) {
  const src = read(f);
  for (const banned of ["Orbitron", "Plus_Jakarta_Sans", "Plus Jakarta Sans"]) {
    if (src.includes(banned)) fail(`${f}: retired typeface "${banned}"`);
  }
}

// 5. The inaccessible orange must not reappear.
for (const f of files) {
  if (/#D4570F/i.test(read(f))) fail(`${f}: #D4570F fails WCAG AA — use --stamp #A8420A`);
}

// 6. Stock photography must be gone.
for (const f of [...files, "next.config.ts"]) {
  const src = read(f);
  if (src.includes("images.unsplash.com") || src.includes("images.pexels.com")) {
    fail(`${f}: stock photo host referenced`);
  }
}

// 7. business.ts must hold the confirmed values.
const biz = read("src/lib/business.ts");
if (!biz.includes('"1341 Main Ave S"')) fail("business.ts: street must be 1341 Main Ave S");
if (!biz.includes("service@mannygarage.com")) fail("business.ts: email domain must be mannygarage.com");
if (!/tvMountPerInch:\s*1\.5\b/.test(biz)) fail("business.ts: tvMountPerInch must be 1.5");

// 8. Every published TV package price must equal size x rate. This is the
//    invariant that actually failed before: the rate and the table disagreed.
const opts = read("src/lib/fixed-quote-options.ts");
const rate = 1.5;
for (const [, size, price] of opts.matchAll(/label:\s*"(\d+)″[^"]*",\s*price:\s*([\d.]+)/g)) {
  const expected = Number(size) * rate;
  if (Number(price) !== expected) {
    fail(`fixed-quote-options.ts: ${size}″ priced ${price}, expected ${expected} (${rate}/inch)`);
  }
}

if (failures.length) {
  console.error(`check:facts FAILED (${failures.length})`);
  for (const f of failures) console.error("  - " + f);
  process.exit(1);
}
console.log("check:facts passed");
```

Add to `package.json` scripts, after `"lint"`:

```json
    "check:facts": "node scripts/check-facts.mjs"
```

- [ ] **Step 2: Run it to confirm it fails**

Run: `npm run check:facts`

Expected: exit code 1, listing at minimum the `1335` hits in `src/app/page.tsx`,
the `1.75` hit at `page.tsx:72`, the `mannysgarage` hits in `page.tsx`,
`about/page.tsx`, `footer.tsx`, `schema.ts`, the `Orbitron` hits in
`globals.css`/`footer.tsx`, the unsplash hits, and a hard read error or
failure for the not-yet-existing `src/lib/business.ts`.

- [ ] **Step 3: Create the source of truth**

Create `src/lib/business.ts`:

```ts
/**
 * Single source of truth for every fact published on the site.
 * Nothing here may be duplicated as a literal in a component — the address,
 * rate and domain each previously drifted across files, which is what made
 * the site read as fake. `npm run check:facts` enforces this.
 */

export const BUSINESS = {
  name: "Manny's Garage",
  domain: "mannygarage.com",
  url: "https://mannygarage.com",
  email: "service@mannygarage.com",

  phone: {
    e164: "+16094988246",
    display: "+1 (609) 498-8246",
    tel: "tel:+16094988246",
    placeholder: "(609) 498-8246",
  },

  address: {
    street: "1341 Main Ave S",
    locality: "Fargo",
    region: "ND",
    postalCode: "58103",
    country: "US",
    oneLine: "1341 Main Ave S, Fargo, ND 58103",
    mapQuery: "1341+Main+Ave+S+Fargo+ND+58103",
  },

  geo: { latitude: 46.8772, longitude: -96.7898 },

  /** Rendered verbatim on the letterhead and the stub. */
  hours: [
    { days: "Mon–Fri", opens: "08:00", closes: "18:00" },
    { days: "Sat", opens: "09:00", closes: "15:00" },
    { days: "Sun", opens: null, closes: null },
  ],
} as const;

/** Published rates. The quote tables are derived from these, never retyped. */
export const RATES = {
  tvMountPerInch: 1.5,
  furniturePerItem: 50,
  cameraPerUnit: 120,
  windowTreatment: 50,
  bunkBed: 100,
  diyBayHourly: 20,
  diyMechanicHourly: 40,
  diyMaxHours: 8,
} as const;

export const mapsEmbedUrl = `https://www.google.com/maps?q=${BUSINESS.address.mapQuery}&output=embed`;
export const appleMapsUrl = `https://maps.apple.com/maps?q=${BUSINESS.address.mapQuery}`;
export const mailtoUrl = `mailto:${BUSINESS.email}`;
```

- [ ] **Step 4: Convert `contact.ts` to a re-export shim**

Keeps the existing import sites compiling so this task stays small. Replace the
whole of `src/lib/contact.ts` with:

```ts
/** @deprecated Import from "@/lib/business" instead. Kept so existing call
 *  sites keep compiling; remove once no imports remain. */
import { BUSINESS } from "@/lib/business";

export const SITE_PHONE_E164 = BUSINESS.phone.e164;
export const SITE_PHONE_DISPLAY = BUSINESS.phone.display;
export const SITE_PHONE_TEL = BUSINESS.phone.tel;
export const SITE_PHONE_PLACEHOLDER = BUSINESS.phone.placeholder;
```

- [ ] **Step 5: Point `schema.ts` at the source of truth**

In `src/lib/schema.ts`, replace lines 1–3 and the `email`/`address` literals:

```ts
import { BUSINESS } from "@/lib/business";

const BASE_URL = BUSINESS.url;
```

and within `businessBase`:

```ts
  telephone: BUSINESS.phone.e164,
  email: BUSINESS.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: BUSINESS.address.street,
    addressLocality: BUSINESS.address.locality,
    addressRegion: BUSINESS.address.region,
    postalCode: BUSINESS.address.postalCode,
    addressCountry: BUSINESS.address.country,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: BUSINESS.geo.latitude,
    longitude: BUSINESS.geo.longitude,
  },
```

- [ ] **Step 6: Fix the three homepage contradictions**

In `src/app/page.tsx`, add `import { BUSINESS, appleMapsUrl, mapsEmbedUrl, mailtoUrl } from "@/lib/business";` then:

- Line 72 — replace `$1.75 per inch` with `$1.50 per inch`.
- Line 374 — `href={mailtoUrl}`.
- Line 380 — `href={appleMapsUrl}`.
- Line 392 — `{BUSINESS.address.oneLine}`.
- Line 405 — `src={mapsEmbedUrl}`.

In `src/app/about/page.tsx:178`, replace both the `href` and the visible text
with `{BUSINESS.email}` / `href={mailtoUrl}`.

In `src/components/footer.tsx:76,85,87`, use
`{BUSINESS.address.street}` / `{BUSINESS.address.locality}, {BUSINESS.address.region} {BUSINESS.address.postalCode}`
and `href={mailtoUrl}` / `{BUSINESS.email}`.

- [ ] **Step 7: Run the gates**

```
npm run check:facts
npm run lint
npm run build
```

Expected: `check:facts` prints `check:facts passed` and exits 0. Note that the
`Orbitron` and unsplash assertions **will still fail** at this point — that is
correct, they are satisfied by Tasks 3 and 4. Until then, temporarily narrow
those two checks by commenting out assertion blocks 4 and 6, and restore them
in Task 4 and Task 3 respectively. Record this in the commit message.

- [ ] **Step 8: Commit**

```bash
git checkout -b redesign/work-order
git add src/lib/business.ts src/lib/contact.ts src/lib/schema.ts \
        src/app/page.tsx src/app/about/page.tsx src/components/footer.tsx \
        scripts/check-facts.mjs package.json
git commit -m "fix: single source of truth for address, TV rate, and email domain

Corrects 1335 -> 1341 Main Ave S (incl. both map targets, which pointed
customers at the wrong building), \$1.75 -> \$1.50/inch, and the
mannysgarage.com email on the mannygarage.com site.

Adds check:facts to stop these drifting apart again. Assertion blocks 4
and 6 are temporarily disabled pending Tasks 3-4."
```

- [ ] **Step 9: Owner gate before deploy**

Do **not** deploy this commit until the owner confirms
`service@mannygarage.com` receives mail. If it does not exist yet, revert only
the email hunk and ship the address and rate fixes, which have no such
dependency.

---

## Task 2: Remove the chat assistant

**Files:**
- Delete: `src/components/chat-assistant.tsx`
- Modify: `src/app/auto/page.tsx:11,303`
- Modify: `src/app/it/page.tsx:20,296`

**Interfaces:**
- Consumes: `BUSINESS.phone` from Task 1.
- Produces: nothing consumed later.

- [ ] **Step 1: Find every reference**

Run: `grep -rn "ChatAssistant\|chat-assistant\|assistantOpen" src/`

Expected: the four call-site lines above, plus the `assistantOpen` state
declarations in both pages.

- [ ] **Step 2: Remove the call sites**

In `src/app/auto/page.tsx` and `src/app/it/page.tsx`: delete the import, the
`<ChatAssistant ... />` element, and the now-unused `assistantOpen` /
`setAssistantOpen` state. Any button that only opened the assistant becomes a
call link:

```tsx
<a href={BUSINESS.phone.tel} className="btn-primary">
  Call {BUSINESS.phone.display}
</a>
```

Add `import { BUSINESS } from "@/lib/business";` to each page if not present.

- [ ] **Step 3: Delete the component**

```bash
git rm src/components/chat-assistant.tsx
```

- [ ] **Step 4: Verify nothing references it**

Run: `grep -rn "ChatAssistant\|chat-assistant\|assistantOpen" src/`
Expected: no output, exit code 1.

- [ ] **Step 5: Run the gates**

```
npm run lint
npm run build
```

Expected: both exit 0. Lint must report no unused-variable errors from the
removed state.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "refactor: remove AI-style chat assistant

A bot that cannot answer anything reinforces the generated impression and
competes with the Square booking flow that already works. Replaced with a
plain call action on the real number."
```

---

## Task 3: Remove all stock photography

**Files:**
- Modify: `src/lib/site-images.ts`
- Modify: `next.config.ts:7-20`
- Modify: `src/app/about/page.tsx` (the `teamAbout` usage)
- Modify: `scripts/check-facts.mjs` (re-enable assertion block 6)

**Interfaces:**
- Consumes: nothing.
- Produces: `siteImages` with only local `/hero/*` and `/images/*` entries.

- [ ] **Step 1: Re-enable the stock-host assertion and watch it fail**

Uncomment assertion block 6 in `scripts/check-facts.mjs`.

Run: `npm run check:facts`
Expected: exit 1, listing `src/lib/site-images.ts` and `next.config.ts`.

- [ ] **Step 2: Strip the remote helper from `site-images.ts`**

Delete the `unsplash()` helper and every key whose value calls it:
`garageHero`, `engineMaintenance`, `batteryCharging`, `handymanTv`,
`teamAbout`. Keep only the local paths already present (`diagnostics`,
`brakeSuspension`, `handymanFurniture`, `handymanCameras`, `diyGarage`,
`itConsultant`, `logo`).

- [ ] **Step 3: Remove the stock photo from the About page**

`teamAbout` is a photograph of strangers captioned "Team at Manny's Garage" —
the single most damaging asset on the site. Delete the entire hero `<Image>`
block that uses it, along with its wrapping `motion.div`, `hero-glow` and
overlay divs. The About hero becomes copy-only until real photos exist; Task 12
rebuilds it properly.

- [ ] **Step 4: Remove the remote patterns**

In `next.config.ts`, delete the whole `remotePatterns` array. The resulting
`images` block:

```ts
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [70, 75],
  },
```

- [ ] **Step 5: Run the gates**

```
npm run check:facts
npm run lint
npm run build
```

Expected: all exit 0. If `build` reports an unconfigured host, a stock
reference was missed — re-run `grep -rn "unsplash\|pexels" src/ next.config.ts`.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "fix: remove all stock photography and remote image hosts

Deletes the Unsplash photo captioned 'Team at Manny's Garage' and the
hot-linking to images.unsplash.com/images.pexels.com. Real photos will be
added later as captioned evidence."
```

---

## Task 4: Palette, type, and the retirement of the sci-fi system

The site will look plain after this task and fully composed after Task 9. That
is expected — do not add decoration to compensate.

**Files:**
- Modify: `src/app/globals.css` (near-total rewrite)
- Modify: `src/app/layout.tsx:2,8-12,53,56`
- Modify: `scripts/check-facts.mjs` (re-enable assertion block 4)

**Interfaces:**
- Consumes: nothing.
- Produces: CSS custom properties `--paper --ink --rule --canary --stamp`,
  font variables `--font-sans --font-condensed --font-mono`, and the utility
  classes `.figure`, `.ledger`, `.measure`, `.rule-item`, `.stamp`.

- [ ] **Step 1: Re-enable the typeface assertion and watch it fail**

Uncomment assertion block 4 in `scripts/check-facts.mjs`.

Run: `npm run check:facts`
Expected: exit 1, listing `Orbitron` in `src/app/globals.css` and
`src/components/footer.tsx`, and `Plus_Jakarta_Sans` in `src/app/layout.tsx`.

- [ ] **Step 2: Wire the three Plex faces in `layout.tsx`**

Replace the `Plus_Jakarta_Sans` import and instance:

```tsx
import { IBM_Plex_Sans, IBM_Plex_Sans_Condensed, IBM_Plex_Mono } from "next/font/google";

const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const condensed = IBM_Plex_Sans_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-condensed",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});
```

Update the `<html>` and `<body>` tags:

```tsx
<html lang="en" className={`${sans.variable} ${condensed.variable} ${mono.variable}`}>
```

```tsx
<body className="min-h-screen relative">
```

Remove the hardcoded `bg-[#030507]` — the ground now comes from `--paper`.

- [ ] **Step 3: Rewrite `globals.css`**

Replace the file's entire contents:

```css
@import "tailwindcss";

:root {
  color-scheme: light dark;

  --paper: #F5F5F2;
  --ink: #1A1A18;
  --rule: #D5D4CD;
  --canary: #F7E9AE;
  --stamp: #A8420A;

  --ink-muted: #55534B;

  /* Two measures, each meaning something: prose reads at 68ch, ledgers
     run wider. Width tells the reader which kind of content this is. */
  --measure-prose: 68ch;
  --measure-ledger: 74rem;
}

/* Dark mode is the shop's file copy: dark card stock, same structure. */
@media (prefers-color-scheme: dark) {
  :root {
    --paper: #1B1A17;
    --ink: #EDEAE1;
    --rule: #3A382F;
    --canary: #4A421F;
    --stamp: #F0873C;
    --ink-muted: #A7A296;
  }
}

* { box-sizing: border-box; }

html {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
}

[id] { scroll-margin-top: 6rem; }

body {
  margin: 0;
  min-height: 100dvh;
  overflow-x: hidden;
  padding-left: env(safe-area-inset-left, 0);
  padding-right: env(safe-area-inset-right, 0);
  padding-bottom: env(safe-area-inset-bottom, 0);
  background: var(--paper);
  color: var(--ink);
  font-family: var(--font-sans), ui-sans-serif, system-ui, sans-serif;
  font-size: 1rem;      /* 16px floor, per spec */
  line-height: 1.6;
}

a { color: inherit; text-decoration: none; }
button, input, textarea, select { font: inherit; }
button:not(:disabled) { cursor: pointer; }
::selection { background: var(--canary); color: var(--ink); }

/* ── Figures ──
   Every number on the site: prices, codes, hours, phone, estimate numbers.
   Tabular so columns actually align. This is the signature. */
.figure {
  font-family: var(--font-mono), ui-monospace, monospace;
  font-variant-numeric: tabular-nums;
  font-feature-settings: "tnum" 1;
}

/* ── Form headers and field labels ── */
.field-label {
  font-family: var(--font-condensed), var(--font-sans), sans-serif;
  font-size: 0.75rem;   /* 12px floor, per spec */
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--ink-muted);
}

.form-header {
  font-family: var(--font-condensed), var(--font-sans), sans-serif;
  font-weight: 700;
  letter-spacing: 0.01em;
}

/* ── Measures ── */
.measure { max-width: var(--measure-prose); }
.ledger  { max-width: var(--measure-ledger); margin-inline: auto; }

/* ── Density tiers ──
   Three tiers assigned by content type, NOT one uniform py-16 sm:py-24 on
   every section. A form's blocks have different densities and that is the
   point. Use these rather than inventing per-section padding:
     .tier-head   letterhead / stub — tight
     .tier-ledger line-item tables  — dense, ~48px rows
     .tier-prose  reading blocks    — open */
.tier-head   { padding-block: 1rem; }
.tier-ledger { padding-block: 1.5rem; }
.tier-ledger td, .tier-ledger th { padding-block: 0.75rem; }  /* ~48px rows */
.tier-prose  { padding-block: 2.5rem; }

/* ── Rules ──
   A rule divides line items or marks a subtotal. It never garnishes a
   heading. Only these two classes exist, by design. */
.rule-item   { border-bottom: 1px solid var(--rule); }
.rule-total  { border-top: 2px solid var(--ink); }

/* Perforation on the tear-off stub: informational, marks the tear line. */
.rule-perforated {
  border-top: 1px dashed var(--rule);
}

/* ── Stamp ── */
.stamp {
  color: var(--stamp);
  font-family: var(--font-condensed), var(--font-sans), sans-serif;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-height: 2.75rem;
  padding: 0.625rem 1.25rem;
  background: var(--stamp);
  color: #fff;               /* 6.09:1 on --stamp. Measured, not guessed. */
  font-family: var(--font-condensed), var(--font-sans), sans-serif;
  font-weight: 600;
  letter-spacing: 0.03em;
  border: 1px solid var(--stamp);
}

.btn-outline {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-height: 2.75rem;
  padding: 0.625rem 1.25rem;
  background: transparent;
  color: var(--ink);
  border: 1px solid var(--ink);
  font-family: var(--font-condensed), var(--font-sans), sans-serif;
  font-weight: 600;
}

:where(a, button, [role="button"], input, textarea, select):focus-visible {
  outline: 2px solid var(--stamp);
  outline-offset: 2px;
}

.min-touch { min-height: 44px; min-width: 44px; }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

Everything retired in one pass: the Google Fonts `@import`, `.panel*`,
`.neon-*`, `.metal-text`, `.orbitron`, `.accent-ring`, `.section-glow*`,
`.hero-*`, `.orange-divider`, `.cyber-divider`, `.section-title-accent`,
`.soft-label`, `.premium-badge`, `.cyber-badge`, `.noise-overlay`,
`.stat-bar`, `.img-overlay`, and every keyframe.

- [ ] **Step 4: Remove `.orbitron` usages**

Run: `grep -rln "orbitron\|noise-overlay\|panel-cyber\|premium-badge\|metal-text\|section-title-accent" src/`

Delete each class from the `className` strings it appears in. Do not
substitute a replacement class — the elements are restyled in Tasks 5–13.

- [ ] **Step 5: Run the gates**

```
npm run check:facts
npm run lint
npm run build
```

Expected: all exit 0, with assertion blocks 4 and 6 now both active.

- [ ] **Step 6: Browser check**

Run `npm run dev`. At 360px and again in dark mode, confirm: paper ground (not
near-black), no glows, no shimmer, body text at 16px, all figures monospaced.

Measure with the browser's contrast tool and compare against the spec's
baselines: ink-on-paper 15.96, stamp-on-paper 5.57, white-on-stamp 6.09.
**Also measure the three dark-mode pairs, which have no computed baseline
yet.** If any dark pair falls under 4.5:1, adjust the dark `--stamp` /
`--ink-muted` and record the new measured values in the spec.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: replace sci-fi design system with work-order tokens

Retires Orbitron, Plus Jakarta Sans, neon cyan, glows, shimmer and the
cyber panels. Introduces paper/ink/rule/canary/stamp on IBM Plex, with
tabular figures as the signature and dark mode as the shop's file copy."
```

---

## Task 5: The line-item primitive

**Files:**
- Create: `src/components/estimate/line-item.tsx`
- Create: `src/components/estimate/schedule.tsx`

**Interfaces:**
- Consumes: tokens and utility classes from Task 4.
- Produces:
  - `type LineItem = { code: string; description: string; spec?: string; price: number | null; note?: string; href?: string }`
  - `function Schedule(props: { heading: string; caption?: string; items: readonly LineItem[]; total?: number; footnote?: string }): JSX.Element`
  - `function formatUsd(n: number): string`

Tasks 8–13 compose pages exclusively from `Schedule`. `LineItemRow` is
internal to `schedule.tsx` and is not exported for direct use.

- [ ] **Step 1: Create the row and formatter**

`src/components/estimate/line-item.tsx`:

```tsx
export type LineItem = {
  /** Shop job code, e.g. "A-110". Appears to customers. */
  code: string;
  description: string;
  /** Unit or qualifier: "per axle", "per inch", "per hour". */
  spec?: string;
  /** null renders as "quoted" — used where price depends on the job. */
  price: number | null;
  note?: string;
  href?: string;
};

export function formatUsd(n: number): string {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });
}
```

- [ ] **Step 2: Create the schedule table**

`src/components/estimate/schedule.tsx`:

```tsx
import Link from "next/link";
import { formatUsd, type LineItem } from "./line-item";

type ScheduleProps = {
  heading: string;
  caption?: string;
  items: readonly LineItem[];
  total?: number;
  footnote?: string;
};

export function Schedule({ heading, caption, items, total, footnote }: ScheduleProps) {
  return (
    <section className="ledger w-full px-4 sm:px-6">
      <h2 className="form-header text-xl sm:text-2xl">{heading}</h2>
      {caption ? <p className="measure mt-1 text-sm text-[var(--ink-muted)]">{caption}</p> : null}

      {/* Real table markup: this is tabular data, and it reads correctly to
          screen readers as well as looking like the document it imitates. */}
      <table className="mt-4 w-full border-collapse text-left">
        <caption className="sr-only">{heading} — itemized prices</caption>
        <thead>
          <tr className="rule-item">
            <th scope="col" className="field-label py-2 pr-3">Code</th>
            <th scope="col" className="field-label py-2 pr-3">Description</th>
            <th scope="col" className="field-label py-2 pr-3">Unit</th>
            <th scope="col" className="field-label py-2 text-right">Price</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.code} className="rule-item align-baseline">
              <td className="figure py-3 pr-3 text-sm text-[var(--ink-muted)]">{item.code}</td>
              <td className="py-3 pr-3">
                {item.href ? (
                  <Link href={item.href} className="underline underline-offset-4">
                    {item.description}
                  </Link>
                ) : (
                  item.description
                )}
                {item.note ? (
                  <span className="block text-sm text-[var(--ink-muted)]">{item.note}</span>
                ) : null}
              </td>
              <td className="py-3 pr-3 text-sm text-[var(--ink-muted)]">{item.spec ?? "—"}</td>
              <td className="figure py-3 text-right tabular-nums">
                {item.price === null ? (
                  <span className="text-[var(--ink-muted)]">quoted</span>
                ) : (
                  formatUsd(item.price)
                )}
              </td>
            </tr>
          ))}
        </tbody>
        {typeof total === "number" ? (
          <tfoot>
            <tr className="rule-total">
              <td className="field-label py-3" colSpan={3}>Subtotal</td>
              <td className="figure py-3 text-right font-semibold">{formatUsd(total)}</td>
            </tr>
          </tfoot>
        ) : null}
      </table>

      {footnote ? (
        <p className="measure mt-3 text-sm text-[var(--ink-muted)]">{footnote}</p>
      ) : null}
    </section>
  );
}
```

- [ ] **Step 3: Verify it compiles**

```
npm run lint
npm run build
```

Expected: both exit 0.

- [ ] **Step 4: Commit**

```bash
git add src/components/estimate/
git commit -m "feat: add line-item and schedule primitives

The ruled row replaces the rounded card grid as the site's repeating
element. Real table markup, tabular figures, rules only between items."
```

---

## Task 6: Letterhead

**Files:**
- Create: `src/components/estimate/letterhead.tsx`
- Modify: `src/app/layout.tsx` (swap `StickyHeader` for `Letterhead`)
- Delete: `src/components/sticky-header.tsx`

**Interfaces:**
- Consumes: `BUSINESS` (Task 1), tokens (Task 4).
- Produces: `function Letterhead(): JSX.Element`.

- [ ] **Step 1: Build the letterhead**

`src/components/estimate/letterhead.tsx`. Address, phone and hours sit
permanently on screen — this is the design decision and the trust fix at once.

```tsx
import Link from "next/link";
import Image from "next/image";
import { BUSINESS } from "@/lib/business";

const NAV = [
  { label: "Automotive", href: "/auto" },
  { label: "Handyman", href: "/handyman" },
  { label: "DIY Bay", href: "/diy-garage" },
  { label: "I.T.", href: "/it" },
  { label: "Pricing", href: "/quote" },
];

export function Letterhead() {
  return (
    <header className="rule-item bg-[var(--paper)]">
      <div className="ledger flex flex-col gap-4 px-4 py-4 sm:px-6 md:flex-row md:items-start md:justify-between">
        <div className="flex items-start gap-3">
          <Link href="/" className="shrink-0">
            <Image
              src="/logo-v2.webp"
              alt={BUSINESS.name}
              width={56}
              height={56}
              className="h-12 w-auto"
              priority
            />
          </Link>
          <div>
            <p className="form-header text-lg leading-tight">{BUSINESS.name}</p>
            <p className="figure text-sm text-[var(--ink-muted)]">
              {BUSINESS.address.oneLine}
            </p>
            <a href={BUSINESS.phone.tel} className="figure text-sm underline underline-offset-4">
              {BUSINESS.phone.display}
            </a>
          </div>
        </div>

        <dl className="flex flex-wrap gap-x-6 gap-y-1 text-sm">
          {BUSINESS.hours.map((h) => (
            <div key={h.days} className="flex gap-2">
              <dt className="field-label">{h.days}</dt>
              <dd className="figure">
                {h.opens && h.closes ? `${h.opens}–${h.closes}` : "Closed"}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <nav aria-label="Services" className="rule-item">
        <ul className="ledger flex flex-wrap gap-x-5 gap-y-2 px-4 py-2 sm:px-6">
          {NAV.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="field-label min-touch inline-flex items-center hover:text-[var(--stamp)]"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
```

- [ ] **Step 2: Swap it into the layout**

In `src/app/layout.tsx`, replace the `StickyHeader` import and element with
`Letterhead`, and delete the fixed-header spacer div — the letterhead is in
normal flow, so `pt-[72px] sm:pt-20 lg:pt-[140px]` is no longer needed:

```tsx
<body className="min-h-screen relative">
  <Letterhead />
  {children}
  <Footer />
</body>
```

- [ ] **Step 3: Delete the old header**

```bash
git rm src/components/sticky-header.tsx
```

Run: `grep -rn "StickyHeader\|sticky-header" src/`
Expected: no output.

- [ ] **Step 4: Run the gates**

```
npm run lint
npm run build
```

Expected: both exit 0.

- [ ] **Step 5: Browser check**

At 360px confirm the letterhead wraps to a readable stack, hours remain legible,
nav targets are at least 44px, and no content hides under a fixed header
(there no longer is one). Repeat in dark mode.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: replace sticky nav with document letterhead

Puts address, phone and hours permanently on screen. Removes the floating
glass header and its layout spacer."
```

---

## Task 7: Tear-off stub footer

**Files:**
- Modify: `src/components/footer.tsx` (rewrite as the stub)

**Interfaces:**
- Consumes: `BUSINESS`, `mailtoUrl` (Task 1); tokens (Task 4).
- Produces: `function Footer(): JSX.Element` (name retained so `layout.tsx`
  needs no change).

- [ ] **Step 1: Rewrite the footer**

Replace the entire contents of `src/components/footer.tsx`:

```tsx
import Link from "next/link";
import { BUSINESS, mailtoUrl } from "@/lib/business";

const SERVICES = [
  { label: "Automotive", href: "/auto" },
  { label: "Handyman", href: "/handyman" },
  { label: "DIY Bay", href: "/diy-garage" },
  { label: "I.T.", href: "/it" },
  { label: "Pricing", href: "/quote" },
  { label: "Book", href: "/book" },
];

const COMPANY = [
  { label: "About", href: "/about" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

export function Footer() {
  return (
    <footer className="rule-perforated mt-16">
      <div className="ledger grid gap-8 px-4 py-10 sm:px-6 md:grid-cols-3">
        <div>
          <p className="form-header">{BUSINESS.name}</p>
          <address className="figure mt-2 text-sm not-italic text-[var(--ink-muted)]">
            {BUSINESS.address.street}
            <br />
            {BUSINESS.address.locality}, {BUSINESS.address.region} {BUSINESS.address.postalCode}
          </address>
          <a href={BUSINESS.phone.tel} className="figure mt-2 block text-sm underline underline-offset-4">
            {BUSINESS.phone.display}
          </a>
          <a href={mailtoUrl} className="figure block text-sm underline underline-offset-4">
            {BUSINESS.email}
          </a>
        </div>

        <div>
          <p className="field-label">Services</p>
          <ul className="mt-2 space-y-1">
            {SERVICES.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="min-touch inline-flex items-center text-sm underline underline-offset-4">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="field-label">Company</p>
          <ul className="mt-2 space-y-1">
            {COMPANY.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="min-touch inline-flex items-center text-sm underline underline-offset-4">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-[var(--ink-muted)]">
            Booking and payment handled by Square.
          </p>
        </div>
      </div>

      <div className="ledger px-4 pb-8 sm:px-6">
        <p className="figure text-sm text-[var(--ink-muted)]">
          © {new Date().getFullYear()} {BUSINESS.name}
        </p>
      </div>
    </footer>
  );
}
```

Note the Square line: it is the site's one piece of third-party validation and
belongs where people look for legitimacy signals. Note also what is gone —
"Local service you can trust in Fargo" is not replaced with another claim.

- [ ] **Step 2: Run the gates**

```
npm run check:facts
npm run lint
npm run build
```

Expected: all exit 0. `check:facts` now passes the `Orbitron` assertion for
this file, which previously failed on the `orbitron` label classes.

- [ ] **Step 3: Browser check**

At 360px and in dark mode: the perforation rule reads as a tear line, links are
44px targets, address is selectable text (not an image).

- [ ] **Step 4: Commit**

```bash
git add src/components/footer.tsx
git commit -m "feat: rebuild footer as tear-off stub

Surfaces Square as third-party validation and drops the 'service you can
trust' claim in favour of facts."
```

---

## Task 8: Service catalog with job codes

**Owner gate: CLEARED (2026-08-27).** The owner approved the `A-` / `H-` / `D-`
/ `I-` scheme below. These strings appear to customers — keep them stable once
published; do not renumber existing codes when adding services.

**Files:**
- Create: `src/lib/service-catalog.ts`
- Modify: `src/lib/fixed-quote-options.ts` (derive from `RATES`)

**Interfaces:**
- Consumes: `RATES` (Task 1), `LineItem` (Task 5).
- Produces:
  - `AUTO_ITEMS`, `HANDYMAN_ITEMS`, `DIY_ITEMS`, `IT_ITEMS` — all `readonly LineItem[]`
  - `PARTS_DISCLAIMER: string`
  - `tvMountPrice(inches: number): number`

- [ ] **Step 1: Create the catalog**

`src/lib/service-catalog.ts`:

```ts
import { RATES } from "@/lib/business";
import type { LineItem } from "@/components/estimate/line-item";

/**
 * Job codes: A- automotive, H- handyman, D- DIY bay, I- I.T.
 * Numbering leaves gaps so services can be added without renumbering.
 * These appear to customers — keep them stable once published.
 */

export const AUTO_ITEMS: readonly LineItem[] = [
  { code: "A-110", description: "Oil change, full synthetic", spec: "per service", price: 40 },
  { code: "A-120", description: "Battery replacement", spec: "per service", price: 40 },
  { code: "A-210", description: "Brake pad replacement", spec: "per axle", price: 180 },
  { code: "A-310", description: "Diagnostic scan", spec: "per visit", price: 0, note: "No charge when we do the repair." },
  { code: "A-410", description: "Emergency roadside assistance", spec: "per call-out", price: 60 },
];

export const HANDYMAN_ITEMS: readonly LineItem[] = [
  { code: "H-110", description: "TV wall mount", spec: "per inch (diagonal)", price: RATES.tvMountPerInch },
  { code: "H-210", description: "Furniture assembly", spec: "per item", price: RATES.furniturePerItem },
  { code: "H-220", description: "Bunk bed assembly", spec: "per item", price: RATES.bunkBed },
  { code: "H-230", description: "Window treatment", spec: "per item", price: RATES.windowTreatment },
  { code: "H-310", description: "Security camera installation", spec: "per camera", price: RATES.cameraPerUnit },
];

export const DIY_ITEMS: readonly LineItem[] = [
  { code: "D-110", description: "Bay with lift and tools", spec: "per hour", price: RATES.diyBayHourly,
    note: `Sessions up to ${RATES.diyMaxHours} hours.` },
  { code: "D-210", description: "Mechanic assistance", spec: "per hour", price: RATES.diyMechanicHourly },
];

export const IT_ITEMS: readonly LineItem[] = [
  { code: "I-110", description: "Wi-Fi and internet setup", spec: "per visit", price: null },
  { code: "I-210", description: "Computer help and repair", spec: "per visit", price: null },
  { code: "I-310", description: "Website and app building", spec: "per project", price: null },
  { code: "I-410", description: "Data and reporting", spec: "per project", price: null },
];

/** What the bay actually contains. Specificity is the evidence. */
export const DIY_INVENTORY: readonly string[] = [
  "Vehicle lift",
  "Diagnostic scanner",
  "Oil and tire tools",
  "Air compressor",
  "Power tools",
  "Workbench",
  "Task lighting",
];

export const PARTS_DISCLAIMER =
  "Listed price does not include parts unless otherwise noted—we confirm parts cost before work.";

export function tvMountPrice(inches: number): number {
  return inches * RATES.tvMountPerInch;
}
```

- [ ] **Step 2: Derive the TV packages from the rate**

In `src/lib/fixed-quote-options.ts`, replace the hardcoded
`HANDYMAN_TV_PACKAGES` array so the table can never disagree with the rate
again — the exact failure this project started with:

```ts
import { RATES } from "@/lib/business";
import { tvMountPrice } from "@/lib/service-catalog";

const TV_SIZES = [32, 43, 55, 65, 75, 85] as const;

export const HANDYMAN_TV_PACKAGES: { label: string; price: number }[] =
  TV_SIZES.map((size) => ({ label: `${size}″ TV Mount`, price: tvMountPrice(size) }));
```

Replace the standalone rate constants with re-exports from `RATES`:

```ts
export const DIY_HOURLY = RATES.diyBayHourly;
export const DIY_MECHANIC_HOURLY = RATES.diyMechanicHourly;
export const DIY_MAX_HOURS = RATES.diyMaxHours;
export const HANDYMAN_CAMERA_EACH = RATES.cameraPerUnit;
export const HANDYMAN_FURNITURE_EACH = RATES.furniturePerItem;
export const HANDYMAN_WINDOW_TREATMENT = RATES.windowTreatment;
export const HANDYMAN_BUNK_BED = RATES.bunkBed;
```

- [ ] **Step 3: Run the gates**

```
npm run check:facts
npm run lint
npm run build
```

Expected: all exit 0. `check:facts` assertion 8 now derives its expectation
from the same source as the code, so it should report every size at
`size × 1.5`.

- [ ] **Step 4: Commit**

```bash
git add src/lib/service-catalog.ts src/lib/fixed-quote-options.ts
git commit -m "feat: add service catalog with job codes; derive TV prices from rate

TV package prices are now computed from RATES.tvMountPerInch rather than
retyped, which is what let the table and the quoted rate disagree."
```

---

## Task 9: Homepage as the top of the estimate

**Files:**
- Modify: `src/app/page.tsx` (rewrite)
- Create: `src/components/estimate/signature-line.tsx`
- Delete: `src/components/animated-card.tsx`, `src/components/section-heading.tsx`

**Interfaces:**
- Consumes: `Schedule` (Task 5), catalog (Task 8), `BUSINESS` (Task 1).
- Produces: `function SignatureLine(props: { href: string; label?: string }): JSX.Element`.

- [ ] **Step 1: Create the signature line**

`src/components/estimate/signature-line.tsx`. The CTA lives where a form's
action lives — the end of the document. There is no dark band above the footer.

```tsx
import Link from "next/link";

export function SignatureLine({ href, label = "Book this estimate" }: { href: string; label?: string }) {
  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric", month: "short", day: "numeric",
  });

  return (
    <section className="ledger px-4 py-10 sm:px-6">
      <div className="rule-total flex flex-col gap-4 pt-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="field-label">Authorized by</p>
          <p className="figure mt-6 border-t border-[var(--rule)] pt-1 text-sm text-[var(--ink-muted)]">
            Signature
          </p>
        </div>
        <div>
          <p className="field-label">Date</p>
          <p className="figure mt-6 border-t border-[var(--rule)] pt-1 text-sm">{today}</p>
        </div>
        <Link href={href} className="btn-primary">{label}</Link>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Rewrite the homepage**

Replace `src/app/page.tsx` entirely. Note what is absent: no hero carousel, no
badge pills, no `AnimatedCard` grid, no `motion` imports, no `noise-overlay`.

```tsx
import { Schedule } from "@/components/estimate/schedule";
import { SignatureLine } from "@/components/estimate/signature-line";
import { BUSINESS, appleMapsUrl, mapsEmbedUrl, mailtoUrl } from "@/lib/business";
import {
  AUTO_ITEMS, HANDYMAN_ITEMS, DIY_ITEMS, IT_ITEMS,
  DIY_INVENTORY, PARTS_DISCLAIMER,
} from "@/lib/service-catalog";

export default function Home() {
  return (
    <main>
      <section className="ledger px-4 pt-8 sm:px-6">
        <p className="field-label">Estimate — prepared for</p>
        <h1 className="form-header mt-1 text-3xl sm:text-4xl">
          Anyone in {BUSINESS.address.locality} who needs a job done
        </h1>
        <p className="measure mt-3">
          Four kinds of work, one shop, prices published up front. Every figure
          below is what you pay.
        </p>
      </section>

      <div className="mt-10 space-y-12">
        <Schedule
          heading="Automotive"
          caption="Repair and maintenance."
          items={AUTO_ITEMS}
          footnote={PARTS_DISCLAIMER}
        />
        <Schedule heading="Handyman" caption="Home installation and assembly." items={HANDYMAN_ITEMS} />
        <Schedule
          heading="DIY Bay"
          caption={`Rent the bay by the hour. Includes: ${DIY_INVENTORY.join(", ").toLowerCase()}.`}
          items={DIY_ITEMS}
        />
        <Schedule heading="I.T." caption="Priced per job after we scope it." items={IT_ITEMS} />
      </div>

      <SignatureLine href="/quote" />

      <section id="contact" className="ledger px-4 pb-12 sm:px-6">
        <h2 className="form-header text-xl">Find us</h2>
        <div className="mt-4 grid gap-6 md:grid-cols-2">
          <div>
            <dl className="space-y-2">
              <div>
                <dt className="field-label">Address</dt>
                <dd className="figure">{BUSINESS.address.oneLine}</dd>
              </div>
              <div>
                <dt className="field-label">Phone</dt>
                <dd><a href={BUSINESS.phone.tel} className="figure underline underline-offset-4">{BUSINESS.phone.display}</a></dd>
              </div>
              <div>
                <dt className="field-label">Email</dt>
                <dd><a href={mailtoUrl} className="figure underline underline-offset-4">{BUSINESS.email}</a></dd>
              </div>
              {BUSINESS.hours.map((h) => (
                <div key={h.days}>
                  <dt className="field-label">{h.days}</dt>
                  <dd className="figure">{h.opens && h.closes ? `${h.opens}–${h.closes}` : "Closed"}</dd>
                </div>
              ))}
            </dl>
            <a href={appleMapsUrl} target="_blank" rel="noopener noreferrer" className="btn-outline mt-4">
              Directions
            </a>
          </div>
          <iframe
            title={`${BUSINESS.name} location`}
            src={mapsEmbedUrl}
            className="aspect-[4/3] w-full border border-[var(--rule)]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </main>
  );
}
```

- [ ] **Step 3: Check whether the retired components are orphaned yet**

Run: `grep -rn "AnimatedCard\|SectionHeading" src/`

Other pages (rebuilt in Tasks 10–12) almost certainly still import them at this
point. Decide from the output:

- **If the grep returns no hits** — delete them now:
  ```bash
  git rm src/components/animated-card.tsx src/components/section-heading.tsx
  ```
- **If the grep returns hits** — leave both files in place. Deleting them now
  breaks the build. Task 12 Step 2 deletes them once the last consumer is gone.

Do not modify the still-importing pages here; that is their own task.

- [ ] **Step 4: Run the gates**

```
npm run check:facts
npm run lint
npm run build
```

Expected: all exit 0.

- [ ] **Step 5: Browser check**

At 360px: the four schedules must scroll **within** their own container if they
overflow, never scroll the page body horizontally. If a table overflows, wrap
it in `<div className="overflow-x-auto">`. Confirm figures align in a column.
Repeat in dark mode.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: rebuild homepage as the top of the estimate

Removes the auto-rotating hero carousel and the rounded-card grid. The
page now opens on the letterhead and goes straight to itemized prices."
```

---

## Task 10: The four service pages

Repeat this task once per category. Do not batch them — each is an independent
reviewable deliverable.

**Files (per category `X` in `auto`, `handyman`, `diy-garage`, `it`):**
- Modify: `src/app/X/page.tsx` (rewrite)
- Modify: `src/app/X/services/page.tsx` (rewrite)
- Modify: `src/app/X/layout.tsx` (metadata only — fix any stale copy)

**Interfaces:**
- Consumes: `Schedule`, `SignatureLine`, the matching `*_ITEMS` array.
- Produces: nothing consumed later.

- [ ] **Step 1: Rewrite the category page**

Each becomes one expanded schedule plus a carried-forward link. Specimen for
`src/app/auto/page.tsx` — write the equivalent for each category, substituting
the heading, caption and items array:

```tsx
import { Schedule } from "@/components/estimate/schedule";
import { SignatureLine } from "@/components/estimate/signature-line";
import { AUTO_ITEMS, PARTS_DISCLAIMER } from "@/lib/service-catalog";
import { BUSINESS } from "@/lib/business";

export default function AutoPage() {
  return (
    <main>
      <section className="ledger px-4 pt-8 sm:px-6">
        <p className="field-label">Schedule A — Automotive</p>
        <h1 className="form-header mt-1 text-3xl sm:text-4xl">Automotive repair</h1>
        <p className="measure mt-3">
          Published prices for the work we do most. Anything not listed is
          quoted before we start — you approve the figure first.
        </p>
      </section>

      <div className="mt-8">
        <Schedule
          heading="Line items"
          items={AUTO_ITEMS}
          footnote={PARTS_DISCLAIMER}
        />
      </div>

      <section className="ledger px-4 pt-8 sm:px-6">
        <h2 className="form-header text-xl">Terms</h2>
        <ul className="measure mt-2 space-y-2 text-sm">
          <li className="rule-item pb-2">{PARTS_DISCLAIMER}</li>
          <li className="rule-item pb-2">
            Work is by appointment. Same-day and next-day slots are often open.
          </li>
          <li className="rule-item pb-2">
            Booking and payment are handled by Square.
          </li>
          <li className="pb-2">
            Questions before booking: <a href={BUSINESS.phone.tel} className="figure underline underline-offset-4">{BUSINESS.phone.display}</a>
          </li>
        </ul>
      </section>

      <SignatureLine href="/quote?for=auto" />
    </main>
  );
}
```

Category substitutions:

| Page | Label | Heading | Items | Quote link |
| --- | --- | --- | --- | --- |
| `auto` | Schedule A — Automotive | Automotive repair | `AUTO_ITEMS` | `/quote?for=auto` |
| `handyman` | Schedule H — Handyman | Handyman work | `HANDYMAN_ITEMS` | `/quote?for=handyman` |
| `diy-garage` | Schedule D — DIY Bay | Rent a bay by the hour | `DIY_ITEMS` | `/quote?for=diy` |
| `it` | Schedule I — I.T. | Tech help | `IT_ITEMS` | `/quote` |

For `diy-garage`, add the equipment inventory as its own ruled list before the
Terms section — the specificity is the evidence:

```tsx
<section className="ledger px-4 pt-8 sm:px-6">
  <h2 className="form-header text-xl">What's in the bay</h2>
  <ul className="measure mt-2">
    {DIY_INVENTORY.map((item) => (
      <li key={item} className="rule-item py-2">{item}</li>
    ))}
  </ul>
</section>
```

- [ ] **Step 2: Rewrite the `/services` sub-page**

Each `X/services/page.tsx` becomes the same schedule with fuller descriptions.
Remove every `AnimatedCard`, `SectionHeading`, `panel-cyber`, `premium-badge`
and `motion` usage. Where a page had a per-inch price display (e.g.
`handyman/services/page.tsx:385`), replace it with a `Schedule` row rather than
a standalone large figure.

- [ ] **Step 3: Check the metadata copy**

Open `src/app/X/layout.tsx` and `src/app/X/services/layout.tsx`. Confirm every
price and address in the `description` and `openGraph` strings matches
`business.ts`. `handyman/services/layout.tsx:6` already says `$1.50/inch` and
is correct — verify the rest.

- [ ] **Step 4: Run the gates**

```
npm run check:facts
npm run lint
npm run build
```

Expected: all exit 0.

- [ ] **Step 5: Browser check**

Each page at 360px and in dark mode. Tables scroll within their container.

- [ ] **Step 6: Commit (once per category)**

```bash
git add src/app/auto
git commit -m "feat: rebuild automotive pages as an estimate schedule"
```

---

## Task 11: Quote builder and booking handoff

**Files:**
- Modify: `src/app/quote/page.tsx`
- Modify: `src/app/book/page.tsx`
- Modify: `src/components/auto-fixed-pricing-grid.tsx`

**Interfaces:**
- Consumes: `Schedule`, `formatUsd` (Task 5), catalog (Task 8).
- Produces: nothing consumed later.

- [ ] **Step 1: Reskin the quote picker**

Keep all existing logic — the tab state, `searchParams` handling, the Square
deep links. This is a presentation change only. Preserve: `QuoteTab` type,
`setTabAndUrl`, `bookDiyHref`, `bookHandymanHref`, `SQUARE_BOOKING_URL`. **Do
not alter any price arithmetic.**

Replace each card/pill option block with a selectable row. Specimen for the
camera options — apply the same shape to furniture, TV sizes and DIY packages:

```tsx
<table className="mt-4 w-full border-collapse text-left">
  <caption className="sr-only">Security camera installation options</caption>
  <thead>
    <tr className="rule-item">
      <th scope="col" className="field-label py-2 pr-3">Qty</th>
      <th scope="col" className="field-label py-2 pr-3">Description</th>
      <th scope="col" className="field-label py-2 text-right">Price</th>
      <th scope="col" className="field-label py-2 text-right">Book</th>
    </tr>
  </thead>
  <tbody>
    {cameraOptions.map((opt) => (
      <tr key={opt.n} className="rule-item align-baseline">
        <td className="figure py-3 pr-3">{opt.n}</td>
        <td className="py-3 pr-3">{opt.label}</td>
        <td className="figure py-3 text-right">{formatUsd(opt.price)}</td>
        <td className="py-3 text-right">
          <a href={bookHandymanHref(opt.label, opt.price)} className="btn-outline min-touch">
            Add
          </a>
        </td>
      </tr>
    ))}
  </tbody>
</table>
```

Import `formatUsd` from `@/components/estimate/line-item`. Keep the existing
`bookHandymanHref` / `bookDiyHref` call signatures exactly as they are — read
them from the current file rather than assuming, since this plan does not
redefine them.

Add the running subtotal beneath the active tab using `Schedule`'s `total`
prop, computed from the currently selected options only.

- [ ] **Step 2: Reskin the fixed pricing grid**

`src/components/auto-fixed-pricing-grid.tsx` (30 lines) currently renders a
grid. Convert it to render a `Schedule` from `AUTO_ITEMS` and delete its own
markup.

- [ ] **Step 3: State the Square handoff on `/book`**

Add a visible line above the booking action:

```tsx
<p className="measure text-sm text-[var(--ink-muted)]">
  Booking and payment are handled by Square. You will be taken to Square to
  confirm your appointment.
</p>
```

- [ ] **Step 4: Verify the booking flow still works**

Run `npm run dev`. For each tab, select an option and confirm the outbound URL
still points at `book.squareup.com` with the same query parameters as before
the change. Compare against `git stash` output if unsure.

- [ ] **Step 5: Run the gates**

```
npm run check:facts
npm run lint
npm run build
```

Expected: all exit 0.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: reskin quote builder as an accumulating estimate

Presentation only — tab state, price arithmetic and Square deep links
are unchanged."
```

---

## Task 12: About page

**Files:**
- Modify: `src/app/about/page.tsx` (rewrite)
- Delete: `src/components/animated-card.tsx`, `src/components/section-heading.tsx` (if deferred from Task 9)
- Delete: `src/components/back-to-home.tsx`, `src/components/service-standards-section.tsx` (if now unused)

**Interfaces:**
- Consumes: `BUSINESS`, tokens, `Schedule`.
- Produces: nothing.

- [ ] **Step 1: Rewrite About as the shop's particulars**

No stock photo (removed in Task 3), no invented team. State only what is true:

```tsx
import { BUSINESS, mailtoUrl } from "@/lib/business";
import { SignatureLine } from "@/components/estimate/signature-line";

export default function AboutPage() {
  return (
    <main>
      <section className="ledger px-4 pt-8 sm:px-6">
        <p className="field-label">Particulars</p>
        <h1 className="form-header mt-1 text-3xl sm:text-4xl">About the shop</h1>
        <p className="measure mt-3">
          We opened Manny&apos;s Garage to make car and home work less of a
          hassle: a straight price, a straight answer, and the job done. Four
          kinds of work under one roof so you are not chasing three trades.
        </p>
      </section>

      <section className="ledger px-4 pt-8 sm:px-6">
        <h2 className="form-header text-xl">Details</h2>
        <dl className="measure mt-2">
          <div className="rule-item flex justify-between gap-4 py-2">
            <dt className="field-label">Address</dt>
            <dd className="figure text-right">{BUSINESS.address.oneLine}</dd>
          </div>
          <div className="rule-item flex justify-between gap-4 py-2">
            <dt className="field-label">Phone</dt>
            <dd><a href={BUSINESS.phone.tel} className="figure underline underline-offset-4">{BUSINESS.phone.display}</a></dd>
          </div>
          <div className="rule-item flex justify-between gap-4 py-2">
            <dt className="field-label">Email</dt>
            <dd><a href={mailtoUrl} className="figure underline underline-offset-4">{BUSINESS.email}</a></dd>
          </div>
          {BUSINESS.hours.map((h) => (
            <div key={h.days} className="rule-item flex justify-between gap-4 py-2">
              <dt className="field-label">{h.days}</dt>
              <dd className="figure">{h.opens && h.closes ? `${h.opens}–${h.closes}` : "Closed"}</dd>
            </div>
          ))}
          <div className="flex justify-between gap-4 py-2">
            <dt className="field-label">Booking</dt>
            <dd className="text-right text-sm">Handled by Square</dd>
          </div>
        </dl>
      </section>

      <SignatureLine href="/quote" />
    </main>
  );
}
```

**Reserved for later, do not fabricate now:** owner name and photo, years in
business, licence or insurance numbers, reviews. Add these only when the owner
supplies them.

- [ ] **Step 2: Delete newly-orphaned components**

Run: `grep -rn "AnimatedCard\|SectionHeading\|BackToHome\|ServiceStandardsSection" src/`

`git rm` each component with no remaining references. If a reference remains,
leave the file and note which page still uses it.

- [ ] **Step 3: Run the gates**

```
npm run check:facts
npm run lint
npm run build
```

Expected: all exit 0.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: rebuild About as the shop's particulars

Drops the stock 'team' hero and states only verifiable facts. Owner name,
photo and licence details are reserved until supplied."
```

---

## Task 13: Real privacy and terms pages

Dead legal links are something wary visitors check specifically. Task 7 already
points the footer at these routes, so they must exist or the footer 404s.

**Files:**
- Create: `src/app/privacy/page.tsx`
- Create: `src/app/terms/page.tsx`
- Modify: `src/app/sitemap.ts`

**Interfaces:**
- Consumes: `BUSINESS`, `mailtoUrl`.
- Produces: routes `/privacy` and `/terms`.

- [ ] **Step 1: Create the privacy page**

```tsx
import type { Metadata } from "next";
import { BUSINESS, mailtoUrl } from "@/lib/business";

export const metadata: Metadata = {
  title: `Privacy Policy | ${BUSINESS.name}`,
  description: `How ${BUSINESS.name} handles personal information.`,
};

export default function PrivacyPage() {
  return (
    <main className="ledger px-4 py-10 sm:px-6">
      <p className="field-label">Policy</p>
      <h1 className="form-header mt-1 text-3xl">Privacy Policy</h1>

      <div className="measure mt-6 space-y-4">
        <p>
          {BUSINESS.name}, {BUSINESS.address.oneLine}, collects personal
          information only to schedule and carry out work you ask us to do.
        </p>
        <h2 className="form-header text-lg">What we collect</h2>
        <p>
          Your name, phone number, email address, and a description of the work
          requested. If you book through Square, Square collects and processes
          payment details under its own privacy policy; we do not store card
          numbers.
        </p>
        <h2 className="form-header text-lg">How we use it</h2>
        <p>
          To contact you about your booking, to quote and perform the work, and
          to keep a record of work done on your vehicle or property. We do not
          sell personal information, and we do not share it except with service
          providers who help us operate the business.
        </p>
        <h2 className="form-header text-lg">Retention and access</h2>
        <p>
          We keep booking and service records for as long as needed to support
          warranty and repeat work. To ask what we hold, or to have it deleted,
          contact <a href={mailtoUrl} className="figure underline underline-offset-4">{BUSINESS.email}</a> or
          call <a href={BUSINESS.phone.tel} className="figure underline underline-offset-4">{BUSINESS.phone.display}</a>.
        </p>
      </div>
    </main>
  );
}
```

- [ ] **Step 2: Create the terms page**

```tsx
import type { Metadata } from "next";
import { BUSINESS, RATES, mailtoUrl } from "@/lib/business";
import { PARTS_DISCLAIMER } from "@/lib/service-catalog";

export const metadata: Metadata = {
  title: `Terms of Service | ${BUSINESS.name}`,
  description: `Terms under which ${BUSINESS.name} provides work.`,
};

export default function TermsPage() {
  return (
    <main className="ledger px-4 py-10 sm:px-6">
      <p className="field-label">Terms</p>
      <h1 className="form-header mt-1 text-3xl">Terms of Service</h1>

      <div className="measure mt-6 space-y-4">
        <h2 className="form-header text-lg">Estimates and prices</h2>
        <p>
          Published prices are for the listed service at the listed unit.
          {" "}{PARTS_DISCLAIMER} Work outside a published line item is quoted
          before it starts, and we do not begin until you approve the figure.
        </p>
        <h2 className="form-header text-lg">Booking and payment</h2>
        <p>
          Appointments are booked and paid through Square. Square&apos;s terms
          govern the payment itself.
        </p>
        <h2 className="form-header text-lg">DIY bay</h2>
        <p>
          Bay rental is charged per hour, in sessions up to {RATES.diyMaxHours}{" "}
          hours. You are responsible for your own work on your own vehicle.
          Equipment must be returned in the condition it was provided.
        </p>
        <h2 className="form-header text-lg">Contact</h2>
        <p>
          {BUSINESS.name}, {BUSINESS.address.oneLine}.{" "}
          <a href={mailtoUrl} className="figure underline underline-offset-4">{BUSINESS.email}</a>
        </p>
      </div>
    </main>
  );
}
```

**Flag for the owner:** this is plain-language boilerplate reflecting how the
business appears to operate. It has not been reviewed by a lawyer. Have the
owner read both pages and correct anything that misstates their practice before
launch.

- [ ] **Step 3: Add both routes to the sitemap**

In `src/app/sitemap.ts`, add these two entries after the `/about` line:

```ts
    { url: `${BASE_URL}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/terms`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
```

While in the file, replace the hardcoded `const BASE_URL = "https://mannygarage.com";`
on line 3 with the shared constant, so the domain lives in one place:

```ts
import { BUSINESS } from "@/lib/business";

const BASE_URL = BUSINESS.url;
```

Apply the identical change to `src/app/robots.ts:3`.

- [ ] **Step 4: Verify the footer links resolve**

Run `npm run dev`, click Privacy and Terms in the footer.
Expected: both render, neither 404s.

- [ ] **Step 5: Run the gates**

```
npm run check:facts
npm run lint
npm run build
```

Expected: all exit 0.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: add real privacy and terms pages

Replaces the two '#' links in the footer, which read as a scam signal."
```

---

## Task 14: Full verification sweep

Nothing here is optional and no result may be assumed from reading code.

**Files:** none modified unless a check fails.

- [ ] **Step 1: Run every gate and read the exit codes**

```
npm run check:facts
npm run lint
npm run build
```

Run each on its own line. Do not chain with `&&` and do not pipe to `tail` —
`CLAUDE.md` calls this out because piping hides failures.

- [ ] **Step 2: Confirm the retired patterns are gone**

```bash
grep -rn "1335" src/
grep -rEn "1\.75\s*(/|per )?\s*inch" src/
grep -rn "unsplash\|pexels" src/ next.config.ts
grep -rn "Orbitron\|Plus_Jakarta" src/
grep -rn "ChatAssistant\|AnimatedCard\|SectionHeading" src/
grep -rn "panel-cyber\|neon-\|metal-text\|noise-overlay\|premium-badge" src/
grep -rn "D4570F" src/
grep -rn "mannysgarage" src/
```

Expected: all empty except the last, which must match only
`src/lib/booking-preference.ts:1`.

- [ ] **Step 3: Confirm the forbidden defaults are absent**

Read the rendered homepage and one service page and confirm none of these
appear: letterspaced uppercase eyebrow followed by a decorative hairline;
rounded cards in a grid with `hover:border-*`; a single `max-w-7xl` wrapping
every section; identical `py-16 sm:py-24` on every section; oversized
translucent numerals; pill-chips; a dark CTA band above the footer; an
arrow-right icon on every link.

- [ ] **Step 4: Responsive and theme check**

At **360px**, then **768px**, then **1280px**, in **light and dark**, on every
route (`/`, `/auto`, `/handyman`, `/diy-garage`, `/it`, each `/services`,
`/quote`, `/book`, `/about`, `/privacy`, `/terms`):

- The page body never scrolls horizontally. Wide tables scroll inside their own
  `overflow-x: auto` container.
- Body text renders at 16px or larger; labels at 12px or larger.
- Every interactive target is at least 44×44px.
- Figures align in their column.

- [ ] **Step 5: Measure contrast, do not infer it**

With the browser's contrast tool, measure and record: ink-on-paper,
ink-muted-on-paper, stamp-on-paper, white-on-stamp, ink-on-canary — **in both
themes**. Light baselines to match: 15.96, —, 5.57, 6.09, 14.29.

Any pair under **4.5:1** for text under 18.66px must be fixed before this task
is complete. `CLAUDE.md` is explicit that failures here are invisible in code
review and obvious in the browser.

- [ ] **Step 6: Confirm the booking flow end to end**

Book one item from each of the four categories through `/quote`. Confirm each
lands on `book.squareup.com` with correct parameters. This is the revenue path
and the site's one piece of third-party validation — it must not have
regressed.

- [ ] **Step 7: Verify structured data**

Paste the rendered JSON-LD from the homepage into Google's Rich Results Test.
Expected: valid `AutoRepair`, address `1341 Main Ave S`, no errors.

- [ ] **Step 8: Commit any fixes**

```bash
git add -A
git commit -m "fix: address verification sweep findings"
```

- [ ] **Step 9: Report honestly**

Report what passed, what failed, and what was skipped. If a check could not be
run, say so — do not report it as passing. Per `CLAUDE.md`, verification is not
optional, and the outcome must be stated plainly with the actual output.

---

## Post-implementation: owner action items

None of these are code, and each of the first two moves the needle more than
this entire plan. Restate them to the owner on completion.

1. **Get a 701 phone number.** The 609 area code is the loudest remaining fake
   signal on the site.
2. **Create a Google Business Profile.** Free; the first thing people check.
   Then populate `sameAs` in `src/lib/schema.ts:53`.
3. **Photograph the shop** — storefront with signage, bays, lift. Add as
   captioned, dated evidence. Not a carousel.
4. **Add the owner's name and face** to `/about`.
5. **Collect first reviews** once the profile exists.
6. **Confirm `service@mannygarage.com` receives mail** — Task 1 depends on it.
7. **Have a lawyer read `/privacy` and `/terms`** — Task 13 is unreviewed
   boilerplate.
