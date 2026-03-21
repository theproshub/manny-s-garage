import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const TITLE_CASE_SMALL = new Set([
  "a",
  "an",
  "and",
  "as",
  "at",
  "but",
  "by",
  "en",
  "for",
  "if",
  "in",
  "into",
  "nor",
  "of",
  "on",
  "or",
  "so",
  "the",
  "to",
  "up",
  "yet",
  "per",
  "vs",
  "vs.",
  "v",
  "v.",
  "via",
  "from",
]);

function titleCaseSegment(segment: string, forceCapitalize: boolean): string {
  if (!segment) return segment;
  const lower = segment.toLowerCase();
  if (!forceCapitalize && TITLE_CASE_SMALL.has(lower)) {
    return lower;
  }
  return lower.split("-").map((part) => {
    if (!part) return part;
    let i = 0;
    while (i < part.length && !/[a-zA-Z0-9]/.test(part[i]!)) {
      i += 1;
    }
    if (i >= part.length) return part;
    return part.slice(0, i) + part[i]!.toUpperCase() + part.slice(i + 1).toLowerCase();
  }).join("-");
}

/** Normalizes acronyms and brand-style tokens after casing passes. */
function applyBrandTokens(input: string): string {
  let s = input;
  s = s.replace(/\bI\.t\.\b/gi, "I.T.");
  s = s.replace(/\bI\.t\b/g, "I.T");
  s = s.replace(/\bDiy\b/g, "DIY");
  s = s.replace(/\bTv\b/g, "TV");
  s = s.replace(/\bNas\b/g, "NAS");
  s = s.replace(/\bObd2\b/gi, "OBD2");
  s = s.replace(/\bA\/c\b/gi, "A/C");
  s = s.replace(/\bHdmi\b/gi, "HDMI");
  s = s.replace(/\bAv\b/gi, "AV");
  s = s.replace(/\bFargo,\s+Nd\b/g, "Fargo, ND");
  return s;
}

/**
 * Title case for headings, navigation labels, and short UI phrases.
 * Minor words stay lowercase except at the start or end (AP-style).
 */
export function toTitleCase(text: string): string {
  const trimmed = text.trim();
  if (!trimmed) return text;
  const words = trimmed.split(/\s+/);
  const n = words.length;
  const titled = words.map((w, i) => titleCaseSegment(w, i === 0 || i === n - 1));
  return applyBrandTokens(titled.join(" "));
}

/** Sentence case for descriptions and body copy (first character uppercase, rest lowercase). */
export function toSentenceCase(text: string): string {
  const trimmed = text.trim();
  if (!trimmed) return text;
  const lower = trimmed.toLowerCase();
  const out = lower.charAt(0).toUpperCase() + lower.slice(1);
  return applyBrandTokens(out);
}
