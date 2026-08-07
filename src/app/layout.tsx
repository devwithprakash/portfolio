import type { Metadata } from "next";
import {
  Caveat,
  Geist,
  Geist_Mono,
  Inter,
  JetBrains_Mono,
  Space_Grotesk,  
} from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const logoFont = Caveat({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-logo",
});

export const metadata: Metadata = {
  title: "Prakash Jangid — Full Stack Web Developer",
  description:
    "Portfolio of Prakash Jangid, a Backend Engineer from Rajasthan, India. Building scalable web applications with clean architecture.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${logoFont.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-[#0d0d0d]">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
