# CLAUDE.md — family-fest

Entry point for Claude/AI sessions on this repo. Read this first.

## What this repo is

A **Next.js 16 + React 19 + Tailwind v4 PWA** for **Muskellunge Lake Resort
Family Fest** — the one-week-a-year family gathering at the lake. Mobile-first,
vertical, warm/festive light theme. Same conventions as the author's other apps
(`stock-game`, `innjoy-mobile`): App Router, CSS-variable theme tokens, bottom
`TabBar`, iOS install hint, Vercel auto-deploy on push to `main`.

Family Fest is the deep, standalone experience for the event week. The
year-round resort app (`mlr-app`) embeds a `/family-fest` hub that mirrors these
highlights and links here — so the two read as "one app" without sharing a
backend yet.

**Data model:** there's no backend. Seed content (event window, schedule, crew,
album) lives in [`lib/data.ts`](lib/data.ts) with types in
[`lib/types.ts`](lib/types.ts). Anything the user adds at runtime (their RSVP,
photos) is layered on via `localStorage` / in-memory object URLs in the client
views, so it's device-local for now. Swap `lib/data.ts` for a real API later
without touching the pages.

## The tabs

| Route | File | Status |
|---|---|---|
| `/` | [`app/page.tsx`](app/page.tsx) | Home — hero, live countdown, headcount, "first up", quick links |
| `/schedule` | [`app/schedule/page.tsx`](app/schedule/page.tsx) | Full week agenda grouped by day ([`SCHEDULE`](lib/data.ts)) |
| `/crew` | [`app/crew/page.tsx`](app/crew/page.tsx) | RSVP + potluck via [`CrewView`](components/CrewView.tsx); add-your-RSVP persists to `localStorage` |
| `/photos` | [`app/photos/page.tsx`](app/photos/page.tsx) | Shared album via [`PhotosView`](components/PhotosView.tsx); gradient seed tiles + local add-photo |

Bottom nav: [`components/TabBar.tsx`](components/TabBar.tsx) (the `TABS` array
is the single source of truth for routes + labels + icons).

## Conventions

- **Theme** — all colors are CSS variables in the `@theme` block of
  [`app/globals.css`](app/globals.css). Tailwind v4 turns each `--color-*` into
  `bg-*` / `text-*` / `ring-*` / `border-*` utilities. Never hard-code hex in
  components; add or edit a token.
- **Formatting** — dates/numbers/times go through
  [`lib/format.ts`](lib/format.ts) (`formatDateLong`, `formatTime`, `daysUntil`,
  …). Add new formatters there.
- **`@/*`** path alias maps to repo root (see `tsconfig.json`).
- **`npm install`** relies on `.npmrc` (`legacy-peer-deps=true`).
- Client components (`TabBar`, `InstallHint`, `Countdown`, `CrewView`,
  `PhotosView`) carry `"use client"`; pages stay server components and pass seed
  data in as props.

## Keep this current

When you add a route, dependency, env var, or change the data model, update
this file and `README.md` in the same commit. Doc drift is the only failure
mode that makes these files harmful.
