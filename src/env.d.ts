/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  readonly TURNSTILE_SECRET_KEY: string;
  readonly VITE_TURNSTILE_SITE_KEY: string;
  readonly VITE_EMAIL_ADDRESS: string;
  readonly RESEND_TOKEN: string;
  readonly VITE_TEST_KEY: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
