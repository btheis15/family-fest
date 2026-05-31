"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { User } from "@/lib/types";

const STORAGE_KEY = "family-fest-user";

interface IdentityValue {
  user: User | null;
  /** Open the sign-in sheet on demand — call from any action that needs an
   *  identity (RSVP, add a photo, …). No-op if already signed in. */
  promptSignIn: () => void;
  signOut: () => void;
}

const IdentityContext = createContext<IdentityValue>({
  user: null,
  promptSignIn: () => {},
  signOut: () => {},
});

/** Read the signed-in family member from anywhere in the tree. */
export function useIdentity() {
  return useContext(IdentityContext);
}

/**
 * Identity, on-demand. The whole app is public to browse — schedule, crew, and
 * photos are all readable without signing in. Identity (name + email, stored
 * on-device) is only required to *do* things: RSVP, add a photo, etc. Those
 * actions call `promptSignIn()`, which opens a dismissible sign-in sheet.
 * There's no verification yet — a one-time code / magic link is the planned
 * next layer, and this is where it slots in (verify before calling persist).
 */
export function IdentityProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [prompting, setPrompting] = useState(false);

  useEffect(() => {
    // Hydrate any on-device identity after mount. We render the app immediately
    // (no blank gate); `user` starts null on server and first client render, so
    // there's no hydration mismatch — it just fills in.
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  const persist = (u: User) => {
    setUser(u);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    setPrompting(false);
  };

  const promptSignIn = () => {
    if (!user) setPrompting(true);
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };


  return (
    <IdentityContext.Provider value={{ user, promptSignIn, signOut }}>
      {children}
      {prompting && !user && (
        <SignInSheet onSignIn={persist} onClose={() => setPrompting(false)} />
      )}
    </IdentityContext.Provider>
  );
}

function SignInSheet({
  onSignIn,
  onClose,
}: {
  onSignIn: (u: User) => void;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const valid = name.trim().length > 1 && /\S+@\S+\.\S+/.test(email);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) return;
    onSignIn({ name: name.trim(), email: email.trim().toLowerCase() });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 px-4 pb-6 sm:items-center">
      <form
        onSubmit={submit}
        className="relative w-full max-w-sm space-y-4 rounded-3xl bg-background p-6 ring-1 ring-border"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 rounded-full px-1 text-foreground/40 hover:text-foreground"
        >
          ✕
        </button>
        <div className="space-y-2 text-center">
          <div className="text-4xl">🎉</div>
          <h1 className="text-xl font-bold">Join in</h1>
          <p className="text-sm text-foreground/60">
            Looking around is open to everyone. Add your name and email to RSVP,
            add photos, and bring a dish — so it&rsquo;s tied to real family.
          </p>
        </div>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          autoComplete="name"
          className="w-full rounded-xl bg-card px-3 py-3 text-sm ring-1 ring-border outline-none focus:ring-2 focus:ring-primary"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          type="email"
          autoComplete="email"
          className="w-full rounded-xl bg-card px-3 py-3 text-sm ring-1 ring-border outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          type="submit"
          disabled={!valid}
          className="w-full rounded-xl bg-primary py-3 text-sm font-semibold text-white disabled:opacity-40"
        >
          Continue
        </button>
        <p className="text-center text-xs text-foreground/40">
          Email verification (one-time code) is coming — for now this just
          identifies you on this device.
        </p>
      </form>
    </div>
  );
}
