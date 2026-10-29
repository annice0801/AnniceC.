import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { CSSProperties, ReactNode } from "react";
import { ArchDiagram } from "@/components/arch-diagram";
import { BrowserFrame, PhoneFrame } from "@/components/frames";
import { MissionFlow, OrgDiagram } from "@/components/org-diagram";
import { Parallax } from "@/components/parallax";
import { Reveal } from "@/components/reveal";
import { ScrollProgress } from "@/components/scroll-progress";
import { getProject, projects } from "@/lib/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return { title: p.name, description: p.tagline };
}

const sections = [
  { id: "overview", label: "概覽與 STAR" },
  { id: "blocks", label: "技術積木" },
  { id: "screens", label: "畫面" },
  { id: "admin", label: "管理後台" },
  { id: "architecture", label: "架構、資安與效能" },
  { id: "pm", label: "專案管理" },
  { id: "product", label: "產品" },
  { id: "engineering", label: "工程" },
  { id: "issues", label: "問題與解法" },
  { id: "next", label: "下一步" },
];

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const index = projects.findIndex((x) => x.slug === p.slug);
  const nextProject = projects[(index + 1) % projects.length];
  const desktopShots = p.shots.filter((s) => s.device !== "mobile");
  const mobileShot = p.shots.find((s) => s.device === "mobile");

  return (
    <div style={{ "--accent": p.accent } as CSSProperties}>
      <ScrollProgress color={p.accent} />

      {/* ───────── 標題區 ───────── */}
      <section className="paper-grain relative overflow-hidden border-b border-line">
        <Parallax speed={-0.2} className="pointer-events-none absolute -right-4 top-6 select-none">
          <span className="text-outline block font-serif text-[6rem] leading-none font-bold sm:text-[12rem]">
            {String(index + 1).padStart(2, "0")}
          </span>
        </Parallax>
        <div className="relative mx-auto max-w-6xl px-4 pb-14 pt-10 sm:px-6 md:pb-20 md:pt-16">
          <Link href="/#work" className="text-sm text-ink-soft hover:text-ink">← 所有作品</Link>
          <Reveal>
            <div className="mt-8 flex flex-wrap items-center gap-2 text-xs">
              <span className="rounded-full px-2.5 py-1 font-medium text-white" style={{ background: p.accent }}>{p.category}</span>
              <span className={`rounded-full border px-2.5 py-1 ${p.status === "上線中" ? "border-emerald-700/30 text-emerald-800" : "border-amber-700/30 text-amber-800"}`}>
                ● {p.status}
              </span>
            </div>
            <h1 className="mt-5 font-serif text-5xl font-bold tracking-tight sm:text-7xl">{p.name}</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-ink-soft sm:text-xl">{p.tagline}</p>
          </Reveal>

          <Reveal delay={120}>
            <dl className="mt-10 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
              <Meta label={`製作期・${p.buildTime}`}>{p.period}</Meta>
              <Meta label={p.maintenance ? `維護期・${p.maintenance.time}` : "維護期"}>{p.maintenance ? p.maintenance.period : p.status === "開發中" ? "尚未上線" : "無"}</Meta>
              <Meta label="我的角色">{p.role.join("、")}</Meta>
              <Meta label="主要技術">{p.stack.slice(0, 5).join("、")}</Meta>
            </dl>
            <div className="mt-8 flex flex-wrap gap-3">
              {p.url ? (
                <a href={p.url} target="_blank" rel="noreferrer" className="rounded-full px-6 py-3 text-sm font-medium text-white hover:opacity-90" style={{ background: p.accent }}>
                  開啟網站 ↗
                </a>
              ) : (
                <span className="rounded-full border border-dashed border-ink/30 px-6 py-3 text-sm text-ink-soft">
                  開發中，尚未公開上線
                </span>
              )}
              {p.repo && (
                <a href={p.repo} target="_blank" rel="noreferrer" className="rounded-full border border-ink/25 px-6 py-3 text-sm font-medium hover:border-ink">
                  GitHub 原始碼 ↗
                </a>
              )}
              <a href="#issues" className="rounded-full border border-ink/25 px-6 py-3 text-sm font-medium hover:border-ink">
                直接看問題與解法 ↓
              </a>
            </div>
          </Reveal>
        </div>

        {/* 主圖：比框大一些，捲動時在框內位移 */}
        <div className="relative mx-auto max-w-6xl px-4 pb-16 sm:px-6">
          <Reveal>
            {p.cover ? (
              <Parallax speed={0.06}>
                <BrowserFrame src={p.cover} alt={`${p.name} 首頁`} url={p.url} priority sizes="(min-width: 1152px) 1100px, 100vw" />
              </Parallax>
            ) : (
              <div className="rounded-2xl border border-line bg-[#e7ebf2] px-3 py-10 sm:px-8 sm:py-14">
                <p className="mb-8 text-center font-mono text-xs tracking-[0.2em] text-[#3a5a8c]">ORGANIZATION</p>
                <OrgDiagram />
              </div>
            )}
          </Reveal>
        </div>
      </section>

      {/* ───────── 內文：桌機左側有章節導覽 ───────── */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:grid lg:grid-cols-[180px_1fr] lg:gap-14">
        <aside className="hidden lg:block">
          <nav className="sticky top-24 space-y-1 py-16 text-sm">
            {sections
              .filter((s) => s.id !== "admin" || p.adminShots.length > 0)
              .map((s) => (
              <a key={s.id} href={`#${s.id}`} className="block border-l border-line py-1.5 pl-4 text-ink-soft hover:border-[var(--accent)] hover:text-ink">
                {s.label}
              </a>
              ))}
          </nav>
        </aside>

        <div className="min-w-0 py-16 md:py-20">
          {/* 概覽 */}
          <Section id="overview" eyebrow="OVERVIEW" title="專案概覽">
            <p className="text-[17px] leading-9 text-ink-soft">{p.summary}</p>
            <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-4">
              {p.stats.map((s) => (
                <div key={s.label} className="bg-paper p-5">
                  <dt className="font-serif text-3xl font-bold" style={{ color: p.accent }}>{s.value}</dt>
                  <dd className="mt-1 text-sm text-ink-soft">{s.label}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-2">
              {(
                [
                  ["S", "情境 Situation", p.star.situation],
                  ["T", "任務 Task", p.star.task],
                  ["A", "行動 Action", p.star.action],
                  ["R", "成果 Result", p.star.result],
                ] as const
              ).map(([k, label, text]) => (
                <Reveal key={k} className="bg-paper p-6">
                  <p className="flex items-center gap-3">
                    <span className="flex size-8 items-center justify-center rounded-full font-serif text-lg font-bold text-white" style={{ background: p.accent }}>
                      {k}
                    </span>
                    <span className="text-sm font-semibold">{label}</span>
                  </p>
                  <p className={`mt-3 leading-8 ${k === "R" ? "font-medium" : "text-ink-soft"}`}>{text}</p>
                </Reveal>
              ))}
            </div>
            {p.maintenance && (
              <Reveal className="mt-6 rounded-xl border border-dashed p-5" >
                <p className="text-sm font-semibold">
                  維護期 <span className="ml-2 font-mono text-xs font-normal text-ink-soft">{p.maintenance.period}・{p.maintenance.time}，不計入製作時間</span>
                </p>
                <p className="mt-2 leading-7 text-ink-soft">{p.maintenance.summary}</p>
              </Reveal>
            )}
            <div className="mt-8 flex flex-wrap gap-2">
              {p.stack.map((t) => (
                <span key={t} className="rounded-md border border-line bg-white/50 px-2.5 py-1 font-mono text-xs text-ink-soft">{t}</span>
              ))}
            </div>
          </Section>

          {/* 技術積木 */}
          <Section id="blocks" eyebrow="BUILDING BLOCKS" title="技術積木">
            <div className="grid gap-4 sm:grid-cols-2">
              {(
                [
                  ["連線", "API", p.blocks.api],
                  ["展示", "UI", p.blocks.ui],
                  ["邏輯", "Logic", p.blocks.logic],
                  ["記憶", "Data & Cache", p.blocks.memory],
                ] as const
              ).map(([zh, en, text], i) => (
                <Reveal key={zh} delay={(i % 2) * 80} className="relative overflow-hidden rounded-xl border border-line bg-white/50 p-6">
                  <span className="absolute -right-2 -top-4 font-serif text-7xl font-bold opacity-[0.07]" style={{ color: p.accent }}>{zh}</span>
                  <p className="text-lg font-bold">{zh}</p>
                  <p className="font-mono text-[11px] tracking-wider text-ink-soft uppercase">{en}</p>
                  <p className="mt-3 leading-7 text-ink-soft">{text}</p>
                </Reveal>
              ))}
            </div>
          </Section>

          {/* 畫面 */}
          <Section id="screens" eyebrow="SCREENS" title={p.shots.length ? "畫面導覽" : "系統運作方式"}>
            {p.shots.length > 0 ? (
              <div className="space-y-16 md:space-y-24">
                {desktopShots.map((s, i) => (
                  <figure key={s.src} className="grid items-center gap-6 md:grid-cols-12 md:gap-8">
                    <Reveal className={`md:col-span-8 ${i % 2 ? "md:order-2" : ""}`}>
                      <Parallax speed={i % 2 ? 0.05 : -0.05}>
                        <BrowserFrame src={s.src} alt={s.title} url={p.url} sizes="(min-width: 1024px) 560px, 100vw" />
                      </Parallax>
                    </Reveal>
                    <Reveal delay={100} className={`md:col-span-4 ${i % 2 ? "md:order-1" : ""}`}>
                      <figcaption>
                        <p className="font-mono text-xs" style={{ color: p.accent }}>{String(i + 1).padStart(2, "0")}</p>
                        <p className="mt-2 font-serif text-2xl font-bold">{s.title}</p>
                        <p className="mt-3 leading-8 text-ink-soft">{s.caption}</p>
                      </figcaption>
                    </Reveal>
                  </figure>
                ))}
                {mobileShot && (
                  <figure className="grid items-center gap-8 rounded-2xl border border-line bg-paper-2/50 p-6 sm:p-10 md:grid-cols-2">
                    <Reveal>
                      <PhoneFrame src={mobileShot.src} alt={mobileShot.title} />
                    </Reveal>
                    <Reveal delay={100}>
                      <figcaption>
                        <p className="font-mono text-xs" style={{ color: p.accent }}>RESPONSIVE</p>
                        <p className="mt-2 font-serif text-2xl font-bold">{mobileShot.title}</p>
                        <p className="mt-3 leading-8 text-ink-soft">{mobileShot.caption}</p>
                      </figcaption>
                    </Reveal>
                  </figure>
                )}
              </div>
            ) : (
              <>
                <p className="mb-8 leading-8 text-ink-soft">
                  這個專案還在內部開發，尚未公開上線。下面用流程圖說明一個任務從交代到完成的過程。
                </p>
                <MissionFlow />
              </>
            )}
          </Section>

          {/* 管理後台 */}
          {p.adminShots.length > 0 && (
            <Section id="admin" eyebrow="ADMIN CONSOLE" title="管理後台">
              <p className="mb-10 leading-8 text-ink-soft">
                以下畫面在獨立的測試資料庫拍攝，會員、Email 與操作紀錄全部是假資料，沒有使用任何真實使用者的資訊。
              </p>
              <div className="space-y-14">
                {p.adminShots.map((s, i) => (
                  <figure key={s.src}>
                    <Reveal>
                      <Parallax speed={i % 2 ? 0.04 : -0.04}>
                        <BrowserFrame src={s.src} alt={s.title} url={p.url ? `${p.url}/admin` : undefined} sizes="(min-width: 1024px) 860px, 100vw" />
                      </Parallax>
                    </Reveal>
                    <Reveal delay={80}>
                      <figcaption className="mt-5 grid gap-1 sm:grid-cols-[180px_1fr] sm:gap-6">
                        <p className="font-serif text-xl font-bold">{s.title}</p>
                        <p className="leading-7 text-ink-soft">{s.caption}</p>
                      </figcaption>
                    </Reveal>
                  </figure>
                ))}
              </div>
            </Section>
          )}

          {/* 架構、資安與效能 */}
          <Section id="architecture" eyebrow="ARCHITECTURE & HIGHLIGHTS" title="系統架構、資安與效能">
            <Reveal>
              <ArchDiagram columns={p.arch} accent={p.accent} />
            </Reveal>
            <div className="mt-10 grid gap-8 lg:grid-cols-2">
              <div>
                <SubTitle>🔒 資安規範</SubTitle>
                <ul className="mt-4 space-y-3">
                  {p.security.map((x) => (
                    <Reveal as="li" key={x.title} className="rounded-xl border border-line bg-white/50 p-5">
                      <p className="font-semibold">{x.title}</p>
                      <p className="mt-1.5 text-[15px] leading-7 text-ink-soft">{x.why}</p>
                    </Reveal>
                  ))}
                </ul>
              </div>
              <div>
                <SubTitle>⚡ 效能與成本</SubTitle>
                <ul className="mt-4 space-y-3">
                  {p.performance.map((x) => (
                    <Reveal as="li" key={x.title} className="rounded-xl border border-line bg-white/50 p-5">
                      <p className="font-semibold">{x.title}</p>
                      <p className="mt-1.5 text-[15px] leading-7 text-ink-soft">{x.why}</p>
                    </Reveal>
                  ))}
                </ul>
              </div>
            </div>
          </Section>

          {/* 專案管理 */}
          <Section id="pm" eyebrow="PROJECT MANAGEMENT" title="專案管理：時程、範疇與風險">
            <SubTitle>時程規劃（實心點為製作期，空心點為上線後的維護期）</SubTitle>
            <ol className="relative mt-6 space-y-7 border-l border-line pl-7">
              {p.pm.timeline.map((m) => (
                <Reveal as="li" key={m.date + m.phase} className="relative">
                  <span
                    className="absolute -left-[33px] top-1.5 size-2.5 rounded-full border-2 ring-4 ring-paper"
                    style={{ borderColor: p.accent, background: m.kind === "maintenance" ? "var(--color-paper)" : p.accent }}
                  />
                  <p className="font-mono text-xs text-ink-soft">
                    {m.date}
                    <span className={`ml-2 rounded px-1.5 py-0.5 font-sans text-[11px] ${m.kind === "maintenance" ? "border border-dashed border-ink/30" : "bg-ink/5"}`}>
                      {m.kind === "maintenance" ? "維護期" : p.status === "開發中" ? "開發中" : "製作期"}
                    </span>
                  </p>
                  <p className="mt-1 font-semibold">{m.phase}</p>
                  <p className="mt-1 leading-7 text-ink-soft">{m.detail}</p>
                </Reveal>
              ))}
            </ol>

            <SubTitle className="mt-14">範疇：這次做什麼、不做什麼</SubTitle>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <ListCard title="納入範圍" items={p.pm.scopeIn} mark="✓" color={p.accent} />
              <ListCard title="刻意不做" items={p.pm.scopeOut} mark="—" color="#8a8478" />
            </div>

            <SubTitle className="mt-14">風險與因應</SubTitle>
            <div className="mt-6 overflow-hidden rounded-xl border border-line">
              <div className="hidden grid-cols-2 bg-paper-2/70 px-5 py-3 text-xs font-medium text-ink-soft md:grid">
                <span>風險</span>
                <span>因應方式</span>
              </div>
              {p.pm.risks.map((r) => (
                <div key={r.risk} className="grid gap-2 border-t border-line px-5 py-4 first:border-t-0 md:grid-cols-2 md:gap-6 md:first:border-t">
                  <p className="font-medium">{r.risk}</p>
                  <p className="leading-7 text-ink-soft">{r.response}</p>
                </div>
              ))}
            </div>
          </Section>

          {/* 產品 */}
          <Section id="product" eyebrow="PRODUCT" title="產品：問題、對象與決策">
            <Reveal>
              <blockquote className="border-l-4 py-1 pl-6 font-serif text-xl leading-9 sm:text-2xl sm:leading-10" style={{ borderColor: p.accent }}>
                {p.product.problem}
              </blockquote>
            </Reveal>
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              <ListCard title="目標使用者" items={p.product.users} mark="●" color={p.accent} />
              <ListCard title="成功標準" items={p.product.goals} mark="◎" color={p.accent} />
            </div>
            <SubTitle className="mt-14">關鍵決策與理由</SubTitle>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {p.product.decisions.map((d, i) => (
                <Reveal key={d.title} delay={(i % 2) * 80} className="rounded-xl border border-line bg-white/50 p-6">
                  <p className="font-semibold">{d.title}</p>
                  <p className="mt-2 leading-7 text-ink-soft">{d.why}</p>
                </Reveal>
              ))}
            </div>
          </Section>

          {/* 工程 */}
          <Section id="engineering" eyebrow="ENGINEERING" title="工程：架構與實作重點">
            <div className="overflow-hidden rounded-xl border border-line">
              {p.engineering.architecture.map((a) => (
                <div key={a.name} className="grid gap-1 border-t border-line px-5 py-4 first:border-t-0 sm:grid-cols-[110px_1fr] sm:gap-6">
                  <p className="font-mono text-sm font-medium" style={{ color: p.accent }}>{a.name}</p>
                  <p className="leading-7 text-ink-soft">{a.detail}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {p.engineering.highlights.map((h, i) => (
                <Reveal key={h.title} delay={i * 80} className="rounded-xl bg-ink p-6 text-paper">
                  <p className="font-semibold">{h.title}</p>
                  <p className="mt-2 text-sm leading-7 text-paper/70">{h.why}</p>
                </Reveal>
              ))}
            </div>
          </Section>

          {/* 問題與解法 */}
          <Section id="issues" eyebrow="PROBLEMS & FIXES" title="遇到的問題與處理方式">
            <div className="space-y-5">
              {p.issues.map((issue, i) => (
                <Reveal as="article" key={issue.title} className="overflow-hidden rounded-xl border border-line bg-white/50">
                  <header className="flex items-baseline gap-4 border-b border-line px-5 py-4 sm:px-6">
                    <span className="font-mono text-sm" style={{ color: p.accent }}>#{i + 1}</span>
                    <h3 className="font-semibold sm:text-lg">{issue.title}</h3>
                    {issue.phase && (
                      <span className="ml-auto shrink-0 rounded border border-line px-1.5 py-0.5 text-[11px] text-ink-soft">{issue.phase}</span>
                    )}
                  </header>
                  <dl className="grid gap-px bg-line sm:grid-cols-2">
                    <IssueCell label="狀況">{issue.situation}</IssueCell>
                    <IssueCell label="原因">{issue.cause}</IssueCell>
                    <IssueCell label="處理">{issue.fix}</IssueCell>
                    <IssueCell label="結果" strong color={p.accent}>{issue.result}</IssueCell>
                  </dl>
                </Reveal>
              ))}
            </div>
          </Section>

          {/* 下一步 */}
          <Section id="next" eyebrow="WHAT'S NEXT" title="下一步">
            <ol className="grid gap-4 sm:grid-cols-3">
              {p.next.map((n, i) => (
                <Reveal as="li" key={n} delay={i * 80} className="rounded-xl border border-line p-5">
                  <span className="font-mono text-xs text-ink-soft">0{i + 1}</span>
                  <p className="mt-2 font-medium leading-7">{n}</p>
                </Reveal>
              ))}
            </ol>
            {p.url && (
              <a href={p.url} target="_blank" rel="noreferrer" className="mt-10 inline-flex rounded-full px-6 py-3 text-sm font-medium text-white hover:opacity-90" style={{ background: p.accent }}>
                到 {p.name} 實際試用 ↗
              </a>
            )}
          </Section>
        </div>
      </div>

      {/* ───────── 下一個專案 ───────── */}
      <Link href={`/projects/${nextProject.slug}`} className="group block border-t border-line bg-ink text-paper">
        <div className="mx-auto flex max-w-6xl items-end justify-between gap-6 px-4 py-14 sm:px-6 md:py-20">
          <div>
            <p className="font-mono text-xs tracking-[0.2em] text-paper/50">NEXT PROJECT</p>
            <p className="mt-3 font-serif text-4xl font-bold sm:text-6xl">{nextProject.name}</p>
            <p className="mt-3 max-w-xl text-paper/60">{nextProject.tagline}</p>
          </div>
          <span className="text-4xl transition group-hover:translate-x-2 sm:text-6xl">→</span>
        </div>
      </Link>
    </div>
  );
}

function Section({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="border-t border-line pt-12 pb-20 first:border-t-0 first:pt-0 md:pb-24">
      <Reveal>
        <p className="font-mono text-xs tracking-[0.2em]" style={{ color: "var(--accent)" }}>{eyebrow}</p>
        <h2 className="mt-3 mb-8 font-serif text-3xl font-bold sm:text-4xl">{title}</h2>
      </Reveal>
      {children}
    </section>
  );
}

function SubTitle({ children, className }: { children: ReactNode; className?: string }) {
  return <h3 className={`text-lg font-semibold ${className ?? ""}`}>{children}</h3>;
}

function Meta({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="bg-paper/90 p-5">
      <dt className="text-xs text-ink-soft">{label}</dt>
      <dd className="mt-1.5 text-sm leading-6 font-medium">{children}</dd>
    </div>
  );
}

function ListCard({ title, items, mark, color }: { title: string; items: string[]; mark: string; color: string }) {
  return (
    <Reveal className="rounded-xl border border-line bg-white/50 p-6">
      <p className="text-sm font-semibold">{title}</p>
      <ul className="mt-4 space-y-3">
        {items.map((it) => (
          <li key={it} className="flex gap-3 leading-7 text-ink-soft">
            <span className="shrink-0 text-sm leading-7" style={{ color }}>{mark}</span>
            {it}
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

function IssueCell({ label, children, strong, color }: { label: string; children: ReactNode; strong?: boolean; color?: string }) {
  return (
    <div className="bg-paper p-5 sm:p-6">
      <dt className="text-xs font-medium text-ink-soft">{label}</dt>
      <dd className={`mt-2 leading-7 ${strong ? "font-medium" : "text-ink-soft"}`} style={strong ? { color } : undefined}>
        {children}
      </dd>
    </div>
  );
}
