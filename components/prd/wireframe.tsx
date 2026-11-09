// 低保真線框圖：依 lib/prd 的積木資料畫出灰階版面，n 會在區塊左上角標出編號
// 刻意只用灰階與方塊，讓讀者專注在資訊層級與版面，不被視覺細節干擾

import type { CSSProperties, ReactNode } from "react";
import type { Wire } from "@/lib/prd/types";

const C = {
  line: "#b9b3a7",
  fill: "#ebe7df",
  fill2: "#f6f4ef",
  text: "#6f695f",
  dark: "#3a3732",
};

export function WireframeFrame({ device, route, accent, children }: { device: "desktop" | "mobile"; route: string; accent: string; children: ReactNode }) {
  const mobile = device === "mobile";
  return (
    <div className={mobile ? "mx-auto w-full max-w-[300px]" : "w-full"} style={{ "--mark": accent } as CSSProperties}>
      <div className={`overflow-hidden border-2 bg-white ${mobile ? "rounded-[28px] p-2" : "rounded-xl"}`} style={{ borderColor: C.dark }}>
        {mobile ? (
          <div className="mx-auto mb-2 h-1.5 w-16 rounded-full" style={{ background: C.dark }} />
        ) : (
          <div className="flex items-center gap-2 border-b px-3 py-2" style={{ borderColor: C.line, background: C.fill2 }}>
            <span className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <span key={i} className="size-2 rounded-full" style={{ background: C.line }} />
              ))}
            </span>
            <span className="ml-2 truncate rounded px-2 py-0.5 font-mono text-[10px]" style={{ background: "white", color: C.text }}>
              {route}
            </span>
          </div>
        )}
        <div className={`space-y-2.5 ${mobile ? "rounded-[20px] border px-2.5 py-3" : "p-3 sm:p-4"}`} style={mobile ? { borderColor: C.line } : undefined}>
          {children}
        </div>
      </div>
    </div>
  );
}

export function Wireframe({ blocks }: { blocks: Wire[] }) {
  return (
    <>
      {blocks.map((b, i) => (
        <Block key={i} b={b} />
      ))}
    </>
  );
}

function Mark({ n }: { n?: number }) {
  if (!n) return null;
  return (
    <span
      className="absolute -left-1.5 -top-1.5 z-10 flex size-5 items-center justify-center rounded-full font-mono text-[10px] font-bold text-white shadow"
      style={{ background: "var(--mark)" }}
    >
      {n}
    </span>
  );
}

function Box({ n, children, className = "", style }: { n?: number; children: ReactNode; className?: string; style?: CSSProperties }) {
  return (
    <div className={`relative ${className}`} style={style}>
      <Mark n={n} />
      {children}
    </div>
  );
}

// 文字以灰色細條表示；label 有值時直接寫字
function Bar({ w = "100%", h = 6, dark }: { w?: string; h?: number; dark?: boolean }) {
  return <span className="block rounded-full" style={{ width: w, height: h, background: dark ? C.dark : C.line }} />;
}

function Btn({ label, primary }: { label: string; primary?: boolean }) {
  return (
    <span
      className="inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] leading-none"
      style={primary ? { background: C.dark, borderColor: C.dark, color: "white" } : { borderColor: C.dark, color: C.dark }}
    >
      {label}
    </span>
  );
}

function Img({ label, h = "md" }: { label: string; h?: "sm" | "md" | "lg" }) {
  const height = { sm: 56, md: 96, lg: 150 }[h];
  return (
    <div className="relative flex items-center justify-center overflow-hidden rounded-md border" style={{ height, borderColor: C.line, background: C.fill }}>
      <svg className="absolute inset-0 size-full" preserveAspectRatio="none" viewBox="0 0 100 100" aria-hidden>
        <line x1="0" y1="0" x2="100" y2="100" stroke={C.line} strokeWidth="0.6" vectorEffect="non-scaling-stroke" />
        <line x1="100" y1="0" x2="0" y2="100" stroke={C.line} strokeWidth="0.6" vectorEffect="non-scaling-stroke" />
      </svg>
      <span className="relative rounded bg-white/85 px-1.5 py-0.5 text-[10px]" style={{ color: C.text }}>
        {label}
      </span>
    </div>
  );
}

