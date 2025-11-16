import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import TotalCommitsBadge from "./components/TotalCommitsBadge";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Quef Central",
  description: "A minimalist hub for projects by M1tsumi — SwiftDisc, Caelum, and more.",
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
      </body>
    </html>
  );
}
