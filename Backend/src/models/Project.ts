import mongoose, { Schema, Document } from "mongoose";

export interface IProject extends Document {
  title: string;
  description: string;
  imageUrl: string;
  slug: string;
}

const ProjectSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: false },
  slug: { type: String, required: true, unique: true },
});

export default mongoose.model<IProject>("Project", ProjectSchema);
