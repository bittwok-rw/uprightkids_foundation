import { Request, Response } from "express";
import { Subscriber } from "../models/Subscriber";

export const subscribeNewsletter = async (req: Request, res: Response): Promise<void> => {
  const { email } = req.body;

  if (!email) {
    res.status(400).json({ message: "Email is required" });
    return;
  }

  try {
    // Check if the email already exists
    const existingSubscriber = await Subscriber.findOne({ email });
    if (existingSubscriber) {
      res.status(400).json({ message: "Email is already subscribed" });
      return;
    }

    // Save email to the database
    const newSubscriber = new Subscriber({ email });
    await newSubscriber.save();

    res.status(201).json({ message: "Subscription successful!" });
  } catch (error) {
    console.error("Error subscribing:", error);
    res.status(500).json({ message: "Server error" });
  }
};
