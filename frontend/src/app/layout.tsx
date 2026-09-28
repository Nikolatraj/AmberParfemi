import type { Metadata } from "next";
import localFont from "next/font/local";
import "lenis/dist/lenis.css";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

// Neue Montreal — site-wide font for both headings and body copy.
const neueMontreal = localFont({
  src: [
    { path: "./fonts/Neue Montreal/NeueMontreal-Light.otf", weight: "300", style: "normal" },
    { path: "./fonts/Neue Montreal/NeueMontreal-LightItalic.otf", weight: "300", style: "italic" },
    { path: "./fonts/Neue Montreal/NeueMontreal-Regular.otf", weight: "400", style: "normal" },
    { path: "./fonts/Neue Montreal/NeueMontreal-Italic.otf", weight: "400", style: "italic" },
    { path: "./fonts/Neue Montreal/NeueMontreal-Medium.otf", weight: "500", style: "normal" },
    { path: "./fonts/Neue Montreal/NeueMontreal-MediumItalic.otf", weight: "500", style: "italic" },
    { path: "./fonts/Neue Montreal/NeueMontreal-Bold.otf", weight: "700", style: "normal" },
    { path: "./fonts/Neue Montreal/NeueMontreal-BoldItalic.otf", weight: "700", style: "italic" },
  ],
  variable: "--font-neue-montreal",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Amber Parfemi",
  description: "Ekskluzivni parfemi i mirisi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${neueMontreal.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
