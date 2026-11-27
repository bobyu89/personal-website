/**
 * 01 AI 陪你做研究：兩天工作坊的資料。
 * 議程、課前清單、每一站的提示詞都在這裡；講稿在 s1-script.md（之後 s2…s6）。
 */

export const workshop = {
  slug: "ai-research",
  title: "AI 陪你做研究",
  sub: "兩天工作坊：從一個臨床疑問，走到一份自審過的研究計畫",
  tools: "Claude 或 ChatGPT（免費版也可以）",
  topicRule: "題目自己找：從你在臨床上卡住的那一刻開始。",
};

export const agenda = [
  {
    day: "第一天",
    theme: "從問題到讀懂文獻",
    rows: [
      { time: "09:00–09:20", what: "報到、環境檢查", station: 0 },
      { time: "09:20–10:50", what: "第 1 站　把臨床疑問寫成 PICO", station: 1 },
      { time: "10:50–11:10", what: "休息", station: 0 },
      { time: "11:10–12:40", what: "第 2 站　找文獻：檢索式自己跑", station: 2 },
      { time: "12:40–13:40", what: "午餐", station: 0 },
      { time: "13:40–15:10", what: "第 3 站　讀文獻：筆記長在 Obsidian", station: 3 },
      { time: "15:10–15:30", what: "第一天收尾、今晚的小作業", station: 0 },
    ],
    homework: "從第 2 站的檢索結果挑 6 篇摘要，加進 Zotero（20 分鐘內做得完）。",
  },
  {
    day: "第二天",
    theme: "從證據到寫成計畫",
    rows: [
      { time: "09:00–09:15", what: "回顧第一天", station: 0 },
      { time: "09:15–10:45", what: "第 4 站　整理證據", station: 4 },
      { time: "10:45–11:05", what: "休息", station: 0 },
      { time: "11:05–12:35", what: "第 5 站　寫作：AI 改語氣，不改主張", station: 5 },
      { time: "12:35–13:35", what: "午餐", station: 0 },
      { time: "13:35–15:05", what: "第 6 站　研究計畫書與補助提案", station: 6 },
      { time: "15:05–15:30", what: "成果分享、收尾", station: 0 },
    ],
  },
];

export const prep = [
  { what: "一台筆電", how: "兩天都要用。" },
  { what: "Claude 或 ChatGPT，已經登入", how: "免費版也可以。兩個都有更好，可以互相比較。" },
  {
    what: "Zotero 10＋ZotMax",
    how: "第 3 站要用。照安裝精靈一步一步裝。",
    href: "https://bobyu89.github.io/ZotMax/",
    label: "ZotMax 安裝精靈",
  },
  {
    what: "Obsidian",
    how: "第 3 站要用。可以直接用 Obsidian 研究筆記課的起點 vault。",
    href: "https://bobyu89.github.io/obsidian-research-notes/prep/",
    label: "Obsidian 課前準備",
  },
  { what: "想一想：最近在臨床上卡住的時刻", how: "不用寫成題目，第 1 站會一起找。不能有病人資料。" },
];

export const stations = [
  { no: 1, title: "把臨床疑問寫成 PICO", output: "一句 PICO 問題，加上刪掉的版本", ready: true },
  { no: 2, title: "找文獻：檢索式自己跑", output: "一張可以重跑的檢索紀錄表", ready: true },
  { no: 3, title: "讀文獻：筆記長在 Obsidian", output: "三篇有評讀、能回到原文的筆記", ready: false },
  { no: 4, title: "整理證據", output: "一張文獻矩陣", ready: false },
  { no: 5, title: "寫作：AI 改語氣，不改主張", output: "一段 APA 7 檢查過的文獻探討", ready: false },
  { no: 6, title: "研究計畫書與補助提案", output: "一份自審紀錄＋AI 使用聲明", ready: false },
];

/* ── 第 1 站 ─────────────────────────────────────────── */

