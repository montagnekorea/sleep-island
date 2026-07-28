"use client";

import { Flame, Sprout } from "lucide-react";
import {
  RARITY_INFO,
  SPECIES,
  STREAK_LUCK_CAP,
  rarityOdds,
  useGame,
  type Rarity,
} from "@/lib/game";
import { PageHeader } from "@/components/page-header";
import { TreeIcon } from "@/components/tree-icon";

const RARITIES: Rarity[] = ["common", "rare", "epic", "legendary", "mythical"];

function formatOdds(pct: number): string {
  const rounded = Math.round(pct * 10) / 10;
  return `${Number.isInteger(rounded) ? rounded : rounded.toFixed(1)}%`;
}

export default function RewardsPage() {
  const { saplings, trees, streak } = useGame();

  const odds = rarityOdds(streak);
  const baseOdds = rarityOdds(0);
  const boosted = streak > 0;

  const treeCounts = RARITIES.map((rarity) => ({
    rarity,
    count: trees.filter((t) => t.rarity === rarity).length,
  }));

  return (
    <div>
      <PageHeader title="Rewards" subtitle="Saplings grow into trees while you sleep" />

      <section
        className={`flex items-center gap-3.5 rounded-2xl p-4 shadow-sm ${
          boosted ? "bg-legend-400/10" : "bg-white"
        }`}
      >
        <span
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${
            boosted ? "bg-legend-400/20 text-legend-500" : "bg-fog-100 text-stone-300"
          }`}
        >
          <Flame size={20} fill={boosted ? "currentColor" : "none"} strokeWidth={boosted ? 0 : 2} />
        </span>
        <div>
          <p className="text-sm font-extrabold text-stone-700">
            {streak} night streak
          </p>
          <p className="text-xs font-semibold text-stone-400">
            {boosted
              ? streak >= STREAK_LUCK_CAP
                ? "Your luck is fully maxed out — nice."
                : `Better odds every night, maxing out at ${STREAK_LUCK_CAP}.`
              : "Sleep on a full set of tasks to start a streak."}
          </p>
        </div>
      </section>

      <section className="mt-4 rounded-2xl bg-white p-5 shadow-sm">
        <h2 className="text-xs font-extrabold uppercase tracking-wider text-stone-400">
          Ready to grow tonight
        </h2>
        {saplings.length === 0 ? (
          <p className="mt-3 text-sm font-semibold text-stone-400">
            No saplings yet — complete your daily tasks to earn one.
          </p>
        ) : (
          <ul className="mt-3 space-y-2">
            {saplings.map((s) => (
              <li key={s.id} className="flex items-center gap-3 rounded-xl bg-fog-50 p-3">
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-full ${RARITY_INFO[s.rarity].badge}`}
                >
                  <Sprout size={18} />
                </span>
                <div>
                  <p className="text-sm font-extrabold text-stone-700">
                    {RARITY_INFO[s.rarity].label} sapling
                  </p>
                  <p className="text-xs font-semibold text-stone-400">
                    Its species is revealed when it grows tonight
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mt-4 rounded-2xl bg-white p-5 shadow-sm">
        <h2 className="text-xs font-extrabold uppercase tracking-wider text-stone-400">
          Your odds tonight
        </h2>
        <ul className="mt-3 space-y-2.5">
          {RARITIES.map((rarity) => {
            const up = odds[rarity] > baseOdds[rarity] + 0.05;
            return (
              <li key={rarity} className="flex items-center gap-3">
                <span className="flex shrink-0">
                  {SPECIES[rarity].map((name, v) => (
                    <TreeIcon key={name} rarity={rarity} variant={v} className="h-7 w-7" />
                  ))}
                </span>
                <span className="flex min-w-0 flex-col leading-tight">
                  <span className="text-sm font-bold text-stone-600">
                    {RARITY_INFO[rarity].label}
                  </span>
                  <span className="text-[11px] font-semibold text-stone-400">
                    {SPECIES[rarity].join(" · ")}
                  </span>
                </span>
                <span className="ml-auto flex items-baseline gap-1.5">
                  {boosted && (
                    <span className="text-[11px] font-bold text-stone-300 line-through">
                      {formatOdds(baseOdds[rarity])}
                    </span>
                  )}
                  <span
                    className={`text-sm font-extrabold ${
                      up ? "text-legend-500" : "text-stone-400"
                    }`}
                  >
                    {formatOdds(odds[rarity])}
                  </span>
                </span>
              </li>
            );
          })}
        </ul>
        <p className="mt-3.5 text-[11px] font-semibold text-stone-400">
          Longer streaks tilt the odds toward the rare tiers — a {STREAK_LUCK_CAP} night streak
          turns a 1% mythical into a 5% one. Each tier has three species; which one you get is
          rolled the night your sapling grows and can&apos;t be changed afterwards.
        </p>
      </section>

      <section className="mt-4">
        <h2 className="px-1 text-xs font-extrabold uppercase tracking-wider text-sea-800/70">
          Trophy shelf
        </h2>
        <div className="mt-2.5 grid grid-cols-3 gap-2.5">
          {treeCounts.map(({ rarity, count }) => (
            <div
              key={rarity}
              className="flex flex-col items-center rounded-2xl bg-white p-4 shadow-sm"
            >
              <TreeIcon rarity={rarity} className="h-9 w-9" />
              <p className="mt-2 text-lg font-extrabold text-stone-700">{count}</p>
              <p className="text-[11px] font-bold text-stone-400">{RARITY_INFO[rarity].label}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
