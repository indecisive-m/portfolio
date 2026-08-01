import { Resend } from "resend";
import { EMAIL_ADDRESS, RESEND_TOKEN } from "astro:env/server";
import { email } from "astro/zod";

const resend = new Resend(RESEND_TOKEN);

const MY_EMAIL = EMAIL_ADDRESS;

console.log("runtime env", {
  resend: !!RESEND_TOKEN,
  email: MY_EMAIL,
});

export async function sendEmail(
  name: string,
  emailAddress: string,
  message: string,
) {
  const { data, error } = await resend.emails.send({
    from: MY_EMAIL,
    to: MY_EMAIL,
    replyTo: emailAddress,
    subject: "Contact Form",
    text: message,
  });

  console.log("resend:", { data, error });

  if (error) {
    throw new Error(error.message);
  }

  return { name, emailAddress, message };
}
