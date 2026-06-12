"use client";

import { useState } from "react";
import { Check, Moon, Sprout } from "lucide-react";
import { DAILY_TASKS, RARITY_INFO, TASK_GOAL, useGame, type Sapling } from "@/lib/game";
import { PageHeader } from "@/components/page-header";

export default function TasksPage() {
  const { completedTasks, toggleTask, claimSapling, claimedToday } = useGame();
  const [justClaimed, setJustClaimed] = useState<Sapling | null>(null);

  const done = completedTasks.length;
  const progress = Math.min(done / TASK_GOAL, 1) * 100;
  const canClaim = done >= TASK_GOAL && !claimedToday;

  const handleClaim = () => {
    const sapling = claimSapling();
    if (sapling) setJustClaimed(sapling);
  };

  return (
    <div>
      <PageHeader
        title="Daily tasks"
        subtitle={`Complete ${TASK_GOAL} to earn today's sapling`}
      />

      <div className="rounded-2xl bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between text-xs font-bold text-stone-500">
          <span>Today&apos;s progress</span>
          <span>
            {Math.min(done, TASK_GOAL)} / {TASK_GOAL}
          </span>
        </div>
        <div className="mt-2.5 h-2.5 overflow-hidden rounded-full bg-fog-200">
          <div
            className="h-full rounded-full bg-moss-400 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <ul className="mt-5 space-y-2.5">
        {DAILY_TASKS.map((task) => {
          const isDone = completedTasks.includes(task.id);
          return (
            <li key={task.id}>
              <button
                onClick={() => toggleTask(task.id)}
                className={`flex w-full items-center gap-3.5 rounded-2xl border p-4 text-left transition ${
                  isDone
                    ? "border-moss-200 bg-moss-100/70"
                    : "border-stone-200/70 bg-white hover:border-moss-200"
                }`}
              >
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition ${
                    isDone
                      ? "border-moss-500 bg-moss-500 text-white"
                      : "border-stone-300 bg-white"
                  }`}
                >
                  {isDone && <Check size={14} strokeWidth={3.5} />}
                </span>
                <span
                  className={`text-sm font-bold ${isDone ? "text-moss-700" : "text-stone-600"}`}
                >
                  {task.label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <div className="mt-6">
        {claimedToday ? (
          <div className="animate-fade-up rounded-2xl border border-moss-200 bg-moss-100/70 p-5 text-center">
            {justClaimed && (
              <span
                className={`mb-2 inline-block rounded-full px-3 py-1 text-xs font-extrabold ${RARITY_INFO[justClaimed.rarity].badge}`}
              >
                {RARITY_INFO[justClaimed.rarity].label} sapling
              </span>
            )}
            <p className="flex items-center justify-center gap-1.5 text-sm font-extrabold text-moss-700">
              <Sprout size={16} /> Sapling claimed!
            </p>
            <p className="mt-1 flex items-center justify-center gap-1 text-xs font-semibold text-stone-500">
              Sleep tonight to grow it into a tree <Moon size={12} />
            </p>
          </div>
        ) : (
          <button
            onClick={handleClaim}
            disabled={!canClaim}
            className={`w-full rounded-2xl py-3.5 text-sm font-extrabold transition ${
              canClaim
                ? "bg-moss-500 text-white shadow-md shadow-moss-500/30 hover:bg-moss-600"
                : "cursor-not-allowed bg-fog-200 text-stone-400"
            }`}
          >
            {canClaim
              ? "Claim your sapling 🌱"
              : `Complete ${TASK_GOAL - done} more task${TASK_GOAL - done === 1 ? "" : "s"} to earn a sapling`}
          </button>
        )}
      </div>
    </div>
  );
}
