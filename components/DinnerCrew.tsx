import type { Dinner } from "@/lib/types";
import { formatDate } from "@/lib/format";

/**
 * The week's dinners and their head chefs, each with tap-to-call / tap-to-text
 * buttons. `tel:` and `sms:` links work on both iPhone and Android — the phone
 * opens its dialer / messaging app with the chef's number filled in.
 */
export function DinnerCrew({ dinners }: { dinners: Dinner[] }) {
  return (
    <section className="space-y-2">
      <h2 className="text-sm font-semibold text-primary">Dinners & head chefs</h2>
      <p className="text-xs text-foreground/50">
        Tap to call or text the chef running each night.
      </p>
      <ul className="space-y-2">
        {dinners.map((d) => (
          <li
            key={d.id}
            className="flex items-center gap-3 rounded-2xl bg-card p-3 ring-1 ring-border"
          >
            <span className="text-2xl">{d.emoji}</span>
            <div className="min-w-0 flex-1">
              <p className="text-xs text-foreground/50">{formatDate(d.day)}</p>
              <p className="truncate text-sm font-semibold">{d.title}</p>
              <p className="truncate text-xs text-foreground/60">
                Head chef: {d.chef.name}
              </p>
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
          </li>
        ))}
      </ul>
    </section>
  );
}
