# Family Fest 2026 🏰

A mobile-first PWA for **Muskellunge Lake Resort Family Fest** — the one-week
family gathering at the lake. Schedule, who's coming, who's bringing what, a
shared photo album, and Venmo/Zelle pay links — installable to your phone.
**2026 theme: Renaissance / Fantasy** (parchment + heraldry + Roman-serif
titles), light mode only. Official title coming soon.

> **Live:** https://family-fest.vercel.app (Vercel) · https://btheis15.github.io/family-fest/ (Pages)
>
> **Status: read-only launch.** The browse experience is live (Home + countdown,
> Schedule + dinner head-chefs with tap-to-call/text, Crew/RSVP list, Photos
> gallery, Pay via Venmo/Zelle) against seed data in [`lib/data.ts`](lib/data.ts).
> Interactive features (sign-in, RSVP, photo upload) are gated behind a "coming
> soon" via the `READ_ONLY` flag in [`lib/features.ts`](lib/features.ts) until the
> Supabase backend lands. A persistent **"← Resort home"** link returns to the MLR
> app; MLR's Family Fest hub links here. See [CLAUDE.md](./CLAUDE.md) for the
> Drive / social / payment seams.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fbtheis15%2Ffamily-fest)

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind v4** — light-mode-only Renaissance/Fantasy theme tokens (parchment +
  heraldic wine/azure) as CSS variables via `@theme` in
  [`app/globals.css`](app/globals.css); Cinzel display serif via `next/font`
- **Framer Motion** for interactions
- **PWA** — standalone manifest, "Add to Home Screen" hint on iOS
- **Hosting** — live on **Vercel** + **GitHub Pages** (Pages auto-deploys on
  push to `main`; Vercel is currently manual via `vercel --prod`)

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
