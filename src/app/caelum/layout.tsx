 import type { ReactNode } from 'react';
 import Image from 'next/image';
 import PepeMagic from '@/app/assets/pepe-magic.png';
 export default function CaelumLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex">
      <aside className="hidden md:block w-72 shrink-0 border-r border-black/10 dark:border-white/10 p-6 sticky top-0 h-screen overflow-y-auto">
        <div className="text-xl font-semibold">Caelum Docs</div>
        <div className="mt-2 text-xs text-black/60 dark:text-white/60">Objective-C Discord library built for stability</div>
        <div className="mt-4">
          <Image src={PepeMagic} alt="Pepe" className="rounded-md" placeholder="empty" />
        </div>
        <nav className="mt-6 space-y-2 text-sm">
          <a href="/caelum" className="block hover:underline">Overview</a>
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
        <div className="max-w-3xl mx-auto px-6 py-10">
          <header className="mb-6 pb-4 border-b border-black/10 dark:border-white/10">
            <h1 className="text-2xl font-semibold">Caelum Documentation</h1>
            <p className="mt-1 text-sm text-black/60 dark:text-white/60">Guides, API reference, and examples to build Discord bots with Objective-C.</p>
          </header>
          <div className="prose dark:prose-invert max-w-none">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
