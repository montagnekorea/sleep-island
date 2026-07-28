# 🌙 Sleep Island

A calm, Duolingo-inspired sleep gamification app built with Next.js (App Router) and Tailwind CSS.

Complete your daily wind-down tasks, earn saplings, and sleep to grow them into trees on your island. Skip your tasks and the lumberjack pays a visit. 🪓

## The loop

1. **Tasks** — complete at least 5 of the 6 daily tasks to claim a sapling
2. **Rarity** — saplings roll Common / Rare / Epic / Legendary / Mythical, base odds 60 / 25 / 10 / 4 / 1
3. **Sleep** — Sleep Mode only unlocks between **10pm and 2am** on your device clock, once per night; 8 (simulated) hours later your saplings become trees
4. **Streak** — every consecutive night you sleep having met the goal extends your streak, and a longer streak tilts the odds toward the rare tiers (a 30-night streak turns a 1% mythical into a 5% one)
5. **Lumberjack** — sleep without doing your tasks and a random tree gets chopped down, and the streak resets

### What counts as a night

The sleep window straddles midnight, so a night is identified by the date it *started* on: the night of Jul 28 runs 10pm Jul 28 → 2am Jul 29. 2am is also when the daily tasks roll over.

Progress is stored in `localStorage` — no backend, no auth, no real sleep tracking.

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Deploy

Push to GitHub and import the repo at [vercel.com/new](https://vercel.com/new). No environment variables or extra configuration needed — Vercel detects Next.js automatically.
