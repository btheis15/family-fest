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
    id: "dinner-time-change",
    severity: "alert",
    title: "Tonight's dinner moved to 6:00 PM",
    body: "Dinner shifted from 5:00 to 6:00 so the fishing crew can make it back in time.",
    ts: "2026-07-13T14:00:00Z",
  },
];

/** Active announcements, newest first. Async so a Drive-backed fetch is a
 *  drop-in later without changing call sites. */
export async function getAnnouncements(): Promise<Announcement[]> {
  return [...ANNOUNCEMENTS].sort((a, b) => b.ts.localeCompare(a.ts));
}
