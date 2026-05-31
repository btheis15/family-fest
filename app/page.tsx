import Link from "next/link";
import { FestStatus } from "@/components/FestStatus";
import { EVENT, SCHEDULE } from "@/lib/data";
import { formatDateLong, formatTime } from "@/lib/format";

/**
 * Home is intentionally lean — just the headline: where we are in the season
 * (FestStatus + the announcement banner in the layout) and what's next. Detail
 * lives on the tabs (Schedule, Dinners, Crew, Photos, Pay), so the front page
 * never feels overwhelming.
 */
export default function HomePage() {
  const nextEvent = SCHEDULE[0];
  const maps = `https://maps.google.com/?q=${encodeURIComponent(
    `${EVENT.location} ${EVENT.address}`,
  )}`;

  return (
    <div className="space-y-6 pt-6">
      <header className="space-y-3 text-center">
        <div className="overflow-hidden rounded-2xl ring-1 ring-border shadow-sm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/family-fest-2026.jpg"
            alt="Family Fest 2026 — Renaissance / Fantasy"
            className="block w-full"
          />
        </div>
        <h1 className="text-3xl font-bold tracking-tight">
          {EVENT.shortName} <span className="text-primary">2026</span>
        </h1>
        <div className="mx-auto inline-flex flex-col items-center gap-0.5 rounded-2xl border border-border bg-card px-4 py-2">
          <span className="font-display text-sm font-semibold uppercase tracking-[0.15em] text-primary">
            ⚜ {EVENT.theme} ⚜
          </span>
          <span className="text-[11px] text-foreground/50">{EVENT.themeNote}</span>
        </div>
        <p className="text-xs text-foreground/50">
          {formatDateLong(EVENT.startDate)} – {formatDateLong(EVENT.endDate)}
        </p>
        <a
          href={maps}
          target="_blank"
          rel="noreferrer"
          className="inline-block text-xs font-medium text-accent"
        >
          📍 {EVENT.location} · Get directions
        </a>
      </header>

      <FestStatus
        startDate={EVENT.startDate}
        endDate={EVENT.endDate}
        items={SCHEDULE}
        volunteerContact={EVENT.organizer}
      />

      <Link
        href="/schedule"
        className="block rounded-2xl bg-card p-4 ring-1 ring-border"
      >
        <h2 className="text-sm font-semibold text-primary">Next up</h2>
        <div className="mt-1 flex items-center gap-3">
          <span className="text-2xl">{nextEvent.emoji}</span>
          <div className="min-w-0">
            <p className="text-sm font-semibold">{nextEvent.title}</p>
            <p className="text-xs text-foreground/60">
              {formatDateLong(nextEvent.day)} · {formatTime(nextEvent.start)} ·{" "}
              {nextEvent.location}
            </p>
          </div>
        </div>
        <p className="mt-2 text-xs font-medium text-primary">See the full week →</p>
      </Link>
    </div>
  );
}
