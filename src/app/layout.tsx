import type { Metadata, Viewport } from "next";
import { Fraunces, Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#f3ede0",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://gothamtype.studio"),
  title: "GOTHAM TYPE® — scroll-driven 3D type",
  description:
    "A small studio that sets words in 3D and makes them move while you scroll. Big headlines, one idea per page, no templates.",
  applicationName: "GOTHAM TYPE®",
  creator: "GOTHAM TYPE Studio",
  openGraph: {
    title: "GOTHAM TYPE® — scroll-driven 3D type",
    description:
      "We build 3D type that tilts, dives and stacks as you scroll. One idea per page, set really big.",
    type: "website",
    locale: "en_US",
    siteName: "GOTHAM TYPE®",
  },
  twitter: {
    card: "summary",
    creator: "@gothamtype",
    title: "GOTHAM TYPE® — scroll-driven 3D type",
    description: "3D type that moves while you scroll. No templates.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${spaceGrotesk.variable} ${spaceMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-paper font-sans text-ink">
        {children}
      </body>
    </html>
  );
}