"use client";

// 首頁作品卡片：依頂部的視角切換，顯示 PM 視角或工程師視角的重點

import Image from "next/image";
import Link from "next/link";
import { PerspectiveToggle, useView } from "@/components/view-context";
import type { Project } from "@/lib/projects";

// 只傳卡片需要的欄位給瀏覽器，避免整份專案資料進到前端
export type CardData = Pick<
  Project,
  "slug" | "name" | "category" | "tagline" | "status" | "url" | "repo" | "accent" | "cover" | "period" | "buildTime" | "lens"
> & {
  scopeIn: number;
  scopeOut: string;
  sprints: { date: string; phase: string; maintenance: boolean }[];
};

export function ProjectCards({ cards }: { cards: CardData[] }) {
  const { perspective } = useView();
  const pm = perspective === "pm";

  return (
    <>
      <div className="mt-8 flex flex-wrap items-center gap-4">
        <PerspectiveToggle />
        <p className="text-sm text-ink-soft">
          {pm ? "使用者洞察、範疇控管、敏捷時程、商業指標" : "API 架構、Tool Use／MCP、狀態管理、例外處理"}
        </p>
      </div>

      <div className="mt-12 space-y-8">
        {cards.map((p, i) => (
          <article key={p.slug} className="grid overflow-hidden rounded-2xl border border-line bg-white/55 lg:grid-cols-[5fr_7fr]">
            <Link href={`/projects/${p.slug}`} className="group relative block aspect-[16/10] overflow-hidden border-b border-line bg-paper-2 lg:aspect-auto lg:border-r lg:border-b-0">
              {p.cover ? (
                <Image
                  src={p.cover}
                  alt={`${p.name} 畫面`}
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover object-top transition duration-700 group-hover:scale-[1.03]"
                />
              ) : (
                <div className="flex h-full items-center justify-center p-8 font-serif text-2xl font-bold" style={{ background: `${p.accent}14`, color: p.accent }}>
                  {p.name}
                </div>
              )}
              <span className="absolute left-4 top-4 rounded-full bg-ink/80 px-2.5 py-1 font-mono text-[11px] text-paper">{String(i + 1).padStart(2, "0")}</span>
            </Link>

            <div className="p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="rounded-full px-2.5 py-1 font-medium text-white" style={{ background: p.accent }}>
                  {p.category}
                </span>
                <span className={`rounded-full border px-2.5 py-1 ${p.status === "上線中" ? "border-emerald-700/30 text-emerald-800" : "border-amber-700/30 text-amber-800"}`}>
                  ● {p.status}
                </span>
                <span className="text-ink-soft">
                  {p.period}・{p.buildTime}
                </span>
              </div>
              <h3 className="mt-3 font-serif text-2xl font-bold sm:text-3xl">{p.name}</h3>
              <p className="mt-2 leading-7 text-ink-soft">{p.tagline}</p>

              {/* key 隨視角改變，讓內容重新播放淡入 */}
              <dl key={perspective} className="lens-in mt-6 grid gap-x-6 gap-y-5 border-t border-line pt-5 sm:grid-cols-2">
                {pm ? (
                  <>
                    <Item label="使用者洞察" accent={p.accent}>{p.lens.insight}</Item>
                    <Item label="PRD 範疇控管" accent={p.accent}>
                      做 {p.scopeIn} 項；刻意不做：{p.scopeOut}
                    </Item>
                    <Item label="敏捷時程（Sprints）" accent={p.accent}>
                      <ol className="mt-1 space-y-1">
                        {p.sprints.map((s) => (
                          <li key={s.date + s.phase} className="flex gap-2">
                            <span className="font-mono text-xs text-ink-soft">{s.date}</span>
                            <span>{s.phase}</span>
                            {s.maintenance && <span className="text-xs text-ink-soft">（維護）</span>}
                          </li>
                        ))}
                      </ol>
                    </Item>
                    <Item label="商業與轉換指標" accent={p.accent}>
                      <ul className="mt-1 space-y-1">
                        {p.lens.roi.map((r) => (
                          <li key={r}>{r}</li>
                        ))}
                      </ul>
                    </Item>
                  </>
                ) : (
                  <>
                    <Item label="API 呼叫架構" accent={p.accent}>{p.lens.api}</Item>
                    <Item label="Tool Use／MCP" accent={p.accent}>{p.lens.tools}</Item>
                    <Item label="狀態管理（State Machine）" accent={p.accent}>{p.lens.state}</Item>
                    <Item label="例外與邊界處理" accent={p.accent}>
                      <ul className="mt-1 space-y-1">
                        {p.lens.edges.map((e) => (
                          <li key={e}>{e}</li>
                        ))}
                      </ul>
                    </Item>
                  </>
                )}
              </dl>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link href={`/projects/${p.slug}`} className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper hover:bg-ink/85">
                  看案例 →
                </Link>
                {p.url && (
                  <a href={p.url} target="_blank" rel="noreferrer" className="rounded-full border border-ink/25 px-5 py-2.5 text-sm font-medium hover:border-ink">
                    開啟網站 ↗
                  </a>
                )}
                {p.repo && (
                  <a href={p.repo} target="_blank" rel="noreferrer" className="px-2 py-2.5 text-sm font-medium text-ink-soft underline-offset-4 hover:text-ink hover:underline">
                    GitHub ↗
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

function Item({ label, accent, children }: { label: string; accent: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="flex items-center gap-2 text-xs font-semibold tracking-wide">
        <span className="h-3 w-0.5 rounded" style={{ background: accent }} />
        {label}
      </dt>
      <dd className="mt-1.5 text-[15px] leading-7 text-ink-soft">{children}</dd>
    </div>
  );
}
