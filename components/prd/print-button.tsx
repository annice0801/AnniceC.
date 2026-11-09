"use client";

// 用瀏覽器列印存成 PDF；頁首、頁尾與章節導覽在列印時隱藏
export function PrintButton({ accent }: { accent: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="rounded-full px-6 py-3 text-sm font-medium text-white hover:opacity-90 print:hidden"
      style={{ background: accent }}
    >
      列印／存成 PDF
    </button>
  );
}
