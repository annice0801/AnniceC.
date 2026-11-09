// PRD 用的兩種圖：功能流程（由上往下的流程圖）與功能架構（樹狀圖）
// 都用 HTML 與 CSS 畫，手機上直接縮成單欄，不需要左右捲動

import type { Flow, TreeNode } from "@/lib/prd/types";

// 功能流程：開始／結束是膠囊、動作是方框、系統處理是虛線框、判斷是菱形標記並在右側寫出「否」的去向
export function FlowChart({ flow, accent }: { flow: Flow; accent: string }) {
  return (
    <ol className="relative">
      {flow.steps.map((s, i) => {
        const last = i === flow.steps.length - 1;
        return (
          <li key={i} className="relative flex flex-col items-start pb-3 sm:flex-row sm:items-stretch sm:gap-3">
            {/* 左側：節點 */}
            <div className="flex w-full flex-col items-center sm:w-72 sm:shrink-0">
              <Node step={s} accent={accent} />
              {!last && <span className="mt-1 h-4 w-px bg-ink/40" aria-hidden />}
              {!last && (
                <span className="-mt-1 text-[10px] leading-none text-ink/50" aria-hidden>
                  ▼
                </span>
              )}
            </div>
            {/* 右側：判斷的分支 */}
            {s.kind === "decision" && (
              <div className="mx-auto mt-1 mb-2 w-full max-w-72 rounded-lg border border-dashed border-ink/25 bg-white/60 px-3 py-2 text-[13px] leading-6 sm:mx-0 sm:mt-0 sm:mb-0 sm:max-w-none sm:self-start">
                <p>
                  <span className="font-medium" style={{ color: accent }}>
                    是 ↓
                  </span>{" "}
                  {s.yes}
                </p>
                <p>
                  <span className="font-medium text-ink-soft">否 →</span> {s.no}
                </p>
              </div>
            )}
          </li>
        );
      })}
    </ol>
  );
}

function Node({ step, accent }: { step: Flow["steps"][number]; accent: string }) {
  const base = "w-full px-3 py-2 text-center text-sm leading-6";
  switch (step.kind) {
    case "start":
    case "end":
      return (
        <p className={`${base} rounded-full font-medium text-white`} style={{ background: step.kind === "start" ? accent : "var(--color-ink)" }}>
          {step.text}
        </p>
      );
    case "action":
      return (
        <p className={`${base} rounded-md border border-ink/30 bg-white`}>
          {step.actor && <span className="mr-1.5 rounded bg-ink/5 px-1.5 py-0.5 text-[11px] text-ink-soft">{step.actor}</span>}
          {step.text}
        </p>
      );
    case "system":
      return (
        <p className={`${base} rounded-md border border-dashed border-ink/40 bg-paper-2/60`}>
          <span className="mr-1.5 rounded px-1.5 py-0.5 font-mono text-[10px] text-white" style={{ background: accent }}>
            系統
          </span>
          {step.text}
        </p>
      );
    case "decision":
      return (
        <p className={`${base} relative rounded-md border-2 bg-white font-medium`} style={{ borderColor: accent }}>
          <span className="absolute -left-2 top-1/2 size-3 -translate-y-1/2 rotate-45 border-2 bg-white" style={{ borderColor: accent }} aria-hidden />
          ◆ {step.text}
        </p>
      );
  }
}

// 功能架構：第一層橫排成欄，第二層以下用縮排與連接線
export function FeatureTree({ root, accent }: { root: TreeNode; accent: string }) {
  return (
    <div className="rounded-2xl border border-line bg-white/50 p-4 sm:p-6">
      <p className="mx-auto w-fit rounded-lg px-4 py-2 text-center font-semibold text-white" style={{ background: accent }}>
        {root.label}
        {root.note && <span className="block text-xs font-normal text-white/80">{root.note}</span>}
      </p>
      <div className="mx-auto h-5 w-px bg-ink/30" aria-hidden />
      <div className="grid gap-3 border-t border-ink/20 pt-4 sm:grid-cols-2 lg:grid-cols-3">
        {root.children?.map((c) => (
          <div key={c.label} className="rounded-xl border border-line bg-paper p-4">
            <p className="font-semibold">{c.label}</p>
            {c.note && <p className="mt-0.5 font-mono text-[11px] text-ink-soft">{c.note}</p>}
            {c.children && <Branch nodes={c.children} accent={accent} />}
          </div>
        ))}
      </div>
    </div>
  );
}

function Branch({ nodes, accent }: { nodes: TreeNode[]; accent: string }) {
  return (
    <ul className="mt-2 space-y-1.5 border-l pl-3" style={{ borderColor: `${accent}55` }}>
      {nodes.map((n) => (
        <li key={n.label} className="relative text-sm leading-6">
          <span className="absolute -left-3 top-3 h-px w-2" style={{ background: `${accent}88` }} aria-hidden />
          <span className="font-medium">{n.label}</span>
          {n.note && <span className="ml-1.5 text-xs text-ink-soft">{n.note}</span>}
          {n.children && <Branch nodes={n.children} accent={accent} />}
        </li>
      ))}
    </ul>
  );
}
