"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  isWindowOpen,
  nightKey,
  previousNight,
  type NightKey,
} from "@/lib/time";

export type Rarity = "common" | "rare" | "epic" | "legendary" | "mythical";

export type IslandType = "forest" | "beach" | "mountain";

export const TREE_VARIANTS = 3;

export interface Sapling {
  id: string;
  rarity: Rarity;
}

export interface Tree {
  id: string;
  rarity: Rarity;
  variant: number;
}

export interface DailyTask {
  id: string;
  label: string;
}

export const DAILY_TASKS: DailyTask[] = [
  { id: "exercise", label: "Exercise during the day" },
  { id: "eat-healthy", label: "Eat healthy meals" },
  { id: "supplements", label: "Take sleep supplements" },
  { id: "no-caffeine", label: "No caffeine after 2pm" },
  { id: "no-screens", label: "Avoid screens before bed" },
  { id: "sleep-on-time", label: "Sleep on time" },
];

export const TASK_GOAL = 5;

export const RARITY_INFO: Record<Rarity, { label: string; badge: string }> = {
  common: { label: "Common", badge: "bg-moss-100 text-moss-700" },
  rare: { label: "Rare", badge: "bg-rare-400/15 text-rare-500" },
  epic: { label: "Epic", badge: "bg-epic-400/15 text-epic-500" },
  legendary: { label: "Legendary", badge: "bg-legend-400/15 text-legend-500" },
  mythical: { label: "Mythical", badge: "bg-myth-400/15 text-myth-500" },
};

/** Streak length at which the luck bonus is fully maxed out. */
export const STREAK_LUCK_CAP = 30;

/** Odds at streak 0, and the extra percentage points a maxed streak adds. */
const ODDS_BASE: Record<Exclude<Rarity, "common">, number> = {
  mythical: 1,
  legendary: 4,
  epic: 10,
  rare: 25,
};
const ODDS_BONUS: Record<Exclude<Rarity, "common">, number> = {
  mythical: 4,
  legendary: 8,
  epic: 12,
  rare: 5,
};

/**
 * Percentage odds for each rarity at a given streak, always summing to 100.
 * The rare tiers scale up with the streak and common absorbs the difference,
 * so a 30-night streak turns a 1% mythical into a 5% one.
 */
export function rarityOdds(streak: number): Record<Rarity, number> {
  const boost = Math.min(Math.max(streak, 0), STREAK_LUCK_CAP) / STREAK_LUCK_CAP;
  const mythical = ODDS_BASE.mythical + ODDS_BONUS.mythical * boost;
  const legendary = ODDS_BASE.legendary + ODDS_BONUS.legendary * boost;
  const epic = ODDS_BASE.epic + ODDS_BONUS.epic * boost;
  const rare = ODDS_BASE.rare + ODDS_BONUS.rare * boost;
  return {
    mythical,
    legendary,
    epic,
    rare,
    common: 100 - mythical - legendary - epic - rare,
  };
}

export function rollRarity(streak = 0): Rarity {
  const odds = rarityOdds(streak);
  const r = Math.random() * 100;
  if (r < odds.mythical) return "mythical";
  if (r < odds.mythical + odds.legendary) return "legendary";
  if (r < odds.mythical + odds.legendary + odds.epic) return "epic";
  if (r < odds.mythical + odds.legendary + odds.epic + odds.rare) return "rare";
  return "common";
}

export function islandCapacity(treeCount: number): number {
  return [7, 19, 37].find((c) => c > treeCount) ?? 37;
}

export type SleepResult =
  | { kind: "growth"; grown: Tree[]; streak: number; streakExtended: boolean }
  | { kind: "lumberjack"; removed: Tree | null; streakLost: number };

