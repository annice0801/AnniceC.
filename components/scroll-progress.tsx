"use client";

// 頁面頂端的閱讀進度條（案例頁使用）

import { useEffect, useRef } from "react";

export function ScrollProgress({ color }: { color: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const ratio = max > 0 ? window.scrollY / max : 0;
        if (ref.current) ref.current.style.transform = `scaleX(${ratio})`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-50 h-0.5">
      <div ref={ref} className="h-full origin-left scale-x-0" style={{ background: color }} />
    </div>
  );
}
