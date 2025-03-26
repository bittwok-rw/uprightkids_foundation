import mongoose, { Schema, Document } from "mongoose";

interface IMedia extends Document {
  title: string;
  slug: string;
  date: string;
  image: string[];
  description: string[];
}

const MediaSchema = new Schema<IMedia>({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  date: { type: String, required: true },
  image: { type: [String], required: true },
  description: { type: [String], required: true },
});

export default mongoose.model<IMedia>("Media", MediaSchema);