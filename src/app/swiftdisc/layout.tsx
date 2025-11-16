 import type { ReactNode } from 'react';
 import Image from 'next/image';
 import PepeEvil from '@/app/assets/pepe-evil.png';
 export default function SwiftDiscLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 shrink-0 border-r border-black/10 dark:border-white/10 p-6 hidden md:block">
        <div className="text-xl font-semibold">SwiftDisc Docs</div>
        <nav className="mt-6 space-y-3 text-sm">
          <a href="/swiftdisc" className="block hover:underline">Overview</a>
          <a href="/swiftdisc/getting-started" className="block hover:underline">Getting Started</a>
          <div className="mt-4 text-xs uppercase tracking-wide text-black/60 dark:text-white/60">API Reference</div>
          <a href="/swiftdisc/api" className="block hover:underline">Index</a>
          <a href="/swiftdisc/api/client" className="block hover:underline">Client</a>
          <a href="/swiftdisc/api/rest" className="block hover:underline">REST</a>
          <a href="/swiftdisc/api/gateway" className="block hover:underline">Gateway</a>
          <a href="/swiftdisc/api/models" className="block hover:underline">Models</a>
          <a href="/swiftdisc/api/errors" className="block hover:underline">Errors</a>
          <a href="/swiftdisc/api/utils" className="block hover:underline">Utils</a>
          <div className="mt-4 text-xs uppercase tracking-wide text-black/60 dark:text-white/60">Resources</div>
          <a href="/swiftdisc/faq" className="block hover:underline">FAQ</a>
          <a href="/swiftdisc/changelog" className="block hover:underline">Changelog</a>
        </nav>
        <div className="mt-8">
          <Image src={PepeEvil} alt="Pepe" className="rounded-md" placeholder="empty" />
        </div>
      </aside>
      <main className="flex-1 p-6 md:p-10">{children}</main>
    </div>
  );
}
