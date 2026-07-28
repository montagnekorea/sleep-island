"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Axe, Flame, ListChecks, Lock, Moon, Sprout } from "lucide-react";
import { RARITY_INFO, TASK_GOAL, useGame, type SleepResult } from "@/lib/game";
import { WINDOW_CLOSE_HOUR, WINDOW_OPEN_HOUR, formatHour } from "@/lib/time";
import { Island } from "@/components/island";
import { LiveClock } from "@/components/live-clock";
import { TreeIcon } from "@/components/tree-icon";

export default function HomePage() {
  const {
    ready,
    username,
    trees,
    saplings,
    completedTasks,
    sleep,
    islandType,
    streak,
    windowOpen,
    sleptTonight,
    canSleep,
    previewMode,
  } = useGame();
  const [greeting, setGreeting] = useState("Good evening");
  const [sleeping, setSleeping] = useState(false);
  const [result, setResult] = useState<SleepResult | null>(null);

  useEffect(() => {
    setGreeting(new Date().getHours() < 12 ? "Good morning" : "Good evening");
  }, []);

  const tasksDone = completedTasks.length;

  const startSleep = () => {
    if (sleeping || result || !canSleep) return;
    setSleeping(true);
    setTimeout(() => {
      const outcome = sleep();
      // the window can shut mid-animation — only show a result if it took
      if (outcome) setResult(outcome);
      setSleeping(false);
    }, 2200);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex w-full justify-end">
        <span className="text-xs font-semibold text-sea-800/70">@{username.toLowerCase()}</span>
      </div>

      <h1 className="mt-1 text-center font-script text-3xl leading-relaxed text-stone-800">
        {greeting}, {username}
      </h1>

      <div className="mt-4">
        <LiveClock />
      </div>

      <div className="mt-5 animate-float-soft">
        <Island trees={trees} islandType={islandType} compact />
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-2">
        <span
          className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold shadow-sm ${
            streak > 0 ? "bg-legend-400/15 text-legend-500" : "bg-white text-stone-500"
          }`}
        >
          <Flame
            size={14}
            className={streak > 0 ? "text-legend-400" : "text-stone-300"}
            fill={streak > 0 ? "currentColor" : "none"}
          />
          {streak} night{streak === 1 ? "" : "s"}
        </span>
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

      <SleepButton
        ready={ready}
        sleeping={sleeping}
        canSleep={canSleep}
        onClick={startSleep}
      />

      <SleepStatus
        ready={ready}
        sleeping={sleeping}
        windowOpen={windowOpen}
        previewMode={previewMode}
        sleptTonight={sleptTonight}
        tasksDone={tasksDone}
        streak={streak}
      />

      {result && <SleepResultModal result={result} onClose={() => setResult(null)} />}
    </div>
  );
}

function SleepButton({
  ready,
  sleeping,
  canSleep,
  onClick,
}: {
  ready: boolean;
  sleeping: boolean;
  canSleep: boolean;
  onClick: () => void;
}) {
  const locked = ready && !canSleep && !sleeping;

  return (
    <button
      onClick={onClick}
      disabled={!ready || locked || sleeping}
      aria-label={locked ? "Sleep mode is closed right now" : "Activate sleep mode"}
      className={`mt-8 flex h-36 w-36 items-center justify-center rounded-full text-white transition-all duration-300 ${
        locked
          ? "cursor-not-allowed bg-gradient-to-b from-fog-200 to-fog-200 text-stone-400 shadow-inner"
          : "bg-gradient-to-b from-moss-400 to-moss-600 shadow-xl shadow-moss-500/40 hover:scale-[1.04] active:scale-95"
      } ${sleeping ? "animate-glow-pulse scale-105" : ""} ${!ready ? "opacity-60" : ""}`}
    >
      {locked ? (
        <Lock size={44} strokeWidth={1.8} />
      ) : (
        <Moon size={52} strokeWidth={1.8} fill={sleeping ? "currentColor" : "none"} />
      )}
    </button>
  );
}

function SleepStatus({
  ready,
  sleeping,
  windowOpen,
  previewMode,
  sleptTonight,
  tasksDone,
  streak,
}: {
  ready: boolean;
  sleeping: boolean;
  windowOpen: boolean;
  previewMode: boolean;
  sleptTonight: boolean;
  tasksDone: number;
  streak: number;
}) {
  if (!ready) return <p className="mt-5 h-5" aria-hidden />;

  if (sleeping) {
    return (
      <p className="mt-5 text-sm font-extrabold text-sea-800">Sleeping… 8 hours drift by 💤</p>
    );
  }

  if (sleptTonight) {
    return (
      <>
        <p className="mt-5 text-sm font-extrabold text-sea-800">You&apos;ve slept for tonight</p>
        <p className="mt-1.5 text-center text-xs font-semibold text-sea-800/70">
          Come back tomorrow at {formatHour(WINDOW_OPEN_HOUR)} to keep the streak going
        </p>
      </>
    );
  }

  if (!windowOpen && !previewMode) {
    return (
      <>
        <p className="mt-5 text-sm font-extrabold text-sea-800">Sleep Mode is closed</p>
        <p className="mt-1.5 text-center text-xs font-semibold text-sea-800/70">
          It opens between {formatHour(WINDOW_OPEN_HOUR)} and {formatHour(WINDOW_CLOSE_HOUR)} —
          tick off your tasks in the meantime
        </p>
      </>
    );
  }

  return (
    <>
      <p className="mt-5 text-sm font-extrabold text-sea-800">Activate Sleep Mode</p>
      {tasksDone < TASK_GOAL ? (
        <p className="mt-1.5 text-center text-xs font-semibold text-sea-800/70">
          {TASK_GOAL - tasksDone} task{TASK_GOAL - tasksDone === 1 ? "" : "s"} left — or the
          lumberjack pays a visit
        </p>
      ) : (
        <p className="mt-1.5 text-center text-xs font-semibold text-sea-800/70">
          {streak > 0
            ? `Sleep now to reach night ${streak + 1}`
            : "Sleep now to start a new streak"}
        </p>
      )}
    </>
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
            <div className="mt-5 flex items-center justify-center gap-1.5 rounded-2xl bg-legend-400/10 py-2.5 text-sm font-extrabold text-legend-500">
              <Flame size={16} fill="currentColor" strokeWidth={0} />
              {result.streakExtended
                ? `${result.streak} night streak`
                : "Streak started — night 1"}
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
            {result.streakLost > 0 && (
              <div className="mt-5 rounded-2xl bg-fog-100 py-2.5 text-sm font-extrabold text-stone-400">
                Your {result.streakLost} night streak is gone
              </div>
            )}
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
