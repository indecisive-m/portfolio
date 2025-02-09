// @ts-check
import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";

import sitemap from "@astrojs/sitemap";

import mdx from "@astrojs/mdx";

export default defineConfig({
  adapter: cloudflare(),
  vite: {
    define: {
      "process.env": process.env,
    },
  },
  site: "https://mikewatkins.dev",
  integrations: [sitemap(), mdx()],
  markdown: {
    shikiConfig: {
      theme: "one-dark-pro",
      wrap: false,
    },
  },
});
