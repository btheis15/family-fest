import type { Metadata, Viewport } from "next";
import "./globals.css";
import { TabBar } from "@/components/TabBar";
import { InstallHint } from "@/components/InstallHint";
import { AnnouncementBanner } from "@/components/AnnouncementBanner";
import { getAnnouncements } from "@/lib/announcements";

export const metadata: Metadata = {
  title: "Family Fest",
  description: "Plan the reunion, wrangle the crew, keep the memories.",
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
  themeColor: "#fffaf3",
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
    <html lang="en" className="h-full">
      <body className="min-h-full bg-background text-foreground antialiased">
        <InstallHint />
        <main
          className="mx-auto w-full max-w-md px-4 pb-24 pt-2"
          style={{ paddingTop: "env(safe-area-inset-top)" }}
        >
          <div className="pt-2">
            <AnnouncementBanner items={announcements} />
          </div>
          {children}
        </main>
        <TabBar />
      </body>
    </html>
  );
}
