/**
 * 把 HTML 投影匯出成 PDF 與 PPTX，放到 public/files/，投影頁的「下載」按鈕會連到這裡。
 *
 * 用法：先 npm run build，再
 *   node scripts/export-deck.cjs
 * 會自己開 astro preview、逐頁截圖、輸出檔案、關掉 preview。
 * 需要 Playwright（含 Chromium）與 devDependency pptxgenjs。
 *
 * PDF 與 PPTX 都用同一套 1920×1080 截圖，跟網頁上看到的一模一樣（插畫的 multiply 疊色在瀏覽器列印時會失效，所以不用列印）。
 * PPTX 每一頁的文字放在備忘稿，方便講者看；要改字請改網頁再重新匯出。
 */
const { spawn, spawnSync } = require("node:child_process");
const path = require("node:path");
const fs = require("node:fs");
const { chromium } = require("playwright");
const PptxGenJS = require("pptxgenjs");

const PORT = 4399;
const DECKS = [
  {
    url: "/workshop/ai-research/1/slides/",
    out: "public/files/workshop-01/s1-slides",
    title: "第 1 站　把臨床疑問寫成 PICO",
  },
];

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  // Astro 7 的 preview 會自己轉到背景執行，所以結束時要用 `astro preview stop` 關掉
  const preview = spawn("npx", ["astro", "preview", "--port", String(PORT)], { stdio: "ignore", shell: true });
  try {
    const browser = await chromium.launch();
    let up = false;
    for (let t = 0; t < 120 && !up; t++) {
      try {
        const r = await fetch(`http://localhost:${PORT}/`);
        up = r.ok;
      } catch {
        await wait(500);
      }
    }
    if (!up) throw new Error("astro preview 沒有起來");

    for (const deck of DECKS) {
      const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, reducedMotion: "reduce" });
      await page.goto(`http://localhost:${PORT}${deck.url}`, { waitUntil: "networkidle" });
      await page.evaluate(() => document.fonts.ready);
      const n = await page.$$eval(".slide", (s) => s.length);

      const shots = [];
      const pptx = new PptxGenJS();
      pptx.layout = "LAYOUT_WIDE";
      pptx.title = deck.title;
      for (let i = 0; i < n; i++) {
        await page.evaluate((k) => {
          location.hash = `#${k + 1}`;
          document.querySelectorAll(".slide").forEach((s, j) => s.classList.toggle("on", j === k));
          document.querySelector(".hud").style.display = "none";
        }, i);
        await wait(300);
        const png = await page.screenshot({ type: "jpeg", quality: 88 });
        shots.push(png.toString("base64"));
        const notes = await page.$eval(".slide.on", (s) => s.innerText.replace(/\n{3,}/g, "\n\n").trim());
        const slide = pptx.addSlide();
        slide.addImage({ data: "image/jpeg;base64," + png.toString("base64"), x: 0, y: 0, w: 13.333, h: 7.5 });
        slide.addNotes(notes);
      }
      fs.mkdirSync(path.dirname(deck.out), { recursive: true });
      await pptx.writeFile({ fileName: deck.out + ".pptx" });

      const html =
        "<!doctype html><style>@page{size:1920px 1080px;margin:0}body{margin:0}img{display:block;width:1920px;height:1080px;break-after:page}</style>" +
        shots.map((b) => `<img src="data:image/jpeg;base64,${b}">`).join("");
      const pdfPage = await browser.newPage();
      await pdfPage.setContent(html, { waitUntil: "load" });
      await pdfPage.pdf({ path: deck.out + ".pdf", width: "1920px", height: "1080px", printBackground: true });
      await pdfPage.close();
      console.log(`${deck.title}：${n} 頁 → ${deck.out}.pdf / .pptx`);
      await page.close();
    }
    await browser.close();
  } finally {
    preview.kill();
    spawnSync("npx", ["astro", "preview", "stop"], { stdio: "ignore", shell: true });
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
