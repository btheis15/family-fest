import { DinnerCrew } from "@/components/DinnerCrew";
import { DINNERS } from "@/lib/data";

export default function DinnersPage() {
  return (
    <div className="space-y-4 pt-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">Dinners</h1>
        <p className="text-sm text-foreground/60">
          Each night a few houses team up. Tap to call or text the head chef of the day.
        </p>
      </header>
      <DinnerCrew dinners={DINNERS} />
    </div>
  );
}
