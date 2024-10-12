import type { APIContext, APIRoute } from "astro";
import { ActionError, type ActionAPIContext } from "astro:actions";
import { sendEmail } from "src/scripts/sendEmail";

const url = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

const SECRET_KEY = import.meta.env.TURNSTILE_SECRET_KEY;

export async function turnstileVerify({ request }: ActionAPIContext) {
  const data = await request.formData();

  const token = data.get("cf-turnstile-response");

  if (!token || !import.meta.env.TURNSTILE_SECRET_KEY) {
    throw new ActionError({
      code: "UNAUTHORIZED",
      message: "Please include TURNSTILE_SECRET_TOKEN in your .env file.",
    });
  }

  const formData = new FormData();
  formData.append("secret", SECRET_KEY);
  formData.append("response", token);

  const result = await fetch(url, {
    body: formData,
    method: "POST",
  });

  const name = data.get("name")?.toString();
  const email = data.get("email")?.toString();
  const message = data.get("message")?.toString();

  if (!name || !email || !message) {
    throw new ActionError({
      code: "BAD_REQUEST",
      message: "Please fill out all fields",
    });
  }

  const outcome = await result.json();

  if (outcome.success) {
    return sendEmail(
      name ?? "default",
      email ?? "default",
      message ?? "default",
    );
  }
}
