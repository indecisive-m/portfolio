import { Resend } from "resend";
import { EMAIL_ADDRESS, RESEND_TOKEN } from "astro:env/server";

const resend = new Resend(RESEND_TOKEN);

const MY_EMAIL = EMAIL_ADDRESS;

export async function sendEmail(
  name: string,
  emailAddress: string,
  message: string,
) {
  await resend.emails.send({
    from: MY_EMAIL,
    to: MY_EMAIL,
    replyTo: emailAddress,
    subject: "Contact Form",
    text: message,
  });

  return { name, emailAddress, message };
}
