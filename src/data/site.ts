/**
 * 網站上的文字、連結都在這裡（新課程的內容在 courses.ts）。
 * 改這兩個檔案就能更新網站，不需要動版面程式。
 */

export const site = {
  name: "Bob 的學習森林",
  title: "Bob 的學習森林｜護理 × 研究 × AI",
  description:
    "Bob Yu 的學習網站：給護理人的 AI 課程、研究筆記課、文獻工具與 Claude Skills，全部放在同一片森林裡。",
  lang: "zh-Hant-TW",
  // 首頁插畫上方那一行弧形英文
  motto: "Slow paths, small lights, one leaf at a time.",
};

export const contact = {
  email: "bobyu89@gmail.com",
  subject: "從學習森林來的信：",
  links: [
    { label: "GitHub", href: "https://github.com/bobyu89" },
    // 有的話填入網址，留空的不會顯示
    { label: "ORCID", href: "" },
    { label: "Google Scholar", href: "" },
  ],
};

/** 森林住民 */
export const cast = [
  { kind: "bear", prop: "book", name: "熊", role: "森林的主人", text: "最愛在銀杏樹下讀書。研究、文獻、寫作的事，問牠就對了。" },
  { kind: "rabbit", prop: "leaf", name: "兔子", role: "引路員", text: "撐著一片銀杏葉站在路標旁，替第一次來的人指路。" },
  { kind: "dog", prop: "letter", name: "狗", role: "送信員", text: "叼著信跑來跑去。想合作、想問問題，就交給牠送。" },
] as const;

export const about = {
  heading: "森林的主人",
  body: [
    "我是 Bob，做臨床護理、實證研究、AI 工具，也畫畫。",
    "這裡放的，是我教過的課、為自己和同學寫的工具，還有正在準備的新課。每一樣都從同一個問題出發：臨床上反覆出現、卻沒有標準答案的那些時刻，能不能有更好的做法。",
  ],
};

export interface Link {
  title: string;
  sub: string;
  text: string;
  href: string;
  tag: string;
  /** 葉子顏色：ginkgo 金黃、rust 鏽紅、moss 苔綠、amber 琥珀 */
  tone: "ginkgo" | "rust" | "moss" | "amber";
}

/** 已經開過、上線中的課程網站 */
export const openCourses: Link[] = [
  {
    title: "AI 不只是聊天",
    sub: "一小時實作課",
    text: "五個護理題目挑一個，讓 AI 做三輪：先把內容做對，再做成一份 HTML 簡報帶走。附網頁版學習單。",
    href: "https://bobyu89.github.io/AI-hepatbase-learning-system/",
    tag: "AI 入門",
    tone: "ginkgo",
  },
  {
    title: "Obsidian 研究筆記課",
    sub: "線上課＋實體課",
    text: "給護理研究生與老師：一堂線上課、一堂實體課，17 堂簡報當課後參考，整門課攤開成一張學習白板。",
    href: "https://bobyu89.github.io/obsidian-research-notes/",
    tag: "研究筆記",
    tone: "moss",
  },
  {
    title: "cdss-training",
    sub: "可追溯的 AI 臨床推理訓練",
    text: "專科護理師臨床決策學習系統：每一句 AI 回饋都附實證來源，證據不足時拒答；有練習模式與 OSCE 模式。",
    href: "https://bobyu89.github.io/cdss-training-site/",
    tag: "臨床推理",
    tone: "rust",
  },
  {
    title: "白話統計學",
    sub: "讀書筆記學習站",
    text: "《Statistics in Plain English》逐章改寫的講義：圖、比喻、對照表、學習白板與每章簡報。",
    href: "https://bobyu89.github.io/Statistics-in-Plain-English/",
    tag: "統計",
    tone: "amber",
  },
];

/** 工具與 Skill */
export const tools: Link[] = [
  {
    title: "ZotMax",
    sub: "Zotero 10 文獻外掛",
    text: "把 Zotero 裡的文獻、PDF 劃線、筆記與評讀，整理成 Obsidian 筆記或 Notion 資料庫。附安裝精靈、文獻快速搜尋、評讀表。",
    href: "https://bobyu89.github.io/ZotMax/",
    tag: "文獻",
    tone: "ginkgo",
  },
  {
    title: "nursing-claude-skills",
    sub: "護理與生醫研究 Skills",
    text: "APA 7 引用檢查、PRISMA 2020 系統性回顧、混合方法、稿件審查、國考推理等可重複使用的 Claude Skills。",
    href: "https://github.com/bobyu89/nursing-claude-skills",
    tag: "Skill",
    tone: "moss",
  },
  {
    title: "bob-research-skills",
    sub: "個人科研 Skill 集",
    text: "台灣繁中、護理健康科學、APA 7 語境：寫作、潤飾、三位審稿人模擬、回覆審稿意見。",
    href: "https://github.com/bobyu89/bob-research-skills",
    tag: "Skill",
    tone: "amber",
  },
  {
    title: "Skill Bank",
    sub: "1,380 個 Skill 的收藏庫",
    text: "依用途分類：研究學術、臨床護理、技術開發、創意設計、影片動畫……找現成的做法，不用從零開始。",
    href: "https://github.com/bobyu89/skill-bank",
    tag: "收藏",
    tone: "rust",
  },
  {
    title: "班守 ShiftGuard",
    sub: "排班與人力缺口決策支援",
    text: "把缺工從模糊感受變成可量化的資訊；有人臨時請假時，給出合格替補、排序理由與風險提示。免安裝線上版。",
    href: "https://bobyu89.github.io/nursing-agent/",
    tag: "臨床管理",
    tone: "moss",
  },
];

/** 首頁「從哪裡開始」：三條路線，每條都是站內或站外的連結 */
export const paths = [
  {
    who: "我才剛開始用 AI",
    steps: [
      { label: "AI 不只是聊天", href: "https://bobyu89.github.io/AI-hepatbase-learning-system/" },
      { label: "01 AI 陪你做研究", href: "courses/ai-research-writing/" },
      { label: "04 打造你的 AI 研究團隊", href: "courses/ai-research-team/" },
    ],
  },
  {
    who: "我在寫論文、讀很多文獻",
    steps: [
      { label: "ZotMax", href: "https://bobyu89.github.io/ZotMax/" },
      { label: "Obsidian 研究筆記課", href: "https://bobyu89.github.io/obsidian-research-notes/" },
      { label: "白話統計學", href: "https://bobyu89.github.io/Statistics-in-Plain-English/" },
      { label: "01 AI 陪你做研究", href: "courses/ai-research-writing/" },
    ],
  },
  {
    who: "我想自己做出一個東西",
    steps: [
      { label: "02 七天做出你的第一個護理小工具", href: "courses/first-ai-tool/" },
      { label: "03 讓好內容被看見", href: "courses/be-seen/" },
      { label: "nursing-claude-skills", href: "https://github.com/bobyu89/nursing-claude-skills" },
    ],
  },
];
