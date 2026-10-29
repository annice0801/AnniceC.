import Image from "next/image";
import Link from "next/link";
import { AdminView } from "@/components/admin-view";
import { ProjectCards, type CardData } from "@/components/project-cards";
import { Reveal } from "@/components/reveal";
import { projects } from "@/lib/projects";

const identities = ["AI 交付專案經理（Delivery PM）", "前線 AI 應用工程師（FDE／Solutions）", "經濟學・財務背景"];

const stack = ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "MongoDB", "OpenAI API", "Claude API", "Zod", "Better Auth", "Vercel"];

// 關於我：三個複合型能力模組，各自對應一個企業常見的痛點
const modules = [
  {
    no: "01",
    title: "商業判斷 × 成本工程",
    color: "#c2502e",
    pain: "AI 專案一直燒錢，卻說不出投入換到什麼。",
    how: "經濟學與財務背景，讓我從第一天就把 token 成本、轉換漏斗與訂價放進產品設計，而不是上線後才補報表。",
    proof: "OfferMate 採使用者自備金鑰，平台 AI 成本為 0；後台記錄每位會員的 token 成本作為訂價依據。",
  },
  {
    no: "02",
    title: "範疇控管 × 敏捷交付",
    color: "#0f766e",
    pain: "需求一路膨脹，專案遲遲上不了線。",
    how: "每個專案先寫「這次不做什麼」，把第一版壓到幾個小時內可以交付，上線後再依數據排維護期。",
    proof: "OfferMate 實際操作約 3 小時、Taste-Trace 約 7.5 小時，做出第一版並上線。",
  },
  {
    no: "03",
    title: "AI 工程 × 生產維運",
    color: "#4a6a9b",
    pain: "PoC 做得出來，卻上不了正式環境。",
    how: "親手串接 API、處理例外與權限、部署與監控。上線不是終點：環境變數、建置失敗、資安漏洞都要自己收尾。",
    proof: "2 套權限分級的管理後台；Next.js critical 漏洞在發現當天升級並部署上線。",
  },
];

const securityRules = [
  { title: "金鑰不落地", body: "使用者自備的金鑰只存在瀏覽器，由標頭帶入、伺服器用完即丟" },
  { title: "API 嚴格驗證", body: "未登入回 401、權限不足回 403，頁面與 API 共用同一份權限表" },
  { title: "登入憑證保護", body: "HTTP-only、SameSite=Lax cookie，憑證內只放使用者 ID" },
  { title: "最小化個資", body: "錯誤日誌寫入前自動遮蔽金鑰與 token" },
  { title: "分權與稽核", body: "擁有者、管理員、唯讀客服分開授權，每次修改留下紀錄" },
  { title: "測試與正式分離", body: "測試使用獨立資料庫；本站後台截圖全部使用假資料" },
];

