import { resend } from "./resend";

type ContactMailProps = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export async function sendContactMail(data: ContactMailProps) {
  try {

    const response = await resend.emails.send({
      from: "Prakash <contact@prakashjangid.in>",
      to: process.env.CONTACT_EMAIL!,
      subject: "hello",
      replyTo: data.email,
      html: `
        <h2>New Portfolio Contact</h2>

        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        
        <hr />

        <p>${data.message}</p>
      `,
    });

    return response;
  } catch (error) {
    console.error("Failed to send email:", error);
    throw new Error("Failed to send email");
  }
}
