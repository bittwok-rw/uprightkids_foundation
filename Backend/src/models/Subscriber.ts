import mongoose from "mongoose";

const SubscriberSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Subscriber = mongoose.model("Subscriber", SubscriberSchema);
