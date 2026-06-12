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

export function TreeGlyph({
  rarity,
  variant = 0,
}: {
  rarity: Rarity;
  variant?: number;
}) {
  const c = COLORS[rarity];
  const v = ((variant % TREE_VARIANTS) + TREE_VARIANTS) % TREE_VARIANTS;
  return (
    <g>
      <rect x="10.7" y="15" width="2.6" height="7" rx="1.2" fill="#8a7160" />
      {v === 0 && (
        <>
          <path d="M12 6.5 L19.5 17 H4.5 Z" fill={c.bottom} />
          <path d="M12 1.5 L18 10 H6 Z" fill={c.top} />
        </>
      )}
      {v === 1 && (
        <>
          <circle cx="12" cy="10" r="7" fill={c.bottom} />
          <circle cx="9.5" cy="8" r="3.4" fill={c.top} />
        </>
      )}
      {v === 2 && (
        <>
          <path d="M12 1 C16 6.5 16.5 11.5 12 17 C7.5 11.5 8 6.5 12 1 Z" fill={c.bottom} />
          <path
            d="M12 3 C14.4 6.6 14.7 10 12 13.8 C9.3 10 9.6 6.6 12 3 Z"
            fill={c.top}
            opacity="0.55"
          />
        </>
      )}
      {rarity === "mythical" && (
        <path
          d="M18.5 3.5 l0.7 1.6 1.6 0.7 -1.6 0.7 -0.7 1.6 -0.7 -1.6 -1.6 -0.7 1.6 -0.7 Z"
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
