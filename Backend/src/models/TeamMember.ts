import mongoose, { Schema, Document } from "mongoose";

export interface ITeamMember extends Document {
  name: string;
  position: string;
  image: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const TeamMemberSchema = new Schema<ITeamMember>(
  {
    name: { type: String, required: true },
    position: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

const TeamMember = mongoose.model<ITeamMember>("TeamMember", TeamMemberSchema);
export default TeamMember;
