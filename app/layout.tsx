import type { Metadata, Viewport } from "next";
import { Cinzel } from "next/font/google";
import "./globals.css";
import { TabBar } from "@/components/TabBar";
import { InstallHint } from "@/components/InstallHint";
import { AnnouncementBanner } from "@/components/AnnouncementBanner";
import { IdentityProvider } from "@/components/IdentityProvider";
import { getAnnouncements } from "@/lib/announcements";
import { EVENT } from "@/lib/data";

// Roman-inscription serif for the Renaissance/Fantasy titles. Self-hosted by
// next/font at build (works in static export + offline PWA); see globals.css
// where --font-cinzel feeds --font-display.
const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-cinzel",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Family Fest 2026",
  description:
    "Muskellunge Lake Resort Family Fest 2026 — a Renaissance/Fantasy week at the lake.",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Family Fest",
  },
  formatDetection: { telephone: false },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#f4ecd8",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const announcements = await getAnnouncements();

  return (
    <html lang="en" className={`h-full ${cinzel.variable}`}>
      <body className="min-h-full bg-background text-foreground antialiased">
        <IdentityProvider>
          <InstallHint />
          <main
            className="mx-auto w-full max-w-md px-4 pb-24 pt-2"
            style={{ paddingTop: "env(safe-area-inset-top)" }}
          >
            {/* Cross-nav: a breadcrumb back to the umbrella resort app that
                names it explicitly — Family Fest reads as a section of the
                resort, not a separate app — plus the 2026 theme tag. */}
            <div className="flex items-center justify-between gap-2 pt-2">
              <a
                href={EVENT.resortAppUrl}
                className="inline-flex min-w-0 items-center gap-1.5 rounded-full bg-card px-3 py-1.5 text-xs font-medium text-foreground/70 ring-1 ring-border transition-colors hover:text-primary"
              >
                <span aria-hidden>←</span>
                <span className="truncate">{EVENT.resortName}</span>
              </a>
              <span className="shrink-0 text-xs font-medium uppercase tracking-wide text-accent">
                {EVENT.theme}
              </span>
            </div>
            <div className="pt-2">
              <AnnouncementBanner items={announcements} />
            </div>
            {children}
          </main>
          <TabBar />
        </IdentityProvider>
      </body>
    </html>
  );
}
