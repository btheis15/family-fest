/**
 * Shared domain types for Family Fest. Keep all the event/crew/album shapes
 * here so pages and components agree on the data model (same split as the
 * Stock Game / Innjoy apps, which keep types in lib/types.ts).
 */

export type RsvpStatus = "yes" | "maybe" | "no";

/** The signed-in family member. Browsing is open to all; identity (name +
 *  email) is only needed to post / RSVP / add photos. No verification yet —
 *  a one-time-code step is the planned next layer. */
export interface User {
  name: string;
  email: string;
}

/** A single item on the weekend agenda. */
export interface ScheduleEvent {
  id: string;
  /** ISO date, YYYY-MM-DD. */
  day: string;
  /** 24h time, "HH:MM". */
  start: string;
  end?: string;
  title: string;
  location: string;
  emoji: string;
  description: string;
  /** Who's running this event — point of contact, tap-to-call/text (themed
   *  like the dinner head chefs). */
  lead?: Chef;
  /** Optional "what to bring" note, e.g. "a camp chair & your stories". */
  bring?: string;
}

/** A household coming (or not) to the fest. */
export interface CrewMember {
  id: string;
  /** Household / family name, e.g. "The Petersons". */
  name: string;
  /** How many people in this household. */
  headcount: number;
  status: RsvpStatus;
  /** Potluck assignment — what they're bringing. */
  bringing?: string;
}

/** A tile in the shared album. Placeholder art uses a gradient + emoji so the
 *  album looks alive without shipping binary image assets. */
export interface Memory {
  id: string;
  caption: string;
  /** Tailwind gradient utility classes for the placeholder tile. */
  gradient: string;
  emoji: string;
}

/** Whoever's running a given night's dinner. Contact is rendered as tap-to-call
 *  / tap-to-text links that work on iOS and Android. This info will come from a
 *  Google Drive file — see the note in lib/data.ts. */
export interface Chef {
  name: string;
  /** E.164 phone, e.g. "+17155550112" — used for tel: and sms: links. */
  phone: string;
}

/** One night's dinner: the head chef of the day (point of contact), the houses
 *  on the crew, what's being made, and when/where to gather. */
export interface Dinner {
  id: string;
  /** ISO date, YYYY-MM-DD. */
  day: string;
  title: string;
  emoji: string;
  /** The "head chef of the day" — the point of contact, tap-to-call/text. */
  chef: Chef;
  /** The 2–3 houses (families) teaming up to cook this night, including the
   *  head chef's. */
  houses: string[];
  /** What's on the menu. */
  menu: string;
  /** When to gather, e.g. "6:00 PM". */
  time: string;
  /** Where to meet, e.g. "Lakeside Pavilion". */
  location: string;
}

/** A notice shown in the banner at the top of the app (e.g. "Dinner moved from
 *  5 to 6"). Seeded today; the intent is a Google-Drive-fed source — see
 *  lib/announcements.ts. */
export interface Announcement {
  id: string;
  severity: "info" | "alert";
  title: string;
  body?: string;
  /** ISO timestamp. */
  ts: string;
}

/** Someone to pay for the fest (organizer, food lead, etc.) via Venmo/Zelle. */
export interface Payee {
  id: string;
  name: string;
  role: string;
  /** Venmo username without the leading @, e.g. "Linda-Peterson". */
  venmo?: string;
  /** Zelle handle — an email or phone the recipient has registered with Zelle. */
  zelle?: string;
}
