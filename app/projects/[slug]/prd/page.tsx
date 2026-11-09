// 產品需求文件（PRD）頁：/projects/[slug]/prd
// 內容在 lib/prd；範疇、風險與後續規劃沿用 lib/projects 的同一份資料，避免兩邊不一致

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { CSSProperties, ReactNode } from "react";
import { FeatureTree, FlowChart } from "@/components/prd/diagrams";
import { PrintButton } from "@/components/prd/print-button";
import { Wireframe, WireframeFrame } from "@/components/prd/wireframe";
import { getPrd } from "@/lib/prd";
import type { Feature, Revision } from "@/lib/prd/types";
import { getProject, projects } from "@/lib/projects";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]/prd">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return { title: `${p.name} 產品需求文件`, description: `${p.name} 的 PRD：背景、功能清單、流程、架構、線框圖與視覺風格。` };
}

const sections = [
  { id: "revisions", label: "1. 修訂追蹤" },
  { id: "background", label: "2. 背景簡介" },
  { id: "features", label: "3. 功能清單" },
  { id: "structure", label: "4. 功能架構" },
  { id: "flows", label: "5. 功能流程" },
  { id: "pages", label: "6. 頁面設計" },
  { id: "style", label: "7. 視覺風格" },
  { id: "nfr", label: "8. 非功能需求" },
  { id: "data", label: "9. 資料與介面" },
  { id: "metrics", label: "10. 數據指標" },
  { id: "roadmap", label: "11. 風險與規劃" },
];

const REVISION_STYLE: Record<Revision["type"], string> = {
  新增: "bg-emerald-700/10 text-emerald-800",
  調整: "bg-sky-700/10 text-sky-800",
  修正: "bg-amber-700/10 text-amber-800",
  安全性: "bg-red-700/10 text-red-800",
  架構: "bg-ink/10 text-ink",
};

const STATUS_STYLE: Record<Feature["status"], string> = {
  已上線: "border-emerald-700/30 text-emerald-800",
  開發中: "border-amber-700/30 text-amber-800",
  規劃中: "border-dashed border-ink/30 text-ink-soft",
};

