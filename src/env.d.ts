/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  readonly TURNSTILE_SECRET_KEY: string;
  readonly PUBLIC_TURNSTILE_SITE_KEY: string;
  readonly MAILTRAP_TOKEN: string;
  readonly EMAIL_ADDRESS: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
