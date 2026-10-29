// 系統架構圖：三欄（使用者端 → 伺服器 → 外部服務與資料），桌機橫排、手機直排

import type { ArchColumn } from "@/lib/projects";

export function ArchDiagram({ columns, accent }: { columns: ArchColumn[]; accent: string }) {
  return (
    <div className="rounded-2xl border border-line bg-white/50 p-4 sm:p-6">
      <div className="flex flex-col items-stretch gap-3 md:flex-row md:items-center md:gap-0">
        {columns.map((col, i) => (
          <div key={col.title} className="contents">
            {i > 0 && (
              <div className="flex shrink-0 items-center justify-center md:w-10" aria-hidden>
                <span className="text-lg md:hidden" style={{ color: accent }}>↓</span>
                <span className="hidden text-lg md:inline" style={{ color: accent }}>→</span>
              </div>
            )}
            <div
              className="flex-1 rounded-xl border p-4"
              style={{ borderColor: i === 1 ? accent : "var(--color-line)", background: i === 1 ? `${accent}0d` : "var(--color-paper)" }}
            >
              <p className="font-mono text-[11px] tracking-wider uppercase" style={{ color: accent }}>
                {col.title}
              </p>
              <ul className="mt-3 space-y-2">
                {col.nodes.map((n) => (
                  <li key={n.name} className="rounded-lg border border-line bg-white px-3 py-2">
                    <p className="text-sm font-semibold">{n.name}</p>
                    {n.note && <p className="mt-0.5 text-xs leading-5 text-ink-soft">{n.note}</p>}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
