"use client";

import { islandCapacity, useGame } from "@/lib/game";
import { PageHeader } from "@/components/page-header";
import { Island } from "@/components/island";

export default function ProfilePage() {
  const { username, trees, saplings } = useGame();
  const capacity = islandCapacity(trees.length);
  const epicCount = trees.filter((t) => t.rarity === "epic").length;

  return (
    <div>
      <PageHeader title="Profile" subtitle="Your island is your sleep story" />

      <div className="flex flex-col items-center rounded-3xl bg-white p-6 shadow-sm">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-moss-200 text-2xl font-extrabold text-moss-700">
          {username.charAt(0).toUpperCase()}
        </div>
        <p className="mt-3 text-lg font-extrabold text-stone-800">{username}</p>
        <p className="text-xs font-semibold text-stone-400">@{username.toLowerCase()}</p>

        <div className="mt-5 grid w-full grid-cols-3 divide-x divide-stone-100 rounded-2xl bg-fog-50 py-3.5 text-center">
          <Stat value={trees.length} label="Trees" />
          <Stat value={saplings.length} label="Saplings" />
          <Stat value={epicCount} label="Epic" />
        </div>
      </div>

      <section className="mt-6 flex flex-col items-center">
        <h2 className="text-xs font-extrabold uppercase tracking-wider text-stone-400">
          Your island
        </h2>
        <div className="mt-3 w-full">
          <Island trees={trees} />
        </div>
        <p className="mt-3 text-xs font-semibold text-stone-400">
          {trees.length} / {capacity} plots — the island expands when it fills up
        </p>
      </section>
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
