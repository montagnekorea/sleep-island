"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

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

export const RARITY_INFO: Record<
  Rarity,
  { label: string; chance: string; badge: string }
> = {
  common: { label: "Common", chance: "60%", badge: "bg-moss-100 text-moss-700" },
  rare: { label: "Rare", chance: "25%", badge: "bg-rare-400/15 text-rare-500" },
  epic: { label: "Epic", chance: "10%", badge: "bg-epic-400/15 text-epic-500" },
  legendary: {
    label: "Legendary",
    chance: "4%",
    badge: "bg-legend-400/15 text-legend-500",
  },
  mythical: {
    label: "Mythical",
    chance: "1%",
    badge: "bg-myth-400/15 text-myth-500",
  },
};

export function rollRarity(): Rarity {
  const r = Math.random();
  if (r < 0.01) return "mythical";
  if (r < 0.05) return "legendary";
  if (r < 0.15) return "epic";
  if (r < 0.4) return "rare";
  return "common";
}

export function islandCapacity(treeCount: number): number {
  return [7, 19, 37].find((c) => c > treeCount) ?? 37;
}

export type SleepResult =
  | { kind: "growth"; grown: Tree[] }
  | { kind: "lumberjack"; removed: Tree | null };

interface GameContextValue {
  username: string;
  completedTasks: string[];
  saplings: Sapling[];
  trees: Tree[];
  claimedToday: boolean;
  islandType: IslandType;
  toggleTask: (id: string) => void;
  claimSapling: () => Sapling | null;
  sleep: () => SleepResult;
  setUsername: (name: string) => void;
  setIslandType: (type: IslandType) => void;
  cycleTreeVariant: (id: string) => void;
  removeTree: (id: string) => void;
  resetProgress: () => void;
}

const GameContext = createContext<GameContextValue | null>(null);

const STORAGE_KEY = "sleep-island-save-v1";

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
  const [hydrated, setHydrated] = useState(false);

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
      })
    );
  }, [hydrated, username, completedTasks, saplings, trees, claimedToday, islandType]);

  const toggleTask = (id: string) => {
    setCompletedTasks((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const claimSapling = (): Sapling | null => {
    if (claimedToday || completedTasks.length < TASK_GOAL) return null;
    const sapling: Sapling = { id: makeId(), rarity: rollRarity() };
    setSaplings((prev) => [...prev, sapling]);
    setClaimedToday(true);
    return sapling;
  };

  const sleep = (): SleepResult => {
    const goalMet = completedTasks.length >= TASK_GOAL;
    let result: SleepResult;

    if (goalMet) {
      const pending = [...saplings];
      // earned but unclaimed sapling still counts — auto-claim it
      if (!claimedToday) pending.push({ id: makeId(), rarity: rollRarity() });
      const grown: Tree[] = pending.map((s) => ({
        id: s.id,
        rarity: s.rarity,
        variant: Math.floor(Math.random() * TREE_VARIANTS),
      }));
      setTrees((prev) => [...prev, ...grown]);
      result = { kind: "growth", grown };
    } else {
      let removed: Tree | null = null;
      if (trees.length > 0) {
        const victim = trees[Math.floor(Math.random() * trees.length)];
        removed = victim;
        setTrees((prev) => prev.filter((t) => t.id !== victim.id));
      }
      result = { kind: "lumberjack", removed };
    }

    // a new day begins
    setSaplings([]);
    setCompletedTasks([]);
    setClaimedToday(false);
    return result;
  };

  const setUsername = (name: string) => {
    const clean = name.trim().slice(0, 20);
    if (clean) setUsernameState(clean);
  };

  const setIslandType = (type: IslandType) => {
    setIslandTypeState(type);
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
  };

  return (
    <GameContext.Provider
      value={{
        username,
        completedTasks,
        saplings,
        trees,
        claimedToday,
        islandType,
        toggleTask,
        claimSapling,
        sleep,
        setUsername,
        setIslandType,
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
