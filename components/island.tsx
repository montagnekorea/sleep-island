"use client";

import { islandCapacity, type IslandType, type Tree } from "@/lib/game";
import { RARITY_GLOW, TreeGlyph } from "./tree-icon";

const DIRECTIONS: Array<[number, number]> = [
  [1, 0],
  [1, -1],
  [0, -1],
  [-1, 0],
  [-1, 1],
  [0, 1],
];

function hexSlots(capacity: number): Array<[number, number]> {
  const rings = capacity >= 37 ? 3 : capacity >= 19 ? 2 : 1;
  const slots: Array<[number, number]> = [[0, 0]];
  for (let k = 1; k <= rings; k++) {
    let q = -k;
    let r = k;
    for (let side = 0; side < 6; side++) {
      for (let step = 0; step < k; step++) {
        slots.push([q, r]);
        q += DIRECTIONS[side][0];
        r += DIRECTIONS[side][1];
      }
    }
  }
  return slots;
}

function hexPoints(cx: number, cy: number, size: number): string {
  const pts: string[] = [];
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 180) * (60 * i - 30);
    pts.push(
      `${(cx + size * Math.cos(angle)).toFixed(2)},${(cy + size * Math.sin(angle)).toFixed(2)}`
    );
  }
  return pts.join(" ");
}

function pos(angleDeg: number, radius: number): [number, number] {
  const rad = (angleDeg * Math.PI) / 180;
  return [160 + radius * Math.cos(rad), 160 + radius * Math.sin(rad)];
}

const THEMES: Record<IslandType, { ground: string; tileEven: string; tileOdd: string }> = {
  forest: { ground: "#cfdbc3", tileEven: "#b7c9a6", tileOdd: "#adc19c" },
  beach: { ground: "#ecdfc0", tileEven: "#e9d9b4", tileOdd: "#e1cfa6" },
  mountain: { ground: "#c4ccc0", tileEven: "#b3bfae", tileOdd: "#a8b5a3" },
};

function Cabin({ x, y, beach = false }: { x: number; y: number; beach?: boolean }) {
  const body = beach ? "#e0c187" : "#a8845f";
  const roof = beach ? "#cd9d62" : "#7c624a";
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="-7" y="-4" width="14" height="10" rx="1.5" fill={body} />
      <path d="M-9 -3 L0 -11 L9 -3 Z" fill={roof} />
      <rect x="-2" y="0" width="4" height="6" rx="1" fill="#6b5949" />
    </g>
  );
}

function Bird({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="animate-bob" style={{ animationDelay: "0.4s" }}>
        <circle cx="0" cy="0" r="2.8" fill="#7d93a8" />
        <path d="M-1 -0.5 q 2.6 -2 3.8 0.6" stroke="#69809a" strokeWidth="1" fill="none" />
        <path d="M2.6 -0.4 l2.4 0.9 -2.4 0.9 Z" fill="#d9a05b" />
        <circle cx="0.8" cy="-1" r="0.5" fill="#37414b" />
      </g>
    </g>
  );
}

function Deer({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="animate-bob" style={{ animationDelay: "0.9s" }}>
        <rect x="-6" y="-3" width="10" height="6" rx="3" fill="#a3835f" />
        <rect x="-5" y="2" width="2" height="4" rx="1" fill="#8a6d4e" />
        <rect x="1" y="2" width="2" height="4" rx="1" fill="#8a6d4e" />
        <rect x="3" y="-8" width="3" height="6" rx="1.5" fill="#a3835f" />
        <circle cx="5.2" cy="-8.5" r="2.6" fill="#ab8b66" />
        <path
          d="M4 -10.5 L3 -13.5 M6.2 -10.5 L7.4 -13.5"
          stroke="#6b5949"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <circle cx="6" cy="-9" r="0.5" fill="#37414b" />
      </g>
    </g>
  );
}

function Seagull({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <g className="animate-bob" style={{ animationDelay: "1.5s" }}>
        <path
          d="M-6 0 Q-3 -3.5 0 0 Q3 -3.5 6 0"
          stroke="#f7f8f5"
          strokeWidth="1.8"
          fill="none"
          strokeLinecap="round"
        />
      </g>
    </g>
  );
}

function Seal({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <ellipse cx="0" cy="5" rx="12" ry="2" fill="rgba(255,255,255,0.25)" />
      <g className="animate-bob" style={{ animationDelay: "1.1s" }}>
        <ellipse cx="0" cy="0" rx="9" ry="4.5" fill="#9aa7ad" />
        <circle cx="-8" cy="-3" r="3.5" fill="#a4b0b6" />
        <path d="M8 -1 L12 -4 L12 2 Z" fill="#9aa7ad" />
        <circle cx="-9" cy="-3.5" r="0.6" fill="#3f4a4f" />
      </g>
    </g>
  );
}

function Starfish({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path
        d="M0 -4 L1.2 -1.2 L4 -1 L1.8 0.9 L2.5 3.6 L0 2 L-2.5 3.6 L-1.8 0.9 L-4 -1 L-1.2 -1.2 Z"
        fill="#d98f73"
      />
    </g>
  );
}

