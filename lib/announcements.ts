/**
 * Announcements — the notices shown in the banner at the top of the app
 * (e.g. "Dinner moved from 5 to 6 tonight").
 *
 * GOOGLE DRIVE SEAM: static seed data today. The intent is for the resort to
 * keep a Google Drive file of event updates, and for a change to that file to
 * surface here automatically. When that's wired up, only this module changes:
 * add a server route that reads the Drive file → Announcement[] and have
 * getAnnouncements() fetch it. The banner UI stays the same. (In the umbrella
 * mlr-app, admins push these from inside the app; here in the standalone Family
 * Fest app the banner is read-only.)
 */

import type { Announcement } from "./types";

export const ANNOUNCEMENTS: Announcement[] = [
  {
    id: "welcome",
    severity: "info",
    title: "Family Fest 2026 is coming 🎉",
    body: "Save the dates: July 11–18 at the lake. Check the schedule and see who's coming — RSVP and the shared album open soon.",
    ts: "2026-05-31T09:00:00Z",
  },
];

/** Active announcements, newest first. Async so a Drive-backed fetch is a
 *  drop-in later without changing call sites. */
export async function getAnnouncements(): Promise<Announcement[]> {
  return [...ANNOUNCEMENTS].sort((a, b) => b.ts.localeCompare(a.ts));
}
