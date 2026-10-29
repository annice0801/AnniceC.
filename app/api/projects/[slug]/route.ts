// GET /api/projects/[slug]：單一專案的完整案例內容
import { getProject, projects } from "@/lib/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function GET(_req: Request, ctx: RouteContext<"/api/projects/[slug]">) {
  const { slug } = await ctx.params;
  const project = getProject(slug);
  if (!project) return Response.json({ error: "找不到這個專案" }, { status: 404 });
  return Response.json(project);
}
