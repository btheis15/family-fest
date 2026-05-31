/**
 * Shared domain types for Family Fest. Keep all the event/crew/album shapes
 * here so pages and components agree on the data model (same split as the
 * Stock Game / Innjoy apps, which keep types in lib/types.ts).
 */

export type RsvpStatus = "yes" | "maybe" | "no";

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

/** One night's dinner and its head chef. */
export interface Dinner {
  id: string;
  /** ISO date, YYYY-MM-DD. */
  day: string;
  title: string;
  emoji: string;
  chef: Chef;
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
