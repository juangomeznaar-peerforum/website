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
  metadataBase: new URL("https://peerforum.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://peerforum.com",
    siteName: "Peerforum",
    title: "Peerforum | Peer Coaching Groups at Scale",
    description:
      "Full-service provider of peer coaching groups at scale for enterprise, education, and premium communities.",
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
