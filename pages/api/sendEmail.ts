import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { names, email, message } = req.body;

  if (!names || !email || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.privateemail.com",
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER || "info@uprightkidsfoundation.org",
        pass: process.env.SMTP_PASS || "Up@right.25",
      },
    });

    await transporter.sendMail({
      from: `"${names}" <${process.env.SMTP_USER || "info@uprightkidsfoundation.org"}>`,
      replyTo: email,
      to: "info@uprightkidsfoundation.org",
      subject: `New Contact Form Submission from ${names}`,
      text: `Name: ${names}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    return res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Email sending error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}