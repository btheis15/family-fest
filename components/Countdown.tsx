"use client";

import { useEffect, useState } from "react";

/**
 * Live countdown to the fest. Renders nothing meaningful on the server (returns
 * a stable placeholder) and starts ticking once mounted, to avoid hydration
 * mismatch on the time-sensitive numbers.
 */
export function Countdown({ target }: { target: string }) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const targetMs = new Date(`${target}T15:00:00`).getTime();
  const diff = now == null ? 0 : Math.max(0, targetMs - now);

  const days = Math.floor(diff / 86_400_000);
  const hours = Math.floor((diff % 86_400_000) / 3_600_000);
  const mins = Math.floor((diff % 3_600_000) / 60_000);
  const secs = Math.floor((diff % 60_000) / 1000);

  const started = now != null && diff === 0;

  return (
    <div className="grid grid-cols-4 gap-2">
      {started ? (
        <div className="col-span-4 rounded-2xl bg-primary/10 py-4 text-center text-lg font-bold text-primary">
          🎉 It&rsquo;s happening — welcome to the lake!
        </div>
      ) : (
        <>
          <Unit value={days} label="days" />
          <Unit value={hours} label="hrs" />
          <Unit value={mins} label="min" />
          <Unit value={secs} label="sec" />
        </>
      )}
    </div>
  );
}

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <div className="rounded-2xl bg-card py-3 text-center ring-1 ring-border">
      <div className="text-2xl font-bold tabular-nums text-primary">
        {value.toString().padStart(2, "0")}
      </div>
      <div className="text-[10px] uppercase tracking-wide text-foreground/50">
        {label}
      </div>
    </div>
  );
}