const label = "text-[10px] leading-snug";

function Block({ b }: { b: Wire }) {
  switch (b.t) {
    case "nav":
      return (
        <Box n={b.n} className="flex items-center gap-2 rounded-md border px-2 py-1.5" style={{ borderColor: C.line }}>
          <span className="shrink-0 text-[11px] font-bold" style={{ color: C.dark }}>
            {b.logo ?? "LOGO"}
          </span>
          <span className="flex min-w-0 flex-1 flex-wrap justify-end gap-x-2 gap-y-0.5">
            {b.items.map((it) => (
              <span key={it} className={label} style={{ color: C.text }}>
                {it}
              </span>
            ))}
          </span>
          {b.cta && <Btn label={b.cta} primary />}
        </Box>
      );
    case "hero":
      return (
        <Box
          n={b.n}
          className={`rounded-md border p-3 ${b.align === "left" ? "text-left" : "text-center"}`}
          style={{ borderColor: C.line, background: b.dark ? C.dark : C.fill2 }}
        >
          <div className={b.image ? "grid items-center gap-3 sm:grid-cols-2" : ""}>
            <div>
              <p className="text-[13px] leading-snug font-bold" style={{ color: b.dark ? "white" : C.dark }}>
                {b.title}
              </p>
              {b.sub && (
                <p className={`mt-1 ${label}`} style={{ color: b.dark ? "#d8d3ca" : C.text }}>
                  {b.sub}
                </p>
              )}
              {b.buttons && (
                <div className={`mt-2 flex flex-wrap gap-1.5 ${b.align === "left" ? "" : "justify-center"}`}>
                  {b.buttons.map((x, i) => (
                    <Btn key={x} label={x} primary={i === 0} />
                  ))}
                </div>
              )}
            </div>
            {b.image && <Img label="主視覺" h="sm" />}
          </div>
        </Box>
      );
    case "heading":
      return (
        <Box n={b.n} className={b.align === "left" ? "" : "text-center"}>
          <p className="text-[12px] font-bold" style={{ color: C.dark }}>
            {b.text}
          </p>
          {b.sub && (
            <p className={label} style={{ color: C.text }}>
              {b.sub}
            </p>
          )}
        </Box>
      );
    case "text":
      return (
        <Box n={b.n} className="space-y-1.5 py-0.5">
          {Array.from({ length: b.lines }, (_, i) => (
            <Bar key={i} w={i === b.lines - 1 ? "62%" : "100%"} />
          ))}
        </Box>
      );
    case "image":
      return (
        <Box n={b.n}>
          <Img label={b.label} h={b.h} />
        </Box>
      );
    case "cards":
      return (
        <Box n={b.n} className={`grid gap-1.5 ${{ 2: "grid-cols-2", 3: "grid-cols-2 sm:grid-cols-3", 4: "grid-cols-2 sm:grid-cols-4" }[b.cols ?? 3]}`}>
          {b.items.map((it) => (
            <div key={it} className="rounded-md border p-1.5" style={{ borderColor: C.line }}>
              {b.image && <Img label="圖" h="sm" />}
              <p className={`${b.image ? "mt-1" : ""} ${label} font-medium`} style={{ color: C.dark }}>
                {it}
              </p>
              <div className="mt-1 space-y-1">
                <Bar w="90%" h={4} />
                <Bar w="60%" h={4} />
              </div>
            </div>
          ))}
        </Box>
      );
    case "chips":
      return (
        <Box n={b.n} className="flex flex-wrap gap-1">
          {b.items.map((it, i) => (
            <span
              key={it}
              className="rounded-full border px-2 py-0.5 text-[10px]"
              style={i === b.active ? { background: C.dark, borderColor: C.dark, color: "white" } : { borderColor: C.line, color: C.text }}
            >
              {it}
            </span>
          ))}
        </Box>
      );
    case "list":
      return (
        <Box n={b.n} className="space-y-1">
          {b.items.map((it) => (
            <div key={it} className="flex items-center gap-1.5 rounded border px-1.5 py-1" style={{ borderColor: C.line }}>
              <span className="size-2.5 shrink-0 rounded-sm border" style={{ borderColor: C.dark, background: b.check ? C.fill : "transparent" }} />
              <span className={label} style={{ color: C.dark }}>
                {it}
              </span>
            </div>
          ))}
        </Box>
      );
    case "form":
      return (
        <Box n={b.n} className="space-y-1.5 rounded-md border p-2" style={{ borderColor: C.line }}>
          {b.fields.map((f) => (
            <div key={f}>
              <p className="mb-0.5 text-[9px]" style={{ color: C.text }}>
                {f}
              </p>
              <div className="h-5 rounded border bg-white" style={{ borderColor: C.line }} />
            </div>
          ))}
          <div className="pt-0.5">
            <Btn label={b.submit} primary />
          </div>
        </Box>
      );
    case "buttons":
      return (
        <Box n={b.n} className="flex flex-wrap gap-1.5">
          {b.items.map((x, i) => (
            <Btn key={x} label={x} primary={i === 0} />
          ))}
        </Box>
      );
    case "stats":
      return (
        <Box n={b.n} className={`grid gap-1.5 ${b.items.length > 3 ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-3"}`}>
          {b.items.map((it) => (
            <div key={it} className="rounded-md border p-1.5" style={{ borderColor: C.line }}>
              <Bar w="45%" h={9} dark />
              <p className={`mt-1 ${label}`} style={{ color: C.text }}>
                {it}
              </p>
            </div>
          ))}
        </Box>
      );
    case "table":
      return (
        <Box n={b.n} className="overflow-hidden rounded-md border" style={{ borderColor: C.line }}>
          <div className="grid gap-1 px-1.5 py-1" style={{ gridTemplateColumns: `repeat(${b.cols.length}, minmax(0,1fr))`, background: C.fill }}>
            {b.cols.map((c) => (
              <span key={c} className="truncate text-[9px] font-medium" style={{ color: C.dark }}>
                {c}
              </span>
            ))}
          </div>
          {Array.from({ length: b.rows ?? 3 }, (_, r) => (
            <div key={r} className="grid gap-1 border-t px-1.5 py-1.5" style={{ gridTemplateColumns: `repeat(${b.cols.length}, minmax(0,1fr))`, borderColor: C.line }}>
              {b.cols.map((c, i) => (
                <Bar key={c} w={i === 0 ? "80%" : "55%"} h={4} />
              ))}
            </div>
          ))}
        </Box>
      );
    case "chart":
      return (
        <Box n={b.n} className="rounded-md border p-2" style={{ borderColor: C.line }}>
          <p className={label} style={{ color: C.text }}>
            {b.label}
          </p>
          <Chart kind={b.kind} />
        </Box>
      );
    case "chat":
      return (
        <Box n={b.n} className="space-y-1.5 rounded-md border p-2" style={{ borderColor: C.line, background: C.fill2 }}>
          {b.messages.map((m, i) => (
            <div key={i} className={`flex ${m.from === "me" ? "justify-end" : ""}`}>
              <span
                className="max-w-[80%] rounded-lg px-2 py-1 text-[10px] leading-snug"
                style={m.from === "me" ? { background: C.dark, color: "white" } : { background: "white", color: C.dark, border: `1px solid ${C.line}` }}
              >
                {m.text}
              </span>
            </div>
          ))}
        </Box>
      );
    case "board":
      return (
        <Box n={b.n} className="mx-auto w-full max-w-[180px]">
          <div className="grid aspect-square gap-0.5 rounded-md border p-1" style={{ gridTemplateColumns: `repeat(${b.size}, 1fr)`, borderColor: C.dark }}>
            {Array.from({ length: b.size * b.size }, (_, i) => {
              const start = i === b.size * (b.size - 1);
              const goal = i === b.size - 1;
              const wall = !start && !goal && (i * 37 + 11) % 7 === 0; // 固定的分散障礙物
              return (
                <span key={i} className="flex items-center justify-center rounded-[2px] text-[8px]" style={{ background: wall ? C.text : C.fill }}>
                  {start ? "🐶" : goal ? "🏠" : ""}
                </span>
              );
            })}
          </div>
          {b.label && (
            <p className={`mt-1 text-center ${label}`} style={{ color: C.text }}>
              {b.label}
            </p>
          )}
        </Box>
      );
    case "tabs":
      return (
        <Box n={b.n} className="flex gap-0.5 border-b" style={{ borderColor: C.line }}>
          {b.items.map((it, i) => (
            <span
              key={it}
              className="rounded-t px-2 py-1 text-[10px]"
              style={i === (b.active ?? 0) ? { background: C.dark, color: "white" } : { color: C.text }}
            >
              {it}
            </span>
          ))}
        </Box>
      );
    case "split": {
      const cols = { "1:1": "sm:grid-cols-2", "2:1": "sm:grid-cols-[2fr_1fr]", "1:2": "sm:grid-cols-[1fr_2fr]" }[b.ratio ?? "1:1"];
      return (
        <Box n={b.n} className={`grid gap-2.5 ${cols}`}>
          <div className="min-w-0 space-y-2.5">
            <Wireframe blocks={b.left} />
          </div>
          <div className="min-w-0 space-y-2.5">
            <Wireframe blocks={b.right} />
          </div>
        </Box>
      );
    }
    case "sidebar":
      return (
        <Box n={b.n} className="grid gap-2.5 sm:grid-cols-[88px_1fr]">
          <div className="flex gap-1 overflow-hidden rounded-md border p-1.5 sm:flex-col" style={{ borderColor: C.line, background: C.fill2 }}>
            {b.items.map((it, i) => (
              <span
                key={it}
                className="shrink-0 truncate rounded px-1.5 py-1 text-[10px]"
                style={i === (b.active ?? 0) ? { background: C.dark, color: "white" } : { color: C.text }}
              >
                {it}
              </span>
            ))}
          </div>
          <div className="min-w-0 space-y-2.5">
            <Wireframe blocks={b.content} />
          </div>
        </Box>
      );
    case "panel":
      return (
        <Box n={b.n} className={`space-y-2 rounded-md border-2 p-2 ${b.dashed ? "border-dashed" : ""}`} style={{ borderColor: C.dark, background: "white" }}>
          <p className="text-[11px] font-bold" style={{ color: C.dark }}>
            {b.title}
          </p>
          <Wireframe blocks={b.content} />
        </Box>
      );
    case "footer":
      return (
        <Box n={b.n} className={`grid gap-2 rounded-md p-2 ${(b.cols ?? 3) > 2 ? "grid-cols-3" : "grid-cols-2"}`} style={{ background: C.fill }}>
          {Array.from({ length: b.cols ?? 3 }, (_, i) => (
            <div key={i} className="space-y-1">
              <Bar w="50%" h={5} dark />
              <Bar w="80%" h={4} />
              <Bar w="65%" h={4} />
            </div>
          ))}
        </Box>
      );
  }
}