export default async function PrdPage({ params }: PageProps<"/projects/[slug]/prd">) {
  const { slug } = await params;
  const p = getProject(slug);
  const prd = getPrd(slug);
  if (!p || !prd) notFound();

  const accent = p.accent;
  const latest = prd.revisions[prd.revisions.length - 1];
  const modules = [...new Set(prd.features.map((f) => f.module))];
  const shipped = prd.features.filter((f) => f.status === "已上線").length;

  return (
    <div style={{ "--accent": accent } as CSSProperties}>
      {/* ───────── 文件封面 ───────── */}
      <section className="paper-grain border-b border-line">
        <div className="mx-auto max-w-6xl px-4 pb-12 pt-10 sm:px-6 md:pb-16 md:pt-14">
          <Link href={`/projects/${p.slug}`} className="text-sm text-ink-soft hover:text-ink print:hidden">
            ← {p.name} 案例
          </Link>
          <p className="mt-8 font-mono text-xs tracking-[0.2em]" style={{ color: accent }}>
            PRODUCT REQUIREMENTS DOCUMENT
          </p>
          <h1 className="mt-3 font-serif text-4xl font-bold tracking-tight sm:text-6xl">{p.name}</h1>
          <p className="mt-2 font-serif text-2xl text-ink-soft sm:text-3xl">產品需求文件</p>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-ink-soft">{p.tagline}</p>

          <dl className="mt-10 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
            <Meta label="產品版本">{prd.version}</Meta>
            <Meta label="狀態">{prd.docStatus}</Meta>
            <Meta label="產品負責人">{site.name}（產品、設計、開發）</Meta>
            <Meta label="最後修訂">{latest.date}</Meta>
            <Meta label="功能" className="sm:col-span-2 lg:col-span-1">{`${shipped} 項已上線・${prd.features.length - shipped} 項規劃中`}</Meta>
          </dl>

          <div className="mt-8 flex flex-wrap gap-3 print:hidden">
            <PrintButton accent={accent} />
            {p.url && (
              <a href={p.url} target="_blank" rel="noreferrer" className="rounded-full border border-ink/25 px-6 py-3 text-sm font-medium hover:border-ink">
                開啟網站 ↗
              </a>
            )}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:grid lg:grid-cols-[170px_1fr] lg:gap-12">
        <aside className="hidden lg:block print:hidden">
          <nav className="sticky top-24 space-y-1 py-14 text-sm">
            {sections.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="block border-l border-line py-1.5 pl-4 text-ink-soft hover:border-[var(--accent)] hover:text-ink">
                {s.label}
              </a>
            ))}
          </nav>
        </aside>

        <div className="min-w-0 py-14 md:py-16">
          {/* 1. 修訂追蹤 */}
          <Section id="revisions" no="1" eyebrow="REVISION HISTORY" title="修訂追蹤表">
            <Table head={["版本", "日期", "類型", "修訂內容"]} cols="sm:grid-cols-[80px_110px_70px_1fr]">
              {[...prd.revisions].reverse().map((r) => (
                <Row key={r.version} cols="sm:grid-cols-[80px_110px_70px_1fr]">
                  <span className="font-mono text-sm font-semibold" style={{ color: accent }}>{r.version}</span>
                  <span className="font-mono text-sm text-ink-soft">{r.date}</span>
                  <span>
                    <span className={`rounded px-1.5 py-0.5 text-xs ${REVISION_STYLE[r.type]}`}>{r.type}</span>
                  </span>
                  <span className="leading-7">{r.summary}</span>
                </Row>
              ))}
            </Table>
          </Section>

          {/* 2. 背景簡介 */}
          <Section id="background" no="2" eyebrow="BACKGROUND" title="背景簡介">
            <Sub no="2.1">背景</Sub>
            <p className="mt-3 leading-8 text-ink-soft">{prd.background.context}</p>
            <Sub no="2.2">問題陳述</Sub>
            <blockquote className="mt-3 border-l-4 py-1 pl-5 font-serif text-xl leading-9" style={{ borderColor: accent }}>
              {prd.background.problem}
            </blockquote>
            <Sub no="2.3">機會與解法</Sub>
            <p className="mt-3 leading-8 text-ink-soft">{prd.background.opportunity}</p>

            <Sub no="2.4">目標使用者</Sub>
            <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {prd.background.personas.map((u) => (
                <article key={u.name} className="rounded-xl border border-line bg-white/50 p-5 break-inside-avoid">
                  <p className="font-semibold">{u.name}</p>
                  <p className="mt-1 text-sm leading-6 text-ink-soft">{u.profile}</p>
                  <p className="mt-4 text-xs font-medium" style={{ color: accent }}>需求</p>
                  <ul className="mt-1 space-y-1 text-sm leading-6">
                    {u.needs.map((x) => <li key={x}>・{x}</li>)}
                  </ul>
                  <p className="mt-3 text-xs font-medium text-ink-soft">痛點</p>
                  <ul className="mt-1 space-y-1 text-sm leading-6 text-ink-soft">
                    {u.pains.map((x) => <li key={x}>・{x}</li>)}
                  </ul>
                </article>
              ))}
            </div>

            <Sub no="2.5">產品目標與衡量方式</Sub>
            <Table head={["目標", "衡量方式"]} cols="sm:grid-cols-[1fr_1.6fr]" className="mt-4">
              {prd.background.goals.map((g) => (
                <Row key={g.goal} cols="sm:grid-cols-[1fr_1.6fr]">
                  <span className="font-medium">{g.goal}</span>
                  <span className="leading-7 text-ink-soft">{g.measure}</span>
                </Row>
              ))}
            </Table>

            <Sub no="2.6">範疇</Sub>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <ListBox title="納入範圍" items={p.pm.scopeIn} mark="✓" color={accent} />
              <ListBox title="刻意不做" items={p.pm.scopeOut} mark="—" color="#8a8478" />
            </div>
          </Section>

          {/* 3. 功能清單 */}
          <Section id="features" no="3" eyebrow="FEATURE LIST" title="功能清單">
            <p className="mb-5 text-sm leading-7 text-ink-soft">
              優先級：<b>P0</b> 沒有就不能上線、<b>P1</b> 影響體驗的重要功能、<b>P2</b> 加分項目。版本對應修訂追蹤表。
            </p>
            <div className="space-y-6">
              {modules.map((m) => (
                <div key={m} className="break-inside-avoid">
                  <p className="mb-2 text-sm font-semibold">{m}</p>
                  <Table head={["編號", "功能", "說明", "優先級", "狀態", "版本"]} cols="sm:grid-cols-[52px_140px_1fr_52px_66px_56px]">
                    {prd.features
                      .filter((f) => f.module === m)
                      .map((f) => (
                        <Row key={f.id} cols="sm:grid-cols-[52px_140px_1fr_52px_66px_56px]">
                          <span className="font-mono text-xs text-ink-soft">{f.id}</span>
                          <span className="font-medium">{f.name}</span>
                          <span className="text-sm leading-6 text-ink-soft">{f.desc}</span>
                          <span className="font-mono text-xs font-semibold" style={{ color: f.priority === "P0" ? accent : undefined }}>
                            {f.priority}
                          </span>
                          <span>
                            <span className={`rounded border px-1.5 py-0.5 text-[11px] ${STATUS_STYLE[f.status]}`}>{f.status}</span>
                          </span>
                          <span className="font-mono text-xs text-ink-soft">{f.release}</span>
                        </Row>
                      ))}
                  </Table>
                </div>
              ))}
            </div>
          </Section>

          {/* 4. 功能架構 */}
          <Section id="structure" no="4" eyebrow="FEATURE STRUCTURE" title="功能架構">
            <FeatureTree root={prd.structure} accent={accent} />
          </Section>

          {/* 5. 功能流程 */}
          <Section id="flows" no="5" eyebrow="USER FLOWS" title="功能流程">
            <div className="space-y-12">
              {prd.flows.map((f) => (
                <article key={f.id} className="break-inside-avoid">
                  <p className="font-mono text-xs text-ink-soft">{f.id}</p>
                  <h3 className="mt-1 text-xl font-semibold">{f.title}</h3>
                  <p className="mt-1 text-sm text-ink-soft">目的：{f.goal}</p>
                  <div className="mt-5 rounded-2xl border border-line bg-white/40 p-4 sm:p-6">
                    <FlowChart flow={f} accent={accent} />
                  </div>
                  {f.exceptions.length > 0 && (
                    <div className="mt-4 rounded-xl bg-paper-2/60 p-4">
                      <p className="text-xs font-semibold text-ink-soft">例外與邊界處理</p>
                      <ul className="mt-2 space-y-1 text-sm leading-6">
                        {f.exceptions.map((e) => <li key={e}>・{e}</li>)}
                      </ul>
                    </div>
                  )}
                </article>
              ))}
            </div>
          </Section>

          {/* 6. 頁面設計 */}
          <Section id="pages" no="6" eyebrow="WIREFRAMES" title="頁面設計（線框圖）">
            <p className="mb-8 text-sm leading-7 text-ink-soft">
              低保真線框圖只表達資訊層級與版面配置，文字為示意。圓圈編號對應右側的設計說明。
            </p>
            <div className="space-y-16">
              {prd.pages.map((pg) => (
                <article key={pg.id} className="break-inside-avoid">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="font-mono text-xs text-ink-soft">{pg.id}</span>
                    <h3 className="text-xl font-semibold">{pg.name}</h3>
                    <span className="rounded border border-line px-1.5 py-0.5 text-[11px] text-ink-soft">{pg.device === "mobile" ? "手機" : "桌機"}</span>
                  </div>
                  <p className="mt-1 text-sm text-ink-soft">目的：{pg.purpose}</p>
                  <div className={`mt-5 grid gap-6 ${pg.device === "mobile" ? "md:grid-cols-[320px_1fr]" : "xl:grid-cols-[1fr_280px]"}`}>
                    <WireframeFrame device={pg.device} route={pg.route} accent={accent}>
                      <Wireframe blocks={pg.wire} />
                    </WireframeFrame>
                    <ol className="space-y-3 self-start">
                      {pg.notes.map((n) => (
                        <li key={n.n} className="flex gap-3 text-sm leading-6">
                          <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full font-mono text-[10px] font-bold text-white" style={{ background: accent }}>
                            {n.n}
                          </span>
                          <span className="text-ink-soft">{n.text}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </article>
              ))}
            </div>
          </Section>

          {/* 7. 視覺風格 */}
          <Section id="style" no="7" eyebrow="VISUAL STYLE" title="視覺風格">
            <Sub no="7.1">風格關鍵字</Sub>
            <div className="mt-3 flex flex-wrap gap-2">
              {prd.style.keywords.map((k) => (
                <span key={k} className="rounded-full border px-3 py-1 text-sm" style={{ borderColor: accent, color: accent }}>
                  {k}
                </span>
              ))}
            </div>

            <Sub no="7.2">色彩</Sub>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {prd.style.colors.map((c) => (
                <div key={c.name} className="overflow-hidden rounded-xl border border-line bg-white/60 break-inside-avoid">
                  <div className="h-16 border-b border-line" style={{ background: c.hex }} />
                  <div className="p-3">
                    <p className="text-sm font-semibold">{c.name}</p>
                    <p className="font-mono text-xs text-ink-soft uppercase">{c.hex}</p>
                    <p className="mt-1 text-xs leading-5 text-ink-soft">{c.usage}</p>
                  </div>
                </div>
              ))}
            </div>

            <Sub no="7.3">字體</Sub>
            <div className="mt-4 overflow-hidden rounded-xl border border-line">
              {prd.style.fonts.map((f) => (
                <div key={f.role} className="grid gap-2 border-t border-line bg-white/40 px-5 py-4 first:border-t-0 sm:grid-cols-[180px_1fr] sm:gap-6">
                  <div>
                    <p className="text-xs text-ink-soft">{f.role}</p>
                    <p className="font-mono text-sm font-medium">{f.family}</p>
                    <p className="mt-1 text-xs text-ink-soft">{f.usage}</p>
                  </div>
                  <p className={`self-center text-2xl ${f.serif ? "font-serif" : f.mono ? "font-mono text-lg" : ""}`}>{f.sample}</p>
                </div>
              ))}
            </div>

            <Sub no="7.4">元件規範</Sub>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {prd.style.components.map((c) => (
                <div key={c.name} className="rounded-xl border border-line bg-white/50 p-4 break-inside-avoid">
                  <p className="font-semibold">{c.name}</p>
                  <p className="mt-1 text-sm leading-6 text-ink-soft">{c.spec}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2">
              <ListBox title="7.5 動態" items={prd.style.motion} mark="◦" color={accent} />
              <ListBox title="7.6 語氣與文案" items={prd.style.voice} mark="◦" color={accent} />
            </div>
          </Section>

          {/* 8. 非功能需求 */}
          <Section id="nfr" no="8" eyebrow="NON-FUNCTIONAL REQUIREMENTS" title="非功能需求">
            <div className="grid gap-4 md:grid-cols-2">
              {prd.nfr.map((n) => (
                <ListBox key={n.category} title={n.category} items={n.items} mark="■" color={accent} />
              ))}
            </div>
          </Section>

          {/* 9. 資料與介面 */}
          <Section id="data" no="9" eyebrow="DATA & API" title="資料與介面">
            <Sub no="9.1">資料實體</Sub>
            <Table head={["名稱", "說明", "主要欄位"]} cols="sm:grid-cols-[150px_1fr_1.4fr]" className="mt-4">
              {prd.data.entities.map((e) => (
                <Row key={e.name} cols="sm:grid-cols-[150px_1fr_1.4fr]">
                  <span className="font-mono text-sm font-medium">{e.name}</span>
                  <span className="text-sm leading-6">{e.desc}</span>
                  <span className="text-sm leading-6 text-ink-soft">{e.fields}</span>
                </Row>
              ))}
            </Table>

            <Sub no="9.2">API</Sub>
            {prd.data.apis.length ? (
              <Table head={["方法", "路徑", "用途", "權限"]} cols="sm:grid-cols-[110px_1.1fr_1.3fr_1fr]" className="mt-4">
                {prd.data.apis.map((a) => (
                  <Row key={a.path + a.method} cols="sm:grid-cols-[110px_1.1fr_1.3fr_1fr]">
                    <span className="font-mono text-xs font-semibold" style={{ color: accent }}>{a.method}</span>
                    <span className="font-mono text-xs break-all">{a.path}</span>
                    <span className="text-sm leading-6">{a.desc}</span>
                    <span className="text-sm leading-6 text-ink-soft">{a.auth}</span>
                  </Row>
                ))}
              </Table>
            ) : (
              <p className="mt-3 rounded-xl border border-dashed border-line p-4 text-sm text-ink-soft">純前端網站，沒有後端 API；資料存在使用者的瀏覽器。</p>
            )}
          </Section>

          {/* 10. 數據指標 */}
          <Section id="metrics" no="10" eyebrow="METRICS" title="數據指標">
            <Table head={["指標", "定義", "狀態"]} cols="sm:grid-cols-[160px_1fr_72px]">
              {prd.metrics.map((m) => (
                <Row key={m.name} cols="sm:grid-cols-[160px_1fr_72px]">
                  <span className="font-medium">{m.name}</span>
                  <span className="text-sm leading-6 text-ink-soft">{m.definition}</span>
                  <span>
                    <span className={`rounded border px-1.5 py-0.5 text-[11px] ${m.status === "已追蹤" ? STATUS_STYLE["已上線"] : STATUS_STYLE["規劃中"]}`}>{m.status}</span>
                  </span>
                </Row>
              ))}
            </Table>
          </Section>

          {/* 11. 風險與規劃 */}
          <Section id="roadmap" no="11" eyebrow="RISKS & ROADMAP" title="風險與後續規劃">
            <Sub no="11.1">風險與因應</Sub>
            <Table head={["風險", "因應方式"]} cols="sm:grid-cols-2" className="mt-4">
              {p.pm.risks.map((r) => (
                <Row key={r.risk} cols="sm:grid-cols-2">
                  <span className="font-medium leading-7">{r.risk}</span>
                  <span className="leading-7 text-ink-soft">{r.response}</span>
                </Row>
              ))}
            </Table>
            <Sub no="11.2">後續規劃</Sub>
            <ol className="mt-4 grid gap-3 sm:grid-cols-3">
              {p.next.map((n, i) => (
                <li key={n} className="rounded-xl border border-line p-4">
                  <span className="font-mono text-xs text-ink-soft">0{i + 1}</span>
                  <p className="mt-1 font-medium leading-7">{n}</p>
                </li>
              ))}
            </ol>
          </Section>
        </div>
      </div>
    </div>
  );
}

function Section({ id, no, eyebrow, title, children }: { id: string; no: string; eyebrow: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-20 border-t border-line pt-10 pb-16 first:border-t-0 first:pt-0">
      <p className="font-mono text-xs tracking-[0.2em]" style={{ color: "var(--accent)" }}>
        {no.padStart(2, "0")} · {eyebrow}
      </p>
      <h2 className="mt-2 mb-6 font-serif text-3xl font-bold">{title}</h2>
      {children}
    </section>
  );
}

function Sub({ no, children }: { no: string; children: ReactNode }) {
  return (
    <h3 className="mt-10 text-lg font-semibold first:mt-0">
      <span className="mr-2 font-mono text-sm text-ink-soft">{no}</span>
      {children}
    </h3>
  );
}

function Meta({ label, children, className = "" }: { label: string; children: ReactNode; className?: string }) {
  return (
    <div className={`bg-paper/90 p-4 ${className}`}>
      <dt className="text-xs text-ink-soft">{label}</dt>
      <dd className="mt-1 text-sm leading-6 font-medium">{children}</dd>
    </div>
  );
}

// 表格：桌機是多欄，手機每列改成上下堆疊
function Table({ head, cols, className = "", children }: { head: string[]; cols: string; className?: string; children: ReactNode }) {
  return (
    <div className={`overflow-hidden rounded-xl border border-line bg-white/40 ${className}`}>
      <div className={`hidden gap-4 bg-paper-2/70 px-4 py-2.5 text-xs font-medium text-ink-soft sm:grid ${cols}`}>
        {head.map((h) => <span key={h}>{h}</span>)}
      </div>
      {children}
    </div>
  );
}

function Row({ cols, children }: { cols: string; children: ReactNode }) {
  return <div className={`grid items-start gap-1.5 border-t border-line px-4 py-3 first:border-t-0 sm:gap-4 sm:first:border-t ${cols}`}>{children}</div>;
}

function ListBox({ title, items, mark, color }: { title: string; items: string[]; mark: string; color: string }) {
  return (
    <div className="rounded-xl border border-line bg-white/50 p-5 break-inside-avoid">
      <p className="text-sm font-semibold">{title}</p>
      <ul className="mt-3 space-y-2">
        {items.map((it) => (
          <li key={it} className="flex gap-3 text-sm leading-6 text-ink-soft">
            <span className="shrink-0" style={{ color }}>{mark}</span>
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}
