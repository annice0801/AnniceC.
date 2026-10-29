// GET /api/status：即時檢查每個已上線專案的網站是否可連線，以及回應時間
import { connection } from "next/server";
import { projects } from "@/lib/projects";

export async function GET() {
  // 每次請求都重新檢查，不在建置時預先產生
  await connection();
  const results = await Promise.all(
    projects
      .filter((p) => p.url)
      .map(async (p) => {
        const started = Date.now();
        try {
          const res = await fetch(p.url!, { cache: "no-store", redirect: "follow", signal: AbortSignal.timeout(8000) });
          return { slug: p.slug, name: p.name, url: p.url!, ok: res.ok, status: res.status, ms: Date.now() - started };
        } catch {
          return { slug: p.slug, name: p.name, url: p.url!, ok: false, status: 0, ms: Date.now() - started };
        }
      }),
  );
  return Response.json({ checkedAt: new Date().toISOString(), results });
}
