"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PerspectiveToggle } from "@/components/view-context";
import { site } from "@/lib/site";

export function SiteHeader() {
  // 視角切換只影響首頁的作品卡片，其他頁面不顯示
  const home = usePathname() === "/";
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-paper/85 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link href="/" className="shrink-0 font-serif text-lg font-semibold tracking-tight">
          {site.name}
          <span className="text-accent">.</span>
        </Link>
        <nav className="flex items-center gap-4 text-sm text-ink-soft sm:gap-6">
          <Link href="/#about" className="hidden hover:text-ink md:inline">關於我</Link>
          <Link href="/#work" className="hidden hover:text-ink sm:inline">作品</Link>
          <Link href="/#admin" className="hidden hover:text-ink lg:inline">後台監控</Link>
          {home && <PerspectiveToggle size="sm" />}
          <Link href="#contact" className="hidden rounded-full bg-ink px-4 py-1.5 text-paper hover:bg-ink/85 sm:inline">
            聯絡我
          </Link>
        </nav>
      </div>
    </header>
  );
}
