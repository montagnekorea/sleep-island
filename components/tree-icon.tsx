import { type ReactElement } from "react";
import { speciesIndex, type Rarity } from "@/lib/game";

interface Palette {
  top: string;
  bottom: string;
}

const COLORS: Record<Rarity, Palette> = {
  common: { top: "#86a376", bottom: "#6c8a5e" },
  rare: { top: "#74b0ab", bottom: "#578f8b" },
  epic: { top: "#b298d4", bottom: "#9377b8" },
  legendary: { top: "#dbb56b", bottom: "#c19a4f" },
  mythical: { top: "#e29ac4", bottom: "#c977a8" },
};

export const RARITY_GLOW: Record<Rarity, string> = {
  common: "",
  rare: " drop-shadow-[0_0_3px_rgba(116,176,171,0.55)]",
  epic: " drop-shadow-[0_0_5px_rgba(178,152,212,0.85)]",
  legendary: " drop-shadow-[0_0_6px_rgba(219,181,107,0.9)]",
  mythical: " drop-shadow-[0_0_7px_rgba(226,154,196,0.95)]",
};

const BARK = "#8a7160";

/* ── common ─────────────────────────────────────────────── */

/** Birch — slim pale trunk with dark bands. */
function Birch(c: Palette) {
  return (
    <>
      <path d="M11.2 22 L11.6 8 h0.9 L12.9 22 Z" fill="#edefe9" />
      <path
        d="M11.4 18.4 h1.3 M11.5 15.1 h1.2 M11.6 11.7 h1.1"
        stroke="#9ba291"
        strokeWidth="0.7"
        strokeLinecap="round"
      />
      <ellipse cx="12" cy="7.4" rx="5.3" ry="5" fill={c.bottom} />
      <ellipse cx="10.2" cy="5.7" rx="2.9" ry="2.7" fill={c.top} />
    </>
  );
}

/** Oak — sturdy trunk under a wide lumpy crown. */
function Oak(c: Palette) {
  return (
    <>
      <path d="M10.8 22 L11.3 12 h1.4 L13.2 22 Z" fill={BARK} />
      <path
        d="M11.5 14.6 L9.3 12.3 M12.6 13.7 L14.8 11.7"
        stroke={BARK}
        strokeWidth="0.9"
        strokeLinecap="round"
        fill="none"
      />
      <ellipse cx="12" cy="8.8" rx="7" ry="5.4" fill={c.bottom} />
      <circle cx="9.2" cy="6.6" r="3.1" fill={c.top} />
      <circle cx="14.6" cy="7.2" r="2.7" fill={c.top} />
    </>
  );
}

/** Pine — stacked conifer tiers. */
function Pine(c: Palette) {
  return (
    <>
      <rect x="11.2" y="17.5" width="1.6" height="4.5" rx="0.7" fill={BARK} />
      <path d="M12 10.4 L19 18.6 H5 Z" fill={c.bottom} />
      <path d="M12 6 L17.8 13.6 H6.2 Z" fill={c.bottom} />
      <path d="M12 1.8 L16.6 8.6 H7.4 Z" fill={c.top} />
    </>
  );
}

/* ── rare ───────────────────────────────────────────────── */

/** Weeping willow — low dome with strands trailing down. */
function Willow(c: Palette) {
  const strands = [
    "M7.4 12.2 q-0.9 3.6 0.2 6.2",
    "M9.7 13.4 q-0.6 3.3 0.3 5.5",
    "M12 13.8 v5.3",
    "M14.3 13.4 q0.6 3.3 -0.3 5.5",
    "M16.6 12.2 q0.9 3.6 -0.2 6.2",
  ];
  return (
    <>
      <rect x="11.3" y="13" width="1.5" height="9" rx="0.7" fill={BARK} />
      <ellipse cx="12" cy="9.8" rx="6.4" ry="4.3" fill={c.bottom} />
      <ellipse cx="10.4" cy="8.2" rx="3.4" ry="2.4" fill={c.top} />
      {strands.map((d) => (
        <path
          key={d}
          d={d}
          stroke={c.bottom}
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
        />
      ))}
    </>
  );
}

/** Olive — short forked trunk, two silvery lobes, dark fruit. */
function Olive(c: Palette) {
  return (
    <>
      <path d="M11 22 h2 l-0.3 -6 h-1.4 Z" fill={BARK} />
      <path
        d="M12 17.4 L9.4 14.6 M12 16.6 L14.8 14"
        stroke={BARK}
        strokeWidth="0.9"
        strokeLinecap="round"
        fill="none"
      />
      <ellipse cx="8.8" cy="11.6" rx="4.2" ry="3.4" fill={c.bottom} />
      <ellipse cx="15.2" cy="11.2" rx="4" ry="3.2" fill={c.bottom} />
      <ellipse cx="12" cy="8.6" rx="4.4" ry="3.4" fill={c.top} />
      <circle cx="9.4" cy="12.7" r="0.7" fill="#4f6350" />
      <circle cx="15" cy="12.2" r="0.6" fill="#4f6350" />
    </>
  );
}