export default function Home() {
  const cards: CardData[] = projects.map((p) => ({
    slug: p.slug,
    name: p.name,
    category: p.category,
    tagline: p.tagline,
    status: p.status,
    url: p.url,
    repo: p.repo,
    accent: p.accent,
    cover: p.cover,
    period: p.period,
    buildTime: p.buildTime,
    lens: p.lens,
    scopeIn: p.pm.scopeIn.length,
    scopeOut: p.pm.scopeOut[0].split("：")[0],
    sprints: p.pm.timeline.slice(0, 4).map((m) => ({ date: m.date, phase: m.phase, maintenance: m.kind === "maintenance" })),
  }));

  return (
    <>
      {/* ───────── 主畫面：一句話說清楚我是誰 ───────── */}
      <section className="paper-grain relative flex min-h-[calc(100svh-3.5rem)] items-center overflow-hidden">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
          <Reveal>
            <p className="font-mono text-xs tracking-[0.25em] text-ink-soft">ANNICE · PORTFOLIO 2026</p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-6 max-w-4xl font-serif text-[2.1rem] leading-[1.3] font-bold tracking-tight sm:text-5xl lg:text-6xl">
              將複雜商業痛點，
              <br />
              轉化為
              <br className="sm:hidden" />
              <span className="whitespace-nowrap text-accent">生產就緒的 AI 應用</span>
              <br />
              與敏捷交付產品
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-5 max-w-2xl font-mono text-sm leading-6 text-ink-soft sm:text-base">
              Bridging Business Logic &amp; Production-Ready AI via Modern Engineering &amp; Delivery Rigor
            </p>
          </Reveal>
          <Reveal delay={240}>
            <ul className="mt-8 flex flex-wrap gap-2">
              {identities.map((t) => (
                <li key={t} className="rounded-full border border-ink/20 bg-white/60 px-3.5 py-1.5 text-sm font-medium">
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={300}>
            <ul className="mt-5 flex max-w-3xl flex-wrap gap-1.5" aria-label="技術棧">
              {stack.map((t) => (
                <li key={t} className="rounded-md bg-ink/[0.06] px-2 py-1 font-mono text-[11px] text-ink-soft">
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={360}>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="#work" className="rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-paper hover:bg-ink/85">
                探索專案 ↓
              </Link>
              <Link href="#about" className="rounded-full border border-ink/25 px-7 py-3.5 text-sm font-medium hover:border-ink">
                關於我
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────── 關於我：三個複合型能力模組 ───────── */}
      <section id="about" className="border-t border-line">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
          <Reveal>
            <p className="font-mono text-xs tracking-[0.25em] text-ink-soft">ABOUT ME</p>
            <h2 className="mt-4 font-serif text-3xl font-bold sm:text-4xl">三種能力，解三個痛點</h2>
          </Reveal>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {modules.map((m, i) => (
              <Reveal key={m.no} delay={i * 90} className="flex flex-col rounded-2xl border border-line bg-white/55 p-6 sm:p-7">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs" style={{ color: m.color }}>{m.no}</span>
                  <span className="h-px flex-1" style={{ background: `${m.color}55` }} />
                </div>
                <h3 className="mt-4 font-serif text-2xl font-bold" style={{ color: m.color }}>{m.title}</h3>
                <p className="mt-5 text-xs font-semibold tracking-wide text-ink-soft">企業痛點</p>
                <p className="mt-1 font-medium leading-7">{m.pain}</p>
                <p className="mt-4 text-xs font-semibold tracking-wide text-ink-soft">我的做法</p>
                <p className="mt-1 leading-7 text-ink-soft">{m.how}</p>
                <p className="mt-auto pt-5">
                  <span className="block rounded-lg px-3.5 py-3 text-sm leading-6" style={{ background: `${m.color}12` }}>
                    <span className="font-semibold" style={{ color: m.color }}>證據　</span>
                    {m.proof}
                  </span>
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── 作品：雙視角切換 ───────── */}
      <section id="work" className="border-t border-line bg-paper-2/50">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
          <Reveal>
            <p className="font-mono text-xs tracking-[0.25em] text-ink-soft">SELECTED WORK</p>
            <h2 className="mt-4 font-serif text-3xl font-bold sm:text-4xl">作品專案</h2>
            <p className="mt-3 text-ink-soft">依製作順序排列，時數為實際操作時間。切換視角，看同一個專案的兩種讀法。</p>
          </Reveal>
          <ProjectCards cards={cards} />
        </div>
      </section>

      {/* ───────── 後台監控模式 ───────── */}
      <AdminView>
        <div>
          <h3 className="font-mono text-sm tracking-wider text-[#8b949e] uppercase">Delivery・交付時程</h3>
          <div className="mt-4 overflow-x-auto">
            <Gantt />
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h3 className="font-mono text-sm tracking-wider text-[#8b949e] uppercase">Effort・實際操作時數</h3>
            <table className="mt-4 w-full text-sm">
              <thead className="text-left font-mono text-xs text-[#8b949e]">
                <tr className="border-b border-[#2b2f36]">
                  <th className="py-2 font-normal">專案</th>
                  <th className="py-2 font-normal">製作期</th>
                  <th className="py-2 font-normal">維護期</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((p) => (
                  <tr key={p.slug} className="border-b border-[#2b2f36]">
                    <td className="py-2.5 font-medium">{p.name}</td>
                    <td className="py-2.5 font-mono">{p.buildTime}</td>
                    <td className="py-2.5 font-mono text-[#8b949e]">{p.maintenance?.time ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-3 font-mono text-xs text-[#8b949e]">依開發對話紀錄計算，相鄰操作間隔超過 10 分鐘不計入。</p>
          </div>
          <div>
            <h3 className="font-mono text-sm tracking-wider text-[#8b949e] uppercase">Security・資安檢查</h3>
            <ul className="mt-4 space-y-2">
              {securityRules.map((r) => (
                <li key={r.title} className="flex gap-3 text-sm">
                  <span className="mt-0.5 text-[#3fb950]">✓</span>
                  <span>
                    <span className="font-semibold">{r.title}</span>
                    <span className="text-[#8b949e]">　{r.body}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <h3 className="font-mono text-sm tracking-wider text-[#8b949e] uppercase">Consoles・專案管理後台（假資料拍攝）</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {projects
              .filter((p) => p.adminShots.length > 0)
              .map((p) => (
                <Link key={p.slug} href={`/projects/${p.slug}#admin`} className="group overflow-hidden rounded-lg border border-[#2b2f36] bg-[#1b1f26] hover:border-[#3b424d]">
                  <Image src={p.adminShots[0].src} alt={`${p.name} 後台`} width={1440} height={900} sizes="(min-width: 640px) 50vw, 100vw" className="block h-auto w-full opacity-90 transition group-hover:opacity-100" />
                  <p className="flex items-center justify-between px-4 py-3 text-sm">
                    <span className="font-semibold">{p.name}</span>
                    <span className="font-mono text-xs text-[#58a6ff]">{p.adminShots.length} 個畫面 →</span>
                  </p>
                </Link>
              ))}
          </div>
        </div>
      </AdminView>
    </>
  );
}

// 甘特圖：2026/09/15 到 11/01，實心為製作期、斜線為維護期（深色後台樣式）
function Gantt() {
  const start = new Date("2026-09-15").getTime();
  const total = 47;
  const pos = (d: string) => ((new Date(d).getTime() - start) / 86400000 / total) * 100;
  // 期間文字「2026/09/23 – 2026/09/24」轉成起訖日期；「開發中」畫到 11/01
  const range = (period: string): [string, string] => {
    const [a, b] = period.split("–").map((x) => x.trim().replaceAll("/", "-"));
    const end = /^\d/.test(b) ? new Date(new Date(b).getTime() + 86400000).toISOString().slice(0, 10) : "2026-11-01";
    return [a, end];
  };
  const months = [
    { label: "9/15", at: "2026-09-15" },
    { label: "10/01", at: "2026-10-01" },
    { label: "10/15", at: "2026-10-15" },
    { label: "11/01", at: "2026-11-01" },
  ];
  return (
    <div className="min-w-[560px] rounded-lg border border-[#2b2f36] bg-[#1b1f26] p-5">
      <div className="relative ml-28 h-5 text-[11px] text-[#8b949e]">
        {months.map((m) => (
          <span key={m.label} className="absolute -translate-x-1/2 font-mono" style={{ left: `${pos(m.at)}%` }}>
            {m.label}
          </span>
        ))}
      </div>
      <div className="mt-3 space-y-3">
        {projects.map((p) => {
          const [a, b] = range(p.period);
          const m = p.maintenance && range(p.maintenance.period);
          return (
            <div key={p.slug} className="flex items-center">
              <span className="w-28 shrink-0 text-sm">{p.name}</span>
              <div className="relative h-6 flex-1 rounded bg-white/[0.04]">
                <span className="absolute inset-y-1 rounded" style={{ left: `${pos(a)}%`, width: `${pos(b) - pos(a)}%`, background: p.accent }} />
                {m && (
                  <span
                    className="absolute inset-y-1 rounded border"
                    style={{
                      left: `${pos(m[0])}%`,
                      width: `${pos(m[1]) - pos(m[0])}%`,
                      borderColor: p.accent,
                      background: `repeating-linear-gradient(135deg, ${p.accent}88 0 4px, transparent 4px 8px)`,
                    }}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
      <p className="mt-4 font-mono text-xs text-[#8b949e]">實心＝製作期（到第一版上線）・斜線＝維護期・CollabOffice 開發中</p>
    </div>
  );
}
