import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer id="contact" className="bg-ink text-paper">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-[1.4fr_1fr] md:py-20">
        <div>
          <p className="font-mono text-xs tracking-[0.25em] text-paper/50">CONTACT</p>
          <p className="mt-4 max-w-xl font-serif text-2xl leading-snug font-bold sm:text-3xl">
            正在尋找 AI 交付專案經理、前線 AI 應用工程師（FDE／Solutions）的職位。
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={`mailto:${site.email}`} className="rounded-full bg-paper px-5 py-2.5 text-sm font-medium text-ink hover:bg-paper/85">
              {site.email}
            </a>
            <a href={site.github} target="_blank" rel="noreferrer" className="rounded-full border border-paper/30 px-5 py-2.5 text-sm font-medium hover:border-paper">
              GitHub ↗
            </a>
          </div>
        </div>
        <ul className="space-y-2 text-sm text-paper/60 md:justify-self-end md:text-right">
          <li>{site.title}</li>
          <li>經濟學・財務背景</li>
          <li>Next.js 16 · Tailwind CSS · 部署於 Vercel</li>
        </ul>
      </div>
      <div className="border-t border-paper/10">
        <p className="mx-auto max-w-6xl px-4 py-5 text-xs text-paper/40 sm:px-6">© 2026 {site.name}</p>
      </div>
    </footer>
  );
}
