import Link from "next/link";
import { Countdown } from "@/components/Countdown";
import { CREW, EVENT, SCHEDULE } from "@/lib/data";
import { formatDateLong, formatTime } from "@/lib/format";

export default function HomePage() {
  const goingHeadcount = CREW.filter((c) => c.status === "yes").reduce(
    (sum, c) => sum + c.headcount,
    0,
  );
  const householdsIn = CREW.filter((c) => c.status === "yes").length;
  const nextEvent = SCHEDULE[0];

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
        <p className="text-sm text-foreground/70">{EVENT.tagline}</p>
        <p className="text-xs text-foreground/50">
          {EVENT.location} · {formatDateLong(EVENT.startDate)} –{" "}
          {formatDateLong(EVENT.endDate)}
        </p>
      </header>

      <Countdown target={EVENT.startDate} />

      <section className="grid grid-cols-2 gap-3">
        <Stat value={`${goingHeadcount}`} label="people coming" emoji="🙌" />
        <Stat value={`${householdsIn}`} label="households in" emoji="🏡" />
      </section>

      <Link
        href="/schedule"
        className="block rounded-2xl bg-card p-4 ring-1 ring-border"
      >
        <h2 className="text-sm font-semibold text-primary">First up</h2>
        <div className="mt-1 flex items-center gap-3">
          <span className="text-2xl">{nextEvent.emoji}</span>
          <div>
            <p className="text-sm font-semibold">{nextEvent.title}</p>
            <p className="text-xs text-foreground/60">
              {formatDateLong(nextEvent.day)} · {formatTime(nextEvent.start)} ·{" "}
              {nextEvent.location}
            </p>
          </div>
        </div>
      </Link>

      <section className="grid grid-cols-2 gap-3">
        <NavCard href="/schedule" emoji="🗓️" title="Schedule" body="The whole week at a glance." />
        <NavCard href="/crew" emoji="👨‍👩‍👧‍👦" title="Crew" body="Who's coming & who's bringing what." />
        <NavCard href="/photos" emoji="📸" title="Photos" body="One shared album for everyone." />
        <Where />
      </section>
    </div>
  );
}

function Stat({ value, label, emoji }: { value: string; label: string; emoji: string }) {
  return (
    <div className="rounded-2xl bg-card p-4 ring-1 ring-border">
      <div className="text-2xl">{emoji}</div>
      <div className="mt-1 text-2xl font-bold text-primary">{value}</div>
      <div className="text-xs text-foreground/60">{label}</div>
    </div>
  );
}

function NavCard({
  href,
  emoji,
  title,
  body,
}: {
  href: string;
  emoji: string;
  title: string;
  body: string;
}) {
  return (
    <Link href={href} className="rounded-2xl bg-card p-4 ring-1 ring-border">
      <div className="text-2xl">{emoji}</div>
      <h3 className="mt-2 text-sm font-semibold">{title}</h3>
      <p className="mt-0.5 text-xs text-foreground/60">{body}</p>
    </Link>
  );
}

function Where() {
  const maps = `https://maps.google.com/?q=${encodeURIComponent(
    `${EVENT.location} ${EVENT.address}`,
  )}`;
  return (
    <a
      href={maps}
      target="_blank"
      rel="noreferrer"
      className="rounded-2xl bg-card p-4 ring-1 ring-border"
    >
      <div className="text-2xl">📍</div>
      <h3 className="mt-2 text-sm font-semibold">Where</h3>
      <p className="mt-0.5 text-xs text-foreground/60">{EVENT.address}</p>
    </a>
  );
}
