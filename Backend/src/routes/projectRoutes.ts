import express from "express";
import {
  getAllProjects,
  getProject,
  addProject,
  updateProjectDetails,
  removeProject,
} from "../controllers/projectController";

const router = express.Router();

router.get("/", getAllProjects);
router.get("/:slug", getProject);
router.post("/", addProject);
router.put("/:slug", updateProjectDetails);
router.delete("/:slug", removeProject);

export default router;
