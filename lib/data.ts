/**
 * Seed data for Family Fest. This is a client-only PWA (no backend yet), so the
 * agenda, crew, and album live here as static seed data; anything the user adds
 * at runtime (their RSVP, photos they snap) is layered on top via localStorage
 * in the client views. Swap this module for a real API later without touching
 * the pages.
 */

import type { CrewMember, Dinner, Memory, Payee, ScheduleEvent } from "./types";

export const EVENT = {
  name: "Muskellunge Lake Resort Family Fest",
  shortName: "Family Fest",
  tagline: "One week. The whole clan. The lake.",
  /** 2026 theme (from the poster). The official title is still TBD. */
  theme: "Renaissance · Fantasy",
  themeNote: "Official title coming soon",
  /** Monday → Friday. */
  startDate: "2026-07-27",
  endDate: "2026-07-31",
  location: "Muskellunge Lake Resort",
  address: "N1234 Resort Rd, Northwoods, WI",
  /** Shared Facebook group — used as the fallback target for photo sharing. */
  facebookGroupUrl: "https://www.facebook.com/groups/your-family-fest-group",
  /** Umbrella resort app (MLR) — the "back to the resort" cross-link target. */
  resortAppUrl: "https://mlr-app-omega.vercel.app",
  /** The parent resort. Family Fest is its flagship event, so the cross-nav
   *  names it explicitly — the fest reads as a section of the resort, not a
   *  separate app. */
  resortName: "Muskellunge Lake Resort",
  /** Volunteer / planning contact, surfaced during the "planning" season so
   *  people can reach out to help (tap-to-email / tap-to-call). A real point of
   *  contact for now; this moves to the Committees feature once there's a
   *  backend (NEXT-STEPS §5c). Phone is E.164 so tel:/sms: work everywhere. */
  organizer: {
    name: "Brian Theis",
    email: "brian.theis15@gmail.com",
    phone: "+12248005389",
  },
} as const;

