import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import TotalCommitsBadge from "./components/TotalCommitsBadge";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Quef Central",
  description: "A minimalist hub for projects by M1tsumi featuring SwiftDisc, Caelum, and more.",
  icons: {
    icon: "/pepe.ico",
    shortcut: "/pepe.ico",
    apple: "/pepe.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistMono.variable} antialiased`}
      >
        <link rel="icon" href="/pepe.ico" />
        <TotalCommitsBadge />
        {children}
        <Script
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "76b290e2c4164b2fa08d0ce4c06a3afa"}'
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
