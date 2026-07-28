"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Moon } from "lucide-react";
import { useGame } from "@/lib/game";
import {
  WINDOW_OPEN_HOUR,
  formatClock,
  formatCountdown,
  formatHour,
  msUntilWindowOpens,
} from "@/lib/time";

const PILL_TONES = {
  open: "bg-moss-100 text-moss-700",
  muted: "bg-fog-100 text-stone-400",
  preview: "bg-epic-400/15 text-epic-500",
} as const;

function Pill({
  tone,
  children,
}: {
  tone: keyof typeof PILL_TONES;
  children: ReactNode;
}) {
  return (
    <span
      className={`mt-2 flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-extrabold ${PILL_TONES[tone]}`}
    >
      {children}
    </span>
  );
}

export function LiveClock() {
  const { now: coarseNow, windowOpen, sleptTonight, previewMode, ready } = useGame();
  // the provider only ticks every 20s, so keep a local second-level clock
  // for the digits themselves
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  // render nothing until mounted — the server has no idea what time it is here
  if (!now || !ready) {
    return <div className="h-[4.5rem]" aria-hidden />;
  }

  return (
    <div className="flex flex-col items-center">
      <p
        className="text-5xl font-light tabular-nums tracking-tight text-stone-800"
        aria-label={`Current time ${formatClock(now)}`}
      >
        {formatClock(now)}
      </p>
      {sleptTonight ? (
        <Pill tone="muted">
          <Moon size={11} fill="currentColor" strokeWidth={0} />
          Slept for tonight
        </Pill>
      ) : windowOpen ? (
        <Pill tone="open">
          <Moon size={11} fill="currentColor" strokeWidth={0} />
          Sleep window open
        </Pill>
      ) : previewMode ? (
        <Pill tone="preview">Preview mode · window bypassed</Pill>
      ) : (
        <Pill tone="muted">
          Opens {formatHour(WINDOW_OPEN_HOUR)} · in{" "}
          {formatCountdown(msUntilWindowOpens(coarseNow))}
        </Pill>
      )}
    </div>
  );
}
