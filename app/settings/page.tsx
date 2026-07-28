"use client";

import { useEffect, useState } from "react";
import { Mountain, TreePine, Umbrella } from "lucide-react";
import { useGame, type IslandType } from "@/lib/game";
import { WINDOW_CLOSE_HOUR, WINDOW_OPEN_HOUR, hourLabel } from "@/lib/time";
import { PageHeader } from "@/components/page-header";

const ISLAND_STYLES: Array<{
  type: IslandType;
  label: string;
  icon: typeof TreePine;
  blurb: string;
}> = [
  { type: "forest", label: "Forest", icon: TreePine, blurb: "Mossy meadows" },
  { type: "beach", label: "Beach", icon: Umbrella, blurb: "Sand, seals & gulls" },
  { type: "mountain", label: "Mountain", icon: Mountain, blurb: "Peaks, deer & birds" },
];

export default function SettingsPage() {
  const { username, setUsername, islandType, setIslandType, previewMode, setPreviewMode, resetProgress } =
    useGame();
  const [name, setName] = useState(username);
  const [saved, setSaved] = useState(false);
  const [confirmingReset, setConfirmingReset] = useState(false);

  useEffect(() => {
    setName(username);
  }, [username]);

  const canSave = name.trim().length > 0 && name.trim() !== username;

  const handleSave = () => {
    setUsername(name);
    setSaved(true);
  };

  const handleReset = () => {
    if (!confirmingReset) {
      setConfirmingReset(true);
      return;
    }
    resetProgress();
    setConfirmingReset(false);
  };

  return (
    <div>
      <PageHeader title="Settings" subtitle="Keep it simple, sleep well" />

      <section className="rounded-2xl bg-white p-5 shadow-sm">
        <label
          htmlFor="username"
          className="text-xs font-extrabold uppercase tracking-wider text-stone-400"
        >
          Username
        </label>
        <div className="mt-2.5 flex gap-2">
          <input
            id="username"
            value={name}
            maxLength={20}
            onChange={(e) => {
              setName(e.target.value);
              setSaved(false);
            }}
            className="min-w-0 flex-1 rounded-xl border border-stone-200 bg-fog-50 px-3.5 py-2.5 text-sm font-bold text-stone-700 outline-none transition focus:border-moss-400"
          />
          <button
            onClick={handleSave}
            disabled={!canSave}
            className={`rounded-xl px-4 text-sm font-extrabold transition ${
              canSave ? "bg-moss-500 text-white hover:bg-moss-600" : "bg-fog-200 text-stone-400"
            }`}
          >
            {saved ? "Saved ✓" : "Save"}
          </button>
        </div>
      </section>

      <section className="mt-4 rounded-2xl bg-white p-5 shadow-sm">
        <h2 className="text-xs font-extrabold uppercase tracking-wider text-stone-400">
          Island style
        </h2>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {ISLAND_STYLES.map(({ type, label, icon: Icon, blurb }) => {
            const active = islandType === type;
            return (
              <button
                key={type}
                onClick={() => setIslandType(type)}
                className={`flex flex-col items-center gap-1 rounded-xl border p-3 transition ${
                  active
                    ? "border-moss-400 bg-moss-100/70 text-moss-700"
                    : "border-stone-200 bg-white text-stone-400 hover:border-moss-200"
                }`}
              >
                <Icon size={18} />
                <span className="text-xs font-extrabold">{label}</span>
                <span className="text-[10px] font-semibold leading-tight">{blurb}</span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="mt-4 rounded-2xl bg-white p-5 shadow-sm">
        <h2 className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-stone-400">
          Preview mode
          <span className="rounded bg-epic-400/15 px-1.5 py-0.5 text-[10px] normal-case tracking-normal text-epic-500">
            (dev only)
          </span>
        </h2>
        <div className="mt-3 flex items-center gap-4">
          <p className="flex-1 text-xs font-semibold text-stone-400">
            Unlocks Sleep Mode outside the {hourLabel(WINDOW_OPEN_HOUR)}–
            {hourLabel(WINDOW_CLOSE_HOUR)} window so you can try the loop at any hour. You still
            only get one sleep per night.
          </p>
          <button
            type="button"
            role="switch"
            aria-checked={previewMode}
            aria-label="Preview mode"
            onClick={() => setPreviewMode(!previewMode)}
            className={`relative h-7 w-12 shrink-0 rounded-full transition ${
              previewMode ? "bg-epic-400" : "bg-fog-200"
            }`}
          >
            <span
              className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all ${
                previewMode ? "left-6" : "left-1"
              }`}
            />
          </button>
        </div>
      </section>

      <section className="mt-4 rounded-2xl bg-white p-5 shadow-sm">
        <h2 className="text-xs font-extrabold uppercase tracking-wider text-stone-400">
          Danger zone
        </h2>
        <p className="mt-2 text-xs font-semibold text-stone-400">
          Clears your tasks, saplings, streak and every tree on your island.
        </p>
        <button
          onClick={handleReset}
          onBlur={() => setConfirmingReset(false)}
          className={`mt-3.5 w-full rounded-xl border py-3 text-sm font-extrabold transition ${
            confirmingReset
              ? "border-red-300 bg-red-50 text-red-500"
              : "border-stone-200 bg-white text-stone-500 hover:border-red-200 hover:text-red-400"
          }`}
        >
          {confirmingReset ? "Tap again to confirm" : "Reset progress"}
        </button>
      </section>

      <p className="mt-8 text-center text-[11px] font-semibold text-sea-800/50">
        Sleep Island v0.3 — be kind to your trees 🌲
      </p>
    </div>
  );
}
