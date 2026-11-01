/**
 * 網站所有內容都在這個檔案。改這裡就能更新整個網站，不需要動版面程式。
 *
 * ⚠️ 標記 `sample: true` 的項目是依你的研究／臨床／技術／創作四個面向先寫的「示意內容」，
 *    上線前請逐一確認、改寫或刪除。`npm run build` 時會列出還沒處理的示意項目。
 */
export type ModeId = "research" | "clinical" | "tech" | "creative";

export interface Item {
  title: string;
  text?: string;
  meta?: string;
  href?: string;
  sample?: boolean;
}

/* ── 基本資料 ─────────────────────────────────────────── */

export const site = {
  name: "Bob Yu",
  title: "Bob Yu｜臨床護理、實證研究、AI 工具與插畫",
  description:
    "Bob Yu 的個人網站：臨床護理、實證研究、AI 工具與插畫。歡迎研究合作、演講邀約、工具開發與插畫委託。",
  lang: "zh-Hant-TW",
};

export const contact = {
  email: "bobyu89@gmail.com",
  subject: "合作邀約：",
  links: [
    { label: "GitHub", href: "https://github.com/bobyu89" },
    // TODO(Bob)：有的話填入網址，留空的不會顯示。
    { label: "ORCID", href: "" },
    { label: "Google Scholar", href: "" },
    { label: "LinkedIn", href: "" },
  ],
};

/* ── 首屏 ─────────────────────────────────────────────── */

export const hero = {
  // 首屏不放名字：標題直接說你在做的四件事
  title: ["照護、證據、", "程式、畫筆。"],
  badge: "Clinical × Research × AI × Art",
};

/* ── 同一段自我介紹，四種模式 ─────────────────────────── */

export const intro = {
  all: "我做臨床護理、實證研究、AI 工具與插畫。同一個問題，我用四種方式回答。",
  research: [
    { label: "目的", text: "把臨床疑問寫成可以回答的研究問題。" },
    { label: "方法", text: "PICO、系統性檢索、嚴格評讀、統計分析。" },
    { label: "結論", text: "證據要能回到床邊使用，才算完成。" },
  ],
  clinical: {
    text: "實證照護像開車導航：研究證據是地圖，臨床經驗是方向盤，病人想去哪裡，才是目的地。",
    cite: "改寫自 Sackett 等人（1996）提出的實證醫學三要素",
    citeHref: "https://doi.org/10.1136/bmj.312.7023.71",
  },
  tech: `const bob = {
  modes: ["研究", "臨床", "技術", "創作"],
  rule: "結論先行",
};

// 重複的事交給程式，判斷留給人
bob.work = (question) =>
  findEvidence(question).then(buildTool);`,
  creative: "一張圖只需要回答一個問題：看的人三秒之後，懂了什麼？",
};

/* ── 四個章節 ─────────────────────────────────────────── */

export const research = {
  statement: "把臨床疑問，變成可以回答的研究問題。",
  body: "我的研究從實證健康照護（EBP）出發：先把問題寫成 PICO，再系統性地檢索與評讀文獻，依報告指引整理結果，最後回到照護現場，檢驗它是否真的有用。",
  listTitle: "常用的方法",
  items: [
    { title: "系統性文獻回顧與統合分析", meta: "Systematic review · Meta-analysis", sample: true },
    { title: "範域回顧", meta: "Scoping review", sample: true },
    { title: "實證健康照護報告", meta: "EBHC report", sample: true },
    { title: "研究報告指引", meta: "PRISMA 2020 · CONSORT · STROBE", sample: true },
    { title: "混合方法研究", meta: "Mixed methods", sample: true },
  ] satisfies Item[],
  // TODO(Bob)：依 APA 7 填入著作。title 放篇名，meta 放「作者（年份）．期刊，卷(期)」，href 放 DOI 連結。
  publications: [] as Item[],
};

export const clinical = {
  statement: "研究問題，從床邊開始。",
  body: "臨床上反覆出現、卻沒有標準答案的時刻，是我所有工作的起點：衛教講了三次還是沒被聽懂、照護資訊在交班時斷掉、指引寫的和病房裡發生的對不上。",
  listTitle: "我在意的事",
  items: [
    { title: "衛教是否真的被理解", text: "病人與家屬聽完說明，能不能自己做對。", sample: true },
    { title: "交班與照護連續性", text: "資訊在班與班、團隊與團隊之間不流失。", sample: true },
    { title: "症狀評估與早期辨識", text: "在惡化之前，看見那個變化。", sample: true },
    { title: "讓指引走進日常照護", text: "Guideline 不只寫在文件裡。", sample: true },
  ] satisfies Item[],
};

export const tech = {
  statement: "把重複的研究流程，寫成工具。",
  body: "文獻篩選、引用格式、報告指引對照，這些事重要，但重複。我用 AI 與 React 把它們寫成工具，把時間留給需要臨床判斷的部分。",
  listTitle: "正在做的工具",
  items: [
    {
      title: "APA 7 引用檢查",
      text: "貼上參考文獻，逐條對照 APA 第 7 版格式，標出需要修改的地方。",
      meta: "Claude API · React",
      sample: true,
    },
    {
      title: "PRISMA 2020 流程圖",
      text: "輸入每個篩選階段的篇數，產生可直接放進論文的文獻篩選流程圖。",
      meta: "React · SVG",
      sample: true,
    },
    {
      title: "個案報告助手",
      text: "依實證個案報告的結構，引導整理病史、評估、照護計畫與成效。",
      meta: "Claude API",
      sample: true,
    },
  ] satisfies Item[],
};

export const creative = {
  statement: "說三次聽不懂的事，畫一次就懂。",
  body: "插畫是我的第二種語言。我畫衛教圖卡、研究概念圖，也用 AI prompt 做影像實驗，在準確與好看之間找平衡。",
  listTitle: "作品",
  // TODO(Bob)：作品圖放進 src/assets/works/，之後可以在這裡加上 image 欄位。
  items: [
    { title: "衛教圖卡", text: "給病人與家屬的一頁式說明圖。", sample: true },
    { title: "研究概念圖", text: "把研究架構與流程畫成一張圖。", sample: true },
    { title: "AI 影像實驗", text: "prompt、構圖與敘事的實驗紀錄。", sample: true },
  ] satisfies Item[],
};

export const closing = {
  heading: "一起合作",
  statement: "研究合作、演講邀約、工具開發或插畫委託，都歡迎來信。",
};

/* ── 章節順序（依你自己定義的模式順序） ───────────────────── */

export const modes: { id: ModeId; zh: string; en: string }[] = [
  { id: "research", zh: "研究", en: "Research" },
  { id: "clinical", zh: "臨床", en: "Clinical" },
  { id: "tech", zh: "技術", en: "Tech" },
  { id: "creative", zh: "創作", en: "Creative" },
];

export const sampleItems = [research, clinical, tech, creative].flatMap((chapter) =>
  chapter.items.filter((item) => item.sample).map((item) => item.title),
);
