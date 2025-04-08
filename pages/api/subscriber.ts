import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import clientPromise from "../../utils/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader("Content-Type", "application/json");

  // Handle POST request for subscribing
  if (req.method === "POST") {
    try {
      const { email } = req.body;

      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({
          success: false,
          message: "Invalid email address.",
        });
      }

      // Connect to MongoDB and store the email
      const client = await clientPromise;
      const db = client.db();
      const collection = db.collection("subscribers");

      // Check if email already exists in the database
      const existingSubscriber = await collection.findOne({ email });
      if (existingSubscriber) {
        return res.status(400).json({
          success: false,
          message: "This email is already subscribed.",
        });
      }

      // Insert the email into the database
      await collection.insertOne({ email });

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

      // Send a thank-you email
      await transporter.sendMail({
        from: `"Upright Kids Foundation" <${process.env.SMTP_USER || "info@uprightkidsfoundation.org"}>`,
        to: email,
        subject: "Thank You for Subscribing to Upright Kids Foundation!",
        text: `Dear Friend,\n\nThank you for subscribing to the Upright Kids Foundation newsletter! We're excited to share our latest updates, events, and stories of how we're helping children in need.\n\nYour support means the world to us and the children we serve.\n\nWith gratitude,\nThe Upright Kids Foundation Team`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
            <div style="text-align: center; margin-bottom: 20px;">
              <img src="https://www.uprightkidsfoundation.org/logo.svg" alt="Upright Kids Foundation" width="112" height="86" style="height: auto;"/>
              <div style="font-family: serif; font-weight: 600; font-size: 18px; color: #1a365d; margin-top: 10px;">
                <div>Upright</div>
                <div>Kids Foundation</div>
              </div>
            </div>
          
            <h2 style="color: #1a365d; text-align: center;">Thank You for Subscribing!</h2>
          
            <p>Dear Friend,</p>
          
            <p>Thank you for subscribing to the Upright Kids Foundation newsletter! We're excited to share our latest updates, events, and stories of how we're helping children in need.</p>
          
            <p>Your support means the world to us and the children we serve.</p>
          
            <p style="margin-top: 30px;">With gratitude,</p>
            <p style="font-weight: bold;">The Upright Kids Foundation Team</p>
          
            <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666; text-align: center;">
              © ${new Date().getFullYear()} Upright Kids Foundation. All rights reserved.
            </div>
          </div>
        `,
      });

      return res.status(200).json({
        success: true,
        message: "Subscription successful. A confirmation email has been sent.",
      });
    } catch (error) {
      console.error("Error sending email:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to send confirmation email. Please try again later.",
      });
    }
  }

  // Handle GET request for retrieving all subscribers
  if (req.method === "GET") {
    try {
      const client = await clientPromise;
      const db = client.db();
      const collection = db.collection("subscribers");

      // Fetch all subscribers from the database
      const subscribers = await collection.find({}).toArray();

      return res.status(200).json({
        success: true,
        data: subscribers,
      });
    } catch (error) {
      console.error("Error fetching subscribers:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch subscribers. Please try again later.",
      });
    }
  }

  // If the request method is neither POST nor GET
  return res.status(405).json({
    success: false,
    message: "Method Not Allowed",
  });
}