export const s1 = {
  rules: [
    { t: "不打病人的資料", d: "名字、病歷號、床號、認得出是誰的細節，都不要。" },
    { t: "AI 說的都要查", d: "每一個事實、每一篇文獻，自己查過才算數。" },
    { t: "判斷是你的", d: "AI 寫得再好，簽名的是你。" },
  ],
  moments: [
    "上個月，有哪一件事你做了，但不太確定這樣做對不對？",
    "有哪一個衛教，你講了三次，病人或家屬還是做不對？",
    "有哪一個做法，兩位學姊、學長教你的不一樣？",
  ],
  // 寫不出來的人可以從這裡挑一個情境，改成自己單位的版本
  ideas: [
    "住院老人夜裡下床跌倒：離床警報器到底有沒有用？",
    "加護病房病人早一點下床活動，譫妄會不會比較少？",
    "化療時口含冰塊，口腔黏膜炎會不會比較輕？",
    "中心靜脈導管病人用氯己定擦澡，血流感染會不會比較少？",
    "失智症家屬在病人出院後第一個月，照顧起來是什麼感覺？",
    "新進護理師第一次獨立上夜班，最擔心的是什麼？",
  ],
  types: [
    { id: "pico", label: "介入、診斷、預後、病因", hint: "想比較做法、找原因、預測結果 → PICO" },
    { id: "pico-q", label: "經驗、感受、意義", hint: "想了解人怎麼經歷一件事 → PICo（質性）" },
  ],
  askPrompt: `你是一位護理研究的指導老師。我會告訴你一個我在臨床上卡住的時刻。
請遵守：
1. 不要給我答案，也不要替我寫研究問題或 PICO。
2. 一次只問我一個問題，等我回答再問下一個。
3. 幫我想清楚：對象是誰、在什麼情境、我想比較什麼、我在意的結果是什麼、要怎麼知道結果有沒有變。
4. 問完四到六個問題就停下來，說「可以自己寫了」。

我卡住的時刻是：{moment}`,
  checkPrompt: `這是我寫的研究問題：{question}

請用 FINER 原則（可行、有趣、新穎、合乎倫理、相關），每一項說一個你會擔心的地方。
請不要改寫我的問題，也不要給我新的版本。`,
  finer: [
    { k: "F", name: "可行", ask: "畢業前，找得到這群人、量得到這個結果嗎？" },
    { k: "I", name: "有趣", ask: "你自己想知道答案嗎？" },
    { k: "N", name: "新穎", ask: "有沒有一點點是還沒被回答的？" },
    { k: "E", name: "合乎倫理", ask: "會不會讓病人多承受不必要的風險？" },
    { k: "R", name: "相關", ask: "答案出來，會改變臨床上的什麼？" },
  ],
};

/* ── 第 2 站（太空主題：在文獻宇宙裡找星星） ─────────────── */

export const s2 = {
  // 每個 PICO 概念變成一團「星系」：同一個星系裡的詞用 OR，星系之間用 AND
  concepts: [
    { k: "p", label: "P 對象", hint: "例如：older adults, inpatients, aged" },
    { k: "i", label: "I 介入／暴露", hint: "例如：bed alarm, exit alarm" },
    { k: "c", label: "C 比較", hint: "通常不放進檢索式，先寫下來就好" },
    { k: "o", label: "O 結果", hint: "例如：accidental falls, falls" },
  ],
  synonymPrompt: `我的研究問題是：{question}

請把它拆成 P、I、C、O 四個概念。每個概念列出：
1. 常見的英文同義詞、不同拼法、縮寫
2. 可能對應的 MeSH 詞，每一個都標註「需要到 MeSH Browser 確認」

不要幫我寫檢索式，也不要推薦任何文獻。`,
  // 示範用：故意請 AI 直接給文獻，再一篇一篇查
  fakePrompt: `請給我五篇關於「{topic}」的研究文獻，附上作者、年份、期刊、DOI。`,
  fakeChecks: ["PubMed 查得到標題", "作者對", "期刊、年份對", "DOI 打得開", "內容真的在講這件事"],
  tunePrompt: `我在 PubMed 用這個檢索式：
{query}

找到 {n} 篇，我覺得{feel}。
請建議我可以怎麼調整（加或拿掉哪些詞、要不要用欄位標籤），每一個調整都說明理由。
不要推薦任何文獻。`,
  fakeStudy: {
    text: "2023 年一項研究請 ChatGPT 寫 84 篇短文獻回顧，逐一查證 636 筆引用：GPT-3.5 有 55% 是編造的，GPT-4 有 18%。就算是真的文獻，也分別有 43% 和 24% 的作者、年份、期刊等資料有錯。",
    cite: "Walters & Wilder（2023），Scientific Reports, 13, 14045",
    href: "https://doi.org/10.1038/s41598-023-41032-5",
  },
  links: [
    { label: "MeSH Browser", href: "https://meshb.nlm.nih.gov/" },
    { label: "PubMed", href: "https://pubmed.ncbi.nlm.nih.gov/" },
    { label: "ZotMax 醫學文獻快速搜尋", href: "https://bobyu89.github.io/ZotMax/search.html" },
  ],
};
