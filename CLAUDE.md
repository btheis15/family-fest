# CLAUDE.md — family-fest

Entry point for Claude/AI sessions on this repo. Read this first.

## What this repo is

A **Next.js 16 + React 19 + Tailwind v4 PWA** for **Muskellunge Lake Resort
Family Fest** — the one-week-a-year family gathering at the lake. Mobile-first,
vertical, **light mode only**, themed **Renaissance / Fantasy** (2026 theme from
the poster; official title TBD): aged parchment, heraldic wine (`--color-primary`
`#8b2e2e`) + azure (`--color-accent`), with a Roman-inscription serif (Cinzel,
via next/font) on titles (`h1` + `.font-display`). Same conventions as the
author's other apps (`stock-game`, `innjoy-mobile`): App Router, CSS-variable
theme tokens, bottom `TabBar`, iOS install hint. Live on **Vercel**
(family-fest.vercel.app) + GitHub Pages; currently **read-only** (`lib/features.ts`
`READ_ONLY` gates RSVP / photo upload behind a "coming soon").

Family Fest is the deep, standalone experience for the event week. The
year-round resort app (`mlr-app`) embeds a `/family-fest` hub that mirrors these
highlights and links here — so the two read as "one app" without sharing a
backend yet.

**One-app feel via a shared "season"** — both apps share a **Family Fest season
model** ([`lib/festSeason.ts`](lib/festSeason.ts), mirrored byte-for-byte in the
`mlr-app` repo) so the fest reads as a *season of the resort* that rises and
recedes through the year across four phases ([`FestStatus`](components/FestStatus.tsx)
via [`useFestSeason`](lib/useFestSeason.ts), computed client-side so it's correct
on Pages and Vercel): **off-season** (countdown) → **planning** (from ~60 days
out: countdown + a "want to help plan?" tap-to-email/call to the
`EVENT.organizer` contact) →
**live** ("Day n of N + Today at the Fest") → **wrap** (2 weeks after: a "post
the photos you didn't get to" panel linking to `/photos`). The cross-nav names
the parent resort (`EVENT.resortName`) so this reads as a section of MLR, not a
separate app. The full code merge is still deferred to the Supabase phase
(NEXT-STEPS §0b).

**Data model:** there's no backend. Seed content (event window, schedule, crew,
album) lives in [`lib/data.ts`](lib/data.ts) with types in
[`lib/types.ts`](lib/types.ts). Anything the user adds at runtime (their RSVP,
photos) is layered on via `localStorage` / in-memory object URLs in the client
views, so it's device-local for now. Swap `lib/data.ts` for a real API later
without touching the pages.

## The tabs

| Route | File | Status |
|---|---|---|
| `/` | [`app/page.tsx`](app/page.tsx) | Home — **kept lean**: hero, season-aware status ([`FestStatus`](components/FestStatus.tsx): countdown → "Day n of N + today"), and a single "Next up" card. Everything else lives on the tabs so the front never feels overwhelming |
| `/schedule` | [`app/schedule/page.tsx`](app/schedule/page.tsx) | **High-level** week agenda grouped by day ([`SCHEDULE`](lib/data.ts)): time + title + location + who's in charge. Tap an event → **`/schedule/[id]`** detail ([`app/schedule/[id]/page.tsx`](app/schedule/[id]/page.tsx), `generateStaticParams`): description, what to bring, `lead` call/text |
| `/dinners` | [`app/dinners/page.tsx`](app/dinners/page.tsx) | **High-level** dinner list ([`DinnerCrew`](components/DinnerCrew.tsx), [`DINNERS`](lib/data.ts)) — each night's meal + who's the head chef. Tap a night → **`/dinners/[id]`** detail ([`app/dinners/[id]/page.tsx`](app/dinners/[id]/page.tsx), `generateStaticParams` for the export): menu, prep time/place, serve time/place, `houses` on crew, chef call/text |
| `/crew` | [`app/crew/page.tsx`](app/crew/page.tsx) | RSVP + potluck via [`CrewView`](components/CrewView.tsx); add-your-RSVP persists to `localStorage` |
| `/photos` | [`app/photos/page.tsx`](app/photos/page.tsx) | Shared album via [`PhotosView`](components/PhotosView.tsx); gradient seed tiles + local add-photo + share to Instagram/Facebook (Web Share API) |
| `/pay` | [`app/pay/page.tsx`](app/pay/page.tsx) | Pay organizers via Venmo (deep link) / Zelle (copy) — [`PayView`](components/PayView.tsx), [`PAYEES`](lib/data.ts) |

Bottom nav: [`components/TabBar.tsx`](components/TabBar.tsx) (the `TABS` array
is the single source of truth for routes + labels + icons).

## Conventions

- **Theme** — all colors are CSS variables in the `@theme` block of
  [`app/globals.css`](app/globals.css) (parchment + heraldic wine/azure). Tailwind
  v4 turns each `--color-*` into `bg-*` / `text-*` / `ring-*` / `border-*`. Never
  hard-code hex; add or edit a token. Titles use the Cinzel display serif
  (`--font-display`, loaded in `layout.tsx`); apply with `h1` or `.font-display`.
  - ⚠️ **LIGHT MODE ONLY — never add a dark theme.** And never use a dark
    translucent surface tint (`bg-black/NN`, `bg-zinc-*/NN`) as a card/panel bg —
    muddy grey on parchment (a recurring issue across the author's apps).
    Translucent layers stack LIGHT; `bg-black/NN` is OK only as a modal scrim.
- **Cross-nav** — the layout renders a persistent breadcrumb back to the MLR
  umbrella app that names it ("← Muskellunge Lake Resort", `EVENT.resortName` →
  `EVENT.resortAppUrl`), plus the theme tag — so Family Fest reads as a section
  of the resort.
- **Family Fest season** — [`lib/festSeason.ts`](lib/festSeason.ts) (mirrored in
  `mlr-app`) + the [`useFestSeason`](lib/useFestSeason.ts) client hook drive the
  run-up/live/after behavior; consumed by [`FestStatus`](components/FestStatus.tsx).
  Reads `EVENT.startDate` / `.endDate`.
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
`{ user, promptSignIn, signOut }` (`user` is `null` while browsing). Stored in
`localStorage`, no verification yet — the one-time-code step slots in here.
(Pay just deep-links to Venmo/Zelle, so it stays open.)

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
