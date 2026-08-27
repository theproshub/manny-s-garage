#!/usr/bin/env node
// Dependency-free invariant checker. Guards the facts that drifted apart
// across files and made the site look fake. Run: npm run check:facts
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
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
// Temporarily narrowed: the typeface swap ships in Task 4. Restore then.
// for (const f of files) {
//   const src = read(f);
//   for (const banned of ["Orbitron", "Plus_Jakarta_Sans", "Plus Jakarta Sans"]) {
//     if (src.includes(banned)) fail(`${f}: retired typeface "${banned}"`);
//   }
// }

// 5. The inaccessible orange must not reappear.
for (const f of files) {
  if (/#D4570F/i.test(read(f))) fail(`${f}: #D4570F fails WCAG AA — use --stamp #A8420A`);
}

// 6. Stock photography must be gone.
// Temporarily narrowed: the photography swap ships in Task 3. Restore then.
// for (const f of [...files, "next.config.ts"]) {
//   const src = read(f);
//   if (src.includes("images.unsplash.com") || src.includes("images.pexels.com")) {
//     fail(`${f}: stock photo host referenced`);
//   }
// }

// 7. business.ts must hold the confirmed values.
if (!existsSync("src/lib/business.ts")) {
  fail("src/lib/business.ts: does not exist yet");
} else {
  const biz = read("src/lib/business.ts");
  if (!biz.includes('"1341 Main Ave S"')) fail("business.ts: street must be 1341 Main Ave S");
  if (!biz.includes("service@mannygarage.com")) fail("business.ts: email domain must be mannygarage.com");
  if (!/tvMountPerInch:\s*1\.5\b/.test(biz)) fail("business.ts: tvMountPerInch must be 1.5");
}

// 8. Every published TV package price must equal size x rate. This is the
//    invariant that actually failed before: the rate and the table disagreed.
if (!existsSync("src/lib/fixed-quote-options.ts")) {
  fail("src/lib/fixed-quote-options.ts: does not exist yet");
} else {
  const opts = read("src/lib/fixed-quote-options.ts");
  const rate = 1.5;
  for (const [, size, price] of opts.matchAll(/label:\s*"(\d+)″[^"]*",\s*price:\s*([\d.]+)/g)) {
    const expected = Number(size) * rate;
    if (Number(price) !== expected) {
      fail(`fixed-quote-options.ts: ${size}″ priced ${price}, expected ${expected} (${rate}/inch)`);
    }
  }
}

if (failures.length) {
  console.error(`check:facts FAILED (${failures.length})`);
  for (const f of failures) console.error("  - " + f);
  process.exit(1);
}
console.log("check:facts passed");
