const WAVES = [
  { x: 80, y: 90, o: 0.35, delay: "0s" },
  { x: 260, y: 60, o: 0.25, delay: "1.2s" },
  { x: 520, y: 110, o: 0.3, delay: "0.5s" },
  { x: 700, y: 70, o: 0.25, delay: "2s" },
  { x: 140, y: 260, o: 0.3, delay: "1.6s" },
  { x: 660, y: 300, o: 0.35, delay: "0.8s" },
  { x: 60, y: 460, o: 0.3, delay: "2.4s" },
  { x: 420, y: 520, o: 0.25, delay: "0.2s" },
  { x: 740, y: 520, o: 0.3, delay: "1.4s" },
  { x: 200, y: 650, o: 0.35, delay: "0.6s" },
  { x: 560, y: 700, o: 0.3, delay: "1.9s" },
  { x: 350, y: 760, o: 0.25, delay: "2.8s" },
];

export function Ocean() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-sea-200 via-sea-300 to-sea-400" />
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 800 800"
        preserveAspectRatio="xMidYMid slice"
      >
        <ellipse cx="200" cy="180" rx="180" ry="120" fill="rgba(255,255,255,0.05)" />
        <ellipse cx="620" cy="540" rx="220" ry="150" fill="rgba(255,255,255,0.05)" />
        <ellipse cx="430" cy="330" rx="260" ry="180" fill="rgba(255,255,255,0.04)" />
        {WAVES.map((w) => (
          <g key={`${w.x}-${w.y}`} transform={`translate(${w.x} ${w.y})`}>
            <path
              d="M-12 0 q4 -3 8 0 t8 0 t8 0"
              stroke="#ffffff"
              opacity={w.o}
              strokeWidth="1.8"
              fill="none"
              strokeLinecap="round"
              className="animate-bob"
              style={{ animationDelay: w.delay }}
            />
          </g>
        ))}
      </svg>
    </div>
  );
}
