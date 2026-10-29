"use client";

// 滾動視差：元素依自己離畫面中心的距離位移，speed 越大移動越多（負數往反方向）
// 所有實例共用一個捲動監聽與 requestAnimationFrame，避免每個元件各自監聽
// 手機寬度降低位移幅度；開啟「減少動態效果」的使用者完全停用

import { useEffect, useRef, type ReactNode } from "react";

type Item = { el: HTMLElement; speed: number; axis: "y" | "x" };

const items = new Set<Item>();
let ticking = false;
let listening = false;

function update() {
  ticking = false;
  const vh = window.innerHeight;
  const factor = window.innerWidth < 768 ? 0.45 : 1;
  for (const item of items) {
    const parent = item.el.parentElement ?? item.el;
    const rect = parent.getBoundingClientRect();
    // 不在畫面附近就不計算
    if (rect.bottom < -vh || rect.top > vh * 2) continue;
    const offset = rect.top + rect.height / 2 - vh / 2;
    const move = -offset * item.speed * factor;
    item.el.style.transform =
      item.axis === "y" ? `translate3d(0, ${move.toFixed(1)}px, 0)` : `translate3d(${move.toFixed(1)}px, 0, 0)`;
  }
}

function requestUpdate() {
  if (!ticking) {
    ticking = true;
    requestAnimationFrame(update);
  }
}

function startListening() {
  if (listening) return;
  listening = true;
  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);
}

export function Parallax({
  children,
  speed = 0.12,
  axis = "y",
  className,
}: {
  children: ReactNode;
  speed?: number;
  axis?: "y" | "x";
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const item: Item = { el, speed, axis };
    items.add(item);
    startListening();
    requestUpdate();
    return () => {
      items.delete(item);
      el.style.transform = "";
    };
  }, [speed, axis]);

  return (
    <div ref={ref} className={`will-change-transform ${className ?? ""}`}>
      {children}
    </div>
  );
}
