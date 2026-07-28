import { type ReactElement } from "react";
import { TREE_VARIANTS, type Rarity } from "@/lib/game";

const COLORS: Record<Rarity, { top: string; bottom: string }> = {
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

interface SpeciesProps {
  c: { top: string; bottom: string };
  v: number;
}

/** Birch — slim pale trunk with dark bands, light airy canopy. */
function Birch({ c, v }: SpeciesProps) {
  return (
    <>
      <path d="M11.2 22 L11.6 8 h0.9 L12.9 22 Z" fill="#edefe9" />
      <path
        d="M11.4 18.4 h1.3 M11.5 15.1 h1.2 M11.6 11.7 h1.1"
        stroke="#9ba291"
        strokeWidth="0.7"
        strokeLinecap="round"
      />
      {v === 0 && (
        <>
          <ellipse cx="12" cy="7.4" rx="5.3" ry="5" fill={c.bottom} />
          <ellipse cx="10.2" cy="5.7" rx="2.9" ry="2.7" fill={c.top} />
        </>
      )}
      {v === 1 && (
        <>
          <ellipse cx="12" cy="6.6" rx="4.1" ry="5.6" fill={c.bottom} />
          <ellipse cx="10.7" cy="4.9" rx="2.2" ry="2.9" fill={c.top} />
        </>
      )}
      {v === 2 && (
        <>
          <ellipse cx="9.6" cy="8" rx="3.7" ry="3.5" fill={c.bottom} />
          <ellipse cx="14.2" cy="6.4" rx="3.5" ry="3.3" fill={c.bottom} />
          <ellipse cx="11.9" cy="5.2" rx="3" ry="2.9" fill={c.top} />
        </>
      )}
    </>
  );
}

/** Weeping willow — low dome with strands trailing toward the ground. */
function Willow({ c, v }: SpeciesProps) {
  const strands =
    v === 0
      ? ["M7.4 12.2 q-0.9 3.6 0.2 6.2", "M9.7 13.4 q-0.6 3.3 0.3 5.5", "M12 13.8 v5.3", "M14.3 13.4 q0.6 3.3 -0.3 5.5", "M16.6 12.2 q0.9 3.6 -0.2 6.2"]
      : v === 1
        ? ["M8.2 12.6 q-1 4.2 0.3 7", "M12 14 v6.2", "M15.8 12.6 q1 4.2 -0.3 7"]
        : ["M6.6 11.8 q-0.8 3 0.1 5.2", "M9 13 q-0.5 3 0.3 5", "M12 13.6 v4.8", "M15 13 q0.5 3 -0.3 5", "M17.4 11.8 q0.8 3 -0.1 5.2"];
  return (
    <>
      <rect x="11.3" y="13" width="1.5" height="9" rx="0.7" fill="#8a7160" />
      <ellipse cx="12" cy="9.8" rx={v === 2 ? 7 : 6.4} ry="4.3" fill={c.bottom} />
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

/** Jacaranda — broad umbrella of blossom on a forked trunk. */
function Jacaranda({ c, v }: SpeciesProps) {
  return (
    <>
      <path
        d="M11.4 22 h1.3 v-8 h-1.3 Z M12 15.4 L9.2 11.6 M12 15.4 L14.9 11.6"
        fill="#7d6552"
        stroke="#7d6552"
        strokeWidth="1"
        strokeLinecap="round"
      />
      {v === 0 && (
        <>
          <ellipse cx="12" cy="8.6" rx="7.6" ry="3.7" fill={c.bottom} />
          <ellipse cx="12" cy="6.5" rx="5.3" ry="2.9" fill={c.top} />
        </>
      )}
      {v === 1 && (
        <>
          <ellipse cx="12" cy="9.4" rx="6.6" ry="3.1" fill={c.bottom} />
          <ellipse cx="12" cy="6.6" rx="5.4" ry="2.8" fill={c.bottom} />
          <ellipse cx="12" cy="4.9" rx="3.4" ry="2" fill={c.top} />
        </>
      )}
      {v === 2 && (
        <>
          <ellipse cx="12" cy="7.8" rx="6.8" ry="4.6" fill={c.bottom} />
          <ellipse cx="10.2" cy="6.2" rx="3.6" ry="2.8" fill={c.top} />
        </>
      )}
      <circle cx="6.6" cy="11.4" r="0.75" fill={c.top} opacity="0.85" />
      <circle cx="17.3" cy="11.1" r="0.65" fill={c.top} opacity="0.85" />
      <circle cx="14.4" cy="12.6" r="0.55" fill={c.top} opacity="0.7" />
    </>
  );
}

/** Baobab — the upside-down tree: massive tapering trunk, sparse stubby crown. */
function Baobab({ c, v }: SpeciesProps) {
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
      {v === 0 && (
        <>
          <ellipse cx="7.2" cy="7" rx="3.1" ry="2.1" fill={c.bottom} />
          <ellipse cx="16.8" cy="7" rx="3.1" ry="2.1" fill={c.bottom} />
          <ellipse cx="12" cy="5.6" rx="3.6" ry="2.4" fill={c.top} />
        </>
      )}
      {v === 1 && (
        <>
          <ellipse cx="12" cy="6.4" rx="7" ry="2.6" fill={c.bottom} />
          <ellipse cx="12" cy="4.9" rx="4" ry="1.9" fill={c.top} />
        </>
      )}
      {v === 2 && (
        <>
          <ellipse cx="8" cy="6.6" rx="3.4" ry="2.3" fill={c.bottom} />
          <ellipse cx="16" cy="6.6" rx="3.4" ry="2.3" fill={c.bottom} />
          <ellipse cx="12" cy="7.4" rx="3.2" ry="2.1" fill={c.bottom} />
          <ellipse cx="12" cy="5.2" rx="3" ry="2" fill={c.top} />
        </>
      )}
    </>
  );
}

/** Socotra dragon blood — forked branches under a dense, flat-topped umbrella. */
function DragonBlood({ c, v }: SpeciesProps) {
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
      {v === 0 && (
        <>
          <path d="M3.6 10.6 Q12 3.4 20.4 10.6 Q12 8.2 3.6 10.6 Z" fill={c.bottom} />
          <path d="M5.6 8.6 Q12 4.2 18.4 8.6 Q12 6.8 5.6 8.6 Z" fill={c.top} />
        </>
      )}
      {v === 1 && (
        <>
          <ellipse cx="12" cy="9.2" rx="8.4" ry="3.4" fill={c.bottom} />
          <ellipse cx="12" cy="7.2" rx="5.8" ry="2.6" fill={c.top} />
        </>
      )}
      {v === 2 && (
        <>
          <path d="M4.2 11 Q12 2.8 19.8 11 Q12 7.6 4.2 11 Z" fill={c.bottom} />
          <ellipse cx="9.6" cy="7.4" rx="3.2" ry="2.1" fill={c.top} />
          <ellipse cx="14.6" cy="7.8" rx="2.8" ry="1.9" fill={c.top} />
        </>
      )}
      <path
        d="M18.6 3.4 l0.7 1.6 1.6 0.7 -1.6 0.7 -0.7 1.6 -0.7 -1.6 -1.6 -0.7 1.6 -0.7 Z"
        fill="#fff0f7"
      />
    </>
  );
}

const SPECIES: Record<Rarity, (p: SpeciesProps) => ReactElement> = {
  common: Birch,
  rare: Willow,
  epic: Jacaranda,
  legendary: Baobab,
  mythical: DragonBlood,
};

export function TreeGlyph({
  rarity,
  variant = 0,
}: {
  rarity: Rarity;
  variant?: number;
}) {
  const c = COLORS[rarity];
  const v = ((variant % TREE_VARIANTS) + TREE_VARIANTS) % TREE_VARIANTS;
  const Species = SPECIES[rarity];
  return (
    <g>
      <Species c={c} v={v} />
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
