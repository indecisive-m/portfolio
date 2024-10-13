// @ts-check
import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";

import sitemap from "@astrojs/sitemap";

export default defineConfig({
  output: "hybrid",
  adapter: cloudflare(),
  vite: {
    define: {
      "process.env": process.env,
    },
  },
  site: "https://mikewatkins.dev",
  integrations: [sitemap()],
  markdown: {
    shikiConfig: {
      theme: "one-dark-pro",
      wrap: false,
    },
  },
});
