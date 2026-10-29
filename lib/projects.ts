// 作品集的專案資料：首頁卡片、案例頁、/api/projects 都從這裡讀取
// 內容依三個角度整理：專案管理（時程、範疇、風險）、產品（問題、使用者、決策）、工程（架構、實作重點）
// 製作時間只算到第一版上線；之後新增的功能列在 maintenance（維護期），不算進製作時間
// projects 依開始製作的日期排序

export type Shot = {
  src: string;
  title: string;
  caption: string;
  device?: "desktop" | "mobile";
};

// kind = "maintenance" 表示上線後的維護與功能擴充
export type Milestone = { date: string; phase: string; detail: string; kind?: "maintenance" };
export type Risk = { risk: string; response: string };
export type Decision = { title: string; why: string };
export type Layer = { name: string; detail: string };
export type Issue = {
  title: string;
  situation: string;
  cause: string;
  fix: string;
  result: string;
  phase?: "製作期" | "維護期";
};

// 架構圖：由左到右三欄（使用者端 → 伺服器 → 外部服務與資料）
export type ArchColumn = { title: string; nodes: { name: string; note?: string }[] };

export type Project = {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  summary: string;
  status: "上線中" | "開發中";
  url?: string;
  repo?: string;
  // 開始製作的日期（排序用）
  startedAt: string;
  // 製作期：從開始到第一版上線
  period: string;
  // 實際操作時數：依開發對話紀錄計算，相鄰操作間隔超過 10 分鐘不計入
  buildTime: string;
  maintenance?: { period: string; time: string; summary: string };
  role: string[];
  stack: string[];
  // 每個專案的代表色，用在案例頁的標籤與重點線條
  accent: string;
  cover: string;
  stats: { value: string; label: string }[];
  shots: Shot[];
  // 後台截圖（使用測試資料庫與假資料拍攝）
  adminShots: Shot[];
  // STAR：情境、任務、行動、結果
  star: { situation: string; task: string; action: string; result: string };
  // 技術積木：連線、展示、邏輯、記憶
  blocks: { api: string; ui: string; logic: string; memory: string };
  arch: ArchColumn[];
  // 首頁雙視角卡片：PM 視角與工程師視角（範疇與時程直接取自 pm 欄位）
  lens: {
    insight: string;
    roi: string[];
    api: string;
    tools: string;
    state: string;
    edges: string[];
  };
  security: Decision[];
  performance: Decision[];
  pm: {
    timeline: Milestone[];
    scopeIn: string[];
    scopeOut: string[];
    risks: Risk[];
  };
  product: {
    problem: string;
    users: string[];
    goals: string[];
    decisions: Decision[];
  };
  engineering: {
    architecture: Layer[];
    highlights: Decision[];
  };
  issues: Issue[];
  next: string[];
};

