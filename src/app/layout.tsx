import type { Metadata, Viewport } from "next";
import {
  Playfair_Display,
  Cormorant_Garamond,
  Cinzel,
  Great_Vibes,
  Inter,
  Amiri,
} from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});
const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
  weight: ["400", "500", "600"],
});
const greatVibes = Great_Vibes({
  subsets: ["latin"],
  variable: "--font-vibes",
  display: "swap",
  weight: ["400"],
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const amiri = Amiri({
  subsets: ["arabic", "latin"],
  variable: "--font-amiri",
  display: "swap",
  weight: ["400", "700"],
});

const SITE_TITLE = "Mohamed & Mariam — 26 August 2026";
const SITE_DESC =
  "An interactive animated love story. Journey with Mohamed & Mariam through an enchanted garden to their wedding day — 26 August 2026.";

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESC,
  applicationName: "Mohamed & Mariam Wedding",
  authors: [{ name: "Mohamed & Mariam" }],
  keywords: [
    "wedding invitation",
    "Mohamed and Mariam",
    "26 August 2026",
    "animated invitation",
    "RSVP",
  ],
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESC,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESC,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#fbf7ef",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${cormorant.variable} ${cinzel.variable} ${greatVibes.variable} ${inter.variable} ${amiri.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