/** Cypress — tall narrow flame. */
function Cypress(c: Palette) {
  return (
    <>
      <rect x="11.4" y="19" width="1.2" height="3" rx="0.5" fill={BARK} />
      <path d="M12 1.5 C15.6 7 15.9 14 12 20 C8.1 14 8.4 7 12 1.5 Z" fill={c.bottom} />
      <path
        d="M12 3.6 C14.3 7.6 14.5 12.4 12 16.8 C9.5 12.4 9.7 7.6 12 3.6 Z"
        fill={c.top}
        opacity="0.5"
      />
    </>
  );
}

/* ── epic ───────────────────────────────────────────────── */

/** Jacaranda — broad blossom umbrella on a forked trunk. */
function Jacaranda(c: Palette) {
  return (
    <>
      <path
        d="M11.4 22 h1.3 v-8 h-1.3 Z M12 15.4 L9.2 11.6 M12 15.4 L14.9 11.6"
        fill="#7d6552"
        stroke="#7d6552"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <ellipse cx="12" cy="8.6" rx="7.6" ry="3.7" fill={c.bottom} />
      <ellipse cx="12" cy="6.5" rx="5.3" ry="2.9" fill={c.top} />
      <circle cx="6.6" cy="11.4" r="0.75" fill={c.top} opacity="0.85" />
      <circle cx="17.3" cy="11.1" r="0.65" fill={c.top} opacity="0.85" />
      <circle cx="14.4" cy="12.6" r="0.55" fill={c.top} opacity="0.7" />
    </>
  );
}

/** Wisteria — arching crown with blossom racemes hanging beneath. */
function Wisteria(c: Palette) {
  const drops: Array<[number, number, number]> = [
    [6.6, 12.6, 2.4],
    [9.2, 13.4, 3],
    [12, 13.8, 3.4],
    [14.8, 13.3, 2.9],
    [17.4, 12.4, 2.2],
  ];
  return (
    <>
      <path d="M11.3 22 q0.5 -5.5 1.5 -8.4 h1 q-1.1 3 -1.6 8.4 Z" fill="#7d6552" />
      <ellipse cx="12" cy="8.4" rx="7.4" ry="3.4" fill={c.bottom} />
      <ellipse cx="12" cy="6.6" rx="5" ry="2.4" fill={c.top} />
      {drops.map(([x, y, ry]) => (
        <ellipse key={x} cx={x} cy={y} rx="0.8" ry={ry} fill={c.bottom} />
      ))}
    </>
  );
}

/** Foxglove tree — rounded crown topped with upright flower spikes. */
function Foxglove(c: Palette) {
  return (
    <>
      <path d="M11.2 22 L11.6 13 h0.9 L12.9 22 Z" fill="#7d6552" />
      <ellipse cx="12" cy="10.4" rx="6.8" ry="4.2" fill={c.bottom} />
      <ellipse cx="10.4" cy="9" rx="3.4" ry="2.4" fill={c.top} />
      <path d="M8.2 7.2 L9 3.6 L9.8 7.2 Z" fill={c.top} />
      <path d="M11.2 6.6 L12 2.6 L12.8 6.6 Z" fill={c.top} />
      <path d="M14.2 7.2 L15 3.6 L15.8 7.2 Z" fill={c.top} />
    </>
  );
}

/* ── legendary ──────────────────────────────────────────── */

/** Baobab — the upside-down tree: huge tapering trunk, sparse crown. */
function Baobab(c: Palette) {
  return (
    <>
      <path
        d="M6.9 22 C8.2 16.6 9.6 13.6 10.2 10.6 h3.6 C14.4 13.6 15.8 16.6 17.1 22 Z"
        fill="#a98e6f"
      />
      <path
        d="M10.6 13.4 q1.4 0.6 2.8 0"
        stroke="#94795c"
        strokeWidth="0.7"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M11 10.8 L7.6 7.8 M13 10.8 L16.4 7.8 M12 10.4 V6.6"
        stroke="#a98e6f"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
      />
      <ellipse cx="7.2" cy="7" rx="3.1" ry="2.1" fill={c.bottom} />
      <ellipse cx="16.8" cy="7" rx="3.1" ry="2.1" fill={c.bottom} />
      <ellipse cx="12" cy="5.6" rx="3.6" ry="2.4" fill={c.top} />
    </>
  );
}

/** Ginkgo — one broad fan of leaves. */
function Ginkgo(c: Palette) {
  return (
    <>
      <path d="M11.3 22 L11.6 12 h0.9 L12.8 22 Z" fill={BARK} />
      <path d="M12 13 Q4.4 10.4 5.4 5.6 Q12 2.2 18.6 5.6 Q19.6 10.4 12 13 Z" fill={c.bottom} />
      <path
        d="M12 10.9 Q7.6 9.4 8.2 6.4 Q12 4.4 15.8 6.4 Q16.4 9.4 12 10.9 Z"
        fill={c.top}
        opacity="0.65"
      />
      <path d="M12 2.6 V12.4" stroke="#fdf6e6" strokeWidth="0.55" opacity="0.45" />
    </>
  );
}

