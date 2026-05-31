import type { Dinner } from "@/lib/types";
import { formatDate } from "@/lib/format";

/**
 * The week's dinners: each night a few houses team up under a "head chef of the
 * day," with the menu, when/where to gather, and tap-to-call / tap-to-text
 * buttons for the chef. `tel:` and `sms:` links work on iPhone and Android —
 * the phone opens its dialer / messaging app with the chef's number filled in.
 */
export function DinnerCrew({ dinners }: { dinners: Dinner[] }) {
  return (
    <section className="space-y-2">
      <h2 className="text-sm font-semibold text-primary">Dinners & head chefs</h2>
      <p className="text-xs text-foreground/50">
        Each night a few houses team up. Tap to call or text the head chef of the day.
      </p>
      <ul className="space-y-2">
        {dinners.map((d) => (
          <li key={d.id} className="rounded-2xl bg-card p-3 ring-1 ring-border">
            <div className="flex items-start gap-3">
              <span className="text-2xl leading-none">{d.emoji}</span>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-foreground/50">{formatDate(d.day)}</p>
                <p className="text-sm font-semibold">{d.title}</p>
                <p className="mt-0.5 text-xs text-foreground/60">
                  🕖 {d.time} · 📍 {d.location}
                </p>
              </div>
            </div>

            <p className="mt-2 text-xs leading-relaxed text-foreground/70">{d.menu}</p>

            <div className="mt-2 flex flex-wrap gap-1.5">
              {d.houses.map((house) => (
                <span
                  key={house}
                  className="rounded-full bg-accent/10 px-2 py-0.5 text-[11px] font-medium text-accent"
                >
                  {house}
                </span>
              ))}
            </div>

            <div className="mt-3 flex items-center gap-2 border-t border-border pt-2">
              <div className="min-w-0 flex-1">
                <p className="text-[11px] uppercase tracking-wide text-foreground/40">
                  Head chef of the day
                </p>
                <p className="truncate text-sm font-medium">{d.chef.name}</p>
              </div>
              <div className="flex shrink-0 gap-1.5">
                <a
                  href={`tel:${d.chef.phone}`}
                  aria-label={`Call ${d.chef.name}`}
                  className="rounded-full bg-primary/10 px-3 py-2 text-sm text-primary"
                >
                  📞
                </a>
                <a
                  href={`sms:${d.chef.phone}`}
                  aria-label={`Text ${d.chef.name}`}
                  className="rounded-full bg-accent/10 px-3 py-2 text-sm text-accent"
                >
                  💬
                </a>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
