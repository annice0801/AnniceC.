// 案例頁與 PRD 頁的載入佔位：讓換頁時先顯示版面，網址參數讀到後再換成內容
export default function Loading() {
  return (
    <div className="paper-grain border-b border-line" aria-busy="true" aria-label="載入中">
      <div className="mx-auto max-w-6xl animate-pulse px-4 pb-16 pt-10 sm:px-6 md:pt-16">
        <div className="h-4 w-24 rounded bg-ink/10" />
        <div className="mt-10 h-14 w-2/3 max-w-md rounded bg-ink/10 sm:h-20" />
        <div className="mt-6 h-5 w-full max-w-2xl rounded bg-ink/10" />
        <div className="mt-10 h-24 rounded-xl bg-ink/5" />
      </div>
    </div>
  );
}
