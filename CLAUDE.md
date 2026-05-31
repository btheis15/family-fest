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
| `/schedule` | [`app/schedule/page.tsx`](app/schedule/page.tsx) | Week agenda grouped by day ([`SCHEDULE`](lib/data.ts)) + dinner head chefs with tap-to-call/text ([`DinnerCrew`](components/DinnerCrew.tsx), [`DINNERS`](lib/data.ts)) |
| `/crew` | [`app/crew/page.tsx`](app/crew/page.tsx) | RSVP + potluck via [`CrewView`](components/CrewView.tsx); add-your-RSVP persists to `localStorage` |
| `/photos` | [`app/photos/page.tsx`](app/photos/page.tsx) | Shared album via [`PhotosView`](components/PhotosView.tsx); gradient seed tiles + local add-photo + share to Instagram/Facebook (Web Share API) |
| `/pay` | [`app/pay/page.tsx`](app/pay/page.tsx) | Pay organizers via Venmo (deep link) / Zelle (copy) — [`PayView`](components/PayView.tsx), [`PAYEES`](lib/data.ts) |

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

## Identity (on-demand, not a gate)

The whole app is **public to browse** — schedule, crew/RSVP list, and photos are
all readable without signing in.
[`components/IdentityProvider.tsx`](components/IdentityProvider.tsx) only asks
for name + email when you *act*: the RSVP form ([`CrewView`](components/CrewView.tsx))
and Add-photos ([`PhotosView`](components/PhotosView.tsx)) call `promptSignIn()`,
which opens a dismissible sheet. `useIdentity()` exposes
`{ user, promptSignIn, signOut }` (`user` is `null` while browsing).
(Pay just deep-links to Venmo/Zelle, so it stays open.)

**Auth is now real (passwordless email-OTP), env-gated.** When
[`lib/supabase.ts`](lib/supabase.ts) finds `NEXT_PUBLIC_SUPABASE_URL` /
`_ANON_KEY`, the sheet runs Supabase email-OTP (email → 6-digit code → persisted
session) and hydrates `user` from the shared `profiles` row — the SAME account
as `mlr-app` (one project for both; schema lives in `mlr-app/supabase/schema.sql`).
With no env it falls back to the legacy on-device sheet, unchanged. See the
README "Activate login" section.

## Backend / integration seams (planned)

Built UI-first; each swap point is isolated:

- **Announcement banner** — [`AnnouncementBanner`](components/AnnouncementBanner.tsx)
  shows event-change notices at the top of every page (e.g. "Dinner moved 5→6"),
  fed by [`getAnnouncements()`](lib/announcements.ts) — the same Google-Drive
  seam. Read-only here; in the umbrella `mlr-app`, admins push these in-app.
- **Dinner chef contacts** — [`DINNERS`](lib/data.ts) is the Google-Drive seam:
  replace with a server route that reads the Drive file → `Dinner[]`. Phones
  stay E.164 so `tel:`/`sms:` keep working.
- **Photo → social** — [`PhotosView`](components/PhotosView.tsx) uses the Web
  Share API (native sheet → Instagram/Facebook), falling back to
  `EVENT.facebookGroupUrl`. Posting *directly* into a FB group needs Meta app
  review + the Graph API and is a later add.
- **Pay** — [`PAYEES`](lib/data.ts) holds Venmo usernames / Zelle handles
  (placeholders today). No credentials in the app; buttons open Venmo / copy the
  Zelle handle so payment happens in the user's own app.
- **Shared photo uploads** and a cross-device album need a backend (same one the
  resort app would use).

## Keep this current

When you add a route, dependency, env var, or change the data model, update
this file and `README.md` in the same commit. Doc drift is the only failure
mode that makes these files harmful.
