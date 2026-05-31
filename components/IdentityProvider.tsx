"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { User } from "@/lib/types";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import type { User as AuthUser } from "@supabase/supabase-js";

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
 * photos are all readable without signing in. Identity is only required to
 * *act* (RSVP, add a photo); those call `promptSignIn()`.
 *
 * Two modes, same public API:
 *  - **Supabase configured** (NEXT-STEPS.md §3): real **passwordless email-OTP**,
 *    session persisted on-device. Hydrated from the shared `profiles` row — the
 *    SAME account as the MLR app (one Supabase project for both).
 *  - **Not configured** (today, pre-backend): name + email on-device, no
 *    verification — unchanged legacy behavior.
 */
export function IdentityProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);
  const [prompting, setPrompting] = useState(false);

  const loadProfile = useCallback(async (authUser: AuthUser) => {
    if (!supabase) return;
    const meta = authUser.user_metadata ?? {};
    const { data: profile } = await supabase
      .from("profiles")
      .select("display_name, avatar_url, email_alerts")
      .eq("id", authUser.id)
      .maybeSingle();

    let row = profile;
    if (!row) {
      const seed = {
        id: authUser.id,
        email: authUser.email,
        display_name: (meta.name as string) ?? authUser.email?.split("@")[0] ?? "",
        email_alerts: (meta.email_alerts as boolean) ?? true,
      };
      const { data: created } = await supabase
        .from("profiles")
        .upsert(seed, { onConflict: "id" })
        .select("display_name, avatar_url, email_alerts")
        .maybeSingle();
      row = created ?? null;
    }

    setUser({
      id: authUser.id,
      name: row?.display_name || (meta.name as string) || authUser.email || "",
      email: authUser.email ?? "",
      emailAlerts: row?.email_alerts ?? true,
      avatarUrl: row?.avatar_url ?? undefined,
    });
  }, []);

  useEffect(() => {
    if (isSupabaseConfigured && supabase) {
      supabase.auth.getSession().then(({ data }) => {
        if (data.session?.user) void loadProfile(data.session.user);
        setReady(true);
      });
      const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) void loadProfile(session.user);
        else setUser(null);
      });
      return () => sub.subscription.unsubscribe();
    }
    // Device-only fallback (pre-backend) — unchanged behavior.
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    setReady(true);
  }, [loadProfile]);

  const persistLocal = (u: User) => {
    setUser(u);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    setPrompting(false);
  };

  const promptSignIn = () => {
    if (!user) setPrompting(true);
  };

  const signOut = async () => {
    if (isSupabaseConfigured && supabase) await supabase.auth.signOut();
    else localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  };

  if (!ready) return null;

  return (
    <IdentityContext.Provider value={{ user, promptSignIn, signOut }}>
      {children}
      {prompting &&
        !user &&
        (isSupabaseConfigured ? (
          <OtpSignIn onClose={() => setPrompting(false)} />
        ) : (
          <SignInSheet onSignIn={persistLocal} onClose={() => setPrompting(false)} />
        ))}
    </IdentityContext.Provider>
  );
}

/* ───────────────────────── Passwordless email-OTP sheet ─────────────────── */
function OtpSignIn({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<"email" | "code">("email");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const emailValid = name.trim().length > 1 && /\S+@\S+\.\S+/.test(email);
  const codeValid = /^\d{6}$/.test(code.trim());
  const cleanEmail = email.trim().toLowerCase();

  const sendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailValid || !supabase) return;
    setBusy(true);
    setError(null);
    const { error } = await supabase.auth.signInWithOtp({
      email: cleanEmail,
      options: { shouldCreateUser: true, data: { name: name.trim() } },
    });
    setBusy(false);
    if (error) setError(error.message);
    else setStep("code");
  };

  const verify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!codeValid || !supabase) return;
    setBusy(true);
    setError(null);
    const { error } = await supabase.auth.verifyOtp({
      email: cleanEmail,
      token: code.trim(),
      type: "email",
    });
    setBusy(false);
    if (error) setError(error.message);
    else onClose();
  };

  return (
    <Sheet onClose={onClose}>
      <div className="space-y-2 text-center">
        <div className="text-4xl">🎉</div>
        <h1 className="text-xl font-bold">
          {step === "email" ? "Join in" : "Check your email"}
        </h1>
        <p className="text-sm text-foreground/60">
          {step === "email"
            ? "Looking around is open to everyone. Add your name and email to RSVP, add photos, and bring a dish — we'll email you a code, no password."
            : `Enter the 6-digit code we sent to ${cleanEmail}.`}
        </p>
      </div>

      {step === "email" ? (
        <form onSubmit={sendCode} className="space-y-4">
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
          {error && <p className="text-center text-xs text-red-500">{error}</p>}
          <button
            type="submit"
            disabled={!emailValid || busy}
            className="w-full rounded-xl bg-primary py-3 text-sm font-semibold text-white disabled:opacity-40"
          >
            {busy ? "Sending…" : "Email me a code"}
          </button>
        </form>
      ) : (
        <form onSubmit={verify} className="space-y-4">
          <input
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
            placeholder="123456"
            inputMode="numeric"
            autoComplete="one-time-code"
            className="w-full rounded-xl bg-card px-3 py-3 text-center text-lg tracking-[0.4em] ring-1 ring-border outline-none focus:ring-2 focus:ring-primary"
          />
          {error && <p className="text-center text-xs text-red-500">{error}</p>}
          <button
            type="submit"
            disabled={!codeValid || busy}
            className="w-full rounded-xl bg-primary py-3 text-sm font-semibold text-white disabled:opacity-40"
          >
            {busy ? "Verifying…" : "Verify & enter"}
          </button>
          <button
            type="button"
            onClick={() => {
              setStep("email");
              setCode("");
              setError(null);
            }}
            className="w-full text-center text-xs text-foreground/40"
          >
            ← Use a different email
          </button>
        </form>
      )}
    </Sheet>
  );
}

/* ───────────── Device-only fallback (pre-backend, unchanged) ──────────────── */
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
    <Sheet onClose={onClose}>
      <div className="space-y-2 text-center">
        <div className="text-4xl">🎉</div>
        <h1 className="text-xl font-bold">Join in</h1>
        <p className="text-sm text-foreground/60">
          Looking around is open to everyone. Add your name and email to RSVP,
          add photos, and bring a dish — so it&rsquo;s tied to real family.
        </p>
      </div>
      <form onSubmit={submit} className="space-y-4">
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
          Email verification (one-time code) turns on once Supabase is
          configured — for now this just identifies you on this device.
        </p>
      </form>
    </Sheet>
  );
}

/** Shared bottom-sheet chrome for the sign-in flows. */
function Sheet({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 px-4 pb-6 sm:items-center">
      <div className="relative w-full max-w-sm space-y-4 rounded-3xl bg-background p-6 ring-1 ring-border">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 rounded-full px-1 text-foreground/40 hover:text-foreground"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}
