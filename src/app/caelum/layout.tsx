 import type { ReactNode } from 'react';
 import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import PepeMagic from '@/app/assets/pepe-magic.png';
import Toc from '@/app/components/Toc';

export const metadata: Metadata = {
  title: 'Caelum Docs | Quef Central',
  description: 'Objective-C Discord library built for stability and production-ready automation.',
  openGraph: {
    title: 'Caelum Docs | Quef Central',
    description: 'Objective-C Discord library built for stability and production-ready automation.',
    siteName: 'Quef Central',
    type: 'website',
    images: [
      {
        url: '/pepe.ico',
        width: 64,
        height: 64,
        alt: 'Quef Central icon',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Caelum Docs | Quef Central',
    description: 'Objective-C Discord library built for stability and production-ready automation.',
    images: ['/pepe.ico'],
  },
};

export default function CaelumLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl">
        <aside className="hidden md:block w-72 shrink-0 border-r border-black/10 dark:border-white/10 p-6 sticky top-0 h-screen overflow-y-auto bg-white/90 dark:bg-black/60">
        <div className="text-xl font-semibold">Caelum Docs</div>
        <div className="mt-2 text-xs text-black/60 dark:text-white/60">Objective-C Discord library built for stability</div>
        <div className="mt-4">
          <Image
            src={PepeMagic}
            alt="Pepe"
            className="rounded-md transform transition-transform duration-300 hover:-translate-y-1 hover:rotate-2"
            placeholder="empty"
          />
        </div>
        <nav className="mt-6 space-y-2 text-sm">
          <a href="/caelum" className="block hover:underline text-[#22c55e]">Overview</a>
          <a href="/caelum/getting-started" className="block hover:underline">Getting Started</a>
          <div className="mt-4 text-[10px] uppercase tracking-wide text-black/60 dark:text-white/60">API Reference</div>
          <a href="/caelum/api" className="block hover:underline">Index</a>
          <a href="/caelum/api/client" className="block hover:underline">Client</a>
          <a href="/caelum/api/rest" className="block hover:underline">REST</a>
          <a href="/caelum/api/gateway" className="block hover:underline">Gateway</a>
          <a href="/caelum/api/models" className="block hover:underline">Models</a>
          <a href="/caelum/api/errors" className="block hover:underline">Errors</a>
          <a href="/caelum/api/utils" className="block hover:underline">Utils</a>
          <div className="mt-4 text-[10px] uppercase tracking-wide text-black/60 dark:text-white/60">Resources</div>
          <a href="/caelum/faq" className="block hover:underline">FAQ</a>
          <a href="/caelum/changelog" className="block hover:underline">Changelog</a>
        </nav>
      </aside>
        <main className="flex-1">
          <div className="border-b border-black/10 dark:border-white/10 px-4 sm:px-6 py-3 flex items-center justify-between sticky top-0 bg-white/80 dark:bg-black/60 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-black/40 z-10">
            <div className="text-sm text-black/60 dark:text-white/60">Caelum Documentation</div>
            <Link href="/" className="text-xs px-3 py-1 rounded-md border border-black/10 dark:border-white/15 hover:bg-black/[.05] dark:hover:bg-white/[.06]">Home</Link>
          </div>
          <div className="max-w-5xl mx-auto px-6 py-8 xl:flex xl:items-start xl:gap-8">
            <div id="doc-content" className="prose dark:prose-invert max-w-none flex-1">
              {children}
            </div>
            <Toc contentSelector="#doc-content" />
          </div>
        </main>
      </div>
    </div>
  );
}
