// 各專案的產品需求文件（PRD），/projects/[slug]/prd 從這裡讀取
import { blueprintflowPrd } from "./blueprintflow";
import { collabOfficePrd } from "./collab-office";
import { jargonbridgePrd } from "./jargonbridge";
import { offermatePrd } from "./offermate";
import { parentingLabPrd } from "./parenting-lab";
import { tasteTracePrd } from "./taste-trace";

const prds = [parentingLabPrd, offermatePrd, tasteTracePrd, collabOfficePrd, blueprintflowPrd, jargonbridgePrd];

export function getPrd(slug: string) {
  return prds.find((p) => p.slug === slug);
}

export type { Prd } from "./types";
