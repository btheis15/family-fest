"use client";

import { useEffect, useRef, useState } from "react";
import type { Memory } from "@/lib/types";

interface AddedPhoto {
  id: string;
  url: string;
  caption: string;
}

/**
 * Shared album. Seed tiles are gradient placeholders (no image binaries in the
 * repo); photos the user adds are held as in-memory object URLs for this
 * session. There's no backend yet, so added photos are device- and
 * session-local — the upload button is wired so the real share/upload is a
 * drop-in later.
 */
export function PhotosView({ seed }: { seed: Memory[] }) {
  const [added, setAdded] = useState<AddedPhoto[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Revoke object URLs on unmount to avoid leaking memory.
  useEffect(() => {
    return () => added.forEach((p) => URL.revokeObjectURL(p.url));
  }, [added]);

  const onPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    const next = files.map((file) => ({
      id: `local-${Date.now()}-${file.name}`,
      url: URL.createObjectURL(file),
      caption: "Just added",
    }));
    setAdded((prev) => [...next, ...prev]);
    e.target.value = "";
  };

  return (
    <div className="space-y-6 pt-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">Photos</h1>
        <p className="text-sm text-foreground/60">
          One shared album for the whole fest.
        </p>
      </header>

      <button
        onClick={() => inputRef.current?.click()}
        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-3 text-sm font-semibold text-white"
      >
        📷 Add photos
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={onPick}
        className="hidden"
      />

      {added.length > 0 && (
        <p className="rounded-xl bg-accent/10 px-3 py-2 text-xs text-foreground/70">
          Added photos stay on this device for now — a shared upload is coming.
        </p>
      )}

      <div className="grid grid-cols-2 gap-3">
        {added.map((p) => (
          <figure
            key={p.id}
            className="overflow-hidden rounded-2xl ring-1 ring-border"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.url} alt={p.caption} className="aspect-square w-full object-cover" />
            <figcaption className="bg-card px-2 py-1.5 text-xs text-foreground/70">
              {p.caption}
            </figcaption>
          </figure>
        ))}

        {seed.map((m) => (
          <figure
            key={m.id}
            className="overflow-hidden rounded-2xl ring-1 ring-border"
          >
            <div
              className={`flex aspect-square w-full items-center justify-center bg-gradient-to-br text-4xl ${m.gradient}`}
            >
              {m.emoji}
            </div>
            <figcaption className="bg-card px-2 py-1.5 text-xs text-foreground/70">
              {m.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
