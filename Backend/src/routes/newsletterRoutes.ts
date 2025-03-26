import express, { Router } from "express";
import { subscribeNewsletter } from "../controllers/newsletterController";

const router: Router = express.Router();

router.post("/subscribe", subscribeNewsletter);

export default router;
