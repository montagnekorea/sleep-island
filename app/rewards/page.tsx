"use client";

import { Sprout } from "lucide-react";
import { RARITY_INFO, useGame, type Rarity } from "@/lib/game";
import { PageHeader } from "@/components/page-header";
import { TreeIcon } from "@/components/tree-icon";

const RARITIES: Rarity[] = ["common", "rare", "epic", "legendary", "mythical"];

export default function RewardsPage() {
  const { saplings, trees } = useGame();

  const treeCounts = RARITIES.map((rarity) => ({
    rarity,
    count: trees.filter((t) => t.rarity === rarity).length,
  }));

  return (
    <div>
      <PageHeader title="Rewards" subtitle="Saplings grow into trees while you sleep" />

      <section className="rounded-2xl bg-white p-5 shadow-sm">
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
                    Grows after a full night&apos;s sleep
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mt-4 rounded-2xl bg-white p-5 shadow-sm">
        <h2 className="text-xs font-extrabold uppercase tracking-wider text-stone-400">
          Sapling rarities
        </h2>
        <ul className="mt-3 space-y-2.5">
          {RARITIES.map((rarity) => (
            <li key={rarity} className="flex items-center gap-3">
              <TreeIcon rarity={rarity} className="h-7 w-7" />
              <span className="text-sm font-bold text-stone-600">
                {RARITY_INFO[rarity].label}
              </span>
              <span className="ml-auto text-sm font-extrabold text-stone-400">
                {RARITY_INFO[rarity].chance}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-[11px] font-semibold text-stone-400">
          Every tier comes in three looks — pine, broadleaf and cypress. Tap your trees on the
          profile page to restyle them.
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
