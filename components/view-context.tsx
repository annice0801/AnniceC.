"use client";

// 首頁的兩個切換狀態：作品卡片的視角（PM／工程師）與後台監控模式
// 頁首與首頁共用，所以放在 layout 的 Provider 裡

import { createContext, useContext, useState, type ReactNode } from "react";

export type Perspective = "pm" | "eng";

type ViewState = {
  perspective: Perspective;
  setPerspective: (p: Perspective) => void;
  admin: boolean;
  setAdmin: (on: boolean) => void;
};

const ViewContext = createContext<ViewState | null>(null);

export function ViewProvider({ children }: { children: ReactNode }) {
  const [perspective, setPerspective] = useState<Perspective>("pm");
  const [admin, setAdmin] = useState(false);
  return <ViewContext value={{ perspective, setPerspective, admin, setAdmin }}>{children}</ViewContext>;
}

export function useView() {
  const v = useContext(ViewContext);
  if (!v) throw new Error("useView 必須放在 ViewProvider 裡");
  return v;
}

// 雙視角切換按鈕：頁首與作品區塊各放一個，狀態同步
export function PerspectiveToggle({ size = "md" }: { size?: "sm" | "md" }) {
  const { perspective, setPerspective } = useView();
  const options: { value: Perspective; label: string; short: string }[] = [
    { value: "pm", label: "產品經理視角", short: "PM" },
    { value: "eng", label: "應用工程師視角", short: "Engineer" },
  ];
  return (
    <div role="radiogroup" aria-label="作品視角" className="flex rounded-full border border-ink/15 bg-white/60 p-0.5">
      {options.map((o) => {
        const on = perspective === o.value;
        return (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={on}
            onClick={() => setPerspective(o.value)}
            className={`flex items-center gap-1.5 rounded-full font-medium transition ${size === "sm" ? "px-2.5 py-1 text-xs" : "px-4 py-2 text-sm"} ${
              on ? "bg-ink text-paper" : "text-ink-soft hover:text-ink"
            }`}
          >
            <span className={`size-1.5 rounded-full ${on ? "bg-accent" : "bg-ink/25"}`} />
            {size === "sm" ? o.short : `${o.label}（${o.short} View）`}
          </button>
        );
      })}
    </div>
  );
}
