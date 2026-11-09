// 產品需求文件（PRD）的資料格式：/projects/[slug]/prd 依這份資料排版
// 內容依各專案的程式碼整理；修訂追蹤表只記錄產品本身的版本演進

export type Revision = {
  version: string;
  date: string;
  type: "新增" | "調整" | "修正" | "安全性" | "架構";
  summary: string;
};

export type Persona = { name: string; profile: string; needs: string[]; pains: string[] };

export type Goal = { goal: string; measure: string };

export type Feature = {
  id: string;
  module: string;
  name: string;
  desc: string;
  priority: "P0" | "P1" | "P2";
  status: "已上線" | "開發中" | "規劃中";
  release: string;
};

// 功能架構（資訊架構）：樹狀
export type TreeNode = { label: string; note?: string; children?: TreeNode[] };

// 功能流程：由上往下的步驟；decision 是判斷點，no 寫「否」的去向
export type FlowStep =
  | { kind: "start" | "end"; text: string }
  | { kind: "action"; text: string; actor?: string }
  | { kind: "system"; text: string }
  | { kind: "decision"; text: string; yes: string; no: string };

export type Flow = { id: string; title: string; goal: string; steps: FlowStep[]; exceptions: string[] };

// ── 線框圖積木（低保真，灰階） ──
// n：標註編號，對應頁面下方的說明
type Marked = { n?: number };
export type Wire = Marked &
  (
    | { t: "nav"; items: string[]; cta?: string; logo?: string }
    | { t: "hero"; title: string; sub?: string; buttons?: string[]; image?: boolean; align?: "center" | "left"; dark?: boolean }
    | { t: "heading"; text: string; sub?: string; align?: "center" | "left" }
    | { t: "text"; lines: number }
    | { t: "image"; label: string; h?: "sm" | "md" | "lg" }
    | { t: "cards"; items: string[]; cols?: 2 | 3 | 4; image?: boolean }
    | { t: "chips"; items: string[]; active?: number }
    | { t: "list"; items: string[]; check?: boolean }
    | { t: "form"; fields: string[]; submit: string }
    | { t: "buttons"; items: string[] }
    | { t: "stats"; items: string[] }
    | { t: "table"; cols: string[]; rows?: number }
    | { t: "chart"; kind: "radar" | "bar" | "line" | "donut" | "funnel"; label: string }
    | { t: "chat"; messages: { from: "them" | "me"; text: string }[] }
    | { t: "board"; size: number; label?: string }
    | { t: "tabs"; items: string[]; active?: number }
    | { t: "split"; ratio?: "1:1" | "2:1" | "1:2"; left: Wire[]; right: Wire[] }
    | { t: "sidebar"; items: string[]; active?: number; content: Wire[] }
    | { t: "panel"; title: string; content: Wire[]; dashed?: boolean }
    | { t: "footer"; cols?: number }
  );

export type PageSpec = {
  id: string;
  name: string;
  route: string;
  device: "desktop" | "mobile";
  purpose: string;
  wire: Wire[];
  notes: { n: number; text: string }[];
};

export type StyleGuide = {
  keywords: string[];
  colors: { name: string; hex: string; usage: string }[];
  fonts: { role: string; family: string; usage: string; sample: string; serif?: boolean; mono?: boolean }[];
  components: { name: string; spec: string }[];
  motion: string[];
  voice: string[];
};

export type Prd = {
  slug: string;
  version: string;
  docStatus: string;
  revisions: Revision[];
  background: {
    context: string;
    problem: string;
    opportunity: string;
    personas: Persona[];
    goals: Goal[];
  };
  features: Feature[];
  structure: TreeNode;
  flows: Flow[];
  pages: PageSpec[];
  style: StyleGuide;
  nfr: { category: string; items: string[] }[];
  data: {
    entities: { name: string; desc: string; fields: string }[];
    apis: { method: string; path: string; desc: string; auth: string }[];
  };
  metrics: { name: string; definition: string; status: "已追蹤" | "規劃中" }[];
};
