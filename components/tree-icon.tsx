import type { Rarity } from "@/lib/game";

const COLORS: Record<Rarity, { top: string; bottom: string }> = {
  common: { top: "#86a376", bottom: "#6c8a5e" },
  rare: { top: "#74b0ab", bottom: "#578f8b" },
  epic: { top: "#b298d4", bottom: "#9377b8" },
};

const GLOW: Record<Rarity, string> = {
  common: "",
  rare: " drop-shadow-[0_0_3px_rgba(116,176,171,0.55)]",
  epic: " drop-shadow-[0_0_5px_rgba(178,152,212,0.85)]",
};

export function TreeIcon({
  rarity,
  className = "",
}: {
  rarity: Rarity;
  className?: string;
}) {
  const c = COLORS[rarity];
  return (
    <svg viewBox="0 0 24 24" className={className + GLOW[rarity]} aria-hidden="true">
      <rect x="10.7" y="15" width="2.6" height="7" rx="1.2" fill="#8a7160" />
      <path d="M12 6.5 L19.5 17 H4.5 Z" fill={c.bottom} />
      <path d="M12 1.5 L18 10 H6 Z" fill={c.top} />
    </svg>
  );
}
