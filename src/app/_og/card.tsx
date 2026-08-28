import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { BUSINESS } from "@/lib/business";
import { AUTO_ITEMS, HANDYMAN_ITEMS, DIY_ITEMS, IT_ITEMS } from "@/lib/service-catalog";
import { TRADE_LOCATION } from "@/lib/trade-location";
import { formatUsd } from "@/components/estimate/line-item";
import { startsAt } from "@/lib/starts-at";

/**
 * The share card is the estimate.
 *
 * What shipped before was a set of AI-composed marketing banners: a cartoon
 * mascot, "AUTOMOTIVE · HANDYMAN · IT & MORE…" burned into the pixels, neon
 * garage doors. They were also 1024x682 while every layout declared them
 * 1200x630, and the home page's card was the 203x256 logo — under every
 * platform's threshold for a large card, so the most-shared URL on the site
 * previewed as a thumbnail.
 *
 * These render the document instead, from the same catalog the page reads.
 * Real text rather than baked-in pixels: sharp at any size, and the preview
 * carries the actual argument — four trades, priced, before you click.
 */

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

const FONT_DIR = join(process.cwd(), "src/app/_og-fonts");
const press = readFileSync(join(FONT_DIR, "archivo-press.ttf"));
const label = readFileSync(join(FONT_DIR, "archivo-label.ttf"));
const body = readFileSync(join(FONT_DIR, "archivo-body.ttf"));

/* The paper palette, inlined. Satori resolves no CSS custom properties. */
const PAPER = "#F5F5F2";
const INK = "#16161A";
const RULE = "#D5D4CD";
const CANARY = "#F7E9AE";
const MUTED = "#5A5A63";

const TRADES = [
  { name: "Automotive", mark: "A", items: AUTO_ITEMS },
  { name: "Handyman", mark: "H", items: HANDYMAN_ITEMS },
  { name: "DIY Bay", mark: "D", items: DIY_ITEMS },
  { name: "I.T.", mark: "I", items: IT_ITEMS },
] as const;

/**
 * `title` names the page the card belongs to. The home card omits it: the
 * letterhead is already the title there, and stacking a second heading on it
 * only crowds the four lines that do the actual work.
 */
export function ogCard(title?: string) {
  const rows = TRADES.map((t) => ({
    name: t.name,
    where: TRADE_LOCATION[t.mark].label,
    from: startsAt(t.items),
  }));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: PAPER,
          color: INK,
          fontFamily: "ArchivoBody",
          padding: 48,
        }}
      >
        {/* Letterhead */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            borderBottom: `3px solid ${INK}`,
            paddingBottom: 18,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontFamily: "ArchivoPress", fontSize: 72, lineHeight: 1, textTransform: "uppercase" }}>
              {BUSINESS.name}
            </div>
            <div style={{ fontSize: 24, color: MUTED, marginTop: 10 }}>
              {BUSINESS.address.oneLine}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: "ArchivoLabel",
              fontSize: 18,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: MUTED,
            }}
          >
            Estimate
          </div>
        </div>

        {/* `flexShrink: 0` and an explicit `lineHeight` on both blocks below.
            Satori gives a flex child no intrinsic height from its text alone,
            so without them the rows were laid out from the title's own top
            edge and printed straight through it. */}
        {title ? (
          <div
            style={{
              display: "flex",
              flexShrink: 0,
              fontFamily: "ArchivoPress",
              fontSize: 40,
              lineHeight: 1.1,
              textTransform: "uppercase",
              marginTop: 20,
            }}
          >
            {title}
          </div>
        ) : null}

        {/* The four trades as four estimate lines, price column banded canary. */}
        {/* The rows take whatever height is left rather than a fixed padding,
            so adding a title cannot push the footer off the bottom edge — the
            four lines simply sit closer together. */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            justifyContent: "center",
            marginTop: title ? 8 : 0,
          }}
        >
          {rows.map((r) => (
            <div
              key={r.name}
              style={{
                display: "flex",
                flexGrow: 1,
                alignItems: "center",
                justifyContent: "space-between",
                borderBottom: `1px solid ${RULE}`,
              }}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ fontFamily: "ArchivoLabel", fontSize: 31, lineHeight: 1.2 }}>
                  {r.name}
                </div>
                <div style={{ fontSize: 18, lineHeight: 1.3, color: MUTED, marginTop: 3 }}>
                  {r.where}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  fontFamily: "ArchivoLabel",
                  fontSize: 30,
                  background: CANARY,
                  padding: "10px 18px",
                  width: 250,
                }}
              >
                {r.from === null ? "Quoted" : `from ${formatUsd(r.from)}`}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            flexShrink: 0,
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: `2px solid ${INK}`,
            paddingTop: 16,
            fontFamily: "ArchivoLabel",
            fontSize: 24,
          }}
        >
          <div style={{ display: "flex" }}>{BUSINESS.phone.display}</div>
          <div style={{ display: "flex", color: MUTED }}>{BUSINESS.domain}</div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "ArchivoPress", data: press, style: "normal", weight: 800 },
        { name: "ArchivoLabel", data: label, style: "normal", weight: 600 },
        { name: "ArchivoBody", data: body, style: "normal", weight: 400 },
      ],
    },
  );
}
