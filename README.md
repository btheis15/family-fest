# Family Fest 🎉

A mobile-first PWA for **Muskellunge Lake Resort Family Fest** — the one-week
family gathering at the lake. The schedule, who's coming, who's bringing what,
and a shared photo album — installable to your phone's home screen.

> **Status:** v1. Home (live countdown + headcount), Schedule (full week
> agenda), Crew (RSVP + potluck, add-your-own persisted locally), and Photos
> (shared album with local add-photo) are wired up against seed data in
> [`lib/data.ts`](lib/data.ts) — no backend yet. The year-round resort app
> (`mlr-app`) embeds a Family Fest hub that links here.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fbtheis15%2Ffamily-fest)

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind v4** (theme tokens as CSS variables via `@theme` in
  [`app/globals.css`](app/globals.css))
- **Framer Motion** for interactions
- **PWA** — standalone manifest, "Add to Home Screen" hint on iOS
- **Vercel** — auto-deploy on push to `main`

## Quick start

```bash
npm install            # .npmrc already sets legacy-peer-deps
npm run dev            # http://localhost:3000
```

## Project layout

```
app/            App Router routes (page.tsx per tab) + layout + globals.css
components/     TabBar, InstallHint, shared UI
lib/            format.ts and other pure helpers
public/         manifest.webmanifest, icon.svg
```

## Where to make changes

- **Colors / theme** — the `@theme` block in [`app/globals.css`](app/globals.css).
  Editing a token (e.g. `--color-primary`) flows through every `bg-*`/`text-*`
  utility automatically.
- **Navigation** — the `TABS` array in [`components/TabBar.tsx`](components/TabBar.tsx).
- **A tab's content** — its `app/<tab>/page.tsx`.

See [CLAUDE.md](./CLAUDE.md) for the operating manual for AI sessions.
