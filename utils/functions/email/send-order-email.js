import { EmailTemplate } from "@/components/custom ui/email-template";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const sendOrderEmail = async (orderDataWithAwb) => {
  return await resend.emails.send({
    from: "Semnalizari Dinamice <office@semnalizaridinamice.ro>",
    to: "mocanuandrei61@gmail.com",
    subject: "Comanda finalizata cu succes (testing2)",
    react: <EmailTemplate order={orderDataWithAwb} />,
  });
};

export default sendOrderEmail;