/** The weekend agenda, in chronological order. */
export const SCHEDULE: ScheduleEvent[] = [
  {
    id: "arrival",
    day: "2026-07-27",
    start: "15:00",
    title: "Arrival & check-in",
    location: "Main Lodge",
    emoji: "🛻",
    description:
      "Roll in, grab your cabin keys at the lodge, and settle the kids. Coolers to the boathouse fridge.",
    lead: { name: "Steward Eadric of House Larkspur", phone: "+17155550140" },
    bring: "Your cabin confirmation & a cooler for the boathouse fridge.",
  },
  {
    id: "welcome-bonfire",
    day: "2026-07-27",
    start: "19:30",
    title: "Welcome bonfire & s'mores",
    location: "Lakeside fire pit",
    emoji: "🔥",
    description:
      "Kick off the week by the water. Marshmallows and firewood provided — bring a chair and your stories.",
    lead: { name: "Baron Aldric of House Thornwood", phone: "+17155550127" },
    bring: "A camp chair & your best lake stories.",
  },
  {
    id: "pancake-breakfast",
    day: "2026-07-28",
    start: "08:00",
    end: "10:00",
    title: "Pancake breakfast",
    location: "Lodge deck",
    emoji: "🥞",
    description: "Grandpa's famous blueberry pancakes. Coffee's on by 7:30.",
    lead: { name: "Master Tobias of House Fenwick", phone: "+17155550141" },
    bring: "Just an appetite (and your favorite syrup, if you're picky).",
  },
  {
    id: "pontoon-parade",
    day: "2026-07-28",
    start: "13:00",
    title: "Pontoon parade",
    location: "Main dock",
    emoji: "🛥️",
    description:
      "Deck out the pontoons and cruise the bay. Best-decorated boat wins the golden paddle.",
    lead: { name: "Captain Rowan of House Eldermoor", phone: "+17155550142" },
    bring: "Decorations for your boat & plenty of sunscreen.",
  },
  {
    id: "musky-tournament",
    day: "2026-07-29",
    start: "06:00",
    end: "12:00",
    title: "Musky fishing tournament",
    location: "North bay",
    emoji: "🎣",
    description:
      "The big one. Two-person boats, catch-and-release, biggest musky takes the trophy. Early start — coffee at the dock.",
    lead: { name: "Master Bartholomew of House Eldermoor", phone: "+17155550129" },
    bring: "Rod, reel, a thermos — and a partner for your boat.",
  },
  {
    id: "kids-olympics",
    day: "2026-07-29",
    start: "10:00",
    title: "Kids' lake olympics",
    location: "Swim beach",
    emoji: "🏅",
    description:
      "Cannonball contest, sandcastle build-off, and the legendary tube relay.",
    lead: { name: "Lady Wynne of House Larkspur", phone: "+17155550143" },
    bring: "Swimsuit, towel, and a competitive spirit.",
  },
  {
    id: "cousins-cookout",
    day: "2026-07-30",
    start: "17:30",
    title: "Cousins' cookout (potluck)",
    location: "Pavilion",
    emoji: "🍔",
    description:
      "Everyone brings a dish — see the Crew tab for who's got what. Grill fired up at 5.",
    lead: { name: "Goodwife Maren of House Hollowbrook", phone: "+17155550130" },
    bring: "A dish to share — check the Crew board so we don't get six potato salads.",
  },
  {
    id: "talent-show",
    day: "2026-07-30",
    start: "19:00",
    title: "Family talent show",
    location: "Lodge great room",
    emoji: "🎤",
    description:
      "Sign up at the lodge. Acts of all kinds welcome — the cheesier the better.",
    lead: { name: "Bard Percival of House Wyndmere", phone: "+17155550144" },
    bring: "An act to perform — sign up at the lodge by noon.",
  },
  {
    id: "group-photo",
    day: "2026-07-31",
    start: "11:00",
    title: "Big group photo",
    location: "Lodge front steps",
    emoji: "📸",
    description: "Everyone, all of us, matching-ish shirts. Don't be late!",
    lead: { name: "Dame Cecily of House Brightwater", phone: "+17155550128" },
    bring: "Your matching-ish shirt — and be on the steps by 11 sharp.",
  },
  {
    id: "fireworks",
    day: "2026-07-31",
    start: "21:30",
    title: "Fireworks over the lake",
    location: "Lakeside lawn",
    emoji: "🎆",
    description: "The grand finale. Blankets out, lights down, look up.",
    lead: { name: "Sir Reginald of House Pemberlye", phone: "+17155550131" },
    bring: "A blanket and a spot on the lawn — dinner's right before at 6.",
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

/**
 * Each night's dinner and its head chef, with a phone for tap-to-call / text.
 *
 * GOOGLE DRIVE SEAM: this is exactly the kind of info the resort keeps in a
 * Drive file. When that's wired up, replace this constant with a fetch from a
 * server route that reads the Drive file (API or published CSV/JSON) and maps
 * rows → Dinner[]. Phone numbers stay in E.164 so the tel:/sms: links keep
 * working. Nothing in DinnerCrew (the UI) changes.
 *
 * The entries below are ILLUSTRATIVE demo content — Renaissance/Fantasy "house"
 * names, made-up 555 phone numbers, and sample menus — to show how a fully
 * assigned week reads (head chef of the day + the houses on crew + menu +
 * when/where). Swap in the real families, chefs, and numbers when they're set.
 */
export const DINNERS: Dinner[] = [
  {
    id: "d-mon",
    day: "2026-07-27",
    title: "The Welcoming Feast",
    emoji: "🔥",
    chef: { name: "Baron Aldric of House Thornwood", phone: "+17155550127" },
    houses: ["House Thornwood", "The Ravenshire Clan", "House Larkspur"],
    menu: "Flame-charred sausages & beef rounds of the realm, fire-roasted corn, and the Baron's legendary potato salad.",
    prepTime: "4:30 PM",
    prepLocation: "Lakeside Pavilion grills",
    time: "6:00 PM",
    location: "Lakeside Pavilion",
  },
  {
    id: "d-tue",
    day: "2026-07-28",
    title: "Ye Olde Pizza Forge",
    emoji: "🍕",
    chef: { name: "Dame Cecily of House Brightwater", phone: "+17155550128" },
    houses: ["House Brightwater", "The Wyndmere Troupe"],
    menu: "Wood-fired hand pies & flatbreads from the dock forge, a garden-greens salad, and lemon ices for the squires.",
    prepTime: "5:00 PM",
    prepLocation: "Dock pizza oven",
    time: "6:30 PM",
    location: "Main Dock",
  },
  {
    id: "d-wed",
    day: "2026-07-29",
    title: "Dragonscale Fish Fry",
    emoji: "🐟",
    chef: { name: "Master Bartholomew of House Eldermoor", phone: "+17155550129" },
    houses: ["House Eldermoor", "The Ashforge Family", "House Fenwick"],
    menu: "Beer-battered walleye from the day's catch, golden hush puppies, and slaw of the realm.",
    prepTime: "4:00 PM",
    prepLocation: "Boathouse kitchen",
    time: "5:30 PM",
    location: "Boathouse",
  },
  {
    id: "d-thu",
    day: "2026-07-30",
    title: "The Cousins' Grand Potluck Banquet",
    emoji: "🍔",
    chef: { name: "Goodwife Maren of House Hollowbrook", phone: "+17155550130" },
    houses: ["House Hollowbrook", "The Stagleigh Kin", "House Marrowin"],
    menu: "A long table of dishes from every house (see the Crew board), with the Goodwife's grill lit at 5.",
    prepTime: "4:30 PM",
    prepLocation: "Pavilion",
    time: "5:30 PM",
    location: "Pavilion",
  },
  {
    id: "d-fri",
    day: "2026-07-31",
    title: "The Farewell Pig Roast",
    emoji: "🍖",
    chef: { name: "Sir Reginald of House Pemberlye", phone: "+17155550131" },
    houses: ["House Pemberlye", "The Brightwater Family", "House Thornwood"],
    menu: "A smoked feast to send us off — slow brisket, herbed chicken, honeyed beans, and berry cobbler before the fireworks.",
    prepTime: "3:30 PM",
    prepLocation: "Lakeside Pavilion smokers",
    time: "6:00 PM",
    location: "Lakeside Pavilion",
  },
];

/**
 * People to pay for the fest, via Venmo (preferred) or Zelle. Venmo usernames
 * and Zelle handles are placeholders — fill in the real ones (e.g. the aunt
 * running events, and Dad). No credentials live in the app: the buttons just
 * open Venmo (or copy the Zelle handle) so payment happens in the user's own
 * banking / Venmo app.
 */
export const PAYEES: Payee[] = [
  { id: "events-lead", name: "Aunt Linda", role: "Events & activities", venmo: "Linda-Peterson", zelle: "linda@example.com" },
  { id: "food-lead", name: "Dad", role: "Food & supplies", venmo: "Dad-MLR", zelle: "+17155550100" },
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
