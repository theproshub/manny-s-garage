"use client";

import { useEffect, useState } from "react";

/**
 * Live open/closed status, stamped like the sign on the shop door.
 *
 * Computed in America/Chicago — the shop's clock, not the visitor's. Someone
 * checking from another timezone must see whether MANNY is open, not whether
 * it is business hours where they happen to be standing.
 *
 * Renders a neutral placeholder on the server and upgrades after mount: the
 * page is statically generated, so a server-rendered "OPEN" would be frozen
 * at build time and eventually be a lie.
 */

type Day = { open: number; close: number } | null;

// Minutes from midnight, Central. Sunday closed.
const WEEK: Record<string, Day> = {
  Mon: { open: 8 * 60, close: 18 * 60 },
  Tue: { open: 8 * 60, close: 18 * 60 },
  Wed: { open: 8 * 60, close: 18 * 60 },
  Thu: { open: 8 * 60, close: 18 * 60 },
  Fri: { open: 8 * 60, close: 18 * 60 },
  Sat: { open: 9 * 60, close: 15 * 60 },
  Sun: null,
};

const ORDER = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function clockLabel(minutes: number): string {
  const h24 = Math.floor(minutes / 60);
  const m = minutes % 60;
  const suffix = h24 >= 12 ? "PM" : "AM";
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  return m === 0 ? `${h12} ${suffix}` : `${h12}:${String(m).padStart(2, "0")} ${suffix}`;
}

function shopNow(): { day: string; minutes: number } {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(new Date());
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const hour = Number(get("hour")) % 24;
  return { day: get("weekday"), minutes: hour * 60 + Number(get("minute")) };
}

function nextOpening(fromDay: string): string {
  const start = ORDER.indexOf(fromDay);
  for (let i = 1; i <= 7; i++) {
    const name = ORDER[(start + i) % 7];
    const slot = WEEK[name];
    if (slot) return `${i === 1 ? "tomorrow" : name} at ${clockLabel(slot.open)}`;
  }
  return "";
}

export function OpenStatus() {
  const [state, setState] = useState<{ open: boolean; detail: string } | null>(null);

  useEffect(() => {
    const tick = () => {
      const { day, minutes } = shopNow();
      const slot = WEEK[day];
      if (slot && minutes >= slot.open && minutes < slot.close) {
        setState({ open: true, detail: `until ${clockLabel(slot.close)}` });
      } else if (slot && minutes < slot.open) {
        setState({ open: false, detail: `Opens today at ${clockLabel(slot.open)}` });
      } else {
        setState({ open: false, detail: `Opens ${nextOpening(day)}` });
      }
    };
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);

  if (!state) {
    return (
      <div>
        <p className="field-label">Today</p>
        <p className="figure text-sm text-[var(--ink-muted)]">Mon–Fri 8–6 · Sat 9–3</p>
      </div>
    );
  }

  return (
    <div>
      <p className={`status-stamp ${state.open ? "is-open" : "is-shut"}`}>
        {state.open ? "Open now" : "Closed"}
      </p>
      <p className="figure mt-1 text-sm text-[var(--ink-muted)]">{state.detail}</p>
    </div>
  );
}
