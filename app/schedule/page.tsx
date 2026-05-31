import Link from "next/link";
import { SCHEDULE, eventDays } from "@/lib/data";
import { formatDateLong, formatTime } from "@/lib/format";

/**
 * The week at a glance — high-level only: time, what it is, where, and who's in
 * charge. The fuller story (description, what to bring, the lead's call/text)
 * lives on each event's click-through detail page (app/schedule/[id]).
 */
export default function SchedulePage() {
  const days = eventDays().filter((day) =>
    SCHEDULE.some((e) => e.day === day),
  );

  return (
    <div className="space-y-6 pt-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">Schedule</h1>
        <p className="text-sm text-foreground/60">
          The whole week, day by day. Tap any event for the details.
        </p>
      </header>

      {days.map((day) => {
        const events = SCHEDULE.filter((e) => e.day === day).sort((a, b) =>
          a.start.localeCompare(b.start),
        );
        return (
          <section key={day} className="space-y-3">
            <h2 className="sticky top-0 bg-background/90 py-1 text-sm font-semibold text-primary backdrop-blur">
              {formatDateLong(day)}
            </h2>
            <ul className="space-y-3">
              {events.map((e) => (
                <li key={e.id}>
                  <Link
                    href={`/schedule/${e.id}`}
                    className="flex gap-3 rounded-2xl bg-card p-4 ring-1 ring-border transition-shadow hover:shadow-sm"
                  >
                    <div className="text-2xl">{e.emoji}</div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline justify-between gap-2">
                        <h3 className="truncate text-sm font-semibold">{e.title}</h3>
                        <span className="shrink-0 text-xs font-medium text-accent">
                          {formatTime(e.start)}
                          {e.end ? `–${formatTime(e.end)}` : ""}
                        </span>
                      </div>
                      <p className="text-xs text-foreground/50">📍 {e.location}</p>
                      {e.lead && (
                        <p className="mt-0.5 truncate text-xs text-foreground/60">
                          In charge: {e.lead.name}
                        </p>
                      )}
                    </div>
                    <span className="self-center text-foreground/30">›</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
