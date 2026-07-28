"use client";

import { useState } from "react";
import {
  islandCapacity,
  RARITY_INFO,
  TREE_VARIANTS,
  useGame,
  type Tree,
} from "@/lib/game";
import { PageHeader } from "@/components/page-header";
import { Island } from "@/components/island";
import { TreeIcon } from "@/components/tree-icon";

export default function ProfilePage() {
  const { username, trees, islandType, streak, bestStreak, cycleTreeVariant, removeTree } =
    useGame();
  const [selected, setSelected] = useState<Tree | null>(null);

  const capacity = islandCapacity(trees.length);
  const epicPlus = trees.filter(
    (t) => t.rarity === "epic" || t.rarity === "legendary" || t.rarity === "mythical"
  ).length;

  return (
    <div>
      <PageHeader title="Profile" subtitle="Your island is your sleep story" />

      <div className="flex flex-col items-center rounded-3xl bg-white p-6 shadow-sm">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-moss-200 text-2xl font-extrabold text-moss-700">
          {username.charAt(0).toUpperCase()}
        </div>
        <p className="mt-3 text-lg font-extrabold text-stone-800">{username}</p>
        <p className="text-xs font-semibold text-stone-400">@{username.toLowerCase()}</p>

        <div className="mt-5 grid w-full grid-cols-4 divide-x divide-stone-100 rounded-2xl bg-fog-50 py-3.5 text-center">
          <Stat value={trees.length} label="Trees" />
          <Stat value={epicPlus} label="Epic+" />
          <Stat value={streak} label="Streak" />
          <Stat value={bestStreak} label="Best" />
        </div>
      </div>

      <section className="mt-6 flex flex-col items-center">
        <h2 className="text-xs font-extrabold uppercase tracking-wider text-sea-800/70">
          Your island
        </h2>
        <div className="mt-3 w-full">
          <Island trees={trees} islandType={islandType} onTreeClick={setSelected} />
        </div>
        <p className="mt-3 text-xs font-semibold text-sea-800/70">
          {trees.length} / {capacity} plots — tap a tree to restyle or remove it
        </p>
      </section>

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/30 px-6 backdrop-blur-sm"
          onClick={() => setSelected(null)}
        >
          <div
            className="w-full max-w-sm animate-grow-in rounded-3xl bg-white p-7 text-center shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-fog-100">
              <TreeIcon rarity={selected.rarity} variant={selected.variant} className="h-12 w-12" />
            </div>
            <h2 className="mt-3 text-lg font-extrabold text-stone-800">
              {RARITY_INFO[selected.rarity].label} tree
            </h2>
            <p className="mt-1 text-xs font-semibold text-stone-400">
              Restyle it, or clear the plot for something new.
            </p>
            <div className="mt-5 flex flex-col gap-2">
              <button
                onClick={() => {
                  cycleTreeVariant(selected.id);
                  setSelected({
                    ...selected,
                    variant: (selected.variant + 1) % TREE_VARIANTS,
                  });
                }}
                className="w-full rounded-2xl bg-moss-500 py-3 text-sm font-extrabold text-white shadow-md shadow-moss-500/30 transition hover:bg-moss-600"
              >
                Change look
              </button>
              <button
                onClick={() => {
                  removeTree(selected.id);
                  setSelected(null);
                }}
                className="w-full rounded-2xl border border-red-200 bg-red-50 py-3 text-sm font-extrabold text-red-400 transition hover:bg-red-100"
              >
                Remove tree
              </button>
              <button
                onClick={() => setSelected(null)}
                className="w-full rounded-2xl py-2.5 text-sm font-bold text-stone-400 transition hover:text-stone-500"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <div>
      <p className="text-lg font-extrabold text-stone-700">{value}</p>
      <p className="text-[11px] font-bold text-stone-400">{label}</p>
    </div>
  );
}
