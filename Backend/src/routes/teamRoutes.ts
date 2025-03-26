import express from "express";
import { getAllMembers, getMemberById, createMember, updateMember, deleteMember } from "../controllers/teamController";
import { body } from "express-validator";

const router = express.Router();

// ✅ Get all members
router.get("/", getAllMembers);

// ✅ Get a member by ID
router.get("/:id", getMemberById);

// ✅ Create a new member
router.post(
  "/",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("position").notEmpty().withMessage("Position is required"),
    body("image").notEmpty().withMessage("Image is required"),
    body("description").notEmpty().withMessage("Description is required"),
  ],
  createMember
);

// ✅ Update a member
router.put("/:id", updateMember);

// ✅ Delete a member
router.delete("/:id", deleteMember);

export default router;
