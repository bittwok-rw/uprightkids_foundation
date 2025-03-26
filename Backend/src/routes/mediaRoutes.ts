import express from "express";
import { createMedia, getAllMedia, deleteMedia, getMediaBySlug } from "../controllers/mediaController";

const router = express.Router();

router.post("/", createMedia);
router.get("/", getAllMedia);
router.get("/:slug", getMediaBySlug);
router.delete("/:id", deleteMedia);

export default router;
