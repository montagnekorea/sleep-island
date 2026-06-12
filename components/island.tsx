import { islandCapacity, type Tree } from "@/lib/game";
import { TreeIcon } from "./tree-icon";

export function Island({
  trees,
  compact = false,
}: {
  trees: Tree[];
  compact?: boolean;
}) {
  const capacity = islandCapacity(trees.length);
  const cols = Math.sqrt(capacity);
  const shown = trees.slice(0, capacity);

  return (
    <div className={compact ? "w-64" : "w-full"}>
      <div
        className={`grid rounded-[2.5rem] bg-gradient-to-b from-moss-300 to-moss-400 shadow-lg shadow-moss-600/25 ${
          compact ? "gap-1.5 p-3.5" : "gap-2 p-5"
        }`}
        style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
      >
        {Array.from({ length: capacity }).map((_, i) => {
          const tree = shown[i];
          return (
            <div
              key={tree ? tree.id : `plot-${i}`}
              className="flex aspect-square items-center justify-center rounded-xl bg-white/15"
            >
              {tree ? (
                <TreeIcon rarity={tree.rarity} className="h-[78%] w-[78%] animate-grow-in" />
              ) : (
                <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