interface GameContextValue {
  ready: boolean;
  now: Date;
  username: string;
  completedTasks: string[];
  saplings: Sapling[];
  trees: Tree[];
  claimedToday: boolean;
  islandType: IslandType;
  streak: number;
  bestStreak: number;
  windowOpen: boolean;
  sleptTonight: boolean;
  canSleep: boolean;
  previewMode: boolean;
  toggleTask: (id: string) => void;
  claimSapling: () => Sapling | null;
  sleep: () => SleepResult | null;
  setUsername: (name: string) => void;
  setIslandType: (type: IslandType) => void;
  setPreviewMode: (on: boolean) => void;
  cycleTreeVariant: (id: string) => void;
  removeTree: (id: string) => void;
  resetProgress: () => void;
}

const GameContext = createContext<GameContextValue | null>(null);

const STORAGE_KEY = "sleep-island-save-v1";

/** How often the provider re-checks the clock for window / night rollovers. */
const TICK_MS = 20_000;

function makeId(): string {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

export function GameProvider({ children }: { children: ReactNode }) {
  const [username, setUsernameState] = useState("Guest");
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [saplings, setSaplings] = useState<Sapling[]>([]);
  const [trees, setTrees] = useState<Tree[]>([]);
  const [claimedToday, setClaimedToday] = useState(false);
  const [islandType, setIslandTypeState] = useState<IslandType>("forest");
  const [storedStreak, setStoredStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [lastSleepNight, setLastSleepNight] = useState<NightKey | null>(null);
  const [taskNight, setTaskNight] = useState<NightKey | null>(null);
  const [previewMode, setPreviewModeState] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), TICK_MS);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        if (typeof saved.username === "string" && saved.username) {
          setUsernameState(saved.username);
        }
        if (Array.isArray(saved.completedTasks)) setCompletedTasks(saved.completedTasks);
        if (Array.isArray(saved.saplings)) setSaplings(saved.saplings);
        if (Array.isArray(saved.trees)) {
          // older saves have trees without a variant — default them to 0
          setTrees(
            saved.trees.map((t: Tree) => ({
              ...t,
              variant: typeof t.variant === "number" ? t.variant : 0,
            }))
          );
        }
        if (typeof saved.claimedToday === "boolean") setClaimedToday(saved.claimedToday);
        if (
          saved.islandType === "forest" ||
          saved.islandType === "beach" ||
          saved.islandType === "mountain"
        ) {
          setIslandTypeState(saved.islandType);
        }
        // fields below arrived with streaks — saves from before that lack them
        if (typeof saved.streak === "number") setStoredStreak(saved.streak);
        if (typeof saved.bestStreak === "number") setBestStreak(saved.bestStreak);
        if (typeof saved.lastSleepNight === "string") setLastSleepNight(saved.lastSleepNight);
        if (typeof saved.taskNight === "string") setTaskNight(saved.taskNight);
        if (typeof saved.previewMode === "boolean") setPreviewModeState(saved.previewMode);
      }
    } catch {
      // corrupted save — start fresh
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        username,
        completedTasks,
        saplings,
        trees,
        claimedToday,
        islandType,
        streak: storedStreak,
        bestStreak,
        lastSleepNight,
        taskNight,
        previewMode,
      })
    );
  }, [
    hydrated,
    username,
    completedTasks,
    saplings,
    trees,
    claimedToday,
    islandType,
    storedStreak,
    bestStreak,
    lastSleepNight,
    taskNight,
    previewMode,
  ]);

  const currentNight = useMemo(() => nightKey(now), [now]);

  // A stored streak only stands if the last sleep was tonight or last night;
  // any older and nights were missed, so the streak is already broken.
  const streak = useMemo(() => {
    if (!lastSleepNight) return 0;
    if (lastSleepNight === currentNight) return storedStreak;
    if (lastSleepNight === previousNight(currentNight)) return storedStreak;
    return 0;
  }, [lastSleepNight, currentNight, storedStreak]);

  // Tasks belong to a night, so they clear themselves when the night rolls over
  // at 2am — even if the app was left open across the boundary.
  useEffect(() => {
    if (!hydrated) return;
    if (taskNight === currentNight) return;
    setCompletedTasks([]);
    setClaimedToday(false);
    setTaskNight(currentNight);
  }, [hydrated, currentNight, taskNight]);

  const windowOpen = isWindowOpen(now);
  const sleptTonight = lastSleepNight === currentNight;
  // preview mode only waives the clock — one sleep per night still holds, or
  // trees could be farmed by tapping the button repeatedly
  const canSleep = hydrated && (windowOpen || previewMode) && !sleptTonight;

  const toggleTask = (id: string) => {
    setCompletedTasks((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const claimSapling = (): Sapling | null => {
    if (claimedToday || completedTasks.length < TASK_GOAL) return null;
    const sapling: Sapling = { id: makeId(), rarity: rollRarity(streak) };
    setSaplings((prev) => [...prev, sapling]);
    setClaimedToday(true);
    return sapling;
  };

  const sleep = (): SleepResult | null => {
    const at = new Date();
    const night = nightKey(at);
    // guard the mechanic itself, not just the button
    if ((!isWindowOpen(at) && !previewMode) || lastSleepNight === night) return null;

    const goalMet = completedTasks.length >= TASK_GOAL;
    const streakExtended = lastSleepNight === previousNight(night);
    let result: SleepResult;

    if (goalMet) {
      const nextStreak = streakExtended ? streak + 1 : 1;
      const pending = [...saplings];
      // earned but unclaimed sapling still counts — auto-claim it
      if (!claimedToday) pending.push({ id: makeId(), rarity: rollRarity(streak) });
      const grown: Tree[] = pending.map((s) => ({
        id: s.id,
        rarity: s.rarity,
        variant: Math.floor(Math.random() * TREE_VARIANTS),
      }));
      setTrees((prev) => [...prev, ...grown]);
      setStoredStreak(nextStreak);
      setBestStreak((prev) => Math.max(prev, nextStreak));
      result = { kind: "growth", grown, streak: nextStreak, streakExtended };
    } else {
      let removed: Tree | null = null;
      if (trees.length > 0) {
        const victim = trees[Math.floor(Math.random() * trees.length)];
        removed = victim;
        setTrees((prev) => prev.filter((t) => t.id !== victim.id));
      }
      setStoredStreak(0);
      result = { kind: "lumberjack", removed, streakLost: streak };
    }

    setLastSleepNight(night);
    // a new day begins
    setSaplings([]);
    setCompletedTasks([]);
    setClaimedToday(false);
    setTaskNight(night);
    return result;
  };

  const setUsername = (name: string) => {
    const clean = name.trim().slice(0, 20);
    if (clean) setUsernameState(clean);
  };

  const setIslandType = (type: IslandType) => {
    setIslandTypeState(type);
  };

  const setPreviewMode = (on: boolean) => {
    setPreviewModeState(on);
  };

  const cycleTreeVariant = (id: string) => {
    setTrees((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, variant: (t.variant + 1) % TREE_VARIANTS } : t
      )
    );
  };

  const removeTree = (id: string) => {
    setTrees((prev) => prev.filter((t) => t.id !== id));
  };

  const resetProgress = () => {
    setCompletedTasks([]);
    setSaplings([]);
    setTrees([]);
    setClaimedToday(false);
    setStoredStreak(0);
    setBestStreak(0);
    setLastSleepNight(null);
    setTaskNight(nightKey(new Date()));
  };

  return (
    <GameContext.Provider
      value={{
        ready: hydrated,
        now,
        username,
        completedTasks,
        saplings,
        trees,
        claimedToday,
        islandType,
        streak,
        bestStreak,
        windowOpen,
        sleptTonight,
        canSleep,
        previewMode,
        toggleTask,
        claimSapling,
        sleep,
        setUsername,
        setIslandType,
        setPreviewMode,
        cycleTreeVariant,
        removeTree,
        resetProgress,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame(): GameContextValue {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used inside <GameProvider>");
  return ctx;
}
