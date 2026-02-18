import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://florent-le-bot.vercel.app"),
  title: {
    default: "florent-le-bot | Portfolio",
    template: "%s | florent-le-bot",
  },
  description:
    "Lead Developer & Architect — MVP, Audit Performance, Design System. Startup ready.",
  openGraph: {
    title: "florent-le-bot | Portfolio",
    description:
      "Lead Developer & Architect — MVP, Audit Performance, Design System.",
    url: "/",
    siteName: "florent-le-bot",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "florent-le-bot | Portfolio",
    description:
      "Lead Developer & Architect — MVP, Audit Performance, Design System.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
