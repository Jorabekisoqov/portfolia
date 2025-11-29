import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { CursorGlow } from "@/components/cursor-glow";
import { AnimatableCursor } from "@/components/animatable-cursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Isoqov Jo'rabek — AI Developer",
  description:
    "AI Developer & Machine Learning Engineer building intelligent systems that think, learn, and create.",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "Isoqov Jo'rabek — AI Developer",
    description:
      "AI Developer & Machine Learning Engineer building intelligent systems that think, learn, and create.",
    type: "website",
    url: "https://example.com",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Isoqov Jo'rabek — AI Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Isoqov Jo'rabek — AI Developer",
    description:
      "AI Developer & Machine Learning Engineer building intelligent systems that think, learn, and create.",
    images: ["/og.png"],
  },
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-black text-zinc-200`}
      >
        <ThemeProvider>
          <CursorGlow />
          <AnimatableCursor />
          <div className="relative z-10">
            <header className="fixed right-4 top-4 z-50">
              <ThemeToggle />
            </header>
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