const allProjects: Project[] = [
  {
    slug: "offermate",
    name: "OfferMate",
    category: "AI 求職工具",
    tagline: "先搜尋真實面經再出題的 AI 模擬面試，結束後開立面試診斷書。",
    summary:
      "準備面試時，多數人會背題庫或找朋友對練。題庫跟目標公司對不上，朋友也很難給出具體分數。OfferMate 讓使用者輸入產業、公司與職缺描述，系統先上網搜尋這家公司的面試經驗，再安排一位對應產業的面試官逐題提問、追問。每題當下給分數、指出問題並示範改寫，最後一題是反問環節，結束後開立一份六大能力的診斷書，可以下載成 PDF 或圖片。",
    status: "上線中",
    url: "https://offermate-wine.vercel.app",
    repo: "https://github.com/annice0801/offermate",
    startedAt: "2026-09-23",
    period: "2026/09/23 – 2026/09/24",
    buildTime: "約 3 小時",
    maintenance: {
      period: "2026/10/23 – 2026/10/28",
      time: "約 2.5 小時",
      summary: "上線一個月後回頭擴充：改為 Google 登入、加上會員與權限管理後台、用量與成本追蹤，並正式部署到 Vercel。",
    },
    role: ["產品規劃", "UI 設計", "全端開發", "部署維運"],
    stack: [
      "Next.js 16 App Router",
      "TypeScript",
      "Tailwind CSS",
      "OpenAI Responses API",
      "web_search",
      "MongoDB Atlas",
      "Mongoose",
      "Google OAuth",
      "JWT（jose）",
      "Vercel",
    ],
    accent: "#0f8f86",
    cover: "/shots/offermate-home.png",
    stats: [
      { value: "3 小時", label: "做出第一版（實際操作）" },
      { value: "8,900", label: "行 TypeScript" },
      { value: "3", label: "階段面試流程" },
      { value: "6", label: "項能力評分" },
    ],
    shots: [
      {
        src: "/shots/offermate-home.png",
        title: "首頁",
        caption: "首屏直接放一段面試對話與即時評分，讓第一次來的人在 5 秒內看懂產品在做什麼。",
      },
      {
        src: "/shots/offermate-interview.png",
        title: "面試設定",
        caption: "沒有現成 JD 的人可以點範本一鍵帶入；題數用時間標示（8 題約 15 分鐘），因為使用者在意的是要花多久。",
      },
      {
        src: "/shots/offermate-report.png",
        title: "面試戰力診斷書",
        caption: "六角雷達圖對應六項能力，下方有反問環節評語、改進建議與附日期的行動計畫，可存成 PDF 或 PNG。",
      },
      {
        src: "/shots/offermate-blog.png",
        title: "職涯專欄",
        caption: "5 篇面試準備文章，負責帶搜尋流量，也讓還沒準備好面試的人有東西可以看。",
      },
      {
        src: "/shots/offermate-mobile.png",
        title: "手機版",
        caption: "手機版隱藏設定頁的說明清單，讓表單更早出現在畫面上。",
        device: "mobile",
      },
    ],
    adminShots: [
      { src: "/shots/offermate-admin-home.png", title: "後台總覽", caption: "活躍會員、模擬場數、估算成本、AI 錯誤率與上一期比較；使用深度用漏斗呈現從開始面試到下載診斷書的流失。" },
      { src: "/shots/offermate-admin-users.png", title: "會員管理", caption: "依等級、權限、狀態篩選，每位會員的練習次數、使用時間、token 與成本一目了然，可匯出 CSV。" },
      { src: "/shots/offermate-admin-audit.png", title: "操作紀錄", caption: "後台每一次修改都記錄操作者、對象與前後差異，方便追查。" },
      { src: "/shots/offermate-admin-settings.png", title: "系統設定", caption: "「需要登入才能面試」開關與各模型的價格表；改價格只影響之後的成本估算，不回溯舊紀錄。" },
    ],
    star: {
      situation: "求職者準備面試多半靠通用題庫，題目跟目標公司對不上，也沒有人能給具體分數與改法。",
      task: "用最短的時間做出可用的第一版：依公司出題、逐題評分、結束後給一份能帶走的診斷書，並控制 AI 成本不由平台負擔。",
      action: "出題前先用 web_search 搜尋公司面經，搜尋失敗就改用同產業資料；評分用結構化輸出拆成六項能力；採用使用者自備金鑰（BYOK），金鑰不經過資料庫。",
      result: "實際操作約 3 小時完成第一版並上線，任何公司名稱都能開始面試。維護期再花約 2.5 小時補上 Google 登入、三種角色的後台與每位會員的 token 成本統計，作為之後訂價的依據。",
    },
    blocks: {
      api: "OpenAI Responses API（web_search 工具）、Google OAuth、自建 /api/interview 與 /api/admin",
      ui: "Tailwind CSS、Lucide 圖示、手寫 SVG 雷達圖與統計圖",
      logic: "Next.js 16 App Router、Route Handlers、jose 簽發 JWT",
      memory: "MongoDB Atlas（練習紀錄、用量事件、操作紀錄）、瀏覽器 localStorage（使用者金鑰）",
    },
    arch: [
      { title: "使用者端", nodes: [{ name: "React 介面", note: "設定 → 面試 → 診斷書" }, { name: "localStorage", note: "只存使用者的 OpenAI 金鑰" }] },
      { title: "Next.js on Vercel", nodes: [{ name: "/api/interview", note: "金鑰由標頭帶入，用完即丟" }, { name: "/api/admin/*", note: "401／403 權限檢查" }, { name: "/api/auth/google", note: "HTTP-only JWT" }] },
      { title: "外部服務與資料", nodes: [{ name: "OpenAI + web_search" }, { name: "MongoDB Atlas" }, { name: "Google OAuth" }] },
    ],
    security: [
      { title: "金鑰不落地", why: "使用者的 OpenAI 金鑰只存在自己瀏覽器的 localStorage，每次請求用 X-OpenAI-Key 標頭送出，伺服器呼叫完就丟掉，不寫入資料庫也不寫進日誌。" },
      { title: "API 驗證", why: "未登入一律回 401，角色不足回 403；support 角色只能看不能改，擁有者帳號不能被降級或停權。" },
      { title: "登入憑證", why: "JWT 放在 HTTP-only、SameSite=Lax 的 cookie，前端程式讀不到；JWT 內只放 userId，不放 Email 等個資。" },
      { title: "可追溯", why: "後台每一次修改都寫入操作紀錄（誰、改了誰、改了什麼）；正式與本機環境使用不同的簽章金鑰。" },
    ],
    performance: [
      { title: "統計在資料庫端計算", why: "後台的趨勢、漏斗與排行用 MongoDB aggregate 一次算完，不把原始事件全部拉回伺服器。" },
      { title: "圖表不載入套件", why: "雷達圖與統計圖手寫 SVG，頁面不多背一個圖表函式庫。" },
      { title: "等待時間的體感", why: "搜尋要 20 到 60 秒，載入畫面逐步顯示正在做的事，降低中途離開。" },
    ],
    lens: {
      insight: "求職者缺的不是題庫，而是「這家公司會怎麼問、我哪裡要改」。",
      roi: ["使用者自備金鑰，平台 AI 成本為 0", "後台追蹤每場 token 成本與「開始 → 完成 → 下載」漏斗，作為訂價依據"],
      api: "OpenAI Responses API，金鑰由 X-OpenAI-Key 標頭帶入、用完即丟；輸出用 json_schema strict 模式",
      tools: "OpenAI 內建 web_search 工具：模型自行決定搜尋關鍵字找面經（未使用 MCP）",
      state: "setup → interview → report 三階段；每題的分數與改寫存在練習紀錄",
      edges: ["web_search 失敗：改用同產業資料出題，流程不中斷", "401／429 轉成看得懂的提示，開始前先驗證金鑰"],
    },
    pm: {
      timeline: [
        { date: "09/23", phase: "需求定義", detail: "訂出三階段流程（設定、面試、診斷書）與 MVP 範圍，決定先採用使用者自備金鑰（BYOK）。" },
        { date: "09/24", phase: "MVP 完成", detail: "面試模擬、診斷書下載、職涯專欄 5 篇、品牌 icon，調整首頁區塊順序與導覽。" },
        { kind: "maintenance", date: "10/23", phase: "範疇調整", detail: "登入方式改為只用 Google，拿掉帳號密碼註冊。" },
        { kind: "maintenance", date: "10/27", phase: "環境整理", detail: "專案搬離 iCloud 同步資料夾，解決開發環境卡死的問題。" },
        { kind: "maintenance", date: "10/28", phase: "後台上線", detail: "會員角色、方案、停權、用量追蹤，正式部署到 Vercel，推上 main 自動部署。" },
      ],
      scopeIn: [
        "面試三階段流程與逐題評分",
        "使用者自備 OpenAI 金鑰（BYOK）",
        "診斷書下載（PDF／PNG）",
        "管理後台：角色、方案、用量與成本統計",
      ],
      scopeOut: [
        "語音面試：先保留音訊波形的視覺，等文字流程穩定再做",
        "金流與付費方案：先記錄每位會員的 token 成本，當作訂價依據",
        "帳號密碼登入與忘記密碼流程",
      ],
      risks: [
        { risk: "搜尋不到目標公司的面經，面試開不起來", response: "搜尋失敗時改用模型知識綜合同產業資料出題，流程不中斷。" },
        { risk: "搜尋加出題要 20 到 60 秒，使用者以為當機", response: "載入畫面逐步顯示正在做的事，每 5 秒前進一步。" },
        { risk: "AI 費用無法預估", response: "MVP 採 BYOK，後台同步記錄 token、預估成本與錯誤次數。" },
      ],
    },
    product: {
      problem:
        "面試準備的資料很多，大部分是通用題庫。使用者真正想知道的是三件事：這家公司會怎麼問、我答得好不好、哪裡要改。現有工具缺的是針對公司出的題目，以及一份可以照著改的回饋。",
      users: [
        "投遞上市櫃公司或外商職缺的轉職者",
        "第一次面試主管職，需要練回答深度的人",
        "沒有人可以對練的應屆畢業生",
      ],
      goals: [
        "15 分鐘內完成一場 8 題模擬",
        "每題都有分數與示範改寫，不只給「回答得不錯」",
        "診斷書可以帶走，下次面試前拿出來複習",
      ],
      decisions: [
        { title: "最後一題固定是反問環節", why: "面試官常用反問判斷候選人做了多少功課，多數練習工具卻不練這一段。" },
        { title: "登入只留 Google", why: "帳密註冊要處理驗證信與忘記密碼，對 MVP 成本太高，目標使用者幾乎都有 Google 帳號。" },
        { title: "「需要登入才能面試」做成後台開關，預設關閉", why: "先讓人不用註冊就能試，等需要控管用量時再打開。" },
        { title: "評分拆成六項能力", why: "總分只能告訴使用者好不好，六項分數才知道要先改哪裡。" },
      ],
    },
    engineering: {
      architecture: [
        { name: "前端", detail: "面試流程在同一頁用三階段狀態切換（設定、進行中、報告），避免換頁時遺失作答內容。" },
        { name: "AI", detail: "OpenAI Responses API，出題時開啟 web_search 工具，讓模型自行決定搜尋關鍵字。" },
        { name: "資料", detail: "MongoDB Atlas，練習紀錄、用量事件、系統設定、管理日誌、使用者建議分開存放。" },
        { name: "驗證", detail: "Google OAuth，JWT 放在 HTTP-only cookie；後台分 user、support（唯讀）、admin 三種角色。" },
        { name: "部署", detail: "Vercel，正式環境與本機使用不同的 JWT_SECRET，擁有者帳號不能被降級或停權。" },
      ],
      highlights: [
        { title: "診斷書兩種匯出", why: "PDF 走瀏覽器列印，用 @media print 只印出診斷書區塊；PNG 用 html-to-image 以 2 倍解析度輸出，並排除收合按鈕等不該出現的元素。" },
        { title: "圖表自己用 SVG 畫", why: "雷達圖、甜甜圈圖、趨勢圖都不依賴圖表套件，列印與匯出圖片時不會跑版。" },
        { title: "用量事件追蹤", why: "每次面試記錄 token、預估成本、耗時、錯誤與下載次數，後台能看每位會員的使用深度。" },
      ],
    },
    issues: [
      {
        title: "冷門公司搜尋不到資料，面試開不起來",
        situation: "新創或規模較小的公司在網路上幾乎沒有面經，搜尋回傳空結果，有時工具本身直接報錯。",
        cause: "原本的流程把「搜尋成功」當成出題的前提。",
        fix: "搜尋改成加分項。失敗時退回用模型本身的知識，綜合同產業、同類型公司的資料出題，設定頁也寫清楚這個規則。",
        result: "任何公司名稱都能開始面試，不會卡在第一步。",
      },
      {
        title: "等待太久，使用者以為當機",
        situation: "搜尋加出題需要 20 到 60 秒，期間畫面沒有變化。",
        cause: "只有一個轉圈圖示，看不出系統在做什麼。",
        fix: "載入畫面列出五個實際步驟（搜尋面經、閱讀分享、整理題型、比對 JD、安排面試官），每 5 秒前進一步，停在最後一步不繞回開頭。",
        result: "等待時有進度感，也不會看起來像重新開始。",
      },
      {
        title: "加上後台後，正式環境建置失敗",
        situation: "本機正常，推上 Vercel 後 build 失敗。",
        cause: "這版 Next.js 已移除 export const dynamic；另外在 cookies() 外層用 try/catch 吞掉錯誤，會讓框架誤判頁面可以靜態產生。",
        fix: "後台頁面與 /api/auth/me 改用 await connection()，明確宣告每次請求都要重新渲染，並移除吞錯誤的寫法。",
        result: "建置通過，後台資料每次載入都是最新的。",
        phase: "維護期",
      },
      {
        title: "開發環境啟動卡住超過 5 分鐘",
        situation: "tsc 與 next dev 都沒有回應。",
        cause: "專案放在 iCloud 同步的桌面，約 30,000 個 node_modules 檔案被移到雲端，只剩佔位檔。",
        fix: "專案搬到不同步的 ~/Projects，重新安裝套件，桌面保留捷徑方便開啟。",
        result: "開發環境恢復正常，之後的新專案都直接建在 ~/Projects。",
        phase: "維護期",
      },
    ],
    next: [
      "依後台累積的 token 成本訂出付費方案",
      "語音面試",
      "診斷書歷史紀錄與分數變化曲線",
    ],
  },
  {
    slug: "taste-trace",
    name: "Taste-Trace",
    category: "生活風格 × AI 推薦",
    tagline: "依心情與天氣推薦料理，附在地替代食材、份量換算與合併採買清單。",
    summary:
      "「今晚吃什麼」是每天都要做的決定。食譜網站的資料很多，但得先知道自己想吃什麼才搜得到。Taste-Trace 反過來先問使用者現在的心情，或讀取當地天氣，推薦三道菜。每道菜附依人數換算好的份量、當地買得到的替代食材，多道菜的食材可以合併成一張採買清單。網站另外整理了當季蔬果，以及豬、牛、雞、鴨、鵝、羊的部位圖解，支援繁中、英文、日文。",
    status: "上線中",
    url: "https://taste-trace.vercel.app",
    repo: "https://github.com/annice0801/taste-trace",
    startedAt: "2026-10-08",
    period: "2026/10/08 – 2026/10/13",
    buildTime: "約 7.5 小時",
    maintenance: {
      period: "2026/10/14 – 2026/10/20",
      time: "約 3.5 小時",
      summary: "上線後擴充內容與營運工具：食材照片自動補圖與授權標示、後台上傳照片、管理員分權限、肉品部位圖解，以及正式環境的設定容錯與穩定性修正。",
    },
    role: ["產品規劃", "內容架構", "UI 設計", "全端開發", "後台營運設計"],
    stack: [
      "Next.js 16 App Router",
      "TypeScript",
      "Tailwind CSS",
      "next-intl",
      "OpenAI Structured Outputs",
      "Zod",
      "MongoDB",
      "Better Auth",
      "Vercel Blob",
      "Vercel",
    ],
    accent: "#a0522d",
    cover: "/shots/taste-home.png",
    stats: [
      { value: "7.5 小時", label: "做出第一版（實際操作）" },
      { value: "15,500", label: "行 TypeScript" },
      { value: "3", label: "種語言" },
      { value: "8", label: "個後台模組" },
    ],
    shots: [
      {
        src: "/shots/taste-home.png",
        title: "首頁",
        caption: "右側卡片示範一次推薦結果（微雨 18°C，想被療癒的晚上），比文字說明更快讓人懂。",
      },
      {
        src: "/shots/taste-cuts.png",
        title: "肉品部位圖解",
        caption: "點部位就能看到台灣的叫法、賣場與肉商的標示名稱、油脂與軟嫩程度，以及每種煮法該切多厚、煮多久。",
      },
      {
        src: "/shots/taste-produce.png",
        title: "當季蔬果",
        caption: "依所在地區整理盛產月份、產地、挑選方法與吃法，出國旅行時換個地點也能用。",
      },
      {
        src: "/shots/taste-chefs.png",
        title: "功能說明",
        caption: "份量換算、合併採買清單、在地替代食材、收藏、作品集、自帶金鑰，六項功能各用一句話說完。",
      },
      {
        src: "/shots/taste-explore.png",
        title: "探索食譜",
        caption: "依國家、料理類型與名廚靈感分類瀏覽。",
      },
      {
        src: "/shots/taste-mobile.png",
        title: "手機版",
        caption: "手機版先放標題與「開始使用」按鈕，照片牆排在後面。",
        device: "mobile",
      },
    ],
    adminShots: [
      { src: "/shots/taste-admin-home.png", title: "後台總覽", caption: "使用者、食譜、收藏、24 小時推薦次數與未處理錯誤；右側列出最近的管理操作。" },
      { src: "/shots/taste-admin-metrics.png", title: "使用統計", caption: "每日推薦次數、熱門國家與料理類型的查詢與收藏比，作為首頁策展的依據。瀏覽事件採匿名統計。" },
      { src: "/shots/taste-admin-users.png", title: "使用者管理", caption: "可搜尋、停權；停權後立即登出所有裝置，也無法再登入。管理員帳號不能被停權。" },
      { src: "/shots/taste-admin-admins.png", title: "管理員與權限", caption: "依功能勾選權限，沒勾選的功能看不到，也無法直接用網址或 API 操作。" },
      { src: "/shots/taste-admin-logs.png", title: "錯誤日誌", caption: "伺服器錯誤依來源分類，金鑰與 token 自動遮蔽；處理完標記為已處理。" },
    ],
    star: {
      situation: "使用者卡在「不知道今天想吃什麼」，而且食譜的食材在台灣買不到、份量也要自己換算。",
      task: "做一個從心情或天氣出發的推薦工具，附在地替代食材、份量換算與合併採買清單，並支援三種語言；同時要控制 AI 成本與照片版權。",
      action: "推薦用 Structured Outputs 搭配 Zod 驗證；做法第一次產生後存進資料庫全站共用；照片只用有授權的來源並標示作者；後台提供 Prompt 版本、錯誤日誌、照片與權限管理。",
      result: "實際操作約 7.5 小時完成三語系第一版並上線。維護期約 3.5 小時，補齊 127 種食材照片的授權標示、肉品部位圖解與管理員分權限，後台 8 個模組讓內容與營運不必改程式。",
    },
    blocks: {
      api: "OpenAI Structured Outputs、Open-Meteo 天氣、Wikimedia Commons、Unsplash、Google 登入（Better Auth）；對外提供 MCP 端點 /api/mcp",
      ui: "Tailwind CSS、next-intl 三語系、捲動視差與紙張質感",
      logic: "Next.js 16 App Router、proxy.ts 語系導向、Zod 驗證",
      memory: "MongoDB（食譜、收藏、Prompt 版本、日誌）、Vercel Blob（圖片）、資料庫快取 AI 產生的做法",
    },
    arch: [
      { title: "使用者端", nodes: [{ name: "三語系介面", note: "繁中／英文／日文" }, { name: "localStorage", note: "使用者自備的金鑰" }] },
      { title: "Next.js on Vercel", nodes: [{ name: "proxy.ts", note: "依語言導向" }, { name: "/api/recommend、/api/recipe-detail", note: "先查資料庫，沒有才呼叫 AI" }, { name: "/api/admin/*", note: "依功能檢查權限" }, { name: "/api/mcp", note: "MCP 伺服器，5 個唯讀工具" }] },
      { title: "外部服務與資料", nodes: [{ name: "OpenAI" }, { name: "MongoDB" }, { name: "Vercel Blob" }, { name: "Open-Meteo、Wikimedia" }] },
    ],
    security: [
      { title: "金鑰不落地", why: "使用者自備的 OpenAI 金鑰只存在瀏覽器，透過標頭送出，伺服器不保存。" },
      { title: "API 驗證", why: "收藏、作品等個人功能未登入回 401；後台操作沒有該項權限回 403，頁面與 API 用同一份權限表檢查。" },
      { title: "日誌不留機敏資料", why: "錯誤日誌寫入前自動遮蔽金鑰與 token，補充資料不含個資。" },
      { title: "帳號與上傳", why: "停權的帳號無法建立新的登入，現有登入也立即失效；上傳圖片檢查檔頭，擋下改了副檔名的檔案。" },
    ],
    performance: [
      { title: "AI 結果快取", why: "做法只在第一次點開時產生，存進資料庫後所有人共用，同一道菜不會重複付費。" },
      { title: "照片只找一次", why: "每種食材全站只搜尋一次照片並記錄檢查時間，之後直接讀資料庫。" },
      { title: "檔案與資料分離", why: "圖片放 Vercel Blob，資料庫只存網址與授權資訊，查詢保持輕量。" },
    ],
    lens: {
      insight: "使用者卡在「今天想吃什麼」，而且食材在台灣買不到、份量要自己換算。",
      roi: ["做法第一次產生後存進資料庫全站共用，同一道菜只付一次 AI 費用", "後台統計推薦點擊率與收藏比，作為首頁策展依據"],
      api: "OpenAI 搭配 Zod 結構化輸出；有使用者金鑰就用使用者的，沒有才用平台金鑰",
      tools: "提供 MCP 伺服器（/api/mcp）：搜尋食譜、份量換算、合併採買清單、蔬果挑選標準等 5 個唯讀工具，不呼叫 AI、不開放使用者資料；生成端用 Structured Outputs 約束格式",
      state: "做法與照片採「先查資料庫，沒有才產生」；照片記錄檢查時間，不重複搜尋",
      edges: ["Unsplash 回 429 時依 Retry-After 重試，最多 2 次", "讀取登入狀態失敗時後台仍可使用；上傳檢查檔頭，擋下偽裝副檔名"],
    },
    pm: {
      timeline: [
        { date: "10/08", phase: "專案建立", detail: "整理資料模型：食譜、收藏、作品、搜尋紀錄，以及後台需要的日誌與稽核。" },
        { date: "10/13", phase: "主體完成", detail: "心情與天氣推薦、名廚靈感類別、三語系、管理後台；同日加入飲品與調酒類別，以及首頁捲動動態。" },
        { kind: "maintenance", date: "10/14", phase: "內容與營運", detail: "食材照片自動補圖並標示授權、後台自行上傳照片、管理員依功能分權限、肉品部位圖解。" },
        { kind: "maintenance", date: "10/14", phase: "上線修正", detail: "Vercel 環境變數的格式容錯（登入網址、Blob token、管理員名單）。" },
        { kind: "maintenance", date: "10/20", phase: "穩定性", detail: "讀取登入狀態失敗時，後台頁面維持可用，不再整頁錯誤。" },
        { kind: "maintenance", date: "10/29", phase: "MCP 與挑選標準", detail: "新增唯讀 MCP 伺服器，讓 Claude 等 AI 助理查詢食譜；當季蔬果加上依感官與目的整理的挑選標準；修正份量換算時括號內重量不會跟著換算。" },
      ],
      scopeIn: [
        "心情與天氣推薦、名廚靈感料理",
        "份量換算、合併採買清單、在地替代食材",
        "當季蔬果、肉品部位圖解",
        "後台：照片、Prompt 版本、錯誤日誌、指標、維護模式、管理員權限",
      ],
      scopeOut: [
        "留言、按讚等社群互動",
        "外送或電商串接",
        "營養成分計算",
      ],
      risks: [
        { risk: "每次產生做法都要花 AI 費用，結果也不一致", response: "做法第一次產生後存進資料庫，之後所有人讀同一份。" },
        { risk: "照片版權", response: "只用 Wikimedia 有授權的照片並標示作者與授權，也開放後台上傳自有照片。" },
        { risk: "以名廚為靈感的內容可能有肖像與著作權疑慮", response: "頭像全部原創插畫，頁面明確聲明不是本人食譜、也未經授權。" },
      ],
    },
    product: {
      problem:
        "使用者卡住的地方是「不知道想吃什麼」，不是「不知道怎麼煮」。另外兩個常見的卡點：食譜上的食材在台灣超市買不到，以及份量是 4 人份、家裡只有 2 個人。",
      users: [
        "下班後要決定晚餐的上班族",
        "想練廚藝、想知道做法背後原理的人",
        "出國旅行時想逛懂當地市場的人",
      ],
      goals: [
        "打開網站到看到推薦不超過三步",
        "份量與採買清單不需要使用者自己算",
        "照片與內容來源清楚，可以查證",
      ],
      decisions: [
        { title: "推薦固定三道", why: "選項太多反而難決定，三道剛好可以比較。" },
        { title: "每個類別配一位主廚角色", why: "辦桌阿嬤、京都料理長、托斯卡尼奶奶用各自的口吻說明推薦理由，推薦有個性，類別也比較好記。" },
        { title: "名廚類別拆成「原理」與「家庭版」", why: "先講梅納反應、乳化這些為什麼，再換成家用器材與在地食材，學得到東西也做得出來。" },
        { title: "肉品部位用台灣的叫法", why: "同一個部位在超市、肉攤、食譜上名字不一樣，所以把梅花、板腱、松阪豬和賣場、肉商的標示名稱並列。" },
        { title: "OpenAI 金鑰只存在使用者的瀏覽器", why: "讓重度使用者可以自備金鑰，平台不保管任何人的金鑰。" },
      ],
    },
    engineering: {
      architecture: [
        { name: "路由", detail: "[locale] 動態區段處理三種語言，proxy.ts 依語言導向；後台 /admin 不分語系。" },
        { name: "AI", detail: "OpenAI Structured Outputs 搭配 Zod schema。Structured Outputs 不支援選填欄位，可能沒有值的欄位一律改成 nullable。" },
        { name: "資料", detail: "Mongoose 12 個模型，包含 Prompt 版本、錯誤日誌、分析事件與後台稽核紀錄。" },
        { name: "檔案", detail: "圖片存在 Vercel Blob，資料庫只存網址與授權資訊；上傳時檢查檔頭，確認真的是 JPEG、PNG 或 WebP。" },
        { name: "權限", detail: "擁有者由環境變數指定，其他管理員依功能勾選權限，前後端共用同一份權限表。" },
      ],
      highlights: [
        { title: "份量解析器", why: "看得懂「1又1/2 大匙」「2-3 瓣」「半顆」。10 以下以 1/4 為單位用分數顯示；合併採買清單時同單位相加，「適量」「少許」保留並列。" },
        { title: "做法延遲產生並快取", why: "推薦時只產生概要，使用者點開某道菜才請 AI 產生做法，存進資料庫後所有人共用，控制成本。" },
        { title: "Prompt 版本管理", why: "推薦與做法的 Prompt 存在資料庫並保留每個版本，後台直接調整，不必重新部署。" },
      ],
    },
    issues: [
      {
        title: "照片跟菜對不上",
        situation: "早期用關鍵字找圖，常出現擺盤不同、甚至不是同一道菜的照片；食材的照片也會出現整盤料理。",
        cause: "關鍵字搜尋只比對文字，無法判斷照片內容。",
        fix: "食材與當季蔬果只用「食材本身」的照片，改用 Wikipedia 條目的首圖並比對是否為同一種食材，附上作者與授權連結。後台加上一鍵補圖與手動上傳。",
        result: "每張照片都查得到來源，對不上的可以在後台直接替換。",
        phase: "維護期",
      },
      {
        title: "正式環境的 Google 登入跳回 localhost",
        situation: "部署到 Vercel 後，登入完成會導向本機網址。",
        cause: "BETTER_AUTH_URL 沿用了本機設定。",
        fix: "偵測到設定指向 localhost 或不是合法網址時，改用 Vercel 提供的網址；這個設定錯誤也不再讓建置失敗。",
        result: "同一份程式在本機與正式環境都能登入。",
        phase: "製作期",
      },
      {
        title: "環境變數帶了引號，上傳與管理員判斷失敗",
        situation: "圖片上傳失敗，部分管理員進不了後台。",
        cause: "在 Vercel 後台貼上 BLOB token 與 ADMIN_EMAILS 時多了引號和空白。",
        fix: "讀取環境變數時統一去除引號與空白。",
        result: "設定時的小失誤不會再造成功能失效。",
        phase: "維護期",
      },
      {
        title: "部位圖在手機上看不清楚",
        situation: "整張圖等比例縮小後，部位名稱擠在一起，很難點到。",
        cause: "原本只畫大分切，一個區塊放太多名稱。",
        fix: "豬、雞、羊的部位再細分，牛肉依台灣的分切方式重畫，肩胛拆成嫩肩、板腱、肩胛眼；調整手機版字級與點擊範圍。",
        result: "手機上可以直接點部位看說明。",
        phase: "維護期",
      },
      {
        title: "後台的確認詞太難輸入",
        situation: "刪除資料、開啟維護模式前要輸入確認詞，在手機上常打錯。",
        cause: "確認詞是一整句話。",
        fix: "改成簡短、容易輸入的確認詞，保留防呆但降低操作負擔。",
        result: "危險操作仍需確認，但不會因為打錯字卡住。",
        phase: "維護期",
      },
    ],
    next: [
      "依所在地區自動切換替代食材",
      "推薦結果參考使用者的收藏偏好",
      "作品集加入互動功能",
    ],
  },
  {
    slug: "collab-office",
    name: "CollabOffice",
    category: "多 Agent 協作系統",
    tagline: "一間由 AI 組成的公司：秘書、總經理、部門經理與員工分工處理交辦的事。",
    summary:
      "同時經營副業、投資與家庭事務時，事情會散落在很多地方。CollabOffice 把這些工作交給一個 AI 組織。使用者是老闆，底下有首席秘書與總經理兩位核心主管：總經理把目標拆成部門任務，部門經理分派給員工執行、審閱，再彙整成報告回給老闆。整個過程呈現在一層等角視角的辦公室裡，看得到每個人正在做什麼。",
    status: "開發中",
    startedAt: "2026-10-15",
    period: "2026/10/15 – 開發中",
    buildTime: "累計約 7 小時",
    role: ["產品構想", "組織與流程設計", "全端開發"],
    stack: [
      "Next.js 16 App Router",
      "TypeScript",
      "Tailwind CSS",
      "Claude API（Sonnet／Haiku）",
      "MongoDB",
      "Mongoose",
      "Better Auth",
      "Vercel Blob",
      "Zod",
    ],
    accent: "#3a5a8c",
    cover: "",
    stats: [
      { value: "7 小時", label: "累計實際操作" },
      { value: "15,600", label: "行 TypeScript" },
      { value: "4", label: "種辦公室主題" },
    ],
    shots: [],
    adminShots: [],
    star: {
      situation: "AI 工具多半是一問一答，使用者要自己拆工作、追進度；同時處理副業、投資與家務時更容易漏掉。",
      task: "驗證「把組織結構套在 AI 上」是否可行：使用者只交代目標，由 AI 組織拆解、執行、審閱並回報。",
      action: "設計四層組織與任務狀態機，每一步存檔可接續；主管用 Sonnet、員工用 Haiku 分層控制成本；部門依會員問卷由 AI 產生。",
      result: "累計實際操作約 7 小時，任務從交代到報告的完整流程已經跑通，會議室與會員問卷完成；開發中遇到的 API 費用問題補上了鎖定與清楚的錯誤提示。下一步串接 LINE 與 Google Calendar 後開放試用。",
    },
    blocks: {
      api: "Anthropic Claude API（Sonnet／Haiku）、Google 登入（Better Auth）",
      ui: "Tailwind CSS、等角視角辦公室、四種主題",
      logic: "Next.js 16 App Router、任務狀態機、Zod 驗證",
      memory: "MongoDB（任務、報告、會議、組織）、Vercel Blob（檔案）",
    },
    arch: [
      { title: "使用者端", nodes: [{ name: "辦公室畫面", note: "即時看到每個人的進度" }, { name: "會員問卷", note: "產生專屬部門" }] },
      { title: "Next.js 伺服器", nodes: [{ name: "任務引擎", note: "一次一步，存檔可接續" }, { name: "會議室", note: "主管平行發言" }, { name: "/api/*", note: "未登入回 401" }] },
      { title: "外部服務與資料", nodes: [{ name: "Claude Sonnet／Haiku" }, { name: "MongoDB" }, { name: "Vercel Blob" }] },
    ],
    security: [
      { title: "金鑰只在伺服器", why: "Claude API 金鑰放在伺服器環境變數，呼叫 AI 的模組標記為 server-only，不會被打包到前端。" },
      { title: "API 驗證", why: "所有 API 先確認登入，未登入回 401；部門、任務、檔案依會員分開存放。" },
      { title: "AI 不自行擴大範圍", why: "會議只討論不派工，修改目標與交辦工作都要老闆確認。" },
    ],
    performance: [
      { title: "模型分層", why: "需要判斷的主管用 Sonnet，執行工作的員工用較便宜的 Haiku，並記錄每次呼叫的 token。" },
      { title: "平行呼叫", why: "會議中多位主管同時發言，等待時間接近一次呼叫而不是累加。" },
      { title: "可接續的長流程", why: "每一步都存檔，中斷後從原處繼續，不必重跑前面已付費的步驟。" },
    ],
    lens: {
      insight: "AI 工具多半一問一答，使用者要自己拆工作、追進度。",
      roi: ["主管用 Sonnet、員工用較便宜的 Haiku，每次呼叫記錄 token", "尚未上線，還沒有轉換數據"],
      api: "Claude Messages API；會議中多位主管平行呼叫，等待時間接近一次呼叫",
      tools: "Claude 伺服器端 web_search 工具，限制每次最多搜尋次數（未使用 MCP）",
      state: "任務 pending → planning → in_progress → reviewing → completed；工作 submitted 被退回時進入 revision 重做",
      edges: ["lockedUntil 鎖定，避免同一任務被重複執行", "審閱多次不合格時改由老闆決定：重做或結案；未完成問卷回 409"],
    },
    pm: {
      timeline: [
        { date: "10/15", phase: "架構定案", detail: "確定組織層級與模型分工：主管用 Sonnet、員工用 Haiku；通知先做 LINE、Email 備援；行事曆串 Google Calendar。" },
        { date: "10/15–10/18", phase: "任務引擎", detail: "總目標、總經理拆解、經理分派、員工執行、經理審閱、彙整報告，整條流程跑通。" },
        { date: "10/19", phase: "會員問卷", detail: "AI 依回答設計部門，辦公室主題用規則計分推薦，加上個人辦公桌頁面。" },
        { date: "10/19", phase: "成本控管", detail: "測試資料觸發真實 AI 呼叫、帳號達到用量上限，補上任務鎖定與清楚的錯誤訊息。" },
        { date: "下一階段", phase: "外部串接", detail: "LINE 通知、Google Calendar、定時任務，完成後部署開放試用。" },
      ],
      scopeIn: [
        "組織架構與任務引擎",
        "會議室：多位主管同時討論",
        "依會員需求產生的部門",
        "檔案存放與報告",
      ],
      scopeOut: [
        "圖像與語音生成，之後再評估",
        "高頻率排程：Vercel 免費方案的 Cron 次數有限，先確認額度再決定提醒頻率",
      ],
      risks: [
        { risk: "多個 Agent 串接，一個任務可能呼叫很多次 AI", response: "員工用較便宜的 Haiku，只有需要判斷的主管用 Sonnet；每次呼叫記錄 token 與搜尋次數。" },
        { risk: "長流程中途失敗，前面的成果白費", response: "引擎一次只推進一步並存檔，伺服器重啟後從中斷處接續。" },
        { risk: "AI 自行擴大任務範圍", response: "會議只討論不派工，修改目標與交辦都要老闆在畫面上確認。" },
      ],
    },
    product: {
      problem:
        "現在的 AI 工具大多是一問一答，使用者要自己拆解工作、記得追進度。真實的公司靠的是分工、審閱和回報。這個專案想驗證的是：把組織結構套在 AI 上，使用者能不能只交代目標，然後看報告。",
      users: [
        "同時處理副業、投資與家庭事務的個人",
        "想把重複性資料整理交出去的小團隊負責人",
      ],
      goals: [
        "使用者只交代目標，不需要自己拆步驟",
        "每一步看得到誰在做、做到哪裡",
        "每位會員的部門依自己的需求產生",
      ],
      decisions: [
        { title: "秘書與總經理同一職級", why: "生活、健康、行程找秘書，工作找總經理，兩位都能直接對話，避免所有事情擠在同一個入口。" },
        { title: "部門不寫死", why: "註冊後回答問卷，AI 依答案設計部門，使用者可以刪掉不需要的或重新產生。" },
        { title: "會議室只討論，不派工", why: "主管各自依背景發言、總經理做結論，要不要改目標由老闆決定。" },
        { title: "辦公室主題用規則計分", why: "在瀏覽器內即時算出結果，不花任何 AI 費用。" },
      ],
    },
    engineering: {
      architecture: [
        { name: "任務引擎", detail: "狀態機，每次推進一步（一次 AI 呼叫）並寫入資料庫，任務之間可以設定相依關係。" },
        { name: "Agent", detail: "總經理、部門經理、員工各有獨立的 Prompt 與人設：學經歷、專長、審查重點、說話風格。" },
        { name: "會議", detail: "列席主管平行呼叫，同一場會議保留前面的發言內容。" },
        { name: "資料", detail: "Mongoose 9 個模型：目標、任務、子任務結果、報告、會議、決策、活動紀錄、組織、辦公桌便條。" },
        { name: "檔案", detail: "Vercel Blob 存檔案，資料庫只存網址。" },
      ],
      highlights: [
        { title: "經理審閱與退回", why: "員工交出的結果由部門經理檢查，不合格就退回重做，最後才彙整成報告。" },
        { title: "任務相依", why: "用 dependsOn 標記前置任務，前一個部門完成後，下一個部門才開始。" },
        { title: "等角視角辦公室", why: "樓層有會議室、休息室、圖書室、遊戲室與花園；休息室裡有俄羅斯方塊和彈珠台小遊戲。" },
      ],
    },
    issues: [
      {
        title: "測試資料自己花掉 API 費用",
        situation: "建立測試資料後打開辦公室頁面，AI 開始執行任務並產生費用。",
        cause: "辦公室頁面會自動接續最新一筆未完成的任務，測試資料剛好符合條件。",
        fix: "測試資料的未完成任務一律設定鎖定時間；開發端的測試在花費 API 額度前先確認。",
        result: "之後的測試不再產生非預期費用。",
      },
      {
        title: "API 達到用量上限，畫面只顯示一般錯誤",
        situation: "聊天、任務、會議同時失敗，看不出原因。",
        cause: "用量上限的錯誤被當成一般錯誤處理。",
        fix: "辨識用量上限錯誤，畫面直接顯示「AI 用量已達上限」與恢復時間。",
        result: "使用者知道是額度問題，開發時也不會誤判成程式錯誤。",
      },
      {
        title: "開發套件的安全性警告",
        situation: "npm audit 回報 5 個 high 等級漏洞。",
        cause: "全部來自 ESLint 相關套件依賴的 braces，只在開發工具中使用，不會進正式環境。",
        fix: "評估後不使用 --force，因為會把 eslint-config-next 降回 14 版，風險比問題本身大；列入追蹤，等上游更新。",
        result: "保持開發工具版本一致，風險有紀錄可查。",
      },
    ],
    next: [
      "LINE Messaging API 通知，Email 備援",
      "Google Calendar 串接",
      "部署並開放試用",
    ],
  },
  {
    slug: "parenting-lab",
    name: "Parenting Lab",
    category: "品牌官網 × 互動教具",
    tagline: "給 3–6 歲孩子家長的資源網站，含 coding 小遊戲與 3D 蒙特梭利教具。",
    summary:
      "家長要在大量的育兒資訊、玩具與課程裡挑出適合孩子的，很花時間。Parenting Lab 是一個品牌官網：整理 3 到 6 歲的發展文章，並把兩個原本獨立的小作品整合進來，一個是讓孩子排方向方塊的「小狗回家」coding 遊戲，一個是可以旋轉、拖曳的 3D 二項式積木。",
    status: "上線中",
    url: "https://parenting-lab.vercel.app",
    repo: "https://github.com/annice0801/parenting_lab",
    startedAt: "2026-09-17",
    period: "2026/09/17 – 2026/09/24",
    buildTime: "約 6.5 小時",
    role: ["品牌與內容規劃", "UI 設計", "前端開發"],
    stack: ["Next.js 16 App Router", "TypeScript", "Tailwind CSS", "Three.js", "Vercel"],
    accent: "#b5764f",
    cover: "/shots/lab-home.png",
    stats: [
      { value: "6.5 小時", label: "完成上線（實際操作）" },
      { value: "2", label: "個互動作品" },
      { value: "7", label: "個遊戲關卡" },
      { value: "4", label: "篇發展文章" },
    ],
    shots: [
      {
        src: "/shots/lab-home.png",
        title: "首頁",
        caption: "首屏用真實的親子照片與一句定位說明品牌，頁首用訪客的暱稱打招呼。",
      },
      {
        src: "/shots/lab-philosophy.png",
        title: "品牌理念",
        caption: "六張卡片說明選品原則，每張一句話，讓家長快速判斷理念合不合。",
      },
      {
        src: "/shots/lab-game.png",
        title: "小狗回家大冒險",
        caption: "把方向方塊排好再按出發，學順序與路徑規劃；關卡從 4×4 到 10×10，也能用鍵盤即時操作。",
      },
      {
        src: "/shots/lab-cube.png",
        title: "二項式積木屋",
        caption: "把積木拖進立方體提示的位置，可以旋轉看角度。實體教具價格高，線上版讓家長先理解玩法。",
      },
      {
        src: "/shots/lab-blog.png",
        title: "幼兒發展文章",
        caption: "依年齡分成總覽與 3–4、4–5、5–6 歲，每篇附可以在家做的活動。",
      },
      {
        src: "/shots/lab-mobile.png",
        title: "手機版",
        caption: "手機版關閉視差，保留文字與按鈕的閱讀順序。",
        device: "mobile",
      },
    ],
    adminShots: [],
    star: {
      situation: "家長要在大量育兒資訊與教具中挑選，缺的是有人幫忙篩選；手上已有兩個獨立的小作品，但沒有一個能對外展示的品牌入口。",
      task: "做出品牌官網，整理發展文章，並把 coding 遊戲與 3D 教具整合進同一個網站。",
      action: "先用單檔 HTML 驗證兩個互動作品能玩，再搬進 Next.js；首頁拆成五個區塊元件；3D 教具用 iframe 隔離；視差在手機與減少動態設定下關閉。",
      result: "實際操作約 6.5 小時完成並部署上線，4 篇發展文章、2 個互動作品、7 個遊戲關卡，不需要下載就能在手機與電腦上使用。",
    },
    blocks: {
      api: "無後端 API，純前端網站",
      ui: "Tailwind CSS、自製視差與進場動畫",
      logic: "Next.js 16 App Router、Three.js（3D 教具）",
      memory: "瀏覽器 localStorage（暱稱、遊戲進度）",
    },
    arch: [
      { title: "使用者端", nodes: [{ name: "品牌官網與文章" }, { name: "coding 遊戲", note: "React state 驅動" }, { name: "3D 教具", note: "Three.js，iframe 隔離" }] },
      { title: "Vercel", nodes: [{ name: "靜態頁面託管" }] },
      { title: "瀏覽器儲存", nodes: [{ name: "localStorage", note: "暱稱、遊戲進度、訂閱名單" }] },
    ],
    security: [
      { title: "不收集個資", why: "沒有後端與資料庫，暱稱與遊戲進度只存在使用者自己的瀏覽器。" },
      { title: "容錯", why: "無痕模式或封鎖網站資料時，localStorage 讀寫失敗不影響瀏覽。" },
    ],
    performance: [
      { title: "動態效果分裝置", why: "視差只在桌機與平板開啟，手機與「減少動態效果」的使用者維持靜止。" },
      { title: "3D 獨立載入", why: "Three.js 只在教具頁的 iframe 內載入，不增加其他頁面的打包大小。" },
      { title: "動畫只播一次", why: "進場動畫用 Intersection Observer 觸發，播完就停止監聽。" },
    ],
    lens: {
      insight: "家長缺的是有人幫忙篩選育兒資訊與教具，而不是更多資訊。",
      roi: ["純靜態網站，沒有後端與資料庫費用", "2 個獨立作品整合進同一個品牌入口"],
      api: "沒有後端 API；靜態頁面部署在 Vercel",
      tools: "不使用 AI 工具呼叫；3D 教具用 Three.js，放在 iframe 內獨立載入",
      state: "coding 遊戲用 React state 管理關卡與指令佇列；進度存在 localStorage",
      edges: ["無痕模式讀寫 localStorage 失敗時仍可瀏覽", "手機與「減少動態效果」設定下關閉視差"],
    },
    pm: {
      timeline: [
        { date: "09/17", phase: "單檔試作", detail: "小狗回家遊戲與二項式積木先用單一 HTML 檔做出可玩版本。" },
        { date: "09/20", phase: "專案建立", detail: "建立 Next.js 專案，遊戲改寫成 React 頁面。" },
        { date: "09/21", phase: "品牌官網", detail: "首頁五個區塊、文章頁、3D 教具頁、訂閱表單。" },
        { date: "09/23", phase: "導覽", detail: "導覽列與手機選單，所有作品都能從首頁進入。" },
        { date: "09/24", phase: "上線", detail: "品牌 icon，部署到 Vercel。" },
      ],
      scopeIn: ["品牌官網與文章", "兩個互動作品", "訂閱名單（先存在瀏覽器）"],
      scopeOut: ["會員系統", "電商與金流", "後端資料庫"],
      risks: [
        { risk: "視差在手機上耗效能，也可能讓人暈眩", response: "手機與「減少動態效果」設定下停用視差。" },
        { risk: "3D 教具在部分裝置無法顯示", response: "WebGL 無法啟動時顯示替代訊息，不讓頁面空白。" },
        { risk: "瀏覽器封鎖儲存空間時功能出錯", response: "所有讀寫都有例外處理，讀不到就當作新訪客。" },
      ],
    },
    product: {
      problem:
        "家長缺的不是資訊，而是有人幫忙篩選。官網要先讓家長信任這個品牌，再把人帶到可以直接玩的互動內容。",
      users: ["3 到 6 歲孩子的家長", "幼教老師"],
      goals: ["首屏說清楚品牌在做什麼", "互動作品不需要下載就能玩", "手機上也好操作"],
      decisions: [
        { title: "進站先問暱稱", why: "之後頁首用暱稱打招呼，讓網站有被記住的感覺；只存在瀏覽器，不需要帳號。" },
        { title: "coding 遊戲用方向方塊", why: "3 到 6 歲的孩子多半還不識字，用箭頭與圖示學順序與路徑。" },
        { title: "積木做成可以旋轉的 3D", why: "家長在買實體教具之前，先在線上理解它的玩法與教學目的。" },
      ],
    },
    engineering: {
      architecture: [
        { name: "頁面", detail: "首頁拆成 Hero、About、Philosophy、MomentBanner、Subscribe 五個元件，共用 SiteProvider 管理暱稱。" },
        { name: "動態", detail: "視差與進場動畫自己寫，Intersection Observer 觸發，每個區塊只播放一次。" },
        { name: "3D", detail: "Three.js 寫在獨立頁面，用 iframe 嵌入，和主站的打包互不影響。" },
        { name: "儲存", detail: "暱稱、遊戲進度與訂閱名單存在 localStorage。" },
      ],
      highlights: [
        { title: "單檔 HTML 改寫成 React", why: "原本直接操作 DOM，搬進 React 後改成由 state 驅動畫面，關卡與棋盤大小變成資料。" },
        { title: "鍵盤與按鈕兩種操作", why: "電腦上用方向鍵，平板與手機用畫面按鈕。" },
      ],
    },
    issues: [
      {
        title: "視差效果在手機上的取捨",
        situation: "首頁有多張全幅照片，視差效果在手機上容易掉格，也可能讓對動態敏感的人不舒服。",
        cause: "手機的效能與螢幕尺寸跟桌機差很多，同一套效果不適合直接套用。",
        fix: "手機與開啟「減少動態效果」的使用者改為靜止；桌機與平板保留視差。",
        result: "手機捲動順暢，桌機保留景深效果。",
        phase: "製作期",
      },
      {
        title: "無痕模式下網站報錯",
        situation: "部分瀏覽器進站就出現錯誤。",
        cause: "封鎖網站資料時，讀寫 localStorage 會直接丟出例外。",
        fix: "所有讀寫包上例外處理，讀不到就當作新訪客。",
        result: "任何瀏覽設定下都能正常瀏覽。",
        phase: "製作期",
      },
    ],
    next: ["訂閱名單改存到後端", "更多蒙特梭利教具", "文章加上搜尋與分類"],
  },
];

export const projects = [...allProjects].sort((a, b) => a.startedAt.localeCompare(b.startedAt));

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
