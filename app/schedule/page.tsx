import { SCHEDULE, eventDays } from "@/lib/data";
import { formatDateLong, formatTime } from "@/lib/format";

export default function SchedulePage() {
  const days = eventDays().filter((day) =>
    SCHEDULE.some((e) => e.day === day),
  );

  return (
    <div className="space-y-6 pt-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">Schedule</h1>
        <p className="text-sm text-foreground/60">The whole week, day by day.</p>
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
                <li
                  key={e.id}
                  className="flex gap-3 rounded-2xl bg-card p-4 ring-1 ring-border"
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
                    <p className="mt-1 text-xs text-foreground/70">
                      {e.description}
                    </p>
                    {e.bring && (
                      <p className="mt-1 text-xs text-foreground/60">
                        🎒 <span className="text-foreground/40">Bring:</span> {e.bring}
                      </p>
                    )}
                    {e.lead && (
                      <div className="mt-2 flex items-center gap-2 border-t border-border pt-2">
                        <p className="min-w-0 flex-1 truncate text-xs text-foreground/60">
                          <span className="text-foreground/40">In charge:</span>{" "}
                          {e.lead.name}
                        </p>
                        <a
                          href={`tel:${e.lead.phone}`}
                          aria-label={`Call ${e.lead.name}`}
                          className="rounded-full bg-primary/10 px-2.5 py-1.5 text-xs text-primary"
                        >
                          📞
                        </a>
                        <a
                          href={`sms:${e.lead.phone}`}
                          aria-label={`Text ${e.lead.name}`}
                          className="rounded-full bg-accent/10 px-2.5 py-1.5 text-xs text-accent"
                        >
                          💬
                        </a>
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
