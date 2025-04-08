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
    // Set up nodemailer with custom SMTP configuration
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.privateemail.com",
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER || "info@uprightkidsfoundation.org",
        pass: process.env.SMTP_PASS || "Up@right.25",
      },
    });

    // Email to the Organization (Upright Kids Foundation)
    await transporter.sendMail({
      from: `"Contact Form" <${process.env.SMTP_USER || "info@uprightkidsfoundation.org"}>`,
      to: "info@uprightkidsfoundation.org", 
      subject: `New Contact Form Submission from ${names}`,
      text: `Name: ${names}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <h2 style="color: #1a365d;">New Contact Form Submission</h2>
          
          <p><strong>Name:</strong> ${names}</p>
          <p><strong>Email:</strong> ${email}</p>
          
          <div style="margin-top: 20px;">
            <strong>Message:</strong>
            <p style="background-color: #f5f5f5; padding: 15px; border-radius: 5px;">${message.replace(/\n/g, '<br>')}</p>
          </div>
          
          <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666; text-align: center;">
            © ${new Date().getFullYear()} Upright Kids Foundation
          </div>
        </div>
      `,
    });

    // Automatic Reply to the Sender
    await transporter.sendMail({
      from: `"Upright Kids Foundation" <${process.env.SMTP_USER || "info@uprightkidsfoundation.org"}>`,
      to: email, 
      subject: "Thank You for Contacting Us!",
      text: `Dear ${names},\n\nThank you for reaching out to Upright Kids Foundation. We have received your message and will get back to you as soon as possible.\n\nBest regards,\nUpright Kids Foundation`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <div style="text-align: center; margin-bottom: 20px;">
            <img src="https://www.uprightkidsfoundation.org/logo.svg" alt="Upright Kids Foundation" width="112" height="86" style="height: auto;"/>
            <div style="font-family: serif; font-weight: 600; font-size: 18px; color: #1a365d; margin-top: 10px;">
              <div>Upright</div>
              <div>Kids Foundation</div>
            </div>
          </div>
        
          <h2 style="color: #1a365d; text-align: center;">Thank You for Contacting Us!</h2>
        
          <p>Dear ${names},</p>
        
          <p>Thank you for reaching out to Upright Kids Foundation. We have received your message and will get back to you as soon as possible.</p>
        
          <p style="margin-top: 30px;">Best regards,</p>
          <p style="font-weight: bold;">The Upright Kids Foundation Team</p>
        
          <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666; text-align: center;">
            © ${new Date().getFullYear()} Upright Kids Foundation. All rights reserved.
          </div>
        </div>
      `,
    });

    return res.status(200).json({ message: "Emails sent successfully" });
  } catch (error) {
    console.error("Email sending error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}