import type { Metadata } from "next";
import { Unbounded, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const unbounded = Unbounded({
  subsets: ["latin"],
  variable: "--font-unbounded",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TYPEDRIFT® — 3D Type Scroller Experiences",
  description:
    "Scroll-driven 3D type experiences built with Spline. Cinematic type that moves in three dimensions — designed to make people stop scrolling.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${unbounded.variable} ${spaceGrotesk.variable} ${jetBrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-ink font-sans text-bone">
        {children}
      </body>
    </html>
  );
}
