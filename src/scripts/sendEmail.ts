import { MailtrapTransport } from "mailtrap";
import Nodemailer from "nodemailer";

const TOKEN = import.meta.env.MAILTRAP_TOKEN;

const transport = Nodemailer.createTransport(
  MailtrapTransport({
    token: TOKEN,
  }),
);

const SENDER_EMAIL = import.meta.env.EMAIL_ADDRESS;
const RECIPIENT_EMAIL = import.meta.env.EMAIL_ADDRESS;

export async function sendEmail(name: string, email: string, message: string) {
  transport
    .sendMail({
      to: {
        address: RECIPIENT_EMAIL,
        name: "Mike Watkins",
      },
      from: {
        address: SENDER_EMAIL,
        name: name,
      },
      subject: "Contact Form",
      category: "Contact Form",
      text: message,
      html: `<p>${message}</p>
          <strong>${email}</strong>`,
    })
    .then(console.log)
    .catch(console.error);

  return { name, message, email };
}
