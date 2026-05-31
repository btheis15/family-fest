# Family Fest 🎉

A mobile-first PWA for **Muskellunge Lake Resort Family Fest** — the one-week
family gathering at the lake. The schedule, who's coming, who's bringing what,
and a shared photo album — installable to your phone's home screen.

> **Status:** v1. Home (live countdown + headcount), Schedule (full week agenda
> + dinner head chefs with tap-to-call/text), Crew (RSVP + potluck, add-your-own
> persisted locally), Photos (shared album, local add-photo + share to
> Instagram/Facebook), and Pay (Venmo/Zelle to the organizers) are wired up
> against seed data in [`lib/data.ts`](lib/data.ts) — no backend yet. The whole
> app is public to browse; a name + email is only requested when you act (RSVP,
> add photos). The year-round resort app (`mlr-app`) embeds a Family Fest hub
> that links here. See [CLAUDE.md](./CLAUDE.md) for the Drive / social / payment
> integration seams.

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

## Activate login (Supabase email-OTP)

Passwordless email-code auth is **wired but dormant** until env vars point it at
a Supabase project (the app runs without it, falling back to on-device identity).
⭐ **Use the SAME Supabase project as `mlr-app`** so a person is one shared
account across both apps — the schema lives once in
[`mlr-app/supabase/schema.sql`](https://github.com/btheis15/mlr-app/blob/main/supabase/schema.sql)
(run it there). Then set the same two env vars here (see
[NEXT-STEPS.md §3](https://github.com/btheis15/mlr-app/blob/main/NEXT-STEPS.md)):

- Local: `cp .env.local.example .env.local` and fill in the values.
- CI/Pages: repo **Settings → Secrets and variables → Actions → Variables** →
  `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY` (same as mlr-app).

## Project layout

```
app/            App Router routes (page.tsx per tab) + layout + globals.css
components/     TabBar, InstallHint, IdentityProvider, shared UI
lib/            supabase.ts (shared client), format.ts, data.ts, types.ts
public/         manifest.webmanifest, icon.svg
```

## Where to make changes

- **Colors / theme** — the `@theme` block in [`app/globals.css`](app/globals.css).
  Editing a token (e.g. `--color-primary`) flows through every `bg-*`/`text-*`
  utility automatically.
- **Navigation** — the `TABS` array in [`components/TabBar.tsx`](components/TabBar.tsx).
- **A tab's content** — its `app/<tab>/page.tsx`.

See [CLAUDE.md](./CLAUDE.md) for the operating manual for AI sessions.
