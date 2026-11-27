# Bob 的學習森林

Bob Yu 的學習網站：給護理人的 AI 課、研究筆記課、文獻工具與 Claude Skills，統合在同一個地方。秋天繪本風，插畫是 Bob 用 AI 繪圖生成的手繪風圖片（換圖方式見 DESIGN.md）。以 [Astro](https://astro.build) 建置，部署在 GitHub Pages。

網址：https://bobyu89.github.io/personal-website/

## 頁面

| 路徑 | 內容 |
|---|---|
| `/` | 首頁：森林地圖（四門新課）、從哪裡開始、開過的課、工具與 Skill、關於 |
| `/courses/ai-research-writing/` | 01 AI 陪你做研究 |
| `/courses/first-ai-tool/` | 02 七天做出你的第一個護理小工具 |
| `/courses/be-seen/` | 03 讓好內容被看見 |
| `/courses/ai-research-team/` | 04 打造你的 AI 研究團隊 |

## 更新內容

- **開過的課、工具、首頁文字、三條學習路線**：`src/data/site.ts`
- **四門新課的大綱**：`src/data/courses.ts`。課程內容補好之後，把 `status` 從「籌備中・大綱已公開」改掉即可。

新增一門開過的課或一個工具，只要在 `openCourses` 或 `tools` 陣列加一筆。

## 本機開發

需要 Node.js 22 以上。

```bash
npm install
```

```bash
npm run dev
```

開啟 http://localhost:4321 預覽；`npm run build` 輸出到 `dist/`。

## 投影下載檔（PDF／PPT）

投影頁右下角的「下載 PDF」「下載 PPT」連到 `public/files/` 裡預先匯出的檔案。改了投影內容或插圖後，要重新匯出一次：

```bash
npm run build
```

```bash
npm run export:decks
```

要匯出哪些投影，寫在 `scripts/export-deck.cjs` 的 `DECKS`。PPT 每一頁是一張圖，頁面上的文字放在備忘稿。

## 部署

合併到 `main` 後，`.github/workflows/deploy.yml` 會自動建置並發佈。

## 設計

視覺規則記錄在 [`DESIGN.md`](DESIGN.md)。
