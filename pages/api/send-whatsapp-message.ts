// pages/api/send-whatsapp-message.ts
import type { NextApiRequest, NextApiResponse } from "next";
import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

if (!accountSid || !authToken) {
  throw new Error("Twilio credentials are not set in environment variables.");
}

const client = twilio(accountSid, authToken);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    // Data yang dikirim dari frontend
    const { name, email, gameId, zoneId, productName } = req.body;

    const messageBody = `Pesanan baru:\nNama: ${name}\nEmail: ${email}\nGame ID: ${gameId}\nZone ID: ${zoneId || "-"}\nProduk: ${productName}`;

    // Kirim pesan WhatsApp menggunakan Twilio
    const message = await client.messages.create({
      from: "whatsapp:" + process.env.TWILIO_WHATSAPP_FROM, // misal: whatsapp:+14155238886
      to: "whatsapp:" + process.env.ADMIN_WHATSAPP,           // misal: whatsapp:+6281234567890
      body: messageBody,
    });

    res.status(200).json({ message: "WhatsApp message sent", sid: message.sid });
  } catch (error: any) {
    console.error("Error sending WhatsApp message", error);
    res.status(500).json({ message: "Error sending WhatsApp message", error: error.message });
  }
}
