// @ts-check
import { defineConfig } from "astro/config";

// GitHub Pages 部署時由 workflow 帶入 SITE_URL 與 BASE_PATH；本機開發用預設值。
export default defineConfig({
  site: process.env.SITE_URL || "https://bobyu89.github.io",
  base: process.env.BASE_PATH || "/",
  trailingSlash: "ignore",
});
