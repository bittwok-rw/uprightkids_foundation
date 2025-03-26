import { Request, Response } from "express";
import TeamMember from "../models/TeamMember";
import { validationResult } from "express-validator";

// ✅ Get All Members
export const getAllMembers = async (req: Request, res: Response): Promise<void> => {
  try {
    const members = await TeamMember.find();
    res.status(200).json({ success: true, data: members });
  } catch (error) {
    res.status(500).json({ message: "Error fetching team members", error });
  }
};

// ✅ Get Member by ID
export const getMemberById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const member = await TeamMember.findById(id);

    if (!member) {
      res.status(404).json({ success: false, message: "Member not found" });
      return;
    }

    res.status(200).json({ success: true, data: member });
  } catch (error) {
    res.status(500).json({ message: "Error fetching member", error });
  }
};

// ✅ Create Member
export const createMember = async (req: Request, res: Response): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ success: false, errors: errors.array() });
      return;
    }

    const { name, position, image, description } = req.body;
    const newMember = new TeamMember({ name, position, image, description });

    await newMember.save();
    res.status(201).json({ success: true, data: newMember });
  } catch (error) {
    res.status(500).json({ message: "Error creating member", error });
  }
};

// ✅ Update Member
export const updateMember = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updatedMember = await TeamMember.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedMember) {
      res.status(404).json({ success: false, message: "Member not found" });
      return;
    }

    res.status(200).json({ success: true, data: updatedMember });
  } catch (error) {
    res.status(500).json({ message: "Error updating member", error });
  }
};

// ✅ Delete Member
export const deleteMember = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedMember = await TeamMember.findByIdAndDelete(id);

    if (!deletedMember) {
      res.status(404).json({ success: false, message: "Member not found" });
      return;
    }

    res.status(200).json({ success: true, message: "Member deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting member", error });
  }
};
