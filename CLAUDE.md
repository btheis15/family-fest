# CLAUDE.md — family-fest

Entry point for Claude/AI sessions on this repo. Read this first.

## What this repo is

A **Next.js 16 + React 19 + Tailwind v4 PWA** for organizing a family
gathering. Mobile-first, vertical, warm/festive light theme. Same conventions
as the author's other apps (`stock-game`, `innjoy-mobile`): App Router, CSS-
variable theme tokens, bottom `TabBar`, iOS install hint, Vercel auto-deploy on
push to `main`.

**This is an early scaffold** — the feature tabs are placeholders. Before
building features, confirm with the user what Family Fest should actually do
(it could be event scheduling, RSVP/headcount, potluck assignments, a shared
album, travel coordination, or some mix).

## The tabs

| Route | File | Status |
|---|---|---|
| `/` | [`app/page.tsx`](app/page.tsx) | Landing — hero + feature cards |
| `/schedule` | [`app/schedule/page.tsx`](app/schedule/page.tsx) | Placeholder (`ComingSoon`) |
| `/crew` | [`app/crew/page.tsx`](app/crew/page.tsx) | Placeholder (`ComingSoon`) |
| `/photos` | [`app/photos/page.tsx`](app/photos/page.tsx) | Placeholder (`ComingSoon`) |

Bottom nav: [`components/TabBar.tsx`](components/TabBar.tsx) (the `TABS` array
is the single source of truth for routes + labels + icons).

## Conventions

- **Theme** — all colors are CSS variables in the `@theme` block of
  [`app/globals.css`](app/globals.css). Tailwind v4 turns each `--color-*` into
  `bg-*` / `text-*` / `ring-*` / `border-*` utilities. Never hard-code hex in
  components; add or edit a token.
- **Formatting** — dates/numbers/currency go through
  [`lib/format.ts`](lib/format.ts). Add new formatters there.
- **`@/*`** path alias maps to repo root (see `tsconfig.json`).
- **`npm install`** relies on `.npmrc` (`legacy-peer-deps=true`).
- Client components (`TabBar`, `InstallHint`) carry `"use client"`.

## Keep this current

When you add a route, dependency, env var, or change the data model, update
this file and `README.md` in the same commit. Doc drift is the only failure
mode that makes these files harmful.
