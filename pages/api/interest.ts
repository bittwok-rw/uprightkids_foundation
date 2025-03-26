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
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email to the Organization (Upright Kids Foundation)
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "info@uprightkidsfoundation.org", 
      subject: `New Contact Form Submission from ${names}`,
      text: `Name: ${names}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    // Automatic Reply to the Sender
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email, 
      subject: "Thank You for Contacting Us!",
      text: `Dear ${names},\n\nThank you for reaching out to Upright Kids Foundation. We have received your message and will get back to you as soon as possible.\n\nBest regards,\nUpright Kids Foundation`,
    });

    return res.status(200).json({ message: "Emails sent successfully" });
  } catch (error) {
    console.error("Email sending error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
