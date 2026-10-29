"use client";

// 頁面底部的「後台監控模式」開關：打開後顯示服務狀態、交付時程與資安檢查
// 服務狀態在打開時才向 /api/status 即時檢查，其餘內容由伺服器端渲染後傳進來

import { useState, type ReactNode } from "react";
import { useView } from "@/components/view-context";

type Status = { checkedAt: string; results: { slug: string; name: string; url: string; ok: boolean; status: number; ms: number }[] };

export function AdminView({ children }: { children: ReactNode }) {
  const { admin, setAdmin } = useView();
  const [status, setStatus] = useState<Status | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function check() {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch("/api/status", { cache: "no-store" });
      if (!res.ok) throw new Error(String(res.status));
      setStatus(await res.json());
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  function toggle() {
    const next = !admin;
    setAdmin(next);
    if (next && !status) check();
  }

  return (
    <section id="admin" className={`border-t transition-colors ${admin ? "border-[#2b2f36] bg-[#14171c] text-[#e6e8eb]" : "border-line"}`}>
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className={`font-mono text-xs tracking-[0.25em] ${admin ? "text-[#8b949e]" : "text-ink-soft"}`}>ADMIN VIEW</p>
            <p className="mt-1 text-sm">{admin ? "後台監控模式：即時服務狀態、交付時程、資安檢查" : "想看專案上線後的運作狀況？"}</p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={admin}
            onClick={toggle}
            className={`flex items-center gap-3 rounded-full border px-4 py-2 font-mono text-sm transition ${
              admin ? "border-[#3fb950]/50 text-[#3fb950]" : "border-ink/20 hover:border-ink"
            }`}
          >
            <span className={`relative h-5 w-9 rounded-full transition ${admin ? "bg-[#3fb950]/30" : "bg-ink/15"}`}>
              <span className={`absolute top-0.5 size-4 rounded-full transition-all ${admin ? "left-[18px] bg-[#3fb950]" : "left-0.5 bg-white shadow"}`} />
            </span>
            ⚙️ {admin ? "關閉後台監控模式" : "切換至後台監控模式（Admin View）"}
          </button>
        </div>

        {admin && (
          <div className="lens-in mt-10 space-y-10">
            <div>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-mono text-sm tracking-wider text-[#8b949e] uppercase">Service Status・即時檢查</h3>
                <button type="button" onClick={check} disabled={loading} className="font-mono text-xs text-[#58a6ff] hover:underline disabled:opacity-50">
                  {loading ? "檢查中…" : "↻ 重新檢查"}
                </button>
              </div>
              {error && <p className="mt-4 text-sm text-[#f85149]">檢查失敗，請稍後再試。</p>}
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {(status?.results ?? []).map((r) => (
                  <a key={r.slug} href={r.url} target="_blank" rel="noreferrer" className="rounded-lg border border-[#2b2f36] bg-[#1b1f26] p-4 hover:border-[#3b424d]">
                    <p className="flex items-center gap-2 text-sm font-semibold">
                      <span className={`size-2 rounded-full ${r.ok ? "bg-[#3fb950]" : "bg-[#f85149]"}`} />
                      {r.name}
                    </p>
                    <p className="mt-3 font-mono text-2xl">{r.ok ? `${r.ms} ms` : "無法連線"}</p>
                    <p className="mt-1 font-mono text-xs text-[#8b949e]">
                      HTTP {r.status || "—"}・{r.url.replace("https://", "")}
                    </p>
                  </a>
                ))}
                {!status && !error && <p className="font-mono text-sm text-[#8b949e]">檢查中…</p>}
              </div>
              {status && (
                <p className="mt-3 font-mono text-xs text-[#8b949e]">
                  檢查時間 {new Date(status.checkedAt).toLocaleString("zh-TW", { hour12: false })}・回應時間由本站伺服器量測，包含網路延遲
                </p>
              )}
            </div>
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
