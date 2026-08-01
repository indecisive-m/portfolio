// @ts-check
import { defineConfig, envField } from "astro/config";
import cloudflare from "@astrojs/cloudflare";

import sitemap from "@astrojs/sitemap";

import mdx from "@astrojs/mdx";

export default defineConfig({
  adapter: cloudflare(),
  env: {
    schema: {
      PUBLIC_TURNSTILE_SITE_KEY: envField.string({
        context: "client",
        access: "public",
      }),
      TURNSTILE_SECRET_KEY: envField.string({
        context: "server",
        access: "secret",
      }),
      RESEND_TOKEN: envField.string({ context: "server", access: "secret" }),
      EMAIL_ADDRESS: envField.string({ context: "server", access: "public" }),
    },
    validateSecrets: true,
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
