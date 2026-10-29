import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-32 text-center sm:px-6">
      <p className="font-mono text-xs tracking-[0.25em] text-ink-soft">404</p>
      <h1 className="mt-4 font-serif text-4xl font-bold">找不到這個頁面</h1>
      <Link href="/" className="mt-8 inline-block rounded-full bg-ink px-6 py-3 text-sm text-paper">
        回首頁
      </Link>
    </div>
  );
}
