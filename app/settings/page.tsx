"use client";

import { useEffect, useState } from "react";
import { useGame } from "@/lib/game";
import { PageHeader } from "@/components/page-header";

export default function SettingsPage() {
  const { username, setUsername, resetProgress } = useGame();
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
          Danger zone
        </h2>
        <p className="mt-2 text-xs font-semibold text-stone-400">
          Clears your tasks, saplings and every tree on your island.
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

      <p className="mt-8 text-center text-[11px] font-semibold text-stone-300">
        Sleep Island v0.1 — be kind to your trees 🌲
      </p>
    </div>
  );
}
