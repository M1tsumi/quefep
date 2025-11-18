 import type { Metadata } from "next";
 import { Geist_Mono } from "next/font/google";
 import "./globals.css";
 import TotalCommitsBadge from "./components/TotalCommitsBadge";
 import Script from "next/script";

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
         <Script
           src="https://static.cloudflareinsights.com/beacon.min.js"
           strategy="afterInteractive"
           data-cf-beacon='{"token": "76b290e2c4164b2fa08d0ce4c06a3afa"}'
         />
         <TotalCommitsBadge />
         {children}
       </body>
     </html>
   );
 }
