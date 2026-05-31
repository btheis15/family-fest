export default function HomePage() {
  return (
    <div className="space-y-6 pt-6">
      <header className="space-y-2">
        <div className="text-4xl">🎉</div>
        <h1 className="text-2xl font-bold tracking-tight">Family Fest</h1>
        <p className="text-foreground/60">
          Plan the reunion, wrangle the crew, keep the memories — all in one
          place on your phone.
        </p>
      </header>

      <section className="grid grid-cols-2 gap-3">
        <Card emoji="🗓️" title="Schedule" body="The weekend at a glance." />
        <Card emoji="👨‍👩‍👧‍👦" title="Crew" body="Who's coming, who's bringing what." />
        <Card emoji="📸" title="Photos" body="One shared album for everyone." />
        <Card emoji="📍" title="Where" body="Address, map, and arrival notes." />
      </section>

      <section className="rounded-2xl bg-card p-4 ring-1 ring-border">
        <h2 className="text-sm font-semibold text-primary">Next up</h2>
        <p className="mt-1 text-sm text-foreground/70">
          This is a fresh scaffold. Tell me what Family Fest should actually do
          and I&rsquo;ll wire up the real features.
        </p>
      </section>
    </div>
  );
}

function Card({
  emoji,
  title,
  body,
}: {
  emoji: string;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-2xl bg-card p-4 ring-1 ring-border">
      <div className="text-2xl">{emoji}</div>
      <h3 className="mt-2 text-sm font-semibold">{title}</h3>
      <p className="mt-0.5 text-xs text-foreground/60">{body}</p>
    </div>
  );
}
