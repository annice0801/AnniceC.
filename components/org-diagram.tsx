// CollabOffice 的組織與任務流程圖（尚未公開上線，用圖說明架構代替截圖）

const departments = ["市場情報", "社群行銷", "社區行政", "人資品牌", "研發"];

function Node({ title, sub, tone = "light" }: { title: string; sub?: string; tone?: "dark" | "light" | "accent" }) {
  const styles = {
    dark: "bg-[#1f2d44] text-white border-[#1f2d44]",
    accent: "bg-[#3a5a8c] text-white border-[#3a5a8c]",
    light: "bg-white text-[#1f2d44] border-[#c6d0e0]",
  }[tone];
  return (
    <div className={`rounded-lg border px-2.5 py-1.5 text-center shadow-sm ${styles}`}>
      <p className="text-[12px] leading-tight font-semibold sm:text-sm">{title}</p>
      {sub && <p className="mt-0.5 text-[10px] leading-tight opacity-75 sm:text-[11px]">{sub}</p>}
    </div>
  );
}

const Line = () => <div className="mx-auto h-4 w-px bg-[#9fb0cb]" />;

export function OrgDiagram({ compact }: { compact?: boolean }) {
  return (
    <div className={`w-full ${compact ? "max-w-md" : "max-w-2xl"} mx-auto`}>
      <div className="mx-auto w-28">
        <Node title="你（老闆）" tone="dark" />
      </div>
      <Line />
      <div className="relative mx-auto grid max-w-sm grid-cols-2 gap-6 before:absolute before:-top-px before:left-1/4 before:right-1/4 before:h-px before:bg-[#9fb0cb]">
        <Node title="首席秘書" sub={compact ? undefined : "生活・健康・行程"} tone="accent" />
        <Node title="總經理" sub={compact ? undefined : "拆解・分派・驗收"} tone="accent" />
      </div>
      <Line />
      <div className="relative grid grid-cols-5 gap-1.5 before:absolute before:-top-px before:left-[10%] before:right-[10%] before:h-px before:bg-[#9fb0cb] sm:gap-2">
        {departments.map((d) => (
          <div key={d}>
            <div className="mx-auto h-2 w-px bg-[#9fb0cb]" />
            <Node title={d} sub={compact ? undefined : "經理"} />
            {!compact && (
              <>
                <div className="mx-auto h-2 w-px bg-[#9fb0cb]" />
                <div className="rounded-md border border-dashed border-[#9fb0cb] px-1 py-1 text-center text-[10px] text-[#4a5b78] sm:text-[11px]">
                  員工 × N
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// 任務引擎：每一步存檔，可以從中斷處接續
export function MissionFlow() {
  const steps = [
    { t: "老闆交代目標", d: "一句話描述想完成的事" },
    { t: "總經理拆解", d: "拆成部門任務並設定相依" },
    { t: "經理分派", d: "依員工職責指派子任務" },
    { t: "員工執行", d: "需要時上網查最新資料" },
    { t: "經理審閱", d: "不合格退回重做" },
    { t: "彙整報告", d: "回報老闆，存檔可查" },
  ];
  return (
    <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {steps.map((s, i) => (
        <li key={s.t} className="relative rounded-xl border border-line bg-white/60 p-4">
          <span className="font-mono text-xs text-[#3a5a8c]">STEP {i + 1}</span>
          <p className="mt-1 font-semibold">{s.t}</p>
          <p className="mt-1 text-sm text-ink-soft">{s.d}</p>
          {i === 4 && (
            <span className="absolute right-3 top-3 rounded-full bg-[#3a5a8c]/10 px-2 py-0.5 text-[11px] text-[#3a5a8c]">↺ 退回</span>
          )}
        </li>
      ))}
    </ol>
  );
}
