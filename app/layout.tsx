import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SignalMesh from "@/components/SignalMesh";
import CosmicDust from "@/components/CosmicDust";

/* ─── Fonts ─────────────────────────────────────────────────────────────── */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

/* ─── Metadata ───────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: {
    default: "zarss — Cybersecurity & Software",
    template: "%s | zarss",
  },
  description:
    "Portfolio of Umer (zarss) — BS Cybersecurity @ GIKI, Co-Founder/COO of Zero Point Intel. Security engineering, software projects, and AI tooling.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ??
      (process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000")
  ),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "zarss",
  },
  twitter: { card: "summary_large_image" },
  robots: {
    index: true,
    follow: true,
  },
};

/* ─── Root Layout ────────────────────────────────────────────────────────── */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable} dark`}
    >
      <body>
        <CosmicDust />
        <SignalMesh />
        <Nav />
        <main>{children}</main>
        <Footer />
        {process.env.NODE_ENV === "production" &&
        process.env.NEXT_PUBLIC_UMAMI_URL &&
        process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID ? (
          <Script
            defer
            src={`${process.env.NEXT_PUBLIC_UMAMI_URL.replace(/\/$/, "")}/script.js`}
            data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
            strategy="afterInteractive"
          />
        ) : null}
        <Analytics mode="production" />
      </body>
    </html>
  );
}
