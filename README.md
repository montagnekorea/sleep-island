# 🌙 Sleep Island

A calm, Duolingo-inspired sleep gamification app built with Next.js (App Router) and Tailwind CSS.

Complete your daily wind-down tasks, earn saplings, and sleep to grow them into trees on your island. Skip your tasks and the lumberjack pays a visit. 🪓

## The loop

1. **Tasks** — complete at least 5 daily tasks to claim a sapling
2. **Rarity** — saplings roll Common (70%), Rare (25%) or Epic (5%)
3. **Sleep** — activate Sleep Mode on the home screen; 8 (simulated) hours later your saplings become trees
4. **Lumberjack** — sleep without doing your tasks and a random tree gets chopped down

Progress is stored in `localStorage` — no backend, no auth, no real sleep tracking.

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Deploy

Push to GitHub and import the repo at [vercel.com/new](https://vercel.com/new). No environment variables or extra configuration needed — Vercel detects Next.js automatically.
