import type { Metadata } from "next";
import { Lora, DM_Sans } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-lora",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Peerforum | Peer Coaching Groups at Scale",
    template: "%s | Peerforum",
  },
  description:
    "Peerforum designs, operates, and facilitates high-end peer coaching groups for enterprise, education, and premium communities.",
  metadataBase: new URL("https://www.peerforum.com"),
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.peerforum.com",
    siteName: "Peerforum",
    title: "Peerforum | Peer Coaching Groups at Scale",
    description:
      "Full-service provider of peer coaching groups at scale for enterprise, education, and premium communities.",
    images: [
      {
        url: "https://www.peerforum.com/og-image.png",
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "Peerforum — Peer Coaching Groups at Scale",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Peerforum | Peer Coaching Groups at Scale",
    description:
      "Full-service provider of peer coaching groups at scale for enterprise, education, and premium communities.",
    images: ["https://www.peerforum.com/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${lora.variable} ${dmSans.variable}`}>
      <body className="font-sans antialiased">
        <JsonLd />
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
