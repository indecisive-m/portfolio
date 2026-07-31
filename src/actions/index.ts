import { defineAction } from "astro:actions";
import { z } from "astro/zod";
import { turnstileVerify } from "src/scripts/turnstileVerify";

export const server = {
  contactForm: defineAction({
    accept: "form",
    input: z.object({
      name: z.string(),
      email: z.email(),
      message: z.string(),
    }),
    handler: async (input, ctx) => {
      return turnstileVerify(ctx);
    },
  }),
};
