/**
 * 森林裡的四門新課。主題參考自外部課程選輯的 01–04，內容全部依 Bob 自己的護理、研究、工具重寫。
 * 每門課目前是「大綱版」：status 寫清楚進度，內容補好之後改 status 即可。
 */

export interface Module {
  title: string;
  goal: string;
  steps: string[];
  /** 這一站結束時，手上會多出來的東西 */
  output: string;
}

export interface Ref {
  text: string;
  href?: string;
}

export interface Course {
  slug: string;
  no: string;
  title: string;
  sub: string;
  tone: "ginkgo" | "rust" | "moss" | "amber";
  /** 卡片上的小圖示 */
  icon: "book" | "tool" | "bird" | "team";
  status: string;
  lede: string;
  forWho: string[];
  takeaway: string[];
  format: string;
  modules: Module[];
  /** 這門課會用到的、森林裡已經有的東西 */
  uses: { label: string; href: string }[];
  caution: string;
  refs: Ref[];
}

export const courses: Course[] = [
  {
    slug: "ai-research-writing",
    no: "01",
    title: "AI 陪你做研究",
    sub: "從找文獻、讀文獻、寫論文到研究計畫書",
    tone: "ginkgo",
    icon: "book",
    status: "籌備中・大綱已公開",
    lede: "把 AI 放在研究流程裡對的位置：它幫你縮小問題、擴充檢索詞、整理筆記、檢查格式；判斷證據、下結論、負責任，還是你。",
    forWho: ["正在寫碩士論文或研究計畫的護理研究生", "要帶學生做實證報告的臨床教師", "想把讀文獻這件事變輕鬆的人"],
    takeaway: ["一題寫成 PICO 的研究問題", "一份可以重跑的檢索紀錄", "一個連著 Zotero 的 Obsidian 文獻庫", "一段用 APA 7 檢查過的文獻探討草稿"],
    format: "六站，每站 90 分鐘；可以拆成六週的讀書會",
    modules: [
      {
        title: "把臨床疑問寫成 PICO",
        goal: "讓 AI 當對話夥伴，把「我想研究跌倒」縮成一個回答得了的問題。",
        steps: [
          "先用自己的話寫下病房裡讓你卡住的那一刻",
          "請 AI 追問你：對象是誰、比較什麼、在意哪個結果",
          "自己決定最後的 P、I、C、O，不讓 AI 替你選",
        ],
        output: "一句 PICO 問題，加上你刪掉的三個版本",
      },
      {
        title: "找文獻：檢索式自己跑",
        goal: "AI 擅長列同義詞和 MeSH 候選，但檢索一定要在資料庫裡實際執行。",
        steps: [
          "請 AI 為每個 PICO 元素列同義詞，再到 MeSH Browser 逐一確認",
          "在 PubMed、CINAHL 組檢索式，記下日期與篇數",
          "用 ZotMax 的醫學文獻快速搜尋補漏",
        ],
        output: "一張檢索紀錄表（資料庫、檢索式、日期、篇數）",
      },
      {
        title: "讀文獻：筆記長在 Obsidian",
        goal: "Zotero 收文獻，ZotMax 把劃線與評讀整理成一頁重點，AI 研讀筆記一定回原文核對。",
        steps: [
          "安裝 ZotMax，把三篇文獻同步到 Obsidian",
          "用 CASP 或 JBI 評讀工具，自己填評讀燈號",
          "AI 寫的摘要，逐句對回 PDF 的頁碼",
        ],
        output: "三篇有評讀、有劃線、能回到原文的文獻筆記",
      },
      {
        title: "整理證據",
        goal: "把十幾篇文獻變成一張看得出異同的表，再決定寫作的骨架。",
        steps: [
          "在 Obsidian Bases 做文獻矩陣：設計、樣本、介入、結果",
          "系統性回顧照 PRISMA 2020 畫篩選流程圖",
          "請 AI 找「哪些研究結果互相矛盾」，自己判斷原因",
        ],
        output: "一張文獻矩陣，加上一張 PRISMA 流程圖",
      },
      {
        title: "寫作：AI 改語氣，不改主張",
        goal: "段落先自己寫，AI 只負責讓它更清楚；每個引用都要對得上。",
        steps: [
          "每段先寫一句「這段要讓讀者相信什麼」",
          "請 AI 潤飾，再逐句檢查有沒有偷偷加了你沒說的話",
          "用 apa7-master Skill 檢查引用與參考文獻",
        ],
        output: "一段 APA 7 檢查過的文獻探討草稿",
      },
      {
        title: "研究計畫書與補助提案",
        goal: "用審稿人的眼睛先審自己一次，並照期刊與學校的規定揭露 AI 的使用。",
        steps: [
          "請 AI 扮三位互不知情的審稿人，各自寫意見",
          "挑出你同意的意見修改，不同意的寫下理由",
          "查投稿期刊與 ICMJE 對 AI 使用的規定，寫好揭露段落",
        ],
        output: "一份自審過的計畫書，加一段 AI 使用聲明",
      },
    ],
    uses: [
      { label: "ZotMax", href: "https://bobyu89.github.io/ZotMax/" },
      { label: "Obsidian 研究筆記課", href: "https://bobyu89.github.io/obsidian-research-notes/" },
      { label: "nursing-claude-skills", href: "https://github.com/bobyu89/nursing-claude-skills" },
      { label: "bob-research-skills", href: "https://github.com/bobyu89/bob-research-skills" },
    ],
    caution: "不要把病人資料、未去識別化的研究資料，或尚未通過 IRB 的研究內容貼進任何 AI 工具。AI 不能列為作者。",
    refs: [
      {
        text: "Richardson, W. S., Wilson, M. C., Nishikawa, J., & Hayward, R. S. (1995). The well-built clinical question: A key to evidence-based decisions. ACP Journal Club, 123(3), A12–A13.",
      },
      {
        text: "Page, M. J., McKenzie, J. E., Bossuyt, P. M., et al. (2021). The PRISMA 2020 statement: An updated guideline for reporting systematic reviews. BMJ, 372, n71.",
        href: "https://doi.org/10.1136/bmj.n71",
      },
      {
        text: "International Committee of Medical Journal Editors. (n.d.). Recommendations for the conduct, reporting, editing, and publication of scholarly work in medical journals（含 AI 使用與作者資格）.",
        href: "https://www.icmje.org/recommendations/",
      },
      { text: "American Psychological Association. (2020). Publication manual of the American Psychological Association (7th ed.)." },
      { text: "JBI. (n.d.). Critical appraisal tools.", href: "https://jbi.global/critical-appraisal-tools" },
    ],
  },
  {
    slug: "first-ai-tool",
    no: "02",
    title: "七天做出你的第一個護理小工具",
    sub: "Vibe Coding 實作：不會寫程式也能開始",
    tone: "rust",
    icon: "tool",
    status: "籌備中・大綱已公開",
    lede: "每天一小步：找一個病房裡重複的小麻煩，用對話讓 AI 寫出一個網頁小工具，第七天放上網路，讓同事真的用得到。",
    forWho: ["沒寫過程式、但常想「要是有個小工具就好了」的護理人", "想做衛教或教學小工具的老師", "想試試 Claude Code 的人"],
    takeaway: ["一個雙擊就能打開的單一 HTML 小工具", "一個 GitHub Pages 網址", "一份同事試用後的修改清單"],
    format: "七天，每天 30–60 分鐘；第 1、4、7 天有線上集合",
    modules: [
      {
        title: "第 1 天：找一個小麻煩",
        goal: "工具從需求開始，不是從技術開始。",
        steps: [
          "列出這週重複做了三次以上的事",
          "挑一件：例如衛教單常見問答、交班前檢查清單、單位換算",
          "寫成一句話：「誰，在什麼時候，需要什麼」",
        ],
        output: "一句需求",
      },
      {
        title: "第 2 天：做出第一版",
        goal: "請 AI 寫成只有一個 HTML 檔的網頁，雙擊就能打開。",
        steps: ["把需求、使用的人、要長什麼樣子講清楚", "存成 .html，用瀏覽器打開", "先能動就好，不求漂亮"],
        output: "第一版小工具",
      },
      {
        title: "第 3 天：學會描述修改",
        goal: "一次只改一件事；看不懂的地方，請它解釋給你聽。",
        steps: ["寫下三個想改的地方，一次給一個", "每改一次就打開來試", "壞掉了就請它回到上一版"],
        output: "第二版，加一份修改紀錄",
      },
      {
        title: "第 4 天：放上網路",
        goal: "把檔案放上 GitHub Pages，拿到一個可以分享的網址。",
        steps: ["申請 GitHub 帳號、建一個 repo", "上傳 HTML 檔並開啟 Pages", "用手機打開確認"],
        output: "一個網址",
      },
      {
        title: "第 5 天：讓同事試用",
        goal: "看別人用，比自己想像更準。",
        steps: ["請兩位同事在你旁邊用，你不說話", "記下他們卡住、看錯、問你的地方", "挑最重要的兩個修改"],
        output: "一份試用紀錄",
      },
      {
        title: "第 6 天：安全檢查",
        goal: "護理工具的底線：不收病人資料、計算結果要人工驗算、標示「不能取代臨床判斷」。",
        steps: [
          "確認工具不會儲存或傳送任何可辨識個人的資料",
          "有計算的，用三組已知答案人工驗算",
          "畫面上寫清楚資料來源與使用限制",
        ],
        output: "一份安全檢查表",
      },
      {
        title: "第 7 天：寫說明、決定下一步",
        goal: "寫一頁說明給第一次用的人，再決定要不要交給 Claude Code 長期維護。",
        steps: ["寫：這是什麼、給誰用、怎麼用、不能做什麼", "在集合時三分鐘展示", "列出下一版想做的事"],
        output: "一個有說明頁、可以分享的小工具",
      },
    ],
    uses: [
      { label: "班守 ShiftGuard（從需求長成平台的例子）", href: "https://bobyu89.github.io/nursing-agent/" },
      { label: "AI 不只是聊天（先學會描述需求）", href: "https://bobyu89.github.io/AI-hepatbase-learning-system/" },
    ],
    caution: "這門課做的是教學與工作流程的小工具，不是醫療器材。劑量、輸液這類計算工具，上線前一定要經過單位的審核流程。",
    refs: [
      { text: "GitHub. (n.d.). GitHub Pages documentation.", href: "https://docs.github.com/pages" },
      { text: "Anthropic. (n.d.). Claude Code overview.", href: "https://docs.claude.com/en/docs/claude-code/overview" },
    ],
  },
  {
    slug: "be-seen",
    no: "03",
    title: "讓好內容被看見",
    sub: "AI 時代的衛教與研究傳播：一份研究，做成五種形式",
    tone: "moss",
    icon: "bird",
    status: "籌備中・大綱已公開",
    lede: "研究做完、衛教寫好，卻沒有人看懂，等於沒有發生。這門課教你先想清楚給誰看、要他記住哪一句，再用 AI 把同一份內容做成適合不同人的樣子。",
    forWho: ["要做衛教單張、衛教影片的臨床護理師", "想讓研究成果被病人、同事看見的研究生", "經營單位或學會社群的人"],
    takeaway: ["一張受眾地圖", "同一份內容的五種形式：摘要卡、衛教圖卡、HTML 簡報、短影片腳本、貼文", "一份用 PEMAT 自評過的衛教材料"],
    format: "六站，每站 60–90 分鐘",
    modules: [
      {
        title: "誰需要知道？",
        goal: "病人、家屬、同事、學界、大眾，需要的東西都不一樣。",
        steps: ["列出這份內容可能的讀者", "每一種讀者寫一句「他看完要能做什麼」", "挑一個最重要的讀者先做"],
        output: "一張受眾地圖",
      },
      {
        title: "一句核心訊息",
        goal: "看的人三秒之後，懂了什麼？",
        steps: ["把整份內容濃縮成一句話", "請 AI 給你十個版本，你挑一個再自己改", "念給一個不是護理背景的人聽"],
        output: "一句核心訊息",
      },
      {
        title: "一份內容，五種形式",
        goal: "摘要卡、衛教圖卡、HTML 簡報、短影片腳本、社群貼文，各有各的長度與節奏。",
        steps: ["用同一句核心訊息，請 AI 各寫一版", "逐版檢查：有沒有多加你沒說的醫療資訊", "HTML 簡報可以再用 HyperFrames 做成影片"],
        output: "五種形式的初稿",
      },
      {
        title: "圖像：準確先於好看",
        goal: "插畫與 AI 影像可以幫忙理解，也可能畫錯解剖位置、畫出錯誤的操作。",
        steps: ["寫影像 prompt：主體、動作、構圖、風格", "請臨床同事檢查圖裡的每個細節", "標示哪些圖是 AI 生成的"],
        output: "一張檢查過的衛教圖卡",
      },
      {
        title: "讀得懂嗎？",
        goal: "用 PEMAT 或 CDC Clear Communication Index 自評，再用 teach-back 確認病人真的懂。",
        steps: ["用 PEMAT 評「可理解性」與「可行動性」", "改掉分數低的地方", "請一位家屬用自己的話說一次"],
        output: "一份自評表與修改紀錄",
      },
      {
        title: "發佈與倫理",
        goal: "哪裡發、怎麼收回饋；病人隱私、著作權與 AI 標示。",
        steps: ["決定發佈管道與頻率", "確認沒有可辨識的病人資訊與未授權素材", "寫好 AI 使用與資料來源的說明"],
        output: "一份發佈計畫",
      },
    ],
    uses: [
      { label: "AI 不只是聊天（HTML 簡報與風格）", href: "https://bobyu89.github.io/AI-hepatbase-learning-system/" },
      { label: "Skill Bank 的創意／設計分類", href: "https://github.com/bobyu89/skill-bank" },
    ],
    caution: "衛教內容需要經過單位的審核流程才能發給病人。AI 生成的圖像與文字都要標示，並由臨床人員確認正確性。",
    refs: [
      {
        text: "Shoemaker, S. J., Wolf, M. S., & Brach, C. (2014). Development of the Patient Education Materials Assessment Tool (PEMAT). Patient Education and Counseling, 96(3), 395–403.",
        href: "https://doi.org/10.1016/j.pec.2014.05.027",
      },
      { text: "Centers for Disease Control and Prevention. (n.d.). CDC Clear Communication Index.", href: "https://www.cdc.gov/ccindex/" },
      {
        text: "Agency for Healthcare Research and Quality. (n.d.). Health literacy universal precautions toolkit: Use the teach-back method.",
        href: "https://www.ahrq.gov/health-literacy/improve/precautions/tool5.html",
      },
    ],
  },
  {
    slug: "ai-research-team",
    no: "04",
    title: "打造你的 AI 研究團隊",
    sub: "用 Claude 搭出研究秘書、知識庫與內容產線",
    tone: "amber",
    icon: "team",
    status: "籌備中・大綱已公開",
    lede: "不是多開幾個聊天視窗，而是把你反覆在做的事，交給有固定資料、固定做法、接得上你的筆記的 AI 夥伴；你留在需要判斷的位置。",
    forWho: ["已經每天用 AI，但每次都要重新解釋一遍的人", "同時在帶課、做研究、寫東西的老師與研究生", "想把自己的做法留下來給學弟妹的人"],
    takeaway: ["一張「哪些事交給 AI」的工作盤點", "一個放好固定資料的 Claude Project", "一個自己寫的 Skill", "一條從筆記到簡報的內容產線"],
    format: "七站，每站 90 分鐘",
    modules: [
      {
        title: "先畫你的一週",
        goal: "用 4D 框架決定哪些事可以交出去、哪些一定留在自己手上。",
        steps: ["列出一週做的事，標出重複的", "每件事問：交給 AI 之後，誰負責檢查？", "挑三件開始"],
        output: "一張工作盤點表",
      },
      {
        title: "研究秘書：Claude Projects",
        goal: "把格式規範、課程大綱、論文骨架放進 Project，不用每次重講。",
        steps: ["整理要給它的固定資料", "寫一段 Project 指示：角色、語氣、規則", "用三個真實任務測試"],
        output: "一個研究秘書 Project",
      },
      {
        title: "把做法寫成 Skill",
        goal: "一個 SKILL.md 就是一份可重複的工作說明書，換一個對話也照做。",
        steps: ["從 Skill Bank 找一個相近的 Skill 來讀", "把你最常做的一件事寫成步驟", "實際用三次，修三次"],
        output: "一個你自己的 Skill",
      },
      {
        title: "知識庫：讓 AI 讀你的筆記",
        goal: "Zotero → ZotMax → Obsidian，AI 引用的是你讀過、評過的東西。",
        steps: ["建立 vault 的資料夾與筆記格式", "把文獻同步進來", "請 AI 只根據 vault 回答，並標出處"],
        output: "一個 AI 讀得懂的研究 vault",
      },
      {
        title: "接上外面的工具",
        goal: "連接器與 MCP：讓 AI 直接查 PubMed、讀雲端硬碟、看行事曆。",
        steps: ["開啟需要的連接器，只給必要的權限", "試一次「查文獻 → 整理成表」", "記下哪些步驟仍要人看過"],
        output: "一條接上外部工具的流程",
      },
      {
        title: "內容產線：Claude Code",
        goal: "從筆記到 HTML 簡報到課程網站，這片森林就是這樣做出來的。",
        steps: ["把一篇筆記交給 Claude Code 做成 HTML 簡報", "放上 GitHub Pages", "下一次只要更新筆記"],
        output: "一條從筆記到網頁的產線",
      },
      {
        title: "守門：人負責判斷",
        goal: "團隊越大，越需要清楚的檢查點。",
        steps: ["每條流程標出「人一定要看」的那一步", "定期抽查 AI 的輸出", "寫下不交給 AI 的事"],
        output: "一份團隊守則",
      },
    ],
    uses: [
      { label: "Skill Bank", href: "https://github.com/bobyu89/skill-bank" },
      { label: "nursing-claude-skills", href: "https://github.com/bobyu89/nursing-claude-skills" },
      { label: "ZotMax", href: "https://bobyu89.github.io/ZotMax/" },
      { label: "Obsidian 研究筆記課", href: "https://bobyu89.github.io/obsidian-research-notes/" },
    ],
    caution: "連接器與 MCP 會讓 AI 讀到你的信件、檔案與行事曆。只開必要的權限，不要連到含病人資料的系統。",
    refs: [
      { text: "Dakan, R., & Feller, J. (2025). AI fluency: Framework & foundations. Anthropic.", href: "https://www.anthropic.com/ai-fluency" },
      {
        text: "Anthropic. (n.d.). Agent Skills overview.",
        href: "https://docs.claude.com/en/docs/agents-and-tools/agent-skills/overview",
      },
      { text: "Model Context Protocol. (n.d.). Introduction.", href: "https://modelcontextprotocol.io" },
    ],
  },
];
