# Bob Yu 個人網站

臨床護理、實證研究、AI 工具與插畫：一個人，四種模式。以 [Astro](https://astro.build) 建置的單頁靜態網站，部署在 GitHub Pages。

## 更新內容

所有文字、清單、連結都集中在 **`src/data/profile.ts`**，改這個檔案就能更新網站，不需要動版面程式。

上線前必做：

1. **聯絡信箱**：`contact.email` 填入要公開的信箱（留空時按鈕會跳到聯絡區）。
2. **示意內容**：標記 `sample: true` 的項目是先寫的示意，請確認、改寫或刪除。`npm run build` 會列出還剩哪些。
3. **著作**：`research.publications` 依 APA 7 填入（`title`、`meta`、`href` 放 DOI）。
4. **其他連結**：ORCID、Google Scholar、LinkedIn，留空的不會顯示。

## 本機開發

需要 Node.js 22 以上。

```bash
npm install
```

```bash
npm run dev
```

開啟 http://localhost:4321 預覽；`npm run build` 輸出到 `dist/`。

## 部署（GitHub Pages）

1. 到 repo 的 **Settings → Pages**，Source 選 **GitHub Actions**。
2. 合併到 `main` 後，`.github/workflows/deploy.yml` 會自動建置並發佈到 `https://bobyu89.github.io/personal-website/`。

網址與子路徑由 workflow 自動帶入；之後改用自訂網域也不需要改程式。

## 設計

視覺規則記錄在 [`DESIGN.md`](DESIGN.md)。設計流程參考 [impeccable](https://github.com/pbakaus/impeccable) 與 [taste-skill](https://github.com/Leonxlnx/taste-skill)。

## 圖片

`src/assets/archive/` 裡的四張歷史圖像皆為公有領域（Wikimedia Commons），出處列在頁尾。