/** Cedar of Lebanon — flat horizontal tiers. */
function Cedar(c: Palette) {
  return (
    <>
      <path d="M11.2 22 L11.5 10.5 h1.1 L12.9 22 Z" fill={BARK} />
      <ellipse cx="12" cy="11" rx="8" ry="1.7" fill={c.bottom} />
      <ellipse cx="12" cy="7.9" rx="6.4" ry="1.5" fill={c.bottom} />
      <ellipse cx="12" cy="5.1" rx="4.4" ry="1.4" fill={c.top} />
      <ellipse cx="12" cy="2.9" rx="2.4" ry="1.1" fill={c.top} />
    </>
  );
}

/* ── mythical ───────────────────────────────────────────── */

/** Socotra dragon blood — forked branches under a flat-topped umbrella. */
function DragonBlood(c: Palette) {
  return (
    <>
      <path d="M10.8 22 h2.4 l-0.3 -7 h-1.8 Z" fill="#9c6b5a" />
      <path
        d="M12 15.6 L8.4 11.4 M12 15.6 L15.6 11.4 M9.9 13.2 L7.2 10.8 M14.1 13.2 L16.8 10.8"
        stroke="#9c6b5a"
        strokeWidth="1.1"
        strokeLinecap="round"
        fill="none"
      />
      <path d="M3.6 10.6 Q12 3.4 20.4 10.6 Q12 8.2 3.6 10.6 Z" fill={c.bottom} />
      <path d="M5.6 8.6 Q12 4.2 18.4 8.6 Q12 6.8 5.6 8.6 Z" fill={c.top} />
    </>
  );
}

/** Cherry blossom — leaning trunk, cloud of blossom, petals adrift. */
function CherryBlossom(c: Palette) {
  return (
    <>
      <path d="M10.9 22 q0.9 -6.2 2.1 -9.2 h1 q-1.3 3.2 -2.1 9.2 Z" fill={BARK} />
      <path
        d="M12.7 14 L15.4 11.6 M13 12.5 L10.5 10.6"
        stroke={BARK}
        strokeWidth="0.8"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="8.6" cy="8.4" r="3.6" fill={c.bottom} />
      <circle cx="15.2" cy="8.2" r="3.4" fill={c.bottom} />
      <circle cx="11.9" cy="6.2" r="4.2" fill={c.bottom} />
      <circle cx="10.4" cy="5.6" r="2.4" fill={c.top} />
      <circle cx="14.1" cy="6.6" r="2" fill={c.top} />
      <circle cx="6.3" cy="13.8" r="0.7" fill={c.top} opacity="0.8" />
      <circle cx="17.5" cy="14.6" r="0.6" fill={c.top} opacity="0.7" />
    </>
  );
}

/** Rainbow eucalyptus — the streaked trunk is the whole point. */
function RainbowEucalyptus(c: Palette) {
  return (
    <>
      <path d="M10.8 22 L11.4 8 h1.2 L13.2 22 Z" fill="#b58f6a" />
      <path d="M11.7 20.6 L12 9" stroke="#7fae9b" strokeWidth="0.7" strokeLinecap="round" />
      <path d="M12.5 21 L12.7 10" stroke="#c98a6a" strokeWidth="0.6" strokeLinecap="round" />
      <path d="M11.2 19.4 L11.6 11.5" stroke="#9b8bc4" strokeWidth="0.5" strokeLinecap="round" />
      <ellipse cx="12" cy="6" rx="5.6" ry="3" fill={c.bottom} />
      <ellipse cx="10.6" cy="4.8" rx="2.8" ry="1.9" fill={c.top} />
      <path
        d="M7.2 8.4 q2 1.4 3.9 0.9 M16.8 8.2 q-2 1.4 -3.9 0.9"
        stroke={c.bottom}
        strokeWidth="0.8"
        fill="none"
        strokeLinecap="round"
      />
    </>
  );
}

/** Index must line up with the name order in SPECIES. */
const GLYPHS: Record<Rarity, Array<(c: Palette) => ReactElement>> = {
  common: [Birch, Oak, Pine],
  rare: [Willow, Olive, Cypress],
  epic: [Jacaranda, Wisteria, Foxglove],
  legendary: [Baobab, Ginkgo, Cedar],
  mythical: [DragonBlood, CherryBlossom, RainbowEucalyptus],
};

export function TreeGlyph({
  rarity,
  variant = 0,
}: {
  rarity: Rarity;
  variant?: number;
}) {
  const c = COLORS[rarity];
  const draw = GLYPHS[rarity][speciesIndex(rarity, variant)];
  return (
    <g>
      {draw(c)}
      {rarity === "mythical" && (
        <path
          d="M18.6 3.4 l0.7 1.6 1.6 0.7 -1.6 0.7 -0.7 1.6 -0.7 -1.6 -1.6 -0.7 1.6 -0.7 Z"
          fill="#fff0f7"
        />
      )}
    </g>
  );
}

export function TreeIcon({
  rarity,
  variant = 0,
  className = "",
}: {
  rarity: Rarity;
  variant?: number;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 24 24" className={className + RARITY_GLOW[rarity]} aria-hidden="true">
      <TreeGlyph rarity={rarity} variant={variant} />
    </svg>
  );
}