const WAVES = [
  { d: "M34 60 q4 -3 8 0 t8 0", delay: "0s" },
  { d: "M262 84 q4 -3 8 0 t8 0", delay: "0.9s" },
  { d: "M36 222 q4 -3 8 0 t8 0", delay: "1.7s" },
  { d: "M250 240 q4 -3 8 0 t8 0", delay: "2.4s" },
];

export function Island({
  trees,
  islandType = "forest",
  compact = false,
  onTreeClick,
}: {
  trees: Tree[];
  islandType?: IslandType;
  compact?: boolean;
  onTreeClick?: (tree: Tree) => void;
}) {
  const capacity = islandCapacity(trees.length);
  const rings = capacity >= 37 ? 3 : capacity >= 19 ? 2 : 1;
  const slots = hexSlots(capacity);
  const size = 96 / (1.732 * rings + 1.25);
  const theme = THEMES[islandType];
  const shown = trees.slice(0, capacity);

  const [cabinX, cabinY] = pos(35, 86);
  const [deerX, deerY] = pos(145, 84);
  const [starX, starY] = pos(145, 99);

  return (
    <div className={compact ? "w-72" : "w-full"}>
      <svg viewBox="0 0 320 320" className="block h-auto w-full drop-shadow-lg">
        {/* water */}
        <rect width="320" height="320" rx="44" fill="#9cc0c7" />
        <circle cx="160" cy="160" r="132" fill="rgba(255,255,255,0.07)" />
        <circle
          cx="160"
          cy="160"
          r="118"
          fill="none"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="1.5"
          className="tf-center animate-ripple"
        />
        <circle
          cx="160"
          cy="160"
          r="126"
          fill="none"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="1.5"
          className="tf-center animate-ripple"
          style={{ animationDelay: "2.2s" }}
        />
        {WAVES.map((w) => (
          <path
            key={w.d}
            d={w.d}
            stroke="rgba(255,255,255,0.5)"
            strokeWidth="1.6"
            fill="none"
            strokeLinecap="round"
            className="animate-bob"
            style={{ animationDelay: w.delay }}
          />
        ))}

        {/* coastline */}
        <circle cx="160" cy="160" r="113" fill="#e7ddc1" opacity="0.45" />
        <circle cx="160" cy="160" r="105" fill="#e2d4b2" />
        <circle cx="160" cy="160" r="96" fill={theme.ground} />

        {/* mountains ring the tiles on mountain islands */}
        {islandType === "mountain" &&
          [195, 230, 270, 310, 345].map((deg, i) => {
            const [mx, my] = pos(deg, 84);
            const s = i % 2 === 0 ? 1 : 0.78;
            return (
              <g key={deg} transform={`translate(${mx} ${my}) scale(${s})`}>
                <path d="M-16 10 L0 -16 L16 10 Z" fill="#97a294" />
                <path d="M-8 10 L4 -8 L16 10 Z" fill="#8a968a" opacity="0.8" />
                <path d="M-5 -8 L0 -16 L5 -8 Z" fill="#f3f5f0" />
              </g>
            );
          })}

        {/* hex plots */}
        {slots.map(([q, r], i) => {
          const cx = 160 + size * 1.732 * (q + r / 2);
          const cy = 160 + size * 1.5 * r;
          const tree = shown[i];
          const interactive = Boolean(tree && onTreeClick);
          return (
            <g
              key={tree ? tree.id : `plot-${i}`}
              onClick={tree && onTreeClick ? () => onTreeClick(tree) : undefined}
              className={interactive ? "cursor-pointer" : undefined}
            >
              <polygon
                points={hexPoints(cx, cy, size * 0.94)}
                fill={i % 2 === 0 ? theme.tileEven : theme.tileOdd}
                stroke="rgba(255,255,255,0.38)"
                strokeWidth="1.2"
              />
              {tree ? (
                <svg
                  x={cx - size * 0.75}
                  y={cy - size * 0.85}
                  width={size * 1.5}
                  height={size * 1.5}
                  viewBox="0 0 24 24"
                  className={`tf-center animate-grow-in${RARITY_GLOW[tree.rarity]}`}
                >
                  <TreeGlyph rarity={tree.rarity} variant={tree.variant} />
                </svg>
              ) : (
                <circle cx={cx} cy={cy} r={Math.max(1.6, size * 0.09)} fill="rgba(255,255,255,0.4)" />
              )}
            </g>
          );
        })}

        {/* residents */}
        <Cabin x={cabinX} y={cabinY} beach={islandType === "beach"} />
        {islandType !== "beach" && <Bird x={cabinX + 1} y={cabinY - 14} />}
        {islandType !== "beach" && <Deer x={deerX} y={deerY} />}
        {islandType === "beach" && (
          <>
            <Starfish x={starX} y={starY} />
            <Seal x={52} y={252} />
            <Seagull x={60} y={48} />
            <Seagull x={84} y={62} scale={0.7} />
          </>
        )}
      </svg>
    </div>
  );
}
