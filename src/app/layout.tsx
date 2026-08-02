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

const SITE_TITLE = "Reverie — cinematic wedding invitation films";
const SITE_DESC =
  "The invitation is a memory. Reverie turns your love story into a cinematic, illustrated, bilingual invitation film that guests watch instead of skim.";

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESC,
  applicationName: "Reverie",
  authors: [{ name: "Reverie" }],
  keywords: [
    "wedding invitation website",
    "animated wedding invitation",
    "bilingual wedding invitation",
    "Arabic wedding invitation",
    "digital wedding invitation film",
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
