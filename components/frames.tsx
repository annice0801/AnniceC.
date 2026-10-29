// 截圖外框：桌機用瀏覽器視窗，手機用手機外框

import Image from "next/image";

export function BrowserFrame({
  src,
  alt,
  url,
  priority,
  sizes = "(min-width: 1024px) 60vw, 100vw",
}: {
  src: string;
  alt: string;
  url?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-line bg-white shadow-[0_30px_60px_-30px_rgba(40,30,10,0.35)]">
      <div className="flex items-center gap-2 border-b border-line bg-paper-2/70 px-3 py-2">
        <span className="size-2.5 rounded-full bg-[#e2735c]" />
        <span className="size-2.5 rounded-full bg-[#e5b34d]" />
        <span className="size-2.5 rounded-full bg-[#6fb36b]" />
        {url && (
          <span className="ml-3 truncate rounded-md bg-white/80 px-3 py-0.5 font-mono text-[11px] text-ink-soft">
            {url.replace("https://", "")}
          </span>
        )}
      </div>
      <Image src={src} alt={alt} width={1440} height={900} sizes={sizes} priority={priority} className="block h-auto w-full" />
    </div>
  );
}

export function PhoneFrame({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="mx-auto w-full max-w-[260px] rounded-[2.2rem] border-[7px] border-ink bg-ink p-0.5 shadow-[0_30px_60px_-25px_rgba(40,30,10,0.45)]">
      <div className="overflow-hidden rounded-[1.7rem] bg-white">
        <Image src={src} alt={alt} width={390} height={844} sizes="260px" className="block h-auto w-full" />
      </div>
    </div>
  );
}
