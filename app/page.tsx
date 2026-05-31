"use client";

import { useEffect } from "react";

// Family Fest is now a built-in section of the Muskellunge Lake Resort app —
// this standalone app is retired. Vercel redirects every path at the edge (see
// vercel.json); this is the client-side fallback (e.g. the static Pages build)
// and a friendly "we've moved" card.
const DEST = "https://mlr-app-omega.vercel.app/family-fest";

export default function MovedPage() {
  useEffect(() => {
    window.location.replace(DEST);
  }, []);

  return (
    <div className="space-y-4 pt-16 text-center">
      <div className="text-5xl">🏰</div>
      <h1 className="text-2xl font-bold tracking-tight">Family Fest has moved</h1>
      <p className="text-sm text-foreground/70">
        It&rsquo;s now built right into the Muskellunge Lake Resort app. Taking
        you there&hellip;
      </p>
      <a
        href={DEST}
        className="inline-block rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white"
      >
        Open the resort app →
      </a>
    </div>
  );
}
