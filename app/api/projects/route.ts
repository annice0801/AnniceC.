// GET /api/projects：所有專案的摘要
import { projects } from "@/lib/projects";

export function GET() {
  return Response.json(
    projects.map(({ slug, name, category, tagline, status, url, repo, period, buildTime, maintenance, role, stack }) => ({
      slug,
      name,
      category,
      tagline,
      status,
      url: url ?? null,
      repo: repo ?? null,
      period,
      buildTime,
      maintenance: maintenance ?? null,
      role,
      stack,
      detail: `/api/projects/${slug}`,
      page: `/projects/${slug}`,
    })),
  );
}
