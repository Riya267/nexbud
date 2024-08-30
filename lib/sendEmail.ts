import { EmailTemplate } from "@/components/emailTemplate";
import { EmailTemplateProps } from "@/types";
import { Resend } from "resend";

const sendEmail = async ({ message }: EmailTemplateProps): Promise<boolean> => {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ["delivered@resend.dev"],
      subject: "Hello world",
      react: EmailTemplate({ message }),
    });

  if (error) {
    return false;
  }

  return true;
};

export default sendEmail;
