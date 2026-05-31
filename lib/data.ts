/**
 * Seed data for Family Fest. This is a client-only PWA (no backend yet), so the
 * agenda, crew, and album live here as static seed data; anything the user adds
 * at runtime (their RSVP, photos they snap) is layered on top via localStorage
 * in the client views. Swap this module for a real API later without touching
 * the pages.
 */

import type { CrewMember, Memory, ScheduleEvent } from "./types";

export const EVENT = {
  name: "Muskellunge Lake Resort Family Fest",
  shortName: "Family Fest",
  tagline: "One week. The whole family. The lake.",
  /** Saturday → Saturday, one week. */
  startDate: "2026-07-11",
  endDate: "2026-07-18",
  location: "Muskellunge Lake Resort",
  address: "N1234 Resort Rd, Northwoods, WI",
} as const;

/** The weekend agenda, in chronological order. */
export const SCHEDULE: ScheduleEvent[] = [
  {
    id: "arrival",
    day: "2026-07-11",
    start: "15:00",
    title: "Arrival & check-in",
    location: "Main Lodge",
    emoji: "🛻",
    description:
      "Roll in, grab your cabin keys at the lodge, and settle the kids. Coolers to the boathouse fridge.",
  },
  {
    id: "welcome-bonfire",
    day: "2026-07-11",
    start: "19:30",
    title: "Welcome bonfire & s'mores",
    location: "Lakeside fire pit",
    emoji: "🔥",
    description:
      "Kick off the week by the water. Marshmallows and firewood provided — bring a chair and your stories.",
  },
  {
    id: "pancake-breakfast",
    day: "2026-07-12",
    start: "08:00",
    end: "10:00",
    title: "Pancake breakfast",
    location: "Lodge deck",
    emoji: "🥞",
    description: "Grandpa's famous blueberry pancakes. Coffee's on by 7:30.",
  },
  {
    id: "pontoon-parade",
    day: "2026-07-12",
    start: "13:00",
    title: "Pontoon parade",
    location: "Main dock",
    emoji: "🛥️",
    description:
      "Deck out the pontoons and cruise the bay. Best-decorated boat wins the golden paddle.",
  },
  {
    id: "musky-tournament",
    day: "2026-07-13",
    start: "06:00",
    end: "12:00",
    title: "Musky fishing tournament",
    location: "North bay",
    emoji: "🎣",
    description:
      "The big one. Two-person boats, catch-and-release, biggest musky takes the trophy. Early start — coffee at the dock.",
  },
  {
    id: "kids-olympics",
    day: "2026-07-14",
    start: "10:00",
    title: "Kids' lake olympics",
    location: "Swim beach",
    emoji: "🏅",
    description:
      "Cannonball contest, sandcastle build-off, and the legendary tube relay.",
  },
  {
    id: "cousins-cookout",
    day: "2026-07-15",
    start: "17:30",
    title: "Cousins' cookout (potluck)",
    location: "Pavilion",
    emoji: "🍔",
    description:
      "Everyone brings a dish — see the Crew tab for who's got what. Grill fired up at 5.",
  },
  {
    id: "talent-show",
    day: "2026-07-16",
    start: "19:00",
    title: "Family talent show",
    location: "Lodge great room",
    emoji: "🎤",
    description:
      "Sign up at the lodge. Acts of all kinds welcome — the cheesier the better.",
  },
  {
    id: "group-photo",
    day: "2026-07-17",
    start: "11:00",
    title: "Big group photo",
    location: "Lodge front steps",
    emoji: "📸",
    description: "Everyone, all of us, matching-ish shirts. Don't be late!",
  },
  {
    id: "fireworks",
    day: "2026-07-17",
    start: "21:30",
    title: "Fireworks over the lake",
    location: "Lakeside lawn",
    emoji: "🎆",
    description: "The grand finale. Blankets out, lights down, look up.",
  },
  {
    id: "farewell-breakfast",
    day: "2026-07-18",
    start: "08:00",
    title: "Farewell breakfast & checkout",
    location: "Lodge deck",
    emoji: "👋",
    description: "One more coffee together before the road. Checkout by 11.",
  },
];

/** Households who've responded so far. The user can add their own in the app. */
export const CREW: CrewMember[] = [
  { id: "grandparents", name: "Grandma & Grandpa", headcount: 2, status: "yes", bringing: "Blueberry pancakes" },
  { id: "petersons", name: "The Petersons", headcount: 5, status: "yes", bringing: "Burgers & brats" },
  { id: "aunt-linda", name: "Aunt Linda", headcount: 1, status: "yes", bringing: "Famous potato salad" },
  { id: "the-js", name: "Jake & Maria", headcount: 4, status: "yes", bringing: "Corn on the cob" },
  { id: "uncle-rob", name: "Uncle Rob's crew", headcount: 3, status: "maybe", bringing: "Cooler of drinks" },
  { id: "the-coastals", name: "The California cousins", headcount: 4, status: "maybe" },
  { id: "sam", name: "Cousin Sam", headcount: 2, status: "yes", bringing: "Dessert (pies!)" },
  { id: "the-norths", name: "The Norths", headcount: 3, status: "no" },
];

/** Seed album tiles — gradient placeholders so the album looks alive without
 *  shipping image binaries. Real photos get added at runtime in the Photos view. */
export const MEMORIES: Memory[] = [
  { id: "m1", caption: "Sunset off the main dock", gradient: "from-amber-300 to-rose-400", emoji: "🌅" },
  { id: "m2", caption: "First musky of the trip", gradient: "from-teal-300 to-cyan-500", emoji: "🎣" },
  { id: "m3", caption: "Bonfire night", gradient: "from-orange-400 to-red-500", emoji: "🔥" },
  { id: "m4", caption: "Cannonball champs", gradient: "from-sky-300 to-blue-500", emoji: "💦" },
  { id: "m5", caption: "Pontoon parade winners", gradient: "from-fuchsia-300 to-purple-500", emoji: "🛥️" },
  { id: "m6", caption: "Grandpa's pancakes", gradient: "from-yellow-200 to-amber-400", emoji: "🥞" },
  { id: "m7", caption: "The whole gang", gradient: "from-lime-300 to-emerald-500", emoji: "👨‍👩‍👧‍👦" },
  { id: "m8", caption: "Fireworks finale", gradient: "from-indigo-400 to-violet-600", emoji: "🎆" },
];

/** Days of the fest as ISO strings, derived from the event window. */
export function eventDays(): string[] {
  const days: string[] = [];
  const start = new Date(EVENT.startDate + "T00:00:00");
  const end = new Date(EVENT.endDate + "T00:00:00");
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    days.push(d.toISOString().slice(0, 10));
  }
  return days;
}
