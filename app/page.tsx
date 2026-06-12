"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Axe, ListChecks, Moon, Sprout } from "lucide-react";
import { RARITY_INFO, TASK_GOAL, useGame, type SleepResult } from "@/lib/game";
import { Island } from "@/components/island";
import { TreeIcon } from "@/components/tree-icon";

export default function HomePage() {
  const { username, trees, saplings, completedTasks, sleep, islandType } = useGame();
  const [greeting, setGreeting] = useState("Good evening");
  const [sleeping, setSleeping] = useState(false);
  const [result, setResult] = useState<SleepResult | null>(null);

  useEffect(() => {
    setGreeting(new Date().getHours() < 12 ? "Good morning" : "Good evening");
  }, []);

  const tasksDone = completedTasks.length;

  const startSleep = () => {
    if (sleeping || result) return;
    setSleeping(true);
    setTimeout(() => {
      setResult(sleep());
      setSleeping(false);
    }, 2200);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex w-full justify-end">
        <span className="text-xs font-semibold text-sea-800/70">@{username.toLowerCase()}</span>
      </div>

      <h1 className="mt-2 text-center font-script text-3xl leading-relaxed text-stone-800">
        {greeting}, {username}
      </h1>
      <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.18em] text-sea-800/60">
        every good night grows a tree
      </p>

      <div className="mt-7 animate-float-soft">
        <Island trees={trees} islandType={islandType} compact />
      </div>

      <div className="mt-6 flex gap-2">
        <span className="flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-xs font-bold text-stone-500 shadow-sm">
          <Sprout size={14} className="text-moss-500" />
          {saplings.length} sapling{saplings.length === 1 ? "" : "s"}
        </span>
        <Link
          href="/tasks"
          className="flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-xs font-bold text-stone-500 shadow-sm transition hover:bg-fog-100"
        >
          <ListChecks size={14} className="text-moss-500" />
          {tasksDone}/{TASK_GOAL} tasks
        </Link>
      </div>

      <button
        onClick={startSleep}
        disabled={sleeping}
        aria-label="Activate sleep mode"
        className={`mt-9 flex h-36 w-36 items-center justify-center rounded-full bg-gradient-to-b from-moss-400 to-moss-600 text-white shadow-xl shadow-moss-500/40 transition-transform duration-300 hover:scale-[1.04] active:scale-95 ${
          sleeping ? "animate-glow-pulse scale-105" : ""
        }`}
      >
        <Moon size={52} strokeWidth={1.8} fill={sleeping ? "currentColor" : "none"} />
      </button>

      <p className="mt-5 text-sm font-extrabold text-sea-800">
        {sleeping ? "Sleeping… 8 hours drift by 💤" : "Activate Sleep Mode"}
      </p>
      {!sleeping && tasksDone < TASK_GOAL && (
        <p className="mt-1.5 text-xs font-semibold text-sea-800/70">
          {TASK_GOAL - tasksDone} task{TASK_GOAL - tasksDone === 1 ? "" : "s"} left — or the
          lumberjack pays a visit
        </p>
      )}

      {result && <SleepResultModal result={result} onClose={() => setResult(null)} />}
    </div>
  );
}

function SleepResultModal({
  result,
  onClose,
}: {
  result: SleepResult;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/30 px-6 backdrop-blur-sm">
      <div className="w-full max-w-sm animate-grow-in rounded-3xl bg-white p-8 text-center shadow-2xl">
        {result.kind === "growth" ? (
          <>
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-moss-100">
              <TreeIcon
                rarity={result.grown[0]?.rarity ?? "common"}
                variant={result.grown[0]?.variant ?? 0}
                className="h-10 w-10"
              />
            </div>
            <h2 className="mt-4 text-lg font-extrabold text-stone-800">
              A full night&apos;s sleep!
            </h2>
            <p className="mt-2 text-sm font-semibold text-stone-500">
              {result.grown.length === 1
                ? `Your sapling grew into a ${RARITY_INFO[result.grown[0].rarity].label.toLowerCase()} tree.`
                : `${result.grown.length} saplings grew into trees on your island.`}
            </p>
            <div className="mt-4 flex justify-center gap-2">
              {result.grown.map((t) => (
                <TreeIcon
                  key={t.id}
                  rarity={t.rarity}
                  variant={t.variant}
                  className="h-9 w-9 animate-grow-in"
                />
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-50">
              <Axe size={30} className="text-orange-300" />
            </div>
            <h2 className="mt-4 text-lg font-extrabold text-stone-800">
              The lumberjack came&hellip;
            </h2>
            <p className="mt-2 text-sm font-semibold text-stone-500">
              {result.removed
                ? `You skipped your tasks, so he chopped down a ${RARITY_INFO[result.removed.rarity].label.toLowerCase()} tree.`
                : "You skipped your tasks — luckily there was nothing on your island to chop. Yet."}
            </p>
          </>
        )}
        <button
          onClick={onClose}
          className="mt-7 w-full rounded-2xl bg-moss-500 py-3 text-sm font-extrabold text-white shadow-md shadow-moss-500/30 transition hover:bg-moss-600"
        >
          Begin the new day
        </button>
      </div>
    </div>
  );
}
