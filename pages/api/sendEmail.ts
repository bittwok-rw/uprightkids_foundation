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
      service: "Gmail", // Use your preferred email provider
      auth: {
        user: process.env.EMAIL_USER, // Add this to your .env file
        pass: process.env.EMAIL_PASS, // Add this to your .env file
      },
    });

    await transporter.sendMail({
      from: email,
      to: "info@uprightkidsfoundation.org", // Replace with your recipient email
      subject: `New Contact Form Submission from ${names}`,
      text: `Name: ${names}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    return res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Email sending error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