function Chart({ kind }: { kind: "radar" | "bar" | "line" | "donut" | "funnel" }) {
  const s = { stroke: C.dark, fill: "none", strokeWidth: 1.2 };
  return (
    <svg viewBox="0 0 120 60" className="mt-1 h-16 w-full" aria-hidden>
      {kind === "radar" && (
        <>
          <polygon points="60,4 88,18 88,44 60,58 32,44 32,18" {...s} stroke={C.line} />
          <polygon points="60,14 78,22 82,40 60,48 40,40 38,24" fill={C.fill} stroke={C.dark} strokeWidth={1.2} />
        </>
      )}
      {kind === "bar" && [10, 30, 50, 70, 90].map((x, i) => <rect key={x} x={x} y={56 - [30, 44, 22, 38, 16][i]} width="12" height={[30, 44, 22, 38, 16][i]} fill={C.line} />)}
      {kind === "line" && <polyline points="4,48 24,40 44,44 64,26 84,30 116,10" {...s} />}
      {kind === "donut" && (
        <>
          <circle cx="60" cy="30" r="22" stroke={C.line} strokeWidth="10" fill="none" />
          <circle cx="60" cy="30" r="22" stroke={C.dark} strokeWidth="10" fill="none" strokeDasharray="90 140" />
        </>
      )}
      {kind === "funnel" &&
        [0, 1, 2].map((i) => <rect key={i} x={10 + i * 14} y={6 + i * 18} width={100 - i * 28} height="14" rx="2" fill={i === 0 ? C.dark : C.line} />)}
    </svg>
  );
}
