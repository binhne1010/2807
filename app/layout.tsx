import type { Metadata } from "next";
import { Mali, Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";

// Playfair Display (the brief's sanctioned alternative to Cormorant Garamond) is used
// because Cormorant Garamond ships no Vietnamese subset and would break diacritics.
const display = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const body = Manrope({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-body",
  display: "swap",
});

// Mali stands in for Caveat (the brief allows any light, legible handwriting font):
// Caveat has no Vietnamese subset, which would break the letters and the apology.
const hand = Mali({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-hand",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hành trình của chúng ta",
  description: "Một hành trình kỷ niệm dành riêng cho em.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi" className={`${display.variable} ${body.variable} ${hand.variable}`}>
      <body>{children}</body>
    </html>
  );
}
