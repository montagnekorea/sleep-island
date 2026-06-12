import type { IslandType, Tree } from "./game";

export interface Friend {
  id: string;
  name: string;
  handle: string;
  islandType: IslandType;
  trees: Tree[];
}

function tree(id: string, rarity: Tree["rarity"], variant = 0): Tree {
  return { id, rarity, variant };
}

export const FRIENDS: Friend[] = [
  {
    id: "mina",
    name: "Mina",
    handle: "moonlitmina",
    islandType: "forest",
    trees: [
      tree("m1", "common", 0),
      tree("m2", "common", 1),
      tree("m3", "rare", 2),
      tree("m4", "common", 0),
      tree("m5", "epic", 1),
      tree("m6", "common", 2),
      tree("m7", "rare", 0),
      tree("m8", "mythical", 1),
    ],
  },
  {
    id: "jae",
    name: "Jae",
    handle: "jaedreams",
    islandType: "beach",
    trees: [tree("j1", "common", 1), tree("j2", "rare", 2), tree("j3", "common", 0)],
  },
  {
    id: "sol",
    name: "Sol",
    handle: "solsleeps",
    islandType: "mountain",
    trees: [
      tree("s1", "common", 0),
      tree("s2", "common", 2),
      tree("s3", "common", 1),
      tree("s4", "rare", 0),
      tree("s5", "rare", 1),
      tree("s6", "common", 0),
      tree("s7", "legendary", 2),
      tree("s8", "common", 1),
      tree("s9", "common", 0),
      tree("s10", "rare", 2),
      tree("s11", "common", 1),
    ],
  },
  {
    id: "noa",
    name: "Noa",
    handle: "noanaps",
    islandType: "beach",
    trees: [],
  },
];
