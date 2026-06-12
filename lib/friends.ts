import type { Tree } from "./game";

export interface Friend {
  id: string;
  name: string;
  handle: string;
  trees: Tree[];
}

function tree(id: string, rarity: Tree["rarity"]): Tree {
  return { id, rarity };
}

export const FRIENDS: Friend[] = [
  {
    id: "mina",
    name: "Mina",
    handle: "moonlitmina",
    trees: [
      tree("m1", "common"),
      tree("m2", "common"),
      tree("m3", "rare"),
      tree("m4", "common"),
      tree("m5", "epic"),
      tree("m6", "common"),
      tree("m7", "rare"),
    ],
  },
  {
    id: "jae",
    name: "Jae",
    handle: "jaedreams",
    trees: [tree("j1", "common"), tree("j2", "rare"), tree("j3", "common")],
  },
  {
    id: "sol",
    name: "Sol",
    handle: "solsleeps",
    trees: [
      tree("s1", "common"),
      tree("s2", "common"),
      tree("s3", "common"),
      tree("s4", "rare"),
      tree("s5", "rare"),
      tree("s6", "common"),
      tree("s7", "epic"),
      tree("s8", "common"),
      tree("s9", "common"),
      tree("s10", "rare"),
      tree("s11", "common"),
    ],
  },
  {
    id: "noa",
    name: "Noa",
    handle: "noanaps",
    trees: [],
  },
];
