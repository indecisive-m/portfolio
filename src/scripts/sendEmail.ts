import { Resend } from "resend";

const resend = new Resend(import.meta.env.RESEND_TOKEN);

const MY_EMAIL = import.meta.env.EMAIL_ADDRESS;

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
