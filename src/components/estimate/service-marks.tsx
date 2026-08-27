/**
 * Marks drawn for this business rather than pulled from an icon set.
 *
 * Each one is the object the trade actually turns on — a brake rotor, a spirit
 * level, a two-post lift, a router — instead of the generic category glyph
 * (car, hammer, warehouse, wifi arcs) that every services page uses.
 */
type MarkProps = { className?: string };

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

/** Brake rotor and caliper — what a car job is actually about. */
export function RotorMark({ className }: MarkProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="11" cy="12" r="7.5" />
      <circle cx="11" cy="12" r="2.5" />
      <path d="M11 4.5v2M11 17.5v2M3.5 12h2M16.5 12h2" />
      <path d="M18 7.5a1.5 1.5 0 0 1 1.5 1.5v6a1.5 1.5 0 0 1-1.5 1.5" />
    </svg>
  );
}

/** Spirit level — the promise that it goes up straight. */
export function LevelMark({ className }: MarkProps) {
  return (
    <svg {...base} className={className}>
      <rect x="2" y="8" width="20" height="8" />
      <rect x="9" y="10" width="6" height="4" rx="2" />
      <path d="M11 10.5v3M13 10.5v3M5.5 8v8M18.5 8v8" />
    </svg>
  );
}

/** Two-post lift — the thing you are renting by the hour. */
export function LiftMark({ className }: MarkProps) {
  return (
    <svg {...base} className={className}>
      <path d="M4 21V6M20 21V6" />
      <path d="M2.5 21h3M18.5 21h3" />
      <path d="M4 11h4M20 11h-4" />
      <rect x="7" y="4" width="10" height="4" />
    </svg>
  );
}

/** Router — a box with antennas, not the three-arc wifi fan. */
export function RouterMark({ className }: MarkProps) {
  return (
    <svg {...base} className={className}>
      <rect x="2.5" y="13" width="19" height="7" rx="1" />
      <path d="M6 16.5h.01M9.5 16.5h.01" />
      <path d="M18 16.5h1.5" />
      <path d="M7.5 13 6 7M16.5 13 18 7" />
    </svg>
  );
}

/** Transport controls, drawn square rather than pulled from an icon set. */
export function PauseMark({ className }: MarkProps) {
  return (
    <svg {...base} className={className}>
      <path d="M9 5v14M15 5v14" strokeWidth={2} />
    </svg>
  );
}

export function PlayMark({ className }: MarkProps) {
  return (
    <svg {...base} className={className}>
      <path d="M7 4.5 19 12 7 19.5Z" />
    </svg>
  );
}
